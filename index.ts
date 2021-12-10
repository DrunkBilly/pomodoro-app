// const progress = document.documentElement.style.setProperty('--progress', '25');
const root                  = document.documentElement.style
const modeSelector          = document.querySelector('.mode-select-bar')!;
const pomodoro              = document.querySelector('.pomodoro')!;
const shortBreak            = document.querySelector('.short-break')!;
const longBreak             = document.querySelector('.long-break')!;
const pauseButton           = document.querySelector('.pause-button')!;
const pauseButtonText       = document.querySelector('.pause-text')!;
const restartButton         = document.querySelector('.restart-button')!;
const settingsButton        = <HTMLDivElement>document.querySelector('.settings')!;
const settingsButtonElement = <HTMLButtonElement>document.querySelector('.settings-button object')!;
const settingsMenu          = document.querySelector('.settings-menu')!;
const settingClose          = document.querySelector('.setting-close')!;
const settingPomodoro       = <HTMLInputElement>document.getElementById('pomodoro')!;
const settingShortBreak     = <HTMLInputElement>document.getElementById('short-break')!;
const settingLongBreak      = <HTMLInputElement>document.getElementById('long-break')!;

const timeSeconds  = document.querySelector('.seconds')!;
const timeMinutes  = document.querySelector('.minutes')!;

const restartButtonKeyFrames = [
    {color: 'transparent', offset: 0},
    {transform: 'rotateX(-90deg)', offset: 0},
    {color: 'unset', offset: 1},
    {transform: 'rotateX(0deg)', offset: 1}
];

let pause:boolean;
let pomodoroTime   = +settingPomodoro.value;
let shortBreakTime = +settingShortBreak.value;
let longBreakTIme  = +settingLongBreak.value;
let mode           = pomodoroTime;

let currentMinutes:number;
let currentSeconds:number;


let inSeconds:number;
let progress:number;
let step:number;
setTime(pomodoroTime);


pomodoro.addEventListener('click', () => {
    root.setProperty('--mode-selector', `${0}%`);
    showHideRestart(true);
    setTime(pomodoroTime);
    mode = pomodoroTime;
});

shortBreak.addEventListener('click', () => {
    root.setProperty('--mode-selector', `${100/3}%`);
    showHideRestart(true);
    setTime(shortBreakTime);
    mode =shortBreakTime;
});

longBreak.addEventListener('click', () => {
    root.setProperty('--mode-selector', `${100/1.5}%`);
    showHideRestart(true);
    setTime(longBreakTIme);
    mode = longBreakTIme;
});

pauseButtonText.addEventListener('click', () => {
    pause = (currentSeconds === 59 && currentMinutes === -1) ? true : pause ? false : true;
    pause ? pauseButtonText.innerHTML = 'RESUME' : pauseButtonText.innerHTML = 'PAUSE';
    showHideRestart(false);
});

restartButton.addEventListener('click', () => {
    setTime(mode);
    showHideRestart(false);
});

settingsButton.addEventListener('click', openCloseSetting);

settingClose.addEventListener('click', openCloseSetting);

settingPomodoro.addEventListener('input', () => {
    pomodoroTime = +settingPomodoro.value;
});

settingShortBreak.addEventListener('input', () => {
    shortBreakTime = +settingShortBreak.value;
});

settingLongBreak.addEventListener('input', () => {
    longBreakTIme = +settingLongBreak.value;
});


function setTime(timeSetting: number){
    currentMinutes = timeSetting;
    currentSeconds = 0;

    progress = 0;
    inSeconds = timeSetting * 60;
    step = 252 / inSeconds;
    pause = false;
}

function updateTime(){
    timeSeconds.innerHTML = (currentSeconds < 10) ? `0${currentSeconds}` : `${currentSeconds}`;
    timeMinutes.innerHTML = (currentMinutes < 10) ? `0${currentMinutes}` : `${currentMinutes}`;

    root.setProperty('--progress', `${(progress += step).toFixed(4)}`);
}

function openCloseSetting(){
    settingsMenu.classList.contains('hide') ? settingsMenu.classList.remove('hide') : settingsMenu.classList.add('hide');
    settingsMenu.classList.contains('hide') ? settingsButtonElement.style.transform = 'rotate(0deg)' : settingsButtonElement.style.transform = 'rotate(90deg)';
}

function showHideRestart(mode: boolean){
    if(mode && (currentSeconds === 59 && currentMinutes === -1)){
        restartButton.animate(restartButtonKeyFrames, {duration: 200, direction : 'reverse', fill: 'forwards'});
        return;
    }
    if(currentSeconds === 59 && currentMinutes === -1) return;
    if(mode) return;
    (pause) ? 
    restartButton.animate(restartButtonKeyFrames, {duration : 200, direction: 'normal', fill: 'forwards'}) 
    :restartButton.animate(restartButtonKeyFrames, {duration: 200, direction : 'reverse', fill: 'forwards'});
}



setInterval(() => {
    if(!pause){
        if(currentSeconds === 0 && currentMinutes === 0){
            pause = true;
            showHideRestart(false);
        } 
        updateTime();
        if(currentSeconds === 0){
            currentSeconds = 60;
            currentMinutes--;
        }
        currentSeconds--;
    }
}, 1000);