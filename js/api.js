const API_URL = "https://pokeapi.co/api/v2/pokemon"

export async function request(id_pokemon) {
    const response = await fetch(`${API_URL}/${id_pokemon}`);

    if(!response.ok) {
        throw new Error("Información no encontrada.");
    }

    return await response.json();
}