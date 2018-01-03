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

function getEstablishmentById(id) {
  return new Promise((resolve, reject) => {
    client.query('SELECT * FROM establishment WHERE id = $1', [id], (err, data) => {
      if (err) {
        return reject(err);
      }

      const response = data.rows.length ? [data.rows[0]] : [];
      return resolve(response);
    });
  })
}

const schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      establishment: {
        type: new graphql.GraphQLList(establishmentType),
        args: {
          id: { type: graphql.GraphQLInt }
        },
        resolve(_, args) {
          if (args.id) {
            return getEstablishmentById(args.id);
          }
          return getEstablishments();
        }
      }
    }
  })
})

module.exports = schema;
