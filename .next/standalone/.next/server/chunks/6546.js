"use strict";exports.id=6546,exports.ids=[6546],exports.modules={258:(a,b,c)=>{c.d(b,{A:()=>d});let d=(0,c(6101).A)("triangle-alert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]])},6101:(a,b,c)=>{c.d(b,{A:()=>i});var d=c(38301);let e=a=>{let b=a.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,b,c)=>c?c.toUpperCase():b.toLowerCase());return b.charAt(0).toUpperCase()+b.slice(1)},f=(...a)=>a.filter((a,b,c)=>!!a&&""!==a.trim()&&c.indexOf(a)===b).join(" ").trim();var g={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let h=(0,d.forwardRef)(({color:a="currentColor",size:b=24,strokeWidth:c=2,absoluteStrokeWidth:e,className:h="",children:i,iconNode:j,...k},l)=>(0,d.createElement)("svg",{ref:l,...g,width:b,height:b,stroke:a,strokeWidth:e?24*Number(c)/Number(b):c,className:f("lucide",h),...!i&&!(a=>{for(let b in a)if(b.startsWith("aria-")||"role"===b||"title"===b)return!0})(k)&&{"aria-hidden":"true"},...k},[...j.map(([a,b])=>(0,d.createElement)(a,b)),...Array.isArray(i)?i:[i]])),i=(a,b)=>{let c=(0,d.forwardRef)(({className:c,...g},i)=>(0,d.createElement)(h,{ref:i,iconNode:b,className:f(`lucide-${e(a).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${a}`,c),...g}));return c.displayName=e(a),c}},9050:(a,b,c)=>{c.d(b,{R:()=>f,a:()=>e});var d=c(78858);let e=d.I4.span`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  width: 100%;
`,f=d.I4.span`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 0.5rem;
`},24402:(a,b,c)=>{c.d(b,{W:()=>u});var d=c(21124),e=c(28121),f=c(92584),g=c(38301),h=c(78858),i=c(7797),j=c(52481),k=c(59702),l=c(61330),m=c(29494);let n=(0,h.I4)(m.B)`
  && {
    padding: 0.75rem;
    height: 56px;
  }
`,o=h.I4.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`,p=h.I4.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`,q=h.I4.div`
  font-size: 12px;
  line-height: 1rem;
  color: var(--privy-color-foreground-3);
`,r=(0,h.I4)(k.L)`
  text-align: left;
  margin-bottom: 0.5rem;
`,s=(0,h.I4)(j.E)`
  margin-top: 0.25rem;
`,t=(0,h.I4)(i.S)`
  && {
    gap: 0.375rem;
    font-size: 14px;
  }
`,u=({errMsg:a,balance:b,address:c,className:h,title:i,showCopyButton:j=!1})=>{let[k,m]=(0,g.useState)(!1);return(0,g.useEffect)(()=>{if(k){let a=setTimeout(()=>m(!1),3e3);return()=>clearTimeout(a)}},[k]),(0,d.jsxs)("div",{children:[i&&(0,d.jsx)(r,{children:i}),(0,d.jsx)(n,{className:h,$state:a?"error":void 0,children:(0,d.jsxs)(o,{children:[(0,d.jsxs)(p,{children:[(0,d.jsx)(l.A,{address:c,showCopyIcon:!1}),void 0!==b&&(0,d.jsx)(q,{children:b})]}),j&&(0,d.jsx)(t,{onClick:function(a){a.stopPropagation(),navigator.clipboard.writeText(c).then(()=>m(!0)).catch(console.error)},size:"sm",children:(0,d.jsxs)(d.Fragment,k?{children:["Copied",(0,d.jsx)(e.A,{size:14})]}:{children:["Copy",(0,d.jsx)(f.A,{size:14})]})})]})}),a&&(0,d.jsx)(s,{children:a})]})}},28121:(a,b,c)=>{c.d(b,{A:()=>d});let d=(0,c(6101).A)("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]])},29054:(a,b,c)=>{c.d(b,{NJ:()=>h,vj:()=>g,vz:()=>f});var d=c(78327),e=c(29808);function f(a){return a?`${a.slice(0,5)}…${a.slice(-4)}`:""}function g({wei:a,precision:b=3}){return parseFloat((0,d.c)(a)).toFixed(b).replace(/0+$/,"").replace(/\.$/,"")}function h({amount:a,decimals:b}){return(0,e.J)(BigInt(a),b)}},29494:(a,b,c)=>{c.d(b,{B:()=>f,a:()=>e});var d=c(78858);let e=(0,d.AH)`
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

  ${a=>"error"===a.$state?"\n        border-color: var(--privy-color-error);\n        background: var(--privy-color-error-bg);\n      ":""}
`,f=d.I4.div`
  ${e}
`},29725:(a,b,c)=>{c.d(b,{A:()=>e});var d=c(38301);let e=d.forwardRef(function({title:a,titleId:b,...c},e){return d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:e,"aria-labelledby":b},c),a?d.createElement("title",{id:b},a):null,d.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"}))})},34022:(a,b,c)=>{c.d(b,{A:()=>d});let d=(0,c(6101).A)("lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]])},35948:(a,b,c)=>{c.d(b,{T:()=>e});var d=c(78858);let e=d.I4.span`
  color: var(--privy-color-foreground);
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.875rem; /* 166.667% */
  text-align: center;
`},45470:(a,b,c)=>{c.d(b,{C:()=>g,S:()=>f});var d=c(21124),e=c(78858);let f=({title:a,description:b,children:c,...e})=>(0,d.jsx)(h,{...e,children:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("h3",{children:a}),"string"==typeof b?(0,d.jsx)("p",{children:b}):b,c]})});(0,e.I4)(f)`
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
`},47275:(a,b,c)=>{c.d(b,{E:()=>g});var d=c(21124),e=c(29725),f=c(78858);let g=({children:a,theme:b})=>(0,d.jsxs)(h,{$theme:b,children:[(0,d.jsx)(e.A,{width:"20px",height:"20px",color:"var(--privy-color-icon-error)",strokeWidth:2,style:{flexShrink:0}}),(0,d.jsx)(i,{$theme:b,children:a})]}),h=f.I4.div`
  display: flex;
  gap: 0.75rem;
  background-color: var(--privy-color-error-bg);
  align-items: flex-start;
  padding: 1rem;
  border-radius: 0.75rem;
`,i=f.I4.div`
  color: ${a=>"dark"===a.$theme?"var(--privy-color-foreground-2)":"var(--privy-color-foreground)"};
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  flex: 1;
  text-align: left;
`},48365:(a,b,c)=>{c.d(b,{S:()=>Q,T:()=>$,a:()=>R});var d=c(21124),e=c(38301);let f=e.forwardRef(function({title:a,titleId:b,...c},d){return e.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:d,"aria-labelledby":b},c),a?e.createElement("title",{id:b},a):null,e.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"}))});var g=c(50987);let h=e.forwardRef(function({title:a,titleId:b,...c},d){return e.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:d,"aria-labelledby":b},c),a?e.createElement("title",{id:b},a):null,e.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"}))});var i=c(78858),j=c(29054),k=c(7797),l=c(93588),m=c(9050),n=c(52481),o=c(59702),p=c(77911),q=c(35948),r=c(61330),s=c(24402),t=c(64317),u=c(99848),v=c(91887),w=c(22224),x=c(29494),y=c(67132),z=c(47275),A=c(90536),B=c(90441);let C=e.forwardRef(function({title:a,titleId:b,...c},d){return e.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:d,"aria-labelledby":b},c),a?e.createElement("title",{id:b},a):null,e.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"}))});var D=c(29725),E=c(57348),F=c(87230);let G=(0,i.I4)(l.L)`
  cursor: pointer;
  display: inline-flex;
  gap: 8px;
  align-items: center;
  color: var(--privy-color-accent);
  svg {
    fill: var(--privy-color-accent);
  }
`;var H=({iconUrl:a,value:b,symbol:c,usdValue:e,nftName:f,nftCount:g,decimals:h,$isLoading:i})=>{if(i)return(0,d.jsx)(I,{$isLoading:i});let j=b&&e&&h?function(a,b,c){let d=parseFloat(a),e=parseFloat(c);if(0===d||0===e||Number.isNaN(d)||Number.isNaN(e))return a;let f=Math.ceil(-Math.log10(.01/(e/d))),g=Math.pow(10,f=Math.max(f=Math.min(f,b),1)),h=+(Math.floor(d*g)/g).toFixed(f).replace(/\.?0+$/,"");return Intl.NumberFormat(void 0,{maximumFractionDigits:b}).format(h)}(b,h,e):b;return(0,d.jsxs)("div",{children:[(0,d.jsxs)(I,{$isLoading:i,children:[a&&(0,d.jsx)(K,{src:a,alt:"Token icon"}),g&&g>1?g+"x":void 0," ",f,j," ",c]}),e&&(0,d.jsxs)(J,{$isLoading:i,children:["$",e]})]})};let I=i.I4.span`
  color: var(--privy-color-foreground);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.375rem;
  word-break: break-all;
  text-align: right;
  display: flex;
  justify-content: flex-end;

  ${v.L}
`,J=i.I4.span`
  color: var(--privy-color-foreground-2);
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  word-break: break-all;
  text-align: right;
  display: flex;
  justify-content: flex-end;

  ${v.L}
`,K=i.I4.img`
  height: 14px;
  width: 14px;
  margin-right: 4px;
  object-fit: contain;
`,L=a=>{let{chain:b,transactionDetails:c,isTokenContractInfoLoading:e,symbol:f}=a,{action:g,functionName:h}=c;return(0,d.jsx)(x.B,{children:(0,d.jsxs)(m.a,{children:["transaction"!==g&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Action"}),(0,d.jsx)(l.V,{children:h})]}),"mint"===h&&"args"in c&&c.args.filter(a=>a).map((a,c)=>(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:`Param ${c}`}),(0,d.jsx)(l.V,{children:"string"==typeof a&&(0,w.P)(a)?(0,d.jsx)(r.A,{address:a,url:b?.blockExplorers?.default?.url,showCopyIcon:!1}):a?.toString()})]},c)),"setApprovalForAll"===h&&c.operator&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Operator"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:c.operator,url:b?.blockExplorers?.default?.url,showCopyIcon:!1})})]}),"setApprovalForAll"===h&&void 0!==c.approved&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Set approval to"}),(0,d.jsx)(l.V,{children:c.approved?"true":"false"})]}),"transfer"===h||"transferWithMemo"===h||"transferFrom"===h||"safeTransferFrom"===h||"approve"===h?(0,d.jsxs)(d.Fragment,{children:["formattedAmount"in c&&c.formattedAmount&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Amount"}),(0,d.jsxs)(l.V,{$isLoading:e,children:[c.formattedAmount," ",f]})]}),"tokenId"in c&&c.tokenId&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Token ID"}),(0,d.jsx)(l.V,{children:c.tokenId.toString()})]})]}):null,"safeBatchTransferFrom"===h&&(0,d.jsxs)(d.Fragment,{children:["amounts"in c&&c.amounts&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Amounts"}),(0,d.jsx)(l.V,{children:c.amounts.join(", ")})]}),"tokenIds"in c&&c.tokenIds&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Token IDs"}),(0,d.jsx)(l.V,{children:c.tokenIds.join(", ")})]})]}),"approve"===h&&c.spender&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Spender"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:c.spender,url:b?.blockExplorers?.default?.url,showCopyIcon:!1})})]}),("transferFrom"===h||"safeTransferFrom"===h||"safeBatchTransferFrom"===h)&&c.transferFrom&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Transferring from"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:c.transferFrom,url:b?.blockExplorers?.default?.url,showCopyIcon:!1})})]}),("transferFrom"===h||"safeTransferFrom"===h||"safeBatchTransferFrom"===h)&&c.transferTo&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Transferring to"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:c.transferTo,url:b?.blockExplorers?.default?.url,showCopyIcon:!1})})]})]})})},M=({variant:a,setPreventMaliciousTransaction:b,colorScheme:c="light",preventMaliciousTransaction:e})=>"warn"===a?(0,d.jsx)(N,{children:(0,d.jsxs)(A.W,{theme:c,children:[(0,d.jsx)("span",{style:{fontWeight:"500"},children:"Warning: Suspicious transaction"}),(0,d.jsx)("br",{}),"This has been flagged as a potentially deceptive request. Approving could put your assets or funds at risk."]})}):"error"===a?(0,d.jsx)(d.Fragment,{children:(0,d.jsxs)(N,{children:[(0,d.jsx)(z.E,{theme:c,children:(0,d.jsxs)("div",{children:[(0,d.jsx)("strong",{children:"This is a malicious transaction"}),(0,d.jsx)("br",{}),"This transaction transfers tokens to a known malicious address. Proceeding may result in the loss of valuable assets."]})}),(0,d.jsxs)(O,{children:[(0,d.jsx)(y.C,{color:"var(--privy-color-error)",checked:!e,readOnly:!0,onClick:()=>b(!e)}),(0,d.jsx)("span",{children:"I understand and want to proceed anyways."})]})]})}):null,N=i.I4.div`
  margin-top: 1.5rem;
`,O=i.I4.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
`,P=({transactionIndex:a,maxIndex:b})=>"number"!=typeof a||0===b?"":` (${a+1} / ${b+1})`,Q=({img:a,submitError:b,prepareError:c,onClose:i,action:j,title:o,subtitle:s,to:v,tokenAddress:w,network:x,missingFunds:y,fee:z,from:A,cta:B,disabled:C,chain:D,isSubmitting:E,isPreparing:F,isTokenPriceLoading:I,isTokenContractInfoLoading:J,isSponsored:K,symbol:N,balance:O,onClick:Q,transactionDetails:R,transactionIndex:T,maxIndex:Y,onBack:Z,chainName:$,validation:_,hasScanDetails:aa,setIsScanDetailsOpen:ab,preventMaliciousTransaction:ac,setPreventMaliciousTransaction:ad,tokensSent:ae,tokensReceived:af,isScanning:ag,isCancellable:ah,functionName:ai})=>{let{showTransactionDetails:aj,setShowTransactionDetails:ak,hasMoreDetails:al,isErc20Ish:am}=(a=>{let[b,c]=(0,e.useState)(!1),d=!0,f=!1;return(!a||a.isErc20Ish||"transaction"===a.action)&&(d=!1),d&&(f=Object.entries(a||{}).some(([a,b])=>b&&!["action","isErc20Ish","isNFTIsh"].includes(a))),{showTransactionDetails:b,setShowTransactionDetails:c,hasMoreDetails:d&&f,isErc20Ish:a?.isErc20Ish}})(R),an=(0,t.u)(),ao=am&&J||F||I||ag;return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(k.M,{onClose:i,backFn:Z}),a&&(0,d.jsx)(V,{children:a}),(0,d.jsxs)(q.T,{style:{marginTop:a?"1.5rem":0},children:[o,(0,d.jsx)(P,{maxIndex:Y,transactionIndex:T})]}),(0,d.jsx)(p.S,{children:s}),(0,d.jsxs)(m.a,{style:{marginTop:"2rem"},children:[(!!ae[0]||ao)&&(0,d.jsxs)(m.R,{children:[af.length>0?(0,d.jsx)(l.L,{children:"Send"}):(0,d.jsx)(l.L,{children:"approve"===j?"Approval amount":"Amount"}),(0,d.jsx)("div",{className:"flex flex-col",children:ae.map((a,b)=>(0,d.jsx)(H,{iconUrl:a.iconUrl,value:"setApprovalForAll"===ai?"All":a.value,usdValue:a.usdValue,symbol:a.symbol,nftName:a.nftName,nftCount:a.nftCount,decimals:a.decimals},b))})]}),af.length>0&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Receive"}),(0,d.jsx)("div",{className:"flex flex-col",children:af.map((a,b)=>(0,d.jsx)(H,{iconUrl:a.iconUrl,value:a.value,usdValue:a.usdValue,symbol:a.symbol,nftName:a.nftName,nftCount:a.nftCount,decimals:a.decimals},b))})]}),R&&"spender"in R&&R?.spender?(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Spender"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:R.spender,url:D?.blockExplorers?.default?.url})})]}):null,v&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"To"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:v,url:D?.blockExplorers?.default?.url,showCopyIcon:!0})})]}),w&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Token address"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:w,url:D?.blockExplorers?.default?.url})})]}),(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Network"}),(0,d.jsx)(l.V,{children:x})]}),(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Estimated fee"}),(0,d.jsx)(l.V,{$isLoading:F||I||void 0===K,children:K?(0,d.jsxs)(W,{children:[(0,d.jsxs)(X,{children:["Sponsored by ",an.name]}),(0,d.jsx)(f,{height:16,width:16})]}):z})]}),al&&!aa&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(m.R,{className:"cursor-pointer",onClick:()=>ak(!aj),children:(0,d.jsxs)(l.a,{className:"flex items-center gap-x-1",children:["Details"," ",(0,d.jsx)(g.A,{style:{width:"0.75rem",marginLeft:"0.25rem",transform:aj?"rotate(180deg)":void 0}})]})}),aj&&R&&(0,d.jsx)(L,{action:j,chain:D,transactionDetails:R,isTokenContractInfoLoading:J,symbol:N})]}),aa&&(0,d.jsx)(m.R,{children:(0,d.jsxs)(G,{onClick:()=>ab(!0),children:[(0,d.jsx)("span",{className:"text-color-primary",children:"Details"}),(0,d.jsx)(h,{height:"14px",width:"14px",strokeWidth:"2"})]})})]}),(0,d.jsx)(u.G,{}),b?(0,d.jsx)(n.E,{style:{marginTop:"2rem"},children:b.message}):c&&0===T?(0,d.jsx)(n.E,{style:{marginTop:"2rem"},children:c.shortMessage??U}):null,(0,d.jsx)(M,{variant:_,preventMaliciousTransaction:ac,setPreventMaliciousTransaction:ad}),(0,d.jsx)(S,{$useSmallMargins:!(!c&&!b&&"warn"!==_&&"error"!==_),address:A,balance:O,errMsg:F||c||b||!y?void 0:`Add funds on ${D?.name??$} to complete transaction.`}),(0,d.jsx)(k.P,{style:{marginTop:"1rem"},loading:E,disabled:C||F,onClick:Q,children:B}),ah&&(0,d.jsx)(k.E,{style:{marginTop:"1rem"},onClick:i,isSubmitting:!1,children:"Not now"}),(0,d.jsx)(k.B,{})]})},R=({img:a,title:b,subtitle:c,cta:h,instructions:i,network:s,blockExplorerUrl:v,isMissingFunds:w,submitError:x,parseError:y,total:z,swap:A,transactingWalletAddress:B,fee:C,balance:D,disabled:E,isSubmitting:F,isPreparing:H,isTokenPriceLoading:I,onClick:J,onClose:K,onBack:L,isSponsored:M})=>{let N=H||I,[O,P]=(0,e.useState)(!1),Q=(0,t.u)();return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(k.M,{onClose:K,backFn:L}),a&&(0,d.jsx)(V,{children:a}),(0,d.jsx)(q.T,{style:{marginTop:a?"1.5rem":0},children:b}),(0,d.jsx)(p.S,{children:c}),(0,d.jsxs)(m.a,{style:{marginTop:"2rem",marginBottom:".5rem"},children:[(z||N)&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Amount"}),(0,d.jsx)(l.V,{$isLoading:N,children:z})]}),A&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Swap"}),(0,d.jsx)(l.V,{children:A})]}),s&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Network"}),(0,d.jsx)(l.V,{children:s})]}),(C||N||void 0!==M)&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Estimated fee"}),(0,d.jsx)(l.V,{$isLoading:N,children:M&&!N?(0,d.jsxs)(W,{children:[(0,d.jsxs)(X,{children:["Sponsored by ",Q.name]}),(0,d.jsx)(f,{height:16,width:16})]}):C})]})]}),(0,d.jsx)(m.R,{children:(0,d.jsxs)(G,{onClick:()=>P(a=>!a),children:[(0,d.jsx)("span",{children:"Advanced"}),(0,d.jsx)(g.A,{height:"16px",width:"16px",strokeWidth:"2",style:{transition:"all 300ms",transform:O?"rotate(180deg)":void 0}})]})}),O&&(0,d.jsx)(d.Fragment,{children:i.map((a,b)=>"sol-transfer"===a.type?(0,d.jsxs)(T,{children:[(0,d.jsx)(m.R,{children:(0,d.jsxs)(o.L,{children:["Transfer ",a.withSeed?"with seed":""]})}),(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Amount"}),(0,d.jsxs)(l.V,{children:[(0,j.NJ)({amount:a.value,decimals:a.token.decimals})," ",a.token.symbol]})]}),!!a.toAccount&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Destination"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:a.toAccount,url:v})})]})]},b):"spl-transfer"===a.type?(0,d.jsxs)(T,{children:[(0,d.jsx)(m.R,{children:(0,d.jsxs)(o.L,{children:["Transfer ",a.token.symbol]})}),(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Amount"}),(0,d.jsx)(l.V,{children:a.value.toString()})]}),!!a.fromAta&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Source"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:a.fromAta,url:v})})]}),!!a.toAta&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Destination"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:a.toAta,url:v})})]}),!!a.token.address&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Token"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:a.token.address,url:v})})]})]},b):"ata-creation"===a.type?(0,d.jsxs)(T,{children:[(0,d.jsx)(m.R,{children:(0,d.jsx)(o.L,{children:"Create token account"})}),(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Program ID"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:a.program,url:v})})]}),!!a.owner&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Owner"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:a.owner,url:v})})]})]},b):"create-account"===a.type?(0,d.jsxs)(T,{children:[(0,d.jsx)(m.R,{children:(0,d.jsxs)(o.L,{children:["Create account ",a.withSeed?"with seed":""]})}),!!a.account&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Account"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:a.account,url:v})})]}),(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Amount"}),(0,d.jsxs)(l.V,{children:[(0,j.NJ)({amount:a.value,decimals:9})," SOL"]})]})]},b):"spl-init-account"===a.type?(0,d.jsxs)(T,{children:[(0,d.jsx)(m.R,{children:(0,d.jsx)(o.L,{children:"Initialize token account"})}),!!a.account&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Account"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:a.account,url:v})})]}),!!a.mint&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Mint"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:a.mint,url:v})})]}),!!a.owner&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Owner"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:a.owner,url:v})})]})]},b):"spl-close-account"===a.type?(0,d.jsxs)(T,{children:[(0,d.jsx)(m.R,{children:(0,d.jsx)(o.L,{children:"Close token account"})}),!!a.source&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Source"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:a.source,url:v})})]}),!!a.destination&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Destination"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:a.destination,url:v})})]}),!!a.owner&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Owner"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:a.owner,url:v})})]})]},b):"spl-sync-native"===a.type?(0,d.jsxs)(T,{children:[(0,d.jsx)(m.R,{children:(0,d.jsx)(o.L,{children:"Sync native"})}),(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Program ID"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:a.program,url:v})})]})]},b):"raydium-swap-base-input"===a.type?(0,d.jsxs)(T,{children:[(0,d.jsx)(m.R,{children:(0,d.jsxs)(o.L,{children:["Raydium swap"," ",a.tokenIn&&a.tokenOut?`${a.tokenIn.symbol} → ${a.tokenOut.symbol}`:""]})}),(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Amount in"}),(0,d.jsx)(l.V,{children:a.amountIn.toString()})]}),(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Minimum amount out"}),(0,d.jsx)(l.V,{children:a.minimumAmountOut.toString()})]}),a.mintIn&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Token in"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:a.mintIn,url:v})})]}),a.mintOut&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Token out"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:a.mintOut,url:v})})]})]},b):"raydium-swap-base-output"===a.type?(0,d.jsxs)(T,{children:[(0,d.jsx)(m.R,{children:(0,d.jsxs)(o.L,{children:["Raydium swap"," ",a.tokenIn&&a.tokenOut?`${a.tokenIn.symbol} → ${a.tokenOut.symbol}`:""]})}),(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Max amount in"}),(0,d.jsx)(l.V,{children:a.maxAmountIn.toString()})]}),(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Amount out"}),(0,d.jsx)(l.V,{children:a.amountOut.toString()})]}),a.mintIn&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Token in"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:a.mintIn,url:v})})]}),a.mintOut&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Token out"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:a.mintOut,url:v})})]})]},b):"jupiter-swap-shared-accounts-route"===a.type?(0,d.jsxs)(T,{children:[(0,d.jsx)(m.R,{children:(0,d.jsxs)(o.L,{children:["Jupiter swap"," ",a.tokenIn&&a.tokenOut?`${a.tokenIn.symbol} → ${a.tokenOut.symbol}`:""]})}),(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"In amount"}),(0,d.jsx)(l.V,{children:a.inAmount.toString()})]}),(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Quoted out amount"}),(0,d.jsx)(l.V,{children:a.quotedOutAmount.toString()})]}),a.mintIn&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Token in"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:a.mintIn,url:v})})]}),a.mintOut&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Token out"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:a.mintOut,url:v})})]})]},b):"jupiter-swap-exact-out-route"===a.type?(0,d.jsxs)(T,{children:[(0,d.jsx)(m.R,{children:(0,d.jsxs)(o.L,{children:["Jupiter swap"," ",a.tokenIn&&a.tokenOut?`${a.tokenIn.symbol} → ${a.tokenOut.symbol}`:""]})}),(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Quoted in amount"}),(0,d.jsx)(l.V,{children:a.quotedInAmount.toString()})]}),(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Amount out"}),(0,d.jsx)(l.V,{children:a.outAmount.toString()})]}),a.mintIn&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Token in"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:a.mintIn,url:v})})]}),a.mintOut&&(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Token out"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:a.mintOut,url:v})})]})]},b):(0,d.jsxs)(T,{children:[(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Program ID"}),(0,d.jsx)(l.V,{children:(0,d.jsx)(r.A,{address:a.program,url:v})})]}),(0,d.jsxs)(m.R,{children:[(0,d.jsx)(l.L,{children:"Data"}),(0,d.jsx)(l.V,{children:a.discriminator})]})]},b))}),(0,d.jsx)(u.G,{}),x?(0,d.jsx)(n.E,{style:{marginTop:"2rem"},children:x.message}):y?(0,d.jsx)(n.E,{style:{marginTop:"2rem"},children:U}):null,(0,d.jsx)(S,{$useSmallMargins:!(!y&&!x),title:"",address:B,balance:D,errMsg:H||y||x||!w?void 0:"Add funds on Solana to complete transaction."}),(0,d.jsx)(k.P,{style:{marginTop:"1rem"},loading:F,disabled:E||H,onClick:J,children:h}),(0,d.jsx)(k.B,{})]})},S=(0,i.I4)(s.W)`
  ${a=>a.$useSmallMargins?"margin-top: 0.5rem;":"margin-top: 2rem;"}
`,T=(0,i.I4)(m.a)`
  margin-top: 0.5rem;
  border: 1px solid var(--privy-color-foreground-4);
  border-radius: var(--privy-border-radius-sm);
  padding: 0.5rem;
`,U="There was an error preparing your transaction. Your transaction request will likely fail.",V=i.I4.div`
  display: flex;
  width: 100%;
  justify-content: center;
  max-height: 40px;

  > img {
    object-fit: contain;
    border-radius: var(--privy-border-radius-sm);
  }
`,W=i.I4.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
`,X=i.I4.span`
  font-size: 14px;
  font-weight: 500;
  color: var(--privy-color-foreground);
