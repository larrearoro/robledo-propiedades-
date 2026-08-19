async function cargarPropiedades() {
const container = document.getElementById("propiedades-container");

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
container.innerHTML += `
<article class="propiedad-card">

<div class="imagen-propiedad">
Foto de propiedad
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
