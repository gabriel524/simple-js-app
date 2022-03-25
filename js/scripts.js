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

function addListItem(pokemon) {
  let pokemonList = document.querySelector(".pokemon-list");
  let listpokemon = document.createElement("li");
  listpokemon.classList.add("group-list-item");
  let button = document.createElement("button");
  button.setAttribute("data-toggle", "modal");
  button.setAttribute("data-target", "#pokemonModal");
  // creating text of pkemon inside the button element
  button.classList.add("my_button");
  let imageElementFront = document.createElement("img");
  let imageElementBack = document.createElement("img");
  button.innerHTML = pokemon.name;
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

//load data of each pokemon when click on pokemon
function loadDetails(item) {
  let url = item.detailsUrl;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {
    // Now we add the details to the item
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.weight = details.weight;
    item.types = [];
    for (let i = 0; i < details.types.length; i++) {
      item.types.push(details.types[i].type.name);
    }
    item.abilities = [];
    for (let i = 0; i < details.abilities.length; i++) {
      item.abilities.push(details.abilities[i].ability.name);
    }
  }).catch(function (e) {
    console.error(e);
  });
}
//after click on pokemon button,load the data of pokemon from server
function showDetails(item) {
  loadDetails(item).then(function () {
    showModal(item);
  });
}
function findAllPokemon(searchName) {
   // Clear all the buttons on the page when user types in search box
   $(".pokemon-list").empty();
 }

function showModal(item) {
  // showModal function
  let modalTitle = $('.modal-title'); // modalTitle
  let modalBody = $('.modal-body'); // modalBody
  // let modalHeader = $(".modal-header"); // no header so removed

  let pokemonName = $('<h1>' + item.name + '</h1>');

  let pokemonHeight = $('<p>' + 'Height: ' + item.height + '</p>');

  let pokemonWeight = $('<p>' + 'Weight: ' + item.weight + '</p>');
  console.log(item.types);

  let pokemonTypes = $('<p>' + 'Types: ' + item.types + '</p>');

  let pokemonAbilities = $('<p>' + 'Abilities: ' + item.abilities + '</p>');

  let pokemonImage = $('<img class="modal-image" style="width:35%">');
  pokemonImage.attr('src', item.imageUrl); // pokemon image attribute loaded from 'item.imageUrl'

  modalTitle.empty(); // clears the modalTitle after display
  modalBody.empty(); // clears the modalBody after display

  modalTitle.append(pokemonName); // pokemonName is displayed as the title in the modal
  modalBody.append(pokemonImage); // pokemonImage is displayed in the body of the modal
  modalBody.append(pokemonHeight); // pokemonHeight is displayed in the body of the modal
  modalBody.append(pokemonWeight); // pokemonWeight is displayed in the body of the modal
  modalBody.append(pokemonTypes);
  modalBody.append(pokemonAbilities); // pokemonDetails are displayed in the body of the modal
}
  // A return statement that return all the given pokemon
return {
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails
};
})();//end of IIFE
  console.log(pokemonRepository.getAll());

// forEach loop to iterate over the pokemon in pokemonList
pokemonRepository.loadList().then(function() {
pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);

});
});
