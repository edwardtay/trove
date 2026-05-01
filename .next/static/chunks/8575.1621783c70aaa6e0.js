"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8575],{8489:(e,r,n)=>{n.d(r,{A:()=>t});let t=(0,n(42407).A)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]])},8575:(e,r,n)=>{n.r(r),n.d(r,{ManualTransferScreen:()=>T,default:()=>T});var t=n(95155),a=n(12115),i=n(57054),o=n(11124),s=n(84241),l=n(83361),d=n(30290),c=n(98392),u=n(92824),p=n(21165),f=n(88172),g=n(45156),m=n(64209),h=n(96052),v=n(90456),x=n(17411),y=n(23378),w=n(73048),C=n(61976),b=n(41078),S=n(28999),I=n(98436),j=n(23273),k=n(60966),A=n(98134);n(52769),n(50205),n(92253),n(68463),n(72378),n(45472);let T={component:()=>{let{wallets:e}=(0,w.u)(),{connectors:r}=(0,v.u)(),n=r.filter(h.c).flatMap(e=>e.wallets),{data:T,setModalData:D,navigate:M,lastScreen:E}=(0,x.a)(),{rpcConfig:z,appId:N,createAnalyticsEvent:B,closePrivyModal:$}=(0,v.u)(),P=(0,m.u)(),[U,L]=(0,a.useState)(void 0),[J,Z]=(0,a.useState)(!1),H=T?.funding,{reloadBalance:O}=(0,y.u)({rpcConfig:z,appId:N,address:"ethereum"===H.chainType?H.address:void 0,chain:"ethereum"===H.chainType?H.chain:void 0}),W="solana"===H.chainType,R=W?H.isUSDC?"USDC":"SOL":H.erc20Address?H.erc20ContractInfo?.symbol:H.chain.nativeCurrency.symbol,V=W?n.find(({address:e})=>e===H.address):e.find(({address:e})=>(0,A.w)(e)===(0,A.w)(H.address));if(!H)return D({errorModalData:{error:Error("Couldn't find funding config"),previousScreen:E||"FundingMethodSelectionScreen"},funding:T?.funding,solanaFundingData:T?.solanaFundingData,sendTransaction:T?.sendTransaction}),M("ErrorScreen"),(0,t.jsx)(t.Fragment,{});(0,a.useEffect)(()=>{let e=W?async function(){if("solana"!==H.chainType)return;let e=P.solanaRpcs[H.chain];e?(H.isUSDC?async function({rpc:e,address:r,mintAddress:n}){let t=await e.getTokenAccountsByOwner(r,{mint:n},{encoding:"jsonParsed",commitment:"confirmed"}).send(),a=t.value[0]?.account;return a?BigInt(a.data.parsed.info.tokenAmount.amount):0n}({rpc:e.rpc,address:H.address,mintAddress:(0,I.g)(H.chain)}):(0,b.r)({rpc:e.rpc,address:H.address})).then(e=>{let r=BigInt(e);U&&r>U&&(Z(!0),B({eventName:C.O,payload:{provider:"manual",status:"success",chainType:"solana",address:V?.address,value:H.isUSDC?(0,i.J)(r-U,6):(0,i.J)(r-U,9),token:H.isUSDC?"USDC":"SOL"}})),L(r)}):console.warn("Unable to load solana rpc, skipping balance")}:async function(){"ethereum"===H.chainType&&(async()=>{if(!H.erc20Address)return await O()??BigInt(0);{let{balance:e}=await (0,k.g)({chain:H.chain,address:H.address,erc20Address:H.erc20Address,rpcConfig:z,appId:N});return e}})().then(e=>{U&&e>U&&(Z(!0),B({eventName:C.O,payload:{provider:"manual",status:"success",chainType:"ethereum",address:V?.address,chainId:H.chain.id,value:(0,i.J)(e-U,H.erc20ContractInfo?.decimals??18),token:H.erc20ContractInfo?.symbol??H.erc20Address??"ETH"}})),L(e)}).catch(()=>L(void 0))},r=setInterval(e,2e3);return e(),()=>clearInterval(r)},[U]);let G=(0,a.useMemo)(()=>null==U?"":H.isUSDC?(0,o.NJ)({amount:U,decimals:6}):W?(0,j.g)(U,3,!0,!0):null!=H.erc20ContractInfo?.decimals?(0,o.NJ)({amount:U,decimals:H.erc20ContractInfo.decimals}):(0,o.vj)({wei:U}),[U,W,H]),_="ethereum"===H.chainType?H.chain.name:(0,S.g)(H.chain),q=(0,a.useMemo)(()=>""===H.uiConfig?.receiveFundsTitle?null:(0,t.jsx)(f.T,{children:H.uiConfig?.receiveFundsTitle??`Receive ${H.amount} ${R??""}`.trim()}),[H.uiConfig?.receiveFundsTitle,H.amount,R]),Y=(0,a.useMemo)(()=>""===H.uiConfig?.receiveFundsSubtitle?null:(0,t.jsx)(p.S,{children:H.uiConfig?.receiveFundsSubtitle??`Scan this code or copy your wallet address to receive funds on ${_}.`}),[H.uiConfig?.receiveFundsSubtitle,_]),Q="solana"===H.chainType&&H.isUSDC&&(0,I.g)(H.chain)?`?spl-token=${(0,I.g)(H.chain)}`:"";return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(c.t,{}),q,Y,(0,t.jsxs)(l.F,{style:{gap:"1rem",margin:q||Y?"1rem 0":"0"},children:[(0,t.jsx)(d.Q,{url:`${H.chainType}:${H.address}${Q}`,size:200,squareLogoElement:F}),(0,t.jsxs)(u.I,{theme:P.appearance.palette.colorScheme,children:["Make sure to send funds on ",_,"."]}),(0,t.jsx)(g.W,{title:"Your wallet",errMsg:void 0,showCopyButton:!0,balance:`${G} ${R}`,address:H.address}),J&&(0,t.jsx)(s.P,{onClick:()=>$({shouldCallAuthOnSuccess:!1,isSuccess:!0}),children:"Continue"})]}),(0,t.jsx)(s.B,{})]})}},F=({...e})=>(0,t.jsx)(b.w,{color:"black",...e})},11124:(e,r,n)=>{n.d(r,{NJ:()=>s,vj:()=>o,vz:()=>i});var t=n(28245),a=n(30598);function i(e){return e?`${e.slice(0,5)}…${e.slice(-4)}`:""}function o({wei:e,precision:r=3}){return parseFloat((0,t.c)(e)).toFixed(r).replace(/0+$/,"").replace(/\.$/,"")}function s({amount:e,decimals:r}){return(0,a.J)(BigInt(e),r)}},21165:(e,r,n)=>{n.d(r,{S:()=>a});var t=n(20031);let a=t.I4.span`
  margin-top: 4px;
  color: var(--privy-color-foreground);
  text-align: center;

  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.375rem; /* 157.143% */

  && a {
    color: var(--privy-color-accent);
  }
