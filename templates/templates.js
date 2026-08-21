function getPokemonTemplate(pokemonData, mainType, typesContent) {
  return `
    <li>
      <button
        class="pkmn-card ${mainType}"
        data-id="card"
        data-pokemon-id="${pokemonData.id}"
        aria-label="Open details for ${pokemonData.name}">
        ${getPokemonCardContentTemplate(pokemonData, typesContent)}
      </button>
    </li>`;
}

function getPokemonCardContentTemplate(pokemonData, typesContent) {
  return `
    <span>#${pokemonData.id}</span>
    ${getPokemonCardImageTemplate(pokemonData)}
    <span class="pkmn-card-title">${pokemonData.name}</span>
    <span class="type-container">
      ${typesContent}
    </span>`;
}

function getPokemonCardImageTemplate(pokemonData) {
  return `
    <img
      src="${pokemonData.sprites.front_default}"
      alt="${pokemonData.name}"
      data-id="card-image">`;
}

function getPokemonDialogTemplate(pokemonData, typesContent, statsContent) {
  return `
    <div class="dialog-wrapper" data-id="overlay-pokemon-name">
      ${getDialogHeaderTemplate(pokemonData)}
      <div class="type-container">${typesContent}</div>
      ${getPokemonInfoTemplate(pokemonData)}
      <div class="stats-container">
        ${statsContent}
      </div>
      ${getDialogNavigationTemplate()}
    </div>`;
}

function getDialogHeaderTemplate(pokemonData) {
  return `
    ${getCloseDialogButtonTemplate()}
    <span>#${pokemonData.id}</span>
    <h2>${pokemonData.name}</h2>
    <img
      src="${pokemonData.sprites.other["official-artwork"].front_default}"
      alt="${pokemonData.name}"
      data-id="dialog-image">`;
}

function getCloseDialogButtonTemplate() {
  return `
    <button
      class="dialog-close-button"
      data-id="close-dialog-button"
      aria-label="Close Pokémon details">X</button>`;
}

function getPokemonInfoTemplate(pokemonData) {
  return `
    <div class="pokemon-info-container">
      <div class="pokemon-info-box">
        <span>Height</span>
        <b>${pokemonData.height}</b>
      </div>
      <div class="pokemon-info-box">
        <span>Weight</span>
        <b>${pokemonData.weight}</b>
      </div>
    </div>`;
}

function getDialogNavigationTemplate() {
  return `
    <div class="dialog-navigation">
      <button data-id="prev-button" aria-label="Previous Pokémon">←</button>
      <button data-id="next-button" aria-label="Next Pokémon">→</button>
    </div>`;
}

function getTypeBadgeTemplate(type) {
  return `
    <span class="type-badge ${type}">
      ${type}
    </span>`;
}

function getStatTemplate(statName, statValue) {
  return `
    <div class="stat-row">
      <span>${statName}</span>
      <div class="stat-bar">
        <div class="stat-fill" style="width: ${statValue}%"></div>
      </div>
      <span>${statValue}</span>
    </div>`;
}

function getNoResultsTemplate() {
  return `
    <li>
      <p data-id="not-found">No Pokémon found</p>
    </li>`;
}
