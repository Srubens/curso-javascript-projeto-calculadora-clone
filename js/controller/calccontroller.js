class CalcController
{

	constructor(){

		this._locale = 'pt-BR';
		this._displayCalcEl = document.querySelector("#display");
		this._dataEl = document.querySelector("#data");
		this._timeEl = document.querySelector("#hora");
		

		this._currentDate;
		this.initialize();
	}

	initialize(){
		this.setDisplayDateTime();
		setInterval(() => {
			this.setDisplayDateTime();
		}, 1000);	
	}

	setDisplayDateTime(){
		// this.displayDate = this.currentDate.toLocaleDateString(this._locale,{day:"2-digit",month:"long",year:"numeric"});
		this.displayDate = this.currentDate.toLocaleDateString(this._locale);
		this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
	}

	/** GET **/

	get displayCalc(){
		return this._displayCalcEl.innerHTML; 
	}

	get currentDate(){
		return new Date();
	}

	get displayTime(){
		return this._timeEl.innerHTML;
	}

	get displayDate(){
		return this._dataEl.innerHTML;
	}

	/** SET **/

	set displayCalc(value){
		this._displayCalcEl.innerHTML = value;
	}

	set currentDate(value){
		return this._currentDate = value;
	}

	set displayTime(value){
		return this._timeEl.innerHTML = value;
	}

	set displayDate(value){
		return this._dataEl.innerHTML = value;
	}

}