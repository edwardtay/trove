"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3309],{834:(e,t,n)=>{n.d(t,{E:()=>o,I:()=>a,a:()=>s});var i=n(20031),l=n(55211);let r=i.I4.label`
  display: block;
  position: relative;
  width: 100%;
  height: 56px;

  && > :first-child {
    position: absolute;
    left: 0.75em;
    top: 50%;
    transform: translate(0, -50%);
  }

  && > input {
    font-size: 16px;
    line-height: 24px;
    color: var(--privy-color-foreground);

    padding: 12px 88px 12px 52px;
    flex-grow: 1;
    background: var(--privy-color-background);
    border: 1px solid
      ${({$error:e})=>e?"var(--privy-color-error) !important":"var(--privy-color-foreground-4)"};
    border-radius: var(--privy-border-radius-md);
    width: 100%;
    height: 100%;

    /* Tablet and Up */
    @media (min-width: 441px) {
      font-size: 14px;
      padding-right: 78px;
    }

    :focus {
      outline: none;
      border-color: ${({$error:e})=>e?"var(--privy-color-error) !important":"var(--privy-color-accent-light)"};
      box-shadow: ${({$error:e})=>e?"none":"0 0 0 1px var(--privy-color-accent-light)"};
    }

    :autofill,
    :-webkit-autofill {
      background: var(--privy-color-background);
    }

    && > input::placeholder {
      color: var(--privy-color-foreground-3);
    }
    &:disabled {
      opacity: 0.4; /* Make it visually appear disabled */
      cursor: not-allowed; /* Change cursor to not-allowed */
    }
    &:disabled,
    &:disabled:hover,
    &:disabled > span {
      color: var(--privy-color-foreground-3); /* Change text color to grey */
    }
  }

  && > button:last-child {
    right: 0px;
    line-height: 24px;
    padding: 13px 17px;
    :focus {
      outline: none;
    }
    &:disabled {
      opacity: 0.4; /* Make it visually appear disabled */
      cursor: not-allowed; /* Change cursor to not-allowed */
    }
    &:disabled,
    &:disabled:hover,
    &:disabled > span {
      color: var(--privy-color-foreground-3); /* Change text color to grey */
    }
  }
`,o=(0,i.I4)(r)`
  background-color: var(--privy-color-background);
  transition: background-color 200ms ease;

  && > button {
    right: 0;
    line-height: 24px;
    position: absolute;
    padding: 13px 17px;
    background-color: #090;

    :focus {
      outline: none;
      border-color: var(--privy-color-accent);
    }
  }
`,s=(0,i.I4)(r)`
  && > input {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    padding-right: ${e=>e.$stacked?"16px":"88px"};

    border: 1px solid
      ${({$error:e})=>e?"var(--privy-color-error) !important":"var(--privy-color-foreground-4)"};

    && > input::placeholder {
      color: var(--privy-color-foreground-3);
    }
  }

  && > :last-child {
    right: 16px;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
  }

  && > button:last-child {
    right: 0px;
    line-height: 24px;
    padding: 13px 17px;

    :focus {
      outline: none;
    }
  }
`,a=i.I4.div`
  width: 100%;

  /* Add styling for the ErrorMessage within EmailInput */
  && > ${l.E} {
    display: block;
    text-align: left;
    padding-left: var(--privy-border-radius-md);
    padding-bottom: 5px;
  }
`},4471:(e,t,n)=>{n.d(t,{C:()=>u,a:()=>p});var i=n(95155),l=n(8489),r=n(31334),o=n(12115),s=n(20031);let a=s.I4.button`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.5rem;

  svg {
    width: 0.875rem;
    height: 0.875rem;
  }
