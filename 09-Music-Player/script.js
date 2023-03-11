const btnPlay = document.querySelector('#play')
const btnPrev = document.querySelector('#preview')
const btnNext = document.querySelector('#next')

const audio = document.querySelector("#audio")
const img = document.querySelector('#playImage')

const progress = document.querySelector('.timer__bars')
const progressBar = document.querySelector('.full-bar')

const songName = document.querySelector('#song-name')
const singerName = document.querySelector('#singer-name')

const songCurrentTime = document.querySelector('#songCurrentTime')
const songTotalTime = document.querySelector('#songTotalTime')

const songs = [
    {title: 'Best of Me', singer: 'Sum 41'},
    {title: 'Hear Me Now', singer: 'Bad Wolves'},
    {title: 'Truly Madly Deeply', singer: 'Savage Garden'},
    {title: 'Since U Been Gone', singer: 'Kelly Clarkson'}
]

let isPlaying = false
let songIndex = 0

loadSong(songs[songIndex])

function loadSong(song) {
    songName.innerText = song.title
    singerName.innerText = song.singer
    audio.src = `assets/music/${song.title}.mp3`
}

function prevSong() {
    songIndex--
    if(songIndex < 0) {
        songIndex = songs.length - 1
    }
    
    isPlaying = false
    loadSong(songs[songIndex])
    playSong()
}

function nextSong() {
    songIndex++
    if(songIndex > songs.length - 1) {
        songIndex = 0
    }
    
    isPlaying = false
    loadSong(songs[songIndex])
    playSong()
}

function pause() {
    img.src = './assets/image/play.svg'
    audio.pause()
    isPlaying = false
}

function play() {
    img.src = './assets/image/pause1.svg'
    audio.play() 
    isPlaying= true
}

function playSong() {
    if(isPlaying) {
        pause()
    } else {
        play()
    }
}

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100

    getSongTime(songCurrentTime, currentTime)
    getSongTime(songTotalTime, duration)
    progressBar.style.width = `${progressPercent}%`   
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

function getSongTime(element, time) {
    let minutes = Math.round(time / 60)
    let seconds = Math.round(time % 60)

    if(isNaN(time)){
        element.innerHTML = "00:00"
    } else {
        if(minutes < 10) {
            minutes = '0' + String(minutes) 
        }
    
        if(seconds < 10) {
            seconds = "0" + String(seconds)
        }
        element.innerHTML = `${minutes}:${seconds}`
    }
}


btnPrev.addEventListener('click', prevSong)
btnPlay.addEventListener('click', playSong)
btnNext.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)
audio.addEventListener('ended', nextSong);
progress.addEventListener('click', setProgress)