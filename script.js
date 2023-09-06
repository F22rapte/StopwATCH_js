// script.js
let startTime = 0;
let intervalId;
let isRunning = false;

const display = document.getElementById("display");
const startStopButton = document.getElementById("startStop");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

function formatTime(ms) {
    const date = new Date(ms);
    return date.toISOString().substr(11, 8);
}

function startStop() {
    if (!isRunning) {
        if (startTime === 0) {
            startTime = Date.now();
        } else {
            const pausedTime = Date.now() - startTime;
            startTime = Date.now() - pausedTime;
        }
        intervalId = setInterval(updateDisplay, 10);
        stopButton.disabled = false;
    } else {
        clearInterval(intervalId);
        stopButton.disabled = true;
    }
    isRunning = !isRunning;
}

function stopTimer() {
    if (isRunning) {
        clearInterval(intervalId);
        stopButton.disabled = true;
        isRunning = false;
    }
}

function reset() {
    stopTimer();
    startTime = 0;
    display.textContent = "00:00:00";
    startStopButton.disabled = false;
}

function updateDisplay() {
    const currentTime = Date.now() - startTime;
    display.textContent = formatTime(currentTime);
}

startStopButton.addEventListener("click", startStop);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", reset);
