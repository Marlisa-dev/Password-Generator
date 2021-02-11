const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const sliderEl = document.getElementById("slider");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("get-password");
const copyEl = document.querySelector(".fa-copy");

const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol,
}

//Link range bar to length and make it dynamic
lengthEl.innerHTML = sliderEl.value;
sliderEl.oninput = function() {
	lengthEl.innerHTML = this.value;
}

//To generate the event listener
generateEl.addEventListener('click', () => {
	const length = +sliderEl.value;
	const hasUpper = uppercaseEl.checked;
	const hasLower = lowercaseEl.checked;
	const hasNumber = numbersEl.checked;
	const hasSymbol = symbolsEl.checked;

	resultEl.innerText = generatePassword(
		hasUpper, 
		hasLower, 
		hasNumber, 
		hasSymbol, 
		length
	);
});

//Copy Password to clipboard
copyEl.addEventListener('click', () => {
	const textarea = document.createElement('textarea');
	const password = resultEl.innerText;
	if (!password) {
		return;
	}
	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	textarea.remove();
	alert('Password copied to clipboard!');
})

//To genrate the password function
function generatePassword(lower, upper, number,symbol, length) {
	let generatedPassword = '';

	//1. Initialize a password variable
	const typesCount = lower + upper + number + symbol; 

	//2. Filter out unchecked types
	// The cruly brackets tune it to an array of objects. The filter keyword removes anyone that is not checked
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter
	(
		item => Object.values(item)[0]
		);
	if(typesCount === 0) {
		return '';
	}

	//3. Loop over the lensth and call generator function for each type
	for(let i = 0; i < length; i += typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}

	//4. Add final password to the password varibale and return it
	const finalPassword = generatedPassword.slice(0, length);
		return finalPassword;	
}

// functions to grab random elements based on what user checked.
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}
function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}
function getRandomNumber() {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}
function getRandomSymbol(){
	const symbols = '~!@#$%^&*(){}[]=;<>?'
	return symbols[Math.floor(Math.random() * symbols.length)]
}