"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3323],{6956:(e,n,t)=>{t.d(n,{A:()=>i});var a=t(12115);let i=a.forwardRef(function(e,n){let{title:t,titleId:i,...r}=e;return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":i},r),t?a.createElement("title",{id:i},t):null,a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"}))})},11124:(e,n,t)=>{t.d(n,{NJ:()=>o,vj:()=>s,vz:()=>r});var a=t(28245),i=t(30598);function r(e){return e?`${e.slice(0,5)}…${e.slice(-4)}`:""}function s({wei:e,precision:n=3}){return parseFloat((0,a.c)(e)).toFixed(n).replace(/0+$/,"").replace(/\.$/,"")}function o({amount:e,decimals:n}){return(0,i.J)(BigInt(e),n)}},13160:(e,n,t)=>{t.d(n,{u:()=>l});var a=t(12115),i=t(62997),r=t(64209),s=t(90456),o=t(58719);function l(e){let{tokenPrice:n,isTokenPriceLoading:t,tokenPriceError:l}=(e=>{let{showFiatPrices:n,getUsdTokenPrice:t,chains:o}=(0,s.u)(),[l,c]=(0,a.useState)(!0),[d,u]=(0,a.useState)(void 0),[g,p]=(0,a.useState)(void 0);return(0,a.useEffect)(()=>{e||=r.s;let a=(0,i.u)(o).find(n=>n.id===Number(e));(async()=>{if(n){if(!a)return c(!1),u(Error(`Unable to fetch token price on chain id ${e}`));try{c(!0);let e=await t(a);e?p(e):u(Error(`Unable to fetch token price on chain id ${a.id}`))}catch(e){u(e)}finally{c(!1)}}else c(!1)})()},[e]),{tokenPrice:g,isTokenPriceLoading:l,tokenPriceError:d}})("solana"===e?-1:e),{solPrice:c,isSolPriceLoading:d,solPriceError:u}=(0,o.u)({enabled:"solana"===e});return"solana"===e?{tokenPrice:c,isTokenPriceLoading:d,tokenPriceError:u}:{tokenPrice:n,isTokenPriceLoading:t,tokenPriceError:l}}},24271:(e,n,t)=>{t.d(n,{A:()=>o,D:()=>d,J:()=>c,L:()=>a,R:()=>l,S:()=>i,T:()=>r,a:()=>s,g:()=>u});let a=1e9,i="11111111111111111111111111111111",r="TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",s="TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",o="ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",l=["CPMMoo8L3F4NbTegBCKVNunggL7H1ZpdTHKxQB5qKP1C","CPMDWBwJDtYax9qW7AyRuVC19Cc4L4Vcy4n2BHAbHkCW"],c=["JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4"],d={"solana:mainnet":{EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v:{symbol:"USDC",decimals:6,address:"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"},Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB:{symbol:"USDT",decimals:6,address:"Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"},So11111111111111111111111111111111111111112:{symbol:"SOL",decimals:9,address:"So11111111111111111111111111111111111111112"}},"solana:devnet":{"4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU":{symbol:"USDC",decimals:6,address:"4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"},EJwZgeZrdC8TXTQbQBoL6bfuAnFUUy1PVCMB4DYPzVaS:{symbol:"USDT",decimals:6,address:"EJwZgeZrdC8TXTQbQBoL6bfuAnFUUy1PVCMB4DYPzVaS"},So11111111111111111111111111111111111111112:{symbol:"SOL",decimals:9,address:"So11111111111111111111111111111111111111112"}},"solana:testnet":{}};function u(e,n){let t=parseFloat(e.toString())/a,i=g.format(n*t);return"$0.00"===i?"<$0.01":i}let g=new Intl.NumberFormat(void 0,{style:"currency",currency:"USD",maximumFractionDigits:2})},28999:(e,n,t)=>{t.d(n,{g:()=>a});function a(e){switch(e){case"solana:mainnet":return"Solana";case"solana:devnet":return"Devnet";case"solana:testnet":return"Testnet"}}},36054:(e,n,t)=>{t.d(n,{R:()=>r,a:()=>i});var a=t(20031);let i=a.I4.span`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
`,r=a.I4.span`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 0.5rem;
`},51691:(e,n,t)=>{t.d(n,{A:()=>i});var a=t(12115);let i=a.forwardRef(function(e,n){let{title:t,titleId:i,...r}=e;return a.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":i},r),t?a.createElement("title",{id:i},t):null,a.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"}))})},53323:(e,n,t)=>{t.r(n),t.d(n,{FundSolWalletWithExternalSolanaWallet:()=>eL,default:()=>eL});var a=t(95155),i=t(6956),r=t(12115),s=t(11124),o=t(84241),l=t(83361),c=t(83288),d=t(98392),u=t(66180),g=t(95204),p=t(90600),h=t(36054),f=t(64209),m=t(90456),v=t(17411),w=t(66602),y=t(23567),b=t(72796),A=t(11784),S=t(93555),x=t(89987),T=t(73048),E=t(68463),I=t(42461);let C=()=>{let{walletProxy:e,client:n}=(0,m.u)();return(0,r.useMemo)(()=>({signWithUserSigner:async({message:t,targetAppId:a})=>{if(!e)throw Error("Wallet proxy not initialized");let i=await n.getAccessToken();if(!i)throw Error("User must be authenticated");let{signature:r}=await e.signWithUserSigner({accessToken:i,message:t,targetAppId:a});return{signature:r}}}),[e,n])};var j=t(97928),P=t(89901),F=t(98134);let U=["solana:mainnet","solana:devnet","solana:testnet"];function O(e,n){if(!Object.prototype.hasOwnProperty.call(e,n))throw TypeError("attempted to use private field on non-instance");return e}var W=0,k="__private_"+W+++"__implementation";function M(e,n){if(!Object.prototype.hasOwnProperty.call(e,n))throw TypeError("attempted to use private field on non-instance");return e}var N=0;function _(e){return"__private_"+N+++"_"+e}var D=_("_address"),L=_("_publicKey"),B=_("_chains"),z=_("_features"),R=_("_label"),V=_("_icon");class ${get address(){return M(this,D)[D]}get publicKey(){return M(this,L)[L].slice()}get chains(){return M(this,B)[B].slice()}get features(){return M(this,z)[z].slice()}get label(){return M(this,R)[R]}get icon(){return M(this,V)[V]}constructor({address:e,publicKey:n,label:t,icon:a}){Object.defineProperty(this,D,{writable:!0,value:void 0}),Object.defineProperty(this,L,{writable:!0,value:void 0}),Object.defineProperty(this,B,{writable:!0,value:void 0}),Object.defineProperty(this,z,{writable:!0,value:void 0}),Object.defineProperty(this,R,{writable:!0,value:void 0}),Object.defineProperty(this,V,{writable:!0,value:void 0}),M(this,D)[D]=e,M(this,L)[L]=n,M(this,B)[B]=U,M(this,R)[R]=t,M(this,V)[V]=a,M(this,z)[z]=["solana:signAndSendTransaction","solana:signTransaction","solana:signMessage"],new.target===$&&Object.freeze(this)}}function H(e,n){if(!Object.prototype.hasOwnProperty.call(e,n))throw TypeError("attempted to use private field on non-instance");return e}var J=0;function G(e){return"__private_"+J+++"_"+e}var Z=G("_listeners"),Q=G("_version"),Y=G("_name"),K=G("_icon"),q=G("_injection"),X=G("_isPrivyWallet"),ee=G("_accounts"),en=G("_on"),et=G("_emit"),ea=G("_off"),ei=G("_connected"),er=G("_connect"),es=G("_disconnect"),eo=G("_signMessage"),el=G("_signAndSendTransaction"),ec=G("_signTransaction");function ed(e,...n){H(this,Z)[Z][e]?.forEach(e=>e.apply(null,n))}function eu(e,n){H(this,Z)[Z][e]=H(this,Z)[Z][e]?.filter(e=>n!==e)}function eg(){let{isHeadlessSigning:e,walletProxy:n,initializeWalletProxy:t,recoverEmbeddedWallet:a,openModal:i,privy:r,client:s}=(0,m.u)(),{user:o}=(0,x.u)(),{setModalData:l}=(0,v.a)(),{signWithUserSigner:c}=C();return{signMessage:({message:d,address:u,options:g})=>new Promise(async(p,h)=>{let f=(0,v.j)(o,u);if("privy"!==f?.walletClientType)return void h(new m.b("Wallet is not a Privy wallet",void 0,m.c.EMBEDDED_WALLET_NOT_FOUND));let{entropyId:w,entropyIdVerifier:y}=(0,T.b)(o,f),b=(0,v.b)(f),S=(0,j.b)(d).toString("base64");if(S.length<1)return void h(new m.b("Message must be a non-empty string",void 0,m.c.INVALID_MESSAGE));let x=async()=>{let e;if(!o)throw Error("User must be authenticated before signing with a Privy wallet");let i=await s.getAccessToken();if(!i)throw Error("User must be authenticated to use their embedded wallet.");let l=n??await t(15e3);if(!l)throw Error("Failed to initialize embedded wallet proxy.");if(!await a({address:f.address}))throw Error("Unable to connect to wallet");if(b){let n=await (0,A._)(r,c,{chain_type:"solana",method:"signMessage",params:{message:S,encoding:"base64"},wallet_id:f.id});if(!n.data||!("signature"in n.data))throw Error("Failed to sign message");e=n.data.signature}else{let{response:n}=await l.rpc({accessToken:i,entropyId:w,entropyIdVerifier:y,chainType:"solana",hdWalletIndex:f.walletIndex??0,requesterAppId:g?.uiOptions?.requesterAppId,request:{method:"signMessage",params:{message:S}}});e=n.data.signature}return e};if(e({showWalletUIs:g?.uiOptions?.showWalletUIs}))try{let e=await x(),n=new Uint8Array((0,j.b)(e,"base64"));p({signature:n})}catch(e){h(e)}else l({signMessage:{method:"solana_signMessage",data:S,confirmAndSign:x,onSuccess:e=>{p({signature:new Uint8Array((0,j.b)(e,"base64"))})},onFailure:e=>{h(e)},uiOptions:g?.uiOptions??{}},connectWallet:{recoveryMethod:f.recoveryMethod,connectingWalletAddress:f.address,entropyId:w,entropyIdVerifier:y,isUnifiedWallet:b,onCompleteNavigateTo:"SignRequestScreen",onFailure:e=>{h(new m.b("Failed to connect to wallet",e,m.c.UNKNOWN_CONNECT_WALLET_ERROR))}}}),i("EmbeddedWalletConnectingScreen")})}}function ep(){let{isHeadlessSigning:e,openModal:n,privy:t}=(0,m.u)(),{setModalData:a}=(0,v.a)(),{signMessage:i}=eg(),{signWithUserSigner:r}=C(),{user:s}=(0,x.u)();return{signTransaction:async({transaction:o,options:l,chain:c="solana:mainnet",address:d})=>{let u=(0,v.j)(s,d);if("privy"!==u?.walletClientType)throw new m.b("Wallet is not a Privy wallet",void 0,m.c.EMBEDDED_WALLET_NOT_FOUND);let g=(0,v.b)(u);async function p(e){let n,a;if(g){let n=await (0,A._)(t,r,{chain_type:"solana",method:"signTransaction",params:{transaction:P.O.base64.fromBytes(e),encoding:"base64"},wallet_id:u.id});if(n.data&&"signed_transaction"in n.data)return{signedTransaction:new Uint8Array(P.O.base64.toBytes(n.data.signed_transaction))};throw Error("Failed to sign transaction")}let{signature:s}=await i({message:(0,j.a)(e),address:d,options:{...l,uiOptions:{...l?.uiOptions,showWalletUIs:!1}}});return{signedTransaction:(n=structuredClone((0,y.BX)().decode(e)),(a=(0,b.hl)(d))in n.signatures&&(n.signatures[a]=s),new Uint8Array((0,y.l9)().encode(n)))}}return e({showWalletUIs:l?.uiOptions?.showWalletUIs})?p(o):new Promise(async(e,t)=>{let{entropyId:i,entropyIdVerifier:r}=(0,T.b)(s,u);function d(e){return n=>{t(n instanceof m.b?n:new m.b("Failed to connect to wallet",n,e))}}let h={account:u,transaction:o,chain:c,signOnly:!0,uiOptions:l?.uiOptions||{},onConfirm:p,onSuccess:e,onFailure:d(m.c.TRANSACTION_FAILURE)};a({connectWallet:{recoveryMethod:u.recoveryMethod,connectingWalletAddress:u.address,entropyId:i,entropyIdVerifier:r,isUnifiedWallet:g,onCompleteNavigateTo:"StandardSignAndSendTransactionScreen",onFailure:d(m.c.UNKNOWN_CONNECT_WALLET_ERROR)},standardSignAndSendTransaction:h}),n("EmbeddedWalletConnectingScreen")})}}}let eh=new class extends E.A{setImplementation(e){O(this,k)[k]=e}async signMessage(e){return O(this,k)[k].signMessage(e)}async signAndSendTransaction(e){return O(this,k)[k].signAndSendTransaction(e)}async signTransaction(e){return O(this,k)[k].signTransaction(e)}constructor(e){super(),Object.defineProperty(this,k,{writable:!0,value:void 0}),O(this,k)[k]=e}}({signTransaction:(0,m.l)("signTransaction was not injected"),signAndSendTransaction:(0,m.l)("signAndSendTransaction was not injected"),signMessage:(0,m.l)("signMessage was not injected")}),ef=new class{get version(){return H(this,Q)[Q]}get name(){return H(this,Y)[Y]}get icon(){return H(this,K)[K]}get chains(){return U.slice()}get features(){return{"standard:connect":{version:"1.0.0",connect:H(this,er)[er]},"standard:disconnect":{version:"1.0.0",disconnect:H(this,es)[es]},"standard:events":{version:"1.0.0",on:H(this,en)[en]},"solana:signAndSendTransaction":{version:"1.0.0",supportedTransactionVersions:["legacy",0],signAndSendTransaction:H(this,el)[el]},"solana:signTransaction":{version:"1.0.0",supportedTransactionVersions:["legacy",0],signTransaction:H(this,ec)[ec]},"solana:signMessage":{version:"1.0.0",signMessage:H(this,eo)[eo]},"privy:":{privy:{signMessage:H(this,q)[q].signMessage,signTransaction:H(this,q)[q].signTransaction,signAndSendTransaction:H(this,q)[q].signAndSendTransaction}}}}get accounts(){return H(this,ee)[ee].slice()}get isPrivyWallet(){return H(this,X)[X]}constructor({name:e,icon:n,version:t,injection:a,wallets:i}){Object.defineProperty(this,et,{value:ed}),Object.defineProperty(this,ea,{value:eu}),Object.defineProperty(this,Z,{writable:!0,value:void 0}),Object.defineProperty(this,Q,{writable:!0,value:void 0}),Object.defineProperty(this,Y,{writable:!0,value:void 0}),Object.defineProperty(this,K,{writable:!0,value:void 0}),Object.defineProperty(this,q,{writable:!0,value:void 0}),Object.defineProperty(this,X,{writable:!0,value:void 0}),Object.defineProperty(this,ee,{writable:!0,value:void 0}),Object.defineProperty(this,en,{writable:!0,value:void 0}),Object.defineProperty(this,ei,{writable:!0,value:void 0}),Object.defineProperty(this,er,{writable:!0,value:void 0}),Object.defineProperty(this,es,{writable:!0,value:void 0}),Object.defineProperty(this,eo,{writable:!0,value:void 0}),Object.defineProperty(this,el,{writable:!0,value:void 0}),Object.defineProperty(this,ec,{writable:!0,value:void 0}),H(this,Z)[Z]={},H(this,en)[en]=(e,n)=>(H(this,Z)[Z][e]?.push(n)||(H(this,Z)[Z][e]=[n]),()=>H(this,ea)[ea](e,n)),H(this,ei)[ei]=e=>{null!=e&&(H(this,ee)[ee]=e.map(({address:e})=>new $({address:e,publicKey:I.tw.decode(e)}))),H(this,et)[et]("change",{accounts:this.accounts})},H(this,er)[er]=async()=>(H(this,et)[et]("change",{accounts:this.accounts}),{accounts:this.accounts}),H(this,es)[es]=async()=>{H(this,et)[et]("change",{accounts:this.accounts})},H(this,eo)[eo]=async(...e)=>{let n=[];for(let{account:t,...a}of e){let{signature:e}=await H(this,q)[q].signMessage({...a,address:t.address});n.push({signedMessage:a.message,signature:e})}return n},H(this,el)[el]=async(...e)=>{let n=[];for(let t of e){let{signature:e}=await H(this,q)[q].signAndSendTransaction({...t,transaction:t.transaction,address:t.account.address,chain:t.chain||"solana:mainnet",options:t.options});n.push({signature:e})}return n},H(this,ec)[ec]=async(...e)=>{let n=[];for(let{transaction:t,account:a,options:i,chain:r}of e){let{signedTransaction:e}=await H(this,q)[q].signTransaction({transaction:t,address:a.address,chain:r||"solana:mainnet",options:i});n.push({signedTransaction:e})}return n},H(this,Y)[Y]=e,H(this,K)[K]=n,H(this,Q)[Q]=t,H(this,q)[q]=a,H(this,ee)[ee]=[],H(this,X)[X]=!0,a.on("accountChanged",H(this,ei)[ei],this),H(this,ei)[ei](i)}}({name:"Privy",version:"1.0.0",icon:"data:image/png;base64,AAABAAEAFBQAAAAAIABlAQAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAUAAAAFAgGAAAAjYkdDQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAQVJREFUeJxiYMANZIC4E4ivAPFPIP4FxDeAuB+IlfDowwBMQFwJxF+B+D8O/AOI66Bq8QJGIF6ExyB0vAqImfEZmEeCYTDcgMswPiB+T4aB34FYApuBsWQYBsP52AycToGBK7EZuJECAw9jM3AVBQbuwWZgIwUGTsZmoDkFBnpiMxAEjpJh2FV8iVsbiD+TYBgoDVrgMgwGnID4HRGGgTKBGyHDYEAaiBdCSxh0g/5AU4Q8sYYhAzEgjoGmABBOgFo2eACowFABYn0oVgViAVINkQTiZUD8DIj/ATF6GILEXgLxCiCWIsZAbiAuBeKtQHwHiEHJ6C8UfwHie0C8E4jLoWpRAAAAAP//rcbhsQAAAAZJREFUAwBYFs3VKJ0cuQAAAABJRU5ErkJggg==",wallets:[],injection:eh});var em=t(13160),ev=t(61976),ew=t(2323),ey=t(72839),eb=t(69605),eA=t(23537),eS=t(36058),ex=(e=>(e[e.Uninitialized=0]="Uninitialized",e[e.Initialized=1]="Initialized",e))(ex||{}),eT=(e=>(e[e.Legacy=0]="Legacy",e[e.Current=1]="Current",e))(eT||{}),eE=(e=>(e[e.Nonce=0]="Nonce",e))(eE||{}),eI=(e=>(e[e.CreateAccount=0]="CreateAccount",e[e.Assign=1]="Assign",e[e.TransferSol=2]="TransferSol",e[e.CreateAccountWithSeed=3]="CreateAccountWithSeed",e[e.AdvanceNonceAccount=4]="AdvanceNonceAccount",e[e.WithdrawNonceAccount=5]="WithdrawNonceAccount",e[e.InitializeNonceAccount=6]="InitializeNonceAccount",e[e.AuthorizeNonceAccount=7]="AuthorizeNonceAccount",e[e.Allocate=8]="Allocate",e[e.AllocateWithSeed=9]="AllocateWithSeed",e[e.AssignWithSeed=10]="AssignWithSeed",e[e.TransferSolWithSeed=11]="TransferSolWithSeed",e[e.UpgradeNonceAccount=12]="UpgradeNonceAccount",e))(eI||{});function eC(e){return!!e&&"object"==typeof e&&"address"in e&&(0,ey.Pl)(e)}var ej=t(19331),eP=t(68893),eF=t(34181),eU=t(24271),eO=t(98436),eW=t(28999);function ek({rows:e}){return(0,a.jsx)(h.a,{children:e.filter(e=>!!e).map((e,n)=>null!=e.value||e.isLoading?(0,a.jsxs)(h.R,{children:[(0,a.jsx)(p.L,{children:e.label}),(0,a.jsx)(p.V,{$isLoading:e.isLoading,children:e.value})]},n):null)})}function eM(e){return BigInt(Math.floor(1e9*parseFloat(e)))}function eN(e){return+e_.format(parseFloat(e.toString())/1e9)}t(92253),t(50205);let e_=Intl.NumberFormat(void 0,{maximumFractionDigits:8});async function eD({tx:e,solanaClient:n,amount:t,asset:a,tokenPrice:i}){if(!e)return null;if("SOL"===a&&i){let a=eM(t),r=(0,eU.g)(a,i),s=await (0,j.f)({solanaClient:n,tx:e});return{amountInUsd:r,feeInUsd:i?(0,eU.g)(s,i):void 0,totalInUsd:(0,eU.g)(a+s,i)}}if("USDC"===a&&i){let a,r="$"+t,s=await (0,j.f)({solanaClient:n,tx:e}),o=(a=parseFloat(s.toString())/eU.L*i)<.01?0:a;return{amountInUsd:r,feeInUsd:(0,eU.g)(s,i),totalInUsd:"$"+(parseFloat(t)+o).toFixed(2)}}if("SOL"===a){let a=eM(t),i=await (0,j.f)({solanaClient:n,tx:e});return{amountInSol:t+" SOL",feeInSol:eN(i)+" SOL",totalInSol:eN(a+i)+" SOL"}}return{amountInUsdc:t+" USDC",feeInSol:eN(await (0,j.f)({solanaClient:n,tx:e}))+" SOL"}}let eL={component:function(){let e=(0,f.u)(),{closePrivyModal:n,createAnalyticsEvent:t}=(0,m.u)(),{data:p,setModalData:h,navigate:b}=(0,v.a)(),{wallets:E}=function(){let{ready:e,wallets:n}=function(){let{client:e}=(0,m.u)(),{ready:n,wallet:t}=function(){let{ready:e}=(0,T.u)(),{user:n}=(0,x.u)(),{signMessage:t}=eg(),{signTransaction:a}=ep(),{signAndSendTransaction:i}=function(){let e=(0,f.u)(),{isHeadlessSigning:n,openModal:t,privy:a}=(0,m.u)(),{setModalData:i}=(0,v.a)(),{signTransaction:r}=ep(),s=(0,j.u)(),{user:o}=(0,x.u)(),{signWithUserSigner:l}=C();return{signAndSendTransaction:async({transaction:c,address:d,chain:u="solana:mainnet",options:g})=>{let p=(0,v.j)(o,d);if("privy"!==p?.walletClientType)throw new m.b("Wallet is not a Privy wallet",void 0,m.c.EMBEDDED_WALLET_NOT_FOUND);let h=(0,v.b)(p);async function f(e){if(g?.sponsor)return await (async e=>{if(!h)throw new m.b("Sponsoring transactions is only supported for wallets on the TEE stack",m.c.INVALID_DATA);let n=await (0,A._)(a,l,{chain_type:"solana",method:"signAndSendTransaction",sponsor:!0,params:{transaction:(0,j.b)(e).toString("base64"),encoding:"base64"},caip2:`solana:${(await s(u).rpc.getGenesisHash().send()).substring(0,32)}`,wallet_id:p.id});if(n.data&&"hash"in n.data)return{signature:I.tw.decode(n.data.hash)};throw Error("Failed to sign and send transaction")})(e);let{signedTransaction:n}=await r({transaction:e,address:d,chain:u,options:{...g,uiOptions:{...g?.uiOptions,showWalletUIs:!1}}}),{signature:t}=await s(u).sendAndConfirmTransaction(n);return{signature:t}}return n({showWalletUIs:g?.uiOptions?.showWalletUIs})?f(c):new Promise(async(n,a)=>{let r,s,{entropyId:l,entropyIdVerifier:v}=(0,T.b)(o,p);function w(e){return n=>{a(n instanceof m.b?n:new m.b("Failed to connect to wallet",n,e))}}let y={account:p,transaction:c,chain:u,signOnly:!1,uiOptions:g?.uiOptions||{},onConfirm:f,onSuccess:n,onFailure:w(m.c.TRANSACTION_FAILURE),isSponsored:!!g?.sponsor},b={recoveryMethod:p.recoveryMethod,connectingWalletAddress:p.address,entropyId:l,entropyIdVerifier:v,isUnifiedWallet:h,onCompleteNavigateTo:"StandardSignAndSendTransactionScreen",onFailure:w(m.c.UNKNOWN_CONNECT_WALLET_ERROR)};e.fundingConfig&&(r=(0,F.y)({address:d,appConfig:e,methodScreen:"FundingMethodSelectionScreen",fundWalletConfig:{...g,asset:"native-currency",chain:u},externalSolanaFundingScreen:"FundSolWalletWithExternalSolanaWallet"}),s={amount:e.fundingConfig.defaultRecommendedAmount,asset:"SOL",chain:u,destinationAddress:d,afterSuccessScreen:"StandardSignAndSendTransactionScreen",sourceWalletData:void 0}),i({connectWallet:b,standardSignAndSendTransaction:y,funding:r,solanaFundingData:s}),t("EmbeddedWalletConnectingScreen")})}}}(),s=(0,r.useMemo)(()=>{let e=[...(0,v.m)(n).sort((e,n)=>(e.walletIndex??0)-(n.walletIndex??0))],t=(0,v.h)(n);return t.length?[...e,...t]:e},[n]),o=(0,r.useMemo)(()=>({signMessage:async({message:e,address:n,options:a})=>await t({message:e,address:n,options:a}),signTransaction:async({transaction:e,address:n,chain:t,options:i})=>await a({transaction:e,address:n,chain:t,options:i}),async signAndSendTransaction({transaction:e,address:n,chain:t,options:a}){let{signature:r}=await i({transaction:e,address:n,chain:t,options:a});return{signature:r}}}),[t,a,i]);return(0,r.useEffect)(()=>{eh?.setImplementation(o)},[o]),(0,r.useEffect)(()=>{var n;!e||(n=ef.accounts).length===s.length&&n.every((e,n)=>e.address===s[n]?.address)||eh?.emit("accountChanged",s)},[e,s]),{ready:e,wallet:ef}}(),[a,i]=(0,r.useState)([]),[s,o]=(0,r.useState)([]);return(0,r.useEffect)(()=>{let e=[t,...a.filter(e=>"solana"===e.chainType&&!!e.wallet.features).map(e=>e.wallet)];o(e);let n=a.flatMap(n=>{let t=()=>o([...e]);return n.on("walletsUpdated",t),{connector:n,off:t}}),i=e.map(n=>n.features["standard:events"]?.on("change",()=>{o([...e])}));return()=>{i.forEach(e=>e?.()),n.forEach(({connector:e,off:n})=>e.off("walletsUpdated",n))}},[a]),(0,r.useEffect)(()=>{i(e.connectors?.walletConnectors.filter(e=>"solana"===e.chainType)??[]);let n=()=>{i(e.connectors?.walletConnectors.filter(e=>"solana"===e.chainType)??[])};return e.connectors?.on("connectorInitialized",n),()=>{e.connectors?.off("connectorInitialized",n)}},[n,e.connectors]),{ready:n,wallets:s}}();return{ready:e,wallets:(0,r.useMemo)(()=>n.flatMap(e=>e.accounts.map(n=>new S.W({wallet:e,account:n}))),[n])}}(),[P,U]=(0,r.useState)("preparing"),[O,W]=(0,r.useState)(),[k,M]=(0,r.useState)(),[N,_]=(0,r.useState)();if(!p?.solanaFundingData)throw Error("Funding config is missing");if(!p.solanaFundingData.sourceWalletData)throw Error("Funding config is missing source wallet data");let{amount:D,asset:L,chain:B,sourceWalletData:z,destinationAddress:R,afterSuccessScreen:V}=p.solanaFundingData,$=E.find(e=>e.address===z.address&&(0,F.I)(z.walletClientType)===(0,F.I)(e.standardWallet.name)),H=(0,j.u)()(B),{tokenPrice:J,isTokenPriceLoading:G}=(0,em.u)("solana");return(0,r.useEffect)(()=>{if("preparing"!==P||G||!$)return;let e="SOL"===L?eM(D):BigInt(Math.floor(1e6*parseFloat(D)));M({amount:("SOL"===L&&J?(0,eU.g)(e,J):D)??D}),("SOL"===L?async function({solanaClient:e,source:n,destination:t,amountInLamports:a}){let{value:i}=await e.rpc.getLatestBlockhash().send(),r={address:n},s=(0,ej.F)((0,eP.mN)({version:0}),e=>(0,ey.pt)(r,e),e=>(0,eP.S$)(i,e),e=>(0,eP.az)(function(e,n){let t={source:{value:e.source??null,isWritable:!0},destination:{value:e.destination??null,isWritable:!0}},a={...e},i=e=>{if(!e.value)return;let n=e.isWritable?ew.Uv.WRITABLE:ew.Uv.READONLY;return Object.freeze({address:function(e){if(!e)throw Error("Expected a Address.");return"object"==typeof e&&"address"in e?e.address:Array.isArray(e)?e[0]:e}(e.value),role:eC(e.value)?(0,ew.MR)(n):n,...eC(e.value)?{signer:e.value}:{}})};return Object.freeze({accounts:[i(t.source),i(t.destination)],data:(0,eb.FU)((0,eA.a5)([["discriminator",(0,eS.PL)()],["amount",(0,eS.eC)()]]),e=>({...e,discriminator:2})).encode(a),programAddress:(void 0)??"11111111111111111111111111111111"})}({amount:a,source:r,destination:t}),e),e=>(0,y.i5)(e));return new Uint8Array((0,y.l9)().encode(s))}({solanaClient:H,source:$.address,destination:R,amountInLamports:e}):async function({solanaClient:e,source:n,destination:t,amountInBaseUnits:a}){let i=(0,eO.g)(e.chain),{value:r}=await e.rpc.getLatestBlockhash().send(),s={address:n},[o]=await (0,eF._mM)({mint:i,owner:n,tokenProgram:eU.T}),[l]=await (0,eF._mM)({mint:i,owner:t,tokenProgram:eU.T}),[c,d]=await Promise.all([e.rpc.getAccountInfo(o,{commitment:"confirmed",encoding:"jsonParsed"}).send().catch(()=>null),e.rpc.getAccountInfo(l,{commitment:"confirmed",encoding:"jsonParsed"}).send().catch(()=>null)]);if(!c?.value)throw Error(`Source token account does not exist for address: ${n}`);let u=(0,eF.PUP)({payer:s,ata:l,owner:t,mint:i}),g=(0,ej.F)((0,eP.mN)({version:0}),e=>(0,ey.pt)(s,e),e=>(0,eP.S$)(r,e),e=>d?.value?e:(0,eP.az)(u,e),e=>(0,eP.az)((0,eF.Q7D)({source:o,destination:l,authority:s,amount:a}),e),e=>(0,y.i5)(e));return new Uint8Array((0,y.l9)().encode(g))}({solanaClient:H,source:$.address,destination:R,amountInBaseUnits:e})).then(W).catch(e=>{U("error"),_(e)})},[P,D,L,B,$,R,G,J]),(0,r.useEffect)(()=>{"preparing"===P&&O&&eD({tx:O,solanaClient:H,amount:D,asset:L,tokenPrice:J}).then(e=>{U("loaded"),M({amount:e?.amountInUsd??e?.amountInUsdc??e?.amountInSol??D,fee:e?.feeInUsd??e?.feeInSol,total:e?.totalInUsd??e?.totalInSol})}).catch(e=>{U("error"),_(e)})},[O,D,L,P,J]),(0,r.useEffect)(()=>{"error"===P&&N&&(h({errorModalData:{error:N,previousScreen:"FundSolWalletWithExternalSolanaWallet"},solanaFundingData:p.solanaFundingData}),b("ErrorScreen",!1))},[P,b]),(0,r.useEffect)(()=>{if("success"!==P)return;let e=setTimeout(V?()=>b(V):n,f.t);return()=>clearTimeout(e)},[P]),(0,a.jsxs)(a.Fragment,"success"===P?{children:[(0,a.jsx)(d.t,{}),(0,a.jsx)(l.b,{}),(0,a.jsxs)(l.c,{children:[(0,a.jsx)(i.A,{color:"var(--privy-color-success)",width:"64px",height:"64px"}),(0,a.jsx)(c.C,{title:"Success!",description:`You’ve successfully added ${D} ${L} to your ${e.name} wallet. It may take a minute before the funds are available to use.`})]}),(0,a.jsx)(l.R,{}),(0,a.jsx)(o.B,{})]}:"preparing"===P||"loaded"===P||"sending"===P?{children:[(0,a.jsx)(d.t,{}),(0,a.jsx)(l.e,{style:{marginTop:"16px"},children:(0,a.jsx)(u.I,{icon:$?.standardWallet.icon,name:$?.standardWallet.name})}),(0,a.jsx)(c.C,{style:{marginTop:"8px",marginBottom:"12px"},title:"sending"===P&&$?`Confirming with ${$.standardWallet.name}`:"Confirm transaction"}),(0,a.jsx)(ek,{rows:[{label:"Source",value:(0,s.vz)(z.address)},{label:"Destination",value:(0,s.vz)(R)},{label:"Network",value:(0,eW.g)(B)},{label:"Amount",value:k?.amount,isLoading:"preparing"===P},{label:"Estimated fee",value:k?.fee,isLoading:"preparing"===P},{label:"Total",value:k?.total,isLoading:"preparing"===P}]}),(0,a.jsx)(o.P,{style:{marginTop:"1rem"},loading:"preparing"===P||"sending"===P,onClick:function(){"loaded"===P&&O&&$&&(U("sending"),(async function({transaction:e,chain:n,sourceWallet:t,solanaClient:a}){var i;let{hasFunds:r}=await (0,j.s)({solanaClient:a,tx:e});if(!r)throw new m.b(`Wallet ${(0,s.vz)(t.address)} does not have enough funds.`,void 0,m.c.INSUFFICIENT_BALANCE);let o=(i=(await t.signAndSendTransaction({transaction:e,chain:n}).catch(e=>{throw new m.b("Transaction was rejected by the user",e,m.c.TRANSACTION_FAILURE)})).signature,(0,w.BC)().decode(i));return await (0,j.w)({rpcSubscriptions:a.rpcSubscriptions,signature:o,timeout:2e4}),o})({solanaClient:H,transaction:O,chain:B,sourceWallet:$}).then(e=>{U("success"),t({eventName:ev.O,payload:{provider:"external",status:"success",txHash:e,address:$.address,value:D,chainType:"solana",clusterName:B,token:L,destinationAddress:R,destinationValue:D,destinationChainType:"solana",destinationClusterName:B,destinationToken:L}})}).catch(e=>{U("error"),_(e)}))},children:"Confirm"}),(0,a.jsx)(o.B,{})]}:{children:[(0,a.jsx)(d.t,{}),(0,a.jsx)(g.N,{}),(0,a.jsx)("div",{style:{marginTop:"1rem"}}),(0,a.jsx)(o.B,{})]})}}},58719:(e,n,t)=>{t.d(n,{u:()=>r});var a=t(12115),i=t(90456);let r=({enabled:e=!0}={})=>{let{showFiatPrices:n,getUsdPriceForSol:t}=(0,i.u)(),[r,s]=(0,a.useState)(!0),[o,l]=(0,a.useState)(void 0),[c,d]=(0,a.useState)(void 0);return(0,a.useEffect)(()=>{(async()=>{if(n&&e)try{s(!0);let e=await t();e?d(e):l(Error("Unable to fetch SOL price"))}catch(e){l(e)}finally{s(!1)}else s(!1)})()},[]),{solPrice:c,isSolPriceLoading:r,solPriceError:o}}},61976:(e,n,t)=>{t.d(n,{O:()=>a});let a="sdk_fiat_on_ramp_completed_with_status"},62997:(e,n,t)=>{t.d(n,{u:()=>i});var a=t(81246);function i(e){let n=e.filter(e=>!a.o.has(e.id));return a.m.concat(n)}},66180:(e,n,t)=>{t.d(n,{I:()=>r});var a=t(95155),i=t(51691);let r=({icon:e,name:n})=>"string"==typeof e?(0,a.jsx)("img",{alt:`${n||"wallet"} logo`,src:e,style:{height:24,width:24,borderRadius:4}}):void 0===e?(0,a.jsx)(i.A,{style:{height:24,width:24}}):e?(0,a.jsx)(e,{style:{height:24,width:24}}):null},83288:(e,n,t)=>{t.d(n,{C:()=>s,S:()=>r});var a=t(95155),i=t(20031);let r=({title:e,description:n,children:t,...i})=>(0,a.jsx)(o,{...i,children:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("h3",{children:e}),"string"==typeof n?(0,a.jsx)("p",{children:n}):n,t]})});(0,i.I4)(r)`
  margin-bottom: 24px;
