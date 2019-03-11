class CalcController
{

	constructor(){

		this._locale = 'pt-BR';
		this._displayCalcEl = document.querySelector("#display");
		this._dataEl = document.querySelector("#data");
		this._timeEl = document.querySelector("#hora");
		this.initButtonsEvents();

		this._currentDate;
		this.initialize();
		this._operation = [];
		//UTIMO OPERADOR
		this._lastOperator = '';
		//UTIMO NUMERO
		this._lastNumber = '';
	}

	initialize(){
		this.setDisplayDateTime();
		setInterval(() => {
			this.setDisplayDateTime();
		}, 1000);

	}

	addEventListenerAll(element, events, fnc){
		
		events.split(' ').forEach(event =>{
			element.addEventListener(event,fnc, false);
		});

	}

	//LIMPA TODA A OPERACAO
	clearAll(){
		this._operation = [];
		this._lastNumber = '';
		this._lastOperator = '';
		this.setLastNumberToDisplay();
	}

	clearEntry(){
		this._operation.pop();
		this.setLastNumberToDisplay();
	}

	getLastOperation(){
		return this._operation[this._operation.length - 1];
	}

	// VERIFICA O ULTIMO PARAMETRO PASSADO
	setLastOperation(value){
		this._operation[this._operation.length - 1] = value;
	}

	//VERIFICA SE E UM OPERADOR
	isOperator(value){
		return (['+','-','*','/','%'].indexOf(value) > -1);
	}

	//RESPONSAVEL POR FAZER O PUSH
	pushOperation(value){
		this._operation.push(value);

		if(this._operation.length > 3){

			this.calc();
		}
	}

	getResult(){
		return eval(this._operation.join(""));
	}

	getLastItem(isOperator = true){
		let lastItem;

		for(let i = this._operation.length - 1; i >= 0; i--){
			if(this.isOperator(this._operation[i]) == isOperator ){
				lastItem = this._operation[i];
				break;
			}
		}

		if(!lastItem){
			lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
		}

		return lastItem;
	}

	//CALCULA A OPERAÇÃO
	calc(){
		let last = '';
		this._lastOperator = this.getLastItem();

		if(this._operation.length < 3){
			let firstItem = this._operation[0];
			this._operation = [firstItem, this._lastOperator, this._lastNumber];
		}

		if(this._operation.length > 3){
			last = this._operation.pop();
			this._lastNumber = this.getResult();
		}else if(this._operation.length == 3){
			this._lastNumber = this.getLastItem(false);
		}

		// console.log('ultimo numero',this._lastNumber);
		// console.log('ultimo operador ',this._lastOperator);

		let result = this.getResult();

		if(last == '%'){
			result /= 100;
			this._operation = [result];

		}else{

			this._operation = [result];
			if(last) this._operation.push(last);

			
		}

		
		this.setLastNumberToDisplay();
	}

	//MOSTRA O ULTIMO NUMERO NO DISPLAY
	setLastNumberToDisplay(){

		let lastNumber = this.getLastItem(false); 
		let i;

		if(!lastNumber) lastNumber = 0;

		this.displayCalc = lastNumber;

	}

	//ADD NUMERO NA OPERACAO
	addOperation(value){

		// console.log('A', value, isNaN(this.getLastOperation()));

		if( isNaN(this.getLastOperation()) ){
			//STRING
			if(this.isOperator(value)){
				//TROCAR O OPERADOR
				this.setLastOperation(value);
			}else{
				this.pushOperation(value);
				this.setLastNumberToDisplay();
			}
		}else{

			if(this.isOperator(value)){
				this.pushOperation(value);
			}else{
				//NUMBER
				let newValue = this.getLastOperation().toString() + value.toString();
				this.setLastOperation(newValue);
				//ATUALIZAR DISPLAY
				this.setLastNumberToDisplay();
			}
		}

		// this._operation.push(value);
		console.log(this._operation);
	}

	//FNC ERROR
	setError(){
		this.displayCalc = "Erro! :(";
	}

	addDot(){
		//PEGA A ULTIMA COISA DA OPERAÇÃO
		let lastOperation = this.getLastOperation();

		if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

		if(this.isOperator(lastOperation) || lastOperation == undefined){
			this.getLastOperation()
			this.pushOperation('0.');
		}else{
			this.setLastOperation(lastOperation.toString() + '.');
		}

		this.setLastNumberToDisplay();
		console.log(this.setLastNumberToDisplay());
		

		console.log(lastOperation);
	}

	//EXECUTANDO OS BOTOES
	execBtn(value){
		switch(value){
			case 'ac':
				this.clearAll();
			break;
			case 'ce':
				this.clearEntry()
			break;
			case 'soma':
				this.addOperation('+');
			break;
			case 'subtracao':
				this.addOperation('-');
			break;
			case 'divisao':
				this.addOperation('/');
			break;
			case 'multiplicacao':
				this.addOperation('*');
			break;
			case 'porcento':
				this.addOperation('%');
			break;
			case 'ponto':
				this.addDot();
			break;
			case 'igual':
				this.calc();
			break;
			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				this.addOperation(parseInt(value));
			break;
			default:
				this.setError();
			break;
			
		}
	}

	//EVENTOS DO BOTÃO
	initButtonsEvents(){
		let buttons = document.querySelectorAll("#buttons > g, #parts > g");
		buttons.forEach((btn,index) =>{
			
			this.addEventListenerAll(btn,'click drag', e=>{
				let textBtn = btn.className.baseVal.replace("btn-","");
				this.execBtn(textBtn);
			});

			this.addEventListenerAll(btn, "mouseover mouseup mosedown", e =>{
				btn.style.cursor = "pointer";
			});
		});

	}

	//SETANDO DATA E HORA
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