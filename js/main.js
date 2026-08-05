import { request } from "./api.js";

let typeGlobal = "";

async function init() {
    const pokemons = await getPokemons();
    renderPokemon(pokemons);
    getTypesPokemon(pokemons);
    getIdPokemon();
    changeTypeStatus();
}

init();

async function getPokemons() {
    const arr = []
    for(let id = 1; id <= 151; id++) {
        const pokemon = await request(id);
        arr.push(pokemon);
    }
    return arr;
}

function renderPokemon(pokemons) {
    const container = document.querySelector("#container");
    const fragment = document.createDocumentFragment();
    pokemons.forEach(pokemon => {
        const typesHTML = pokemon.types
            .map(type => `<span class='upper type center'>${type.type.name}</span>`)
            .join("");
        let element = document.createElement("div");
        element.className = "card gap-2";
        element.dataset.id = `${pokemon.id}`;
        element.innerHTML = `
        <div>
            <div class='flex'>
                <p class='number'>#${String(pokemon.id).padStart(4, '0')}</p>
                <div class='flex gap type-of-pokemon'>${typesHTML}</div>
            </div>
            <p class='name-card'>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
        </div>
        <div class='box-img'>
            <img src='${pokemon.sprites.other.home.front_default}' class='img-card'>
        </div>
        <div class='box-stats'>
            <div class='flex'>
                <p class='upper text'>attack power</p>
                <p class="power">${pokemon.stats[1].base_stat} / 100 </p>
            </div>
            <div style='width: 100%;height: 5px; background-color:#222429; border-radius: 2rem'>
                <span style='border-radius: 2rem; width: ${pokemon.stats[1].base_stat > 100 ? 100 : pokemon.stats[1].base_stat}%; height: 5px; background-color: #F93A31; display: block'></span>
            </div>
        </div>`;
        fragment.appendChild(element);
    })
    container.appendChild(fragment);
    container.classList.add("content-box");
}

export function getIdPokemon() {
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", () => {
            window.location.href = `view-pokemon.html?id=${card.dataset.id}`;
        })
    })
}

function getTypesPokemon(pokemons) {
    const typeContent = document.querySelector("#types");
    const fragment = document.createDocumentFragment();
    let arrTypes = ["all types", "normal"];
    pokemons.forEach(pokemon => {
        const pokemonTypes = pokemon.types
            .map(type => arrTypes.includes(type.type.name) ? '' : arrTypes.push(type.type.name));
    });

    arrTypes.forEach(type => {
        let create = document.createElement("span");
        create.textContent = type;
        create.textContent == "all types" ? create.className = "active types-pokemons upper" : create.className = "types-pokemons upper";
        fragment.appendChild(create);
    });

    typeContent.appendChild(fragment);
}

function changeTypeStatus() {
    document.querySelectorAll(".types-pokemons").forEach(type => {
        type.addEventListener("click", () => {
            document.querySelectorAll(".types-pokemons").forEach(otherType => {
                otherType.classList.remove("active");
            })
            type.classList.add("active");
            typeGlobal = type.textContent;
            filterByType(typeGlobal);
            searchPokemon(typeGlobal);
        }); 
    })
}

const search = document.querySelector("#searchPok");

function filterByType(type) {
    const pokemonCard = document.querySelectorAll(".card");
    
    if(type == "all types" || type == "") {
        return pokemonCard.forEach(card => card.style.display = "grid");
    }
    
    pokemonCard.forEach(card => {
        let cardTypes = card.querySelectorAll(".type");
        let arrTypes = []
        cardTypes.forEach(type => {
            arrTypes.push(type.textContent);
        })
        
        arrTypes.includes(type) ? card.style.display = "grid" : card.style.display = "none";
    })
}

search.addEventListener("input", () => {
    searchPokemon(typeGlobal)
});

function searchPokemon(type) {
    viewCardsPokemon(type);
}

const noSearch = document.querySelector("#not_found");
noSearch.style.display = "none";

function viewCardsPokemon(type) {
    const pokemonCard = document.querySelectorAll(".card");
    const container = document.querySelector("#container");
    let valueSearch = search.value.trim().toLowerCase();
    let hasMatch = false;
    
    if(valueSearch == "") {
        hasMatch = true;
        hasMatch ? container.style.display = "" : "";
        hasMatch ? noSearch.style.display = "none" : "";
        return filterByType(type);
    }
    
    pokemonCard.forEach(card => {
        let pokemonName = card.querySelector(".name-card").textContent.toLowerCase().split("");
        let pokemonTypes = card.querySelectorAll(".type");
        let arrTypes = []
        pokemonTypes.forEach(typePokemon => arrTypes.push(typePokemon.textContent));
        
        if(type == "" || type == "all types") {
            search.value.trim().toLowerCase().split("").every(element => pokemonName.includes(element)) ? hasMatch = true : card.style.display = "none";
            search.value.trim().toLowerCase().split("").every(element => pokemonName.includes(element)) ? card.style.display = "grid" : card.style.display = "none";
        } else {
            search.value.trim().toLowerCase().split("").every(element => pokemonName.includes(element)) && arrTypes.includes(type) ? hasMatch = true : card.style.display = "none";
            search.value.trim().toLowerCase().split("").every(element => pokemonName.includes(element)) && arrTypes.includes(type) ? card.style.display = "grid" : card.style.display = "none";
        }
    })

    !hasMatch ? container.style.display = "none" : container.style.display = "";
    !hasMatch ? noSearch.style.display = "" : noSearch.style.display  = "none";
}