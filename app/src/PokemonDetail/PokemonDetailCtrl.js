'use strict';

pokemonApp.controller('PokemonDetailCtrl', function($scope, $routeParams, PokemonsService) {

    $scope.pokemonLoaded = false;

    PokemonsService.getPokemon($routeParams['pokemonId']).then(function(response) {
        $scope.pokemon = response.data;
        $scope.pokemonLoaded = true;
    });

    $scope.deletePokemon = function(pokemonId) {

        $scope.deletionError = false;
        $scope.deletionSuccess = false;

        PokemonsService.deletePokemon(pokemonId).then(function successCallback(response) {

            // Окей!
            $scope.deletionSuccess = true;

        }, function errorCallback(response) {

            // Не окей..
            $scope.deletionError = true;
        });

    }

    $scope.editPokemon = function(pokemonData){
        
        $scope.editError = false;
        $scope.editSuccess = false;

        PokemonsService.editPokemon(pokemonData).then(function successEditCallback(response){
            $scope.editSuccess = true;
        }, function errorEditCallback(response) {
            $scope.editError = true;
        });
    }

});
