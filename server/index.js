require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const db = new Pool({
  connectionString: process.env.DATABASE_URL
});

const app = express();

app.use(staticMiddleware);
app.use(bodyParser.json());

// loading prospects data
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

// loading farms data
app.get('/api/farms', (req, res) => {
  const sql = `
    select * from farms
  `;

  db.query(sql)
    .then(result => {
      // console.log('DB response:',result.rows);

      res.json(result.rows);
    });
});

// add prospect data
app.post('/api/prospects', (req, res, next) => {
  // console.log(req.body);

  const sql = `
      insert into "prospects"("address","name","phoneNumber","email","interestInSelling","neighborhoodComplaints","notes","prospectStatus") 
          values ($1,$2,$3,$4,$5,$6,$7,$8) 
        returning *
`;
  const { address, name, phoneNumber, email, interestInSelling, neighborhoodComplaints, notes, prospectStatus } = req.body;
  const values = [address, name, phoneNumber, email, interestInSelling, neighborhoodComplaints, notes, prospectStatus];

  // console.log(values);

  if (!address || !name || !phoneNumber || !email || !neighborhoodComplaints || !notes || !prospectStatus) {
    res.status(400).json({
      error: 'Incomplete information. Please complete all fields. '
    });
    return;
  }

  db.query(sql, values)
    .then(result => {
      const prospectInfo = result.rows[0];
      res.status(201).json(prospectInfo);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error ocurred.'
      });
    });
});

// update prospect
app.put('/api/prospects/:prospectId', (req, res, next) => {
  const prospectId = Number(req.body.prospectId);
  // console.log(prospectId);

  const { address, name, phoneNumber, email, interestInSelling, neighborhoodComplaints, notes, prospectStatus } = req.body;
  const values = [address, name, phoneNumber, email, interestInSelling, neighborhoodComplaints, notes, prospectStatus, prospectId];

  if (!Number.isInteger(prospectId) || prospectId <= 0) {
    res.status(400).json({
      error: 'Invalid prospect Id. Must be a positive integer'
    });
    return;
  } else if (!address || !name || !phoneNumber || !email || !neighborhoodComplaints || !notes || !prospectStatus) {
    res.status(400).json({
      error: 'Incomplete information. Please complete all fields. '
    });
    return;
  }

  const text = `
    update "prospects"
      set "address"= $1,
          "name"= $2,
          "phoneNumber"= $3,
          "email"= $4,
          "interestInSelling"= $5,
          "neighborhoodComplaints"= $6,
          "notes"= $7,
          "prospectStatus"= $8
      where "prospectId"= $9
      returning *
  `;

  db.query(text, values)
    .then(result => {
      const editProspect = result.rows[0];
      if (!editProspect) {
        res.status(404).json({
          error: `Cannot find prospect with prospectId ${prospectId}`
        });
      } else {
        res.status(200).json(editProspect);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error ocurred.'
      });
    });
});

// delete prospect
app.delete('/api/prospects/:prospectId', (req, res, next) => {
  const prospectId = Number(req.body.prospectId);
  if (!Number.isInteger(prospectId) || prospectId <= 0) {
    res.status(400).json({
      error: 'Invalid Id. Must be a positive integer'
    });
    return;
  }

  const text = `
    delete from "prospects"
    where "prospectId"= $1
    returning *
  `;
  const values = [prospectId];

  db.query(text, values)
    .then(result => {
      const prospect = result.rows[0];
      if (!prospect) {
        res.status(404).json({
          error: `Cannot find prospect with prospectId ${prospectId}`
        });
      } else {
        res.status(200).json(prospect);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error ocurred.'
      });
    });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
