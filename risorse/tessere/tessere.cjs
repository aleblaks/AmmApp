// Immagini delle card «Piccole cose. Fatte bene.» che non hanno uno screenshot vero.
//   node risorse/tessere/tessere.cjs <cartella balance-life> src/AmmAppMockups/tessere
// Componenti e schermate vengono dal kit dei contenuti social di Balance Life (marketing/social/sorgenti),
// che li ricostruisce dal codice dell'app; le due di iPhone Duo affiancano screenshot veri del sito.
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const [bl, out] = process.argv.slice(2);
if (!bl || !out) throw new Error("uso: node tessere.cjs <cartella balance-life> <cartella uscita>");
const social = path.resolve(bl, "marketing/social/sorgenti");
const shots = path.resolve(__dirname, "../../src/AmmAppMockups/shots");
fs.mkdirSync(out, { recursive: true });
const file = (p) => "file://" + p;
// Una pagina scritta con setContent non può leggere file locali: le immagini entrano come data URI.
const uri = (p) => "data:image/png;base64," + fs.readFileSync(p).toString("base64");

// Ritaglio di un componente da una slide di un post (stessa logica di risorse/step2/ritagli.cjs).
async function ritaglio(page, post, n, nome, pannello = false) {
  await page.goto(file(path.join(social, "post", post + ".html")));
  await page.evaluate(() => document.fonts.ready);
  const clip = await page.evaluate(({ n, pannello }) => {
    document.documentElement.style.background = document.body.style.background = "transparent";
    const tutte = [...document.querySelectorAll(".slide")];
    tutte.forEach((s, i) => (s.style.display = i === n - 1 ? "" : "none"));
    const s = tutte[n - 1];
    s.style.background = "transparent";
    s.querySelectorAll(".brand,.lvl,.pager,.txt,svg.lines,.dotmark").forEach((e) => (e.style.display = "none"));
    let x1 = 1e9, y1 = 1e9, x2 = -1e9, y2 = -1e9;
    for (const c of s.children) {
      if (getComputedStyle(c).display === "none") continue;
      if (![...c.querySelectorAll("*")].some((d) => !["SPAN", "B", "I", "BR", "EM", "STRONG"].includes(d.tagName))) { c.style.display = "none"; continue; }
      // Componenti disegnati direttamente sulla slide: un pannello chiaro, come una card dell'app.
      if (pannello) Object.assign(c.style, { background: "#FFFFFF", borderRadius: "28px", padding: "26px 28px", margin: "-26px -28px", boxShadow: "0 24px 50px -20px rgba(60,30,10,.35)" });
      const r = c.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      x1 = Math.min(x1, r.left); y1 = Math.min(y1, r.top); x2 = Math.max(x2, r.right); y2 = Math.max(y2, r.bottom);
    }
    const p = 36, x = Math.max(0, x1 - p), y = Math.max(0, y1 - p);
    return { x, y, width: Math.min(1080, x2 + p) - x, height: Math.min(1350, y2 + p) - y };
  }, { n, pannello });
  await page.screenshot({ path: path.join(out, nome + ".png"), clip, omitBackground: true });
}

// Schermata nuda (senza cornice) da un reel al secondo t: va fra gli screenshot (shots/), nella cornice del sito.
async function schermata(page, reel, t, nome, dove = shots) {
  await page.goto(file(path.join(social, "reel", reel + ".html")));
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate((t) => {
    window.render(t);
    const st = document.createElement("style");
    st.textContent = ".phone::after,.phone::before{display:none!important}.screen{border-radius:0!important}.tapdot,.tap,.caption,.cap{display:none!important}";
    document.head.appendChild(st);
  }, t);
  await page.locator(".screen").first().screenshot({ path: path.join(dove, nome + ".png") });
}