`;let s=({title:e,description:n,icon:t,children:i,...r})=>(0,a.jsxs)(l,{...r,children:[t||null,(0,a.jsx)("h3",{children:e}),n&&"string"==typeof n?(0,a.jsx)("p",{children:n}):n,i]}),o=i.I4.div`
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
`,l=(0,i.I4)(o)`
  align-items: center;
  text-align: center;
  gap: 16px;

  h3 {
    margin-bottom: 24px;
  }
`},83361:(e,n,t)=>{t.d(n,{B:()=>i,C:()=>o,F:()=>c,H:()=>s,R:()=>p,S:()=>u,a:()=>d,b:()=>g,c:()=>l,d:()=>h,e:()=>r});var a=t(20031);let i=a.I4.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  margin-top: auto;
  gap: 16px;
  flex-grow: 100;
`,r=a.I4.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  width: 100%;
`,s=a.I4.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`,o=(0,a.I4)(r)`
  padding: 20px 0;
`,l=(0,a.I4)(r)`
  gap: 16px;
`,c=a.I4.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`,d=a.I4.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;a.I4.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;let u=a.I4.div`
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
`,g=a.I4.div`
  height: 16px;
`,p=a.I4.div`
  height: 12px;
`;a.I4.div`
  position: relative;
`;let h=a.I4.div`
  height: ${e=>e.height??"12"}px;