`,Y=a=>a?.code===E.s.COMPLIANCE_BLOCKED,Z=()=>(0,d.jsxs)(ac,{children:[(0,d.jsx)(ae,{}),(0,d.jsx)(ad,{})]}),$=({transactionError:a,chainId:b,onClose:c,onRetry:f,chainType:g,transactionHash:h})=>{let{chains:i}=(0,F.u)(),[j,l]=(0,e.useState)(!1),{errorCode:m,errorMessage:n}=((a,b)=>{if("ethereum"===b)return Y(a)?{errorCode:"Transaction blocked",errorMessage:a.message}:{errorCode:a.details??a.message,errorMessage:a.shortMessage};let c=a.txSignature,d=a?.transactionMessage||"Something went wrong.";if(Array.isArray(a.logs)){let b=a.logs.find(a=>/insufficient (lamports|funds)/gi.test(a));b&&(d=b)}return{transactionHash:c,errorMessage:d}})(a,g),o=Y(a),p=(({chains:a,chainId:b,chainType:c,transactionHash:d})=>{var e;return"ethereum"===c?a.find(a=>a.id===b)?.blockExplorers?.default.url??"https://etherscan.io":(e=d||"",`https://explorer.solana.com/tx/${e}?chain=${b}`)})({chains:i,chainId:b,chainType:g,transactionHash:h});return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(k.M,{onClose:c}),(0,d.jsxs)(_,{children:[(0,d.jsx)(Z,{}),(0,d.jsx)(aa,{children:m}),(0,d.jsx)(ab,{children:o?"This transaction cannot be completed.":"Please try again."}),(0,d.jsxs)(ah,{children:[(0,d.jsx)(ag,{children:"Error message"}),(0,d.jsx)(aj,{$clickable:!1,children:n})]}),h&&(0,d.jsxs)(ah,{children:[(0,d.jsx)(ag,{children:"Transaction hash"}),(0,d.jsxs)(ai,{children:["Copy this hash to view details about the transaction on a"," ",(0,d.jsx)("u",{children:(0,d.jsx)("a",{href:p,children:"block explorer"})}),"."]}),(0,d.jsxs)(aj,{$clickable:!0,onClick:async()=>{await navigator.clipboard.writeText(h),l(!0)},children:[h,(0,d.jsx)(am,{clicked:j})]})]}),!o&&(0,d.jsx)(af,{onClick:()=>f({resetNonce:!!h}),children:"Retry transaction"})]}),(0,d.jsx)(k.b,{})]})},_=i.I4.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`,aa=i.I4.span`
  color: var(--privy-color-foreground);
  text-align: center;
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.25rem; /* 111.111% */
  text-align: center;
  margin: 10px;
