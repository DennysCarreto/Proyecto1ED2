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
        break;
      } else {
        break; // No hay mas emparejamientos posibles
      }
    }
  }

  
}