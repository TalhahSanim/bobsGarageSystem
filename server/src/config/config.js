// this file will hold our config options for our server

// create export

export default {
  // process.env.<var_Name> will check for an environmental variable with name var_name
  port: process.env.PORT || 3000,
  db: {
    // database name
    database: process.env.DB_NAME || "bobsGarageSystem",
    // database user
    user: process.env.DB_NAME || "root",
    // database password
    password: process.env.DB_PASS || "root",
    // database options
    options: {
      // dialect-> tells sequelize which database engine to utilise
      dialect: process.env.DIALECT || "mysql",
      // host-> where the database is located
      host: process.env.HOST || "localhost",
      // port -> which port the database uses for connections
      port: process.env.DB_PORT || 3306,
    },
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || "IamSecret",
  },
};
