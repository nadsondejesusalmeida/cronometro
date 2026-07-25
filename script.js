const timerEl = document.getElementById('timer');
const marksList = document.getElementById('marks-list');
const button = document.getElementById('power');

let intervalId = 0;
let timer = 0;
let marks = [];

const pauseIcon = `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" height="1.5em" width="1.5em"><path fill="currentColor" d="M29.25 38q-1.25 0-2.125-.875T26.25 35V13q0-1.25.875-2.125T29.25 10H35q1.25 0 2.125.875T38 13v22q0 1.25-.875 2.125T35 38ZM13 38q-1.25 0-2.125-.875T10 35V13q0-1.25.875-2.125T13 10h5.75q1.25 0 2.125.875T21.75 13v22q0 1.25-.875 2.125T18.75 38Z"/></svg>`;
const playIcon = `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" height="1.5em" width="1.5em"><path fill="currentColor" d="M18.3 36.4q-.75.5-1.525.05Q16 36 16 35.1V12.6q0-.9.775-1.35.775-.45 1.525.05L36 22.6q.7.45.7 1.25T36 25.1Z"/></svg>`;

const formatTime = (time) => {
	const hours = Math.floor(time / 360000);
	const minutes = Math.floor((time % 360000) / 6000);
	const seconds = Math.floor((time % 6000) / 100);
	const hundredths = time % 100;

	return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${hundredths.toString().padStart(2, '0')}`;
}

const addMarkToList = (markIndex, markTime) => {
	marksList.innerHTML += `<p>Marca ${markIndex}: ${formatTime(markTime)}</p>`;
}

const markTime = () => {
	marks.push(timer);
	addMarkToList(marks.length, timer);
	
}

const setTimer = (time) => {
	timerEl.innerText = formatTime(time);
}

const toggleTimer = () => {
	const action = button.getAttribute('action');


	clearInterval(intervalId);

	if (action == 'start' || action == 'continue') {
		intervalId = setInterval(() => {
			timer += 1;
			setTimer(timer);
		}, 10);

		button.setAttribute('action', 'pause');
		button.innerHTML = pauseIcon;
	} else if (action == 'pause') {
		button.setAttribute('action', 'continue');
		button.innerHTML = playIcon;
	}
}

const resetTimer = () => {
	clearInterval(intervalId);
	timer = 0;
	marks = [];
	setTimer(timer);
	marksList.innerHTML = '';
	button.setAttribute('action', 'start');
	button.innerHTML = playIcon;
}

document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('power').addEventListener('click', toggleTimer);
document.getElementById('mark').addEventListener('click', markTime);