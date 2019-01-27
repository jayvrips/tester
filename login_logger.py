
import traceback
from datetime import datetime

from abc import ABC, abstractmethod

class __LoginLogger(ABC):
    __ERR = "ERROR"
    __WARN = "WARNING"
    __INFO = "INFO"
    __DBG = "DEBUG"

    @abstractmethod
    def _output(self, level, msg):
        pass

    def __gen_log(self, level, msg, *args):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_line = "{} {}: {}\n".format(timestamp, level, msg.format(*args))
        self._output(log_line)

    def tb(self):
        self.err(traceback.format_exc())

    def err(self, msg, *args):
        self.__gen_log(self.__ERR, msg, *args)

    def warn(self, msg, *args):
        self.__gen_log(self.__WARN, msg, *args)

    def info(self, msg, *args):
        self.__gen_log(self.__INFO, msg, *args)

    def dbg(self, msg, *args):
        self.__gen_log(self.__DBG, msg, *args)


class LoginFileLogger(__LoginLogger):
    def __init__(self, prefix='loginlog', outdir='logs'):
        super().__init__()
        self.filename = "{}/{}_{}.log".format(outdir, prefix, "00")

    def _output(self, log_line):
        with open(self.filename, "a") as f:
            f.write(log_line)

