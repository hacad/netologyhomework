class Pokemon {
  constructor(name, level) {
    this.name = name;
    this.level = level;
  }
    
  show(){
    console.log(`${this.name}, level: ${this.level}`);
  }

  valueOf() {
    return this.level;
  }
}

class PokemonList extends Array {
  constructor(arr){
    super();

    this.push(arr);
  }

  add(name, level) {
    const newPokemon = new Pokemon(name, level);
    this.push(newPokemon);
  }
 
  addPokemon(newPokemon) {
    this.push(newPokemon);
  }

  remove(pokemon) {
    const index = this.findIndex((findPokemon) => {
      return findPokemon.name === pokemon.name && findPokemon.level === pokemon.level;
    });

    if(index < 0){
      return;
    }

    let removedItems = this.splice(index, 1);
    if(removedItems && removedItems.length){
      return removedItems[0];
    }
  }

  show() {
    console.log(`lenght: ${this.length}; content:`);
    this.forEach((pokemon) => pokemon.show());
  }

  clear() {
    this.length = 0;
  }

  max() {
    return this.reduce((previous, current) => {
      return previous - current > 0? previous : current;
    }, 0);
  }
}

function printPokemonList(listName, listPokemons) {
  console.log(`***${listName} pokemons***`);
  listPokemons.show();
  console.log('\n')
}

function printMaxPokemons(lost, found){
  console.log('***Max pokemons***');

  console.log('Max pokemon of lost');
  var maxLost = lost.max();
  maxLost.show();

  console.log('Max pokemon of found');
  var maxFound = found.max();
  maxFound.show();
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const MIN_LEVEL = 0;
const MAX_LEVEL = 10;

const pokemonData = [
  {name: 'pokemon 0', level: getRandomInt(MIN_LEVEL, MAX_LEVEL)},
  {name: 'pokemon 1', level: getRandomInt(MIN_LEVEL, MAX_LEVEL)},
  {name: 'pokemon 2', level: getRandomInt(MIN_LEVEL, MAX_LEVEL)},
  {name: 'pokemon 3', level: getRandomInt(MIN_LEVEL, MAX_LEVEL)},
  {name: 'pokemon 4', level: getRandomInt(MIN_LEVEL, MAX_LEVEL)},
  {name: 'pokemon 5', level: getRandomInt(MIN_LEVEL, MAX_LEVEL)}
];

let pokemonArray = pokemonData.map((pokemon) => new Pokemon(pokemon.name,pokemon.level));

let found = new PokemonList(...pokemonArray.splice(0, 3));
found.add('pokemon 6', getRandomInt(MIN_LEVEL, MAX_LEVEL));

let lost = new PokemonList(...pokemonArray.slice(0, pokemonArray.length));
lost.add('pokemon 7', getRandomInt(MIN_LEVEL, MAX_LEVEL));

console.log('Pokemon lists before moving survived pokemons:');
printPokemonList('lost', lost);
printPokemonList('found', found);

let survivedPokemon = lost[0];
console.log(`Get pokemon ${survivedPokemon.name} to survive`);
console.log('\n')

lost.remove(survivedPokemon);
found.addPokemon(survivedPokemon);

console.log('Pokemon lists after moving survived pokemons:');
printPokemonList('lost', lost);
printPokemonList('found', found);

printMaxPokemons(lost, found);