//b328997@mvrht.net
//qwerty
//https://backendless.com/docs/rest/doc.html
angular
    .module('PokemonApp')
    .factory('PokemonsService', function($http) {

            var url = 'https://api.backendless.com/9D0B1B1C-8301-987A-FF30-3304B4C54500/FE511CC7-571C-1737-FFAD-0A504FC67600/data/pokemon';
            var applicationId = '9D0B1B1C-8301-987A-FF30-3304B4C54500';
            var apiKey = 'FE511CC7-571C-1737-FFAD-0A504FC67600';
            return {

                getPokemons: function() {
                    return $http.get(url);
                },

                getPokemon: function(pokemonId) {
                    return $http.get(url + '/' + pokemonId);
                },

                createPokemon: function(pokemonData) {
                    return $http({
                        method: 'POST',
                        url: url,
                        data: pokemonData
                    });

                },

                editPokemon: function(pokemonData) {
                    return $http({
                        method: 'PUT',
                        url: url + '/' + pokemonData.objectId,
                        data: pokemonData
                    });
                },

                deletePokemon: function(pokemonId) {
                    return $http({
                        method: 'DELETE',
                        url: url + '/' + pokemonId
                    });
                }

            }

        }

    );
