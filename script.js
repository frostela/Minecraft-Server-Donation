// Array of song URLs
const songs = [
    'Contents/Music_files/bgm1.mp3',
    'Contents/Music_files/bgm2.mp3',
    'Contents/Music_files/bgm3.mp3',
    'Contents/Music_files/bgm4.mp3',
    'Contents/Music_files/bgm5.mp3',
    'Contents/Music_files/bgm6.mp3',
    'Contents/Music_files/bgm7.mp3',
    'Contents/Music_files/bgm8.mp3',
    'Contents/Music_files/bgm9.mp3',
    'Contents/Music_files/bgm10.mp3',
    'Contents/Music_files/bgm11.mp3',
    'Contents/Music_files/bgm12.mp3',
    'Contents/Music_files/bgm13.mp3',
    'Contents/Music_files/bgm14.mp3'
];

const player = document.getElementById('music-player');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
const controlGif = document.getElementById('control-gif');
const musicControl = document.getElementById('music-control');

let isPlaying = false;
let isPaused = true;
let remainingSongs = [...songs];

function playRandomSong() {
    if (remainingSongs.length === 0) {
        remainingSongs = [...songs];
    }

    const randomIndex = Math.floor(Math.random() * remainingSongs.length);
    const selectedSong = remainingSongs.splice(randomIndex, 1)[0];

    player.src = selectedSong;
    player.play().catch(error => console.log('Playback failed:', error));
    isPlaying = true;
    isPaused = false;
    updateControlDisplay();
}

function updateControlDisplay() {
    if (isPaused) {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        controlGif.style.display = 'none';
    } else {
        playIcon.style.display = 'none';
        controlGif.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

function showPauseIcon() {
    if (isPlaying && !isPaused) {
        controlGif.style.display = 'none';
        pauseIcon.style.display = 'block';
    }
}

function showGif() {
    if (isPlaying && !isPaused) {
        controlGif.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

musicControl.addEventListener('click', () => {
    if (isPlaying) {
        if (isPaused) {
            player.play();
            isPaused = false;
        } else {
            player.pause();
            isPaused = true;
        }
    } else {
        playRandomSong();
    }
    updateControlDisplay();
});

player.addEventListener('ended', () => {
    setTimeout(playRandomSong, 3000);
});

// Show pause icon on hover if playing
musicControl.addEventListener('mouseenter', showPauseIcon);

// Show gif when not hovering and playing
musicControl.addEventListener('mouseleave', showGif);

// Initial state
updateControlDisplay();