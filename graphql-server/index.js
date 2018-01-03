const express = require('express');
const bodyParser = require('body-parser');
const apolloServer = require('apollo-server-express');
const { graphqlExpress, graphiqlExpress } = apolloServer;

const myGraphQLSchema = require('./schema');
const PORT = 3001;

const app = express();

// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); // if you want GraphiQL enabled

app.listen(PORT, function () {
  console.log(`GraphQL server listening on port:${PORT}.`);
});
