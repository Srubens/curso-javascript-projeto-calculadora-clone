class CalController
{
    // metodo privado vem o _andelinePrimeiro
    
    constructor(){
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector('[data-js="display"]');
        this._dateEl = document.querySelector('[data-js="data"]');
        this._timeEl = document.querySelector('[data-js="hora"]');

        this._currentDate;
        this.initialize();
    }

    initialize(){
        this.setDisplayDateTime();
        setInterval( () =>{
            this.setDisplayDateTime();
        }, 1000 );
    }

    /* GET E SET DO DISPLAY TIME AND DATE  */

    setDisplayDateTime(){
        // this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
        //     day:"2-digit",
        //     month:"long",
        //     year:"numeric"
        // });
        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayTime(){
        this._timeEl.innerHTML;
    }
    
    set displayTime(value){
        this._timeEl.innerHTML = value;
    }

    get displayDate(){
        this._dateEl.innerHTML;
    }

    set displayDate(value){
        this._dateEl.innerHTML = value;
    }

    /* GET E SET DO DISPLAY TIME AND DATE  */

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }

}