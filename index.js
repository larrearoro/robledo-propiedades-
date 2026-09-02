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

const rect = captacion.getBoundingClientRect();

captacion.style.display = "none";

captacionMinimizada.style.position = "fixed";
captacionMinimizada.style.left = rect.left + "px";
captacionMinimizada.style.top = rect.top + "px";
captacionMinimizada.style.right = "auto";
captacionMinimizada.style.bottom = "auto";

captacionMinimizada.style.display = "block";
});
  
captacionMinimizada.addEventListener("click", function () {
captacion.style.display = "block";
captacionMinimizada.style.display = "none";
});

});

// ========================================
// TARJETA FLOTANTE - ARRASTRAR
// ========================================

document.addEventListener("DOMContentLoaded", function () {

const tarjetaCaptacion =
document.getElementById("captacion-flotante");

let moviendoCaptacion = false;
let offsetX = 0;
let offsetY = 0;

tarjetaCaptacion.addEventListener("pointerdown", function (e) {

if (
e.target.closest(".cerrar-captacion") ||
e.target.closest(".btn-captacion")
) {
return;
}

moviendoCaptacion = true;

const rect = tarjetaCaptacion.getBoundingClientRect();

offsetX = e.clientX - rect.left;
offsetY = e.clientY - rect.top;

tarjetaCaptacion.style.left = rect.left + "px";
tarjetaCaptacion.style.top = rect.top + "px";
tarjetaCaptacion.style.right = "auto";
tarjetaCaptacion.style.bottom = "auto";

tarjetaCaptacion.setPointerCapture(e.pointerId);
});

tarjetaCaptacion.addEventListener("pointermove", function (e) {

if (!moviendoCaptacion) return;

let nuevaX = e.clientX - offsetX;
let nuevaY = e.clientY - offsetY;

const maxX =
window.innerWidth - tarjetaCaptacion.offsetWidth;

const maxY =
window.innerHeight - tarjetaCaptacion.offsetHeight;

nuevaX = Math.max(0, Math.min(nuevaX, maxX));
nuevaY = Math.max(0, Math.min(nuevaY, maxY));

tarjetaCaptacion.style.left = nuevaX + "px";
tarjetaCaptacion.style.top = nuevaY + "px";
});

tarjetaCaptacion.addEventListener("pointerup", function () {
moviendoCaptacion = false;
});

tarjetaCaptacion.addEventListener("pointercancel", function () {
moviendoCaptacion = false;
});

});
