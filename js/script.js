"use strict"
if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
} else {
	document.body.classList.add('no-touch');
}

/* Open & close modal window
 */
let modalWindow = document.querySelector('#modalWindow');
let btnOpenRules = document.querySelector('#rulesBtn');
let btnCloseRules = document.querySelector('#closeBtn');
let modalOverlay = document.querySelector('.modal__overlay');
//Відкриваємо правила
btnOpenRules.onclick = function () {
	modalWindow.className = "game__modal modal isActive"
}
//Закриваємо правила кнопкою Х
btnCloseRules.onclick = function () {
	modalWindow.className = "game__modal modal"
}
//Закриваємо правила кліком за межами модального вікна
modalOverlay.onclick = function () {
	modalWindow.className = "game__modal modal"
}
/**
 * Функціонал збільшення/зменшення та скидання рахунку.
 */
let playerScore = 0; //Змінна для зберігання рахунку
let opponentScore = 0;
//Обираемо та оголошуємо кнопки
// let btnPlusPoint = document.querySelector('#plusPoint');
// let btnMinusPoint = document.querySelector('#minusPoint');
let btnReset = document.querySelector('#resetBtn');

//Функція, яка змінює візуальне відображення рахунку
function updatePlayerScore() {
	let playerScoreValue = document.querySelector('#playerScore');
	playerScoreValue.innerText = playerScore;
}
function updateOpponentScore() {
	let opponentScoreValue = document.querySelector('#opponentScore');
	opponentScoreValue.innerText = opponentScore;
}
//Функція, яка збільшує рахунок на 1
function plusPointPlayer() {
	playerScore++;
	updatePlayerScore();
}
function plusPointOpponent() {
	opponentScore++;
	updateOpponentScore();
}
//Функція, яка зменшує рахунок на 1
// function plusPoint() {
// 	if (score > 0) {
// 		score--;
// 		updateScore();
// 	}
// }
//Функція, яка скидає рахунок до 0
function resetPoints() {
	let playerScoreValue = document.querySelector('#playerScore');
	let opponentScoreValue = document.querySelector('#opponentScore');
	playerScore = 0;
	opponentScore = 0;
	playerScoreValue.innerText = playerScore;
	opponentScoreValue.innerText = opponentScore;
}
//Функціонал кнопок додавання, зменшення та скидання рахунку
// btnPlusPoint.onclick = plusPoint;
// btnMinusPoint.onclick = minusPoint;
btnReset.onclick = resetPoints;

/**
 * Функціонал запуску гри (таймер, вибір супротивника,
 * оголошення результату, збільшення/зменшення рахунку)
 */
// Функціонал вибору елемента
//Оголошуємо змінні
let btnRock = document.querySelector('#rock');
let btnScissors = document.querySelector('#scissors');
let btnPaper = document.querySelector('#paper');
let playerSelection = 0;
//Клік по одній з кнопок прибирає інші за допомогою (display: none;)
btnRock.onclick = function () {
	playerSelection = 1;
	btnRock.style.visibility = "hidden";
	btnScissors.style.visibility = "hidden";
	btnPaper.style.visibility = "hidden";
	startRound();
}
btnScissors.onclick = function () {
	playerSelection = 2;
	btnScissors.style.visibility = "hidden";
	btnRock.style.visibility = "hidden";
	btnPaper.style.visibility = "hidden";
	startRound();
}
btnPaper.onclick = function () {
	playerSelection = 3;
	btnPaper.style.visibility = "hidden";
	btnScissors.style.visibility = "hidden";
	btnRock.style.visibility = "hidden";
	startRound();
}

