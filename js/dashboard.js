// ===============================
// 📊 VARIABLES GLOBALES Y CONFIG CHART.JS
// ===============================
let datos = [];
let chartBarras, chartTorta, chartLinea;

// Tema oscuro por defecto para Chart.js
Chart.defaults.color = '#8d9c91';
Chart.defaults.borderColor = 'rgba(0, 230, 92, 0.05)';
Chart.defaults.font.family = "'Inter', sans-serif";

// ===============================
// 🚀 INICIO - Cargar datos al abrir la página
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    cargarCSV();
    setupScrollAnimations();

    // Lógica del botón de información con "Carisma"
    const btnAyuda = document.getElementById('btnAyuda');
    if (btnAyuda) {
        btnAyuda.addEventListener('click', () => {
            Swal.fire({
                title: '<strong style="color: #00e65c">Guía del Explorador Solar</strong>',
                icon: 'info',
                background: '#121413',
                color: '#f0fdf4',
                html: `
                    <div style="text-align: left; font-size: 0.95rem;">
                        <p>¡Bienvenido! Este panel analiza el <strong>consumo de energía secundaria</strong> (TWh) proveniente de fuentes renovables.</p>
                        <hr style="border-color: rgba(0, 230, 92, 0.2)">
                        <ul>
                            <li><strong style="color: #00e65c">Bioenergía:</strong> Combustibles orgánicos (madera, residuos).</li>
                            <li><strong style="color: #00b347">Solar/Eólica:</strong> Las estrellas de la transición energética.</li>
                            <li><strong>TWh:</strong> 1 Teravatio-hora equivale a mil millones de kWh.</li>
                        </ul>
                        <p class="mt-3" style="color: #8d9c91"><i>"El sol proporciona en un día más energía de la que el mundo consume en un año."</i></p>
                    </div>
                `,
                confirmButtonText: '¡A explorar!',
                confirmButtonColor: '#00e65c',
                showClass: { popup: 'animate__animated animate__zoomIn' },
                hideClass: { popup: 'animate__animated animate__zoomOut' }
            });
        });
    }
});

// ===============================
// 🎭 ANIMACIONES SCROLL
// ===============================
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('chart-container')) {
                    animateChart(entry.target);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .zoom-in, .chart-container').forEach(el => {
        observer.observe(el);
    });
}

function animateChart(container) {
    const canvas = container.querySelector('canvas');
    if (canvas) {
        container.style.opacity = '0';
        container.style.transform = 'translateY(20px)';
        setTimeout(() => {
            container.style.transition = 'all 0.6s ease-out';
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, 100);
    }
}

// ===============================
// 📂 CARGAR ARCHIVO CSV
// ===============================
function cargarCSV() {
    fetch("documentos/consumption.csv")
        .then(res => res.text())
        .then(texto => procesarCSV(texto))
        .catch(error => console.error("Error al cargar CSV:", error));
}

// ===============================
// 🔄 PROCESAR DATOS DEL CSV
// ===============================
function procesarCSV(texto) {
    const filas = texto.split("\n").slice(1);

    filas.forEach(fila => {
        const col = fila.split(",");
        if(col.length < 7) return;

        const pais = col[0];
        const anio = col[2];

        const solar = parseFloat(col[4]) || 0;
        const eolica = parseFloat(col[5]) || 0;
        const hidrica = parseFloat(col[6]) || 0;
        const biomasa = parseFloat(col[3]) || 0;

        datos.push({ pais, anio, solar, eolica, hidrica, biomasa });
    });

    llenarSelects();
}

// ===============================
// 🔽 LLENAR SELECTORES DE PAÍS Y AÑO
// ===============================
function llenarSelects() {
    const paises = [...new Set(datos.map(d => d.pais))].sort();
    const anios = [...new Set(datos.map(d => d.anio))].sort().reverse(); 

    paises.forEach(p => {
        document.getElementById("pais").innerHTML += `<option value="${p}">${p}</option>`;
    });

    anios.forEach(a => {
        document.getElementById("anio").innerHTML += `<option value="${a}">${a}</option>`;
    });

    actualizarGraficos();
}

// ===============================
// 📊 ACTUALIZAR TODOS LOS GRÁFICOS
// ===============================
function actualizarGraficos() {
    const pais = document.getElementById("pais").value;
    const anio = document.getElementById("anio").value;

    const dato = datos.find(d => d.pais == pais && d.anio == anio);
    if (!dato) return;

    const valores = [dato.solar, dato.eolica, dato.hidrica, dato.biomasa];

    actualizarWidgets(dato, anio, pais);
    crearGraficoBarras(valores);
    crearGraficoTorta(valores);
    crearGraficoLinea(pais);
}

function actualizarWidgets(dato, anio, pais) {
    const total = dato.solar + dato.eolica + dato.hidrica + dato.biomasa;
    document.getElementById("totalRenovable").innerText = total.toFixed(2) + " TWh";
    document.getElementById("anioDisplay").innerText = anio;

    const fuentes = [
        { nombre: 'Solar', valor: dato.solar },
        { nombre: 'Eólica', valor: dato.eolica },
        { nombre: 'Hídrica', valor: dato.hidrica },
        { nombre: 'Biomasa', valor: dato.biomasa }
    ];
    const principal = fuentes.reduce((prev, current) => (prev.valor > current.valor) ? prev : current);
    document.getElementById("fuentePrincipal").innerText = principal.nombre;

    mostrarInsight(pais, anio, principal, total);
}

function mostrarInsight(pais, anio, principal, total) {
    const insightText = document.getElementById("insightText");
    let mensaje = "";

    if (total > 100) {
        mensaje = `<strong class="text-white">${pais}</strong> es un gigante energético en ${anio}, con un consumo renovable masivo.`;
    } else if (principal.nombre === 'Solar' && principal.valor > 0) {
        mensaje = `En ${anio}, la <strong class="text-primary">energía solar</strong> lideró la carga verde en ${pais}, ¡un paso brillante hacia el futuro!`;
    } else if (total === 0) {
        mensaje = `Sin consumo renovable registrado para ${pais} en ${anio}.`;
    } else {
        mensaje = `${pais} está diversificando su matriz en ${anio}. La fuente principal es la <strong class="text-primary">energía ${principal.nombre}</strong>.`;
    }

    insightText.innerHTML = mensaje;
}

// PALETA GREEN DARK THEME
const COLORS = {
    solar: '#00e65c',   // vibrant green
    eolica: '#00cc55',  // emerald
    hidrica: '#009933', // deep green
    biomasa: '#006622'  // dark green
};

// ===============================
// 📊 GRÁFICO DE BARRAS
// ===============================
function crearGraficoBarras(valores) {
    if (chartBarras) chartBarras.destroy();
    
    // Gradiente para barras
    const ctx = document.getElementById("graficoBarras").getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, COLORS.solar);
    gradient.addColorStop(1, COLORS.hidrica);

    chartBarras = new Chart(document.getElementById("graficoBarras"), {
        type: "bar",
        data: {
            labels: ["Solar", "Eólica", "Hídrica", "Biomasa"],
            datasets: [{
                label: "Producción (TWh)",
                data: valores,
                backgroundColor: [COLORS.solar, COLORS.eolica, COLORS.hidrica, COLORS.biomasa],
                borderRadius: 8,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(12, 14, 13, 0.95)',
                    titleColor: '#00e65c',
                    bodyColor: '#f0fdf4',
                    borderColor: 'rgba(0, 230, 92, 0.3)',
                    borderWidth: 1,
                    callbacks: {
                        label: (context) => `Consumo: ${context.raw.toFixed(2)} TWh`
                    }
                }
            },
            scales: {
                y: { 
                    beginAtZero: true, 
                    title: { display: true, text: 'Teravatio-hora (TWh)' },
                    grid: { color: 'rgba(255,255,255,0.05)' }
                },
                x: {
                    grid: { display: false }
                }
            }
        }
    });
}