`,ab=i.I4.span`
  margin-top: 4px;
  margin-bottom: 10px;
  color: var(--privy-color-foreground-3);
  text-align: center;

  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.008px;
`,ac=i.I4.div`
  position: relative;
  width: 60px;
  height: 60px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`,ad=(0,i.I4)(D.A)`
  position: absolute;
  width: 35px;
  height: 35px;
  color: var(--privy-color-error);
`,ae=i.I4.div`
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--privy-color-error);
  opacity: 0.1;
`,af=(0,i.I4)(k.P)`
  && {
    margin-top: 24px;
  }
  transition:
    color 350ms ease,
    background-color 350ms ease;
`,ag=i.I4.span`
  width: 100%;
  text-align: left;
  font-size: 0.825rem;
  color: var(--privy-color-foreground);
  padding: 4px;
`,ah=i.I4.div`
  width: 100%;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`,ai=i.I4.text`
  position: relative;
  width: 100%;
  padding: 5px;
  font-size: 0.8rem;
  color: var(--privy-color-foreground-3);
  text-align: left;
  word-wrap: break-word;
`,aj=i.I4.span`
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
  ${a=>a.$clickable&&"cursor: pointer;\n  transition: background-color 0.3s;\n  padding-right: 45px;\n\n  &:hover {\n    background-color: var(--privy-color-foreground-4);\n  }"}