// Pagina disegnata qui (guida, iPhone Duo): si fotografa #art su sfondo trasparente.
async function disegno(page, html, nome) {
  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>
    html,body{margin:0;background:transparent;font-family:"Inter",-apple-system,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
    #art{display:inline-block;padding:40px}</style></head><body>${html}</body></html>`);
  await page.waitForLoadState("load");
  await page.locator("#art").screenshot({ path: path.join(out, nome + ".png"), omitBackground: true });
}

const GUIDA = `<div id="art"><div style="width:360px;background:#F7F4EF;border-radius:30px;padding:22px 22px 20px;box-shadow:0 24px 50px -20px rgba(60,30,10,.35);color:#1C1917">
  <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;font-weight:600;color:#6E6660">
    <span>Come si usa</span><span style="display:flex;gap:6px">${[0,1,2,3,4].map(i=>`<i style="display:block;height:7px;width:${i===0?20:7}px;border-radius:4px;background:${i===0?"#E8713A":"#D9D3CB"}"></i>`).join("")}</span></div>
  <div style="position:relative;margin:16px 0 18px;height:190px;border-radius:20px;background:#fff;overflow:hidden;box-shadow:0 0 0 .5px #E7E5E4">
    <div style="padding:14px 16px 0;font-size:12px;color:#6E6660;display:flex;justify-content:space-between"><span>3 attività</span><span>2 / 3 obiettivi</span></div>
    <div style="margin:8px 16px 0;height:16px;border-radius:5px;background:#F0EDE8;position:relative;overflow:hidden">
      <i style="position:absolute;left:0;width:38%;top:0;bottom:0;background:#E8713A"></i><i style="position:absolute;left:44%;width:20%;top:0;bottom:0;background:#a784f0"></i><i style="position:absolute;left:70%;width:6%;top:0;bottom:0;background:#e34141"></i></div>
    ${["#a784f0:Ufficio:7h","#e34141:Palestra:50m"].map(r=>{const [c,t,d]=r.split(":");return `<div style="margin:10px 16px 0;display:flex;align-items:center;gap:10px;font-size:14px;font-weight:600"><i style="width:22px;height:22px;border-radius:7px;background:${c}33;display:block"></i><span style="flex:1">${t}</span><span>${d}</span></div>`}).join("")}
    <div style="position:absolute;inset:0;background:rgba(28,25,23,.42)"></div>
    <div style="position:absolute;right:22px;bottom:20px;width:52px;height:52px;border-radius:26px;background:#E8713A;color:#fff;font-size:32px;line-height:50px;text-align:center;box-shadow:0 0 0 6px rgba(255,255,255,.95),0 0 0 14px rgba(232,113,58,.45)">+</div>
    <div style="position:absolute;right:96px;bottom:26px;width:168px;background:#fff;border-radius:14px;padding:9px 12px;font-size:12px;line-height:1.35;color:#5F574F;box-shadow:0 10px 24px -8px rgba(0,0,0,.35)"><b style="display:block;color:#1C1917;font-size:13px">Tocca qui</b>Scegli un'attività e registra la tua prima sessione.</div>
  </div>
  <div style="font-size:21px;font-weight:700;letter-spacing:-.4px">Registra una sessione</div>
  <div style="margin-top:6px;font-size:14px;line-height:1.42;color:#5F574F">Tocca il tasto + in basso, scegli l'attività e indica quando è iniziata e finita. Ti bastano pochi secondi.</div>
  <div style="display:flex;gap:10px;margin-top:16px"><span style="flex:1;height:44px;border-radius:22px;background:#F0EDE8;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:15px;color:#B4501F">Provalo</span><span style="flex:1;height:44px;border-radius:22px;background:#E8713A;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:15px;color:#fff">Avanti</span></div>
</div></div>`;

// ── iPhone Duo ───────────────────────────────────────────────────────────────
// Non due telefoni affiancati: UNA schermata larga, con una sola barra di stato, una sola
// intestazione e una sola barra delle tab, e il contenuto su due colonne come lo dispone l'app.

// Il corpo del Duo aperto attorno a un'immagine della schermata (data URI), con la piega in mezzo.
// Lo screenshot nel tema chiesto, se c'è la variante scura.
const shot = (n, scuro) => { const d = path.join(shots, `${n}-dark.png`); return scuro && fs.existsSync(d) ? d : path.join(shots, `${n}.png`); };

// Cornici ufficiali Apple (Apple Design Resources › Product Bezels › iPhone Duo, «Inner Open Landscape»),
// copiate dal DMG in risorse/cornici/: 3093×2247, vetro trasparente da (120,120) a (2972,2126), cioè 2853×2007.
// Night Sky per il tema scuro, Star White per il chiaro.
const CORNICE_DUO = (scuro) => path.resolve(__dirname, "../cornici", `iPhone Duo - ${scuro ? "Night Sky" : "Star White"} - Inner Open Landscape.png`);
const DUO = { w: 3093, h: 2247, x: 120, y: 120, sw: 2853, sh: 2007 }; // la schermata va fatta in proporzione sw:sh (1,42:1)
const corpoDuo = (src, scuro) => {
  const k = 0.5; // disegno a metà misura (con deviceScaleFactor 2 resta a piena risoluzione)
  return `<div id="art"><div style="position:relative;width:${DUO.w * k}px;height:${DUO.h * k}px;filter:drop-shadow(0 30px 40px rgba(0,0,0,.35))">
    <img src="${src}" style="position:absolute;left:${DUO.x * k - 2}px;top:${DUO.y * k - 2}px;width:${DUO.sw * k + 4}px;height:${DUO.sh * k + 4}px">
    <img src="${uri(CORNICE_DUO(scuro))}" style="position:absolute;inset:0;width:100%;height:100%">
  </div></div>`;
};

// Balance Life, Home sul Duo (app/(tabs)/home/index.tsx, `colonne`): intestazione e nastro della giornata
// su tutta la larghezza; a sinistra ciò che è previsto, a destra ciò che è accaduto. Disegnata col kit.
async function homeDuo(page, scuro) {
  const kit = (f) => file(path.join(social, "kit", f));
  const html = `<!doctype html><html><head><meta charset="utf-8">
    ${["kit.css", "brand.css", "real.css", "temi.css"].map((f) => `<link rel="stylesheet" href="${kit(f)}">`).join("")}
    ${["icons.js", "kit.js", "screens.js", "real.js"].map((f) => `<script src="${kit(f)}"></script>`).join("")}
    <style>html,body{margin:0;background:transparent}
      #scr{position:relative;width:820px;height:577px;overflow:hidden;background:var(--bg);color:var(--text)}
      #scr .tabbar{left:50%;right:auto;width:470px;margin-left:-235px}
      #scr .fab{right:28px;bottom:27px}
      #scr .col{position:absolute;top:196px;bottom:0}</style></head>
    <body><div id="scr" class="${scuro ? "t-dark" : ""}"></div><script>
      window.ORA = "09:41";
      const sinistra = pCard({ type: "reading", righe: [TIT.libro, "Cap. 4 → 5", "Pag. 214 → 240"], ora: "21:30", quando: "Tra 2 h", aperta: true })
        + pCard({ type: "tv", righe: ["Stranger Things", "S1 · Ep. 5"], ora: "22:30", quando: "Tra 3 h" });
      const destra = rSec("In corso") + aCard({ type: "gym", title: "Palestra", live: true, elapsed: "35:12" })
        + rSec("La giornata") + CARDS.podcast() + CARDS.work();
      document.getElementById("scr").innerHTML = statusBar("09:41") + homeNav("Oggi")
        + '<div class="home-head"><div class="subrow"><span>3 attività</span><span>2 / 4 obiettivi</span></div>'
        + timeline([...BARS_OGGI.slice(0, 3), { type: "gym", from: 18.5, to: 19.08 }, { type: "reading", from: 21.5, to: 22, pred: true }, { type: "tv", from: 22.5, to: 23.3, pred: true }], 19.08) + '</div>'
        + '<div class="col" style="left:0;right:50%;padding-top:4px">' + rSec("In programma") + sinistra + '</div>'
        + '<div class="col" style="left:50%;right:0">' + destra + '</div>'
        + fab() + tabBar("home");
    </script></body></html>`;
  const tmp = path.join(require("os").tmpdir(), `home-duo-${process.pid}.html`);
  fs.writeFileSync(tmp, html);
  await page.goto(file(tmp));
  await page.evaluate(() => document.fonts.ready);
  const png = await page.locator("#scr").screenshot();
  fs.unlinkSync(tmp);
  return "data:image/png;base64," + png.toString("base64");
}

// AirportShift, Riepilogo sul Duo: le due pagine (mosaico e fasce orarie) affiancate sotto
// un'intestazione sola. Ricomposto ritagliando gli screenshot veri (1206×2622).
async function riepilogoDuo(page, scuro) {
  const a = uri(shot("as-riepilogo", scuro)), b = uri(shot("as-fasce", scuro));
  await page.setContent(`<canvas id="c"></canvas><script>
    const carica = (s) => new Promise((ok) => { const i = new Image(); i.onload = () => ok(i); i.src = s; });
    window.fatto = (async () => {
      const [A, B] = await Promise.all([carica(${JSON.stringify(a)}), carica(${JSON.stringify(b)})]);
      const W = 2412, H = 1697, c = document.getElementById("c"); c.width = W; c.height = H; // proporzione del vetro del Duo
      const g = c.getContext("2d");
      // sfondo: il colore dell'app, preso da un punto vuoto dello screenshot
      const t = document.createElement("canvas"); t.width = t.height = 1; t.getContext("2d").drawImage(A, 600, 1, 1, 1, 0, 0, 1, 1);
      const [r, gg, bb] = t.getContext("2d").getImageData(0, 0, 1, 1).data; g.fillStyle = "rgb(" + r + "," + gg + "," + bb + ")"; g.fillRect(0, 0, W, H);
      const pezzo = (img, sx, sy, sw, sh, dx, dy, k = 1) => g.drawImage(img, sx, sy, sw, sh, dx, dy, sw * k, sh * k);
      const cx = W / 2;
      pezzo(A, 0, 0, 420, 170, 0, 0);                  // ora
      pezzo(A, 786, 0, 420, 170, W - 420, 0);           // segnale, wi-fi, batteria
      pezzo(A, 0, 220, 700, 130, 0, 175);               // «Riepilogo»
      pezzo(A, 40, 355, 160, 130, cx - 470, 175);       // freccia ‹
      pezzo(A, 380, 380, 446, 90, cx - 223, 195);       // «Ottobre 2026»
      pezzo(A, 1006, 355, 160, 130, cx + 310, 175);     // freccia ›
      const k = 0.92, m = (1206 - 1206 * k) / 2;        // le due pagine, un filo più piccole per stare nel vetro
      pezzo(A, 0, 560, 1206, 1135, m, 330, k);          // pagina 1: il mosaico (fino a Diurne e Notturne)
      pezzo(B, 0, 560, 1206, 1210, 1206 + m, 330, k);   // pagina 2: le fasce orarie
      pezzo(A, 150, 2365, 906, 225, cx - 453, H - 235); // una sola barra delle tab
      return c.toDataURL("image/png");
    })();
  </script>`);
  return page.evaluate(() => window.fatto);
}

(async () => {
  const browser = await chromium.launch({ args: ["--allow-file-access-from-files"] });
  const post = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  await ritaglio(post, "p15-stili", 6, "bl-giornata"); // widget «La tua giornata» in tre misure
  await ritaglio(post, "p03-nove-attivita", 2, "bl-demo", true); // la settimana dei dati d'esempio
  const reel = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 3 });
  await schermata(reel, "v10-calendario", 18.5, "bl-calendari"); // Impostazioni › Calendari
  const art = await browser.newPage({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 2 });
  await disegno(art, GUIDA, "bl-guida");
  const schermo = await browser.newPage({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 2 });
  for (const scuro of [false, true]) {
    const s = scuro ? "-dark" : "";
    await disegno(art, corpoDuo(await homeDuo(schermo, scuro), scuro), "bl-duo" + s);
    await disegno(art, corpoDuo(await riepilogoDuo(schermo, scuro), scuro), "as-duo" + s);
  }
  await browser.close();
  console.log("immagini →", out);
})();
