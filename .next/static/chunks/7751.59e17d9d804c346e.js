"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7751],{4915:(e,r,n)=>{n.r(r),n.d(r,{ErrorScreen:()=>m,ErrorScreenView:()=>p,default:()=>m});var t=n(95155),i=n(47196);let s=(0,n(42407).A)("phone",[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]]);var a=n(18696),o=n(20031),l=n(64209),c=n(41078),d=n(90456),h=n(17411),x=n(95402),u=n(18801);n(12115),n(50205),n(68463),n(92253),n(72378),n(45472);let p=({error:e,allowlistConfig:r,onRetry:n,onCaptchaReset:o,onBack:l})=>{let h=((e,r)=>{if(e instanceof x.R)return{title:"Transaction failed",detail:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("span",{children:e.message}),(0,t.jsxs)("span",{children:[" ","Check the"," ",(0,t.jsx)(g,{href:e.relayLink,target:"_blank",children:"refund status"}),"."]})]}),ctaText:"Try again",icon:i.A};if(e instanceof d.b)switch(e.privyErrorCode){case d.c.CLIENT_REQUEST_TIMEOUT:return{title:"Timed out",detail:e.message,ctaText:"Try again",icon:i.A};case d.c.INSUFFICIENT_BALANCE:return{title:"Insufficient balance",detail:e.message,ctaText:"Try again",icon:i.A};case d.c.TRANSACTION_FAILURE:return{title:"Transaction failure",detail:e.message,ctaText:"Try again",icon:i.A};default:return{title:"Something went wrong",detail:"Try again later",ctaText:"Try again",icon:i.A}}if(e instanceof c.P&&"twilio_verification_failed"===e.type)return{title:"Something went wrong",detail:e.message,ctaText:"Try again",icon:s};if(!(e instanceof d.g))return e instanceof d.e&&e.status&&[400,422].includes(e.status)?{title:"Something went wrong",detail:e.message,ctaText:"Try again",icon:i.A}:{title:"Something went wrong",detail:"Try again later",ctaText:"Try again",icon:i.A};switch(e.privyErrorCode){case d.c.INVALID_CAPTCHA:return{title:"Something went wrong",detail:"Please try again.",ctaText:"Try again",icon:i.A};case d.c.DISALLOWED_LOGIN_METHOD:return{title:"Not allowed",detail:e.message,ctaText:"Try another method",icon:i.A};case d.c.ALLOWLIST_REJECTED:return{title:r.errorTitle||"You don't have access to this app",detail:r.errorDetail||"Have you been invited?",ctaText:r.errorCtaText||"Try another account",icon:a.A};case d.c.CAPTCHA_FAILURE:return{title:"Something went wrong",detail:"You did not pass CAPTCHA. Please try again.",ctaText:"Try again",icon:null};case d.c.CAPTCHA_TIMEOUT:return{title:"Something went wrong",detail:"Something went wrong! Please try again later.",ctaText:"Try again",icon:null};case d.c.LINKED_TO_ANOTHER_USER:return{title:"Authentication failed",detail:"This account has already been linked to another user.",ctaText:"Try again",icon:i.A};case d.c.NOT_SUPPORTED:return{title:"This region is not supported",detail:"SMS authentication from this region is not available",ctaText:"Try another method",icon:i.A};case d.c.TOO_MANY_REQUESTS:return{title:"Request failed",detail:"Too many attempts.",ctaText:"Try again later",icon:i.A};default:return{title:"Something went wrong",detail:"Try again later",ctaText:"Try again",icon:i.A}}})(e,r);return(0,t.jsx)(u.S,{title:h.title,subtitle:h.detail,icon:h.icon,onBack:l,iconVariant:"error",primaryCta:{label:h.ctaText,onClick:()=>{e instanceof d.g&&(e.privyErrorCode===d.c.INVALID_CAPTCHA&&o?.(),e.privyErrorCode===d.c.ALLOWLIST_REJECTED&&r.errorCtaLink)?window.location.href=r.errorCtaLink:n?.()},variant:"error"},watermark:!0})},m={component:()=>{let{navigate:e,data:r,lastScreen:n,currentScreen:i}=(0,h.a)(),s=(0,l.u)(),{reset:a}=(0,c.a)(),o=r?.errorModalData?.previousScreen||(n===i?void 0:n);return(0,t.jsx)(p,{error:r?.errorModalData?.error||Error(),allowlistConfig:s.allowlistConfig,onRetry:()=>{e(o||"LandingScreen",!1)},onCaptchaReset:a})}},g=o.I4.a`
  color: var(--privy-color-accent) !important;
  font-weight: 600;
`},8489:(e,r,n)=>{n.d(r,{A:()=>t});let t=(0,n(42407).A)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]])},11124:(e,r,n)=>{n.d(r,{NJ:()=>o,vj:()=>a,vz:()=>s});var t=n(28245),i=n(30598);function s(e){return e?`${e.slice(0,5)}…${e.slice(-4)}`:""}function a({wei:e,precision:r=3}){return parseFloat((0,t.c)(e)).toFixed(r).replace(/0+$/,"").replace(/\.$/,"")}function o({amount:e,decimals:r}){return(0,i.J)(BigInt(e),r)}},18696:(e,r,n)=>{n.d(r,{A:()=>t});let t=(0,n(42407).A)("lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]])},21165:(e,r,n)=>{n.d(r,{S:()=>i});var t=n(20031);let i=t.I4.span`
  margin-top: 4px;
  color: var(--privy-color-foreground);
  text-align: center;

  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.375rem; /* 157.143% */

  && a {
    color: var(--privy-color-accent);
  }
