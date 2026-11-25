// Ritagli dei componenti dello Step 2 per la sezione «Nove attività» della pagina di Balance Life.
// Le immagini nascono dai post social di Balance Life (repository balance-life, marketing/social/sorgenti/post),
// che riproducono i componenti dell'app dal suo codice: di ogni slide scelta si tiene solo il componente,
// su sfondo trasparente, senza titoli, marchio e numerazione.
//
//   node risorse/step2/ritagli.cjs <balance-life>/marketing/social/sorgenti/post src/AmmAppMockups/step2
//
// Serve Playwright (già installato nell'ambiente cloud; altrove: npm i -D playwright).
// Le slide sono contate da 1, come i file PNG dei post (01.png = slide 1).
const { chromium } = require("playwright");
const path = require("path");

const [src, out] = process.argv.slice(2);
// attività: [pagina del post, slide da ritagliare (nell'ordine in cui compaiono sul sito)]
const JOBS = {
  reading: ["p04-lettura", [7, 5, 4]],
  tv: ["p05-serie-tv", [4, 7, 6]],
  gym: ["p06-palestra", [3, 5, 7]],
  study: ["p07-studio", [3, 6, 5]],
  work: ["p08-lavoro", [3, 4, 6]],
  podcast: ["p09-podcast-film", [3, 2]],
  movie: ["p09-podcast-film", [5, 4]],
  gaming: ["p10-gaming-sport", [2, 3]],
  sport: ["p10-gaming-sport", [4, 5]],
};
// Componenti che nella slide escono dal fondo: invece del taglio netto, una sfumatura.
const SFUMA = new Set(["study-1", "work-1"]);

(async () => {
  if (!src || !out) throw new Error("uso: node ritagli.cjs <cartella post> <cartella uscita>");
  const browser = await chromium.launch({ args: ["--allow-file-access-from-files"] });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  page.on("pageerror", (e) => console.error("ERRORE PAGINA:", e.message));
  for (const [key, [file, slides]] of Object.entries(JOBS)) {
    await page.goto("file://" + path.resolve(src, file + ".html"));
    await page.evaluate(() => document.fonts.ready);
    for (let k = 0; k < slides.length; k++) {
      const nome = `${key}-${k + 1}`;
      const clip = await page.evaluate(({ n, sfuma }) => {
        document.documentElement.style.background = "transparent";
        document.body.style.background = "transparent";
        const tutte = [...document.querySelectorAll(".slide")];
        tutte.forEach((s, i) => (s.style.display = i === n - 1 ? "" : "none"));
        const s = tutte[n - 1];
        s.style.background = "transparent";
        s.className = "slide";
        s.style.maskImage = sfuma ? "linear-gradient(#000 1150px, transparent 1350px)" : "";
        s.querySelectorAll(".brand,.lvl,.pager,.txt,svg.lines,.dotmark").forEach((e) => (e.style.display = "none"));
        let x1 = 1e9, y1 = 1e9, x2 = -1e9, y2 = -1e9;
        for (const c of s.children) {
          if (getComputedStyle(c).display === "none") continue;
          // Righe di solo testo (didascalie fuori da .txt): via.
          if (![...c.querySelectorAll("*")].some((d) => !["SPAN", "B", "I", "BR", "EM", "STRONG"].includes(d.tagName))) { c.style.display = "none"; continue; }
          const r = c.getBoundingClientRect();
          if (!r.width || !r.height) continue;
          x1 = Math.min(x1, r.left); y1 = Math.min(y1, r.top); x2 = Math.max(x2, r.right); y2 = Math.max(y2, r.bottom);
        }
        const p = 36; // spazio per l'ombra
        const x = Math.max(0, x1 - p), y = Math.max(0, y1 - p);
        return { x, y, width: Math.min(1080, x2 + p) - x, height: Math.min(1350, y2 + p) - y };
      }, { n: slides[k], sfuma: SFUMA.has(nome) });
      const f = path.join(out, `bl-${nome}.png`);
      await page.screenshot({ path: f, clip, omitBackground: true });
      console.log(f);
    }
  }
  await browser.close();
})();
