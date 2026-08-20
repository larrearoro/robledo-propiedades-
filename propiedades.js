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

const { data, error } = await supabaseClient
.from("propiedades")
.select("*")
.order("created_at", { ascending: false });

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

cargarPropiedades();