`},24151:(e,r,n)=>{n.d(r,{E:()=>a});var t=n(95155),i=n(69245),s=n(20031);let a=({children:e,theme:r})=>(0,t.jsxs)(o,{$theme:r,children:[(0,t.jsx)(i.A,{width:"20px",height:"20px",color:"var(--privy-color-icon-error)",strokeWidth:2,style:{flexShrink:0}}),(0,t.jsx)(l,{$theme:r,children:e})]}),o=s.I4.div`
  display: flex;
  gap: 0.75rem;
  background-color: var(--privy-color-error-bg);
  align-items: flex-start;
  padding: 1rem;
  border-radius: 0.75rem;
`,l=s.I4.div`
  color: ${e=>"dark"===e.$theme?"var(--privy-color-foreground-2)":"var(--privy-color-foreground)"};
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  flex: 1;
  text-align: left;
`},31334:(e,r,n)=>{n.d(r,{A:()=>t});let t=(0,n(42407).A)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]])},35988:(e,r,n)=>{n.d(r,{S:()=>H,T:()=>K,a:()=>W});var t=n(95155),i=n(12115);let s=i.forwardRef(function(e,r){let{title:n,titleId:t,...s}=e;return i.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:r,"aria-labelledby":t},s),n?i.createElement("title",{id:t},n):null,i.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"}))});var a=n(96059);let o=i.forwardRef(function(e,r){let{title:n,titleId:t,...s}=e;return i.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:r,"aria-labelledby":t},s),n?i.createElement("title",{id:t},n):null,i.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"}))});var l=n(20031),c=n(11124),d=n(84241),h=n(90600),x=n(36054),u=n(55211),p=n(76054),m=n(21165),g=n(88172),j=n(68858),f=n(45156),v=n(64209),y=n(96052),w=n(86575),k=n(96616),b=n(99788),A=n(99630),T=n(24151),I=n(36868),L=n(43687);let C=i.forwardRef(function(e,r){let{title:n,titleId:t,...s}=e;return i.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:r,"aria-labelledby":t},s),n?i.createElement("title",{id:t},n):null,i.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"}))});var R=n(69245),E=n(70818),S=n(90456);let V=(0,l.I4)(h.L)`
  cursor: pointer;
  display: inline-flex;
  gap: 8px;
  align-items: center;
  color: var(--privy-color-accent);
  svg {
    fill: var(--privy-color-accent);
  }
`;var N=({iconUrl:e,value:r,symbol:n,usdValue:i,nftName:s,nftCount:a,decimals:o,$isLoading:l})=>{if(l)return(0,t.jsx)($,{$isLoading:l});let c=r&&i&&o?function(e,r,n){let t=parseFloat(e),i=parseFloat(n);if(0===t||0===i||Number.isNaN(t)||Number.isNaN(i))return e;let s=Math.ceil(-Math.log10(.01/(i/t))),a=Math.pow(10,s=Math.max(s=Math.min(s,r),1)),o=+(Math.floor(t*a)/a).toFixed(s).replace(/\.?0+$/,"");return Intl.NumberFormat(void 0,{maximumFractionDigits:r}).format(o)}(r,o,i):r;return(0,t.jsxs)("div",{children:[(0,t.jsxs)($,{$isLoading:l,children:[e&&(0,t.jsx)(O,{src:e,alt:"Token icon"}),a&&a>1?a+"x":void 0," ",s,c," ",n]}),i&&(0,t.jsxs)(M,{$isLoading:l,children:["$",i]})]})};let $=l.I4.span`
  color: var(--privy-color-foreground);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.375rem;
  word-break: break-all;
  text-align: right;
  display: flex;
  justify-content: flex-end;

  ${w.L}
`,M=l.I4.span`
  color: var(--privy-color-foreground-2);
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  word-break: break-all;
  text-align: right;
  display: flex;
  justify-content: flex-end;

  ${w.L}
`,O=l.I4.img`
  height: 14px;
  width: 14px;
  margin-right: 4px;
  object-fit: contain;
`,F=e=>{let{chain:r,transactionDetails:n,isTokenContractInfoLoading:i,symbol:s}=e,{action:a,functionName:o}=n;return(0,t.jsx)(b.B,{children:(0,t.jsxs)(x.a,{children:["transaction"!==a&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Action"}),(0,t.jsx)(h.V,{children:o})]}),"mint"===o&&"args"in n&&n.args.filter(e=>e).map((e,n)=>(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:`Param ${n}`}),(0,t.jsx)(h.V,{children:"string"==typeof e&&(0,k.P)(e)?(0,t.jsx)(j.A,{address:e,url:r?.blockExplorers?.default?.url,showCopyIcon:!1}):e?.toString()})]},n)),"setApprovalForAll"===o&&n.operator&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Operator"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:n.operator,url:r?.blockExplorers?.default?.url,showCopyIcon:!1})})]}),"setApprovalForAll"===o&&void 0!==n.approved&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Set approval to"}),(0,t.jsx)(h.V,{children:n.approved?"true":"false"})]}),"transfer"===o||"transferWithMemo"===o||"transferFrom"===o||"safeTransferFrom"===o||"approve"===o?(0,t.jsxs)(t.Fragment,{children:["formattedAmount"in n&&n.formattedAmount&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Amount"}),(0,t.jsxs)(h.V,{$isLoading:i,children:[n.formattedAmount," ",s]})]}),"tokenId"in n&&n.tokenId&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Token ID"}),(0,t.jsx)(h.V,{children:n.tokenId.toString()})]})]}):null,"safeBatchTransferFrom"===o&&(0,t.jsxs)(t.Fragment,{children:["amounts"in n&&n.amounts&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Amounts"}),(0,t.jsx)(h.V,{children:n.amounts.join(", ")})]}),"tokenIds"in n&&n.tokenIds&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Token IDs"}),(0,t.jsx)(h.V,{children:n.tokenIds.join(", ")})]})]}),"approve"===o&&n.spender&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Spender"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:n.spender,url:r?.blockExplorers?.default?.url,showCopyIcon:!1})})]}),("transferFrom"===o||"safeTransferFrom"===o||"safeBatchTransferFrom"===o)&&n.transferFrom&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Transferring from"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:n.transferFrom,url:r?.blockExplorers?.default?.url,showCopyIcon:!1})})]}),("transferFrom"===o||"safeTransferFrom"===o||"safeBatchTransferFrom"===o)&&n.transferTo&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Transferring to"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:n.transferTo,url:r?.blockExplorers?.default?.url,showCopyIcon:!1})})]})]})})},z=({variant:e,setPreventMaliciousTransaction:r,colorScheme:n="light",preventMaliciousTransaction:i})=>"warn"===e?(0,t.jsx)(D,{children:(0,t.jsxs)(I.W,{theme:n,children:[(0,t.jsx)("span",{style:{fontWeight:"500"},children:"Warning: Suspicious transaction"}),(0,t.jsx)("br",{}),"This has been flagged as a potentially deceptive request. Approving could put your assets or funds at risk."]})}):"error"===e?(0,t.jsx)(t.Fragment,{children:(0,t.jsxs)(D,{children:[(0,t.jsx)(T.E,{theme:n,children:(0,t.jsxs)("div",{children:[(0,t.jsx)("strong",{children:"This is a malicious transaction"}),(0,t.jsx)("br",{}),"This transaction transfers tokens to a known malicious address. Proceeding may result in the loss of valuable assets."]})}),(0,t.jsxs)(P,{children:[(0,t.jsx)(A.C,{color:"var(--privy-color-error)",checked:!i,readOnly:!0,onClick:()=>r(!i)}),(0,t.jsx)("span",{children:"I understand and want to proceed anyways."})]})]})}):null,D=l.I4.div`
  margin-top: 1.5rem;
