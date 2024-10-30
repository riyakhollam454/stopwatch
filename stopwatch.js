let timer;
let isRunning = false;
let elapsedTime = 0;
let lapTimes = [];
let lastLapTime = 0;

const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const display = document.getElementById('display');
const lapsList = document.getElementById('lapsList');

startStopBtn.addEventListener('click', () => {
    if (!isRunning) {
        startStopBtn.textContent = 'Stop';
        timer = setInterval(updateDisplay, 1000);
    } else {
        startStopBtn.textContent = 'Start';
        clearInterval(timer);
    }
    isRunning = !isRunning;
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const currentLapTime = elapsedTime - lastLapTime;
        lastLapTime = elapsedTime;
        lapTimes.push(currentLapTime);
        displayLapTime(currentLapTime);
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    startStopBtn.textContent = 'Start';
    elapsedTime = 0;
    lastLapTime = 0;
    lapTimes = [];
    display.textContent = '00:00:00';
    lapsList.innerHTML = '';
});

function updateDisplay() {
    elapsedTime++;
    let hours = Math.floor(elapsedTime / 3600);
    let minutes = Math.floor((elapsedTime % 3600) / 60);
    let seconds = elapsedTime % 60;

    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function displayLapTime(lapTime) {
    let hours = Math.floor(lapTime / 3600);
    let minutes = Math.floor((lapTime % 3600) / 60);
    let seconds = lapTime % 60;

    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapTimes.length}: ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    lapsList.appendChild(lapItem);
}

function pad(unit) {
    return unit < 10 ? '0' + unit : unit;
}
