import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';

export default (sequelize) => {
  let db = {};
  const modelsDirectory = __dirname;
  fs.readdirSync(modelsDirectory)
    .filter((file) => {
      return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
      const model = require(path.join(modelsDirectory, file))(sequelize, Sequelize);
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return db;
};