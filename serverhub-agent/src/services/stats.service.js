const os = require('os');

function collectStats() {
  return {
    timestamp: Date.now(),
    loadavg: os.loadavg(),
    freeMem: os.freemem(),
    totalMem: os.totalmem(),
    uptime: os.uptime()
  };
}

module.exports = { collectStats };
