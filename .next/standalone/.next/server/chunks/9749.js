"use strict";exports.id=9749,exports.ids=[9749],exports.modules={345:(a,b,c)=>{c.d(b,{g:()=>d});function d(a){switch(a){case"solana:mainnet":return"Solana";case"solana:devnet":return"Devnet";case"solana:testnet":return"Testnet"}}},1764:(a,b,c)=>{c.d(b,{u:()=>i});var d=c(38301),e=c(95562),f=c(38331),g=c(59626),h=c(87230);function i({rpcConfig:a,appId:b,address:c,chain:i}){let{chains:j}=(0,h.u)(),[k,l]=(0,d.useState)(0n),[m,n]=(0,d.useState)(!1),o=(0,d.useMemo)(()=>{let c=i||j[0];if(c)return(0,e.l)({chain:i,transport:(0,f.L)((0,g.i)(c,a,b))})},[i,a,b]),p=(0,d.useCallback)(async()=>{if(!c||!o)return;n(!0);let a=await o.getBalance({address:c}).catch(console.error);return a?(l(a),n(!1),a):void 0},[o,c,l]);return(0,d.useEffect)(()=>{p().catch(console.error)},[]),{balance:k,isLoading:m,reloadBalance:p}}},6101:(a,b,c)=>{c.d(b,{A:()=>i});var d=c(38301);let e=a=>{let b=a.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,b,c)=>c?c.toUpperCase():b.toLowerCase());return b.charAt(0).toUpperCase()+b.slice(1)},f=(...a)=>a.filter((a,b,c)=>!!a&&""!==a.trim()&&c.indexOf(a)===b).join(" ").trim();var g={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let h=(0,d.forwardRef)(({color:a="currentColor",size:b=24,strokeWidth:c=2,absoluteStrokeWidth:e,className:h="",children:i,iconNode:j,...k},l)=>(0,d.createElement)("svg",{ref:l,...g,width:b,height:b,stroke:a,strokeWidth:e?24*Number(c)/Number(b):c,className:f("lucide",h),...!i&&!(a=>{for(let b in a)if(b.startsWith("aria-")||"role"===b||"title"===b)return!0})(k)&&{"aria-hidden":"true"},...k},[...j.map(([a,b])=>(0,d.createElement)(a,b)),...Array.isArray(i)?i:[i]])),i=(a,b)=>{let c=(0,d.forwardRef)(({className:c,...g},i)=>(0,d.createElement)(h,{ref:i,iconNode:b,className:f(`lucide-${e(a).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${a}`,c),...g}));return c.displayName=e(a),c}},19458:(a,b,c)=>{c.d(b,{g:()=>e});var d=c(39499);function e(a){let[b]=Object.entries(d.D[a]).find(([a,b])=>"USDC"===b.symbol)??[];return b}},21737:(a,b,c)=>{c.d(b,{a:()=>f,g:()=>e});var d=c(39499);function e(a,b=6,c=!1,d=!1){let f=(parseFloat(a.toString())/1e9).toFixed(b).replace(/0+$/,"").replace(/\.$/,""),g=d?"":" SOL";return c?`${f}${g}`:`${"0"===f?"<0.001":f}${g}`}function f({amount:a,fee:b,tokenPrice:c,isUsdc:f}){let g=BigInt(Math.floor(parseFloat(a)*10**(f?6:9))),h=f?g:g+b;return{fundingAmountInBaseUnit:g,fundingAmountInUsd:c?(0,d.g)(g,c):void 0,totalPriceInUsd:c?(0,d.g)(h,c):void 0,totalPriceInNativeCurrency:e(h),feePriceInNativeCurrency:e(b),feePriceInUsd:c?(0,d.g)(b,c):void 0}}},23690:(a,b,c)=>{c.d(b,{g:()=>g});var d=c(95562),e=c(38331),f=c(59626);let g=async({chain:a,address:b,appId:c,rpcConfig:g,erc20Address:i})=>{let j=(0,d.l)({chain:a,transport:(0,e.L)((0,f.i)(a,g,c))});return{balance:await j.readContract({address:i,abi:h,functionName:"balanceOf",args:[b]}).catch(()=>0n),chain:a}},h=[{constant:!0,inputs:[{name:"_owner",type:"address"}],name:"balanceOf",outputs:[{name:"balance",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"}]},24402:(a,b,c)=>{c.d(b,{W:()=>u});var d=c(21124),e=c(28121),f=c(92584),g=c(38301),h=c(78858),i=c(7797),j=c(52481),k=c(59702),l=c(61330),m=c(29494);let n=(0,h.I4)(m.B)`
  && {
    padding: 0.75rem;
    height: 56px;
  }
`,o=h.I4.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`,p=h.I4.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`,q=h.I4.div`
  font-size: 12px;
  line-height: 1rem;
  color: var(--privy-color-foreground-3);
`,r=(0,h.I4)(k.L)`
  text-align: left;
  margin-bottom: 0.5rem;
`,s=(0,h.I4)(j.E)`
  margin-top: 0.25rem;
`,t=(0,h.I4)(i.S)`
  && {
    gap: 0.375rem;
    font-size: 14px;
  }
`,u=({errMsg:a,balance:b,address:c,className:h,title:i,showCopyButton:j=!1})=>{let[k,m]=(0,g.useState)(!1);return(0,g.useEffect)(()=>{if(k){let a=setTimeout(()=>m(!1),3e3);return()=>clearTimeout(a)}},[k]),(0,d.jsxs)("div",{children:[i&&(0,d.jsx)(r,{children:i}),(0,d.jsx)(n,{className:h,$state:a?"error":void 0,children:(0,d.jsxs)(o,{children:[(0,d.jsxs)(p,{children:[(0,d.jsx)(l.A,{address:c,showCopyIcon:!1}),void 0!==b&&(0,d.jsx)(q,{children:b})]}),j&&(0,d.jsx)(t,{onClick:function(a){a.stopPropagation(),navigator.clipboard.writeText(c).then(()=>m(!0)).catch(console.error)},size:"sm",children:(0,d.jsxs)(d.Fragment,k?{children:["Copied",(0,d.jsx)(e.A,{size:14})]}:{children:["Copy",(0,d.jsx)(f.A,{size:14})]})})]})}),a&&(0,d.jsx)(s,{children:a})]})}},27829:(a,b,c)=>{c.d(b,{B:()=>e,C:()=>h,F:()=>j,H:()=>g,R:()=>n,S:()=>l,a:()=>k,b:()=>m,c:()=>i,d:()=>o,e:()=>f});var d=c(78858);let e=d.I4.div`
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
`},28121:(a,b,c)=>{c.d(b,{A:()=>d});let d=(0,c(6101).A)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]])},29054:(a,b,c)=>{c.d(b,{NJ:()=>h,vj:()=>g,vz:()=>f});var d=c(78327),e=c(29808);function f(a){return a?`${a.slice(0,5)}…${a.slice(-4)}`:""}function g({wei:a,precision:b=3}){return parseFloat((0,d.c)(a)).toFixed(b).replace(/0+$/,"").replace(/\.$/,"")}function h({amount:a,decimals:b}){return(0,e.J)(BigInt(a),b)}},29494:(a,b,c)=>{c.d(b,{B:()=>f,a:()=>e});var d=c(78858);let e=(0,d.AH)`
  && {
    border-width: 1px;
    padding: 0.5rem 1rem;
  }

  width: 100%;
  text-align: left;
  border: solid 1px var(--privy-color-foreground-4);
  border-radius: var(--privy-border-radius-md);
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${a=>"error"===a.$state?"\n        border-color: var(--privy-color-error);\n        background: var(--privy-color-error-bg);\n      ":""}
`,f=d.I4.div`
  ${e}
`},33488:(a,b,c)=>{c.d(b,{O:()=>d});let d="sdk_fiat_on_ramp_completed_with_status"},35948:(a,b,c)=>{c.d(b,{T:()=>e});var d=c(78858);let e=d.I4.span`
  color: var(--privy-color-foreground);
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.875rem; /* 166.667% */
  text-align: center;
`},39499:(a,b,c)=>{c.d(b,{A:()=>h,D:()=>k,J:()=>j,L:()=>d,R:()=>i,S:()=>e,T:()=>f,a:()=>g,g:()=>l});let d=1e9,e="11111111111111111111111111111111",f="TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",g="TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",h="ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",i=["CPMMoo8L3F4NbTegBCKVNunggL7H1ZpdTHKxQB5qKP1C","CPMDWBwJDtYax9qW7AyRuVC19Cc4L4Vcy4n2BHAbHkCW"],j=["JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4"],k={"solana:mainnet":{EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v:{symbol:"USDC",decimals:6,address:"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"},Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB:{symbol:"USDT",decimals:6,address:"Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"},So11111111111111111111111111111111111111112:{symbol:"SOL",decimals:9,address:"So11111111111111111111111111111111111111112"}},"solana:devnet":{"4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU":{symbol:"USDC",decimals:6,address:"4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"},EJwZgeZrdC8TXTQbQBoL6bfuAnFUUy1PVCMB4DYPzVaS:{symbol:"USDT",decimals:6,address:"EJwZgeZrdC8TXTQbQBoL6bfuAnFUUy1PVCMB4DYPzVaS"},So11111111111111111111111111111111111111112:{symbol:"SOL",decimals:9,address:"So11111111111111111111111111111111111111112"}},"solana:testnet":{}};function l(a,b){let c=parseFloat(a.toString())/d,e=m.format(b*c);return"$0.00"===e?"<$0.01":e}let m=new Intl.NumberFormat(void 0,{style:"currency",currency:"USD",maximumFractionDigits:2})},49749:(a,b,c)=>{c.r(b),c.d(b,{ManualTransferScreen:()=>C,default:()=>C});var d=c(21124),e=c(38301),f=c(90256),g=c(29054),h=c(7797),i=c(27829),j=c(41204),k=c(76078),l=c(90130),m=c(77911),n=c(35948),o=c(24402),p=c(64317),q=c(99848),r=c(87230),s=c(23966),t=c(1764),u=c(59626),v=c(33488),w=c(95761),x=c(345),y=c(19458),z=c(21737),A=c(23690),B=c(44110);c(34351),c(22967),c(32571),c(18521),c(21398),c(61946);let C={component:()=>{let{wallets:a}=(0,u.u)(),{connectors:b}=(0,r.u)(),c=b.filter(q.c).flatMap(a=>a.wallets),{data:C,setModalData:E,navigate:F,lastScreen:G}=(0,s.a)(),{rpcConfig:H,appId:I,createAnalyticsEvent:J,closePrivyModal:K}=(0,r.u)(),L=(0,p.u)(),[M,N]=(0,e.useState)(void 0),[O,P]=(0,e.useState)(!1),Q=C?.funding,{reloadBalance:R}=(0,t.u)({rpcConfig:H,appId:I,address:"ethereum"===Q.chainType?Q.address:void 0,chain:"ethereum"===Q.chainType?Q.chain:void 0}),S="solana"===Q.chainType,T=S?Q.isUSDC?"USDC":"SOL":Q.erc20Address?Q.erc20ContractInfo?.symbol:Q.chain.nativeCurrency.symbol,U=S?c.find(({address:a})=>a===Q.address):a.find(({address:a})=>(0,B.w)(a)===(0,B.w)(Q.address));if(!Q)return E({errorModalData:{error:Error("Couldn't find funding config"),previousScreen:G||"FundingMethodSelectionScreen"},funding:C?.funding,solanaFundingData:C?.solanaFundingData,sendTransaction:C?.sendTransaction}),F("ErrorScreen"),(0,d.jsx)(d.Fragment,{});(0,e.useEffect)(()=>{let a=S?async function(){if("solana"!==Q.chainType)return;let a=L.solanaRpcs[Q.chain];a?(Q.isUSDC?async function({rpc:a,address:b,mintAddress:c}){let d=await a.getTokenAccountsByOwner(b,{mint:c},{encoding:"jsonParsed",commitment:"confirmed"}).send(),e=d.value[0]?.account;return e?BigInt(e.data.parsed.info.tokenAmount.amount):0n}({rpc:a.rpc,address:Q.address,mintAddress:(0,y.g)(Q.chain)}):(0,w.r)({rpc:a.rpc,address:Q.address})).then(a=>{let b=BigInt(a);M&&b>M&&(P(!0),J({eventName:v.O,payload:{provider:"manual",status:"success",chainType:"solana",address:U?.address,value:Q.isUSDC?(0,f.J)(b-M,6):(0,f.J)(b-M,9),token:Q.isUSDC?"USDC":"SOL"}})),N(b)}):console.warn("Unable to load solana rpc, skipping balance")}:async function(){"ethereum"===Q.chainType&&(async()=>{if(!Q.erc20Address)return await R()??BigInt(0);{let{balance:a}=await (0,A.g)({chain:Q.chain,address:Q.address,erc20Address:Q.erc20Address,rpcConfig:H,appId:I});return a}})().then(a=>{M&&a>M&&(P(!0),J({eventName:v.O,payload:{provider:"manual",status:"success",chainType:"ethereum",address:U?.address,chainId:Q.chain.id,value:(0,f.J)(a-M,Q.erc20ContractInfo?.decimals??18),token:Q.erc20ContractInfo?.symbol??Q.erc20Address??"ETH"}})),N(a)}).catch(()=>N(void 0))},b=setInterval(a,2e3);return a(),()=>clearInterval(b)},[M]);let V=(0,e.useMemo)(()=>null==M?"":Q.isUSDC?(0,g.NJ)({amount:M,decimals:6}):S?(0,z.g)(M,3,!0,!0):null!=Q.erc20ContractInfo?.decimals?(0,g.NJ)({amount:M,decimals:Q.erc20ContractInfo.decimals}):(0,g.vj)({wei:M}),[M,S,Q]),W="ethereum"===Q.chainType?Q.chain.name:(0,x.g)(Q.chain),X=(0,e.useMemo)(()=>""===Q.uiConfig?.receiveFundsTitle?null:(0,d.jsx)(n.T,{children:Q.uiConfig?.receiveFundsTitle??`Receive ${Q.amount} ${T??""}`.trim()}),[Q.uiConfig?.receiveFundsTitle,Q.amount,T]),Y=(0,e.useMemo)(()=>""===Q.uiConfig?.receiveFundsSubtitle?null:(0,d.jsx)(m.S,{children:Q.uiConfig?.receiveFundsSubtitle??`Scan this code or copy your wallet address to receive funds on ${W}.`}),[Q.uiConfig?.receiveFundsSubtitle,W]),Z="solana"===Q.chainType&&Q.isUSDC&&(0,y.g)(Q.chain)?`?spl-token=${(0,y.g)(Q.chain)}`:"";return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(k.t,{}),X,Y,(0,d.jsxs)(i.F,{style:{gap:"1rem",margin:X||Y?"1rem 0":"0"},children:[(0,d.jsx)(j.Q,{url:`${Q.chainType}:${Q.address}${Z}`,size:200,squareLogoElement:D}),(0,d.jsxs)(l.I,{theme:L.appearance.palette.colorScheme,children:["Make sure to send funds on ",W,"."]}),(0,d.jsx)(o.W,{title:"Your wallet",errMsg:void 0,showCopyButton:!0,balance:`${V} ${T}`,address:Q.address}),O&&(0,d.jsx)(h.P,{onClick:()=>K({shouldCallAuthOnSuccess:!1,isSuccess:!0}),children:"Continue"})]}),(0,d.jsx)(h.B,{})]})}},D=({...a})=>(0,d.jsx)(w.w,{color:"black",...a})},52481:(a,b,c)=>{c.d(b,{E:()=>e});var d=c(78858);let e=d.I4.span`
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.125rem; /* 150% */

  color: var(--privy-color-error);
`},59702:(a,b,c)=>{c.d(b,{L:()=>e});var d=c(78858);let e=d.I4.span`
  color: var(--privy-color-foreground-3);
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.125rem; /* 150% */
`},61330:(a,b,c)=>{c.d(b,{A:()=>k});var d=c(21124),e=c(28121),f=c(92584),g=c(38301),h=c(78858),i=c(44110),j=c(7797);let k=({address:a,showCopyIcon:b,url:c,className:h})=>{let[k,o]=(0,g.useState)(!1);function p(b){b.stopPropagation(),navigator.clipboard.writeText(a).then(()=>o(!0)).catch(console.error)}return(0,g.useEffect)(()=>{if(k){let a=setTimeout(()=>o(!1),3e3);return()=>clearTimeout(a)}},[k]),(0,d.jsxs)(l,c?{children:[(0,d.jsx)(n,{title:a,className:h,href:`${c}/address/${a}`,target:"_blank",children:(0,i.w)(a)}),b&&(0,d.jsx)(j.S,{onClick:p,size:"sm",style:{gap:"0.375rem"},children:(0,d.jsxs)(d.Fragment,k?{children:["Copied",(0,d.jsx)(e.A,{size:16})]}:{children:["Copy",(0,d.jsx)(f.A,{size:16})]})})]}:{children:[(0,d.jsx)(m,{title:a,className:h,children:(0,i.w)(a)}),b&&(0,d.jsx)(j.S,{onClick:p,size:"sm",style:{gap:"0.375rem",fontSize:"14px"},children:(0,d.jsxs)(d.Fragment,k?{children:["Copied",(0,d.jsx)(e.A,{size:14})]}:{children:["Copy",(0,d.jsx)(f.A,{size:14})]})})]})},l=h.I4.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`,m=h.I4.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--privy-color-foreground);
`,n=h.I4.a`
  font-size: 14px;
  color: var(--privy-color-foreground);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`},76078:(a,b,c)=>{c.d(b,{t:()=>g});var d=c(21124),e=c(23966),f=c(7797);function g({title:a}){let{currentScreen:b,navigateBack:c,navigate:g,data:h,setModalData:i}=(0,e.a)();return(0,d.jsx)(f.M,{title:a,backFn:"ManualTransferScreen"===b?c:b===h?.funding?.methodScreen?h.funding.comingFromSendTransactionScreen?()=>g("SendTransactionScreen"):void 0:h?.funding?.methodScreen?()=>{let a=h.funding;a.usingDefaultFundingMethod&&(a.usingDefaultFundingMethod=!1),i({funding:a,solanaFundingData:h?.solanaFundingData}),g(a.methodScreen)}:void 0})}},77911:(a,b,c)=>{c.d(b,{S:()=>e});var d=c(78858);let e=d.I4.span`
  margin-top: 4px;
  color: var(--privy-color-foreground);
  text-align: center;

  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.375rem; /* 157.143% */

  && a {
    color: var(--privy-color-accent);
  }
`},90130:(a,b,c)=>{c.d(b,{I:()=>h});var d=c(21124),e=c(38301);let f=e.forwardRef(function({title:a,titleId:b,...c},d){return e.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:d,"aria-labelledby":b},c),a?e.createElement("title",{id:b},a):null,e.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"}))});var g=c(78858);let h=({children:a,theme:b})=>(0,d.jsxs)(i,{$theme:b,children:[(0,d.jsx)(f,{width:"20px",height:"20px",color:"var(--privy-color-icon-muted)",strokeWidth:1.5,style:{flexShrink:0}}),(0,d.jsx)(j,{$theme:b,children:a})]}),i=g.I4.div`
  display: flex;
  gap: 0.75rem;
  background-color: var(--privy-color-background-2);
  align-items: flex-start;
  padding: 1rem;
  border-radius: 0.75rem;
`,j=g.I4.div`
  color: ${a=>"dark"===a.$theme?"var(--privy-color-foreground-2)":"var(--privy-color-foreground)"};
  flex: 1;
  text-align: left;

  /* text-sm/font-regular */
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.375rem; /* 157.143% */
`},92584:(a,b,c)=>{c.d(b,{A:()=>d});let d=(0,c(6101).A)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]])}};