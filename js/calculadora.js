/**
 * Archivo Core para el "Centro de Cálculo Ambiental"
 * Maneja independientemente las 8 calculadoras ambientales completas.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================
       1. CALCULADORA: ADOPCIÓN SOLAR
       ========================================================== */
    const formSolar = document.getElementById('formSolar');
    const inputKwh = document.getElementById('inputKwh');
    const solarVacio = document.getElementById('solarVacio');
    const solarResultados = document.getElementById('solarResultados');

    if (formSolar) {
        formSolar.addEventListener('submit', (e) => {
            e.preventDefault();
            const kwhConstante = parseFloat(inputKwh.value);
            if (isNaN(kwhConstante) || kwhConstante <= 0) {
                Swal.fire({ title: 'Dato Inválido', text: 'Por favor, introduce tu consumo real en kWh (mayor a 0).', icon: 'error', background: '#050605', color: '#fff' });
                return;
            }

            const kwhPorPanelMensual = 45;
            const panelesIdeales = Math.ceil(kwhConstante / kwhPorPanelMensual);
            const CO2AhorradoPorMes = kwhConstante * 0.4;
            const CO2Anual = CO2AhorradoPorMes * 12;
            const arbolesEquivalentes = Math.ceil(CO2Anual / 22);

            document.getElementById('resPaneles').innerHTML = `${panelesIdeales} <span class="fs-6 text-muted">unidades</span>`;
            document.getElementById('resCo2Solar').innerHTML = `${CO2Anual.toFixed(1)} <span class="fs-6 text-muted">kg CO₂</span>`;
            document.getElementById('resArbolesSolar').innerText = `${arbolesEquivalentes} Árboles`;

            solarVacio.classList.add('d-none');
            solarResultados.classList.remove('d-none');
            solarResultados.classList.remove('animate__animated', 'animate__fadeIn');
            void solarResultados.offsetWidth;
            solarResultados.classList.add('animate__animated', 'animate__fadeIn');
        });
    }

    /* ==========================================================
       2. CALCULADORA: HUELLA DE CARBONO (Transporte)
       ========================================================== */
    const formCarbono = document.getElementById('formCarbono');
    const inputKm = document.getElementById('inputKm');
    const carbonVacio = document.getElementById('carbonVacio');
    const carbonResultados = document.getElementById('carbonResultados');

    if (formCarbono) {
        formCarbono.addEventListener('submit', (e) => {
            e.preventDefault();
            const kmMensual = parseFloat(inputKm.value);
            if (isNaN(kmMensual) || kmMensual <= 0) {
                Swal.fire({ title: 'Dato Inválido', text: 'Asegúrate de poner los km recorridos correctamente.', icon: 'error', background: '#050605', color: '#fff' });
                return;
            }

            const litrosMes = (kmMensual / 100) * 8;
            const co2Generado = litrosMes * 2.3;
            const arbolesNecesarios = Math.ceil(co2Generado / 1.83);

            document.getElementById('resCo2Car').innerHTML = `+${co2Generado.toFixed(1)} <span class="fs-6 text-muted">kg CO₂</span>`;
            document.getElementById('resLitros').innerHTML = `${litrosMes.toFixed(1)} <span class="fs-6 text-muted">L</span>`;
            document.getElementById('resArbolesCar').innerText = `${arbolesNecesarios} árboles enteros`;

            carbonVacio.classList.add('d-none');
            carbonResultados.classList.remove('d-none');
            carbonResultados.classList.remove('animate__animated', 'animate__fadeIn');
            void carbonResultados.offsetWidth;
            carbonResultados.classList.add('animate__animated', 'animate__fadeIn');
        });
    }

    /* ==========================================================
       3. CALCULADORA: IMPACTO RECICLAJE
       ========================================================== */
    const formReciclaje = document.getElementById('formReciclaje');
    const inputPaper = document.getElementById('inputPaper');
    const inputPlastic = document.getElementById('inputPlastic');
    const recycleVacio = document.getElementById('recycleVacio');
    const recycleResultados = document.getElementById('recycleResultados');

    if (formReciclaje) {
        formReciclaje.addEventListener('submit', (e) => {
            e.preventDefault();
            const papelKg = parseFloat(inputPaper.value);
            const plasticKg = parseFloat(inputPlastic.value);

            if (isNaN(papelKg) || isNaN(plasticKg) || papelKg < 0 || plasticKg < 0) {
                Swal.fire({ title: 'Datos Inválidos', text: 'Ingresa valores válidos para papel y plástico.', icon: 'error', background: '#050605', color: '#fff' });
                return;
            }

            const aguaAhorrada = (papelKg * 7000) + (plasticKg * 1800);
            const energiaAhorrada = (papelKg * 4.1) + (plasticKg * 5.8);
            const totalArboles = papelKg * 0.05; // aprox 5% de un árbol por kg de papel

            document.getElementById('resAgua').innerHTML = `~${aguaAhorrada.toFixed(0)} <span class="fs-6 text-muted">Lts</span>`;
            document.getElementById('resEnergia').innerHTML = `${energiaAhorrada.toFixed(1)} <span class="fs-6 text-muted">kWh</span>`;
            document.getElementById('resTala').innerText = `${Math.ceil(totalArboles)} árboles`;

            if(recycleVacio) recycleVacio.classList.add('d-none');
            recycleResultados.classList.remove('d-none');
            recycleResultados.classList.remove('animate__animated', 'animate__fadeIn');
            void recycleResultados.offsetWidth;
            recycleResultados.classList.add('animate__animated', 'animate__fadeIn');
        });
    }

    /* ==========================================================
       4. CALCULADORA: VEHÍCULO ELÉCTRICO
       ========================================================== */
    const formEV = document.getElementById('formEV');
    const evVacio = document.getElementById('evVacio');
    const evResultados = document.getElementById('evResultados');

    if (formEV) {
        formEV.addEventListener('submit', (e) => {
            e.preventDefault();
            const km = parseFloat(document.getElementById('inputKmEV').value);
            const eficiencia = document.getElementById('eficienciaEV').value;
            
            if (isNaN(km) || km <= 0) return;

            // Simple logic: EV produces 70% less CO2, costs ~50% less to run
            let reduccionEmisiones = 70;
            let mejoraEficiencia = 30;
            let costoMantenimientoEV = 1200;
            let costoGasolina = (km / 100) * 8 * 1.5; // Aproximado
            
            if (eficiencia === "electrico") reduccionEmisiones = 100;
            if (eficiencia === "hibrido") reduccionEmisiones = 50;

            document.getElementById('evDato1').innerText = `-${reduccionEmisiones}%`;
            document.getElementById('evDato2').innerText = `${mejoraEficiencia}%`;
            document.getElementById('evDato3').innerText = `$${costoMantenimientoEV}`;
            document.getElementById('evDato4').innerText = `$${Math.round(costoGasolina)}`;

            if(evVacio) evVacio.classList.add('d-none');
            if(evResultados) {
                evResultados.classList.remove('d-none', 'animate__animated', 'animate__fadeIn');
                void evResultados.offsetWidth;
                evResultados.classList.add('animate__animated', 'animate__fadeIn');
            }
        });
    }

    /* ==========================================================
       5. CALCULADORA: EFICIENCIA HOGAR
       ========================================================== */
    const formEficiencia = document.getElementById('formEficiencia');
    const eficienciaVacio = document.getElementById('eficienciaVacio');
    const eficienciaResultados = document.getElementById('eficienciaResultados');

    if (formEficiencia) {
        formEficiencia.addEventListener('submit', (e) => {
            e.preventDefault();
            const area = parseFloat(document.getElementById('inputArea').value);
            const aislamiento = document.getElementById('aislamiento').value;
            if (isNaN(area) || area <= 0) return;

            let potencial = 30;
            let mejora = 25;
            if (aislamiento === "excelente") { potencial = 10; mejora = 5; }
            if (aislamiento === "regular") { potencial = 45; mejora = 50; }

            let ahorroAnual = area * 5; // Simulado
            
            document.getElementById('efiDato1').innerText = `${potencial}%`;
            document.getElementById('efiDato2').innerText = `${mejora}%`;
            document.getElementById('efiDato3').innerText = `$${ahorroAnual}`;
            document.getElementById('efiDato4').innerText = `$${ahorroAnual * 0.6}`;

            if(eficienciaVacio) eficienciaVacio.classList.add('d-none');
            if(eficienciaResultados) {
                eficienciaResultados.classList.remove('d-none', 'animate__animated', 'animate__fadeIn');
                void eficienciaResultados.offsetWidth;
                eficienciaResultados.classList.add('animate__animated', 'animate__fadeIn');
            }
        });
    }

    /* ==========================================================
       6. CALCULADORA: INDUSTRIAL
       ========================================================== */
    const formIndustrial = document.getElementById('formIndustrial');
    const industrialVacio = document.getElementById('industrialVacio');
    const industrialResultados = document.getElementById('industrialResultados');

    if (formIndustrial) {
        formIndustrial.addEventListener('submit', (e) => {
            e.preventDefault();
            const consumo = parseFloat(document.getElementById('consumoIndustrial').value);
            if (isNaN(consumo) || consumo <= 0) return;

            let ahorro = 60 + Math.random() * 20; // 60-80%
            let payback = (Math.random() * 2 + 3).toFixed(1); // 3-5 years
            let recomendado = Math.ceil(consumo / 150);
            let usd = Math.round(consumo * 100);

            document.getElementById('indDato1').innerText = `${Math.round(ahorro)}%`;
            document.getElementById('indDato2').innerText = `${payback} años`;
            document.getElementById('indDato3').innerText = `${recomendado}MWp`;
            document.getElementById('indDato4').innerText = `$${Math.round(usd/1000)}K`;

            if(industrialVacio) industrialVacio.classList.add('d-none');
            if(industrialResultados) {
                industrialResultados.classList.remove('d-none', 'animate__animated', 'animate__fadeIn');
                void industrialResultados.offsetWidth;
                industrialResultados.classList.add('animate__animated', 'animate__fadeIn');
            }
        });
    }

    /* ==========================================================
       7. CALCULADORA: HUELLA HÍDRICA
       ========================================================== */
    const formAgua = document.getElementById('formAgua');
    const aguaVacio = document.getElementById('aguaVacio');
    const aguaResultados = document.getElementById('aguaResultados');

    if (formAgua) {
        formAgua.addEventListener('submit', (e) => {
            e.preventDefault();
            const diario = parseFloat(document.getElementById('consumoAgua').value);
            const personas = parseFloat(document.getElementById('personasAgua').value);
            const dieta = document.getElementById('dietaAgua').value;
            if (isNaN(diario) || isNaN(personas) || diario <= 0 || personas <= 0) return;

            let dietaVirtual = 3000;
            if (dieta === "vegano") dietaVirtual = 1500;
            if (dieta === "vegetariano") dietaVirtual = 2000;

            let totalDirecto = diario * personas;
            let totalVirtual = dietaVirtual * personas;
            let totalGeneral = totalDirecto + totalVirtual;

            document.getElementById('aguaDato1').innerText = totalGeneral.toLocaleString();
            document.getElementById('aguaDato2').innerText = totalVirtual.toLocaleString();
            document.getElementById('aguaDato3').innerText = totalDirecto.toLocaleString();
            document.getElementById('aguaDato4').innerText = (totalVirtual * 0.8).toLocaleString();

            if(aguaVacio) aguaVacio.classList.add('d-none');
            if(aguaResultados) {
                aguaResultados.classList.remove('d-none', 'animate__animated', 'animate__fadeIn');
                void aguaResultados.offsetWidth;
                aguaResultados.classList.add('animate__animated', 'animate__fadeIn');
            }
        });
    }

    /* ==========================================================
       8. CALCULADORA: TRANSPORTE SOSTENIBLE
       ========================================================== */
    const formTransporte = document.getElementById('formTransporte');
    const transporteVacio = document.getElementById('transporteVacio');
    const transporteResultados = document.getElementById('transporteResultados');

    if (formTransporte) {
        formTransporte.addEventListener('submit', (e) => {
            e.preventDefault();
            const distancia = parseFloat(document.getElementById('distanciaTransporte').value);
            const dias = parseFloat(document.getElementById('diasTransporte').value);
            const tipo = document.getElementById('tipoTransporte').value;
            if (isNaN(distancia) || isNaN(dias) || distancia <= 0 || dias <= 0) return;

            let factorEmision = 90;
            if (tipo === "caminar" || tipo === "bicicleta") factorEmision = 100;

            let ahorroCosto = distancia * dias * 0.5 * 4; // Aproximado per month
            let kgCO2 = (distancia * dias * 0.2).toFixed(1);

            document.getElementById('transDato1').innerText = `-${factorEmision}%`;
            document.getElementById('transDato2').innerText = `-${factorEmision}%`;
            document.getElementById('transDato3').innerText = `$${Math.round(ahorroCosto)}`;
            document.getElementById('transDato4').innerText = `${kgCO2}kg`;

            if(transporteVacio) transporteVacio.classList.add('d-none');
            if(transporteResultados) {
                transporteResultados.classList.remove('d-none', 'animate__animated', 'animate__fadeIn');
                void transporteResultados.offsetWidth;
                transporteResultados.classList.add('animate__animated', 'animate__fadeIn');
            }
        });
    }
});
