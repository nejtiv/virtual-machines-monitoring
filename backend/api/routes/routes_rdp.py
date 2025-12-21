#===ROUTES FOR RDP SESSION SERVICES
from flask import Blueprint, request, jsonify
from ..db_connection import sa, engine
from ..registered_tables import virtualmachines
from ..services.rdp_sessions import create_rdp_session

rdp = Blueprint("rdp", __name__)

@rdp.route("/create_session/<int:id>", methods=["POST"])
def rdp_create(id):
    try:
        select_query = sa.select(virtualmachines.c.vm_name, virtualmachines.c.ipv4).where(virtualmachines.c.vm_id == id)
        #Query to retrieve the virtual machine name and ipv4 based on checked id
        with engine.begin() as connection:
            result = connection.execute(select_query).fetchone()
        if not result:
            return jsonify({"error": "Virtual Machine not found!"}), 404
        #Calling the function to create the RDP session based on checked id name and ipv4 of associated virtual machine
        rdp_session = create_rdp_session(id = id, result= result)
        return jsonify({"message": f"Session created successfully! Session:{rdp_session}"})
    except Exception as e:
        return jsonify({"message": f"An error occured during creation of the RDP session. Details {e}"}), 500