`},23273:(e,r,n)=>{n.d(r,{a:()=>i,g:()=>a});var t=n(24271);function a(e,r=6,n=!1,t=!1){let i=(parseFloat(e.toString())/1e9).toFixed(r).replace(/0+$/,"").replace(/\.$/,""),o=t?"":" SOL";return n?`${i}${o}`:`${"0"===i?"<0.001":i}${o}`}function i({amount:e,fee:r,tokenPrice:n,isUsdc:i}){let o=BigInt(Math.floor(parseFloat(e)*10**(i?6:9))),s=i?o:o+r;return{fundingAmountInBaseUnit:o,fundingAmountInUsd:n?(0,t.g)(o,n):void 0,totalPriceInUsd:n?(0,t.g)(s,n):void 0,totalPriceInNativeCurrency:a(s),feePriceInNativeCurrency:a(r),feePriceInUsd:n?(0,t.g)(r,n):void 0}}},23378:(e,r,n)=>{n.d(r,{u:()=>l});var t=n(12115),a=n(64280),i=n(94263),o=n(73048),s=n(90456);function l({rpcConfig:e,appId:r,address:n,chain:l}){let{chains:d}=(0,s.u)(),[c,u]=(0,t.useState)(0n),[p,f]=(0,t.useState)(!1),g=(0,t.useMemo)(()=>{let n=l||d[0];if(n)return(0,a.l)({chain:l,transport:(0,i.L)((0,o.i)(n,e,r))})},[l,e,r]),m=(0,t.useCallback)(async()=>{if(!n||!g)return;f(!0);let e=await g.getBalance({address:n}).catch(console.error);return e?(u(e),f(!1),e):void 0},[g,n,u]);return(0,t.useEffect)(()=>{m().catch(console.error)},[]),{balance:c,isLoading:p,reloadBalance:m}}},24271:(e,r,n)=>{n.d(r,{A:()=>s,D:()=>c,J:()=>d,L:()=>t,R:()=>l,S:()=>a,T:()=>i,a:()=>o,g:()=>u});let t=1e9,a="11111111111111111111111111111111",i="TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",o="TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",s="ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",l=["CPMMoo8L3F4NbTegBCKVNunggL7H1ZpdTHKxQB5qKP1C","CPMDWBwJDtYax9qW7AyRuVC19Cc4L4Vcy4n2BHAbHkCW"],d=["JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4"],c={"solana:mainnet":{EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v:{symbol:"USDC",decimals:6,address:"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"},Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB:{symbol:"USDT",decimals:6,address:"Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"},So11111111111111111111111111111111111111112:{symbol:"SOL",decimals:9,address:"So11111111111111111111111111111111111111112"}},"solana:devnet":{"4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU":{symbol:"USDC",decimals:6,address:"4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"},EJwZgeZrdC8TXTQbQBoL6bfuAnFUUy1PVCMB4DYPzVaS:{symbol:"USDT",decimals:6,address:"EJwZgeZrdC8TXTQbQBoL6bfuAnFUUy1PVCMB4DYPzVaS"},So11111111111111111111111111111111111111112:{symbol:"SOL",decimals:9,address:"So11111111111111111111111111111111111111112"}},"solana:testnet":{}};function u(e,r){let n=parseFloat(e.toString())/t,a=p.format(r*n);return"$0.00"===a?"<$0.01":a}let p=new Intl.NumberFormat(void 0,{style:"currency",currency:"USD",maximumFractionDigits:2})},28999:(e,r,n)=>{n.d(r,{g:()=>t});function t(e){switch(e){case"solana:mainnet":return"Solana";case"solana:devnet":return"Devnet";case"solana:testnet":return"Testnet"}}},31334:(e,r,n)=>{n.d(r,{A:()=>t});let t=(0,n(42407).A)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]])},42407:(e,r,n)=>{n.d(r,{A:()=>l});var t=n(12115);let a=e=>{let r=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,r,n)=>n?n.toUpperCase():r.toLowerCase());return r.charAt(0).toUpperCase()+r.slice(1)},i=function(){for(var e=arguments.length,r=Array(e),n=0;n<e;n++)r[n]=arguments[n];return r.filter((e,r,n)=>!!e&&""!==e.trim()&&n.indexOf(e)===r).join(" ").trim()};var o={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let s=(0,t.forwardRef)((e,r)=>{let{color:n="currentColor",size:a=24,strokeWidth:s=2,absoluteStrokeWidth:l,className:d="",children:c,iconNode:u,...p}=e;return(0,t.createElement)("svg",{ref:r,...o,width:a,height:a,stroke:n,strokeWidth:l?24*Number(s)/Number(a):s,className:i("lucide",d),...!c&&!(e=>{for(let r in e)if(r.startsWith("aria-")||"role"===r||"title"===r)return!0})(p)&&{"aria-hidden":"true"},...p},[...u.map(e=>{let[r,n]=e;return(0,t.createElement)(r,n)}),...Array.isArray(c)?c:[c]])}),l=(e,r)=>{let n=(0,t.forwardRef)((n,o)=>{let{className:l,...d}=n;return(0,t.createElement)(s,{ref:o,iconNode:r,className:i("lucide-".concat(a(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()),"lucide-".concat(e),l),...d})});return n.displayName=a(e),n}},45156:(e,r,n)=>{n.d(r,{W:()=>w});var t=n(95155),a=n(8489),i=n(31334),o=n(12115),s=n(20031),l=n(84241),d=n(55211),c=n(76054),u=n(68858),p=n(99788);let f=(0,s.I4)(p.B)`
  && {
    padding: 0.75rem;
    height: 56px;
  }
