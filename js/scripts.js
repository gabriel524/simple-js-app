let pokemonRepository = (function () {

//initial declearation of the pokemon
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

//addedin a function that add new pokemen to the "pokemonList"
function add(pokemon) {
  //checking for only certain properties to be accepted when new pokemon is added
 if (
   typeof pokemon === "object" &&
   "name" in pokemon
 ) {
   pokemonList.push(pokemon);
   // an else or otherwise stameent declearation
 } else {
   console.log("pokemon is incorrect");
 }
}
// a declearation function statement to get oall the pokemon
function getAll() {
 return pokemonList;
}

function showDetails(pokemon) {
  console.log(pokemon);
  }

function addListItem(pokemon) {
  let pokemonList = document.querySelector(".pokemon-list");
  let listpokemon = document.createElement("li");
  let button = document.createElement("button");
  // creating text of pkemon inside the button element
  button.innerText = pokemon.name;
  button.classList.add("my_button");
  listpokemon.appendChild(button);
  pokemonList.appendChild(listpokemon);
  //adding eventhandler to the button which will show the logged pokemon  on click
  button.addEventListener("click", function(event) {
    showDetails(pokemon);
    });
  }

function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }




// A return statement that return all the given pokemon
return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  showDetails: showDetails,
  loadList: loadList

};

})();

console.log(pokemonRepository.getAll());

// forEach loop to iterate over the pokemon in pokemonList
pokemonRepository.loadList().then(function() {
pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.add(pokemon);{
  pokemonRepository.addListItem(pokemon);
  pokemonRepository.showDetails(pokemon);
};
});
});
