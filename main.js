const image = document.querySelector("#cover")
const title = document.querySelector("#music-title")
const artist = document.querySelector("#music-artist")
const currentTimeEl = document.querySelector("#current-time")
const durationEl = document.querySelector("#duration")
const progress = document.querySelector("#progress")
const playerProgress = document.querySelector("#player-progress")
const prevBtn = document.querySelector("#prev")
const nextBtn = document.querySelector("#next")
const playBtn = document.querySelector("#play")
const background = document.querySelector("#bg-img")

const music = new Audio()

const songs = [
    {
        path: "./assets/playlist/song1.mp3",
        displayName: "Demeanor",
        arist: "Pop Smoke ft. Dua Lipa",
        cover: "./assets/images/image1.jpg"
    },
    {
        path: "./assets/playlist/song2.mp3",
        displayName: "Diet Mountain Dew",
        arist: "Lana Del Rey",
        cover: "./assets/images/image2.jpg"
    },
    {
        path: "./assets/playlist/song3.mp3",
        displayName: "Jeje",
        arist: "Diamond Platnumz",
        cover: "./assets/images/image3.jpg"
    },
]

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
if(isPlaying){
pauseMusic()
}
else {
    playMusic()
}
}

function playMusic() {
    isPlaying = true
    playBtn.classList.replace("fa-play", "fa-pause")
    playBtn.setAttribute("title", "pause")
    music.play()
}

function pauseMusic() {
    isPlaying = false
    playBtn.classList.replace("fa-pause", "fa-play")
    playBtn.setAttribute("title", "play")
    music.pause()
}

function loadMusic(song){
    music.src = song.path
    title.textContent = song.displayName
    artist.textContent = song.arist
    image.src = song.cover
    background.src = song.cover
}

function changeMusic(direction) {  
musicIndex = (musicIndex + direction  + songs.length) % songs.length
loadMusic(songs[musicIndex])
playMusic()
}

function updateProgressBar () {
    const {duration, currentTime} = music
    const progressPercent = (currentTime / duration) *100
    progress.style.width = `${progressPercent}%`

    const formatTime = (time) => String(Math.floor(time)).padStart(2, "0")
    durationEl.textContent = `${formatTime(duration / 60 )}:${formatTime(duration % 60)}`
    currentTimeEl.textContent = `${formatTime(currentTime / 60 )}:${formatTime(currentTime % 60)}`
}

function setProgressBar (e){
const width = playerProgress.clientWidth
const clickX = e.offsetX
music.currentTime = (clickX / width)* music.duration
}

playBtn.addEventListener("click", togglePlay)
prevBtn.addEventListener("click", ()=>changeMusic(-1))
nextBtn.addEventListener("click", ()=>changeMusic(1))
music.addEventListener("ended", ()=> changeMusic(1))
music.addEventListener("timeupdate", updateProgressBar)
playerProgress.addEventListener("click", setProgressBar)

loadMusic(songs[musicIndex])