// main.js

// Inicialización de Typed.js para animación de texto en el Hero
var typed = new Typed('#typed', {
    strings: ['Sonora a prueba de futuro', 'Inversión y Crecimiento', 'Innovación y Desarrollo'],
    typeSpeed: 50,
    backSpeed: 50,
    loop: true
});

// Animación de los KPIs
function animarKPIs() {
    const counters = document.querySelectorAll('.kpi-number');
    counters.forEach(counter => {
        counter.innerText = '0';
        const updateCount = () => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const unit = counter.getAttribute('data-unit') || '';
            const current = parseFloat(counter.innerText.replace(/[^0-9.-]+/g, ""));
            const increment = target / 100;

            if (current < target) {
                counter.innerText = Math.ceil(current + increment) + unit;
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target.toLocaleString() + unit;
            }
        };
        updateCount();
    });
}

// Datos para la gráfica de PIB
const datosPIB = {
    labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
    data: [28000, 29000, 30000, 31000, 30000, 32000, 33000, 34000]
};

// Crear gráfica de PIB
function crearGraficaPIB() {
    var ctx = document.getElementById('pibChart').getContext('2d');
    var pibChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: datosPIB.labels,
            datasets: [{
                label: 'PIB (M USD)',
                data: datosPIB.data,
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                y: {
                    ticks: {
                        callback: function(value) {
                            return value + ' M';
                        }
                    }
                }
            }
        }
    });
}

// Datos para la gráfica de Desempleo
const datosDesempleo = {
    labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
    data: [5.5, 5.0, 4.8, 4.5, 6.0, 5.2, 4.9, 4.7]
};

// Crear gráfica de Desempleo
function crearGraficaDesempleo() {
    var ctx = document.getElementById('desempleoChart').getContext('2d');
    var desempleoChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: datosDesempleo.labels,
            datasets: [{
                label: 'Tasa de Desempleo (%)',
                data: datosDesempleo.data,
                backgroundColor: '#dc3545'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 2000
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            }
        }
    });
}

// Validación y envío del formulario de contacto
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();
    // Validación básica
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    if (nombre === '' || email === '' || mensaje === '') {
        document.getElementById('formMessage').innerHTML = '<div class="alert alert-danger">Por favor, completa todos los campos.</div>';
        return;
    }
    // Simulación de envío
    document.getElementById('formMessage').innerHTML = '<div class="alert alert-success">Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.</div>';
    // Reiniciar el formulario
    document.getElementById('contactForm').reset();
});

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function () {
    animarKPIs();
    crearGraficaPIB();
    crearGraficaDesempleo();
});