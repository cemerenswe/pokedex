function getPokemonTemplate(pokemonData) {
  return `
    <div class="pkmn-card" data-id="${pokemonData.id}">
      <span>#${pokemonData.id}</span>
      <img src="${pokemonData.sprites.front_default}">
      <h2>${pokemonData.name}</h2>
      <p>${pokemonData.types[0].type.name}</p>
    </div>`;
}

function getPokemonDialogTemplate(pokemonData) {
  return `
    <button onclick="document.getElementById('pkmnCardDialog').close()">X</button>
    <h2>${pokemonData.name}</h2>
    <span>#${pokemonData.id}</span>
    <img src="${pokemonData.sprites.front_default}">
    <p>Type: ${pokemonData.types[0].type.name}</p>
    <p>Height: ${pokemonData.height}</p>
    <p>Weight: ${pokemonData.weight}</p>
  `;
}
