const withTs = (level, message) =>
  `[${new Date().toISOString()}] [${level}] ${message}`;

export const logger = {
  info: (message) => console.log(withTs("INFO", message)),
  warn: (message) => console.warn(withTs("WARN", message)),
  error: (message) => console.error(withTs("ERROR", message))
};
