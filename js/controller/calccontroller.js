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
	}

	clearEntry(){
		this._operation.pop();
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
		return (['+','-','*','/','%','.'].indexOf(value) > -1);
	}

	//RESPONSAVEL POR FAZER O PUSH
	pushOperation(value){
		this._operation.push(value);

		if(this._operation.length > 3){
			// let last = this._operation.pop();

			this.calc();

			// console.log(this._operation);
		}
	}

	//CALCULA A OPERAÇÃO
	calc(){
		let last = this._operation.pop();
		let result = eval(this._operation.join(""));

		this._operation = [result, last];
	}

	//MOSTRA O ULTIMO NUMERO NO DISPLAY
	setLastNumberToDisplay(){
		
	}

	//ADD NUMERO NA OPERACAO
	addOperation(value){

		// console.log('A', value, isNaN(this.getLastOperation()));

		if( isNaN(this.getLastOperation()) ){
			//STRING
			if(this.isOperator(value)){
				//TROCAR O OPERADOR
				this.setLastOperation(value);
			}else if(isNaN(value)){
				//OUTRA COISA
				console.log(`OUTRA COISA `,value);
			}else{
				this.pushOperation(value);
			}
		}else{

			if(this.isOperator(value)){
				this.pushOperation(value);
			}else{
				//NUMBER
				let newValue = this.getLastOperation().toString() + value.toString();
				this.setLastOperation(parseInt(newValue));
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
				this.addOperation('.');
			break;
			case 'igual':
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