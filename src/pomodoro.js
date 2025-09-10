//SETUP 

let timeLeft = 25*60;
let isRunning = false; 
let intervalRef = null; 
let inputTime = 25; 
let mode = "work";

//TIME FORMATTING

const formatTime = (seconds) => {
    const minutes = String(Math.floor(seconds/60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${minutes}:${secs}`;
};

//DEFINE FUNCTIONS 

function updateTimerDisplay() {
    document.getElementById('timer-display').textContent = formatTime(timeLeft);
}

function updateStartPauseButton() {
    const button = document.getElementById("start-pause-btn");
    const timeSelect = document.getElementById("time-input");
    if (isRunning) {
        button.innerHTML = `<img src="assets/pause.png" alt="pause" onmousedown="this.src='assets/pause-c.png'" onmouseup="this.src='assets/pause.png'">`;
        timeSelect.disabled = true;
    } else {
        button.innerHTML = `<img src="assets/start.png" alt="start" onmousedown="this.src='assets/start-c.png'" onmouseup="this.src='assets/start.png'">`;
        timeSelect.disabled = false;
    }
}

function updateModeDisplay() {
    document.getElementById("mode-display").textContent = mode === 'work' ? 'Work Time' : 'Break Time';
    
}

function updateCatImage() {
    const cat = document.getElementById("cat-container");
    
    if (isRunning) {
        if (mode === "work") {
            cat.innerHTML = `<img id="cat" src="assets/cat/cat-work.gif" alt="cat work">`;
        } else {
            cat.innerHTML = `<img id="cat" src="assets/cat/cat-rest.png" alt="cat rest">`;
        }
    } else {
        cat.innerHTML = `<img id="cat" src="assets/cat/cat-idle.PNG" alt="cat idle">`;
    }
}

const handleStartPause = () => {
    isRunning = !isRunning;
    updateTimerDisplay();
    updateStartPauseButton();
    updateCatImage();
};

const handleReset = () => {
    if (intervalRef) {
        clearInterval(intervalRef);
        intervalRef = null;
    }

    isRunning = false;
    timeLeft = mode === 'work' ? inputTime * 60 : 5 * 60;
    updateTimerDisplay();
    updateStartPauseButton();
    updateCatImage();
};

function handleInputTimeChange(newInputTime) {
    console.log('Input changed to:', newInputTime);
    inputTime = newInputTime;
    console.log('inputTime is now:', inputTime);

    if (!isRunning) {
        timeLeft = inputTime * 60;
        console.log('timeLeft is now:', timeLeft);
        updateTimerDisplay();
    }
}

//TIMER COUNTDOWN 

function startTimer () {
    const cat = document.getElementById("cat-container");

    if (isRunning && !intervalRef) {
        intervalRef = setInterval (() => {
            timeLeft = timeLeft - 1; 
            updateTimerDisplay();

            if (timeLeft === 0) {
                clearInterval(intervalRef);
                intervalRef = null;

                if (mode === "work") {
                    mode = 'break';
                    timeLeft = 5 * 60;
                    isRunning = true;
                } else {
                    mode = 'work';
                    timeLeft = inputTime * 60; 
                    isRunning = false;
                   
                }

                updateTimerDisplay();
                updateModeDisplay();
                updateStartPauseButton();
                updateCatImage();

                if (isRunning) {
                    startTimer();
                }
            }
        }, 1000); 
    }
}


//INITIALIZE PAGE

document.addEventListener('DOMContentLoaded', () => {
    updateTimerDisplay();
    updateStartPauseButton();
    updateModeDisplay();
    
    // Event listeners
    document.getElementById("start-pause-btn").addEventListener("click", () => {
        handleStartPause();
        if (isRunning) {
            startTimer();
        } else {
            clearInterval(intervalRef);
            intervalRef = null;
        }
    });

    document.getElementById('reset-btn').addEventListener('click', handleReset);
    
    document.getElementById('time-input').addEventListener('change', (event) => {
        console.log('Select changed:', event.target.value);
        const newTime = parseInt(event.target.value);
        handleInputTimeChange(newTime);
    });
});
