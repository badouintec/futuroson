// main.js

// Función para animar los KPIs
function animarKPIs() {
    const counters = document.querySelectorAll('.kpi-number');
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const unit = counter.getAttribute('data-unit') || '';
        const duration = 2000; // Duración total de la animación en ms
        const interval = 20; // Intervalo de actualización en ms
        const steps = duration / interval;
        const increment = target / steps;
        let current = 0;

        const updateCount = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.ceil(current) + unit;
                setTimeout(updateCount, interval);
            } else {
                counter.innerText = target.toLocaleString() + unit;
            }
        };

        updateCount();
    });
}

// Función para capitalizar la primera letra (utilizada en indicadores.html)
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Función para obtener la unidad según el indicador (utilizada en indicadores.html)
function getUnit(indicador) {
    const units = {
        'pib': ' M USD',
        'empleo': '%',
        'educacion': '%',
        'competitividad': ''
    };
    return units[indicador] || '';
}

// Función para cargar y mostrar datos detallados en la tabla
function cargarDatosTabla() {
    d3.csv('indicadores.csv').then(function(data) {
        const tbody = d3.select('#dataTable tbody');
        tbody.html(''); // Limpiar tabla

        data.forEach(function(d) {
            tbody.append('tr')
                .html(`
                    <td>${d.municipio}</td>
                    <td>${capitalizeFirstLetter(d.indicador)}</td>
                    <td>${d.anio}</td>
                    <td>${d.valor}${getUnit(d.indicador)}</td>
                `);
        });
    }).catch(function(error){
        console.error('Error cargando los datos de la tabla:', error);
    });
}

// Funciones para actualizar gráficas con Plotly.js

// Función para actualizar gráfica PIB
function actualizarGraficaPIB(anio) {
    const municipios = ['Hermosillo', 'Cajeme', 'Nogales', 'Guaymas', 'Navojoa'];
    const datos = {
        '2018': [32000, 28000, 30000, 31000, 29000],
        '2019': [33000, 29000, 31000, 32000, 30000],
        '2020': [31000, 27000, 29000, 30000, 28000],
        '2021': [34000, 30000, 32000, 33000, 31000],
        '2022': [35000, 31000, 33000, 34000, 32000]
    };

    const trace = {
        x: municipios,
        y: datos[anio],
        type: 'bar',
        marker: {
            color: 'rgba(0, 123, 255, 0.7)'
        }
    };

    const layout = {
        title: `PIB por Municipio en ${anio} (M USD)`,
        xaxis: { title: 'Municipios' },
        yaxis: { title: 'PIB (M USD)' },
        margin: { t: 50, l: 50, r: 30, b: 50 }
    };

    Plotly.newPlot('graficaPIB', [trace], layout, { responsive: true });
}

// Función para actualizar gráfica Empleo
function actualizarGraficaEmpleo(anio) {
    const sectores = ['Industria Manufacturera', 'Comercio', 'Agricultura', 'Minería', 'Servicios'];
    const datos = {
        '2020': [30, 25, 15, 10, 20],
        '2021': [32, 26, 14, 11, 17],
        '2022': [35, 28, 12, 10, 15]
    };

    const trace = {
        labels: sectores,
        values: datos[anio],
        type: 'pie',
        hole: 0.4,
        marker: {
            colors: [
                'rgba(0, 123, 255, 0.7)', 
                'rgba(220, 53, 69, 0.7)', 
                'rgba(255, 193, 7, 0.7)', 
                'rgba(40, 167, 69, 0.7)', 
                'rgba(111, 66, 193, 0.7)'
            ]
        }
    };

    const layout = {
        title: `Distribución del Empleo por Sector en ${anio}`,
        showlegend: true,
        margin: { t: 50, l: 50, r: 30, b: 50 }
    };

    Plotly.newPlot('graficaEmpleo', [trace], layout, { responsive: true });
}

// Función para actualizar gráfica Educación
function actualizarGraficaEducacion(anio) {
    const niveles = ['Primaria', 'Secundaria', 'Preparatoria', 'Universidad', 'Posgrado'];
    const datos = {
        '2020': [15, 25, 30, 20, 10],
        '2021': [14, 24, 32, 20, 10],
        '2022': [13, 22, 35, 20, 10]
    };

    const trace = {
        x: niveles,
        y: datos[anio],
        type: 'bar',
        marker: {
            color: 'rgba(23, 162, 184, 0.7)'
        }
    };

    const layout = {
        title: `Nivel Educativo de la Población en ${anio}`,
        xaxis: { title: 'Nivel Educativo' },
        yaxis: { title: 'Porcentaje (%)', range: [0, 40] },
        margin: { t: 50, l: 50, r: 30, b: 50 }
    };

    Plotly.newPlot('graficaEducacion', [trace], layout, { responsive: true });
}

// Función para actualizar gráfica Competitividad
function actualizarGraficaCompetitividad(anio) {
    const municipios = ['Hermosillo', 'Cajeme', 'Nogales', 'Guaymas', 'Navojoa'];
    const datos = {
        '2020': [75, 65, 60, 55, 50],
        '2021': [77, 67, 62, 57, 52],
        '2022': [80, 70, 65, 60, 55]
    };

    const trace = {
        x: datos[anio],
        y: municipios,
        type: 'bar',
        orientation: 'h',
        marker: {
            color: 'rgba(255, 193, 7, 0.7)'
        }
    };

    const layout = {
        title: `Índice de Competitividad por Municipio en ${anio}`,
        xaxis: { title: 'Índice' },
        yaxis: { autorange: 'reversed' },
        margin: { t: 50, l: 50, r: 30, b: 50 }
    };

    Plotly.newPlot('graficaCompetitividad', [trace], layout, { responsive: true });
}

// Inicializar todas las gráficas con los años predeterminados
function inicializarGraficas() {
    actualizarGraficaPIB('2022');
    actualizarGraficaEmpleo('2022');
    actualizarGraficaEducacion('2022');
    actualizarGraficaCompetitividad('2022');
}

// Eventos para los selectores de año
function agregarEventosSelectores() {
    document.getElementById('pibAnio').addEventListener('change', function() {
        actualizarGraficaPIB(this.value);
    });

    document.getElementById('empleoAnio').addEventListener('change', function() {
        actualizarGraficaEmpleo(this.value);
    });

    document.getElementById('educacionAnio').addEventListener('change', function() {
        actualizarGraficaEducacion(this.value);
    });

    document.getElementById('competitividadAnio').addEventListener('change', function() {
        actualizarGraficaCompetitividad(this.value);
    });
}

// Inicializar funciones cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function () {
    // Animar KPIs si existen en la página
    if (document.querySelector('.kpi-number')) {
        animarKPIs();
    }

    // Cargar datos en la tabla si existe en la página
    if (document.getElementById('dataTable')) {
        cargarDatosTabla();
    }

    // Inicializar gráficas si existen en la página
    if (document.getElementById('graficaPIB')) {
        inicializarGraficas();
        agregarEventosSelectores();
    }
});