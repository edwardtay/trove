"use strict";exports.id=1194,exports.ids=[1194,5838],exports.modules={1194:(a,b,c)=>{c.r(b),c.d(b,{ConnectOnlyStatusScreen:()=>p,ConnectOnlyStatusScreenView:()=>o,default:()=>p});var d=c(21124),e=c(38301),f=c(32571),g=c(44110),h=c(64317),i=c(99848),j=c(87230),k=c(23966),l=c(74995),m=c(95761),n=c(15838);c(18521),c(22967),c(21398),c(61946);let o=({walletLogo:a,success:b,errorMessage:c,title:e,subtitle:f,onRetry:h,onUseDifferentWallet:i,onBack:j,numRetries:k,maxRetries:m})=>(0,d.jsx)(l.S,{title:e,subtitle:f,icon:a,iconVariant:"loading",iconLoadingStatus:{success:b,fail:!!c},primaryCta:c===g.C.ERROR_USER_EXISTS?{label:"Use a different wallet",onClick:i}:!b&&c?.retryable&&k<m?{label:"Retry",onClick:h,disabled:!c?.retryable||k>=m}:!b&&c&&k>=m?{label:"Use a different wallet",onClick:i}:void 0,onBack:j,watermark:!0}),p={component:()=>{let a,{navigateBack:b,navigate:c,lastScreen:g,currentScreen:l,data:p,setModalData:q}=(0,k.a)(),{walletConnectionStatus:r,closePrivyModal:s}=(0,j.u)(),[t,u]=(0,e.useState)(void 0),[v,w]=(0,e.useState)(0),x=(0,i.z)(r?.connector?.walletClientType||"unknown"),y="connected"===r?.status,z="switching_to_supported_chain"===r?.status;(0,e.useEffect)(()=>{if(y){let a;if(p?.externalConnectWallet?.onCompleteNavigateTo){let b=p.externalConnectWallet.onCompleteNavigateTo,d=r.connectedWallet?.address;a=setTimeout(()=>{if(p.funding&&r.connector){let a=r.connector.wallets.find(a=>a.address===d);q({...p,funding:{...p.funding,connectedWallet:a}})}c(b({address:d,walletClientType:r.connector?.walletClientType,walletChainType:r.connector?.chainType}))},h.q)}else a=setTimeout(s,h.q);return()=>clearTimeout(a)}},[y]),(0,e.useEffect)(()=>{var a;r?.connectError&&(a=r?.connectError,u((0,n.getErrorDetails)(a)))},[r]);let A=r?.connector?.connectorType||"injected",B=r?.connector?.walletClientType||"unknown",C=x?.metadata?.shortName||x?.name||r?.connector?.walletBranding.name||"Browser Extension",D=x?.image_url?.md||r?.connector?.walletBranding.icon||(a=>(0,d.jsx)(m.B,{...a})),E="Browser Extension"===C?C.toLowerCase():C;a=y?`Successfully connected with ${E}`:t?t.message:z?"Switching networks":`Waiting for ${E}`;let F="Don’t see your wallet? Check your other browser windows.";return y?F="You’re good to go!":v>=2&&t?F="Unable to connect wallet":t?F=t.detail:z?F="Switch your wallet to the requested network.":"metamask"===B&&f.Fr?F="Click to continue to open and connect MetaMask.":"metamask"===B?F="For the best experience, connect only one wallet at a time.":"wallet_connect_v2"===A?F="Open your mobile wallet app to continue":"coinbase_wallet"===A&&(F="Confirm in the Coinbase app/popup to continue."),(0,d.jsx)(o,{walletName:C,walletLogo:D,success:y,errorMessage:t,title:a,subtitle:F,onRetry:()=>{w(v+1),u(void 0),r?.connectRetry()},onUseDifferentWallet:b,onBack:l===g?void 0:b,numRetries:v,maxRetries:2})}}},15198:(a,b,c)=>{c.d(b,{S:()=>w});var d=c(21124),e=c(38301),f=c(78858),g=c(99848),h=c(7797),i=c(69456);let j=f.I4.div`
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
`},15838:(a,b,c)=>{c.r(b),c.d(b,{ConnectionStatusScreen:()=>y,ConnectionStatusView:()=>x,default:()=>y,getErrorDetails:()=>w});var d=c(21124),e=c(38301),f=c(32571),g=c(78858),h=c(95761),i=c(66367),j=c(64317),k=c(29618),l=c(44110),m=c(97917),n=c(41218),o=c(87230),p=c(99848),q=c(23966),r=c(16747),s=c(98403),t=c(67845),u=c(74995);c(18521),c(21398),c(61946),c(22967);let v=a=>{let b=localStorage.getItem("-walletlink:https://www.walletlink.org:Addresses")?.split(" ").filter(a=>(0,m.q)(a,{strict:!0})).map(a=>(0,n.b)(a));return!!b?.length&&!!a?.linkedAccounts.filter(a=>"wallet"==a.type&&b.includes(a.address)).length},w=a=>a?.privyErrorCode===o.c.LINKED_TO_ANOTHER_USER?l.C.ERROR_USER_EXISTS:a instanceof l.P&&!a.details.default?a.details:a instanceof l.x?l.C.ERROR_TIMED_OUT:a?.privyErrorCode===o.c.CANNOT_LINK_MORE_OF_TYPE?l.C.ERROR_USER_LIMIT_REACHED:l.C.ERROR_WALLET_CONNECTION,x=({walletLogo:a,title:b,subtitle:c,signSuccess:e,errorMessage:f,connectSuccess:g,separateConnectAndSign:h,signing:j,walletConnectRedirectUri:m,walletConnectFallbackUniversalUri:n,hasTabbedAway:o,showCoinbaseWalletResetCta:p,numRetries:q,onBack:r,onSign:s,onRetry:t,onCoinbaseReset:v,onDifferentWallet:w})=>{let{t:x}=(0,k.u)(),y=p?{label:"Use a different wallet",onClick:v,disabled:e}:f===l.C.ERROR_USER_EXISTS&&r?{label:"Use a different wallet",onClick:w}:g&&!e&&h?{label:j?"Signing":"Sign with your wallet",onClick:s,disabled:j}:!e&&f?.retryable&&q<2?{label:"Retry",onClick:t,disabled:!1}:e||f?void 0:{label:x("connectionStatus.connecting"),onClick:()=>{},disabled:!0};return(0,d.jsx)(u.S,{title:b,subtitle:c,icon:a,iconVariant:"loading",iconLoadingStatus:{success:e,fail:!!f},primaryCta:y,onBack:r,watermark:!0,children:!g&&m&&!o&&(0,d.jsxs)(z,{children:[x("connectionStatus.stillHere")," ",(0,d.jsx)(i.L,{href:m,target:"_blank",variant:"underlined",size:"sm",children:x("connectionStatus.tryConnectingAgain")}),n&&(0,d.jsxs)(d.Fragment,{children:[" ",x("connectionStatus.or")," ",(0,d.jsx)(i.L,{href:n,target:"_blank",variant:"underlined",size:"sm",children:x("connectionStatus.useDifferentLink")})]})]})})},y={component:()=>{let a,[b,c]=(0,e.useState)(!1),[g,i]=(0,e.useState)(!1),[m,n]=(0,e.useState)(void 0),{authenticated:u,logout:y}=(0,q.u)(),{navigate:z,navigateBack:A,lastScreen:B,currentScreen:C,setModalData:D,data:E}=(0,q.a)(),F=(0,j.u)(),{t:G}=(0,k.u)(),{getAuthFlow:H,walletConnectionStatus:I,closePrivyModal:J,initLoginWithWallet:K,loginWithWallet:L,updateWallets:M,createAnalyticsEvent:N}=(0,o.u)(),{walletConnectors:O}=(0,q.u)(),[P,Q]=(0,e.useState)(0),{user:R}=(0,q.u)(),S=(0,s.u)(),[T]=(0,e.useState)(R?.linkedAccounts.length||0),[U,V]=(0,e.useState)(""),[W,X]=(0,e.useState)(""),[Y,Z]=(0,e.useState)(!1),{hasTabbedAway:$}=function(){let[a,b]=(0,e.useState)(!1),c=(0,e.useCallback)(()=>{document.hidden&&b(!0)},[]);return(0,e.useEffect)(()=>(document.addEventListener("visibilitychange",c),()=>document.removeEventListener("visibilitychange",c)),[c]),{hasTabbedAway:a,reset:()=>b(!1)}}(),{enabled:_,token:aa}=(0,h.a)(),ab=(0,p.z)(I?.connector?.walletClientType||"unknown"),ac=f.Fr&&"wallet_connect_v2"===I?.connector?.connectorType||f.Fr&&"coinbase_wallet"===I?.connector?.connectorType||f.Fr&&"base_account"===I?.connector?.connectorType||f.Fr&&"injected"===I?.connector?.connectorType&&"phantom"===I?.connector?.walletClientType||f.Fr&&"solana_adapter"===I?.connector?.connectorType&&"mobile_wallet_adapter"===I.connector.walletClientType,ad="connected"===I?.status,ae="switching_to_supported_chain"===I?.status;(0,e.useEffect)(()=>{let a=H(),b=a instanceof h.b||a instanceof h.S?a:void 0;ad&&"solana"===I.connector?.chainType&&"phantom"===I.connector?.walletClientType&&S(t.l)&&void 0===E?.login?.isSigningInWithLedgerSolana?z("ConnectLedgerScreen",!1):(ad&&!b&&(!_||aa||u?K(I.connectedWallet,aa,E?.login?.disableSignup,E?.login?.isSigningInWithLedgerSolana?"transaction":"plain").then(()=>{Z(!0)}):(D({captchaModalData:{callback:a=>K(I.connectedWallet,a,E?.login?.disableSignup,E?.login?.isSigningInWithLedgerSolana?"transaction":"plain").then(()=>{Z(!0)}),userIntentRequired:!1,onSuccessNavigateTo:"ConnectionStatusScreen",onErrorNavigateTo:"ErrorScreen"}}),z("CaptchaScreen",!1))),b instanceof h.S&&E?.login?.isSigningInWithLedgerSolana&&(b.messageType="transaction"),b&&ac&&ad&&!b.preparedMessage?b.buildMessage():b&&!ac&&ad&&(g||(async()=>{i(!0),n(void 0);try{"wallet_connect_v2"===I?.connector?.connectorType&&"metamask"===I?.connector?.walletClientType&&await (0,l.m)(2500),await ag()}catch(a){console.warn("Auto-prompted signature failed",a)}finally{i(!1)}})()))},[P,ad,Y]),(0,e.useEffect)(()=>{if(R&&b){let a=j.q-500;if(F?.legal.requireUsersAcceptTerms&&!R.hasAcceptedTerms){let b=setTimeout(()=>{z("AffirmativeConsentScreen")},a);return()=>clearTimeout(b)}if((0,r.s)(R,F.embeddedWallets)){let b=setTimeout(()=>{D({createWallet:{onSuccess:()=>{},onFailure:a=>{console.error(a),N({eventName:"embedded_wallet_creation_failure_logout",payload:{error:a,screen:"ConnectionStatusScreen"}}),y()},callAuthOnSuccessOnClose:!0}}),z("EmbeddedWalletOnAccountCreateScreen")},a);return()=>clearTimeout(b)}M();let b=setTimeout(()=>J({shouldCallAuthOnSuccess:!0,isSuccess:!0}),j.q);return()=>clearTimeout(b)}},[R,b]);let af=a=>{if(a?.privyErrorCode!==o.c.ALLOWLIST_REJECTED){if(a?.privyErrorCode===o.c.USER_LIMIT_REACHED)return console.error(new o.k(a).toString()),void z("UserLimitReachedScreen");if(a?.privyErrorCode!==o.c.USER_DOES_NOT_EXIST)return a?.privyErrorCode===o.c.ACCOUNT_TRANSFER_REQUIRED&&a.data?.data?.nonce?(D({accountTransfer:{nonce:a.data?.data?.nonce,account:H()?.meta.address,displayName:a.data?.data?.account?.displayName,externalWalletMetadata:{walletClientType:H()?.meta.walletClientType,chainId:H()?.meta.chainId,connectorType:H()?.meta.connectorType},linkMethod:H()instanceof h.b?"siwe":"siws",embeddedWalletAddress:a.data?.data?.otherUser?.embeddedWalletAddress}}),void z("LinkConflictScreen")):void n(w(a));z("AccountNotFoundScreen")}else z("AllowlistRejectionScreen")};async function ag(){try{await L(),c(!0)}catch(a){af(a)}finally{i(!1)}}(0,e.useEffect)(()=>{I?.connectError&&af(I?.connectError)},[I]),((a,b)=>{let c=(0,e.useRef)(()=>{});(0,e.useEffect)(()=>{c.current=a}),(0,e.useEffect)(()=>{if(null!==b){let a=setInterval(()=>c.current(),b||0);return()=>clearInterval(a)}},[b])})(()=>{let a="wallet_connect_v2"===ah&&I?.connector instanceof h.W?I.connector.redirectUri:void 0;a&&V(a);let b="wallet_connect_v2"===ah&&I?.connector instanceof h.W?I.connector.fallbackUniversalRedirectUri:void 0;b&&X(b)},I?.connector instanceof h.W&&!U?500:null);let ah=I?.connector?.connectorType||"injected",ai=I?.connector?.walletClientType||"unknown",aj=ab?.metadata?.shortName||ab?.name||I?.connector?.walletBranding.name||"Browser Extension",ak=ab?.image_url?.md||I?.connector?.walletBranding.icon||(a=>(0,d.jsx)(h.B,{...a})),al="Browser Extension"===aj?aj.toLowerCase():aj;a=b?G("connectionStatus.successfullyConnected",{walletName:al}):m?G("connectionStatus.errorTitle",{errorMessage:m.message}):ae?"Switching networks":ad?g&&ac?"Signing":"Sign to verify":`Waiting for ${al}`;let am=G("connectionStatus.checkOtherWindows");b?am=T===(R?.linkedAccounts.length||0)?"Wallet was already linked.":"You're good to go!":P>=2&&m?am="Unable to connect wallet":m?am=m.detail:ae?am="Switch your wallet to the requested network.":ad&&ac?am="Sign the message in your wallet to verify it belongs to you.":"metamask"===ai&&f.Fr?am="Click continue to open and connect MetaMask.":"metamask"===ai?am="For the best experience, connect only one wallet at a time.":"wallet_connect"===ah?am="Open your mobile wallet app to continue":"coinbase_wallet"===ah?(0,l.z)()||(am=v(R)?"Continue with the Coinbase app. Not the right wallet? Reset your connection below.":"Confirm in the Coinbase app/popup to continue."):E?.login?.isSigningInWithLedgerSolana&&(am="Ledger requires a transaction to verify your identity. You'll sign a transaction that performs no onchain action.");let an=O?.walletConnectors?.find(a=>"coinbase_wallet"===a.walletClientType),ao="coinbase_wallet"===ai&&(v(R)||m===l.C.ERROR_USER_EXISTS);return(0,d.jsx)(x,{walletLogo:ak,title:a,subtitle:am,signSuccess:b,errorMessage:m,connectSuccess:ad,separateConnectAndSign:ac,signing:g,walletConnectRedirectUri:U,walletConnectFallbackUniversalUri:W,hasTabbedAway:$,showCoinbaseWalletResetCta:ao,numRetries:P,onBack:B&&C!==B?A:void 0,onSign:()=>{i(!0),ag()},onRetry:()=>{Q(P+1),n(void 0),ad?(i(!0),ag()):I?.connectRetry()},onCoinbaseReset:()=>{an&&an?.disconnect()},onDifferentWallet:A})}},z=g.I4.p`
  text-align: center;
  color: var(--privy-color-foreground-2);
  font-size: 14px;
  line-height: 22px;
  margin: 16px 0;
`},16747:(a,b,c)=>{c.d(b,{s:()=>e});var d=c(95761);let e=(a,b)=>(0,d.s)(a,b.ethereum.createOnLogin)||(0,d.k)(a,b.solana.createOnLogin)},29618:(a,b,c)=>{c.d(b,{u:()=>f});var d=c(64317);let e={"connectionStatus.successfullyConnected":"Successfully connected with {walletName}","connectionStatus.errorTitle":"{errorMessage}","connectionStatus.connecting":"Connecting","connectionStatus.connectOneWallet":"For the best experience, connect only one wallet at a time.","connectionStatus.checkOtherWindows":"Don't see your wallet? Check your other browser windows.","connectionStatus.stillHere":"Still here?","connectionStatus.tryConnectingAgain":"Try connecting again","connectionStatus.or":"or","connectionStatus.useDifferentLink":"use this different link","connectWallet.connectYourWallet":"Connect a wallet","connectWallet.waitingForWallet":"Waiting for {walletName}","connectWallet.connectToAccount":"Connect a wallet to your {appName} account","connectWallet.installAndConnect":"To connect to {walletName}, install and open the app. Then confirm the connection when prompted.","connectWallet.tryConnectingAgain":"Please try connecting again.","connectWallet.openInApp":"Open in app","connectWallet.copyLink":"Copy link","connectWallet.retry":"Retry","connectWallet.searchPlaceholder":"Search through {count} wallets","connectWallet.noWalletsFound":"No wallets found. Try another search.","connectWallet.lastUsed":"Last used","connectWallet.selectYourWallet":"Select your wallet","connectWallet.selectNetwork":"Select network","connectWallet.goToWallet":"Go to {walletName} to continue","connectWallet.scanToConnect":"Scan code to connect to {walletName}","connectWallet.openOrInstall":"Open or install {walletName}"};function f(){let a=(0,d.u)();return{t:(b,c)=>{var d;let f;return d=a.intl.textLocalization,f=d?.[b]??e[b],c&&0!==Object.keys(c).length?f.replace(/\{(\w+)\}/g,(a,b)=>c[b]??a):f}}}},66367:(a,b,c)=>{c.d(b,{L:()=>g});var d=c(21124),e=c(78858);let f=e.I4.a`
  && {
    color: ${({$variant:a})=>"underlined"===a?"var(--privy-color-foreground)":"var(--privy-link-navigation-color, var(--privy-color-accent))"};
    font-weight: 400;
    text-decoration: ${({$variant:a})=>"underlined"===a?"underline":"var(--privy-link-navigation-decoration, none)"};
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;
    cursor: ${({$disabled:a})=>a?"not-allowed":"pointer"};
    opacity: ${({$disabled:a})=>a?.5:1};

    font-size: ${({$size:a})=>{switch(a){case"xs":return"12px";case"sm":return"14px";default:return"16px"}}};

    line-height: ${({$size:a})=>{switch(a){case"xs":return"18px";case"sm":return"22px";default:return"24px"}}};

    transition:
      color 200ms ease,
      text-decoration-color 200ms ease,
      opacity 200ms ease;

    &:hover {
      color: ${({$variant:a,$disabled:b})=>"underlined"===a?"var(--privy-color-foreground)":"var(--privy-link-navigation-color, var(--privy-color-accent))"};
      text-decoration: ${({$disabled:a})=>a?"none":"underline"};
      text-underline-offset: 4px;
    }

    &:active {
      color: ${({$variant:a,$disabled:b})=>b?"underlined"===a?"var(--privy-color-foreground)":"var(--privy-link-navigation-color, var(--privy-color-accent))":"var(--privy-color-foreground)"};
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px #949df9;
      border-radius: 2px;
    }
  }
`,g=({size:a="md",variant:b="navigation",disabled:c=!1,as:e,children:g,onClick:h,...i})=>(0,d.jsx)(f,{as:e,$size:a,$variant:b,$disabled:c,onClick:a=>{c?a.preventDefault():h?.(a)},...i,children:g})},69456:(a,b,c)=>{c.d(b,{N:()=>f});var d=c(21124),e=c(78858);let f=({size:a,centerIcon:b})=>(0,d.jsx)(g,{$size:a,children:(0,d.jsxs)(h,{children:[(0,d.jsx)(j,{}),(0,d.jsx)(k,{}),b?(0,d.jsx)(i,{children:b}):null]})}),g=e.I4.div`
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
`},74995:(a,b,c)=>{c.d(b,{S:()=>g});var d=c(21124),e=c(7797),f=c(15198);let g=({primaryCta:a,secondaryCta:b,helpText:c,footerText:g,watermark:h=!0,children:i,...j})=>{let k=a||b?(0,d.jsxs)(d.Fragment,{children:[a&&(()=>{let{label:b,...c}=a,f=c.variant||"primary";return(0,d.jsx)(e.a,{...c,variant:f,style:{width:"100%",...c.style},children:b})})(),b&&(()=>{let{label:a,...c}=b,f=c.variant||"secondary";return(0,d.jsx)(e.a,{...c,variant:f,style:{width:"100%",...c.style},children:a})})()]}):null;return(0,d.jsxs)(f.S,{id:j.id,className:j.className,children:[(0,d.jsx)(f.S.Header,{...j}),i?(0,d.jsx)(f.S.Body,{children:i}):null,c||k||h?(0,d.jsxs)(f.S.Footer,{children:[c?(0,d.jsx)(f.S.HelpText,{children:c}):null,k?(0,d.jsx)(f.S.Actions,{children:k}):null,h?(0,d.jsx)(f.S.Watermark,{}):null]}):null,g?(0,d.jsx)(f.S.FooterText,{children:g}):null]})}}};