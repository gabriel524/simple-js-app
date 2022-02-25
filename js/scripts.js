let pokemonRepository = (function () {

  //initial declearation of the pokemon
  let pokemonList = [
    {
      name:'Bulbasaur',
      height: 0.6,
      type:  ['grass' , 'posion']
    },

    {
      name: 'Nidoqueen',
      height: 0.5,
      type: ['Poison-point' , 'Rivalry' , 'Sheer-force']
    },

    {
      name: 'Rattata',
      height: 0.4,
      type:['sucker punch' , 'blizzard']
    },

    {
      name:'Blastoise',
      height:0.3,
      type: ['Rain-dish' , 'Torrent']
    },

    {
      name: 'Pikachu',
      height: 0.5,
      type: ['thundershock' , 'thunder']
    },

    {
      name:'Fearow',
      height: 1.6,
      type: ['Keen-eye' , 'Sniper']
    },

    {
      name:'Charmeleon',
      height: 0.7,
      type: ['Blaze' , 'Solar-power']

    },

    {
      name:'Snorlax',
      height: 2.11,
      type: ['Normal']

    },

    {
      name:'Charizard',
      height: 5.07,
      type: ['fire' , 'flying']

    },

    {
      name:'Squirtle',
      height: 1.08,
      type: ['Water']

    },

    {
      name:'Vivillon',
      height: 3,
      type: ['Bug', 'Flying']

    },

    {
      name:'Weedle',
      height: 1.00,
      type: ['Bug' , 'Posion']

    },

    {
      name:'Metapod',
      height: 2.04,
      type: ['Bug']

    },

    {
      name:'Lucario',
      height: 1.19,
      type: ['Fighting' , 'Steel']

    },

    {
      name:'Garchomp',
      height: 1.9,
      type: ['Ground' , 'Dragon']

    },

    {
      name:'Eevee',
      height: 30.5,
      type: ['Normal']

    },

    {
      name:'Gyarados',
      height: 6.5,
      type: ['Flying' , 'Water']

    },
    {
      name:'Mew',
      height: 40.6,
      type: ['Psychic']

    },

    {
      name:'Gastrodon',
      height: 88.9,
      type: ['Water' , 'Ground']

    },

    {
      name:'Greninja',
      height: 1.5,
      type: ['Dark' , 'Water']

    },

    {
      name:'Gardevoir',
      height: 1.6,
      type: ['Psychic' , 'Fairy']

    },
    {
      name:'Togekiss',
      height: 8.7,
      type: ['Fairy' , 'Flying']

    },
    {
      name:'Mewtwo',
      height: 0.7,
      type: ['Dark', 'Bug', 'Ghost']

    },
    {
      name:'Budew',
      height: 20.3,
      type: ['Grass', 'Poison']

    },
    {
      name:'Riolu',
      height: 71.1,
      type: ['Fighting']

    },
    {
      name:'Palkia',
      height: 4.19,
      type: ['Water', 'Dragon']

    },
    {
      name:'Roselia',
      height: 30.5,
      type: ['Grass' , 'Poison']

    },
    {
      name:'Quagsire',
      height: 1.4,
      type: ['Ground' , 'Water']

    },

    {
      name:'Torterra',
      height: 2.21,
      type: ['Grass' , 'Ground']

    }

  ];
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
    function addListItem(pokemon){
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
    function showDetails(pokmon){
      console.log(pokemonRepository);
    }
  // A return statement that return all the given pokemon
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails

  };


})();
pokemonRepository.add({name: "Bulbasaur", height: 0.6, types: ['grass', 'posion']});

console.log(pokemonRepository.getAll());

// forEach loop to iterate over the pokemon in pokemonList
 pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.add(pokemon);{
    pokemonRepository.addListItem(pokemon);
    pokemonRepository.showDetails(pokemon);

  };
});
