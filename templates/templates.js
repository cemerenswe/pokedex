function getPokemonTemplate(pokemonData, mainType) {
  return `
  <li>
    <button class="pkmn-card ${mainType}" data-id="card" data-pokemon-id="${pokemonData.id}" aria-label="Open details for ${pokemonData.name}">
      <span>#${pokemonData.id}</span>
      <img
      src="${pokemonData.sprites.front_default}"
      alt="${pokemonData.name}"
      data-id="card-image">
      <h2>${pokemonData.name}</h2>
      <p>${pokemonData.types[0].type.name}</p>
    </button>
  </li>`;
}

function getPokemonDialogTemplate(pokemonData, typesContent, statsContent) {
  return `
    <div class="dialog-wrapper" data-id="overlay-pokemon-name">
      <button 
        class="dialog-close-button" 
        data-id="close-dialog-button"
        aria-label="Close Pokémon details">X</button>
      <span>#${pokemonData.id}</span>
      <h2>${pokemonData.name}</h2>
      <img 
        src="${pokemonData.sprites.other["official-artwork"].front_default}" 
        alt="${pokemonData.name}"
        data-id="dialog-image">
      <div class="type-container">
        ${typesContent}
      </div>
      <div class="pokemon-info-container">
        <div class="pokemon-info-box">
          <span>Height</span>
          <b>${pokemonData.height}</b>
        </div>
        <div class="pokemon-info-box">
            <span>Weight</span>
          <b>${pokemonData.weight}</b>
        </div>
      </div>
      <div class="stats-container">
        ${statsContent}
      </div>
      <div class="dialog-navigation">
        <button data-id="prev-button" aria-label="Previous Pokémon">←</button>
        <button data-id="next-button" aria-label="Next Pokémon">→</button>
      </div>
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
    <p data-id="not-found">No Pokémon found</p>`;
}
