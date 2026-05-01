"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4340],{8489:(e,t,n)=>{n.d(t,{A:()=>r});let r=(0,n(42407).A)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]])},15820:(e,t,n)=>{n.r(t),n.d(t,{AwaitingSolToEvmBridgingScreen:()=>x,default:()=>x});var r=n(95155),a=n(6956),i=n(12115),s=n(80319),o=n(93555),l=n(83361),d=n(84241),c=n(83288),u=n(98392),p=n(95204),h=n(64209),g=n(90456),f=n(96052),m=n(17411),v=n(61976),w=n(95402),b=n(3129),y=n(89987),I=n(98134),C=n(51365);n(50205),n(92253),n(68463);let x={component:function(){let e=(0,h.u)(),{closePrivyModal:t,createAnalyticsEvent:n,connectors:x}=(0,g.u)(),{navigate:S,setModalData:N,data:A}=(0,m.a)(),T=(0,h.u)(),E=(0,i.useRef)(!1),$=(0,b.u)(),[j,F]=(0,i.useState)(!1),[U,k]=(0,i.useState)(!1),[z,B]=(0,i.useState)(null),[R,W]=(0,i.useState)(),[L,_]=(0,i.useState)();if(!A?.funding||"ethereum"!==A.funding.chainType)throw Error("Invalid funding data");let{amount:D,connectedWallet:M,chain:O,solanaChain:P,isUSDC:q}=A.funding,H=A.funding.address,J=A.funding.erc20Address,Z=A.funding.isUSDC?"USDC":O.nativeCurrency.symbol,Q=(0,i.useMemo)(()=>"solana"===M?.type?M.provider:function({connectors:e,connectedWalletAddress:t}){let n=e.find(e=>"solana"===e.chainType&&e.wallets.some(e=>e.address===t)),r=n?.wallet.accounts.find(e=>e.address===t);if(!n||!r)throw new g.b("Unable to find source wallet connector");return new o.W({wallet:n.wallet,account:r})}({connectors:x,connectedWalletAddress:M?.address||""}),[M,x]),V=(0,i.useMemo)(()=>{let t=$(y.S);if(!t)throw new g.b("Unable to load solana plugin");let n=e.solanaRpcs["solana:mainnet"];if(!n)throw new g.b("Unable to load mainnet RPC");return t.getSolanaRpcClient({rpc:n.rpc,rpcSubscriptions:n.rpcSubscriptions,chain:"solana:mainnet",blockExplorerUrl:n.blockExplorerUrl??"https://explorer.solana.com"})},[]),Y=(0,f.z)((0,I.I)(Q?.standardWallet.name||"unknown")),G=Y?.name||"wallet";return(0,i.useEffect)(()=>{(async function(){if(!Q||!O||E.current)return;let e=$(y.S);if(!e)return void B(new g.b("Unable to solana plugin"));E.current=!0,O?.testnet&&console.warn("Solana testnets are not supported for bridging");let t=q?1e6*parseFloat(D):(0,s.g)(D),n=await (0,w.g)({isTestnet:!!O.testnet,input:(0,w.t)({appId:T.id,amount:t.toString(),user:Q.address,recipient:H,destinationChainId:O.id,originChainId:w.c,originCurrency:q?w.e:w.b,destinationCurrency:q?J:void 0})}).catch(console.error);if(!n)return void B(new g.b(`Unable to fetch quotes for bridging. Wallet ${(0,I.J)(Q.address)} does not have enough funds.`,void 0,g.c.INSUFFICIENT_BALANCE));let r=await e.createTransactionFromRelayQuote({quote:n,source:Q.address,solanaClient:V});if(r)try{F(!0);let t=await e.simulateTransaction({solanaClient:V,tx:r});if(t.hasError)return t.hasFunds?(console.error("Transaction failed:",t.error),void B(new g.b("Something went wrong",void 0,g.c.TRANSACTION_FAILURE))):void B(new g.b(`Wallet ${(0,I.J)(Q?.address)} does not have enough funds. ${n.details.currencyIn.amountFormatted} ${Z} are needed to complete the transaction.`,void 0,g.c.INSUFFICIENT_BALANCE));let{signature:a}=await Q.signAndSendTransaction({chain:"solana:mainnet",transaction:r}),i=e.getAddressFromBuffer(a);W(i),_("pending")}catch(e){if(console.error(e),/user rejected the request/gi.test(e.message||""))return void B(new g.b("Transaction was rejected by the user",void 0,g.c.TRANSACTION_FAILURE));B(new g.b("Something went wrong",void 0,g.c.TRANSACTION_FAILURE))}else B(new g.b(`Unable to select bridge option from quotes. Wallet ${(0,I.J)(Q.address)} does not have enough funds.`,void 0,g.c.INSUFFICIENT_BALANCE))})().catch(console.error)},[]),(0,w.u)({transactionHash:R,isTestnet:!1,bridgingStatus:L,setBridgingStatus:_,onSuccess({transactionHash:e}){F(!1),k(!0),n({eventName:v.O,payload:{provider:"external",status:"success",txHash:e,address:Q.address,chainType:"solana",clusterName:P,token:"SOL",destinationAddress:H,destinationChainId:O.id,destinationChainType:"ethereum",destinationValue:D,destinationToken:q?"USDC":"ETH"}})},onFailure({error:e}){F(!1),B(e)}}),(0,i.useEffect)(()=>{if(!U)return;let e=setTimeout(t,h.t);return()=>clearTimeout(e)},[U]),(0,i.useEffect)(()=>{z&&(N({funding:A?.funding,solanaFundingData:A?.solanaFundingData,sendTransaction:A?.sendTransaction,errorModalData:{error:z,previousScreen:"TransferFromWalletScreen"}}),S("ErrorScreen",!1))},[z]),U?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(u.t,{}),(0,r.jsx)(l.b,{}),(0,r.jsxs)(l.c,{children:[(0,r.jsx)(a.A,{color:"var(--privy-color-success)",width:"64px",height:"64px"}),(0,r.jsx)(c.C,{title:"Success!",description:`You’ve successfully added ${D} ${Z} to your ${T.name} wallet. It may take a minute before the funds are available to use.`})]}),(0,r.jsx)(l.R,{}),(0,r.jsx)(d.B,{})]}):j&&Q?(0,r.jsx)(C.T,{walletClientType:(0,I.I)(Q?.standardWallet.name||"unknown"),displayName:G,addressToFund:H,isBridging:j,isErc20Flow:!1,chainId:O.id,chainName:O.name,totalPriceInUsd:void 0,totalPriceInNativeCurrency:void 0,gasPriceInUsd:void 0,gasPriceInNativeCurrency:void 0}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(u.t,{}),(0,r.jsx)(p.N,{}),(0,r.jsx)("div",{style:{marginTop:"1rem"}}),(0,r.jsx)(d.B,{})]})}}},42407:(e,t,n)=>{n.d(t,{A:()=>l});var r=n(12115);let a=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,n)=>n?n.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)},i=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter((e,t,n)=>!!e&&""!==e.trim()&&n.indexOf(e)===t).join(" ").trim()};var s={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let o=(0,r.forwardRef)((e,t)=>{let{color:n="currentColor",size:a=24,strokeWidth:o=2,absoluteStrokeWidth:l,className:d="",children:c,iconNode:u,...p}=e;return(0,r.createElement)("svg",{ref:t,...s,width:a,height:a,stroke:n,strokeWidth:l?24*Number(o)/Number(a):o,className:i("lucide",d),...!c&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0})(p)&&{"aria-hidden":"true"},...p},[...u.map(e=>{let[t,n]=e;return(0,r.createElement)(t,n)}),...Array.isArray(c)?c:[c]])}),l=(e,t)=>{let n=(0,r.forwardRef)((n,s)=>{let{className:l,...d}=n;return(0,r.createElement)(o,{ref:s,iconNode:t,className:i("lucide-".concat(a(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()),"lucide-".concat(e),l),...d})});return n.displayName=a(e),n}},80319:(e,t,n)=>{n.d(t,{g:()=>s});var r=n(24895),a=n(39330);class i extends a.C{constructor({value:e}){super(`Number \`${e}\` is not a valid decimal number.`,{name:"InvalidDecimalNumberError"})}}function s(e,t="wei"){return function(e,t){if(!/^(-?)([0-9]*)\.?([0-9]*)$/.test(e))throw new i({value:e});let[n,r="0"]=e.split("."),a=n.startsWith("-");if(a&&(n=n.slice(1)),r=r.replace(/(0+)$/,""),0===t)1===Math.round(Number(`.${r}`))&&(n=`${BigInt(n)+1n}`),r="";else if(r.length>t){let[e,a,i]=[r.slice(0,t-1),r.slice(t-1,t),r.slice(t)],s=Math.round(Number(`${a}.${i}`));(r=s>9?`${BigInt(e)+BigInt(1)}0`.padStart(e.length+1,"0"):`${e}${s}`).length>t&&(r=r.slice(1),n=`${BigInt(n)+1n}`),r=r.slice(0,t)}else r=r.padEnd(t,"0");return BigInt(`${a?"-":""}${n}${r}`)}(e,r.eL[t])}},95204:(e,t,n)=>{n.d(t,{N:()=>i});var r=n(95155),a=n(20031);let i=({size:e,centerIcon:t})=>(0,r.jsx)(s,{$size:e,children:(0,r.jsxs)(o,{children:[(0,r.jsx)(d,{}),(0,r.jsx)(c,{}),t?(0,r.jsx)(l,{children:t}):null]})}),s=a.I4.div`
  --spinner-size: ${e=>e.$size?e.$size:"96px"};

  display: inline-flex;
  justify-content: center;
  align-items: center;

  @media all and (display-mode: standalone) {
    margin-bottom: 30px;
  }
`,o=a.I4.div`
  position: relative;
  height: var(--spinner-size);
  width: var(--spinner-size);

  opacity: 1;
  animation: fadein 200ms ease;
`,l=a.I4.div`
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
`,d=a.I4.div`
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
`,c=a.I4.div`
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