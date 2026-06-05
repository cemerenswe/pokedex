function onLoadFunc() {
  loadPkmn();
  addCardClickEvents();
  addSearchEvent();
}

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

let allPkmn = {};
let loadedPkmn = [];
let currentPkmnId = null;
let currentStart = 1;
let amount = 20;

async function getPkmn(id) {
  if (allPkmn[id]) {
    return allPkmn[id];
  }

  let response = await fetch(BASE_URL + id);
  let pokemonData = await response.json();

  allPkmn[id] = pokemonData;
  return pokemonData;
}

function getMainType(pokemonData) {
  return pokemonData.types[0].type.name;
}

async function loadPkmn() {
  let content = "";
  for (let i = currentStart; i < currentStart + amount; i++) {
    let pokemonData = await getPkmn(i);
    loadedPkmn.push(pokemonData);
    let mainType = getMainType(pokemonData);
    content += getPokemonTemplate(pokemonData, mainType);
  }
  currentStart += amount;
  document.getElementById("pokemonContainer").innerHTML += content;
}

function addCardClickEvents() {
  document
    .getElementById("pokemonContainer")
    .addEventListener("click", function (event) {
      let card = event.target.closest(".pkmn-card");

      if (card) {
        let pokemonId = card.dataset.id;
        openPkmnDialog(pokemonId);
      }
    });
}

function addSearchEvent() {
  document
    .querySelector('[data-id="search-input"]')
    .addEventListener("input", function (event) {
      filterPkmn(event.target.value);
    });
}

function filterPkmn(searchValue){
  let filteredPkmn = loadedPkmn.filter(function(pokemon){
    return pokemon.name.includes(searchValue.toLowerCase());
  });
  renderPokemonCards(filteredPkmn);
}

function renderPokemonCards(pokemonArray) {
  let content = "";
  for (let i = 0; i < pokemonArray.length; i++) {
    let pokemonData = pokemonArray[i];
    let mainType = getMainType(pokemonData);
    content += getPokemonTemplate(pokemonData, mainType);
  }

  document.getElementById("pokemonContainer").innerHTML = content;
}  

function renderPokemonTypes(pokemonData) {
  let content = "";
  for (let i = 0; i < pokemonData.types.length; i++) {
    let type = pokemonData.types[i].type.name;
    content += getTypeBadgeTemplate(type);
  }
  return content;
}

function renderPokemonStats(pokemonData) {
  let content = "";
  for (let i = 0; i < pokemonData.stats.length; i++) {
    let statName = pokemonData.stats[i].stat.name;
    let statValue = pokemonData.stats[i].base_stat;
    content += getStatTemplate(statName, statValue);
  }
  return content;
}

async function openPkmnDialog(id) {
  currentPkmnId = Number(id);
  let pkmnData = await getPkmn(id);
  let typesContent = renderPokemonTypes(pkmnData);
  let statsContent = renderPokemonStats(pkmnData);
  let dialog = document.getElementById("pkmnCardDialog");
  dialog.innerHTML = getPokemonDialogTemplate(
    pkmnData,
    typesContent,
    statsContent,
  );
  if (!dialog.open) {
    dialog.showModal();
  }
  addDialogClickEvents();
}

function closePkmnDialog() {
  document.getElementById("pkmnCardDialog").close();
}

function addDialogClickEvents() {
  document
    .querySelector('[data-id="close-dialog-button"]')
    .addEventListener("click", closePkmnDialog);
  document
    .querySelector('[data-id="prev-button"]')
    .addEventListener("click", function () {
      openPkmnDialog(currentPkmnId - 1);
    });
  document
    .querySelector('[data-id="next-button"]')
    .addEventListener("click", function () {
      openPkmnDialog(currentPkmnId + 1);
    });
}

document.getElementById("load-more-button").addEventListener("click", loadPkmn);
