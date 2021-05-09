console.log("connexion à js réussie");

//const inputColors = Array.arrayFrom(document.querySelectorAll(".input-colors"));

const bodyElement = document.body;
const bannerHeader = document.getElementById("bannerHeader");
const bannerFooter = document.getElementById("bannerFooter");

const displayParamZone = document.getElementById("displayParamZone");
const paramZone = document.getElementById("paramZone");
const previewZone = document.getElementById("previewZone");
const hideParamZone = document.getElementById("hideParamZone");
const rangeZoneSingle = document.getElementById("rangeZoneSingle");
const rangeZoneDouble = document.getElementById("rangeZoneDouble");



const containerColors = document.querySelector(".container-colors");
const inputColors = document.querySelectorAll(".input-color");
const inputRangeSingle = document.getElementById("inputRangeSingle");
const inputRangeTop = document.getElementById("inputRangeTop");
const inputRangeHeader = document.getElementById("inputRangeHeader");
const inputRangeFooter = document.getElementById("inputRangeFooter");


const buttons = document.querySelectorAll("button");
const btnRandom = document.getElementById("btnRandom");
const btnHide = document.getElementById("btnHide");
const btnDisplayBanner = document.getElementById("btnDisplayBanner");
const btnDisplayMain = document.getElementById("btnDisplayMain");
const btnDisplayRightSide = document.getElementById("btnDisplayRightSide");
const btnDisplayWindow = document.getElementById('btnDisplayWindow');


const infoSpan = document.getElementById("infoSpan");
const displayMntTitle = document.getElementById("displayMntTitle");

const imgMinus = document.getElementById("imgMinus");
const imgPlus = document.getElementById("imgPlus");

var index = 3;

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

	/* Ajouter un eventListener à la barre RangeSingle*/
	inputRangeSingle.addEventListener('input',(e)=> {
		gradientAngle = getRandomAngle(e);
		//console.log("Inclinaison de "+gradientAngle+" degrés");

		changeElementBg(ref);
	})

	/* Ajouter un eventListener à la barre RangeTop*/
	inputRangeTop.addEventListener('input',(e)=> {
		gradientAngle = getRandomAngle(e);
		//console.log("Inclinaison de "+gradientAngle+" degrés");
		changeElementBg(bodyElement);
	})

	/* Ajouter un eventListener à la barre RangeHeader*/
	inputRangeHeader.addEventListener('input',(e)=> {
		gradientAngle = getRandomAngle(e);
		//console.log("Inclinaison de "+gradientAngle+" degrés");
		changeElementBg(bannerHeader);
	})

	/* Ajouter un eventListener à la barre RangeFotter*/
	inputRangeFooter.addEventListener('input',(e)=> {
		gradientAngle = getRandomAngle(e);
		//console.log("Inclinaison de "+gradientAngle+" degrés");
		changeElementBg(bannerFooter);
	})

	/*Ajouter un eventListener aux boutons Plus et Moins*/
	buttons.forEach(btn => {
		btn.addEventListener('click', addRemoveColor);
	})

	/*Ajouter un eventListener au bouton Random */
	btnRandom.addEventListener('click', getRandomGradient);

	/*Ajouter un eventListener au bouton btnHide*/
	btnHide.addEventListener('click', () => {
		main.style.minHeight = '80vh';
		hideElement(paramZone);
		btnDisplayZone.style.display = "flex";
		btnDisplayZone.style.justifyContent = "start";
		btnDisplayZone.style.flexDirection = "column";
		showElement(btnDisplayZone)});

	/*Ajouter un eventListener au bouton displayParamZone*/
	displayParamZone.addEventListener('click', () => {
		main.style.minHeight = '96.5vh';
		hideElement(btnDisplayZone);
		showElement(paramZone)});

	/*Ajouter un eventListener au bouton btnDisplayBanner */
	btnDisplayBanner.addEventListener('click', displayBanner);

	/*Ajouter un eventListener au bouton btnDisplayRightSide */
	btnDisplayRightSide.addEventListener('click', DisplayRightSide);

	/*Ajouter un eventListener au bouton btnDisplayMain */
	btnDisplayMain.addEventListener('click', displayMain);

	/*Ajouter un eventListener au bouton btnDisplayWindow */
	btnDisplayWindow.addEventListener('click', displayWindow);
}


