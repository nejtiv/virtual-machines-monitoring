#===CRUD OPERATIONS FOR VMPING
from flask import Blueprint, jsonify, request
from pydantic import ValidationError
from ..models.models_vmping import vmcreate, vmread, vmupdate
from ..database.db_connection import sa, engine
from ..database.registered_tables import virtualmachines, hardwareinfo
from ..services.vm_ping import vm_ping

vm = Blueprint("vm", __name__)

@vm.route("/add", methods=["POST"])
def vm_add():
    try:
        dto = vmcreate(**request.get_json())
    except ValidationError as e:
        return jsonify({"error": e.errors}), 400
    insert_query = sa.insert(virtualmachines).values(**dto.model_dump())
    try:
        #Query to register virtual machine
        with engine.begin() as connection:
            result = connection.execute(insert_query)
        #Retrieve the ID incremented with insert data to create record
        new_vm_id = result.inserted_primary_key[0]
        insert_monitoring_query = sa.insert(hardwareinfo).values(vm_id = new_vm_id)
        #Query to add virtual machine to monitoring
        with engine.begin() as connection:
            connection.execute(insert_monitoring_query)
        return jsonify({"message": "Virtual Machine registered successfully!"}), 201
    except Exception as e: 
        return jsonify({"error": f"An error occured during registration of the Virtual Machine. Details: {e}"}), 500
    
@vm.route("/display", methods=["GET"])
def vm_read():
    try:
        #Calling function that pings virtual machine and updates its status
        select_query = sa.select(virtualmachines)
        #Query to display registered virtual machines
        with engine.begin() as connection:
            result = connection.execute(select_query).fetchall()
        data = [
            vmread.model_validate(row._mapping).model_dump()
            for row in result
        ]
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": f"An error occured during displaying Virtual Machines Data. Details: {e}"}), 500
    
@vm.route("/update/<int:id>", methods=["PUT"])
def vm_update(id):
    try: 
        dto = vmupdate(**request.get_json())
    except ValidationError as e:
        return jsonify({"error": e.errors}), 400
    try:
        #Formatting updated info for key, value
        updated_info = {
            key: value 
            for key, value in dto.model_dump().items()
            if value is not None
        } 
        #Query to update the virtual machine with formatted values based on checked id
        update_query = sa.update(virtualmachines).where(virtualmachines.c.vm_id == id).values(**updated_info)
        with engine.begin() as connection:
            connection.execute(update_query)
        return jsonify({"message": "Virtual Machine information updated successfully!"}), 200
    except Exception as e:
        return jsonify({"error": f"An error occured during updating Virtual Machine information. Details: {e}"}), 500
    
@vm.route("/delete/<int:id>", methods=["DELETE"])
def vm_delete(id):
    try:
        delete_query = sa.delete(virtualmachines).where(virtualmachines.c.vm_id ==id)
        with engine.begin() as connection:
            connection.execute(delete_query)
        return jsonify({"message": "Virtual Machine deleted successfully!"}), 200
    except Exception as e:
        return jsonify({"error": f"An error occured during deletion of the Virtual Machine. Details: {e}"}), 500