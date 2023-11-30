let operacion;
let resultado = 'ERROR';

const CUADRADO = 'cuadrado';
const RECTANGULO = 'rectangulo';

// Funciones para calcular las areas del cuadrado y rectangulo
function calcularAreaCuadrado(lado) {
    return lado * lado;
}

function calcularAreaRectangulo(base, altura) {
    return base * altura;
}

// Objetos para representar un cuadrado y un rectangulo
const cuadrado = {
    tipo: CUADRADO,
    calcularArea: function (lado) {
        return lado * lado;
    }
};

const rectangulo = {
    tipo: RECTANGULO,
    calcularArea: function (base, altura) {
        return base * altura;
    }
};

// Array conteniendo los objetos de operaciones permitidas
const operacionesPermitidas = [cuadrado, rectangulo];

// Método de búsqueda para saber si la operación es válida
function esOperacionValida(operacion) {
    return operacionesPermitidas.some(objeto => objeto.tipo === operacion);
}

operacion = prompt('Bienvenido al programa de cálculo de áreas!' + '\n'
    + 'Ingrese "cuadrado" para calcular el área de un cuadrado' + '\n'
    + 'Ingrese "rectangulo" para calcular el área de un rectángulo' + '\n'
    + 'Ingrese la operación que desea realizar:');

if (!esOperacionValida(operacion)) {
    alert('Operación incorrecta. Por favor, ingrese "cuadrado" o "rectangulo".');
}

switch (operacion) {
    case CUADRADO:
        let lado = +prompt('Ingrese la longitud de un lado del cuadrado:');
        resultado = cuadrado.calcularArea(lado);
        break;
    case RECTANGULO:
        let base = +prompt('Ingrese la longitud de la base del rectángulo:');
        let altura = +prompt('Ingrese la altura del rectángulo:');
        resultado = rectangulo.calcularArea(base, altura);
        break;
    default:
        alert('Operación incorrecta. Por favor, ingrese "cuadrado" o "rectangulo".');
}

alert('El resultado es: ' + resultado);