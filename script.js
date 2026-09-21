/* ============ PERSONALIZA AQUÍ ============ */
const CONFIG = {
  nombre: "Vivi",

  // Opcional: quién lo envía. Si lo dejas vacío, se firma "Con todo mi cariño".
  de: "Con todo mi cariño - Dani :3",

  // Las 10 canciones. Cambia el "titulo" (lo que se ve) y guarda cada archivo
  // en la carpeta "musica" con el nombre que pongas en "archivo".
  canciones: [
    { titulo: "La Correcta - Morat_Nabáles",  archivo: "cancion-1.mp3" },
    { titulo: "Mi Nuevo Vicio - Morat",  archivo: "cancion-2.mp3" },
    { titulo: "No Se Va - Morat",  archivo: "cancion-3.mp3" },
    { titulo: "A Dónde Vamos - Morat",  archivo: "cancion-4.mp3" },
    { titulo: "Aprender A Quererte - Morat",  archivo: "cancion-5.mp3" },
    { titulo: "Pero Te Conoci - Reik",  archivo: "cancion-6.mp3" },
    { titulo: "Yo Quisiera - Reik",  archivo: "cancion-7.mp3" },
    { titulo: "Inolvidable - Reik",  archivo: "cancion-8.mp3" },
    { titulo: "Salvavidas - TIMØ_Bacilos",  archivo: "cancion-9.mp3" },
    { titulo: "Por Si Vuelves - Charlie USG", archivo: "cancion-10.mp3" }
  ],

mensaje: [
  "Hoy vi que el día amaneció medio amarillo y, como siempre, lo primero que hice fue pensar en ti.",
  "Las flores amarillas solo necesitan un poco de luz para cambiarle la cara a cualquier lugar.",
  "Tú haces algo parecido, Vivi, llegas con tu alegría, te quedas cuando hace falta y de la nada un día cualquiera se vuelve uno bonito.",
  "Ojalá hoy te vaya muy bien.",
  "Y yo, aquí te dejare esta flor hecho con amor, palabras y música, solo para ti.",
  "Que nunca te falte nada y que siempre tengas un buen lugar donde florecer y, ser muy feliz.",
  "Espero que te guste este pequeño detalle, y que lo disfrutes mucho.",
]
};
/* ========================================= */

const $ = (id) => document.getElementById(id);
const reducido = matchMedia("(prefers-reduced-motion: reduce)").matches;
const rnd = (a, b) => a + Math.random() * (b - a);

const flor = $("flor"), tema = $("tema"), aviso = $("aviso");
const progreso = $("progreso"), tActual = $("tActual"), tTotal = $("tTotal");
const btnCarta = $("btnCarta"), carta = $("carta"), lista = $("lista");
const audio = new Audio();
const pistas = CONFIG.canciones;
let actual = 0;

audio.preload = "metadata";

/* ---------- Título con letras que suben ---------- */
(function construirTitulo(){
  const h1 = $("titulo");
  const texto = "Flores amarillas para " + CONFIG.nombre;
  document.title = texto;
  h1.setAttribute("aria-label", texto);
  h1.textContent = "";
  const palabras = texto.split(" ");
  let k = 0;
  palabras.forEach((p, i) => {
    const w = document.createElement("span");
    w.className = "palabra" + (i === palabras.length - 1 ? " nombre" : "");
    w.setAttribute("aria-hidden", "true");
    [...p].forEach((ch) => {
      const l = document.createElement("span");
      l.className = "letra";
      l.textContent = ch;
      l.style.setProperty("--k", k++);
      w.appendChild(l);
    });
    h1.appendChild(w);
    if (i < palabras.length - 1) h1.appendChild(document.createTextNode(" "));
  });
})();

/* ---------- Flor grande: 12 pétalos atrás, 12 adelante, y puntos que orbitan ---------- */
(function construirFlor(){
  let atras = "", frente = "";
  for (let i = 0; i < 12; i++) {
    atras += `<g transform="rotate(${i * 30} 100 100)"><ellipse class="p" style="--i:${i}" cx="100" cy="38" rx="19" ry="40" fill="#E4A10E" stroke="#FFE27A" stroke-opacity=".35" stroke-width="1.2"/></g>`;
    frente += `<g transform="rotate(${i * 30 + 15} 100 100)"><ellipse class="p" style="--i:${i + 12}" cx="100" cy="47" rx="16" ry="33" fill="#F8CB2A" stroke="#FFE27A" stroke-opacity=".5" stroke-width="1.2"/></g>`;
  }
  $("petalos-atras").innerHTML = atras;
  $("petalos-frente").innerHTML = frente;

  let orb = "";
  for (let i = 0; i < 8; i++) {
    orb += `<circle cx="100" cy="-10" r="${i % 2 ? 2.2 : 3.6}" fill="#FFE27A" transform="rotate(${i * 45} 100 100)"/>`;
  }
  $("orbita").innerHTML = orb;
})();

