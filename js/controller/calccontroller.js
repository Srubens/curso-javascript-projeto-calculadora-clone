class CalController{
    // metodo privado vem o _andelinePrimeiro
    
    constructor(){
        this._displayCalc = "0";
        this._currentDate;
        this.initialize();
    }

    initialize(){
        let displayCalcEl = document.querySelector('[data-js="display"]');
        let dateEl = document.querySelector('[data-js="data"]');
        let timeEl = document.querySelector('[data-js="hora"]');

        displayCalcEl.innerHTML = "4567";
        dateEl.innerHTML = "28/12/2018";
        timeEl.innerHTML = "18:30";

    }

    get displayCalc(){
        return this._displayCalc;
    }

    set displayCalc(vale){
        return this._displayCalc = value;
    }

    get dataAtual(){
        return this._currentDate;
    }

    set dataAtual(value){
        return this._currentDate = value;
    }

}