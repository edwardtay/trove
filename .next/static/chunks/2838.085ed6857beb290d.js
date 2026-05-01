"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2838],{4471:(e,t,r)=>{r.d(t,{C:()=>p,a:()=>m});var s=r(95155),o=r(8489),a=r(31334),n=r(12115),i=r(20031);let l=i.I4.button`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.5rem;

  svg {
    width: 0.875rem;
    height: 0.875rem;
  }
`,c=i.I4.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--privy-color-foreground-2);
`,u=(0,i.I4)(o.A)`
  color: var(--privy-color-icon-success);
  flex-shrink: 0;
`,d=(0,i.I4)(a.A)`
  color: var(--privy-color-icon-muted);
  flex-shrink: 0;
`;function p({children:e,iconOnly:t,value:r,hideCopyIcon:o,...a}){let[i,p]=(0,n.useState)(!1);return(0,s.jsxs)(l,{...a,onClick:()=>{navigator.clipboard.writeText(r||("string"==typeof e?e:"")).catch(console.error),p(!0),setTimeout(()=>p(!1),1500)},children:[e," ",i?(0,s.jsxs)(c,{children:[(0,s.jsx)(u,{})," ",!t&&"Copied"]}):!o&&(0,s.jsx)(d,{})]})}let m=({value:e,includeChildren:t,children:r,...o})=>{let[a,i]=(0,n.useState)(!1),p=()=>{navigator.clipboard.writeText(e).catch(console.error),i(!0),setTimeout(()=>i(!1),1500)};return(0,s.jsxs)(s.Fragment,{children:[t?(0,s.jsx)(l,{...o,onClick:p,children:r}):(0,s.jsx)(s.Fragment,{children:r}),(0,s.jsx)(l,{...o,onClick:p,children:a?(0,s.jsx)(c,{children:(0,s.jsx)(u,{})}):(0,s.jsx)(d,{})})]})}},12838:(e,t,r)=>{r.r(t),r.d(t,{FundWithBankDepositScreen:()=>U,default:()=>U});var s=r(95155),o=r(12115),a=r(59804),n=r(17411),i=r(59642),l=r(92253),c=r(20031),u=r(4471),d=r(41078),p=r(18801),m=r(3390),y=r(42407);let h=(0,y.A)("hourglass",[["path",{d:"M5 22h14",key:"ehvnwv"}],["path",{d:"M5 2h14",key:"pdyrp9"}],["path",{d:"M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22",key:"1d314k"}],["path",{d:"M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2",key:"1vvvr6"}]]),f=(0,y.A)("user-check",[["path",{d:"m16 11 2 2 4-4",key:"9rsbq5"}],["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]]);var g=r(8489),v=r(92824);r(50205),r(68463),r(72378),r(45472);let k=({data:e,onClose:t})=>(0,s.jsx)(p.S,{showClose:!0,onClose:t,title:"Initiate bank transfer",subtitle:"Use the details below to complete a bank transfer from your bank.",primaryCta:{label:"Done",onClick:t},watermark:!1,footerText:"Exchange rates and fees are set when you authorize and determine the amount you receive. You'll see the applicable rates and fees for your transaction separately",children:(0,s.jsx)(x,{children:(d.G[e.deposit_instructions.asset]||[]).map(([t,r],o)=>{let a=e.deposit_instructions[t];if(!a||Array.isArray(a))return null;let n="asset"===t?a.toUpperCase():a,i=n.length>100?`${n.slice(0,9)}...${n.slice(-9)}`:n;return(0,s.jsxs)(C,{children:[(0,s.jsx)(w,{children:r}),(0,s.jsx)(u.a,{value:n,includeChildren:l.Fr,children:(0,s.jsx)(b,{children:i})})]},o)})})}),x=c.I4.ol`
  border-color: var(--privy-color-border-default);
  border-width: 1px;
  border-radius: var(--privy-border-radius-mdlg);
  border-style: solid;
  display: flex;
  flex-direction: column;

  && {
    padding: 0 1rem;
  }
`,C=c.I4.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;

  &:not(:first-of-type) {
    border-top: 1px solid var(--privy-color-border-default);
  }

  & > {
    :nth-child(1) {
      flex-basis: 30%;
    }

    :nth-child(2) {
      flex-basis: 60%;
    }
  }
`,w=c.I4.span`
  color: var(--privy-color-foreground);
  font-kerning: none;
  font-variant-numeric: lining-nums proportional-nums;
  font-feature-settings: 'calt' off;

  /* text-xs/font-regular */
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.125rem; /* 150% */

  text-align: left;
  flex-shrink: 0;
`,b=c.I4.span`
  color: var(--privy-color-foreground);
  font-kerning: none;
  font-feature-settings: 'calt' off;

  /* text-sm/font-medium */
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.375rem; /* 157.143% */

  text-align: right;
  word-break: break-all;
`,j=({onClose:e})=>(0,s.jsx)(p.S,{showClose:!0,onClose:e,icon:m.A,iconVariant:"error",title:"Something went wrong",subtitle:"We couldn't complete account setup. This isn't caused by anything you did.",primaryCta:{label:"Close",onClick:e},watermark:!0}),A=({onClose:e,reason:t})=>{let r=t?t.charAt(0).toLowerCase()+t.slice(1):void 0;return(0,s.jsx)(p.S,{showClose:!0,onClose:e,icon:m.A,iconVariant:"error",title:"Identity verification failed",subtitle:r?`We can't complete identity verification because ${r}. Please try again or contact support for assistance.`:"We couldn't verify your identity. Please try again or contact support for assistance.",primaryCta:{label:"Close",onClick:e},watermark:!0})},S=({onClose:e,email:t})=>(0,s.jsx)(p.S,{showClose:!0,onClose:e,icon:h,title:"Identity verification in progress",subtitle:"We're waiting for Persona to approve your identity verification. This usually takes a few minutes, but may take up to 24 hours.",primaryCta:{label:"Done",onClick:e},watermark:!0,children:(0,s.jsxs)(v.I,{theme:"light",children:["You'll receive an email at ",t," once approved with instructions for completing your deposit."]})}),E=({onClose:e,onAcceptTerms:t,isLoading:r})=>(0,s.jsx)(p.S,{showClose:!0,onClose:e,icon:f,title:"Verify your identity to continue",subtitle:"Finish verification with Persona — it takes just a few minutes and requires a government ID.",helpText:(0,s.jsxs)(s.Fragment,{children:['This app uses Bridge to securely connect accounts and move funds. By clicking "Accept," you agree to Bridge\'s'," ",(0,s.jsx)("a",{href:"https://www.bridge.xyz/legal",target:"_blank",rel:"noopener noreferrer",children:"Terms of Service"})," ","and"," ",(0,s.jsx)("a",{href:"https://www.bridge.xyz/legal/row-privacy-policy/bridge-building-limited",target:"_blank",rel:"noopener noreferrer",children:"Privacy Policy"}),"."]}),primaryCta:{label:"Accept and continue",onClick:t,loading:r},watermark:!0}),I=({onClose:e})=>(0,s.jsx)(p.S,{showClose:!0,onClose:e,icon:g.A,iconVariant:"success",title:"Identity verified successfully",subtitle:"We've successfully verified your identity. Now initiate a bank transfer to view instructions.",primaryCta:{label:"Initiate bank transfer",onClick:()=>{},loading:!0},watermark:!0}),T=({opts:e,onClose:t,onEditSourceAsset:r,onSelectAmount:o,isLoading:a})=>(0,s.jsxs)(p.S,{showClose:!0,onClose:t,headerTitle:`Buy ${e.destination.asset.toLocaleUpperCase()}`,primaryCta:{label:"Continue",onClick:o,loading:a},watermark:!0,children:[(0,s.jsx)(i.A,{currency:e.source.selectedAsset,inputMode:"decimal",autoFocus:!0}),(0,s.jsx)(i.C,{selectedAsset:e.source.selectedAsset,onEditSourceAsset:r})]}),_=({onClose:e,onAcceptTerms:t,onSelectAmount:r,onSelectSource:o,onEditSourceAsset:a,opts:n,state:l,email:c,isLoading:u})=>"select-amount"===l.status?(0,s.jsx)(T,{onClose:e,onSelectAmount:r,onEditSourceAsset:a,opts:n,isLoading:u}):"select-source-asset"===l.status?(0,s.jsx)(i.S,{onSelectSource:o,opts:n,isLoading:u}):"kyc-prompt"===l.status?(0,s.jsx)(E,{onClose:e,onAcceptTerms:t,opts:n,isLoading:u}):"kyc-incomplete"===l.status?(0,s.jsx)(S,{onClose:e,email:c}):"kyc-success"===l.status?(0,s.jsx)(I,{onClose:e}):"kyc-error"===l.status?(0,s.jsx)(A,{onClose:e,reason:l.reason}):"account-details"===l.status?(0,s.jsx)(k,{onClose:e,data:l.data}):"create-customer-error"===l.status||"get-customer-error"===l.status?(0,s.jsx)(j,{onClose:e}):null,U={component:()=>{let{user:e}=(0,n.u)(),t=(0,n.a)().data;if(!t?.FundWithBankDepositScreen)throw Error("Missing data");let{onSuccess:r,onFailure:l,opts:c,createOrUpdateCustomer:u,getCustomer:d,getOrCreateVirtualAccount:p}=t.FundWithBankDepositScreen,[m,y]=(0,o.useState)(c),[h,f]=(0,o.useState)({status:"select-amount"}),[g,v]=(0,o.useState)(null),[k,x]=(0,o.useState)(!1),C=(0,o.useRef)(null),w=(0,o.useCallback)(async()=>{let e;x(!0),v(null);try{e=await d({kycRedirectUrl:window.location.origin})}catch(e){if(!e||"object"!=typeof e||!("status"in e)||404!==e.status)return f({status:"get-customer-error"}),v(e),void x(!1)}if(!e)try{e=await u({hasAcceptedTerms:!1,kycRedirectUrl:window.location.origin})}catch(e){return f({status:"create-customer-error"}),v(e),void x(!1)}if(!e)return f({status:"create-customer-error"}),v(Error("Unable to create customer")),void x(!1);if("not_started"===e.status&&e.kyc_url)return f({status:"kyc-prompt",kycUrl:e.kyc_url}),void x(!1);if("not_started"===e.status)return f({status:"get-customer-error"}),v(Error("Unexpected user state")),void x(!1);if("rejected"===e.status)return f({status:"kyc-error",reason:e.rejection_reasons?.[0]?.reason}),v(Error("User KYC rejected.")),void x(!1);if("incomplete"===e.status)return f({status:"kyc-incomplete"}),void x(!1);if("active"!==e.status)return f({status:"get-customer-error"}),v(Error("Unexpected user state")),void x(!1);e.status;try{let e=await p({destination:m.destination,provider:m.provider,source:{asset:m.source.selectedAsset}});f({status:"account-details",data:e})}catch(e){return f({status:"create-customer-error"}),v(e),void x(!1)}},[m]),b=(0,o.useCallback)(async()=>{if(v(null),x(!0),"kyc-prompt"!==h.status)return v(Error("Unexpected state")),void x(!1);let e=(0,a.h)({location:h.kycUrl});if(await u({hasAcceptedTerms:!0}),!e)return v(Error("Unable to begin kyc flow.")),x(!1),void f({status:"create-customer-error"});C.current=new AbortController;let t=await (async(e,t)=>{let r=await (0,i.p)({operation:async()=>({done:(e=>{try{return e.location.origin}catch{return}})(e)===window.location.origin,closed:e.closed}),until:({done:e,closed:t})=>e||t,delay:0,interval:500,attempts:360,signal:t});return"aborted"===r.status?(e.close(),{status:"aborted"}):"max_attempts"===r.status?{status:"timeout"}:r.result.done?(e.close(),{status:"redirected"}):{status:"closed"}})(e,C.current.signal);if("aborted"===t.status)return;if("closed"===t.status)return void x(!1);t.status;let r=await (0,i.p)({operation:()=>d({}),until:e=>"active"===e.status||"rejected"===e.status,delay:0,interval:2e3,attempts:60,signal:C.current.signal});if("aborted"!==r.status){if("max_attempts"===r.status)return f({status:"kyc-incomplete"}),void x(!1);if(r.status,"rejected"===r.result.status)return f({status:"kyc-error",reason:r.result.rejection_reasons?.[0]?.reason}),v(Error("User KYC rejected.")),void x(!1);if("active"!==r.result.status)return f({status:"kyc-incomplete"}),void x(!1);e.closed||e.close(),r.result.status;try{f({status:"kyc-success"});let e=await p({destination:m.destination,provider:m.provider,source:{asset:m.source.selectedAsset}});f({status:"account-details",data:e})}catch(e){f({status:"create-customer-error"}),v(e)}finally{x(!1)}}},[f,v,x,u,p,h,m,C]),j=(0,o.useCallback)(e=>{f({status:"select-amount"}),y({...m,source:{...m.source,selectedAsset:e}})},[f,y]),A=(0,o.useCallback)(()=>{f({status:"select-source-asset"})},[f]);return(0,s.jsx)(_,{onClose:(0,o.useCallback)(async()=>{C.current?.abort(),g?l(g):await r()},[g,C]),opts:m,state:h,isLoading:k,email:e.email.address,onAcceptTerms:b,onSelectAmount:w,onSelectSource:j,onEditSourceAsset:A})}}},31334:(e,t,r)=>{r.d(t,{A:()=>s});let s=(0,r(42407).A)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]])},92824:(e,t,r)=>{r.d(t,{I:()=>i});var s=r(95155),o=r(12115);let a=o.forwardRef(function(e,t){let{title:r,titleId:s,...a}=e;return o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:t,"aria-labelledby":s},a),r?o.createElement("title",{id:s},r):null,o.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"}))});var n=r(20031);let i=({children:e,theme:t})=>(0,s.jsxs)(l,{$theme:t,children:[(0,s.jsx)(a,{width:"20px",height:"20px",color:"var(--privy-color-icon-muted)",strokeWidth:1.5,style:{flexShrink:0}}),(0,s.jsx)(c,{$theme:t,children:e})]}),l=n.I4.div`
  display: flex;
  gap: 0.75rem;
  background-color: var(--privy-color-background-2);
  align-items: flex-start;
  padding: 1rem;
  border-radius: 0.75rem;
`,c=n.I4.div`
  color: ${e=>"dark"===e.$theme?"var(--privy-color-foreground-2)":"var(--privy-color-foreground)"};
  flex: 1;
  text-align: left;

  /* text-sm/font-regular */
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.375rem; /* 157.143% */
`}}]);