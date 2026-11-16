var Dt=Object.defineProperty;var _t=(r,t,e)=>t in r?Dt(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var b=(r,t,e)=>_t(r,typeof t!="symbol"?t+"":t,e);import{j as qt}from"./contentSource-CZNwcQrN.js";import{_ as Wt,K as It,P as Bt,w as F,q as Ft,v as Nt,H as Gt,f as Ot,r as Qt}from"./_plugin-vue_export-helper-BDygPn7S.js";const Zt=`
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
`,Ct="https://raw.githubusercontent.com/Plana-EpicTankCommander/sth_ineed/main/maps/world-map.json",A=32,D=1,dt=56,V={src:Ct,height:"520px",width:"100%",fit:"contain",title:"",subtitle:"",kicker:"ATLAS · 01",focus:"",zoom:0,showTitle:!0,showCompass:!0,showGraticule:!1,showLegend:!1,showDivisionBorders:!1,showProvinceShading:!1,detailCountries:null,outlineCountries:null,onDivisionClick:null,data:null,interactive:!0},N=new Map;function Xt(r={}){return{...V,...r}}function ft(r){if(typeof r=="number"&&Number.isFinite(r))return`${Math.max(220,r)}px`;if(typeof r=="string"&&r.trim()){const t=r.trim();return/^\d+(\.\d+)?$/.test(t)?`${Math.max(220,Number(t))}px`:t}return V.height}function gt(r){if(typeof r=="number"&&Number.isFinite(r))return r;if(typeof r=="string"){const t=r.trim().match(/^(\d+(?:\.\d+)?)(px)?$/);if(t)return Number(t[1])}return null}function Yt(r){if(typeof r=="number"&&Number.isFinite(r))return`${Math.min(100,Math.max(20,r))}%`;if(typeof r=="string"&&r.trim()){const t=r.trim();return/^\d+(\.\d+)?$/.test(t)?`${Math.min(100,Math.max(20,Number(t)))}%`:t}return V.width}function k(r,t,e){return Math.min(e,Math.max(t,r))}function Ut(r,t,e){const i=k((e-r)/(t-r),0,1);return i*i*(3-2*i)}function mt(r){let t=0,e=0;const i=[];for(let s=0;s+1<r.length;s+=2)t+=r[s],e+=r[s+1],i.push([t,e]);return i}async function jt(r,t){if(N.has(r)){const i=N.get(r);return i instanceof Promise,i}const e=(async()=>{const i=await fetch(r,{cache:"no-cache"});if(!i.ok)throw new Error(`地图数据请求失败：HTTP ${i.status}`);const s=Number(i.headers.get("content-length"))||0;if(!i.body||!s){const u=await i.json();return t==null||t(1),u}const n=i.body.getReader(),l=[];let o=0;for(;;){const{done:u,value:p}=await n.read();if(u)break;l.push(p),o+=p.length,t==null||t(k(o/s,0,1))}t==null||t(1);const a=new Uint8Array(o);let c=0;for(const u of l)a.set(u,c),c+=u.length;const h=new TextDecoder("utf-8").decode(a);return JSON.parse(h)})();N.set(r,e);try{const i=await e;return N.set(r,i),i}catch(i){throw N.delete(r),i}}class Vt{constructor(t,e={}){if(!t)throw new Error("Hoi4Map 需要一个容器元素");this.host=t,this.options=Xt(e),this.src=this.options.src||Ct,this.explicitHeightPx=gt(this.options.height),this.destroyed=!1,this.ready=!1,this.data=null,this.pendingReveal=!1,this.viewW=1,this.viewH=1,this.dpr=1,this.fitScale=1,this.scale=1,this.tx=0,this.ty=0,this.snapMargin=0,this.pointers=new Map,this.drag=null,this.pinch=null,this.dragging=!1,this.hoverDivision=null,this.hoverCountry=null,this.selectedCountry=null,this.fastRaf=0,this.qualityRaf=0,this.settleTimer=0,this.hintTimer=0,this.arcs=[],this.fillGroups=new Map,this.countryPathCache=new Map,this.grid=null,this.labelCountries=[],this.bound={pointerDown:i=>this.onPointerDown(i),pointerMove:i=>this.onPointerMove(i),pointerUp:i=>this.onPointerUp(i),pointerCancel:i=>this.onPointerUp(i,!0),pointerLeave:()=>this.onPointerLeave(),wheel:i=>this.onWheel(i),doubleClick:i=>this.onDoubleClick(i),keyDown:i=>this.onKeyDown(i),toolbarClick:i=>this.onToolbarClick(i),cardClose:()=>this.clearSelection(),retry:()=>this.load(),fullscreenChange:()=>this.onFullscreenChange()},this.setupDom(),this.host.__hoi4Map=this,this.bindEvents(),this.observeResize(),this.makeGrain(),this.resize(),this.options.data?this.useData(this.options.data):this.load()}useData(t){this.data=t,this.ready=!0,this.prepare(t),this.frame.dataset.busy="false",this.loading.hidden=!0,this.pendingReveal=!1,this.fitScale=this.computeFitScale(),this.resize(),this.applyInitialView(),this.updateChrome(),this.updateToolbar(),this.invalidateQuality()}setData(t){var n,l,o,a;if(this.destroyed||!t)return;const e=(l=(n=this.data)==null?void 0:n.meta)==null?void 0:l.width,i=(a=(o=this.data)==null?void 0:o.meta)==null?void 0:a.height;this.hideTooltip(),this.clearSelection(),this.ready=!0,this.prepare(t),this.fitScale=this.computeFitScale(),(e!==t.meta.width||i!==t.meta.height)&&(this.scale=this.fitScale,this.tx=(this.viewW-t.meta.width*this.scale)/2,this.ty=(this.viewH-t.meta.height*this.scale)/2),this.clampTransform(),this.updateChrome(),this.updateToolbar(),this.snapshot=null,this.invalidateQuality()}setupDom(){this.host.style.display=this.host.style.display||"block",this.host.style.width=Yt(this.options.width),this.root=this.host.shadowRoot||this.host.attachShadow({mode:"open"}),this.root.innerHTML=`
      <style>${Zt}</style>
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
    `,this.frame=this.root.querySelector(".hm-frame"),this.canvas=this.root.querySelector(".hm-canvas"),this.ctx=this.canvas.getContext("2d"),this.plate=this.root.querySelector(".hm-plate"),this.plateKicker=this.root.querySelector(".hm-plate-kicker"),this.titleEl=this.root.querySelector(".hm-title"),this.subtitleEl=this.root.querySelector(".hm-subtitle"),this.zoomLabel=this.root.querySelector(".hm-zoom"),this.toolbar=this.root.querySelector(".hm-toolbar"),this.hintEl=this.root.querySelector(".hm-hint"),this.legend=this.root.querySelector(".hm-legend"),this.legendCountries=this.root.querySelector(".hm-legend-countries"),this.legendDivisions=this.root.querySelector(".hm-legend-divisions"),this.tooltip=this.root.querySelector(".hm-tooltip"),this.tooltipCountry=this.root.querySelector(".hm-tt-country"),this.tooltipName=this.root.querySelector(".hm-tt-name"),this.tooltipSub=this.root.querySelector(".hm-tt-sub"),this.card=this.root.querySelector(".hm-card"),this.cardSwatch=this.root.querySelector(".hm-swatch"),this.cardName=this.root.querySelector(".hm-card-name"),this.cardEn=this.root.querySelector(".hm-card-en"),this.cardCode=this.root.querySelector(".hm-card-code"),this.cardCount=this.root.querySelector(".hm-card-count"),this.loading=this.root.querySelector(".hm-loading"),this.progressBar=this.root.querySelector(".hm-progress i"),this.loadingPercent=this.root.querySelector(".hm-loading small"),this.errorBox=this.root.querySelector(".hm-error"),this.errorText=this.root.querySelector(".hm-error-text"),this.live=this.root.querySelector(".hm-live"),this.frame.style.setProperty("--hm-height",ft(this.options.height)),this.plateKicker.textContent=this.options.kicker||V.kicker,this.titleEl.textContent=this.options.title||"世界政治地图",this.subtitleEl.textContent=this.options.subtitle||"WORLD POLITICAL MAP",this.plate.hidden=!this.options.showTitle||this.options.title==="none",this.root.querySelector(".hm-compass").hidden=!this.options.showCompass,this.legend.hidden=!this.options.showLegend,document.fullscreenEnabled||(this.root.querySelector(".hm-full").hidden=!0),this.options.interactive||(this.toolbar.hidden=!0,this.hintEl.hidden=!0),this.hintTimer=window.setTimeout(()=>this.dismissHint(),6e3)}bindEvents(){const t=this.canvas;t.addEventListener("pointerdown",this.bound.pointerDown),t.addEventListener("pointermove",this.bound.pointerMove),t.addEventListener("pointerup",this.bound.pointerUp),t.addEventListener("pointercancel",this.bound.pointerCancel),t.addEventListener("pointerleave",this.bound.pointerLeave),t.addEventListener("wheel",this.bound.wheel,{passive:!1}),t.addEventListener("dblclick",this.bound.doubleClick),t.addEventListener("keydown",this.bound.keyDown),this.toolbar.addEventListener("click",this.bound.toolbarClick),this.root.querySelector(".hm-card-close").addEventListener("click",this.bound.cardClose),this.root.querySelector(".hm-retry").addEventListener("click",this.bound.retry),document.addEventListener("fullscreenchange",this.bound.fullscreenChange)}observeResize(){if(typeof ResizeObserver>"u"){this.windowResize=()=>this.resize(),window.addEventListener("resize",this.windowResize);return}this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(this.frame)}makeGrain(){const e=document.createElement("canvas");e.width=180,e.height=180;const i=e.getContext("2d"),s=i.createImageData(180,180);for(let n=0;n<s.data.length;n+=4){const l=118+Math.floor(Math.random()*118);s.data[n]=l,s.data[n+1]=l,s.data[n+2]=l,s.data[n+3]=Math.floor(Math.random()*24)}i.putImageData(s,0,0),this.frame.style.setProperty("--hm-grain",`url(${e.toDataURL("image/png")})`)}async load(){if(!this.destroyed){this.ready=!1,this.frame.dataset.busy="true",this.loading.hidden=!1,this.loading.classList.remove("is-done"),this.errorBox.hidden=!0,this.progressBar.style.width="0%",this.loadingPercent.textContent="0%";try{const t=await jt(this.src,e=>{if(this.destroyed)return;const i=Math.round(e*100);this.progressBar.style.width=`${i}%`,this.loadingPercent.textContent=`${i}%`});if(this.destroyed)return;this.prepare(t),this.ready=!0,this.frame.dataset.busy="false",this.resize(),this.applyInitialView(),this.updateChrome(),this.updateToolbar(),this.dismissHint(),this.pendingReveal=!0,this.invalidateQuality()}catch(t){if(this.destroyed)return;this.frame.dataset.busy="false",this.loading.hidden=!0,this.errorBox.hidden=!1,this.errorText.textContent=(t==null?void 0:t.message)||"地图加载失败",console.error("[hoi4-map]",t)}}}prepare(t){var l;if(!t||!Array.isArray(t.arcs)||!Array.isArray(t.divisions))throw new Error("地图 JSON 格式不正确");this.data=t,this.arcs=t.arcs.map(mt),this.fillGroups.clear(),this.countryPathCache.clear(),this.hoverDivision=null,this.hoverCountry=null,this.selectedCountry=null,this.countryByCode=new Map(t.countries.map(o=>[o.code,o]));const e=new Map,i={cols:dt,rows:1,cell:t.meta.width/dt,cells:[]};i.rows=Math.ceil(t.meta.height/i.cell),i.cells=Array.from({length:i.cols*i.rows},()=>[]);for(const o of t.divisions){const a=this.ringsForDivision(o);if(!a.length)continue;const c=this.pathFromRings(a),h=this.boundsOfRings(a);o._rings=a,o._path=c,o._bbox=h;const u=this.options.showProvinceShading?o.color:((l=this.countryByCode.get(o.country))==null?void 0:l.color)||o.color;let p=this.fillGroups.get(u);p||(p=new Path2D,this.fillGroups.set(u,p)),p.addPath(c);const g=k(Math.floor((h[0]-t.meta.width*0)/i.cell),0,i.cols-1),d=k(Math.floor(h[2]/i.cell),0,i.cols-1),w=k(Math.floor(h[1]/i.cell),0,i.rows-1),f=k(Math.floor(h[3]/i.cell),0,i.rows-1);for(let $=w;$<=f;$++)for(let S=g;S<=d;S++)i.cells[$*i.cols+S].push(o);e.set(o.id,o)}this.grid=i,this.byDivision=e,this.labelCountries=[...t.countries].sort((o,a)=>a.area-o.area),this.coastPath=this.pathFromArcList(t.coast||[]),this.borderPath=this.pathFromArcList(t.borders||[]),this.graticulePath=this.pathFromGraticule(t.graticule||[]),this.divisionBorderPath=null,this.detailBorderPath=null,this.detailCountryCodes=[];const s=new Set([...t.coast||[],...t.borders||[]]),n=new Set(this.options.detailCountries||t.meta.detailCountries||[]);if(this.detailCountryCodes=[...n],this.outlineCountryCodes=[...new Set(this.options.outlineCountries||t.meta.outlineCountries||[])],this.options.showDivisionBorders){const o=new Set;for(const a of t.divisions)for(const c of a.polygons||[])for(const h of c)for(const u of h){const p=u<0?~u:u;s.has(p)||o.add(p)}this.divisionBorderPath=this.pathFromArcList([...o])}else if(n.size){const o=new Set;for(const a of t.divisions)if(n.has(a.country))for(const c of a.polygons||[])for(const h of c)for(const u of h){const p=u<0?~u:u;s.has(p)||o.add(p)}o.size&&(this.detailBorderPath=this.pathFromArcList([...o]))}this.countryPaths=new Map;for(const o of t.countries){const a=this.pathFromArcList(o.arcs||[]);this.countryPaths.set(o.code,a),o._labelCenter=this.computeCountryCenter(o)}}computeCountryCenter(t){var c,h;const e=t.bbox||t.label;if(!e||e.length<4)return t.label||[0,0];const i=[];for(const u of t.divisions||[]){const p=(c=this.byDivision)==null?void 0:c.get(u);(h=p==null?void 0:p._rings)!=null&&h.length&&p._bbox&&i.push(p)}const s=(e[0]+e[2])/2,n=(e[1]+e[3])/2;if(this.countryContainsPoint(i,s,n))return[s,n];let l=0,o=0,a=0;for(const u of i){const p=u._bbox,g=Math.max(0,(p[2]-p[0])*(p[3]-p[1]));g&&(l+=g,o+=(p[0]+p[2])/2*g,a+=(p[1]+p[3])/2*g)}if(l>0){const u=o/l,p=a/l;if(this.countryContainsPoint(i,u,p))return[u,p]}return t.label||[s,n]}countryContainsPoint(t,e,i){for(const s of t)if(this.pointInRings(s._rings,e,i))return!0;return!1}ringsForDivision(t){const e=[];for(const i of t.polygons||[])for(const s of i){const n=[];for(const l of s){const o=l<0?~l:l,a=this.arcs[o];if(!(!a||a.length===0))if(l<0)for(let c=a.length-1;c>=0;c--)this.pushPoint(n,a[c]);else for(let c=0;c<a.length;c++)this.pushPoint(n,a[c])}if(n.length>1){const l=n[0],o=n[n.length-1];l[0]===o[0]&&l[1]===o[1]&&n.pop()}n.length>=3&&e.push(n)}return e}pushPoint(t,e){const i=t[t.length-1];i&&i[0]===e[0]&&i[1]===e[1]||t.push(e)}pathFromRings(t){const e=new Path2D;for(const i of t){e.moveTo(i[0][0],i[0][1]);for(let s=1;s<i.length;s++)e.lineTo(i[s][0],i[s][1]);e.closePath()}return e}pathFromArcList(t){const e=new Path2D;for(const i of t){const s=this.arcs[i];if(!(!s||s.length<2)){e.moveTo(s[0][0],s[0][1]);for(let n=1;n<s.length;n++)e.lineTo(s[n][0],s[n][1])}}return e}pathFromGraticule(t){const e=new Path2D;for(const i of t){const s=mt(i);if(!(s.length<2)){e.moveTo(s[0][0],s[0][1]);for(let n=1;n<s.length;n++)e.lineTo(s[n][0],s[n][1])}}return e}boundsOfRings(t){let e=1/0,i=1/0,s=-1/0,n=-1/0;for(const l of t)for(const[o,a]of l)o<e&&(e=o),a<i&&(i=a),o>s&&(s=o),a>n&&(n=a);return[e,i,s,n]}resize(){if(this.destroyed)return;const t=this.frame.getBoundingClientRect();if(t.width<2||t.height<2)return;if(this.ready&&this.data&&this.explicitHeightPx&&document.fullscreenElement!==this.frame){const h=this.data.meta.width/this.data.meta.height,u=t.width<760?Math.round(Math.max(280,Math.min(this.explicitHeightPx,t.width/h+128))):Math.round(this.explicitHeightPx);if(Math.abs(t.height-u)>2){this.frame.style.setProperty("--hm-height",`${u}px`);return}}const e=this.fitScale,i=this.scale,s=this.viewW,n=this.viewH,l=e?(s/2-this.tx)/i:0,o=e?(n/2-this.ty)/i:0;this.viewW=Math.max(2,this.frame.clientWidth),this.viewH=Math.max(2,this.frame.clientHeight),this.dpr=k(window.devicePixelRatio||1,1,2),this.canvas.width=Math.max(1,Math.round(this.viewW*this.dpr)),this.canvas.height=Math.max(1,Math.round(this.viewH*this.dpr)),this.ctx=this.canvas.getContext("2d"),this.snapMargin=Math.round(Math.min(this.viewW,this.viewH)*.32);const a=Math.round((this.viewW+this.snapMargin*2)*this.dpr),c=Math.round((this.viewH+this.snapMargin*2)*this.dpr);if(this.mapCanvas||(this.mapCanvas=document.createElement("canvas")),this.mapCanvas.width=Math.max(1,a),this.mapCanvas.height=Math.max(1,c),this.mapCtx=this.mapCanvas.getContext("2d"),this.snapshot=null,this.buildOcean(),this.ready&&this.data){if(this.fitScale=this.computeFitScale(),e>0&&i>0){const h=i/e;this.scale=k(this.fitScale*h,this.fitScale*D,this.fitScale*A),this.tx=this.viewW/2-l*this.scale,this.ty=this.viewH/2-o*this.scale}else this.scale=this.fitScale,this.tx=(this.viewW-this.data.meta.width*this.scale)/2,this.ty=(this.viewH-this.data.meta.height*this.scale)/2;this.clampTransform(),this.updateToolbar(),this.invalidateQuality()}else this.renderEmpty()}setHeight(t){this.options.height=t,this.explicitHeightPx=gt(t),this.frame.style.setProperty("--hm-height",ft(t)),this.resize()}contentBounds(){if(!this.data)return[0,0,1,1];const t=[0,0,this.data.meta.width,this.data.meta.height];let e=1/0,i=1/0,s=-1/0,n=-1/0;for(const l of this.data.countries||[]){const o=l.bbox;!o||o.length<4||o[2]>o[0]&&o[3]>o[1]&&(e=Math.min(e,o[0]),i=Math.min(i,o[1]),s=Math.max(s,o[2]),n=Math.max(n,o[3]))}return Number.isFinite(e)?[e,i,s,n]:t}computeFitScale(){if(!this.data)return 1;const t=this.contentBounds(),e=Math.max(1,t[2]-t[0]),i=Math.max(1,t[3]-t[1]);return(this.options.fit==="cover"?Math.max(this.viewW/e,this.viewH/i):Math.min(this.viewW/e,this.viewH/i))*(this.options.fit==="cover"?1.01:.965)}fitContent(t=!0){this.ready&&(this.fitScale=this.computeFitScale(),this.resetView(t))}applyInitialView(){if(!this.ready)return;this.fitScale=this.computeFitScale();const t=Number(this.options.zoom)||0,e=this.options.focus;if(e)this.focusOn(e,t||2.6);else if(t>D){this.scale=k(this.fitScale*t,this.fitScale*D,this.fitScale*A);const i=this.contentBounds();this.tx=this.viewW/2-(i[0]+i[2])/2*this.scale,this.ty=this.viewH/2-(i[1]+i[3])/2*this.scale,this.clampTransform()}else this.resetView(!1);this.updateToolbar()}resetView(t=!0){if(!this.ready)return;this.scale=this.fitScale;const e=this.contentBounds();this.tx=this.viewW/2-(e[0]+e[2])/2*this.scale,this.ty=this.viewH/2-(e[1]+e[3])/2*this.scale,this.updateToolbar(),this.invalidateFast(),this.scheduleQuality(100),t&&this.dismissHint()}focusOn(t,e=2.6){if(!this.ready)return!1;let i=this.countryByCode.get(t);if(!i){const d=this.byDivision.get(t);d&&(i=this.countryByCode.get(d.country))}if(!i)return this.resetView(!1),!1;const[s,n,l,o]=i.bbox,a=i._labelCenter||i.label,c=Number.isFinite(a==null?void 0:a[0])?a[0]:(s+l)/2,h=Number.isFinite(a==null?void 0:a[1])?a[1]:(n+o)/2,u=Math.max(l-s,o-n);let p=Math.max(1.2,Math.min(A,e));if(u>0&&u<220){const d=Math.min(this.viewW,this.viewH)*.5/(u*this.fitScale);p=Math.max(p,k(d,2.6,A))}const g=k(this.fitScale*p,this.fitScale*D,this.fitScale*A);return this.scale=g,this.tx=this.viewW/2-c*g,this.ty=this.viewH/2-h*g,this.clampTransform(),this.updateToolbar(),this.invalidateFast(),this.scheduleQuality(100),!0}setView({focus:t="",zoom:e=0}={}){return t?this.focusOn(t,Number(e)||2.6):Number(e)>1?(this.scale=k(this.fitScale*Number(e),this.fitScale*D,this.fitScale*A),this.tx=this.viewW/2-this.data.meta.width*this.scale/2,this.ty=this.viewH/2-this.data.meta.height*this.scale/2,this.clampTransform(),this.updateToolbar(),this.invalidateFast(),this.scheduleQuality(100),!0):(this.resetView(),!0)}clampTransform(){if(!this.data)return;const t=this.data.meta.width*this.scale,e=this.data.meta.height*this.scale;t<=this.viewW?this.tx=(this.viewW-t)/2:this.tx=k(this.tx,this.viewW-t,0),e<=this.viewH?this.ty=(this.viewH-e)/2:this.ty=k(this.ty,this.viewH-e,0)}zoomAt(t,e,i){if(!this.ready)return;const s=k(t,this.fitScale*D,this.fitScale*A);if(Math.abs(s-this.scale)<1e-9)return;const n=(e-this.tx)/this.scale,l=(i-this.ty)/this.scale;this.scale=s,this.tx=e-n*s,this.ty=i-l*s,this.clampTransform(),this.updateToolbar(),this.invalidateFast(),this.scheduleQuality(180),this.dismissHint()}updateToolbar(){if(!this.zoomLabel)return;const t=this.fitScale?Math.round(this.scale/this.fitScale*100):100;this.zoomLabel.textContent=`${t}%`,this.frame.dataset.zoomed=this.scale>this.fitScale*1.01?"true":"false",this.canvas&&(this.canvas.style.touchAction=this.scale>this.fitScale*1.01?"none":"pan-y");const e=this.root.querySelector('[data-action="zoom-out"]'),i=this.root.querySelector('[data-action="zoom-in"]');e&&(e.disabled=this.scale<=this.fitScale*1.001),i&&(i.disabled=this.scale>=this.fitScale*A*.999)}updateChrome(){if(!this.data)return;const t=this.data.meta;this.titleEl.textContent=this.options.title||t.title||"世界政治地图",this.subtitleEl.textContent=this.options.subtitle||t.titleEn||"WORLD POLITICAL MAP",this.legendCountries.textContent=`${t.countries} 国家`,this.legendDivisions.textContent=`${t.divisions.toLocaleString("zh-CN")} 一级行政区`,this.canvas.setAttribute("aria-label",`可缩放的世界政治地图，${t.countries} 个国家，${t.divisions} 个一级行政区`)}buildOcean(){const t=Math.max(1,Math.round(this.viewW*this.dpr)),e=Math.max(1,Math.round(this.viewH*this.dpr));this.oceanCanvas||(this.oceanCanvas=document.createElement("canvas")),(this.oceanCanvas.width!==t||this.oceanCanvas.height!==e)&&(this.oceanCanvas.width=t,this.oceanCanvas.height=e);const i=this.oceanCanvas.getContext("2d");i.setTransform(this.dpr,0,0,this.dpr,0,0),i.clearRect(0,0,this.viewW,this.viewH);const s=i.createLinearGradient(0,0,0,this.viewH);s.addColorStop(0,"#13242c"),s.addColorStop(.46,"#0d1a20"),s.addColorStop(1,"#071014"),i.fillStyle=s,i.fillRect(0,0,this.viewW,this.viewH);const n=i.createRadialGradient(this.viewW*.5,this.viewH*.38,0,this.viewW*.5,this.viewH*.42,Math.max(this.viewW,this.viewH)*.72);n.addColorStop(0,"rgba(65, 105, 118, 0.26)"),n.addColorStop(.48,"rgba(26, 50, 60, 0.12)"),n.addColorStop(1,"rgba(0, 0, 0, 0)"),i.fillStyle=n,i.fillRect(0,0,this.viewW,this.viewH);const l=Math.round(this.viewW*this.viewH/900);for(let o=0;o<l;o++){const a=Math.random()*this.viewW,c=Math.random()*this.viewH;i.fillStyle=`rgba(174, 204, 210, ${.012+Math.random()*.022})`,i.fillRect(a,c,1,1)}i.lineWidth=.7;for(let o=0;o<18;o++){const a=Math.random()*this.viewH,c=Math.random()*this.viewW,h=30+Math.random()*150;i.beginPath(),i.strokeStyle=`rgba(142, 178, 188, ${.012+Math.random()*.018})`,i.moveTo(c,a),i.bezierCurveTo(c+h*.3,a-5,c+h*.7,a+5,c+h,a),i.stroke()}}renderEmpty(){this.ctx&&(this.ctx.setTransform(this.dpr,0,0,this.dpr,0,0),this.ctx.clearRect(0,0,this.viewW,this.viewH),this.oceanCanvas&&this.ctx.drawImage(this.oceanCanvas,0,0,this.viewW,this.viewH))}invalidateFast(){this.destroyed||(this.qualityRaf&&(cancelAnimationFrame(this.qualityRaf),this.qualityRaf=0),!this.fastRaf&&(this.fastRaf=requestAnimationFrame(()=>{this.fastRaf=0,this.renderFast()})))}invalidateQuality(){this.destroyed||(this.fastRaf&&(cancelAnimationFrame(this.fastRaf),this.fastRaf=0),!this.qualityRaf&&(this.qualityRaf=requestAnimationFrame(()=>{this.qualityRaf=0,this.renderQuality()})))}invalidate(){this.invalidateFast()}scheduleQuality(t=180){this.destroyed||(this.settleTimer&&clearTimeout(this.settleTimer),this.settleTimer=window.setTimeout(()=>{if(this.settleTimer=0,this.pointers.size||this.dragging){this.scheduleQuality(120);return}this.invalidateQuality()},t))}drawOcean(t){t.setTransform(this.dpr,0,0,this.dpr,0,0),t.clearRect(0,0,this.viewW,this.viewH),this.oceanCanvas&&t.drawImage(this.oceanCanvas,0,0,this.viewW,this.viewH)}render(){this.renderQuality()}renderQuality(){if(this.destroyed||!this.ctx||(this.drawOcean(this.ctx),this.drawGraticule(this.ctx),!this.ready||!this.data||!this.mapCtx))return;const t=this.mapCtx,e=this.snapMargin;t.setTransform(this.dpr,0,0,this.dpr,0,0),t.clearRect(0,0,this.viewW+e*2,this.viewH+e*2),this.drawMap(t,this.tx+e,this.ty+e),this.snapshot={scale:this.scale,tx:this.tx+e,ty:this.ty+e,w:this.viewW+e*2,h:this.viewH+e*2},this.ctx.setTransform(this.dpr,0,0,this.dpr,0,0),this.ctx.drawImage(this.mapCanvas,e*this.dpr,e*this.dpr,this.viewW*this.dpr,this.viewH*this.dpr,0,0,this.viewW,this.viewH),this.drawLabels(this.ctx),this.drawOverlays(this.ctx),this.revealMap()}revealMap(){!this.pendingReveal||this.destroyed||(this.pendingReveal=!1,this.loading.classList.add("is-done"),window.setTimeout(()=>{this.destroyed||(this.loading.hidden=!0)},520))}renderFast(){if(this.destroyed||!this.ctx)return;if(this.drawOcean(this.ctx),this.drawGraticule(this.ctx),!this.ready||!this.data||!this.mapCanvas||!this.snapshot){this.renderQuality();return}const t=this.scale/this.snapshot.scale,e=this.tx-this.snapshot.tx*t,i=this.ty-this.snapshot.ty*t;this.ctx.setTransform(this.dpr,0,0,this.dpr,0,0),this.ctx.imageSmoothingEnabled=!0,this.ctx.drawImage(this.mapCanvas,e,i,this.snapshot.w*t,this.snapshot.h*t),this.drawLabels(this.ctx),this.drawOverlays(this.ctx)}drawGraticule(t){!this.options.showGraticule||!this.graticulePath||!this.ready||(t.save(),t.setTransform(this.dpr*this.scale,0,0,this.dpr*this.scale,this.dpr*this.tx,this.dpr*this.ty),t.lineWidth=.75/this.scale,t.strokeStyle="rgba(126, 164, 176, 0.12)",t.stroke(this.graticulePath),t.restore())}drawMap(t,e=this.tx,i=this.ty){const s=this.scale;t.save(),t.setTransform(this.dpr*s,0,0,this.dpr*s,this.dpr*e,this.dpr*i),t.lineJoin="round",t.lineCap="round";const n=this.scale/this.fitScale;if(this.coastPath&&n>1.18){const o=k(.45+n*.1,.45,1),a=[[4.5,"rgba(201, 168, 106, 0.018)"],[2.5,"rgba(0, 4, 6, 0.08)"],[1.3,"rgba(0, 3, 5, 0.12)"],[.65,"rgba(0, 2, 4, 0.18)"]];for(const[c,h]of a)t.lineWidth=c*o/s,t.strokeStyle=h,t.stroke(this.coastPath)}for(const[o,a]of this.fillGroups)t.fillStyle=o,t.fill(a);this.detailBorderPath&&s>this.fitScale*1.55&&(t.lineWidth=.55/s,t.strokeStyle="rgba(18, 15, 11, 0.42)",t.stroke(this.detailBorderPath)),this.divisionBorderPath&&(t.lineWidth=.7/s,t.strokeStyle="rgba(18, 15, 11, 0.52)",t.stroke(this.divisionBorderPath)),this.coastPath&&(t.lineWidth=1.25/s,t.strokeStyle="rgba(7, 7, 5, 0.95)",t.stroke(this.coastPath)),this.borderPath&&(t.lineWidth=1.55/s,t.strokeStyle="rgba(22, 16, 10, 0.93)",t.stroke(this.borderPath),t.lineWidth=.55/s,t.strokeStyle="rgba(238, 215, 168, 0.10)",t.stroke(this.borderPath));const l=[...new Set([...this.detailCountryCodes,...this.outlineCountryCodes])];if(l.length){t.lineWidth=1.8/s,t.strokeStyle="rgba(7, 7, 5, 0.96)";for(const o of l){const a=this.countryPaths.get(o);a&&t.stroke(a)}}t.restore()}drawOverlays(t){if(!this.ready)return;const e=this.scale;if(t.save(),t.setTransform(this.dpr*e,0,0,this.dpr*e,this.dpr*this.tx,this.dpr*this.ty),t.lineJoin="round",t.lineCap="round",this.hoverCountry){const i=this.countryPaths.get(this.hoverCountry);i&&(t.lineWidth=2.1/e,t.strokeStyle="rgba(239, 211, 154, 0.3)",t.stroke(i))}if(this.hoverDivision&&!this.dragging){const i=this.hoverDivision;i._path&&(t.fillStyle="rgba(255, 240, 204, 0.18)",t.fill(i._path),t.lineWidth=1.15/e,t.strokeStyle="rgba(255, 238, 196, 0.68)",t.stroke(i._path))}if(this.selectedCountry){const i=this.countryPaths.get(this.selectedCountry);i&&(t.lineWidth=8/e,t.strokeStyle="rgba(234, 203, 140, 0.15)",t.stroke(i),t.lineWidth=1.8/e,t.strokeStyle="rgba(247, 226, 175, 0.92)",t.stroke(i))}t.restore()}drawLabels(t){if(!this.ready||!this.data)return;const e=this.scale/this.fitScale;if(e<1.32)return;const i=Ut(1.32,2.05,e),s=Math.max(6,Math.round(this.viewW*this.viewH/16e3)),n=Math.min(s,e<1.9?16:e<2.8?34:e<4.5?55:80),l=[];let o=0;const a=this.frame.getBoundingClientRect(),c=[];for(const h of[this.plate,this.toolbar,this.legend]){if(!h||h.hidden)continue;const u=h.getBoundingClientRect();u.width<1||u.height<1||c.push({x:u.left-a.left-8,y:u.top-a.top-8,w:u.width+16,h:u.height+16})}t.setTransform(this.dpr,0,0,this.dpr,0,0),t.textAlign="center",t.textBaseline="middle",t.lineJoin="round";for(const h of this.labelCountries){if(o>=n)break;const u=h.bbox,p=u[0]*this.scale+this.tx,g=u[1]*this.scale+this.ty,d=u[2]*this.scale+this.tx,w=u[3]*this.scale+this.ty;if(d<-30||p>this.viewW+30||w<-20||g>this.viewH+20)continue;const f=d-p,$=w-g;if(f<26||$<11)continue;const S=h._labelCenter||h.label,T=S[0]*this.scale+this.tx,P=S[1]*this.scale+this.ty;if(T<16||T>this.viewW-16||P<16||P>this.viewH-16)continue;const I=Math.min(15,11+e*.55),tt=`600 ${I}px "Noto Serif SC", "Songti SC", "STSong", "SimSun", Georgia, serif`;t.font=tt;const E=h.nameZh||h.name,L=t.measureText(E).width;if(L>Math.max(f*1.45,48)&&e<4.5||e<5&&E.length>6&&f<160)continue;const y={x:T-L/2-4,y:P-I*.75-3,w:L+8,h:I*1.5+6};y.x<2||y.x+y.w>this.viewW-2||y.y<2||y.y+y.h>this.viewH-2||c.some(C=>y.x<C.x+C.w&&y.x+y.w>C.x&&y.y<C.y+C.h&&y.y+y.h>C.y)||l.some(C=>y.x<C.x+C.w&&y.x+y.w>C.x&&y.y<C.y+C.h&&y.y+y.h>C.y)||(l.push(y),t.save(),t.globalAlpha=i*(e>2.4?.92:.74),"letterSpacing"in t&&(t.letterSpacing="1.4px"),t.strokeStyle="rgba(3, 7, 9, 0.82)",t.lineWidth=3.4,t.strokeText(E,T,P),t.fillStyle="#f2e8d3",t.fillText(E,T,P),e>2.9&&f>84&&h.name&&(t.globalAlpha=i*.45,t.font='8px Georgia, "Times New Roman", serif',"letterSpacing"in t&&(t.letterSpacing="2.2px"),t.fillStyle="#e4d6b9",t.fillText(h.name.toUpperCase(),T,P+I*.98)),t.restore(),o++)}}pick(t,e){if(!this.grid||!this.data)return null;const{cols:i,rows:s,cell:n,cells:l}=this.grid;if(t<0||e<0||t>this.data.meta.width||e>this.data.meta.height)return null;const o=k(Math.floor(t/n),0,i-1),a=k(Math.floor(e/n),0,s-1),c=l[a*i+o];for(let h=c.length-1;h>=0;h--){const u=c[h],p=u._bbox;if(!(!p||t<p[0]||t>p[2]||e<p[1]||e>p[3])&&this.pointInRings(u._rings,t,e))return u}return null}pointInRings(t,e,i){let s=!1;for(const n of t)for(let l=0,o=n.length-1;l<n.length;o=l++){const a=n[l][0],c=n[l][1],h=n[o][0],u=n[o][1];c>i!=u>i&&e<(h-a)*(i-c)/(u-c||1e-9)+a&&(s=!s)}return s}canvasPoint(t,e){const i=this.canvas.getBoundingClientRect();return{x:t-i.left,y:e-i.top}}worldPoint(t,e){return{x:(t-this.tx)/this.scale,y:(e-this.ty)/this.scale}}onPointerDown(t){if(!this.ready||!this.options.interactive||t.pointerType==="mouse"&&t.button!==0)return;this.scale<=this.fitScale*1.001&&t.pointerType!=="mouse"||t.preventDefault(),this.canvas.focus({preventScroll:!0}),this.dismissHint(),this.hideTooltip();try{this.canvas.setPointerCapture(t.pointerId)}catch{}if(this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY}),this.pointers.size===1)this.drag={x:t.clientX,y:t.clientY,tx:this.tx,ty:this.ty,moved:!1,time:performance.now()},this.pinch=null,this.setDragging(!1);else if(this.pointers.size===2){const[i,s]=[...this.pointers.values()];this.drag=null,this.pinch={distance:Math.hypot(i.x-s.x,i.y-s.y)||1,scale:this.scale,tx:this.tx,ty:this.ty,midX:(i.x+s.x)/2,midY:(i.y+s.y)/2},this.setDragging(!0)}}onPointerMove(t){if(!this.pointers.has(t.pointerId)){this.ready&&!this.dragging&&t.pointerType!=="touch"&&this.updateHover(t);return}if(this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY}),this.pointers.size===2&&this.pinch){const[e,i]=[...this.pointers.values()],s=Math.hypot(e.x-i.x,e.y-i.y)||1,n=(e.x+i.x)/2,l=(e.y+i.y)/2,o=k(this.pinch.scale*(s/this.pinch.distance),this.fitScale*D,this.fitScale*A),a=this.canvas.getBoundingClientRect(),c=this.pinch.midX-a.left,h=this.pinch.midY-a.top,u=(c-this.pinch.tx)/this.pinch.scale,p=(h-this.pinch.ty)/this.pinch.scale;this.scale=o,this.tx=n-a.left-u*o,this.ty=l-a.top-p*o,this.clampTransform(),this.updateToolbar(),this.invalidateFast(),this.scheduleQuality(220);return}if(this.drag&&this.pointers.size===1){const e=t.clientX-this.drag.x,i=t.clientY-this.drag.y;Math.abs(e)+Math.abs(i)>3&&(this.drag.moved=!0),this.tx=this.drag.tx+e,this.ty=this.drag.ty+i,this.clampTransform(),this.setDragging(!0),this.invalidateFast(),this.scheduleQuality(220)}}onPointerUp(t,e=!1){if(!this.pointers.has(t.pointerId))return;this.pointers.delete(t.pointerId);try{this.canvas.hasPointerCapture(t.pointerId)&&this.canvas.releasePointerCapture(t.pointerId)}catch{}const i=!!this.pinch;if(this.pointers.size===0){const s=this.drag;this.drag=null,this.pinch=null,this.setDragging(!1),this.scheduleQuality(90),!e&&!i&&s&&!s.moved&&performance.now()-s.time<650&&this.onClick(t);return}if(this.pointers.size===1){const[s]=[...this.pointers.values()];this.pinch=null,this.drag={x:s.x,y:s.y,tx:this.tx,ty:this.ty,moved:!0,time:performance.now()},this.setDragging(!0)}}onPointerLeave(){this.pointers.size||this.hideTooltip()}setDragging(t){this.dragging=t,this.frame.dataset.dragging=t?"true":"false",t&&this.hideTooltip()}onClick(t){const e=this.canvasPoint(t.clientX,t.clientY),i=this.worldPoint(e.x,e.y),s=this.pick(i.x,i.y);s?typeof this.options.onDivisionClick=="function"?this.options.onDivisionClick(s,this):this.selectCountry(s.country):this.clearSelection()}onWheel(t){if(!this.ready||!this.options.interactive)return;this.dismissHint();let e=t.deltaY;if(t.deltaMode===1?e*=16:t.deltaMode===2&&(e*=this.viewH),this.scale<=this.fitScale*1.001&&e>0)return;t.preventDefault();const i=this.canvasPoint(t.clientX,t.clientY),s=Math.exp(-e*.0015);this.zoomAt(this.scale*s,i.x,i.y),this.updateHover(t)}onDoubleClick(t){if(!this.ready||!this.options.interactive)return;t.preventDefault();const e=this.canvasPoint(t.clientX,t.clientY);this.scale<=this.fitScale*1.05?this.zoomAt(this.fitScale*2.7,e.x,e.y):this.resetView()}onKeyDown(t){if(!this.ready||!this.options.interactive)return;const e=64;switch(t.key){case"+":case"=":t.preventDefault(),this.zoomAt(this.scale*1.3,this.viewW/2,this.viewH/2);break;case"-":case"_":t.preventDefault(),this.zoomAt(this.scale/1.3,this.viewW/2,this.viewH/2);break;case"0":case"Home":t.preventDefault(),this.resetView();break;case"ArrowLeft":t.preventDefault(),this.tx+=e,this.clampTransform(),this.invalidateFast(),this.scheduleQuality(140);break;case"ArrowRight":t.preventDefault(),this.tx-=e,this.clampTransform(),this.invalidateFast(),this.scheduleQuality(140);break;case"ArrowUp":t.preventDefault(),this.ty+=e,this.clampTransform(),this.invalidateFast(),this.scheduleQuality(140);break;case"ArrowDown":t.preventDefault(),this.ty-=e,this.clampTransform(),this.invalidateFast(),this.scheduleQuality(140);break;case"Escape":this.clearSelection(),this.hideTooltip();break}}onToolbarClick(t){const e=t.target.closest("[data-action]");if(!e||!this.ready)return;t.preventDefault();const i=e.dataset.action;i==="zoom-in"?this.zoomAt(this.scale*1.35,this.viewW/2,this.viewH/2):i==="zoom-out"?this.zoomAt(this.scale/1.35,this.viewW/2,this.viewH/2):i==="reset"?this.resetView():i==="fullscreen"&&this.toggleFullscreen()}toggleFullscreen(){var t,e,i;document.fullscreenEnabled&&(document.fullscreenElement===this.frame?(t=document.exitFullscreen)==null||t.call(document).catch(()=>{}):(i=(e=this.frame).requestFullscreen)==null||i.call(e).catch(()=>{}))}onFullscreenChange(){window.setTimeout(()=>this.resize(),80)}updateHover(t){if(!this.ready||this.dragging)return;const e=this.canvasPoint(t.clientX,t.clientY);if(e.x<0||e.y<0||e.x>this.viewW||e.y>this.viewH){this.hideTooltip();return}const i=this.worldPoint(e.x,e.y),s=this.pick(i.x,i.y);if(!s){this.hideTooltip();return}this.hoverDivision!==s&&(this.hoverDivision=s,this.hoverCountry=s.country,this.invalidate()),this.showTooltip(s,e.x,e.y)}showTooltip(t,e,i){const s=this.countryByCode.get(t.country);if(!s)return;this.tooltip.hidden=!1,this.tooltipCountry.textContent=`${s.code} · ${s.nameZh}`,this.tooltipName.textContent=t.nameZh||t.name,this.tooltipSub.textContent=`一级行政区 · ${s.name}`,this.tooltip.style.setProperty("--hm-tt-color",this.options.showProvinceShading?t.color:s.color),this.tooltip.classList.add("is-visible");const n=this.tooltip.offsetWidth,l=this.tooltip.offsetHeight;let o=e+16,a=i+16;o+n>this.viewW-8&&(o=e-n-14),a+l>this.viewH-8&&(a=i-l-14),o=k(o,8,Math.max(8,this.viewW-n-8)),a=k(a,8,Math.max(8,this.viewH-l-8)),this.tooltip.style.left=`${o}px`,this.tooltip.style.top=`${a}px`}hideTooltip(){this.tooltip.classList.remove("is-visible"),(this.hoverDivision||this.hoverCountry)&&(this.hoverDivision=null,this.hoverCountry=null,this.invalidate())}selectCountry(t){const e=this.countryByCode.get(t);e&&(this.selectedCountry=t,this.frame.dataset.selected="true",this.card.hidden=!1,this.cardSwatch.style.background=e.color,this.cardName.textContent=e.nameZh,this.cardEn.textContent=e.name,this.cardCode.textContent=e.code,this.cardCount.textContent=String(e.divisions.length),this.live.textContent=`已选择 ${e.nameZh}，${e.divisions.length} 个一级行政区`,this.invalidate())}clearSelection(){if(!this.selectedCountry){this.card.hidden=!0,this.frame.dataset.selected="false";return}this.selectedCountry=null,this.card.hidden=!0,this.frame.dataset.selected="false",this.live.textContent="已取消选择",this.invalidate()}dismissHint(){this.hintEl&&this.hintEl.classList.add("is-hidden"),this.hintTimer&&(clearTimeout(this.hintTimer),this.hintTimer=0)}destroy(){var e,i,s,n,l,o;if(this.destroyed)return;this.destroyed=!0,this.fastRaf&&cancelAnimationFrame(this.fastRaf),this.qualityRaf&&cancelAnimationFrame(this.qualityRaf),this.fastRaf=0,this.qualityRaf=0,this.settleTimer&&clearTimeout(this.settleTimer),this.hintTimer&&clearTimeout(this.hintTimer),this.resizeObserver&&this.resizeObserver.disconnect(),this.windowResize&&window.removeEventListener("resize",this.windowResize),document.removeEventListener("fullscreenchange",this.bound.fullscreenChange);const t=this.canvas;t&&(t.removeEventListener("pointerdown",this.bound.pointerDown),t.removeEventListener("pointermove",this.bound.pointerMove),t.removeEventListener("pointerup",this.bound.pointerUp),t.removeEventListener("pointercancel",this.bound.pointerCancel),t.removeEventListener("pointerleave",this.bound.pointerLeave),t.removeEventListener("wheel",this.bound.wheel),t.removeEventListener("dblclick",this.bound.doubleClick),t.removeEventListener("keydown",this.bound.keyDown)),(e=this.toolbar)==null||e.removeEventListener("click",this.bound.toolbarClick),(s=(i=this.root)==null?void 0:i.querySelector(".hm-card-close"))==null||s.removeEventListener("click",this.bound.cardClose),(l=(n=this.root)==null?void 0:n.querySelector(".hm-retry"))==null||l.removeEventListener("click",this.bound.retry),this.pointers.clear(),document.fullscreenElement===this.frame&&((o=document.exitFullscreen)==null||o.call(document).catch(()=>{})),this.host.__hoi4Map===this&&delete this.host.__hoi4Map,this.data&&(this.data=null)}}function rt(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var W=rt();function Tt(r){W=r}var _={exec:()=>null};function m(r,t=""){let e=typeof r=="string"?r:r.source,i={replace:(s,n)=>{let l=typeof n=="string"?n:n.source;return l=l.replace(v.caret,"$1"),e=e.replace(s,l),i},getRegex:()=>new RegExp(e,t)};return i}var Jt=((r="")=>{try{return!!new RegExp("(?<=1)(?<!1)"+r)}catch{return!1}})(),v={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:r=>new RegExp(`^( {0,3}${r})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:r=>new RegExp(`^ {0,${Math.min(3,r-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:r=>new RegExp(`^ {0,${Math.min(3,r-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:r=>new RegExp(`^ {0,${Math.min(3,r-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:r=>new RegExp(`^ {0,${Math.min(3,r-1)}}#`),htmlBeginRegex:r=>new RegExp(`^ {0,${Math.min(3,r-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:r=>new RegExp(`^ {0,${Math.min(3,r-1)}}>`)},Kt=/^(?:[ \t]*(?:\n|$))+/,te=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ee=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Q=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ie=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,nt=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,zt=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Rt=m(zt).replace(/bull/g,nt).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),se=m(zt).replace(/bull/g,nt).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),at=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,re=/^[^\n]+/,ot=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ne=m(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ot).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),ae=m(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,nt).getRegex(),J="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",lt=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,oe=m("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",lt).replace("tag",J).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Mt=m(at).replace("hr",Q).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",J).getRegex(),le=m(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Mt).getRegex(),ht={blockquote:le,code:te,def:ne,fences:ee,heading:ie,hr:Q,html:oe,lheading:Rt,list:ae,newline:Kt,paragraph:Mt,table:_,text:re},bt=m("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Q).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",J).getRegex(),he={...ht,lheading:se,table:bt,paragraph:m(at).replace("hr",Q).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",bt).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",J).getRegex()},ce={...ht,html:m(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",lt).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:_,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:m(at).replace("hr",Q).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Rt).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},pe=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,ue=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,$t=/^( {2,}|\\)\n(?!\s*$)/,de=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,B=/[\p{P}\p{S}]/u,K=/[\s\p{P}\p{S}]/u,ct=/[^\s\p{P}\p{S}]/u,fe=m(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,K).getRegex(),Pt=/(?!~)[\p{P}\p{S}]/u,ge=/(?!~)[\s\p{P}\p{S}]/u,me=/(?:[^\s\p{P}\p{S}]|~)/u,be=m(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Jt?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Lt=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,xe=m(Lt,"u").replace(/punct/g,B).getRegex(),ke=m(Lt,"u").replace(/punct/g,Pt).getRegex(),At="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",we=m(At,"gu").replace(/notPunctSpace/g,ct).replace(/punctSpace/g,K).replace(/punct/g,B).getRegex(),ye=m(At,"gu").replace(/notPunctSpace/g,me).replace(/punctSpace/g,ge).replace(/punct/g,Pt).getRegex(),ve=m("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ct).replace(/punctSpace/g,K).replace(/punct/g,B).getRegex(),Se=m(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,B).getRegex(),Ce="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",Te=m(Ce,"gu").replace(/notPunctSpace/g,ct).replace(/punctSpace/g,K).replace(/punct/g,B).getRegex(),ze=m(/\\(punct)/,"gu").replace(/punct/g,B).getRegex(),Re=m(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Me=m(lt).replace("(?:-->|$)","-->").getRegex(),$e=m("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Me).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Y=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,Pe=m(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label",Y).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Et=m(/^!?\[(label)\]\[(ref)\]/).replace("label",Y).replace("ref",ot).getRegex(),Ht=m(/^!?\[(ref)\](?:\[\])?/).replace("ref",ot).getRegex(),Le=m("reflink|nolink(?!\\()","g").replace("reflink",Et).replace("nolink",Ht).getRegex(),xt=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,pt={_backpedal:_,anyPunctuation:ze,autolink:Re,blockSkip:be,br:$t,code:ue,del:_,delLDelim:_,delRDelim:_,emStrongLDelim:xe,emStrongRDelimAst:we,emStrongRDelimUnd:ve,escape:pe,link:Pe,nolink:Ht,punctuation:fe,reflink:Et,reflinkSearch:Le,tag:$e,text:de,url:_},Ae={...pt,link:m(/^!?\[(label)\]\((.*?)\)/).replace("label",Y).getRegex(),reflink:m(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Y).getRegex()},et={...pt,emStrongRDelimAst:ye,emStrongLDelim:ke,delLDelim:Se,delRDelim:Te,url:m(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",xt).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:m(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",xt).getRegex()},Ee={...et,br:m($t).replace("{2,}","*").getRegex(),text:m(et.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Z={normal:ht,gfm:he,pedantic:ce},G={normal:pt,gfm:et,breaks:Ee,pedantic:Ae},He={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},kt=r=>He[r];function M(r,t){if(t){if(v.escapeTest.test(r))return r.replace(v.escapeReplace,kt)}else if(v.escapeTestNoEncode.test(r))return r.replace(v.escapeReplaceNoEncode,kt);return r}function wt(r){try{r=encodeURI(r).replace(v.percentDecode,"%")}catch{return null}return r}function yt(r,t){var n;let e=r.replace(v.findPipe,(l,o,a)=>{let c=!1,h=o;for(;--h>=0&&a[h]==="\\";)c=!c;return c?"|":" |"}),i=e.split(v.splitPipe),s=0;if(i[0].trim()||i.shift(),i.length>0&&!((n=i.at(-1))!=null&&n.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(v.slashPipe,"|");return i}function H(r,t,e){let i=r.length;if(i===0)return"";let s=0;for(;s<i&&r.charAt(i-s-1)===t;)s++;return r.slice(0,i-s)}function vt(r){let t=r.split(`
`),e=t.length-1;for(;e>=0&&v.blankLine.test(t[e]);)e--;return t.length-e<=2?r:t.slice(0,e+1).join(`
`)}function De(r,t){if(r.indexOf(t[1])===-1)return-1;let e=0;for(let i=0;i<r.length;i++)if(r[i]==="\\")i++;else if(r[i]===t[0])e++;else if(r[i]===t[1]&&(e--,e<0))return i;return e>0?-2:-1}function _e(r,t=0){let e=t,i="";for(let s of r)if(s==="	"){let n=4-e%4;i+=" ".repeat(n),e+=n}else i+=s,e++;return i}function St(r,t,e,i,s){let n=t.href,l=t.title||null,o=r[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;let a={type:r[0].charAt(0)==="!"?"image":"link",raw:e,href:n,title:l,text:o,tokens:i.inlineTokens(o)};return i.state.inLink=!1,a}function qe(r,t,e){let i=r.match(e.other.indentCodeCompensation);if(i===null)return t;let s=i[1];return t.split(`
`).map(n=>{let l=n.match(e.other.beginningSpace);if(l===null)return n;let[o]=l;return o.length>=s.length?n.slice(s.length):n}).join(`
`)}var U=class{constructor(r){b(this,"options");b(this,"rules");b(this,"lexer");this.options=r||W}space(r){let t=this.rules.block.newline.exec(r);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(r){let t=this.rules.block.code.exec(r);if(t){let e=this.options.pedantic?t[0]:vt(t[0]),i=e.replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e,codeBlockStyle:"indented",text:i}}}fences(r){let t=this.rules.block.fences.exec(r);if(t){let e=t[0],i=qe(e,t[3]||"",this.rules);return{type:"code",raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(r){let t=this.rules.block.heading.exec(r);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let i=H(e,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(e=i.trim())}return{type:"heading",raw:H(t[0],`
`),depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(r){let t=this.rules.block.hr.exec(r);if(t)return{type:"hr",raw:H(t[0],`
`)}}blockquote(r){let t=this.rules.block.blockquote.exec(r);if(t){let e=H(t[0],`
`).split(`
`),i="",s="",n=[];for(;e.length>0;){let l=!1,o=[],a;for(a=0;a<e.length;a++)if(this.rules.other.blockquoteStart.test(e[a]))o.push(e[a]),l=!0;else if(!l)o.push(e[a]);else break;e=e.slice(a);let c=o.join(`
`),h=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,s=s?`${s}
${h}`:h;let u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(h,n,!0),this.lexer.state.top=u,e.length===0)break;let p=n.at(-1);if((p==null?void 0:p.type)==="code")break;if((p==null?void 0:p.type)==="blockquote"){let g=p,d=g.raw+`
`+e.join(`
`),w=this.blockquote(d);n[n.length-1]=w,i=i.substring(0,i.length-g.raw.length)+w.raw,s=s.substring(0,s.length-g.text.length)+w.text;break}else if((p==null?void 0:p.type)==="list"){let g=p,d=g.raw+`
`+e.join(`
`),w=this.list(d);n[n.length-1]=w,i=i.substring(0,i.length-p.raw.length)+w.raw,s=s.substring(0,s.length-g.raw.length)+w.raw,e=d.substring(n.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:n,text:s}}}list(r){var e,i;let t=this.rules.block.list.exec(r);if(t){let s=t[1].trim(),n=s.length>1,l={type:"list",raw:"",ordered:n,start:n?+s.slice(0,-1):"",loose:!1,items:[]};s=n?`\\d{1,9}\\${s.slice(-1)}`:`\\${s}`,this.options.pedantic&&(s=n?s:"[*+-]");let o=this.rules.other.listItemRegex(s),a=!1;for(;r;){let h=!1,u="",p="";if(!(t=o.exec(r))||this.rules.block.hr.test(r))break;u=t[0],r=r.substring(u.length);let g=_e(t[2].split(`
`,1)[0],t[1].length),d=r.split(`
`,1)[0],w=!g.trim(),f=0;if(this.options.pedantic?(f=2,p=g.trimStart()):w?f=t[1].length+1:(f=g.search(this.rules.other.nonSpaceChar),f=f>4?1:f,p=g.slice(f),f+=t[1].length),w&&this.rules.other.blankLine.test(d)&&(u+=d+`
`,r=r.substring(d.length+1),h=!0),!h){let $=this.rules.other.nextBulletRegex(f),S=this.rules.other.hrRegex(f),T=this.rules.other.fencesBeginRegex(f),P=this.rules.other.headingBeginRegex(f),I=this.rules.other.htmlBeginRegex(f),tt=this.rules.other.blockquoteBeginRegex(f);for(;r;){let E=r.split(`
`,1)[0],L;if(d=E,this.options.pedantic?(d=d.replace(this.rules.other.listReplaceNesting,"  "),L=d):L=d.replace(this.rules.other.tabCharGlobal,"    "),T.test(d)||P.test(d)||I.test(d)||tt.test(d)||$.test(d)||S.test(d))break;if(L.search(this.rules.other.nonSpaceChar)>=f||!d.trim())p+=`
`+L.slice(f);else{if(w||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||T.test(g)||P.test(g)||S.test(g))break;p+=`
`+d}w=!d.trim(),u+=E+`
`,r=r.substring(E.length+1),g=L.slice(f)}}l.loose||(a?l.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(a=!0)),l.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),l.raw+=u}let c=l.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;l.raw=l.raw.trimEnd();for(let h of l.items){if(this.lexer.state.top=!1,h.tokens=this.lexer.blockTokens(h.text,[]),h.task){if(h.text=h.text.replace(this.rules.other.listReplaceTask,""),((e=h.tokens[0])==null?void 0:e.type)==="text"||((i=h.tokens[0])==null?void 0:i.type)==="paragraph"){h.tokens[0].raw=h.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),h.tokens[0].text=h.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let u=this.rules.other.listTaskCheckbox.exec(h.raw);if(u){let p={type:"checkbox",raw:u[0]+" ",checked:u[0]!=="[ ]"};h.checked=p.checked,l.loose?h.tokens[0]&&["paragraph","text"].includes(h.tokens[0].type)&&"tokens"in h.tokens[0]&&h.tokens[0].tokens?(h.tokens[0].raw=p.raw+h.tokens[0].raw,h.tokens[0].text=p.raw+h.tokens[0].text,h.tokens[0].tokens.unshift(p)):h.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):h.tokens.unshift(p)}}if(!l.loose){let u=h.tokens.filter(g=>g.type==="space"),p=u.length>0&&u.some(g=>this.rules.other.anyLine.test(g.raw));l.loose=p}}if(l.loose)for(let h of l.items){h.loose=!0;for(let u of h.tokens)u.type==="text"&&(u.type="paragraph")}return l}}html(r){let t=this.rules.block.html.exec(r);if(t){let e=vt(t[0]);return{type:"html",block:!0,raw:e,pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:e}}}def(r){let t=this.rules.block.def.exec(r);if(t){let e=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:e,raw:H(t[0],`
`),href:i,title:s}}}table(r){var l;let t=this.rules.block.table.exec(r);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let e=yt(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(l=t[3])!=null&&l.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],n={type:"table",raw:H(t[0],`
`),header:[],align:[],rows:[]};if(e.length===i.length){for(let o of i)this.rules.other.tableAlignRight.test(o)?n.align.push("right"):this.rules.other.tableAlignCenter.test(o)?n.align.push("center"):this.rules.other.tableAlignLeft.test(o)?n.align.push("left"):n.align.push(null);for(let o=0;o<e.length;o++)n.header.push({text:e[o],tokens:this.lexer.inline(e[o]),header:!0,align:n.align[o]});for(let o of s)n.rows.push(yt(o,n.header.length).map((a,c)=>({text:a,tokens:this.lexer.inline(a),header:!1,align:n.align[c]})));return n}}lheading(r){let t=this.rules.block.lheading.exec(r);if(t){let e=t[1].trim();return{type:"heading",raw:H(t[0],`
`),depth:t[2].charAt(0)==="="?1:2,text:e,tokens:this.lexer.inline(e)}}}paragraph(r){let t=this.rules.block.paragraph.exec(r);if(t){let e=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(r){let t=this.rules.block.text.exec(r);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(r){let t=this.rules.inline.escape.exec(r);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(r){let t=this.rules.inline.tag.exec(r);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(r){let t=this.rules.inline.link.exec(r);if(t){let e=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(e)){if(!this.rules.other.endAngleBracket.test(e))return;let n=H(e.slice(0,-1),"\\");if((e.length-n.length)%2===0)return}else{let n=De(t[2],"()");if(n===-2)return;if(n>-1){let l=(t[0].indexOf("!")===0?5:4)+t[1].length+n;t[2]=t[2].substring(0,n),t[0]=t[0].substring(0,l).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){let n=this.rules.other.pedanticHrefTitle.exec(i);n&&(i=n[1],s=n[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(e)?i=i.slice(1):i=i.slice(1,-1)),St(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(r,t){let e;if((e=this.rules.inline.reflink.exec(r))||(e=this.rules.inline.nolink.exec(r))){let i=(e[2]||e[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){let n=e[0].charAt(0);return{type:"text",raw:n,text:n}}return St(e,s,e[0],this.lexer,this.rules)}}emStrong(r,t,e=""){let i=this.rules.inline.emStrongLDelim.exec(r);if(!(!i||!i[1]&&!i[2]&&!i[3]&&!i[4]||i[4]&&e.match(this.rules.other.unicodeAlphaNumeric))&&(!(i[1]||i[3])||!e||this.rules.inline.punctuation.exec(e))){let s=[...i[0]].length-1,n,l,o=s,a=0,c=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*r.length+s);(i=c.exec(t))!==null;){if(n=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!n)continue;if(l=[...n].length,i[3]||i[4]){o+=l;continue}else if((i[5]||i[6])&&s%3&&!((s+l)%3)){a+=l;continue}if(o-=l,o>0)continue;l=Math.min(l,l+o+a);let h=[...i[0]][0].length,u=r.slice(0,s+i.index+h+l);if(Math.min(s,l)%2){let g=u.slice(1,-1);return{type:"em",raw:u,text:g,tokens:this.lexer.inlineTokens(g)}}let p=u.slice(2,-2);return{type:"strong",raw:u,text:p,tokens:this.lexer.inlineTokens(p)}}}}codespan(r){let t=this.rules.inline.code.exec(r);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(e),s=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return i&&s&&(e=e.substring(1,e.length-1)),{type:"codespan",raw:t[0],text:e}}}br(r){let t=this.rules.inline.br.exec(r);if(t)return{type:"br",raw:t[0]}}del(r,t,e=""){let i=this.rules.inline.delLDelim.exec(r);if(i&&(!i[1]||!e||this.rules.inline.punctuation.exec(e))){let s=[...i[0]].length-1,n,l,o=s,a=this.rules.inline.delRDelim;for(a.lastIndex=0,t=t.slice(-1*r.length+s);(i=a.exec(t))!==null;){if(n=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!n||(l=[...n].length,l!==s))continue;if(i[3]||i[4]){o+=l;continue}if(o-=l,o>0)continue;l=Math.min(l,l+o);let c=[...i[0]][0].length,h=r.slice(0,s+i.index+c+l),u=h.slice(s,-s);return{type:"del",raw:h,text:u,tokens:this.lexer.inlineTokens(u)}}}}autolink(r){let t=this.rules.inline.autolink.exec(r);if(t){let e,i;return t[2]==="@"?(e=t[1],i="mailto:"+e):(e=t[1],i=e),{type:"link",raw:t[0],text:e,href:i,tokens:[{type:"text",raw:e,text:e}]}}}url(r){var e;let t;if(t=this.rules.inline.url.exec(r)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let n;do n=t[0],t[0]=((e=this.rules.inline._backpedal.exec(t[0]))==null?void 0:e[0])??"";while(n!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(r){let t=this.rules.inline.text.exec(r);if(t){let e=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:e}}}},z=class it{constructor(t){b(this,"tokens");b(this,"options");b(this,"state");b(this,"inlineQueue");b(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||W,this.options.tokenizer=this.options.tokenizer||new U,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let e={other:v,block:Z.normal,inline:G.normal};this.options.pedantic?(e.block=Z.pedantic,e.inline=G.pedantic):this.options.gfm&&(e.block=Z.gfm,this.options.breaks?e.inline=G.breaks:e.inline=G.gfm),this.tokenizer.rules=e}static get rules(){return{block:Z,inline:G}}static lex(t,e){return new it(e).lex(t)}static lexInline(t,e){return new it(e).inlineTokens(t)}lex(t){t=t.replace(v.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let i=this.inlineQueue[e];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,e=[],i=!1){var n,l,o;this.tokenizer.lexer=this,this.options.pedantic&&(t=t.replace(v.tabCharGlobal,"    ").replace(v.spaceLine,""));let s=1/0;for(;t;){if(t.length<s)s=t.length;else{this.infiniteLoopError(t.charCodeAt(0));break}let a;if((l=(n=this.options.extensions)==null?void 0:n.block)!=null&&l.some(h=>(a=h.call({lexer:this},t,e))?(t=t.substring(a.raw.length),e.push(a),!0):!1))continue;if(a=this.tokenizer.space(t)){t=t.substring(a.raw.length);let h=e.at(-1);a.raw.length===1&&h!==void 0?h.raw+=`
`:e.push(a);continue}if(a=this.tokenizer.code(t)){t=t.substring(a.raw.length);let h=e.at(-1);(h==null?void 0:h.type)==="paragraph"||(h==null?void 0:h.type)==="text"?(h.raw+=(h.raw.endsWith(`
`)?"":`
`)+a.raw,h.text+=`
`+a.text,this.inlineQueue.at(-1).src=h.text):e.push(a);continue}if(a=this.tokenizer.fences(t)){t=t.substring(a.raw.length),e.push(a);continue}if(a=this.tokenizer.heading(t)){t=t.substring(a.raw.length),e.push(a);continue}if(a=this.tokenizer.hr(t)){t=t.substring(a.raw.length),e.push(a);continue}if(a=this.tokenizer.blockquote(t)){t=t.substring(a.raw.length),e.push(a);continue}if(a=this.tokenizer.list(t)){t=t.substring(a.raw.length),e.push(a);continue}if(a=this.tokenizer.html(t)){t=t.substring(a.raw.length),e.push(a);continue}if(a=this.tokenizer.def(t)){t=t.substring(a.raw.length);let h=e.at(-1);(h==null?void 0:h.type)==="paragraph"||(h==null?void 0:h.type)==="text"?(h.raw+=(h.raw.endsWith(`
`)?"":`
`)+a.raw,h.text+=`
`+a.raw,this.inlineQueue.at(-1).src=h.text):this.tokens.links[a.tag]||(this.tokens.links[a.tag]={href:a.href,title:a.title},e.push(a));continue}if(a=this.tokenizer.table(t)){t=t.substring(a.raw.length),e.push(a);continue}if(a=this.tokenizer.lheading(t)){t=t.substring(a.raw.length),e.push(a);continue}let c=t;if((o=this.options.extensions)!=null&&o.startBlock){let h=1/0,u=t.slice(1),p;this.options.extensions.startBlock.forEach(g=>{p=g.call({lexer:this},u),typeof p=="number"&&p>=0&&(h=Math.min(h,p))}),h<1/0&&h>=0&&(c=t.substring(0,h+1))}if(this.state.top&&(a=this.tokenizer.paragraph(c))){let h=e.at(-1);i&&(h==null?void 0:h.type)==="paragraph"?(h.raw+=(h.raw.endsWith(`
`)?"":`
`)+a.raw,h.text+=`
`+a.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=h.text):e.push(a),i=c.length!==t.length,t=t.substring(a.raw.length);continue}if(a=this.tokenizer.text(t)){t=t.substring(a.raw.length);let h=e.at(-1);(h==null?void 0:h.type)==="text"?(h.raw+=(h.raw.endsWith(`
`)?"":`
`)+a.raw,h.text+=`
`+a.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=h.text):e.push(a);continue}if(t){this.infiniteLoopError(t.charCodeAt(0));break}}return this.state.top=!0,e}inline(t,e=[]){return this.inlineQueue.push({src:t,tokens:e}),e}inlineTokens(t,e=[]){var c,h,u,p,g;this.tokenizer.lexer=this;let i=t,s=null;if(this.tokens.links){let d=Object.keys(this.tokens.links);if(d.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!==null;)d.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!==null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let n;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!==null;)n=s[2]?s[2].length:0,i=i.slice(0,s.index+n)+"["+"a".repeat(s[0].length-n-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);i=((h=(c=this.options.hooks)==null?void 0:c.emStrongMask)==null?void 0:h.call({lexer:this},i))??i;let l=!1,o="",a=1/0;for(;t;){if(t.length<a)a=t.length;else{this.infiniteLoopError(t.charCodeAt(0));break}l||(o=""),l=!1;let d;if((p=(u=this.options.extensions)==null?void 0:u.inline)!=null&&p.some(f=>(d=f.call({lexer:this},t,e))?(t=t.substring(d.raw.length),e.push(d),!0):!1))continue;if(d=this.tokenizer.escape(t)){t=t.substring(d.raw.length),e.push(d);continue}if(d=this.tokenizer.tag(t)){t=t.substring(d.raw.length),e.push(d);continue}if(d=this.tokenizer.link(t)){t=t.substring(d.raw.length),e.push(d);continue}if(d=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(d.raw.length);let f=e.at(-1);d.type==="text"&&(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):e.push(d);continue}if(d=this.tokenizer.emStrong(t,i,o)){t=t.substring(d.raw.length),e.push(d);continue}if(d=this.tokenizer.codespan(t)){t=t.substring(d.raw.length),e.push(d);continue}if(d=this.tokenizer.br(t)){t=t.substring(d.raw.length),e.push(d);continue}if(d=this.tokenizer.del(t,i,o)){t=t.substring(d.raw.length),e.push(d);continue}if(d=this.tokenizer.autolink(t)){t=t.substring(d.raw.length),e.push(d);continue}if(!this.state.inLink&&(d=this.tokenizer.url(t))){t=t.substring(d.raw.length),e.push(d);continue}let w=t;if((g=this.options.extensions)!=null&&g.startInline){let f=1/0,$=t.slice(1),S;this.options.extensions.startInline.forEach(T=>{S=T.call({lexer:this},$),typeof S=="number"&&S>=0&&(f=Math.min(f,S))}),f<1/0&&f>=0&&(w=t.substring(0,f+1))}if(d=this.tokenizer.inlineText(w)){t=t.substring(d.raw.length),d.raw.slice(-1)!=="_"&&(o=d.raw.slice(-1)),l=!0;let f=e.at(-1);(f==null?void 0:f.type)==="text"?(f.raw+=d.raw,f.text+=d.text):e.push(d);continue}if(t){this.infiniteLoopError(t.charCodeAt(0));break}}return e}infiniteLoopError(t){let e="Infinite loop on byte: "+t;if(this.options.silent)console.error(e);else throw new Error(e)}},j=class{constructor(r){b(this,"options");b(this,"parser");this.options=r||W}space(r){return""}code({text:r,lang:t,escaped:e}){var n;let i=(n=(t||"").match(v.notSpaceStart))==null?void 0:n[0],s=r.replace(v.endingNewline,"")+`
`;return i?'<pre><code class="language-'+M(i)+'">'+(e?s:M(s,!0))+`</code></pre>
`:"<pre><code>"+(e?s:M(s,!0))+`</code></pre>
`}blockquote({tokens:r}){return`<blockquote>
${this.parser.parse(r)}</blockquote>
`}html({text:r}){return r}def(r){return""}heading({tokens:r,depth:t}){return`<h${t}>${this.parser.parseInline(r)}</h${t}>
`}hr(r){return`<hr>
`}list(r){let t=r.ordered,e=r.start,i="";for(let l=0;l<r.items.length;l++){let o=r.items[l];i+=this.listitem(o)}let s=t?"ol":"ul",n=t&&e!==1?' start="'+e+'"':"";return"<"+s+n+`>
`+i+"</"+s+`>
`}listitem(r){return`<li>${this.parser.parse(r.tokens)}</li>
`}checkbox({checked:r}){return"<input "+(r?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:r}){return`<p>${this.parser.parseInline(r)}</p>
`}table(r){let t="",e="";for(let s=0;s<r.header.length;s++)e+=this.tablecell(r.header[s]);t+=this.tablerow({text:e});let i="";for(let s=0;s<r.rows.length;s++){let n=r.rows[s];e="";for(let l=0;l<n.length;l++)e+=this.tablecell(n[l]);i+=this.tablerow({text:e})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+i+`</table>
`}tablerow({text:r}){return`<tr>
${r}</tr>
`}tablecell(r){let t=this.parser.parseInline(r.tokens),e=r.header?"th":"td";return(r.align?`<${e} align="${r.align}">`:`<${e}>`)+t+`</${e}>
`}strong({tokens:r}){return`<strong>${this.parser.parseInline(r)}</strong>`}em({tokens:r}){return`<em>${this.parser.parseInline(r)}</em>`}codespan({text:r}){return`<code>${M(r,!0)}</code>`}br(r){return"<br>"}del({tokens:r}){return`<del>${this.parser.parseInline(r)}</del>`}link({href:r,title:t,tokens:e}){let i=this.parser.parseInline(e),s=wt(r);if(s===null)return i;r=s;let n='<a href="'+r+'"';return t&&(n+=' title="'+M(t)+'"'),n+=">"+i+"</a>",n}image({href:r,title:t,text:e,tokens:i}){i&&(e=this.parser.parseInline(i,this.parser.textRenderer));let s=wt(r);if(s===null)return M(e);r=s;let n=`<img src="${r}" alt="${M(e)}"`;return t&&(n+=` title="${M(t)}"`),n+=">",n}text(r){return"tokens"in r&&r.tokens?this.parser.parseInline(r.tokens):"escaped"in r&&r.escaped?r.text:M(r.text)}},ut=class{strong({text:r}){return r}em({text:r}){return r}codespan({text:r}){return r}del({text:r}){return r}html({text:r}){return r}text({text:r}){return r}link({text:r}){return""+r}image({text:r}){return""+r}br(){return""}checkbox({raw:r}){return r}},R=class st{constructor(t){b(this,"options");b(this,"renderer");b(this,"textRenderer");this.options=t||W,this.options.renderer=this.options.renderer||new j,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ut}static parse(t,e){return new st(e).parse(t)}static parseInline(t,e){return new st(e).parseInline(t)}parse(t){var i,s;this.renderer.parser=this;let e="";for(let n=0;n<t.length;n++){let l=t[n];if((s=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&s[l.type]){let a=l,c=this.options.extensions.renderers[a.type].call({parser:this},a);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){e+=c||"";continue}}let o=l;switch(o.type){case"space":{e+=this.renderer.space(o);break}case"hr":{e+=this.renderer.hr(o);break}case"heading":{e+=this.renderer.heading(o);break}case"code":{e+=this.renderer.code(o);break}case"table":{e+=this.renderer.table(o);break}case"blockquote":{e+=this.renderer.blockquote(o);break}case"list":{e+=this.renderer.list(o);break}case"checkbox":{e+=this.renderer.checkbox(o);break}case"html":{e+=this.renderer.html(o);break}case"def":{e+=this.renderer.def(o);break}case"paragraph":{e+=this.renderer.paragraph(o);break}case"text":{e+=this.renderer.text(o);break}default:{let a='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return e}parseInline(t,e=this.renderer){var s,n;this.renderer.parser=this;let i="";for(let l=0;l<t.length;l++){let o=t[l];if((n=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&n[o.type]){let c=this.options.extensions.renderers[o.type].call({parser:this},o);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(o.type)){i+=c||"";continue}}let a=o;switch(a.type){case"escape":{i+=e.text(a);break}case"html":{i+=e.html(a);break}case"link":{i+=e.link(a);break}case"image":{i+=e.image(a);break}case"checkbox":{i+=e.checkbox(a);break}case"strong":{i+=e.strong(a);break}case"em":{i+=e.em(a);break}case"codespan":{i+=e.codespan(a);break}case"br":{i+=e.br(a);break}case"del":{i+=e.del(a);break}case"text":{i+=e.text(a);break}default:{let c='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return i}},X,O=(X=class{constructor(r){b(this,"options");b(this,"block");this.options=r||W}preprocess(r){return r}postprocess(r){return r}processAllTokens(r){return r}emStrongMask(r){return r}provideLexer(r=this.block){return r?z.lex:z.lexInline}provideParser(r=this.block){return r?R.parse:R.parseInline}},b(X,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),b(X,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),X),We=class{constructor(...r){b(this,"defaults",rt());b(this,"options",this.setOptions);b(this,"parse",this.parseMarkdown(!0));b(this,"parseInline",this.parseMarkdown(!1));b(this,"Parser",R);b(this,"Renderer",j);b(this,"TextRenderer",ut);b(this,"Lexer",z);b(this,"Tokenizer",U);b(this,"Hooks",O);this.use(...r)}walkTokens(r,t){var i,s;let e=[];for(let n of r)switch(e=e.concat(t.call(this,n)),n.type){case"table":{let l=n;for(let o of l.header)e=e.concat(this.walkTokens(o.tokens,t));for(let o of l.rows)for(let a of o)e=e.concat(this.walkTokens(a.tokens,t));break}case"list":{let l=n;e=e.concat(this.walkTokens(l.items,t));break}default:{let l=n;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[l.type]?this.defaults.extensions.childTokens[l.type].forEach(o=>{let a=l[o].flat(1/0);e=e.concat(this.walkTokens(a,t))}):l.tokens&&(e=e.concat(this.walkTokens(l.tokens,t)))}}return e}use(...r){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return r.forEach(e=>{let i={...e};if(i.async=this.defaults.async||i.async||!1,e.extensions&&(e.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let n=t.renderers[s.name];n?t.renderers[s.name]=function(...l){let o=s.renderer.apply(this,l);return o===!1&&(o=n.apply(this,l)),o}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let n=t[s.level];n?n.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),e.renderer){let s=this.defaults.renderer||new j(this.defaults);for(let n in e.renderer){if(!(n in s))throw new Error(`renderer '${n}' does not exist`);if(["options","parser"].includes(n))continue;let l=n,o=e.renderer[l],a=s[l];s[l]=(...c)=>{let h=o.apply(s,c);return h===!1&&(h=a.apply(s,c)),h||""}}i.renderer=s}if(e.tokenizer){let s=this.defaults.tokenizer||new U(this.defaults);for(let n in e.tokenizer){if(!(n in s))throw new Error(`tokenizer '${n}' does not exist`);if(["options","rules","lexer"].includes(n))continue;let l=n,o=e.tokenizer[l],a=s[l];s[l]=(...c)=>{let h=o.apply(s,c);return h===!1&&(h=a.apply(s,c)),h}}i.tokenizer=s}if(e.hooks){let s=this.defaults.hooks||new O;for(let n in e.hooks){if(!(n in s))throw new Error(`hook '${n}' does not exist`);if(["options","block"].includes(n))continue;let l=n,o=e.hooks[l],a=s[l];O.passThroughHooks.has(n)?s[l]=c=>{if(this.defaults.async&&O.passThroughHooksRespectAsync.has(n))return(async()=>{let u=await o.call(s,c);return a.call(s,u)})();let h=o.call(s,c);return a.call(s,h)}:s[l]=(...c)=>{if(this.defaults.async)return(async()=>{let u=await o.apply(s,c);return u===!1&&(u=await a.apply(s,c)),u})();let h=o.apply(s,c);return h===!1&&(h=a.apply(s,c)),h}}i.hooks=s}if(e.walkTokens){let s=this.defaults.walkTokens,n=e.walkTokens;i.walkTokens=function(l){let o=[];return o.push(n.call(this,l)),s&&(o=o.concat(s.call(this,l))),o}}this.defaults={...this.defaults,...i}}),this}setOptions(r){return this.defaults={...this.defaults,...r},this}lexer(r,t){return z.lex(r,t??this.defaults)}parser(r,t){return R.parse(r,t??this.defaults)}parseMarkdown(r){return(t,e)=>{let i={...e},s={...this.defaults,...i},n=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&i.async===!1)return n(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return n(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return n(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=r),s.async)return(async()=>{let l=s.hooks?await s.hooks.preprocess(t):t,o=await(s.hooks?await s.hooks.provideLexer(r):r?z.lex:z.lexInline)(l,s),a=s.hooks?await s.hooks.processAllTokens(o):o;s.walkTokens&&await Promise.all(this.walkTokens(a,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser(r):r?R.parse:R.parseInline)(a,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(n);try{s.hooks&&(t=s.hooks.preprocess(t));let l=(s.hooks?s.hooks.provideLexer(r):r?z.lex:z.lexInline)(t,s);s.hooks&&(l=s.hooks.processAllTokens(l)),s.walkTokens&&this.walkTokens(l,s.walkTokens);let o=(s.hooks?s.hooks.provideParser(r):r?R.parse:R.parseInline)(l,s);return s.hooks&&(o=s.hooks.postprocess(o)),o}catch(l){return n(l)}}}onError(r,t){return e=>{if(e.message+=`
Please report this to https://github.com/markedjs/marked.`,r){let i="<p>An error occurred:</p><pre>"+M(e.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(e);throw e}}},q=new We;function x(r,t){return q.parse(r,t)}x.options=x.setOptions=function(r){return q.setOptions(r),x.defaults=q.defaults,Tt(x.defaults),x};x.getDefaults=rt;x.defaults=W;x.use=function(...r){return q.use(...r),x.defaults=q.defaults,Tt(x.defaults),x};x.walkTokens=function(r,t){return q.walkTokens(r,t)};x.parseInline=q.parseInline;x.Parser=R;x.parser=R.parse;x.Renderer=j;x.TextRenderer=ut;x.Lexer=z;x.lexer=z.lex;x.Tokenizer=U;x.Hooks=O;x.parse=x;x.options;x.setOptions;x.use;x.walkTokens;x.parseInline;R.parse;z.lex;const Ie={__name:"MapCanvas",props:{src:{type:String,default:""},height:{type:[String,Number],default:"540px"},width:{type:[String,Number],default:100},title:{type:String,default:""},subtitle:{type:String,default:""},focus:{type:String,default:""},zoom:{type:Number,default:0},fit:{type:String,default:"contain"},showTitle:{type:Boolean,default:!0},showCompass:{type:Boolean,default:!0},showGraticule:{type:Boolean,default:!1}},setup(r,{expose:t}){const e=r,i=Qt(null);let s=null;const n=qt("world"),l=Ot(()=>({width:typeof e.width=="number"?`${e.width}%`:e.width}));function o(){i.value&&(s=new Vt(i.value,{src:e.src||n,height:e.height,width:e.width,title:e.title,subtitle:e.subtitle,focus:e.focus,zoom:e.zoom,fit:e.fit,showTitle:e.showTitle,showCompass:e.showCompass,showGraticule:e.showGraticule}))}function a(){s==null||s.destroy(),s=null}return It(o),Bt(a),F(()=>e.height,c=>{s==null||s.setHeight(c)}),F(()=>[e.focus,e.zoom],()=>{s==null||s.setView({focus:e.focus,zoom:e.zoom})}),F(()=>[e.title,e.subtitle],()=>{s&&(s.options.title=e.title,s.options.subtitle=e.subtitle,s.plate.hidden=!e.showTitle||e.title==="none",s.updateChrome())}),F(()=>e.showTitle,c=>{s&&(s.options.showTitle=c,s.plate.hidden=!c||s.options.title==="none")}),F(()=>e.showGraticule,c=>{s&&(s.options.showGraticule=c,s.invalidateQuality())}),t({getMap:()=>s}),(c,h)=>(Ft(),Nt("div",{ref_key:"host",ref:i,class:"hoi4-map-host",style:Gt(l.value)},null,4))}},Ge=Wt(Ie,[["__scopeId","data-v-0528987a"]]);export{Ct as D,Vt as H,Ge as M,x as g};
