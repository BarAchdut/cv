/* =====================================================================
   CV that wears the visitor's company brand. Pure static; no server.
   ===================================================================== */
(() => {
  const $ = s => document.querySelector(s);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- color ---------- */
  const rgb = h => { const m = /^#?([0-9a-f]{6})$/i.exec(String(h || "")); if (!m) return null; const n = parseInt(m[1], 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  const hex = c => "#" + c.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join("").toUpperCase();
  const lum = c => { const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]); };
  const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  const WHITE = [255, 255, 255], INK = [17, 19, 24];
  const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
  function darkenTo(c, target) { let k = c.slice(); for (let i = 0; i < 30 && contrast(k, WHITE) < target; i++) k = k.map(v => v * 0.9); return k; }

  const NEUTRAL = { name: "", c: "#1F2430", x: "#9A7B4F", f: "Inter", hf: "Source Serif 4", neutral: true };

  /** Derive every color the CV needs from a brand's primary + optional accent. */
  function themeOf(co) {
    const c = rgb(co.c) || rgb(NEUTRAL.c), x = rgb(co.x);
    const cands = [x, c].filter(Boolean);
    let head = cands.find(k => contrast(k, WHITE) >= 4.5);
    if (!head) head = darkenTo(cands.slice().sort((a, b) => contrast(b, WHITE) - contrast(a, WHITE))[0], 4.5);
    const deco = cands.find(k => contrast(k, WHITE) >= 2.2) || head;
    const bandInk = contrast(c, WHITE) >= 3 ? WHITE : INK;
    return {
      band: hex(c), bandInk: hex(bandInk), head: hex(head), deco: hex(deco),
      stripe: x ? hex(x) : null,
      tintL: hex(mix(c, [244, 245, 247], 0.93)), tintD: hex(mix(c, [17, 19, 24], 0.86)),
      btn: hex(contrast(c, WHITE) >= 3 ? c : head), font: co.f || "Inter", headFont: co.hf || co.f || "Inter"
    };
  }

  /* ---------- company matching ---------- */
  const norm = s => String(s || "").toLowerCase().normalize("NFKC")
    .replace(/['"׳״`’]/g, "")
    .replace(/\.(com|io|co\.il|ai|net)\b/g, "")
    .replace(/\b(ltd|inc|corp|llc|plc|group|israel)\b/g, " ")
    .replace(/בע"?מ|ישראל/g, " ")
    .replace(/[\s.\-_,()&]+/g, "");
  const COS = COMPANIES.map(([name, c, x, f, aliases]) => ({ name, c, x, f }));
  const INDEX = [];
  COMPANIES.forEach(([name, , , , aliases], i) => {
    new Set([name, ...aliases].map(norm).filter(Boolean)).forEach(key => INDEX.push({ key, co: COS[i] }));
  });
  function lev(a, b) {
    if (Math.abs(a.length - b.length) > 2) return 9;
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[a.length][b.length];
  }
  function search(q) {
    const k = norm(q);
    if (!k) return { list: [], exact: null };
    const out = [], seen = new Set();
    const push = co => { if (!seen.has(co)) { seen.add(co); out.push(co); } };
    const exact = INDEX.find(e => e.key === k);
    if (exact) push(exact.co);
    INDEX.filter(e => e.key.startsWith(k)).sort((a, b) => a.key.length - b.key.length).forEach(e => push(e.co));
    if (k.length >= 3) INDEX.filter(e => e.key.includes(k)).forEach(e => push(e.co));
    if (!out.length && k.length >= 4) {
      const max = k.length >= 7 ? 2 : 1;
      INDEX.map(e => ({ e, d: lev(k, e.key) })).filter(r => r.d <= max).sort((a, b) => a.d - b.d).forEach(r => push(r.e.co));
    }
    return { list: out.slice(0, 6), exact: exact ? exact.co : null };
  }

  /* ---------- state ---------- */
  const S = { co: null, label: "", theme: themeOf(NEUTRAL), source: NEUTRAL, typed: "" };

  /* ---------- CV render ---------- */
  function renderSheet() {
    const t = S.theme, sh = $("#sheet");
    sh.style.setProperty("--band", t.band); sh.style.setProperty("--band-ink", t.bandInk);
    sh.style.setProperty("--acc-head", t.head); sh.style.setProperty("--acc-deco", t.deco);
    sh.style.setProperty("--stripe", t.stripe || "transparent");
    const li = (label, text) => `<li>${label ? `<b>${esc(label)}:</b> ` : ""}${esc(text)}</li>`;
    sh.innerHTML = `
      <header class="sh-band">
        ${S.label ? `<p class="sh-for" dir="auto">Prepared for the ${esc(S.label)} team</p>` : ""}
        <h2>${esc(CV.name)}</h2>
        <p class="sh-headline">${esc(CV.headline)}</p>
        <p class="sh-contacts">${CV.contacts.map(c => `<span>${esc(c)}</span>`).join("")}</p>
      </header>
      <section><h3>Profile</h3><p>${esc(CV.profile)}</p></section>
      <section><h3>Core Competencies</h3><ul>${CV.competencies.map(([l, t]) => li(l, t)).join("")}</ul></section>
      <section><h3>Work Experience</h3>${CV.experience.map(e => `
        <div class="job">
          <div class="job-top"><span><b>${esc(e.role)}</b> | <span class="org">${esc(e.org)}</span></span><span class="dates">${esc(e.dates)}</span></div>
          ${e.context ? `<div class="ctx">${esc(e.context)}</div>` : ""}
          <ul>${e.bullets.map(b => li("", b)).join("")}</ul>
          ${e.stack ? `<div class="stack"><b>Stack:</b> ${esc(e.stack)}</div>` : ""}
        </div>`).join("")}</section>
      <section><h3>Technical Skills</h3><ul>${CV.skills.map(([l, t]) => li(l, t)).join("")}</ul></section>
      <section><h3>Education</h3><ul>${CV.education.map(x => li("", x)).join("")}</ul></section>
      <section><h3>Recognition &amp; Languages</h3><ul>${CV.recognition.map(x => li("", x)).join("")}</ul></section>`;
  }

  function applyChrome() {
    const t = S.theme, r = document.documentElement.style;
    r.setProperty("--brand", t.btn); r.setProperty("--brand-ink", contrast(rgb(t.btn), WHITE) >= 3 ? "#FFFFFF" : "#111318");
    r.setProperty("--tint-l", S.source.neutral ? "#F2F3F5" : t.tintL);
    r.setProperty("--tint-d", S.source.neutral ? "#111318" : t.tintD);
    r.setProperty("--f-cv", `"${t.font}", Arial, sans-serif`);
    r.setProperty("--f-cv-head", `"${t.headFont}", "${t.font}", Arial, sans-serif`);
    const h1 = $("#h1"), sub = $("#sub");
    // Copy never mentions colors or design: the re-skin is the surprise.
    if (S.label) {
      h1.innerHTML = `נעים להכיר, <bdi class="co">${esc(S.label)}</bdi>`;
      sub.textContent = "קורות החיים שלי כאן למטה. אפשר להוריד אותם, או לכתוב לי ישירות.";
      document.title = `Bar Achdut · CV for ${S.label}`;
    } else {
      h1.textContent = "היי, מאיזו חברה הגעת?";
      sub.textContent = "תודה שנכנסת! אני בר, ומבטיח לא לגזול לך הרבה זמן.";
      document.title = "Bar Achdut · CV";
    }
    updateLinks();
  }

  /* Each call gets a generation number. A repeat call for the same company exits
     before touching state, and a superseded call exits after its font wait, so the
     newest call always paints the sheet and clears the fade. */
  let gen = 0;
  async function setTheme(source, label, co) {
    if (S.source === source && S.label === label) return;
    const my = ++gen;
    const next = themeOf(source);
    const fontChange = next.font !== S.theme.font || next.headFont !== S.theme.headFont;
    S.source = source; S.label = label; S.co = co || null; S.theme = next;
    applyChrome();
    const sh = $("#sheet");
    if (fontChange && document.fonts && document.fonts.load) {
      sh.classList.add("swap");
      try { await Promise.race([Promise.all([document.fonts.load(`400 16px "${next.font}"`), document.fonts.load(`700 16px "${next.headFont}"`)]), new Promise(r => setTimeout(r, 900))]); } catch (_) {}
      if (my !== gen) return;
    }
    renderSheet();
    sh.classList.remove("swap");
    if (label) scheduleNotify();
  }

  /* ---------- input + suggestions ---------- */
  let sel = -1, list = [];
  function closeSugg() { $("#sugg").hidden = true; $("#co").setAttribute("aria-expanded", "false"); sel = -1; }
  function openSugg() {
    const ul = $("#sugg");
    if (!list.length) { closeSugg(); return; }
    ul.innerHTML = list.map((co, i) => `<li role="option" id="opt${i}" aria-selected="${i === sel}" data-i="${i}"><span class="nm">${esc(co.name)}</span></li>`).join("");
    ul.hidden = false; $("#co").setAttribute("aria-expanded", "true");
    if (sel >= 0) $("#co").setAttribute("aria-activedescendant", "opt" + sel); else $("#co").removeAttribute("aria-activedescendant");
    ul.querySelectorAll("li").forEach(li => li.onmousedown = ev => { ev.preventDefault(); pick(list[+li.dataset.i]); });
  }
  function pick(co) { $("#co").value = co.name; closeSugg(); setTheme(co, co.name, co); afterSubmit(); }
  function onType() {
    const q = $("#co").value;
    S.typed = q;
    const r = search(q);
    list = r.exact && r.list.length === 1 ? [] : r.list; sel = -1; openSugg();
    const k = norm(q);
    const unique = r.list.length === 1 && k.length >= 4;
    if (r.exact) setTheme(r.exact, r.exact.name, r.exact);
    else if (unique) setTheme(r.list[0], r.list[0].name, r.list[0]);
    else if (!q.trim() || !r.list.length) setTheme(NEUTRAL, "", null);
  }
  function submit() {
    const q = $("#co").value.trim();
    if (!q) { $("#co").focus(); return; }
    S.typed = q;
    if (sel >= 0 && list[sel]) return pick(list[sel]);
    const r = search(q);
    if (r.exact || r.list.length) { const co = r.exact || r.list[0]; $("#co").value = co.name; closeSugg(); setTheme(co, co.name, co); }
    else { closeSugg(); setTheme(NEUTRAL, q, null); }
    afterSubmit();
  }
  function afterSubmit() {
    $("#co").blur();
    if (window.matchMedia("(max-width: 640px)").matches) setTimeout(() => $(".sheet-wrap").scrollIntoView({ behavior: "smooth", block: "start" }), 120);
  }
  $("#co").addEventListener("input", onType);
  $("#co").addEventListener("keydown", e => {
    if ($("#sugg").hidden) return;
    if (e.key === "ArrowDown") { e.preventDefault(); sel = Math.min(sel + 1, list.length - 1); openSugg(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); sel = Math.max(sel - 1, -1); openSugg(); }
    else if (e.key === "Escape") closeSugg();
  });
  $("#co").addEventListener("blur", () => setTimeout(closeSugg, 120));
  $("#askForm").addEventListener("submit", e => { e.preventDefault(); submit(); });

  /* ---------- notifications (ntfy.sh push) ---------- */
  const OWNER = (() => {
    try {
      const p = new URLSearchParams(location.search);
      if (p.get("owner") === "1") localStorage.setItem("cv.owner", "1");
      if (p.get("owner") === "0") localStorage.removeItem("cv.owner");
      return localStorage.getItem("cv.owner") === "1";
    } catch (_) { return false; }
  })();
  const device = () => /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? "mobile" : "desktop";
  const refHost = () => { try { return document.referrer ? new URL(document.referrer).hostname : "direct"; } catch (_) { return "direct"; } };
  function notify(title, message, tags) {
    if (OWNER || !CONFIG.ntfyTopic || location.protocol === "file:") return;
    const body = JSON.stringify({ topic: CONFIG.ntfyTopic, title, message, tags: tags || [], priority: 4 });
    try { if (navigator.sendBeacon && navigator.sendBeacon("https://ntfy.sh/", body)) return; } catch (_) {}
    try { fetch("https://ntfy.sh/", { method: "POST", body, mode: "no-cors", keepalive: true }).catch(() => {}); } catch (_) {}
  }
  const once = key => { try { if (sessionStorage.getItem(key)) return false; sessionStorage.setItem(key, "1"); } catch (_) {} return true; };
  let notifyT = null;
  function scheduleNotify() {
    clearTimeout(notifyT);
    notifyT = setTimeout(() => {
      if (!S.label || !once("cv.co." + S.label.toLowerCase())) return;
      const typed = S.typed && S.typed.trim().toLowerCase() !== S.label.toLowerCase() ? ` · typed "${S.typed.trim()}"` : "";
      notify(`CV viewed by ${S.label}`, `${S.co ? "Brand matched" : "Unknown company, neutral design"}${typed} · ${device()} · from ${refHost()}`, ["briefcase"]);
    }, 1500);
  }

  /* ---------- contact links ---------- */
  function updateLinks() {
    const who = S.label || "";
    const wa = who ? `היי בר, אני מ־${who}. ראיתי את קורות החיים שלך ואשמח לדבר.` : "היי בר, ראיתי את קורות החיים שלך ואשמח לדבר.";
    $("#waBtn").href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(wa)}`;
    $("#mailBtn").href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(who ? `${who} × Bar Achdut` : "Your CV")}`;
    $("#telBtn").href = `tel:${CONFIG.phoneIntl}`;
    const li = $("#liBtn");
    if (CONFIG.linkedin) { li.hidden = false; li.href = CONFIG.linkedin; } else li.hidden = true;
  }
  [["#waBtn", "WhatsApp"], ["#mailBtn", "Email"], ["#telBtn", "Phone"], ["#liBtn", "LinkedIn"]].forEach(([id, kind]) =>
    $(id).addEventListener("click", () => notify(`${kind} click${S.label ? " · " + S.label : ""}`, `Visitor${S.label ? " from " + S.label : ""} tapped ${kind} · ${device()}`, ["telephone_receiver"])));
  $("#fEmail").textContent = CONFIG.email; $("#fPhone").textContent = CONFIG.phoneDisplay;

  /* ---------- PDF (text-based, embeds the brand font) ---------- */
  const fontCache = {};
  async function ttf(file) {
    if (fontCache[file]) return fontCache[file];
    const r = await fetch("fonts/" + file);
    if (!r.ok) throw new Error("font " + file);
    const u = new Uint8Array(await r.arrayBuffer());
    let s = ""; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000));
    return (fontCache[file] = btoa(s));
  }
  async function addFamily(pdf, fam) {
    const stem = fam.replace(/\s+/g, "");
    for (const [w, st] of [["400", "normal"], ["700", "bold"]]) {
      const f = `${stem}-${w}.ttf`;
      pdf.addFileToVFS(f, await ttf(f));
      pdf.addFont(f, stem, st);
    }
    return stem;
  }
  const latinOnly = s => !/[֐-׿؀-ۿ]/.test(s);

  async function buildPdf() {
    const { jsPDF } = window.jspdf;
    const t = S.theme;
    const pdf = new jsPDF({ unit: "pt", format: "a4", compress: true });
    const BF = await addFamily(pdf, t.font);
    const HF = t.headFont === t.font ? BF : await addFamily(pdf, t.headFont);
    pdf.setProperties({ title: `${CV.name} - CV`, author: CV.name, subject: S.label ? `Prepared for ${S.label}` : CV.headline });
    const W = 595.28, H = 841.89, M = 46, CW = W - 2 * M;
    const C = h => rgb(h), band = C(t.band), bandInk = C(t.bandInk), head = C(t.head), deco = C(t.deco);
    const PINK = [26, 29, 35], MUTE = [95, 101, 112];
    const BS = 9.2, LH = 12.6;
    let y = M;
    const font = (f, st, sz, col) => { pdf.setFont(f, st); pdf.setFontSize(sz); pdf.setTextColor(col[0], col[1], col[2]); };
    const ensure = h => { if (y + h > H - M) { pdf.addPage(); y = M; } };
    function rich(runs, x, width, size, lh, col) {
      const words = [];
      runs.forEach(r => String(r.t).split(/(\s+)/).forEach(w => { if (w) words.push({ w, f: r.f || BF, st: r.st || "normal", col: r.col || col }); }));
      const lines = []; let cur = [], curW = 0;
      for (const wd of words) {
        pdf.setFont(wd.f, wd.st); pdf.setFontSize(size);
        if (/^\s+$/.test(wd.w)) { if (cur.length) { const sw = pdf.getTextWidth(" "); cur.push({ ...wd, w: " ", ww: sw }); curW += sw; } continue; }
        const ww = pdf.getTextWidth(wd.w);
        if (curW + ww > width && cur.length) { while (cur.length && cur[cur.length - 1].w === " ") curW -= cur.pop().ww; lines.push(cur); cur = []; curW = 0; }
        cur.push({ ...wd, ww }); curW += ww;
      }
      while (cur.length && cur[cur.length - 1].w === " ") cur.pop();
      if (cur.length) lines.push(cur);
      lines.forEach(line => { ensure(lh); let cx = x; line.forEach(wd => { font(wd.f, wd.st, size, wd.col); pdf.text(wd.w, cx, y, { baseline: "top" }); cx += wd.ww; }); y += lh; });
    }
    function bullet(runs) {
      ensure(LH);
      pdf.setFillColor(deco[0], deco[1], deco[2]); pdf.circle(M + 3.3, y + 5.4, 1.7, "F");
      rich(runs, M + 12, CW - 12, BS, LH, PINK); y += 2;
    }
    function section(title) {
      ensure(44); y += 11;
      font(HF, "bold", 9.4, head); pdf.text(title.toUpperCase(), M, y, { baseline: "top", charSpace: 1.1 });
      y += 13.5; pdf.setDrawColor(deco[0], deco[1], deco[2]); pdf.setLineWidth(0.7); pdf.line(M, y, W - M, y); y += 7.5;
    }
    // band
    const forLine = S.label && latinOnly(S.label) ? `PREPARED FOR THE ${S.label.toUpperCase()} TEAM` : "";
    const bandH = forLine ? 128 : 112;
    pdf.setFillColor(band[0], band[1], band[2]); pdf.rect(0, 0, W, bandH, "F");
    if (t.stripe) { const s = C(t.stripe); pdf.setFillColor(s[0], s[1], s[2]); pdf.rect(0, bandH, W, 4, "F"); }
    y = 30;
    if (forLine) { font(BF, "bold", 8.4, bandInk); pdf.text(forLine, M, y, { baseline: "top", charSpace: 1.2 }); y += 18; }
    font(HF, "bold", 26, bandInk); pdf.text(CV.name, M, y, { baseline: "top" }); y += 32;
    font(BF, "normal", 11.5, bandInk); pdf.text(CV.headline, M, y, { baseline: "top" }); y += 19;
    font(BF, "normal", 8.6, bandInk); pdf.text(CV.contacts.join("     "), M, y, { baseline: "top" });
    y = bandH + (t.stripe ? 10 : 6);

    section("Profile");
    rich([{ t: CV.profile }], M, CW, BS, LH, PINK);
    section("Core Competencies");
    CV.competencies.forEach(([l, tx]) => bullet([{ t: l + ": ", st: "bold" }, { t: tx }]));
    section("Work Experience");
    CV.experience.forEach((e, i) => {
      ensure(LH * 3); if (i) y += 6;
      font(BF, "normal", 8.6, MUTE);
      const dw = pdf.getTextWidth(e.dates); pdf.text(e.dates, W - M - dw, y + 1, { baseline: "top" });
      rich([{ t: e.role, st: "bold" }, { t: "  |  " + e.org, col: head }], M, CW - dw - 12, 10.2, 13.5, PINK);
      if (e.context) rich([{ t: e.context }], M, CW, 8.6, 11.5, MUTE);
      y += 2;
      e.bullets.forEach(b => bullet([{ t: b }]));
      if (e.stack) rich([{ t: "Stack: ", st: "bold" }, { t: e.stack }], M + 12, CW - 12, 8.4, 11, MUTE);
    });
    section("Technical Skills");
    CV.skills.forEach(([l, tx]) => bullet([{ t: l + ": ", st: "bold" }, { t: tx }]));
    section("Education");
    CV.education.forEach(x => bullet([{ t: x }]));
    section("Recognition & Languages");
    CV.recognition.forEach(x => bullet([{ t: x }]));
    const n = pdf.getNumberOfPages();
    for (let p = 1; p <= n; p++) {
      pdf.setPage(p); font(BF, "normal", 7.5, MUTE);
      const s = `${CV.name}  ·  ${p}/${n}`; pdf.text(s, W - M - pdf.getTextWidth(s), H - 26, { baseline: "top" });
    }
    return pdf;
  }

  function toast(msg) { const el = $("#toast"); el.textContent = msg; el.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => (el.hidden = true), 2400); }
  async function deliver(blob, filename) {
    const cl = window.claude && window.claude.use ? await window.claude.use("downloads").catch(() => null) : null;
    if (cl) { try { await cl.save({ filename, data: blob }); return true; } catch (e) { return false; } }
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    return true;
  }
  $("#pdfBtn").addEventListener("click", async () => {
    const btn = $("#pdfBtn"); if (btn.disabled) return;
    btn.disabled = true; const old = btn.querySelector(".l-long").textContent;
    btn.querySelector(".l-long").textContent = "מכין קובץ…";
    try {
      const pdf = await buildPdf();
      const safe = (S.label && latinOnly(S.label) ? S.label : "").replace(/[^A-Za-z0-9.]+/g, "_").replace(/^[_.]+|[_.]+$/g, "");
      const ok = await deliver(pdf.output("blob"), `${CONFIG.fileBase}${safe ? "_for_" + safe : ""}.pdf`);
      if (ok) { toast("הקובץ ירד"); notify(`PDF downloaded${S.label ? " · " + S.label : ""}`, `Visitor${S.label ? " from " + S.label : ""} downloaded your CV · ${device()}`, ["page_facing_up"]); }
    } catch (e) { toast("ההורדה נכשלה. נסו שוב."); }
    finally { btn.disabled = false; btn.querySelector(".l-long").textContent = old; }
  });

  /* ---------- boot ---------- */
  renderSheet(); applyChrome();
  let preset = "";
  try { preset = new URLSearchParams(location.search).get("c") || ""; } catch (_) {}
  if (once("cv.visit")) notify("CV link opened", `${preset ? `Personal link for "${preset}" · ` : ""}${device()} · from ${refHost()}`, ["eyes"]);
  if (preset) { $("#co").value = preset; submit(); }
})();
