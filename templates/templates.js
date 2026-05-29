function getPokemonTemplate(pokemonData){
    return `
    <div class="pkmn-card">
        <img src="${pokemonData.sprites.front_default}">
        <h2>${pokemonData.name}</h2>
    </div>`
}