/*Modifier l'affichage */
function hideElement(element) {
 	element.style.display = 'none';
}

function showElement(element) {
 	element.style.display = 'block';
}

function changeElementBg(element) {
	if(Array.isArray(element)){
		element.forEach(elementItem => changeBg(elementItem));
	}
	else {
		changeBg(element);
	}
}

function changeBg(element) {
	element.style.background = `linear-gradient(${gradientAngle}deg, ${colorValues})`;
}

// function changeBackground(){
// 	bodyElement.style.background = `linear-gradient(${gradientAngle}deg, ${colorValues})`;
// }

/*Affichage : dégradé sur toute la fenêtre - affichage par défaut*/
/*Fonction de réinitialisation de l'affichage*/
function displayWindow() {
	main.style.background = 'transparent';
	ref = bodyElement;
	hideElement(btnDisplayWindow);
	hideElement(previewZone);
	hideElement(rangeZoneDouble);


	var banners = [bannerHeader, bannerFooter];
	banners.forEach(function(banner){
		banner.style.minWidth = '100%';
		banner.style.background = '#F1F1F1';
		hideElement(banner);
	});
	bannerHeader.style.minHeight = '9vh';
	bannerFooter.style.minHeight = '18vh';

	showElement(rangeZoneSingle);
	showElement(hideParamZone);
	showElement(btnDisplayBanner);
	showElement(btnDisplayMain);
	showElement(btnDisplayRightSide);

	bodyElement.style.alignItems = "center";
	main.style.minHeight = '96.5vh';
	main.style.minWidth = "100%";
	main.style.justifyContent = "center";
	main.style.marginTop = "0";

	paramZone.style.margin = "10vh auto 0";

	displayMntTitle.style.marginTop ="20px";

	changeElementBg(ref);

	lightenButtons();
}

function displayBanner() {
	displayWindow();

	hideElement(btnDisplayBanner);
	hideElement(hideParamZone);
	hideElement(rangeZoneSingle);
	showElement(btnDisplayWindow);
	showElement(rangeZoneDouble);


	var banners = [bannerHeader, bannerFooter];
	banners.forEach(function(banner){
		changeElementBg(banner);
		showElement(banner);
		banner.style.minHeight = '12vh';
	});
	ref = banners;
	main.style.background = '#F1F1F1';
	main.style.minHeight = '75vh';
	//main.style.marginTop = "12vh";
	paramZone.style.margin = '2vh 0';
	displayMntTitle.style.marginTop = 0;

	darkenButtons();
}

function DisplayRightSide() {
	displayWindow();

	hideElement(hideParamZone);	
	hideElement(btnDisplayRightSide);

	showElement(previewZone);
	showElement(btnDisplayWindow);
	showElement(btnDisplayBanner);
	showElement(btnDisplayMain);

	showElement(btnDisplayBanner);

	bodyElement.style.alignItems = "flex-start";
	bodyElement.style.background = "#F1F1F1";

	//main.style.justifyContent = "flex-start";
	main.style.display ="inline-flex" ;
	main.style.minWidth = "100%";
	main.style.minHeight = "96.5vh";

	paramZone.style.margin = "10vh 20vh 0";

	darkenButtons();
	ref = previewZone;
	changeElementBg(ref);
}

function displayMain() {
	displayWindow();

	hideElement(btnDisplayMain);
	hideElement(hideParamZone);

	showElement(btnDisplayWindow);
	showElement(btnDisplayBanner);
	showElement(btnDisplayRightSide);

	var banners = [bannerHeader, bannerFooter];
	banners.forEach(function(banner){
		showElement(banner);
	});

	main.style.minHeight = '75vh';
	
	paramZone.style.margin = '7vh 0';
	displayMntTitle.style.marginTop = 0;

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

/*Créer un dégradé aléatoirement*/
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


/*Créer une couleur aléatoirement*/
function getRandomColor() {
	return Math.floor(Math.random()*16777215).toString(16);
}

/*Créer un angle aléatoirement*/
function getRandomAngle(e) {
	return e.target.value * 3.6;
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

