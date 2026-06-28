
function updateClock() {
    const now = new Date();
    
    // Format the time as HH:MM:SS
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');
    
    const timeString = "Time: " + `${hours}:${minutes}:${seconds}`;
    
    // Insert the time string into the HTML element with id="clock"
    document.getElementById('clock').textContent = timeString;
}

// Run the clock immediately when the page loads
updateClock();

// Update the clock every second (1000 milliseconds)
setInterval(updateClock, 1000);

