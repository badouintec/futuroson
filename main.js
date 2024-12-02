// Función para animar los KPIs cuando entran en el viewport
function animarKPIs() {
    const counters = document.querySelectorAll('.kpi-number');
    counters.forEach(counter => {
        if (counter.getAttribute('data-animated') === 'true') return;

        const target = parseFloat(counter.getAttribute('data-target'));
        const unit = counter.getAttribute('data-unit') || '';
        const duration = 2000;
        const interval = 20;
        const steps = duration / interval;
        const increment = target / steps;
        let current = 0;

        const updateCount = () => {
            current += increment;
            if (current < target) {
                counter.innerText = target % 1 === 0 ? Math.ceil(current) + unit : current.toFixed(2) + unit;
                setTimeout(updateCount, interval);
            } else {
                counter.innerText = target + unit;
                counter.setAttribute('data-animated', 'true');
            }
        };

        updateCount();
    });
}

// Función para inicializar todas las gráficas de Chart.js
function initCharts() {
    const chartConfigs = [
        {
            id: 'pibChart',
            type: 'bar',
            data: {
                labels: ['2018', '2019', '2020', '2021', '2022'],
                datasets: [{
                    label: 'PIB Estatal (M USD)',
                    data: [32000, 33000, 31000, 34000, 35000],
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: 'Crecimiento del PIB Estatal' }
                },
                scales: { y: { beginAtZero: true } }
            }
        },
        {
            id: 'desempleoChart',
            type: 'line',
            data: {
                labels: ['2018', '2019', '2020', '2021', '2022'],
                datasets: [{
                    label: 'Tasa de Desempleo (%)',
                    data: [4.5, 4.2, 5.0, 4.8, 4.5],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' },
                    title: { display: true, text: 'Tasa de Desempleo' }
                },
                scales: { y: { beginAtZero: true } }
            }
        },
        {
            id: 'inversionChart',
            type: 'doughnut',
            data: {
                labels: ['2018', '2019', '2020', '2021', '2022'],
                datasets: [{
                    label: 'Inversión Extranjera Directa (M USD)',
                    data: [5000, 5500, 5300, 5800, 6000],
                    backgroundColor: [
                        'rgba(40, 167, 69, 0.6)',
                        'rgba(0, 123, 255, 0.6)',
                        'rgba(220, 53, 69, 0.6)',
                        'rgba(255, 193, 7, 0.6)',
                        'rgba(23, 162, 184, 0.6)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: true, text: 'Inversión Extranjera Directa en Sonora' },
                    legend: { position: 'top' }
                }
            }
        },
        {
            id: 'exportacionesChart',
            type: 'bar',
            data: {
                labels: ['2018', '2019', '2020', '2021', '2022'],
                datasets: [{
                    label: 'Exportaciones (M USD)',
                    data: [48000, 50000, 51000, 53000, 55000],
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: true, text: 'Exportaciones Totales' },
                    legend: { position: 'top' }
                },
                scales: { y: { beginAtZero: true } }
            }
        },
        {
            id: 'importacionesChart',
            type: 'bar',
            data: {
                labels: ['2018', '2019', '2020', '2021', '2022'],
                datasets: [{
                    label: 'Importaciones (M USD)',
                    data: [37000, 40000, 39000, 41000, 43000],
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: true, text: 'Importaciones Totales' },
                    legend: { position: 'top' }
                },
                scales: { y: { beginAtZero: true } }
            }
        },
        {
            id: 'nuevasEmpresasChart',
            type: 'line',
            data: {
                labels: ['2018', '2019', '2020', '2021', '2022'],
                datasets: [{
                    label: 'Nuevas Empresas Registradas',
                    data: [1500, 1600, 1700, 1800, 1900],
                    borderColor: 'rgba(255, 159, 64, 1)',
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: true, text: 'Crecimiento de Nuevas Empresas' },
                    legend: { position: 'top' }
                },
                scales: { y: { beginAtZero: true } }
            }
        },
        {
            id: 'crecimientoPoblacionalChart',
            type: 'line',
            data: {
                labels: ['2018', '2019', '2020', '2021', '2022'],
                datasets: [{
                    label: 'Crecimiento Poblacional (%)',
                    data: [2.3, 2.5, 2.4, 2.6, 2.7],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: true, text: 'Crecimiento Poblacional' },
                    legend: { position: 'top' }
                },
                scales: { y: { beginAtZero: true } }
            }
        },
        {
            id: 'sectorAgricolaChart',
            type: 'bar',
            data: {
                labels: ['2018', '2019', '2020', '2021', '2022'],
                datasets: [{
                    label: 'Producción Agrícola (M USD)',
                    data: [15000, 16000, 15500, 16500, 17000],
                    backgroundColor: 'rgba(255, 205, 86, 0.6)',
                    borderColor: 'rgba(255, 205, 86, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: true, text: 'Producción Agrícola' },
                    legend: { position: 'top' }
                },
                scales: { y: { beginAtZero: true } }
            }
        },
        {
            id: 'sectorIndustrialChart',
            type: 'bar',
            data: {
                labels: ['2018', '2019', '2020', '2021', '2022'],
                datasets: [{
                    label: 'Producción Industrial (M USD)',
                    data: [20000, 21000, 20500, 22000, 23000],
                    backgroundColor: 'rgba(201, 203, 207, 0.6)',
                    borderColor: 'rgba(201, 203, 207, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: true, text: 'Producción Industrial' },
                    legend: { position: 'top' }
                },
                scales: { y: { beginAtZero: true } }
            }
        }
    ];

    chartConfigs.forEach(config => {
        const canvas = document.getElementById(config.id);
        if (canvas) {
            canvas.parentElement.style.position = 'relative';
            canvas.parentElement.style.height = '300px';
            canvas.parentElement.style.width = '100%';
            new Chart(canvas.getContext('2d'), config);
        } else {
            console.warn(`No se encontró el canvas con ID: ${config.id}`);
        }
    });
}

// Función para inicializar el mapa con Leaflet.js
function initMap() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
        const map = L.map('map').setView([29.0700, -110.9500], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        L.marker([29.0700, -110.9500]).addTo(map)
            .bindPopup('Hermosillo, Sonora')
            .openPopup();
    } else {
        console.warn('Elemento del mapa no encontrado.');
    }
}

// Inicialización global
document.addEventListener('DOMContentLoaded', () => {
    animarKPIs();
    initCharts();
    initMap();
});