`,c=s.I4.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--privy-color-foreground-2);
`,d=(0,s.I4)(l.A)`
  color: var(--privy-color-icon-success);
  flex-shrink: 0;
`,h=(0,s.I4)(r.A)`
  color: var(--privy-color-icon-muted);
  flex-shrink: 0;
`;function u({children:e,iconOnly:t,value:n,hideCopyIcon:l,...r}){let[s,u]=(0,o.useState)(!1);return(0,i.jsxs)(a,{...r,onClick:()=>{navigator.clipboard.writeText(n||("string"==typeof e?e:"")).catch(console.error),u(!0),setTimeout(()=>u(!1),1500)},children:[e," ",s?(0,i.jsxs)(c,{children:[(0,i.jsx)(d,{})," ",!t&&"Copied"]}):!l&&(0,i.jsx)(h,{})]})}let p=({value:e,includeChildren:t,children:n,...l})=>{let[r,s]=(0,o.useState)(!1),u=()=>{navigator.clipboard.writeText(e).catch(console.error),s(!0),setTimeout(()=>s(!1),1500)};return(0,i.jsxs)(i.Fragment,{children:[t?(0,i.jsx)(a,{...l,onClick:u,children:n}):(0,i.jsx)(i.Fragment,{children:n}),(0,i.jsx)(a,{...l,onClick:u,children:r?(0,i.jsx)(c,{children:(0,i.jsx)(d,{})}):(0,i.jsx)(h,{})})]})}},8489:(e,t,n)=>{n.d(t,{A:()=>i});let i=(0,n(42407).A)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]])},13074:(e,t,n)=>{n.d(t,{u:()=>r});var i=n(64209);let l={"connectionStatus.successfullyConnected":"Successfully connected with {walletName}","connectionStatus.errorTitle":"{errorMessage}","connectionStatus.connecting":"Connecting","connectionStatus.connectOneWallet":"For the best experience, connect only one wallet at a time.","connectionStatus.checkOtherWindows":"Don't see your wallet? Check your other browser windows.","connectionStatus.stillHere":"Still here?","connectionStatus.tryConnectingAgain":"Try connecting again","connectionStatus.or":"or","connectionStatus.useDifferentLink":"use this different link","connectWallet.connectYourWallet":"Connect a wallet","connectWallet.waitingForWallet":"Waiting for {walletName}","connectWallet.connectToAccount":"Connect a wallet to your {appName} account","connectWallet.installAndConnect":"To connect to {walletName}, install and open the app. Then confirm the connection when prompted.","connectWallet.tryConnectingAgain":"Please try connecting again.","connectWallet.openInApp":"Open in app","connectWallet.copyLink":"Copy link","connectWallet.retry":"Retry","connectWallet.searchPlaceholder":"Search through {count} wallets","connectWallet.noWalletsFound":"No wallets found. Try another search.","connectWallet.lastUsed":"Last used","connectWallet.selectYourWallet":"Select your wallet","connectWallet.selectNetwork":"Select network","connectWallet.goToWallet":"Go to {walletName} to continue","connectWallet.scanToConnect":"Scan code to connect to {walletName}","connectWallet.openOrInstall":"Open or install {walletName}"};function r(){let e=(0,i.u)();return{t:(t,n)=>{var i;let r;return i=e.intl.textLocalization,r=i?.[t]??l[t],n&&0!==Object.keys(n).length?r.replace(/\{(\w+)\}/g,(e,t)=>n[t]??e):r}}}},31334:(e,t,n)=>{n.d(t,{A:()=>i});let i=(0,n(42407).A)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]])},42407:(e,t,n)=>{n.d(t,{A:()=>a});var i=n(12115);let l=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)},r=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter((e,t,n)=>!!e&&""!==e.trim()&&n.indexOf(e)===t).join(" ").trim()};var o={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let s=(0,i.forwardRef)((e,t)=>{let{color:n="currentColor",size:l=24,strokeWidth:s=2,absoluteStrokeWidth:a,className:c="",children:d,iconNode:h,...u}=e;return(0,i.createElement)("svg",{ref:t,...o,width:l,height:l,stroke:n,strokeWidth:a?24*Number(s)/Number(l):s,className:r("lucide",c),...!d&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0})(u)&&{"aria-hidden":"true"},...u},[...h.map(e=>{let[t,n]=e;return(0,i.createElement)(t,n)}),...Array.isArray(d)?d:[d]])}),a=(e,t)=>{let n=(0,i.forwardRef)((n,o)=>{let{className:a,...c}=n;return(0,i.createElement)(s,{ref:o,iconNode:t,className:r("lucide-".concat(l(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()),"lucide-".concat(e),a),...c})});return n.displayName=l(e),n}},43309:(e,t,n)=>{n.d(t,{b:()=>F,c:()=>q,i:()=>P,u:()=>K});var i=n(95155),l=n(12115);let r=l.forwardRef(function(e,t){let{title:n,titleId:i,...r}=e;return l.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:t,"aria-labelledby":i},r),n?l.createElement("title",{id:i},n):null,l.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"}))});var o=n(47650);function s(e,t,n){let i,l=n.initialDeps??[],r=!0;function o(){var o,s,a;let c,d;n.key&&(null==(o=n.debug)?void 0:o.call(n))&&(c=Date.now());let h=e();if(!(h.length!==l.length||h.some((e,t)=>l[t]!==e)))return i;if(l=h,n.key&&(null==(s=n.debug)?void 0:s.call(n))&&(d=Date.now()),i=t(...h),n.key&&(null==(a=n.debug)?void 0:a.call(n))){let e=Math.round((Date.now()-c)*100)/100,t=Math.round((Date.now()-d)*100)/100,i=t/16,l=(e,t)=>{for(e=String(e);e.length<t;)e=" "+e;return e};console.info(`%c⏱ ${l(t,5)} /${l(e,5)} ms`,`
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0,Math.min(120-120*i,120))}deg 100% 31%);`,null==n?void 0:n.key)}return(null==n?void 0:n.onChange)&&!(r&&n.skipInitialOnChange)&&n.onChange(i),r=!1,i}return o.updateDeps=e=>{l=e},o}function a(e,t){if(void 0!==e)return e;throw Error(`Unexpected undefined${t?`: ${t}`:""}`)}let c=e=>{let{offsetWidth:t,offsetHeight:n}=e;return{width:t,height:n}},d=e=>e,h=e=>{let t=Math.max(e.startIndex-e.overscan,0),n=Math.min(e.endIndex+e.overscan,e.count-1),i=[];for(let e=t;e<=n;e++)i.push(e);return i},u=(e,t)=>{let n=e.scrollElement;if(!n)return;let i=e.targetWindow;if(!i)return;let l=e=>{let{width:n,height:i}=e;t({width:Math.round(n),height:Math.round(i)})};if(l(c(n)),!i.ResizeObserver)return()=>{};let r=new i.ResizeObserver(t=>{let i=()=>{let e=t[0];if(null==e?void 0:e.borderBoxSize){let t=e.borderBoxSize[0];if(t)return void l({width:t.inlineSize,height:t.blockSize})}l(c(n))};e.options.useAnimationFrameWithResizeObserver?requestAnimationFrame(i):i()});return r.observe(n,{box:"border-box"}),()=>{r.unobserve(n)}},p={passive:!0},g="undefined"==typeof window||"onscrollend"in window,m=(e,t)=>{let n=e.scrollElement;if(!n)return;let i=e.targetWindow;if(!i)return;let l=0,r=e.options.useScrollendEvent&&g?()=>void 0:((e,t,n)=>{let i;return function(...l){e.clearTimeout(i),i=e.setTimeout(()=>t.apply(this,l),n)}})(i,()=>{t(l,!1)},e.options.isScrollingResetDelay),o=i=>()=>{let{horizontal:o,isRtl:s}=e.options;l=o?n.scrollLeft*(s&&-1||1):n.scrollTop,r(),t(l,i)},s=o(!0),a=o(!1);n.addEventListener("scroll",s,p);let c=e.options.useScrollendEvent&&g;return c&&n.addEventListener("scrollend",a,p),()=>{n.removeEventListener("scroll",s),c&&n.removeEventListener("scrollend",a)}},f=(e,t,n)=>{if(null==t?void 0:t.borderBoxSize){let e=t.borderBoxSize[0];if(e)return Math.round(e[n.options.horizontal?"inlineSize":"blockSize"])}return e[n.options.horizontal?"offsetWidth":"offsetHeight"]},v=(e,{adjustments:t=0,behavior:n},i)=>{var l,r;null==(r=null==(l=i.scrollElement)?void 0:l.scrollTo)||r.call(l,{[i.options.horizontal?"left":"top"]:e+t,behavior:n})};class w{constructor(e){this.unsubs=[],this.scrollElement=null,this.targetWindow=null,this.isScrolling=!1,this.scrollState=null,this.measurementsCache=[],this.itemSizeCache=new Map,this.laneAssignments=new Map,this.pendingMeasuredCacheIndexes=[],this.prevLanes=void 0,this.lanesChangedFlag=!1,this.lanesSettling=!1,this.scrollRect=null,this.scrollOffset=null,this.scrollDirection=null,this.scrollAdjustments=0,this.elementsCache=new Map,this.now=()=>{var e,t,n;return(null==(n=null==(t=null==(e=this.targetWindow)?void 0:e.performance)?void 0:t.now)?void 0:n.call(t))??Date.now()},this.observer=(()=>{let e=null,t=()=>e||(this.targetWindow&&this.targetWindow.ResizeObserver?e=new this.targetWindow.ResizeObserver(e=>{e.forEach(e=>{let t=()=>{let t=e.target,n=this.indexFromElement(t);if(!t.isConnected)return void this.observer.unobserve(t);this.shouldMeasureDuringScroll(n)&&this.resizeItem(n,this.options.measureElement(t,e,this))};this.options.useAnimationFrameWithResizeObserver?requestAnimationFrame(t):t()})}):null);return{disconnect:()=>{var n;null==(n=t())||n.disconnect(),e=null},observe:e=>{var n;return null==(n=t())?void 0:n.observe(e,{box:"border-box"})},unobserve:e=>{var n;return null==(n=t())?void 0:n.unobserve(e)}}})(),this.range=null,this.setOptions=e=>{Object.entries(e).forEach(([t,n])=>{void 0===n&&delete e[t]}),this.options={debug:!1,initialOffset:0,overscan:1,paddingStart:0,paddingEnd:0,scrollPaddingStart:0,scrollPaddingEnd:0,horizontal:!1,getItemKey:d,rangeExtractor:h,onChange:()=>{},measureElement:f,initialRect:{width:0,height:0},scrollMargin:0,gap:0,indexAttribute:"data-index",initialMeasurementsCache:[],lanes:1,isScrollingResetDelay:150,enabled:!0,isRtl:!1,useScrollendEvent:!1,useAnimationFrameWithResizeObserver:!1,laneAssignmentMode:"estimate",...e}},this.notify=e=>{var t,n;null==(n=(t=this.options).onChange)||n.call(t,this,e)},this.maybeNotify=s(()=>(this.calculateRange(),[this.isScrolling,this.range?this.range.startIndex:null,this.range?this.range.endIndex:null]),e=>{this.notify(e)},{key:!1,debug:()=>this.options.debug,initialDeps:[this.isScrolling,this.range?this.range.startIndex:null,this.range?this.range.endIndex:null]}),this.cleanup=()=>{this.unsubs.filter(Boolean).forEach(e=>e()),this.unsubs=[],this.observer.disconnect(),null!=this.rafId&&this.targetWindow&&(this.targetWindow.cancelAnimationFrame(this.rafId),this.rafId=null),this.scrollState=null,this.scrollElement=null,this.targetWindow=null},this._didMount=()=>()=>{this.cleanup()},this._willUpdate=()=>{var e;let t=this.options.enabled?this.options.getScrollElement():null;if(this.scrollElement!==t){if(this.cleanup(),!t)return void this.maybeNotify();this.scrollElement=t,this.scrollElement&&"ownerDocument"in this.scrollElement?this.targetWindow=this.scrollElement.ownerDocument.defaultView:this.targetWindow=(null==(e=this.scrollElement)?void 0:e.window)??null,this.elementsCache.forEach(e=>{this.observer.observe(e)}),this.unsubs.push(this.options.observeElementRect(this,e=>{this.scrollRect=e,this.maybeNotify()})),this.unsubs.push(this.options.observeElementOffset(this,(e,t)=>{this.scrollAdjustments=0,this.scrollDirection=t?this.getScrollOffset()<e?"forward":"backward":null,this.scrollOffset=e,this.isScrolling=t,this.scrollState&&this.scheduleScrollReconcile(),this.maybeNotify()})),this._scrollToOffset(this.getScrollOffset(),{adjustments:void 0,behavior:void 0})}},this.rafId=null,this.getSize=()=>this.options.enabled?(this.scrollRect=this.scrollRect??this.options.initialRect,this.scrollRect[this.options.horizontal?"width":"height"]):(this.scrollRect=null,0),this.getScrollOffset=()=>this.options.enabled?(this.scrollOffset=this.scrollOffset??("function"==typeof this.options.initialOffset?this.options.initialOffset():this.options.initialOffset),this.scrollOffset):(this.scrollOffset=null,0),this.getFurthestMeasurement=(e,t)=>{let n=new Map,i=new Map;for(let l=t-1;l>=0;l--){let t=e[l];if(n.has(t.lane))continue;let r=i.get(t.lane);if(null==r||t.end>r.end?i.set(t.lane,t):t.end<r.end&&n.set(t.lane,!0),n.size===this.options.lanes)break}return i.size===this.options.lanes?Array.from(i.values()).sort((e,t)=>e.end===t.end?e.index-t.index:e.end-t.end)[0]:void 0},this.getMeasurementOptions=s(()=>[this.options.count,this.options.paddingStart,this.options.scrollMargin,this.options.getItemKey,this.options.enabled,this.options.lanes,this.options.laneAssignmentMode],(e,t,n,i,l,r,o)=>(void 0!==this.prevLanes&&this.prevLanes!==r&&(this.lanesChangedFlag=!0),this.prevLanes=r,this.pendingMeasuredCacheIndexes=[],{count:e,paddingStart:t,scrollMargin:n,getItemKey:i,enabled:l,lanes:r,laneAssignmentMode:o}),{key:!1}),this.getMeasurements=s(()=>[this.getMeasurementOptions(),this.itemSizeCache],({count:e,paddingStart:t,scrollMargin:n,getItemKey:i,enabled:l,lanes:r,laneAssignmentMode:o},s)=>{if(!l)return this.measurementsCache=[],this.itemSizeCache.clear(),this.laneAssignments.clear(),[];if(this.laneAssignments.size>e)for(let t of this.laneAssignments.keys())t>=e&&this.laneAssignments.delete(t);this.lanesChangedFlag&&(this.lanesChangedFlag=!1,this.lanesSettling=!0,this.measurementsCache=[],this.itemSizeCache.clear(),this.laneAssignments.clear(),this.pendingMeasuredCacheIndexes=[]),0!==this.measurementsCache.length||this.lanesSettling||(this.measurementsCache=this.options.initialMeasurementsCache,this.measurementsCache.forEach(e=>{this.itemSizeCache.set(e.key,e.size)}));let a=this.lanesSettling?0:this.pendingMeasuredCacheIndexes.length>0?Math.min(...this.pendingMeasuredCacheIndexes):0;this.pendingMeasuredCacheIndexes=[],this.lanesSettling&&this.measurementsCache.length===e&&(this.lanesSettling=!1);let c=this.measurementsCache.slice(0,a),d=Array(r).fill(void 0);for(let e=0;e<a;e++){let t=c[e];t&&(d[t.lane]=e)}for(let l=a;l<e;l++){let e,r,a=i(l),h=this.laneAssignments.get(l),u="estimate"===o||s.has(a);if(void 0!==h&&this.options.lanes>1){let i=d[e=h],l=void 0!==i?c[i]:void 0;r=l?l.end+this.options.gap:t+n}else{let i=1===this.options.lanes?c[l-1]:this.getFurthestMeasurement(c,l);r=i?i.end+this.options.gap:t+n,e=i?i.lane:l%this.options.lanes,this.options.lanes>1&&u&&this.laneAssignments.set(l,e)}let p=s.get(a),g="number"==typeof p?p:this.options.estimateSize(l),m=r+g;c[l]={index:l,start:r,size:g,end:m,key:a,lane:e},d[e]=l}return this.measurementsCache=c,c},{key:!1,debug:()=>this.options.debug}),this.calculateRange=s(()=>[this.getMeasurements(),this.getSize(),this.getScrollOffset(),this.options.lanes],(e,t,n,i)=>this.range=e.length>0&&t>0?function({measurements:e,outerSize:t,scrollOffset:n,lanes:i}){let l=e.length-1;if(e.length<=i)return{startIndex:0,endIndex:l};let r=x(0,l,t=>e[t].start,n),o=r;if(1===i)for(;o<l&&e[o].end<n+t;)o++;else if(i>1){let s=Array(i).fill(0);for(;o<l&&s.some(e=>e<n+t);){let t=e[o];s[t.lane]=t.end,o++}let a=Array(i).fill(n+t);for(;r>=0&&a.some(e=>e>=n);){let t=e[r];a[t.lane]=t.start,r--}r=Math.max(0,r-r%i),o=Math.min(l,o+(i-1-o%i))}return{startIndex:r,endIndex:o}}({measurements:e,outerSize:t,scrollOffset:n,lanes:i}):null,{key:!1,debug:()=>this.options.debug}),this.getVirtualIndexes=s(()=>{let e=null,t=null,n=this.calculateRange();return n&&(e=n.startIndex,t=n.endIndex),this.maybeNotify.updateDeps([this.isScrolling,e,t]),[this.options.rangeExtractor,this.options.overscan,this.options.count,e,t]},(e,t,n,i,l)=>null===i||null===l?[]:e({startIndex:i,endIndex:l,overscan:t,count:n}),{key:!1,debug:()=>this.options.debug}),this.indexFromElement=e=>{let t=this.options.indexAttribute,n=e.getAttribute(t);return n?parseInt(n,10):(console.warn(`Missing attribute name '${t}={index}' on measured element.`),-1)},this.shouldMeasureDuringScroll=e=>{var t;if(!this.scrollState||"smooth"!==this.scrollState.behavior)return!0;let n=this.scrollState.index??(null==(t=this.getVirtualItemForOffset(this.scrollState.lastTargetOffset))?void 0:t.index);if(void 0!==n&&this.range){let t=Math.max(this.options.overscan,Math.ceil((this.range.endIndex-this.range.startIndex)/2)),i=Math.max(0,n-t),l=Math.min(this.options.count-1,n+t);return e>=i&&e<=l}return!0},this.measureElement=e=>{if(!e)return void this.elementsCache.forEach((e,t)=>{e.isConnected||(this.observer.unobserve(e),this.elementsCache.delete(t))});let t=this.indexFromElement(e),n=this.options.getItemKey(t),i=this.elementsCache.get(n);i!==e&&(i&&this.observer.unobserve(i),this.observer.observe(e),this.elementsCache.set(n,e)),(!this.isScrolling||this.scrollState)&&this.shouldMeasureDuringScroll(t)&&this.resizeItem(t,this.options.measureElement(e,void 0,this))},this.resizeItem=(e,t)=>{var n;let i=this.measurementsCache[e];if(!i)return;let l=t-(this.itemSizeCache.get(i.key)??i.size);0!==l&&((null==(n=this.scrollState)?void 0:n.behavior)!=="smooth"&&(void 0!==this.shouldAdjustScrollPositionOnItemSizeChange?this.shouldAdjustScrollPositionOnItemSizeChange(i,l,this):i.start<this.getScrollOffset()+this.scrollAdjustments)&&this._scrollToOffset(this.getScrollOffset(),{adjustments:this.scrollAdjustments+=l,behavior:void 0}),this.pendingMeasuredCacheIndexes.push(i.index),this.itemSizeCache=new Map(this.itemSizeCache.set(i.key,t)),this.notify(!1))},this.getVirtualItems=s(()=>[this.getVirtualIndexes(),this.getMeasurements()],(e,t)=>{let n=[];for(let i=0,l=e.length;i<l;i++){let l=t[e[i]];n.push(l)}return n},{key:!1,debug:()=>this.options.debug}),this.getVirtualItemForOffset=e=>{let t=this.getMeasurements();if(0!==t.length)return a(t[x(0,t.length-1,e=>a(t[e]).start,e)])},this.getMaxScrollOffset=()=>{if(!this.scrollElement)return 0;if("scrollHeight"in this.scrollElement)return this.options.horizontal?this.scrollElement.scrollWidth-this.scrollElement.clientWidth:this.scrollElement.scrollHeight-this.scrollElement.clientHeight;{let e=this.scrollElement.document.documentElement;return this.options.horizontal?e.scrollWidth-this.scrollElement.innerWidth:e.scrollHeight-this.scrollElement.innerHeight}},this.getOffsetForAlignment=(e,t,n=0)=>{if(!this.scrollElement)return 0;let i=this.getSize(),l=this.getScrollOffset();return"auto"===t&&(t=e>=l+i?"end":"start"),"center"===t?e+=(n-i)/2:"end"===t&&(e-=i),Math.max(Math.min(this.getMaxScrollOffset(),e),0)},this.getOffsetForIndex=(e,t="auto")=>{e=Math.max(0,Math.min(e,this.options.count-1));let n=this.getSize(),i=this.getScrollOffset(),l=this.measurementsCache[e];if(!l)return;if("auto"===t)if(l.end>=i+n-this.options.scrollPaddingEnd)t="end";else{if(!(l.start<=i+this.options.scrollPaddingStart))return[i,t];t="start"}if("end"===t&&e===this.options.count-1)return[this.getMaxScrollOffset(),t];let r="end"===t?l.end+this.options.scrollPaddingEnd:l.start-this.options.scrollPaddingStart;return[this.getOffsetForAlignment(r,t,l.size),t]},this.scrollToOffset=(e,{align:t="start",behavior:n="auto"}={})=>{let i=this.getOffsetForAlignment(e,t),l=this.now();this.scrollState={index:null,align:t,behavior:n,startedAt:l,lastTargetOffset:i,stableFrames:0},this._scrollToOffset(i,{adjustments:void 0,behavior:n}),this.scheduleScrollReconcile()},this.scrollToIndex=(e,{align:t="auto",behavior:n="auto"}={})=>{e=Math.max(0,Math.min(e,this.options.count-1));let i=this.getOffsetForIndex(e,t);if(!i)return;let[l,r]=i,o=this.now();this.scrollState={index:e,align:r,behavior:n,startedAt:o,lastTargetOffset:l,stableFrames:0},this._scrollToOffset(l,{adjustments:void 0,behavior:n}),this.scheduleScrollReconcile()},this.scrollBy=(e,{behavior:t="auto"}={})=>{let n=this.getScrollOffset()+e,i=this.now();this.scrollState={index:null,align:"start",behavior:t,startedAt:i,lastTargetOffset:n,stableFrames:0},this._scrollToOffset(n,{adjustments:void 0,behavior:t}),this.scheduleScrollReconcile()},this.getTotalSize=()=>{var e;let t,n=this.getMeasurements();if(0===n.length)t=this.options.paddingStart;else if(1===this.options.lanes)t=(null==(e=n[n.length-1])?void 0:e.end)??0;else{let e=Array(this.options.lanes).fill(null),i=n.length-1;for(;i>=0&&e.some(e=>null===e);){let t=n[i];null===e[t.lane]&&(e[t.lane]=t.end),i--}t=Math.max(...e.filter(e=>null!==e))}return Math.max(t-this.options.scrollMargin+this.options.paddingEnd,0)},this._scrollToOffset=(e,{adjustments:t,behavior:n})=>{this.options.scrollToFn(e,{behavior:n,adjustments:t},this)},this.measure=()=>{this.itemSizeCache=new Map,this.laneAssignments=new Map,this.notify(!1)},this.setOptions(e)}scheduleScrollReconcile(){if(!this.targetWindow){this.scrollState=null;return}null==this.rafId&&(this.rafId=this.targetWindow.requestAnimationFrame(()=>{this.rafId=null,this.reconcileScroll()}))}reconcileScroll(){if(!this.scrollState||!this.scrollElement)return;if(this.now()-this.scrollState.startedAt>5e3){this.scrollState=null;return}let e=null!=this.scrollState.index?this.getOffsetForIndex(this.scrollState.index,this.scrollState.align):void 0,t=e?e[0]:this.scrollState.lastTargetOffset,n=t!==this.scrollState.lastTargetOffset;if(!n&&1.01>Math.abs(t-this.getScrollOffset())){if(this.scrollState.stableFrames++,this.scrollState.stableFrames>=1){this.scrollState=null;return}}else this.scrollState.stableFrames=0,n&&(this.scrollState.lastTargetOffset=t,this.scrollState.behavior="auto",this._scrollToOffset(t,{adjustments:void 0,behavior:"auto"}));this.scheduleScrollReconcile()}}let x=(e,t,n,i)=>{for(;e<=t;){let l=(e+t)/2|0,r=n(l);if(r<i)e=l+1;else{if(!(r>i))return l;t=l-1}}return e>0?e-1:0},y="undefined"!=typeof document?l.useLayoutEffect:l.useEffect;var b=n(92253),S=n(20031),C=n(84241),k=n(4471),j=n(80469),z=n(30290),W=n(834),I=n(64209),T=n(13074),E=n(96052),A=n(98134),O=n(90456),_=n(58862),L=n(87584);let M={phantom:{mobile:{native:"phantom://",universal:"https://phantom.app/ul/"}},solflare:{mobile:{native:void 0,universal:"https://solflare.com/ul/v1/"}},metamask:{image_url:{sm:E.M,md:E.M}}};class F{static normalize(e){return e.replace(/[-_]wallet$/,"").replace(/[-_]extension$/,"").toLowerCase()}isEth(e){return e.chains.some(e=>e.includes("eip155:"))}isSol(e){return e.chains.some(e=>e.includes("solana:"))}inAllowList(e,t){if(!this.normalizedAllowList||0===this.normalizedAllowList.length||"listing"===t&&this.includeWalletConnect)return!0;let n=F.normalize(e);return this.normalizedAllowList.some(e=>n===F.normalize(e))}inDenyList(e,t){return"listing"===t&&"rabby"===e||"agw"===F.normalize(e)}chainMatches(e){return"ethereum-only"===this.chainFilter?"ethereum"===e:"solana-only"!==this.chainFilter||"solana"===e}getAllowListKey(e,t,n,i){let l=F.normalize(e);for(let e of this.normalizedAllowList||[])if(l===F.normalize(e))return e;if("connector"===t){if(("injected"===n||"solana_adapter"===n)&&"ethereum"===i&&this.detectedEth)return"detected_ethereum_wallets";if(("injected"===n||"solana_adapter"===n)&&"solana"===i&&this.detectedSol)return"detected_solana_wallets"}if("listing"===t&&this.includeWalletConnect)return"wallet_connect"}connectorOk(e){return!!("null"!==e.connectorType&&"walletconnect_solana"!==e.walletBranding.id&&this.chainMatches(e.chainType)&&(this.inAllowList(e.walletClientType,"connector")||("injected"===e.connectorType||"solana_adapter"===e.connectorType)&&("ethereum"===e.chainType&&this.detectedEth||"solana"===e.chainType&&this.detectedSol)))}listingOk(e){if(e.slug.includes("coinbase"))return!1;if("ethereum-only"===this.chainFilter){if(!this.isEth(e))return!1}else if("solana-only"===this.chainFilter&&!this.isSol(e))return!1;return!(!this.inAllowList(e.slug,"listing")||this.inDenyList(e.slug,"listing"))}getWallets(e,t){let n=new Map,i=e=>{let t=n.get(e.id);if(t){t.chainType!==e.chainType&&(t.chainType="multi");let n=new Set(t.chains);e.chains.forEach(e=>n.add(e)),t.chains=Array.from(n),!t.icon&&e.icon&&(t.icon=e.icon),!t.url&&e.url&&(t.url=e.url),!t.listing&&e.listing&&(t.listing=e.listing),!t.allowListKey&&e.allowListKey&&(t.allowListKey=e.allowListKey)}else n.set(e.id,e)};e.filter(e=>this.connectorOk(e)).forEach(e=>{let t=F.normalize(e.walletClientType);i({id:t,label:e.walletBranding?.name??t,source:"connector",connector:e,chainType:e.chainType,icon:e.walletBranding?.icon,url:void 0,chains:["ethereum"===e.chainType?"eip155":"solana"],allowListKey:this.getAllowListKey(e.walletClientType,"connector",e.connectorType,e.chainType)})});let l=e.find(e=>"wallet_connect_v2"===e.connectorType),r=e.find(e=>"walletconnect_solana"===e.walletBranding.id);t.filter(e=>this.listingOk(e)).forEach(t=>{let n=[...t.chains].filter(e=>e.includes("eip155:")||e.includes("solana:"));if(e.some(e=>F.normalize(e.walletClientType)===F.normalize(t.slug)&&"ethereum"===e.chainType&&"null"!==e.connectorType)||l||t.mobile.native||t.mobile.universal||E.m[t.slug]?.chainTypes.includes("ethereum")||(n=n.filter(e=>!e.includes("eip155:"))),e.some(e=>F.normalize(e.walletClientType)===F.normalize(t.slug)&&"solana"===e.chainType&&"null"!==e.connectorType)||r||t.mobile.native||t.mobile.universal||E.m[t.slug]?.chainTypes.includes("solana")||(n=n.filter(e=>!e.includes("solana:"))),!n.length)return;let o=F.normalize(t.slug),s=M[t.slug],a=s?.image_url?.sm||t.image_url?.sm;n.some(e=>e.includes("eip155:"))&&i({id:o,label:t.name||o,source:"listing",listing:t,chainType:"ethereum",icon:a,url:t.homepage,chains:n,allowListKey:this.getAllowListKey(t.slug,"listing")}),n.some(e=>e.includes("solana:"))&&i({id:o,label:t.name||o,source:"listing",listing:t,chainType:"solana",icon:a,url:t.homepage,chains:n,allowListKey:this.getAllowListKey(t.slug,"listing")})}),this.includeWalletConnectQr&&l&&i({id:"wallet_connect_qr",label:"WalletConnect",source:"connector",connector:l,chainType:"ethereum",icon:A.W,url:void 0,chains:["eip155"],allowListKey:"wallet_connect_qr"}),this.includeWalletConnectQrSolana&&r&&i({id:"wallet_connect_qr_solana",label:"WalletConnect",source:"connector",connector:r,chainType:"solana",icon:A.W,url:void 0,chains:["solana"],allowListKey:"wallet_connect_qr_solana"});let o=Array.from(n.values());o.forEach(e=>{let t=M[e.listing?.slug||e.id];t?.image_url?.sm&&(e.icon=t.image_url.sm)});let s=new Map;return this.normalizedAllowList?.forEach((e,t)=>{s.set(F.normalize(e),t)}),{wallets:o.slice().sort((e,t)=>{if(e.allowListKey&&t.allowListKey){let n=this.normalizedAllowList?.findIndex(t=>F.normalize(t)===F.normalize(e.allowListKey))??-1,i=this.normalizedAllowList?.findIndex(e=>F.normalize(e)===F.normalize(t.allowListKey))??-1;if(n!==i&&n>=0&&i>=0)return n-i}if(e.allowListKey&&!t.allowListKey)return -1;if(!e.allowListKey&&t.allowListKey)return 1;let n=F.normalize(e.id),i=F.normalize(t.id);"binance-defi"===n?n="binance":"universalprofiles"===n?n="universal_profile":"cryptocom-defi"===n?n="cryptocom":"bitkeep"===n&&(n="bitget_wallet"),"binance-defi"===i?i="binance":"universalprofiles"===i?i="universal_profile":"cryptocom-defi"===i?i="cryptocom":"bitkeep"===i&&(i="bitget_wallet");let l=s.has(n),r=s.has(i);return l&&r?s.get(n)-s.get(i):l?-1:r?1:"connector"===e.source&&"listing"===t.source?-1:"listing"===e.source&&"connector"===t.source?1:e.label.toLowerCase().localeCompare(t.label.toLowerCase())}),walletCount:o.length}}constructor(e,t){if(this.chainFilter=e,t&&t.length>0){if(this.normalizedAllowList=t.map(String),this.normalizedAllowList.includes("binance")){let e=this.normalizedAllowList.indexOf("binance");this.normalizedAllowList.splice(e+1,0,"binance-defi-wallet")}if(this.normalizedAllowList.includes("bitget_wallet")){let e=this.normalizedAllowList.indexOf("bitget_wallet");this.normalizedAllowList.splice(e+1,0,"bitkeep")}}this.detectedEth=this.normalizedAllowList?.includes("detected_ethereum_wallets")??!1,this.detectedSol=this.normalizedAllowList?.includes("detected_solana_wallets")??!1,this.includeWalletConnect=this.normalizedAllowList?.includes("wallet_connect")??!1,this.includeWalletConnectQr=this.normalizedAllowList?.includes("wallet_connect_qr")??!1,this.includeWalletConnectQrSolana=this.normalizedAllowList?.includes("wallet_connect_qr_solana")??!1}}var $=e=>(0,i.jsxs)("svg",{viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg",...e,children:[(0,i.jsx)("path",{d:"m0 0h32v32h-32z",fill:"#5469d4"}),(0,i.jsx)("path",{d:"m15.997 5.333-.143.486v14.106l.143.143 6.548-3.87z",fill:"#c2ccf4"}),(0,i.jsx)("path",{d:"m15.996 5.333-6.548 10.865 6.548 3.87z",fill:"#fff"}),(0,i.jsx)("path",{d:"m15.997 21.306-.08.098v5.025l.08.236 6.552-9.227z",fill:"#c2ccf4"}),(0,i.jsx)("path",{d:"m15.996 26.665v-5.36l-6.548-3.867z",fill:"#fff"}),(0,i.jsx)("path",{d:"m15.995 20.07 6.548-3.87-6.548-2.976v6.847z",fill:"#8698e8"}),(0,i.jsx)("path",{d:"m9.448 16.2 6.548 3.87v-6.846z",fill:"#c2ccf4"})]}),N=e=>(0,i.jsxs)("svg",{viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg",...e,children:[(0,i.jsxs)("linearGradient",{id:"a",gradientUnits:"userSpaceOnUse",x1:"7.233",x2:"24.766",y1:"24.766",y2:"7.234",children:[(0,i.jsx)("stop",{offset:"0",stopColor:"#9945ff"}),(0,i.jsx)("stop",{offset:".2",stopColor:"#7962e7"}),(0,i.jsx)("stop",{offset:"1",stopColor:"#00d18c"})]}),(0,i.jsx)("path",{d:"m0 0h32v32h-32z",fill:"#10111a"}),(0,i.jsx)("path",{clipRule:"evenodd",d:"m9.873 20.41a.645.645 0 0 1 .476-.21l14.662.012a.323.323 0 0 1 .238.54l-3.123 3.438a.643.643 0 0 1 -.475.21l-14.662-.012a.323.323 0 0 1 -.238-.54zm15.376-2.862a.322.322 0 0 1 -.238.54l-14.662.012a.642.642 0 0 1 -.476-.21l-3.122-3.44a.323.323 0 0 1 .238-.54l14.662-.012a.644.644 0 0 1 .475.21zm-15.376-9.738a.644.644 0 0 1 .476-.21l14.662.012a.322.322 0 0 1 .238.54l-3.123 3.438a.643.643 0 0 1 -.475.21l-14.662-.012a.323.323 0 0 1 -.238-.54z",fill:"url(#a)",fillRule:"evenodd"})]});S.I4.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`,S.I4.button`
  padding: 0.25rem;
  height: 30px;
  width: 30px;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--privy-border-radius-full);
  background: var(--privy-color-background-2);
`;let R=S.I4.div`
  position: relative;
  display: inline-flex;
  align-items: center;

  &::after {
    content: ' ';
    border-radius: var(--privy-border-radius-full);
    height: 6px;
    width: 6px;
    background-color: var(--privy-color-icon-success);
    position: absolute;
    right: -3px;
    top: -3px;
  }
`,B=S.I4.img`
  width: 32px;
  height: 32px;
  border-radius: 0.25rem;
  object-fit: contain;
`,D=S.I4.span`
  display: flex;
  gap: 0.25rem;
  align-items: center;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.125rem; /* 150% */
  border-radius: var(--privy-border-radius-sm);
  background-color: var(--privy-color-background-2);

  svg {
    width: 100%;
    max-width: 1rem;
    max-height: 1rem;
    stroke-width: 2;
  }
`;function K({enabled:e=!0,walletList:t,walletChainType:n}){let i=(0,I.u)(),{connectors:r}=(0,O.u)(),{listings:o,loading:s}=(0,E.f)(e),a=n??i.appearance.walletChainType,c=t??i.appearance?.walletList,d=(0,l.useMemo)(()=>new F(a,c),[a,c]),{wallets:h,walletCount:u}=(0,l.useMemo)(()=>d.getWallets(r,o),[d,r,o]),[p,g]=(0,l.useState)(""),m=(0,l.useMemo)(()=>p?h.filter(e=>e.label.toLowerCase().includes(p.toLowerCase())):h,[p,h]),[f,v]=(0,l.useState)();return{selected:f,setSelected:v,search:p,setSearch:g,loadingListings:s,wallets:m,walletCount:u}}S.I4.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 24rem;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-gutter: stable both-edges;
  scrollbar-width: none;
  -ms-overflow-style: none;

  ${e=>"light"===e.$colorScheme?"background: linear-gradient(var(--privy-color-background), var(--privy-color-background) 70%) bottom, linear-gradient(rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.06)) bottom;":"dark"===e.$colorScheme?"background: linear-gradient(var(--privy-color-background), var(--privy-color-background) 70%) bottom, linear-gradient(rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0.06)) bottom;":void 0}

  background-repeat: no-repeat;
  background-size:
    100% 32px,
    100% 16px;
  background-attachment: local, scroll;
