import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/nogociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
export class NegociacaoController {
    constructor() {
        this.negociacoes = new Negociacoes();
        this.negociacoesView = new NegociacoesView('#negociacoesView');
        this.mensagemView = new MensagemView('#mensagemView');
        this.inputData = document.querySelector('#data');
        this.inputQuantidade = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor');
        this.negociacoesView.update(this.negociacoes);
    }
    adiciona() {
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        if (!this.diasSemana(negociacao.data)) {
            this.mensagemView.update('Nogociações só podem ser feitas em dias úteis');
            return;
        }
        this.negociacoes.adiciona(negociacao);
        this.atualizView();
        this.limpaNegociacao();
    }
    diasSemana(data) {
        return data.getDay() > DiasDaSemana.DOMINGO
            && data.getDay() < DiasDaSemana.SABADO;
    }
    // private criaNegociacao(): Negociacao{
    //      const exp = /-/g;
    //      const date = new Date(this.inputData.value.replace(exp, ','));
    //      const quantidade = parseInt(this.inputQuantidade.value);
    //      const valor = parseFloat(this.inputValor.value);
    //      return new Negociacao(date, quantidade, valor);
    // }
    limpaNegociacao() {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';
        this.inputData.focus();
    }
    atualizView() {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionado com sucesso');
    }
}
