var userScore = 0;
var compScore = 0;
const playBtn = document.querySelector(".intro button");
const introScreen = document.querySelector(".intro");
const matchScreen = document.querySelector(".match");
const userScore_span = document.getElementById("user-score");
const compScore_span = document.getElementById("comp-score");
const userMove = document.getElementById("user-choice");
const compMove = document.getElementById("comp-choice");
const userHand = document.getElementById("user-hand");
const compHand = document.getElementById("comp-hand");
const scoreBoard_div = document.querySelector(".score-board");
const result_div = document.querySelector(".result > p");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

function getComputerChoice() {
	const choices = ['r', 'p', 's'];
	const randomNumber = Math.floor(Math.random()*3);
	return choices[randomNumber];
}

function convertToWord(letter) {
	if (letter === "r") {
		return "Rock";
	} else if (letter === "p") {
		return "Paper";
	} else if (letter === "s") {
		return "Scissor";
	}
}

function convertToImageUser(letter) {
	if (letter === "r") {
		userHand.src = "images/rock.png";
	} else if (letter === "p") {
		userHand.src = "images/paper.png";
	} else if (letter === "s") {
		userHand.src = "images/scissors.png";
	}
}

function convertToImageComp(letter) {
	if (letter === "r") {
		compHand.src = "images/rock.png";
	} else if (letter === "p") {
		compHand.src = "images/paper.png";
	} else if (letter === "s") {
		compHand.src = "images/scissors.png";
	}
}

function checkEndGame(score) {
	if (score >= 5) {
		alert("GameOver! Click OK to restart");
		location.reload(); 
	}
}

function win(userChoice, computerChoice){
	const userChoice_div = document.getElementById(userChoice);
	userScore++;
	userScore_span.innerHTML = userScore;
	result_div.innerHTML =  convertToWord(userChoice) + " beats " + convertToWord(computerChoice) + ". You Win!";
	userMove.innerHTML = convertToWord(userChoice);
	compMove.innerHTML = convertToWord(computerChoice);

	convertToImageUser(userChoice);
	convertToImageComp(computerChoice);

	userChoice_div.classList.add("green-glow");
	setTimeout(function(){ userChoice_div.classList.remove("green-glow")}, 300);
	checkEndGame(userScore);
}


function lose(userChoice, computerChoice){
	const userChoice_div = document.getElementById(userChoice);
	compScore++;
	compScore_span.innerHTML = compScore;
	result_div.innerHTML = convertToWord(computerChoice) + " beats " + convertToWord(userChoice) + ". You Lose!";
	userMove.innerHTML = convertToWord(userChoice);
	compMove.innerHTML = convertToWord(computerChoice);
	convertToImageUser(userChoice);
	convertToImageComp(computerChoice);
	userChoice_div.classList.add("red-glow");
	setTimeout(function(){ userChoice_div.classList.remove("red-glow")}, 300);
	checkEndGame(compScore)
}

function draw(userChoice, computerChoice){
	const userChoice_div = document.getElementById(userChoice);
	userMove.innerHTML = convertToWord(userChoice);
	compMove.innerHTML = convertToWord(computerChoice);
	convertToImageUser(userChoice);
	convertToImageComp(computerChoice);
	result_div.innerHTML = "It's a Draw!";
	userChoice_div.classList.add("gray-glow");
	setTimeout(function(){ userChoice_div.classList.remove("gray-glow")}, 300);

}

function game(userChoice){
	const computerChoice = getComputerChoice();
	const hands = document.querySelectorAll('.hands img');
	hands.forEach(hand => {
		hand.addEventListener('animationend', function() {
			this.style.animation = '';
		});
	});
	setTimeout(() =>{
		switch(userChoice + computerChoice) {
		case "rs":
		case "sp":
		case "pr":
			win(userChoice, computerChoice);
			break;
		case "rp":
		case "ps":
		case "sr":
			lose(userChoice, computerChoice);
			break;
		case "rr":
		case "pp":
		case "ss":
			draw(userChoice, computerChoice);
			break;
		}
	}, 1500);
	userHand.style.animation = "shakeUser 1.5s ease";
	compHand.style.animation = "shakeComp 1.5s ease";
}

function main(){
	rock_div.addEventListener('click', function(){
	game("r");
	})
	paper_div.addEventListener('click', function(){
		game("p");
	})
	scissors_div.addEventListener('click', function(){
		game("s");
	})
	playBtn.addEventListener('click', function(){
		introScreen.classList.add("fadeOut");
		matchScreen.classList.add("fadeIn");
	})
}

main();