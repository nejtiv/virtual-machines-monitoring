#===CRUD OPERATIONS FOR VMPING
from flask import Blueprint, jsonify, request
from pydantic import ValidationError
from ..models.models_vmping import vmcreate, vmread, vmupdate
from ..db_connection import sa, engine
from ..registered_tables import virtualmachines
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
        with engine.begin() as connection:
            connection.execute(insert_query)
        return jsonify({"message": "Virtual Machine registered successfully!"}), 201
    except Exception as e: 
        return jsonify({"error": f"An error occured during registration of the Virtual Machine. Details: {e}"}), 500
    
@vm.route("/display", methods=["GET"])
def vm_read():
    try:
        vm_ping()
        select_query = sa.select(virtualmachines)
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
        updated_info = {
            key: value 
            for key, value in dto.model_dump().items()
            if value is not None
        } 
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