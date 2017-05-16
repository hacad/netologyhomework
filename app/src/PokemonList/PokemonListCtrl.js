'use strict';

pokemonApp.controller('PokemonListCtrl', function($scope, $q, PokemonsService, BerriesService) {

    // PokemonsService.getPokemons().then(function(response) {
    //     $scope.pokemons = response.data.results;
    // });
    //
    // BerriesService.getBerries().then(function(response) {
    //     $scope.berries = response.data.results;
    // });

    $scope.pokemonsLoaded = false;
    $scope.pokemonsLoadError = false;

    $scope.berriesLoaded = false;
    $scope.berriesLoadError = false;

    // PokemonsService.getPokemons().then(function(response) {
    //     //$scope.pokemons = response.data.results;
    //     $scope.pokemons = response.data;
    //     $scope.pokemonsLoaded = true;

    //     return BerriesService.getBerries()
    // },function(err) {
    //     $scope.pokemonsLoadError = true;
    // }).then(function(response) {
    //     $scope.berries = response.data.results;
    //     $scope.berriesLoaded = true;
    // }, function(err){
    //     $scope.berriesLoadError = true;
    // });

    var pokemonsRequest = PokemonsService.getPokemons();
    var berriesRequest = BerriesService.getBerries();

    $q.all([pokemonsRequest, berriesRequest]).then(function(values){
        $scope.pokemons = values[0].data;
        $scope.pokemonsLoaded = true;

        $scope.berries = values[1].data;
        $scope.berriesLoaded = true;
    }, function(values){
         $scope.pokemonsLoadError = true;
         $scope.berriesLoadError = true;
    });


});
