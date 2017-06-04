const PokemonListPageObject = require('./PokemonListPageObject');

describe('Pokemon list', function() {
  it('should add pokemon to cart', function() {
    const pokemonList = new PokemonListPageObject();
    pokemonList.get();
    pokemonList.addPokemonToCart();
    expect(pokemonList.getCartItemsCount()).toBe(1);
  });

  it('should display all pokemons', function() {
    const pokemonList = new PokemonListPageObject();
    pokemonList.get();
    expect(pokemonList.getListItemsCount()).toBe(835);
  })
});