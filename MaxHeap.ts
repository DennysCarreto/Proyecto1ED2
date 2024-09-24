class MaxHeap {
    private heap: number[]; // monticulo = heap
    private n: number; // n = numero de elementos

    constructor(size: number){
        this.heap = new Array(size+1);
        this.n = 0;
    }

    public getMax(): number{
        return this.heap[1];
    }

    public estaVacia():boolean{
        return this.n == 0;
    }

    public getTamanio(): number{
        return this.n;
    }

    public insert(valor: number){
        if(this.n == (this.heap.length -1)){
            this.resize(2*this.heap.length);
        }
        this.n++; 
        this.heap[this.n] = valor;
        this.swap(this.n)
    }
    // intercambiar
    private swap(i: number): void{
        let father: number = Math.floor(i/2);
        while(i>1 && this.heap[father]< this.heap[i]){
            let temp: number = this.heap[father];
            this.heap[i] = this.heap[father];
            this.heap[father] = temp;
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
}

//main
let myHeap: MaxHeap = new MaxHeap(7);
myHeap.insert(4);
myHeap.insert(5);
myHeap.insert(2);
myHeap.insert(6);
myHeap.insert(1);
myHeap.insert(3);
myHeap.insert(9);

console.log(myHeap[1])