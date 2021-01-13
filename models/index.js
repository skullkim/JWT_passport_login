const Sequelize = require('sequelize');
const User = require('./user');

const env = process.env.NODE_DEV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.passwod, config 
);

db.sequelize = sequelize;
db.User = User;

User.init(sequelize);

module.exports = db;