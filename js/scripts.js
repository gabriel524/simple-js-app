//  wrappeding pokemon into an IIFE and created new variable "pokemonRepository"
let pokemonRepository = (function () {
    let pokemonList = [];
    let modalContainer = document.querySelector('#innerHTMLeModal');

    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon
        )   {
            pokemonList.push(pokemon);
        }   else {
            console.log('Pokemon is incorrect');
        }
    }

    function getAll() {
        return pokemonList;
    }
    let pokemonRepository = document.getElementById('pokemonRepository');

    let fetchPokemon = () => {
        const promises = [];
        for (let i = 1; i <= 150; i++) {
            let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            promises.push(fetch(url).then((res) => res.json()));
        }
        Promise.all(promises).then((results) => {
            const pokemon = results.map((result) => ({
                name: result.name,
                image: result.sprites['front_default'],
                type: result.types.map((type) => type.type.name).join(', '),
                id: result.id

            }));
            showPokemon(pokemon);
        });
    };

    const showPokemon = (pokemon) => {
        console.log(pokemon);
        const pokemonHTMLString = pokemon
            .map(
                (pokeman) => `
            <li class="card">
                <img class="card-image" src="${pokeman.image}"/>
                <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
                <p class="card-subtitle">Type: ${pokeman.type}</p>
            </li>
        `
          )
            .join('');
         pokemonRepository.innerHTML = pokemonHTMLString;
        };

    fetchPokemon(pokemonRepository);

    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal

    };
})();

// forEach loop to iterate over the pokemon in pokemonList
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.fatchPokemon(pokemon);
        pokemonRepository.addListItem(pokemon);
    });
});
