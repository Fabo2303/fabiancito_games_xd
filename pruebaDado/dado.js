const matrix = [
    "rotateX(45deg) rotateY(0deg) rotateZ(45deg)",
    "rotateX(135deg) rotateY(0deg) rotateZ(0deg)",
    "rotateX(0deg) rotateY(90deg) rotateZ(-135deg)",
    "rotateX(0deg) rotateY(90deg) rotateZ(45deg)",
    "rotateX(-45deg) rotateY(45deg) rotateZ(0deg)",
    "rotateX(-135deg) rotateY(0deg) rotateZ(45deg)"
];


var first = true;
var lastItem = -1;

function cambiarAnimacion() {
    const dado = document.getElementById("dice");
    var random = Math.floor(Math.random() * 6);;
    if (lastItem == random) {
        random = Math.floor(Math.random() * 6);
    }
    var actualItem = random;
    var startTransform = matrix[lastItem];
    var endTransform = matrix[actualItem];
    if (first) {
        startTransform = "rotateX(14deg) rotateY(45deg) rotateZ(0deg)";
        first = false;
    }
    lastItem = actualItem;
    dado.style.animation = "none"; // Detener la animación actual
    setTimeout(function () {
        dado.style.setProperty("--start-state", startTransform);
        dado.style.setProperty("--end-state", endTransform);
        dado.offsetHeight; // Requerido para reiniciar la animación
        dado.style.animation = "rotate 1s linear forwards, tirado 1s linear"; // Iniciar la animación con el nuevo keyframe
    }, 10);
}
