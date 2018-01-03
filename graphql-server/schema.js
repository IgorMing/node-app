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
    id: { type: graphql.GraphQLInt },
    name: { type: graphql.GraphQLString },
    qtdmesas: { type: graphql.GraphQLInt }
  }
});

function getEstablishments() {
  return new Promise((resolve, reject) => {
    client.query('SELECT * FROM establishment', [], (err, data) => err ? reject(err) : resolve(data.rows));
  })
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
        resolve(_, args) {
          return getEstablishments();
        }
      }
    }
  })
})

module.exports = schema;