// ===============================
// 🥧 GRÁFICO DE TORTA
// ===============================
function crearGraficoTorta(valores) {
    if (chartTorta) chartTorta.destroy();
    chartTorta = new Chart(document.getElementById("graficoTorta"), {
        type: "doughnut",
        data: {
            labels: ["Solar", "Eólica", "Hídrica", "Biomasa"],
            datasets: [{
                data: valores,
                backgroundColor: [COLORS.solar, COLORS.eolica, COLORS.hidrica, COLORS.biomasa],
                borderWidth: 2,
                borderColor: '#121413' // Match card bg
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
                legend: { position: 'bottom', labels: { color: '#8d9c91' } },
                tooltip: {
                    backgroundColor: 'rgba(12, 14, 13, 0.95)',
                    titleColor: '#00e65c',
                    bodyColor: '#f0fdf4',
                    borderColor: 'rgba(0, 230, 92, 0.3)',
                    borderWidth: 1
                }
            },
            cutout: '75%'
        }
    });
}

// ===============================
// 📈 GRÁFICO DE LÍNEAS (Comparativo)
// ===============================
function crearGraficoLinea(pais) {
    if (chartLinea) chartLinea.destroy();

    const datosPais = datos.filter(d => d.pais == pais).sort((a,b) => a.anio - b.anio);
    const anios = datosPais.map(d => d.anio);

    chartLinea = new Chart(document.getElementById("graficoLinea"), {
        type: "line",
        data: {
            labels: anios,
            datasets: [
                {
                    label: "Solar",
                    data: datosPais.map(d => d.solar),
                    borderColor: COLORS.solar,
                    backgroundColor: 'rgba(0, 230, 92, 0.15)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: COLORS.solar,
                    pointBorderColor: '#121413',
                    pointRadius: 4,
                },
                {
                    label: "Eólica",
                    data: datosPais.map(d => d.eolica),
                    borderColor: COLORS.eolica,
                    backgroundColor: 'rgba(0, 204, 85, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 0
                },
                {
                    label: "Hídrica",
                    data: datosPais.map(d => d.hidrica),
                    borderColor: COLORS.hidrica,
                    backgroundColor: 'rgba(0, 153, 51, 0.05)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 0
                },
                {
                    label: "Biomasa",
                    data: datosPais.map(d => d.biomasa),
                    borderColor: COLORS.biomasa,
                    backgroundColor: 'rgba(0, 102, 34, 0.05)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: { position: 'top', labels: { usePointStyle: true, boxWidth: 8 } },
                tooltip: {
                    backgroundColor: 'rgba(12, 14, 13, 0.95)',
                    titleColor: '#00e65c',
                    bodyColor: '#f0fdf4',
                    borderColor: 'rgba(0, 230, 92, 0.3)',
                    borderWidth: 1,
                    padding: 12
                }
            },
            scales: {
                y: { 
                    beginAtZero: true,
                    title: { display: true, text: 'Consumo (TWh)' },
                    grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false }
                },
                x: {
                    grid: { display: false, drawBorder: false }
                }
            }
        }
    });
}

// ===============================
// 🎯 EVENTOS - Actualizar gráficos al cambiar filtros
// ===============================
const paisSelect = document.getElementById("pais");
const anioSelect = document.getElementById("anio");

if (paisSelect) paisSelect.addEventListener("change", actualizarGraficos);
if (anioSelect) anioSelect.addEventListener("change", actualizarGraficos);
