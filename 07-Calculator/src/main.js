import Calculator from "./Calculator.js";

const numbersKeys = document.querySelectorAll("[data-number]");
const operatorKeys = document.querySelectorAll("[data-operator]");
const clearAllKey = document.querySelector("[data-clearAll]");
const clearKey = document.querySelector("[data-clear]");
const equalsKey = document.querySelector("[data-equals]");
const changeSignKey = document.querySelector("[data-change]");

const previousOperandElement = document.querySelector("[data-previous-operand]");
const currentOperandElement = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousOperandElement, currentOperandElement)

for(const number of numbersKeys) {
    number.addEventListener('click', () => {
        calculator.appendNumbers(number.innerText)
        calculator.updateDisplay()
    })
}

for(const operator of operatorKeys) {
    operator.addEventListener('click', () => {
        calculator.chooseOperation(operator.innerText)
        calculator.updateDisplay()
    })
}

clearAllKey.addEventListener('click', () => {
    calculator.clearAll()
    calculator.updateDisplay()
})

clearKey.addEventListener('click', () => {
    calculator.deleteLastDigit()
    calculator.updateDisplay()
})

equalsKey.addEventListener('click', () => {
    calculator.calculate()
    calculator.updateDisplay()
})

changeSignKey.addEventListener('click', () => {
    calculator.changeSign()
    calculator.updateDisplay()
})


const mapKeyboard = {
    '0': 'number="0"',
    '1': 'number="1"',
    '2': 'number="2"',
    '3': 'number="3"',
    '4': 'number="4"',
    '5': 'number="5"',
    '6': 'number="6"',
    '7': 'number="7"',
    '8': 'number="8"',
    '9': 'number="9"',
    '%': 'number="%"',
    '+': 'operator="+"',
    '-': 'operator="-"',
    '*': 'operator="*"',
    '/': 'operator="/"',
    '=': 'equals="="',
    'Enter': 'equals="="',
    'Backspace': 'clear="c"',
    'Escape': 'clearAll="ce"',
    '.': 'number="."',
    ',': 'number="."',
}

const map = (e) => {
    const key = e.key
    console.log(key)
    const data = 'data-'+mapKeyboard[key]
    console.log(data)
    document.querySelector(`[${data}]`).click()
}

document.addEventListener('keydown', map)
