console.log("connexion à js réussie");

//const inputColors = Array.arrayFrom(document.querySelectorAll(".input-colors"));
const inputColors = document.querySelectorAll(".input-color");
const inputRange = document.querySelector(".input-range");
const buttons = document.querySelectorAll("button");
const buttonRandom = document.getElementById("btnRandom");
const bodyElement = document.body;
const containerColors = document.querySelector(".container-colors");
const infoSpan = document.getElementById("infoSpan");


var index = 3;

//let colorValues = ["#FFD194", "#D1913C"];
var colorValues = ["#dc2430", "#7b4397"];
var gradientAngle = 45;

function initalizeGradient(){
	/*
	- Remplir les 2 premiers input-colors avec le code des 2 premières couleurs de colorValues
	- Colorer ces input avec les mêmes couleurs*/
	for (let i = 0; i<2; i++){
		setInputColor(inputColors[i], colorValues[i]);
	}

	/*Initialiser le dégradé par défaut*/
	changeBackground();

	/*Ajouter un eventListener à chaque inputColor pour permettre le changement manuel des couleurs*/
	inputColors.forEach(inputC =>{
		inputC.addEventListener('input', setInputColorManually);});

	/* Ajouter un eventListener à la barre Range*/
	inputRange.addEventListener('input',(e)=> {
		gradientAngle = e.target.value * 3.6;
		//console.log("Inclinaison de "+gradientAngle+" degrés");
		changeBackground();
	})

	/*Ajouter un eventListener aux boutons Plus et Moins*/
	buttons.forEach(btn => {
		btn.addEventListener('click', addRemoveColor);
	})

	/*Ajouter un eventListener au bouton Random */
	btnRandom.addEventListener('click', getRandomGradient);
}

 /*Ajouter / Retirer une couleur à la fin*/
function addRemoveColor(e) {
	const allInputs = document.querySelectorAll(".input-color");
	
	//if (e.target.className === "plus") {
	if (e.target.id === "btnPlus") {
		if (allInputs.length > 4) {
			//alert("5 couleurs max !");
			infoSpan.innerHTML = "5 couleurs max !";
			return;
		}
		infoSpan.innerHTML = '';
		
		const randomColor = getRandomColor();
		var newColor = createInputColorElement(randomColor);
		
		containerColors.appendChild(newColor);
		colorValues.push(`#${randomColor.toUpperCase()}`);
		
		changeBackground();
		index++;
	} 
	else if (e.target.id === "btnMinus"){
		if(allInputs.length === 2){
			infoSpan.innerHTML = "Il faut au moins 2 couleurs !";
		}
		else {
			infoSpan.innerHTML = '';
			allInputs[allInputs.length-1].remove();
			colorValues.pop();
			changeBackground();
			index--;
		}
	}

	allInputs.forEach(inputC =>{
		inputC.addEventListener('input', setInputColorManually);});
}

/* Créer un dégradé aléatoire*/
function getRandomGradient(e){
	infoSpan.innerHTML = '';
	const allInputsForRandom = document.querySelectorAll(".input-color");
	for (let i =0; i < allInputsForRandom.length; i++) {
		newRandomColor = `#${getRandomColor()}`;
		colorValues[i] = newRandomColor;
		setInputColor(allInputsForRandom[i], newRandomColor);
		changeBackground();
	}
}

function getRandomColor() {
	return Math.floor(Math.random()*16777215).toString(16);
}

function setInputColor(element, color) {
	element.value = color.toUpperCase();
	element.style.background = color; 
}

function changeBackground(){
	bodyElement.style.background = `linear-gradient(${gradientAngle}deg, ${colorValues})`;
}

function createInputColorElement(color) {
	var newColorElement = document.createElement('input');
	newColorElement.setAttribute("class","input-color");
	newColorElement.setAttribute("data-index",index);
	newColorElement.setAttribute("maxlength",7);
	setInputColor(newColorElement, `#${color}`);
	return newColorElement;
}

function setInputColorManually(e) {
	/*Récupérer l'index pour l'input sélectionné*/
	let currentIndex = e.target.getAttribute("data-index");

	/*Changer la valeur de la couleur pour cet input à partir de la saisie*/
	//e.target.value = e.target.value.toUpperCase();
	setInputColor(e.target, e.target.value);

	/* Mettre à jour le tableau colorValues et la couleur de bodyElement */
	colorValues[currentIndex-1] = e.target.value.toUpperCase();
	changeBackground();
}

window.onload = initalizeGradient();

