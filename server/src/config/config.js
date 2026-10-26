// this file will hold our config options for our server

// create export

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
      port: process.env.DB_PORT,
    },
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
  },
};