/* ---------- Polen que sube ---------- */
(function crearPolen(){
  if (reducido) return;
  const cont = $("polen");
  for (let i = 0; i < 22; i++) {
    const p = document.createElement("i");
    p.style.setProperty("--x", rnd(0, 100).toFixed(1) + "%");
    p.style.setProperty("--s", rnd(4, 10).toFixed(0) + "px");
    p.style.setProperty("--t", rnd(12, 22).toFixed(1) + "s");
    p.style.setProperty("--d", "-" + rnd(0, 20).toFixed(1) + "s");
    p.style.setProperty("--dx", rnd(-50, 50).toFixed(0) + "px");
    cont.appendChild(p);
  }
})();

/* ---------- Pétalos y florecitas que caen mientras suena la música ---------- */
(function crearLluvia(){
  if (reducido) return;
  const cont = $("lluvia");
  const colores = ["#F7C51E", "#FFE27A", "#E4A10E"];
  const mini = (c) =>
    `<svg viewBox="-10 -10 20 20" aria-hidden="true"><g fill="currentColor">` +
    [0, 1, 2, 3, 4].map((k) => `<ellipse cx="0" cy="-5" rx="2.8" ry="4.6" transform="rotate(${k * 72})"/>`).join("") +
    `</g><circle r="2" fill="#7A4A16"/></svg>`;

  for (let i = 0; i < 14; i++) {
    const p = document.createElement("i");
    p.style.setProperty("--x", rnd(0, 100).toFixed(1) + "%");
    p.style.setProperty("--s", rnd(9, 17).toFixed(0) + "px");
    p.style.setProperty("--t", rnd(10, 18).toFixed(1) + "s");
    p.style.setProperty("--d", "-" + rnd(0, 16).toFixed(1) + "s");
    p.style.setProperty("--c", colores[i % 3]);
    cont.appendChild(p);
  }
  for (let i = 0; i < 8; i++) {
    const b = document.createElement("b");
    b.style.setProperty("--x", rnd(0, 100).toFixed(1) + "%");
    b.style.setProperty("--s", rnd(16, 26).toFixed(0) + "px");
    b.style.setProperty("--t", rnd(13, 22).toFixed(1) + "s");
    b.style.setProperty("--d", "-" + rnd(0, 20).toFixed(1) + "s");
    b.style.setProperty("--c", colores[i % 2]);
    b.innerHTML = mini();
    cont.appendChild(b);
  }
})();

/* ---------- Mariposas amarillas ---------- */
(function crearMariposas(){
  if (reducido) return;
  const svg = (relleno, borde) => `
    <svg viewBox="0 0 40 30" aria-hidden="true">
      <g class="ala">
        <path d="M20 15 C12 2 1 3 3 13 C4 19 14 21 20 15Z" fill="${relleno}" stroke="${borde}" stroke-width=".8"/>
        <path d="M20 15 C13 20 8 28 13 27 C18 26 21 21 20 15Z" fill="${borde}" stroke="${borde}" stroke-width=".8"/>
      </g>
      <g class="ala">
        <path d="M20 15 C28 2 39 3 37 13 C36 19 26 21 20 15Z" fill="${relleno}" stroke="${borde}" stroke-width=".8"/>
        <path d="M20 15 C27 20 32 28 27 27 C22 26 19 21 20 15Z" fill="${borde}" stroke="${borde}" stroke-width=".8"/>
      </g>
      <rect x="19.2" y="8" width="1.6" height="16" rx=".8" fill="#3A1F06"/>
      <path d="M20 9 Q17 3 15 2 M20 9 Q23 3 25 2" stroke="#3A1F06" stroke-width=".7" fill="none"/>
    </svg>`;
  const cont = $("mariposas");
  [["m1", "#FFD21F", "#E0A100"], ["m2", "#FFE27A", "#F0B90B"], ["m3", "#FFCB1F", "#D98E04"]].forEach(([c, a, b]) => {
    const m = document.createElement("div");
    m.className = "mariposa " + c;
    m.innerHTML = svg(a, b);
    cont.appendChild(m);
  });
})();

