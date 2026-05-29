function onLoadFunc(){
    loadPkmn()
}

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

let allPkmn = {};

async function loadPkmn() {
    let content = "";
    for (let i = 40; i < 60; i++) {
        let response = await fetch(BASE_URL + i);
        let pokemonData = await response.json();
        content += getPokemonTemplate(pokemonData);
    }
    document.getElementById("pokemonContainer").innerHTML += content;
} 