`,ak=(0,i.I4)(C)`
  position: absolute;
  top: 13px;
  right: 13px;
  width: 24px;
  height: 24px;
`,al=(0,i.I4)(B.A)`
  position: absolute;
  top: 13px;
  right: 13px;
  width: 24px;
  height: 24px;
`,am=({clicked:a})=>(0,d.jsx)(a?al:ak,{})},51169:(a,b,c)=>{c.r(b),c.d(b,{ErrorScreen:()=>p,ErrorScreenView:()=>o,default:()=>p});var d=c(21124),e=c(258);let f=(0,c(6101).A)("phone",[["path",{d:"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",key:"9njp5v"}]]);var g=c(34022),h=c(78858),i=c(64317),j=c(95761),k=c(87230),l=c(23966),m=c(84454),n=c(74995);c(38301),c(22967),c(18521),c(32571),c(21398),c(61946);let o=({error:a,allowlistConfig:b,onRetry:c,onCaptchaReset:h,onBack:i})=>{let l=((a,b)=>{if(a instanceof m.R)return{title:"Transaction failed",detail:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("span",{children:a.message}),(0,d.jsxs)("span",{children:[" ","Check the"," ",(0,d.jsx)(q,{href:a.relayLink,target:"_blank",children:"refund status"}),"."]})]}),ctaText:"Try again",icon:e.A};if(a instanceof k.b)switch(a.privyErrorCode){case k.c.CLIENT_REQUEST_TIMEOUT:return{title:"Timed out",detail:a.message,ctaText:"Try again",icon:e.A};case k.c.INSUFFICIENT_BALANCE:return{title:"Insufficient balance",detail:a.message,ctaText:"Try again",icon:e.A};case k.c.TRANSACTION_FAILURE:return{title:"Transaction failure",detail:a.message,ctaText:"Try again",icon:e.A};default:return{title:"Something went wrong",detail:"Try again later",ctaText:"Try again",icon:e.A}}if(a instanceof j.P&&"twilio_verification_failed"===a.type)return{title:"Something went wrong",detail:a.message,ctaText:"Try again",icon:f};if(!(a instanceof k.g))return a instanceof k.e&&a.status&&[400,422].includes(a.status)?{title:"Something went wrong",detail:a.message,ctaText:"Try again",icon:e.A}:{title:"Something went wrong",detail:"Try again later",ctaText:"Try again",icon:e.A};switch(a.privyErrorCode){case k.c.INVALID_CAPTCHA:return{title:"Something went wrong",detail:"Please try again.",ctaText:"Try again",icon:e.A};case k.c.DISALLOWED_LOGIN_METHOD:return{title:"Not allowed",detail:a.message,ctaText:"Try another method",icon:e.A};case k.c.ALLOWLIST_REJECTED:return{title:b.errorTitle||"You don't have access to this app",detail:b.errorDetail||"Have you been invited?",ctaText:b.errorCtaText||"Try another account",icon:g.A};case k.c.CAPTCHA_FAILURE:return{title:"Something went wrong",detail:"You did not pass CAPTCHA. Please try again.",ctaText:"Try again",icon:null};case k.c.CAPTCHA_TIMEOUT:return{title:"Something went wrong",detail:"Something went wrong! Please try again later.",ctaText:"Try again",icon:null};case k.c.LINKED_TO_ANOTHER_USER:return{title:"Authentication failed",detail:"This account has already been linked to another user.",ctaText:"Try again",icon:e.A};case k.c.NOT_SUPPORTED:return{title:"This region is not supported",detail:"SMS authentication from this region is not available",ctaText:"Try another method",icon:e.A};case k.c.TOO_MANY_REQUESTS:return{title:"Request failed",detail:"Too many attempts.",ctaText:"Try again later",icon:e.A};default:return{title:"Something went wrong",detail:"Try again later",ctaText:"Try again",icon:e.A}}})(a,b);return(0,d.jsx)(n.S,{title:l.title,subtitle:l.detail,icon:l.icon,onBack:i,iconVariant:"error",primaryCta:{label:l.ctaText,onClick:()=>{a instanceof k.g&&(a.privyErrorCode===k.c.INVALID_CAPTCHA&&h?.(),a.privyErrorCode===k.c.ALLOWLIST_REJECTED&&b.errorCtaLink)?window.location.href=b.errorCtaLink:c?.()},variant:"error"},watermark:!0})},p={component:()=>{let{navigate:a,data:b,lastScreen:c,currentScreen:e}=(0,l.a)(),f=(0,i.u)(),{reset:g}=(0,j.a)(),h=b?.errorModalData?.previousScreen||(c===e?void 0:c);return(0,d.jsx)(o,{error:b?.errorModalData?.error||Error(),allowlistConfig:f.allowlistConfig,onRetry:()=>{a(h||"LandingScreen",!1)},onCaptchaReset:g})}},q=h.I4.a`
  color: var(--privy-color-accent) !important;
  font-weight: 600;
