const express = require('express');
const bodyParser = require('body-parser');
const apolloServer = require('apollo-server-express');
const { graphqlExpress, graphiqlExpress } = apolloServer;
const myGraphQLSchema = require('./schema');
const app = express();

const PORT = 3001;

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(PORT, function () {
  console.log(`GraphQL server listening on port:${PORT}.`);
});
