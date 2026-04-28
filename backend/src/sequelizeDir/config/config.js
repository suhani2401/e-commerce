// src/sequelizeDir/config/sequelize-cli.config.js
require("dotenv").config({quiet: true});

module.exports = {
  development: {
    username: 'postgres',
    password: 'test@123',
    database: 'e-commerce',
    host: 'localhost',
    port: 5432,
    dialect: "postgres",
  },
};