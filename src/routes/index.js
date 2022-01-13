const express = require('express');
const axios = require('axios');
const router = express.Router();

//HOME
router.get('/', (req, res) => {
  res.render('index', {'index': true})
});

//TODAS LAS RAZAS Y SUBRAZAS DE PERROS
router.get('/perros', (req, res) => {
  var document;
    let all_dogs = [];
    let all_dogs_array = [];
    let dog_list_with_subraces = [];
    let dog_list_only_subrace = [];
    let only_dogs;
    let all_subraces = [];
    const urlAPI = 'https://dog.ceo/api/breeds/list/all';
    axios.get(urlAPI)
    .then(function (response) {
      all_dogs = response.data.message;
      //razas
      only_dogs = Object.keys(all_dogs);
  
      for (let i in all_dogs) {
        all_dogs_array.push([i, all_dogs[i]])
      }
      //console.log(all_dogs_array)
      
      all_dogs_array.forEach(function(element, index) {
        if(all_dogs_array[index][1].length > 0) {
  
          dog_list_with_subraces.push(element)
        }
      })
      
      dog_list_with_subraces.forEach(function (element, index) {
        dog_list_only_subrace.push(dog_list_with_subraces[index][0])
      })
  
      console.log(dog_list_only_subrace)
      
      let only_races = Object.values(all_dogs);
      //creamos un for each para solo seleccionar arrays con uno o más elementos para las subrazas
      let only_subraces = [];
      only_races.forEach((element) => {
        if (element.length > 0) {
       //creamos un segundo for each para dejar todas las subrazas en un solo array
          element.forEach((subrace) => {
          only_subraces.push(subrace)
          })
        }
      })
      res.render('all_dogs', {'perros': true, 'dogs': only_dogs, 'subraces': only_subraces})
    })
  });

//DETALLE RAZA DEL PERRO
router.get('/perro/:race', (req, res) => {
  const race = req.params.race;
  const urlAPI = `https://dog.ceo/api/breed/${race}/images/random`;
  const urlAPISubrace = `https://dog.ceo/api/breed/{${race}}/list`
  axios.get(urlAPI)
  .then(function (response) {
    const img = response.data.message;
    res.render('dog', {'race': race, 'img': img, 'perro': true})
  })

})

//DETALLE SUBRAZA DEL PERRO
router.get('/subperro/:race/:subrace', (req, res) => {
  const race = req.params.race;
  const subrace = req.params.subrace;
  const urlAPI = `https://dog.ceo/api/breed/${race}/${subrace}/images/random`;
  axios.get(urlAPI)
  .then(function (response) {
    const img = response.data.message;
    console.log(img)
    res.render('sub_race', {subrace, img})
  })
})

module.exports = router;