`;let U=e=>!e||"string"!=typeof e&&(e instanceof E.d||e instanceof E.S),q=({index:e,style:t,data:n,recent:l})=>{let r=n.wallets[e],{walletChainType:o,handleWalletClick:s}=n,{t:a}=(0,T.u)(),c={...t,boxSizing:"border-box"};return r?(0,i.jsxs)(Q,{style:c,onClick:()=>s(r),children:[r.icon&&(r.connector&&!U(r.connector)?(0,i.jsx)(R,{children:"string"==typeof r.icon?(0,i.jsx)(B,{src:r.icon}):(0,i.jsx)(r.icon,{style:{width:"32px",height:"32px"}})}):"string"==typeof r.icon?(0,i.jsx)(B,{src:r.icon}):(0,i.jsx)(r.icon,{style:{width:"32px",height:"32px"}})),(0,i.jsx)(Z,{children:r.label}),l?(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(D,{children:a("connectWallet.lastUsed")}),(0,i.jsx)(Y,{children:(0,i.jsxs)(i.Fragment,{children:["ethereum-only"===o&&(0,i.jsx)($,{}),"solana-only"===o&&(0,i.jsx)(N,{})]})})]}):(0,i.jsx)(Y,{children:"ethereum-only"!==o&&"solana-only"!==o&&(0,i.jsxs)(i.Fragment,{children:[r.chains?.some(e=>e.startsWith("eip155"))&&(0,i.jsx)($,{}),r.chains?.some(e=>e.startsWith("solana"))&&(0,i.jsx)(N,{})]})})]}):null};var P=({className:e,customDescription:t,connectOnly:n,preSelectedWalletId:s,hideHeader:a,...c})=>{let d=(0,I.u)(),{t:h}=(0,T.u)(),{connectors:p}=(0,O.u)(),g=c.walletChainType||d.appearance.walletChainType,f=c.walletList||d.appearance?.walletList,{onBack:x,onClose:S,app:k}=c,{selected:R,setSelected:D,qrUrl:P,setQrUrl:ee,connecting:et,uiState:en,errorCode:ei,wallets:el,walletCount:er,handleConnect:eo,handleBack:es,showSearchBar:ea,isInitialConnectView:ec,title:ed,search:eh,setSearch:eu}=function({onConnect:e,onBack:t,onClose:n,onConnectError:i,walletList:r,walletChainType:o,app:s}){let a=(0,I.u)(),{connectors:c}=(0,O.u)(),{t:d}=(0,T.u)(),{wallets:h,walletCount:u,search:p,setSearch:g,selected:m,setSelected:f}=K({enabled:(0,E.s)(r??[]),walletList:r,walletChainType:o}),[v,w]=(0,l.useState)(),[x,y]=(0,l.useState)(),[S,C]=(0,l.useState)(),[k,j]=(0,l.useState)(),z=!m&&!S&&!k,W=z&&(u>6||p.length>0),_=c.find(e=>"wallet_connect_v2"===e.connectorType),L=(0,l.useCallback)(async(t,n)=>{if(!t)return;let l=n?.name??"Wallet";if(k?.connector!==t||"loading"!==v){if(w("loading"),"string"==typeof t)return A.c.debug("Connecting wallet via deeplink",{wallet:l,url:t.length>80?`${t.slice(0,80)}...`:t}),j({connector:t,name:l,icon:n?.icon,id:n?.id,url:n?.url}),void window.open(t,"_blank");A.c.debug("Connecting wallet via connector",{wallet:l,connectorType:t.connectorType}),j({connector:t,name:n?.name??t.walletBranding.name??"Wallet",icon:n?.icon??t.walletBranding.icon,id:n?.id,url:n?.url});try{let n=await t.connect({showPrompt:!0});if(!n)return A.c.warn("Wallet connection returned null",{wallet:l,connectorType:t.connectorType}),w("error"),y(void 0),void i?.(new O.P("Unable to connect wallet"));A.c.debug("Wallet connection successful",{wallet:l,connectorType:t.connectorType}),w("success"),y(void 0),(0,E.w)({address:n.address,client:n.walletClientType,appId:a.id}),setTimeout(()=>{e({connector:t,wallet:n})},I.q)}catch(n){if(n?.message?.includes("already pending for origin")||n?.message?.includes("wallet_requestPermissions"))return void A.c.debug("Connection request already pending, maintaining loading state",{wallet:l});let e=n instanceof Error?n.message:String(n?.message||"Unknown error");A.c.error("Wallet connection failed",n,{wallet:l,connectorType:t.connectorType,errorCode:n?.privyErrorCode}),w("error"),y(n?.privyErrorCode),i?.(n instanceof Error?n:new O.P(e||"Unable to connect wallet"))}}else A.c.debug("Duplicate connection attempt prevented",{wallet:l})},[a.id,e,k,v]),M=(0,l.useCallback)(()=>S?(w(void 0),y(void 0),j(void 0),void C(void 0)):k?(w(void 0),y(void 0),void j(void 0)):m?(w(void 0),y(void 0),j(void 0),void f(void 0)):"error"===v||"loading"===v?(w(void 0),y(void 0),void j(void 0)):void t?.(),[S,k,m,v,t]),F=(0,l.useMemo)(()=>k?.connector===_&&S&&b.Fr&&k?.name?d("connectWallet.goToWallet",{walletName:k.name}):k?.connector===_&&S&&k?.name?d("connectWallet.scanToConnect",{walletName:k.name}):S&&k?.name?d(b.Fr?"connectWallet.goToWallet":"connectWallet.scanToConnect",{walletName:k.name}):"string"==typeof k?.connector?d("connectWallet.openOrInstall",{walletName:k.name}):m&&!k?d("connectWallet.selectNetwork"):k?null:d("connectWallet.selectYourWallet"),[k,S,m,_,d]);return{selected:m,setSelected:f,qrUrl:S,setQrUrl:C,connecting:k,uiState:v,errorCode:x,search:p,setSearch:g,wallets:h,walletCount:u,wc:_,isInitialConnectView:z,showSearchBar:W,title:F,handleConnect:L,handleBack:M,onClose:n,onConnect:e,app:s}}({...c,walletList:f,walletChainType:g}),ep=p.find(e=>"wallet_connect_v2"===e.connectorType),eg=p.find(e=>"walletconnect_solana"===e.walletBranding.id),em=(0,l.useRef)(null),ef=function({useFlushSync:e=!0,...t}){let n=l.useReducer(()=>({}),{})[1],i={...t,onChange:(i,l)=>{var r;e&&l?(0,o.flushSync)(n):n(),null==(r=t.onChange)||r.call(t,i,l)}},[r]=l.useState(()=>new w(i));return r.setOptions(i),y(()=>r._didMount(),[]),y(()=>r._willUpdate()),r}({observeElementRect:u,observeElementOffset:m,scrollToFn:v,...{count:el.length,getScrollElement:()=>em.current,estimateSize:()=>56,overscan:6,gap:5}}),ev=(0,l.useCallback)(async e=>{let t="solana-only"!==g&&e.chains?.some(e=>e.startsWith("eip155")),i="ethereum-only"!==g&&e.chains?.some(e=>e.startsWith("solana")),l=()=>{let t=e.id;return E.m[t]||E.m[`${t}_wallet`]},r=t=>{let n=F.normalize(e.id);return p.find(e=>F.normalize(e.walletClientType)===n&&e.chainType===t&&"wallet_connect_v2"!==e.connectorType&&!("ethereum"===e.chainType&&e instanceof E.d||"solana"===e.chainType&&e instanceof E.S))},o=async()=>{if(!ep||!e.listing)return!1;let t=M[e.listing.slug]?{...e.listing,...M[e.listing.slug]}:e.listing;return ep.setWalletEntry(t,ee),await ep.resetConnection(e.id),await eo(ep,{name:e.label,icon:e.icon,id:e.id,url:e.url}),!0},s=async()=>!!eg&&!!e.listing&&(await eg.disconnect(),eg.wallet.setWalletEntry(e.listing,ee),await new Promise(e=>setTimeout(e,100)),await eo(eg,{name:e.label,icon:e.icon,id:e.id,url:e.url}),!0),a=async t=>{let i=(e=>{let t=l();if(t)return t.getMobileRedirect({isSolana:e,connectOnly:!!n,useUniversalLink:!1})})(t);return!!i&&(await eo(i,{name:e.label,icon:e.icon,id:e.id,url:e.url}),!0)};if(t&&i)D(e);else{if(t&&!i){let t=r("ethereum");if(t&&!U(t))return A.c.debug("Attempting injected EVM connection",{wallet:e.id,connectorType:t.connectorType}),void await eo(t,{name:e.label,icon:e.icon,id:e.id,url:e.url});if(b.Fr&&l()){if(await a(!1)||await o())return}else if(await o()||await a(!1))return}if(i&&!t){let t=r("solana");if(t&&!U(t))return A.c.debug("Attempting injected Solana connection",{wallet:e.id,connectorType:t.connectorType}),void await eo(t,{name:e.label,icon:e.icon,id:e.id,url:e.url});if(b.Fr){if(await a(!0)||await s())return}else if(await s()||await a(!0))return}if(!U(e.connector)){if(A.c.debug("Using fallback direct connector",{wallet:e.id,connectorType:e.connector?.connectorType}),ep&&"wallet_connect_v2"===e.connector?.connectorType)if(await ep.resetConnection(e.id),"wallet_connect_qr"!==e.id&&e.listing){let t=M[e.listing.slug]?{...e.listing,...M[e.listing.slug]}:e.listing;ep.setWalletEntry(t,ee)}else ep.setWalletEntry({id:"wallet_connect_qr",name:"WalletConnect",rdns:"",slug:"wallet-connect",homepage:"",chains:["eip155"],mobile:{native:"",universal:void 0}},ee);return eg&&"walletconnect_solana"===e.connector?.walletBranding.id&&(await eg.disconnect(),"wallet_connect_qr_solana"!==e.id&&e.listing?eg.wallet.setWalletEntry(e.listing,ee):eg.wallet.setWalletEntry({id:"wallet_connect_solana_qr",name:"WalletConnect",rdns:"",slug:"wallet-connect-solana",homepage:"",chains:["solana"],mobile:{native:"",universal:void 0}},ee),await new Promise(e=>setTimeout(e,100))),void await eo(e.connector,{name:e.label,icon:e.icon,id:e.id,url:e.url})}e.url?await eo(e.url,{name:e.label,icon:e.icon,id:e.id,url:e.url}):A.c.warn("No available connection method for wallet",{wallet:e.id})}},[ep,eg,eo,D,ee,g,n,p]);return(0,l.useEffect)(()=>{if(!s)return;let e=el.find(({id:e})=>e===s);e&&ev(e).catch(console.error)},[s]),(0,i.jsxs)(L.S,{className:e,children:[(0,i.jsx)(L.S.Header,{icon:a&&ec?void 0:et&&!P||P&&b.Fr&&et?.icon?et.icon:et?void 0:_.W,iconVariant:et&&!P||P&&b.Fr?"loading":void 0,iconLoadingStatus:et&&!P||P&&b.Fr?{success:"success"===en,fail:"error"===en}:void 0,title:a&&ec?void 0:et&&!P?h("connectWallet.waitingForWallet",{walletName:et.name}):P&&b.Fr?h("connectWallet.waitingForWallet",{walletName:et?.name??"connection"}):ed,subtitle:a&&ec?void 0:et&&!P&&"string"==typeof et.connector?h("connectWallet.installAndConnect",{walletName:et.name}):et&&!P&&"string"!=typeof et.connector?"error"===en?ei===O.c.NO_SOLANA_ACCOUNTS?`The connected wallet has no Solana accounts. Please add a Solana account in ${et.name} and try again.`:h("connectWallet.tryConnectingAgain"):h("connectionStatus.connectOneWallet"):ec?t??(k?h("connectWallet.connectToAccount",{appName:k.name}):null):null,showBack:!!x||!ec,showClose:!0,onBack:x||es,onClose:S}),(0,i.jsxs)(L.S.Body,{ref:em,$colorScheme:d.appearance.palette.colorScheme,style:{marginBottom:P?"0.5rem":void 0},children:[ea&&(0,i.jsx)(V,{children:(0,i.jsxs)(W.E,{style:{background:"transparent"},children:[(0,i.jsx)(E.C,{children:(0,i.jsx)(r,{})}),(0,i.jsx)("input",{className:"login-method-button",type:"text",placeholder:h("connectWallet.searchPlaceholder",{count:String(er)}),onChange:e=>eu(e.target.value),value:eh})]})}),P&&b.Fr&&"loading"===en&&(0,i.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem"},children:[(0,i.jsx)(C.a,{variant:"primary",onClick:()=>window.open(P.universal??P.native,"_blank"),style:{width:"100%"},children:h("connectWallet.openInApp")}),(0,i.jsx)(J,{value:P.universal??P.native,iconOnly:!0,children:"Copy link"})]}),P&&!b.Fr&&"loading"===en&&(0,i.jsx)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem"},children:(0,i.jsx)(J,{value:P.universal??P.native,iconOnly:!0,children:h("connectWallet.copyLink")})}),P&&!b.Fr&&(0,i.jsx)(z.Q,{size:280,url:P.universal??P.native,squareLogoElement:et?.icon?"string"==typeof et.icon?e=>(0,i.jsx)("svg",{...e,children:(0,i.jsx)("image",{href:et.icon,height:e.height,width:e.width})}):et.icon:A.B}),P&&!b.Fr&&et?.url&&("binance"===et.id||"binanceus"===et.id||"binance-defi"===et.id)&&(0,i.jsxs)(X,{children:[(0,i.jsxs)("span",{children:["Don't have ",et.name,"? "]}),(0,i.jsx)(j.L,{href:et.url,target:"_blank",size:"sm",children:"Download here"})]}),(0,i.jsxs)(H,{children:[et&&!P&&"string"==typeof et.connector&&(0,i.jsxs)(Q,{onClick:()=>window.open(et.connector,"_blank"),children:[et.icon&&("string"==typeof et.icon?(0,i.jsx)(B,{src:et.icon}):(0,i.jsx)(et.icon,{})),(0,i.jsx)(Z,{children:et.name})]}),R?.chains.some(e=>e.startsWith("eip155"))&&!et&&(0,i.jsxs)(Q,{onClick:()=>ev({...R,chains:R.chains.filter(e=>e.startsWith("eip155"))}),children:[R.icon&&("string"==typeof R.icon?(0,i.jsx)(B,{src:R.icon}):(0,i.jsx)(R.icon,{})),(0,i.jsx)(Z,{children:R.label}),(0,i.jsx)(Y,{children:(0,i.jsx)($,{})})]}),R?.chains.some(e=>e.startsWith("solana"))&&!et&&(0,i.jsxs)(Q,{onClick:()=>ev({...R,chains:R.chains.filter(e=>e.startsWith("solana"))}),children:[R.icon&&("string"==typeof R.icon?(0,i.jsx)(B,{src:R.icon}):(0,i.jsx)(R.icon,{})),(0,i.jsx)(Z,{children:R.label}),(0,i.jsx)(Y,{children:(0,i.jsx)(N,{})})]}),ec&&(0,i.jsxs)(i.Fragment,{children:[!(er>0)&&(0,i.jsx)(G,{children:h("connectWallet.noWalletsFound")}),er>0&&!P&&(0,i.jsx)("div",{style:{maxHeight:56*Math.min(el.length,5)+5,width:"100%"},children:(0,i.jsx)("div",{style:{height:`${ef.getTotalSize()}px`,width:"100%",position:"relative"},children:ef.getVirtualItems().map(e=>(0,i.jsx)(q,{index:e.index,style:{position:"absolute",top:0,left:0,height:`${e.size}px`,transform:`translateY(${e.start}px)`},data:{wallets:el,walletChainType:g,handleWalletClick:ev}},e.key))})})]})]})]}),(0,i.jsxs)(L.S.Footer,{children:[et&&!P&&"string"!=typeof et.connector&&"error"===en&&(0,i.jsx)(L.S.Actions,{children:(0,i.jsx)(C.a,{style:{width:"100%",alignItems:"center"},variant:"error",onClick:()=>eo(et.connector,{name:et.name,icon:et.icon,id:et.id,url:et.url}),children:h("connectWallet.retry")})}),!!(k&&k.legal.privacyPolicyUrl&&k.legal.termsAndConditionsUrl)&&(0,i.jsx)(C.T,{app:k,alwaysShowImplicitConsent:!0}),(0,i.jsx)(L.S.Watermark,{})]})]})};let V=S.I4.div`
  position: sticky;
  // Offset by negative margin to account for focus outline
  margin-top: -3px;
  padding-top: 3px;
  top: -3px;
  z-index: 1;
  background: var(--privy-color-background);
  padding-bottom: calc(var(--screen-space) / 2);
