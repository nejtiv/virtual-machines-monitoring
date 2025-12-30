#===ROUTES FOR CHECKING HARDWARE INFO
from flask import Blueprint, request, jsonify
from ..db_connection import sa, engine
from ..models.models_hardwareinfo import hardwareupdate
from ..registered_tables import hardwareinfo
from ..services.hardware_check import check_hardware, check_online

hardware_check = Blueprint("hardware_check", __name__)

@hardware_check.route("/test_connection", methods=["POST"])
def connection_check():
    #List for the return of connected or disconnected vms
    results = []
    try:
        #Query to select all id's and ipv4 addresses from the database
        select_query = sa.select(hardwareinfo.c.vm_id, hardwareinfo.c.ipv4)
        with engine.begin() as connection:
            result = connection.execute(select_query).fetchall()
        for vm in result:
            vm_id = vm.vm_id
            ipv4 = vm.ipv4
            try:
                #Call function to bulk check of agent online status
                check_online(ipv4 = ipv4)
                results.append(
                    {
                        "id": vm_id,
                        "status": "Online!"
                    }
                )
            except Exception as e:
                results.append(
                    {
                        "id": vm_id,
                        "status": "Offline"
                    }
                )
        return jsonify({"message": results}), 200
    except Exception as e:
        return jsonify({"error": f"An error occured during checking if the agent is online. Details: {e}"}), 500
