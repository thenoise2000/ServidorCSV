const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../config/db.js');

// GET all Employees
router.get('/data', (req, res) => {
    mysqlConnection.query('SELECT file, text, number, hex FROM archivos', (err, rows, fields) => {
      if(!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });  
  });

  module.exports = router;