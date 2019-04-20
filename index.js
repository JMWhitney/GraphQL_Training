const express = require('express');
const graphqlHTTP = require('express-graphql');
const { schema } = require('./schema');

const app = express();

app.get('/', (req, res) => {
  res.send('GraphQL is amazing!');
});

//In memory mock database
class Friend {
  constructor(id, { firstName, lastName, gender, language, email }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.language = language;
    this.email = email;
  }
}

const friendDataBase = {};

//Resolver
const root = { 
  friend: () => {
    return {
      "id": 1057392759,
      "firstName": "Justin",
      "lastName": "Whitney",
      "gender": "Male",
      "language": "English",
      "email": "user@email.com",
    }
  },
  createFriend: ({ input }) => {
    let id = require('crypto').randomBytes(10).toString('hex');
    friendDataBase[id] = input;
    return new Friend(id, input);
  }

};

//Serve gql server with the supplied schema
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(8080, () => console.log('Running server on port 8080/graphql'))