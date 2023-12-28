let musicData  = [
    {
        "music" : 'music/music.mp3',
        "image" : "image.png",
        "title" : "Baby Open Your Eyes",
        "artis" : "Eminem, Justin Bieber & Duava"
    },
    {
        "music" : 'music/music2.mp3',
        "image" : "image2.jpg",
        "title" : "Attention",
        "artis" : "Charlie Puth"
    },
    {
        "music" : 'music/music3.mp3',
        "image" : "image3.jpg",
        "title" : "Dust Till Down",
        "artis" : "Zain Malik, Sia"
    },
    
]

musicData.forEach(item => {
    const htmlContent = `
      <div class="list">
        <div class="music">
            <div class="img">
            <img src="${item.image}" width="100" alt="">
            </div>
            <div class="detail">
            <p class="listtitle">${item.title}</p>
            <p class="listartis">${item.artis}</p>
            </div>
        </div>
    
      </div>
    `;
    $('.listWrap').append(htmlContent);
  });

$(".btn-toggle-pause").on("click", function() {
    wavesurfer.playPause();
    $('.iconPlay').toggleClass('fa-play')
    $('.iconPlay').toggleClass('fa-pause')
});
$('.playlist').hide();
$('.closePlaylist').on("click", function() { 
    $('.musicPlayer').show();
    $('.playlist').hide();
})
$('.playlistBtn').on("click", function() { 
    $('.musicPlayer').hide();
    $('.playlist').show();

 })
 
var currentMusicIndex = 0;
var isPlaying = false;

var wavesurfer = WaveSurfer.create({
    container: "#audiowave",
    waveColor: "#FFF",
    progressColor: "rgba(196, 196, 196, 0.356)",
    height: 40,
    responsive: true,
    hideScrollbar: true,
    cursorColor: "",
    cursorWidth: 0,
    barWidth: 1,
    barGap: 3,
    minPxPerSec: 20
});

function updateDetails() {
    $('.title').text(musicData[currentMusicIndex].title);
    $('.artis').text(musicData[currentMusicIndex].artist);
    $('.thumbnail img').attr('src', musicData[currentMusicIndex].image);
    $('.thumbnailBlur img').attr('src', musicData[currentMusicIndex].image);
}

wavesurfer.load(musicData[currentMusicIndex].music);

wavesurfer.on('ready', function() {
    var duration = wavesurfer.getDuration();
    var durationMinutes = Math.floor(duration / 60);
    var durationSeconds = Math.floor(duration - durationMinutes * 60);
    var durationFormatted = durationMinutes + ':' + (durationSeconds < 10 ? '0' : '') + durationSeconds;
    $('.musicTime').text(durationFormatted);
    wavesurfer.on('audioprocess', function() {
        var currentTime = wavesurfer.getCurrentTime();
        var currentTimeMinutes = Math.floor(currentTime / 60);
        var currentTimeSeconds = Math.floor(currentTime - currentTimeMinutes * 60);
        var currentTimeFormatted = currentTimeMinutes + ':' + (currentTimeSeconds < 10 ? '0' : '') + currentTimeSeconds;
        $('.timeStar').text(currentTimeFormatted);
    });
    updateDetails();
    wavesurfer.play();
});

$('.list').click(function() {
    var index = $(this).index();
    currentMusicIndex = index;
    wavesurfer.load(musicData[currentMusicIndex].music);
    updateDetails();
    wavesurfer.play();
    $('.musicPlayer').show();
    $('.playlist').hide();
    $(this).find('.iconPlay').toggleClass('fa-play fa-pause');

});
$('.btnPlayer.btn-toggle-next').click(function() {
    currentMusicIndex = (currentMusicIndex + 1) % musicData.length;
    wavesurfer.load(musicData[currentMusicIndex].music);
    updateDetails();
    wavesurfer.play();
});
$('.btnPlayer.btn-toggle-prev').click(function() {
    currentMusicIndex = (currentMusicIndex - 1 + musicData.length) % musicData.length;
    wavesurfer.load(musicData[currentMusicIndex].music);
    updateDetails();
    wavesurfer.play();
});
$('.playNow').click(function() {
    if (!isPlaying) {
        wavesurfer.play();
        $(this).html('<i class="fa-solid fa-pause"></i>');
    } else {
        wavesurfer.pause();
        $(this).html('<i class="fa-solid fa-play"></i>');
    }
    isPlaying = !isPlaying;
});