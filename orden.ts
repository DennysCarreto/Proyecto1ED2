class Orden {
    constructor(
        public tipo: 'compra' | 'venta',
        public compania: string,
        public cantidad: number,
        public precio: number,
        public usuario: string
    ) {}
}
