// ===============================
// 📊 VARIABLES GLOBALES
// ===============================

// Almacena todos los datos del CSV
let datos = [];

// Datos después de aplicar filtros
let datosFiltrados = [];

// ===============================
// 📌 ELEMENTOS DEL DOM
// ===============================

const tabla = document.getElementById("tablaDatos");

const filtroAnio = document.getElementById("filtroAnio");
const filtroPais = document.getElementById("filtroPais");
const filtroTipo = document.getElementById("filtroTipo");

// ===============================
// 🚀 INICIALIZACIÓN
// ===============================

// Cargar el CSV automáticamente al abrir la página
document.addEventListener("DOMContentLoaded", cargarCSV);

// ===============================
// 📂 CARGA DEL CSV
// ===============================

function cargarCSV() {
    fetch("documentos/consumption.csv")
        .then(response => response.text())
        .then(texto => procesarCSV(texto))
        .catch(error => console.error("Error cargando el CSV:", error));
}

// ===============================
// 🔄 PROCESAMIENTO DEL CSV
// ===============================

function procesarCSV(texto) {
    // Separar filas y eliminar vacías
    const filas = texto.split("\n").filter(f => f.trim() !== "");

    datos = [];

    // Recorrer filas (ignorando encabezado)
    filas.slice(1).forEach(fila => {
        const col = fila.split(",");

        const pais = col[0]?.trim();
        const anio = col[2]?.trim();

        // Extraer valores de cada tipo de energía
        const biomasa = col[3];
        const solar = col[4];
        const eolica = col[5];
        const hidrica = col[6];

        // Crear registros por tipo de energía (solo si tienen valor)
        if (solar && solar !== "0")
            datos.push({ anio, pais, tipo: "solar", produccion: solar });

        if (eolica && eolica !== "0")
            datos.push({ anio, pais, tipo: "eolica", produccion: eolica });

        if (hidrica && hidrica !== "0")
            datos.push({ anio, pais, tipo: "hidrica", produccion: hidrica });

        if (biomasa && biomasa !== "0")
            datos.push({ anio, pais, tipo: "biomasa", produccion: biomasa });
    });

    // Inicializar tabla con todos los datos
    datosFiltrados = datos;
    mostrarDatos(datosFiltrados);
}

// ===============================
// 📋 MOSTRAR DATOS EN TABLA
// ===============================

let indiceActual = 0;
const paso = 50;

function mostrarDatos(lista, reset = true) {
    if (reset) {
        tabla.innerHTML = "";
        indiceActual = 0;
    }

    const fragmento = document.createDocumentFragment();
    const siguienteLote = lista.slice(indiceActual, indiceActual + paso);

    siguienteLote.forEach(dato => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${dato.anio}</td>
            <td class="fw-bold text-white">${dato.pais}</td>
            <td><span class="badge bg-success text-capitalize bg-opacity-25 text-primary-green border border-success">${dato.tipo}</span></td>
            <td><strong class="text-primary-green">${parseFloat(dato.produccion).toFixed(3)}</strong></td>
        `;
        fragmento.appendChild(tr);
    });

    tabla.appendChild(fragmento);
    indiceActual += paso;

    actualizarBotonCargarMas(lista.length);
}

function actualizarBotonCargarMas(total) {
    let btn = document.getElementById("btnCargarMas");
    if (!btn) {
        btn = document.createElement("button");
        btn.id = "btnCargarMas";
        btn.className = "btn btn-outline-primary mt-3 w-100";
        btn.innerText = "Cargar más registros";
        btn.onclick = () => mostrarDatos(datosFiltrados, false);
        tabla.parentElement.after(btn);
    }
    
    btn.style.display = (indiceActual >= total) ? "none" : "block";
    btn.innerText = `Cargar más (Mostrando ${Math.min(indiceActual, total)} de ${total})`;
}

// ===============================
// 🔎 FILTROS EN TIEMPO REAL
// ===============================

function aplicarFiltros() {
    // Obtener valores de los filtros
    const anio = filtroAnio.value;
    const pais = filtroPais.value.toLowerCase();
    const tipo = filtroTipo.value.toLowerCase();

    // Filtrar datos según criterios
    datosFiltrados = datos.filter(dato => {
        return (
            (anio === "" || dato.anio == anio) &&
            (pais === "" || dato.pais.toLowerCase().includes(pais)) &&
            (tipo === "" || dato.tipo.toLowerCase().includes(tipo))
        );
    });

    // Actualizar tabla con datos filtrados
    mostrarDatos(datosFiltrados);
}

// ===============================
// ⏱️ OPTIMIZACIÓN (DELAY)
// ===============================

let timeout;

// Aplicar filtros con delay para evitar múltiples ejecuciones
function aplicarFiltrosConDelay() {
    clearTimeout(timeout);
    timeout = setTimeout(aplicarFiltros, 300);
}

// ===============================
// 📥 DESCARGA DE DATOS (CSV)
// ===============================

function descargarDatos() {
    if (datosFiltrados.length === 0) {
        Swal.fire('Error', 'No hay datos para descargar', 'error');
        return;
    }

    // Crear encabezado
    let csv = "Año,País,Tipo Energía,Producción (TWh)\n";

    // Agregar filas
    datosFiltrados.forEach(d => {
        csv += `${d.anio},"${d.pais}",${d.tipo},${d.produccion}\n`;
    });

    // Crear blob y descargar
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `datos_energia_${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ===============================
// 🧹 LIMPIAR FILTROS
// ===============================

function limpiarFiltros() {
    filtroAnio.value = "";
    filtroPais.value = "";
    filtroTipo.value = "";
    datosFiltrados = datos;
    mostrarDatos(datosFiltrados);
}

// ===============================
// 🎯 EVENTOS - Conectar filtros
// ===============================

// Filtros en tiempo real
filtroAnio.addEventListener("input", aplicarFiltrosConDelay);
filtroPais.addEventListener("input", aplicarFiltrosConDelay);
filtroTipo.addEventListener("change", aplicarFiltros);
