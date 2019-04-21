class Friend {
  constructor(id, { firstName, lastName, gender, age, language, email, contacts }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.language = language;
    this.email = email;
    this.contacts = contacts;
  }
}

const friendDataBase = {};

exports.resolvers = { 
  getFriend: ({ id }) => {
    return new Friend(id, friendDataBase[id]);
  },
  createFriend: ({ input }) => {
    let id = require('crypto').randomBytes(10).toString('hex');
    friendDataBase[id] = input;
    return new Friend(id, input);
  }

};