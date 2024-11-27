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

// Función para inicializar Typed.js (si se usa en indicadores.html)
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

// Función para inicializar las gráficas de Chart.js en home.html e indicadores.html
function initCharts() {
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

        new Chart(ctxPib, pibConfig);
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

        new Chart(ctxDesempleo, desempleoConfig);
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

        new Chart(ctxInversion, inversionConfig);
    }

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

        new Chart(ctxExportaciones, exportacionesConfig);
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

        new Chart(ctxImportaciones, importacionesConfig);
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

        new Chart(ctxNuevaEmpresarial, nuevaEmpresarialConfig);
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

        new Chart(ctxCrecimientoPoblacional, crecimientoPoblacionalConfig);
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

        new Chart(ctxSectorAgricola, sectorAgricolaConfig);
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

        new Chart(ctxSectorMineria, sectorMineriaConfig);
    }

    // Gráfica 10: Sector Energías Renovables
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

        new Chart(ctxSectorEnergia, sectorEnergiaConfig);
    }
}

// Función para inicializar el mapa con Leaflet.js
function initMap() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
        // Inicializar el mapa centrado en Sonora, México
        const map = L.map('map').setView([29.0700, -110.9500], 7); // Coordenadas aproximadas de Sonora

        // Añadir capa de tiles de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Añadir marcador de ejemplo
        L.marker([29.0700, -110.9500]).addTo(map)
            .bindPopup('Centro de Desarrollo Económico')
            .openPopup();

        // Añadir círculos para representar estadísticas
        // Ejemplo: Inversión en diferentes regiones
        const inversiones = [
            { coords: [29.0700, -110.9500], value: 5000, name: 'Hermosillo' },
            { coords: [31.3327, -111.0027], value: 3000, name: 'Nogales' },
            { coords: [27.9924, -109.4498], value: 2000, name: 'Guaymas' },
            { coords: [30.4501, -111.8448], value: 3500, name: 'Ciudad Obregón' },
            { coords: [25.5892, -109.0058], value: 1500, name: 'Ciudad Cuauhtémoc' }
        ];

        inversiones.forEach(inv => {
            L.circle(inv.coords, {
                color: 'blue',
                fillColor: '#blue',
                fillOpacity: 0.2,
                radius: inv.value // El radio está basado en el valor de inversión
            }).addTo(map)
              .bindPopup(`<strong>${inv.name}</strong><br>Inversión: ${inv.value.toLocaleString()} M USD`);
        });
    }
}

// Función para manejar el formulario de contacto (opcional)
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

// Función para inicializar todo
function init() {
    initTyped();
    animarKPIs();
    initCharts();
    initMap();
    handleContactForm();
}

// Ejecutar la función de inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', init);