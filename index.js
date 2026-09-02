async function cargarDestacadas() {
const container = document.getElementById("destacadas-container");

const { data, error } = await supabaseClient
.from("propiedades")
.select("*")
.eq("destacada", true)
.order("created_at", { ascending: false })
.limit(3);

if (error) {
console.error("Error al cargar destacadas:", error);
return;
}

container.innerHTML = "";

data.forEach(function (propiedad) {
container.innerHTML += `
<article class="propiedad-card">

<div class="imagen-propiedad">
<img src="${propiedad.image_url}" alt="${propiedad.titulo}">
</div>

<h3>
${propiedad.titulo}
</h3>

<p>
${propiedad.ubicacion}
</p>

<p class="precio">
US$ ${Number(propiedad.precio).toLocaleString("es-AR")}
</p>

<a
href="propiedad.html?id=${propiedad.id}"
class="btn"
>
Ver propiedad
</a>

</article>
`;
});
}

cargarDestacadas();

let operacionInicio = "";

document.getElementById("btn-comprar").addEventListener("click", function () {
operacionInicio = "Venta";
});

document.getElementById("btn-alquilar").addEventListener("click", function () {
operacionInicio = "Alquiler";
});

document.getElementById("btn-buscar-inicio").addEventListener("click", function () {

const tipo = document.getElementById("tipo").value;
const ubicacion = document.getElementById("ubicacion").value.trim();
const precio = document.getElementById("precio").value;

const parametros = new URLSearchParams();

if (operacionInicio) {
parametros.set("operacion", operacionInicio);
}

if (tipo !== "Cualquier tipo") {
parametros.set("tipo", tipo);
}

if (ubicacion) {
parametros.set("ubicacion", ubicacion);
}

if (precio) {
parametros.set("precioMaximo", precio);
}

window.location.href = `propiedades.html?${parametros.toString()}`;
});

// ========================================
// TARJETA FLOTANTE - CERRAR Y MINIMIZAR
// ========================================

document.addEventListener("DOMContentLoaded", function () {

const captacion = document.getElementById("captacion-flotante");
const cerrarCaptacion = document.getElementById("cerrar-captacion");
const captacionMinimizada = document.getElementById("captacion-minimizada");

cerrarCaptacion.addEventListener("click", function () {
captacion.style.display = "none";
captacionMinimizada.style.display = "block";
});

captacionMinimizada.addEventListener("click", function () {
captacion.style.display = "block";
captacionMinimizada.style.display = "none";
});

});
