'use strict';

'use strict';

import header from "./modules/header.js";
import characters from "./modules/characters.js";

const documentReady = () => {
  header();
  characters();
};

document.addEventListener('DOMContentLoaded', documentReady);

//await esperar para obtener el dato
        /*
        const response = await fetch('https://rickandmortyapi.com/api/character/?page=1');//End point
        const data = await response.json();// Espera y parsea a json
        characters(data);
        */
       /* Axios
        axios.get('https://rickandmortyapi.com/api/character/?page=1')
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
        */