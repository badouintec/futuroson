// main.js

// Función para animar los KPIs cuando entran en el viewport
function animarKPIs() {
    const counters = document.querySelectorAll('.kpi-number');
    counters.forEach(counter => {
        // Verificar si ya se ha animado para evitar múltiples animaciones
        if (counter.getAttribute('data-animated') === 'true') return;

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
                // Para valores con decimales, ajustamos la precisión
                if (target % 1 !== 0) {
                    counter.innerText = current.toFixed(1) + unit;
                } else {
                    counter.innerText = Math.ceil(current).toLocaleString() + unit;
                }
                setTimeout(updateCount, interval);
            } else {
                // Aseguramos que el valor final sea exacto
                if (target % 1 !== 0) {
                    counter.innerText = target.toFixed(1) + unit;
                } else {
                    counter.innerText = target.toLocaleString() + unit;
                }
                counter.setAttribute('data-animated', 'true');
            }
        };

        updateCount();
    });
}

// Función para inicializar Typed.js (si es necesario)
function initTyped() {
    const typedElement = document.getElementById('typed');
    if (typedElement) {
        const options = {
            strings: ["Sonora a prueba de futuro", "Innovación, Desarrollo y Crecimiento"],
            typeSpeed: 50,
            backSpeed: 25,
            backDelay: 2000,
            loop: true
        };
        new Typed('#typed', options);
    }
}