let isRoundStarted = false; //"Захист від дурня" запобіжник для випадкових натискань
//Функція запуску раунду
function startRound() {
	if (isRoundStarted == true) {
		return 0;
	}; // якщо раунд триває - далі код не виконується
	isRoundStarted = true; // перемикач в стан раунд почався
	let resultBlock = document.querySelector('#resultBlock');
	resultBlock.style.display = "none";
	let playerBlock = document.querySelector('#playerBlock span');
	playerBlock.innerText = ""; // скидаємо значення поля вибору
	let opponentBlock = document.querySelector('#opponentBlock span');
	opponentBlock.innerText = "";
	let timerBlock = document.querySelector('#timerBlock');
	timerBlock.style.display = "block"; // вивід таймеру на екран
	let countdown = 3;
	let timerID = setInterval(function () {
		countdown--;
		timerBlock.innerText = countdown; // зворотній відлік
		if (countdown == 0) {
			clearInterval(timerID);
			resultRound();
		} // таймер на 0 - стоп раунд - виклик функції stopRound()
	}, 1000)
}
//Функція виводу результатів вибору
function resultRound() {
	let opponentSelections = randomSelection(1, 3);
	let playerBlock = document.querySelector('#playerBlock span');
	if (playerSelection == 1) {
		playerSelection = "Камінь";
		playerBlock.innerText = playerSelection;
	} else if (playerSelection == 2) {
		playerSelection = "Ножиці";
		playerBlock.innerText = playerSelection;
	} else {
		playerSelection = "Папір";
		playerBlock.innerText = playerSelection;
	};
	let opponentBlock = document.querySelector('#opponentBlock span');
	opponentBlock.innerText = opponentSelections;
	if (opponentSelections == 1) {
		opponentSelections = "Камінь";
		opponentBlock.innerText = opponentSelections;
	} else if (opponentSelections == 2) {
		opponentSelections = "Ножиці";
		opponentBlock.innerText = opponentSelections;
	} else {
		opponentSelections = "Папір";
		opponentBlock.innerText = opponentSelections;
	};
	/**
	 * Камінь = 1
		Ножиці = 2
		Папір = 3
	 * Камінь (1) > Ножиці (2)
		Ножиці (2) > Папір (3)
		Папір (3) > Камінь (1)
		1. Якщо вибір однаковий, вивести повідомлення "нічия".
		2. Якшо наш вибір б'є вибір супротивника +1 очко.
		3. Якщо вибір супротивника б'є наш - -1 очко.
	 */
	let resultBlock = document.querySelector('#resultBlock');
	resultBlock.style.color = "inherit";
	let timerBlock = document.querySelector('#timerBlock');
	if (playerSelection == opponentSelections) {
		timerBlock.style.display = "none"; // прибираємо таймер з екрану
		resultBlock.style.display = "inline-block";
		resultBlock.innerText = "Нічия";
	} else if (
		(playerSelection == "Камінь" && opponentSelections == "Ножиці") ||
		(playerSelection == "Ножиці" && opponentSelections == "Папір") ||
		(playerSelection == "Папір" && opponentSelections == "Камінь")
	) {
		timerBlock.style.display = "none"; // прибираємо таймер з екрану
		resultBlock.style.display = "inline-block";
		resultBlock.style.color = "green";
		resultBlock.innerText = "Ти переміг!";
		plusPointPlayer();
	} else {
		timerBlock.style.display = "none"; // прибираємо таймер з екрану
		resultBlock.style.display = "inline-block";
		resultBlock.style.color = "red";
		resultBlock.innerText = "Ти програв.";
		plusPointOpponent();
	};
	stopRound();
}
//Функція остановки раунду
function stopRound() {
	isRoundStarted = false; // перемикач в стан раунд закінчився
	btnRock.style.visibility = "visible";
	btnScissors.style.visibility = "visible";
	btnPaper.style.visibility = "visible"; // повертаємо всі елементи
	timerBlock.innerText = 3; // повертаємо початкове значення таймеру на 5
	// btnRock.style.fontSize = "1rem";
	// btnScissors.style.fontSize = "1rem";
	// btnPaper.style.fontSize = "1rem";

}
function randomSelection(min, max) {
	// випадкове число від min до (max+1)
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
}