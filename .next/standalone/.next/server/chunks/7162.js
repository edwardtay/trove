"use strict";exports.id=7162,exports.ids=[7162],exports.modules={13668:(a,b,c)=>{c.d(b,{A:()=>d});let d=(0,c(6101).A)("wallet",[["path",{d:"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",key:"18etb6"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",key:"xoc0q4"}]])},15925:(a,b,c)=>{c.d(b,{A:()=>e});var d=c(38301);let e=d.forwardRef(function({title:a,titleId:b,...c},e){return d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:e,"aria-labelledby":b},c),a?d.createElement("title",{id:b},a):null,d.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"}))})},27162:(a,b,c)=>{c.r(b),c.d(b,{TransferFromWalletScreen:()=>E,default:()=>E});var d=c(21124),e=c(38301),f=c(7797),g=c(45470),h=c(76078),i=c(74065),j=c(77911),k=c(64317),l=c(99848),m=c(87230),n=c(23966),o=c(59626),p=c(78498),q=c(95761),r=c(32571),s=c(78858),t=c(65097),u=c(44110),v=c(94223);c(22967),c(18521),c(21398),c(61946);let w=({provider:a,displayName:b,logo:c,connectOnly:e,connector:f})=>{let g,{navigate:h,setModalData:i}=(0,n.a)(),{connectWallet:j}=(0,m.u)(),k=(0,l.r)(),o=(0,l.z)(a),p="wallet_connect_v2"===f.connectorType?a:f.walletClientType,s=window.matchMedia("(display-mode: standalone)").matches,v=(0,l.k)({connectorType:f.connectorType,walletClientType:p});g=v&&v.chainTypes.includes(f.chainType)?()=>{v.isInstalled||"solana"===f.chainType&&"isInstalled"in f&&f.isInstalled?(j(f,p),h(e?"ConnectOnlyStatusScreen":"ConnectionStatusScreen")):r.Fr?(i({installWalletModalData:{walletConfig:v,chainType:f.chainType,connectOnly:e}}),h("WalletInterstitialScreen")):(i({installWalletModalData:{walletConfig:v,chainType:f.chainType,connectOnly:e}}),h("InstallWalletScreen"))}:"coinbase_wallet"!==f.connectorType||"eoaOnly"!==f.coinbaseWalletConfig.preference?.options||!r.Fr||s||(0,u.z)()?()=>{(!(0,q.x)(window.navigator.userAgent)||event?.isTrusted)&&(j(f,p),e?"wallet_connect_v2"===f.connectorType?(i(a=>({...a,externalConnectWallet:{...a?.externalConnectWallet,preSelectedWalletId:"wallet_connect_qr"}})),h("ConnectOnlyLandingScreen")):h("ConnectOnlyStatusScreen"):h("ConnectionStatusScreen"))}:()=>{window.location.href=`https://go.cb-w.com/dapp?cb_url=${encodeURI(window.location.href)}`};let w=b||o?.metadata?.shortName||o?.name||f.walletClientType;return(0,d.jsxs)(x,{onClick:g,children:[(0,d.jsx)(t.I,{icon:c||o?.image_url?.md,name:w}),(0,d.jsx)("span",{children:w}),(0,d.jsxs)(z,{id:"chip-container",children:[k?.walletClientType===p&&k?.chainType===f.chainType?(0,d.jsx)(y,{color:"gray",children:"Recent"}):(0,d.jsx)("span",{id:"connect-text",children:"Connect"}),"solana"===f.chainType&&(0,d.jsx)(y,{color:"gray",children:"Solana"})]})]})},x=(0,s.I4)(l.A)`
  /* Wallet name text color */
  > span {
    color: var(--privy-color-foreground);
  }

  /* Show "Connect" on hover */
  > #chip-container > #connect-text {
    font-weight: 500;
    color: var(--privy-color-accent);
    opacity: 0;
    transition: opacity 0.1s ease-out;
  }

  :hover > #chip-container > #connect-text {
    opacity: 1;
  }

  @media (max-width: 440px) {
    > #chip-container > #connect-text {
      display: none;
    }
  }
`,y=(0,s.I4)(i.C)`
  margin-left: auto;
`,z=s.I4.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-left: auto;
`,A=["coinbase_wallet","base_account"],B=["metamask","okx_wallet","rainbow","uniswap","bybit_wallet","ronin_wallet","haha_wallet","uniswap_extension","zerion","rabby_wallet","cryptocom","binance","kraken_wallet"],C=["safe"],D=["phantom","backpack","solflare","jupiter","universal_profile"],E={component:()=>{let a,{connectors:b}=(0,m.u)(),{setModalData:c,data:i,navigate:r}=(0,n.a)(),s=(0,k.u)(),{wallets:t}=(0,o.u)(),u=b.filter(l.c).flatMap(a=>a.wallets),[v,x]=(0,e.useState)("default"),y="solana"===i?.funding?.chainType,z=!!i?.funding?.crossChainBridgingEnabled;a="ethereum"===i?.funding?.chainType?i.funding.erc20Address&&!i.funding.isUSDC?"ethereum-only":z&&!i.funding.chain.testnet?"ethereum-and-solana":"ethereum-only":z&&!i.funding?.isUSDC?"ethereum-and-solana":"solana-only";let E=t.filter(a=>"privy"!==a.walletClientType),G=E.map(a=>a.walletClientType),H=u.filter(a=>"privy"!==a.walletClientType),I=H.map(a=>a.walletClientType),J=[],K={...i.funding};K.usingDefaultFundingMethod&&(K.usingDefaultFundingMethod=!1);let L=({wallet:a,walletChainType:b})=>{c({...i,funding:{...K,connectedWallet:a,onContinueWithExternalWallet:()=>r(N({destChainType:y?"solana":"ethereum",sourceChainType:b}))},solanaFundingData:i?.solanaFundingData?{...i.solanaFundingData,sourceWalletData:{address:a.address,walletClientType:a.walletClientType}}:void 0}),r("FundingAmountEditScreen")};"solana-only"!==a&&J.push(...E.map((a,b)=>(0,d.jsx)(F,{onClick:()=>L({wallet:a,walletChainType:"ethereum"}),icon:a.meta.icon,name:a.meta.name,chainType:a.type},b))),"ethereum-only"!==a&&J.push(...H.map((a,b)=>(0,d.jsx)(F,{onClick:()=>L({wallet:a,walletChainType:"solana"}),icon:a.meta.icon,name:a.meta.name,chainType:a.type},b))),J.push(...(({walletList:a,walletChainType:b,connectors:c,connectOnly:e,ignore:f,walletConnectEnabled:g,forceWallet:h})=>{let i=[],j=[],k=[],l=c.filter(a=>"ethereum-only"===b?"ethereum"===a.chainType:"solana-only"!==b||"solana"===a.chainType),m=l.find(a=>"wallet_connect_v2"===a.connectorType);for(let[c,n]of(h?[h.wallet]:a).entries()){if("detected_ethereum_wallets"===n)for(let[a,b]of l.filter(({chainType:a,connectorType:b,walletClientType:c})=>"solana"!==a&&("uniswap_wallet_extension"===c||"uniswap_extension"===c?!f.includes("uniswap"):"crypto.com_wallet_extension"===c||"crypto.com_onchain"===c?!f.includes("cryptocom"):"injected"===b&&!f.includes(c))).entries()){let{walletClientType:f,walletBranding:g,chainType:h}=b;("unknown"===f?j:i).push((0,d.jsx)(w,{connectOnly:e,provider:f,logo:g.icon,displayName:g.name,connector:b},`${c}-${n}-${f}-${h}-${a}`))}if("detected_solana_wallets"===n)for(let[a,g]of l.filter(({chainType:a,walletClientType:c})=>{if("solana"===a)return"ethereum-only"!==b&&!f.includes(c)}).entries()){let{walletClientType:b,walletBranding:f,chainType:h}=g;("unknown"===b?j:i).push((0,d.jsx)(w,{connectOnly:e,provider:b,logo:f.icon,displayName:f.name,connector:g},`${c}-${n}-${b}-${h}-${a}`))}if(D.includes(n)){let a=l.find(a=>"injected"===a.connectorType&&a.walletClientType===n||a.connectorType===n);if(a&&i.push((0,d.jsx)(w,{connectOnly:e,provider:n,connector:a},`${c}-${n}`)),"solana-only"===b||"ethereum-and-solana"===b){let a=l.find(({chainType:a,walletClientType:b})=>"solana"===a&&b===n);a&&i.push((0,d.jsx)(w,{connectOnly:e,provider:n,connector:a},`${n}-solana`))}}else if(B.includes(n)){let a=l.find(a=>"uniswap"===n?"uniswap_wallet_extension"===a.walletClientType||"uniswap_extension"===a.walletClientType:"cryptocom"===n?"crypto.com_wallet_extension"===a.walletClientType||"crypto.com_onchain"===a.walletClientType:"injected"===a.connectorType&&a.walletClientType===n);if(g&&!a&&(a=m),a&&i.push((0,d.jsx)(w,{connectOnly:e,provider:n,connector:a,logo:"injected"===a.connectorType?a.walletBranding.icon:void 0,displayName:"injected"===a.connectorType?a.walletBranding.name:void 0},`${c}-${n}`)),"solana-only"===b||"ethereum-and-solana"===b){let a=l.find(({chainType:a,walletClientType:b})=>"solana"===a&&b===n);a&&i.push((0,d.jsx)(w,{connectOnly:e,provider:n,connector:a},`${n}-solana`))}}else if(A.includes(n)){let a=l.find(({connectorType:a})=>a===n);a&&i.push((0,d.jsx)(w,{connectOnly:e,provider:n,connector:a,displayName:"coinbase_wallet"===a.walletClientType?"Coinbase":"Base",logo:"coinbase_wallet"===a.walletClientType?q.y:q.z},`${c}-${n}`))}else if(C.includes(n))m&&k.push((0,d.jsx)(w,{connectOnly:e,provider:n,connector:m},`${c}-${n}`));else if("wallet_connect"===n)m&&k.push((0,d.jsx)(w,{connectOnly:e,provider:n,connector:m,logo:m.walletBranding.icon,displayName:"WalletConnect"},`${c}-${n}`));else if(n===h?.wallet){let b="ethereum"===h.chainType&&a.includes("detected_ethereum_wallets"),f="solana"===h.chainType&&a.includes("detected_solana_wallets");if(b||f){let a=l.find(({walletClientType:a})=>a===n);a&&i.push((0,d.jsx)(w,{connectOnly:e,provider:n,displayName:a.walletBranding?.name,logo:a.walletBranding?.icon,connector:a},`${c}-${n}`))}}}return[...j,...i,...k]})({walletList:s.appearance.walletList.filter(a=>!E.some(b=>b.walletClientType===a)&&!H.some(b=>b.walletClientType===a)),walletChainType:a,connectors:b,connectOnly:!0,ignore:[...s.appearance.walletList,...G,...I],walletConnectEnabled:s.externalWallets.walletConnect.enabled}));let M=(0,d.jsx)(p.W,{text:"More wallets",onClick:()=>x("overflow")}),N=({sourceChainType:a,destChainType:b})=>"ethereum"===a&&"solana"===b?"AwaitingEvmToSolBridgingScreen":"ethereum"===a&&"ethereum"===b?"AwaitingExternalEthereumTransferScreen":"solana"===a&&"ethereum"===b?"AwaitingSolToEvmBridgingScreen":K.externalSolanaFundingScreen;return(0,e.useEffect)(()=>{c({...i,externalConnectWallet:{onCompleteNavigateTo:({address:a,walletClientType:b,walletChainType:d})=>{let e=d??"ethereum",f="ethereum"===e?E.find(c=>c.address===a&&c.walletClientType===b):H.find(c=>c.address===a&&c.walletClientType===b);return c({...i,funding:{...K,connectedWallet:f,onContinueWithExternalWallet:()=>{r(N({destChainType:y?"solana":"ethereum",sourceChainType:e}))}},solanaFundingData:i?.solanaFundingData?{...i.solanaFundingData,sourceWalletData:{address:a||"",walletClientType:b||""}}:void 0}),"FundingAmountEditScreen"}}})},[]),(0,d.jsxs)(d.Fragment,"overflow"===v?{children:[(0,d.jsx)(f.M,{backFn:()=>x("default")},"header"),(0,d.jsxs)(l.Q,{children:[(0,d.jsx)(j.S,{style:{color:"var(--privy-color-foreground-3)",textAlign:"left"},children:"More wallets"}),J]}),(0,d.jsx)(f.B,{})]}:{children:[(0,d.jsx)(h.t,{}),(0,d.jsx)(g.C,{title:"Transfer from wallet",description:"Connect a wallet to deposit funds or send funds manually to your wallet address."}),(0,d.jsxs)(l.Q,{children:[J.length>4?J.slice(0,3):J,J.length>4&&M]}),(0,d.jsx)(f.B,{})]})}},F=({onClick:a,icon:b,name:c,chainType:e})=>(0,d.jsxs)(l.A,{onClick:a,children:[(0,d.jsx)(v.I,{style:{width:20},children:(0,d.jsx)("img",{src:b})}),c,(0,d.jsx)(i.C,{color:"gray",style:{marginLeft:"auto"},children:"Connected"}),"solana"===e&&(0,d.jsx)(i.C,{color:"gray",children:"Solana"})]})},45470:(a,b,c)=>{c.d(b,{C:()=>g,S:()=>f});var d=c(21124),e=c(78858);let f=({title:a,description:b,children:c,...e})=>(0,d.jsx)(h,{...e,children:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("h3",{children:a}),"string"==typeof b?(0,d.jsx)("p",{children:b}):b,c]})});(0,e.I4)(f)`
  margin-bottom: 24px;
`;let g=({title:a,description:b,icon:c,children:e,...f})=>(0,d.jsxs)(i,{...f,children:[c||null,(0,d.jsx)("h3",{children:a}),b&&"string"==typeof b?(0,d.jsx)("p",{children:b}):b,e]}),h=e.I4.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  gap: 8px;
  width: 100%;
  margin-bottom: 24px;

  && h3 {
    font-size: 17px;
    color: var(--privy-color-foreground);
  }

  /* Sugar assuming children are paragraphs. Otherwise, handling styling on your own */
  && p {
    color: var(--privy-color-foreground-2);
    font-size: 14px;
  }
`,i=(0,e.I4)(h)`
  align-items: center;
  text-align: center;
  gap: 16px;

  h3 {
    margin-bottom: 24px;
  }
`},65097:(a,b,c)=>{c.d(b,{I:()=>f});var d=c(21124),e=c(15925);let f=({icon:a,name:b})=>"string"==typeof a?(0,d.jsx)("img",{alt:`${b||"wallet"} logo`,src:a,style:{height:24,width:24,borderRadius:4}}):void 0===a?(0,d.jsx)(e.A,{style:{height:24,width:24}}):a?(0,d.jsx)(a,{style:{height:24,width:24}}):null},74065:(a,b,c)=>{c.d(b,{C:()=>g});var d=c(21124),e=c(78858),f=c(91887);let g=({children:a,color:b,isLoading:c,isPulsing:e,...f})=>(0,d.jsx)(h,{$color:b,$isLoading:c,$isPulsing:e,...f,children:a}),h=e.I4.span`
  padding: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem; /* 150% */
  border-radius: var(--privy-border-radius-xs);
  display: flex;
  align-items: center;
  ${a=>{let b,c;"green"===a.$color&&(b="var(--privy-color-success-dark)",c="var(--privy-color-success-light)"),"red"===a.$color&&(b="var(--privy-color-error)",c="var(--privy-color-error-light)"),"gray"===a.$color&&(b="var(--privy-color-foreground-2)",c="var(--privy-color-background-2)");let d=(0,e.i7)`
      from, to {
        background-color: ${c};
      }

      50% {
        background-color: rgba(${c}, 0.8);
      }
    `;return(0,e.AH)`
      color: ${b};
      background-color: ${c};
      ${a.$isPulsing&&(0,e.AH)`
        animation: ${d} 3s linear infinite;
      `};
    `}}

  ${f.L}
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
`},78498:(a,b,c)=>{c.d(b,{W:()=>g});var d=c(21124),e=c(13668),f=c(99848);let g=({onClick:a,text:b})=>(0,d.jsxs)(f.A,{onClick:a,children:[(0,d.jsx)(f.C,{children:(0,d.jsx)(e.A,{})}),(0,d.jsx)(f.G,{children:b})]})},91887:(a,b,c)=>{c.d(b,{L:()=>f});var d=c(78858);let e=(0,d.i7)`
  from, to {
    background: var(--privy-color-foreground-4);
    color: var(--privy-color-foreground-4);
  }

  50% {
    background: var(--privy-color-foreground-accent);
    color: var(--privy-color-foreground-accent);
  }
`,f=(0,d.AH)`
  ${a=>a.$isLoading?(0,d.AH)`
          width: 35%;
          animation: ${e} 2s linear infinite;
          border-radius: var(--privy-border-radius-sm);
        `:""}
`},94223:(a,b,c)=>{c.d(b,{F:()=>i,I:()=>h,a:()=>j,b:()=>k,c:()=>m,d:()=>n,e:()=>g,f:()=>p,g:()=>q,h:()=>l});var d=c(78858),e=c(7797),f=c(6833);let g=d.I4.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 24px;
  padding-bottom: 24px;
`,h=d.I4.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    border-radius: var(--privy-border-radius-sm);
  }
`,i=d.I4.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
`,j=d.I4.div`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  padding: 0 16px;
  border-width: 1px !important;
  border-radius: 12px;
  cursor: text;

  &:focus-within {
    border-color: var(--privy-color-accent);
  }
`;d.I4.div`
  font-size: 42px !important;
`;let k=d.I4.input`
  background-color: var(--privy-color-background);
  width: 100%;

  &:focus {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
  }

  && {
    font-size: 26px;
  }
`,l=(0,d.I4)(k)`
  && {
    font-size: 42px;
  }
`;d.I4.button`
  cursor: pointer;
  padding-left: 4px;
`;let m=d.I4.div`
  font-size: 18px;
`,n=d.I4.div`
  font-size: 12px;
  color: var(--privy-color-foreground-3);
  // we need this container to maintain a static height if there's no content
  height: 20px;
`;d.I4.div`
  display: flex;
  flex-direction: row;
  line-height: 22px;
  font-size: 16px;
  text-align: center;
  svg {
    margin-right: 6px;
    margin: auto;
  }
`,(0,d.I4)(f.LinkButton)`
  margin-top: 16px;
`;let o=(0,d.i7)`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;(0,d.I4)(e.d)`
  border-radius: var(--privy-border-radius-md) !important;
  animation: ${o} 0.3s ease-in-out;
`;let p=d.I4.div``,q=d.I4.a`
  && {
    color: var(--privy-color-accent);
  }

  cursor: pointer;
`}};