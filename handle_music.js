var listMusic = [
    {
        id: 0,
        name: "Em gai mien Tay",
        path: "./music/em-gai-mien-tay.mp3",
        img: "https://i.ytimg.com/vi/MGhX2YOXkvM/mqdefault.jpg",
        album: "Nhac Lofi Mien Tay",
        author: "Dat Long Vinh"
    },
    {
        id: 2,
        name: "Anh ve mien Tay",
        path: "./music/anh-ve-mien-tay.mp3",
        img: "https://i.ytimg.com/vi/mVEhlN98Wqg/mqdefault.jpg",
        album: "Nhac Lofi Mien Tay",
        author: "Dat Long Vinh"
    },
    {
        id: 3,
        name: "Ve que ngoai",
        path: "./music/ve-que-ngoai.mp3",
        img: "https://i.ytimg.com/vi/LAqKrDNpqXc/mqdefault.jpg",
        album: "Nhac Lofi Mien Tay",
        author: "Dat Long Vinh"
    },
    {
        id: 4,
        name: "Duong ve hai thon",
        path: "./music/duong-ve-hai-thon.mp3",
        img: "https://i.ytimg.com/vi/OBHa9o5q8T0/mqdefault.jpg",
        album: "Nhac Lofi Mien Tay",
        author: "Dat Long Vinh"
    },
    {
        id: 5,
        name: "Doi mat nguoi xua",
        path: "./music/doi-mat-nguoi-xua.mp3",
        img: "https://i.ytimg.com/vi/11s0eHXnCsA/mqdefault.jpg",
        album: "Nhac Lofi Mien Tay",
        author: "Dat Long Vinh"
    },
    {
        id: 6,
        name: "Chim trang mo coi",
        path: "./music/chim-trang-mo-coi.mp3",
        img: "https://i.ytimg.com/vi/xvXy8w1yQEU/mqdefault.jpg",
        album: "Nhac Lofi Mien Tay",
        author: "Dat Long Vinh"
    },
    {
        id: 7,
        name: "Dat Phuong Nam",
        path: "./music/dat-phuong-nam.mp3",
        img: "https://i.ytimg.com/vi/BlrBpx-VCGU/mqdefault.jpg",
        album: "Nhac Lofi Mien Tay",
        author: "Dat Long Vinh"
    },
    {
        id: 8,
        name: "Ru lai cau ho",
        path: "./music/ru-lai-cau-ho.mp3",
        img: "https://i.ytimg.com/vi/6J_PZj1FnWA/mqdefault.jpg",
        album: "Nhac Lofi Mien Tay",
        author: "Dat Long Vinh"
    },
    {
        id: 9,
        name: "Con thuong rau dang moc sau he",
        path: "./music/con-thuong-rau.mp3",
        img: "https://i.ytimg.com/vi/A5b4KfmmTdk/mqdefault.jpg",
        album: "Nhac Lofi Mien Tay",
        author: "Dat Long Vinh"
    },
    {
        id: 10,
        name: "Ao moi Ca Mau",
        path: "./music/ao-moi-ca-mau.mp3",
        img: "https://i.ytimg.com/vi/nx5yM1xzMEs/mqdefault.jpg",
        album: "Nhac Lofi Mien Tay",
        author: "Dat Long Vinh"
    }
    
]

function getMusic() {
    var fullListMusic = "";
    listMusic.forEach(
        function(music){
            fullListMusic += `   
                <div class="music-item" id="${music.id}" onclick="getPath(${music.id})">
                    <div class="col-5">
                        <div class="music">
                            <div class="img-music">
                                <img src="${music.img}" alt="" class="img-one-music">
                                <i class="bi bi-play-fill play-icon"></i>
                            </div>
                            <div class="info-music">
                                <b>${music.name}</b>
                                <div class="title">${music.author}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-5">${music.album}</div>
                    <div class="col-2" id="time-music-${music.id}"></div>
                    <audio id="music${music.id}" src="${music.path}"></audio>
                </div>
            `;
            return fullListMusic;
        }
    );
    document.getElementById("list-music").innerHTML = fullListMusic;
    getTimeMusic();
}