/* ---------- Jardín con flores que crecen y se mecen ---------- */
(function construirJardin(){
  const jardin = $("jardin");
  const hojaA = "#3AA362", hojaB = "#2A8050";

  function cabeza(tipo){
    if (tipo === 0) { // girasol
      let s = "";
      for (let i = 0; i < 14; i++) s += `<ellipse cx="35" cy="17" rx="4.6" ry="13" transform="rotate(${(i * 360 / 14).toFixed(1)} 35 40)" fill="#F7C51E"/>`;
      for (let i = 0; i < 14; i++) s += `<ellipse cx="35" cy="21" rx="4" ry="10" transform="rotate(${(i * 360 / 14 + 180 / 14).toFixed(1)} 35 40)" fill="#FFD84D"/>`;
      s += `<circle cx="35" cy="40" r="10" fill="#5A3410" stroke="#8A5518" stroke-width="2"/>`;
      return { s, base: 52 };
    }
    if (tipo === 1) { // margarita amarilla
      let s = "";
      for (let i = 0; i < 8; i++) s += `<ellipse cx="35" cy="21" rx="6.5" ry="12" transform="rotate(${i * 45} 35 40)" fill="#FFE27A" stroke="#F0B90B" stroke-width=".8"/>`;
      s += `<circle cx="35" cy="40" r="7" fill="#E0A100"/>`;
      return { s, base: 50 };
    }
    if (tipo === 2) { // tulipán
      const s = `<path d="M23 46 C20 24 26 12 35 5 C44 12 50 24 47 46 C42 52 28 52 23 46Z" fill="#F7C51E"/>` +
                `<path d="M35 5 C30 20 30 36 35 50" stroke="#E4A10E" stroke-width="1.6" fill="none"/>` +
                `<path d="M35 5 C40 20 40 36 35 50" stroke="#E4A10E" stroke-width="1.6" fill="none"/>`;
      return { s, base: 50 };
    }
    // botón de oro
    let s = "";
    for (let i = 0; i < 5; i++) s += `<circle cx="35" cy="24" r="11" transform="rotate(${i * 72} 35 40)" fill="#FFD21F" stroke="#F0B90B" stroke-width=".8"/>`;
    s += `<circle cx="35" cy="40" r="6" fill="#F2A900"/>`;
    return { s, base: 56 };
  }

  const tipos = [0, 1, 2, 3, 0, 1, 0, 3, 2];
  const n = Math.max(7, Math.min(22, Math.round(innerWidth / 70)));

  for (let i = 0; i < n; i++) {
    const { s, base } = cabeza(tipos[i % tipos.length]);
    const medio = (base + 200) / 2;
    const el = document.createElement("div");
    el.className = "planta";
    el.style.setProperty("--k", rnd(0.5, 1).toFixed(2));
    el.style.setProperty("--dur", rnd(4, 7).toFixed(1) + "s");
    el.style.setProperty("--sd", "-" + rnd(0, 6).toFixed(1) + "s");
    el.style.setProperty("--g", (i * 90) + "ms");
    el.innerHTML = `
      <svg viewBox="0 0 70 200" preserveAspectRatio="xMidYMax meet">
        <path d="M35 ${base} C 30 ${medio - 20} 40 ${medio + 30} 35 200" stroke="${hojaA}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <path d="M35 125 C 20 117 14 105 12 97 C 26 99 33 109 35 125Z" fill="${hojaB}"/>
        <path d="M35 155 C 50 147 56 135 58 127 C 44 129 37 139 35 155Z" fill="${hojaA}"/>
        <g class="cabeza">${s}</g>
      </svg>`;
    jardin.appendChild(el);
  }

  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { jardin.classList.add("abierto"); obs.disconnect(); }
    }, { threshold: 0.15 });
    obs.observe(jardin);
  } else {
    jardin.classList.add("abierto");
  }
})();

/* ---------- Mensaje ---------- */
(function construirCarta(){
  let n = 0;
  let html = `<p class="saludo" style="--n:${n++}"></p>`;
  CONFIG.mensaje.forEach(() => { html += `<p style="--n:${n++}"></p>`; });
  html += `<p class="firma" style="--n:${n}"></p>`;
  carta.innerHTML = html;
  const ps = carta.querySelectorAll("p");
  ps[0].textContent = "Para " + CONFIG.nombre + ",";
  CONFIG.mensaje.forEach((t, i) => { ps[i + 1].textContent = t; });
  ps[ps.length - 1].textContent = CONFIG.de ? "— " + CONFIG.de : "Con todo mi cariño";
})();

btnCarta.addEventListener("click", () => {
  const abrir = carta.hidden;
  carta.hidden = !abrir;
  btnCarta.setAttribute("aria-expanded", String(abrir));
  btnCarta.textContent = abrir ? "Cerrar mensaje" : "Leer mi mensaje";
  if (abrir) carta.scrollIntoView({ behavior: reducido ? "auto" : "smooth", block: "start" });
});

