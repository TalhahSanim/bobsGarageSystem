// Logs every request to the console and to log.json
// winston -> the logger, morgan -> collects each requests details

import winston from "winston";
import morgan from "morgan";

// format helpers live inside winston.format
const { combine, timestamp, json } = winston.format;

// level 'http' log errors, warn,info and http (levels 0-3)
export const logger = winston.createLogger({
  level: "http",
  format: combine(timestamp({ format: "YYYY-MM-DD hh:mm:ss:SSS A" }), json()),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "log.json" }),
  ],
});

// morgan chose the request details and gives it to winston
export const morganMiddleware = morgan(
  (tokens, req, res) =>
    JSON.stringify({
      method: tokens.method(req, res),
      url: tokens.url(req, res),
      status: Number.parseFloat(tokens.status(req, res)),
      content_length: tokens.res(req, res, "content-length"),
      response_time_ms: tokens["response-time"](req, res) + "ms",
      remote_address: tokens["remote-addr"](req, res),
      user_agent: tokens["user-agent"](req, res),
      referrer: tokens.referrer(req, res),
    }),
  {
    stream: {
      write: (message) => logger.http("incoming-request", JSON.parse(message)),
    },
  },
);
