function getPokemonTemplate(pokemonData) {
  return `
    <div class="pkmn-card">
      <span>#${pokemonData.id}</span>
      <img src="${pokemonData.sprites.front_default}">
      <h2>${pokemonData.name}</h2>
      <p>${pokemonData.types[0].type.name}</p>
    </div>`;
}
