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
    });

    function cargarHistorial() {
        // Obtener historial desde localStorage
        const historial = JSON.parse(localStorage.getItem('historial')) || [];

        // Mostrar historial en la interfaz
        historialDiv.innerHTML = '<h2>Historial</h2>';
        historial.forEach(op => {
            historialDiv.innerHTML += `<p>${op.operacion}: ${op.resultado}</p>`;
        });
    }

    function agregarAlHistorial(operacion, resultado) {
        // Obtener historial desde localStorage
        const historial = JSON.parse(localStorage.getItem('historial')) || [];

        // Agregar nueva operación al historial
        historial.push({ operacion, resultado });

        // Actualizar localStorage con el nuevo historial
        localStorage.setItem('historial', JSON.stringify(historial));
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