// Función para inicializar las gráficas de Chart.js en indicadores.html
function initCharts() {
    // Función para crear cada gráfica solo una vez
    const createChart = (ctx, config) => {
        if (ctx.dataset) return; // Evita recrear la gráfica
        new Chart(ctx, config);
        ctx.dataset = true; // Marca que ya se creó la gráfica
    };

    // Gráfica 1: Crecimiento del PIB
    const ctxPib = document.getElementById('pibChart');
    if (ctxPib) {
        const pibData = {
            labels: ['2018', '2019', '2020', '2021', '2022'],
            datasets: [{
                label: 'PIB Estatal (M USD)',
                data: [32000, 33000, 31000, 34000, 35000],
                backgroundColor: 'rgba(0, 123, 255, 0.6)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1
            }]
        };

        const pibConfig = {
            type: 'bar',
            data: pibData,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Crecimiento del PIB Estatal'
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y.toLocaleString() + ' M USD';
                                }
                                return label;
                            }
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutBounce'
                }
            },
        };

        createChart(ctxPib, pibConfig);
    }

    // Gráfica 2: Tasa de Desempleo
    const ctxDesempleo = document.getElementById('desempleoChart');
    if (ctxDesempleo) {
        const desempleoData = {
            labels: ['2018', '2019', '2020', '2021', '2022'],
            datasets: [{
                label: 'Tasa de Desempleo (%)',
                data: [4.5, 4.2, 5.0, 4.8, 4.5],
                fill: false,
                borderColor: 'rgba(220, 53, 69, 1)',
                backgroundColor: 'rgba(220, 53, 69, 0.6)',
                tension: 0.1,
                pointBackgroundColor: 'rgba(220, 53, 69, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(220, 53, 69, 1)'
            }]
        };

        const desempleoConfig = {
            type: 'line',
            data: desempleoData,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false,
                        suggestedMin: 0,
                        suggestedMax: 10
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Tasa de Desempleo Estatal'
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y + '%';
                                }
                                return label;
                            }
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutElastic'
                }
            },
        };

        createChart(ctxDesempleo, desempleoConfig);
    }

    // Gráfica 3: Inversión Extranjera Directa
    const ctxInversion = document.getElementById('inversionChart');
    if (ctxInversion) {
        const inversionData = {
            labels: ['2018', '2019', '2020', '2021', '2022'],
            datasets: [{
                label: 'Inversión Extranjera Directa (M USD)',
                data: [5000, 5500, 5300, 5800, 6000],
                backgroundColor: 'rgba(40, 167, 69, 0.6)',
                borderColor: 'rgba(40, 167, 69, 1)',
                borderWidth: 1
            }]
        };

        const inversionConfig = {
            type: 'doughnut',
            data: inversionData,
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Inversión Extranjera Directa en Sonora'
                    },
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    label += context.parsed.toLocaleString() + ' M USD';
                                }
                                return label;
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 1500
                }
            },
        };

        createChart(ctxInversion, inversionConfig);
    }

    // Repite la estructura anterior para cada una de tus gráficas...
    // Asegúrate de que cada gráfica tenga su propio bloque similar al anterior

    // Gráfica 4: Exportaciones
    const ctxExportaciones = document.getElementById('exportacionesChart');
    if (ctxExportaciones) {
        const exportacionesData = {
            labels: ['Manufactura', 'Agricultura', 'Minería', 'Energía', 'Tecnología'],
            datasets: [{
                label: 'Exportaciones (M USD)',
                data: [12000, 8000, 15000, 7000, 5000],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54,162,235,1)',
                    'rgba(255,206,86,1)',
                    'rgba(75,192,192,1)',
                    'rgba(153,102,255,1)'
                ],
                borderWidth: 1
            }]
        };

        const exportacionesConfig = {
            type: 'polarArea',
            data: exportacionesData,
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Exportaciones por Sector'
                    },
                    legend: {
                        position: 'right',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    label += context.parsed.toLocaleString() + ' M USD';
                                }
                                return label;
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 1500
                }
            },
        };

        createChart(ctxExportaciones, exportacionesConfig);
    }

    // Gráfica 5: Importaciones
    const ctxImportaciones = document.getElementById('importacionesChart');
    if (ctxImportaciones) {
        const importacionesData = {
            labels: ['Automóviles', 'Electrónica', 'Químicos', 'Maquinaria', 'Alimentos'],
            datasets: [{
                label: 'Importaciones (M USD)',
                data: [9000, 7500, 6000, 8000, 4000],
                backgroundColor: 'rgba(255, 159, 64, 0.6)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 1
            }]
        };

        const importacionesConfig = {
            type: 'bar',
            data: importacionesData,
            options: {
                responsive: true,
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Importaciones por Sector'
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.x !== null) {
                                    label += context.parsed.x.toLocaleString() + ' M USD';
                                }
                                return label;
                            }
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutBounce'
                }
            },
        };

        createChart(ctxImportaciones, importacionesConfig);
    }

    // Gráfica 6: Nuevas Empresas
    const ctxNuevaEmpresarial = document.getElementById('nuevaEmpresarialChart');
    if (ctxNuevaEmpresarial) {
        const nuevaEmpresarialData = {
            labels: ['2018', '2019', '2020', '2021', '2022'],
            datasets: [{
                label: 'Nuevas Empresas Registradas',
                data: [1500, 1600, 1400, 1700, 1800],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1
            }]
        };

        const nuevaEmpresarialConfig = {
            type: 'line',
            data: nuevaEmpresarialData,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Nuevas Empresas Registradas por Año'
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y.toLocaleString();
                                }
                                return label;
                            }
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutElastic'
                }
            },
        };

        createChart(ctxNuevaEmpresarial, nuevaEmpresarialConfig);
    }

    // Gráfica 7: Crecimiento Poblacional
    const ctxCrecimientoPoblacional = document.getElementById('crecimientoPoblacionalChart');
    if (ctxCrecimientoPoblacional) {
        const crecimientoPoblacionalData = {
            labels: ['2018', '2019', '2020', '2021', '2022'],
            datasets: [{
                label: 'Crecimiento Poblacional (%)',
                data: [1.2, 1.1, 0.9, 1.3, 1.4],
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        };

        const crecimientoPoblacionalConfig = {
            type: 'bar',
            data: crecimientoPoblacionalData,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 2
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Crecimiento Poblacional por Año (%)'
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y + '%';
                                }
                                return label;
                            }
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutBounce'
                }
            },
        };

        createChart(ctxCrecimientoPoblacional, crecimientoPoblacionalConfig);
    }

    // Gráfica 8: Sector Agrícola
    const ctxSectorAgricola = document.getElementById('sectorAgricolaChart');
    if (ctxSectorAgricola) {
        const sectorAgricolaData = {
            labels: ['Maíz', 'Trigo', 'Frijol', 'Sorgo', 'Caña de Azúcar'],
            datasets: [{
                label: 'Producción Agrícola (Toneladas)',
                data: [500000, 450000, 300000, 250000, 200000],
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            }]
        };

        const sectorAgricolaConfig = {
            type: 'pie',
            data: sectorAgricolaData,
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Producción Agrícola por Producto'
                    },
                    legend: {
                        position: 'right',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    label += context.parsed.toLocaleString() + ' Toneladas';
                                }
                                return label;
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 1500
                }
            },
        };

        createChart(ctxSectorAgricola, sectorAgricolaConfig);
    }

    // Gráfica 9: Sector Minería
    const ctxSectorMineria = document.getElementById('sectorMineriaChart');
    if (ctxSectorMineria) {
        const sectorMineriaData = {
            labels: ['Cobre', 'Oro', 'Plata', 'Zinc', 'Plomo'],
            datasets: [{
                label: 'Producción Minera (Toneladas)',
                data: [80000, 5000, 3000, 40000, 35000],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        };

        const sectorMineriaConfig = {
            type: 'doughnut',
            data: sectorMineriaData,
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Producción Minera por Metal'
                    },
                    legend: {
                        position: 'right',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    label += context.parsed.toLocaleString() + ' Toneladas';
                                }
                                return label;
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 1500
                }
            },
        };

        createChart(ctxSectorMineria, sectorMineriaConfig);
    }

    // Gráfica 10: Sector Energía
    const ctxSectorEnergia = document.getElementById('sectorEnergiaChart');
    if (ctxSectorEnergia) {
        const sectorEnergiaData = {
            labels: ['Solar', 'Eólica', 'Hidroeléctrica', 'Biomasa', 'Geotérmica'],
            datasets: [{
                label: 'Capacidad Instalada (MW)',
                data: [1500, 800, 500, 300, 100],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54,162,235,1)',
                    'rgba(255,206,86,1)',
                    'rgba(75,192,192,1)',
                    'rgba(153,102,255,1)'
                ],
                borderWidth: 1
            }]
        };

        const sectorEnergiaConfig = {
            type: 'radar',
            data: sectorEnergiaData,
            options: {
                responsive: true,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 2000
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Capacidad Instalada de Energías Renovables (MW)'
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.r !== null) {
                                    label += context.parsed.r.toLocaleString() + ' MW';
                                }
                                return label;
                            }
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutElastic'
                }
            },
        };

        createChart(ctxSectorEnergia, sectorEnergiaConfig);
    }
}

