console.log("connexion à js réussie");

//const inputColors = Array.arrayFrom(document.querySelectorAll(".input-colors"));

const bodyElement = document.body;
const bannerHeader = document.getElementById("bannerHeader");
const bannerFooter = document.getElementById("bannerFooter");

const displayParamZone = document.getElementById("displayParamZone");
const paramZone = document.getElementById("paramZone");
// const previewZone = document.getElementById("previewZone");
const hideParamZone = document.getElementById("hideParamZone");

const containerColors = document.querySelector(".container-colors");
const inputColors = document.querySelectorAll(".input-color");
const inputRange = document.querySelector(".input-range");

const buttons = document.querySelectorAll("button");
const btnRandom = document.getElementById("btnRandom");
const btnHide = document.getElementById("btnHide");
const btnDisplayBanner = document.getElementById("btnDisplayBanner");
const btnDisplayMain = document.getElementById("btnDisplayMain");
const btnDisplayLeftSide = document.getElementById("btnDisplayLeftSide");
const btnDisplayTransparent = document.getElementById('btnDisplayTransparent');


const infoSpan = document.getElementById("infoSpan");
const imgMinus = document.getElementById("imgMinus");
const imgPlus = document.getElementById("imgPlus");

var index = 3;
//var ref = previewZone;

var ref = bodyElement;

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
	//changeBackground();
	changeElementBg(ref);


	/*Ajouter un eventListener à chaque inputColor pour permettre le changement manuel des couleurs*/
	inputColors.forEach(inputC =>{
		inputC.addEventListener('input', setInputColorManually);});

	/* Ajouter un eventListener à la barre Range*/
	inputRange.addEventListener('input',(e)=> {
		gradientAngle = e.target.value * 3.6;
		//console.log("Inclinaison de "+gradientAngle+" degrés");
		//changeBackground();
		changeElementBg(ref);
	})

	/*Ajouter un eventListener aux boutons Plus et Moins*/
	buttons.forEach(btn => {
		btn.addEventListener('click', addRemoveColor);
	})

	/*Ajouter un eventListener au bouton Random */
	btnRandom.addEventListener('click', getRandomGradient);

	/*Ajouter un eventListener au bouton btnHide*/
	btnHide.addEventListener('click', () => {
		hideElement(paramZone);
		showElement(displayParamZone)});

	/*Ajouter un eventListener au bouton displayParamZone*/
	displayParamZone.addEventListener('click', () => {
		hideElement(displayParamZone);
		showElement(paramZone)});

	/*Ajouter un eventListener au bouton btnDisplayBanner */
	btnDisplayBanner.addEventListener('click', displayBanner);

	/*Ajouter un eventListener au bouton btnDisplayLeftSide */
	btnDisplayLeftSide.addEventListener('click', displayLeftSide);

	/*Ajouter un eventListener au bouton btnDisplayMain */
	btnDisplayMain.addEventListener('click', displayMain);

	/*Ajouter un eventListener au bouton btnDisplayTransparent */
	btnDisplayTransparent.addEventListener('click', displayTransparent);
}


/*Modifier l'affichage */
function hideElement(element) {
 	element.style.display = 'none';
}

function showElement(element) {
 	element.style.display = 'block';
}

function changeElementBg(element) {
	element.style.background = `linear-gradient(${gradientAngle}deg, ${colorValues})`;
}

function changeBackground(){
	bodyElement.style.background = `linear-gradient(${gradientAngle}deg, ${colorValues})`;
}

function displayTransparent() {
	main.style.background = 'transparent';
	hideElement(btnDisplayTransparent);
	
	var banners = [bannerHeader, bannerFooter];
	banners.forEach(function(banner){
		hideElement(banner);
	});

	showElement(hideParamZone);
	showElement(btnDisplayBanner);
	showElement(btnDisplayMain);
	showElement(btnDisplayLeftSide);

	bodyElement.style.alignItems = "center";
	main.style.minHeight = '97vh';
	main.style.minWidth = "100%";
	main.style.justifyContent = "center";
	paramZone.style.marginTop = '10vh';
	paramZone.style.marginLeft = 0;

	lightenButtons();
}

