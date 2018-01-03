const express = require('express');
const graphql = require('graphql');
const graphqlHTTP = require('express-graphql');
const users = require('./schema');
const app = express();

const port = 3001;

app.use('/user', graphqlHTTP({
  schema: users,
  graphiql: true
}));
app.listen(port, function () {
  console.log(`GraphQL server listening on port:${port}.`);
});
