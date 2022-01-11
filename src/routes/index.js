const express = require('express');
const router = express.Router();

//HOME
router.get('/', (req, res) => {
  res.render('index')
});

//TODAS LAS RAZAS DE PERROS
router.get('/perros', (req, res) => {
  res.render('all_dogs')
});

module.exports = router;

