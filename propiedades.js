async function cargarPropiedades(filtros = {}) {
const container = document.getElementById("propiedades-container");

  const operacion = filtros.operacion || "";
const tipo = filtros.tipo || "";
const ubicacion = filtros.ubicacion || "";
const precioMinimo = filtros.precioMinimo || "";
const precioMaximo = filtros.precioMaximo || "";
const dormitorios = filtros.dormitorios || "";
const banos = filtros.banos || "";
const cochera = filtros.cochera || "";

let consulta = supabaseClient
.from("propiedades")
.select("*")
.order("created_at", { ascending: false });

if (operacion && operacion !== "Comprar o alquilar") {
consulta = consulta.eq("operacion", operacion);
}

if (tipo && tipo !== "Todos") {
consulta = consulta.eq("tipo", tipo);
}

if (ubicacion) {
consulta = consulta.ilike("ubicacion", `%${ubicacion}%`);
}

if (precioMinimo) {
consulta = consulta.gte("precio", Number(precioMinimo));
}

if (precioMaximo) {
consulta = consulta.lte("precio", Number(precioMaximo));
}

if (dormitorios && dormitorios !== "Cualquier cantidad") {
const cantidad = Number(dormitorios.replace("+", ""));
consulta = consulta.gte("dormitorios", cantidad);
}

if (banos && banos !== "Cualquier cantidad") {
const cantidad = Number(banos.replace("+", ""));
consulta = consulta.gte("banos", cantidad);
}

if (cochera && cochera !== "Indistinto") {
consulta = consulta.eq("cochera", cochera === "Sí");
}

const { data, error } = await consulta;

if (error) {
console.error("Error al cargar propiedades:", error);
return;
}

container.innerHTML = "";

data.forEach(function (propiedad) {
  console.log("PROPIEDAD:", propiedad);
container.innerHTML += `
<article class="propiedad-card">

<div class="imagen-propiedad">
<img src="${propiedad.image_url}" alt="${propiedad.titulo}">
</div>

<div class="contenido-propiedad">

<span class="tipo">
${propiedad.operacion}
</span>

<h3>
${propiedad.titulo}
</h3>

<p class="ubicacion">
📍 ${propiedad.ubicacion}
</p>

<p class="precio">
US$ ${Number(propiedad.precio).toLocaleString("es-AR")}
</p>

<p>
${propiedad.descripcion}
</p>

<a
href="propiedad.html?id=${propiedad.id}"
class="btn"
>
Ver propiedad
</a>

</div>

</article>
`;
});
}

const parametros = new URLSearchParams(window.location.search);

const filtrosIniciales = {
operacion: parametros.get("operacion") || "",
tipo: parametros.get("tipo") || "",
ubicacion: parametros.get("ubicacion") || "",
precioMaximo: parametros.get("precioMaximo") || ""
};

if (
filtrosIniciales.operacion ||
filtrosIniciales.tipo ||
filtrosIniciales.ubicacion ||
filtrosIniciales.precioMaximo
) {
cargarPropiedades(filtrosIniciales);
} else {
cargarPropiedades();
}

document.getElementById("btn-buscar").addEventListener("click", function () {

const filtros = {
operacion: document.getElementById("operacion").value,
tipo: document.getElementById("tipo-propiedad").value,
ubicacion: document.getElementById("ubicacion-propiedad").value.trim(),
precioMinimo: document.getElementById("precio-minimo").value,
precioMaximo: document.getElementById("precio-maximo").value,
dormitorios: document.getElementById("dormitorios").value,
banos: document.getElementById("banos").value,
cochera: document.getElementById("cochera").value
};

cargarPropiedades(filtros);
});
