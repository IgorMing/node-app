const express = require('express');

function getRouter(client) {
  const router = express.Router();
  
  router.route('/')
    .get((req, res, next) => {
      client.query('SELECT * FROM users', [], (err, data) => {
        const response = err ? err.stack : data.rows;
        res.send(response);
      });
    });

  return router;
}

module.exports = getRouter;
