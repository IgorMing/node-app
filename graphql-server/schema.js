const graphql = require('graphql');
const { Client } = require('pg');

const client = new Client({
  user: 'docker',
  host: 'localhost',
  database: 'postgres',
  password: 'docker',
  port: 5432
});

client.connect();

const establishmentType = new graphql.GraphQLObjectType({
  name: 'Users',
  fields: {
    id: { type: graphql.GraphQLInt },
    name: { type: graphql.GraphQLString },
    cpf: { type: graphql.GraphQLString },
    sex: { type: graphql.GraphQLString }
  }
});

function getUsers() {
  return new Promise((resolve, reject) => {
    client.query('SELECT * FROM users', [], (err, data) => err ? reject(err) : resolve(data.rows));
  })
}

function getUsersById(id) {
  return new Promise((resolve, reject) => {
    client.query('SELECT * FROM users WHERE id = $1', [id], (err, data) => {
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
      users: {
        type: new graphql.GraphQLList(establishmentType),
        args: {
          id: { type: graphql.GraphQLInt }
        },
        resolve(_, args) {
          if (args.id) {
            return getUsersById(args.id);
          }
          return getUsers();
        }
      }
    }
  })
})

module.exports = schema;
