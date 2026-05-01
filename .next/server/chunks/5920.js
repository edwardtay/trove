"use strict";exports.id=5920,exports.ids=[5920],exports.modules={14325:(a,b,c)=>{c.d(b,{e:()=>d});function d(a){return a.charAt(0).toUpperCase()+a.slice(1)}},15198:(a,b,c)=>{c.d(b,{S:()=>w});var d=c(21124),e=c(38301),f=c(78858),g=c(99848),h=c(7797),i=c(69456);let j=f.I4.div`
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
`},16747:(a,b,c)=>{c.d(b,{s:()=>e});var d=c(95761);let e=(a,b)=>(0,d.s)(a,b.ethereum.createOnLogin)||(0,d.k)(a,b.solana.createOnLogin)},39492:(a,b,c)=>{c.d(b,{A:()=>e});var d=c(38301);let e=d.forwardRef(function({title:a,titleId:b,...c},e){return d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:e,"aria-labelledby":b},c),a?d.createElement("title",{id:b},a):null,d.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"}))})},69456:(a,b,c)=>{c.d(b,{N:()=>f});var d=c(21124),e=c(78858);let f=({size:a,centerIcon:b})=>(0,d.jsx)(g,{$size:a,children:(0,d.jsxs)(h,{children:[(0,d.jsx)(j,{}),(0,d.jsx)(k,{}),b?(0,d.jsx)(i,{children:b}):null]})}),g=e.I4.div`
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
`},76963:(a,b,c)=>{c.r(b),c.d(b,{OAuthStatusScreen:()=>u,OAuthStatusScreenView:()=>t,default:()=>u});var d=c(21124),e=c(38301),f=c(23966),g=c(27609),h=c(39492),i=c(55666),j=c(64317),k=c(87230),l=c(16747),m=c(74995),n=c(14325),o=c(95761);c(22967),c(18521),c(32571),c(21398),c(61946);let p=({style:a})=>(0,d.jsx)(h.A,{style:{color:"var(--privy-color-error)",...a}}),q={google:{name:"Google",component:g.G},discord:{name:"Discord",component:g.D},github:{name:"Github",component:g.b},linkedin:{name:"LinkedIn",component:g.L},twitter:{name:"Twitter",component:g.a},spotify:{name:"Spotify",component:g.S},instagram:{name:"Instagram",component:g.I},tiktok:{name:"Tiktok",component:g.T},line:{name:"LINE",component:i.L},twitch:{name:"Twitch",component:i.T},apple:{name:"Apple",component:g.A}},r=({iconUrl:a,...b})=>e.createElement("svg",{width:"33",height:"32",viewBox:"0 0 33 32",fill:"none",xmlns:"http://www.w3.org/2000/svg",...b},e.createElement("foreignObject",{x:"2",y:"2",width:"29",height:"28"},e.createElement("img",{src:a,width:"29",height:"28",style:{display:"block",objectFit:"contain",borderRadius:"4px"},alt:"Provider icon"}))),s=(a,b)=>{if(a in q)return q[a];if((0,f.i)(a)&&b){let c=b.find(b=>b.provider===a);if(c)return{name:c.provider_display_name,component:a=>e.createElement(r,{...a,iconUrl:c.provider_icon_url})}}return{name:"Unknown",component:p}},t=({providerName:a,ProviderLogo:b,success:c,errorMessage:e,onRetry:f})=>{let g=c?`Successfully connected with ${a}`:e?e.message:`Verifying connection to ${a}`;return(0,d.jsx)(m.S,{title:g,subtitle:c?"You're good to go!":e?e.detail:"Just a few moments more",icon:b,iconVariant:"loading",iconLoadingStatus:{success:c,fail:!!e},secondaryCta:e?.retryable&&f?{label:"Retry",onClick:f}:void 0,watermark:!0})},u={component:()=>{let{authenticated:a,logout:b,ready:c,user:g}=(0,f.u)(),{setModalData:h,navigate:i,resetNavigation:m}=(0,f.a)(),p=(0,j.u)(),{getAuthMeta:q,initLoginWithOAuth:r,loginWithOAuth:u,updateWallets:v,setReadyToTrue:w,closePrivyModal:x,createAnalyticsEvent:y}=(0,k.u)(),[z,A]=(0,e.useState)(!1),[B,C]=(0,e.useState)(void 0),D=q()?.provider||"google",{name:E,component:F}=s(D,p.customOAuthProviders);return(0,e.useEffect)(()=>{u(D).then(()=>{A(!0),w(!0)}).catch(a=>{if(w(!1),a?.privyErrorCode===k.c.ALLOWLIST_REJECTED)return C(void 0),m(),void i("AllowlistRejectionScreen");if(a?.privyErrorCode===k.c.USER_LIMIT_REACHED)return console.error(new k.k(a).toString()),C(void 0),m(),void i("UserLimitReachedScreen");if(a?.privyErrorCode===k.c.USER_DOES_NOT_EXIST)return C(void 0),m(),void i("AccountNotFoundScreen");if(a?.privyErrorCode===k.c.ACCOUNT_TRANSFER_REQUIRED&&a.data?.data?.nonce)return C(void 0),m(),h({accountTransfer:{nonce:a.data?.data?.nonce,account:a.data?.data?.subject,displayName:a.data?.data?.account?.displayName,linkMethod:q()?.provider,embeddedWalletAddress:a.data?.data?.otherUser?.embeddedWalletAddress,oAuthUserInfo:a.data?.data?.otherUser?.oAuthUserInfo}}),void i("LinkConflictScreen");let{retryable:b,detail:c}=function(a,b,c){let d={detail:"",retryable:!1},e=(0,n.e)(b);if(a?.privyErrorCode===k.c.LINKED_TO_ANOTHER_USER&&(d.detail="This account has already been linked to another user."),a?.privyErrorCode===k.c.INVALID_CREDENTIALS&&(d.retryable=!0,d.detail="Something went wrong. Try again."),a.privyErrorCode===k.c.OAUTH_USER_DENIED&&(d.detail=`Retry and check ${e} to finish connecting your account.`,d.retryable=!0),a?.privyErrorCode===k.c.TOO_MANY_REQUESTS&&(d.detail="Too many requests. Please wait before trying again."),a?.privyErrorCode===k.c.TOO_MANY_REQUESTS&&a.message.includes("provider rate limit")){let a=s(b,c).name;d.detail=`Request limit reached for ${a}. Please wait a moment and try again.`}if(a?.privyErrorCode===k.c.OAUTH_ACCOUNT_SUSPENDED){let a=s(b,c).name;d.detail=`Your ${a} account is suspended. Please try another login method.`}return a?.privyErrorCode===k.c.CANNOT_LINK_MORE_OF_TYPE&&(d.detail="You cannot authorize more than one account for this user."),a?.privyErrorCode===k.c.OAUTH_UNEXPECTED&&b.startsWith("privy:")&&(d.detail="Something went wrong. Please try again."),d}(a,D,p.customOAuthProviders);C({retryable:b,detail:c,message:"Authentication failed"})}).finally(()=>{(0,o.l)()})},[E,D]),(0,e.useEffect)(()=>{if(c&&a&&z&&g){if(p?.legal.requireUsersAcceptTerms&&!g.hasAcceptedTerms){let a=setTimeout(()=>{i("AffirmativeConsentScreen")},j.q);return()=>clearTimeout(a)}if((0,l.s)(g,p.embeddedWallets)){let a=setTimeout(()=>{h({createWallet:{onSuccess:()=>{},onFailure:a=>{console.error(a),y({eventName:"embedded_wallet_creation_failure_logout",payload:{error:a,provider:D,screen:"OAuthStatusScreen"}}),b()},callAuthOnSuccessOnClose:!0}}),i("EmbeddedWalletOnAccountCreateScreen")},j.q);return()=>clearTimeout(a)}{let a=setTimeout(()=>x({shouldCallAuthOnSuccess:!0,isSuccess:!0}),j.q);return v(),()=>clearTimeout(a)}}},[c,a,z,g]),(0,d.jsx)(t,{providerName:E,ProviderLogo:F,success:z,errorMessage:B,onRetry:B?.retryable?()=>{(0,o.l)(),r(D),C(void 0)}:void 0})},isShownBeforeReady:!0}}};