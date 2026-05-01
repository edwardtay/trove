"use strict";exports.id=9715,exports.ids=[9715],exports.modules={45541:(a,b,c)=>{c.d(b,{C:()=>m,a:()=>n});var d=c(21124),e=c(28121),f=c(92584),g=c(38301),h=c(78858);let i=h.I4.button`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.5rem;

  svg {
    width: 0.875rem;
    height: 0.875rem;
  }
`,j=h.I4.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--privy-color-foreground-2);
`,k=(0,h.I4)(e.A)`
  color: var(--privy-color-icon-success);
  flex-shrink: 0;
`,l=(0,h.I4)(f.A)`
  color: var(--privy-color-icon-muted);
  flex-shrink: 0;
`;function m({children:a,iconOnly:b,value:c,hideCopyIcon:e,...f}){let[h,m]=(0,g.useState)(!1);return(0,d.jsxs)(i,{...f,onClick:()=>{navigator.clipboard.writeText(c||("string"==typeof a?a:"")).catch(console.error),m(!0),setTimeout(()=>m(!1),1500)},children:[a," ",h?(0,d.jsxs)(j,{children:[(0,d.jsx)(k,{})," ",!b&&"Copied"]}):!e&&(0,d.jsx)(l,{})]})}let n=({value:a,includeChildren:b,children:c,...e})=>{let[f,h]=(0,g.useState)(!1),m=()=>{navigator.clipboard.writeText(a).catch(console.error),h(!0),setTimeout(()=>h(!1),1500)};return(0,d.jsxs)(d.Fragment,{children:[b?(0,d.jsx)(i,{...e,onClick:m,children:c}):(0,d.jsx)(d.Fragment,{children:c}),(0,d.jsx)(i,{...e,onClick:m,children:f?(0,d.jsx)(j,{children:(0,d.jsx)(k,{})}):(0,d.jsx)(l,{})})]})}},69715:(a,b,c)=>{c.r(b),c.d(b,{FundWithBankDepositScreen:()=>F,default:()=>F});var d=c(21124),e=c(38301),f=c(58407),g=c(23966),h=c(84759),i=c(32571),j=c(78858),k=c(45541),l=c(95761),m=c(74995),n=c(21728),o=c(6101);let p=(0,o.A)("hourglass",[["path",{d:"M5 22h14",key:"ehvnwv"}],["path",{d:"M5 2h14",key:"pdyrp9"}],["path",{d:"M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22",key:"1d314k"}],["path",{d:"M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2",key:"1vvvr6"}]]),q=(0,o.A)("user-check",[["path",{d:"m16 11 2 2 4-4",key:"9rsbq5"}],["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]]);var r=c(28121),s=c(90130);c(22967),c(18521),c(21398),c(61946);let t=({data:a,onClose:b})=>(0,d.jsx)(m.S,{showClose:!0,onClose:b,title:"Initiate bank transfer",subtitle:"Use the details below to complete a bank transfer from your bank.",primaryCta:{label:"Done",onClick:b},watermark:!1,footerText:"Exchange rates and fees are set when you authorize and determine the amount you receive. You'll see the applicable rates and fees for your transaction separately",children:(0,d.jsx)(u,{children:(l.G[a.deposit_instructions.asset]||[]).map(([b,c],e)=>{let f=a.deposit_instructions[b];if(!f||Array.isArray(f))return null;let g="asset"===b?f.toUpperCase():f,h=g.length>100?`${g.slice(0,9)}...${g.slice(-9)}`:g;return(0,d.jsxs)(v,{children:[(0,d.jsx)(w,{children:c}),(0,d.jsx)(k.a,{value:g,includeChildren:i.Fr,children:(0,d.jsx)(x,{children:h})})]},e)})})}),u=j.I4.ol`
  border-color: var(--privy-color-border-default);
  border-width: 1px;
  border-radius: var(--privy-border-radius-mdlg);
  border-style: solid;
  display: flex;
  flex-direction: column;

  && {
    padding: 0 1rem;
  }
`,v=j.I4.li`
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
`,w=j.I4.span`
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
`,x=j.I4.span`
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
`,y=({onClose:a})=>(0,d.jsx)(m.S,{showClose:!0,onClose:a,icon:n.A,iconVariant:"error",title:"Something went wrong",subtitle:"We couldn't complete account setup. This isn't caused by anything you did.",primaryCta:{label:"Close",onClick:a},watermark:!0}),z=({onClose:a,reason:b})=>{let c=b?b.charAt(0).toLowerCase()+b.slice(1):void 0;return(0,d.jsx)(m.S,{showClose:!0,onClose:a,icon:n.A,iconVariant:"error",title:"Identity verification failed",subtitle:c?`We can't complete identity verification because ${c}. Please try again or contact support for assistance.`:"We couldn't verify your identity. Please try again or contact support for assistance.",primaryCta:{label:"Close",onClick:a},watermark:!0})},A=({onClose:a,email:b})=>(0,d.jsx)(m.S,{showClose:!0,onClose:a,icon:p,title:"Identity verification in progress",subtitle:"We're waiting for Persona to approve your identity verification. This usually takes a few minutes, but may take up to 24 hours.",primaryCta:{label:"Done",onClick:a},watermark:!0,children:(0,d.jsxs)(s.I,{theme:"light",children:["You'll receive an email at ",b," once approved with instructions for completing your deposit."]})}),B=({onClose:a,onAcceptTerms:b,isLoading:c})=>(0,d.jsx)(m.S,{showClose:!0,onClose:a,icon:q,title:"Verify your identity to continue",subtitle:"Finish verification with Persona — it takes just a few minutes and requires a government ID.",helpText:(0,d.jsxs)(d.Fragment,{children:['This app uses Bridge to securely connect accounts and move funds. By clicking "Accept," you agree to Bridge\'s'," ",(0,d.jsx)("a",{href:"https://www.bridge.xyz/legal",target:"_blank",rel:"noopener noreferrer",children:"Terms of Service"})," ","and"," ",(0,d.jsx)("a",{href:"https://www.bridge.xyz/legal/row-privacy-policy/bridge-building-limited",target:"_blank",rel:"noopener noreferrer",children:"Privacy Policy"}),"."]}),primaryCta:{label:"Accept and continue",onClick:b,loading:c},watermark:!0}),C=({onClose:a})=>(0,d.jsx)(m.S,{showClose:!0,onClose:a,icon:r.A,iconVariant:"success",title:"Identity verified successfully",subtitle:"We've successfully verified your identity. Now initiate a bank transfer to view instructions.",primaryCta:{label:"Initiate bank transfer",onClick:()=>{},loading:!0},watermark:!0}),D=({opts:a,onClose:b,onEditSourceAsset:c,onSelectAmount:e,isLoading:f})=>(0,d.jsxs)(m.S,{showClose:!0,onClose:b,headerTitle:`Buy ${a.destination.asset.toLocaleUpperCase()}`,primaryCta:{label:"Continue",onClick:e,loading:f},watermark:!0,children:[(0,d.jsx)(h.A,{currency:a.source.selectedAsset,inputMode:"decimal",autoFocus:!0}),(0,d.jsx)(h.C,{selectedAsset:a.source.selectedAsset,onEditSourceAsset:c})]}),E=({onClose:a,onAcceptTerms:b,onSelectAmount:c,onSelectSource:e,onEditSourceAsset:f,opts:g,state:i,email:j,isLoading:k})=>"select-amount"===i.status?(0,d.jsx)(D,{onClose:a,onSelectAmount:c,onEditSourceAsset:f,opts:g,isLoading:k}):"select-source-asset"===i.status?(0,d.jsx)(h.S,{onSelectSource:e,opts:g,isLoading:k}):"kyc-prompt"===i.status?(0,d.jsx)(B,{onClose:a,onAcceptTerms:b,opts:g,isLoading:k}):"kyc-incomplete"===i.status?(0,d.jsx)(A,{onClose:a,email:j}):"kyc-success"===i.status?(0,d.jsx)(C,{onClose:a}):"kyc-error"===i.status?(0,d.jsx)(z,{onClose:a,reason:i.reason}):"account-details"===i.status?(0,d.jsx)(t,{onClose:a,data:i.data}):"create-customer-error"===i.status||"get-customer-error"===i.status?(0,d.jsx)(y,{onClose:a}):null,F={component:()=>{let{user:a}=(0,g.u)(),b=(0,g.a)().data;if(!b?.FundWithBankDepositScreen)throw Error("Missing data");let{onSuccess:c,onFailure:i,opts:j,createOrUpdateCustomer:k,getCustomer:l,getOrCreateVirtualAccount:m}=b.FundWithBankDepositScreen,[n,o]=(0,e.useState)(j),[p,q]=(0,e.useState)({status:"select-amount"}),[r,s]=(0,e.useState)(null),[t,u]=(0,e.useState)(!1),v=(0,e.useRef)(null),w=(0,e.useCallback)(async()=>{let a;u(!0),s(null);try{a=await l({kycRedirectUrl:window.location.origin})}catch(a){if(!a||"object"!=typeof a||!("status"in a)||404!==a.status)return q({status:"get-customer-error"}),s(a),void u(!1)}if(!a)try{a=await k({hasAcceptedTerms:!1,kycRedirectUrl:window.location.origin})}catch(a){return q({status:"create-customer-error"}),s(a),void u(!1)}if(!a)return q({status:"create-customer-error"}),s(Error("Unable to create customer")),void u(!1);if("not_started"===a.status&&a.kyc_url)return q({status:"kyc-prompt",kycUrl:a.kyc_url}),void u(!1);if("not_started"===a.status)return q({status:"get-customer-error"}),s(Error("Unexpected user state")),void u(!1);if("rejected"===a.status)return q({status:"kyc-error",reason:a.rejection_reasons?.[0]?.reason}),s(Error("User KYC rejected.")),void u(!1);if("incomplete"===a.status)return q({status:"kyc-incomplete"}),void u(!1);if("active"!==a.status)return q({status:"get-customer-error"}),s(Error("Unexpected user state")),void u(!1);a.status;try{let a=await m({destination:n.destination,provider:n.provider,source:{asset:n.source.selectedAsset}});q({status:"account-details",data:a})}catch(a){return q({status:"create-customer-error"}),s(a),void u(!1)}},[n]),x=(0,e.useCallback)(async()=>{if(s(null),u(!0),"kyc-prompt"!==p.status)return s(Error("Unexpected state")),void u(!1);let a=(0,f.h)({location:p.kycUrl});if(await k({hasAcceptedTerms:!0}),!a)return s(Error("Unable to begin kyc flow.")),u(!1),void q({status:"create-customer-error"});v.current=new AbortController;let b=await (async(a,b)=>{let c=await (0,h.p)({operation:async()=>({done:(a=>{try{return a.location.origin}catch{return}})(a)===window.location.origin,closed:a.closed}),until:({done:a,closed:b})=>a||b,delay:0,interval:500,attempts:360,signal:b});return"aborted"===c.status?(a.close(),{status:"aborted"}):"max_attempts"===c.status?{status:"timeout"}:c.result.done?(a.close(),{status:"redirected"}):{status:"closed"}})(a,v.current.signal);if("aborted"===b.status)return;if("closed"===b.status)return void u(!1);b.status;let c=await (0,h.p)({operation:()=>l({}),until:a=>"active"===a.status||"rejected"===a.status,delay:0,interval:2e3,attempts:60,signal:v.current.signal});if("aborted"!==c.status){if("max_attempts"===c.status)return q({status:"kyc-incomplete"}),void u(!1);if(c.status,"rejected"===c.result.status)return q({status:"kyc-error",reason:c.result.rejection_reasons?.[0]?.reason}),s(Error("User KYC rejected.")),void u(!1);if("active"!==c.result.status)return q({status:"kyc-incomplete"}),void u(!1);a.closed||a.close(),c.result.status;try{q({status:"kyc-success"});let a=await m({destination:n.destination,provider:n.provider,source:{asset:n.source.selectedAsset}});q({status:"account-details",data:a})}catch(a){q({status:"create-customer-error"}),s(a)}finally{u(!1)}}},[q,s,u,k,m,p,n,v]),y=(0,e.useCallback)(a=>{q({status:"select-amount"}),o({...n,source:{...n.source,selectedAsset:a}})},[q,o]),z=(0,e.useCallback)(()=>{q({status:"select-source-asset"})},[q]);return(0,d.jsx)(E,{onClose:(0,e.useCallback)(async()=>{v.current?.abort(),r?i(r):await c()},[r,v]),opts:n,state:p,isLoading:t,email:a.email.address,onAcceptTerms:x,onSelectAmount:w,onSelectSource:y,onEditSourceAsset:z})}}},90130:(a,b,c)=>{c.d(b,{I:()=>h});var d=c(21124),e=c(38301);let f=e.forwardRef(function({title:a,titleId:b,...c},d){return e.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:d,"aria-labelledby":b},c),a?e.createElement("title",{id:b},a):null,e.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"}))});var g=c(78858);let h=({children:a,theme:b})=>(0,d.jsxs)(i,{$theme:b,children:[(0,d.jsx)(f,{width:"20px",height:"20px",color:"var(--privy-color-icon-muted)",strokeWidth:1.5,style:{flexShrink:0}}),(0,d.jsx)(j,{$theme:b,children:a})]}),i=g.I4.div`
  display: flex;
  gap: 0.75rem;
  background-color: var(--privy-color-background-2);
  align-items: flex-start;
  padding: 1rem;
  border-radius: 0.75rem;
`,j=g.I4.div`
  color: ${a=>"dark"===a.$theme?"var(--privy-color-foreground-2)":"var(--privy-color-foreground)"};
  flex: 1;
  text-align: left;

  /* text-sm/font-regular */
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.375rem; /* 157.143% */
`},92584:(a,b,c)=>{c.d(b,{A:()=>d});let d=(0,c(6101).A)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]])}};