const express = require('express');
const axios = require('axios');
const router = express.Router();


//HOME
router.get('/', (req, res) => {
  res.render('index', {'index': true})
});

//TODAS LAS RAZAS DE PERROS
router.get('/perros', (req, res) => {
  const urlAPI = 'https://dog.ceo/api/breeds/list/all';
  axios.get(urlAPI)
  .then(function (response) {
    let all_dogs = response.data.message;
    let only_dogs = Object.keys(all_dogs);
    res.render('all_dogs', {'perros': true, 'dogs': only_dogs})
  })
});

router.get('/perro/:race', (req, res) => {
  const race = req.params.race;
  const urlAPI = `https://dog.ceo/api/breed/${race}/images/random`;
  axios.get(urlAPI)
  .then(function (response) {
    console.log(response);
    //maquetar dog.pug
    res.render('dog')
  })
})

module.exports = router;

