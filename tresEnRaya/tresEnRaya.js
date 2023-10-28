var matriz = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
var indicador = 0, winWhite = 0, winBlack = 0;

function toggleCircle(id) {
    var posicion = id.split("x");
    var circle = document.getElementById(id);
    var turno = document.getElementById('turno');
    if (circle.style.display === "none" || circle.style.display === "") {
        circle.style.display = "flex";
        if (indicador == 0) {
            circle.style.backgroundColor = 'white';
            circle.style.color = 'black';
            indicador++;
            matriz[posicion[0]][posicion[1]] = 3;
            turno.textContent = "NEGRAS";
            bot();
        } else {
            circle.style.backgroundColor = 'black';
            circle.style.color = 'white';
            indicador--;
            matriz[posicion[0]][posicion[1]] = 5;
            turno.textContent = "BLANCAS";
        }
    } else {
        return -1;
    }
    verificarGanador();
}

function verificarGanador() {
    var fila = pivoteUnoXuno();
    if (fila == 9) {
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
    else if (fila == 15) {
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
    } else if (fila == -1) {
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

function pivoteUnoXuno() {
    var fichasFila = 0, fichasColumna = 0, fichasDiagonal1 = 0, fichasDiagonal2 = 0;
    var numeroCeros = 0;
    //Para que sea victoria debe ser 3 o 6
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            fichasFila += matriz[i][j];
            fichasColumna += matriz[j][i];
            if (matriz[i][j] == 0) {
                numeroCeros++;
            }
        }
        if (fichasFila == 9 || fichasFila == 15) {
            return fichasFila;
        } else if (fichasColumna == 9 || fichasColumna == 15) {
            return fichasColumna;
        }
        fichasFila = 0; fichasColumna = 0;
        fichasDiagonal1 += matriz[i][i];
        fichasDiagonal2 += matriz[i][2 - i];
    }
    if (fichasDiagonal1 == 9 || fichasDiagonal1 == 15) {
        return fichasDiagonal1;
    }
    if (fichasDiagonal2 == 9 || fichasDiagonal2 == 15) {
        return fichasDiagonal2;
    }
    if (numeroCeros == 0) {
        return -1;
    }
    return 0;
}

function reset() {
    var turno = document.getElementById('turno');
    turno.textContent = "BLANCAS";
    var ww = document.getElementById('ww');
    var wb = document.getElementById('wb');
    ww.textContent = "Blancas: " + winWhite;
    wb.textContent = "Negras: " + winBlack;
    matriz = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    indicador = 0;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            var circle = document.getElementById(i + "x" + j);
            circle.style.display = "none";
        }
    }
}

function bot() {
    var i = Math.floor(Math.random() * 3);
    var j = Math.floor(Math.random() * 3);
    var jugada = toggleCircle(i + "x" + j);
    if (matriz.some(fila => fila.includes(0))) {
        while (jugada == -1) {
            i = Math.floor(Math.random() * 3);
            j = Math.floor(Math.random() * 3);
            jugada = toggleCircle(i + "x" + j);
        }
    }
}