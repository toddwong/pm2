if (process.platform === "win32") {
    var child_process = require('child_process');
    var oldFork = child_process.fork;
    child_process.fork = function () {
      var pos = 1;
      if (pos < arguments.length && Array.isArray(arguments[pos]))
        pos++;
      if (pos < arguments.length && arguments[pos] != null
              && typeof arguments[pos] === 'object'
              && arguments[pos].env && arguments[pos].env.pm2_windowsHide) {
        arguments[pos].windowsHide = true;
      }
      return oldFork.apply(this, arguments);
    };
    module.exports = require('cluster');
    child_process.fork = oldFork;
} else {
    module.exports = require('cluster');
}
