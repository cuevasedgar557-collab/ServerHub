const config = require('../config/config.json');

function startHeartbeat(sendHeartbeat) {
  const interval = config.heartbeatIntervalMs || 60000;
  const id = setInterval(() => {
    if (typeof sendHeartbeat === 'function') sendHeartbeat();
    else console.log('Heartbeat');
  }, interval);
  return () => clearInterval(id);
}

module.exports = { startHeartbeat };
