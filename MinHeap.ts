class MinHeapTask {
    private heap: number[]; // monticulo = heap
    private n: number; // n = numero de elementos

    constructor(size: number){
        this.heap = new Array(size+1);
        this.n = 0;
    }
    public checkMin(): string{
        return this.heap[1].getPrioridad() + this.heap[1].getNameTask();
    }

    // public getMin(): number {
    //     let min: number = this.heap[1];
    //     this.heap[1] = this.heap[this.n];
    //     this.heap[this.n] = 0;
    //     this.n--;
    //     this.sink(1); // Procedimiento que reestructura el árbol AVL*/
    //     return min;
    // 

    public estaVacia():boolean{
        return this.n == 0;
    }

    public getTamanio(): number{
        return this.n;
    }

    public insert(valor: number){
        if(this.n == (this.heap.length -1)){
            this.resize(2 * this.heap.length);
        }
        this.n++; 
        this.heap[this.n] = valor;
        this.swap(this.n)
    }
    // intercambiar
    private swap(i: number): void{
        let father: number = Math.floor(i/2);
        while(i>1 && this.heap[father].getPrioridad() > this.heap[i].getPrioridad()){
            let temp: Task = this.heap[father];
            this.heap[father] = this.heap[i];
            this.heap[i] = temp;
            i = father; // i = i/2
            father = Math.floor(i/2);
        }
    }

    private resize(newSize: number): void{
        let newHeap: number[] = new Array(newSize);
        for(let i = 0; i< this.heap.length; i++){
            newHeap[i] = this.heap[i];
        }
        this.heap = newHeap;
    }
    public sink(i: number): void{
        
    }

}
