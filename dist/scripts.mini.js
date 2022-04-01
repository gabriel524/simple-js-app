let pokemonRepository = (function() {
  let t = [],
    e = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  function n(e) {
    'object' == typeof e && 'name' in e
      ? t.push(e)
      : console.log('pokemon is incorrect');
  }
  function o(t) {
    let e = document.querySelector('.pokemon-list'),
      n = document.createElement('li');
    n.classList.add('group-list-item');
    let o = document.createElement('button');
    o.setAttribute('data-toggle', 'modal'),
      o.setAttribute('data-target', '#pokemonModal'),
      o.classList.add('my_button'),
      (o.innerHTML = t.name),
      n.appendChild(o),
      e.appendChild(n),
      o.addEventListener('click', function(e) {
        l(t);
      });
  }
  function i(t) {
    let e = t.detailsUrl;
    return fetch(e)
      .then(function(t) {
        return t.json();
      })
      .then(function(e) {
        (t.imageUrl = e.sprites.front_default),
          (t.height = e.height),
          (t.weight = e.weight),
          (t.types = []);
        for (let n = 0; n < e.types.length; n++)
          t.types.push(e.types[n].type.name);
        t.abilities = [];
        for (let n = 0; n < e.abilities.length; n++)
          t.abilities.push(e.abilities[n].ability.name);
      })
      .catch(function(t) {
        console.error(t);
      });
  }
  function l(t) {
    i(t).then(function() {
      !(function(t) {
        let e = $('.modal-title'),
          n = $('.modal-body'),
          o = $('<h1>' + t.name + '</h1>'),
          i = $('<p>Height: ' + t.height + '</p>'),
          l = $('<p>Weight: ' + t.weight + '</p>'),
          a = $('<p>Types: ' + t.types + '</p>'),
          p = $('<p>Abilities: ' + t.abilities + '</p>'),
          s = $('<img class="modal-image" style="width:35%">');
        s.attr('src', t.imageUrl),
          e.empty(),
          n.empty(),
          e.append(o),
          n.append(s),
          n.append(i),
          n.append(l),
          n.append(a),
          n.append(p);
      })(t);
    });
  }
  function a(t) {
    return t.charAt(0).toUpperCase() + t.slice(1);
  }
  return {
    add: n,
    getAll: function() {
      return t;
    },
    addListItem: o,
    loadList: function() {
      return fetch(e)
        .then(function(t) {
          return t.json();
        })
        .then(function(t) {
          t.results.forEach(function(t) {
            n({ name: t.name, detailsUrl: t.url });
          });
        })
        .catch(function(t) {
          console.error(t);
        });
    },
    loadDetails: i,
    showDetails: l,
    findSpecificPokemon: function(e) {
      $('.pokemon-list').empty(),
        t.forEach(t => {
          a(t.name).indexOf(a(e)) > -1 && o(t);
        });
    }
  };
})();
console.log(pokemonRepository.getAll()),
  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(t) {
      pokemonRepository.addListItem(t);
    });
  });
