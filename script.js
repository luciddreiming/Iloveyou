// DOM elements
const audioBox = document.getElementById('audio-box');
const kuromiBox = document.getElementById('kuromi-box');
const galleryBox = document.getElementById('gallery-box');
const audioSection = document.getElementById('audio-section');
const kuromiSection = document.getElementById('kuromi-section');
const gallerySection = document.getElementById('gallery-section');
const container = document.querySelector('.container');
const backButtons = document.querySelectorAll('.back-button');
const kuromiImage = document.getElementById('kuromi-image');
const kuromiMessage = document.getElementById('kuromi-message');
const audioPlayer = document.getElementById('audio-player');
const lyricLines = document.querySelectorAll('.lyric-line');

// Random messages for Kuromi box
const randomMessages = [
    "Hello, Baby!! Sobrang proud ako sayo!!",
    "Malakas man ang kalungkotan mo na iyan, kakayanin mo rin yang labanan at talunin kase ikaw na iyan!",
    "Sa panahon na malungkot ka, isipin mong may pasaway kang baby boy na bampira!",
    "I love youu, babyy!! You're always amazing!!",
    "You are the strongest person I know, and I believe in you!",
    "Labanan lang natin yang problema at mga bagay-bagay na gumugulo sa iyo, baby!!!",
    "Makakaya rin natin yang lagpasan!!!",
    "I love you so much, baby!! I'm super proud of you!!",
    "Thank you for being the most amazing person in my life! I'm so grateful to have you!",
    "You're my most special person na hindi ako magsasawang samahan, intindihin, ipaglaban, mahalin, alagaan, ibigay ang lahat at samahan umiyak kapag hindi na mapigilan ang mga tumutulong luha!"
];

// Box click handlers
audioBox.addEventListener('click', () => {
    container.style.display = 'none';
    audioSection.style.display = 'block';
    audioPlayer.play().catch(e => console.log("Autoplay prevented:", e));
    startLyricHighlight();
});

kuromiBox.addEventListener('click', () => {
    container.style.display = 'none';
    kuromiSection.style.display = 'block';
});

galleryBox.addEventListener('click', () => {
    container.style.display = 'none';
    gallerySection.style.display = 'block';
});

// Back button handlers
backButtons.forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.section').forEach(section => {
            section.style.display = 'none';
        });
        container.style.display = 'flex';
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        resetLyricHighlight();
    });
});

// Kuromi click handler
kuromiImage.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * randomMessages.length);
    kuromiMessage.textContent = randomMessages[randomIndex];
    
    // Working Kuromi image links
    const kuromiImages = [
        'images/kuromi1.png',
        'images/kuromi2.png',
        'images/kuromi3.png',
        'images/kuromi4.png',
        'images/kuromi5.png',
        'images/kuromi6.png',
        'images/kuromi7.png'
    ];
    const randomImage = kuromiImages[Math.floor(Math.random() * kuromiImages.length)];
    kuromiImage.src = randomImage;
});

// Lyric highlighting functionality
let highlightInterval;

function startLyricHighlight() {
    let currentLine = 0;
    resetLyricHighlight();
    
    // Highlight first line immediately
    lyricLines[currentLine].classList.add('active');
    
    // Clear any existing interval
    if (highlightInterval) clearInterval(highlightInterval);
    
    // Set interval to highlight next lines
    highlightInterval = setInterval(() => {
        lyricLines[currentLine].classList.remove('active');
        currentLine++;
        
        if (currentLine >= lyricLines.length) {
            clearInterval(highlightInterval);
            return;
        }
        
        lyricLines[currentLine].classList.add('active');
        
        // Scroll to keep current line visible
        lyricLines[currentLine].scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }, 5000); // Change every 3 seconds (adjust as needed)
}

function resetLyricHighlight() {
    lyricLines.forEach(line => {
        line.classList.remove('active');
    });
    if (highlightInterval) {
        clearInterval(highlightInterval);
        highlightInterval = null;
    }
}

// Initialize audio with user interaction
document.addEventListener('DOMContentLoaded', () => {
    // This ensures autoplay works after user interaction
    let audioPlayed = false;
    
    audioBox.addEventListener('click', () => {
        if (!audioPlayed) {
            audioPlayer.play().catch(e => console.log("Autoplay prevented:", e));
            audioPlayed = true;
        }
    });
});