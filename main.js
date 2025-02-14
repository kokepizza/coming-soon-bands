gsap.config({
  trialWarn: false,
});

function map(x, a1, a2, b1, b2) {
  return ((x - a1) * (b2 - b1)) / (a2 - a1) + b1;
}

// Configuracion
const NUM_BANDS = 16;
const OFFSET = 0.2;

// Code
function CrearTextos() {
  const band = document.querySelector(".band");
  const p = band.querySelector("p");

  const textRect = p.getBoundingClientRect();
  const maxWidth = window.innerWidth * 2.5;

  const repeatCount = Math.ceil(maxWidth / textRect.width);
  for (let i = 0; i < repeatCount; i++) {
    const clone = p.cloneNode(true);
    band.appendChild(clone);
  }
  p.remove();
}

function CrearBandas() {
  const band = document.querySelector(".band-wrapper");
  const wrapper = document.querySelector(".exercise");

  for (let i = 0; i < NUM_BANDS; i++) {
    const clone = band.cloneNode(true);
    wrapper.appendChild(clone);
  }

  band.remove();
}

function PosicionarBanda(banda) {
  const width = window.innerWidth * OFFSET;
  const height = window.innerHeight * OFFSET;

  const x = map(Math.random(), 0, 1, -width, width);
  const y = map(Math.random(), 0, 1, -height, height);
  const rotation = map(Math.random(), 0, 1, -60, 60);

  gsap.set(banda, {
    x,
    y,
    rotation,
  });

  // banda.style.left = `${x}px`
  // banda.style.top = `${y}px`
}

CrearTextos();
CrearBandas();

const bandas = document.querySelectorAll(".band-wrapper");
for (const banda of bandas) {
  PosicionarBanda(banda);
}

const tl = gsap.timeline({
  paused: true,
});

gsap.set(".band", {
  xPercent: 100,
});

tl.to(".band", {
  xPercent: -50,
  duration: 5,
  ease: "power4.inOut",
  stagger: 0.2,
});

window.addEventListener("click", () => {
  tl.play();
});
