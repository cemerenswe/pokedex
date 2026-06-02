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
  return `<div class="dialog-wrapper">
    <button onclick="document.getElementById('pkmnCardDialog').close()">X</button>
    <span>#${pokemonData.id}</span>
    <h2>${pokemonData.name}</h2>
    <img src="${pokemonData.sprites.front_default}">
    <p>Type: ${pokemonData.types[0].type.name}</p>
    <p>Height: ${pokemonData.height}</p>
    <p>Weight: ${pokemonData.weight}</p>
    <div>
  `;
}
