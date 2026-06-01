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
  addCardClickEvents();
}

function addCardClickEvents() {
  let cards = document.querySelectorAll(".pkmn-card");
  for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function () {
      let pokemonId = this.dataset.id;
        openPkmnDialog(pokemonId);
    });
}}

async function openPkmnDialog(id) {
    let pkmnData = await getPkmn(id);
    document.getElementById("pkmnCardDialog").innerHTML = 
    getPokemonDialogTemplate(pkmnData);
    document.getElementById("pkmnCardDialog").showModal();
}

document.getElementById("load-more-button").addEventListener("click", loadPkmn);
