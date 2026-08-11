/**
 * Logger utility to capture scraper logs for API response streaming
 */
export function createLogger(externalHandler) {
  const logs = [];
  
  const log = (msg) => {
    const timeStr = new Date().toLocaleTimeString();
    logs.push({ timestamp: timeStr, message: msg });
    if (typeof externalHandler === 'function') {
      try {
        externalHandler(msg);
      } catch (e) {}
    }
  };

  return { log, logs };
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
