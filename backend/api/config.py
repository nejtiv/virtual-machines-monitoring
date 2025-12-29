#==APP CONFIG
import os
from dotenv import load_dotenv

load_dotenv()

class Config(object):
    SECRET_KEY = os.environ.get("SECRET_KEY")
    SCHEDULER_API_ENABLED = True
    SCHEDULER_TIMEZONE = "UTC"
    LOGGING = {
        'version': 1,
        'disable_existing_loggers': False,
        'filters': {
            'backend_filter': {"backend_module": "api"}
        },
        'formatters':{
            'standard': {
                'format': '%(asctime)s [%(levelname)s] %(name)s: %(message)s'
            }
        },
        'handlers': {
            'console': {
                'class': 'logging.StreamHandler',
                'stream': 'ext://sys.stdout',
                'formatter': 'standard',
                'level': 'DEBUG'
            },
            'file': {
                'class': 'logging.handlers.TimedRotatingFileHandler',
                'formatter': 'standard',
                'filename': '',
                'when': 'D',
                'interval': 1,
                'backupCount': 7,
                'encoding': 'utf-8',
                'level': 'DEBUG'
            }
        },
        'loggers': {
            '': {'handlers': ['console', 'file'], 'level': 'INFO'},
            'flask': {'level': 'WARNING'},
            'sqlalchemy': {'level': 'WARNING'},
            'werkzeug': {'level': 'WARNING'}
        }
    }