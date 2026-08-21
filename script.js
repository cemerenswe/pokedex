function onLoadFunc() {
  loadPkmn();
  addCardClickEvents();
  addSearchEvent();
  addSearchInputEvent();
  addDialogOutsideClickEvent();
}

const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

let allPkmn = {};
let loadedPkmn = [];
let currentPkmnId = null;
let currentStart = 1;
let amount = 20;
let isLoading = false;

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
  if (isLoading) return;
  startLoading();
  try {
    let content = await loadPokemonBatch();
    document.getElementById("pokemonContainer").innerHTML += content;
    currentStart += amount;
  } catch (error) {
    console.error(error);
  } finally {
    finishLoading();
  }
}

function startLoading() {
  isLoading = true;
  document.getElementById("load-more-button").disabled = true;
  showLoadingScreen();
}

function finishLoading() {
  hideLoadingScreen();
  isLoading = false;
  document.getElementById("load-more-button").disabled = false;
}

async function loadPokemonBatch() {
  let content = "";
  for (let i = currentStart; i < currentStart + amount; i++) {
    let pokemonData = await getPkmn(i);
    loadedPkmn.push(pokemonData);
    let mainType = getMainType(pokemonData);
    let typesContent = renderPokemonTypes(pokemonData);
    content += getPokemonTemplate(pokemonData, mainType, typesContent);
  }
  return content;
}

function addCardClickEvents() {
  document
    .getElementById("pokemonContainer")
    .addEventListener("click", function (event) {
      let card = event.target.closest(".pkmn-card");

      if (card) {
        let pokemonId = card.dataset.pokemonId;
        openPkmnDialog(pokemonId);
      }
    });
}

function addSearchEvent() {
  document
    .querySelector('[data-id="search-button"]')
    .addEventListener("click", function () {
      let searchValue = document.querySelector(
        '[data-id="search-input"]',
      ).value;
      filterPkmn(searchValue);
    });
}

function addSearchInputEvent() {
  document
    .querySelector('[data-id="search-input"]')
    .addEventListener("input", function (event) {
      let searchValue = event.target.value.trim();
      if (searchValue.length === 0) {
        renderPokemonCards(loadedPkmn);
      }
      let searchButton = document.querySelector('[data-id="search-button"]');
      searchButton.disabled = searchValue.length < 3;
    });
}

function filterPkmn(searchValue) {
  searchValue = searchValue.toLowerCase().trim();
  if (searchValue.length < 3) {
    renderPokemonCards(loadedPkmn);
    return;
  }
  let filteredPkmn = loadedPkmn.filter(function (pokemon) {
    return pokemon.name.includes(searchValue);
  });
  renderSearchResults(filteredPkmn);
}

function renderSearchResults(filteredPkmn) {
  if (filteredPkmn.length === 0) {
    document.getElementById("pokemonContainer").innerHTML =
      getNoResultsTemplate();
    return;
  }
  renderPokemonCards(filteredPkmn);
}

function renderPokemonCards(pokemonArray) {
  let content = "";
  for (let i = 0; i < pokemonArray.length; i++) {
    let pokemonData = pokemonArray[i];
    let mainType = getMainType(pokemonData);
    let typesContent = renderPokemonTypes(pokemonData);
    content += getPokemonTemplate(pokemonData, mainType, typesContent);
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
  let dialog = renderPkmnDialog(pkmnData);
  if (!dialog.open) {
    dialog.showModal();
  }
  addDialogClickEvents();
}

function renderPkmnDialog(pkmnData) {
  let typesContent = renderPokemonTypes(pkmnData);
  let statsContent = renderPokemonStats(pkmnData);
  let dialog = document.getElementById("pkmnCardDialog");
  dialog.innerHTML = getPokemonDialogTemplate(
    pkmnData,
    typesContent,
    statsContent,
  );
  return dialog;
}

function closePkmnDialog() {
  document.getElementById("pkmnCardDialog").close();
}

function addDialogClickEvents() {
  addCloseDialogEvent();
  addPrevDialogEvent();
  addNextDialogEvent();
}

function addCloseDialogEvent() {
  document
    .querySelector('[data-id="close-dialog-button"]')
    .addEventListener("click", closePkmnDialog);
}

function addPrevDialogEvent() {
  let prevButton = document.querySelector('[data-id="prev-button"]');
  if (currentPkmnId === 1) {
    prevButton.disabled = true;
  }
  prevButton.addEventListener("click", function () {
    if (currentPkmnId > 1) {
      openPkmnDialog(currentPkmnId - 1);
    }
  });
}

function addNextDialogEvent() {
  document
    .querySelector('[data-id="next-button"]')
    .addEventListener("click", function () {
      openPkmnDialog(currentPkmnId + 1);
    });
}

function showLoadingScreen() {
  document
    .querySelector('[data-id="loading-screen"]')
    .classList.remove("d-none");
}

function hideLoadingScreen() {
  document.querySelector('[data-id="loading-screen"]').classList.add("d-none");
}

function addDialogOutsideClickEvent() {
  let dialog = document.getElementById("pkmnCardDialog");
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
      closePkmnDialog();
    }
  });
}

document.getElementById("load-more-button").addEventListener("click", loadPkmn);
