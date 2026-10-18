/* ============================================================
   AI-Enhanced Organization — Interactive workflow components
   Vanilla JS, no backend, no external API calls.
   Components (conceptual):
   WorkflowSection / WorkflowHeader / WorkflowCanvas / WorkflowNode /
   WorkflowConnector / WorkflowProgress / WorkflowDetailPanel /
   ResponsibilityBadge / ApprovalCheckpoint / WorkflowWalkthroughControls
   ============================================================ */
(function () {
  "use strict";

  /* ---------- icons: thin line SVGs, stroke=currentColor ---------- */
  const P = (inner) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

  const ICONS = {
    target: P(`<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/>`),
    search: P(`<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.8-3.8"/>`),
    chart: P(`<path d="M4 20V10M10 20V4M16 20v-8M21 20H3"/>`),
    flag: P(`<path d="M5 21V4"/><path d="M5 4h12l-2.5 4L17 12H5"/>`),
    route: P(`<circle cx="6" cy="19" r="2.2"/><circle cx="18" cy="5" r="2.2"/><path d="M8.2 19H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.8"/>`),
    wrench: P(`<path d="M14.7 6.3a4.5 4.5 0 0 0-6 5.6L4 16.6V20h3.4l4.7-4.7a4.5 4.5 0 0 0 5.6-6L14.5 12l-2.5-2.5 2.7-3.2z"/>`),
    users: P(`<circle cx="9" cy="8" r="3.2"/><path d="M3.5 19c.6-3 2.8-4.5 5.5-4.5s4.9 1.5 5.5 4.5"/><circle cx="16.5" cy="9" r="2.6"/><path d="M16 14.6c2.2.2 3.9 1.6 4.4 4"/>`),
    badge: P(`<circle cx="12" cy="10" r="6"/><path d="M9.5 10l1.8 1.8 3.4-3.6"/><path d="M8.5 15l-1.5 6 5-2.4 5 2.4-1.5-6"/>`),
    gauge: P(`<path d="M4 14a8 8 0 1 1 16 0"/><path d="M12 14l4-4.5"/><path d="M4 18h16"/>`),
    brief: P(`<rect x="4" y="7" width="16" height="13" rx="1.5"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7"/><path d="M4 12.5h16"/>`),
    sparkle: P(`<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"/><path d="M18.5 15.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1z"/>`),
    layers: P(`<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>`),
    pencil: P(`<path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1z"/><path d="M14.5 6.5l3 3"/>`),
    calendar: P(`<rect x="4" y="5.5" width="16" height="15" rx="1.5"/><path d="M4 10.5h16M8.5 3.5v4M15.5 3.5v4"/><path d="M12 14v3.5M10.5 15.7h3"/>`),
    film: P(`<rect x="3.5" y="5" width="17" height="14" rx="1.5"/><path d="M7.5 5v14M16.5 5v14M3.5 9.5H7.5M3.5 14.5H7.5M16.5 9.5H20.5M16.5 14.5H20.5"/>`),
    scissors: P(`<circle cx="6" cy="7" r="2.5"/><circle cx="6" cy="17" r="2.5"/><path d="M8 8.5L20 19M8 15.5L20 5"/>`),
    captions: P(`<rect x="3" y="5" width="18" height="13" rx="1.5"/><path d="M7 10.5h4M7 13.5h7M14 10.5h3"/>`),
    globe: P(`<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 2.6 4 5.6 4 9s-1.2 6.4-4 9c-2.8-2.6-4-5.6-4-9s1.2-6.4 4-9z"/>`),
    shield: P(`<path d="M12 3l7.5 3v6c0 4.5-3.2 7.6-7.5 9-4.3-1.4-7.5-4.5-7.5-9V6L12 3z"/><path d="M9 11.8l2.2 2.2 4-4.2"/>`)
  };

  const icon = (name) => ICONS[name] || ICONS.target;

  /* ---------- dom refs ---------- */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const section = $("#workflows");
  const tabsEl = $("#wf-tabs");
  const headTitle = $("#wf-head-title");
  const headDesc = $("#wf-head-desc");
  const progLabel = $("#wf-prog-label");
  const progName = $("#wf-prog-name");
  const progExplored = $("#wf-prog-explored");
  const progSegs = $("#wf-prog-segs");
  const canvasEl = $("#wf-canvas");
  const detailEl = $("#wf-detail");
  const tourBtn = $("#wf-tour-btn");
  const resetBtn = $("#wf-reset-btn");
  const tourBar = $("#wf-tourbar");
  const tourPos = $("#wf-tour-pos");
  const tourPrev = $("#wf-tour-prev");
  const tourNext = $("#wf-tour-next");
  const tourExit = $("#wf-tour-exit");

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- state ---------- */
  const state = {
    wfIndex: 0,
    selected: null,          // stage index or null
    explored: new Set(),     // stage indexes the user has inspected
    tour: false
  };

  const wf = () => WORKFLOWS[state.wfIndex];
  const catOf = (s) => WORKFLOW_CATEGORIES[s.cat];

  /* ---------- render: tabs ---------- */
  function renderTabs() {
    tabsEl.innerHTML = "";
    WORKFLOWS.forEach((w, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "wf-tab" + (i === state.wfIndex ? " is-active" : "");
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", i === state.wfIndex ? "true" : "false");
      b.innerHTML = `<span class="wf-tab-key">${w.id.toUpperCase()}</span><span>${w.tabLabel.split("· ")[1] || w.tabLabel}</span><span class="wf-tab-count">${w.stages.length} tahap</span>`;
      b.addEventListener("click", () => switchWorkflow(i));
      tabsEl.appendChild(b);
    });
  }

  /* ---------- render: canvas ---------- */
  function renderCanvas() {
    const w = wf();
    canvasEl.innerHTML = "";
    canvasEl.dataset.layout = w.layout;
    canvasEl.setAttribute("aria-label", `Diagram alur: ${w.title}. Gunakan tombol panah kiri kanan untuk berpindah tahap.`);

    w.stages.forEach((s, i) => {
      if (i > 0) canvasEl.appendChild(makeConnector(i));
      canvasEl.appendChild(makeNode(s, i));
    });
    updateSelectionUI();
  }

  function makeConnector(i) {
    const c = document.createElement("div");
    c.className = "wf-connector";
    c.dataset.after = i - 1;
    c.dataset.before = i;
    c.setAttribute("aria-hidden", "true");
    c.innerHTML = `<span class="wf-connector-line"></span><span class="wf-connector-arrow"></span>`;
    return c;
  }

  function makeNode(s, i) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = `wf-node cat-${s.cat}`;
    b.dataset.index = i;
    b.setAttribute("aria-label", `Tahap ${s.n}: ${s.title}. ${catOf(s).label}.`);
    b.innerHTML = `
      <span class="wf-node-num">${String(s.n).padStart(2, "0")}</span>
      <span class="wf-node-icon">${icon(s.icon)}</span>
      <span class="wf-node-short">${s.short}</span>
      <span class="wf-node-cat"><i></i>${catOf(s).label}</span>
      ${s.cat === "approval" ? `<span class="wf-node-gate">GATE</span>` : ""}
    `;
    b.addEventListener("click", () => selectStage(i, { fromTour: false }));
    return b;
  }

  /* ---------- selection ---------- */
  function selectStage(i, opts) {
    opts = opts || {};
    const w = wf();
    if (i < 0 || i >= w.stages.length) return;
    state.selected = i;
    state.explored.add(i);
    updateSelectionUI();
    renderDetail();
    renderProgress();
    const node = $(`.wf-node[data-index="${i}"]`, canvasEl);
    if (node) {
      node.focus({ preventScroll: true });
      node.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: reducedMotion ? "auto" : "smooth"
      });
    }
    if (state.tour && !opts.fromTour) {
      // manual click during tour: keep tour position in sync
      renderTourBar();
    }
  }

  function updateSelectionUI() {
    const w = wf();
    $$(".wf-node", canvasEl).forEach((el) => {
      const i = Number(el.dataset.index);
      el.classList.toggle("is-selected", i === state.selected);
      el.classList.toggle("is-explored", state.explored.has(i));
      if (i === state.selected) el.setAttribute("aria-current", "true");
      else el.removeAttribute("aria-current");
    });
    $$(".wf-connector", canvasEl).forEach((el) => {
      const a = Number(el.dataset.after), b = Number(el.dataset.before);
      el.classList.toggle(
        "is-hot",
        state.selected !== null && Math.abs(a - state.selected) <= 1 && Math.abs(b - state.selected) <= 1
          && ((a === state.selected) || (b === state.selected))
      );
    });
  }

  /* ---------- render: detail panel ---------- */
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  }

  function renderDetail() {
    const w = wf();
    const i = state.selected;
    if (i === null) {
      detailEl.innerHTML = `
        <div class="wf-detail-empty">
          <div class="wf-detail-empty-icon">${icon("target")}</div>
          <p><strong>Pilih sebuah tahap</strong> pada diagram untuk melihat tujuannya, siapa yang bertanggung jawab, dan apa yang dibutuhkan untuk melanjutkannya.</p>
          <p class="muted">Klik node mana pun — atau mulai tur workflow untuk dipandu tahap demi tahap.</p>
        </div>`;
      return;
    }
    const s = w.stages[i];
    const cat = catOf(s);
    const isLast = i === w.stages.length - 1;
    detailEl.innerHTML = `
      <article class="wf-detail-card" aria-live="polite">
        <header class="wf-detail-head">
          <span class="wf-detail-kicker">TAHAP ${String(s.n).padStart(2, "0")} DARI ${w.stages.length}</span>
          <h3>${esc(s.title)}</h3>
          <span class="resp-badge cat-${s.cat}"><i></i>${cat.label}</span>
          ${s.cat === "approval" ? `<p class="wf-approval-note">${icon("badge")}<span>Persetujuan manusia wajib — alur tidak berlanjut tanpa keputusan ini.</span></p>` : ""}
        </header>
        <dl class="wf-detail-list">
          <div><dt>Tujuan</dt><dd>${esc(s.purpose)}</dd></div>
          <div><dt>Yang terjadi</dt><dd>${esc(s.happens)}</dd></div>
          <div><dt>Penanggung jawab</dt><dd>${esc(s.owner)}</dd></div>
          <div><dt>Input</dt><dd>${esc(s.input)}</dd></div>
          <div><dt>Output</dt><dd>${esc(s.output)}</dd></div>
          <div><dt>Langkah berikut</dt><dd>${isLast ? esc(s.next) + " — alur selesai di sini." : esc(s.next)}</dd></div>
          <div><dt>Kebutuhan kendali</dt><dd>${esc(s.control)}</dd></div>
        </dl>
        <nav class="wf-detail-nav" aria-label="Navigasi tahap">
          <button type="button" class="btn-ghost" id="wf-prev" ${i === 0 ? "disabled" : ""}>← Sebelumnya</button>
          <button type="button" class="btn-ghost" id="wf-next" ${isLast ? "disabled" : ""}>Berikutnya →</button>
        </nav>
      </article>`;
    const prev = $("#wf-prev", detailEl), next = $("#wf-next", detailEl);
    if (prev) prev.addEventListener("click", () => selectStage(i - 1));
    if (next) next.addEventListener("click", () => selectStage(i + 1));
  }

  /* ---------- render: progress ---------- */
  function renderProgress() {
    const w = wf();
    const n = w.stages.length;
    progSegs.innerHTML = "";
    for (let k = 0; k < n; k++) {
      const seg = document.createElement("span");
      seg.className = "wf-seg" + (state.selected !== null && k <= state.selected ? " is-pos" : "")
        + (k === state.selected ? " is-cur" : "")
        + (state.explored.has(k) ? " is-seen" : "");
      progSegs.appendChild(seg);
    }
    if (state.selected === null) {
      progLabel.textContent = `MEMUAT ${n} TAHAP`;
      progName.textContent = "Belum ada tahap dipilih";
    } else {
      const s = w.stages[state.selected];
      progLabel.textContent = `TAHAP ${s.n} DARI ${n}`;
      progName.textContent = s.title;
    }
    progExplored.textContent = `${state.explored.size} dari ${n} tahap dijelajahi`;
  }

  /* ---------- workflow switching ---------- */
  function switchWorkflow(i) {
    state.wfIndex = i;
    state.selected = null;
    state.explored = new Set();
    exitTour(true);
    const w = wf();
    headTitle.textContent = w.title;
    headDesc.textContent = w.desc;
    renderTabs();
    renderCanvas();
    renderDetail();
    renderProgress();
  }

  /* ---------- tour mode ---------- */
  function startTour() {
    state.tour = true;
    document.body.classList.add("is-touring");
    tourBar.hidden = false;
    tourBtn.hidden = true;
    selectStage(0, { fromTour: true });
    renderTourBar();
    canvasEl.scrollIntoView({ block: "start", behavior: reducedMotion ? "auto" : "smooth" });
  }

  function exitTour(silent) {
    state.tour = false;
    document.body.classList.remove("is-touring");
    tourBar.hidden = true;
    tourBtn.hidden = false;
    if (!silent) renderTourBar();
  }

  function renderTourBar() {
    const w = wf();
    const i = state.selected === null ? 0 : state.selected;
    const isLast = i === w.stages.length - 1;
    tourPos.textContent = `Tahap ${i + 1} dari ${w.stages.length}`;
    tourPrev.disabled = i === 0;
    tourNext.innerHTML = isLast ? "Ulangi Workflow ⟳" : "Tahap Berikutnya →";
    tourNext.dataset.restart = isLast ? "1" : "";
  }

  tourBtn.addEventListener("click", startTour);
  tourExit.addEventListener("click", () => exitTour(false));
  tourPrev.addEventListener("click", () => {
    const i = state.selected === null ? 0 : state.selected;
    selectStage(i - 1, { fromTour: true });
    renderTourBar();
  });
  tourNext.addEventListener("click", () => {
    const w = wf();
    const i = state.selected === null ? 0 : state.selected;
    if (i >= w.stages.length - 1) {
      state.explored = new Set();
      selectStage(0, { fromTour: true });
    } else {
      selectStage(i + 1, { fromTour: true });
    }
    renderTourBar();
  });

  resetBtn.addEventListener("click", () => {
    state.selected = null;
    state.explored = new Set();
    exitTour(true);
    updateSelectionUI();
    renderDetail();
    renderProgress();
    renderTourBar();
  });

  /* ---------- keyboard navigation on canvas ---------- */
  canvasEl.setAttribute("tabindex", "0");
  canvasEl.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const w = wf();
    const cur = state.selected === null ? (e.key === "ArrowRight" ? -1 : 1) : state.selected;
    const nextIdx = e.key === "ArrowRight" ? cur + 1 : cur - 1;
    if (nextIdx >= 0 && nextIdx < w.stages.length) {
      e.preventDefault();
      selectStage(nextIdx);
    }
  });

  /* ---------- init ---------- */
  const w0 = wf();
  headTitle.textContent = w0.title;
  headDesc.textContent = w0.desc;
  renderTabs();
  renderCanvas();
  renderDetail();
  renderProgress();
  renderTourBar();
})();