`,P=l.I4.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
`,_=({transactionIndex:e,maxIndex:r})=>"number"!=typeof e||0===r?"":` (${e+1} / ${r+1})`,H=({img:e,submitError:r,prepareError:n,onClose:l,action:c,title:p,subtitle:f,to:w,tokenAddress:k,network:b,missingFunds:A,fee:T,from:I,cta:L,disabled:C,chain:R,isSubmitting:E,isPreparing:S,isTokenPriceLoading:$,isTokenContractInfoLoading:M,isSponsored:O,symbol:D,balance:P,onClick:H,transactionDetails:W,transactionIndex:U,maxIndex:Q,onBack:Y,chainName:K,validation:X,hasScanDetails:ee,setIsScanDetailsOpen:er,preventMaliciousTransaction:en,setPreventMaliciousTransaction:et,tokensSent:ei,tokensReceived:es,isScanning:ea,isCancellable:eo,functionName:el})=>{let{showTransactionDetails:ec,setShowTransactionDetails:ed,hasMoreDetails:eh,isErc20Ish:ex}=(e=>{let[r,n]=(0,i.useState)(!1),t=!0,s=!1;return(!e||e.isErc20Ish||"transaction"===e.action)&&(t=!1),t&&(s=Object.entries(e||{}).some(([e,r])=>r&&!["action","isErc20Ish","isNFTIsh"].includes(e))),{showTransactionDetails:r,setShowTransactionDetails:n,hasMoreDetails:t&&s,isErc20Ish:e?.isErc20Ish}})(W),eu=(0,v.u)(),ep=ex&&M||S||$||ea;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(d.M,{onClose:l,backFn:Y}),e&&(0,t.jsx)(J,{children:e}),(0,t.jsxs)(g.T,{style:{marginTop:e?"1.5rem":0},children:[p,(0,t.jsx)(_,{maxIndex:Q,transactionIndex:U})]}),(0,t.jsx)(m.S,{children:f}),(0,t.jsxs)(x.a,{style:{marginTop:"2rem"},children:[(!!ei[0]||ep)&&(0,t.jsxs)(x.R,{children:[es.length>0?(0,t.jsx)(h.L,{children:"Send"}):(0,t.jsx)(h.L,{children:"approve"===c?"Approval amount":"Amount"}),(0,t.jsx)("div",{className:"flex flex-col",children:ei.map((e,r)=>(0,t.jsx)(N,{iconUrl:e.iconUrl,value:"setApprovalForAll"===el?"All":e.value,usdValue:e.usdValue,symbol:e.symbol,nftName:e.nftName,nftCount:e.nftCount,decimals:e.decimals},r))})]}),es.length>0&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Receive"}),(0,t.jsx)("div",{className:"flex flex-col",children:es.map((e,r)=>(0,t.jsx)(N,{iconUrl:e.iconUrl,value:e.value,usdValue:e.usdValue,symbol:e.symbol,nftName:e.nftName,nftCount:e.nftCount,decimals:e.decimals},r))})]}),W&&"spender"in W&&W?.spender?(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Spender"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:W.spender,url:R?.blockExplorers?.default?.url})})]}):null,w&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"To"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:w,url:R?.blockExplorers?.default?.url,showCopyIcon:!0})})]}),k&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Token address"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:k,url:R?.blockExplorers?.default?.url})})]}),(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Network"}),(0,t.jsx)(h.V,{children:b})]}),(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Estimated fee"}),(0,t.jsx)(h.V,{$isLoading:S||$||void 0===O,children:O?(0,t.jsxs)(Z,{children:[(0,t.jsxs)(G,{children:["Sponsored by ",eu.name]}),(0,t.jsx)(s,{height:16,width:16})]}):T})]}),eh&&!ee&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(x.R,{className:"cursor-pointer",onClick:()=>ed(!ec),children:(0,t.jsxs)(h.a,{className:"flex items-center gap-x-1",children:["Details"," ",(0,t.jsx)(a.A,{style:{width:"0.75rem",marginLeft:"0.25rem",transform:ec?"rotate(180deg)":void 0}})]})}),ec&&W&&(0,t.jsx)(F,{action:c,chain:R,transactionDetails:W,isTokenContractInfoLoading:M,symbol:D})]}),ee&&(0,t.jsx)(x.R,{children:(0,t.jsxs)(V,{onClick:()=>er(!0),children:[(0,t.jsx)("span",{className:"text-color-primary",children:"Details"}),(0,t.jsx)(o,{height:"14px",width:"14px",strokeWidth:"2"})]})})]}),(0,t.jsx)(y.G,{}),r?(0,t.jsx)(u.E,{style:{marginTop:"2rem"},children:r.message}):n&&0===U?(0,t.jsx)(u.E,{style:{marginTop:"2rem"},children:n.shortMessage??q}):null,(0,t.jsx)(z,{variant:X,preventMaliciousTransaction:en,setPreventMaliciousTransaction:et}),(0,t.jsx)(B,{$useSmallMargins:!(!n&&!r&&"warn"!==X&&"error"!==X),address:I,balance:P,errMsg:S||n||r||!A?void 0:`Add funds on ${R?.name??K} to complete transaction.`}),(0,t.jsx)(d.P,{style:{marginTop:"1rem"},loading:E,disabled:C||S,onClick:H,children:L}),eo&&(0,t.jsx)(d.E,{style:{marginTop:"1rem"},onClick:l,isSubmitting:!1,children:"Not now"}),(0,t.jsx)(d.B,{})]})},W=({img:e,title:r,subtitle:n,cta:o,instructions:l,network:f,blockExplorerUrl:w,isMissingFunds:k,submitError:b,parseError:A,total:T,swap:I,transactingWalletAddress:L,fee:C,balance:R,disabled:E,isSubmitting:S,isPreparing:N,isTokenPriceLoading:$,onClick:M,onClose:O,onBack:F,isSponsored:z})=>{let D=N||$,[P,_]=(0,i.useState)(!1),H=(0,v.u)();return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(d.M,{onClose:O,backFn:F}),e&&(0,t.jsx)(J,{children:e}),(0,t.jsx)(g.T,{style:{marginTop:e?"1.5rem":0},children:r}),(0,t.jsx)(m.S,{children:n}),(0,t.jsxs)(x.a,{style:{marginTop:"2rem",marginBottom:".5rem"},children:[(T||D)&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Amount"}),(0,t.jsx)(h.V,{$isLoading:D,children:T})]}),I&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Swap"}),(0,t.jsx)(h.V,{children:I})]}),f&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Network"}),(0,t.jsx)(h.V,{children:f})]}),(C||D||void 0!==z)&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Estimated fee"}),(0,t.jsx)(h.V,{$isLoading:D,children:z&&!D?(0,t.jsxs)(Z,{children:[(0,t.jsxs)(G,{children:["Sponsored by ",H.name]}),(0,t.jsx)(s,{height:16,width:16})]}):C})]})]}),(0,t.jsx)(x.R,{children:(0,t.jsxs)(V,{onClick:()=>_(e=>!e),children:[(0,t.jsx)("span",{children:"Advanced"}),(0,t.jsx)(a.A,{height:"16px",width:"16px",strokeWidth:"2",style:{transition:"all 300ms",transform:P?"rotate(180deg)":void 0}})]})}),P&&(0,t.jsx)(t.Fragment,{children:l.map((e,r)=>"sol-transfer"===e.type?(0,t.jsxs)(U,{children:[(0,t.jsx)(x.R,{children:(0,t.jsxs)(p.L,{children:["Transfer ",e.withSeed?"with seed":""]})}),(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Amount"}),(0,t.jsxs)(h.V,{children:[(0,c.NJ)({amount:e.value,decimals:e.token.decimals})," ",e.token.symbol]})]}),!!e.toAccount&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Destination"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:e.toAccount,url:w})})]})]},r):"spl-transfer"===e.type?(0,t.jsxs)(U,{children:[(0,t.jsx)(x.R,{children:(0,t.jsxs)(p.L,{children:["Transfer ",e.token.symbol]})}),(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Amount"}),(0,t.jsx)(h.V,{children:e.value.toString()})]}),!!e.fromAta&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Source"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:e.fromAta,url:w})})]}),!!e.toAta&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Destination"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:e.toAta,url:w})})]}),!!e.token.address&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Token"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:e.token.address,url:w})})]})]},r):"ata-creation"===e.type?(0,t.jsxs)(U,{children:[(0,t.jsx)(x.R,{children:(0,t.jsx)(p.L,{children:"Create token account"})}),(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Program ID"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:e.program,url:w})})]}),!!e.owner&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Owner"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:e.owner,url:w})})]})]},r):"create-account"===e.type?(0,t.jsxs)(U,{children:[(0,t.jsx)(x.R,{children:(0,t.jsxs)(p.L,{children:["Create account ",e.withSeed?"with seed":""]})}),!!e.account&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Account"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:e.account,url:w})})]}),(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Amount"}),(0,t.jsxs)(h.V,{children:[(0,c.NJ)({amount:e.value,decimals:9})," SOL"]})]})]},r):"spl-init-account"===e.type?(0,t.jsxs)(U,{children:[(0,t.jsx)(x.R,{children:(0,t.jsx)(p.L,{children:"Initialize token account"})}),!!e.account&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Account"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:e.account,url:w})})]}),!!e.mint&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Mint"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:e.mint,url:w})})]}),!!e.owner&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Owner"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:e.owner,url:w})})]})]},r):"spl-close-account"===e.type?(0,t.jsxs)(U,{children:[(0,t.jsx)(x.R,{children:(0,t.jsx)(p.L,{children:"Close token account"})}),!!e.source&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Source"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:e.source,url:w})})]}),!!e.destination&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Destination"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:e.destination,url:w})})]}),!!e.owner&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Owner"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:e.owner,url:w})})]})]},r):"spl-sync-native"===e.type?(0,t.jsxs)(U,{children:[(0,t.jsx)(x.R,{children:(0,t.jsx)(p.L,{children:"Sync native"})}),(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Program ID"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:e.program,url:w})})]})]},r):"raydium-swap-base-input"===e.type?(0,t.jsxs)(U,{children:[(0,t.jsx)(x.R,{children:(0,t.jsxs)(p.L,{children:["Raydium swap"," ",e.tokenIn&&e.tokenOut?`${e.tokenIn.symbol} → ${e.tokenOut.symbol}`:""]})}),(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Amount in"}),(0,t.jsx)(h.V,{children:e.amountIn.toString()})]}),(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Minimum amount out"}),(0,t.jsx)(h.V,{children:e.minimumAmountOut.toString()})]}),e.mintIn&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Token in"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:e.mintIn,url:w})})]}),e.mintOut&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Token out"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:e.mintOut,url:w})})]})]},r):"raydium-swap-base-output"===e.type?(0,t.jsxs)(U,{children:[(0,t.jsx)(x.R,{children:(0,t.jsxs)(p.L,{children:["Raydium swap"," ",e.tokenIn&&e.tokenOut?`${e.tokenIn.symbol} → ${e.tokenOut.symbol}`:""]})}),(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Max amount in"}),(0,t.jsx)(h.V,{children:e.maxAmountIn.toString()})]}),(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Amount out"}),(0,t.jsx)(h.V,{children:e.amountOut.toString()})]}),e.mintIn&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Token in"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:e.mintIn,url:w})})]}),e.mintOut&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Token out"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:e.mintOut,url:w})})]})]},r):"jupiter-swap-shared-accounts-route"===e.type?(0,t.jsxs)(U,{children:[(0,t.jsx)(x.R,{children:(0,t.jsxs)(p.L,{children:["Jupiter swap"," ",e.tokenIn&&e.tokenOut?`${e.tokenIn.symbol} → ${e.tokenOut.symbol}`:""]})}),(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"In amount"}),(0,t.jsx)(h.V,{children:e.inAmount.toString()})]}),(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Quoted out amount"}),(0,t.jsx)(h.V,{children:e.quotedOutAmount.toString()})]}),e.mintIn&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Token in"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:e.mintIn,url:w})})]}),e.mintOut&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Token out"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:e.mintOut,url:w})})]})]},r):"jupiter-swap-exact-out-route"===e.type?(0,t.jsxs)(U,{children:[(0,t.jsx)(x.R,{children:(0,t.jsxs)(p.L,{children:["Jupiter swap"," ",e.tokenIn&&e.tokenOut?`${e.tokenIn.symbol} → ${e.tokenOut.symbol}`:""]})}),(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Quoted in amount"}),(0,t.jsx)(h.V,{children:e.quotedInAmount.toString()})]}),(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Amount out"}),(0,t.jsx)(h.V,{children:e.outAmount.toString()})]}),e.mintIn&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Token in"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:e.mintIn,url:w})})]}),e.mintOut&&(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Token out"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:e.mintOut,url:w})})]})]},r):(0,t.jsxs)(U,{children:[(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Program ID"}),(0,t.jsx)(h.V,{children:(0,t.jsx)(j.A,{address:e.program,url:w})})]}),(0,t.jsxs)(x.R,{children:[(0,t.jsx)(h.L,{children:"Data"}),(0,t.jsx)(h.V,{children:e.discriminator})]})]},r))}),(0,t.jsx)(y.G,{}),b?(0,t.jsx)(u.E,{style:{marginTop:"2rem"},children:b.message}):A?(0,t.jsx)(u.E,{style:{marginTop:"2rem"},children:q}):null,(0,t.jsx)(B,{$useSmallMargins:!(!A&&!b),title:"",address:L,balance:R,errMsg:N||A||b||!k?void 0:"Add funds on Solana to complete transaction."}),(0,t.jsx)(d.P,{style:{marginTop:"1rem"},loading:S,disabled:E||N,onClick:M,children:o}),(0,t.jsx)(d.B,{})]})},B=(0,l.I4)(f.W)`
  ${e=>e.$useSmallMargins?"margin-top: 0.5rem;":"margin-top: 2rem;"}
`,U=(0,l.I4)(x.a)`
  margin-top: 0.5rem;
  border: 1px solid var(--privy-color-foreground-4);
  border-radius: var(--privy-border-radius-sm);
  padding: 0.5rem;
`,q="There was an error preparing your transaction. Your transaction request will likely fail.",J=l.I4.div`
  display: flex;
  width: 100%;
  justify-content: center;
  max-height: 40px;

  > img {
    object-fit: contain;
    border-radius: var(--privy-border-radius-sm);
  }
`,Z=l.I4.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
`,G=l.I4.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--privy-color-foreground);
`,Q=e=>e?.code===E.s.COMPLIANCE_BLOCKED,Y=()=>(0,t.jsxs)(en,{children:[(0,t.jsx)(ei,{}),(0,t.jsx)(et,{})]}),K=({transactionError:e,chainId:r,onClose:n,onRetry:s,chainType:a,transactionHash:o})=>{let{chains:l}=(0,S.u)(),[c,h]=(0,i.useState)(!1),{errorCode:x,errorMessage:u}=((e,r)=>{if("ethereum"===r)return Q(e)?{errorCode:"Transaction blocked",errorMessage:e.message}:{errorCode:e.details??e.message,errorMessage:e.shortMessage};let n=e.txSignature,t=e?.transactionMessage||"Something went wrong.";if(Array.isArray(e.logs)){let r=e.logs.find(e=>/insufficient (lamports|funds)/gi.test(e));r&&(t=r)}return{transactionHash:n,errorMessage:t}})(e,a),p=Q(e),m=(({chains:e,chainId:r,chainType:n,transactionHash:t})=>{var i;return"ethereum"===n?e.find(e=>e.id===r)?.blockExplorers?.default.url??"https://etherscan.io":(i=t||"",`https://explorer.solana.com/tx/${i}?chain=${r}`)})({chains:l,chainId:r,chainType:a,transactionHash:o});return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(d.M,{onClose:n}),(0,t.jsxs)(X,{children:[(0,t.jsx)(Y,{}),(0,t.jsx)(ee,{children:x}),(0,t.jsx)(er,{children:p?"This transaction cannot be completed.":"Please try again."}),(0,t.jsxs)(eo,{children:[(0,t.jsx)(ea,{children:"Error message"}),(0,t.jsx)(ec,{$clickable:!1,children:u})]}),o&&(0,t.jsxs)(eo,{children:[(0,t.jsx)(ea,{children:"Transaction hash"}),(0,t.jsxs)(el,{children:["Copy this hash to view details about the transaction on a"," ",(0,t.jsx)("u",{children:(0,t.jsx)("a",{href:m,children:"block explorer"})}),"."]}),(0,t.jsxs)(ec,{$clickable:!0,onClick:async()=>{await navigator.clipboard.writeText(o),h(!0)},children:[o,(0,t.jsx)(ex,{clicked:c})]})]}),!p&&(0,t.jsx)(es,{onClick:()=>s({resetNonce:!!o}),children:"Retry transaction"})]}),(0,t.jsx)(d.b,{})]})},X=l.I4.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`,ee=l.I4.span`
  color: var(--privy-color-foreground);
  text-align: center;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.25rem; /* 111.111% */
  text-align: center;
  margin: 10px;
