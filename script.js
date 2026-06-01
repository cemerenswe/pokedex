function onLoadFunc() {
  loadPkmn();
}

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

let allPkmn = {};

async function getPkmn(id) {
  if (allPkmn[id]) {
    return allPkmn[id];
  }

  let response = await fetch(BASE_URL + id);
  let pokemonData = await response.json();

  allPkmn[id] = pokemonData;
  return pokemonData;
}

let currentStart = 40;
let amount = 20;

async function loadPkmn() {
  let content = "";
  for (let i = currentStart; i < currentStart + amount; i++) {
    let pokemonData = await getPkmn(i);
    content += getPokemonTemplate(pokemonData);
  }
  currentStart += amount;
  document.getElementById("pokemonContainer").innerHTML += content;
}

document.getElementById("load-more-button").addEventListener("click", loadPkmn);
