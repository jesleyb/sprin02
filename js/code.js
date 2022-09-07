let words = ["APPLE", "BANANA", "ORANGE", "MANGO", "GRAPES", "AVOCADO", "COCONUT", "PAPAYA", "CHERRY", "KIWI", "LIME", "PEACH", "PEAR"];
let errores = 0;
const MAX_ERRORES = 9;

function iniciar() {
	document.getElementById('caja-1').style.display = 'none';	
	document.getElementById('caja-3').style.display = 'none';
	document.getElementById('caja-2').style.display = 'block';
	
	nuevo();
}

function agregar() {
	document.getElementById('caja-1').style.display = 'none';
	document.getElementById('caja-2').style.display = 'none';
	document.getElementById('caja-3').style.display = 'block';
	
	const txtEntrada = document.getElementById('txtEntrada');
	txtEntrada.value = '';
	txtEntrada.focus();
}

function especiales(texto) {
	if(texto.match(/[^A-Z]/)){
		return true;    
	} else {
		return false;
	}
}

function guardar() {
	let texto = document.getElementById("txtEntrada").value.toUpperCase();
	if(texto != '') {
		if(especiales(texto)) {
			alert('No deben ser utilizadas letras con acentos ni caracteres especiales');
		} else {
			words.push(texto);
			iniciar();
		}
	}
}

function cancelar() {
	document.getElementById('caja-2').style.display = 'none';
	document.getElementById('caja-3').style.display = 'none';
	document.getElementById('caja-1').style.display = 'block';
	
	document.getElementById('idTeclear').value = '';
}

function nuevo() {
	document.getElementById('idMensaje').innerHTML = '';
	document.getElementById('idTeclear').value = '';
	const random_word = words[Math.random() * words.length | 0]
	
	const celdas = document.getElementsByClassName('borderclass');
	for(var i=0; i<celdas.length; i++) {
		if(random_word.length > i) {
			celdas[i].innerHTML = random_word[i];
			celdas[i].style.color = '#F3F5FC'
			celdas[i].style.borderColor = '#0A3871';
		} else {
			celdas[i].innerHTML = '';
			celdas[i].style.color = '#0A3871'
			celdas[i].style.borderColor = '#F3F5FC';
		}
	}
	errores = 0;
	dibujar_canvas(0);
}

function dibujar_canvas(index) {
	let canvas = document.getElementById('idCanvas');
	if(canvas.getContext) {
		const ctx = canvas.getContext('2d');
		ctx.strokeStyle = 'red';
		ctx.lineWidth = 2;
		switch(index) {
			case 0:	// Base
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.beginPath();
				ctx.moveTo(1, 198);
				ctx.lineTo(198, 198);
				ctx.stroke();				
				break;		
			case 1: // Poste
				ctx.beginPath();
				ctx.moveTo(50, 0);
				ctx.lineTo(50, 198);
				ctx.stroke();
				break;
			case 2: // Tramo
				ctx.beginPath();
				ctx.moveTo(50, 0);
				ctx.lineTo(150, 0);
				ctx.stroke();
				break;
			case 3: // Soga
				ctx.beginPath();
				ctx.moveTo(150, 0);
				ctx.lineTo(150, 20);
				ctx.stroke();
				break;
			case 4: // cabeza
				ctx.beginPath();
				ctx.arc(150, 40, 20, 0, 2 * Math.PI, false);
				ctx.stroke();
				break;
			case 5: // tronco
				ctx.beginPath();
				ctx.moveTo(150, 60);
				ctx.lineTo(150, 130);
				ctx.stroke();
				break;
			case 6: // pierna izq
				ctx.beginPath();
				ctx.moveTo(150, 130);
				ctx.lineTo(120, 160);
				ctx.stroke();
				break;
			case 7: // pierna der
				ctx.beginPath();
				ctx.moveTo(150, 130);
				ctx.lineTo(180, 160);
				ctx.stroke();
				break;
			case 8: // brazo izq
				ctx.beginPath();
				ctx.moveTo(150, 80);
				ctx.lineTo(120, 100);
				ctx.stroke();
				break;
			case 9: // brazo der
				ctx.beginPath();
				ctx.moveTo(150, 80);
				ctx.lineTo(180, 100);
				ctx.stroke();
				document.getElementById('idMensaje').innerHTML = 'Fin del juego!';
				break;
		}
	} else {
		alert('Tu navegador no soporta canvas');
	}
}

function teclear(e) {
	if(errores < MAX_ERRORES && e.keyCode > 64 && e.keyCode < 91) {
		const letter = e.key.toUpperCase();
		const celdas = document.getElementsByClassName('borderclass');
		var encontrado = false;
		for(var i=0; i<celdas.length; i++) {
			if(celdas[i].innerHTML == letter) {
				celdas[i].style.color = '#0A3871';
				encontrado = true;
			}
		}
		/* Revisar si ya se encontraron todas las letras */
		var terminado = true;
		for(var i=0; i<celdas.length; i++) {			
			if(celdas[i].style.color != 'rgb(10, 56, 113)') { 
				terminado = false;
				break;
			}
		}
		if(terminado) {
			document.getElementById('idMensaje').innerHTML = 'Ganaste<br>Felicidades!';
		} else {
			const idTeclear = document.getElementById('idTeclear');
			let historial = idTeclear.value;
			if(!encontrado && historial.indexOf(letter) == -1) {
				idTeclear.value = historial + letter;
				errores++;
				dibujar_canvas(errores);
			}
		}
	}
}
document.addEventListener('keyup', teclear);