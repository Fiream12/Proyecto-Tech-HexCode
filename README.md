# 🌞 Futuro Solar - Proyecto Educativo

![Energía Solar](img/sol.svg)

## 📖 Descripción

**Futuro Solar** es un proyecto educativo interactivo sobre energía solar y energías renovables. El sitio web permite visualizar datos históricos de producción energética (1965-2022), analizar tendencias mediante gráficos interactivos y calcular el impacto del consumo eléctrico individual respecto a la producción de energías limpias.

Este proyecto fue desarrollado como parte del programa **TalentoTech** con el objetivo de promover el conocimiento sobre energías sostenibles y facilitar el acceso a información relevante sobre la transición energética global.

## 👥 Equipo HexCode

El proyecto fue desarrollado por:

- **Diosenel Chinchilla Garcia** - Diseño, Programación, Investigación
- **Alejandra Duque** - Diseño, Programación, Investigación
- **Camilo Osorio** - Diseño, Programación, Investigación
- **Leidy Alexandra Silva** - Diseño, Programación, Investigación

## 🚀 Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica del sitio web
- **CSS3** - Estilos y diseño responsive
- **JavaScript ES6** - Lógica de aplicación y manipulación del DOM

### Librerías y Frameworks
- **Bootstrap 5** - Framework CSS para diseño responsive
- **Chart.js** - Librería para gráficos interactivos
- **SweetAlert2** - Alertas elegantes y personalizadas

### Herramientas de Desarrollo
- **Visual Studio Code** - Editor de código
- **Git** - Control de versiones
- **GitHub** - Repositorio y colaboración
- **Canva** - Diseño gráfico
- **Claude AI** - Asistencia en desarrollo

### Datos
- **CSV Dataset** - Datos de energías renovables (1965-2022)
  - Energía Solar
  - Energía Eólica
  - Energía Hídrica
  - Biomasa

## 📊 Funcionalidades

### 1. **Página de Inicio**
- Presentación del proyecto
- Información sobre energía solar
- Beneficios de las energías renovables
- Tipos de energía solar (fotovoltaica y térmica)
- Estadísticas destacadas

### 2. **Datos de Energía**
- Tabla interactiva con datos históricos (1965-2022)
- Filtros dinámicos por:
  - Año
  - País
  - Tipo de energía
- Visualización de hasta 200 registros simultáneos

### 3. **Dashboard Interactivo**
- **Gráfico de Barras**: Producción por tipo de energía
- **Gráfico de Torta**: Participación energética porcentual
- **Gráfico de Líneas**: Evolución temporal de energía solar
- Filtros por país y año
- Colores temáticos (verde solar)

### 4. **Calculadora Energética**
- Cálculo de consumo eléctrico personal
- Conversión de kWh a TWh
- Comparación con producción nacional
- Cálculo de porcentaje de impacto
- Validaciones con SweetAlert2

### 5. **Acerca del Proyecto**
- Información del equipo
- Objetivos del proyecto
- Tecnologías utilizadas
- Metodología de desarrollo

## 🛠️ Instalación y Uso

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- No requiere instalación de dependencias adicionales

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/hexcode/futuro-solar.git
cd futuro-solar
```

2. **Abrir el proyecto**
- Navegar a la carpeta del proyecto
- Abrir el archivo `index.html` en un navegador web

3. **Uso local**
- No requiere servidor web
- Todos los recursos se cargan localmente
- El archivo CSV se carga mediante Fetch API

### Estructura de Archivos

```
Codigo Fuente/
├── index.html                  # Página principal
├── datos-energia.html          # Tabla de datos
├── dashboard.html              # Gráficos interactivos
├── calculadora.html            # Calculadora energética
├── acerca-del-proyecto.html    # Información del proyecto
├── css/
│   └── estilos.css            # Estilos personalizados
├── js/
│   ├── data.js                # Lógica de tabla de datos
│   ├── dashboard.js           # Lógica de gráficos
│   └── calculadora.js         # Lógica de calculadora
├── documentos/
│   └── 02_modern-renewable-energy-consumption.csv
├── img/
│   ├── sol.svg
│   ├── banner-solar.png
│   ├── filtro.svg
│   └── datos-energia.svg
└── README.md
```

## 📱 Diseño Responsive

El sitio web está optimizado para múltiples dispositivos:

- **Desktop** (> 768px): Diseño completo con grid de 2 columnas
- **Tablet** (480px - 768px): Grid adaptativo de 1 columna
- **Móvil** (< 480px): Navegación vertical, botones full-width

### Características Responsive
- Menú de navegación adaptativo
- Tablas con scroll horizontal
- Gráficos redimensionables
- Botones y formularios optimizados para touch

## 🎨 Paleta de Colores

El proyecto utiliza una paleta inspirada en la naturaleza y la sostenibilidad:

- **Verde Oscuro**: `#1b4332` - Títulos principales
- **Verde Medio**: `#2d6a4f` - Botones y enlaces
- **Verde Claro**: `#52b788` - Gradientes
- **Verde Pastel**: `#e8f5e9` - Fondos
- **Dorado Solar**: `#ffd700` - Energía solar (gráficos)
- **Azul Cielo**: `#87ceeb` - Energía eólica
- **Azul Acero**: `#4682b4` - Energía hídrica
- **Marrón**: `#8b4513` - Biomasa

