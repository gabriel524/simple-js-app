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

function loadDetails(item) {
  let url = item.detailsUrl;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {
    /// Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
      item.abilities = [];
      for (let i = 0; i < details.abilities.length; i++) {
        item.abilities.push(details.abilities[i].ability.name);
      }
    }).catch(function (e) {
      console.error(e);
    });
  }
  //called when a user clicks on a pokemon button; gets pokemon details from the server
function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
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
  let modalHeader = $('.modal-header')
  // let modalHeader = $(".modal-header"); // no header so removed
  modalTitle.empty();
  modalBody.empty();

  let nameElement = $('<h1>' + item.name + '</h1>');

  let imageElementFront = $('<img class="modal-img" style="width:50%">');

  imageElementFront.attr('scr', item.imageUrlFront);  // Front of pokemon image attribute loaded from 'item.imageUrl'
  let imageElementBack = $('<img class="modal-img" style="width:50%">');

  imageElementBack.attr('scr', item.imageUrlBack); // Back of pokemon image attribute loaded from 'item.imageUrl'
  // creating element for the height of the modal content
  let pokemonHeight = $('<p>' + 'Height: ' + item.height + '</p>');

  let pokemonWeight = $('<p>' + 'Weight: ' + item.weight + '</p>');

  let pokemonTypes = $('<p>' + 'Types: ' + item.types + '</p>');

  let pokemonAbilities = $('<p>' + 'Abilities: ' + item.abilities + '</p>');

  modalTitle.empty(); // clears the modalTitle after display
  modalBody.empty(); // clears the modalBody after display

  modalTitle.append(nameElement); // pokemonName is displayed as the title in the modal
  modalBody.append(imageElementFront); // pokemonImage is displayed in the body of the modal
  modalBody.append(imageElementBack); // pokemonHeight is displayed in the body of the modal
  modalBody.append(pokemonHeight); // pokemonHeight is displayed in the body of the modal
  modalBody.append(pokemonWeight);
  modalBody.append(pokemonTypes);// pokemonWeight is displayed in the body of the modal
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
