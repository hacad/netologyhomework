const assert = require('assert');

const Pokemon = require('../module1-task1').Pokemon;
const PokemonList = require('../module1-task1').PokemonList;

describe('PokemonList test suite', () => {
  let pokemonList;

  beforeEach(() => {
    pokemonList = new PokemonList();
  });

  it('Add_AddPokemonData_PokemonListShouldContainNewPokemon', () => {
    //act
    pokemonList.add('test pokemon', 1);
    
    //assert
    assert(pokemonList.length == 1, 'PokemonList does not contain pokemon');
    assert(pokemonList[0].name == 'test pokemon' && pokemonList[0].level == 1, 'PokemonList does not contain pokemon');
  });

  it('Max_TwoPokemonWithDifferentLevel_PokemonWithMaxLevelShouldBeReturned', () => {
    //act
    pokemonList.add('test pokemon', 1);
    pokemonList.add('test pokemon 1', 10);
    
    //assert
    const max = pokemonList.max();
    assert(max.name == 'test pokemon 1' && max.level == 10, 'PokemonList does not return max pokemon');
  });
})