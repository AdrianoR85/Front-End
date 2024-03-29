const dropdown = document.querySelectorAll('.money_dropdown')
const selected = document.querySelectorAll('.money__selected')
const arrowChange = document.querySelector('.money__arrows-exchange')
const btnExchangeRate = document.querySelector('#btn-exchangeRate')

const url =  `https://v6.exchangerate-api.com/v6/a31d02156e4e27c7b7c246aa/latest/USD`

let listAll= ""
let flag01 = document.querySelector('#flag01')
let flag02 = document.querySelector('#flag02')
let cod01 = document.querySelector('#cod01')
let cod02 = document.querySelector('#cod02')

let isInverter = false

function change() {

    const cod01TXT = cod01.textContent
    const cod02TXT = cod02.textContent

    addClass(flag01,cod02TXT)
    cod01.textContent = cod02TXT

    addClass(flag02,cod01TXT)
    cod02.textContent = cod01TXT

    inverterValue()
}

function addClass(elem, cod) {
    elem.classList.remove()
    elem.classList = `fi fi-${countryCode[cod].toLowerCase()} fis`
}

for(let i = 0; i < dropdown.length; i++) {
    for (code in countryCode) {
        const span1 = document.createElement('span')
        const span2 = document.createElement('span')

        const li = document.createElement('li')

        span1.classList = `fi fi-${countryCode[code].toLowerCase()} fis`
        span2.textContent = code
        span2.classList = `code${i}`

        li.appendChild(span1)
        li.appendChild(span2)

        dropdown[i].appendChild(li)
    }

    listAll = document.querySelectorAll('li')
}

for(let index = 0; index < listAll.length; index++){
    listAll[index].addEventListener('click', () => {
        const codeText = listAll[index].childNodes[1].textContent
        const codeIndex = Number(listAll[index].childNodes[1].classList[0].slice(-1))

        if(codeIndex === 0) {
            addClass(flag01, codeText)
            cod01.textContent = codeText
        }

        if(codeIndex === 1) {
            addClass(flag02, codeText)
            cod02.textContent = codeText
        }

        exchangeRate()
    })
}


arrowChange.addEventListener('click', change)

async function exchangeRate() {
    let Country01 = document.querySelector('#converterFrom')
    let Country02 = document.querySelector('#converterTo')
    let rateCalcule = 0

    const response = await fetch(url)
    const rate = await response.json()

    const rateCountry01 = rate.conversion_rates[Country01.textContent]
    const rateCountry02 = rate.conversion_rates[Country02.textContent]

    if(rateCountry01 > rateCountry02) {
        rateCalcule = rateCountry01 / rateCountry02
    } else if (rateCountry01 < rateCountry02) {
        rateCalcule =  rateCountry01 * rateCountry02
    } else {
        rateCalcule = rateCountry02
    }

    rateCountry02.value = calc.toFixed(2)
    console.log(calc)
}

btnExchangeRate.addEventListener('click', exchangeRate)
