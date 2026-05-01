"use strict";exports.id=198,exports.ids=[198],exports.modules={6101:(a,b,c)=>{c.d(b,{A:()=>i});var d=c(38301);let e=a=>{let b=a.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,b,c)=>c?c.toUpperCase():b.toLowerCase());return b.charAt(0).toUpperCase()+b.slice(1)},f=(...a)=>a.filter((a,b,c)=>!!a&&""!==a.trim()&&c.indexOf(a)===b).join(" ").trim();var g={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let h=(0,d.forwardRef)(({color:a="currentColor",size:b=24,strokeWidth:c=2,absoluteStrokeWidth:e,className:h="",children:i,iconNode:j,...k},l)=>(0,d.createElement)("svg",{ref:l,...g,width:b,height:b,stroke:a,strokeWidth:e?24*Number(c)/Number(b):c,className:f("lucide",h),...!i&&!(a=>{for(let b in a)if(b.startsWith("aria-")||"role"===b||"title"===b)return!0})(k)&&{"aria-hidden":"true"},...k},[...j.map(([a,b])=>(0,d.createElement)(a,b)),...Array.isArray(i)?i:[i]])),i=(a,b)=>{let c=(0,d.forwardRef)(({className:c,...g},i)=>(0,d.createElement)(h,{ref:i,iconNode:b,className:f(`lucide-${e(a).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${a}`,c),...g}));return c.displayName=e(a),c}},28121:(a,b,c)=>{c.d(b,{A:()=>d});let d=(0,c(6101).A)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]])},34318:(a,b,c)=>{c.r(b),c.d(b,{AwaitingSolToEvmBridgingScreen:()=>x,default:()=>x});var d=c(21124),e=c(36236),f=c(38301),g=c(64850),h=c(26313),i=c(27829),j=c(7797),k=c(45470),l=c(76078),m=c(69456),n=c(64317),o=c(87230),p=c(99848),q=c(23966),r=c(33488),s=c(84454),t=c(98403),u=c(67845),v=c(44110),w=c(9225);c(22967),c(32571),c(18521);let x={component:function(){let a=(0,n.u)(),{closePrivyModal:b,createAnalyticsEvent:c,connectors:x}=(0,o.u)(),{navigate:y,setModalData:z,data:A}=(0,q.a)(),B=(0,n.u)(),C=(0,f.useRef)(!1),D=(0,t.u)(),[E,F]=(0,f.useState)(!1),[G,H]=(0,f.useState)(!1),[I,J]=(0,f.useState)(null),[K,L]=(0,f.useState)(),[M,N]=(0,f.useState)();if(!A?.funding||"ethereum"!==A.funding.chainType)throw Error("Invalid funding data");let{amount:O,connectedWallet:P,chain:Q,solanaChain:R,isUSDC:S}=A.funding,T=A.funding.address,U=A.funding.erc20Address,V=A.funding.isUSDC?"USDC":Q.nativeCurrency.symbol,W=(0,f.useMemo)(()=>"solana"===P?.type?P.provider:function({connectors:a,connectedWalletAddress:b}){let c=a.find(a=>"solana"===a.chainType&&a.wallets.some(a=>a.address===b)),d=c?.wallet.accounts.find(a=>a.address===b);if(!c||!d)throw new o.b("Unable to find source wallet connector");return new h.W({wallet:c.wallet,account:d})}({connectors:x,connectedWalletAddress:P?.address||""}),[P,x]),X=(0,f.useMemo)(()=>{let b=D(u.S);if(!b)throw new o.b("Unable to load solana plugin");let c=a.solanaRpcs["solana:mainnet"];if(!c)throw new o.b("Unable to load mainnet RPC");return b.getSolanaRpcClient({rpc:c.rpc,rpcSubscriptions:c.rpcSubscriptions,chain:"solana:mainnet",blockExplorerUrl:c.blockExplorerUrl??"https://explorer.solana.com"})},[]),Y=(0,p.z)((0,v.I)(W?.standardWallet.name||"unknown")),Z=Y?.name||"wallet";return(0,f.useEffect)(()=>{(async function(){if(!W||!Q||C.current)return;let a=D(u.S);if(!a)return void J(new o.b("Unable to solana plugin"));C.current=!0,Q?.testnet&&console.warn("Solana testnets are not supported for bridging");let b=S?1e6*parseFloat(O):(0,g.g)(O),c=await (0,s.g)({isTestnet:!!Q.testnet,input:(0,s.t)({appId:B.id,amount:b.toString(),user:W.address,recipient:T,destinationChainId:Q.id,originChainId:s.c,originCurrency:S?s.e:s.b,destinationCurrency:S?U:void 0})}).catch(console.error);if(!c)return void J(new o.b(`Unable to fetch quotes for bridging. Wallet ${(0,v.J)(W.address)} does not have enough funds.`,void 0,o.c.INSUFFICIENT_BALANCE));let d=await a.createTransactionFromRelayQuote({quote:c,source:W.address,solanaClient:X});if(d)try{F(!0);let b=await a.simulateTransaction({solanaClient:X,tx:d});if(b.hasError)return b.hasFunds?(console.error("Transaction failed:",b.error),void J(new o.b("Something went wrong",void 0,o.c.TRANSACTION_FAILURE))):void J(new o.b(`Wallet ${(0,v.J)(W?.address)} does not have enough funds. ${c.details.currencyIn.amountFormatted} ${V} are needed to complete the transaction.`,void 0,o.c.INSUFFICIENT_BALANCE));let{signature:e}=await W.signAndSendTransaction({chain:"solana:mainnet",transaction:d}),f=a.getAddressFromBuffer(e);L(f),N("pending")}catch(a){if(console.error(a),/user rejected the request/gi.test(a.message||""))return void J(new o.b("Transaction was rejected by the user",void 0,o.c.TRANSACTION_FAILURE));J(new o.b("Something went wrong",void 0,o.c.TRANSACTION_FAILURE))}else J(new o.b(`Unable to select bridge option from quotes. Wallet ${(0,v.J)(W.address)} does not have enough funds.`,void 0,o.c.INSUFFICIENT_BALANCE))})().catch(console.error)},[]),(0,s.u)({transactionHash:K,isTestnet:!1,bridgingStatus:M,setBridgingStatus:N,onSuccess({transactionHash:a}){F(!1),H(!0),c({eventName:r.O,payload:{provider:"external",status:"success",txHash:a,address:W.address,chainType:"solana",clusterName:R,token:"SOL",destinationAddress:T,destinationChainId:Q.id,destinationChainType:"ethereum",destinationValue:O,destinationToken:S?"USDC":"ETH"}})},onFailure({error:a}){F(!1),J(a)}}),(0,f.useEffect)(()=>{if(!G)return;let a=setTimeout(b,n.t);return()=>clearTimeout(a)},[G]),(0,f.useEffect)(()=>{I&&(z({funding:A?.funding,solanaFundingData:A?.solanaFundingData,sendTransaction:A?.sendTransaction,errorModalData:{error:I,previousScreen:"TransferFromWalletScreen"}}),y("ErrorScreen",!1))},[I]),G?(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(l.t,{}),(0,d.jsx)(i.b,{}),(0,d.jsxs)(i.c,{children:[(0,d.jsx)(e.A,{color:"var(--privy-color-success)",width:"64px",height:"64px"}),(0,d.jsx)(k.C,{title:"Success!",description:`You’ve successfully added ${O} ${V} to your ${B.name} wallet. It may take a minute before the funds are available to use.`})]}),(0,d.jsx)(i.R,{}),(0,d.jsx)(j.B,{})]}):E&&W?(0,d.jsx)(w.T,{walletClientType:(0,v.I)(W?.standardWallet.name||"unknown"),displayName:Z,addressToFund:T,isBridging:E,isErc20Flow:!1,chainId:Q.id,chainName:Q.name,totalPriceInUsd:void 0,totalPriceInNativeCurrency:void 0,gasPriceInUsd:void 0,gasPriceInNativeCurrency:void 0}):(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(l.t,{}),(0,d.jsx)(m.N,{}),(0,d.jsx)("div",{style:{marginTop:"1rem"}}),(0,d.jsx)(j.B,{})]})}}},64850:(a,b,c)=>{c.d(b,{g:()=>g});var d=c(73765),e=c(88132);class f extends e.C{constructor({value:a}){super(`Number \`${a}\` is not a valid decimal number.`,{name:"InvalidDecimalNumberError"})}}function g(a,b="wei"){return function(a,b){if(!/^(-?)([0-9]*)\.?([0-9]*)$/.test(a))throw new f({value:a});let[c,d="0"]=a.split("."),e=c.startsWith("-");if(e&&(c=c.slice(1)),d=d.replace(/(0+)$/,""),0===b)1===Math.round(Number(`.${d}`))&&(c=`${BigInt(c)+1n}`),d="";else if(d.length>b){let[a,e,f]=[d.slice(0,b-1),d.slice(b-1,b),d.slice(b)],g=Math.round(Number(`${e}.${f}`));(d=g>9?`${BigInt(a)+BigInt(1)}0`.padStart(a.length+1,"0"):`${a}${g}`).length>b&&(d=d.slice(1),c=`${BigInt(c)+1n}`),d=d.slice(0,b)}else d=d.padEnd(b,"0");return BigInt(`${e?"-":""}${c}${d}`)}(a,d.eL[b])}},69456:(a,b,c)=>{c.d(b,{N:()=>f});var d=c(21124),e=c(78858);let f=({size:a,centerIcon:b})=>(0,d.jsx)(g,{$size:a,children:(0,d.jsxs)(h,{children:[(0,d.jsx)(j,{}),(0,d.jsx)(k,{}),b?(0,d.jsx)(i,{children:b}):null]})}),g=e.I4.div`
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
`}};