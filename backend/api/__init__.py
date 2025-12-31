#===APP INITIALIZATION
from flask import Flask
from flask_cors import CORS
from flask_apscheduler import APScheduler
import logging
from .services.directories_init import directory_initialization
from .config import Config
from logging.config import dictConfig

#Init a loggger and its config
LOGGER = logging.getLogger(__name__)

#Init a scheduler
scheduler = APScheduler()

#===INIT APP
def create_app():
    app = Flask(__name__)
    CORS(app)
    scheduler.init_app(app)
    scheduler.start()
    LOGGER.info("App is configuring...")

    #===LOAD ALL JOBS BEFORE FIRST REQUEST
    with app.app_context():
        def load_tasks():
            from .tasks import jobs
        load_tasks()

    #===INITIALIZE DIRECTORIES
    init = directory_initialization()

    #===CONFIGURE LOGGING PATH
    if init.get("status") == "OK":
        log_file_path = init["logs_path"] / "backend.log"
        Config.LOGGING["handlers"]["file"]["filename"] = str(log_file_path)

    dictConfig(Config.LOGGING)

    #===REGISTER BLUEPRINTS
    from .routes.routes_virtualmachines import vm
    from .routes.routes_rdp import rdp
    from .routes.routes_hardwareinfo import hardware_check
    from .analytics.routes_analytics import analytics

    app.register_blueprint(vm, url_prefix="/api/vm")
    app.register_blueprint(rdp, url_prefix="/api/rdp")
    app.register_blueprint(hardware_check, url_prefix="/api/hardware_check")
    app.register_blueprint(analytics, url_prefix="/api/analytics")

    LOGGER.info("App started.")

    return app