`,er=l.I4.span`
  margin-top: 4px;
  margin-bottom: 10px;
  color: var(--privy-color-foreground-3);
  text-align: center;

  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.008px;
`,en=l.I4.div`
  position: relative;
  width: 60px;
  height: 60px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`,et=(0,l.I4)(R.A)`
  position: absolute;
  width: 35px;
  height: 35px;
  color: var(--privy-color-error);
`,ei=l.I4.div`
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--privy-color-error);
  opacity: 0.1;
`,es=(0,l.I4)(d.P)`
  && {
    margin-top: 24px;
  }
  transition:
    color 350ms ease,
    background-color 350ms ease;
`,ea=l.I4.span`
  width: 100%;
  text-align: left;
  font-size: 0.825rem;
  color: var(--privy-color-foreground);
  padding: 4px;
`,eo=l.I4.div`
  width: 100%;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`,el=l.I4.text`
  position: relative;
  width: 100%;
  padding: 5px;
  font-size: 0.8rem;
  color: var(--privy-color-foreground-3);
  text-align: left;
  word-wrap: break-word;
`,ec=l.I4.span`
  position: relative;
  width: 100%;
  background-color: var(--privy-color-background-2);
  padding: 8px 12px;
  border-radius: 10px;
  margin-top: 5px;
  font-size: 14px;
  color: var(--privy-color-foreground-3);
  text-align: left;
  word-wrap: break-word;
  ${e=>e.$clickable&&"cursor: pointer;\n  transition: background-color 0.3s;\n  padding-right: 45px;\n\n  &:hover {\n    background-color: var(--privy-color-foreground-4);\n  }"}