`,H=S.I4.div`
  display: flex;
  flex-direction: column;
  gap: ${5}px;
`,Q=S.I4.button`
  && {
    gap: 0.5rem;
    align-items: center;
    display: flex;
    position: relative;
    text-align: left;
    font-weight: 500;
    transition: background 200ms ease-in;
    width: calc(100% - 4px);
    border-radius: var(--privy-border-radius-md);
    padding: 0.75em;
    border: 1px solid var(--privy-color-foreground-4);
    justify-content: space-between;
  }

  &:hover {
    background: var(--privy-color-background-2);
  }
`,Y=S.I4.span`
  display: flex;
  align-items: center;
  justify-content: end;
  position: relative;

  & > svg {
    border-radius: var(--privy-border-radius-full);
    stroke-width: 2.5;
    width: 100%;
    max-height: 1rem;
    max-width: 1rem;
    flex-shrink: 0;
  }

  & > svg:not(:last-child) {
    border-radius: var(--privy-border-radius-full);
    margin-right: -0.375rem;
  }
`,G=S.I4.div`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`,Z=S.I4.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--privy-color-foreground);
  font-weight: 400;
  flex: 1;
`,J=(0,S.I4)(k.C)`
  && {
    margin: 0.5rem auto 0 auto;
  }
`,X=S.I4.div`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--privy-color-foreground-3);
`},55211:(e,t,n)=>{n.d(t,{E:()=>l});var i=n(20031);let l=i.I4.span`
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.125rem; /* 150% */

  color: var(--privy-color-error);
`},58862:(e,t,n)=>{n.d(t,{W:()=>l});var i=n(95155);let l=({...e})=>(0,i.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",...e,children:[(0,i.jsx)("rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}),(0,i.jsx)("path",{d:"M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2"}),(0,i.jsx)("path",{d:"M3 11h3c.8 0 1.6.3 2.1.9l1.1.9c1.6 1.6 4.1 1.6 5.7 0l1.1-.9c.5-.5 1.3-.9 2.1-.9H21"})]})},80469:(e,t,n)=>{n.d(t,{L:()=>o});var i=n(95155),l=n(20031);let r=l.I4.a`
  && {
    color: ${({$variant:e})=>"underlined"===e?"var(--privy-color-foreground)":"var(--privy-link-navigation-color, var(--privy-color-accent))"};
    font-weight: 400;
    text-decoration: ${({$variant:e})=>"underlined"===e?"underline":"var(--privy-link-navigation-decoration, none)"};
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;
    cursor: ${({$disabled:e})=>e?"not-allowed":"pointer"};
    opacity: ${({$disabled:e})=>e?.5:1};

    font-size: ${({$size:e})=>{switch(e){case"xs":return"12px";case"sm":return"14px";default:return"16px"}}};

    line-height: ${({$size:e})=>{switch(e){case"xs":return"18px";case"sm":return"22px";default:return"24px"}}};

    transition:
      color 200ms ease,
      text-decoration-color 200ms ease,
      opacity 200ms ease;

    &:hover {
      color: ${({$variant:e,$disabled:t})=>"underlined"===e?"var(--privy-color-foreground)":"var(--privy-link-navigation-color, var(--privy-color-accent))"};
      text-decoration: ${({$disabled:e})=>e?"none":"underline"};
      text-underline-offset: 4px;
    }

    &:active {
      color: ${({$variant:e,$disabled:t})=>t?"underlined"===e?"var(--privy-color-foreground)":"var(--privy-link-navigation-color, var(--privy-color-accent))":"var(--privy-color-foreground)"};
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px #949df9;
      border-radius: 2px;
    }
  }
`,o=({size:e="md",variant:t="navigation",disabled:n=!1,as:l,children:o,onClick:s,...a})=>(0,i.jsx)(r,{as:l,$size:e,$variant:t,$disabled:n,onClick:e=>{n?e.preventDefault():s?.(e)},...a,children:o})},87584:(e,t,n)=>{n.d(t,{S:()=>S});var i=n(95155),l=n(12115),r=n(20031),o=n(96052),s=n(84241),a=n(95204);let c=r.I4.div`
  /* spacing tokens */
  --screen-space: 16px; /* base 1x = 16 */
  --screen-space-lg: calc(var(--screen-space) * 1.5); /* 24px */

  position: relative;
  overflow: hidden;
  margin: 0 calc(-1 * var(--screen-space)); /* extends over modal padding */
  height: 100%;
  border-radius: var(--privy-border-radius-lg);
`,d=r.I4.div`
  display: flex;
  flex-direction: column;
  gap: calc(var(--screen-space) * 1.5);
  width: 100%;
  background: var(--privy-color-background);
  padding: 0 var(--screen-space-lg) var(--screen-space);
  height: 100%;
  border-radius: var(--privy-border-radius-lg);
`,h=r.I4.div`
  position: relative;
  display: flex;
  flex-direction: column;
`,u=(0,r.I4)(s.M)`
  margin: 0 -8px;
`,p=r.I4.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;

  /* Enable scrolling */
  overflow-y: auto;

  /* Hide scrollbar but keep functionality when scrollable */
  /* Add padding for focus outline space, offset with negative margin */
  padding: 3px;
  margin: -3px;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-gutter: stable both-edges;
  scrollbar-width: none;
  -ms-overflow-style: none;

  /* Gradient effect for scroll indication */
  ${({$colorScheme:e})=>"light"===e?"background: linear-gradient(var(--privy-color-background), var(--privy-color-background) 70%) bottom, linear-gradient(rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.06)) bottom;":"dark"===e?"background: linear-gradient(var(--privy-color-background), var(--privy-color-background) 70%) bottom, linear-gradient(rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0.06)) bottom;":void 0}

  background-repeat: no-repeat;
  background-size:
    100% 32px,
    100% 16px;
  background-attachment: local, scroll;
`,g=r.I4.div`
  display: flex;
  flex-direction: column;
  gap: var(--screen-space-lg);
  margin-top: 1.5rem;
`,m=r.I4.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--screen-space);
`,f=r.I4.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,v=r.I4.h3`
  && {
    font-size: 20px;
    line-height: 32px;
    font-weight: 500;
    color: var(--privy-color-foreground);
    margin: 0;
  }
`,w=r.I4.p`
  && {
    margin: 0;
    font-size: 16px;
    font-weight: 300;
    line-height: 24px;
    color: var(--privy-color-foreground);
  }
`,x=r.I4.div`
  background: ${({$variant:e})=>{switch(e){case"success":return"var(--privy-color-success-bg, #EAFCEF)";case"warning":return"var(--privy-color-warn, #FEF3C7)";case"error":return"var(--privy-color-error-bg, #FEE2E2)";case"loading":case"logo":return"transparent";default:return"var(--privy-color-background-2)"}}};

  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`,y=r.I4.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img,
  svg {
    max-height: 90px;
    max-width: 180px;
  }
`,b=r.I4.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 82px;

  > div {
    position: relative;
  }

  > div > :first-child {
    position: relative;
  }

  > div > :last-child {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`,S=({children:e,...t})=>(0,i.jsx)(c,{children:(0,i.jsx)(d,{...t,children:e})}),C=r.I4.div`
  position: absolute;
  top: 0;
  left: calc(-1 * var(--screen-space-lg));
  width: calc(100% + calc(var(--screen-space-lg) * 2));
  height: 4px;
  background: var(--privy-color-background-2);
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  overflow: hidden;
`,k=(0,r.I4)(s.B)`
  padding: 0;
  && a {
    padding: 0;
    color: var(--privy-color-foreground-3);
  }
`,j=r.I4.div`
  height: 100%;
  width: ${({pct:e})=>e}%;
  background: var(--privy-color-foreground-3);
  border-radius: 2px;
  transition: width 300ms ease-in-out;
`,z=({step:e})=>e?(0,i.jsx)(C,{children:(0,i.jsx)(j,{pct:Math.min(100,e.current/e.total*100)})}):null;S.Header=({title:e,subtitle:t,icon:n,iconVariant:l,iconLoadingStatus:r,showBack:o,onBack:s,showInfo:a,onInfo:c,showClose:d,onClose:p,step:g,headerTitle:x,...y})=>(0,i.jsxs)(h,{...y,children:[(0,i.jsx)(u,{backFn:o?s:void 0,infoFn:a?c:void 0,onClose:d?p:void 0,title:x,closeable:d}),(n||l||e||t)&&(0,i.jsxs)(m,{children:[n||l?(0,i.jsx)(S.Icon,{icon:n,variant:l,loadingStatus:r}):null,!(!e&&!t)&&(0,i.jsxs)(f,{children:[e&&(0,i.jsx)(v,{children:e}),t&&(0,i.jsx)(w,{children:t})]})]}),g&&(0,i.jsx)(z,{step:g})]}),(S.Body=l.forwardRef(({children:e,...t},n)=>(0,i.jsx)(p,{ref:n,...t,children:e}))).displayName="Screen.Body",S.Footer=({children:e,...t})=>(0,i.jsx)(g,{id:"privy-content-footer-container",...t,children:e}),S.Actions=({children:e,...t})=>(0,i.jsx)(W,{...t,children:e}),S.HelpText=({children:e,...t})=>(0,i.jsx)(I,{...t,children:e}),S.FooterText=({children:e,...t})=>(0,i.jsx)(T,{...t,children:e}),S.Watermark=()=>(0,i.jsx)(k,{}),S.Icon=({icon:e,variant:t="subtle",loadingStatus:n})=>"logo"===t&&e?(0,i.jsx)(y,"string"==typeof e?{children:(0,i.jsx)("img",{src:e,alt:""})}:l.isValidElement(e)?{children:e}:{children:l.createElement(e)}):"loading"===t?e?(0,i.jsx)(b,{children:(0,i.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,i.jsx)(o.N,{success:n?.success,fail:n?.fail}),"string"==typeof e?(0,i.jsx)("span",{style:{background:`url('${e}') 0 0 / contain`,height:"38px",width:"38px",borderRadius:"6px",margin:"auto",backgroundSize:"contain"}}):l.isValidElement(e)?l.cloneElement(e,{style:{width:"38px",height:"38px"}}):l.createElement(e,{style:{width:"38px",height:"38px"}})]})}):(0,i.jsx)(x,{$variant:t,children:(0,i.jsx)(a.N,{size:"64px"})}):(0,i.jsx)(x,{$variant:t,children:e&&("string"==typeof e?(0,i.jsx)("img",{src:e,alt:"",style:{width:"32px",height:"32px",borderRadius:"6px"}}):l.isValidElement(e)?e:l.createElement(e,{width:32,height:32,stroke:(()=>{switch(t){case"success":return"var(--privy-color-icon-success)";case"warning":return"var(--privy-color-icon-warning)";case"error":return"var(--privy-color-icon-error)";default:return"var(--privy-color-icon-muted)"}})(),strokeWidth:2}))});let W=r.I4.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: calc(var(--screen-space) / 2);
`,I=r.I4.div`
  && {
    margin: 0;
    width: 100%;
    text-align: center;
    color: var(--privy-color-foreground-2);
    font-size: 13px;
    line-height: 20px;

    & a {
      text-decoration: underline;
    }
  }
