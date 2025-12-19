from flask import Blueprint, request, jsonify
from ..modules.retrieve_hardware import get_hardware

hardware = Blueprint("hardware", __name__)

@hardware.route("/", methods=["POST"])
async def hardware_get():
    info = get_hardware()
    return jsonify(info), 200