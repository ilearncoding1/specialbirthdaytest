// Declare audio objects 
let countdownMusic = new Audio('sounds/ninjago.mp3');
countdownMusic.loop = true; // Keep playing until countdown reaches 0
let birthdaySound = new Audio('sounds/Devin.mp3');

let isPlaying = false; // Prevents multiple birthday sound plays

// Function to play countdown music
function startCountdownMusic() {
    countdownMusic.volume = 0.5; // Adjust volume if needed
    countdownMusic.play().catch(err => console.error("Error playing countdown music:", err));
}

// Ensure countdown music starts after user interaction
document.addEventListener('click', function() {
    if (countdownMusic.paused && !isPlaying) {
        startCountdownMusic();
    }
}, { once: true }); // Runs only once

// Countdown Logic
const birthdayDate = new Date('February 13, 2025 00:00:00').getTime();

const countdown = setInterval(() => {
    const now = new Date().getTime();
    const timeRemaining = birthdayDate - now;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

    if (timeRemaining < 0) {
        clearInterval(countdown); // Stop countdown

        document.getElementById("countdown").style.display = "none"; // Hide countdown
        document.getElementById("birthdayMessage").style.display = "block"; // Show birthday message
        document.getElementById("buttonsContainer").style.display = "flex"; // Show sound buttons

        // ✅ Stop countdown music
        countdownMusic.pause();
        countdownMusic.currentTime = 0;

        // ✅ Play birthday sound if not already playing
        if (!isPlaying) {
            birthdaySound.play().catch(err => console.error("Error playing birthday sound:", err));
            isPlaying = true;
        }

        // ✅ Trigger confetti celebration
        celebrateBirthday();

        // ✅ Show cake
        showCake();

        // ✅ Show Happy Birthday Banner
        showBanner();

        // 🎈 Start floating balloons after countdown is over
        startBalloons();

        // 🎊 Launch streamers from the sides
        launchStreamers();
    }
}, 1000); // Update every second

// Confetti animation
function celebrateBirthday() {
    confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#ff7a7a', '#ff33cc', '#ff7a7a', '#f0f0f0']
    });
}

// Show Happy Birthday Banner
function showBanner() {
  const banner = document.getElementById('birthdayBanner');
  banner.style.display = 'block';
  setTimeout(() => {
      banner.style.top = '20px'; // Slide down animation
  }, 100);
}

// Play/Stop Buttons
document.getElementById('playButton').addEventListener('click', () => {
    if (birthdaySound.paused) {
        birthdaySound.play().catch(err => console.error("Error playing sound:", err));
    }
});

document.getElementById('stopButton').addEventListener('click', () => {
    if (!birthdaySound.paused) {
        birthdaySound.pause();
        birthdaySound.currentTime = 0; // Reset
    }
});

// Share Button
document.getElementById('shareButton').addEventListener('click', () => {
    const currentUrl = window.location.href;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(currentUrl).then(() => {
            alert('URL copied to clipboard!');
        }).catch(err => {
            alert('Failed to copy URL: ' + err);
        });
    } else {
        // Fallback for older browsers
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = currentUrl;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('URL copied to clipboard!');
    }
});

// 🎈 Balloons Container
const balloonContainer = document.getElementById('balloon-container');

// Array of colors for balloons
const balloonColors = ['#ff7a7a', '#ff33cc', '#33ccff', '#ffcc33', '#7a7aff', '#ff80bf'];

function startBalloons() {
    // Start creating balloons after countdown ends
    for (let i = 0; i < 10; i++) {
        createBalloon();
    }
}

function createBalloon() {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');

    // Set random color for each balloon
    const randomColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
    balloon.style.backgroundColor = randomColor;

    balloon.style.left = Math.random() * 90 + 'vw';
    balloon.style.animationDuration = Math.random() * 5 + 7 + 's'; // Float up in 7-12 seconds (higher)
    balloon.addEventListener('click', popBalloon);
    balloonContainer.appendChild(balloon);
    
    setTimeout(() => {
        balloon.remove(); // Remove balloon when it reaches the top
        createBalloon(); // Create a new balloon after it disappears
    }, parseFloat(balloon.style.animationDuration) * 1000);
}

function popBalloon(event) {
    event.target.classList.add('popped');
    setTimeout(() => {
        event.target.remove();
        createBalloon(); // Replace popped balloon
    }, 500);
}

// 🎂 Birthday Cake Logic
const cake = document.getElementById('cake');

function showCake() {
    cake.style.display = 'block';
    setTimeout(() => {
        cake.style.bottom = '50px'; // Slide up the cake
    }, 100); 
}
function celebrateBirthday() {
  for (let i = 0; i < 2; i++) { // Two poppers, left and right
      const popper = document.createElement('div');
      popper.classList.add('party-popper');
      popper.innerHTML = '🎉'; // Party popper emoji
      popper.style.left = i === 0 ? '5%' : '95%'; // Left and right positions
      popper.style.transform = i === 0 ? 'rotate(-20deg)' : 'rotate(20deg)';

      document.body.appendChild(popper);
      setTimeout(() => popper.remove(), 2000); // Remove after animation
  }

  // Fire confetti to simulate the pop effect
  confetti({
      particleCount: 50,
      spread: 70,
      origin: { x: 0.1 } // Left side
  });
  confetti({
      particleCount: 50,
      spread: 70,
      origin: { x: 0.9 } // Right side
  });
}
// Run confetti every 5 seconds
setInterval(launchConfetti, 5000);
// Function to trigger confetti

function launchConfetti(event) {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: event.clientX / window.innerWidth, y: event.clientY / window.innerHeight }
    });
}

// For a single emoji
document.getElementById("partyPopper").addEventListener("click", launchConfetti);

// For multiple emojis
document.querySelectorAll(".popper").forEach(popper => {
    popper.addEventListener("click", launchConfetti);
    
});