## 📈 Datos del Proyecto

### Dataset
- **Fuente**: Datos históricos de energías renovables
- **Período**: 1965 - 2022
- **Cobertura**: Global (múltiples países)
- **Tipos de energía**: Solar, Eólica, Hídrica, Biomasa
- **Unidad**: TWh (Terawatt-hora)

### Procesamiento de Datos
- Carga dinámica mediante Fetch API
- Filtrado en tiempo real con JavaScript
- Optimización con delay (300ms) para evitar múltiples ejecuciones
- Límite de visualización: 200 registros simultáneos

## 🔧 Funciones Principales

### Calculadora
```javascript
// Conversión de kWh a TWh
const consumoTwh = consumo / 1_000_000_000;

// Cálculo de porcentaje
const porcentaje = (consumoTwh / dato.produccion) * 100;
```

### Gráficos
- **Chart.js** con configuración personalizada
- Colores temáticos por tipo de energía
- Tooltips informativos
- Animaciones suaves
- Responsive y adaptativo

## 🌍 Alcance del Proyecto

### Objetivos Cumplidos
✅ Sitio web responsive con 5 páginas funcionales  
✅ Visualización de datos históricos (1965-2022)  
✅ Dashboard con 3 tipos de gráficos interactivos  
✅ Calculadora energética con validaciones  
✅ Filtros dinámicos en tiempo real  
✅ Diseño moderno y accesible  
✅ Código documentado con comentarios  

### Limitaciones
- Dataset estático (no actualización en tiempo real)
- Visualización limitada a 200 registros por rendimiento
- Sin backend (aplicación frontend pura)

## 🎓 Metodología de Desarrollo

### Fases del Proyecto

1. **Investigación** (Semanas 1-2)
   - Recopilación de datos de energías renovables
   - Análisis de requisitos
   - Estudio de tecnologías

2. **Diseño** (Semana 3)
   - Wireframes y mockups
   - Paleta de colores
   - Estructura de navegación

3. **Desarrollo** (Semanas 4-6)
   - Implementación HTML/CSS/JS
   - Integración de librerías
   - Desarrollo de funcionalidades

4. **Testing** (Semana 7)
   - Pruebas funcionales
   - Validación responsive
   - Corrección de bugs

### Gestión del Equipo
- **Comunicación**: WhatsApp (grupo diario)
- **Reuniones**: 1 vez al mes
- **Control de versiones**: Git/GitHub
- **Colaboración**: Trabajo en equipo multidisciplinario

## 📚 Lecciones Aprendidas

- Importancia del trabajo colaborativo en proyectos web
- Gestión eficiente de datos con JavaScript vanilla
- Implementación de visualizaciones interactivas con Chart.js
- Diseño responsive mobile-first
- Uso efectivo de control de versiones (Git)
- Optimización de rendimiento en aplicaciones frontend

## 🔮 Futuras Mejoras

- [ ] Integración con API de datos en tiempo real
- [ ] Sistema de autenticación de usuarios
- [ ] Exportación de gráficos a PDF/PNG
- [ ] Comparación entre múltiples países
- [ ] Modo oscuro (dark mode)
- [ ] Internacionalización (i18n)
- [ ] Progressive Web App (PWA)

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 📞 Contacto

Para más información sobre el proyecto, contacta al equipo **HexCode**.

---

**© 2026 Equipo HexCode** - Proyecto educativo sobre energías limpias  
Desarrollado con 💚 para promover la sostenibilidad energética
