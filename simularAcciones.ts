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

    public insertarOrdenCompra(orden: Orden): void {
        if (orden.tipo !== 'compra') {
            throw new Error('Tipo de orden invalido para compra');
        }
        this.ordenesCompra.insert(orden);
        this.emparejarOrden();
    }

    public insertarOrdenVenta(orden: Orden): void {
        if (orden.tipo !== 'venta') {
            throw new Error('Tipo de orden invalido para venta');
        }
        this.ordenesVenta.insert(orden);
        this.emparejarOrden();
    }

    private emparejarOrden(): void {
        while (!this.ordenesCompra.isEmpty() && !this.ordenesVenta.isEmpty()) {
            const ordenCompraMax = this.ordenesCompra.peek();
            const ordenventaMin = this.ordenesVenta.peek();

            if (ordenCompraMax.precio >= ordenventaMin.precio) {
                this.ejecutarTransaccion(ordenCompraMax, ordenventaMin);
            } else {
                break; // No hay mas emparejamientos posibles
            }
        }
    }

    private ejecutarTransaccion(ordenCompra: Orden, ordenVenta: Orden): void {
        const precio = ordenVenta.precio; //La transaciomn ocurre al precio de venta
        const cantidad = Math.min(ordenCompra.cantidad, ordenVenta.cantidad);

        //crear y registrar la transaccion
        const transaccion = new Transaccion(
            ordenCompra.compania,
            cantidad,
            precio,
            ordenCompra.usuario,
            ordenVenta.usuario
        );
        this.transacciones.push(transaccion);

        //Actualizar cantidades de las ordenes
        ordenCompra.cantidad -= cantidad;
        ordenVenta.cantidad -= cantidad;

        //Eliminar ordenes completamente llenas
        this.ordenesCompra.getMax();
        this.ordenesVenta.getMin();

        if (ordenCompra.cantidad > 0) {
            this.ordenesCompra.insert(ordenCompra);
        }
        if (ordenVenta.cantidad > 0) {
            this.ordenesVenta.insert(ordenVenta);
        }
    }

    public obtenerHistorialTransacciones(): Transaccion[] {
        return this.transacciones;
    }

    //ordenes 
    public getOrdenCompra(): Orden[] {
        return this.getOrdenHeap(this.ordenesCompra);
    }

    public getOrdenVenta(): Orden[] {
        return this.getOrdenHeap(this.ordenesVenta);
    }

    private getOrdenHeap(heap: MaxHeap | MinHeap): Orden[] {
        const ordenes: Orden[] = [];
        const tempHeap = new (heap.constructor as any)(heap.getQuantity());
        
        while (!heap.isEmpty()) {
            const orden = heap instanceof MaxHeap ? heap.getMax() : heap.getMin();
            ordenes.push(orden);
            tempHeap.insert(orden);
        }

        //Restaurar el heap original
        while (!tempHeap.isEmpty()) {
            const orden = tempHeap instanceof MaxHeap ? tempHeap.getMax() : tempHeap.getMin();
            heap.insert(orden);
        }

        return ordenes;
    }

    public allOrden(): { compra: Orden[], venta: Orden[] } {
        return {
            compra: this.getOrdenCompra(),
            venta: this.getOrdenVenta()
        };
    }
}