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

// ========================================
// BOTÓN MINIMIZADO - MOVER Y ABRIR
// ========================================

document.addEventListener("DOMContentLoaded", function () {

const botonMinimizado =
document.getElementById("captacion-minimizada");

const captacion =
document.getElementById("captacion-flotante");

let arrastrando = false;
let seMovio = false;

let inicioX = 0;
let inicioY = 0;

let offsetX = 0;
let offsetY = 0;

botonMinimizado.addEventListener("pointerdown", function (e) {

e.preventDefault();

arrastrando = true;
seMovio = false;

inicioX = e.clientX;
inicioY = e.clientY;

const rect = botonMinimizado.getBoundingClientRect();

offsetX = e.clientX - rect.left;
offsetY = e.clientY - rect.top;

botonMinimizado.style.left = rect.left + "px";
botonMinimizado.style.top = rect.top + "px";
botonMinimizado.style.right = "auto";
botonMinimizado.style.bottom = "auto";

botonMinimizado.setPointerCapture(e.pointerId);
});

botonMinimizado.addEventListener("pointermove", function (e) {

if (!arrastrando) return;

const distanciaX = Math.abs(e.clientX - inicioX);
const distanciaY = Math.abs(e.clientY - inicioY);

if (distanciaX > 5 || distanciaY > 5) {
seMovio = true;
}

if (!seMovio) return;

let nuevaX = e.clientX - offsetX;
let nuevaY = e.clientY - offsetY;

const maxX =
window.innerWidth - botonMinimizado.offsetWidth;

const maxY =
window.innerHeight - botonMinimizado.offsetHeight;

nuevaX = Math.max(0, Math.min(nuevaX, maxX));
nuevaY = Math.max(0, Math.min(nuevaY, maxY));

botonMinimizado.style.left = nuevaX + "px";
botonMinimizado.style.top = nuevaY + "px";
});

botonMinimizado.addEventListener("pointerup", function () {

if (!arrastrando) return;

arrastrando = false;

if (!seMovio) {

const rect = botonMinimizado.getBoundingClientRect();

captacion.style.left = rect.left + "px";
captacion.style.top = rect.top + "px";
captacion.style.right = "auto";
captacion.style.bottom = "auto";

captacion.style.display = "block";
botonMinimizado.style.display = "none";
}
});

botonMinimizado.addEventListener("pointercancel", function () {
arrastrando = false;
});

});

// ========================================
// FORMULARIO - ABRIR Y CERRAR
// ========================================

document.addEventListener("DOMContentLoaded", function () {

const btnCaptacion =
document.getElementById("btn-captacion");

const modalCaptacion =
document.getElementById("modal-captacion");

const cerrarFormulario =
document.getElementById("cerrar-formulario");

btnCaptacion.addEventListener("click", function () {
modalCaptacion.style.display = "block";
});

cerrarFormulario.addEventListener("click", function () {
modalCaptacion.style.display = "none";
});

});

// ========================================
// FORMULARIO - ENVIAR POR WHATSAPP
// ========================================

document.addEventListener("DOMContentLoaded", function () {

const formulario =
document.getElementById("formulario-propiedad");

formulario.addEventListener("submit", function (e) {

e.preventDefault();

const operacion =
document.getElementById("operacion-captacion").value;

const tipo =
document.getElementById("tipo-captacion").value;

const ubicacion =
document.getElementById("ubicacion-captacion").value;

const dormitorios =
document.getElementById("dormitorios-captacion").value;

const banos =
document.getElementById("banos-captacion").value;

const superficie =
document.getElementById("superficie-captacion").value;

const precio =
document.getElementById("precio-captacion").value;

const cochera =
document.getElementById("cochera-captacion").value;

const aptaBanco =
document.getElementById("banco-captacion").value;

const nombre =
document.getElementById("nombre-captacion").value;

const whatsapp =
document.getElementById("whatsapp-captacion").value;

const comentarios =
document.getElementById("comentarios-captacion").value;

const mensaje = `
🏠 *Nueva consulta de propiedad*

*Sobre la propiedad:*

Operación: ${operacion}
Tipo: ${tipo}
Ubicación: ${ubicacion}
Dormitorios: ${dormitorios || "No especificado"}
Baños: ${banos || "No especificado"}
Superficie: ${superficie ? superficie + " m²" : "No especificada"}
Precio pretendido: ${precio || "No especificado"}
Cochera: ${cochera || "No especificado"}
Apta banco: ${aptaBanco || "No sé"}

*Datos de contacto:*

Nombre y apellido: ${nombre}
WhatsApp: ${whatsapp}

*Comentarios:*

${comentarios || "Sin comentarios"}
`;

const numero =
"5492216244453";

const url =
"https://api.whatsapp.com/send?phone=" +
numero +
"&text=" +
encodeURIComponent(mensaje);

window.open(url, "_blank");

});

});
