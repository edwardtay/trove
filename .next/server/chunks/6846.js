"use strict";exports.id=6846,exports.ids=[6846],exports.modules={15198:(a,b,c)=>{c.d(b,{S:()=>w});var d=c(21124),e=c(38301),f=c(78858),g=c(99848),h=c(7797),i=c(69456);let j=f.I4.div`
  /* spacing tokens */
  --screen-space: 16px; /* base 1x = 16 */
  --screen-space-lg: calc(var(--screen-space) * 1.5); /* 24px */

  position: relative;
  overflow: hidden;
  margin: 0 calc(-1 * var(--screen-space)); /* extends over modal padding */
  height: 100%;
  border-radius: var(--privy-border-radius-lg);
`,k=f.I4.div`
  display: flex;
  flex-direction: column;
  gap: calc(var(--screen-space) * 1.5);
  width: 100%;
  background: var(--privy-color-background);
  padding: 0 var(--screen-space-lg) var(--screen-space);
  height: 100%;
  border-radius: var(--privy-border-radius-lg);
`,l=f.I4.div`
  position: relative;
  display: flex;
  flex-direction: column;
`,m=(0,f.I4)(h.M)`
  margin: 0 -8px;
`,n=f.I4.div`
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
  ${({$colorScheme:a})=>"light"===a?"background: linear-gradient(var(--privy-color-background), var(--privy-color-background) 70%) bottom, linear-gradient(rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.06)) bottom;":"dark"===a?"background: linear-gradient(var(--privy-color-background), var(--privy-color-background) 70%) bottom, linear-gradient(rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 0.06)) bottom;":void 0}

  background-repeat: no-repeat;
  background-size:
    100% 32px,
    100% 16px;
  background-attachment: local, scroll;
`,o=f.I4.div`
  display: flex;
  flex-direction: column;
  gap: var(--screen-space-lg);
  margin-top: 1.5rem;
`,p=f.I4.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--screen-space);
`,q=f.I4.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,r=f.I4.h3`
  && {
    font-size: 20px;
    line-height: 32px;
    font-weight: 500;
    color: var(--privy-color-foreground);
    margin: 0;
  }
`,s=f.I4.p`
  && {
    margin: 0;
    font-size: 16px;
    font-weight: 300;
    line-height: 24px;
    color: var(--privy-color-foreground);
  }
`,t=f.I4.div`
  background: ${({$variant:a})=>{switch(a){case"success":return"var(--privy-color-success-bg, #EAFCEF)";case"warning":return"var(--privy-color-warn, #FEF3C7)";case"error":return"var(--privy-color-error-bg, #FEE2E2)";case"loading":case"logo":return"transparent";default:return"var(--privy-color-background-2)"}}};

  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`,u=f.I4.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img,
  svg {
    max-height: 90px;
    max-width: 180px;
  }
`,v=f.I4.div`
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
`,w=({children:a,...b})=>(0,d.jsx)(j,{children:(0,d.jsx)(k,{...b,children:a})}),x=f.I4.div`
  position: absolute;
  top: 0;
  left: calc(-1 * var(--screen-space-lg));
  width: calc(100% + calc(var(--screen-space-lg) * 2));
  height: 4px;
  background: var(--privy-color-background-2);
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  overflow: hidden;
`,y=(0,f.I4)(h.B)`
  padding: 0;
  && a {
    padding: 0;
    color: var(--privy-color-foreground-3);
  }
`,z=f.I4.div`
  height: 100%;
  width: ${({pct:a})=>a}%;
  background: var(--privy-color-foreground-3);
  border-radius: 2px;
  transition: width 300ms ease-in-out;
`,A=({step:a})=>a?(0,d.jsx)(x,{children:(0,d.jsx)(z,{pct:Math.min(100,a.current/a.total*100)})}):null;w.Header=({title:a,subtitle:b,icon:c,iconVariant:e,iconLoadingStatus:f,showBack:g,onBack:h,showInfo:i,onInfo:j,showClose:k,onClose:n,step:o,headerTitle:t,...u})=>(0,d.jsxs)(l,{...u,children:[(0,d.jsx)(m,{backFn:g?h:void 0,infoFn:i?j:void 0,onClose:k?n:void 0,title:t,closeable:k}),(c||e||a||b)&&(0,d.jsxs)(p,{children:[c||e?(0,d.jsx)(w.Icon,{icon:c,variant:e,loadingStatus:f}):null,!(!a&&!b)&&(0,d.jsxs)(q,{children:[a&&(0,d.jsx)(r,{children:a}),b&&(0,d.jsx)(s,{children:b})]})]}),o&&(0,d.jsx)(A,{step:o})]}),(w.Body=e.forwardRef(({children:a,...b},c)=>(0,d.jsx)(n,{ref:c,...b,children:a}))).displayName="Screen.Body",w.Footer=({children:a,...b})=>(0,d.jsx)(o,{id:"privy-content-footer-container",...b,children:a}),w.Actions=({children:a,...b})=>(0,d.jsx)(B,{...b,children:a}),w.HelpText=({children:a,...b})=>(0,d.jsx)(C,{...b,children:a}),w.FooterText=({children:a,...b})=>(0,d.jsx)(D,{...b,children:a}),w.Watermark=()=>(0,d.jsx)(y,{}),w.Icon=({icon:a,variant:b="subtle",loadingStatus:c})=>"logo"===b&&a?(0,d.jsx)(u,"string"==typeof a?{children:(0,d.jsx)("img",{src:a,alt:""})}:e.isValidElement(a)?{children:a}:{children:e.createElement(a)}):"loading"===b?a?(0,d.jsx)(v,{children:(0,d.jsxs)("div",{style:{display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,d.jsx)(g.N,{success:c?.success,fail:c?.fail}),"string"==typeof a?(0,d.jsx)("span",{style:{background:`url('${a}') 0 0 / contain`,height:"38px",width:"38px",borderRadius:"6px",margin:"auto",backgroundSize:"contain"}}):e.isValidElement(a)?e.cloneElement(a,{style:{width:"38px",height:"38px"}}):e.createElement(a,{style:{width:"38px",height:"38px"}})]})}):(0,d.jsx)(t,{$variant:b,children:(0,d.jsx)(i.N,{size:"64px"})}):(0,d.jsx)(t,{$variant:b,children:a&&("string"==typeof a?(0,d.jsx)("img",{src:a,alt:"",style:{width:"32px",height:"32px",borderRadius:"6px"}}):e.isValidElement(a)?a:e.createElement(a,{width:32,height:32,stroke:(()=>{switch(b){case"success":return"var(--privy-color-icon-success)";case"warning":return"var(--privy-color-icon-warning)";case"error":return"var(--privy-color-icon-error)";default:return"var(--privy-color-icon-muted)"}})(),strokeWidth:2}))});let B=f.I4.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: calc(var(--screen-space) / 2);
`,C=f.I4.div`
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
`,D=f.I4.div`
  && {
    margin-top: -1rem;
    width: 100%;
    text-align: center;
    color: var(--privy-color-foreground-2);
    font-size: 0.6875rem; // 11px
    line-height: 1rem; // 16px
  }
