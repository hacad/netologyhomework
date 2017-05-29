class Pokemon {
  constructor(name, level) {
    this.name = name;
    this.level = level;
  }
    
  show(){
    let info = `${this.name}, level: ${this.level}`;
    console.log(info);
    return info;
  }

  valueOf() {
    return this.level;
  }
}

class PokemonList extends Array {
  constructor(){
    super();
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

exports.Pokemon = Pokemon;
exports.PokemonList = PokemonList;