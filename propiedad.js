async function cargarPropiedad() {

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
console.error("No se encontró el ID de la propiedad");
return;
}

const { data: propiedad, error } = await supabaseClient
.from("propiedades")
.select("*")
.eq("id", id)
.single();

if (error) {
console.error("Error al cargar propiedad:", error);
return;
}

console.log("PROPIEDAD:", propiedad);

document.querySelector(".info-propiedad h1").textContent =
propiedad.titulo;

document.querySelector(".precio").textContent =
propiedad.precio;

document.querySelector(".ubicacion").textContent =
"📍 " + propiedad.ubicacion;

const caracteristicas =
document.querySelectorAll(".caracteristicas div");

caracteristicas[0].querySelector("strong").textContent =
propiedad.dormitorios;

caracteristicas[1].querySelector("strong").textContent =
propiedad.banos;

caracteristicas[2].querySelector("strong").textContent =
propiedad.superficie + " m²";

caracteristicas[3].querySelector("strong").textContent =
propiedad.cochera;

const fotoPrincipal =
document.querySelector(".foto-principal");

fotoPrincipal.innerHTML = `
<img src="${propiedad.image_url}" alt="${propiedad.titulo}">
`;
}

cargarPropiedad();
