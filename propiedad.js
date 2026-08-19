async function cargarPropiedad() {

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
console.error("No se encontró el ID de la propiedad");
return;
}

const { data, error } = await supabaseClient
.from("propiedades")
.select("*")
.eq("id", id)
.single();

if (error) {
console.error("Error al cargar propiedad:", error);
return;
}

console.log("PROPIEDAD:", data);
}

cargarPropiedad();
