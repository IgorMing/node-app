const graphql = require('graphql');
const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'callnow',
  password: 'postgres',
  port: 5432
});

client.connect();

const establishmentType = new graphql.GraphQLObjectType({
  name: 'Establishment',
  fields: {
    id: { type: new graphql.GraphQLNonNull(graphql.GraphQLInt) },
    name: { type: new graphql.GraphQLNonNull(graphql.GraphQLString) },
    qtdMesas: { type: graphql.GraphQLInt }
  }
});

function getEstablishments() {
  let response = null;
  client.query('SELECT * FROM establishment', [], (err, data) => response = err ? err.stack : data.rows);
  return response;
}

const schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      establishment: {
        type: establishmentType,
        args: {
          id: { type: graphql.GraphQLInt }
        },
        resolve: (_, args) => {
          getEstablishments();
        }
      }
    }
  })
})

module.exports = schema;
