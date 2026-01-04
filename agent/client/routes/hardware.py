from flask import Blueprint, request, jsonify
from ..modules.retrieve_hardware import get_hardware
from ..modules.cyclic_restart import cyclic_restart

hardware = Blueprint("hardware", __name__)

@hardware.route("/", methods=["POST"])
def hardware_get():
    info = get_hardware()
    return jsonify(info), 200

@hardware.route("/check_online", methods=["POST"])
def online_check():
    return jsonify({"message": "The agent is online..."}), 200
    
@hardware.route("/reboot", methods=["POST"])
def reboot():
    restart = cyclic_restart()
    return jsonify(restart), 200