`,ed=(0,l.I4)(C)`
  position: absolute;
  top: 13px;
  right: 13px;
  width: 24px;
  height: 24px;
`,eh=(0,l.I4)(L.A)`
  position: absolute;
  top: 13px;
  right: 13px;
  width: 24px;
  height: 24px;
`,ex=({clicked:e})=>(0,t.jsx)(e?eh:ed,{})},36054:(e,r,n)=>{n.d(r,{R:()=>s,a:()=>i});var t=n(20031);let i=t.I4.span`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
`,s=t.I4.span`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 0.5rem;
`},36868:(e,r,n)=>{n.d(r,{W:()=>a});var t=n(95155),i=n(88125),s=n(20031);let a=({children:e,theme:r,className:n})=>(0,t.jsxs)(o,{$theme:r,className:n,children:[(0,t.jsx)(i.A,{width:"20px",height:"20px",color:"var(--privy-color-icon-warning)",strokeWidth:2,style:{flexShrink:0}}),(0,t.jsx)(l,{$theme:r,children:e})]}),o=s.I4.div`
  display: flex;
  gap: 0.75rem;
  background-color: var(--privy-color-warn-bg);
  align-items: flex-start;
  padding: 1rem;
  border-radius: 0.75rem;
`,l=s.I4.div`
  color: ${e=>"dark"===e.$theme?"var(--privy-color-foreground-2)":"var(--privy-color-foreground)"};
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  flex: 1;
  text-align: left;
