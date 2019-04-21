const express = require('express');
const graphqlHTTP = require('express-graphql');
const { schema } = require('./data/schema');


const app = express();

app.get('/', (req, res) => {
  res.send('GraphQL is amazing!');
});

//Serve gql server with the supplied schema
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(8080, () => console.log('Running server on port 8080/graphql'))