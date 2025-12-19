from flask import Flask
from .config import Config

def create_app():
    #Building app
    app = Flask(__name__)
    app.config.from_object(Config)

    from .routes.hardware import hardware
    app.register_blueprint(hardware)
   
    return app