`,g=s.I4.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`,m=s.I4.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`,h=s.I4.div`
  font-size: 12px;
  line-height: 1rem;
  color: var(--privy-color-foreground-3);
`,v=(0,s.I4)(c.L)`
  text-align: left;
  margin-bottom: 0.5rem;
`,x=(0,s.I4)(d.E)`
  margin-top: 0.25rem;
`,y=(0,s.I4)(l.S)`
  && {
    gap: 0.375rem;
    font-size: 14px;
  }
`,w=({errMsg:e,balance:r,address:n,className:s,title:l,showCopyButton:d=!1})=>{let[c,p]=(0,o.useState)(!1);return(0,o.useEffect)(()=>{if(c){let e=setTimeout(()=>p(!1),3e3);return()=>clearTimeout(e)}},[c]),(0,t.jsxs)("div",{children:[l&&(0,t.jsx)(v,{children:l}),(0,t.jsx)(f,{className:s,$state:e?"error":void 0,children:(0,t.jsxs)(g,{children:[(0,t.jsxs)(m,{children:[(0,t.jsx)(u.A,{address:n,showCopyIcon:!1}),void 0!==r&&(0,t.jsx)(h,{children:r})]}),d&&(0,t.jsx)(y,{onClick:function(e){e.stopPropagation(),navigator.clipboard.writeText(n).then(()=>p(!0)).catch(console.error)},size:"sm",children:(0,t.jsxs)(t.Fragment,c?{children:["Copied",(0,t.jsx)(a.A,{size:14})]}:{children:["Copy",(0,t.jsx)(i.A,{size:14})]})})]})}),e&&(0,t.jsx)(x,{children:e})]})}},55211:(e,r,n)=>{n.d(r,{E:()=>a});var t=n(20031);let a=t.I4.span`
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.125rem; /* 150% */

  color: var(--privy-color-error);
