
// ELEMENTOS PRINCIPALES

const inicio = document.getElementById("inicio");
const escenario = document.getElementById("escenario");
const abrirRegalo = document.getElementById("abrirRegalo");

const musica = document.getElementById("musica");
const botonMusica = document.getElementById("botonMusica");
const iconoMusica = document.getElementById("iconoMusica");

const modalMensaje = document.getElementById("modalMensaje");
const modalCarta = document.getElementById("modalCarta");

const modalIcono = document.getElementById("modalIcono");
const modalTitulo = document.getElementById("modalTitulo");
const modalTexto = document.getElementById("modalTexto");

const velitas = document.getElementById("velitas");
const apagarVelas = document.getElementById("apagarVelas");
const mensajeDeseo = document.getElementById("mensajeDeseo");

const abrirCarta = document.getElementById("abrirCarta");
const lluviaConfeti = document.getElementById("lluviaConfeti");


// MENSAJES

const mensajes = {
    carta: {
        icono: "💌",
        titulo: "Una cartita para ti",
        texto: "Hoy es un día para celebrar a una persona maravillosa. Espero que recibas muchos abrazos, sonrisas y momentos que se queden guardados en tu corazón. ¡Disfruta muchísimo tu día!"
    },

    deseo: {
        icono: "⭐",
        titulo: "Un deseo especial",
        texto: "Deseo que este nuevo año de vida venga cargado de oportunidades, salud, tranquilidad, aventuras y muchísimas razones para sonreír. Que todos esos sueños que tienes se vayan haciendo realidad."
    },

    regalo: {
        icono: "🎁",
        titulo: "Tu regalito",
        texto: "Este pequeño detalle está hecho con mucho cariño. No viene envuelto en papel ni tiene un moño de verdad, pero lleva una intención muy bonita: hacerte sonreír en un día tan especial."
    },

    corazon: {
        icono: "💗",
        titulo: "De corazón",
        texto: "Nunca dejes de ser esa persona tan especial, de perseguir lo que quieres y de disfrutar las pequeñas cosas. Hoy y siempre, mereces cosas muy bonitas."
    }
};


// ABRIR REGALO

abrirRegalo.addEventListener("click", function () {
    inicio.classList.add("oculto");
    escenario.classList.remove("oculto");

    lanzarConfeti();

    musica.play().then(function () {
        iconoMusica.textContent = "♫";
    }).catch(function () {
        iconoMusica.textContent = "♪";
    });
});


// ABRIR TARJETAS

const tarjetas = document.querySelectorAll(".tarjeta");

tarjetas.forEach(function (tarjeta) {
    tarjeta.addEventListener("click", function () {
        const tipo = tarjeta.dataset.mensaje;
        const mensaje = mensajes[tipo];

        if (!mensaje) {
            return;
        }

        modalIcono.textContent = mensaje.icono;
        modalTitulo.textContent = mensaje.titulo;
        modalTexto.textContent = mensaje.texto;

        modalMensaje.classList.add("activo");
    });
});


// CERRAR MODALES

const botonesCerrar = document.querySelectorAll(".cerrar-modal");

botonesCerrar.forEach(function (boton) {
    boton.addEventListener("click", function () {
        cerrarModales();
    });
});

function cerrarModales() {
    modalMensaje.classList.remove("activo");
    modalCarta.classList.remove("activo");
}


// CERRAR AL TOCAR FUERA

modalMensaje.addEventListener("click", function (evento) {
    if (evento.target === modalMensaje) {
        cerrarModales();
    }
});

modalCarta.addEventListener("click", function (evento) {
    if (evento.target === modalCarta) {
        cerrarModales();
    }
});


// ABRIR CARTA FINAL

abrirCarta.addEventListener("click", function () {
    modalCarta.classList.add("activo");
    lanzarConfeti();
});


// APAGAR VELITAS

apagarVelas.addEventListener("click", function () {
    if (velitas.classList.contains("apagadas")) {
        return;
    }

    velitas.classList.add("apagadas");

    mensajeDeseo.textContent =
        "¡Deseo concedido! Que tengas un año maravilloso. 💗";

    apagarVelas.textContent = "¡Velitas apagadas! 🎉";

    lanzarConfeti();
});


// CONTROL DE MÚSICA

botonMusica.addEventListener("click", function () {
    if (musica.paused) {
        musica.play().then(function () {
            iconoMusica.textContent = "♫";
        }).catch(function () {
            iconoMusica.textContent = "♪";
        });
    } else {
        musica.pause();
        iconoMusica.textContent = "♪";
    }
});


// CONFETI

function lanzarConfeti() {
    const simbolos = ["💗", "🎀", "✨", "🌸", "⭐", "💕"];

    for (let i = 0; i < 35; i++) {
        const pieza = document.createElement("span");

        pieza.classList.add("confeti");

        pieza.textContent =
            simbolos[Math.floor(Math.random() * simbolos.length)];

        pieza.style.left = Math.random() * 100 + "vw";
        pieza.style.fontSize = (12 + Math.random() * 16) + "px";
        pieza.style.animationDuration = (2 + Math.random() * 3) + "s";

        lluviaConfeti.appendChild(pieza);

        setTimeout(function () {
            pieza.remove();
        }, 5000);
    }
}


// TECLA ESCAPE

document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") {
        cerrarModales();
    }
});
