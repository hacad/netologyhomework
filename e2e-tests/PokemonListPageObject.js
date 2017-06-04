class PokemonListPageObject {
  get() {
    browser.get('http://localhost:8000/#!/list');
  }

  getCartItemsCount() {
    //return element.all(by.repeater('(singlePokemonIndex, singlePokemonValue) in $ctrl.cartItems')).count();
    return element.all(by.css('.container .list-group:first-child .list-group-item')).count();
  }

  addPokemonToCart() {
    element(by.css('.container .list-group:nth-child(2) .list-group-item:first-child button')).click();
  }

  getListItemsCount() {
    return element.all(by.css('.container .list-group:nth-child(2) .list-group-item')).count();
  }
}

module.exports = PokemonListPageObject;