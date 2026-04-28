// src/models/index.ts
import { Sequelize } from "sequelize-typescript";
import path from "path";
import fs from "fs";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "../config";

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: "postgres",
  host: DB_HOST,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  port: Number(DB_PORT),
  logging: true,
});

const db: any = {};

// Dynamically load models
const loadModels = () => {
  const modelsPath = __dirname;

  const files = fs.readdirSync(modelsPath);

  const modelFiles = files.filter((file) => {
    return (
      file.endsWith(".model.ts") ||
      file.endsWith(".model.js")
    );
  });

  const models = modelFiles.map((file) => {
    const filePath = path.join(modelsPath, file);
    const module = require(filePath);

    // Support both default export & named export
    return module.default || Object.values(module)[0];
  });

  return models;
};

// Register models automatically
const models = loadModels();
sequelize.addModels(models);
db.sequelize = sequelize;

export default db;