`},21737:(a,b,c)=>{c.d(b,{a:()=>f,g:()=>e});var d=c(39499);function e(a,b=6,c=!1,d=!1){let f=(parseFloat(a.toString())/1e9).toFixed(b).replace(/0+$/,"").replace(/\.$/,""),g=d?"":" SOL";return c?`${f}${g}`:`${"0"===f?"<0.001":f}${g}`}function f({amount:a,fee:b,tokenPrice:c,isUsdc:f}){let g=BigInt(Math.floor(parseFloat(a)*10**(f?6:9))),h=f?g:g+b;return{fundingAmountInBaseUnit:g,fundingAmountInUsd:c?(0,d.g)(g,c):void 0,totalPriceInUsd:c?(0,d.g)(h,c):void 0,totalPriceInNativeCurrency:e(h),feePriceInNativeCurrency:e(b),feePriceInUsd:c?(0,d.g)(b,c):void 0}}},27829:(a,b,c)=>{c.d(b,{B:()=>e,C:()=>h,F:()=>j,H:()=>g,R:()=>n,S:()=>l,a:()=>k,b:()=>m,c:()=>i,d:()=>o,e:()=>f});var d=c(78858);let e=d.I4.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  margin-top: auto;
  gap: 16px;
  flex-grow: 100;
`,f=d.I4.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  width: 100%;
`,g=d.I4.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`,h=(0,d.I4)(f)`
  padding: 20px 0;
`,i=(0,d.I4)(f)`
  gap: 16px;
`,j=d.I4.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`,k=d.I4.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;d.I4.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;let l=d.I4.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  gap: 8px;
  padding: 16px;
  margin-top: 16px;
  margin-bottom: 16px;
  width: 100%;
  background: var(--privy-color-background-2);
  border-radius: var(--privy-border-radius-md);
  && h4 {
    color: var(--privy-color-foreground-3);
    font-size: 14px;
    text-decoration: underline;
    font-weight: medium;
  }
  && p {
    color: var(--privy-color-foreground-3);
    font-size: 14px;
  }
`,m=d.I4.div`
  height: 16px;
`,n=d.I4.div`
  height: 12px;
`;d.I4.div`
  position: relative;
`;let o=d.I4.div`
  height: ${a=>a.height??"12"}px;
`;d.I4.div`
  background-color: var(--privy-color-accent);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border-color: white;
  border-width: 2px !important;
`},29535:(a,b,c)=>{c.d(b,{T:()=>I});var d=c(21124),e=c(78858),f=c(35849),g=c(33092),h=c(27829),i=c(50987),j=c(38301),k=c(64317);let l=({label:a,children:b,valueStyles:c})=>(0,d.jsxs)(m,{children:[(0,d.jsx)("div",{children:a}),(0,d.jsx)(n,{style:{...c},children:b})]}),m=e.I4.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  > :first-child {
    color: var(--privy-color-foreground-3);
    text-align: left;
  }

  > :last-child {
    color: var(--privy-color-foreground-2);
    text-align: right;
  }
`,n=e.I4.div`
  font-size: 14px;
  line-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--privy-border-radius-full);
  background-color: var(--privy-color-background-2);
  padding: 4px 8px;
