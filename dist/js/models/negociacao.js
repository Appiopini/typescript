export class Negociacao {
     #data;
     #quantidade;
     #valor;
     
     contructor (data, quantidade, valor) {
          this.#data = data;
          this.#quantidade = quantidade;
          this.#valor = valor;
     }

     get data(){
          this.#data;
     }

     get quantidade(){
          this.#quantidade;
     }

     get valor(){
          this.#valor;
     }

     get volume(){
          return this.#quantidade * this.#valor;
     }
}


