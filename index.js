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
