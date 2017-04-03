const path = require('path');
const fs = require('fs');
const getRandomInt = require('./random');

function checkPath(path, callbackfn){
    const accessPermission = fs.constants.R_OK | fs.constants.W_OK;
    fs.access(path, accessPermission, (err) => {
        callbackfn(err);
    });
}

function getPokemonsToHide(pokemons) {
    const MAX_POKEMONS = 3;

    if(!pokemons) {
        return [];
    }

    if(pokemons.length <= MAX_POKEMONS) {
        return pokemons.slice(0, pokemons.length);
    }

    const pokemonCount = getRandomInt(1, MAX_POKEMONS + 1);
    let pokemonsCopy = JSON.parse(JSON.stringify(pokemons));
    let randomPokemons = [];
    for(let i = 0; i < pokemonCount; i++) {
        let randomIndex = getRandomInt(0, pokemonsCopy.length);
        randomPokemons.push(pokemonsCopy[randomIndex]);
        pokemonsCopy.splice(randomIndex, 1);
    }

    return randomPokemons;
}

function createFolders(rootFolder, callbackfn) {
    const FOLDERS_COUNT = 10;
    let folders = [];
    let successCounter = 0;
    let failureCounter = 0;
    function folderCreated(err, folderPath) {
        if(!err) {
            successCounter++;
            folders.push(folderPath);
        } else {
            failureCounter++;
        }

        if (successCounter + failureCounter >= FOLDERS_COUNT) {
            let error = null;
            if(failureCounter){
                error = new Error(`Only ${successCounter} from ${FOLDERS_COUNT} has been created`);
            }
            callbackfn(error, folders);
        }
    }

    for(let i = 0; i < FOLDERS_COUNT; i++) {
        let folderPath = path.join(rootFolder, ('0' + i).slice(-2));
        fs.mkdir(folderPath, (err) => {
            folderCreated(err, folderPath);
        });
    }
}

function writePokemonData(pokemons, folders, callbackfn) {
    let foldersCopy = folders.map(f => f);
    let randomFolders = []
    for(let i = 0; i < pokemons.length; i++) {
        let folderIndex = getRandomInt(0, folders.length);
        randomFolders.push(foldersCopy[folderIndex]);
        foldersCopy.splice(folderIndex, 1);
    }

    const pokemonsWithFolders = pokemons.map((p, i) => {
        return {"pokemon": p, "folder": randomFolders[i]};
    });

    let writedPokemonsCounter = 0;
    function pokemonDataWrited() {
        writedPokemonsCounter++;
        if(writedPokemonsCounter >= pokemonsWithFolders.length) {
            callbackfn(null, pokemonsWithFolders);
        }
    }
    pokemonsWithFolders.forEach((pw) => {
        const fileName = path.join(pw.folder, "pokemon.txt");
        const conf = {encoding: 'utf8'};
        const data = `${pw.pokemon.name}|${pw.pokemon.level}`;
        fs.writeFile(fileName, data, conf, (err) => {
            pokemonDataWrited(err);
        })
    });
}

function hide(path, pokemons, callbackfn) {
    checkPath(path, (err) => {
        if(err) {
            callbackfn(err);
        }

        createFolders(path, (err, folders) => {
            if(err){
                callbackfn(err);
            }
            
            const pokemonsToHide = getPokemonsToHide(pokemons);
            writePokemonData(pokemonsToHide, folders, callbackfn);
        });
    });
}

function seek(rootFolderPath, callbackfn) {
    checkPath(rootFolderPath, (err) => {
        if(err) {
            callbackfn(err);
        }

        fs.readdir(rootFolderPath, (err, subfolders) => {
            let pokemons = [];
            let counter = 0;    
            subfolders.forEach(folder => {
                const file = path.join(rootFolderPath, folder, 'pokemon.txt');
                const conf = {encoding: 'utf8'};
                fs.readFile(file, conf, (err, data) => {
                    counter++;

                    if(!err) {
                        let pokemonData = data.split('|');
                        pokemons.push({'name': pokemonData[0], 'level': pokemonData[1]});
                    }

                    if(counter >= subfolders.length) {
                        callbackfn(null, pokemons);
                    }

                });
            });
        });
    });
};

exports.hide = hide;
exports.seek = seek;