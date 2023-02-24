const eventDate = new Date('2023-09-05 19:51:30')

function distance(date) {
    const currentDate = Date.now()
    return Math.floor((eventDate - currentDate) / 1000)
} 

function updateDisplay (day, hour, minute, second) {
    document.querySelector('#seconds').innerHTML = `0${second}`.slice(-2)
    document.querySelector('#minutes').innerHTML = `0${minute}`.slice(-2)
    document.querySelector('#hours').innerHTML = `0${hour}`.slice(-2)
    document.querySelector('#days').innerHTML = day < 10 ? `0${day}` : day
}


const countDown = setInterval((date) => {
    const eventDayTime = distance(date);
    const seconds = eventDayTime % 60
    const minutes = Math.floor(eventDayTime % (60 * 60) / 60)
    const hours = Math.floor(eventDayTime % (60 * 60 * 24) / (60 * 60))
    const days = Math.floor(eventDayTime / (60 * 60 * 24))

    updateDisplay(days, hours, minutes, seconds)
    
    if(eventDayTime == 0) {
        clearInterval(countDown);
    }

}, 1000)


