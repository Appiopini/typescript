import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/nogociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";

export class NegociacaoController{
     private inputData: HTMLInputElement;
     private inputQuantidade: HTMLInputElement;
     private inputValor: HTMLInputElement;
     private negociacoes = new Negociacoes();
     private negociacoesView = new NegociacoesView('#negociacoesView', true);
     private mensagemView = new MensagemView('#mensagemView')

     constructor(){
          this.inputData = <HTMLInputElement>document.querySelector('#data');
          this.inputQuantidade = document.querySelector('#quantidade') as HTMLInputElement;
          this.inputValor = <HTMLInputElement>document.querySelector('#valor');
          this.negociacoesView.update(this.negociacoes);
     }

     public adiciona(): void{
          const negociacao = Negociacao.criaDe(
               this.inputData.value,
               this.inputQuantidade.value,
               this.inputValor.value
          );
          if(!this.diasSemana(negociacao.data)){
               this.mensagemView.update('Nogociações só podem ser feitas em dias úteis');
               return ;
          }
          
          this.negociacoes.adiciona(negociacao);
          this.atualizView();
          this.limpaNegociacao();
     }

     private diasSemana (data: Date){
          return data.getDay() > DiasDaSemana.DOMINGO 
               && data.getDay() < DiasDaSemana.SABADO;
     }

     // opcao para negociacao sem usar instancia
     
     // private criaNegociacao(): Negociacao{
     //      const exp = /-/g;
     //      const date = new Date(this.inputData.value.replace(exp, ','));
     //      const quantidade = parseInt(this.inputQuantidade.value);
     //      const valor = parseFloat(this.inputValor.value);
     //      return new Negociacao(date, quantidade, valor);
     // }

     private limpaNegociacao(): void{
          this.inputData.value = '';
          this.inputQuantidade.value = '';
          this.inputValor.value = '';
          this.inputData.focus();
     }

     private atualizView (){
          this.negociacoesView.update(this.negociacoes);
          this.mensagemView.update('Negociação adicionado com sucesso')
     }

}