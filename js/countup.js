// Set the birth date (4th January 2008, 12:00 AM GMT)
const birthDate = new Date(Date.UTC(2008, 0, 4, 1, 0, 0)); // January is 0-indexed

function updateTimer() {
  // Current time in GMT
  const now = new Date();

  // Time difference in milliseconds
  const diff = now - birthDate;

  // Convert milliseconds to time components
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // Display the timer
  document.getElementById("ageTimer").textContent = 
    `${years} years, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

// Update the timer every second
setInterval(updateTimer, 1000);

// Initial update on page load
updateTimer();
