"use strict";exports.id=108,exports.ids=[108],exports.modules={2281:(a,b,c)=>{c.d(b,{F:()=>e});var d=c(21124);let e=a=>(0,d.jsxs)("svg",{width:"33",height:"32",viewBox:"0 0 33 32",fill:"none",xmlns:"http://www.w3.org/2000/svg",...a,children:[(0,d.jsx)("rect",{x:"0.5",width:"32",height:"32",rx:"4",fill:"#855DCD"}),(0,d.jsxs)("g",{"clip-path":"url(#clip0_1715_1960)",children:[(0,d.jsx)("path",{d:"M4.5 4H28.5V28H4.5V4Z",fill:"#855DCD"}),(0,d.jsx)("path",{d:"M11.1072 8.42105H21.6983V23.5789H20.1437V16.6357H20.1284C19.9566 14.7167 18.3542 13.2129 16.4028 13.2129C14.4514 13.2129 12.849 14.7167 12.6771 16.6357H12.6619V23.5789H11.1072V8.42105Z",fill:"white"}),(0,d.jsx)("path",{d:"M8.28943 10.5725L8.92101 12.7239H9.45542V21.4275C9.1871 21.4275 8.96959 21.6464 8.96959 21.9165V22.5032H8.87242C8.60411 22.5032 8.38659 22.7221 8.38659 22.9922V23.5789H13.8279V22.9922C13.8279 22.7221 13.6104 22.5032 13.3421 22.5032H13.2449V21.9165C13.2449 21.6464 13.0274 21.4275 12.7591 21.4275H12.1761V10.5725H8.28943Z",fill:"white"}),(0,d.jsx)("path",{d:"M20.2408 21.4275C19.9725 21.4275 19.755 21.6464 19.755 21.9165V22.5032H19.6579C19.3895 22.5032 19.172 22.7221 19.172 22.9922V23.5789H24.6133V22.9922C24.6133 22.7221 24.3958 22.5032 24.1275 22.5032H24.0303V21.9165C24.0303 21.6464 23.8128 21.4275 23.5445 21.4275V12.7239H24.0789L24.7105 10.5725H20.8238V21.4275H20.2408Z",fill:"white"})]}),(0,d.jsx)("defs",{children:(0,d.jsx)("clipPath",{id:"clip0_1715_1960",children:(0,d.jsx)("rect",{width:"24",height:"24",fill:"white",transform:"translate(4.5 4)"})})})]})},6101:(a,b,c)=>{c.d(b,{A:()=>i});var d=c(38301);let e=a=>{let b=a.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,b,c)=>c?c.toUpperCase():b.toLowerCase());return b.charAt(0).toUpperCase()+b.slice(1)},f=(...a)=>a.filter((a,b,c)=>!!a&&""!==a.trim()&&c.indexOf(a)===b).join(" ").trim();var g={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let h=(0,d.forwardRef)(({color:a="currentColor",size:b=24,strokeWidth:c=2,absoluteStrokeWidth:e,className:h="",children:i,iconNode:j,...k},l)=>(0,d.createElement)("svg",{ref:l,...g,width:b,height:b,stroke:a,strokeWidth:e?24*Number(c)/Number(b):c,className:f("lucide",h),...!i&&!(a=>{for(let b in a)if(b.startsWith("aria-")||"role"===b||"title"===b)return!0})(k)&&{"aria-hidden":"true"},...k},[...j.map(([a,b])=>(0,d.createElement)(a,b)),...Array.isArray(i)?i:[i]])),i=(a,b)=>{let c=(0,d.forwardRef)(({className:c,...g},i)=>(0,d.createElement)(h,{ref:i,iconNode:b,className:f(`lucide-${e(a).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${a}`,c),...g}));return c.displayName=e(a),c}},15198:(a,b,c)=>{c.d(b,{S:()=>w});var d=c(21124),e=c(38301),f=c(78858),g=c(99848),h=c(7797),i=c(69456);let j=f.I4.div`
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
`},15316:(a,b,c)=>{c.d(b,{O:()=>g});var d=c(21124),e=c(38301),f=c(78858);let g=a=>{let[b,c]=(0,e.useState)(!1);return(0,d.jsx)(h,{color:a.color,href:a.url,target:"_blank",rel:"noreferrer noopener",onClick:()=>{c(!0),setTimeout(()=>c(!1),1500)},justOpened:b,children:a.text})},h=f.I4.a`
  display: flex;
  align-items: center;
  gap: 6px;

  && {
    margin: 8px 2px;
    font-size: 14px;
    color: ${a=>a.justOpened?"var(--privy-color-foreground)":a.color||"var(--privy-color-foreground-3)"};
    font-weight: ${a=>a.justOpened?"medium":"normal"};
    transition: color 350ms ease;

    :focus,
    :active {
      background-color: transparent;
      border: none;
      outline: none;
      box-shadow: none;
    }

    :hover {
      color: ${a=>a.justOpened?"var(--privy-color-foreground)":"var(--privy-color-foreground-2)"};
    }

    :active {
      color: 'var(--privy-color-foreground)';
      font-weight: medium;
    }

    @media (max-width: 440px) {
      margin: 12px 2px;
    }
  }

  svg {
    width: 14px;
    height: 14px;
  }
`},16747:(a,b,c)=>{c.d(b,{s:()=>e});var d=c(95761);let e=(a,b)=>(0,d.s)(a,b.ethereum.createOnLogin)||(0,d.k)(a,b.solana.createOnLogin)},28121:(a,b,c)=>{c.d(b,{A:()=>d});let d=(0,c(6101).A)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]])},30108:(a,b,c)=>{c.r(b),c.d(b,{FarcasterConnectStatusScreen:()=>D,FarcasterConnectStatusView:()=>C,default:()=>D});var d=c(21124),e=c(38301),f=c(32571),g=c(78858),h=c(99848),i=c(15316),j=c(41204),k=c(28121),l=c(92584),m=c(7797),n=c(59702),o=c(64317),p=c(87230),q=c(23966),r=c(16747),s=c(74995),t=c(2281);c(18521),c(34351),c(22967),c(21398),c(61946);let u=g.I4.div`
  width: 100%;
`,v=g.I4.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem;
  height: 56px;
  background: ${a=>a.$disabled?"var(--privy-color-background-2)":"var(--privy-color-background)"};
  border: 1px solid var(--privy-color-foreground-4);
  border-radius: var(--privy-border-radius-md);

  &:hover {
    border-color: ${a=>a.$disabled?"var(--privy-color-foreground-4)":"var(--privy-color-foreground-3)"};
  }
`,w=g.I4.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
`,x=g.I4.span`
  display: block;
  font-size: 16px;
  line-height: 24px;
  color: ${a=>a.$disabled?"var(--privy-color-foreground-2)":"var(--privy-color-foreground)"};
  overflow: hidden;
  text-overflow: ellipsis;
  /* Use single-line truncation without nowrap to respect container width */
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;

  @media (min-width: 441px) {
    font-size: 14px;
    line-height: 20px;
  }
`,y=(0,g.I4)(x)`
  color: var(--privy-color-foreground-3);
  font-style: italic;
`,z=(0,g.I4)(n.L)`
  margin-bottom: 0.5rem;
`,A=(0,g.I4)(m.S)`
  && {
    gap: 0.375rem;
    font-size: 14px;
    flex-shrink: 0;
  }
`,B=({value:a,title:b,placeholder:c,className:f,showCopyButton:g=!0,truncate:h,maxLength:i=40,disabled:j=!1})=>{let[m,n]=(0,e.useState)(!1),o=h&&a?((a,b,c)=>{if((a=a.startsWith("https://")?a.slice(8):a).length<=c)return a;if("middle"===b){let b=Math.ceil(c/2)-2,d=Math.floor(c/2)-1;return`${a.slice(0,b)}...${a.slice(-d)}`}return`${a.slice(0,c-3)}...`})(a,h,i):a;return(0,e.useEffect)(()=>{if(m){let a=setTimeout(()=>n(!1),3e3);return()=>clearTimeout(a)}},[m]),(0,d.jsxs)(u,{className:f,children:[b&&(0,d.jsx)(z,{children:b}),(0,d.jsxs)(v,{$disabled:j,children:[(0,d.jsx)(w,{children:a?(0,d.jsx)(x,{$disabled:j,title:a,children:o}):(0,d.jsx)(y,{$disabled:j,children:c||"No value"})}),g&&a&&(0,d.jsx)(A,{onClick:function(b){b.stopPropagation(),navigator.clipboard.writeText(a).then(()=>n(!0)).catch(console.error)},size:"sm",children:(0,d.jsxs)(d.Fragment,m?{children:["Copied",(0,d.jsx)(k.A,{size:14})]}:{children:["Copy",(0,d.jsx)(l.A,{size:14})]})})]})]})},C=({connectUri:a,loading:b,success:c,errorMessage:e,onBack:g,onClose:k,onOpenFarcaster:l})=>(0,d.jsx)(s.S,f.Fr||b?f.un?{title:e?e.message:"Sign in with Farcaster",subtitle:e?e.detail:"To sign in with Farcaster, please open the Farcaster app.",icon:t.F,iconVariant:"loading",iconLoadingStatus:{success:c,fail:!!e},primaryCta:a&&l?{label:"Open Farcaster app",onClick:l}:void 0,onBack:g,onClose:k,watermark:!0}:{title:e?e.message:"Signing in with Farcaster",subtitle:e?e.detail:"This should only take a moment",icon:t.F,iconVariant:"loading",iconLoadingStatus:{success:c,fail:!!e},onBack:g,onClose:k,watermark:!0,children:a&&f.Fr&&(0,d.jsx)(E,{children:(0,d.jsx)(i.O,{text:"Take me to Farcaster",url:a,color:"#8a63d2"})})}:{title:"Sign in with Farcaster",subtitle:"Scan with your phone's camera to continue.",onBack:g,onClose:k,watermark:!0,children:(0,d.jsxs)(F,{children:[(0,d.jsx)(G,{children:a?(0,d.jsx)(j.Q,{url:a,size:275,squareLogoElement:t.F}):(0,d.jsx)(J,{children:(0,d.jsx)(h.L,{})})}),(0,d.jsxs)(H,{children:[(0,d.jsx)(I,{children:"Or copy this link and paste it into a phone browser to open the Farcaster app."}),a&&(0,d.jsx)(B,{value:a,truncate:"end",maxLength:30,showCopyButton:!0,disabled:!0})]})]})}),D={component:()=>{let{authenticated:a,logout:b,ready:c,user:f}=(0,q.u)(),{lastScreen:g,navigate:h,navigateBack:i,setModalData:j}=(0,q.a)(),k=(0,o.u)(),{getAuthFlow:l,loginWithFarcaster:m,closePrivyModal:n,createAnalyticsEvent:s}=(0,p.u)(),[t,u]=(0,e.useState)(void 0),[v,w]=(0,e.useState)(!1),[x,y]=(0,e.useState)(!1),z=(0,e.useRef)([]),A=l(),B=A?.meta.connectUri;return(0,e.useEffect)(()=>{let a=Date.now(),b=setInterval(async()=>{let c=await A.pollForReady.execute(),d=Date.now()-a;if(c){clearInterval(b),w(!0);try{await m(),y(!0)}catch(b){let a={retryable:!1,message:"Authentication failed"};if(b?.privyErrorCode===p.c.ALLOWLIST_REJECTED)return void h("AllowlistRejectionScreen");if(b?.privyErrorCode===p.c.USER_LIMIT_REACHED)return console.error(new p.k(b).toString()),void h("UserLimitReachedScreen");if(b?.privyErrorCode===p.c.USER_DOES_NOT_EXIST)return void h("AccountNotFoundScreen");if(b?.privyErrorCode===p.c.LINKED_TO_ANOTHER_USER)a.detail=b.message??"This account has already been linked to another user.";else{if(b?.privyErrorCode===p.c.ACCOUNT_TRANSFER_REQUIRED&&b.data?.data?.nonce)return j({accountTransfer:{nonce:b.data?.data?.nonce,account:b.data?.data?.subject,displayName:b.data?.data?.account?.displayName,linkMethod:"farcaster",embeddedWalletAddress:b.data?.data?.otherUser?.embeddedWalletAddress,farcasterEmbeddedAddress:b.data?.data?.otherUser?.farcasterEmbeddedAddress}}),void h("LinkConflictScreen");b?.privyErrorCode===p.c.INVALID_CREDENTIALS?(a.retryable=!0,a.detail="Something went wrong. Try again."):b?.privyErrorCode===p.c.TOO_MANY_REQUESTS&&(a.detail="Too many requests. Please wait before trying again.")}u(a)}}else d>12e4&&(clearInterval(b),u({retryable:!0,message:"Authentication failed",detail:"The request timed out. Try again."}))},2e3);return()=>{clearInterval(b),z.current.forEach(a=>clearTimeout(a))}},[]),(0,e.useEffect)(()=>{if(c&&a&&x&&f){if(k?.legal.requireUsersAcceptTerms&&!f.hasAcceptedTerms){let a=setTimeout(()=>{h("AffirmativeConsentScreen")},o.q);return()=>clearTimeout(a)}x&&((0,r.s)(f,k.embeddedWallets)?z.current.push(setTimeout(()=>{j({createWallet:{onSuccess:()=>{},onFailure:a=>{console.error(a),s({eventName:"embedded_wallet_creation_failure_logout",payload:{error:a,screen:"FarcasterConnectStatusScreen"}}),b()},callAuthOnSuccessOnClose:!0}}),h("EmbeddedWalletOnAccountCreateScreen")},o.q)):z.current.push(setTimeout(()=>n({shouldCallAuthOnSuccess:!0,isSuccess:!0}),o.q)))}},[x,c,a,f]),(0,d.jsx)(C,{connectUri:B,loading:v,success:x,errorMessage:t,onBack:g?i:void 0,onClose:n,onOpenFarcaster:()=>{B&&(window.location.href=B)}})}},E=g.I4.div`
  margin-top: 24px;
`,F=g.I4.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`,G=g.I4.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 275px;
`,H=g.I4.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`,I=g.I4.div`
  font-size: 0.875rem;
  text-align: center;
  color: var(--privy-color-foreground-2);
`,J=g.I4.div`
  position: relative;
  width: 82px;
  height: 82px;
`},59702:(a,b,c)=>{c.d(b,{L:()=>e});var d=c(78858);let e=d.I4.span`
  color: var(--privy-color-foreground-3);
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.125rem; /* 150% */
`},69456:(a,b,c)=>{c.d(b,{N:()=>f});var d=c(21124),e=c(78858);let f=({size:a,centerIcon:b})=>(0,d.jsx)(g,{$size:a,children:(0,d.jsxs)(h,{children:[(0,d.jsx)(j,{}),(0,d.jsx)(k,{}),b?(0,d.jsx)(i,{children:b}):null]})}),g=e.I4.div`
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
`},74995:(a,b,c)=>{c.d(b,{S:()=>g});var d=c(21124),e=c(7797),f=c(15198);let g=({primaryCta:a,secondaryCta:b,helpText:c,footerText:g,watermark:h=!0,children:i,...j})=>{let k=a||b?(0,d.jsxs)(d.Fragment,{children:[a&&(()=>{let{label:b,...c}=a,f=c.variant||"primary";return(0,d.jsx)(e.a,{...c,variant:f,style:{width:"100%",...c.style},children:b})})(),b&&(()=>{let{label:a,...c}=b,f=c.variant||"secondary";return(0,d.jsx)(e.a,{...c,variant:f,style:{width:"100%",...c.style},children:a})})()]}):null;return(0,d.jsxs)(f.S,{id:j.id,className:j.className,children:[(0,d.jsx)(f.S.Header,{...j}),i?(0,d.jsx)(f.S.Body,{children:i}):null,c||k||h?(0,d.jsxs)(f.S.Footer,{children:[c?(0,d.jsx)(f.S.HelpText,{children:c}):null,k?(0,d.jsx)(f.S.Actions,{children:k}):null,h?(0,d.jsx)(f.S.Watermark,{}):null]}):null,g?(0,d.jsx)(f.S.FooterText,{children:g}):null]})}},92584:(a,b,c)=>{c.d(b,{A:()=>d});let d=(0,c(6101).A)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]])}};