`;a.I4.div`
  background-color: var(--privy-color-accent);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border-color: white;
  border-width: 2px !important;
`},86575:(e,n,t)=>{t.d(n,{L:()=>r});var a=t(20031);let i=(0,a.i7)`
  from, to {
    background: var(--privy-color-foreground-4);
    color: var(--privy-color-foreground-4);
  }

  50% {
    background: var(--privy-color-foreground-accent);
    color: var(--privy-color-foreground-accent);
  }
`,r=(0,a.AH)`
  ${e=>e.$isLoading?(0,a.AH)`
          width: 35%;
          animation: ${i} 2s linear infinite;
          border-radius: var(--privy-border-radius-sm);
        `:""}
`},90600:(e,n,t)=>{t.d(n,{L:()=>r,V:()=>o,a:()=>s});var a=t(20031),i=t(86575);let r=a.I4.span`
  color: var(--privy-color-foreground-3);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.375rem; /* 157.143% */
`,s=(0,a.I4)(r)`
  color: var(--privy-color-accent);
`,o=a.I4.span`
  color: var(--privy-color-foreground);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.375rem; /* 157.143% */
  word-break: break-all;
  text-align: right;

  ${i.L}
`},95204:(e,n,t)=>{t.d(n,{N:()=>r});var a=t(95155),i=t(20031);let r=({size:e,centerIcon:n})=>(0,a.jsx)(s,{$size:e,children:(0,a.jsxs)(o,{children:[(0,a.jsx)(c,{}),(0,a.jsx)(d,{}),n?(0,a.jsx)(l,{children:n}):null]})}),s=i.I4.div`
  --spinner-size: ${e=>e.$size?e.$size:"96px"};

  display: inline-flex;
  justify-content: center;
  align-items: center;

  @media all and (display-mode: standalone) {
    margin-bottom: 30px;
  }
