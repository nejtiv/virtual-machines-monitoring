#===APP INITIALIZATION
from flask import Flask

#===INIT APP
def create_app():
    app = Flask(__name__)

    #===REGISTER BLUEPRINTS
    from .routes.crud_vmping import vm
    from .routes.routes_rdp import rdp

    app.register_blueprint(vm, url_prefix="/api/vm")
    app.register_blueprint(rdp, url_prefix="/api/rdp")

    return app