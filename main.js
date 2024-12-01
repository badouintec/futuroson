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
                    counter.innerText = current.toFixed(2) + unit;
                } else {
                    counter.innerText = Math.ceil(current) + unit;
                }
                setTimeout(updateCount, interval);
            } else {
                counter.innerText = target + unit;
                counter.setAttribute('data-animated', 'true');
            }
        };

        updateCount();
    });
}

// Función para descargar CSV
function downloadCSV(type) {
    const data = [
        ["Indicador", "Valor"],
        ["PIB", "35000 M USD"]
    ];
    let csvContent = "data:text/csv;charset=utf-8,";
    data.forEach(row => {
        csvContent += row.join(",") + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${type}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Inicializar AOS y animar KPIs
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true
    });
    animarKPIs();
    initializeChart();
});

// Función para inicializar el gráfico de Chart.js
function initializeChart() {
    try {
        const canvas = document.getElementById('myChart');
        if (!canvas) {
            console.error('Canvas element not found');
            return;
        }

        const ctx = canvas.getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
                datasets: [{
                    label: 'PIB Mensual (M USD)',
                    data: [5000, 6000, 7000, 8000, 9000, 10000],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'PIB Mensual'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: value => `${value} M USD`
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error initializing chart:', error);
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

    // Gráfica 1: PIB
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

    // Gráfica 2: Desempleo
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

    // Repite el mismo patrón para las demás gráficas (Gráficas 3 a 10)
    // Asegúrate de que cada gráfica tenga un ID único en el HTML y en el main.js
    // Por ejemplo:
    // Gráfica 3: Inversión
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

    // Continúa de la misma manera para las demás gráficas...
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

    if (contactForm && formMessage) {
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
    console.log("Inicializando la página...");

    // Animar KPIs al cargar la página
    animarKPIs();

    // Inicializar las gráficas
    initCharts();

    // Inicializar el mapa
    initMap();

    // Manejar el formulario de contacto si existe
    handleContactForm();

    console.log("Inicialización completada.");
}