`},42407:(e,r,n)=>{n.d(r,{A:()=>l});var t=n(12115);let i=e=>{let r=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,r,n)=>n?n.toUpperCase():r.toLowerCase());return r.charAt(0).toUpperCase()+r.slice(1)},s=function(){for(var e=arguments.length,r=Array(e),n=0;n<e;n++)r[n]=arguments[n];return r.filter((e,r,n)=>!!e&&""!==e.trim()&&n.indexOf(e)===r).join(" ").trim()};var a={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let o=(0,t.forwardRef)((e,r)=>{let{color:n="currentColor",size:i=24,strokeWidth:o=2,absoluteStrokeWidth:l,className:c="",children:d,iconNode:h,...x}=e;return(0,t.createElement)("svg",{ref:r,...a,width:i,height:i,stroke:n,strokeWidth:l?24*Number(o)/Number(i):o,className:s("lucide",c),...!d&&!(e=>{for(let r in e)if(r.startsWith("aria-")||"role"===r||"title"===r)return!0})(x)&&{"aria-hidden":"true"},...x},[...h.map(e=>{let[r,n]=e;return(0,t.createElement)(r,n)}),...Array.isArray(d)?d:[d]])}),l=(e,r)=>{let n=(0,t.forwardRef)((n,a)=>{let{className:l,...c}=n;return(0,t.createElement)(o,{ref:a,iconNode:r,className:s("lucide-".concat(i(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()),"lucide-".concat(e),l),...c})});return n.displayName=i(e),n}},43687:(e,r,n)=>{n.d(r,{A:()=>i});var t=n(12115);let i=t.forwardRef(function(e,r){let{title:n,titleId:i,...s}=e;return t.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:r,"aria-labelledby":i},s),n?t.createElement("title",{id:i},n):null,t.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"}))})},45156:(e,r,n)=>{n.d(r,{W:()=>y});var t=n(95155),i=n(8489),s=n(31334),a=n(12115),o=n(20031),l=n(84241),c=n(55211),d=n(76054),h=n(68858),x=n(99788);let u=(0,o.I4)(x.B)`
  && {
    padding: 0.75rem;
    height: 56px;
  }
