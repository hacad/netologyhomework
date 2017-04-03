const hidenseek = require('./hidenseek');
const getRandomInt = require('./random');
const fs = require('fs');

const rootFolder = './field';
const MIN_LEVEL = 0;
const MAX_LEVEL = 10;
const pokemonData = [
    {name: 'pokemon 0', level: getRandomInt(MIN_LEVEL, MAX_LEVEL)},
    {name: 'pokemon 1', level: getRandomInt(MIN_LEVEL, MAX_LEVEL)},
    {name: 'pokemon 2', level: getRandomInt(MIN_LEVEL, MAX_LEVEL)},
    {name: 'pokemon 3', level: getRandomInt(MIN_LEVEL, MAX_LEVEL)},
    {name: 'pokemon 4', level: getRandomInt(MIN_LEVEL, MAX_LEVEL)},
    {name: 'pokemon 5', level: getRandomInt(MIN_LEVEL, MAX_LEVEL)}
];

fs.mkdir(rootFolder, (err) => {
    if(err) {
        console.log('Can\'t create folder. Please ensure you have permissions or remove it')
        console.log(err);

        return;
    }
    hidenseek.hide(rootFolder, pokemonData, (err, hidedPokemons) => {
        if(err) {
            console.log(err);
        } else {
            console.log('Hided pokemons:')
            hidedPokemons.forEach((p) => console.log(`Pokemon: ${p.pokemon.name} is hided in folder ${p.folder}`));
        }

        hidenseek.seek(rootFolder, (err, pokemons) => {
            console.log('Found pokemons:')
            pokemons.forEach((p) => console.log(`name: ${p.name}, level:  ${p.level}`));    
        });
    });

});
