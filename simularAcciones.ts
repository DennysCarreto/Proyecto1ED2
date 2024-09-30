import { MaxHeap } from './MaxHeap';
import { MinHeap } from './MinHeap';
import { Orden } from './orden';
import { Transaccion } from './transacciones';

export class SimularAcciones {
  private ordenesCompra: MaxHeap;
  private ordenesVenta: MinHeap;
  private transacciones: Transaccion[];

  constructor(tamanoInicial: number) {
    this.ordenesCompra = new MaxHeap(tamanoInicial);
    this.ordenesVenta = new MinHeap(tamanoInicial);
    this.transacciones = [];
  }

  insertarOrdenCompra(orden: Orden): void {
    if (orden.tipo !== 'compra') {
      throw new Error('Tipo de orden invalido para compra');
    }
    this.ordenesCompra.insert(orden);
    this.emparejarOrden();
  }

  insertarOrdenVenta(orden: Orden): void {
    if (orden.tipo !== 'venta') {
      throw new Error('Tipo de orden invalido para venta');
    }
    this.ordenesVenta.insert(orden);
    this.emparejarOrden();
  }

  private emparejarOrden(): void {
    while (!this.ordenesCompra.isEmpty() && !this.ordenesVenta.isEmpty()) {
      const ordenCompraTop = this.ordenesCompra.peek();
      const ordenVentaTop = this.ordenesVenta.peek();

      if (ordenCompraTop.precio >= ordenVentaTop.precio) {
        this.ejecutarTransaccion(ordenCompraTop, ordenVentaTop);
      } else {
        break; // No hay mas emparejamientos posibles
      }
    }
  }

  private ejecutarTransaccion(ordenCompra: Orden, ordenVenta: Orden): void {
    const precio = ordenVenta.precio; // La transaciomn ocurre al precio de venta
    const cantidad = Math.min(ordenCompra.cantidad, ordenVenta.cantidad);

    // Crear y registrar la transaccion
    const transaccion = new Transaccion(
      ordenCompra.compania,
      cantidad,
      precio,
      ordenCompra.usuario,
      ordenVenta.usuario
    );
    this.transacciones.push(transaccion);

    // Actualizar cantidades de las ordenes
    ordenCompra.cantidad -= cantidad;
    ordenVenta.cantidad -= cantidad;

    // Eliminar ordenes completamente llenas, reinsertar las parcialmente llenas
    this.ordenesCompra.getMax();
    this.ordenesVenta.getMin();

    if (ordenCompra.cantidad > 0) {
      this.ordenesCompra.insert(ordenCompra);
    }
    if (ordenVenta.cantidad > 0) {
      this.ordenesVenta.insert(ordenVenta);
    }
  }

  obtenerHistorialTransacciones(): Transaccion[] {
    return this.transacciones;
  }

  
}