const express = require('express');
const axios = require('axios');
const router = express.Router();


//HOME
router.get('/', (req, res) => {
  res.render('index', {'index': true})
});

//TODAS LAS RAZAS Y SUBRAZAS DE PERROS
router.get('/perros', (req, res) => {
  const urlAPI = 'https://dog.ceo/api/breeds/list/all';
  axios.get(urlAPI)
  .then(function (response) {
    let all_dogs = response.data.message;
    let only_dogs = Object.keys(all_dogs);
    let only_races = Object.values(all_dogs);

    //creamos un for each para solo seleccionar arrays con uno o más elementos1
    let only_subraces = [];
    only_races.forEach((element, index) => {
      if (element.length > 0) {
        //creamos un segundo for each para dejar todas las subrazas en un solo array
        element.forEach((subrace) => {
          only_subraces.push(subrace)
        })
      }
    })


    // let subraces = only_subraces.map(function (item) {
    //   let subraces_in_same_array = [];
    //   return item.concat(subraces_in_same_array)
    // })
    
    console.log(only_subraces)
    res.render('all_dogs', {'perros': true, 'dogs': only_dogs, 'races': only_subraces})
  })
});

router.get('/perro/:race', (req, res) => {
  const race = req.params.race;
  const urlAPI = `https://dog.ceo/api/breed/${race}/images/random`;
  axios.get(urlAPI)
  .then(function (response) {
    const img = response.data.message;
    res.render('dog', {'race': race, 'img': img, 'perro': true})
  })
})

router.get('/subperro/:race/:subrace', (req, res) => {
  const race = req.params.race;
  const subrace = req.params.subrace;
  const urlAPI = `https://dog.ceo/api/breed/${race}/${subrace}/images`;
  axios.get(urlAPI)
  .then(function (response) {
    const img = response.data.message;
    console.log(img)
    res.render('')
  })
})

module.exports = router;
