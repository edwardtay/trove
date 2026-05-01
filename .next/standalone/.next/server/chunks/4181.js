"use strict";exports.id=4181,exports.ids=[4181],exports.modules={15198:(a,b,c)=>{c.d(b,{S:()=>w});var d=c(21124),e=c(38301),f=c(78858),g=c(99848),h=c(7797),i=c(69456);let j=f.I4.div`
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
`},30831:(a,b,c)=>{c.d(b,{e:()=>e});var d=c(78858);let e=d.I4.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 82px;

  > div {
    position: relative;
  }

  > div > span {
    position: absolute;
    left: -41px;
    top: -41px;
  }

  > div > :last-child {
    position: absolute;
    left: -19px;
    top: -19px;
  }
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
`},36236:(a,b,c)=>{c.d(b,{A:()=>e});var d=c(38301);let e=d.forwardRef(function({title:a,titleId:b,...c},e){return d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:e,"aria-labelledby":b},c),a?d.createElement("title",{id:b},a):null,d.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"}))})},39499:(a,b,c)=>{c.d(b,{A:()=>h,D:()=>k,J:()=>j,L:()=>d,R:()=>i,S:()=>e,T:()=>f,a:()=>g,g:()=>l});let d=1e9,e="11111111111111111111111111111111",f="TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",g="TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",h="ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",i=["CPMMoo8L3F4NbTegBCKVNunggL7H1ZpdTHKxQB5qKP1C","CPMDWBwJDtYax9qW7AyRuVC19Cc4L4Vcy4n2BHAbHkCW"],j=["JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4"],k={"solana:mainnet":{EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v:{symbol:"USDC",decimals:6,address:"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"},Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB:{symbol:"USDT",decimals:6,address:"Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"},So11111111111111111111111111111111111111112:{symbol:"SOL",decimals:9,address:"So11111111111111111111111111111111111111112"}},"solana:devnet":{"4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU":{symbol:"USDC",decimals:6,address:"4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"},EJwZgeZrdC8TXTQbQBoL6bfuAnFUUy1PVCMB4DYPzVaS:{symbol:"USDT",decimals:6,address:"EJwZgeZrdC8TXTQbQBoL6bfuAnFUUy1PVCMB4DYPzVaS"},So11111111111111111111111111111111111111112:{symbol:"SOL",decimals:9,address:"So11111111111111111111111111111111111111112"}},"solana:testnet":{}};function l(a,b){let c=parseFloat(a.toString())/d,e=m.format(b*c);return"$0.00"===e?"<$0.01":e}let m=new Intl.NumberFormat(void 0,{style:"currency",currency:"USD",maximumFractionDigits:2})},41149:(a,b,c)=>{c.r(b),c.d(b,{StandardSignAndSendTransactionScreen:()=>T,default:()=>T});var d=c(21124),e=c(38301),f=c(29054),g=c(23966),h=c(64317),i=c(87230),j=c(86833),k=c(51169),l=c(36236),m=c(78858),n=c(7797),o=c(27829),p=c(45470),q=c(9050),r=c(93588),s=c(35849),t=c(30831),u=c(99848),v=c(48365),w=c(21737),x=c(60561),y=c(19037),z=c(55860);function A(a){return Object.freeze({executable:a.executable,lamports:a.lamports,programAddress:a.owner,space:a.space})}async function B(a,b,c={}){let{abortSignal:d,...e}=c;return(await a.getMultipleAccounts(b,{...e,encoding:"jsonParsed"}).send({abortSignal:d})).value.map((a,c)=>a&&"object"==typeof a&&"parsed"in a.data?function(a,b){if(!b)return Object.freeze({address:a,exists:!1});let c=b.data.parsed.info||{};return(b.data.program||b.data.parsed.type)&&(c.parsedAccountMeta={program:b.data.program,type:b.data.parsed.type}),Object.freeze({...A(b),address:a,data:c,exists:!0})}(b[c],a):function(a,b){if(!b)return Object.freeze({address:a,exists:!1});let c=(0,z.Iz)().encode(b.data[0]);return Object.freeze({...A(b),address:a,data:c,exists:!0})}(b[c],a))}async function C(a,b,c){if(0===a.length)return{};let d=await B(b,a,c),e=d.filter(a=>(!("exists"in a)||"exists"in a&&a.exists)&&a.data instanceof Uint8Array);if(e.length>0){let a=e.map(a=>a.address);throw new y.tsw(y.sf7,{addresses:a})}let f=d.filter(a=>!a.exists);if(f.length>0){let a=f.map(a=>a.address);throw new y.tsw(y.mMN,{addresses:a})}return d.reduce((a,b)=>({...a,[b.address]:b.data.addresses}),{})}var D=c(90715),E=c(96807),F=c(83126),G=c(39499);c(22967),c(18521),c(32571),c(21398),c(61946);let H=m.I4.span`
  && {
    width: 82px;
    height: 82px;
    border-width: 4px;
    border-style: solid;
    border-color: ${a=>a.color??"var(--privy-color-accent)"};
    background-color: ${a=>a.color??"var(--privy-color-accent)"};
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
  }
`,I=({instruction:a,fees:b,transactionInfo:c,solPrice:e,chain:f})=>(0,d.jsxs)(q.a,{children:[c?.action&&(0,d.jsxs)(q.R,{children:[(0,d.jsx)(r.L,{children:"Action"}),(0,d.jsx)(r.V,{children:c.action})]}),null!=a?.total&&(0,d.jsxs)(q.R,{children:[(0,d.jsx)(r.L,{children:"Total"}),(0,d.jsx)(r.V,{children:a.total})]}),!a?.total&&null!=a?.amount&&(0,d.jsxs)(q.R,{children:[(0,d.jsx)(r.L,{children:"Total"}),(0,d.jsx)(r.V,{children:(0,d.jsx)(s.S,{quantities:[a.amount,b],tokenPrice:e})})]}),(0,d.jsxs)(q.R,{children:[(0,d.jsx)(r.L,{children:"Fees"}),(0,d.jsx)(r.V,{children:(0,d.jsx)(s.S,{quantities:[b],tokenPrice:e})})]}),a?.to&&(0,d.jsxs)(q.R,{children:[(0,d.jsx)(r.L,{children:"To"}),(0,d.jsx)(r.V,{children:(0,d.jsx)(s.W,{walletAddress:a.to,chainId:f,chainType:"solana"})})]})]}),J=({fees:a,onClose:b,receiptHeader:c,receiptDescription:e,transactionInfo:f,solPrice:g,signOnly:h,instruction:i,chain:j})=>(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(n.M,{onClose:b}),(0,d.jsx)(t.e,{style:{marginBottom:"16px"},children:(0,d.jsxs)("div",{children:[(0,d.jsx)(H,{color:"var(--privy-color-success-light)"}),(0,d.jsx)(l.A,{height:38,width:38,strokeWidth:2,stroke:"var(--privy-color-success)"})]})}),(0,d.jsx)(p.C,{title:c??`Transaction ${h?"signed":"complete"}!`,description:e??"You're all set."}),(0,d.jsx)(I,{solPrice:g,instruction:i,fees:a,transactionInfo:f,chain:j}),(0,d.jsx)(u.G,{}),(0,d.jsx)(K,{loading:!1,onClick:b,children:"Close"}),(0,d.jsx)(o.R,{}),(0,d.jsx)(n.B,{})]}),K=(0,m.I4)(n.P)`
  && {
    margin-top: 24px;
  }
  transition:
    color 350ms ease,
    background-color 350ms ease;
`;async function L(a,b){try{return await a}catch{return b}}async function M({privyClient:a,chain:b,mint:c}){let d=G.D[b];if(!d[c]){let e=await a.getSplTokenMetadata({mintAddress:c,cluster:function(a){switch(a){case"solana:mainnet":return"mainnet-beta";case"solana:devnet":return"devnet";case"solana:testnet":return"testnet"}}(b)});e&&(d[c]={address:c,symbol:e.symbol,decimals:e.decimals})}return d[c]}async function N({tx:a,solanaClient:b,privyClient:c,checkFunds:d}){let e=(0,x.fr)().decode((0,F.a)(a)),f=e.staticAccounts[0]??"",g=await (0,F.f)({solanaClient:b,tx:a}),h=d?await L((0,F.s)({solanaClient:b,tx:a})):void 0,i=h?.hasFunds??!0,j={},k=[],l=await async function({solanaClient:a,message:b}){if(!("addressTableLookups"in b)||!b.addressTableLookups)return[...b.staticAccounts];let c=b.addressTableLookups.map(a=>a.lookupTableAddress),d=await C(c,a.rpc),e=c.map((a,c)=>[...b.addressTableLookups[c]?.writableIndexes.map(b=>{let e=d[a]?.[b];if(e)return{key:e,isWritable:!0,altIdx:c}})??[],...b.addressTableLookups[c]?.readonlyIndexes.map(b=>{let e=d[a]?.[b];if(e)return{key:e,isWritable:!1,altIdx:c}})??[]]).flat().filter(a=>!!a).sort((a,b)=>a.isWritable!==b.isWritable?a.isWritable?-1:1:a.altIdx-b.altIdx).map(({key:a})=>a);return[...b.staticAccounts,...e]}({solanaClient:b,message:e});for(let a of e.instructions){let d=e.staticAccounts[a.programAddressIndex]||"";if(d!==G.T&&d!==G.a)if(d!==G.S){if(d===G.A){let b=await L(function(a,b,c){let[d,e,f,g]=a.accountIndices?.map(a=>b[a])??[];return{type:"ata-creation",program:c,payer:d,ata:e,owner:f,mint:g}}(a,l,d));if(!b){k.push({type:"unknown",program:d,discriminator:a.data?.[0]});continue}if(k.push(b),b.ata&&b.owner&&b.mint){j[b.ata]={owner:b.owner,mint:b.mint};continue}}if(G.R.includes(d)){let e=await L(R(a,l,b,c,d));if(!e){k.push({type:"unknown",program:d,discriminator:a.data?.[0]});continue}k.push(e)}else if(G.J.includes(d)){let e=await L(S(a,l,b,c,d));if(!e){k.push({type:"unknown",program:d,discriminator:a.data?.[0]});continue}k.push(e)}else k.push({type:"unknown",program:d,discriminator:a.data?.[0]})}else{let b=await L(Q(a,l));if(!b){k.push({type:"unknown",program:d,discriminator:a.data?.[0]});continue}k.push(b)}else{let e=await L(P(a,l,b,c,j,d));if(!e){k.push({type:"unknown",program:d,discriminator:a.data?.[0]});continue}k.push(e),"spl-transfer"===e.type&&(e.fromAta&&e.fromAccount&&e.token.address&&(j[e.fromAta]??={owner:e.fromAccount,mint:e.token.address}),e.toAta&&e.toAccount&&e.token.address&&(j[e.toAta]??={owner:e.toAccount,mint:e.token.address}))}}return{spender:f,fee:g,instructions:k,hasFunds:!!i}}function O(a,b=0){try{return function(a,b=0){let c=0n;for(let d=0;d<8;d++)c|=BigInt(a[b+d])<<BigInt(8*d);return c}(a,b)}catch{}try{return a.readBigInt64LE(b)}catch{}let c=(0,F.b)(a);try{return((a,b=0)=>{let c=a[b],d=a[b+7];if(!c||!d)throw Error(`Buffer offset out of range: first: ${c}, last: ${d}.`);return(BigInt(a[b+4]+256*a[b+5]+65536*a[b+6]+(d<<24))<<32n)+BigInt(c+256*a[++b]+65536*a[++b]+0x1000000*a[++b])})(c)}catch{}try{return c.subarray(b).readBigInt64LE()}catch{}try{return c.readBigInt64LE(b)}catch{}return 0n}async function P(a,b,c,d,e,f){let g=a.data?.[0],h=a.accountIndices?.map(a=>b[a])??[];if(1===g){let[a,b,c]=h;return{type:"spl-init-account",program:f,account:a,mint:b,owner:c}}if(3===g){let b,g,[i,j,k]=h,l="",m=j?e[j]:void 0;if(m)b=m.owner,l=m.mint;else if(j){let a=await c.rpc.getAccountInfo(j,{commitment:"confirmed",encoding:"jsonParsed"}).send(),d=a.value?.data;b=d?.parsed?.info?.owner,l=d?.parsed?.info?.mint??"",g=d?.parsed?.info?.tokenAmount?.decimals}if(!l&&i){let a=await c.rpc.getAccountInfo(i,{commitment:"confirmed",encoding:"jsonParsed"}).send(),b=a.value?.data;l=b?.parsed?.info?.mint??""}let n=await M({privyClient:d,chain:c.chain,mint:l}),o=n?.symbol??"";return g??=n?.decimals??9,{type:"spl-transfer",program:f,fromAta:i,fromAccount:k,toAta:j,toAccount:b,value:O(a.data,1),token:{symbol:o,decimals:g,address:l}}}if(9===g){let[a,b,c]=h;return{type:"spl-close-account",program:f,source:a,destination:b,owner:c}}if(17===g)return{type:"spl-sync-native",program:f};throw Error(`Token program instruction type ${g} not supported`)}async function Q(a,b){let c=a.data?.[0],d=a.accountIndices?.map(a=>b[a])??[];if(0===c){let[,b]=d;return{type:"create-account",program:G.S,account:b?.toString(),value:O(a.data,4),withSeed:!1}}if(2===c){let[b,c]=d;return{type:"sol-transfer",program:G.S,fromAccount:b,toAccount:c,token:{symbol:"SOL",decimals:9},value:O(a.data,4),withSeed:!1}}if(3===c){let[,b]=d;return{type:"create-account",program:G.S,account:b,withSeed:!0,value:O(a.data.slice(a.data.length-32-8-8))}}if(11===c){let[b,c]=d;return{type:"sol-transfer",program:G.S,fromAccount:b,toAccount:c,value:O(a.data,4),token:{symbol:"SOL",decimals:9},withSeed:!0}}throw Error(`System program instruction type ${c} not supported`)}async function R(a,b,c,d,e){let f=a.accountIndices?.map(a=>b[a])??[],g=a.data?.[0];if(143===g){let b=f[10],g=f[11];return{type:"raydium-swap-base-input",program:e,mintIn:b,mintOut:g,tokenIn:b?await M({privyClient:d,chain:c.chain,mint:b}):void 0,tokenOut:g?await M({privyClient:d,chain:c.chain,mint:g}):void 0,amountIn:O(a.data,8),minimumAmountOut:O(a.data,16)}}if(55===g){let b=f[10],g=f[11];return{type:"raydium-swap-base-output",program:e,mintIn:b,mintOut:g,tokenIn:b?await M({privyClient:d,chain:c.chain,mint:b}):void 0,tokenOut:g?await M({privyClient:d,chain:c.chain,mint:g}):void 0,maxAmountIn:O(a.data,8),amountOut:O(a.data,16)}}throw Error(`Raydium swap program instruction type ${g} not supported`)}async function S(a,b,c,d,e){let f=a.data?.[0],g=a.accountIndices?.map(a=>b[a])??[];if([208,51,239,151,123,43,237,92].includes(f)){let b=g[5],f=g[6];return{type:"jupiter-swap-exact-out-route",program:e,mintIn:b,mintOut:f,tokenIn:b?await M({privyClient:d,chain:c.chain,mint:b}):void 0,tokenOut:f?await M({privyClient:d,chain:c.chain,mint:f}):void 0,outAmount:O(a.data,a.data.length-1-2-8-8),quotedInAmount:O(a.data,a.data.length-1-2-8)}}if([176,209,105,168,154,125,69,62].includes(f)){let b=g[7],f=g[8];return{type:"jupiter-swap-exact-out-route",program:e,mintIn:b,mintOut:f,tokenIn:b?await M({privyClient:d,chain:c.chain,mint:b}):void 0,tokenOut:f?await M({privyClient:d,chain:c.chain,mint:f}):void 0,outAmount:O(a.data,a.data.length-1-2-8-8),quotedInAmount:O(a.data,a.data.length-1-2-8)}}if([193,32,155,51,65,214,156,129].includes(f)){let b=g[7],f=g[8];return{type:"jupiter-swap-shared-accounts-route",program:e,mintIn:b,mintOut:f,tokenIn:b?await M({privyClient:d,chain:c.chain,mint:b}):void 0,tokenOut:f?await M({privyClient:d,chain:c.chain,mint:f}):void 0,inAmount:O(a.data,a.data.length-1-2-8-8),quotedOutAmount:O(a.data,a.data.length-1-2-8)}}throw[62,198,214,193,213,159,108,210].includes(f)&&console.warn("Jupiter swap program instruction 'claim' not implemented"),[116,206,27,191,166,19,0,73].includes(f)&&console.warn("Jupiter swap program instruction 'claim_token' not implemented"),[26,74,236,151,104,64,183,249].includes(f)&&console.warn("Jupiter swap program instruction 'close_token' not implemented"),[229,194,212,172,8,10,134,147].includes(f)&&console.warn("Jupiter swap program instruction 'create_open_orders' not implemented"),[28,226,32,148,188,136,113,171].includes(f)&&console.warn("Jupiter swap program instruction 'create_program_open_orders' not implemented"),[232,242,197,253,240,143,129,52].includes(f)&&console.warn("Jupiter swap program instruction 'create_token_ledger' not implemented"),[147,241,123,100,244,132,174,118].includes(f)&&console.warn("Jupiter swap program instruction 'create_token_account' not implemented"),[229,23,203,151,122,227,173,42].includes(f)&&console.warn("Jupiter swap program instruction 'route' not implemented"),[150,86,71,116,167,93,14,104].includes(f)&&console.warn("Jupiter swap program instruction 'route_with_token_ledger' not implemented"),[228,85,185,112,78,79,77,2].includes(f)&&console.warn("Jupiter swap program instruction 'set_token_ledger' not implemented"),[230,121,143,80,119,159,106,170].includes(f)&&console.warn("Jupiter swap program instruction 'shared_accounts_route_with_token_ledger' not implemented"),Error(`Jupiter swap program instruction type ${f} not supported`)}let T={component:()=>{let{data:a,onUserCloseViaDialogOrKeybindRef:b,setModalData:c,navigate:l}=(0,g.a)(),{client:m,closePrivyModal:n,walletProxy:o,showFiatPrices:p}=(0,i.u)(),q=(0,h.u)(),{user:r}=(0,g.u)(),s=(0,F.u)()(a?.standardSignAndSendTransaction?.chain??"solana:mainnet"),[t,u]=(0,e.useState)(a?.standardSignAndSendTransaction?.transaction),[y,A]=(0,e.useState)(),[B,C]=(0,e.useState)(),[H,I]=(0,e.useState)({value:0n,isLoading:!1}),[K,L]=(0,e.useState)(!1),[M,O]=(0,e.useState)({}),[P,Q]=(0,e.useState)(),R=a?.standardSignAndSendTransaction?.account,S=!!a?.standardSignAndSendTransaction?.signOnly,T=!!a?.standardSignAndSendTransaction?.isSponsored,U=R?.imported?(0,g.h)(r).find(a=>a.address===R.address):(0,g.g)(r),{solPrice:V,isSolPriceLoading:W}=(0,j.u)({enabled:p}),X=(0,e.useMemo)(()=>{if(!y)return;let a=y.spender,b=(0,w.g)(y.fee),c=(0,w.g)(H.value,3,!0),d=y.instructions.filter(a=>["sol-transfer","spl-transfer","raydium-swap-base-input","raydium-swap-base-output","jupiter-swap-shared-accounts-route","jupiter-swap-exact-out-route"].includes(a.type)),e=d.at(0);return!e||d.length>1?{fee:b,spender:a,balance:c}:"sol-transfer"===e.type?{fee:b,spender:a,balance:c,total:(0,w.g)(e.value)}:"spl-transfer"===e.type?{fee:b,spender:a,balance:c,total:`${(0,f.NJ)({amount:e.value,decimals:e.token.decimals})} ${e.token.symbol}`}:"raydium-swap-base-input"===e.type&&e.tokenIn&&e.tokenOut?{fee:b,spender:a,balance:c,swap:`${(0,f.NJ)({amount:e.amountIn,decimals:e.tokenIn.decimals})} ${e.tokenIn.symbol} → ${(0,f.NJ)({amount:e.minimumAmountOut,decimals:e.tokenOut.decimals})} ${e.tokenOut.symbol}`}:"raydium-swap-base-output"===e.type&&e.tokenIn&&e.tokenOut?{fee:b,spender:a,balance:c,swap:`${(0,f.NJ)({amount:e.maxAmountIn,decimals:e.tokenIn.decimals})} ${e.tokenIn.symbol} → ${(0,f.NJ)({amount:e.amountOut,decimals:e.tokenOut.decimals})} ${e.tokenOut.symbol}`}:"jupiter-swap-shared-accounts-route"===e.type&&e.tokenIn&&e.tokenOut?{fee:b,spender:a,balance:c,swap:`${(0,f.NJ)({amount:e.inAmount,decimals:e.tokenIn.decimals})} ${e.tokenIn.symbol} → ${(0,f.NJ)({amount:e.quotedOutAmount,decimals:e.tokenOut.decimals})} ${e.tokenOut.symbol}`}:"jupiter-swap-exact-out-route"===e.type&&e.tokenIn&&e.tokenOut?{fee:b,spender:a,balance:c,swap:`${(0,f.NJ)({amount:e.quotedInAmount,decimals:e.tokenIn.decimals})} ${e.tokenIn.symbol} → ${(0,f.NJ)({amount:e.outAmount,decimals:e.tokenOut.decimals})} ${e.tokenOut.symbol}`}:{fee:b,spender:a,balance:c}},[y,R?.address,H]),Y=(0,e.useMemo)(()=>{let a;if(!y||!p||!V||W)return;function b(...a){return(0,G.g)(a.reduce((a,b)=>a+b,0n),V??0)}R?.address===y.spender&&(a=b(y.fee));let c=b(H.value),d=y.instructions.filter(a=>"sol-transfer"===a.type||"spl-transfer"===a.type).at(0);return!d||y.instructions.length>1?{fee:a,balance:c}:"sol-transfer"===d.type?{fee:a,balance:c,total:b(d.value,R?.address===y.spender?y.fee:0n)}:"spl-transfer"===d.type?{fee:a,balance:c,total:`${(0,f.NJ)({amount:d.value,decimals:d.token.decimals})} ${d.token.symbol}`}:{fee:a,balance:c}},[y,p,V,W,R?.address,H]);if((0,e.useEffect)(()=>{!async function(){if(t&&m)try{C(void 0);let a=await N({tx:t,solanaClient:s,privyClient:m,checkFunds:!S&&!T});A(a)}catch(a){console.error("Failed to prepare transaction",a),C(a)}}()},[t,s,m,S]),(0,e.useEffect)(()=>{(async function(){if(!R)return;I({value:H.value,isLoading:!0});let{value:a}=await s.rpc.getBalance(R.address,{commitment:"confirmed"}).send();I({value:a??0n,isLoading:!1})})().catch(console.error)},[y]),!t||!a?.standardSignAndSendTransaction||!R){let b=Error("Invalid transaction request");return(0,d.jsx)(k.ErrorScreenView,{error:b,allowlistConfig:q.allowlistConfig,onRetry:()=>{a?.standardSignAndSendTransaction?.onFailure(b),n({shouldCallAuthOnSuccess:!1})}})}let Z=()=>{if(!K)return M.signature||M.signedTransaction?a?.standardSignAndSendTransaction?.onSuccess({signature:M.signature,signedTransaction:M.signedTransaction}):a?.standardSignAndSendTransaction?.onFailure(P??B??Error("User exited the modal before submitting the transaction")),n({shouldCallAuthOnSuccess:!1})};b.current=Z;let $=a.standardSignAndSendTransaction?.uiOptions?.transactionInfo?.contractInfo?.imgUrl?(0,d.jsx)("img",{src:a.standardSignAndSendTransaction.uiOptions.transactionInfo.contractInfo.imgUrl,alt:a.standardSignAndSendTransaction.uiOptions.transactionInfo.contractInfo.imgAltText}):null,_=!!(a.funding&&a.funding.supportedOptions.length>0),aa=!y?.hasFunds&&_&&!T;if(M.signature||M.signedTransaction){let b=y?.instructions.filter(a=>"sol-transfer"===a.type||"spl-transfer"===a.type),c=1===b?.length?b?.at(0):void 0;return(0,d.jsx)(J,{fees:M.fees??0n,onClose:Z,transactionInfo:a.standardSignAndSendTransaction?.uiOptions.transactionInfo,solPrice:V,receiptHeader:a.standardSignAndSendTransaction?.uiOptions.successHeader,receiptDescription:a.standardSignAndSendTransaction?.uiOptions.successDescription,chain:s.chain,signOnly:S,instruction:"sol-transfer"===c?.type?{to:c.toAccount,amount:c.value}:{to:c?.toAccount||c?.toAta,total:X?.total}})}return P?(0,d.jsx)(v.T,{transactionError:P,chainId:s.chain,onClose:Z,chainType:"solana",onRetry:async()=>{Q(void 0);let{value:a}=await s.rpc.getLatestBlockhash().send();u((0,D.F)((0,x.fr)().decode((0,F.a)(t)),a=>(0,x.mm)(a),b=>(0,x.S$)(a,b),a=>(0,E.i5)(a),a=>new Uint8Array((0,E.l9)().encode(a))))}}):(0,d.jsx)(v.a,{img:$,title:a.standardSignAndSendTransaction?.uiOptions?.transactionInfo?.title||"Confirm transaction",subtitle:a.standardSignAndSendTransaction?.uiOptions?.description||`${q.name} wants your permission to approve the following transaction.`,cta:aa?"Add funds":a.standardSignAndSendTransaction?.uiOptions?.buttonText||"Approve",instructions:y?.instructions??[],network:"solana:mainnet"==s.chain?"Solana":s.chain.replace("solana:",""),blockExplorerUrl:s.blockExplorerUrl,total:p?Y?.total:X?.total,fee:p?Y?.fee:X?.fee,balance:p?Y?.balance:X?.balance,swap:X?.swap,transactingWalletAddress:R.address,disabled:!y?.hasFunds&&!_,isSubmitting:K,isPreparing:!y||H.isLoading,isTokenPriceLoading:p&&W,isMissingFunds:!y?.hasFunds,submitError:P??void 0,isSponsored:!!a.standardSignAndSendTransaction?.isSponsored,parseError:B,onClick:aa?async()=>{if(!R)return;if(!_)throw Error("Funding wallet is not enabled");let b="FundingMethodSelectionScreen";c({...a,funding:{...a.funding,methodScreen:b},solanaFundingData:a?.solanaFundingData}),l(b)}:async()=>{try{if(L(!0),K||!R||!o||!r||!U)return;let b=await a.standardSignAndSendTransaction.onConfirm(t);if("signature"in b){let a=await async function({solanaClient:a,signature:b}){let c=(0,z.BC)().decode(b),d=await a.rpc.getTransaction(c,{maxSupportedTransactionVersion:0,commitment:"confirmed",encoding:"base64"}).send().catch(()=>null);return d?{fee:d.meta?.fee??0n}:null}({solanaClient:s,signature:b.signature});return void O({...b,fees:a?.fee})}O(b)}catch(a){console.warn({transaction:t,error:a}),Q(a)}finally{L(!1)}},onClose:Z})}}},50987:(a,b,c)=>{c.d(b,{A:()=>e});var d=c(38301);let e=d.forwardRef(function({title:a,titleId:b,...c},e){return d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:e,"aria-labelledby":b},c),a?d.createElement("title",{id:b},a):null,d.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m19.5 8.25-7.5 7.5-7.5-7.5"}))})},69456:(a,b,c)=>{c.d(b,{N:()=>f});var d=c(21124),e=c(78858);let f=({size:a,centerIcon:b})=>(0,d.jsx)(g,{$size:a,children:(0,d.jsxs)(h,{children:[(0,d.jsx)(j,{}),(0,d.jsx)(k,{}),b?(0,d.jsx)(i,{children:b}):null]})}),g=e.I4.div`
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
`},74995:(a,b,c)=>{c.d(b,{S:()=>g});var d=c(21124),e=c(7797),f=c(15198);let g=({primaryCta:a,secondaryCta:b,helpText:c,footerText:g,watermark:h=!0,children:i,...j})=>{let k=a||b?(0,d.jsxs)(d.Fragment,{children:[a&&(()=>{let{label:b,...c}=a,f=c.variant||"primary";return(0,d.jsx)(e.a,{...c,variant:f,style:{width:"100%",...c.style},children:b})})(),b&&(()=>{let{label:a,...c}=b,f=c.variant||"secondary";return(0,d.jsx)(e.a,{...c,variant:f,style:{width:"100%",...c.style},children:a})})()]}):null;return(0,d.jsxs)(f.S,{id:j.id,className:j.className,children:[(0,d.jsx)(f.S.Header,{...j}),i?(0,d.jsx)(f.S.Body,{children:i}):null,c||k||h?(0,d.jsxs)(f.S.Footer,{children:[c?(0,d.jsx)(f.S.HelpText,{children:c}):null,k?(0,d.jsx)(f.S.Actions,{children:k}):null,h?(0,d.jsx)(f.S.Watermark,{}):null]}):null,g?(0,d.jsx)(f.S.FooterText,{children:g}):null]})}},83126:(a,b,c)=>{c.d(b,{a:()=>k,b:()=>n,f:()=>l,s:()=>m,u:()=>p,w:()=>o});var d=c(96807),e=c(55860),f=c(38301),g=c(64317),h=c(98403),i=c(87230);let j=Symbol("default-solana-rpcs-plugin");function k(a){return new Uint8Array((0,d.BX)().decode(a).messageBytes)}async function l({solanaClient:a,tx:b}){let c=(0,e.Ul)().decode(k(b)),{value:d}=await a.rpc.getFeeForMessage(c).send();return d??0n}async function m({solanaClient:a,tx:b,replaceRecentBlockhash:c}){let{value:d}=await a.rpc.simulateTransaction((0,e.Ul)().decode(b),{commitment:"confirmed",encoding:"base64",sigVerify:!1,replaceRecentBlockhash:c}).send();if("BlockhashNotFound"===d.err&&c)throw Error("Simulation failed: Blockhash not found");return"BlockhashNotFound"===d.err?await m({solanaClient:a,tx:b,replaceRecentBlockhash:!0}):{logs:d.logs??[],error:d.err,hasError:!!d.err,hasFunds:d.logs?.every(a=>!/insufficient funds/gi.test(a)&&!/insufficient lamports/gi.test(a))??!0}}let n=(...a)=>{if("undefined"==typeof Buffer)throw new i.b("Buffer is not defined.",void 0,i.c.BUFFER_NOT_DEFINED);return Buffer.from(...a)};async function o({rpcSubscriptions:a,signature:b,timeout:c}){let d=new AbortController,e=await a.signatureNotifications(b,{commitment:"confirmed"}).subscribe({abortSignal:d.signal}),f=await Promise.race([new Promise(a=>{setTimeout(()=>{d.abort(),a(Error("Transaction confirmation timed out"))},c)}),new Promise(async a=>{for await(let b of e){if(d.abort(),b.value.err)return a(Error("Transaction confirmation failed"));a(void 0)}})]);if(f instanceof Error)throw f}function p(){let a=(0,g.u)(),b=(0,h.u)(),c=(0,f.useMemo)(()=>{let c=b(j),d=c?.getDefaultRpcs({appId:a.id});return Object.fromEntries(["solana:mainnet","solana:devnet","solana:testnet"].map(b=>{let c=a.solanaRpcs[b]??d?.[b]??null;return[b,c?function({rpc:a,rpcSubscriptions:b,chain:c,blockExplorerUrl:d}){let f=function({rpc:a,rpcSubscriptions:b}){return async c=>new Promise(async(d,f)=>{try{let f=await a.sendTransaction(n(c).toString("base64"),{preflightCommitment:"confirmed",encoding:"base64"}).send();await o({rpcSubscriptions:b,signature:f,timeout:1e4}),d({signature:new Uint8Array((0,e.nZ)().encode(f))})}catch(a){f(a)}})}({rpc:a,rpcSubscriptions:b});return{rpc:a,rpcSubscriptions:b,chain:c,blockExplorerUrl:d,sendAndConfirmTransaction:f}}({chain:b,rpc:c.rpc,rpcSubscriptions:c.rpcSubscriptions,blockExplorerUrl:c.blockExplorerUrl??`https://explorer.solana.com?cluster=${b.replace("solana:","")}`}):null]}))},[a.solanaRpcs,a.id,b]);return(0,f.useCallback)(a=>{if(!c[a])throw Error(`No RPC configuration found for chain ${a}`);return c[a]},[c])}},86833:(a,b,c)=>{c.d(b,{u:()=>f});var d=c(38301),e=c(87230);let f=({enabled:a=!0}={})=>{let{showFiatPrices:b,getUsdPriceForSol:c}=(0,e.u)(),[f,g]=(0,d.useState)(!0),[h,i]=(0,d.useState)(void 0),[j,k]=(0,d.useState)(void 0);return(0,d.useEffect)(()=>{(async()=>{if(b&&a)try{g(!0);let a=await c();a?k(a):i(Error("Unable to fetch SOL price"))}catch(a){i(a)}finally{g(!1)}else g(!1)})()},[]),{solPrice:j,isSolPriceLoading:f,solPriceError:h}}},92073:(a,b,c)=>{c.d(b,{A:()=>e});var d=c(38301);let e=d.forwardRef(function({title:a,titleId:b,...c},e){return d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:e,"aria-labelledby":b},c),a?d.createElement("title",{id:b},a):null,d.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"}))})}};