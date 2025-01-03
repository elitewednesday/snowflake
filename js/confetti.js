document.getElementById('confettie').addEventListener('click', () => {
    const confettiOverlay = document.getElementById('confetti-overlay');

    // Clear any existing confetti
    confettiOverlay.innerHTML = '';

    // Generate confetti pieces
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');

        // Randomize position, direction, and animation delay
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDelay = `${Math.random()}s`;
        confetti.style.setProperty('--direction', Math.random() > 0.5 ? 1 : -1);

        confettiOverlay.appendChild(confetti);
    }

    // Remove confetti after animation ends (3 seconds)
    setTimeout(() => {
        confettiOverlay.innerHTML = '';
    }, 3000);
});
