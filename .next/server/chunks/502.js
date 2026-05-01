"use strict";exports.id=502,exports.ids=[502],exports.modules={345:(a,b,c)=>{c.d(b,{g:()=>d});function d(a){switch(a){case"solana:mainnet":return"Solana";case"solana:devnet":return"Devnet";case"solana:testnet":return"Testnet"}}},502:(a,b,c)=>{c.r(b),c.d(b,{FundSolWalletWithExternalSolanaWallet:()=>aN,default:()=>aN});var d=c(21124),e=c(36236),f=c(38301),g=c(29054),h=c(7797),i=c(27829),j=c(45470),k=c(76078),l=c(65097),m=c(69456),n=c(93588),o=c(9050),p=c(64317),q=c(87230),r=c(23966),s=c(55860),t=c(96807),u=c(34088),v=c(15010),w=c(26313),x=c(67845),y=c(59626),z=c(18521),A=c(51661);let B=()=>{let{walletProxy:a,client:b}=(0,q.u)();return(0,f.useMemo)(()=>({signWithUserSigner:async({message:c,targetAppId:d})=>{if(!a)throw Error("Wallet proxy not initialized");let e=await b.getAccessToken();if(!e)throw Error("User must be authenticated");let{signature:f}=await a.signWithUserSigner({accessToken:e,message:c,targetAppId:d});return{signature:f}}}),[a,b])};var C=c(83126),D=c(85040),E=c(44110);let F=["solana:mainnet","solana:devnet","solana:testnet"];function G(a,b){if(!Object.prototype.hasOwnProperty.call(a,b))throw TypeError("attempted to use private field on non-instance");return a}var H=0,I="__private_"+H+++"__implementation";function J(a,b){if(!Object.prototype.hasOwnProperty.call(a,b))throw TypeError("attempted to use private field on non-instance");return a}var K=0;function L(a){return"__private_"+K+++"_"+a}var M=L("_address"),N=L("_publicKey"),O=L("_chains"),P=L("_features"),Q=L("_label"),R=L("_icon");class S{get address(){return J(this,M)[M]}get publicKey(){return J(this,N)[N].slice()}get chains(){return J(this,O)[O].slice()}get features(){return J(this,P)[P].slice()}get label(){return J(this,Q)[Q]}get icon(){return J(this,R)[R]}constructor({address:a,publicKey:b,label:c,icon:d}){Object.defineProperty(this,M,{writable:!0,value:void 0}),Object.defineProperty(this,N,{writable:!0,value:void 0}),Object.defineProperty(this,O,{writable:!0,value:void 0}),Object.defineProperty(this,P,{writable:!0,value:void 0}),Object.defineProperty(this,Q,{writable:!0,value:void 0}),Object.defineProperty(this,R,{writable:!0,value:void 0}),J(this,M)[M]=a,J(this,N)[N]=b,J(this,O)[O]=F,J(this,Q)[Q]=c,J(this,R)[R]=d,J(this,P)[P]=["solana:signAndSendTransaction","solana:signTransaction","solana:signMessage"],new.target===S&&Object.freeze(this)}}function T(a,b){if(!Object.prototype.hasOwnProperty.call(a,b))throw TypeError("attempted to use private field on non-instance");return a}var U=0;function V(a){return"__private_"+U+++"_"+a}var W=V("_listeners"),X=V("_version"),Y=V("_name"),Z=V("_icon"),$=V("_injection"),_=V("_isPrivyWallet"),aa=V("_accounts"),ab=V("_on"),ac=V("_emit"),ad=V("_off"),ae=V("_connected"),af=V("_connect"),ag=V("_disconnect"),ah=V("_signMessage"),ai=V("_signAndSendTransaction"),aj=V("_signTransaction");function ak(a,...b){T(this,W)[W][a]?.forEach(a=>a.apply(null,b))}function al(a,b){T(this,W)[W][a]=T(this,W)[W][a]?.filter(a=>b!==a)}function am(){let{isHeadlessSigning:a,walletProxy:b,initializeWalletProxy:c,recoverEmbeddedWallet:d,openModal:e,privy:f,client:g}=(0,q.u)(),{user:h}=(0,x.u)(),{setModalData:i}=(0,r.a)(),{signWithUserSigner:j}=B();return{signMessage:({message:k,address:l,options:m})=>new Promise(async(n,o)=>{let p=(0,r.j)(h,l);if("privy"!==p?.walletClientType)return void o(new q.b("Wallet is not a Privy wallet",void 0,q.c.EMBEDDED_WALLET_NOT_FOUND));let{entropyId:s,entropyIdVerifier:t}=(0,y.b)(h,p),u=(0,r.b)(p),w=(0,C.b)(k).toString("base64");if(w.length<1)return void o(new q.b("Message must be a non-empty string",void 0,q.c.INVALID_MESSAGE));let x=async()=>{let a;if(!h)throw Error("User must be authenticated before signing with a Privy wallet");let e=await g.getAccessToken();if(!e)throw Error("User must be authenticated to use their embedded wallet.");let i=b??await c(15e3);if(!i)throw Error("Failed to initialize embedded wallet proxy.");if(!await d({address:p.address}))throw Error("Unable to connect to wallet");if(u){let b=await (0,v._)(f,j,{chain_type:"solana",method:"signMessage",params:{message:w,encoding:"base64"},wallet_id:p.id});if(!b.data||!("signature"in b.data))throw Error("Failed to sign message");a=b.data.signature}else{let{response:b}=await i.rpc({accessToken:e,entropyId:s,entropyIdVerifier:t,chainType:"solana",hdWalletIndex:p.walletIndex??0,requesterAppId:m?.uiOptions?.requesterAppId,request:{method:"signMessage",params:{message:w}}});a=b.data.signature}return a};if(a({showWalletUIs:m?.uiOptions?.showWalletUIs}))try{let a=await x(),b=new Uint8Array((0,C.b)(a,"base64"));n({signature:b})}catch(a){o(a)}else i({signMessage:{method:"solana_signMessage",data:w,confirmAndSign:x,onSuccess:a=>{n({signature:new Uint8Array((0,C.b)(a,"base64"))})},onFailure:a=>{o(a)},uiOptions:m?.uiOptions??{}},connectWallet:{recoveryMethod:p.recoveryMethod,connectingWalletAddress:p.address,entropyId:s,entropyIdVerifier:t,isUnifiedWallet:u,onCompleteNavigateTo:"SignRequestScreen",onFailure:a=>{o(new q.b("Failed to connect to wallet",a,q.c.UNKNOWN_CONNECT_WALLET_ERROR))}}}),e("EmbeddedWalletConnectingScreen")})}}function an(){let{isHeadlessSigning:a,openModal:b,privy:c}=(0,q.u)(),{setModalData:d}=(0,r.a)(),{signMessage:e}=am(),{signWithUserSigner:f}=B(),{user:g}=(0,x.u)();return{signTransaction:async({transaction:h,options:i,chain:j="solana:mainnet",address:k})=>{let l=(0,r.j)(g,k);if("privy"!==l?.walletClientType)throw new q.b("Wallet is not a Privy wallet",void 0,q.c.EMBEDDED_WALLET_NOT_FOUND);let m=(0,r.b)(l);async function n(a){let b,d;if(m){let b=await (0,v._)(c,f,{chain_type:"solana",method:"signTransaction",params:{transaction:D.O.base64.fromBytes(a),encoding:"base64"},wallet_id:l.id});if(b.data&&"signed_transaction"in b.data)return{signedTransaction:new Uint8Array(D.O.base64.toBytes(b.data.signed_transaction))};throw Error("Failed to sign transaction")}let{signature:g}=await e({message:(0,C.a)(a),address:k,options:{...i,uiOptions:{...i?.uiOptions,showWalletUIs:!1}}});return{signedTransaction:(b=structuredClone((0,t.BX)().decode(a)),(d=(0,u.hl)(k))in b.signatures&&(b.signatures[d]=g),new Uint8Array((0,t.l9)().encode(b)))}}return a({showWalletUIs:i?.uiOptions?.showWalletUIs})?n(h):new Promise(async(a,c)=>{let{entropyId:e,entropyIdVerifier:f}=(0,y.b)(g,l);function k(a){return b=>{c(b instanceof q.b?b:new q.b("Failed to connect to wallet",b,a))}}let o={account:l,transaction:h,chain:j,signOnly:!0,uiOptions:i?.uiOptions||{},onConfirm:n,onSuccess:a,onFailure:k(q.c.TRANSACTION_FAILURE)};d({connectWallet:{recoveryMethod:l.recoveryMethod,connectingWalletAddress:l.address,entropyId:e,entropyIdVerifier:f,isUnifiedWallet:m,onCompleteNavigateTo:"StandardSignAndSendTransactionScreen",onFailure:k(q.c.UNKNOWN_CONNECT_WALLET_ERROR)},standardSignAndSendTransaction:o}),b("EmbeddedWalletConnectingScreen")})}}}let ao=new class extends z.A{setImplementation(a){G(this,I)[I]=a}async signMessage(a){return G(this,I)[I].signMessage(a)}async signAndSendTransaction(a){return G(this,I)[I].signAndSendTransaction(a)}async signTransaction(a){return G(this,I)[I].signTransaction(a)}constructor(a){super(),Object.defineProperty(this,I,{writable:!0,value:void 0}),G(this,I)[I]=a}}({signTransaction:(0,q.l)("signTransaction was not injected"),signAndSendTransaction:(0,q.l)("signAndSendTransaction was not injected"),signMessage:(0,q.l)("signMessage was not injected")}),ap=new class{get version(){return T(this,X)[X]}get name(){return T(this,Y)[Y]}get icon(){return T(this,Z)[Z]}get chains(){return F.slice()}get features(){return{"standard:connect":{version:"1.0.0",connect:T(this,af)[af]},"standard:disconnect":{version:"1.0.0",disconnect:T(this,ag)[ag]},"standard:events":{version:"1.0.0",on:T(this,ab)[ab]},"solana:signAndSendTransaction":{version:"1.0.0",supportedTransactionVersions:["legacy",0],signAndSendTransaction:T(this,ai)[ai]},"solana:signTransaction":{version:"1.0.0",supportedTransactionVersions:["legacy",0],signTransaction:T(this,aj)[aj]},"solana:signMessage":{version:"1.0.0",signMessage:T(this,ah)[ah]},"privy:":{privy:{signMessage:T(this,$)[$].signMessage,signTransaction:T(this,$)[$].signTransaction,signAndSendTransaction:T(this,$)[$].signAndSendTransaction}}}}get accounts(){return T(this,aa)[aa].slice()}get isPrivyWallet(){return T(this,_)[_]}constructor({name:a,icon:b,version:c,injection:d,wallets:e}){Object.defineProperty(this,ac,{value:ak}),Object.defineProperty(this,ad,{value:al}),Object.defineProperty(this,W,{writable:!0,value:void 0}),Object.defineProperty(this,X,{writable:!0,value:void 0}),Object.defineProperty(this,Y,{writable:!0,value:void 0}),Object.defineProperty(this,Z,{writable:!0,value:void 0}),Object.defineProperty(this,$,{writable:!0,value:void 0}),Object.defineProperty(this,_,{writable:!0,value:void 0}),Object.defineProperty(this,aa,{writable:!0,value:void 0}),Object.defineProperty(this,ab,{writable:!0,value:void 0}),Object.defineProperty(this,ae,{writable:!0,value:void 0}),Object.defineProperty(this,af,{writable:!0,value:void 0}),Object.defineProperty(this,ag,{writable:!0,value:void 0}),Object.defineProperty(this,ah,{writable:!0,value:void 0}),Object.defineProperty(this,ai,{writable:!0,value:void 0}),Object.defineProperty(this,aj,{writable:!0,value:void 0}),T(this,W)[W]={},T(this,ab)[ab]=(a,b)=>(T(this,W)[W][a]?.push(b)||(T(this,W)[W][a]=[b]),()=>T(this,ad)[ad](a,b)),T(this,ae)[ae]=a=>{null!=a&&(T(this,aa)[aa]=a.map(({address:a})=>new S({address:a,publicKey:A.tw.decode(a)}))),T(this,ac)[ac]("change",{accounts:this.accounts})},T(this,af)[af]=async()=>(T(this,ac)[ac]("change",{accounts:this.accounts}),{accounts:this.accounts}),T(this,ag)[ag]=async()=>{T(this,ac)[ac]("change",{accounts:this.accounts})},T(this,ah)[ah]=async(...a)=>{let b=[];for(let{account:c,...d}of a){let{signature:a}=await T(this,$)[$].signMessage({...d,address:c.address});b.push({signedMessage:d.message,signature:a})}return b},T(this,ai)[ai]=async(...a)=>{let b=[];for(let c of a){let{signature:a}=await T(this,$)[$].signAndSendTransaction({...c,transaction:c.transaction,address:c.account.address,chain:c.chain||"solana:mainnet",options:c.options});b.push({signature:a})}return b},T(this,aj)[aj]=async(...a)=>{let b=[];for(let{transaction:c,account:d,options:e,chain:f}of a){let{signedTransaction:a}=await T(this,$)[$].signTransaction({transaction:c,address:d.address,chain:f||"solana:mainnet",options:e});b.push({signedTransaction:a})}return b},T(this,Y)[Y]=a,T(this,Z)[Z]=b,T(this,X)[X]=c,T(this,$)[$]=d,T(this,aa)[aa]=[],T(this,_)[_]=!0,d.on("accountChanged",T(this,ae)[ae],this),T(this,ae)[ae](e)}}({name:"Privy",version:"1.0.0",icon:"data:image/png;base64,AAABAAEAFBQAAAAAIABlAQAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAUAAAAFAgGAAAAjYkdDQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAQVJREFUeJxiYMANZIC4E4ivAPFPIP4FxDeAuB+IlfDowwBMQFwJxF+B+D8O/AOI66Bq8QJGIF6ExyB0vAqImfEZmEeCYTDcgMswPiB+T4aB34FYApuBsWQYBsP52AycToGBK7EZuJECAw9jM3AVBQbuwWZgIwUGTsZmoDkFBnpiMxAEjpJh2FV8iVsbiD+TYBgoDVrgMgwGnID4HRGGgTKBGyHDYEAaiBdCSxh0g/5AU4Q8sYYhAzEgjoGmABBOgFo2eACowFABYn0oVgViAVINkQTiZUD8DIj/ATF6GILEXgLxCiCWIsZAbiAuBeKtQHwHiEHJ6C8UfwHie0C8E4jLoWpRAAAAAP//rcbhsQAAAAZJREFUAwBYFs3VKJ0cuQAAAABJRU5ErkJggg==",wallets:[],injection:ao});var aq=c(88402),ar=c(33488),as=c(21127),at=c(10781),au=c(33303),av=c(24469),aw=c(36652),ax=(a=>(a[a.Uninitialized=0]="Uninitialized",a[a.Initialized=1]="Initialized",a))(ax||{}),ay=(a=>(a[a.Legacy=0]="Legacy",a[a.Current=1]="Current",a))(ay||{}),az=(a=>(a[a.Nonce=0]="Nonce",a))(az||{}),aA=(a=>(a[a.CreateAccount=0]="CreateAccount",a[a.Assign=1]="Assign",a[a.TransferSol=2]="TransferSol",a[a.CreateAccountWithSeed=3]="CreateAccountWithSeed",a[a.AdvanceNonceAccount=4]="AdvanceNonceAccount",a[a.WithdrawNonceAccount=5]="WithdrawNonceAccount",a[a.InitializeNonceAccount=6]="InitializeNonceAccount",a[a.AuthorizeNonceAccount=7]="AuthorizeNonceAccount",a[a.Allocate=8]="Allocate",a[a.AllocateWithSeed=9]="AllocateWithSeed",a[a.AssignWithSeed=10]="AssignWithSeed",a[a.TransferSolWithSeed=11]="TransferSolWithSeed",a[a.UpgradeNonceAccount=12]="UpgradeNonceAccount",a))(aA||{});function aB(a){return!!a&&"object"==typeof a&&"address"in a&&(0,at.Pl)(a)}var aC=c(90715),aD=c(60561),aE=c(10565),aF=c(39499),aG=c(19458),aH=c(345);function aI({rows:a}){return(0,d.jsx)(o.a,{children:a.filter(a=>!!a).map((a,b)=>null!=a.value||a.isLoading?(0,d.jsxs)(o.R,{children:[(0,d.jsx)(n.L,{children:a.label}),(0,d.jsx)(n.V,{$isLoading:a.isLoading,children:a.value})]},b):null)})}function aJ(a){return BigInt(Math.floor(1e9*parseFloat(a)))}function aK(a){return+aL.format(parseFloat(a.toString())/1e9)}c(32571),c(22967);let aL=Intl.NumberFormat(void 0,{maximumFractionDigits:8});async function aM({tx:a,solanaClient:b,amount:c,asset:d,tokenPrice:e}){if(!a)return null;if("SOL"===d&&e){let d=aJ(c),f=(0,aF.g)(d,e),g=await (0,C.f)({solanaClient:b,tx:a});return{amountInUsd:f,feeInUsd:e?(0,aF.g)(g,e):void 0,totalInUsd:(0,aF.g)(d+g,e)}}if("USDC"===d&&e){let d,f="$"+c,g=await (0,C.f)({solanaClient:b,tx:a}),h=(d=parseFloat(g.toString())/aF.L*e)<.01?0:d;return{amountInUsd:f,feeInUsd:(0,aF.g)(g,e),totalInUsd:"$"+(parseFloat(c)+h).toFixed(2)}}if("SOL"===d){let d=aJ(c),e=await (0,C.f)({solanaClient:b,tx:a});return{amountInSol:c+" SOL",feeInSol:aK(e)+" SOL",totalInSol:aK(d+e)+" SOL"}}return{amountInUsdc:c+" USDC",feeInSol:aK(await (0,C.f)({solanaClient:b,tx:a}))+" SOL"}}let aN={component:function(){let a=(0,p.u)(),{closePrivyModal:b,createAnalyticsEvent:c}=(0,q.u)(),{data:n,setModalData:o,navigate:u}=(0,r.a)(),{wallets:z}=function(){let{ready:a,wallets:b}=function(){let{client:a}=(0,q.u)(),{ready:b,wallet:c}=function(){let{ready:a}=(0,y.u)(),{user:b}=(0,x.u)(),{signMessage:c}=am(),{signTransaction:d}=an(),{signAndSendTransaction:e}=function(){let a=(0,p.u)(),{isHeadlessSigning:b,openModal:c,privy:d}=(0,q.u)(),{setModalData:e}=(0,r.a)(),{signTransaction:f}=an(),g=(0,C.u)(),{user:h}=(0,x.u)(),{signWithUserSigner:i}=B();return{signAndSendTransaction:async({transaction:j,address:k,chain:l="solana:mainnet",options:m})=>{let n=(0,r.j)(h,k);if("privy"!==n?.walletClientType)throw new q.b("Wallet is not a Privy wallet",void 0,q.c.EMBEDDED_WALLET_NOT_FOUND);let o=(0,r.b)(n);async function p(a){if(m?.sponsor)return await (async a=>{if(!o)throw new q.b("Sponsoring transactions is only supported for wallets on the TEE stack",q.c.INVALID_DATA);let b=await (0,v._)(d,i,{chain_type:"solana",method:"signAndSendTransaction",sponsor:!0,params:{transaction:(0,C.b)(a).toString("base64"),encoding:"base64"},caip2:`solana:${(await g(l).rpc.getGenesisHash().send()).substring(0,32)}`,wallet_id:n.id});if(b.data&&"hash"in b.data)return{signature:A.tw.decode(b.data.hash)};throw Error("Failed to sign and send transaction")})(a);let{signedTransaction:b}=await f({transaction:a,address:k,chain:l,options:{...m,uiOptions:{...m?.uiOptions,showWalletUIs:!1}}}),{signature:c}=await g(l).sendAndConfirmTransaction(b);return{signature:c}}return b({showWalletUIs:m?.uiOptions?.showWalletUIs})?p(j):new Promise(async(b,d)=>{let f,g,{entropyId:i,entropyIdVerifier:r}=(0,y.b)(h,n);function s(a){return b=>{d(b instanceof q.b?b:new q.b("Failed to connect to wallet",b,a))}}let t={account:n,transaction:j,chain:l,signOnly:!1,uiOptions:m?.uiOptions||{},onConfirm:p,onSuccess:b,onFailure:s(q.c.TRANSACTION_FAILURE),isSponsored:!!m?.sponsor},u={recoveryMethod:n.recoveryMethod,connectingWalletAddress:n.address,entropyId:i,entropyIdVerifier:r,isUnifiedWallet:o,onCompleteNavigateTo:"StandardSignAndSendTransactionScreen",onFailure:s(q.c.UNKNOWN_CONNECT_WALLET_ERROR)};a.fundingConfig&&(f=(0,E.y)({address:k,appConfig:a,methodScreen:"FundingMethodSelectionScreen",fundWalletConfig:{...m,asset:"native-currency",chain:l},externalSolanaFundingScreen:"FundSolWalletWithExternalSolanaWallet"}),g={amount:a.fundingConfig.defaultRecommendedAmount,asset:"SOL",chain:l,destinationAddress:k,afterSuccessScreen:"StandardSignAndSendTransactionScreen",sourceWalletData:void 0}),e({connectWallet:u,standardSignAndSendTransaction:t,funding:f,solanaFundingData:g}),c("EmbeddedWalletConnectingScreen")})}}}(),g=(0,f.useMemo)(()=>{let a=[...(0,r.m)(b).sort((a,b)=>(a.walletIndex??0)-(b.walletIndex??0))],c=(0,r.h)(b);return c.length?[...a,...c]:a},[b]),h=(0,f.useMemo)(()=>({signMessage:async({message:a,address:b,options:d})=>await c({message:a,address:b,options:d}),signTransaction:async({transaction:a,address:b,chain:c,options:e})=>await d({transaction:a,address:b,chain:c,options:e}),async signAndSendTransaction({transaction:a,address:b,chain:c,options:d}){let{signature:f}=await e({transaction:a,address:b,chain:c,options:d});return{signature:f}}}),[c,d,e]);return(0,f.useEffect)(()=>{ao?.setImplementation(h)},[h]),(0,f.useEffect)(()=>{var b;!a||(b=ap.accounts).length===g.length&&b.every((a,b)=>a.address===g[b]?.address)||ao?.emit("accountChanged",g)},[a,g]),{ready:a,wallet:ap}}(),[d,e]=(0,f.useState)([]),[g,h]=(0,f.useState)([]);return(0,f.useEffect)(()=>{let a=[c,...d.filter(a=>"solana"===a.chainType&&!!a.wallet.features).map(a=>a.wallet)];h(a);let b=d.flatMap(b=>{let c=()=>h([...a]);return b.on("walletsUpdated",c),{connector:b,off:c}}),e=a.map(b=>b.features["standard:events"]?.on("change",()=>{h([...a])}));return()=>{e.forEach(a=>a?.()),b.forEach(({connector:a,off:b})=>a.off("walletsUpdated",b))}},[d]),(0,f.useEffect)(()=>{e(a.connectors?.walletConnectors.filter(a=>"solana"===a.chainType)??[]);let b=()=>{e(a.connectors?.walletConnectors.filter(a=>"solana"===a.chainType)??[])};return a.connectors?.on("connectorInitialized",b),()=>{a.connectors?.off("connectorInitialized",b)}},[b,a.connectors]),{ready:b,wallets:g}}();return{ready:a,wallets:(0,f.useMemo)(()=>b.flatMap(a=>a.accounts.map(b=>new w.W({wallet:a,account:b}))),[b])}}(),[D,F]=(0,f.useState)("preparing"),[G,H]=(0,f.useState)(),[I,J]=(0,f.useState)(),[K,L]=(0,f.useState)();if(!n?.solanaFundingData)throw Error("Funding config is missing");if(!n.solanaFundingData.sourceWalletData)throw Error("Funding config is missing source wallet data");let{amount:M,asset:N,chain:O,sourceWalletData:P,destinationAddress:Q,afterSuccessScreen:R}=n.solanaFundingData,S=z.find(a=>a.address===P.address&&(0,E.I)(P.walletClientType)===(0,E.I)(a.standardWallet.name)),T=(0,C.u)()(O),{tokenPrice:U,isTokenPriceLoading:V}=(0,aq.u)("solana");return(0,f.useEffect)(()=>{if("preparing"!==D||V||!S)return;let a="SOL"===N?aJ(M):BigInt(Math.floor(1e6*parseFloat(M)));J({amount:("SOL"===N&&U?(0,aF.g)(a,U):M)??M}),("SOL"===N?async function({solanaClient:a,source:b,destination:c,amountInLamports:d}){let{value:e}=await a.rpc.getLatestBlockhash().send(),f={address:b},g=(0,aC.F)((0,aD.mN)({version:0}),a=>(0,at.pt)(f,a),a=>(0,aD.S$)(e,a),a=>(0,aD.az)(function(a,b){let c={source:{value:a.source??null,isWritable:!0},destination:{value:a.destination??null,isWritable:!0}},d={...a},e=a=>{if(!a.value)return;let b=a.isWritable?as.Uv.WRITABLE:as.Uv.READONLY;return Object.freeze({address:function(a){if(!a)throw Error("Expected a Address.");return"object"==typeof a&&"address"in a?a.address:Array.isArray(a)?a[0]:a}(a.value),role:aB(a.value)?(0,as.MR)(b):b,...aB(a.value)?{signer:a.value}:{}})};return Object.freeze({accounts:[e(c.source),e(c.destination)],data:(0,au.FU)((0,av.a5)([["discriminator",(0,aw.PL)()],["amount",(0,aw.eC)()]]),a=>({...a,discriminator:2})).encode(d),programAddress:(void 0)??"11111111111111111111111111111111"})}({amount:d,source:f,destination:c}),a),a=>(0,t.i5)(a));return new Uint8Array((0,t.l9)().encode(g))}({solanaClient:T,source:S.address,destination:Q,amountInLamports:a}):async function({solanaClient:a,source:b,destination:c,amountInBaseUnits:d}){let e=(0,aG.g)(a.chain),{value:f}=await a.rpc.getLatestBlockhash().send(),g={address:b},[h]=await (0,aE._mM)({mint:e,owner:b,tokenProgram:aF.T}),[i]=await (0,aE._mM)({mint:e,owner:c,tokenProgram:aF.T}),[j,k]=await Promise.all([a.rpc.getAccountInfo(h,{commitment:"confirmed",encoding:"jsonParsed"}).send().catch(()=>null),a.rpc.getAccountInfo(i,{commitment:"confirmed",encoding:"jsonParsed"}).send().catch(()=>null)]);if(!j?.value)throw Error(`Source token account does not exist for address: ${b}`);let l=(0,aE.PUP)({payer:g,ata:i,owner:c,mint:e}),m=(0,aC.F)((0,aD.mN)({version:0}),a=>(0,at.pt)(g,a),a=>(0,aD.S$)(f,a),a=>k?.value?a:(0,aD.az)(l,a),a=>(0,aD.az)((0,aE.Q7D)({source:h,destination:i,authority:g,amount:d}),a),a=>(0,t.i5)(a));return new Uint8Array((0,t.l9)().encode(m))}({solanaClient:T,source:S.address,destination:Q,amountInBaseUnits:a})).then(H).catch(a=>{F("error"),L(a)})},[D,M,N,O,S,Q,V,U]),(0,f.useEffect)(()=>{"preparing"===D&&G&&aM({tx:G,solanaClient:T,amount:M,asset:N,tokenPrice:U}).then(a=>{F("loaded"),J({amount:a?.amountInUsd??a?.amountInUsdc??a?.amountInSol??M,fee:a?.feeInUsd??a?.feeInSol,total:a?.totalInUsd??a?.totalInSol})}).catch(a=>{F("error"),L(a)})},[G,M,N,D,U]),(0,f.useEffect)(()=>{"error"===D&&K&&(o({errorModalData:{error:K,previousScreen:"FundSolWalletWithExternalSolanaWallet"},solanaFundingData:n.solanaFundingData}),u("ErrorScreen",!1))},[D,u]),(0,f.useEffect)(()=>{if("success"!==D)return;let a=setTimeout(R?()=>u(R):b,p.t);return()=>clearTimeout(a)},[D]),(0,d.jsxs)(d.Fragment,"success"===D?{children:[(0,d.jsx)(k.t,{}),(0,d.jsx)(i.b,{}),(0,d.jsxs)(i.c,{children:[(0,d.jsx)(e.A,{color:"var(--privy-color-success)",width:"64px",height:"64px"}),(0,d.jsx)(j.C,{title:"Success!",description:`You’ve successfully added ${M} ${N} to your ${a.name} wallet. It may take a minute before the funds are available to use.`})]}),(0,d.jsx)(i.R,{}),(0,d.jsx)(h.B,{})]}:"preparing"===D||"loaded"===D||"sending"===D?{children:[(0,d.jsx)(k.t,{}),(0,d.jsx)(i.e,{style:{marginTop:"16px"},children:(0,d.jsx)(l.I,{icon:S?.standardWallet.icon,name:S?.standardWallet.name})}),(0,d.jsx)(j.C,{style:{marginTop:"8px",marginBottom:"12px"},title:"sending"===D&&S?`Confirming with ${S.standardWallet.name}`:"Confirm transaction"}),(0,d.jsx)(aI,{rows:[{label:"Source",value:(0,g.vz)(P.address)},{label:"Destination",value:(0,g.vz)(Q)},{label:"Network",value:(0,aH.g)(O)},{label:"Amount",value:I?.amount,isLoading:"preparing"===D},{label:"Estimated fee",value:I?.fee,isLoading:"preparing"===D},{label:"Total",value:I?.total,isLoading:"preparing"===D}]}),(0,d.jsx)(h.P,{style:{marginTop:"1rem"},loading:"preparing"===D||"sending"===D,onClick:function(){"loaded"===D&&G&&S&&(F("sending"),(async function({transaction:a,chain:b,sourceWallet:c,solanaClient:d}){var e;let{hasFunds:f}=await (0,C.s)({solanaClient:d,tx:a});if(!f)throw new q.b(`Wallet ${(0,g.vz)(c.address)} does not have enough funds.`,void 0,q.c.INSUFFICIENT_BALANCE);let h=(e=(await c.signAndSendTransaction({transaction:a,chain:b}).catch(a=>{throw new q.b("Transaction was rejected by the user",a,q.c.TRANSACTION_FAILURE)})).signature,(0,s.BC)().decode(e));return await (0,C.w)({rpcSubscriptions:d.rpcSubscriptions,signature:h,timeout:2e4}),h})({solanaClient:T,transaction:G,chain:O,sourceWallet:S}).then(a=>{F("success"),c({eventName:ar.O,payload:{provider:"external",status:"success",txHash:a,address:S.address,value:M,chainType:"solana",clusterName:O,token:N,destinationAddress:Q,destinationValue:M,destinationChainType:"solana",destinationClusterName:O,destinationToken:N}})}).catch(a=>{F("error"),L(a)}))},children:"Confirm"}),(0,d.jsx)(h.B,{})]}:{children:[(0,d.jsx)(k.t,{}),(0,d.jsx)(m.N,{}),(0,d.jsx)("div",{style:{marginTop:"1rem"}}),(0,d.jsx)(h.B,{})]})}}},9050:(a,b,c)=>{c.d(b,{R:()=>f,a:()=>e});var d=c(78858);let e=d.I4.span`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
`,f=d.I4.span`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 0.5rem;
`},15925:(a,b,c)=>{c.d(b,{A:()=>e});var d=c(38301);let e=d.forwardRef(function({title:a,titleId:b,...c},e){return d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:e,"aria-labelledby":b},c),a?d.createElement("title",{id:b},a):null,d.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"}))})},19458:(a,b,c)=>{c.d(b,{g:()=>e});var d=c(39499);function e(a){let[b]=Object.entries(d.D[a]).find(([a,b])=>"USDC"===b.symbol)??[];return b}},27829:(a,b,c)=>{c.d(b,{B:()=>e,C:()=>h,F:()=>j,H:()=>g,R:()=>n,S:()=>l,a:()=>k,b:()=>m,c:()=>i,d:()=>o,e:()=>f});var d=c(78858);let e=d.I4.div`
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
`},29054:(a,b,c)=>{c.d(b,{NJ:()=>h,vj:()=>g,vz:()=>f});var d=c(78327),e=c(29808);function f(a){return a?`${a.slice(0,5)}…${a.slice(-4)}`:""}function g({wei:a,precision:b=3}){return parseFloat((0,d.c)(a)).toFixed(b).replace(/0+$/,"").replace(/\.$/,"")}function h({amount:a,decimals:b}){return(0,e.J)(BigInt(a),b)}},33488:(a,b,c)=>{c.d(b,{O:()=>d});let d="sdk_fiat_on_ramp_completed_with_status"},36236:(a,b,c)=>{c.d(b,{A:()=>e});var d=c(38301);let e=d.forwardRef(function({title:a,titleId:b,...c},e){return d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:e,"aria-labelledby":b},c),a?d.createElement("title",{id:b},a):null,d.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"}))})},39499:(a,b,c)=>{c.d(b,{A:()=>h,D:()=>k,J:()=>j,L:()=>d,R:()=>i,S:()=>e,T:()=>f,a:()=>g,g:()=>l});let d=1e9,e="11111111111111111111111111111111",f="TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",g="TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb",h="ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",i=["CPMMoo8L3F4NbTegBCKVNunggL7H1ZpdTHKxQB5qKP1C","CPMDWBwJDtYax9qW7AyRuVC19Cc4L4Vcy4n2BHAbHkCW"],j=["JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4"],k={"solana:mainnet":{EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v:{symbol:"USDC",decimals:6,address:"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"},Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB:{symbol:"USDT",decimals:6,address:"Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"},So11111111111111111111111111111111111111112:{symbol:"SOL",decimals:9,address:"So11111111111111111111111111111111111111112"}},"solana:devnet":{"4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU":{symbol:"USDC",decimals:6,address:"4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"},EJwZgeZrdC8TXTQbQBoL6bfuAnFUUy1PVCMB4DYPzVaS:{symbol:"USDT",decimals:6,address:"EJwZgeZrdC8TXTQbQBoL6bfuAnFUUy1PVCMB4DYPzVaS"},So11111111111111111111111111111111111111112:{symbol:"SOL",decimals:9,address:"So11111111111111111111111111111111111111112"}},"solana:testnet":{}};function l(a,b){let c=parseFloat(a.toString())/d,e=m.format(b*c);return"$0.00"===e?"<$0.01":e}let m=new Intl.NumberFormat(void 0,{style:"currency",currency:"USD",maximumFractionDigits:2})},45470:(a,b,c)=>{c.d(b,{C:()=>g,S:()=>f});var d=c(21124),e=c(78858);let f=({title:a,description:b,children:c,...e})=>(0,d.jsx)(h,{...e,children:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("h3",{children:a}),"string"==typeof b?(0,d.jsx)("p",{children:b}):b,c]})});(0,e.I4)(f)`
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
`},65097:(a,b,c)=>{c.d(b,{I:()=>f});var d=c(21124),e=c(15925);let f=({icon:a,name:b})=>"string"==typeof a?(0,d.jsx)("img",{alt:`${b||"wallet"} logo`,src:a,style:{height:24,width:24,borderRadius:4}}):void 0===a?(0,d.jsx)(e.A,{style:{height:24,width:24}}):a?(0,d.jsx)(a,{style:{height:24,width:24}}):null},69456:(a,b,c)=>{c.d(b,{N:()=>f});var d=c(21124),e=c(78858);let f=({size:a,centerIcon:b})=>(0,d.jsx)(g,{$size:a,children:(0,d.jsxs)(h,{children:[(0,d.jsx)(j,{}),(0,d.jsx)(k,{}),b?(0,d.jsx)(i,{children:b}):null]})}),g=e.I4.div`
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
`},76078:(a,b,c)=>{c.d(b,{t:()=>g});var d=c(21124),e=c(23966),f=c(7797);function g({title:a}){let{currentScreen:b,navigateBack:c,navigate:g,data:h,setModalData:i}=(0,e.a)();return(0,d.jsx)(f.M,{title:a,backFn:"ManualTransferScreen"===b?c:b===h?.funding?.methodScreen?h.funding.comingFromSendTransactionScreen?()=>g("SendTransactionScreen"):void 0:h?.funding?.methodScreen?()=>{let a=h.funding;a.usingDefaultFundingMethod&&(a.usingDefaultFundingMethod=!1),i({funding:a,solanaFundingData:h?.solanaFundingData}),g(a.methodScreen)}:void 0})}},82389:(a,b,c)=>{c.d(b,{u:()=>e});var d=c(80866);function e(a){let b=a.filter(a=>!d.o.has(a.id));return d.m.concat(b)}},83126:(a,b,c)=>{c.d(b,{a:()=>k,b:()=>n,f:()=>l,s:()=>m,u:()=>p,w:()=>o});var d=c(96807),e=c(55860),f=c(38301),g=c(64317),h=c(98403),i=c(87230);let j=Symbol("default-solana-rpcs-plugin");function k(a){return new Uint8Array((0,d.BX)().decode(a).messageBytes)}async function l({solanaClient:a,tx:b}){let c=(0,e.Ul)().decode(k(b)),{value:d}=await a.rpc.getFeeForMessage(c).send();return d??0n}async function m({solanaClient:a,tx:b,replaceRecentBlockhash:c}){let{value:d}=await a.rpc.simulateTransaction((0,e.Ul)().decode(b),{commitment:"confirmed",encoding:"base64",sigVerify:!1,replaceRecentBlockhash:c}).send();if("BlockhashNotFound"===d.err&&c)throw Error("Simulation failed: Blockhash not found");return"BlockhashNotFound"===d.err?await m({solanaClient:a,tx:b,replaceRecentBlockhash:!0}):{logs:d.logs??[],error:d.err,hasError:!!d.err,hasFunds:d.logs?.every(a=>!/insufficient funds/gi.test(a)&&!/insufficient lamports/gi.test(a))??!0}}let n=(...a)=>{if("undefined"==typeof Buffer)throw new i.b("Buffer is not defined.",void 0,i.c.BUFFER_NOT_DEFINED);return Buffer.from(...a)};async function o({rpcSubscriptions:a,signature:b,timeout:c}){let d=new AbortController,e=await a.signatureNotifications(b,{commitment:"confirmed"}).subscribe({abortSignal:d.signal}),f=await Promise.race([new Promise(a=>{setTimeout(()=>{d.abort(),a(Error("Transaction confirmation timed out"))},c)}),new Promise(async a=>{for await(let b of e){if(d.abort(),b.value.err)return a(Error("Transaction confirmation failed"));a(void 0)}})]);if(f instanceof Error)throw f}function p(){let a=(0,g.u)(),b=(0,h.u)(),c=(0,f.useMemo)(()=>{let c=b(j),d=c?.getDefaultRpcs({appId:a.id});return Object.fromEntries(["solana:mainnet","solana:devnet","solana:testnet"].map(b=>{let c=a.solanaRpcs[b]??d?.[b]??null;return[b,c?function({rpc:a,rpcSubscriptions:b,chain:c,blockExplorerUrl:d}){let f=function({rpc:a,rpcSubscriptions:b}){return async c=>new Promise(async(d,f)=>{try{let f=await a.sendTransaction(n(c).toString("base64"),{preflightCommitment:"confirmed",encoding:"base64"}).send();await o({rpcSubscriptions:b,signature:f,timeout:1e4}),d({signature:new Uint8Array((0,e.nZ)().encode(f))})}catch(a){f(a)}})}({rpc:a,rpcSubscriptions:b});return{rpc:a,rpcSubscriptions:b,chain:c,blockExplorerUrl:d,sendAndConfirmTransaction:f}}({chain:b,rpc:c.rpc,rpcSubscriptions:c.rpcSubscriptions,blockExplorerUrl:c.blockExplorerUrl??`https://explorer.solana.com?cluster=${b.replace("solana:","")}`}):null]}))},[a.solanaRpcs,a.id,b]);return(0,f.useCallback)(a=>{if(!c[a])throw Error(`No RPC configuration found for chain ${a}`);return c[a]},[c])}},86833:(a,b,c)=>{c.d(b,{u:()=>f});var d=c(38301),e=c(87230);let f=({enabled:a=!0}={})=>{let{showFiatPrices:b,getUsdPriceForSol:c}=(0,e.u)(),[f,g]=(0,d.useState)(!0),[h,i]=(0,d.useState)(void 0),[j,k]=(0,d.useState)(void 0);return(0,d.useEffect)(()=>{(async()=>{if(b&&a)try{g(!0);let a=await c();a?k(a):i(Error("Unable to fetch SOL price"))}catch(a){i(a)}finally{g(!1)}else g(!1)})()},[]),{solPrice:j,isSolPriceLoading:f,solPriceError:h}}},88402:(a,b,c)=>{c.d(b,{u:()=>i});var d=c(38301),e=c(82389),f=c(64317),g=c(87230),h=c(86833);function i(a){let{tokenPrice:b,isTokenPriceLoading:c,tokenPriceError:i}=(a=>{let{showFiatPrices:b,getUsdTokenPrice:c,chains:h}=(0,g.u)(),[i,j]=(0,d.useState)(!0),[k,l]=(0,d.useState)(void 0),[m,n]=(0,d.useState)(void 0);return(0,d.useEffect)(()=>{a||=f.s;let d=(0,e.u)(h).find(b=>b.id===Number(a));(async()=>{if(b){if(!d)return j(!1),l(Error(`Unable to fetch token price on chain id ${a}`));try{j(!0);let a=await c(d);a?n(a):l(Error(`Unable to fetch token price on chain id ${d.id}`))}catch(a){l(a)}finally{j(!1)}}else j(!1)})()},[a]),{tokenPrice:m,isTokenPriceLoading:i,tokenPriceError:k}})("solana"===a?-1:a),{solPrice:j,isSolPriceLoading:k,solPriceError:l}=(0,h.u)({enabled:"solana"===a});return"solana"===a?{tokenPrice:j,isTokenPriceLoading:k,tokenPriceError:l}:{tokenPrice:b,isTokenPriceLoading:c,tokenPriceError:i}}},91887:(a,b,c)=>{c.d(b,{L:()=>f});var d=c(78858);let e=(0,d.i7)`
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
`},93588:(a,b,c)=>{c.d(b,{L:()=>f,V:()=>h,a:()=>g});var d=c(78858),e=c(91887);let f=d.I4.span`
  color: var(--privy-color-foreground-3);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.375rem; /* 157.143% */
`,g=(0,d.I4)(f)`
  color: var(--privy-color-accent);
`,h=d.I4.span`
  color: var(--privy-color-foreground);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.375rem; /* 157.143% */
  word-break: break-all;
  text-align: right;

  ${e.L}
`}};