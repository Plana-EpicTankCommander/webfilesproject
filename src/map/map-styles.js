/**
 * Shadow-DOM styles for the map plugin. Kept as a string so the engine has no
 * external stylesheet and can be dropped into any page unchanged.
 */
export const MAP_CSS = `
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
`
