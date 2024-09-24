class Transaccion {
    constructor(
        public compania: string,
        public cantidad: number,
        public precio: number,
        public comprador: string,
        public vendedor: string
    ) {}
}