`},60966:(e,r,n)=>{n.d(r,{g:()=>o});var t=n(64280),a=n(94263),i=n(73048);let o=async({chain:e,address:r,appId:n,rpcConfig:o,erc20Address:l})=>{let d=(0,t.l)({chain:e,transport:(0,a.L)((0,i.i)(e,o,n))});return{balance:await d.readContract({address:l,abi:s,functionName:"balanceOf",args:[r]}).catch(()=>0n),chain:e}},s=[{constant:!0,inputs:[{name:"_owner",type:"address"}],name:"balanceOf",outputs:[{name:"balance",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"}]},61976:(e,r,n)=>{n.d(r,{O:()=>t});let t="sdk_fiat_on_ramp_completed_with_status"},68858:(e,r,n)=>{n.d(r,{A:()=>c});var t=n(95155),a=n(8489),i=n(31334),o=n(12115),s=n(20031),l=n(98134),d=n(84241);let c=({address:e,showCopyIcon:r,url:n,className:s})=>{let[c,g]=(0,o.useState)(!1);function m(r){r.stopPropagation(),navigator.clipboard.writeText(e).then(()=>g(!0)).catch(console.error)}return(0,o.useEffect)(()=>{if(c){let e=setTimeout(()=>g(!1),3e3);return()=>clearTimeout(e)}},[c]),(0,t.jsxs)(u,n?{children:[(0,t.jsx)(f,{title:e,className:s,href:`${n}/address/${e}`,target:"_blank",children:(0,l.w)(e)}),r&&(0,t.jsx)(d.S,{onClick:m,size:"sm",style:{gap:"0.375rem"},children:(0,t.jsxs)(t.Fragment,c?{children:["Copied",(0,t.jsx)(a.A,{size:16})]}:{children:["Copy",(0,t.jsx)(i.A,{size:16})]})})]}:{children:[(0,t.jsx)(p,{title:e,className:s,children:(0,l.w)(e)}),r&&(0,t.jsx)(d.S,{onClick:m,size:"sm",style:{gap:"0.375rem",fontSize:"14px"},children:(0,t.jsxs)(t.Fragment,c?{children:["Copied",(0,t.jsx)(a.A,{size:14})]}:{children:["Copy",(0,t.jsx)(i.A,{size:14})]})})]})},u=s.I4.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`,p=s.I4.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--privy-color-foreground);
`,f=s.I4.a`
  font-size: 14px;
  color: var(--privy-color-foreground);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`},76054:(e,r,n)=>{n.d(r,{L:()=>a});var t=n(20031);let a=t.I4.span`
  color: var(--privy-color-foreground-3);
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.125rem; /* 150% */
`},83361:(e,r,n)=>{n.d(r,{B:()=>a,C:()=>s,F:()=>d,H:()=>o,R:()=>f,S:()=>u,a:()=>c,b:()=>p,c:()=>l,d:()=>g,e:()=>i});var t=n(20031);let a=t.I4.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  margin-top: auto;
  gap: 16px;
  flex-grow: 100;
`,i=t.I4.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  width: 100%;
`,o=t.I4.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`,s=(0,t.I4)(i)`
  padding: 20px 0;
`,l=(0,t.I4)(i)`
  gap: 16px;
`,d=t.I4.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`,c=t.I4.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;t.I4.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;let u=t.I4.div`
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
`,p=t.I4.div`
  height: 16px;
