class CalcController
{

	constructor(){
		this._displayCalc = "0";
		this._currentDate;
		this.initialize();
	}

	initialize(){
		let displayCalcEl = document.querySelector('[data-js="display"]');
		let dataEl = document.querySelector('[data-js="data"]');
		let timeEl = document.querySelector('[data-js="hora"]');
		
		displayCalcEl.innerHTML = 'RUBENS';
		dataEl.innerHTML = '07/03/2019';
		timeEl.innerHTML = '12:43:22';
	}

	/** GET **/

	get displayCalc(){
		return this._displayCalc;
	}

	get currentDate(){
		return this._currentDate;
	}

	/** SET **/

	set displayCalc(value){
		this.displayCalc = value;
	}

	set currentDate(value){
		this.currentDate = value;
	}

}