`,o=i.I4.div`
  position: relative;
  height: var(--spinner-size);
  width: var(--spinner-size);

  opacity: 1;
  animation: fadein 200ms ease;
`,l=i.I4.div`
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
`,c=i.I4.div`
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
`,d=i.I4.div`
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
`},97928:(e,n,t)=>{t.d(n,{a:()=>u,b:()=>h,f:()=>g,s:()=>p,u:()=>m,w:()=>f});var a=t(23567),i=t(66602),r=t(12115),s=t(64209),o=t(3129),l=t(90456),c=t(81029).hp;let d=Symbol("default-solana-rpcs-plugin");function u(e){return new Uint8Array((0,a.BX)().decode(e).messageBytes)}async function g({solanaClient:e,tx:n}){let t=(0,i.Ul)().decode(u(n)),{value:a}=await e.rpc.getFeeForMessage(t).send();return a??0n}async function p({solanaClient:e,tx:n,replaceRecentBlockhash:t}){let{value:a}=await e.rpc.simulateTransaction((0,i.Ul)().decode(n),{commitment:"confirmed",encoding:"base64",sigVerify:!1,replaceRecentBlockhash:t}).send();if("BlockhashNotFound"===a.err&&t)throw Error("Simulation failed: Blockhash not found");return"BlockhashNotFound"===a.err?await p({solanaClient:e,tx:n,replaceRecentBlockhash:!0}):{logs:a.logs??[],error:a.err,hasError:!!a.err,hasFunds:a.logs?.every(e=>!/insufficient funds/gi.test(e)&&!/insufficient lamports/gi.test(e))??!0}}let h=(...e)=>{if(void 0===c)throw new l.b("Buffer is not defined.",void 0,l.c.BUFFER_NOT_DEFINED);return c.from(...e)};async function f({rpcSubscriptions:e,signature:n,timeout:t}){let a=new AbortController,i=await e.signatureNotifications(n,{commitment:"confirmed"}).subscribe({abortSignal:a.signal}),r=await Promise.race([new Promise(e=>{setTimeout(()=>{a.abort(),e(Error("Transaction confirmation timed out"))},t)}),new Promise(async e=>{for await(let n of i){if(a.abort(),n.value.err)return e(Error("Transaction confirmation failed"));e(void 0)}})]);if(r instanceof Error)throw r}function m(){let e=(0,s.u)(),n=(0,o.u)(),t=(0,r.useMemo)(()=>{let t=n(d),a=t?.getDefaultRpcs({appId:e.id});return Object.fromEntries(["solana:mainnet","solana:devnet","solana:testnet"].map(n=>{let t=e.solanaRpcs[n]??a?.[n]??null;return[n,t?function({rpc:e,rpcSubscriptions:n,chain:t,blockExplorerUrl:a}){let r=function({rpc:e,rpcSubscriptions:n}){return async t=>new Promise(async(a,r)=>{try{let r=await e.sendTransaction(h(t).toString("base64"),{preflightCommitment:"confirmed",encoding:"base64"}).send();await f({rpcSubscriptions:n,signature:r,timeout:1e4}),a({signature:new Uint8Array((0,i.nZ)().encode(r))})}catch(e){r(e)}})}({rpc:e,rpcSubscriptions:n});return{rpc:e,rpcSubscriptions:n,chain:t,blockExplorerUrl:a,sendAndConfirmTransaction:r}}({chain:n,rpc:t.rpc,rpcSubscriptions:t.rpcSubscriptions,blockExplorerUrl:t.blockExplorerUrl??`https://explorer.solana.com?cluster=${n.replace("solana:","")}`}):null]}))},[e.solanaRpcs,e.id,n]);return(0,r.useCallback)(e=>{if(!t[e])throw Error(`No RPC configuration found for chain ${e}`);return t[e]},[t])}},98392:(e,n,t)=>{t.d(n,{t:()=>s});var a=t(95155),i=t(17411),r=t(84241);function s({title:e}){let{currentScreen:n,navigateBack:t,navigate:s,data:o,setModalData:l}=(0,i.a)();return(0,a.jsx)(r.M,{title:e,backFn:"ManualTransferScreen"===n?t:n===o?.funding?.methodScreen?o.funding.comingFromSendTransactionScreen?()=>s("SendTransactionScreen"):void 0:o?.funding?.methodScreen?()=>{let e=o.funding;e.usingDefaultFundingMethod&&(e.usingDefaultFundingMethod=!1),l({funding:e,solanaFundingData:o?.solanaFundingData}),s(e.methodScreen)}:void 0})}},98436:(e,n,t)=>{t.d(n,{g:()=>i});var a=t(24271);function i(e){let[n]=Object.entries(a.D[e]).find(([e,n])=>"USDC"===n.symbol)??[];return n}}}]);