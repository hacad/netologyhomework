const assert = require('assert');

const Pokemon = require('../module1-task1').Pokemon;

describe('Pokemon test suite', () => {
  it('Show_NameAndLevelAreSet_NameLevelShouldBeReturned', () => {
    //arrange
    const pokemon = new Pokemon('test pokemon', 1);
    const expectedInfo = 'test pokemon, level: 1';

    //act
    const actualInfo = pokemon.show();
    
    //assert
    assert(actualInfo == expectedInfo, 'show method returns wrong info');
  });
})