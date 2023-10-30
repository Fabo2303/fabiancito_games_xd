//Inicializacion de la partida inicial con los cuadros vacios
var tablero = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
//Contadores
var indicador = 0, winWhite = 0, winBlack = 0;

//Generamos un tiempo de espera para que la reaccion del "bot" no sea inmediata
function espera(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

//Funcion para hacer aparecer los circulos que se encuentran invisibles
function toggleCircle(id) {
    //Genera un array de 2 elementos con el valor de la fila y la columna
    var posicion = id.split("x");
    //Obtenemos el circulo invisible
    var circle = document.getElementById(id);
    //Obtenemos el h1 que indica el jugador en turno
    var turno = document.getElementById('turno');
    //Si sigue vacio el cuadro puede realizar todo lo demas;
    if (circle.style.display === "") {
        //Se asigna flex para que aparezca el circulo
        circle.style.display = "flex";
        // Turno de las BLANCAS
        if (indicador == 0) {
            //Color del circulo : BLANCO
            circle.style.backgroundColor = 'white';
            //Color de la fuente (Corazon) : NEGRO
            circle.style.color = 'black';
            //Se actualiza el turno
            indicador++;
            // Por cada circulo blanco asignamos un 3 al tablero en esa posicion
            tablero[posicion[0]][posicion[1]] = 3;
            //Actualizamos el h1 en el turno de NEGRAS
            turno.textContent = "NEGRAS";
            //LLamamos al bot para que realice su turno
            bot();
        } else { //Turno de las NEGRAS
            //Color del circulo : NEGRO
            circle.style.backgroundColor = 'black';
            //Color de la fuente (corazon) : BLANCO
            circle.style.color = 'white';
            //Se actualiza el turno
            indicador--;
            // Por cada circulo blanco le asignamos un 5 al tablero en esa posicion
            tablero[posicion[0]][posicion[1]] = 5;
            //Actualizamos el h1 en el turno de BLANCAS
            turno.textContent = "BLANCAS";
        }
    } else { //Caso de que este lleno que retorne un -1
        return -1;
    }
    verificarGanador(); //En cada turno se verifica al ganador
}


function verificarGanador() {
    //Llamamos a la verificacion de las filas, columnas y 
    var ganador = verificarTablero();
    //Si ganador = 9 entonces ganaron blancas
    if (ganador == 9) {
        Swal.fire({
            title: 'Ganaron las blancas',
            text: '¿Deseas reiniciar el juego?',
            icon: 'question',
            confirmButtonText: 'Sí',
        }).then((result) => {
            if (result.isConfirmed) {
                winWhite++;
                reset();
            }
        });
    }
    //Si ganador = 15 entonces ganaron negras
    else if (ganador == 15) {
        Swal.fire({
            title: 'Ganaron las negras',
            text: '¿Deseas reiniciar el juego?',
            icon: 'question',
            confirmButtonText: 'Sí',
        }).then((result) => {
            if (result.isConfirmed) {
                winBlack++;
                reset();
            }
        });
    // Si es -1 es porque ya no hay espacios libres entonces
    // EMPATE
    } else if (ganador == -1) {
        Swal.fire({
            title: 'Nadie gano',
            text: '¿Deseas reiniciar el juego?',
            icon: 'question',
            confirmButtonText: 'Sí',
        }).then((result) => {
            if (result.isConfirmed) {
                reset();
            }
        });
    }
}

/*Esta funcion sirve para saber si alguien gano
Como cada circulo blanco vale 3 en el tablero
Solo sera posible ganar si suman 9 en filas , columnas o diagonales
Esta logica es la misma para los circulos negros que en
este caso deben sumar 15*/

function verificarTablero() {
    //Contadores para las filas, columnas y diagonales
    var fichasFila = 0, fichasColumna = 0, fichasDiagonal1 = 0, fichasDiagonal2 = 0;
    // Contador para saber si el tablero tiene espacios libres
    var numeroCeros = 0;
    //Para que sea victoria debe ser 3 o 6
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            fichasFila += tablero[i][j];
            fichasColumna += tablero[j][i];
            if (tablero[i][j] == 0)
                numeroCeros++;
            if (fichasFila == 9 || fichasFila == 15)
                return fichasFila;
            if (fichasColumna == 9 || fichasColumna == 15)
                return fichasColumna;
        }
        fichasFila = 0; fichasColumna = 0;
        fichasDiagonal1 += tablero[i][i];
        fichasDiagonal2 += tablero[i][2 - i];
    }
    if (fichasDiagonal1 == 9 || fichasDiagonal1 == 15)
        return fichasDiagonal1;
    if (fichasDiagonal2 == 9 || fichasDiagonal2 == 15)
        return fichasDiagonal2;
    if (numeroCeros == 0)
        return -1;
    return 0;
}

//Funcion para reiniciar el tablero
function reset() {
    //Se extrae el turno y las victorias
    var turno = document.getElementById('turno');
    var ww = document.getElementById('ww');
    var wb = document.getElementById('wb');
    //Las actualizamos como la partida inicial
    turno.textContent = "BLANCAS";
    ww.textContent = "Blancas: " + winWhite;
    wb.textContent = "Negras: " + winBlack;
    // reiniciamos la matriz y el indicador de turno
    tablero = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    indicador = 0;
    //Hacemos los circulos invisibles
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var circle = document.getElementById(i + "x" + j);
            circle.style.display = "none";
        }
    }
}

//Funcion para incluir jugadas del bot
function bot() {
    //Aplicamos la espera
    espera(1000).then(function () {
        // Se asignan de manera aleatoria las posiciones para que ponga el circulo (version inicial)
        var i = Math.floor(Math.random() * 2 + 1);
        var j = Math.floor(Math.random() * 2 + 1);
        // Extrae el valor de la funcion "toggleCircle" para verificar su return
        var jugada = toggleCircle(i + "x" + j);
        // Si aun tenemos espacios vacios
        if (tablero.some(fila => fila.includes(0))) {
            // Si la jugada es igual a -1 indica que la casilla esta llena
            while (jugada == -1) {
                // Busca otra casilla
                i = Math.floor(Math.random() * 3);
                j = Math.floor(Math.random() * 3);
                jugada = toggleCircle(i + "x" + j);
            }
        }
    });
}