// Get time song
function getTimeMusic(){
    listMusic.forEach(
        function(music){
            var timeMusic = document.getElementById("time-music-"+music.id);
            var pathMusic = music.path;
            
            var audio = new Audio(pathMusic);
            audio.addEventListener('loadedmetadata', function() {
                timeMusic.innerHTML = formatTime(audio.duration);
            });
        }
    )
}
function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = Math.floor(seconds % 60);
    var formattedTime = (minutes < 10 ? '0' : '') + minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
    return formattedTime;
}


// xu ly anh
function handelImgBottom(id){
    var leftBottom = document.querySelector(".left-bottom");
    listMusic.forEach(
        (music) => {
            if(music.id == id){
                leftBottom.innerHTML = `
                <div class="music">
                    <div class="img-music">
                        <img src="${music.img}" alt="" class="img-one-music">
                    </div>
                    <div class="info-music">
                        <b class="name-music">${music.name}</b>
                        <div class="title">${music.author}</div>
                    </div>
                </div>
                `;
            }
        }
    );
}

// stop outSong
function stopMusic(pathSrc) {
    const audioElements = document.querySelectorAll("audio");
    audioElements.forEach((audio) => {
        if(audio.src != pathSrc) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
}

// get link
var toPath = "";
var idMusic = "";
var dem = false;
function getPath(id) {
    var path = document.getElementById("music"+id);
    toPath = path;
    if(idMusic == id) PlayMusic();
    else if(idMusic != id && dem != false) handlePlayMusic();
    idMusic = id;
    dem = true;
    eventMusic();
    stopMusic(toPath.src);
    handleTimeMusicLast();
    handelImgBottom(idMusic);
}

// time bar
var timeProgress = document.querySelector("progress");
function handleTimeMusicLast() {
    var audio = new Audio(toPath.src);
    audio.addEventListener("loadedmetadata", function() {
        document.querySelector("#timeLast").innerHTML = formatTime(toPath.duration);
        timeProgress.setAttribute("max", toPath.duration);
    });
}
timeProgress.addEventListener("click",function(e){
    var result = (e.clientX-timeProgress.getBoundingClientRect().left) / timeProgress.offsetWidth *100;
    var valueTime = (timeProgress.max*result)/100;
    timeProgress.setAttribute("value", valueTime);
    toPath.currentTime = valueTime;
})
function handleTimeMusicFirst(){
    toPath.addEventListener("timeupdate", function(){
        document.querySelector("#timeFirst").innerHTML = formatTime(toPath.currentTime);
        timeProgress.setAttribute("value", toPath.currentTime);
    });
}

// click - run
function handlePlayMusic(){
    eventPlayMusic(toPath);
}

// click - stop
function handlePauseMusic(){
    eventPauseMusic(toPath);
}

// handle
    var playMusic = document.getElementById("play");
    var pauseMusic = document.getElementById("pause");
function eventPlayMusic(eventPlay){
    playMusic.style.display = "none";
    pauseMusic.style.display = "block";
    pauseMessage();
    eventPlay.play();
}

function eventPauseMusic(eventPause){
    playMusic.style.display = "block";
    pauseMusic.style.display = "none";
    playee.innerHTML = '<img src="https://i.scdn.co/image/ab67616d0000b273042a995a45715b26dd782560" alt="Lofi" class="img-lofi"><i class="bi bi-play-circle play-icon"></i>';
    playe.innerHTML = '<i class="bi bi-play-fill" style="margin-right: 8px;"></i>TIEP TUC PHAT';
    eventPause.pause();
}

function eventMusic(){
    playMusic.addEventListener("mouseup",function(){
        eventPlayMusic(toPath);
    });
    pauseMusic.addEventListener("mouseup", function(){
        eventPauseMusic(toPath);
    });
}

// Random ID
function randomID(){
    var generatedNumbers = [];
    for(var i = 0; i < listMusic.length; i++) {
        generateRandomNumber(generatedNumbers);
    }
    return generatedNumbers;    
}

// function random not trung
function generateRandomNumber(generatedNumbers) {
  var randomNumber = Math.floor(Math.random() * listMusic.length) + 1;
  while (generatedNumbers.indexOf(randomNumber) !== -1) {
    randomNumber = Math.floor(Math.random() * listMusic.length) + 1;
  }
  generatedNumbers.push(randomNumber);
}

var numberRD = randomID();
var isRandomOn = false;
function randomMusic() {
    var rd = document.getElementById("random");
    isRandomOn = !isRandomOn;
    if(isRandomOn){
        rd.style.color = "#9B4DE0";
    }
    else{
        rd.style.color = "white";
    }
}

// delete songing
function deletePlay(){
    var indexOfMusic = numberRD.indexOf(idMusic);
    for(var i = indexOfMusic; i < numberRD.length-1; i++){
        numberRD[i] = numberRD[i+1];
    }
    numberRD.pop();
}

// next song
function nextToPath(){
    if(isRandomOn){
        nextToRandom();
    }
    else{
        nextToNormal();
    }
}

// next song random
function nextToRandom(){
    if(numberRD.length === 0) {
        numberRD = randomID();
        deletePlay();
    }
    getPath(numberRD[0]);
    eventPlayMusic(toPath);
    deletePlay();
    pauseMessage();
}

// next song not random
function nextToNormal() {
    if(idMusic == listMusic.length) idMusic = 0;
    getPath(idMusic + 1);
    eventPlayMusic(toPath);
    pauseMessage();
}

// Lùi bài hát
function backToPath(){
    if(isRandomOn){
        nextToRandom();
    }
    else{
        backToNormal();
    }
}

// next left not random
function backToNormal() {
    if(idMusic == 1) idMusic = listMusic.length + 1;
    getPath(idMusic - 1);
    eventPlayMusic(toPath);
    playee.innerHTML = '<img src="https://i.scdn.co/image/ab67616d0000b273042a995a45715b26dd782560" alt="Lofi" class="img-lofi"><i class="bi bi-pause-circle play-icon"></i>';
    playe.innerHTML = '<i class="bi bi-pause-circle" style="margin-right: 8px;"></i>TAM DUNG';
}

// Lặp lại bài hát
var isRepeat = false;
function repeatMusic(){
    var repeat = document.getElementById("repeat");
    isRepeat = !isRepeat;
    if(isRepeat){
        repeat.style.color = "#9B4DE0";
        setInterval(function(){
            if(toPath.ended){
                getPath(idMusic);
                eventPlayMusic(toPath);
            }
        },1000);
    }
    else{
        repeat.style.color = "white";
    }
}


// dung
function pauseMessage(){
    playee.innerHTML = '<img src="https://i.scdn.co/image/ab67616d0000b273042a995a45715b26dd782560" alt="Lofi" class="img-lofi"><i class="bi bi-pause-circle play-icon"></i>';
    playe.innerHTML = '<i class="bi bi-pause-circle" style="margin-right: 8px;"></i>TAM DUNG';
}

// Chạy nhạc bên tay phải
var isPlay = true;
var playe = document.getElementById("playAll");
var playee = document.getElementById("playImg");
function PlayMusic(){
    isPlay = !isPlay;
    if(isPlay){
        handlePlayMusic();
    }
    else{
        handlePauseMusic();
    }
}
// Chạy
function run(){
    getMusic();
    getPath(1);
    setInterval(handleTimeMusicFirst,1000);
    setInterval(function(){
        if(toPath.ended){
            nextToPath();
        }
    },1000);
}
run();