function displayBanner() {
	displayTransparent();

	hideElement(btnDisplayBanner);
	hideElement(hideParamZone);
	showElement(btnDisplayTransparent);

	main.style.background = '#F1F1F1';
	main.style.minHeight = '70vh';
	
	paramZone.style.margin = '2vh 0';

	darkenButtons();
}

function displayLeftSide() {
	displayTransparent();

	hideElement(hideParamZone);	
	hideElement(btnDisplayLeftSide);

	showElement(btnDisplayTransparent);
	showElement(btnDisplayBanner);
	showElement(btnDisplayMain);

	showElement(btnDisplayBanner);

	bodyElement.style.alignItems = "flex-start";

	main.style.justifyContent = "flex-start";
	main.style.backgroundColor = "#F1F1F1";
	main.style.minWidth = "20%";
	main.style.maxWidth = "50%";
	paramZone.style.marginLeft = "10vh";

	darkenButtons();
}

function displayMain() {
	displayTransparent();

	hideElement(btnDisplayMain);
	hideElement(hideParamZone);

	showElement(btnDisplayTransparent);
	showElement(btnDisplayBanner);
	showElement(btnDisplayLeftSide);

	var banners = [bannerHeader, bannerFooter];
	banners.forEach(function(banner){
		showElement(banner);
	});

	main.style.minHeight = '70vh';
	
	paramZone.style.margin = '7vh 0';

	darkenButtons();
}

function lightenButtons() {
	buttons.forEach(function(button) {
		button.style.backgroundColor = '#F1F1F1';
		button.style.color = 'inherit';
	} );

	imgMinus.src="img/minus.svg";
	imgPlus.src="img/plus.svg";
}

function darkenButtons() {
	buttons.forEach(function(button) {
		button.style.backgroundColor = '#333';
		button.style.color = '#F1F1F1';
	} );

	imgMinus.src="img/minus_light.svg";
	imgPlus.src="img/plus_light.svg";
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
		
		//changeBackground();
		changeElementBg(ref);
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
			//changeBackground();
			changeElementBg(ref);
			index--;
		}
	}

	// allInputs.forEach(inputC =>{
	// 	inputC.addEventListener('input', setInputColorManually);});
	
}

/* Créer un dégradé aléatoire*/
function getRandomGradient(e){
	infoSpan.innerHTML = '';
	const allInputsForRandom = document.querySelectorAll(".input-color");
	for (let i =0; i < allInputsForRandom.length; i++) {
		newRandomColor = `#${getRandomColor()}`;
		colorValues[i] = newRandomColor;
		setInputColor(allInputsForRandom[i], newRandomColor);
		//changeBackground();
		changeElementBg(ref);
	}
}

function getRandomColor() {
	return Math.floor(Math.random()*16777215).toString(16);
}

function setInputColor(element, color) {
	element.value = color.toUpperCase();
	element.style.background = color; 
}

function createInputColorElement(color) {
	var newColorElement = document.createElement('input');
	newColorElement.setAttribute("class","input-color");
	newColorElement.setAttribute("data-index",index);
	newColorElement.setAttribute("maxlength",7);
	setInputColor(newColorElement, `#${color}`);

	newColorElement.addEventListener('input', setInputColorManually);

	return newColorElement;
}

function setInputColorManually(e) {
	/*Récupérer l'index pour l'input sélectionné*/
	let currentIndex = e.target.getAttribute("data-index");

	/*Changer la valeur de la couleur pour cet input à partir de la saisie*/
	//e.target.value = e.target.value.toUpperCase();
	setInputColor(e.target, e.target.value);

	/* Mettre à jour le tableau colorValues et la couleur de bodyElement */
	//console.log(colorValues[currentIndex-1]);
	colorValues[currentIndex-1] = e.target.value.toUpperCase();
	//console.log(colorValues[currentIndex-1]);

	//changeBackground();
	changeElementBg(ref);
}

window.onload = initalizeGradient();