`,o=({gas:a,tokenPrice:b,tokenSymbol:c})=>(0,d.jsxs)(h.F,{style:{paddingBottom:"12px"},children:[(0,d.jsxs)(q,{children:[(0,d.jsx)(s,{children:"Est. Fees"}),(0,d.jsx)("div",{children:(0,d.jsx)(f.P,{weiQuantities:[BigInt(a)],tokenPrice:b,tokenSymbol:c})})]}),b&&(0,d.jsx)(r,{children:`${(0,g.g)(BigInt(a),c)}`})]}),p=({value:a,gas:b,tokenPrice:c,tokenSymbol:e})=>{let i=BigInt(a??0)+BigInt(b);return(0,d.jsxs)(h.F,{children:[(0,d.jsxs)(q,{children:[(0,d.jsx)(s,{children:"Total (including fees)"}),(0,d.jsx)("div",{children:(0,d.jsx)(f.P,{weiQuantities:[BigInt(a||0),BigInt(b)],tokenPrice:c,tokenSymbol:e})})]}),c&&(0,d.jsx)(r,{children:(0,g.g)(i,e)})]})},q=e.I4.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 4px;
`,r=e.I4.div`
  display: flex;
  flex-direction: row;
  height: 12px;

  font-size: 12px;
  line-height: 12px;
  color: var(--privy-color-foreground-3);
  font-weight: 400;
`,s=e.I4.div`
  font-size: 14px;
  line-height: 22.4px;
  font-weight: 400;
`,t=(0,j.createContext)(void 0),u=(0,j.createContext)(void 0),v=({defaultValue:a,children:b})=>{let[c,e]=(0,j.useState)(a||null);return(0,d.jsx)(t.Provider,{value:{activePanel:c,togglePanel:a=>{e(c===a?null:a)}},children:(0,d.jsx)(A,{children:b})})},w=({value:a,children:b})=>{let{activePanel:c,togglePanel:e}=(0,j.useContext)(t),f=c===a;return(0,d.jsx)(u.Provider,{value:{onToggle:()=>e(a),value:a},children:(0,d.jsx)(E,{isActive:f?"true":"false","data-open":String(f),children:b})})},x=({children:a})=>{let{activePanel:b}=(0,j.useContext)(t),{onToggle:c,value:e}=(0,j.useContext)(u),f=b===e;return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(B,{onClick:c,"data-open":String(f),children:[(0,d.jsx)(D,{children:a}),(0,d.jsx)(H,{isactive:f?"true":"false",children:(0,d.jsx)(i.A,{height:"16px",width:"16px",strokeWidth:"2"})})]}),(0,d.jsx)(C,{})]})},y=({children:a})=>{let{activePanel:b}=(0,j.useContext)(t),{value:c}=(0,j.useContext)(u);return(0,d.jsx)(F,{"data-open":String(b===c),children:(0,d.jsx)(G,{children:a})})},z=({children:a})=>{let{activePanel:b}=(0,j.useContext)(t),{value:c}=(0,j.useContext)(u);return(0,d.jsx)(G,{children:"function"==typeof a?a({isActive:b===c}):a})},A=e.I4.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`,B=e.I4.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
  padding-bottom: 8px;
`,C=e.I4.div`
  width: 100%;

  && {
    border-top: 1px solid;
    border-color: var(--privy-color-foreground-4);
  }
  padding-bottom: 12px;
`,D=e.I4.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 19.6px;
  width: 100%;
  padding-right: 8px;
