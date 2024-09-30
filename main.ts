import { SimularAcciones } from './simularAcciones';
import { Orden } from './orden';

// main
// crear el objeto de tipo simularAcciones
const mercado = new SimularAcciones(25);

// imprimir
function imprimirTransacciones(mercado: SimularAcciones) {
    console.log('Historial:');
    mercado.obtenerHistorialTransacciones().forEach((transaccion, index) => {
        console.log(`${index + 1}. Compania: ${transaccion.compania}, Cantidad: ${transaccion.cantidad}, Precio: ${transaccion.precio}, Comprador: ${transaccion.comprador}, Vendedor: ${transaccion.vendedor}`);
    });
    console.log('');
}

// Función para imprimir las órdenes disponibles
function imprimirOrden(mercado: SimularAcciones) {
    console.log("Ordenes de Compra Disponibles:");
    mercado.getOrdenCompra().forEach((orden, index) => {
        console.log(`${index + 1}. Compania: ${orden.compania}, Cantidad: ${orden.cantidad}, Precio: ${orden.precio}, Usuario: ${orden.usuario}`);
    });
    //console.log("");

    console.log("Ordenes de Venta Disponibles:");
    mercado.getOrdenVenta().forEach((orden, index) => {
        console.log(`${index + 1}. Compania: ${orden.compania}, Cantidad: ${orden.cantidad}, Precio: ${orden.precio}, Usuario: ${orden.usuario}`);
    });
    //console.log("");
}


//  tipo, compania, cantidad, precio, usuario
const compra1 = new Orden('compra', 'accion 1', 10, 150, 'dennys');
const compra2 = new Orden('compra', 'accion 1', 5, 155, 'rolando');
const venta1 = new Orden('venta', 'accion 1', 7, 148, 'yosimar');
const venta2 = new Orden('venta', 'accion 1', 3, 152, 'lim');

console.log('Registrar ordenes')
mercado.insertarOrdenCompra(compra1);
console.log('compra')
// Imprimir las ordenes disponibles
imprimirOrden(mercado);

mercado.insertarOrdenCompra(compra2);
console.log('compra')
// Imprimir las ordenes disponibles
imprimirOrden(mercado);

mercado.insertarOrdenVenta(venta1);
console.log('venta')
// Imprimir las ordenes disponibles
imprimirOrden(mercado);

mercado.insertarOrdenVenta(venta2);
console.log('venta')
// Imprimir las órdenes disponibles
imprimirOrden(mercado);

//imprimir
imprimirTransacciones(mercado);

// Imprimir las ordenes disponibles
imprimirOrden(mercado);

//  tipo, compania, cantidad, precio, usuario
const compra3 = new Orden('compra', 'apple', 8, 2500, 'ling');
const venta3 = new Orden('venta', 'apple', 8, 2490, 'gissell');

mercado.insertarOrdenCompra(compra3);
mercado.insertarOrdenVenta(venta3);

//imprimir
imprimirTransacciones(mercado);
// Imprimir las ordenes disponibles actualizadas
imprimirOrden(mercado);
