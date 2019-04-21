const mongoose = require('mongoose');
const Sequelize = require('sequelize');
const _ = require('lodash');
const casual = require('casual');

//Mongo connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/friends', {
  useNewUrlParser: true
});

//Define schema
const friendSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  gender: {
    type: String
  },
  age: {
    type: String
  },
  language: {
    type: String
  },
  email: {
    type: String
  },
  contacts: {
    type: Array
  }
});

//Use the defined schema for our model
const Friends = mongoose.model('friends', friendSchema);

//SQL
const sequelize = new Sequelize('database', null, null, {
  dialect: 'sqlite',
  storage: './aliens.sqlite',
});

const Aliens = sequelize.define('aliens', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  planet: { type: Sequelize.STRING },
});

//Create 10 fake data entries on server startup
Aliens.sync({ force: true }).then(() => {
  _.times(10, (i) => {
    Aliens.create({
      firstName: casual.first_name,
      lastName: casual.last_name,
      planet: casual.word,
    });
  });
});

const contents = { Aliens, Friends };
module.exports = contents;
