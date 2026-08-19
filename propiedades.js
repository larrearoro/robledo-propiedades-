async function cargarPropiedades() {
const { data, error } = await supabaseClient
.from("propiedades")
.select("*")
.order("created_at", { ascending: false });

if (error) {
console.error("Error al cargar propiedades:", error);
return;
}

console.log("Propiedades cargadas:", data);
}

cargarPropiedades();
