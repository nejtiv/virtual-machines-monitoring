#===APP INITIALIZATION
from flask import Flask
from flask_cors import CORS
import logging
from logging.handlers import RotatingFileHandler

#===INIT APP
def create_app():
    app = Flask(__name__)
    CORS(app)

    #===CONFIGURE LOGGING
    handler = RotatingFileHandler("app.log", maxBytes=1000000, backupCount=3)
    handler.setLevel(logging.WARNING)
    formatter = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    handler.setFormatter(formatter)
    app.logger.addHandler(handler)

    #===REGISTER BLUEPRINTS
    from .routes.crud_vmping import vm
    from .routes.routes_rdp import rdp
    from .routes.routes_hardwareinfo import hardware_check
    from .analytics.routes_analytics import analytics

    app.register_blueprint(vm, url_prefix="/api/vm")
    app.register_blueprint(rdp, url_prefix="/api/rdp")
    app.register_blueprint(hardware_check, url_prefix="/api/hardware_check")
    app.register_blueprint(analytics, url_prefix="/api/analytics")

    return app