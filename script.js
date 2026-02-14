// Configuration
const CHAMBER_HEIGHT_OFFSET = 60; // Offset to keep icon within bounds (icon size + padding)
const CONTAINER_HEIGHT = 400;     // Matches CSS --chamber-height
const DRYING_SPEED_MS = 1000;     // Update every second for demo
const DRYING_AMOUNT = 2;          // Decrease moisture by 2% per tick

// State
let moistureLevel = 100; // 0 to 100%
let intervalId = null;

// DOM Elements
const gravityIcon = document.getElementById('gravity-icon');
const moistureText = document.getElementById('moisture-text');
const waterBtn = document.getElementById('water-btn');

function updateUI() {
    // Clamp moisture between 0 and 100
    if (moistureLevel < 0) moistureLevel = 0;
    if (moistureLevel > 100) moistureLevel = 100;

    // Update Text
    moistureText.innerText = `${moistureLevel}%`;

    // Update Gravity Icon Position
    // 100% moisture = 0px (top)
    // 0% moisture = CONTAINER_HEIGHT - CHAMBER_HEIGHT_OFFSET (bottom)
    const maxDrop = CONTAINER_HEIGHT - CHAMBER_HEIGHT_OFFSET;
    const currentTop = maxDrop - ((moistureLevel / 100) * maxDrop);

    gravityIcon.style.top = `${currentTop}px`;

    // Visual feedback for low moisture
    if (moistureLevel < 30) {
        gravityIcon.classList.add('falling');
        gravityIcon.innerHTML = '🍂'; // Change to dry leaf
        moistureText.style.color = 'var(--danger-color)';
    } else {
        gravityIcon.classList.remove('falling');
        gravityIcon.innerHTML = '💧'; // Water drop
        moistureText.style.color = 'var(--primary-color)';
    }
}

function simulateDrying() {
    moistureLevel -= DRYING_AMOUNT;
    updateUI();

    if (moistureLevel <= 0) {
        // Stop drying at 0, or keep it running to show it stays at 0
        moistureLevel = 0;
    }
}

async function restoreGravity() {
    // 1. Instant UI update
    moistureLevel = 100;
    updateUI();

    // 2. Trigger ESP32 (Stub)
    console.log("🌊 Restoring Gravity...");
    try {
        // Replace with your ESP32 IP address
        // const response = await fetch('http://192.168.1.100/water'); 
        // if (!response.ok) throw new Error('ESP32 connection failed');
        console.log("✅ Pump Activated via ESP32 (Simulation)");
    } catch (error) {
        console.warn("⚠️ Could not connect to ESP32 (Check console logs for details)");
        // In a real app, you might show a toast notification here
    }
}

// Event Listeners
waterBtn.addEventListener('click', restoreGravity);

// Start Simulation
intervalId = setInterval(simulateDrying, DRYING_SPEED_MS);

// Initial Render
updateUI();
