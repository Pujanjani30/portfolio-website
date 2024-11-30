import winston from "winston";
import "winston-mongodb";

const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // new winston.transports.Console({
    //   format: winston.format.simple(), // Logs to the console for debugging
    // }),
    new winston.transports.MongoDB({
      level: "error", // Log only error-level messages
      db: process.env.MONGODB_URI, // MongoDB connection string
      collection: "logs", // Collection to store logs
      storeHost: true, // Store the hostname where the error occurred
      handleExceptions: true, // Handle exceptions
    }),
  ],
});

export default logger;