`,f=t.I4.div`
  height: 12px;
`;t.I4.div`
  position: relative;
`;let g=t.I4.div`
  height: ${e=>e.height??"12"}px;
`;t.I4.div`
  background-color: var(--privy-color-accent);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border-color: white;
  border-width: 2px !important;
`},88172:(e,r,n)=>{n.d(r,{T:()=>a});var t=n(20031);let a=t.I4.span`
  color: var(--privy-color-foreground);
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.875rem; /* 166.667% */
  text-align: center;
`},92824:(e,r,n)=>{n.d(r,{I:()=>s});var t=n(95155),a=n(12115);let i=a.forwardRef(function(e,r){let{title:n,titleId:t,...i}=e;return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:r,"aria-labelledby":t},i),n?a.createElement("title",{id:t},n):null,a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"}))});var o=n(20031);let s=({children:e,theme:r})=>(0,t.jsxs)(l,{$theme:r,children:[(0,t.jsx)(i,{width:"20px",height:"20px",color:"var(--privy-color-icon-muted)",strokeWidth:1.5,style:{flexShrink:0}}),(0,t.jsx)(d,{$theme:r,children:e})]}),l=o.I4.div`
  display: flex;
  gap: 0.75rem;
  background-color: var(--privy-color-background-2);
  align-items: flex-start;
  padding: 1rem;
  border-radius: 0.75rem;
`,d=o.I4.div`
  color: ${e=>"dark"===e.$theme?"var(--privy-color-foreground-2)":"var(--privy-color-foreground)"};
  flex: 1;
  text-align: left;

  /* text-sm/font-regular */
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.375rem; /* 157.143% */
`},98392:(e,r,n)=>{n.d(r,{t:()=>o});var t=n(95155),a=n(17411),i=n(84241);function o({title:e}){let{currentScreen:r,navigateBack:n,navigate:o,data:s,setModalData:l}=(0,a.a)();return(0,t.jsx)(i.M,{title:e,backFn:"ManualTransferScreen"===r?n:r===s?.funding?.methodScreen?s.funding.comingFromSendTransactionScreen?()=>o("SendTransactionScreen"):void 0:s?.funding?.methodScreen?()=>{let e=s.funding;e.usingDefaultFundingMethod&&(e.usingDefaultFundingMethod=!1),l({funding:e,solanaFundingData:s?.solanaFundingData}),o(e.methodScreen)}:void 0})}},98436:(e,r,n)=>{n.d(r,{g:()=>a});var t=n(24271);function a(e){let[r]=Object.entries(t.D[e]).find(([e,r])=>"USDC"===r.symbol)??[];return r}},99788:(e,r,n)=>{n.d(r,{B:()=>i,a:()=>a});var t=n(20031);let a=(0,t.AH)`
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

  ${e=>"error"===e.$state?"\n        border-color: var(--privy-color-error);\n        background: var(--privy-color-error-bg);\n      ":""}
`,i=t.I4.div`
  ${a}
`}}]);