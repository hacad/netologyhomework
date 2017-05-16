'use strict';

pokemonApp.controller('EditPokemonCtrl', function($scope, $routeParams, PokemonsService) {

    $scope.newPokemon = {};
    $scope.pokemonLoadError = false;
    $scope.pokemonLoaded = false;

    PokemonsService.getPokemon($routeParams['pokemonId']).then(function(response) {
        $scope.newPokemon = response.data;
        $scope.pokemonLoaded = true;
    }, function(response) {
        $scope.pokemonLoadError = true;
    });

    $scope.editPokemon = function(myPokemon) {

        $scope.editSuccess = false;

        PokemonsService.editPokemon(myPokemon).then(function(response) {

            $scope.newPokemon = {};

            $scope.newPokemonId = response.data.objectId;
            $scope.editSuccess = true;

        });

    }

});