// Función para inicializar el mapa con Leaflet.js centrado en Hermosillo
function initMap() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
        try {
            console.log("Inicializando el mapa...");

            // Coordenadas de Hermosillo, Sonora, México
            const hermosilloCoords = [29.0700, -110.9500];

            // Inicializar el mapa centrado en Hermosillo
            const map = L.map('map').setView(hermosilloCoords, 12);

            // Añadir capa de tiles de OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Añadir un marcador en Hermosillo
            const marker = L.marker(hermosilloCoords).addTo(map)
                .bindPopup('<strong>Hermosillo</strong><br>Capital de Sonora.')
                .openPopup();

            console.log("Mapa inicializado correctamente.");
        } catch (error) {
            console.error('Error al inicializar el mapa:', error);
        }
    } else {
        console.warn("Elemento #map no encontrado en el DOM.");
    }
}

// Función para manejar el formulario de contacto (si aplica)
function handleContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aquí puedes agregar la lógica para enviar el formulario, por ejemplo, usando fetch o AJAX
            // Por ahora, solo mostraremos un mensaje de éxito
            formMessage.innerHTML = '<div class="alert alert-success" role="alert">¡Mensaje enviado exitosamente!</div>';
            contactForm.reset();
        });
    }
}

// Función para descargar CSV
function downloadCSV(chartId) {
    // Datos de ejemplo, reemplaza con tus datos reales o obténlos dinámicamente
    const data = {
        pib: [
            ["Año", "PIB Estatal (M USD)"],
            ["2018", "32000"],
            ["2019", "33000"],
            ["2020", "31000"],
            ["2021", "34000"],
            ["2022", "35000"]
        ],
        desempleo: [
            ["Año", "Tasa de Desempleo (%)"],
            ["2018", "4.5"],
            ["2019", "4.2"],
            ["2020", "5.0"],
            ["2021", "4.8"],
            ["2022", "4.5"]
        ],
        inversion: [
            ["Año", "Inversión Extranjera Directa (M USD)"],
            ["2018", "5000"],
            ["2019", "5500"],
            ["2020", "5300"],
            ["2021", "5800"],
            ["2022", "6000"]
        ],
        exportaciones: [
            ["Sector", "Exportaciones (M USD)"],
            ["Manufactura", "12000"],
            ["Agricultura", "8000"],
            ["Minería", "15000"],
            ["Energía", "7000"],
            ["Tecnología", "5000"]
        ],
        importaciones: [
            ["Sector", "Importaciones (M USD)"],
            ["Automóviles", "9000"],
            ["Electrónica", "7500"],
            ["Químicos", "6000"],
            ["Maquinaria", "8000"],
            ["Alimentos", "4000"]
        ],
        nuevaEmpresarial: [
            ["Año", "Nuevas Empresas Registradas"],
            ["2018", "1500"],
            ["2019", "1600"],
            ["2020", "1400"],
            ["2021", "1700"],
            ["2022", "1800"]
        ],
        crecimientoPoblacional: [
            ["Año", "Crecimiento Poblacional (%)"],
            ["2018", "1.2"],
            ["2019", "1.1"],
            ["2020", "0.9"],
            ["2021", "1.3"],
            ["2022", "1.4"]
        ],
        sectorAgricola: [
            ["Producto", "Producción Agrícola (Toneladas)"],
            ["Maíz", "500000"],
            ["Trigo", "450000"],
            ["Frijol", "300000"],
            ["Sorgo", "250000"],
            ["Caña de Azúcar", "200000"]
        ],
        sectorMineria: [
            ["Metal", "Producción Minera (Toneladas)"],
            ["Cobre", "80000"],
            ["Oro", "5000"],
            ["Plata", "3000"],
            ["Zinc", "40000"],
            ["Plomo", "35000"]
        ],
        sectorEnergia: [
            ["Tipo de Energía", "Capacidad Instalada (MW)"],
            ["Solar", "1500"],
            ["Eólica", "800"],
            ["Hidroeléctrica", "500"],
            ["Biomasa", "300"],
            ["Geotérmica", "100"]
        ]
    };

    if (!data[chartId]) {
        alert("Datos no disponibles para la descarga.");
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    data[chartId].forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", chartId + ".csv");
    document.body.appendChild(link); // Requerido para Firefox

    link.click();
    document.body.removeChild(link);
}

// Función para inicializar todo
function init() {
    console.log("Inicializando la página...");
    initTyped();

    // Animar KPIs y gráficas al hacer scroll utilizando AOS
    // AOS ya está inicializado en el HTML, pero aseguramos que los eventos sean manejados
    document.addEventListener('aos:in', ({ detail }) => {
        const element = detail.target;
        // Verificar si el elemento es un KPI
        if (element.classList.contains('kpi-card')) {
            const kpiNumber = element.querySelector('.kpi-number');
            if (kpiNumber && !kpiNumber.getAttribute('data-animated')) {
                // Iniciar animación de KPI
                animarKPIs();
            }
        }

        // Verificar si el elemento es una gráfica
        if (element.classList.contains('chart-container')) {
            const canvas = element.querySelector('canvas');
            if (canvas && !canvas.dataset.initialized) {
                // Inicializar la gráfica correspondiente
                initCharts();
            }
        }
    });

    // Inicializar el mapa
    initMap();

    // Manejar el formulario de contacto si existe
    handleContactForm();
    console.log("Inicialización completada.");
}

// Ejecutar la función de inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', init);