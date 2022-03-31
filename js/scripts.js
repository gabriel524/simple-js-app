let pokemonRepository = (function() {
  //initial declearation of the pokemon
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
      // an else or otherwise stameent declearation
    } else {
      console.log('pokemon is incorrect');
    }
  }
  // a declearation function statement to get oall the pokemon
  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    listpokemon.classList.add('group-list-item');
    let button = document.createElement('button');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokemonModal');
    button.classList.add('my_button');
    button.innerHTML = pokemon.name;
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    //adding eventhandler to the button which will show the logged pokemon  on click
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  //load data of each pokemon when click on pokemon
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
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
      })
      .catch(function(e) {
        console.error(e);
      });
  }
  //after click on pokemon button,load the data of pokemon from server
  function showDetails(item) {
    loadDetails(item).then(function() {
      showModal(item);
    });
  }
  //makes each String start with uppercase letter
  function uniqueCasing(item) {
    return item.charAt(0).toUpperCase() + item.slice(1);
  }

  function findSpecificPokemon(searchName) {
    $('.pokemon-list').empty();
    pokemonList.forEach(pokemon => {
      if (uniqueCasing(pokemon.name).indexOf(uniqueCasing(searchName)) > -1) {
        addListItem(pokemon);
      }
    });
  }
  // showModal function
  function showModal(item) {
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');

    let pokemonName = $('<h1>' + item.name + '</h1>');

    let pokemonHeight = $('<p>' + 'Height: ' + item.height + '</p>');

    let pokemonWeight = $('<p>' + 'Weight: ' + item.weight + '</p>');

    let pokemonTypes = $('<p>' + 'Types: ' + item.types + '</p>');

    let pokemonAbilities = $('<p>' + 'Abilities: ' + item.abilities + '</p>');

    let pokemonImage = $('<img class="modal-image" style="width:35%">');
    pokemonImage.attr('src', item.imageUrl); // pokemon image attribute loaded from 'item.imageUrl'

    modalTitle.empty(); // clears the modalTitle after display
    modalBody.empty(); // clears the modalBody after display

    modalTitle.append(pokemonName);
    modalBody.append(pokemonImage);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonWeight);
    modalBody.append(pokemonTypes);
    modalBody.append(pokemonAbilities);
  }
  // A return statement that return all the given pokemon
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    findSpecificPokemon: findSpecificPokemon
  };
})(); //end of IIFE
console.log(pokemonRepository.getAll());

// forEach loop to iterate over the pokemon in pokemonList
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