`,p=o.I4.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`,m=o.I4.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`,g=o.I4.div`
  font-size: 12px;
  line-height: 1rem;
  color: var(--privy-color-foreground-3);
`,j=(0,o.I4)(d.L)`
  text-align: left;
  margin-bottom: 0.5rem;
`,f=(0,o.I4)(c.E)`
  margin-top: 0.25rem;
`,v=(0,o.I4)(l.S)`
  && {
    gap: 0.375rem;
    font-size: 14px;
  }
`,y=({errMsg:e,balance:r,address:n,className:o,title:l,showCopyButton:c=!1})=>{let[d,x]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{if(d){let e=setTimeout(()=>x(!1),3e3);return()=>clearTimeout(e)}},[d]),(0,t.jsxs)("div",{children:[l&&(0,t.jsx)(j,{children:l}),(0,t.jsx)(u,{className:o,$state:e?"error":void 0,children:(0,t.jsxs)(p,{children:[(0,t.jsxs)(m,{children:[(0,t.jsx)(h.A,{address:n,showCopyIcon:!1}),void 0!==r&&(0,t.jsx)(g,{children:r})]}),c&&(0,t.jsx)(v,{onClick:function(e){e.stopPropagation(),navigator.clipboard.writeText(n).then(()=>x(!0)).catch(console.error)},size:"sm",children:(0,t.jsxs)(t.Fragment,d?{children:["Copied",(0,t.jsx)(i.A,{size:14})]}:{children:["Copy",(0,t.jsx)(s.A,{size:14})]})})]})}),e&&(0,t.jsx)(f,{children:e})]})}},47196:(e,r,n)=>{n.d(r,{A:()=>t});let t=(0,n(42407).A)("triangle-alert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]])},55211:(e,r,n)=>{n.d(r,{E:()=>i});var t=n(20031);let i=t.I4.span`
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.125rem; /* 150% */

  color: var(--privy-color-error);
`},68858:(e,r,n)=>{n.d(r,{A:()=>d});var t=n(95155),i=n(8489),s=n(31334),a=n(12115),o=n(20031),l=n(98134),c=n(84241);let d=({address:e,showCopyIcon:r,url:n,className:o})=>{let[d,p]=(0,a.useState)(!1);function m(r){r.stopPropagation(),navigator.clipboard.writeText(e).then(()=>p(!0)).catch(console.error)}return(0,a.useEffect)(()=>{if(d){let e=setTimeout(()=>p(!1),3e3);return()=>clearTimeout(e)}},[d]),(0,t.jsxs)(h,n?{children:[(0,t.jsx)(u,{title:e,className:o,href:`${n}/address/${e}`,target:"_blank",children:(0,l.w)(e)}),r&&(0,t.jsx)(c.S,{onClick:m,size:"sm",style:{gap:"0.375rem"},children:(0,t.jsxs)(t.Fragment,d?{children:["Copied",(0,t.jsx)(i.A,{size:16})]}:{children:["Copy",(0,t.jsx)(s.A,{size:16})]})})]}:{children:[(0,t.jsx)(x,{title:e,className:o,children:(0,l.w)(e)}),r&&(0,t.jsx)(c.S,{onClick:m,size:"sm",style:{gap:"0.375rem",fontSize:"14px"},children:(0,t.jsxs)(t.Fragment,d?{children:["Copied",(0,t.jsx)(i.A,{size:14})]}:{children:["Copy",(0,t.jsx)(s.A,{size:14})]})})]})},h=o.I4.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`,x=o.I4.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--privy-color-foreground);
`,u=o.I4.a`
  font-size: 14px;
  color: var(--privy-color-foreground);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`},69245:(e,r,n)=>{n.d(r,{A:()=>i});var t=n(12115);let i=t.forwardRef(function(e,r){let{title:n,titleId:i,...s}=e;return t.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:r,"aria-labelledby":i},s),n?t.createElement("title",{id:i},n):null,t.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"}))})},76054:(e,r,n)=>{n.d(r,{L:()=>i});var t=n(20031);let i=t.I4.span`
  color: var(--privy-color-foreground-3);
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.125rem; /* 150% */
`},83288:(e,r,n)=>{n.d(r,{C:()=>a,S:()=>s});var t=n(95155),i=n(20031);let s=({title:e,description:r,children:n,...i})=>(0,t.jsx)(o,{...i,children:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("h3",{children:e}),"string"==typeof r?(0,t.jsx)("p",{children:r}):r,n]})});(0,i.I4)(s)`
  margin-bottom: 24px;
`;let a=({title:e,description:r,icon:n,children:i,...s})=>(0,t.jsxs)(l,{...s,children:[n||null,(0,t.jsx)("h3",{children:e}),r&&"string"==typeof r?(0,t.jsx)("p",{children:r}):r,i]}),o=i.I4.div`
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
`},86575:(e,r,n)=>{n.d(r,{L:()=>s});var t=n(20031);let i=(0,t.i7)`
  from, to {
    background: var(--privy-color-foreground-4);
    color: var(--privy-color-foreground-4);
  }

  50% {
    background: var(--privy-color-foreground-accent);
    color: var(--privy-color-foreground-accent);
  }
