//declarar un array para representar los asientos(false=vacio, true=reservado)
var airlineSeats = [
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false,
	false
];
//contador para rastrear el numero de asientos reservados
var busySeats = 0;
//declaramos una función que pintara los asientos ocupados
var paintSeats = function(array){
//llamamos a nuestro div "seats" para imprimir los asientos ocupados ahí
	var containerSeats = document.getElementById('seats');
//hacemos un for para recorrer cada asiento
	for(i=0; i<array.length; i++){
//aquí crearemos cada asiento reservado
		var seat = document.createElement('div');
		seat.className = 'seats';
//un if para declarar que asientos seran primera clase
		if(i < 4){
			seat.style.background = 'purple';
		} else{
			seat.style.background = 'yellow';
		}
//agregamos como hijo a seat
		containerSeats.appendChild(seat);
	}
};
//función para reservar
var reserve = function(){
//llamaremos al boton ya creado
	var btn = document.getElementById('btn');
//agregamos el escuchador al boton
	btn.addEventListener('click', chooseZone);
};
//declaramos que hara la funcion chooseZone
var chooseZone = function(){
	var choice = prompt(
		'Elije la zona a reservar \n 1. Primera clase \n 2. Clase Economica \n \n Ingresa el número de tu preferencia');
//un if para seleccionar los asientos de acuerdo a la eleccion del usuario
	if(choice == 1){
		checkFirstClassZone();
	} else if(choice == 2){
		checkEconomicZone();
	} else{
		alert('Por favor ingresa una opción valida.');
	}
};
//declaramos las funciones check llamadas anteriormente
var checkFirstClassZone = function (){
	var zone = 'Primera Clase';
//for recorrera hasta el elemento 3 por ser los de primera clase y verá si estan disponibles
	for(var index = 0; index<4; index++){
//if reservara los asientos vacios
		if(airlineSeats[index] === false){
			airlineSeats[index] = true;
			reserveSeat(index);
			paintTicket(index,zone);
			busySeats++;
			break;
//else if reasignara en caso de que la zona este llena
		}else if(index == 3 && airlineSeats[index] == true){
			reasingEconomicZone(zone);
		}
	}
};

var checkEconomicZone = function(){
	var zone = 'Economica';
//for recorrera los asientos economicos (desde el 4)
	for(index=4; index<10; index++){
//if reservara los asientos
		if(airlineSeats[index] === false){
			airlineSeats[index] = true;
			reserveSeat(index);
			paintTicket(index,zone);
			busySeats++;
			break;
//else if reasignara en caso de que la zona este llena
		}else if(index == 9 && airlineSeats[index] == true){
			reasingFirstClassZone(zone);
		}
	}
};

//declaramos función para ver los asientos reservados
 var reserveSeat = function(indexToPaint){
 	var seat = document.getElementsByClassName('seats');
 	seat[indexToPaint].textContent = 'Reservado';
 }


//declararemos las funciones de reasignación
 var reasingEconomicZone = function(zone){
 	if(busySeats == 10){
 		noSeats();
 		nextFlight();
 	}else{
 		var reasing = confirm('Ya no quedan asientos disponibles \n ¿Quieres reservar en Clase Economica?')
 		if(reasing == true){
 			checkEconomicZone();
 		}else{
 			nextFlight();
 		}
 	}
 };

 var reasingFirstClassZone = function(zone){
 	if(busySeats == 10){
 		noSeats();
 		nextFlight();
 	}else{
 		var reasing = confirm('Ya no quedan asientos disponibles \n ¿Quieres reservar en Primera Clase?')
 		if(reasing == true){
 			checkFirstClassZone();
 		}else{
 			nextFlight();
 		}
 	}
 };

 //declaramos funcion que imprime el ticket
 var paintTicket = function(index,zone){
 	var containerTickets = document.getElementById('tickets');
//cada ticket se creara en un div con clase seats
 	var ticket = document.createElement('div');
 	ticket.className = 'seats';
//creamos etiquetas p
 	var title = document.createElement('p');
 	var reservedSeating = document.createElement('p');
 	var zoneClass = document.createElement('p');
//textos que iran dentro de los p
 	title.textContent = 'Pase de Abordar';
 	reservedSeating.textContent = 'No de Asiento: '+(index+1);
 	zoneClass.textContent = zone;
//agregamos los p con textos al div ticket
 	ticket.appendChild(title);
 	ticket.appendChild(reservedSeating);
 	ticket.appendChild(zoneClass);
//agregamos el ticket a nuestro section en html
 	containerTickets.appendChild(ticket);
 };

//declarando función cuando todos los asientos estan ocupados
 var noSeats = function(){
 	alert('Lo sentimos pero todos los asientos estan reservados.')
 };

//declarando funcion de proximo vuelo
 var nextFlight = function(){
 	alert('El proximo vuelo sale en 3 horas')
 };


paintSeats(airlineSeats);
reserve();

