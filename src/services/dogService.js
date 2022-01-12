const axios = require('axios');

class DogService {
  
  constructor() {
    this.dogs = [];
    this.breeds = []
  }

  getDogs(url) {
    return new Promise((accept, reject) => {
      axios.get(url)
      .then(
        function (response) {
          let all_dogs = response.data.message;
          let only_dogs = Object.keys(all_dogs);
          if (only_dogs) {
            accept(only_dogs);
          }
        }
      )
      .catch(
        function (error) {
          console.log(error);
        }
      )
    })
  }

  async getBreeds() {

  }
}

module.exports = DogService;

/*await axios.get(url)
.then(
  (response) => {
    //console.log(response.data.message)
    let all_dogs = response.data.message;
    let only_dogs = JSON.stringify(Object.keys(all_dogs));
    //console.log(only_dogs);
    return only_dogs;
  }
)
.catch(
  (error) => {
    console.log(error);
  }
)*/