`,s=(0,t.AH)`
  ${e=>e.$isLoading?(0,t.AH)`
          width: 35%;
          animation: ${i} 2s linear infinite;
          border-radius: var(--privy-border-radius-sm);
        `:""}
`},88172:(e,r,n)=>{n.d(r,{T:()=>i});var t=n(20031);let i=t.I4.span`
  color: var(--privy-color-foreground);
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.875rem; /* 166.667% */
  text-align: center;
`},90600:(e,r,n)=>{n.d(r,{L:()=>s,V:()=>o,a:()=>a});var t=n(20031),i=n(86575);let s=t.I4.span`
  color: var(--privy-color-foreground-3);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.375rem; /* 157.143% */
`,a=(0,t.I4)(s)`
  color: var(--privy-color-accent);
`,o=t.I4.span`
  color: var(--privy-color-foreground);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.375rem; /* 157.143% */
  word-break: break-all;
  text-align: right;

  ${i.L}
`},95402:(e,r,n)=>{n.d(r,{R:()=>j,a:()=>u,b:()=>a,c:()=>s,d:()=>p,e:()=>o,g:()=>x,t:()=>c,u:()=>g});var t=n(12115),i=n(90456);let s=0x2f3fb341,a="11111111111111111111111111111111",o="EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",l="0x0000000000000000000000000000000000000000",c=({appId:e,originCurrency:r,destinationCurrency:n,...t})=>({tradeType:"EXPECTED_OUTPUT",originCurrency:r??l,destinationCurrency:n??l,referrer:`privy|${e}`,...t}),d="https://api.relay.link",h="https://api.testnets.relay.link",x=async({input:e,isTestnet:r})=>{let n=await fetch((r?h:d)+"/quote",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),t=await n.json();if(!(n.ok||"string"==typeof t.message&&t.message.startsWith("Invalid address")))throw console.error("Relay error:",t),Error(t.message??"Error fetching quote from relay");return t},u=e=>{let r=e.steps[0]?.items?.[0];if(r)return{from:r.data.from,to:r.data.to,value:Number(r.data.value),chainId:Number(r.data.chainId),data:r.data.data}},p=e=>e.steps.flatMap(e=>e.items?.filter(e=>"incomplete"===e.status)??[]).map(e=>({from:e.data.from,to:e.data.to,value:Number(e.data.value),chainId:Number(e.data.chainId),data:e.data.data}));async function m({transactionHash:e,isTestnet:r}){let n=await fetch((r?h:d)+"/requests/v2?hash="+e),t=await n.json();if(!n.ok){if("message"in t&&"string"==typeof t.message)throw Error(t.message);throw Error("Error fetching request from relay")}return t.requests.at(0)?.status??"pending"}function g({transactionHash:e,isTestnet:r,bridgingStatus:n,setBridgingStatus:i,onSuccess:s,onFailure:a}){(0,t.useEffect)(()=>{if(e&&n){if(["delayed","waiting","pending"].includes(n)){let n=setInterval(async()=>{try{let n=await m({transactionHash:e,isTestnet:r});i(n)}catch(e){console.error(e)}},1e3);return()=>clearInterval(n)}"success"===n?s({transactionHash:e}):["refund","failure"].includes(n)&&a({error:new j(e,r)})}},[n,e,r])}class j extends i.b{constructor(e,r){super("We were unable to complete the bridging transaction. Funds will be refunded on your wallet.",void 0,i.c.TRANSACTION_FAILURE),this.relayLink=r?`https://testnets.relay.link/transaction/${e}`:`https://relay.link/transaction/${e}`}}},99630:(e,r,n)=>{n.d(r,{C:()=>s});var t=n(95155),i=n(20031);let s=({className:e,checked:r,color:n="var(--privy-color-accent)",...i})=>(0,t.jsx)("label",{children:(0,t.jsxs)(a,{className:e,children:[(0,t.jsx)(l,{checked:r,...i}),(0,t.jsx)(c,{color:n,checked:r,children:(0,t.jsx)(o,{viewBox:"0 0 24 24",children:(0,t.jsx)("polyline",{points:"20 6 9 17 4 12"})})})]})});i.I4.label`
  && {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    text-align: left;
    border-radius: 0.5rem;
    border: 1px solid var(--privy-color-foreground-4);
    width: 100%;
  }
`;let a=i.I4.div`
  display: inline-block;
  vertical-align: middle;
`,o=i.I4.svg`
  fill: none;
  stroke: white;
  stroke-width: 3px;
`,l=i.I4.input.attrs({type:"checkbox"})`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`,c=i.I4.div`
  display: inline-block;
  width: 18px;
  height: 18px;
  transition: all 150ms;
  cursor: pointer;
  border-color: ${e=>e.color};
  border-radius: 3px;
  background: ${e=>e.checked?e.color:"var(--privy-color-background)"};

  && {
    /* This is necessary to override css reset for border width */
    border-width: 1px;
  }

  ${l}:focus + & {
    box-shadow: 0 0 0 1px ${e=>e.color};
  }

  ${o} {
    visibility: ${e=>e.checked?"visible":"hidden"};
  }
`},99788:(e,r,n)=>{n.d(r,{B:()=>s,a:()=>i});var t=n(20031);let i=(0,t.AH)`
  && {
    border-width: 1px;
    padding: 0.5rem 1rem;
  }

  width: 100%;
  text-align: left;
  border: solid 1px var(--privy-color-foreground-4);
  border-radius: var(--privy-border-radius-md);
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${e=>"error"===e.$state?"\n        border-color: var(--privy-color-error);\n        background: var(--privy-color-error-bg);\n      ":""}
`,s=t.I4.div`
  ${i}
`}}]);