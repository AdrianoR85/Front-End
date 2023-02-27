export default class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    };

    appendNumbers(number) {
        if(this.currentOperand.includes('.') && number === '.') return;

        if(number === '%' && this.previousOperand !== ''){
            this.currentOperand = (this.previousOperand * this.currentOperand) / 100
        } else if(number !== '%') {
            this.currentOperand += number;
        } else {
            return
        }
    };

    chooseOperation(operation) {
        if(this.currentOperand === '') return;
        if(this.previousOperand !== "") {
            this.calculate();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';      
    };

    calculate() {
        let result;

        const previousOperandFloat = parseFloat(this.previousOperand);
        const currentOperandFloat = parseFloat(this.currentOperand);

        if(isNaN(previousOperandFloat) || isNaN(currentOperandFloat)) return

        switch(this.operation) {
            case '+':
                result = previousOperandFloat + currentOperandFloat;
                break;
            case '-':
                result = previousOperandFloat - currentOperandFloat;
                break;
            case 'x':
                result = previousOperandFloat * currentOperandFloat;
                break;
            case '÷':
                result = previousOperandFloat / currentOperandFloat;
                break;
            default:
                return
        };

        this.currentOperand = result
        this.previousOperand = ''
        this.operation = undefined

    };

    updateDisplay() {
        this.previousOperandElement.innerText = `${this.previousOperand}${this.operation || ''}`;
        this.currentOperandElement.innerText = this.currentOperand;
    }
    
    deleteLastDigit() {
        this.currentOperand = this.currentOperand.slice(0,-1)
    }

    clearAll() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    };

    changeSign() {
        this.currentOperand = this.currentOperand * (-1)
    }

};