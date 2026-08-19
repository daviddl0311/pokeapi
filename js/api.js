const API_URL = "https://pokeapi.co/api/v2/pokemon"

export async function request(id) {
    const response = await fetch(`${API_URL}/${id}`);

    if(!response.ok) {
        throw new Error("Información no encontrada.");
    }

    return await response.json();
}