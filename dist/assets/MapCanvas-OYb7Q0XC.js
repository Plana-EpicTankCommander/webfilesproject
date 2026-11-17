var Ht=Object.defineProperty;var _t=(n,t,e)=>t in n?Ht(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var b=(n,t,e)=>_t(n,typeof t!="symbol"?t+"":t,e);import{j as qt}from"./contentSource-CzRoCjsc.js";import{_ as Wt,K as It,P as Bt,w as N,q as Ft,v as Nt,H as Gt,f as Ot,r as Qt}from"./_plugin-vue_export-helper-BDygPn7S.js";const Zt=`
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
`,Ct="https://raw.githubusercontent.com/Plana-EpicTankCommander/sth_ineed/main/maps/world-map.json",E=45,D=.5,ut=56,K={src:Ct,height:"520px",width:"100%",fit:"contain",title:"",subtitle:"",kicker:"ATLAS · 01",focus:"",zoom:0,showTitle:!0,showCompass:!0,showGraticule:!1,showLegend:!1,showDivisionBorders:!1,showProvinceShading:!1,detailCountries:null,outlineCountries:null,onDivisionClick:null,data:null,interactive:!0},G=new Map;function Xt(n={}){return{...K,...n}}function ft(n){if(typeof n=="number"&&Number.isFinite(n))return`${Math.max(220,n)}px`;if(typeof n=="string"&&n.trim()){const t=n.trim();return/^\d+(\.\d+)?$/.test(t)?`${Math.max(220,Number(t))}px`:t}return K.height}function gt(n){if(typeof n=="number"&&Number.isFinite(n))return n;if(typeof n=="string"){const t=n.trim().match(/^(\d+(?:\.\d+)?)(px)?$/);if(t)return Number(t[1])}return null}function Yt(n){if(typeof n=="number"&&Number.isFinite(n))return`${Math.min(100,Math.max(20,n))}%`;if(typeof n=="string"&&n.trim()){const t=n.trim();return/^\d+(\.\d+)?$/.test(t)?`${Math.min(100,Math.max(20,Number(t)))}%`:t}return K.width}function y(n,t,e){return Math.min(e,Math.max(t,n))}function Ut(n,t,e){const i=y((e-n)/(t-n),0,1);return i*i*(3-2*i)}function mt(n){let t=0,e=0;const i=[];for(let s=0;s+1<n.length;s+=2)t+=n[s],e+=n[s+1],i.push([t,e]);return i}async function jt(n,t){if(G.has(n)){const i=G.get(n);return i instanceof Promise,i}const e=(async()=>{const i=await fetch(n,{cache:"no-cache"});if(!i.ok)throw new Error(`地图数据请求失败：HTTP ${i.status}`);const s=Number(i.headers.get("content-length"))||0;if(!i.body||!s){const c=await i.json();return t==null||t(1),c}const r=i.body.getReader(),a=[];let l=0;for(;;){const{done:c,value:d}=await r.read();if(c)break;a.push(d),l+=d.length,t==null||t(y(l/s,0,1))}t==null||t(1);const o=new Uint8Array(l);let p=0;for(const c of a)o.set(c,p),p+=c.length;const h=new TextDecoder("utf-8").decode(o);return JSON.parse(h)})();G.set(n,e);try{const i=await e;return G.set(n,i),i}catch(i){throw G.delete(n),i}}class Vt{constructor(t,e={}){if(!t)throw new Error("Hoi4Map 需要一个容器元素");this.host=t,this.options=Xt(e),this.src=this.options.src||Ct,this.explicitHeightPx=gt(this.options.height),this.destroyed=!1,this.ready=!1,this.data=null,this.pendingReveal=!1,this.viewW=1,this.viewH=1,this.dpr=1,this.fitScale=1,this.scale=1,this.tx=0,this.ty=0,this.snapMargin=0,this.pointers=new Map,this.drag=null,this.pinch=null,this.dragging=!1,this.hoverDivision=null,this.hoverCountry=null,this.selectedCountry=null,this.fastRaf=0,this.qualityRaf=0,this.settleTimer=0,this.hintTimer=0,this.arcs=[],this.fillGroups=new Map,this.countryPathCache=new Map,this.grid=null,this.labelCountries=[],this.bound={pointerDown:i=>this.onPointerDown(i),pointerMove:i=>this.onPointerMove(i),pointerUp:i=>this.onPointerUp(i),pointerCancel:i=>this.onPointerUp(i,!0),pointerLeave:()=>this.onPointerLeave(),wheel:i=>this.onWheel(i),doubleClick:i=>this.onDoubleClick(i),keyDown:i=>this.onKeyDown(i),toolbarClick:i=>this.onToolbarClick(i),cardClose:()=>this.clearSelection(),retry:()=>this.load(),fullscreenChange:()=>this.onFullscreenChange()},this.setupDom(),this.host.__hoi4Map=this,this.bindEvents(),this.observeResize(),this.makeGrain(),this.resize(),this.options.data?this.useData(this.options.data):this.load()}useData(t){this.data=t,this.ready=!0,this.prepare(t),this.frame.dataset.busy="false",this.loading.hidden=!0,this.pendingReveal=!1,this.fitScale=this.computeFitScale(),this.resize(),this.applyInitialView(),this.updateChrome(),this.updateToolbar(),this.invalidateQuality()}setData(t){var r,a,l,o;if(this.destroyed||!t)return;const e=(a=(r=this.data)==null?void 0:r.meta)==null?void 0:a.width,i=(o=(l=this.data)==null?void 0:l.meta)==null?void 0:o.height;this.hideTooltip(),this.clearSelection(),this.ready=!0,this.prepare(t),this.fitScale=this.computeFitScale(),(e!==t.meta.width||i!==t.meta.height)&&(this.scale=this.fitScale,this.tx=(this.viewW-t.meta.width*this.scale)/2,this.ty=(this.viewH-t.meta.height*this.scale)/2),this.clampTransform(),this.updateChrome(),this.updateToolbar(),this.snapshot=null,this.invalidateQuality()}setupDom(){this.host.style.display=this.host.style.display||"block",this.host.style.width=Yt(this.options.width),this.root=this.host.shadowRoot||this.host.attachShadow({mode:"open"}),this.root.innerHTML=`
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
    `,this.frame=this.root.querySelector(".hm-frame"),this.canvas=this.root.querySelector(".hm-canvas"),this.ctx=this.canvas.getContext("2d"),this.plate=this.root.querySelector(".hm-plate"),this.plateKicker=this.root.querySelector(".hm-plate-kicker"),this.titleEl=this.root.querySelector(".hm-title"),this.subtitleEl=this.root.querySelector(".hm-subtitle"),this.zoomLabel=this.root.querySelector(".hm-zoom"),this.toolbar=this.root.querySelector(".hm-toolbar"),this.hintEl=this.root.querySelector(".hm-hint"),this.legend=this.root.querySelector(".hm-legend"),this.legendCountries=this.root.querySelector(".hm-legend-countries"),this.legendDivisions=this.root.querySelector(".hm-legend-divisions"),this.tooltip=this.root.querySelector(".hm-tooltip"),this.tooltipCountry=this.root.querySelector(".hm-tt-country"),this.tooltipName=this.root.querySelector(".hm-tt-name"),this.tooltipSub=this.root.querySelector(".hm-tt-sub"),this.card=this.root.querySelector(".hm-card"),this.cardSwatch=this.root.querySelector(".hm-swatch"),this.cardName=this.root.querySelector(".hm-card-name"),this.cardEn=this.root.querySelector(".hm-card-en"),this.cardCode=this.root.querySelector(".hm-card-code"),this.cardCount=this.root.querySelector(".hm-card-count"),this.loading=this.root.querySelector(".hm-loading"),this.progressBar=this.root.querySelector(".hm-progress i"),this.loadingPercent=this.root.querySelector(".hm-loading small"),this.errorBox=this.root.querySelector(".hm-error"),this.errorText=this.root.querySelector(".hm-error-text"),this.live=this.root.querySelector(".hm-live"),this.frame.style.setProperty("--hm-height",ft(this.options.height)),this.plateKicker.textContent=this.options.kicker||K.kicker,this.titleEl.textContent=this.options.title||"世界政治地图",this.subtitleEl.textContent=this.options.subtitle||"WORLD POLITICAL MAP",this.plate.hidden=!this.options.showTitle||this.options.title==="none",this.root.querySelector(".hm-compass").hidden=!this.options.showCompass,this.legend.hidden=!this.options.showLegend,document.fullscreenEnabled||(this.root.querySelector(".hm-full").hidden=!0),this.options.interactive||(this.toolbar.hidden=!0,this.hintEl.hidden=!0),this.hintTimer=window.setTimeout(()=>this.dismissHint(),6e3)}bindEvents(){const t=this.canvas;t.addEventListener("pointerdown",this.bound.pointerDown),t.addEventListener("pointermove",this.bound.pointerMove),t.addEventListener("pointerup",this.bound.pointerUp),t.addEventListener("pointercancel",this.bound.pointerCancel),t.addEventListener("pointerleave",this.bound.pointerLeave),t.addEventListener("wheel",this.bound.wheel,{passive:!1}),t.addEventListener("dblclick",this.bound.doubleClick),t.addEventListener("keydown",this.bound.keyDown),this.toolbar.addEventListener("click",this.bound.toolbarClick),this.root.querySelector(".hm-card-close").addEventListener("click",this.bound.cardClose),this.root.querySelector(".hm-retry").addEventListener("click",this.bound.retry),document.addEventListener("fullscreenchange",this.bound.fullscreenChange)}observeResize(){if(typeof ResizeObserver>"u"){this.windowResize=()=>this.resize(),window.addEventListener("resize",this.windowResize);return}this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(this.frame)}makeGrain(){const e=document.createElement("canvas");e.width=180,e.height=180;const i=e.getContext("2d"),s=i.createImageData(180,180);for(let r=0;r<s.data.length;r+=4){const a=118+Math.floor(Math.random()*118);s.data[r]=a,s.data[r+1]=a,s.data[r+2]=a,s.data[r+3]=Math.floor(Math.random()*24)}i.putImageData(s,0,0),this.frame.style.setProperty("--hm-grain",`url(${e.toDataURL("image/png")})`)}async load(){if(!this.destroyed){this.ready=!1,this.frame.dataset.busy="true",this.loading.hidden=!1,this.loading.classList.remove("is-done"),this.errorBox.hidden=!0,this.progressBar.style.width="0%",this.loadingPercent.textContent="0%";try{const t=await jt(this.src,e=>{if(this.destroyed)return;const i=Math.round(e*100);this.progressBar.style.width=`${i}%`,this.loadingPercent.textContent=`${i}%`});if(this.destroyed)return;this.prepare(t),this.ready=!0,this.frame.dataset.busy="false",this.resize(),this.applyInitialView(),this.updateChrome(),this.updateToolbar(),this.dismissHint(),this.pendingReveal=!0,this.invalidateQuality()}catch(t){if(this.destroyed)return;this.frame.dataset.busy="false",this.loading.hidden=!0,this.errorBox.hidden=!1,this.errorText.textContent=(t==null?void 0:t.message)||"地图加载失败",console.error("[hoi4-map]",t)}}}prepare(t){var h;if(!t||!Array.isArray(t.arcs)||!Array.isArray(t.divisions))throw new Error("地图 JSON 格式不正确");this.data=t,this.arcs=t.arcs.map(mt),this.fillGroups.clear(),this.countryPathCache.clear(),this.hoverDivision=null,this.hoverCountry=null,this.selectedCountry=null,this.countryByCode=new Map(t.countries.map(c=>[c.code,c]));const e=new Map,i={cols:ut,rows:1,cell:t.meta.width/ut,cells:[]};i.rows=Math.ceil(t.meta.height/i.cell),i.cells=Array.from({length:i.cols*i.rows},()=>[]);const s=new Set(t.countries.filter(c=>c.hidden).map(c=>c.code)),r=new Set,a=new Path2D;for(const c of t.divisions){const d=this.ringsForDivision(c);if(!d.length)continue;const g=this.pathFromRings(d),u=this.boundsOfRings(d);if(c._rings=d,c._path=g,c._bbox=u,s.has(c.country))a.addPath(g);else{const v=this.options.showProvinceShading?c.color:((h=this.countryByCode.get(c.country))==null?void 0:h.color)||c.color;let C=this.fillGroups.get(v);C||(C=new Path2D,this.fillGroups.set(v,C)),C.addPath(g);for(const F of c.polygons||[])for(const L of F)for(const z of L)r.add(z<0?~z:z)}const f=y(Math.floor((u[0]-t.meta.width*0)/i.cell),0,i.cols-1),_=y(Math.floor(u[2]/i.cell),0,i.cols-1),M=y(Math.floor(u[1]/i.cell),0,i.rows-1),T=y(Math.floor(u[3]/i.cell),0,i.rows-1);for(let v=M;v<=T;v++)for(let C=f;C<=_;C++)i.cells[v*i.cols+C].push(c);e.set(c.id,c)}this.grid=i,this.byDivision=e,this.hiddenProvincePath=a,this.labelCountries=t.countries.filter(c=>!c.hidden).sort((c,d)=>d.area-c.area);const l=c=>(c||[]).filter(d=>r.has(d));this.coastPath=this.pathFromArcList(l(t.coast)),this.borderPath=this.pathFromArcList(l(t.borders)),this.graticulePath=this.pathFromGraticule(t.graticule||[]),this.divisionBorderPath=null,this.detailBorderPath=null,this.detailCountryCodes=[];const o=new Set([...t.coast||[],...t.borders||[]]),p=new Set(this.options.detailCountries||t.meta.detailCountries||[]);if(this.detailCountryCodes=[...p],this.outlineCountryCodes=[...new Set(this.options.outlineCountries||t.meta.outlineCountries||[])],this.options.showDivisionBorders){const c=new Set;for(const d of t.divisions)if(!s.has(d.country))for(const g of d.polygons||[])for(const u of g)for(const w of u){const f=w<0?~w:w;o.has(f)||c.add(f)}this.divisionBorderPath=this.pathFromArcList([...c])}else if(p.size){const c=new Set;for(const d of t.divisions)if(!(s.has(d.country)||!p.has(d.country)))for(const g of d.polygons||[])for(const u of g)for(const w of u){const f=w<0?~w:w;o.has(f)||c.add(f)}c.size&&(this.detailBorderPath=this.pathFromArcList([...c]))}this.countryPaths=new Map,this.countryFillPaths=new Map;for(const c of t.countries){if(c._labelCenter=this.computeCountryCenter(c),c.hidden)continue;const d=this.pathFromArcList(c.arcs||[]);this.countryPaths.set(c.code,d),this.countryFillPaths.set(c.code,this.pathFromArcRings(c.arcs||[]))}}computeCountryCenter(t){var p,h;const e=t.bbox||t.label;if(!e||e.length<4)return t.label||[0,0];const i=[];for(const c of t.divisions||[]){const d=(p=this.byDivision)==null?void 0:p.get(c);(h=d==null?void 0:d._rings)!=null&&h.length&&d._bbox&&i.push(d)}const s=(e[0]+e[2])/2,r=(e[1]+e[3])/2;if(this.countryContainsPoint(i,s,r))return[s,r];let a=0,l=0,o=0;for(const c of i){const d=c._bbox,g=Math.max(0,(d[2]-d[0])*(d[3]-d[1]));g&&(a+=g,l+=(d[0]+d[2])/2*g,o+=(d[1]+d[3])/2*g)}if(a>0){const c=l/a,d=o/a;if(this.countryContainsPoint(i,c,d))return[c,d]}return t.label||[s,r]}countryContainsPoint(t,e,i){for(const s of t)if(this.pointInRings(s._rings,e,i))return!0;return!1}ringsForDivision(t){const e=[];for(const i of t.polygons||[])for(const s of i){const r=[];for(const a of s){const l=a<0?~a:a,o=this.arcs[l];if(!(!o||o.length===0))if(a<0)for(let p=o.length-1;p>=0;p--)this.pushPoint(r,o[p]);else for(let p=0;p<o.length;p++)this.pushPoint(r,o[p])}if(r.length>1){const a=r[0],l=r[r.length-1];a[0]===l[0]&&a[1]===l[1]&&r.pop()}r.length>=3&&e.push(r)}return e}pushPoint(t,e){const i=t[t.length-1];i&&i[0]===e[0]&&i[1]===e[1]||t.push(e)}pathFromRings(t){const e=new Path2D;for(const i of t){e.moveTo(i[0][0],i[0][1]);for(let s=1;s<i.length;s++)e.lineTo(i[s][0],i[s][1]);e.closePath()}return e}pathFromArcList(t){const e=new Path2D;for(const i of t){const s=this.arcs[i];if(!(!s||s.length<2)){e.moveTo(s[0][0],s[0][1]);for(let r=1;r<s.length;r++)e.lineTo(s[r][0],s[r][1])}}return e}pathFromArcRings(t){const e=new Path2D,i=[];for(const a of t){const l=a<0?~a:a,o=this.arcs[l];if(!o||o.length<2)continue;const p=a<0?[...o].reverse():o,h=p[0],c=p[p.length-1];i.push({points:p,a:`${h[0]},${h[1]}`,b:`${c[0]},${c[1]}`})}const s=new Map;for(const a of i)for(const l of[a.a,a.b])s.has(l)||s.set(l,[]),s.get(l).push(a);const r=new Set;for(const a of i){if(r.has(a))continue;const l=a.a;let o=l,p=a;for(e.moveTo(p.points[0][0],p.points[0][1]);p;){r.add(p);const h=p.a===o?p.points:[...p.points].reverse();for(let c=1;c<h.length;c++)e.lineTo(h[c][0],h[c][1]);if(o=p.a===o?p.b:p.a,o===l)break;p=(s.get(o)||[]).find(c=>!r.has(c))}e.closePath()}return e}pathFromGraticule(t){const e=new Path2D;for(const i of t){const s=mt(i);if(!(s.length<2)){e.moveTo(s[0][0],s[0][1]);for(let r=1;r<s.length;r++)e.lineTo(s[r][0],s[r][1])}}return e}boundsOfRings(t){let e=1/0,i=1/0,s=-1/0,r=-1/0;for(const a of t)for(const[l,o]of a)l<e&&(e=l),o<i&&(i=o),l>s&&(s=l),o>r&&(r=o);return[e,i,s,r]}resize(){if(this.destroyed)return;const t=this.frame.getBoundingClientRect();if(t.width<2||t.height<2)return;if(this.ready&&this.data&&this.explicitHeightPx&&document.fullscreenElement!==this.frame){const h=this.data.meta.width/this.data.meta.height,c=t.width<760?Math.round(Math.max(280,Math.min(this.explicitHeightPx,t.width/h+128))):Math.round(this.explicitHeightPx);if(Math.abs(t.height-c)>2){this.frame.style.setProperty("--hm-height",`${c}px`);return}}const e=this.fitScale,i=this.scale,s=this.viewW,r=this.viewH,a=e?(s/2-this.tx)/i:0,l=e?(r/2-this.ty)/i:0;this.viewW=Math.max(2,this.frame.clientWidth),this.viewH=Math.max(2,this.frame.clientHeight),this.dpr=y(window.devicePixelRatio||1,1,2),this.canvas.width=Math.max(1,Math.round(this.viewW*this.dpr)),this.canvas.height=Math.max(1,Math.round(this.viewH*this.dpr)),this.ctx=this.canvas.getContext("2d"),this.snapMargin=Math.round(Math.min(this.viewW,this.viewH)*.32);const o=Math.round((this.viewW+this.snapMargin*2)*this.dpr),p=Math.round((this.viewH+this.snapMargin*2)*this.dpr);if(this.mapCanvas||(this.mapCanvas=document.createElement("canvas")),this.mapCanvas.width=Math.max(1,o),this.mapCanvas.height=Math.max(1,p),this.mapCtx=this.mapCanvas.getContext("2d"),this.snapshot=null,this.buildOcean(),this.ready&&this.data){if(this.fitScale=this.computeFitScale(),e>0&&i>0){const h=i/e;this.scale=y(this.fitScale*h,this.fitScale*D,this.fitScale*E),this.tx=this.viewW/2-a*this.scale,this.ty=this.viewH/2-l*this.scale}else this.scale=this.fitScale,this.tx=(this.viewW-this.data.meta.width*this.scale)/2,this.ty=(this.viewH-this.data.meta.height*this.scale)/2;this.clampTransform(),this.updateToolbar(),this.invalidateQuality()}else this.renderEmpty()}setHeight(t){this.options.height=t,this.explicitHeightPx=gt(t),this.frame.style.setProperty("--hm-height",ft(t)),this.resize()}contentBounds(){if(!this.data)return[0,0,1,1];const t=[0,0,this.data.meta.width,this.data.meta.height];let e=1/0,i=1/0,s=-1/0,r=-1/0;for(const a of this.data.countries||[]){if(a.hidden)continue;const l=a.bbox;!l||l.length<4||l[2]>l[0]&&l[3]>l[1]&&(e=Math.min(e,l[0]),i=Math.min(i,l[1]),s=Math.max(s,l[2]),r=Math.max(r,l[3]))}return Number.isFinite(e)?[e,i,s,r]:t}computeFitScale(){if(!this.data)return 1;const t=this.contentBounds(),e=Math.max(1,t[2]-t[0]),i=Math.max(1,t[3]-t[1]);return(this.options.fit==="cover"?Math.max(this.viewW/e,this.viewH/i):Math.min(this.viewW/e,this.viewH/i))*(this.options.fit==="cover"?1.01:.965)}fitContent(t=!0){this.ready&&(this.fitScale=this.computeFitScale(),this.resetView(t))}applyInitialView(){if(!this.ready)return;this.fitScale=this.computeFitScale();const t=Number(this.options.zoom)||0,e=this.options.focus;if(e)this.focusOn(e,t||2.6);else if(t>D){this.scale=y(this.fitScale*t,this.fitScale*D,this.fitScale*E);const i=this.contentBounds();this.tx=this.viewW/2-(i[0]+i[2])/2*this.scale,this.ty=this.viewH/2-(i[1]+i[3])/2*this.scale,this.clampTransform()}else this.resetView(!1);this.updateToolbar()}resetView(t=!0){if(!this.ready)return;this.scale=this.fitScale;const e=this.contentBounds();this.tx=this.viewW/2-(e[0]+e[2])/2*this.scale,this.ty=this.viewH/2-(e[1]+e[3])/2*this.scale,this.updateToolbar(),this.invalidateFast(),this.scheduleQuality(100),t&&this.dismissHint()}focusOn(t,e=2.6){if(!this.ready)return!1;let i=this.countryByCode.get(t);if(!i){const u=this.byDivision.get(t);u&&(i=this.countryByCode.get(u.country))}if(!i)return this.resetView(!1),!1;const[s,r,a,l]=i.bbox,o=i._labelCenter||i.label,p=Number.isFinite(o==null?void 0:o[0])?o[0]:(s+a)/2,h=Number.isFinite(o==null?void 0:o[1])?o[1]:(r+l)/2,c=Math.max(a-s,l-r);let d=Math.max(1.2,Math.min(E,e));if(c>0&&c<220){const u=Math.min(this.viewW,this.viewH)*.5/(c*this.fitScale);d=Math.max(d,y(u,2.6,E))}const g=y(this.fitScale*d,this.fitScale*D,this.fitScale*E);return this.scale=g,this.tx=this.viewW/2-p*g,this.ty=this.viewH/2-h*g,this.clampTransform(),this.updateToolbar(),this.invalidateFast(),this.scheduleQuality(100),!0}setView({focus:t="",zoom:e=0}={}){return t?this.focusOn(t,Number(e)||2.6):Number(e)>1?(this.scale=y(this.fitScale*Number(e),this.fitScale*D,this.fitScale*E),this.tx=this.viewW/2-this.data.meta.width*this.scale/2,this.ty=this.viewH/2-this.data.meta.height*this.scale/2,this.clampTransform(),this.updateToolbar(),this.invalidateFast(),this.scheduleQuality(100),!0):(this.resetView(),!0)}clampTransform(){if(!this.data)return;const t=this.data.meta.width*this.scale,e=this.data.meta.height*this.scale;t<=this.viewW?this.tx=(this.viewW-t)/2:this.tx=y(this.tx,this.viewW-t,0),e<=this.viewH?this.ty=(this.viewH-e)/2:this.ty=y(this.ty,this.viewH-e,0)}zoomAt(t,e,i){if(!this.ready)return;const s=y(t,this.fitScale*D,this.fitScale*E);if(Math.abs(s-this.scale)<1e-9)return;const r=(e-this.tx)/this.scale,a=(i-this.ty)/this.scale;this.scale=s,this.tx=e-r*s,this.ty=i-a*s,this.clampTransform(),this.updateToolbar(),this.invalidateFast(),this.scheduleQuality(180),this.dismissHint()}updateToolbar(){if(!this.zoomLabel)return;const t=this.fitScale?Math.round(this.scale/this.fitScale*100):100;this.zoomLabel.textContent=`${t}%`,this.frame.dataset.zoomed=this.scale>this.fitScale*1.01?"true":"false",this.canvas&&(this.canvas.style.touchAction=this.scale>this.fitScale*1.01?"none":"pan-y");const e=this.root.querySelector('[data-action="zoom-out"]'),i=this.root.querySelector('[data-action="zoom-in"]');e&&(e.disabled=this.scale<=this.fitScale*D*1.001),i&&(i.disabled=this.scale>=this.fitScale*E*.999)}updateChrome(){if(!this.data)return;const t=this.data.meta;this.titleEl.textContent=this.options.title||t.title||"世界政治地图",this.subtitleEl.textContent=this.options.subtitle||t.titleEn||"WORLD POLITICAL MAP",this.legendCountries.textContent=`${t.countries} 国家`,this.legendDivisions.textContent=`${t.divisions.toLocaleString("zh-CN")} 一级行政区`,this.canvas.setAttribute("aria-label",`可缩放的世界政治地图，${t.countries} 个国家，${t.divisions} 个一级行政区`)}buildOcean(){const t=Math.max(1,Math.round(this.viewW*this.dpr)),e=Math.max(1,Math.round(this.viewH*this.dpr));this.oceanCanvas||(this.oceanCanvas=document.createElement("canvas")),(this.oceanCanvas.width!==t||this.oceanCanvas.height!==e)&&(this.oceanCanvas.width=t,this.oceanCanvas.height=e);const i=this.oceanCanvas.getContext("2d");i.setTransform(this.dpr,0,0,this.dpr,0,0),i.clearRect(0,0,this.viewW,this.viewH);const s=i.createLinearGradient(0,0,0,this.viewH);s.addColorStop(0,"#13242c"),s.addColorStop(.46,"#0d1a20"),s.addColorStop(1,"#071014"),i.fillStyle=s,i.fillRect(0,0,this.viewW,this.viewH);const r=i.createRadialGradient(this.viewW*.5,this.viewH*.38,0,this.viewW*.5,this.viewH*.42,Math.max(this.viewW,this.viewH)*.72);r.addColorStop(0,"rgba(65, 105, 118, 0.26)"),r.addColorStop(.48,"rgba(26, 50, 60, 0.12)"),r.addColorStop(1,"rgba(0, 0, 0, 0)"),i.fillStyle=r,i.fillRect(0,0,this.viewW,this.viewH);const a=Math.round(this.viewW*this.viewH/900);for(let l=0;l<a;l++){const o=Math.random()*this.viewW,p=Math.random()*this.viewH;i.fillStyle=`rgba(174, 204, 210, ${.012+Math.random()*.022})`,i.fillRect(o,p,1,1)}i.lineWidth=.7;for(let l=0;l<18;l++){const o=Math.random()*this.viewH,p=Math.random()*this.viewW,h=30+Math.random()*150;i.beginPath(),i.strokeStyle=`rgba(142, 178, 188, ${.012+Math.random()*.018})`,i.moveTo(p,o),i.bezierCurveTo(p+h*.3,o-5,p+h*.7,o+5,p+h,o),i.stroke()}}renderEmpty(){this.ctx&&(this.ctx.setTransform(this.dpr,0,0,this.dpr,0,0),this.ctx.clearRect(0,0,this.viewW,this.viewH),this.oceanCanvas&&this.ctx.drawImage(this.oceanCanvas,0,0,this.viewW,this.viewH))}invalidateFast(){this.destroyed||(this.qualityRaf&&(cancelAnimationFrame(this.qualityRaf),this.qualityRaf=0),!this.fastRaf&&(this.fastRaf=requestAnimationFrame(()=>{this.fastRaf=0,this.renderFast()})))}invalidateQuality(){this.destroyed||(this.fastRaf&&(cancelAnimationFrame(this.fastRaf),this.fastRaf=0),!this.qualityRaf&&(this.qualityRaf=requestAnimationFrame(()=>{this.qualityRaf=0,this.renderQuality()})))}invalidate(){this.invalidateFast()}scheduleQuality(t=180){this.destroyed||(this.settleTimer&&clearTimeout(this.settleTimer),this.settleTimer=window.setTimeout(()=>{if(this.settleTimer=0,this.pointers.size||this.dragging){this.scheduleQuality(120);return}this.invalidateQuality()},t))}drawOcean(t){t.setTransform(this.dpr,0,0,this.dpr,0,0),t.clearRect(0,0,this.viewW,this.viewH),this.oceanCanvas&&t.drawImage(this.oceanCanvas,0,0,this.viewW,this.viewH)}render(){this.renderQuality()}renderQuality(){if(this.destroyed||!this.ctx||(this.drawOcean(this.ctx),this.drawGraticule(this.ctx),!this.ready||!this.data||!this.mapCtx))return;const t=this.mapCtx,e=this.snapMargin;t.setTransform(this.dpr,0,0,this.dpr,0,0),t.clearRect(0,0,this.viewW+e*2,this.viewH+e*2),this.drawMap(t,this.tx+e,this.ty+e),this.snapshot={scale:this.scale,tx:this.tx+e,ty:this.ty+e,w:this.viewW+e*2,h:this.viewH+e*2},this.ctx.setTransform(this.dpr,0,0,this.dpr,0,0),this.ctx.drawImage(this.mapCanvas,e*this.dpr,e*this.dpr,this.viewW*this.dpr,this.viewH*this.dpr,0,0,this.viewW,this.viewH),this.drawLabels(this.ctx),this.drawOverlays(this.ctx),this.revealMap()}revealMap(){!this.pendingReveal||this.destroyed||(this.pendingReveal=!1,this.loading.classList.add("is-done"),window.setTimeout(()=>{this.destroyed||(this.loading.hidden=!0)},520))}renderFast(){if(this.destroyed||!this.ctx)return;if(this.drawOcean(this.ctx),this.drawGraticule(this.ctx),!this.ready||!this.data||!this.mapCanvas||!this.snapshot){this.renderQuality();return}const t=this.scale/this.snapshot.scale,e=this.tx-this.snapshot.tx*t,i=this.ty-this.snapshot.ty*t;this.ctx.setTransform(this.dpr,0,0,this.dpr,0,0),this.ctx.imageSmoothingEnabled=!0,this.ctx.drawImage(this.mapCanvas,e,i,this.snapshot.w*t,this.snapshot.h*t),this.drawLabels(this.ctx),this.drawOverlays(this.ctx)}drawGraticule(t){!this.options.showGraticule||!this.graticulePath||!this.ready||(t.save(),t.setTransform(this.dpr*this.scale,0,0,this.dpr*this.scale,this.dpr*this.tx,this.dpr*this.ty),t.lineWidth=.75/this.scale,t.strokeStyle="rgba(126, 164, 176, 0.12)",t.stroke(this.graticulePath),t.restore())}drawMap(t,e=this.tx,i=this.ty){const s=this.scale;t.save(),t.setTransform(this.dpr*s,0,0,this.dpr*s,this.dpr*e,this.dpr*i),t.lineJoin="round",t.lineCap="round";const r=this.scale/this.fitScale;if(this.coastPath&&r>1.18){const l=y(.45+r*.1,.45,1),o=[[4.5,"rgba(201, 168, 106, 0.018)"],[2.5,"rgba(0, 4, 6, 0.08)"],[1.3,"rgba(0, 3, 5, 0.12)"],[.65,"rgba(0, 2, 4, 0.18)"]];for(const[p,h]of o)t.lineWidth=p*l/s,t.strokeStyle=h,t.stroke(this.coastPath)}for(const l of this.data.countries){if(l.hidden)continue;const o=this.countryFillPaths.get(l.code);o&&(t.fillStyle=l.color,t.fill(o,"evenodd"))}for(const[l,o]of this.fillGroups)t.fillStyle=l,t.fill(o);this.hiddenProvincePath&&(t.fillStyle="rgba(155, 160, 152, 0.055)",t.fill(this.hiddenProvincePath),t.setLineDash([3/s,3/s]),t.lineWidth=.7/s,t.strokeStyle="rgba(210, 196, 168, 0.24)",t.stroke(this.hiddenProvincePath),t.setLineDash([])),this.detailBorderPath&&s>this.fitScale*1.55&&(t.lineWidth=.55/s,t.strokeStyle="rgba(18, 15, 11, 0.42)",t.stroke(this.detailBorderPath)),this.divisionBorderPath&&(t.lineWidth=.7/s,t.strokeStyle="rgba(18, 15, 11, 0.52)",t.stroke(this.divisionBorderPath)),this.coastPath&&(t.lineWidth=1.25/s,t.strokeStyle="rgba(7, 7, 5, 0.95)",t.stroke(this.coastPath)),this.borderPath&&(t.lineWidth=1.55/s,t.strokeStyle="rgba(22, 16, 10, 0.93)",t.stroke(this.borderPath),t.lineWidth=.55/s,t.strokeStyle="rgba(238, 215, 168, 0.10)",t.stroke(this.borderPath));const a=[...new Set([...this.detailCountryCodes,...this.outlineCountryCodes])];if(a.length){t.lineWidth=1.8/s,t.strokeStyle="rgba(7, 7, 5, 0.96)";for(const l of a){const o=this.countryPaths.get(l);o&&t.stroke(o)}}t.restore()}drawOverlays(t){if(!this.ready)return;const e=this.scale;if(t.save(),t.setTransform(this.dpr*e,0,0,this.dpr*e,this.dpr*this.tx,this.dpr*this.ty),t.lineJoin="round",t.lineCap="round",this.hoverCountry){const i=this.countryPaths.get(this.hoverCountry);i&&(t.lineWidth=2.1/e,t.strokeStyle="rgba(239, 211, 154, 0.3)",t.stroke(i))}if(this.hoverDivision&&!this.dragging){const i=this.hoverDivision;i._path&&(t.fillStyle="rgba(255, 240, 204, 0.18)",t.fill(i._path),t.lineWidth=1.15/e,t.strokeStyle="rgba(255, 238, 196, 0.68)",t.stroke(i._path))}if(this.selectedCountry){const i=this.countryPaths.get(this.selectedCountry);i&&(t.lineWidth=8/e,t.strokeStyle="rgba(234, 203, 140, 0.15)",t.stroke(i),t.lineWidth=1.8/e,t.strokeStyle="rgba(247, 226, 175, 0.92)",t.stroke(i))}t.restore()}drawLabels(t){if(!this.ready||!this.data)return;const e=this.scale/this.fitScale;if(e<1.32)return;const i=Ut(1.32,2.05,e),s=Math.max(6,Math.round(this.viewW*this.viewH/16e3)),r=Math.min(s,e<1.9?16:e<2.8?34:e<4.5?55:80),a=[];let l=0;const o=this.frame.getBoundingClientRect(),p=[];for(const h of[this.plate,this.toolbar,this.legend]){if(!h||h.hidden)continue;const c=h.getBoundingClientRect();c.width<1||c.height<1||p.push({x:c.left-o.left-8,y:c.top-o.top-8,w:c.width+16,h:c.height+16})}t.setTransform(this.dpr,0,0,this.dpr,0,0),t.textAlign="center",t.textBaseline="middle",t.lineJoin="round";for(const h of this.labelCountries){if(l>=r)break;const c=h.bbox,d=c[0]*this.scale+this.tx,g=c[1]*this.scale+this.ty,u=c[2]*this.scale+this.tx,w=c[3]*this.scale+this.ty;if(u<-30||d>this.viewW+30||w<-20||g>this.viewH+20)continue;const f=u-d,_=w-g;if(f<26||_<11)continue;const M=h._labelCenter||h.label,T=M[0]*this.scale+this.tx,v=M[1]*this.scale+this.ty;if(T<16||T>this.viewW-16||v<16||v>this.viewH-16)continue;const C=Math.min(15,11+e*.55),F=`600 ${C}px "Noto Serif SC", "Songti SC", "STSong", "SimSun", Georgia, serif`;t.font=F;const L=h.nameZh||h.name,z=t.measureText(L).width;if(z>Math.max(f*1.45,48)&&e<4.5||e<5&&L.length>6&&f<160)continue;const k={x:T-z/2-4,y:v-C*.75-3,w:z+8,h:C*1.5+6};k.x<2||k.x+k.w>this.viewW-2||k.y<2||k.y+k.h>this.viewH-2||p.some(R=>k.x<R.x+R.w&&k.x+k.w>R.x&&k.y<R.y+R.h&&k.y+k.h>R.y)||a.some(R=>k.x<R.x+R.w&&k.x+k.w>R.x&&k.y<R.y+R.h&&k.y+k.h>R.y)||(a.push(k),t.save(),t.globalAlpha=i*(e>2.4?.92:.74),"letterSpacing"in t&&(t.letterSpacing="1.4px"),t.strokeStyle="rgba(3, 7, 9, 0.82)",t.lineWidth=3.4,t.strokeText(L,T,v),t.fillStyle="#f2e8d3",t.fillText(L,T,v),e>2.9&&f>84&&h.name&&(t.globalAlpha=i*.45,t.font='8px Georgia, "Times New Roman", serif',"letterSpacing"in t&&(t.letterSpacing="2.2px"),t.fillStyle="#e4d6b9",t.fillText(h.name.toUpperCase(),T,v+C*.98)),t.restore(),l++)}}pick(t,e){if(!this.grid||!this.data)return null;const{cols:i,rows:s,cell:r,cells:a}=this.grid;if(t<0||e<0||t>this.data.meta.width||e>this.data.meta.height)return null;const l=y(Math.floor(t/r),0,i-1),o=y(Math.floor(e/r),0,s-1),p=a[o*i+l];for(let h=p.length-1;h>=0;h--){const c=p[h],d=c._bbox;if(!(!d||t<d[0]||t>d[2]||e<d[1]||e>d[3])&&this.pointInRings(c._rings,t,e))return c}return null}pointInRings(t,e,i){let s=!1;for(const r of t)for(let a=0,l=r.length-1;a<r.length;l=a++){const o=r[a][0],p=r[a][1],h=r[l][0],c=r[l][1];p>i!=c>i&&e<(h-o)*(i-p)/(c-p||1e-9)+o&&(s=!s)}return s}canvasPoint(t,e){const i=this.canvas.getBoundingClientRect();return{x:t-i.left,y:e-i.top}}worldPoint(t,e){return{x:(t-this.tx)/this.scale,y:(e-this.ty)/this.scale}}onPointerDown(t){if(!this.ready||!this.options.interactive||t.pointerType==="mouse"&&t.button!==0)return;this.scale<=this.fitScale*1.001&&t.pointerType!=="mouse"||t.preventDefault(),this.canvas.focus({preventScroll:!0}),this.dismissHint(),this.hideTooltip();try{this.canvas.setPointerCapture(t.pointerId)}catch{}if(this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY}),this.pointers.size===1)this.drag={x:t.clientX,y:t.clientY,tx:this.tx,ty:this.ty,moved:!1,time:performance.now()},this.pinch=null,this.setDragging(!1);else if(this.pointers.size===2){const[i,s]=[...this.pointers.values()];this.drag=null,this.pinch={distance:Math.hypot(i.x-s.x,i.y-s.y)||1,scale:this.scale,tx:this.tx,ty:this.ty,midX:(i.x+s.x)/2,midY:(i.y+s.y)/2},this.setDragging(!0)}}onPointerMove(t){if(!this.pointers.has(t.pointerId)){this.ready&&!this.dragging&&t.pointerType!=="touch"&&this.updateHover(t);return}if(this.pointers.set(t.pointerId,{x:t.clientX,y:t.clientY}),this.pointers.size===2&&this.pinch){const[e,i]=[...this.pointers.values()],s=Math.hypot(e.x-i.x,e.y-i.y)||1,r=(e.x+i.x)/2,a=(e.y+i.y)/2,l=y(this.pinch.scale*(s/this.pinch.distance),this.fitScale*D,this.fitScale*E),o=this.canvas.getBoundingClientRect(),p=this.pinch.midX-o.left,h=this.pinch.midY-o.top,c=(p-this.pinch.tx)/this.pinch.scale,d=(h-this.pinch.ty)/this.pinch.scale;this.scale=l,this.tx=r-o.left-c*l,this.ty=a-o.top-d*l,this.clampTransform(),this.updateToolbar(),this.invalidateFast(),this.scheduleQuality(220);return}if(this.drag&&this.pointers.size===1){const e=t.clientX-this.drag.x,i=t.clientY-this.drag.y;Math.abs(e)+Math.abs(i)>3&&(this.drag.moved=!0),this.tx=this.drag.tx+e,this.ty=this.drag.ty+i,this.clampTransform(),this.setDragging(!0),this.invalidateFast(),this.scheduleQuality(220)}}onPointerUp(t,e=!1){if(!this.pointers.has(t.pointerId))return;this.pointers.delete(t.pointerId);try{this.canvas.hasPointerCapture(t.pointerId)&&this.canvas.releasePointerCapture(t.pointerId)}catch{}const i=!!this.pinch;if(this.pointers.size===0){const s=this.drag;this.drag=null,this.pinch=null,this.setDragging(!1),this.scheduleQuality(90),!e&&!i&&s&&!s.moved&&performance.now()-s.time<650&&this.onClick(t);return}if(this.pointers.size===1){const[s]=[...this.pointers.values()];this.pinch=null,this.drag={x:s.x,y:s.y,tx:this.tx,ty:this.ty,moved:!0,time:performance.now()},this.setDragging(!0)}}onPointerLeave(){this.pointers.size||this.hideTooltip()}setDragging(t){this.dragging=t,this.frame.dataset.dragging=t?"true":"false",t&&this.hideTooltip()}onClick(t){const e=this.canvasPoint(t.clientX,t.clientY),i=this.worldPoint(e.x,e.y),s=this.pick(i.x,i.y);s?typeof this.options.onDivisionClick=="function"?this.options.onDivisionClick(s,this):this.selectCountry(s.country):this.clearSelection()}onWheel(t){if(!this.ready||!this.options.interactive)return;this.dismissHint();let e=t.deltaY;if(t.deltaMode===1?e*=16:t.deltaMode===2&&(e*=this.viewH),this.scale<=this.fitScale*D*1.001&&e>0)return;t.preventDefault();const i=this.canvasPoint(t.clientX,t.clientY),s=Math.exp(-e*.0015);this.zoomAt(this.scale*s,i.x,i.y),this.updateHover(t)}onDoubleClick(t){if(!this.ready||!this.options.interactive)return;t.preventDefault();const e=this.canvasPoint(t.clientX,t.clientY);this.scale<=this.fitScale*1.05?this.zoomAt(this.fitScale*2.7,e.x,e.y):this.resetView()}onKeyDown(t){if(!this.ready||!this.options.interactive)return;const e=64;switch(t.key){case"+":case"=":t.preventDefault(),this.zoomAt(this.scale*1.3,this.viewW/2,this.viewH/2);break;case"-":case"_":t.preventDefault(),this.zoomAt(this.scale/1.3,this.viewW/2,this.viewH/2);break;case"0":case"Home":t.preventDefault(),this.resetView();break;case"ArrowLeft":t.preventDefault(),this.tx+=e,this.clampTransform(),this.invalidateFast(),this.scheduleQuality(140);break;case"ArrowRight":t.preventDefault(),this.tx-=e,this.clampTransform(),this.invalidateFast(),this.scheduleQuality(140);break;case"ArrowUp":t.preventDefault(),this.ty+=e,this.clampTransform(),this.invalidateFast(),this.scheduleQuality(140);break;case"ArrowDown":t.preventDefault(),this.ty-=e,this.clampTransform(),this.invalidateFast(),this.scheduleQuality(140);break;case"Escape":this.clearSelection(),this.hideTooltip();break}}onToolbarClick(t){const e=t.target.closest("[data-action]");if(!e||!this.ready)return;t.preventDefault();const i=e.dataset.action;i==="zoom-in"?this.zoomAt(this.scale*1.35,this.viewW/2,this.viewH/2):i==="zoom-out"?this.zoomAt(this.scale/1.35,this.viewW/2,this.viewH/2):i==="reset"?this.resetView():i==="fullscreen"&&this.toggleFullscreen()}toggleFullscreen(){var t,e,i;document.fullscreenEnabled&&(document.fullscreenElement===this.frame?(t=document.exitFullscreen)==null||t.call(document).catch(()=>{}):(i=(e=this.frame).requestFullscreen)==null||i.call(e).catch(()=>{}))}onFullscreenChange(){window.setTimeout(()=>this.resize(),80)}updateHover(t){if(!this.ready||this.dragging)return;const e=this.canvasPoint(t.clientX,t.clientY);if(e.x<0||e.y<0||e.x>this.viewW||e.y>this.viewH){this.hideTooltip();return}const i=this.worldPoint(e.x,e.y),s=this.pick(i.x,i.y);if(!s){this.hideTooltip();return}this.hoverDivision!==s&&(this.hoverDivision=s,this.hoverCountry=s.country,this.invalidate()),this.showTooltip(s,e.x,e.y)}showTooltip(t,e,i){const s=this.countryByCode.get(t.country);if(!s)return;this.tooltip.hidden=!1,this.tooltipCountry.textContent=`${s.code} · ${s.nameZh}`,this.tooltipName.textContent=t.nameZh||t.name,this.tooltipSub.textContent=`一级行政区 · ${s.name}`,this.tooltip.style.setProperty("--hm-tt-color",this.options.showProvinceShading?t.color:s.color),this.tooltip.classList.add("is-visible");const r=this.tooltip.offsetWidth,a=this.tooltip.offsetHeight;let l=e+16,o=i+16;l+r>this.viewW-8&&(l=e-r-14),o+a>this.viewH-8&&(o=i-a-14),l=y(l,8,Math.max(8,this.viewW-r-8)),o=y(o,8,Math.max(8,this.viewH-a-8)),this.tooltip.style.left=`${l}px`,this.tooltip.style.top=`${o}px`}hideTooltip(){this.tooltip.classList.remove("is-visible"),(this.hoverDivision||this.hoverCountry)&&(this.hoverDivision=null,this.hoverCountry=null,this.invalidate())}selectCountry(t){const e=this.countryByCode.get(t);e&&(this.selectedCountry=t,this.frame.dataset.selected="true",this.card.hidden=!1,this.cardSwatch.style.background=e.color,this.cardName.textContent=e.nameZh,this.cardEn.textContent=e.name,this.cardCode.textContent=e.code,this.cardCount.textContent=String(e.divisions.length),this.live.textContent=`已选择 ${e.nameZh}，${e.divisions.length} 个一级行政区`,this.invalidate())}clearSelection(){if(!this.selectedCountry){this.card.hidden=!0,this.frame.dataset.selected="false";return}this.selectedCountry=null,this.card.hidden=!0,this.frame.dataset.selected="false",this.live.textContent="已取消选择",this.invalidate()}dismissHint(){this.hintEl&&this.hintEl.classList.add("is-hidden"),this.hintTimer&&(clearTimeout(this.hintTimer),this.hintTimer=0)}destroy(){var e,i,s,r,a,l;if(this.destroyed)return;this.destroyed=!0,this.fastRaf&&cancelAnimationFrame(this.fastRaf),this.qualityRaf&&cancelAnimationFrame(this.qualityRaf),this.fastRaf=0,this.qualityRaf=0,this.settleTimer&&clearTimeout(this.settleTimer),this.hintTimer&&clearTimeout(this.hintTimer),this.resizeObserver&&this.resizeObserver.disconnect(),this.windowResize&&window.removeEventListener("resize",this.windowResize),document.removeEventListener("fullscreenchange",this.bound.fullscreenChange);const t=this.canvas;t&&(t.removeEventListener("pointerdown",this.bound.pointerDown),t.removeEventListener("pointermove",this.bound.pointerMove),t.removeEventListener("pointerup",this.bound.pointerUp),t.removeEventListener("pointercancel",this.bound.pointerCancel),t.removeEventListener("pointerleave",this.bound.pointerLeave),t.removeEventListener("wheel",this.bound.wheel),t.removeEventListener("dblclick",this.bound.doubleClick),t.removeEventListener("keydown",this.bound.keyDown)),(e=this.toolbar)==null||e.removeEventListener("click",this.bound.toolbarClick),(s=(i=this.root)==null?void 0:i.querySelector(".hm-card-close"))==null||s.removeEventListener("click",this.bound.cardClose),(a=(r=this.root)==null?void 0:r.querySelector(".hm-retry"))==null||a.removeEventListener("click",this.bound.retry),this.pointers.clear(),document.fullscreenElement===this.frame&&((l=document.exitFullscreen)==null||l.call(document).catch(()=>{})),this.host.__hoi4Map===this&&delete this.host.__hoi4Map,this.data&&(this.data=null)}}function nt(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var I=nt();function Tt(n){I=n}var q={exec:()=>null};function m(n,t=""){let e=typeof n=="string"?n:n.source,i={replace:(s,r)=>{let a=typeof r=="string"?r:r.source;return a=a.replace(S.caret,"$1"),e=e.replace(s,a),i},getRegex:()=>new RegExp(e,t)};return i}var Kt=((n="")=>{try{return!!new RegExp("(?<=1)(?<!1)"+n)}catch{return!1}})(),S={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:n=>new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}#`),htmlBeginRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}>`)},Jt=/^(?:[ \t]*(?:\n|$))+/,te=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ee=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Z=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,ie=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,rt=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,zt=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Rt=m(zt).replace(/bull/g,rt).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),se=m(zt).replace(/bull/g,rt).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ot=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ne=/^[^\n]+/,at=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,re=m(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",at).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),oe=m(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,rt).getRegex(),J="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",lt=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ae=m("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",lt).replace("tag",J).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Mt=m(ot).replace("hr",Z).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",J).getRegex(),le=m(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Mt).getRegex(),ht={blockquote:le,code:te,def:re,fences:ee,heading:ie,hr:Z,html:ae,lheading:Rt,list:oe,newline:Jt,paragraph:Mt,table:q,text:ne},bt=m("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Z).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",J).getRegex(),he={...ht,lheading:se,table:bt,paragraph:m(ot).replace("hr",Z).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",bt).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",J).getRegex()},ce={...ht,html:m(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",lt).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:q,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:m(ot).replace("hr",Z).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Rt).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},pe=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,de=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,$t=/^( {2,}|\\)\n(?!\s*$)/,ue=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,B=/[\p{P}\p{S}]/u,tt=/[\s\p{P}\p{S}]/u,ct=/[^\s\p{P}\p{S}]/u,fe=m(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,tt).getRegex(),Pt=/(?!~)[\p{P}\p{S}]/u,ge=/(?!~)[\s\p{P}\p{S}]/u,me=/(?:[^\s\p{P}\p{S}]|~)/u,be=m(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Kt?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Lt=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,xe=m(Lt,"u").replace(/punct/g,B).getRegex(),we=m(Lt,"u").replace(/punct/g,Pt).getRegex(),At="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",ye=m(At,"gu").replace(/notPunctSpace/g,ct).replace(/punctSpace/g,tt).replace(/punct/g,B).getRegex(),ke=m(At,"gu").replace(/notPunctSpace/g,me).replace(/punctSpace/g,ge).replace(/punct/g,Pt).getRegex(),ve=m("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ct).replace(/punctSpace/g,tt).replace(/punct/g,B).getRegex(),Se=m(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,B).getRegex(),Ce="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",Te=m(Ce,"gu").replace(/notPunctSpace/g,ct).replace(/punctSpace/g,tt).replace(/punct/g,B).getRegex(),ze=m(/\\(punct)/,"gu").replace(/punct/g,B).getRegex(),Re=m(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Me=m(lt).replace("(?:-->|$)","-->").getRegex(),$e=m("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Me).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),U=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,Pe=m(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label",U).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Et=m(/^!?\[(label)\]\[(ref)\]/).replace("label",U).replace("ref",at).getRegex(),Dt=m(/^!?\[(ref)\](?:\[\])?/).replace("ref",at).getRegex(),Le=m("reflink|nolink(?!\\()","g").replace("reflink",Et).replace("nolink",Dt).getRegex(),xt=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,pt={_backpedal:q,anyPunctuation:ze,autolink:Re,blockSkip:be,br:$t,code:de,del:q,delLDelim:q,delRDelim:q,emStrongLDelim:xe,emStrongRDelimAst:ye,emStrongRDelimUnd:ve,escape:pe,link:Pe,nolink:Dt,punctuation:fe,reflink:Et,reflinkSearch:Le,tag:$e,text:ue,url:q},Ae={...pt,link:m(/^!?\[(label)\]\((.*?)\)/).replace("label",U).getRegex(),reflink:m(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",U).getRegex()},et={...pt,emStrongRDelimAst:ke,emStrongLDelim:we,delLDelim:Se,delRDelim:Te,url:m(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",xt).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:m(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",xt).getRegex()},Ee={...et,br:m($t).replace("{2,}","*").getRegex(),text:m(et.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},X={normal:ht,gfm:he,pedantic:ce},O={normal:pt,gfm:et,breaks:Ee,pedantic:Ae},De={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},wt=n=>De[n];function A(n,t){if(t){if(S.escapeTest.test(n))return n.replace(S.escapeReplace,wt)}else if(S.escapeTestNoEncode.test(n))return n.replace(S.escapeReplaceNoEncode,wt);return n}function yt(n){try{n=encodeURI(n).replace(S.percentDecode,"%")}catch{return null}return n}function kt(n,t){var r;let e=n.replace(S.findPipe,(a,l,o)=>{let p=!1,h=l;for(;--h>=0&&o[h]==="\\";)p=!p;return p?"|":" |"}),i=e.split(S.splitPipe),s=0;if(i[0].trim()||i.shift(),i.length>0&&!((r=i.at(-1))!=null&&r.trim())&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(S.slashPipe,"|");return i}function H(n,t,e){let i=n.length;if(i===0)return"";let s=0;for(;s<i&&n.charAt(i-s-1)===t;)s++;return n.slice(0,i-s)}function vt(n){let t=n.split(`
`),e=t.length-1;for(;e>=0&&S.blankLine.test(t[e]);)e--;return t.length-e<=2?n:t.slice(0,e+1).join(`
`)}function He(n,t){if(n.indexOf(t[1])===-1)return-1;let e=0;for(let i=0;i<n.length;i++)if(n[i]==="\\")i++;else if(n[i]===t[0])e++;else if(n[i]===t[1]&&(e--,e<0))return i;return e>0?-2:-1}function _e(n,t=0){let e=t,i="";for(let s of n)if(s==="	"){let r=4-e%4;i+=" ".repeat(r),e+=r}else i+=s,e++;return i}function St(n,t,e,i,s){let r=t.href,a=t.title||null,l=n[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;let o={type:n[0].charAt(0)==="!"?"image":"link",raw:e,href:r,title:a,text:l,tokens:i.inlineTokens(l)};return i.state.inLink=!1,o}function qe(n,t,e){let i=n.match(e.other.indentCodeCompensation);if(i===null)return t;let s=i[1];return t.split(`
`).map(r=>{let a=r.match(e.other.beginningSpace);if(a===null)return r;let[l]=a;return l.length>=s.length?r.slice(s.length):r}).join(`
`)}var j=class{constructor(n){b(this,"options");b(this,"rules");b(this,"lexer");this.options=n||I}space(n){let t=this.rules.block.newline.exec(n);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(n){let t=this.rules.block.code.exec(n);if(t){let e=this.options.pedantic?t[0]:vt(t[0]),i=e.replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e,codeBlockStyle:"indented",text:i}}}fences(n){let t=this.rules.block.fences.exec(n);if(t){let e=t[0],i=qe(e,t[3]||"",this.rules);return{type:"code",raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(n){let t=this.rules.block.heading.exec(n);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let i=H(e,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(e=i.trim())}return{type:"heading",raw:H(t[0],`
`),depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(n){let t=this.rules.block.hr.exec(n);if(t)return{type:"hr",raw:H(t[0],`
`)}}blockquote(n){let t=this.rules.block.blockquote.exec(n);if(t){let e=H(t[0],`
`).split(`
`),i="",s="",r=[];for(;e.length>0;){let a=!1,l=[],o;for(o=0;o<e.length;o++)if(this.rules.other.blockquoteStart.test(e[o]))l.push(e[o]),a=!0;else if(!a)l.push(e[o]);else break;e=e.slice(o);let p=l.join(`
`),h=p.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${p}`:p,s=s?`${s}
${h}`:h;let c=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(h,r,!0),this.lexer.state.top=c,e.length===0)break;let d=r.at(-1);if((d==null?void 0:d.type)==="code")break;if((d==null?void 0:d.type)==="blockquote"){let g=d,u=g.raw+`
`+e.join(`
`),w=this.blockquote(u);r[r.length-1]=w,i=i.substring(0,i.length-g.raw.length)+w.raw,s=s.substring(0,s.length-g.text.length)+w.text;break}else if((d==null?void 0:d.type)==="list"){let g=d,u=g.raw+`
`+e.join(`
`),w=this.list(u);r[r.length-1]=w,i=i.substring(0,i.length-d.raw.length)+w.raw,s=s.substring(0,s.length-g.raw.length)+w.raw,e=u.substring(r.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:r,text:s}}}list(n){var e,i;let t=this.rules.block.list.exec(n);if(t){let s=t[1].trim(),r=s.length>1,a={type:"list",raw:"",ordered:r,start:r?+s.slice(0,-1):"",loose:!1,items:[]};s=r?`\\d{1,9}\\${s.slice(-1)}`:`\\${s}`,this.options.pedantic&&(s=r?s:"[*+-]");let l=this.rules.other.listItemRegex(s),o=!1;for(;n;){let h=!1,c="",d="";if(!(t=l.exec(n))||this.rules.block.hr.test(n))break;c=t[0],n=n.substring(c.length);let g=_e(t[2].split(`
`,1)[0],t[1].length),u=n.split(`
`,1)[0],w=!g.trim(),f=0;if(this.options.pedantic?(f=2,d=g.trimStart()):w?f=t[1].length+1:(f=g.search(this.rules.other.nonSpaceChar),f=f>4?1:f,d=g.slice(f),f+=t[1].length),w&&this.rules.other.blankLine.test(u)&&(c+=u+`
`,n=n.substring(u.length+1),h=!0),!h){let _=this.rules.other.nextBulletRegex(f),M=this.rules.other.hrRegex(f),T=this.rules.other.fencesBeginRegex(f),v=this.rules.other.headingBeginRegex(f),C=this.rules.other.htmlBeginRegex(f),F=this.rules.other.blockquoteBeginRegex(f);for(;n;){let L=n.split(`
`,1)[0],z;if(u=L,this.options.pedantic?(u=u.replace(this.rules.other.listReplaceNesting,"  "),z=u):z=u.replace(this.rules.other.tabCharGlobal,"    "),T.test(u)||v.test(u)||C.test(u)||F.test(u)||_.test(u)||M.test(u))break;if(z.search(this.rules.other.nonSpaceChar)>=f||!u.trim())d+=`
`+z.slice(f);else{if(w||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||T.test(g)||v.test(g)||M.test(g))break;d+=`
`+u}w=!u.trim(),c+=L+`
`,n=n.substring(L.length+1),g=z.slice(f)}}a.loose||(o?a.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(o=!0)),a.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),a.raw+=c}let p=a.items.at(-1);if(p)p.raw=p.raw.trimEnd(),p.text=p.text.trimEnd();else return;a.raw=a.raw.trimEnd();for(let h of a.items){if(this.lexer.state.top=!1,h.tokens=this.lexer.blockTokens(h.text,[]),h.task){if(h.text=h.text.replace(this.rules.other.listReplaceTask,""),((e=h.tokens[0])==null?void 0:e.type)==="text"||((i=h.tokens[0])==null?void 0:i.type)==="paragraph"){h.tokens[0].raw=h.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),h.tokens[0].text=h.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let d=this.lexer.inlineQueue.length-1;d>=0;d--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[d].src)){this.lexer.inlineQueue[d].src=this.lexer.inlineQueue[d].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(h.raw);if(c){let d={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};h.checked=d.checked,a.loose?h.tokens[0]&&["paragraph","text"].includes(h.tokens[0].type)&&"tokens"in h.tokens[0]&&h.tokens[0].tokens?(h.tokens[0].raw=d.raw+h.tokens[0].raw,h.tokens[0].text=d.raw+h.tokens[0].text,h.tokens[0].tokens.unshift(d)):h.tokens.unshift({type:"paragraph",raw:d.raw,text:d.raw,tokens:[d]}):h.tokens.unshift(d)}}if(!a.loose){let c=h.tokens.filter(g=>g.type==="space"),d=c.length>0&&c.some(g=>this.rules.other.anyLine.test(g.raw));a.loose=d}}if(a.loose)for(let h of a.items){h.loose=!0;for(let c of h.tokens)c.type==="text"&&(c.type="paragraph")}return a}}html(n){let t=this.rules.block.html.exec(n);if(t){let e=vt(t[0]);return{type:"html",block:!0,raw:e,pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:e}}}def(n){let t=this.rules.block.def.exec(n);if(t){let e=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:e,raw:H(t[0],`
`),href:i,title:s}}}table(n){var a;let t=this.rules.block.table.exec(n);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let e=kt(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=(a=t[3])!=null&&a.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],r={type:"table",raw:H(t[0],`
`),header:[],align:[],rows:[]};if(e.length===i.length){for(let l of i)this.rules.other.tableAlignRight.test(l)?r.align.push("right"):this.rules.other.tableAlignCenter.test(l)?r.align.push("center"):this.rules.other.tableAlignLeft.test(l)?r.align.push("left"):r.align.push(null);for(let l=0;l<e.length;l++)r.header.push({text:e[l],tokens:this.lexer.inline(e[l]),header:!0,align:r.align[l]});for(let l of s)r.rows.push(kt(l,r.header.length).map((o,p)=>({text:o,tokens:this.lexer.inline(o),header:!1,align:r.align[p]})));return r}}lheading(n){let t=this.rules.block.lheading.exec(n);if(t){let e=t[1].trim();return{type:"heading",raw:H(t[0],`
`),depth:t[2].charAt(0)==="="?1:2,text:e,tokens:this.lexer.inline(e)}}}paragraph(n){let t=this.rules.block.paragraph.exec(n);if(t){let e=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(n){let t=this.rules.block.text.exec(n);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(n){let t=this.rules.inline.escape.exec(n);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(n){let t=this.rules.inline.tag.exec(n);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(n){let t=this.rules.inline.link.exec(n);if(t){let e=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(e)){if(!this.rules.other.endAngleBracket.test(e))return;let r=H(e.slice(0,-1),"\\");if((e.length-r.length)%2===0)return}else{let r=He(t[2],"()");if(r===-2)return;if(r>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+r;t[2]=t[2].substring(0,r),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){let r=this.rules.other.pedanticHrefTitle.exec(i);r&&(i=r[1],s=r[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(e)?i=i.slice(1):i=i.slice(1,-1)),St(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(n,t){let e;if((e=this.rules.inline.reflink.exec(n))||(e=this.rules.inline.nolink.exec(n))){let i=(e[2]||e[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=t[i.toLowerCase()];if(!s){let r=e[0].charAt(0);return{type:"text",raw:r,text:r}}return St(e,s,e[0],this.lexer,this.rules)}}emStrong(n,t,e=""){let i=this.rules.inline.emStrongLDelim.exec(n);if(!(!i||!i[1]&&!i[2]&&!i[3]&&!i[4]||i[4]&&e.match(this.rules.other.unicodeAlphaNumeric))&&(!(i[1]||i[3])||!e||this.rules.inline.punctuation.exec(e))){let s=[...i[0]].length-1,r,a,l=s,o=0,p=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(p.lastIndex=0,t=t.slice(-1*n.length+s);(i=p.exec(t))!==null;){if(r=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!r)continue;if(a=[...r].length,i[3]||i[4]){l+=a;continue}else if((i[5]||i[6])&&s%3&&!((s+a)%3)){o+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l+o);let h=[...i[0]][0].length,c=n.slice(0,s+i.index+h+a);if(Math.min(s,a)%2){let g=c.slice(1,-1);return{type:"em",raw:c,text:g,tokens:this.lexer.inlineTokens(g)}}let d=c.slice(2,-2);return{type:"strong",raw:c,text:d,tokens:this.lexer.inlineTokens(d)}}}}codespan(n){let t=this.rules.inline.code.exec(n);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(e),s=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return i&&s&&(e=e.substring(1,e.length-1)),{type:"codespan",raw:t[0],text:e}}}br(n){let t=this.rules.inline.br.exec(n);if(t)return{type:"br",raw:t[0]}}del(n,t,e=""){let i=this.rules.inline.delLDelim.exec(n);if(i&&(!i[1]||!e||this.rules.inline.punctuation.exec(e))){let s=[...i[0]].length-1,r,a,l=s,o=this.rules.inline.delRDelim;for(o.lastIndex=0,t=t.slice(-1*n.length+s);(i=o.exec(t))!==null;){if(r=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!r||(a=[...r].length,a!==s))continue;if(i[3]||i[4]){l+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l);let p=[...i[0]][0].length,h=n.slice(0,s+i.index+p+a),c=h.slice(s,-s);return{type:"del",raw:h,text:c,tokens:this.lexer.inlineTokens(c)}}}}autolink(n){let t=this.rules.inline.autolink.exec(n);if(t){let e,i;return t[2]==="@"?(e=t[1],i="mailto:"+e):(e=t[1],i=e),{type:"link",raw:t[0],text:e,href:i,tokens:[{type:"text",raw:e,text:e}]}}}url(n){var e;let t;if(t=this.rules.inline.url.exec(n)){let i,s;if(t[2]==="@")i=t[0],s="mailto:"+i;else{let r;do r=t[0],t[0]=((e=this.rules.inline._backpedal.exec(t[0]))==null?void 0:e[0])??"";while(r!==t[0]);i=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:i,href:s,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(n){let t=this.rules.inline.text.exec(n);if(t){let e=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:e}}}},$=class it{constructor(t){b(this,"tokens");b(this,"options");b(this,"state");b(this,"inlineQueue");b(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=t||I,this.options.tokenizer=this.options.tokenizer||new j,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let e={other:S,block:X.normal,inline:O.normal};this.options.pedantic?(e.block=X.pedantic,e.inline=O.pedantic):this.options.gfm&&(e.block=X.gfm,this.options.breaks?e.inline=O.breaks:e.inline=O.gfm),this.tokenizer.rules=e}static get rules(){return{block:X,inline:O}}static lex(t,e){return new it(e).lex(t)}static lexInline(t,e){return new it(e).inlineTokens(t)}lex(t){t=t.replace(S.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let i=this.inlineQueue[e];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,e=[],i=!1){var r,a,l;this.tokenizer.lexer=this,this.options.pedantic&&(t=t.replace(S.tabCharGlobal,"    ").replace(S.spaceLine,""));let s=1/0;for(;t;){if(t.length<s)s=t.length;else{this.infiniteLoopError(t.charCodeAt(0));break}let o;if((a=(r=this.options.extensions)==null?void 0:r.block)!=null&&a.some(h=>(o=h.call({lexer:this},t,e))?(t=t.substring(o.raw.length),e.push(o),!0):!1))continue;if(o=this.tokenizer.space(t)){t=t.substring(o.raw.length);let h=e.at(-1);o.raw.length===1&&h!==void 0?h.raw+=`
`:e.push(o);continue}if(o=this.tokenizer.code(t)){t=t.substring(o.raw.length);let h=e.at(-1);(h==null?void 0:h.type)==="paragraph"||(h==null?void 0:h.type)==="text"?(h.raw+=(h.raw.endsWith(`
`)?"":`
`)+o.raw,h.text+=`
`+o.text,this.inlineQueue.at(-1).src=h.text):e.push(o);continue}if(o=this.tokenizer.fences(t)){t=t.substring(o.raw.length),e.push(o);continue}if(o=this.tokenizer.heading(t)){t=t.substring(o.raw.length),e.push(o);continue}if(o=this.tokenizer.hr(t)){t=t.substring(o.raw.length),e.push(o);continue}if(o=this.tokenizer.blockquote(t)){t=t.substring(o.raw.length),e.push(o);continue}if(o=this.tokenizer.list(t)){t=t.substring(o.raw.length),e.push(o);continue}if(o=this.tokenizer.html(t)){t=t.substring(o.raw.length),e.push(o);continue}if(o=this.tokenizer.def(t)){t=t.substring(o.raw.length);let h=e.at(-1);(h==null?void 0:h.type)==="paragraph"||(h==null?void 0:h.type)==="text"?(h.raw+=(h.raw.endsWith(`
`)?"":`
`)+o.raw,h.text+=`
`+o.raw,this.inlineQueue.at(-1).src=h.text):this.tokens.links[o.tag]||(this.tokens.links[o.tag]={href:o.href,title:o.title},e.push(o));continue}if(o=this.tokenizer.table(t)){t=t.substring(o.raw.length),e.push(o);continue}if(o=this.tokenizer.lheading(t)){t=t.substring(o.raw.length),e.push(o);continue}let p=t;if((l=this.options.extensions)!=null&&l.startBlock){let h=1/0,c=t.slice(1),d;this.options.extensions.startBlock.forEach(g=>{d=g.call({lexer:this},c),typeof d=="number"&&d>=0&&(h=Math.min(h,d))}),h<1/0&&h>=0&&(p=t.substring(0,h+1))}if(this.state.top&&(o=this.tokenizer.paragraph(p))){let h=e.at(-1);i&&(h==null?void 0:h.type)==="paragraph"?(h.raw+=(h.raw.endsWith(`
`)?"":`
`)+o.raw,h.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=h.text):e.push(o),i=p.length!==t.length,t=t.substring(o.raw.length);continue}if(o=this.tokenizer.text(t)){t=t.substring(o.raw.length);let h=e.at(-1);(h==null?void 0:h.type)==="text"?(h.raw+=(h.raw.endsWith(`
`)?"":`
`)+o.raw,h.text+=`
`+o.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=h.text):e.push(o);continue}if(t){this.infiniteLoopError(t.charCodeAt(0));break}}return this.state.top=!0,e}inline(t,e=[]){return this.inlineQueue.push({src:t,tokens:e}),e}inlineTokens(t,e=[]){var p,h,c,d,g;this.tokenizer.lexer=this;let i=t,s=null;if(this.tokens.links){let u=Object.keys(this.tokens.links);if(u.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!==null;)u.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!==null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let r;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!==null;)r=s[2]?s[2].length:0,i=i.slice(0,s.index+r)+"["+"a".repeat(s[0].length-r-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);i=((h=(p=this.options.hooks)==null?void 0:p.emStrongMask)==null?void 0:h.call({lexer:this},i))??i;let a=!1,l="",o=1/0;for(;t;){if(t.length<o)o=t.length;else{this.infiniteLoopError(t.charCodeAt(0));break}a||(l=""),a=!1;let u;if((d=(c=this.options.extensions)==null?void 0:c.inline)!=null&&d.some(f=>(u=f.call({lexer:this},t,e))?(t=t.substring(u.raw.length),e.push(u),!0):!1))continue;if(u=this.tokenizer.escape(t)){t=t.substring(u.raw.length),e.push(u);continue}if(u=this.tokenizer.tag(t)){t=t.substring(u.raw.length),e.push(u);continue}if(u=this.tokenizer.link(t)){t=t.substring(u.raw.length),e.push(u);continue}if(u=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(u.raw.length);let f=e.at(-1);u.type==="text"&&(f==null?void 0:f.type)==="text"?(f.raw+=u.raw,f.text+=u.text):e.push(u);continue}if(u=this.tokenizer.emStrong(t,i,l)){t=t.substring(u.raw.length),e.push(u);continue}if(u=this.tokenizer.codespan(t)){t=t.substring(u.raw.length),e.push(u);continue}if(u=this.tokenizer.br(t)){t=t.substring(u.raw.length),e.push(u);continue}if(u=this.tokenizer.del(t,i,l)){t=t.substring(u.raw.length),e.push(u);continue}if(u=this.tokenizer.autolink(t)){t=t.substring(u.raw.length),e.push(u);continue}if(!this.state.inLink&&(u=this.tokenizer.url(t))){t=t.substring(u.raw.length),e.push(u);continue}let w=t;if((g=this.options.extensions)!=null&&g.startInline){let f=1/0,_=t.slice(1),M;this.options.extensions.startInline.forEach(T=>{M=T.call({lexer:this},_),typeof M=="number"&&M>=0&&(f=Math.min(f,M))}),f<1/0&&f>=0&&(w=t.substring(0,f+1))}if(u=this.tokenizer.inlineText(w)){t=t.substring(u.raw.length),u.raw.slice(-1)!=="_"&&(l=u.raw.slice(-1)),a=!0;let f=e.at(-1);(f==null?void 0:f.type)==="text"?(f.raw+=u.raw,f.text+=u.text):e.push(u);continue}if(t){this.infiniteLoopError(t.charCodeAt(0));break}}return e}infiniteLoopError(t){let e="Infinite loop on byte: "+t;if(this.options.silent)console.error(e);else throw new Error(e)}},V=class{constructor(n){b(this,"options");b(this,"parser");this.options=n||I}space(n){return""}code({text:n,lang:t,escaped:e}){var r;let i=(r=(t||"").match(S.notSpaceStart))==null?void 0:r[0],s=n.replace(S.endingNewline,"")+`
`;return i?'<pre><code class="language-'+A(i)+'">'+(e?s:A(s,!0))+`</code></pre>
`:"<pre><code>"+(e?s:A(s,!0))+`</code></pre>
`}blockquote({tokens:n}){return`<blockquote>
${this.parser.parse(n)}</blockquote>
`}html({text:n}){return n}def(n){return""}heading({tokens:n,depth:t}){return`<h${t}>${this.parser.parseInline(n)}</h${t}>
`}hr(n){return`<hr>
`}list(n){let t=n.ordered,e=n.start,i="";for(let a=0;a<n.items.length;a++){let l=n.items[a];i+=this.listitem(l)}let s=t?"ol":"ul",r=t&&e!==1?' start="'+e+'"':"";return"<"+s+r+`>
`+i+"</"+s+`>
`}listitem(n){return`<li>${this.parser.parse(n.tokens)}</li>
`}checkbox({checked:n}){return"<input "+(n?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:n}){return`<p>${this.parser.parseInline(n)}</p>
`}table(n){let t="",e="";for(let s=0;s<n.header.length;s++)e+=this.tablecell(n.header[s]);t+=this.tablerow({text:e});let i="";for(let s=0;s<n.rows.length;s++){let r=n.rows[s];e="";for(let a=0;a<r.length;a++)e+=this.tablecell(r[a]);i+=this.tablerow({text:e})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+i+`</table>
`}tablerow({text:n}){return`<tr>
${n}</tr>
`}tablecell(n){let t=this.parser.parseInline(n.tokens),e=n.header?"th":"td";return(n.align?`<${e} align="${n.align}">`:`<${e}>`)+t+`</${e}>
`}strong({tokens:n}){return`<strong>${this.parser.parseInline(n)}</strong>`}em({tokens:n}){return`<em>${this.parser.parseInline(n)}</em>`}codespan({text:n}){return`<code>${A(n,!0)}</code>`}br(n){return"<br>"}del({tokens:n}){return`<del>${this.parser.parseInline(n)}</del>`}link({href:n,title:t,tokens:e}){let i=this.parser.parseInline(e),s=yt(n);if(s===null)return i;n=s;let r='<a href="'+n+'"';return t&&(r+=' title="'+A(t)+'"'),r+=">"+i+"</a>",r}image({href:n,title:t,text:e,tokens:i}){i&&(e=this.parser.parseInline(i,this.parser.textRenderer));let s=yt(n);if(s===null)return A(e);n=s;let r=`<img src="${n}" alt="${A(e)}"`;return t&&(r+=` title="${A(t)}"`),r+=">",r}text(n){return"tokens"in n&&n.tokens?this.parser.parseInline(n.tokens):"escaped"in n&&n.escaped?n.text:A(n.text)}},dt=class{strong({text:n}){return n}em({text:n}){return n}codespan({text:n}){return n}del({text:n}){return n}html({text:n}){return n}text({text:n}){return n}link({text:n}){return""+n}image({text:n}){return""+n}br(){return""}checkbox({raw:n}){return n}},P=class st{constructor(t){b(this,"options");b(this,"renderer");b(this,"textRenderer");this.options=t||I,this.options.renderer=this.options.renderer||new V,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new dt}static parse(t,e){return new st(e).parse(t)}static parseInline(t,e){return new st(e).parseInline(t)}parse(t){var i,s;this.renderer.parser=this;let e="";for(let r=0;r<t.length;r++){let a=t[r];if((s=(i=this.options.extensions)==null?void 0:i.renderers)!=null&&s[a.type]){let o=a,p=this.options.extensions.renderers[o.type].call({parser:this},o);if(p!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(o.type)){e+=p||"";continue}}let l=a;switch(l.type){case"space":{e+=this.renderer.space(l);break}case"hr":{e+=this.renderer.hr(l);break}case"heading":{e+=this.renderer.heading(l);break}case"code":{e+=this.renderer.code(l);break}case"table":{e+=this.renderer.table(l);break}case"blockquote":{e+=this.renderer.blockquote(l);break}case"list":{e+=this.renderer.list(l);break}case"checkbox":{e+=this.renderer.checkbox(l);break}case"html":{e+=this.renderer.html(l);break}case"def":{e+=this.renderer.def(l);break}case"paragraph":{e+=this.renderer.paragraph(l);break}case"text":{e+=this.renderer.text(l);break}default:{let o='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return e}parseInline(t,e=this.renderer){var s,r;this.renderer.parser=this;let i="";for(let a=0;a<t.length;a++){let l=t[a];if((r=(s=this.options.extensions)==null?void 0:s.renderers)!=null&&r[l.type]){let p=this.options.extensions.renderers[l.type].call({parser:this},l);if(p!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(l.type)){i+=p||"";continue}}let o=l;switch(o.type){case"escape":{i+=e.text(o);break}case"html":{i+=e.html(o);break}case"link":{i+=e.link(o);break}case"image":{i+=e.image(o);break}case"checkbox":{i+=e.checkbox(o);break}case"strong":{i+=e.strong(o);break}case"em":{i+=e.em(o);break}case"codespan":{i+=e.codespan(o);break}case"br":{i+=e.br(o);break}case"del":{i+=e.del(o);break}case"text":{i+=e.text(o);break}default:{let p='Token with "'+o.type+'" type was not found.';if(this.options.silent)return console.error(p),"";throw new Error(p)}}}return i}},Y,Q=(Y=class{constructor(n){b(this,"options");b(this,"block");this.options=n||I}preprocess(n){return n}postprocess(n){return n}processAllTokens(n){return n}emStrongMask(n){return n}provideLexer(n=this.block){return n?$.lex:$.lexInline}provideParser(n=this.block){return n?P.parse:P.parseInline}},b(Y,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),b(Y,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),Y),We=class{constructor(...n){b(this,"defaults",nt());b(this,"options",this.setOptions);b(this,"parse",this.parseMarkdown(!0));b(this,"parseInline",this.parseMarkdown(!1));b(this,"Parser",P);b(this,"Renderer",V);b(this,"TextRenderer",dt);b(this,"Lexer",$);b(this,"Tokenizer",j);b(this,"Hooks",Q);this.use(...n)}walkTokens(n,t){var i,s;let e=[];for(let r of n)switch(e=e.concat(t.call(this,r)),r.type){case"table":{let a=r;for(let l of a.header)e=e.concat(this.walkTokens(l.tokens,t));for(let l of a.rows)for(let o of l)e=e.concat(this.walkTokens(o.tokens,t));break}case"list":{let a=r;e=e.concat(this.walkTokens(a.items,t));break}default:{let a=r;(s=(i=this.defaults.extensions)==null?void 0:i.childTokens)!=null&&s[a.type]?this.defaults.extensions.childTokens[a.type].forEach(l=>{let o=a[l].flat(1/0);e=e.concat(this.walkTokens(o,t))}):a.tokens&&(e=e.concat(this.walkTokens(a.tokens,t)))}}return e}use(...n){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return n.forEach(e=>{let i={...e};if(i.async=this.defaults.async||i.async||!1,e.extensions&&(e.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let r=t.renderers[s.name];r?t.renderers[s.name]=function(...a){let l=s.renderer.apply(this,a);return l===!1&&(l=r.apply(this,a)),l}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let r=t[s.level];r?r.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),e.renderer){let s=this.defaults.renderer||new V(this.defaults);for(let r in e.renderer){if(!(r in s))throw new Error(`renderer '${r}' does not exist`);if(["options","parser"].includes(r))continue;let a=r,l=e.renderer[a],o=s[a];s[a]=(...p)=>{let h=l.apply(s,p);return h===!1&&(h=o.apply(s,p)),h||""}}i.renderer=s}if(e.tokenizer){let s=this.defaults.tokenizer||new j(this.defaults);for(let r in e.tokenizer){if(!(r in s))throw new Error(`tokenizer '${r}' does not exist`);if(["options","rules","lexer"].includes(r))continue;let a=r,l=e.tokenizer[a],o=s[a];s[a]=(...p)=>{let h=l.apply(s,p);return h===!1&&(h=o.apply(s,p)),h}}i.tokenizer=s}if(e.hooks){let s=this.defaults.hooks||new Q;for(let r in e.hooks){if(!(r in s))throw new Error(`hook '${r}' does not exist`);if(["options","block"].includes(r))continue;let a=r,l=e.hooks[a],o=s[a];Q.passThroughHooks.has(r)?s[a]=p=>{if(this.defaults.async&&Q.passThroughHooksRespectAsync.has(r))return(async()=>{let c=await l.call(s,p);return o.call(s,c)})();let h=l.call(s,p);return o.call(s,h)}:s[a]=(...p)=>{if(this.defaults.async)return(async()=>{let c=await l.apply(s,p);return c===!1&&(c=await o.apply(s,p)),c})();let h=l.apply(s,p);return h===!1&&(h=o.apply(s,p)),h}}i.hooks=s}if(e.walkTokens){let s=this.defaults.walkTokens,r=e.walkTokens;i.walkTokens=function(a){let l=[];return l.push(r.call(this,a)),s&&(l=l.concat(s.call(this,a))),l}}this.defaults={...this.defaults,...i}}),this}setOptions(n){return this.defaults={...this.defaults,...n},this}lexer(n,t){return $.lex(n,t??this.defaults)}parser(n,t){return P.parse(n,t??this.defaults)}parseMarkdown(n){return(t,e)=>{let i={...e},s={...this.defaults,...i},r=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&i.async===!1)return r(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return r(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return r(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=n),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,l=await(s.hooks?await s.hooks.provideLexer(n):n?$.lex:$.lexInline)(a,s),o=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(o,s.walkTokens));let p=await(s.hooks?await s.hooks.provideParser(n):n?P.parse:P.parseInline)(o,s);return s.hooks?await s.hooks.postprocess(p):p})().catch(r);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer(n):n?$.lex:$.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let l=(s.hooks?s.hooks.provideParser(n):n?P.parse:P.parseInline)(a,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(a){return r(a)}}}onError(n,t){return e=>{if(e.message+=`
Please report this to https://github.com/markedjs/marked.`,n){let i="<p>An error occurred:</p><pre>"+A(e.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(e);throw e}}},W=new We;function x(n,t){return W.parse(n,t)}x.options=x.setOptions=function(n){return W.setOptions(n),x.defaults=W.defaults,Tt(x.defaults),x};x.getDefaults=nt;x.defaults=I;x.use=function(...n){return W.use(...n),x.defaults=W.defaults,Tt(x.defaults),x};x.walkTokens=function(n,t){return W.walkTokens(n,t)};x.parseInline=W.parseInline;x.Parser=P;x.parser=P.parse;x.Renderer=V;x.TextRenderer=dt;x.Lexer=$;x.lexer=$.lex;x.Tokenizer=j;x.Hooks=Q;x.parse=x;x.options;x.setOptions;x.use;x.walkTokens;x.parseInline;P.parse;$.lex;const Ie={__name:"MapCanvas",props:{src:{type:String,default:""},height:{type:[String,Number],default:"540px"},width:{type:[String,Number],default:100},title:{type:String,default:""},subtitle:{type:String,default:""},focus:{type:String,default:""},zoom:{type:Number,default:0},fit:{type:String,default:"contain"},showTitle:{type:Boolean,default:!0},showCompass:{type:Boolean,default:!0},showGraticule:{type:Boolean,default:!1}},setup(n,{expose:t}){const e=n,i=Qt(null);let s=null;const r=qt("world"),a=Ot(()=>({width:typeof e.width=="number"?`${e.width}%`:e.width}));function l(){i.value&&(s=new Vt(i.value,{src:e.src||r,height:e.height,width:e.width,title:e.title,subtitle:e.subtitle,focus:e.focus,zoom:e.zoom,fit:e.fit,showTitle:e.showTitle,showCompass:e.showCompass,showGraticule:e.showGraticule}))}function o(){s==null||s.destroy(),s=null}return It(l),Bt(o),N(()=>e.height,p=>{s==null||s.setHeight(p)}),N(()=>[e.focus,e.zoom],()=>{s==null||s.setView({focus:e.focus,zoom:e.zoom})}),N(()=>[e.title,e.subtitle],()=>{s&&(s.options.title=e.title,s.options.subtitle=e.subtitle,s.plate.hidden=!e.showTitle||e.title==="none",s.updateChrome())}),N(()=>e.showTitle,p=>{s&&(s.options.showTitle=p,s.plate.hidden=!p||s.options.title==="none")}),N(()=>e.showGraticule,p=>{s&&(s.options.showGraticule=p,s.invalidateQuality())}),t({getMap:()=>s}),(p,h)=>(Ft(),Nt("div",{ref_key:"host",ref:i,class:"hoi4-map-host",style:Gt(a.value)},null,4))}},Ge=Wt(Ie,[["__scopeId","data-v-0528987a"]]);export{Ct as D,Vt as H,Ge as M,x as g};
