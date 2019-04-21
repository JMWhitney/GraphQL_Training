const express = require('express');
const graphqlHTTP = require('express-graphql');
const { schema } = require('./schema');
const { resolvers } = require('./resolvers');

const app = express();

app.get('/', (req, res) => {
  res.send('GraphQL is amazing!');
});

const root = resolvers;

//Serve gql server with the supplied schema
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(8080, () => console.log('Running server on port 8080/graphql'))