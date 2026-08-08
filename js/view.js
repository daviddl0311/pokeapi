import { request } from "./api.js";

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

const pokemon = await request(id);

const view = document.querySelector("#viewPokemon");

function init() {
    const typesPokemon = pokemon.types
        .map(type => `<span class='upper type'>${type.type.name}</span>`)
        .join("");
    const statPokemon = pokemon.stats
        .map(stats =>
            `<div>
                <div class='flex'>
                    <p class='upper poke-title-info'>${stats.stat.name.toUpperCase()}</p>
                    <span class='number-2'>${stats.base_stat}</span>
                </div>
                <div style='width: 100%;height: 5px; background-color:#222429; border-radius: 2rem; margin-top: .5rem'>
                    <span style='border-radius: 2rem; width: ${stats.base_stat * 2}px; height: 5px; background-color: #F93A31; display: block'></span>
                </div>
            </div>`
        )
        .join("");
    const abilitiesPokemon = pokemon.abilities
        .map(abi =>
            `<p class='poke-abilitie'>${abi.ability.name.charAt(0).toUpperCase() + abi.ability.name.slice(1)}</p>`
        )
        .join("");

    view.innerHTML = `
        <div class='pokemon-box-info'>
            <div class='pokemon-info'>
                <p class='pokemon-id'>#${String(pokemon.id).padStart('4', 0)}</p>
                <h2 class='pokemon-name'>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                <div class='flex-view gap'>
                    ${typesPokemon}
                </div>
            </div>
            <div class='pokemon-info-2'>
                <div class='grid-view gap-3'>
                    <p class='upper poke-title-info'>height</p>
                    <span class='poke-text-info'>${pokemon.height / 10} m</span>
                </div>
                <div class='grid-view gap-3'>
                    <p class='upper poke-title-info'>weight</p>
                    <span class='poke-text-info'>${pokemon.weight / 10} kg</span>
                </div>
                <div class='grid-view gap-3'>
                    <p class='upper poke-title-info'>base xp</p>
                    <span class='poke-text-info'>${pokemon.base_experience}</span>
                </div>
                <div class='grid-view gap-3'>
                    <p class='upper poke-title-info'>order</p>
                    <span class='poke-text-info'>${pokemon.id}</span>
                </div>
            </div>
            <div class='pokemon-info-3'>
                <h2 class='upper poke-title-info'>parametros vitales</h2>
                <div class='grid-view gap'>
                    ${statPokemon}
                </div>
            </div>
            <div class='pokemon-info-4'>
                <h2 class='upper poke-title-info'>habilidades</h2>
                <div class='grid-view gap box-ability'>
                    ${abilitiesPokemon}
                </div>
            </div>
        </div>
        <div class='pokemon-box-img center'><img src='${pokemon.sprites.other.home.front_default}' class='pokemon-img'></div>
    `;
}

init();