`},52481:(a,b,c)=>{c.d(b,{E:()=>e});var d=c(78858);let e=d.I4.span`
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.125rem; /* 150% */

  color: var(--privy-color-error);
`},59702:(a,b,c)=>{c.d(b,{L:()=>e});var d=c(78858);let e=d.I4.span`
  color: var(--privy-color-foreground-3);
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.125rem; /* 150% */
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
`},67132:(a,b,c)=>{c.d(b,{C:()=>f});var d=c(21124),e=c(78858);let f=({className:a,checked:b,color:c="var(--privy-color-accent)",...e})=>(0,d.jsx)("label",{children:(0,d.jsxs)(g,{className:a,children:[(0,d.jsx)(i,{checked:b,...e}),(0,d.jsx)(j,{color:c,checked:b,children:(0,d.jsx)(h,{viewBox:"0 0 24 24",children:(0,d.jsx)("polyline",{points:"20 6 9 17 4 12"})})})]})});e.I4.label`
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
`;let g=e.I4.div`
  display: inline-block;
  vertical-align: middle;
`,h=e.I4.svg`
  fill: none;
  stroke: white;
  stroke-width: 3px;
`,i=e.I4.input.attrs({type:"checkbox"})`
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
`,j=e.I4.div`
  display: inline-block;
  width: 18px;
  height: 18px;
  transition: all 150ms;
  cursor: pointer;
  border-color: ${a=>a.color};
  border-radius: 3px;
  background: ${a=>a.checked?a.color:"var(--privy-color-background)"};

  && {
    /* This is necessary to override css reset for border width */
    border-width: 1px;
  }

  ${i}:focus + & {
    box-shadow: 0 0 0 1px ${a=>a.color};
  }

  ${h} {
    visibility: ${a=>a.checked?"visible":"hidden"};
  }
