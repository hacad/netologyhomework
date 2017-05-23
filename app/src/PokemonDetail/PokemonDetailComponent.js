'use strict';

pokemonApp.component('pokemonDetail', {
  controller: function PokemonDetailCtrl($routeParams, PokemonsService) {

    var self = this;
    self.pokemonLoaded = false;
    self.notfoundError = true;

    self.pokemon = PokemonsService.get({
        pokemonId: $routeParams['pokemonId']
  }, function(successResult) {
      // Окей!
    self.notfoundError = false;
    self.pokemonLoaded = true;
      self.activeTab = 1;
      self.disableControlTab = true;
    }, function(errorResult) {
        // Не окей..
      self.notfoundError = true;
      self.pokemonLoaded = true;

    });

    self.pokemon.$promise.then(function(result) {
        //self.pokemonLoaded = true;
    });

    self.deletePokemon = function(pokemonId) {
      self.pokemon.$delete({
          pokemonId: pokemonId
      }, function(successResult) {
          // Окей!
          self.deletionSuccess = true;
      }, function(errorResult) {
          // Не окей..
          self.deletionError = true;
      });
    }

  },

  templateUrl: './src/PokemonDetail/pokemonDetail.html'
});