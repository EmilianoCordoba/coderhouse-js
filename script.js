document.addEventListener('DOMContentLoaded', function () {
    const operacionSelect = document.getElementById('operacion');
    const inputsDiv = document.getElementById('inputs');
    const resultadoDiv = document.getElementById('resultado');
    const historialDiv = document.getElementById('historial');

    // Cargar historial desde localStorage
    cargarHistorial();

    operacionSelect.addEventListener('change', function () {
        const selectedOption = operacionSelect.value;
        inputsDiv.innerHTML = '';

        if (selectedOption === 'cuadrado') {
            inputsDiv.innerHTML = '<label for="lado">Ingrese la longitud de un lado del cuadrado:</label>' +
                '<input type="number" id="lado" required>';
        } else if (selectedOption === 'rectangulo') {
            inputsDiv.innerHTML = '<label for="base">Ingrese la longitud de la base del rectángulo:</label>' +
                '<input type="number" id="base" required>' +
                '<label for="altura">Ingrese la altura del rectángulo:</label>' +
                '<input type="number" id="altura" required>';
        }
    });

    document.getElementById('calcularBtn').addEventListener('click', function () {
        const selectedOption = operacionSelect.value;
        new Promise((resolve) => {
            setTimeout(() => {
                let resultado = 'ERROR';

                if (selectedOption === 'cuadrado') {
                    const lado = parseFloat(document.getElementById('lado').value);
                    resultado = lado * lado;
                } else if (selectedOption === 'rectangulo') {
                    const base = parseFloat(document.getElementById('base').value);
                    const altura = parseFloat(document.getElementById('altura').value);
                    resultado = base * altura;
                }

                // Mostrar resultado en la interfaz
                resultadoDiv.textContent = 'El resultado es: ' + resultado;

                // Agregar operación al historial y actualizar localStorage
                agregarAlHistorial(selectedOption, resultado);

                // Actualizar el historial en la interfaz después de agregar una nueva operación
                cargarHistorial();

                // Resolvemos la promesa después de simular el cálculo
                resolve();
            }, 1000); // Simulamos una espera de 1 segundo
        });
    });
     
    function cargarHistorial() {
        // Intenta cargar desde localStorage primero
        const historialGuardado = JSON.parse(localStorage.getItem('historial'));
        
        if (historialGuardado && historialGuardado.length > 0) {
            mostrarHistorialEnInterfaz(historialGuardado);
        } else {
            // Si no hay datos en localStorage, carga desde la API
            fetch('http://localhost:3001/historial')
                .then(response => response.json())
                .then(data => {
                    mostrarHistorialEnInterfaz(data.historial);
                    
                    // Guardar en localStorage para futuras visitas
                    localStorage.setItem('historial', JSON.stringify(data.historial));
                })
                .catch(error => {
                    console.error('Error al cargar el historial:', error);
                });
        }
    }
    
    function mostrarHistorialEnInterfaz(historial) {
        historialDiv.innerHTML = '<h2>Historial</h2>';
        historial.forEach(op => {
            historialDiv.innerHTML += `<p>${op.operacion}: ${op.resultado}</p>`;
        });
    }
    
    function agregarAlHistorial(operacion, resultado) {
        fetch('http://localhost:3001/historial', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ operacion, resultado })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Operación agregada al historial:', data);
    
            // Obtener el historial actualizado del localStorage y agregar la nueva operación
            const historialGuardado = JSON.parse(localStorage.getItem('historial')) || [];
            historialGuardado.push(data);
    
            // Actualizar el localStorage
            localStorage.setItem('historial', JSON.stringify(historialGuardado));
        })
        .catch(error => {
            console.error('Error al agregar la operación al historial:', error);
        });
    }
    });

document.addEventListener('DOMContentLoaded', function () {
    // Resto del código...

    // Agrega un manejador de eventos para el evento beforeunload
    window.addEventListener('beforeunload', function () {
        // Limpia el historial al recargar la página
        limpiarHistorial();
    });

    function limpiarHistorial() {
        // Limpiar el historial almacenado en localStorage
        localStorage.removeItem('historial');
    }
});

// Importa el método necesario (por ejemplo, 'multiply' para multiplicar)
// Si estás usando un sistema de módulos (como con Webpack o ES6 modules):
// import { multiply } from 'lodash';

// Si lo estás incluyendo directamente a través del CDN, simplemente puedes usarlo directamente:
const resultado = _.multiply(5, 3);  // Esto devolverá 15 (5 * 3)
console.log(resultado);



