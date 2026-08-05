import { request } from "./api.js";

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

const pokemon = await request(id);

document.write(pokemon.name);
console.log(pokemon.name);