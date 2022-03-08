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

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // adding details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
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

  function showModal(name, height, image){
    console.log(`show modal function called`);// just for test
    let modalContainer = document.querySelector('#modal-container');
    console.log(`modalContainer: ${modalContainer}`);
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = name;

    let contentElement = document.createElement('p');
    contentElement.innerText = "Height:" + height;

    //rendering an image of pokemon
    let imageElement = document.createElement('img');
    imageElement.classList.add('pokemon-image-class');
    imageElement.src = image;

    console.log(`imageElement.className is: ${imageElement.className}`);

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal(){
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  let modalContainer = document.querySelector('#modal-container');
  window.addEventListener('keydown', (e) =>{
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) =>{
    let target = e.target;
    if (target ===modalContainer){
      hideModal();
    }
  });
  // A return statement that return all the given pokemon
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails
  };

  })();
  console.log(pokemonRepository.getAll());

  // forEach loop to iterate over the pokemon in pokemonList
  pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);

  });
  });
