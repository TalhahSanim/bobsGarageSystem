// File -> server/src/config/config.js
// Author -> Talhah Sanim
// Application Version -> 1.0

// this file will hold our config options for our server

// create export
import fs from "fs";

// SSL for a cloud database (Aiven). DB_CA_PATH points at the CA certificate file.
// Not set (local MySQL) -> no SSL
const ssl = process.env.DB_CA_PATH
  ? { ca: fs.readFileSync(process.env.DB_CA_PATH, "utf8") }
  : undefined;
export default {
  // process.env.<var_Name> will check for an environmental variable with name var_name
  port: process.env.PORT,
  db: {
    // database name
    database: process.env.DB_NAME,
    // database user
    user: process.env.DB_USER,
    // database password
    password: process.env.DB_PASS,
    // database options
    options: {
      // dialect-> tells sequelize which database engine to utilise
      dialect: process.env.DIALECT,
      // host-> where the database is located
      host: process.env.HOST,
      // port -> which port the database uses for connections
      port: process.env.DB_PORT, // dialectOptions -> passed straight to the mysql2 driver (SSL for Aiven)
      dialectOptions: ssl ? { ssl } : {},
      // logging -> false stops Sequelize printing every SQL query
      logging: false,
    },
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
  },
};