`,T=r.I4.div`
  && {
    margin-top: -1rem;
    width: 100%;
    text-align: center;
    color: var(--privy-color-foreground-2);
    font-size: 0.6875rem; // 11px
    line-height: 1rem; // 16px
  }
`},95204:(e,t,n)=>{n.d(t,{N:()=>r});var i=n(95155),l=n(20031);let r=({size:e,centerIcon:t})=>(0,i.jsx)(o,{$size:e,children:(0,i.jsxs)(s,{children:[(0,i.jsx)(c,{}),(0,i.jsx)(d,{}),t?(0,i.jsx)(a,{children:t}):null]})}),o=l.I4.div`
  --spinner-size: ${e=>e.$size?e.$size:"96px"};

  display: inline-flex;
  justify-content: center;
  align-items: center;

  @media all and (display-mode: standalone) {
    margin-bottom: 30px;
  }
`,s=l.I4.div`
  position: relative;
  height: var(--spinner-size);
  width: var(--spinner-size);

  opacity: 1;
  animation: fadein 200ms ease;
`,a=l.I4.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  svg,
  img {
    width: calc(var(--spinner-size) * 0.4);
    height: calc(var(--spinner-size) * 0.4);
    border-radius: var(--privy-border-radius-full);
  }
`,c=l.I4.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: var(--spinner-size);
  height: var(--spinner-size);

  && {
    border: 4px solid var(--privy-color-border-default);
    border-radius: 50%;
  }
`,d=l.I4.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: var(--spinner-size);
  height: var(--spinner-size);
  animation: spin 1200ms linear infinite;

  && {
    border: 4px solid;
    border-color: var(--privy-color-icon-subtle) transparent transparent transparent;
    border-radius: 50%;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`}}]);