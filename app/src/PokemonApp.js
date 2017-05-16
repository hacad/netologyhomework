var pokemonApp = angular.module('PokemonApp', ['ngRoute', 'btford.socket-io']);

angular
    .module('PokemonApp')

.config(['$routeProvider',
    function config($routeProvider) {

        $routeProvider.
        when('/pokemons', {
            templateUrl: 'src/PokemonList/PokemonList.html',
            controller: 'PokemonListCtrl'
        }).
        when('/pokemons/:pokemonId', {
            templateUrl: 'src/PokemonDetail/PokemonDetail.html',
            controller: 'PokemonDetailCtrl'
        }).
        when('/create', {
            templateUrl: 'src/CreatePokemon/CreatePokemon.html',
            controller: 'CreatePokemonCtrl'
        }).
        when('/realtime/:userName', {
            templateUrl: 'src/PokemonRealtime/PokemonRealtime.html',
            controller: 'PokemonRealtimeCtrl'
        }).
        when('/edit/:pokemonId', {
            templateUrl: 'src/EditPokemon/EditPokemon.html',
            controller: 'EditPokemonCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });

        // var applicationId = '9D0B1B1C-8301-987A-FF30-3304B4C54500';
        // var secretKey = '86710B30-E44B-AC38-FF71-B04327B83D00';
        // Backendless.initApp(applicationId, secretKey);
    }
])

.factory('mySocket', function(socketFactory) {
  var myIoSocket = io.connect('https://netology-socket-io.herokuapp.com/');

    mySocket = socketFactory({
      ioSocket: myIoSocket
    });

    return mySocket;
});
