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

// iPhone Duo aperto a libro: due screenshot veri affiancati, con la piega in mezzo.
const duo = (a, b, scuro) => `<div id="art"><div style="position:relative;display:flex;padding:14px;border-radius:44px;background:${scuro ? "#2a2a2c" : "#1c1c1e"};box-shadow:0 40px 70px -30px rgba(0,0,0,.55),inset 0 0 0 2px #3a3a3c">
  <div style="display:flex;border-radius:32px;overflow:hidden;position:relative">
    <img src="${uri(a)}" style="height:640px;display:block"><img src="${uri(b)}" style="height:640px;display:block">
    <i style="position:absolute;left:50%;top:0;bottom:0;width:26px;margin-left:-13px;background:linear-gradient(90deg,transparent,rgba(0,0,0,.18) 45%,rgba(255,255,255,.10) 55%,transparent)"></i>
  </div></div></div>`;
const shot = (n, scuro) => { const d = path.join(shots, `${n}-dark.png`); return scuro && fs.existsSync(d) ? d : path.join(shots, `${n}.png`); };

(async () => {
  const browser = await chromium.launch({ args: ["--allow-file-access-from-files"] });
  const post = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  await ritaglio(post, "p15-stili", 6, "bl-giornata"); // widget «La tua giornata» in tre misure
  await ritaglio(post, "p03-nove-attivita", 2, "bl-demo", true); // la settimana dei dati d'esempio
  const reel = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 3 });
  await schermata(reel, "v10-calendario", 18.5, "bl-calendari"); // Impostazioni › Calendari
  const art = await browser.newPage({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 2 });
  await disegno(art, GUIDA, "bl-guida");
  for (const scuro of [false, true]) {
    const s = scuro ? "-dark" : "";
    await disegno(art, duo(shot("bl-hero", scuro), shot("bl-trends", scuro), scuro), "bl-duo" + s);
    await disegno(art, duo(shot("as-riepilogo", scuro), shot("as-fasce", scuro), scuro), "as-duo" + s);
  }
  await browser.close();
  console.log("immagini →", out);
})();
