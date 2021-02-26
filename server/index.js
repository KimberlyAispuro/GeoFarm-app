require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const { Pool } = require('pg');

const db = new Pool({
  connectionString: process.env.DATABASE_URL
});

const app = express();

app.use(staticMiddleware);

app.get('/api/prospects', (req, res) => {
  const sql = `
    select * from prospects
  `;

  db.query(sql)
    .then(result => {
      // console.log('DB response:',result.rows);

      res.json(result.rows);
    });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
