//initial declearation of the pokemon
let PokemonList = [
  {
    name:'Bulbasaur',
    height: 0.6,
    type:  ['grass' , 'posion']
  },

  {
    name: 'Nidoqueen',
    height: 0.5,
    type: ['Poison-point', 'Rivalry', 'Sheer-force']
  },

  {
    name: 'Rattata',
    height: 0.4,
    type:['sucker punch' , 'blizzard']
  },

  {
    name:'Blastoise',
    height:0.3,
    type: ['Rain-dish,' , 'Torrent']
  },

  {
    name: 'Pikachu',
    height: 0.5,
    type: ['thundershock' , 'thunder']
  },

  {
    name:'Fearow',
    height: 0.7,
    type: ['Keen-eye,' , 'Sniper']
  },

  {
    name:'Charmeleon',
    height: 1.1,
    type: ['Blaze,' , 'Solar-power']

  }

];

  //added function to return the "pokemonList"
  function getAll() {
    return pokemonList;
  }


console.log(PokemonList);

// In this This Loop + conditional we specify that the pokemon with a height less than 1 should have the message appearing

for (var i = 0; i < PokemonList.length; i++) {
 if (PokemonList[i].height >= 1.0) {
    document.write('<P>' +  PokemonList[i].name + ( ', height: ' )+ PokemonList[i].height + ( " (Wow, that\’s big!)") + '<P>');
 } else {
   document.write('<P>' +  PokemonList[i].name + ( ', height: ' )+ PokemonList[i].height + '<P>')
  }
}
