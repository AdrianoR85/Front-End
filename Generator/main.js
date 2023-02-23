const passwordEl = document.querySelector('#password')
const passwordLengthEl = document.querySelector('#password-length')
const barSecurity = document.querySelector('.bar')

const btnCopy = document.querySelector('#copy-password')
const btnRefresh = document.querySelector('#refresh')

const uppercaseCheck = document.querySelector('#uppercase-check')
const numbersCheck = document.querySelector('#numbers-check')
const symbolsCheck = document.querySelector('#symbols-check')

let passwordValue = 16

function generatePassword() {
    const chars = selectChars()
    
    let password = ''
    
    for(let i = 0; i < passwordValue; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
    } 
    passwordEl.value = password
    calculateSecurity()
}

function getPasswordLength() {
    passwordValue = passwordLengthEl.value
    updatePasswordValue()
    generatePassword()
}

function copyPassword() {
    navigator.clipboard.writeText(passwordEl.value)
}

function selectChars() {
    let chars = "abcdefghjkmnpqrstuvwxyz"

    const number = '123456789'
    const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
    const symbols = '?!@&*()[]'

    if(uppercaseCheck.checked) {
        chars += uppercase
    }

    if(numbersCheck.checked) {
        chars += number
    }

    if(symbolsCheck.checked) {
        chars += symbols
    }

    return chars
}

function updatePasswordValue() {
    const value = passwordLengthEl.value
    document.querySelector('.password-length-text').innerHTML = value
}

function calculateSecurity() {
    const percent = Math.round(
    (passwordValue / 64) * 25 + 
    (uppercaseCheck.checked ? 25: 0) +
    (numbersCheck.checked ? 25: 0) +
    (symbolsCheck.checked ? 25: 0))

    barSecurity.style.width = `${percent}%`
    barSecurity.classList.remove('completed')

    if(percent <= 50) {
        barSecurity.style.backgroundColor = '#eb5757'
    } else if(percent <= 80) {
        barSecurity.style.backgroundColor = '#f2c94c'
    } else {
        if(percent === 100) {
            barSecurity.classList.add('completed')
        }
        barSecurity.style.backgroundColor = '#27ae60'
    }
}

passwordLengthEl.addEventListener('input', getPasswordLength)
btnCopy.addEventListener('click', copyPassword)
uppercaseCheck.addEventListener("click", generatePassword)
numbersCheck.addEventListener("click", generatePassword)
symbolsCheck.addEventListener("click", generatePassword)
btnRefresh.addEventListener('click', generatePassword)
generatePassword()
