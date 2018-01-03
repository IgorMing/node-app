const express = require('express');
const { Client } = require('pg');
const app = express();
const establishmentRouter = require('./routes/establishment');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'callnow',
  password: 'postgres',
  port: 5432
});

const port = 3000;

client.connect();

app.use('/establishments', establishmentRouter(client));

app.listen(port, () => {
  console.log(`Listening on port:${port}`)
});
