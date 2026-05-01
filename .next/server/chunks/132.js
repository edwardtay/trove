"use strict";exports.id=132,exports.ids=[132],exports.modules={258:(a,b,c)=>{c.d(b,{A:()=>d});let d=(0,c(6101).A)("triangle-alert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]])},13668:(a,b,c)=>{c.d(b,{A:()=>d});let d=(0,c(6101).A)("wallet",[["path",{d:"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",key:"18etb6"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",key:"xoc0q4"}]])},20132:(a,b,c)=>{c.r(b),c.d(b,{FiatOnrampScreen:()=>$,default:()=>$});var d=c(21124),e=c(23966),f=c(95761),g=c(58407),h=c(84759),i=c(74995),j=c(21728),k=c(28121),l=c(6101);let m=(0,l.A)("credit-card",[["rect",{width:"20",height:"14",x:"2",y:"5",rx:"2",key:"ynyp8z"}],["line",{x1:"2",x2:"22",y1:"10",y2:"10",key:"1b3vmo"}]]);var n=c(93630);let o=(0,l.A)("building",[["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M12 6h.01",key:"1vi96p"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M16 6h.01",key:"1x0f13"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M8 6h.01",key:"1dz90k"}],["path",{d:"M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3",key:"cabbwy"}],["rect",{x:"4",y:"2",width:"16",height:"20",rx:"2",key:"1uxh74"}]]);var p=c(13668),q=c(258);let r=(0,l.A)("chevron-right",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]),s=(0,l.A)("landmark",[["path",{d:"M10 18v-7",key:"wt116b"}],["path",{d:"M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z",key:"1m329m"}],["path",{d:"M14 18v-7",key:"vav6t3"}],["path",{d:"M18 18v-7",key:"aexdmj"}],["path",{d:"M3 22h18",key:"8prr45"}],["path",{d:"M6 18v-7",key:"1ivflk"}]]);var t=c(78858),u=c(75031);c(38301),c(22967),c(18521),c(32571),c(21398),c(61946);let[v,w]=((a,b=750)=>{let c;return[(...d)=>{c&&clearTimeout(c),c=setTimeout(()=>{a(...d)},b)},()=>{c&&clearTimeout(c)}]})(async(a,b)=>{(0,f.I)({isLoading:!0});try{let{getQuotes:c}=(0,f.J)(),d=await c({source:{asset:b.source.selectedAsset.toUpperCase(),amount:a},destination:{asset:b.destination.asset.toUpperCase(),chain:b.destination.chain,address:b.destination.address},environment:b.environment}),e=d.quotes??[],g=d.provider_errors,h=(0,f.K)(e,a);(0,f.I)({localQuotes:e,localSelectedQuote:e[0]??null,isLoading:!1,quotesWarning:h,quotesErrors:g??null})}catch{(0,f.I)({localQuotes:[],localSelectedQuote:null,quotesWarning:"provider_errors",quotesErrors:null})}}),x=a=>{(0,f.I)({amount:a});let{opts:b}=(0,f.J)();v(a,b)},y=async()=>{let{error:a,state:b,onFailure:c,onSuccess:d}=(0,f.J)();w(),a?c(a):"provider-success"===b.status?await d({status:"confirmed"}):"provider-confirming"===b.status?await d({status:"submitted"}):c(Error("User exited flow"))},z=async()=>{let a,b=(0,f.L)();if(!b)return;let c=(0,g.h)();if(!c)return void(0,f.I)({state:{status:"provider-error"},error:Error("Unable to open payment window")});(0,f.I)({isLoading:!0});let{opts:d,amount:e,getProviderUrl:i,getStatus:j,controller:k}=(0,f.J)(),l=()=>{try{c.closed||c.close()}catch{}};k.current=new AbortController;try{let f=await i({source:{asset:d.source.selectedAsset.toUpperCase(),amount:e||"0"},destination:{asset:d.destination.asset.toUpperCase(),chain:d.destination.chain,address:d.destination.address},provider:b.provider,sub_provider:b.sub_provider??void 0,payment_method:b.payment_method,redirect_url:window.location.origin});c.location.href=f.url,a=f.session_id}catch(a){return l(),void(0,f.I)({state:{status:"provider-error"},isLoading:!1,error:Error("Unable to start payment session")})}(0,f.I)({isLoading:!1}),(0,f.I)({state:{status:"provider-confirming"}});let m=await (0,h.p)({operation:()=>j({session_id:a,provider:b.provider}),until:a=>"completed"===a.status||"failed"===a.status||"cancelled"===a.status,delay:0,interval:2e3,attempts:60,signal:k.current.signal});if("aborted"!==m.status){if("max_attempts"===m.status)return l(),m.error?(console.error(m.error),void(0,f.I)({state:{status:"select-amount"},isLoading:!1,error:Error("Unable to check payment status. Please try again.")})):void(0,f.I)({state:{status:"provider-error"},error:Error("Could not confirm payment status yet.")});"completed"===m.result?.status?(l(),(0,f.I)({state:{status:"provider-success"}})):(l(),(0,f.I)({state:{status:"provider-error"},error:Error(`Transaction ${m.result?.status??"failed"}`)}))}},A=()=>{let a=(0,f.M)();a&&a.length>0&&(0,f.I)({state:{status:"select-payment-method",quotes:a}})},B=()=>{(0,f.I)({state:{status:"select-source-asset"}})},C=()=>{(0,f.I)({error:null,state:{status:"select-amount"}})},D=a=>{(0,f.I)({localSelectedQuote:a,state:{status:"select-amount"}})},E=a=>{let{opts:b,amount:c}=(0,f.J)(),d={...b,source:{...b.source,selectedAsset:a}};(0,f.I)({opts:d,state:{status:"select-amount"}}),v(c,d)},F=({onClose:a})=>(0,d.jsx)(i.S,{showClose:!0,onClose:a,iconVariant:"loading",title:"Processing transaction",subtitle:"Your purchase is in progress. You can leave this screen — we’ll notify you when it’s complete.",primaryCta:{label:"Done",onClick:a},watermark:!0}),G=({onClose:a,onRetry:b})=>(0,d.jsx)(i.S,{showClose:!0,onClose:a,icon:j.A,iconVariant:"error",title:"Something went wrong",subtitle:"We couldn't complete your transaction. Please try again.",primaryCta:{label:"Try again",onClick:b},secondaryCta:{label:"Close",onClick:a},watermark:!0}),H=({onClose:a})=>(0,d.jsx)(i.S,{showClose:!0,onClose:a,icon:k.A,iconVariant:"success",title:"Transaction confirmed",subtitle:"Your purchase is processing. Funds should arrive in your wallet within a few minutes.",primaryCta:{label:"Done",onClick:a},watermark:!0}),I={CREDIT_DEBIT_CARD:"card",APPLE_PAY:"Apple Pay",GOOGLE_PAY:"Google Pay",BANK_TRANSFER:"bank deposit",ACH:"bank deposit",SEPA:"bank deposit",PIX:"PIX"},J={CREDIT_DEBIT_CARD:(0,d.jsx)(m,{size:14}),APPLE_PAY:(0,d.jsx)(n.A,{size:14}),GOOGLE_PAY:(0,d.jsx)(n.A,{size:14}),BANK_TRANSFER:(0,d.jsx)(o,{size:14}),ACH:(0,d.jsx)(o,{size:14}),SEPA:(0,d.jsx)(o,{size:14}),PIX:(0,d.jsx)(p.A,{size:14})},K=({opts:a,onClose:b,onEditSourceAsset:c,onEditPaymentMethod:e,onContinue:f,onAmountChange:g,amount:j,selectedQuote:k,quotesWarning:l,quotesErrors:n,quotesCount:o,isLoading:p})=>{var s;return(0,d.jsxs)(i.S,{showClose:!0,onClose:b,headerTitle:`Buy ${a.destination.asset.toLocaleUpperCase()}`,primaryCta:{label:"Continue",onClick:f,loading:p,disabled:!k},helpText:l?(0,d.jsxs)(L,{children:[(0,d.jsx)(q.A,{size:16,strokeWidth:2}),(0,d.jsx)(M,{children:(0,d.jsxs)(d.Fragment,"amount_too_low"===l?{children:[(0,d.jsx)(N,{children:"Amount too low"}),(0,d.jsx)(O,{children:"Please choose a higher amount to continue."})]}:{children:[(0,d.jsx)(N,{children:"Unable to get quotes"}),(0,d.jsx)(O,{children:n?.[0]?.error??"Something went wrong. Please try again."})]})})]}):k&&o>1?(0,d.jsxs)(P,{onClick:e,children:[J[k.payment_method]??(0,d.jsx)(m,{size:14}),(0,d.jsxs)("span",{children:["Pay with ",I[s=k.payment_method]??s.replace(/_/g," ").toLowerCase().replace(/^\w/,a=>a.toUpperCase())]}),(0,d.jsx)(r,{size:14})]}):null,watermark:!0,children:[(0,d.jsx)(h.A,{currency:a.source.selectedAsset,value:j,onChange:g,inputMode:"decimal",autoFocus:!0}),(0,d.jsx)(h.C,{selectedAsset:a.source.selectedAsset,onEditSourceAsset:c})]})},L=t.I4.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: var(--privy-color-warn-bg, #fffbbb);
  border: 1px solid var(--privy-color-border-warning, #facd63);
  overflow: clip;
  width: 100%;

  svg {
    flex-shrink: 0;
    color: var(--privy-color-icon-warning, #facd63);
  }
`,M=t.I4.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  flex: 1;
  min-width: 0;
  font-size: 0.75rem;
  line-height: 1.125rem;
  color: var(--privy-color-foreground);
  font-feature-settings:
    'calt' 0,
    'kern' 0;
  text-align: left;
`,N=t.I4.span`
  font-weight: 600;
`,O=t.I4.span`
  font-weight: 400;
`,P=t.I4.button`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;

  && {
    padding: 0;
    color: var(--privy-color-accent);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.375rem;
  }
`,Q={CREDIT_DEBIT_CARD:"Credit / debit card",APPLE_PAY:"Apple Pay",GOOGLE_PAY:"Google Pay",BANK_TRANSFER:"Bank transfer",ACH:"ACH",SEPA:"SEPA",PIX:"PIX"},R={CREDIT_DEBIT_CARD:(0,d.jsx)(m,{size:20}),APPLE_PAY:(0,d.jsx)(u.A,{width:20,height:20}),GOOGLE_PAY:(0,d.jsx)(u.G,{width:20,height:20}),BANK_TRANSFER:(0,d.jsx)(s,{size:20}),ACH:(0,d.jsx)(s,{size:20}),SEPA:(0,d.jsx)(s,{size:20}),PIX:(0,d.jsx)(s,{size:20})},S=({onClose:a,onSelectPaymentMethod:b,quotes:c,isLoading:e})=>(0,d.jsx)(i.S,{showClose:!0,onClose:a,title:"Select payment method",subtitle:"Choose how you'd like to pay",watermark:!0,children:(0,d.jsx)(T,{children:c.map((a,c)=>{var f;return(0,d.jsx)(U,{onClick:()=>b(a),disabled:e,children:(0,d.jsxs)(V,{children:[(0,d.jsx)(W,{children:R[a.payment_method]??(0,d.jsx)(m,{size:20})}),(0,d.jsx)(X,{children:(0,d.jsx)(Y,{children:Q[f=a.payment_method]??f.replace(/_/g," ").toLowerCase().replace(/^\w/,a=>a.toUpperCase())})})]})},`${a.provider}-${a.payment_method}-${c}`)})})}),T=t.I4.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`,U=t.I4.button`
  border-color: var(--privy-color-border-default);
  border-width: 1px;
  border-radius: var(--privy-border-radius-md);
  border-style: solid;
  display: flex;

  && {
    padding: 1rem 1rem;
  }
`,V=t.I4.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
`,W=t.I4.div`
  color: var(--privy-color-foreground-3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`,X=t.I4.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.125rem;
  flex: 1;
`,Y=t.I4.span`
  color: var(--privy-color-foreground);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.25rem;
`,Z=({onClose:a,onContinue:b,onAmountChange:c,onSelectSource:e,onEditSourceAsset:f,onEditPaymentMethod:g,onSelectPaymentMethod:i,onRetry:j,opts:k,state:l,amount:m,selectedQuote:n,quotesWarning:o,quotesErrors:p,quotesCount:q,isLoading:r})=>"select-amount"===l.status?(0,d.jsx)(K,{onClose:a,onContinue:b,onAmountChange:c,onEditSourceAsset:f,onEditPaymentMethod:g,opts:k,amount:m,selectedQuote:n,quotesWarning:o,quotesErrors:p,quotesCount:q,isLoading:r}):"select-source-asset"===l.status?(0,d.jsx)(h.S,{onSelectSource:e,opts:k,isLoading:r}):"select-payment-method"===l.status?(0,d.jsx)(S,{onClose:a,onSelectPaymentMethod:i,quotes:l.quotes,isLoading:r}):"provider-confirming"===l.status?(0,d.jsx)(F,{onClose:a}):"provider-error"===l.status?(0,d.jsx)(G,{onClose:a,onRetry:j}):"provider-success"===l.status?(0,d.jsx)(H,{onClose:a}):null,$={component:()=>{let{onUserCloseViaDialogOrKeybindRef:a}=(0,e.a)(),b=(0,f.N)();if(!b)return null;let{opts:c,state:g,isLoading:h,amount:i,quotesWarning:j,quotesErrors:k,localQuotes:l,localSelectedQuote:m,initialQuotes:n,initialSelectedQuote:o}=b;return a.current=y,(0,d.jsx)(Z,{onClose:y,opts:c,state:g,isLoading:h,amount:i,selectedQuote:m??o,quotesWarning:j,quotesErrors:k,quotesCount:(l??n)?.length??0,onAmountChange:x,onContinue:z,onSelectSource:E,onEditSourceAsset:B,onEditPaymentMethod:A,onSelectPaymentMethod:D,onRetry:C})}}},75031:(a,b,c)=>{c.d(b,{A:()=>e,G:()=>f});var d=c(21124);let e=a=>(0,d.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 210.2",xmlSpace:"preserve",...a,children:(0,d.jsx)("path",{d:"M93.6,27.1C87.6,34.2,78,39.8,68.4,39c-1.2-9.6,3.5-19.8,9-26.1c6-7.3,16.5-12.5,25-12.9  C103.4,10,99.5,19.8,93.6,27.1 M102.3,40.9c-13.9-0.8-25.8,7.9-32.4,7.9c-6.7,0-16.8-7.5-27.8-7.3c-14.3,0.2-27.6,8.3-34.9,21.2  c-15,25.8-3.9,64,10.6,85c7.1,10.4,15.6,21.8,26.8,21.4c10.6-0.4,14.8-6.9,27.6-6.9c12.9,0,16.6,6.9,27.8,6.7  c11.6-0.2,18.9-10.4,26-20.8c8.1-11.8,11.4-23.3,11.6-23.9c-0.2-0.2-22.4-8.7-22.6-34.3c-0.2-21.4,17.5-31.6,18.3-32.2  C123.3,42.9,107.7,41.3,102.3,40.9 M182.6,11.9v155.9h24.2v-53.3h33.5c30.6,0,52.1-21,52.1-51.4c0-30.4-21.1-51.2-51.3-51.2H182.6z   M206.8,32.3h27.9c21,0,33,11.2,33,30.9c0,19.7-12,31-33.1,31h-27.8V32.3z M336.6,169c15.2,0,29.3-7.7,35.7-19.9h0.5v18.7h22.4V90.2  c0-22.5-18-37-45.7-37c-25.7,0-44.7,14.7-45.4,34.9h21.8c1.8-9.6,10.7-15.9,22.9-15.9c14.8,0,23.1,6.9,23.1,19.6v8.6l-30.2,1.8  c-28.1,1.7-43.3,13.2-43.3,33.2C298.4,155.6,314.1,169,336.6,169z M343.1,150.5c-12.9,0-21.1-6.2-21.1-15.7c0-9.8,7.9-15.5,23-16.4  l26.9-1.7v8.8C371.9,140.1,359.5,150.5,343.1,150.5z M425.1,210.2c23.6,0,34.7-9,44.4-36.3L512,54.7h-24.6l-28.5,92.1h-0.5  l-28.5-92.1h-25.3l41,113.5l-2.2,6.9c-3.7,11.7-9.7,16.2-20.4,16.2c-1.9,0-5.6-0.2-7.1-0.4v18.7C417.3,210,423.3,210.2,425.1,210.2z"})}),f=a=>(0,d.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 80 38.1",xmlSpace:"preserve",...a,children:[(0,d.jsx)("path",{style:{fill:"#5F6368"},d:"M37.8,19.7V29h-3V6h7.8c1.9,0,3.7,0.7,5.1,2c1.4,1.2,2.1,3,2.1,4.9c0,1.9-0.7,3.6-2.1,4.9c-1.4,1.3-3.1,2-5.1,2  L37.8,19.7L37.8,19.7z M37.8,8.8v8h5c1.1,0,2.2-0.4,2.9-1.2c1.6-1.5,1.6-4,0.1-5.5c0,0-0.1-0.1-0.1-0.1c-0.8-0.8-1.8-1.3-2.9-1.2  L37.8,8.8L37.8,8.8z"}),(0,d.jsx)("path",{style:{fill:"#5F6368"},d:"M56.7,12.8c2.2,0,3.9,0.6,5.2,1.8s1.9,2.8,1.9,4.8V29H61v-2.2h-0.1c-1.2,1.8-2.9,2.7-4.9,2.7  c-1.7,0-3.2-0.5-4.4-1.5c-1.1-1-1.8-2.4-1.8-3.9c0-1.6,0.6-2.9,1.8-3.9c1.2-1,2.9-1.4,4.9-1.4c1.8,0,3.2,0.3,4.3,1v-0.7  c0-1-0.4-2-1.2-2.6c-0.8-0.7-1.8-1.1-2.9-1.1c-1.7,0-3,0.7-3.9,2.1l-2.6-1.6C51.8,13.8,53.9,12.8,56.7,12.8z M52.9,24.2  c0,0.8,0.4,1.5,1,1.9c0.7,0.5,1.5,0.8,2.3,0.8c1.2,0,2.4-0.5,3.3-1.4c1-0.9,1.5-2,1.5-3.2c-0.9-0.7-2.2-1.1-3.9-1.1  c-1.2,0-2.2,0.3-3,0.9C53.3,22.6,52.9,23.3,52.9,24.2z"}),(0,d.jsx)("path",{style:{fill:"#5F6368"},d:"M80,13.3l-9.9,22.7h-3l3.7-7.9l-6.5-14.7h3.2l4.7,11.3h0.1l4.6-11.3H80z"}),(0,d.jsx)("path",{style:{fill:"#4285F4"},d:"M25.9,17.7c0-0.9-0.1-1.8-0.2-2.7H13.2v5.1h7.1c-0.3,1.6-1.2,3.1-2.6,4v3.3H22C24.5,25.1,25.9,21.7,25.9,17.7z"}),(0,d.jsx)("path",{style:{fill:"#34A853"},d:"M13.2,30.6c3.6,0,6.6-1.2,8.8-3.2l-4.3-3.3c-1.2,0.8-2.7,1.3-4.5,1.3c-3.4,0-6.4-2.3-7.4-5.5H1.4v3.4  C3.7,27.8,8.2,30.6,13.2,30.6z"}),(0,d.jsx)("path",{style:{fill:"#FBBC04"},d:"M5.8,19.9c-0.6-1.6-0.6-3.4,0-5.1v-3.4H1.4c-1.9,3.7-1.9,8.1,0,11.9L5.8,19.9z"}),(0,d.jsx)("path",{style:{fill:"#EA4335"},d:"M13.2,9.4c1.9,0,3.7,0.7,5.1,2l0,0l3.8-3.8c-2.4-2.2-5.6-3.5-8.8-3.4c-5,0-9.6,2.8-11.8,7.3l4.4,3.4  C6.8,11.7,9.8,9.4,13.2,9.4z"})]})},93630:(a,b,c)=>{c.d(b,{A:()=>d});let d=(0,c(6101).A)("smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]])}};