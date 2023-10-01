// Função para atualizar relógios digitais para o Reino Unido e a Turquia
function updateClocks() {
    const ukClock = document.getElementById("uk-clock");
    const turkeyClock = document.getElementById("turkey-clock");

    const options = { timeZone: 'Europe/London', hour12: false };
    const ukTime = new Date().toLocaleTimeString('en-GB', options);

    options.timeZone = 'Europe/Istanbul';
    const turkeyTime = new Date().toLocaleTimeString('tr-TR', options);

    ukClock.innerText = ukTime;
    turkeyClock.innerText = turkeyTime;
}

setInterval(updateClocks, 1000);

// Timer Pomodoro
let timer;
let isRunning = false;

const timerElement = document.getElementById("timer");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");

startButton.addEventListener("click", toggleTimer);
resetButton.addEventListener("click", resetTimer);

function toggleTimer() {
    if (!isRunning) {
        startTimer();
        startButton.innerText = "Pausar";
    } else {
        pauseTimer();
        startButton.innerText = "Continuar";
    }
    isRunning = !isRunning;
}

function startTimer() {
    const startTime = new Date().getTime();
    timer = setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - startTime;
        const minutes = Math.floor((25 * 60 * 1000 - elapsedTime) / 60000);
        const seconds = Math.floor((25 * 60 * 1000 - elapsedTime) / 1000) % 60;

        timerElement.innerText = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

        if (elapsedTime >= 25 * 60 * 1000) {
            clearInterval(timer);
            timerElement.innerText = "25:00";
            isRunning = false;
            startButton.innerText = "Iniciar";
            // Adicione aqui qualquer ação que deseje realizar ao término do temporizador.
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
}

function resetTimer() {
    clearInterval(timer);
    timerElement.innerText = "25:00";
    isRunning = false;
    startButton.innerText = "Iniciar";
}

// Adicionar tarefas diárias
const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

addTaskButton.addEventListener("click", addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `<input type="checkbox"> ${taskText}`;
        taskList.appendChild(taskItem);
        taskInput.value = "";
    }
}

// Adicionar sites favoritos relacionados a tarefas
const favoritesList = document.getElementById("favorites-list");
const favoriteInput = document.getElementById("favorite-input");
const saveFavoriteButton = document.getElementById("save-favorite");

saveFavoriteButton.addEventListener("click", saveFavorite);

function saveFavorite() {
    const favoriteUrl = favoriteInput.value.trim();
    if (favoriteUrl !== "") {
        const favoriteItem = document.createElement("li");
        favoriteItem.innerHTML = `<a href="${favoriteUrl}" target="_blank">${favoriteUrl}</a>`;
        favoritesList.appendChild(favoriteItem);
        favoriteInput.value = "";
    }
}