/* ---------- Lista de canciones ---------- */
pistas.forEach((p, i) => {
  const li = document.createElement("li");
  const b = document.createElement("button");
  b.type = "button";
  b.className = "pista";
  b.style.setProperty("--n", i);
  b.innerHTML = `<span class="num"></span><span class="nombre"></span><span class="eq" aria-hidden="true"><i></i><i></i><i></i></span>`;
  b.querySelector(".num").textContent = i + 1;
  b.querySelector(".nombre").textContent = p.titulo;
  b.addEventListener("click", () => {
    if (i === actual && audio.getAttribute("src")) alternar();
    else cargarPista(i, true);
  });
  li.appendChild(b);
  lista.appendChild(li);
});

function marcarActual(){
  lista.querySelectorAll(".pista").forEach((b, i) => {
    if (i === actual) b.setAttribute("aria-current", "true");
    else b.removeAttribute("aria-current");
  });
  tema.textContent = pistas[actual].titulo;
  if ("mediaSession" in navigator && window.MediaMetadata) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: pistas[actual].titulo,
      artist: "Para " + CONFIG.nombre
    });
  }
}

/* ---------- Reproductor ---------- */
function setEstado(e){
  document.body.dataset.estado = e;
  flor.setAttribute("aria-label", e === "sonando" ? "Pausar canción" : "Reproducir canción");
}
function decir(t){ aviso.textContent = t; }

function fmt(s){
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60), r = Math.floor(s % 60);
  return m + ":" + String(r).padStart(2, "0");
}
function actualizar(){
  const d = audio.duration, ok = isFinite(d) && d > 0;
  const p = ok ? (audio.currentTime / d) * 1000 : 0;
  progreso.value = p;
  progreso.style.setProperty("--p", (p / 10) + "%");
  tActual.textContent = fmt(audio.currentTime);
  tTotal.textContent = ok ? fmt(d) : "0:00";
}

function avisoFalta(){
  setEstado("listo");
  decir("No encontré «" + pistas[actual].archivo + "». Guarda la canción con ese nombre en la carpeta musica.");
}

async function reproducir(){
  if (!audio.getAttribute("src")) {
    audio.src = pistas[actual].archivo;
    audio.load();
  }
  try {
    await audio.play();
  } catch (err) {
    if (err.name === "AbortError") return;
    if (err.name === "NotAllowedError") decir("Toca la flor para reproducir.");
    else avisoFalta();
  }
}

function cargarPista(i, sonar){
  actual = (i + pistas.length) % pistas.length;
  audio.src = pistas[actual].archivo;
  audio.load();
  marcarActual();
  actualizar();
  setEstado("listo");
  decir(sonar ? "" : "Toca la flor para escuchar.");
  if (sonar) reproducir();
}

function alternar(){
  if (audio.paused) reproducir();
  else audio.pause();
}

function siguiente(){ cargarPista(actual + 1, true); }
function anterior(){
  if (audio.currentTime > 3) { audio.currentTime = 0; return; }
  cargarPista(actual - 1, true);
}

flor.addEventListener("click", alternar);
$("siguiente").addEventListener("click", siguiente);
$("anterior").addEventListener("click", anterior);

audio.addEventListener("play", () => { setEstado("sonando"); decir(""); });
audio.addEventListener("pause", () => { if (!audio.ended) setEstado("listo"); });
audio.addEventListener("ended", () => {
  if (actual < pistas.length - 1) {
    cargarPista(actual + 1, true);
  } else {
    cargarPista(0, false);
    decir("Terminó la lista. Toca la flor para empezar de nuevo.");
  }
});
audio.addEventListener("timeupdate", actualizar);
audio.addEventListener("loadedmetadata", actualizar);
audio.addEventListener("error", () => {
  if (audio.getAttribute("src")) avisoFalta();
});

progreso.addEventListener("input", () => {
  if (isFinite(audio.duration)) audio.currentTime = (progreso.value / 1000) * audio.duration;
});

/* Controles del teléfono (pantalla de bloqueo) */
if ("mediaSession" in navigator) {
  try {
    navigator.mediaSession.setActionHandler("play", reproducir);
    navigator.mediaSession.setActionHandler("pause", () => audio.pause());
    navigator.mediaSession.setActionHandler("previoustrack", anterior);
    navigator.mediaSession.setActionHandler("nexttrack", siguiente);
  } catch (e) { /* no disponible */ }
}

marcarActual();
