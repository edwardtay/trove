"use strict";exports.id=4944,exports.ids=[4944],exports.modules={4944:(a,b,c)=>{c.r(b),c.d(b,{LinkConflictScreen:()=>E,LinkConflictScreenView:()=>F,default:()=>E});var d=c(21124),e=c(92073),f=c(15925),g=c(38301),h=c(7797),i=c(78858),j=c(30831),k=c(61330),l=c(87230),m=c(23966),n=c(14325),o=c(64317),p=c(29725);let q=g.forwardRef(function({title:a,titleId:b,...c},d){return g.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:d,"aria-labelledby":b},c),a?g.createElement("title",{id:b},a):null,g.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.5 8.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v8.25A2.25 2.25 0 0 0 6 16.5h2.25m8.25-8.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-7.5A2.25 2.25 0 0 1 8.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 0 0-2.25 2.25v6"}))});c(18521),c(32571),c(22967);let r=i.I4.span`
  && {
    width: 82px;
    height: 82px;
    border-width: 4px;
    border-style: solid;
    border-color: ${a=>a.color??"var(--privy-color-accent)"};
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1.2s linear infinite;
    transition: border-color 800ms;
    border-bottom-color: ${a=>a.color??"var(--privy-color-accent)"};
  }
`;function s(a){return(0,d.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",...a,children:[(0,d.jsx)("circle",{cx:"12",cy:"12",r:"10"}),(0,d.jsx)("line",{x1:"12",x2:"12",y1:"8",y2:"12"}),(0,d.jsx)("line",{x1:"12",x2:"12.01",y1:"16",y2:"16"})]})}let t=({onTransfer:a,isTransferring:b,transferSuccess:c})=>(0,d.jsx)(h.P,{...c?{success:!0,children:"Success!"}:{warn:!0,loading:b,onClick:a,children:"Transfer and delete account"}}),u=i.I4.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding-bottom: 16px;
`,v=i.I4.div`
  display: flex;
  flex-direction: column;
  && p {
    font-size: 14px;
  }
  width: 100%;
  gap: 16px;
`,w=i.I4.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  width: 100%;
  border: 1px solid var(--privy-color-foreground-4) !important;
  border-radius: var(--privy-border-radius-md);
  padding: 8px 10px;
  font-size: 14px;
  font-weight: 500;
  gap: 8px;
`,x=(0,i.I4)(p.A)`
  position: relative;
  width: ${({$iconSize:a})=>`${a}px`};
  height: ${({$iconSize:a})=>`${a}px`};
  color: var(--privy-color-foreground-3);
  margin-left: auto;
`,y=(0,i.I4)(q)`
  position: relative;
  width: 15px;
  height: 15px;
  color: var(--privy-color-foreground-3);
  margin-left: auto;
`,z=i.I4.ol`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  width: 100%;
  text-align: left;
`,A=i.I4.li`
  font-size: 14px;
  list-style-type: auto;
  list-style-position: outside;
  margin-left: 1rem;
  margin-bottom: 0.5rem; /* Adjust the margin as needed */

  &:last-child {
    margin-bottom: 0; /* Remove margin from the last item */
  }
`,B=i.I4.div`
  position: relative;
  width: 60px;
  height: 60px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`,C=()=>(0,d.jsx)(B,{children:(0,d.jsx)(x,{$iconSize:60})}),D=({address:a,onClose:b,onRetry:c,onTransfer:e,isTransferring:g,transferSuccess:i})=>{let{defaultChain:j}=(0,o.u)(),l=j.blockExplorers?.default.url??"https://etherscan.io";return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(h.M,{onClose:b,backFn:c}),(0,d.jsxs)(u,{children:[(0,d.jsx)(C,{}),(0,d.jsxs)(v,{children:[(0,d.jsx)("h3",{children:"Check account assets before transferring"}),(0,d.jsx)("p",{children:"Before transferring, ensure there are no assets in the other account. Assets in that account will not transfer automatically and may be lost."}),(0,d.jsxs)(z,{children:[(0,d.jsx)("p",{children:" To check your balance, you can:"}),(0,d.jsx)(A,{children:"Log out and log back into the other account, or "}),(0,d.jsxs)(A,{children:["Copy your wallet address and use a"," ",(0,d.jsx)("u",{children:(0,d.jsx)("a",{target:"_blank",href:l,children:"block explorer"})})," ","to see if the account holds any assets."]})]}),(0,d.jsxs)(w,{onClick:()=>navigator.clipboard.writeText(a).catch(console.error),children:[(0,d.jsx)(f.A,{color:"var(--privy-color-foreground-1)",strokeWidth:2,height:"28px",width:"28px"}),(0,d.jsx)(k.A,{address:a,showCopyIcon:!1}),(0,d.jsx)(y,{})]}),(0,d.jsx)(t,{onTransfer:e,isTransferring:g,transferSuccess:i})]})]}),(0,d.jsx)(h.B,{})]})},E={component:()=>{let{initiateAccountTransfer:a,closePrivyModal:b}=(0,l.u)(),{data:c,navigate:e,lastScreen:f,setModalData:h}=(0,m.a)(),[i,j]=(0,g.useState)(void 0),[k,n]=(0,g.useState)(!1),[o,p]=(0,g.useState)(!1),q=async()=>{try{if(!c?.accountTransfer?.nonce||!c?.accountTransfer?.account)throw Error("missing account transfer inputs");p(!0),await a({nonce:c?.accountTransfer?.nonce,account:c?.accountTransfer?.account,accountType:c?.accountTransfer?.linkMethod,externalWalletMetadata:c?.accountTransfer?.externalWalletMetadata,telegramWebAppData:c?.accountTransfer?.telegramWebAppData,telegramAuthResult:c?.accountTransfer?.telegramAuthResult,farcasterEmbeddedAddress:c?.accountTransfer?.farcasterEmbeddedAddress,oAuthUserInfo:c?.accountTransfer?.oAuthUserInfo}),n(!0),p(!1),setTimeout(b,1e3)}catch(a){h({errorModalData:{error:a,previousScreen:f||"LinkConflictScreen"}}),e("ErrorScreen",!0)}};return i?(0,d.jsx)(D,{address:i,onClose:b,onRetry:()=>j(void 0),onTransfer:q,isTransferring:o,transferSuccess:k}):(0,d.jsx)(F,{onClose:b,onInfo:()=>j(c?.accountTransfer?.embeddedWalletAddress),onContinue:()=>j(c?.accountTransfer?.embeddedWalletAddress),onTransfer:q,isTransferring:o,transferSuccess:k,data:c})}},F=({onClose:a,onContinue:b,onInfo:c,onTransfer:f,transferSuccess:g,isTransferring:i,data:k})=>{if(!k?.accountTransfer?.linkMethod||!k?.accountTransfer?.displayName)return;let l={method:k?.accountTransfer?.linkMethod,handle:k?.accountTransfer?.displayName,disclosedAccount:k?.accountTransfer?.embeddedWalletAddress?{type:"wallet",handle:k?.accountTransfer?.embeddedWalletAddress}:void 0};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(h.M,{closeable:!0}),(0,d.jsxs)(u,{children:[(0,d.jsx)(j.e,{children:(0,d.jsxs)("div",{children:[(0,d.jsx)(r,{color:"var(--privy-color-error)"}),(0,d.jsx)(e.A,{height:38,width:38,stroke:"var(--privy-color-error)"})]})}),(0,d.jsxs)(v,{children:[(0,d.jsxs)("h3",{children:[function(a){switch(a){case"sms":return"Phone number";case"email":return"Email address";case"siwe":return"Wallet address";case"siws":return"Solana wallet address";case"linkedin":return"LinkedIn profile";case"google":case"apple":case"discord":case"github":case"instagram":case"spotify":case"tiktok":case"line":case"twitch":case"twitter":case"telegram":case"farcaster":return`${(0,n.e)(a.replace("_oauth",""))} profile`;default:return a.startsWith("privy:")?"Cross-app account":a}}(l.method)," is associated with another account"]}),(0,d.jsxs)("p",{children:["Do you want to transfer",(0,d.jsx)("b",{children:l.handle?` ${l.handle}`:""})," to this account instead? This will delete your other account."]}),(0,d.jsx)(G,{onClick:c,disclosedAccount:l.disclosedAccount})]}),(0,d.jsxs)(v,{style:{gap:12,marginTop:12},children:[k?.accountTransfer?.embeddedWalletAddress?(0,d.jsx)(h.P,{onClick:b,children:"Continue"}):(0,d.jsx)(t,{onTransfer:f,transferSuccess:g,isTransferring:i}),(0,d.jsx)(h.S,{onClick:a,children:"No thanks"})]})]}),(0,d.jsx)(h.B,{})]})};function G({disclosedAccount:a,onClick:b}){return a?(0,d.jsxs)(w,{onClick:b,children:[(0,d.jsx)(f.A,{color:"var(--privy-color-foreground-1)",strokeWidth:2,height:"28px",width:"28px"}),(0,d.jsx)(k.A,{address:a.handle,showCopyIcon:!1}),(0,d.jsx)(s,{width:15,height:15,color:"var(--privy-color-foreground-3)",style:{marginLeft:"auto"}})]}):null}},6101:(a,b,c)=>{c.d(b,{A:()=>i});var d=c(38301);let e=a=>{let b=a.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,b,c)=>c?c.toUpperCase():b.toLowerCase());return b.charAt(0).toUpperCase()+b.slice(1)},f=(...a)=>a.filter((a,b,c)=>!!a&&""!==a.trim()&&c.indexOf(a)===b).join(" ").trim();var g={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let h=(0,d.forwardRef)(({color:a="currentColor",size:b=24,strokeWidth:c=2,absoluteStrokeWidth:e,className:h="",children:i,iconNode:j,...k},l)=>(0,d.createElement)("svg",{ref:l,...g,width:b,height:b,stroke:a,strokeWidth:e?24*Number(c)/Number(b):c,className:f("lucide",h),...!i&&!(a=>{for(let b in a)if(b.startsWith("aria-")||"role"===b||"title"===b)return!0})(k)&&{"aria-hidden":"true"},...k},[...j.map(([a,b])=>(0,d.createElement)(a,b)),...Array.isArray(i)?i:[i]])),i=(a,b)=>{let c=(0,d.forwardRef)(({className:c,...g},i)=>(0,d.createElement)(h,{ref:i,iconNode:b,className:f(`lucide-${e(a).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${a}`,c),...g}));return c.displayName=e(a),c}},14325:(a,b,c)=>{c.d(b,{e:()=>d});function d(a){return a.charAt(0).toUpperCase()+a.slice(1)}},15925:(a,b,c)=>{c.d(b,{A:()=>e});var d=c(38301);let e=d.forwardRef(function({title:a,titleId:b,...c},e){return d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:e,"aria-labelledby":b},c),a?d.createElement("title",{id:b},a):null,d.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"}))})},28121:(a,b,c)=>{c.d(b,{A:()=>d});let d=(0,c(6101).A)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]])},29725:(a,b,c)=>{c.d(b,{A:()=>e});var d=c(38301);let e=d.forwardRef(function({title:a,titleId:b,...c},e){return d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:e,"aria-labelledby":b},c),a?d.createElement("title",{id:b},a):null,d.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"}))})},30831:(a,b,c)=>{c.d(b,{e:()=>e});var d=c(78858);let e=d.I4.div`
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
`},92073:(a,b,c)=>{c.d(b,{A:()=>e});var d=c(38301);let e=d.forwardRef(function({title:a,titleId:b,...c},e){return d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:e,"aria-labelledby":b},c),a?d.createElement("title",{id:b},a):null,d.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"}))})},92584:(a,b,c)=>{c.d(b,{A:()=>d});let d=(0,c(6101).A)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]])}};