`},77911:(a,b,c)=>{c.d(b,{S:()=>e});var d=c(78858);let e=d.I4.span`
  margin-top: 4px;
  color: var(--privy-color-foreground);
  text-align: center;

  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.375rem; /* 157.143% */

  && a {
    color: var(--privy-color-accent);
  }
`},84454:(a,b,c)=>{c.d(b,{R:()=>r,a:()=>n,b:()=>g,c:()=>f,d:()=>o,e:()=>h,g:()=>m,t:()=>j,u:()=>q});var d=c(38301),e=c(87230);let f=0x2f3fb341,g="11111111111111111111111111111111",h="EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",i="0x0000000000000000000000000000000000000000",j=({appId:a,originCurrency:b,destinationCurrency:c,...d})=>({tradeType:"EXPECTED_OUTPUT",originCurrency:b??i,destinationCurrency:c??i,referrer:`privy|${a}`,...d}),k="https://api.relay.link",l="https://api.testnets.relay.link",m=async({input:a,isTestnet:b})=>{let c=await fetch((b?l:k)+"/quote",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),d=await c.json();if(!(c.ok||"string"==typeof d.message&&d.message.startsWith("Invalid address")))throw console.error("Relay error:",d),Error(d.message??"Error fetching quote from relay");return d},n=a=>{let b=a.steps[0]?.items?.[0];if(b)return{from:b.data.from,to:b.data.to,value:Number(b.data.value),chainId:Number(b.data.chainId),data:b.data.data}},o=a=>a.steps.flatMap(a=>a.items?.filter(a=>"incomplete"===a.status)??[]).map(a=>({from:a.data.from,to:a.data.to,value:Number(a.data.value),chainId:Number(a.data.chainId),data:a.data.data}));async function p({transactionHash:a,isTestnet:b}){let c=await fetch((b?l:k)+"/requests/v2?hash="+a),d=await c.json();if(!c.ok){if("message"in d&&"string"==typeof d.message)throw Error(d.message);throw Error("Error fetching request from relay")}return d.requests.at(0)?.status??"pending"}function q({transactionHash:a,isTestnet:b,bridgingStatus:c,setBridgingStatus:e,onSuccess:f,onFailure:g}){(0,d.useEffect)(()=>{if(a&&c){if(["delayed","waiting","pending"].includes(c)){let c=setInterval(async()=>{try{let c=await p({transactionHash:a,isTestnet:b});e(c)}catch(a){console.error(a)}},1e3);return()=>clearInterval(c)}"success"===c?f({transactionHash:a}):["refund","failure"].includes(c)&&g({error:new r(a,b)})}},[c,a,b])}class r extends e.b{constructor(a,b){super("We were unable to complete the bridging transaction. Funds will be refunded on your wallet.",void 0,e.c.TRANSACTION_FAILURE),this.relayLink=b?`https://testnets.relay.link/transaction/${a}`:`https://relay.link/transaction/${a}`}}},90441:(a,b,c)=>{c.d(b,{A:()=>e});var d=c(38301);let e=d.forwardRef(function({title:a,titleId:b,...c},e){return d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:e,"aria-labelledby":b},c),a?d.createElement("title",{id:b},a):null,d.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"}))})},90536:(a,b,c)=>{c.d(b,{W:()=>g});var d=c(21124),e=c(92073),f=c(78858);let g=({children:a,theme:b,className:c})=>(0,d.jsxs)(h,{$theme:b,className:c,children:[(0,d.jsx)(e.A,{width:"20px",height:"20px",color:"var(--privy-color-icon-warning)",strokeWidth:2,style:{flexShrink:0}}),(0,d.jsx)(i,{$theme:b,children:a})]}),h=f.I4.div`
  display: flex;
  gap: 0.75rem;
  background-color: var(--privy-color-warn-bg);
  align-items: flex-start;
  padding: 1rem;
  border-radius: 0.75rem;
`,i=f.I4.div`
  color: ${a=>"dark"===a.$theme?"var(--privy-color-foreground-2)":"var(--privy-color-foreground)"};
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  flex: 1;
  text-align: left;
`},91887:(a,b,c)=>{c.d(b,{L:()=>f});var d=c(78858);let e=(0,d.i7)`
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
`},92584:(a,b,c)=>{c.d(b,{A:()=>d});let d=(0,c(6101).A)("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]])},93588:(a,b,c)=>{c.d(b,{L:()=>f,V:()=>h,a:()=>g});var d=c(78858),e=c(91887);let f=d.I4.span`
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