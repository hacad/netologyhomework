describe('PokemonList', function(){
  let ctrl, cartStore, service, q, rootScope, controller;
  beforeEach(module('myApp'));
  beforeEach(inject(($controller, PokemonService, ShoppingCartStore, $q, $rootScope) => {
    rootScope = $rootScope;
    q = $q;
    service = PokemonService;
    cartStore = ShoppingCartStore;
    controller = $controller;
  }));

  it('should add pokemon with ShoppingCartStore.addItem', function(){
    const stub = sinon.stub(cartStore, 'addItem');
    const ctrl = controller('PokemonListCtrl', {'PokemonService': service, 'ShoppingCartStore': cartStore});
    
    ctrl.addToCart({id: 1, name: 'test', weight: 1});

    sinon.assert.calledOnce(stub);
  });

  it('should display all pokemons', function() {
    const scope = rootScope.$new();
    const stub = sinon.stub(service, 'getPokemons').returns(q.when({data: [{name: 'test'}]}));
    const ctrl = controller('PokemonListCtrl', {'PokemonService': service, 'ShoppingCartStore': cartStore, $scope: scope});
    
    scope.$digest();
    
    sinon.assert.calledOnce(stub);
    expect(ctrl.pokemons.length).toBe(1);
    expect(ctrl.pokemons[0].name).toBe('test');
  });

});