`,E=e.I4.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  padding: 12px;

  && {
    border: 1px solid;
    border-color: var(--privy-color-foreground-4);
    border-radius: var(--privy-border-radius-md);
  }
`,F=e.I4.div`
  position: relative;
  overflow: hidden;
  transition: max-height 25ms ease-out;

  &[data-open='true'] {
    max-height: 700px;
  }

  &[data-open='false'] {
    max-height: 0;
  }
`,G=e.I4.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1 1 auto;
  min-height: 1px;
`,H=e.I4.div`
  transform: ${a=>"true"===a.isactive?"rotate(180deg)":"rotate(0deg)"};
`,I=({from:a,to:b,txn:c,transactionInfo:e,tokenPrice:g,gas:h,tokenSymbol:i})=>{let j=BigInt(c?.value||0);return(0,d.jsx)(v,{...(0,k.u)().render.standalone?{defaultValue:"details"}:{},children:(0,d.jsxs)(w,{value:"details",children:[(0,d.jsx)(x,{children:(0,d.jsxs)(J,{children:[(0,d.jsx)("div",{children:e?.title||"Details"}),(0,d.jsx)(K,{children:(0,d.jsx)(f.H,{weiQuantities:[j],tokenPrice:g,tokenSymbol:i})})]})}),(0,d.jsxs)(y,{children:[(0,d.jsx)(l,{label:"From",children:(0,d.jsx)(f.W,{walletAddress:a,chainId:c.chainId||k.s,chainType:"ethereum"})}),(0,d.jsx)(l,{label:"To",children:(0,d.jsx)(f.W,{walletAddress:b,chainId:c.chainId||k.s,chainType:"ethereum"})}),e&&e.action&&(0,d.jsx)(l,{label:"Action",children:e.action}),h&&(0,d.jsx)(o,{value:c.value,gas:h,tokenPrice:g,tokenSymbol:i})]}),(0,d.jsx)(z,{children:({isActive:a})=>(0,d.jsx)(p,{value:c.value,displayFee:a,gas:h||"0x0",tokenPrice:g,tokenSymbol:i})})]})})},J=e.I4.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`,K=e.I4.div`
  flex-shrink: 0;
  padding-left: 8px;
`},33092:(a,b,c)=>{c.d(b,{a:()=>j,b:()=>n,c:()=>i,g:()=>k,p:()=>l,s:()=>m});var d=c(38775),e=c(87230),f=c(44110);let g=new Intl.NumberFormat(void 0,{style:"currency",currency:"USD",maximumFractionDigits:2}),h=a=>g.format(a),i=(a,b)=>{let c=h(b*parseFloat(a));return"$0.00"!==c?c:"<$0.01"},j=(a,b)=>{let c=h(b*parseFloat((0,d.c)(a)));return"$0.00"===c?"<$0.01":c},k=(a,b,c=6,d=!1)=>`${l(a,c,d)} ${b}`,l=(a,b=6,c=!1)=>{let e=parseFloat((0,d.c)(a)).toFixed(b).replace(/0+$/,"").replace(/\.$/,"");return c?e:`${"0"===e?"<0.001":e}`},m=a=>a.reduce((a,b)=>a+b,0n),n=(a,b)=>{let{chains:c}=(0,e.u)(),d=`https://etherscan.io/address/${b}`,g=`${(0,f.G)(a,c)}/address/${b}`;if(!g)return d;try{new URL(g)}catch{return d}return g}},35849:(a,b,c)=>{c.d(b,{H:()=>k,P:()=>l,S:()=>m,W:()=>r});var d=c(21124),e=c(78858),f=c(90256),g=c(33092),h=c(39499),i=c(21737),j=c(44110);let k=({weiQuantities:a,tokenPrice:b,tokenSymbol:c})=>{let e=(0,g.s)(a),f=b?(0,g.a)(e,b):void 0,h=(0,g.g)(e,c);return(0,d.jsx)(n,{children:f||h})},l=({weiQuantities:a,tokenPrice:b,tokenSymbol:c})=>{let e=(0,g.s)(a),f=b?(0,g.a)(e,b):void 0,h=(0,g.g)(e,c);return(0,d.jsx)(n,{children:f?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(o,{children:"USD"}),"<$0.01"===f?(0,d.jsxs)(q,{children:[(0,d.jsx)(p,{children:"<"}),"$0.01"]}):f]}):h})},m=({quantities:a,tokenPrice:b,tokenSymbol:c="SOL",tokenDecimals:e=9})=>{let g=a.reduce((a,b)=>a+b,0n),j=b&&"SOL"===c&&9===e?(0,h.g)(g,b):void 0,k="SOL"===c&&9===e?(0,i.g)(g):`${(0,f.J)(g,e)} ${c}`;return(0,d.jsx)(n,{children:j?(0,d.jsx)(d.Fragment,{children:"<$0.01"===j?(0,d.jsxs)(q,{children:[(0,d.jsx)(p,{children:"<"}),"$0.01"]}):j}):k})},n=e.I4.span`
  font-size: 14px;
  line-height: 140%;
  display: flex;
  gap: 4px;
  align-items: center;
`,o=e.I4.span`
  font-size: 12px;
  line-height: 12px;
  color: var(--privy-color-foreground-3);
`,p=e.I4.span`
  font-size: 10px;
`,q=e.I4.span`
  display: flex;
  align-items: center;
`,r=a=>{var b,c;return(0,d.jsx)(s,{href:"ethereum"===a.chainType?(0,g.b)(a.chainId,a.walletAddress):(b=a.walletAddress,c=a.chainId,`https://explorer.solana.com/account/${b}?chain=${c}`),target:"_blank",children:(0,j.w)(a.walletAddress)})},s=e.I4.a`
  &:hover {
    text-decoration: underline;
  }
`},39499:(a,b,c)=>{c.d(b,{A:()=>h,D:()=>k,J:()=>j,L:()=>d,R:()=>i,S:()=>e,T:()=>f,a:()=>g,g:()=>l});let d=1e9,e="11111111111111111111111111111111",f="TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",g="TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",h="ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",i=["CPMMoo8L3F4NbTegBCKVNunggL7H1ZpdTHKxQB5qKP1C","CPMDWBwJDtYax9qW7AyRuVC19Cc4L4Vcy4n2BHAbHkCW"],j=["JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4"],k={"solana:mainnet":{EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v:{symbol:"USDC",decimals:6,address:"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"},Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB:{symbol:"USDT",decimals:6,address:"Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"},So11111111111111111111111111111111111111112:{symbol:"SOL",decimals:9,address:"So11111111111111111111111111111111111111112"}},"solana:devnet":{"4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU":{symbol:"USDC",decimals:6,address:"4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"},EJwZgeZrdC8TXTQbQBoL6bfuAnFUUy1PVCMB4DYPzVaS:{symbol:"USDT",decimals:6,address:"EJwZgeZrdC8TXTQbQBoL6bfuAnFUUy1PVCMB4DYPzVaS"},So11111111111111111111111111111111111111112:{symbol:"SOL",decimals:9,address:"So11111111111111111111111111111111111111112"}},"solana:testnet":{}};function l(a,b){let c=parseFloat(a.toString())/d,e=m.format(b*c);return"$0.00"===e?"<$0.01":e}let m=new Intl.NumberFormat(void 0,{style:"currency",currency:"USD",maximumFractionDigits:2})},50987:(a,b,c)=>{c.d(b,{A:()=>e});var d=c(38301);let e=d.forwardRef(function({title:a,titleId:b,...c},e){return d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:e,"aria-labelledby":b},c),a?d.createElement("title",{id:b},a):null,d.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m19.5 8.25-7.5 7.5-7.5-7.5"}))})},69456:(a,b,c)=>{c.d(b,{N:()=>f});var d=c(21124),e=c(78858);let f=({size:a,centerIcon:b})=>(0,d.jsx)(g,{$size:a,children:(0,d.jsxs)(h,{children:[(0,d.jsx)(j,{}),(0,d.jsx)(k,{}),b?(0,d.jsx)(i,{children:b}):null]})}),g=e.I4.div`
  --spinner-size: ${a=>a.$size?a.$size:"96px"};

  display: inline-flex;
  justify-content: center;
  align-items: center;

  @media all and (display-mode: standalone) {
    margin-bottom: 30px;
  }
`,h=e.I4.div`
  position: relative;
  height: var(--spinner-size);
  width: var(--spinner-size);

  opacity: 1;
  animation: fadein 200ms ease;
`,i=e.I4.div`
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
`,j=e.I4.div`
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
`,k=e.I4.div`
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
`},74995:(a,b,c)=>{c.d(b,{S:()=>g});var d=c(21124),e=c(7797),f=c(15198);let g=({primaryCta:a,secondaryCta:b,helpText:c,footerText:g,watermark:h=!0,children:i,...j})=>{let k=a||b?(0,d.jsxs)(d.Fragment,{children:[a&&(()=>{let{label:b,...c}=a,f=c.variant||"primary";return(0,d.jsx)(e.a,{...c,variant:f,style:{width:"100%",...c.style},children:b})})(),b&&(()=>{let{label:a,...c}=b,f=c.variant||"secondary";return(0,d.jsx)(e.a,{...c,variant:f,style:{width:"100%",...c.style},children:a})})()]}):null;return(0,d.jsxs)(f.S,{id:j.id,className:j.className,children:[(0,d.jsx)(f.S.Header,{...j}),i?(0,d.jsx)(f.S.Body,{children:i}):null,c||k||h?(0,d.jsxs)(f.S.Footer,{children:[c?(0,d.jsx)(f.S.HelpText,{children:c}):null,k?(0,d.jsx)(f.S.Actions,{children:k}):null,h?(0,d.jsx)(f.S.Watermark,{}):null]}):null,g?(0,d.jsx)(f.S.FooterText,{children:g}):null]})}},82389:(a,b,c)=>{c.d(b,{u:()=>e});var d=c(80866);function e(a){let b=a.filter(a=>!d.o.has(a.id));return d.m.concat(b)}},86833:(a,b,c)=>{c.d(b,{u:()=>f});var d=c(38301),e=c(87230);let f=({enabled:a=!0}={})=>{let{showFiatPrices:b,getUsdPriceForSol:c}=(0,e.u)(),[f,g]=(0,d.useState)(!0),[h,i]=(0,d.useState)(void 0),[j,k]=(0,d.useState)(void 0);return(0,d.useEffect)(()=>{(async()=>{if(b&&a)try{g(!0);let a=await c();a?k(a):i(Error("Unable to fetch SOL price"))}catch(a){i(a)}finally{g(!1)}else g(!1)})()},[]),{solPrice:j,isSolPriceLoading:f,solPriceError:h}}},88402:(a,b,c)=>{c.d(b,{u:()=>i});var d=c(38301),e=c(82389),f=c(64317),g=c(87230),h=c(86833);function i(a){let{tokenPrice:b,isTokenPriceLoading:c,tokenPriceError:i}=(a=>{let{showFiatPrices:b,getUsdTokenPrice:c,chains:h}=(0,g.u)(),[i,j]=(0,d.useState)(!0),[k,l]=(0,d.useState)(void 0),[m,n]=(0,d.useState)(void 0);return(0,d.useEffect)(()=>{a||=f.s;let d=(0,e.u)(h).find(b=>b.id===Number(a));(async()=>{if(b){if(!d)return j(!1),l(Error(`Unable to fetch token price on chain id ${a}`));try{j(!0);let a=await c(d);a?n(a):l(Error(`Unable to fetch token price on chain id ${d.id}`))}catch(a){l(a)}finally{j(!1)}}else j(!1)})()},[a]),{tokenPrice:m,isTokenPriceLoading:i,tokenPriceError:k}})("solana"===a?-1:a),{solPrice:j,isSolPriceLoading:k,solPriceError:l}=(0,h.u)({enabled:"solana"===a});return"solana"===a?{tokenPrice:j,isTokenPriceLoading:k,tokenPriceError:l}:{tokenPrice:b,isTokenPriceLoading:c,tokenPriceError:i}}},92073:(a,b,c)=>{c.d(b,{A:()=>e});var d=c(38301);let e=d.forwardRef(function({title:a,titleId:b,...c},e){return d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:e,"aria-labelledby":b},c),a?d.createElement("title",{id:b},a):null,d.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"}))})}};