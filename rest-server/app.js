const express = require('express');
const { Client } = require('pg');
const app = express();
const userRouter = require('./routes/users');

const client = new Client({
  user: 'docker',
  host: 'localhost',
  database: 'postgres',
  password: 'docker',
  port: 5432
});

const port = 3000;

client.connect();

app.use('/users', userRouter(client));

app.listen(port, () => {
  console.log(`Listening on port:${port}`)
});
