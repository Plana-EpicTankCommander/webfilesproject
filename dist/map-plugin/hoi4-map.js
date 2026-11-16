/*! hoi4-map · HOI4-style interactive atlas · Natural Earth 1:10m */
const D = `
:host {
  display: block;
  position: relative;
  width: 100%;
  color-scheme: dark;
}

*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }

.hm-frame {
  --hm-gold: #c9a86a;
  --hm-gold-bright: #ead39b;
  --hm-ink: #f0e6d2;
  --hm-ink-soft: #b9ac93;
  --hm-dark: #080f13;
  --hm-panel: rgba(12, 18, 21, 0.9);
  position: relative;
  width: 100%;
  height: var(--hm-height, 520px);
  min-height: 220px;
  overflow: hidden;
  isolation: isolate;
  border-radius: 10px;
  border: 1px solid rgba(201, 168, 106, 0.3);
  background: #081014;
  box-shadow:
    0 22px 55px rgba(22, 16, 9, 0.28),
    0 2px 0 rgba(255, 255, 255, 0.04) inset,
    0 0 0 1px rgba(0, 0, 0, 0.55) inset;
  font-family: "Segoe UI", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
  color: var(--hm-ink);
  -webkit-tap-highlight-color: transparent;
}

.hm-frame::before {
  content: "";
  position: absolute;
  inset: 6px;
  z-index: 4;
  border: 1px solid rgba(201, 168, 106, 0.14);
  border-radius: 6px;
  pointer-events: none;
}

.hm-frame::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  background:
    radial-gradient(ellipse at 50% 46%, transparent 48%, rgba(2, 6, 8, 0.38) 100%),
    linear-gradient(180deg, rgba(4, 8, 10, 0.14), transparent 18%, transparent 82%, rgba(3, 6, 8, 0.3));
}

.hm-canvas {
  position: absolute;
  inset: 0;
  z-index: 1;
  display: block;
  width: 100%;
  height: 100%;
  touch-action: none;
  cursor: default;
  outline: none;
}

.hm-frame[data-zoomed="true"] .hm-canvas { cursor: grab; }
.hm-frame[data-dragging="true"] .hm-canvas { cursor: grabbing; }
.hm-frame[data-busy="true"] .hm-canvas { cursor: progress; }
.hm-frame:focus-within { border-color: rgba(201, 168, 106, 0.55); }

.hm-grain {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background-image: var(--hm-grain, none);
  background-size: 180px 180px;
  opacity: 0.16;
  mix-blend-mode: overlay;
}

.hm-plate {
  position: absolute;
  top: 18px;
  left: 20px;
  z-index: 6;
  max-width: min(48%, 340px);
  padding: 9px 15px 10px;
  border: 1px solid rgba(201, 168, 106, 0.34);
  border-radius: 3px;
  background:
    linear-gradient(180deg, rgba(21, 29, 32, 0.9), rgba(9, 14, 17, 0.93));
  box-shadow:
    0 10px 24px rgba(0, 0, 0, 0.28),
    0 0 0 1px rgba(255, 255, 255, 0.035) inset;
  pointer-events: none;
}

.hm-plate::after {
  content: "";
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 5px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201, 168, 106, 0.55), transparent);
}

.hm-plate-kicker {
  display: block;
  margin-bottom: 3px;
  color: rgba(201, 168, 106, 0.78);
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 8px;
  letter-spacing: 0.32em;
  text-transform: uppercase;
}

.hm-title {
  margin: 0;
  color: var(--hm-ink);
  font-family: "Noto Serif SC", "Songti SC", "STSong", "SimSun", "Georgia", serif;
  font-size: clamp(14px, 1.7vw, 19px);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0.1em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
}

.hm-subtitle {
  margin: 4px 0 0;
  color: rgba(211, 195, 162, 0.58);
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 7.5px;
  letter-spacing: 0.28em;
  line-height: 1.3;
  text-transform: uppercase;
}

.hm-compass {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 5;
  width: 58px;
  height: 58px;
  opacity: 0.68;
  filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.45));
  pointer-events: none;
}

.hm-toolbar {
  position: absolute;
  right: 16px;
  bottom: 15px;
  z-index: 8;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 5px;
  border: 1px solid rgba(201, 168, 106, 0.28);
  border-radius: 5px;
  background: rgba(9, 14, 17, 0.84);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.32);
  backdrop-filter: blur(7px);
}

.hm-btn {
  display: grid;
  place-items: center;
  width: 27px;
  height: 26px;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 3px;
  background: transparent;
  color: #ded3bd;
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.hm-btn:hover:not(:disabled) {
  border-color: rgba(201, 168, 106, 0.38);
  background: rgba(201, 168, 106, 0.12);
  color: #fff4dc;
}

.hm-btn:active:not(:disabled) { transform: translateY(1px); }
.hm-btn:disabled { opacity: 0.32; cursor: default; }
.hm-btn:focus-visible { outline: 1px solid var(--hm-gold); outline-offset: 1px; }
.hm-btn.hm-fit { width: auto; padding: 0 8px; font-family: "Segoe UI", sans-serif; font-size: 10px; letter-spacing: 0.1em; }
.hm-btn.hm-full { font-size: 13px; }

.hm-zoom {
  min-width: 39px;
  color: rgba(224, 211, 185, 0.76);
  font-size: 10px;
  font-variant-numeric: tabular-nums;
  text-align: center;
  letter-spacing: 0.04em;
}

.hm-hint {
  position: absolute;
  left: 50%;
  bottom: 18px;
  z-index: 6;
  transform: translateX(-50%);
  padding: 5px 12px;
  border: 1px solid rgba(201, 168, 106, 0.18);
  border-radius: 999px;
  background: rgba(8, 13, 16, 0.64);
  color: rgba(222, 209, 181, 0.72);
  font-size: 10px;
  letter-spacing: 0.08em;
  white-space: nowrap;
  pointer-events: none;
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.hm-hint.is-hidden { opacity: 0; transform: translate(-50%, 6px); }

.hm-legend {
  position: absolute;
  left: 20px;
  bottom: 19px;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(214, 200, 173, 0.58);
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  pointer-events: none;
}

.hm-legend i {
  display: block;
  width: 18px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201, 168, 106, 0.65), transparent);
}

.hm-frame[data-selected="true"] .hm-legend { opacity: 0; }

.hm-tooltip {
  position: absolute;
  z-index: 12;
  min-width: 150px;
  max-width: 260px;
  padding: 9px 12px 10px 11px;
  border: 1px solid rgba(201, 168, 106, 0.38);
  border-radius: 3px;
  background:
    linear-gradient(180deg, rgba(20, 27, 30, 0.97), rgba(8, 12, 15, 0.97));
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
  pointer-events: none;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.12s ease, transform 0.12s ease;
}

.hm-tooltip.is-visible { opacity: 1; transform: translateY(0); }

.hm-tt-kicker {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 4px;
  color: rgba(201, 168, 106, 0.82);
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 8px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.hm-tt-dot {
  width: 7px;
  height: 7px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 50%;
  background: var(--hm-tt-color, #8a6b42);
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
}

.hm-tt-name {
  display: block;
  color: #f5ebd7;
  font-family: "Noto Serif SC", "Songti SC", "STSong", "SimSun", "Georgia", serif;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.25;
}

.hm-tt-sub {
  display: block;
  margin-top: 2px;
  color: rgba(211, 198, 172, 0.65);
  font-size: 10px;
  letter-spacing: 0.04em;
}

.hm-card {
  position: absolute;
  left: 18px;
  bottom: 17px;
  z-index: 9;
  width: 236px;
  padding: 13px 14px 12px;
  border: 1px solid rgba(201, 168, 106, 0.4);
  border-radius: 4px;
  background:
    linear-gradient(180deg, rgba(22, 29, 32, 0.96), rgba(9, 14, 17, 0.97));
  box-shadow: 0 16px 34px rgba(0, 0, 0, 0.4);
  animation: hm-card-in 0.18s ease both;
}

@keyframes hm-card-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

.hm-card-close {
  position: absolute;
  top: 4px;
  right: 5px;
  width: 22px;
  height: 22px;
  padding: 0;
  border: 0;
  background: transparent;
  color: rgba(221, 208, 184, 0.55);
  font-size: 15px;
  line-height: 1;
  cursor: pointer;
}

.hm-card-close:hover { color: #f5e9cc; }

.hm-card-head {
  display: flex;
  align-items: center;
  gap: 9px;
  padding-right: 18px;
}

.hm-swatch {
  flex: 0 0 auto;
  width: 24px;
  height: 24px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 2px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.4) inset;
}

.hm-card-name {
  display: block;
  color: #f5ebd7;
  font-family: "Noto Serif SC", "Songti SC", "STSong", "SimSun", "Georgia", serif;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.2;
}

.hm-card-en {
  display: block;
  margin-top: 2px;
  color: rgba(201, 168, 106, 0.72);
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 8px;
  font-style: normal;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.hm-card-stats {
  display: flex;
  gap: 8px;
  margin-top: 11px;
  padding-top: 9px;
  border-top: 1px solid rgba(201, 168, 106, 0.16);
}

.hm-stat { flex: 1; }
.hm-stat dt {
  color: rgba(201, 183, 150, 0.48);
  font-size: 8px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.hm-stat dd {
  margin: 2px 0 0;
  color: rgba(239, 227, 204, 0.9);
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 13px;
  letter-spacing: 0.04em;
}

.hm-loading,
.hm-error {
  position: absolute;
  inset: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background:
    radial-gradient(circle at 50% 42%, rgba(28, 48, 55, 0.72), rgba(5, 9, 11, 0.96) 70%);
  text-align: center;
  transition: opacity 0.45s ease, visibility 0.45s ease;
}

.hm-loading.is-done { opacity: 0; visibility: hidden; }

.hm-spinner {
  width: 34px;
  height: 34px;
  border: 1px solid rgba(201, 168, 106, 0.2);
  border-top-color: rgba(234, 211, 155, 0.9);
  border-radius: 50%;
  animation: hm-spin 1.1s linear infinite;
}

@keyframes hm-spin { to { transform: rotate(360deg); } }

.hm-loading p {
  margin: 0;
  color: rgba(236, 223, 198, 0.9);
  font-family: "Noto Serif SC", "Songti SC", "STSong", "SimSun", "Georgia", serif;
  font-size: 13px;
  letter-spacing: 0.16em;
}

.hm-progress {
  width: 132px;
  height: 1px;
  overflow: hidden;
  background: rgba(201, 168, 106, 0.18);
}

.hm-progress i {
  display: block;
  width: 0%;
  height: 100%;
  background: linear-gradient(90deg, rgba(201, 168, 106, 0.4), #ead39b);
  transition: width 0.2s ease;
}

.hm-loading small {
  color: rgba(201, 183, 150, 0.42);
  font-family: "Georgia", "Times New Roman", serif;
  font-size: 9px;
  letter-spacing: 0.2em;
}

.hm-error p {
  max-width: 80%;
  margin: 0;
  color: rgba(240, 219, 195, 0.82);
  font-size: 12px;
  line-height: 1.6;
}

.hm-retry {
  margin-top: 4px;
  padding: 6px 15px;
  border: 1px solid rgba(201, 168, 106, 0.4);
  border-radius: 2px;
  background: rgba(201, 168, 106, 0.08);
  color: #ead39b;
  font-size: 11px;
  letter-spacing: 0.12em;
  cursor: pointer;
}

.hm-live {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.hm-frame:fullscreen {
  width: 100vw;
  height: 100vh;
  border-radius: 0;
  border: 0;
}
.hm-frame:fullscreen .hm-plate { top: 26px; left: 28px; }
.hm-frame:fullscreen .hm-toolbar { right: 26px; bottom: 24px; }

@media (max-width: 640px) {
  .hm-frame { border-radius: 8px; }
  .hm-plate { top: 12px; left: 12px; max-width: 54%; padding: 7px 11px 8px; }
  .hm-plate-kicker { font-size: 7px; letter-spacing: 0.22em; }
  .hm-subtitle { display: none; }
  .hm-compass { display: none; }
  .hm-toolbar { right: 10px; bottom: 10px; }
  .hm-btn { width: 29px; height: 28px; }
  .hm-zoom { min-width: 34px; font-size: 9px; }
  .hm-legend { left: 12px; bottom: 16px; font-size: 8px; gap: 5px; }
  .hm-hint { display: none; }
  .hm-card { left: 10px; right: 10px; bottom: 10px; width: auto; }
  .hm-tooltip { max-width: 210px; }
  .hm-frame::before { inset: 4px; }
}

@media (pointer: coarse) {
  .hm-hint { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .hm-hint, .hm-tooltip, .hm-loading, .hm-card, .hm-spinner { transition: none !important; animation: none !important; }
}
`, H = "https://raw.githubusercontent.com/Plana-EpicTankCommander/sth_ineed/main/maps/world-map.json";
const T = {
  src: H,
  height: "520px",
  width: "100%",
  fit: "contain",
  title: "",
  subtitle: "",
  kicker: "ATLAS · 01",
  focus: "",
  zoom: 0,
  showTitle: !0,
  showCompass: !0,
  showGraticule: !1,
  showLegend: !1,
  showDivisionBorders: !1,
  showProvinceShading: !1,
  detailCountries: null,
  outlineCountries: null,
  onDivisionClick: null,
  data: null,
  interactive: !0
}, C = /* @__PURE__ */ new Map();
function E(h = {}) {
  return { ...T, ...h };
}
function L(h) {
  if (typeof h == "number" && Number.isFinite(h)) return `${Math.max(220, h)}px`;
  if (typeof h == "string" && h.trim()) {
    const t = h.trim();
    return /^\d+(\.\d+)?$/.test(t) ? `${Math.max(220, Number(t))}px` : t;
  }
  return T.height;
}
function W(h) {
  if (typeof h == "number" && Number.isFinite(h)) return h;
  if (typeof h == "string") {
    const t = h.trim().match(/^(\d+(?:\.\d+)?)(px)?$/);
    if (t) return Number(t[1]);
  }
  return null;
}
function O(h) {
  if (typeof h == "number" && Number.isFinite(h)) return `${Math.min(100, Math.max(20, h))}%`;
  if (typeof h == "string" && h.trim()) {
    const t = h.trim();
    return /^\d+(\.\d+)?$/.test(t) ? `${Math.min(100, Math.max(20, Number(t)))}%` : t;
  }
  return T.width;
}
function p(h, t, e) {
  return Math.min(e, Math.max(t, h));
}
function F(h, t, e) {
  const i = p((e - h) / (t - h), 0, 1);
  return i * i * (3 - 2 * i);
}
function R(h) {
  let t = 0, e = 0;
  const i = [];
  for (let s = 0; s + 1 < h.length; s += 2)
    t += h[s], e += h[s + 1], i.push([t, e]);
  return i;
}
async function q(h, t) {
  if (C.has(h)) {
    const i = C.get(h);
    return i instanceof Promise, i;
  }
  const e = (async () => {
    const i = await fetch(h, { cache: "no-cache" });
    if (!i.ok) throw new Error(`地图数据请求失败：HTTP ${i.status}`);
    const s = Number(i.headers.get("content-length")) || 0;
    if (!i.body || !s) {
      const d = await i.json();
      return t?.(1), d;
    }
    const o = i.body.getReader(), n = [];
    let r = 0;
    for (; ; ) {
      const { done: d, value: f } = await o.read();
      if (d) break;
      n.push(f), r += f.length, t?.(p(r / s, 0, 1));
    }
    t?.(1);
    const a = new Uint8Array(r);
    let c = 0;
    for (const d of n)
      a.set(d, c), c += d.length;
    const l = new TextDecoder("utf-8").decode(a);
    return JSON.parse(l);
  })();
  C.set(h, e);
  try {
    const i = await e;
    return C.set(h, i), i;
  } catch (i) {
    throw C.delete(h), i;
  }
}
class N {
  constructor(t, e = {}) {
    if (!t) throw new Error("Hoi4Map 需要一个容器元素");
    this.host = t, this.options = E(e), this.src = this.options.src || H, this.explicitHeightPx = W(this.options.height), this.destroyed = !1, this.ready = !1, this.data = null, this.pendingReveal = !1, this.viewW = 1, this.viewH = 1, this.dpr = 1, this.fitScale = 1, this.scale = 1, this.tx = 0, this.ty = 0, this.snapMargin = 0, this.pointers = /* @__PURE__ */ new Map(), this.drag = null, this.pinch = null, this.dragging = !1, this.hoverDivision = null, this.hoverCountry = null, this.selectedCountry = null, this.fastRaf = 0, this.qualityRaf = 0, this.settleTimer = 0, this.hintTimer = 0, this.arcs = [], this.fillGroups = /* @__PURE__ */ new Map(), this.countryPathCache = /* @__PURE__ */ new Map(), this.grid = null, this.labelCountries = [], this.bound = {
      pointerDown: (i) => this.onPointerDown(i),
      pointerMove: (i) => this.onPointerMove(i),
      pointerUp: (i) => this.onPointerUp(i),
      pointerCancel: (i) => this.onPointerUp(i, !0),
      pointerLeave: () => this.onPointerLeave(),
      wheel: (i) => this.onWheel(i),
      doubleClick: (i) => this.onDoubleClick(i),
      keyDown: (i) => this.onKeyDown(i),
      toolbarClick: (i) => this.onToolbarClick(i),
      cardClose: () => this.clearSelection(),
      retry: () => this.load(),
      fullscreenChange: () => this.onFullscreenChange()
    }, this.setupDom(), this.host.__hoi4Map = this, this.bindEvents(), this.observeResize(), this.makeGrain(), this.resize(), this.options.data ? this.useData(this.options.data) : this.load();
  }
  useData(t) {
    this.data = t, this.ready = !0, this.prepare(t), this.frame.dataset.busy = "false", this.loading.hidden = !0, this.pendingReveal = !1, this.fitScale = this.computeFitScale(), this.resize(), this.applyInitialView(), this.updateChrome(), this.updateToolbar(), this.invalidateQuality();
  }
  setData(t) {
    if (this.destroyed || !t) return;
    const e = this.data?.meta?.width, i = this.data?.meta?.height;
    this.hideTooltip(), this.clearSelection(), this.ready = !0, this.prepare(t), this.fitScale = this.computeFitScale(), (e !== t.meta.width || i !== t.meta.height) && (this.scale = this.fitScale, this.tx = (this.viewW - t.meta.width * this.scale) / 2, this.ty = (this.viewH - t.meta.height * this.scale) / 2), this.clampTransform(), this.updateChrome(), this.updateToolbar(), this.snapshot = null, this.invalidateQuality();
  }
  // ---------------------------------------------------------------------------
  // DOM
  // ---------------------------------------------------------------------------
  setupDom() {
    this.host.style.display = this.host.style.display || "block", this.host.style.width = O(this.options.width), this.root = this.host.shadowRoot || this.host.attachShadow({ mode: "open" }), this.root.innerHTML = `
      <style>${D}</style>
      <div class="hm-frame" data-busy="true">
        <canvas class="hm-canvas" tabindex="0" role="application" aria-label="可缩放的世界政治地图"></canvas>
        <div class="hm-grain"></div>

        <header class="hm-plate">
          <span class="hm-plate-kicker"></span>
          <h2 class="hm-title"></h2>
          <p class="hm-subtitle"></p>
        </header>

        <svg class="hm-compass" viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="24.5" fill="none" stroke="currentColor" stroke-opacity=".34"/>
          <circle cx="32" cy="32" r="19" fill="none" stroke="currentColor" stroke-opacity=".16" stroke-dasharray="1 3"/>
          <path d="M32 4 L36.5 28 L32 32 L27.5 28 Z" fill="currentColor" fill-opacity=".82"/>
          <path d="M32 60 L27.5 36 L32 32 L36.5 36 Z" fill="currentColor" fill-opacity=".32"/>
          <path d="M4 32 L28 27.5 L32 32 L28 36.5 Z" fill="currentColor" fill-opacity=".32"/>
          <path d="M60 32 L36 36.5 L32 32 L36 27.5 Z" fill="currentColor" fill-opacity=".32"/>
          <text x="32" y="11" text-anchor="middle" fill="currentColor" fill-opacity=".8" font-family="Georgia,serif" font-size="6.5">N</text>
          <text x="55.5" y="34" text-anchor="middle" fill="currentColor" fill-opacity=".55" font-family="Georgia,serif" font-size="5.5">E</text>
          <text x="32" y="57.5" text-anchor="middle" fill="currentColor" fill-opacity=".55" font-family="Georgia,serif" font-size="5.5">S</text>
          <text x="8.5" y="34" text-anchor="middle" fill="currentColor" fill-opacity=".55" font-family="Georgia,serif" font-size="5.5">W</text>
        </svg>

        <div class="hm-toolbar" role="group" aria-label="地图控制">
          <button type="button" class="hm-btn" data-action="zoom-out" aria-label="缩小" title="缩小">−</button>
          <span class="hm-zoom" aria-live="off">100%</span>
          <button type="button" class="hm-btn" data-action="zoom-in" aria-label="放大" title="放大">+</button>
          <button type="button" class="hm-btn hm-fit" data-action="reset" aria-label="回到全图" title="回到全图">适合</button>
          <button type="button" class="hm-btn hm-full" data-action="fullscreen" aria-label="全屏" title="全屏">⛶</button>
        </div>

        <div class="hm-hint">滚轮缩放 · 拖动平移 · 双击放大</div>
        <div class="hm-legend">
          <span class="hm-legend-countries"></span>
          <i></i>
          <span class="hm-legend-divisions"></span>
        </div>

        <div class="hm-tooltip" role="status">
          <span class="hm-tt-kicker"><i class="hm-tt-dot"></i><span class="hm-tt-country"></span></span>
          <strong class="hm-tt-name"></strong>
          <small class="hm-tt-sub"></small>
        </div>

        <div class="hm-card" hidden>
          <button type="button" class="hm-card-close" aria-label="关闭国家信息">×</button>
          <div class="hm-card-head">
            <span class="hm-swatch"></span>
            <div>
              <strong class="hm-card-name"></strong>
              <em class="hm-card-en"></em>
            </div>
          </div>
          <dl class="hm-card-stats">
            <div class="hm-stat"><dt>代码</dt><dd class="hm-card-code"></dd></div>
            <div class="hm-stat"><dt>一级行政区</dt><dd class="hm-card-count"></dd></div>
          </dl>
        </div>

        <div class="hm-loading">
          <div class="hm-spinner"></div>
          <p>正在展开地图…</p>
          <div class="hm-progress"><i></i></div>
          <small>0%</small>
        </div>

        <div class="hm-error" hidden>
          <p class="hm-error-text"></p>
          <button type="button" class="hm-retry">重试</button>
        </div>

        <div class="hm-live" aria-live="polite"></div>
      </div>
    `, this.frame = this.root.querySelector(".hm-frame"), this.canvas = this.root.querySelector(".hm-canvas"), this.ctx = this.canvas.getContext("2d"), this.plate = this.root.querySelector(".hm-plate"), this.plateKicker = this.root.querySelector(".hm-plate-kicker"), this.titleEl = this.root.querySelector(".hm-title"), this.subtitleEl = this.root.querySelector(".hm-subtitle"), this.zoomLabel = this.root.querySelector(".hm-zoom"), this.toolbar = this.root.querySelector(".hm-toolbar"), this.hintEl = this.root.querySelector(".hm-hint"), this.legend = this.root.querySelector(".hm-legend"), this.legendCountries = this.root.querySelector(".hm-legend-countries"), this.legendDivisions = this.root.querySelector(".hm-legend-divisions"), this.tooltip = this.root.querySelector(".hm-tooltip"), this.tooltipCountry = this.root.querySelector(".hm-tt-country"), this.tooltipName = this.root.querySelector(".hm-tt-name"), this.tooltipSub = this.root.querySelector(".hm-tt-sub"), this.card = this.root.querySelector(".hm-card"), this.cardSwatch = this.root.querySelector(".hm-swatch"), this.cardName = this.root.querySelector(".hm-card-name"), this.cardEn = this.root.querySelector(".hm-card-en"), this.cardCode = this.root.querySelector(".hm-card-code"), this.cardCount = this.root.querySelector(".hm-card-count"), this.loading = this.root.querySelector(".hm-loading"), this.progressBar = this.root.querySelector(".hm-progress i"), this.loadingPercent = this.root.querySelector(".hm-loading small"), this.errorBox = this.root.querySelector(".hm-error"), this.errorText = this.root.querySelector(".hm-error-text"), this.live = this.root.querySelector(".hm-live"), this.frame.style.setProperty("--hm-height", L(this.options.height)), this.plateKicker.textContent = this.options.kicker || T.kicker, this.titleEl.textContent = this.options.title || "世界政治地图", this.subtitleEl.textContent = this.options.subtitle || "WORLD POLITICAL MAP", this.plate.hidden = !this.options.showTitle || this.options.title === "none", this.root.querySelector(".hm-compass").hidden = !this.options.showCompass, this.legend.hidden = !this.options.showLegend, document.fullscreenEnabled || (this.root.querySelector(".hm-full").hidden = !0), this.options.interactive || (this.toolbar.hidden = !0, this.hintEl.hidden = !0), this.hintTimer = window.setTimeout(() => this.dismissHint(), 6e3);
  }
  bindEvents() {
    const t = this.canvas;
    t.addEventListener("pointerdown", this.bound.pointerDown), t.addEventListener("pointermove", this.bound.pointerMove), t.addEventListener("pointerup", this.bound.pointerUp), t.addEventListener("pointercancel", this.bound.pointerCancel), t.addEventListener("pointerleave", this.bound.pointerLeave), t.addEventListener("wheel", this.bound.wheel, { passive: !1 }), t.addEventListener("dblclick", this.bound.doubleClick), t.addEventListener("keydown", this.bound.keyDown), this.toolbar.addEventListener("click", this.bound.toolbarClick), this.root.querySelector(".hm-card-close").addEventListener("click", this.bound.cardClose), this.root.querySelector(".hm-retry").addEventListener("click", this.bound.retry), document.addEventListener("fullscreenchange", this.bound.fullscreenChange);
  }
  observeResize() {
    if (typeof ResizeObserver > "u") {
      this.windowResize = () => this.resize(), window.addEventListener("resize", this.windowResize);
      return;
    }
    this.resizeObserver = new ResizeObserver(() => this.resize()), this.resizeObserver.observe(this.frame);
  }
  makeGrain() {
    const e = document.createElement("canvas");
    e.width = 180, e.height = 180;
    const i = e.getContext("2d"), s = i.createImageData(180, 180);
    for (let o = 0; o < s.data.length; o += 4) {
      const n = 118 + Math.floor(Math.random() * 118);
      s.data[o] = n, s.data[o + 1] = n, s.data[o + 2] = n, s.data[o + 3] = Math.floor(Math.random() * 24);
    }
    i.putImageData(s, 0, 0), this.frame.style.setProperty("--hm-grain", `url(${e.toDataURL("image/png")})`);
  }
  // ---------------------------------------------------------------------------
  // Loading / data
  // ---------------------------------------------------------------------------
  async load() {
    if (!this.destroyed) {
      this.ready = !1, this.frame.dataset.busy = "true", this.loading.hidden = !1, this.loading.classList.remove("is-done"), this.errorBox.hidden = !0, this.progressBar.style.width = "0%", this.loadingPercent.textContent = "0%";
      try {
        const t = await q(this.src, (e) => {
          if (this.destroyed) return;
          const i = Math.round(e * 100);
          this.progressBar.style.width = `${i}%`, this.loadingPercent.textContent = `${i}%`;
        });
        if (this.destroyed) return;
        this.prepare(t), this.ready = !0, this.frame.dataset.busy = "false", this.resize(), this.applyInitialView(), this.updateChrome(), this.updateToolbar(), this.dismissHint(), this.pendingReveal = !0, this.invalidateQuality();
      } catch (t) {
        if (this.destroyed) return;
        this.frame.dataset.busy = "false", this.loading.hidden = !0, this.errorBox.hidden = !1, this.errorText.textContent = t?.message || "地图加载失败", console.error("[hoi4-map]", t);
      }
    }
  }
  prepare(t) {
    if (!t || !Array.isArray(t.arcs) || !Array.isArray(t.divisions))
      throw new Error("地图 JSON 格式不正确");
    this.data = t, this.arcs = t.arcs.map(R), this.fillGroups.clear(), this.countryPathCache.clear(), this.hoverDivision = null, this.hoverCountry = null, this.selectedCountry = null, this.countryByCode = new Map(t.countries.map((n) => [n.code, n]));
    const e = /* @__PURE__ */ new Map(), i = {
      cols: 56,
      rows: 1,
      cell: t.meta.width / 56,
      cells: []
    };
    i.rows = Math.ceil(t.meta.height / i.cell), i.cells = Array.from({ length: i.cols * i.rows }, () => []);
    for (const n of t.divisions) {
      const r = this.ringsForDivision(n);
      if (!r.length) continue;
      const a = this.pathFromRings(r), c = this.boundsOfRings(r);
      n._rings = r, n._path = a, n._bbox = c;
      const l = this.options.showProvinceShading ? n.color : this.countryByCode.get(n.country)?.color || n.color;
      let d = this.fillGroups.get(l);
      d || (d = new Path2D(), this.fillGroups.set(l, d)), d.addPath(a);
      const f = p(Math.floor((c[0] - t.meta.width * 0) / i.cell), 0, i.cols - 1), g = p(Math.floor(c[2] / i.cell), 0, i.cols - 1), S = p(Math.floor(c[1] / i.cell), 0, i.rows - 1), M = p(Math.floor(c[3] / i.cell), 0, i.rows - 1);
      for (let b = S; b <= M; b++)
        for (let v = f; v <= g; v++)
          i.cells[b * i.cols + v].push(n);
      e.set(n.id, n);
    }
    this.grid = i, this.byDivision = e, this.labelCountries = [...t.countries].sort((n, r) => r.area - n.area), this.coastPath = this.pathFromArcList(t.coast || []), this.borderPath = this.pathFromArcList(t.borders || []), this.graticulePath = this.pathFromGraticule(t.graticule || []), this.divisionBorderPath = null, this.detailBorderPath = null, this.detailCountryCodes = [];
    const s = /* @__PURE__ */ new Set([...t.coast || [], ...t.borders || []]), o = new Set(this.options.detailCountries || t.meta.detailCountries || []);
    if (this.detailCountryCodes = [...o], this.outlineCountryCodes = [...new Set(this.options.outlineCountries || t.meta.outlineCountries || [])], this.options.showDivisionBorders) {
      const n = /* @__PURE__ */ new Set();
      for (const r of t.divisions)
        for (const a of r.polygons || [])
          for (const c of a)
            for (const l of c) {
              const d = l < 0 ? ~l : l;
              s.has(d) || n.add(d);
            }
      this.divisionBorderPath = this.pathFromArcList([...n]);
    } else if (o.size) {
      const n = /* @__PURE__ */ new Set();
      for (const r of t.divisions)
        if (o.has(r.country))
          for (const a of r.polygons || [])
            for (const c of a)
              for (const l of c) {
                const d = l < 0 ? ~l : l;
                s.has(d) || n.add(d);
              }
      n.size && (this.detailBorderPath = this.pathFromArcList([...n]));
    }
    this.countryPaths = /* @__PURE__ */ new Map();
    for (const n of t.countries) {
      const r = this.pathFromArcList(n.arcs || []);
      this.countryPaths.set(n.code, r);
    }
  }
  ringsForDivision(t) {
    const e = [];
    for (const i of t.polygons || [])
      for (const s of i) {
        const o = [];
        for (const n of s) {
          const r = n < 0 ? ~n : n, a = this.arcs[r];
          if (!(!a || a.length === 0))
            if (n < 0)
              for (let c = a.length - 1; c >= 0; c--) this.pushPoint(o, a[c]);
            else
              for (let c = 0; c < a.length; c++) this.pushPoint(o, a[c]);
        }
        if (o.length > 1) {
          const n = o[0], r = o[o.length - 1];
          n[0] === r[0] && n[1] === r[1] && o.pop();
        }
        o.length >= 3 && e.push(o);
      }
    return e;
  }
  pushPoint(t, e) {
    const i = t[t.length - 1];
    i && i[0] === e[0] && i[1] === e[1] || t.push(e);
  }
  pathFromRings(t) {
    const e = new Path2D();
    for (const i of t) {
      e.moveTo(i[0][0], i[0][1]);
      for (let s = 1; s < i.length; s++) e.lineTo(i[s][0], i[s][1]);
      e.closePath();
    }
    return e;
  }
  pathFromArcList(t) {
    const e = new Path2D();
    for (const i of t) {
      const s = this.arcs[i];
      if (!(!s || s.length < 2)) {
        e.moveTo(s[0][0], s[0][1]);
        for (let o = 1; o < s.length; o++) e.lineTo(s[o][0], s[o][1]);
      }
    }
    return e;
  }
  pathFromGraticule(t) {
    const e = new Path2D();
    for (const i of t) {
      const s = R(i);
      if (!(s.length < 2)) {
        e.moveTo(s[0][0], s[0][1]);
        for (let o = 1; o < s.length; o++) e.lineTo(s[o][0], s[o][1]);
      }
    }
    return e;
  }
  boundsOfRings(t) {
    let e = 1 / 0, i = 1 / 0, s = -1 / 0, o = -1 / 0;
    for (const n of t)
      for (const [r, a] of n)
        r < e && (e = r), a < i && (i = a), r > s && (s = r), a > o && (o = a);
    return [e, i, s, o];
  }
  // ---------------------------------------------------------------------------
  // Layout / camera
  // ---------------------------------------------------------------------------
  resize() {
    if (this.destroyed) return;
    const t = this.frame.getBoundingClientRect();
    if (t.width < 2 || t.height < 2) return;
    if (this.ready && this.data && this.explicitHeightPx && document.fullscreenElement !== this.frame) {
      const l = this.data.meta.width / this.data.meta.height, d = t.width < 760 ? Math.round(Math.max(280, Math.min(this.explicitHeightPx, t.width / l + 128))) : Math.round(this.explicitHeightPx);
      if (Math.abs(t.height - d) > 2) {
        this.frame.style.setProperty("--hm-height", `${d}px`);
        return;
      }
    }
    const e = this.fitScale, i = this.scale, s = this.viewW, o = this.viewH, n = e ? (s / 2 - this.tx) / i : 0, r = e ? (o / 2 - this.ty) / i : 0;
    this.viewW = Math.max(2, this.frame.clientWidth), this.viewH = Math.max(2, this.frame.clientHeight), this.dpr = p(window.devicePixelRatio || 1, 1, 2), this.canvas.width = Math.max(1, Math.round(this.viewW * this.dpr)), this.canvas.height = Math.max(1, Math.round(this.viewH * this.dpr)), this.ctx = this.canvas.getContext("2d"), this.snapMargin = Math.round(Math.min(this.viewW, this.viewH) * 0.32);
    const a = Math.round((this.viewW + this.snapMargin * 2) * this.dpr), c = Math.round((this.viewH + this.snapMargin * 2) * this.dpr);
    if (this.mapCanvas || (this.mapCanvas = document.createElement("canvas")), this.mapCanvas.width = Math.max(1, a), this.mapCanvas.height = Math.max(1, c), this.mapCtx = this.mapCanvas.getContext("2d"), this.snapshot = null, this.buildOcean(), this.ready && this.data) {
      if (this.fitScale = this.computeFitScale(), e > 0 && i > 0) {
        const l = i / e;
        this.scale = p(this.fitScale * l, this.fitScale * 1, this.fitScale * 32), this.tx = this.viewW / 2 - n * this.scale, this.ty = this.viewH / 2 - r * this.scale;
      } else
        this.scale = this.fitScale, this.tx = (this.viewW - this.data.meta.width * this.scale) / 2, this.ty = (this.viewH - this.data.meta.height * this.scale) / 2;
      this.clampTransform(), this.updateToolbar(), this.invalidateQuality();
    } else
      this.renderEmpty();
  }
  setHeight(t) {
    this.options.height = t, this.explicitHeightPx = W(t), this.frame.style.setProperty("--hm-height", L(t)), this.resize();
  }
  contentBounds() {
    if (!this.data) return [0, 0, 1, 1];
    const t = [0, 0, this.data.meta.width, this.data.meta.height];
    let e = 1 / 0, i = 1 / 0, s = -1 / 0, o = -1 / 0;
    for (const n of this.data.countries || []) {
      const r = n.bbox;
      !r || r.length < 4 || r[2] > r[0] && r[3] > r[1] && (e = Math.min(e, r[0]), i = Math.min(i, r[1]), s = Math.max(s, r[2]), o = Math.max(o, r[3]));
    }
    return Number.isFinite(e) ? [e, i, s, o] : t;
  }
  computeFitScale() {
    if (!this.data) return 1;
    const t = this.contentBounds(), e = Math.max(1, t[2] - t[0]), i = Math.max(1, t[3] - t[1]);
    return (this.options.fit === "cover" ? Math.max(this.viewW / e, this.viewH / i) : Math.min(this.viewW / e, this.viewH / i)) * (this.options.fit === "cover" ? 1.01 : 0.965);
  }
  fitContent(t = !0) {
    this.ready && (this.fitScale = this.computeFitScale(), this.resetView(t));
  }
  applyInitialView() {
    if (!this.ready) return;
    this.fitScale = this.computeFitScale();
    const t = Number(this.options.zoom) || 0, e = this.options.focus;
    if (e)
      this.focusOn(e, t || 2.6);
    else if (t > 1) {
      this.scale = p(this.fitScale * t, this.fitScale * 1, this.fitScale * 32);
      const i = this.contentBounds();
      this.tx = this.viewW / 2 - (i[0] + i[2]) / 2 * this.scale, this.ty = this.viewH / 2 - (i[1] + i[3]) / 2 * this.scale, this.clampTransform();
    } else
      this.resetView(!1);
    this.updateToolbar();
  }
  resetView(t = !0) {
    if (!this.ready) return;
    this.scale = this.fitScale;
    const e = this.contentBounds();
    this.tx = this.viewW / 2 - (e[0] + e[2]) / 2 * this.scale, this.ty = this.viewH / 2 - (e[1] + e[3]) / 2 * this.scale, this.updateToolbar(), this.invalidateFast(), this.scheduleQuality(100), t && this.dismissHint();
  }
  focusOn(t, e = 2.6) {
    if (!this.ready) return !1;
    let i = this.countryByCode.get(t);
    if (!i) {
      const g = this.byDivision.get(t);
      g && (i = this.countryByCode.get(g.country));
    }
    if (!i)
      return this.resetView(!1), !1;
    const [s, o, n, r] = i.bbox, a = Number.isFinite(i.label?.[0]) ? i.label[0] : (s + n) / 2, c = Number.isFinite(i.label?.[1]) ? i.label[1] : (o + r) / 2, l = Math.max(n - s, r - o);
    let d = Math.max(1.2, Math.min(32, e));
    if (l > 0 && l < 220) {
      const g = Math.min(this.viewW, this.viewH) * 0.5 / (l * this.fitScale);
      d = Math.max(d, p(g, 2.6, 32));
    }
    const f = p(
      this.fitScale * d,
      this.fitScale * 1,
      this.fitScale * 32
    );
    return this.scale = f, this.tx = this.viewW / 2 - a * f, this.ty = this.viewH / 2 - c * f, this.clampTransform(), this.updateToolbar(), this.invalidateFast(), this.scheduleQuality(100), !0;
  }
  setView({ focus: t = "", zoom: e = 0 } = {}) {
    return t ? this.focusOn(t, Number(e) || 2.6) : Number(e) > 1 ? (this.scale = p(this.fitScale * Number(e), this.fitScale * 1, this.fitScale * 32), this.tx = this.viewW / 2 - this.data.meta.width * this.scale / 2, this.ty = this.viewH / 2 - this.data.meta.height * this.scale / 2, this.clampTransform(), this.updateToolbar(), this.invalidateFast(), this.scheduleQuality(100), !0) : (this.resetView(), !0);
  }
  clampTransform() {
    if (!this.data) return;
    const t = this.data.meta.width * this.scale, e = this.data.meta.height * this.scale;
    t <= this.viewW ? this.tx = (this.viewW - t) / 2 : this.tx = p(this.tx, this.viewW - t, 0), e <= this.viewH ? this.ty = (this.viewH - e) / 2 : this.ty = p(this.ty, this.viewH - e, 0);
  }
  zoomAt(t, e, i) {
    if (!this.ready) return;
    const s = p(t, this.fitScale * 1, this.fitScale * 32);
    if (Math.abs(s - this.scale) < 1e-9) return;
    const o = (e - this.tx) / this.scale, n = (i - this.ty) / this.scale;
    this.scale = s, this.tx = e - o * s, this.ty = i - n * s, this.clampTransform(), this.updateToolbar(), this.invalidateFast(), this.scheduleQuality(180), this.dismissHint();
  }
  updateToolbar() {
    if (!this.zoomLabel) return;
    const t = this.fitScale ? Math.round(this.scale / this.fitScale * 100) : 100;
    this.zoomLabel.textContent = `${t}%`, this.frame.dataset.zoomed = this.scale > this.fitScale * 1.01 ? "true" : "false", this.canvas && (this.canvas.style.touchAction = this.scale > this.fitScale * 1.01 ? "none" : "pan-y");
    const e = this.root.querySelector('[data-action="zoom-out"]'), i = this.root.querySelector('[data-action="zoom-in"]');
    e && (e.disabled = this.scale <= this.fitScale * 1.001), i && (i.disabled = this.scale >= this.fitScale * 32 * 0.999);
  }
  updateChrome() {
    if (!this.data) return;
    const t = this.data.meta;
    this.titleEl.textContent = this.options.title || t.title || "世界政治地图", this.subtitleEl.textContent = this.options.subtitle || t.titleEn || "WORLD POLITICAL MAP", this.legendCountries.textContent = `${t.countries} 国家`, this.legendDivisions.textContent = `${t.divisions.toLocaleString("zh-CN")} 一级行政区`, this.canvas.setAttribute("aria-label", `可缩放的世界政治地图，${t.countries} 个国家，${t.divisions} 个一级行政区`);
  }
  // ---------------------------------------------------------------------------
  // Ocean / background
  // ---------------------------------------------------------------------------
  buildOcean() {
    const t = Math.max(1, Math.round(this.viewW * this.dpr)), e = Math.max(1, Math.round(this.viewH * this.dpr));
    this.oceanCanvas || (this.oceanCanvas = document.createElement("canvas")), (this.oceanCanvas.width !== t || this.oceanCanvas.height !== e) && (this.oceanCanvas.width = t, this.oceanCanvas.height = e);
    const i = this.oceanCanvas.getContext("2d");
    i.setTransform(this.dpr, 0, 0, this.dpr, 0, 0), i.clearRect(0, 0, this.viewW, this.viewH);
    const s = i.createLinearGradient(0, 0, 0, this.viewH);
    s.addColorStop(0, "#13242c"), s.addColorStop(0.46, "#0d1a20"), s.addColorStop(1, "#071014"), i.fillStyle = s, i.fillRect(0, 0, this.viewW, this.viewH);
    const o = i.createRadialGradient(
      this.viewW * 0.5,
      this.viewH * 0.38,
      0,
      this.viewW * 0.5,
      this.viewH * 0.42,
      Math.max(this.viewW, this.viewH) * 0.72
    );
    o.addColorStop(0, "rgba(65, 105, 118, 0.26)"), o.addColorStop(0.48, "rgba(26, 50, 60, 0.12)"), o.addColorStop(1, "rgba(0, 0, 0, 0)"), i.fillStyle = o, i.fillRect(0, 0, this.viewW, this.viewH);
    const n = Math.round(this.viewW * this.viewH / 900);
    for (let r = 0; r < n; r++) {
      const a = Math.random() * this.viewW, c = Math.random() * this.viewH;
      i.fillStyle = `rgba(174, 204, 210, ${0.012 + Math.random() * 0.022})`, i.fillRect(a, c, 1, 1);
    }
    i.lineWidth = 0.7;
    for (let r = 0; r < 18; r++) {
      const a = Math.random() * this.viewH, c = Math.random() * this.viewW, l = 30 + Math.random() * 150;
      i.beginPath(), i.strokeStyle = `rgba(142, 178, 188, ${0.012 + Math.random() * 0.018})`, i.moveTo(c, a), i.bezierCurveTo(c + l * 0.3, a - 5, c + l * 0.7, a + 5, c + l, a), i.stroke();
    }
  }
  renderEmpty() {
    this.ctx && (this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0), this.ctx.clearRect(0, 0, this.viewW, this.viewH), this.oceanCanvas && this.ctx.drawImage(this.oceanCanvas, 0, 0, this.viewW, this.viewH));
  }
  // ---------------------------------------------------------------------------
  // Render
  //
  // A full vector redraw is relatively expensive at 1:10m detail, so the map
  // uses a two-speed renderer:
  //   - quality: vector draw into an offscreen canvas, cached as a snapshot
  //   - fast:   transform the snapshot while dragging / wheeling
  // The sharp vector pass is re-run ~180 ms after the interaction stops.
  // ---------------------------------------------------------------------------
  invalidateFast() {
    this.destroyed || (this.qualityRaf && (cancelAnimationFrame(this.qualityRaf), this.qualityRaf = 0), !this.fastRaf && (this.fastRaf = requestAnimationFrame(() => {
      this.fastRaf = 0, this.renderFast();
    })));
  }
  invalidateQuality() {
    this.destroyed || (this.fastRaf && (cancelAnimationFrame(this.fastRaf), this.fastRaf = 0), !this.qualityRaf && (this.qualityRaf = requestAnimationFrame(() => {
      this.qualityRaf = 0, this.renderQuality();
    })));
  }
  invalidate() {
    this.invalidateFast();
  }
  scheduleQuality(t = 180) {
    this.destroyed || (this.settleTimer && clearTimeout(this.settleTimer), this.settleTimer = window.setTimeout(() => {
      if (this.settleTimer = 0, this.pointers.size || this.dragging) {
        this.scheduleQuality(120);
        return;
      }
      this.invalidateQuality();
    }, t));
  }
  drawOcean(t) {
    t.setTransform(this.dpr, 0, 0, this.dpr, 0, 0), t.clearRect(0, 0, this.viewW, this.viewH), this.oceanCanvas && t.drawImage(this.oceanCanvas, 0, 0, this.viewW, this.viewH);
  }
  render() {
    this.renderQuality();
  }
  renderQuality() {
    if (this.destroyed || !this.ctx || (this.drawOcean(this.ctx), this.drawGraticule(this.ctx), !this.ready || !this.data || !this.mapCtx)) return;
    const t = this.mapCtx, e = this.snapMargin;
    t.setTransform(this.dpr, 0, 0, this.dpr, 0, 0), t.clearRect(0, 0, this.viewW + e * 2, this.viewH + e * 2), this.drawMap(t, this.tx + e, this.ty + e), this.snapshot = {
      scale: this.scale,
      tx: this.tx + e,
      ty: this.ty + e,
      w: this.viewW + e * 2,
      h: this.viewH + e * 2
    }, this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0), this.ctx.drawImage(
      this.mapCanvas,
      e * this.dpr,
      e * this.dpr,
      this.viewW * this.dpr,
      this.viewH * this.dpr,
      0,
      0,
      this.viewW,
      this.viewH
    ), this.drawLabels(this.ctx), this.drawOverlays(this.ctx), this.revealMap();
  }
  revealMap() {
    !this.pendingReveal || this.destroyed || (this.pendingReveal = !1, this.loading.classList.add("is-done"), window.setTimeout(() => {
      this.destroyed || (this.loading.hidden = !0);
    }, 520));
  }
  renderFast() {
    if (this.destroyed || !this.ctx) return;
    if (this.drawOcean(this.ctx), this.drawGraticule(this.ctx), !this.ready || !this.data || !this.mapCanvas || !this.snapshot) {
      this.renderQuality();
      return;
    }
    const t = this.scale / this.snapshot.scale, e = this.tx - this.snapshot.tx * t, i = this.ty - this.snapshot.ty * t;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0), this.ctx.imageSmoothingEnabled = !0, this.ctx.drawImage(
      this.mapCanvas,
      e,
      i,
      this.snapshot.w * t,
      this.snapshot.h * t
    ), this.drawLabels(this.ctx), this.drawOverlays(this.ctx);
  }
  drawGraticule(t) {
    !this.options.showGraticule || !this.graticulePath || !this.ready || (t.save(), t.setTransform(
      this.dpr * this.scale,
      0,
      0,
      this.dpr * this.scale,
      this.dpr * this.tx,
      this.dpr * this.ty
    ), t.lineWidth = 0.75 / this.scale, t.strokeStyle = "rgba(126, 164, 176, 0.12)", t.stroke(this.graticulePath), t.restore());
  }
  drawMap(t, e = this.tx, i = this.ty) {
    const s = this.scale;
    t.save(), t.setTransform(this.dpr * s, 0, 0, this.dpr * s, this.dpr * e, this.dpr * i), t.lineJoin = "round", t.lineCap = "round";
    const o = this.scale / this.fitScale;
    if (this.coastPath && o > 1.18) {
      const r = p(0.45 + o * 0.1, 0.45, 1), a = [
        [4.5, "rgba(201, 168, 106, 0.018)"],
        [2.5, "rgba(0, 4, 6, 0.08)"],
        [1.3, "rgba(0, 3, 5, 0.12)"],
        [0.65, "rgba(0, 2, 4, 0.18)"]
      ];
      for (const [c, l] of a)
        t.lineWidth = c * r / s, t.strokeStyle = l, t.stroke(this.coastPath);
    }
    for (const [r, a] of this.fillGroups)
      t.fillStyle = r, t.fill(a);
    this.detailBorderPath && s > this.fitScale * 1.55 && (t.lineWidth = 0.55 / s, t.strokeStyle = "rgba(18, 15, 11, 0.42)", t.stroke(this.detailBorderPath)), this.divisionBorderPath && (t.lineWidth = 0.7 / s, t.strokeStyle = "rgba(18, 15, 11, 0.52)", t.stroke(this.divisionBorderPath)), this.coastPath && (t.lineWidth = 1.25 / s, t.strokeStyle = "rgba(7, 7, 5, 0.95)", t.stroke(this.coastPath)), this.borderPath && (t.lineWidth = 1.55 / s, t.strokeStyle = "rgba(22, 16, 10, 0.93)", t.stroke(this.borderPath), t.lineWidth = 0.55 / s, t.strokeStyle = "rgba(238, 215, 168, 0.10)", t.stroke(this.borderPath));
    const n = [.../* @__PURE__ */ new Set([...this.detailCountryCodes, ...this.outlineCountryCodes])];
    if (n.length) {
      t.lineWidth = 1.8 / s, t.strokeStyle = "rgba(7, 7, 5, 0.96)";
      for (const r of n) {
        const a = this.countryPaths.get(r);
        a && t.stroke(a);
      }
    }
    t.restore();
  }
  drawOverlays(t) {
    if (!this.ready) return;
    const e = this.scale;
    if (t.save(), t.setTransform(this.dpr * e, 0, 0, this.dpr * e, this.dpr * this.tx, this.dpr * this.ty), t.lineJoin = "round", t.lineCap = "round", this.hoverCountry) {
      const i = this.countryPaths.get(this.hoverCountry);
      i && (t.lineWidth = 2.1 / e, t.strokeStyle = "rgba(239, 211, 154, 0.3)", t.stroke(i));
    }
    if (this.hoverDivision && !this.dragging) {
      const i = this.hoverDivision;
      i._path && (t.fillStyle = "rgba(255, 240, 204, 0.18)", t.fill(i._path), t.lineWidth = 1.15 / e, t.strokeStyle = "rgba(255, 238, 196, 0.68)", t.stroke(i._path));
    }
    if (this.selectedCountry) {
      const i = this.countryPaths.get(this.selectedCountry);
      i && (t.lineWidth = 8 / e, t.strokeStyle = "rgba(234, 203, 140, 0.15)", t.stroke(i), t.lineWidth = 1.8 / e, t.strokeStyle = "rgba(247, 226, 175, 0.92)", t.stroke(i));
    }
    t.restore();
  }
  drawLabels(t) {
    if (!this.ready || !this.data) return;
    const e = this.scale / this.fitScale;
    if (e < 1.32) return;
    const i = F(1.32, 2.05, e), s = Math.max(6, Math.round(this.viewW * this.viewH / 16e3)), o = Math.min(
      s,
      e < 1.9 ? 16 : e < 2.8 ? 34 : e < 4.5 ? 55 : 80
    ), n = [];
    let r = 0;
    const a = this.frame.getBoundingClientRect(), c = [];
    for (const l of [this.plate, this.toolbar, this.legend]) {
      if (!l || l.hidden) continue;
      const d = l.getBoundingClientRect();
      d.width < 1 || d.height < 1 || c.push({
        x: d.left - a.left - 8,
        y: d.top - a.top - 8,
        w: d.width + 16,
        h: d.height + 16
      });
    }
    t.setTransform(this.dpr, 0, 0, this.dpr, 0, 0), t.textAlign = "center", t.textBaseline = "middle", t.lineJoin = "round";
    for (const l of this.labelCountries) {
      if (r >= o) break;
      const d = l.bbox, f = d[0] * this.scale + this.tx, g = d[1] * this.scale + this.ty, S = d[2] * this.scale + this.tx, M = d[3] * this.scale + this.ty;
      if (S < -30 || f > this.viewW + 30 || M < -20 || g > this.viewH + 20) continue;
      const b = S - f, v = M - g;
      if (b < 26 || v < 11) continue;
      const x = l.label[0] * this.scale + this.tx, w = l.label[1] * this.scale + this.ty;
      if (x < 16 || x > this.viewW - 16 || w < 16 || w > this.viewH - 16) continue;
      const k = Math.min(15, 11 + e * 0.55), A = `600 ${k}px "Noto Serif SC", "Songti SC", "STSong", "SimSun", Georgia, serif`;
      t.font = A;
      const z = l.nameZh || l.name, P = t.measureText(z).width;
      if (P > Math.max(b * 1.45, 48) && e < 4.5 || e < 5 && z.length > 6 && b < 160) continue;
      const m = {
        x: x - P / 2 - 4,
        y: w - k * 0.75 - 3,
        w: P + 8,
        h: k * 1.5 + 6
      };
      m.x < 2 || m.x + m.w > this.viewW - 2 || m.y < 2 || m.y + m.h > this.viewH - 2 || c.some((u) => m.x < u.x + u.w && m.x + m.w > u.x && m.y < u.y + u.h && m.y + m.h > u.y) || n.some((u) => m.x < u.x + u.w && m.x + m.w > u.x && m.y < u.y + u.h && m.y + m.h > u.y) || (n.push(m), t.save(), t.globalAlpha = i * (e > 2.4 ? 0.92 : 0.74), "letterSpacing" in t && (t.letterSpacing = "1.4px"), t.strokeStyle = "rgba(3, 7, 9, 0.82)", t.lineWidth = 3.4, t.strokeText(z, x, w), t.fillStyle = "#f2e8d3", t.fillText(z, x, w), e > 2.9 && b > 84 && l.name && (t.globalAlpha = i * 0.45, t.font = '8px Georgia, "Times New Roman", serif', "letterSpacing" in t && (t.letterSpacing = "2.2px"), t.fillStyle = "#e4d6b9", t.fillText(l.name.toUpperCase(), x, w + k * 0.98)), t.restore(), r++);
    }
  }
  // ---------------------------------------------------------------------------
  // Picking / interaction
  // ---------------------------------------------------------------------------
  pick(t, e) {
    if (!this.grid || !this.data) return null;
    const { cols: i, rows: s, cell: o, cells: n } = this.grid;
    if (t < 0 || e < 0 || t > this.data.meta.width || e > this.data.meta.height) return null;
    const r = p(Math.floor(t / o), 0, i - 1), a = p(Math.floor(e / o), 0, s - 1), c = n[a * i + r];
    for (let l = c.length - 1; l >= 0; l--) {
      const d = c[l], f = d._bbox;
      if (!(!f || t < f[0] || t > f[2] || e < f[1] || e > f[3]) && this.pointInRings(d._rings, t, e))
        return d;
    }
    return null;
  }
  pointInRings(t, e, i) {
    let s = !1;
    for (const o of t)
      for (let n = 0, r = o.length - 1; n < o.length; r = n++) {
        const a = o[n][0], c = o[n][1], l = o[r][0], d = o[r][1];
        c > i != d > i && e < (l - a) * (i - c) / (d - c || 1e-9) + a && (s = !s);
      }
    return s;
  }
  canvasPoint(t, e) {
    const i = this.canvas.getBoundingClientRect();
    return { x: t - i.left, y: e - i.top };
  }
  worldPoint(t, e) {
    return {
      x: (t - this.tx) / this.scale,
      y: (e - this.ty) / this.scale
    };
  }
  onPointerDown(t) {
    if (!this.ready || !this.options.interactive || t.pointerType === "mouse" && t.button !== 0) return;
    this.scale <= this.fitScale * 1.001 && t.pointerType !== "mouse" || t.preventDefault(), this.canvas.focus({ preventScroll: !0 }), this.dismissHint(), this.hideTooltip();
    try {
      this.canvas.setPointerCapture(t.pointerId);
    } catch {
    }
    if (this.pointers.set(t.pointerId, { x: t.clientX, y: t.clientY }), this.pointers.size === 1)
      this.drag = {
        x: t.clientX,
        y: t.clientY,
        tx: this.tx,
        ty: this.ty,
        moved: !1,
        time: performance.now()
      }, this.pinch = null, this.setDragging(!1);
    else if (this.pointers.size === 2) {
      const [i, s] = [...this.pointers.values()];
      this.drag = null, this.pinch = {
        distance: Math.hypot(i.x - s.x, i.y - s.y) || 1,
        scale: this.scale,
        tx: this.tx,
        ty: this.ty,
        midX: (i.x + s.x) / 2,
        midY: (i.y + s.y) / 2
      }, this.setDragging(!0);
    }
  }
  onPointerMove(t) {
    if (!this.pointers.has(t.pointerId)) {
      this.ready && !this.dragging && t.pointerType !== "touch" && this.updateHover(t);
      return;
    }
    if (this.pointers.set(t.pointerId, { x: t.clientX, y: t.clientY }), this.pointers.size === 2 && this.pinch) {
      const [e, i] = [...this.pointers.values()], s = Math.hypot(e.x - i.x, e.y - i.y) || 1, o = (e.x + i.x) / 2, n = (e.y + i.y) / 2, r = p(
        this.pinch.scale * (s / this.pinch.distance),
        this.fitScale * 1,
        this.fitScale * 32
      ), a = this.canvas.getBoundingClientRect(), c = this.pinch.midX - a.left, l = this.pinch.midY - a.top, d = (c - this.pinch.tx) / this.pinch.scale, f = (l - this.pinch.ty) / this.pinch.scale;
      this.scale = r, this.tx = o - a.left - d * r, this.ty = n - a.top - f * r, this.clampTransform(), this.updateToolbar(), this.invalidateFast(), this.scheduleQuality(220);
      return;
    }
    if (this.drag && this.pointers.size === 1) {
      const e = t.clientX - this.drag.x, i = t.clientY - this.drag.y;
      Math.abs(e) + Math.abs(i) > 3 && (this.drag.moved = !0), this.tx = this.drag.tx + e, this.ty = this.drag.ty + i, this.clampTransform(), this.setDragging(!0), this.invalidateFast(), this.scheduleQuality(220);
    }
  }
  onPointerUp(t, e = !1) {
    if (!this.pointers.has(t.pointerId)) return;
    this.pointers.delete(t.pointerId);
    try {
      this.canvas.hasPointerCapture(t.pointerId) && this.canvas.releasePointerCapture(t.pointerId);
    } catch {
    }
    const i = !!this.pinch;
    if (this.pointers.size === 0) {
      const s = this.drag;
      this.drag = null, this.pinch = null, this.setDragging(!1), this.scheduleQuality(90), !e && !i && s && !s.moved && performance.now() - s.time < 650 && this.onClick(t);
      return;
    }
    if (this.pointers.size === 1) {
      const [s] = [...this.pointers.values()];
      this.pinch = null, this.drag = {
        x: s.x,
        y: s.y,
        tx: this.tx,
        ty: this.ty,
        moved: !0,
        time: performance.now()
      }, this.setDragging(!0);
    }
  }
  onPointerLeave() {
    this.pointers.size || this.hideTooltip();
  }
  setDragging(t) {
    this.dragging = t, this.frame.dataset.dragging = t ? "true" : "false", t && this.hideTooltip();
  }
  onClick(t) {
    const e = this.canvasPoint(t.clientX, t.clientY), i = this.worldPoint(e.x, e.y), s = this.pick(i.x, i.y);
    s ? typeof this.options.onDivisionClick == "function" ? this.options.onDivisionClick(s, this) : this.selectCountry(s.country) : this.clearSelection();
  }
  onWheel(t) {
    if (!this.ready || !this.options.interactive) return;
    this.dismissHint();
    let e = t.deltaY;
    if (t.deltaMode === 1 ? e *= 16 : t.deltaMode === 2 && (e *= this.viewH), this.scale <= this.fitScale * 1.001 && e > 0) return;
    t.preventDefault();
    const i = this.canvasPoint(t.clientX, t.clientY), s = Math.exp(-e * 15e-4);
    this.zoomAt(this.scale * s, i.x, i.y), this.updateHover(t);
  }
  onDoubleClick(t) {
    if (!this.ready || !this.options.interactive) return;
    t.preventDefault();
    const e = this.canvasPoint(t.clientX, t.clientY);
    this.scale <= this.fitScale * 1.05 ? this.zoomAt(this.fitScale * 2.7, e.x, e.y) : this.resetView();
  }
  onKeyDown(t) {
    if (!this.ready || !this.options.interactive) return;
    const e = 64;
    switch (t.key) {
      case "+":
      case "=":
        t.preventDefault(), this.zoomAt(this.scale * 1.3, this.viewW / 2, this.viewH / 2);
        break;
      case "-":
      case "_":
        t.preventDefault(), this.zoomAt(this.scale / 1.3, this.viewW / 2, this.viewH / 2);
        break;
      case "0":
      case "Home":
        t.preventDefault(), this.resetView();
        break;
      case "ArrowLeft":
        t.preventDefault(), this.tx += e, this.clampTransform(), this.invalidateFast(), this.scheduleQuality(140);
        break;
      case "ArrowRight":
        t.preventDefault(), this.tx -= e, this.clampTransform(), this.invalidateFast(), this.scheduleQuality(140);
        break;
      case "ArrowUp":
        t.preventDefault(), this.ty += e, this.clampTransform(), this.invalidateFast(), this.scheduleQuality(140);
        break;
      case "ArrowDown":
        t.preventDefault(), this.ty -= e, this.clampTransform(), this.invalidateFast(), this.scheduleQuality(140);
        break;
      case "Escape":
        this.clearSelection(), this.hideTooltip();
        break;
    }
  }
  onToolbarClick(t) {
    const e = t.target.closest("[data-action]");
    if (!e || !this.ready) return;
    t.preventDefault();
    const i = e.dataset.action;
    i === "zoom-in" ? this.zoomAt(this.scale * 1.35, this.viewW / 2, this.viewH / 2) : i === "zoom-out" ? this.zoomAt(this.scale / 1.35, this.viewW / 2, this.viewH / 2) : i === "reset" ? this.resetView() : i === "fullscreen" && this.toggleFullscreen();
  }
  toggleFullscreen() {
    document.fullscreenEnabled && (document.fullscreenElement === this.frame ? document.exitFullscreen?.().catch(() => {
    }) : this.frame.requestFullscreen?.().catch(() => {
    }));
  }
  onFullscreenChange() {
    window.setTimeout(() => this.resize(), 80);
  }
  updateHover(t) {
    if (!this.ready || this.dragging) return;
    const e = this.canvasPoint(t.clientX, t.clientY);
    if (e.x < 0 || e.y < 0 || e.x > this.viewW || e.y > this.viewH) {
      this.hideTooltip();
      return;
    }
    const i = this.worldPoint(e.x, e.y), s = this.pick(i.x, i.y);
    if (!s) {
      this.hideTooltip();
      return;
    }
    this.hoverDivision !== s && (this.hoverDivision = s, this.hoverCountry = s.country, this.invalidate()), this.showTooltip(s, e.x, e.y);
  }
  showTooltip(t, e, i) {
    const s = this.countryByCode.get(t.country);
    if (!s) return;
    this.tooltip.hidden = !1, this.tooltipCountry.textContent = `${s.code} · ${s.nameZh}`, this.tooltipName.textContent = t.nameZh || t.name, this.tooltipSub.textContent = `一级行政区 · ${s.name}`, this.tooltip.style.setProperty(
      "--hm-tt-color",
      this.options.showProvinceShading ? t.color : s.color
    ), this.tooltip.classList.add("is-visible");
    const o = this.tooltip.offsetWidth, n = this.tooltip.offsetHeight;
    let r = e + 16, a = i + 16;
    r + o > this.viewW - 8 && (r = e - o - 14), a + n > this.viewH - 8 && (a = i - n - 14), r = p(r, 8, Math.max(8, this.viewW - o - 8)), a = p(a, 8, Math.max(8, this.viewH - n - 8)), this.tooltip.style.left = `${r}px`, this.tooltip.style.top = `${a}px`;
  }
  hideTooltip() {
    this.tooltip.classList.remove("is-visible"), (this.hoverDivision || this.hoverCountry) && (this.hoverDivision = null, this.hoverCountry = null, this.invalidate());
  }
  selectCountry(t) {
    const e = this.countryByCode.get(t);
    e && (this.selectedCountry = t, this.frame.dataset.selected = "true", this.card.hidden = !1, this.cardSwatch.style.background = e.color, this.cardName.textContent = e.nameZh, this.cardEn.textContent = e.name, this.cardCode.textContent = e.code, this.cardCount.textContent = String(e.divisions.length), this.live.textContent = `已选择 ${e.nameZh}，${e.divisions.length} 个一级行政区`, this.invalidate());
  }
  clearSelection() {
    if (!this.selectedCountry) {
      this.card.hidden = !0, this.frame.dataset.selected = "false";
      return;
    }
    this.selectedCountry = null, this.card.hidden = !0, this.frame.dataset.selected = "false", this.live.textContent = "已取消选择", this.invalidate();
  }
  dismissHint() {
    this.hintEl && this.hintEl.classList.add("is-hidden"), this.hintTimer && (clearTimeout(this.hintTimer), this.hintTimer = 0);
  }
  // ---------------------------------------------------------------------------
  // Teardown
  // ---------------------------------------------------------------------------
  destroy() {
    if (this.destroyed) return;
    this.destroyed = !0, this.fastRaf && cancelAnimationFrame(this.fastRaf), this.qualityRaf && cancelAnimationFrame(this.qualityRaf), this.fastRaf = 0, this.qualityRaf = 0, this.settleTimer && clearTimeout(this.settleTimer), this.hintTimer && clearTimeout(this.hintTimer), this.resizeObserver && this.resizeObserver.disconnect(), this.windowResize && window.removeEventListener("resize", this.windowResize), document.removeEventListener("fullscreenchange", this.bound.fullscreenChange);
    const t = this.canvas;
    t && (t.removeEventListener("pointerdown", this.bound.pointerDown), t.removeEventListener("pointermove", this.bound.pointerMove), t.removeEventListener("pointerup", this.bound.pointerUp), t.removeEventListener("pointercancel", this.bound.pointerCancel), t.removeEventListener("pointerleave", this.bound.pointerLeave), t.removeEventListener("wheel", this.bound.wheel), t.removeEventListener("dblclick", this.bound.doubleClick), t.removeEventListener("keydown", this.bound.keyDown)), this.toolbar?.removeEventListener("click", this.bound.toolbarClick), this.root?.querySelector(".hm-card-close")?.removeEventListener("click", this.bound.cardClose), this.root?.querySelector(".hm-retry")?.removeEventListener("click", this.bound.retry), this.pointers.clear(), document.fullscreenElement === this.frame && document.exitFullscreen?.().catch(() => {
    }), this.host.__hoi4Map === this && delete this.host.__hoi4Map, this.data && (this.data = null);
  }
}
function y(h, t = !0) {
  return h == null ? t : h !== "false" && h !== "0";
}
class _ extends HTMLElement {
  static get observedAttributes() {
    return ["src", "height", "width", "title", "subtitle", "focus", "zoom", "fit", "show-title", "show-compass", "show-graticule", "show-province-shading"];
  }
  constructor() {
    super(), this._map = null, this._upgrading = !1;
  }
  connectedCallback() {
    if (this._map) return;
    this.style.display = this.style.display || "block";
    const t = this.getAttribute("src") || H, e = Number(this.getAttribute("zoom"));
    this._map = new N(this, {
      src: t,
      height: this.getAttribute("height") || "520px",
      width: this.getAttribute("width") || "100%",
      title: this.getAttribute("title") || "",
      subtitle: this.getAttribute("subtitle") || "",
      focus: (this.getAttribute("focus") || "").toUpperCase(),
      zoom: Number.isFinite(e) ? e : 0,
      fit: this.getAttribute("fit") === "cover" ? "cover" : "contain",
      showTitle: y(this.getAttribute("show-title")),
      showCompass: y(this.getAttribute("show-compass")),
      showGraticule: y(this.getAttribute("show-graticule"), !1),
      showProvinceShading: y(this.getAttribute("show-province-shading"), !1)
    });
  }
  disconnectedCallback() {
    this._map?.destroy(), this._map = null;
  }
  attributeChangedCallback(t, e, i) {
    if (!this._map || e === i) return;
    const s = this._map;
    if (t === "src") {
      s.destroy(), this._map = null, this.connectedCallback();
      return;
    }
    if (t === "height") {
      s.setHeight(i || "520px");
      return;
    }
    if (t === "width") {
      this.style.width = i && /^\d+(\.\d+)?$/.test(i) ? `${i}%` : i || "100%", s.resize();
      return;
    }
    if (t === "title") {
      s.options.title = i || "", s.plate.hidden = !s.options.showTitle || i === "none", s.updateChrome();
      return;
    }
    if (t === "subtitle") {
      s.options.subtitle = i || "", s.updateChrome();
      return;
    }
    if (t === "focus" || t === "zoom") {
      const o = Number(this.getAttribute("zoom"));
      s.setView({
        focus: (this.getAttribute("focus") || "").toUpperCase(),
        zoom: Number.isFinite(o) ? o : 0
      });
      return;
    }
    if (t === "fit") {
      s.options.fit = i === "cover" ? "cover" : "contain", s.resize();
      return;
    }
    if (t === "show-title") {
      s.options.showTitle = y(i), s.plate.hidden = !s.options.showTitle || s.options.title === "none";
      return;
    }
    if (t === "show-compass") {
      s.options.showCompass = y(i);
      const o = s.root.querySelector(".hm-compass");
      o && (o.hidden = !s.options.showCompass);
      return;
    }
    if (t === "show-graticule") {
      s.options.showGraticule = y(i, !1), s.invalidateQuality();
      return;
    }
    t === "show-province-shading" && (s.options.showProvinceShading = y(i, !1), s.setData(s.data));
  }
}
function I(h = "hoi4-map") {
  return typeof customElements > "u" ? !1 : (customElements.get(h) || customElements.define(h, _), !0);
}
I();
export {
  N as Hoi4Map,
  _ as Hoi4MapElement,
  I as defineHoi4Map
};
