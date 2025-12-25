#===APP INITIALIZATION
from flask import Flask
from flask_cors import CORS

#===INIT APP
def create_app():
    app = Flask(__name__)
    CORS(app)

    #===REGISTER BLUEPRINTS
    from .routes.crud_vmping import vm
    from .routes.routes_rdp import rdp
    from .routes.routes_hardwareinfo import hardware_check

    app.register_blueprint(vm, url_prefix="/api/vm")
    app.register_blueprint(rdp, url_prefix="/api/rdp")
    app.register_blueprint(hardware_check, url_prefix="/api/hardware_check")

    return app