#===ROUTES FOR CHECKING HARDWARE INFO
from flask import Blueprint, request, jsonify
from ..db_connection import sa, engine
from ..models.models_hardwareinfo import hardwareupdate
from ..registered_tables import hardwareinfo
from ..services.hardware_check import check_hardware

hardware_check = Blueprint("hardware_check", __name__)

@hardware_check.route("/check/<int:id>", methods=["PUT"])
def check(id):
    try:
        select_query = sa.select(hardwareinfo.c.ipv4).where(hardwareinfo.c.vm_id == id)
        with engine.begin() as connection:
            result = connection.execute(select_query).fetchone()
        check_info = check_hardware(id = id, result = result)
        dto = hardwareupdate(**check_info)
        update_query = sa.update(hardwareinfo).where(hardwareinfo.c.vm_id == id).values(**dto.model_dump())
        with engine.begin() as connection: 
            connection.execute(update_query)
        return jsonify(check_info)
    except Exception as e:
        return jsonify({"error": f"An error occured during checking hardware info of Virtual Machines. Details: {e}"}), 500