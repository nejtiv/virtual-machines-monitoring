#===ROUTES FOR ANALYTICS SERVICE [DASHBOARD, NOT JUST DISPLAYING PLAIN TABLE FROM SQL]
from flask import Blueprint, request, jsonify
from ..db_connection import sa, engine
from ..registered_tables import virtualmachines, hardwareinfo

analytics = Blueprint("analytics", __name__)

@analytics.route("/vm/online_offline", methods=["GET"])
def count_online_offline():
    try:
        #Queries to rertieve numbers of online and offline Virtual Machines
        vm_online_query = sa.select(sa.func.count()).select_from(virtualmachines).where(virtualmachines.c.vm_status == "online")
        vm_offline_query = sa.select(sa.func.count()).select_from(virtualmachines).where(virtualmachines.c.vm_status == "offline")
        with engine.begin() as connection:
            online = connection.execute(vm_online_query).scalar()
            offline = connection.execute(vm_offline_query).scalar()
        return jsonify(
            {
                "online": online,
                "offline": offline
            }
        ), 200
    except Exception as e:
        return jsonify({"error":f"An error occured during counting the states of Virtual Machines. Details: {e}"}), 500
    
@analytics.route("/vm/ram_cpu_usage", methods=["GET"])
def get_ram_cpu_usage():
    try:
        #Query to retrieve the cpu and ram usage per Virtual Machine
        usage_query = sa.select(virtualmachines.c.vm_name.label("labels"), hardwareinfo.c.memory_used_percent.label("ramUsage"), hardwareinfo.c.cpu_used.label("cpuUsage")).select_from(virtualmachines).join(hardwareinfo, hardwareinfo.c.vm_id == virtualmachines.c.vm_id)
        with engine.begin() as connection:
            result = connection.execute(usage_query).fetchall()
        return jsonify({
            "labels": [row.labels for row in result],
            "ramUsage": [row.ramUsage for row in result],
            "cpuUsage": [row.cpuUsage for row in result]
        }), 200
    except Exception as e:
        return jsonify({"error": f"An error occured during fetching resource usage per Virtual Machine. Details: {e}"}), 500