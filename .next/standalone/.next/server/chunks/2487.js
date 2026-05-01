"use strict";exports.id=2487,exports.ids=[2487],exports.modules={14924:(a,b,c)=>{c.d(b,{a:()=>k,u:()=>l});var d=c(23412),e=c(38301),f=c(64317),g=c(87230),h=c(23966),i=c(33488);let j="moonpay";function k(a){return parseFloat(a)}function l(a,b=!1){let[c,k]=(0,e.useState)(null),{createAnalyticsEvent:m}=(0,g.u)(),{data:n,navigate:o,setModalData:p}=(0,h.a)(),q=n?.funding,r=(0,e.useRef)(0);return(0,e.useEffect)(()=>{let c=setInterval(async()=>{if(a)try{let[e]=await async function(a,b){return(0,d.OT)(`${b?f.M:f.v}/transactions/ext/${a}`,{query:{apiKey:b?f.w:f.x}})}(a,b),g="waitingAuthorization"===e.status&&"credit_debit_card"===e.paymentMethod?"pending":e.status;if(["failed","completed","awaitingAuthorization"].includes(g)&&(m({eventName:i.O,payload:{status:g,provider:j,paymentMethod:e.paymentMethod,cardPaymentType:e.cardPaymentType,currency:e.currency?.code,baseCurrencyAmount:e.baseCurrencyAmount,quoteCurrencyAmount:e.quoteCurrencyAmount,feeAmount:e.feeAmount,extraFeeAmount:e.extraFeeAmount,networkFeeAmount:e.networkFeeAmount,isSandbox:b}}),clearInterval(c)),"failed"===g||"serviceFailure"===g)return p({funding:{...q,errorMessage:"Something went wrong adding funds from Moonpay. Please try again or use another method to fund your wallet."},solanaFundingData:n?.solanaFundingData}),void o("FundingMethodSelectionScreen");k(g)}catch(a){404!==a.response?.status&&(r.current+=1),r.current>=3&&(m({eventName:i.O,payload:{status:"serviceFailure",provider:j}}),clearInterval(c),p({funding:{...q,errorMessage:"Something went wrong adding funds from Moonpay. Please try again or use another method to fund your wallet."},solanaFundingData:n?.solanaFundingData}),o("FundingMethodSelectionScreen"))}},3e3);return()=>clearInterval(c)},[a,r]),c}},20575:(a,b,c)=>{c.d(b,{A:()=>e});var d=c(38301);let e=d.forwardRef(function({title:a,titleId:b,...c},e){return d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:e,"aria-labelledby":b},c),a?d.createElement("title",{id:b},a):null,d.createElement("path",{fillRule:"evenodd",d:"M15.97 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H7.5a.75.75 0 0 1 0-1.5h11.69l-3.22-3.22a.75.75 0 0 1 0-1.06Zm-7.94 9a.75.75 0 0 1 0 1.06l-3.22 3.22H16.5a.75.75 0 0 1 0 1.5H4.81l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 0Z",clipRule:"evenodd"}))})},22487:(a,b,c)=>{c.r(b),c.d(b,{MoonpayStatusScreen:()=>q,default:()=>q});var d=c(21124),e=c(20575),f=c(98593),g=c(38301),h=c(78858),i=c(7797),j=c(27829),k=c(99848),l=c(64317),m=c(87230),n=c(23966),o=c(14924);c(18521),c(32571),c(22967);let p=({size:a=61,...b})=>(0,d.jsx)("svg",{width:a,height:a,viewBox:"0 0 61 61",fill:"none",xmlns:"http://www.w3.org/2000/svg",...b,children:(0,d.jsxs)("g",{id:"moonpay_symbol_wht 2",children:[(0,d.jsx)("rect",{x:"1.3374",y:"1",width:"59",height:"59",rx:"11.5",fill:"#7715F5"}),(0,d.jsx)("path",{id:"Vector",d:"M43.8884 23.3258C45.0203 23.3258 46.1268 22.9901 47.068 22.3613C48.0091 21.7324 48.7427 20.8386 49.1759 19.7928C49.6091 18.747 49.7224 17.5962 49.5016 16.4861C49.2807 15.3759 48.7357 14.3561 47.9353 13.5557C47.1349 12.7553 46.1151 12.2102 45.0049 11.9893C43.8947 11.7685 42.7439 11.8819 41.6982 12.3151C40.6524 12.7482 39.7585 13.4818 39.1297 14.423C38.5008 15.3641 38.1651 16.4707 38.1651 17.6026C38.165 18.3542 38.3131 19.0985 38.6007 19.7929C38.8883 20.4873 39.3098 21.1182 39.8413 21.6496C40.3728 22.1811 41.0037 22.6027 41.6981 22.8903C42.3925 23.1778 43.1367 23.3259 43.8884 23.3258ZM26.3395 49.1017C23.5804 49.1017 20.8832 48.2836 18.5891 46.7507C16.295 45.2178 14.5069 43.039 13.4511 40.49C12.3952 37.9409 12.1189 35.1359 12.6572 32.4298C13.1955 29.7237 14.5241 27.238 16.4751 25.287C18.4262 23.336 20.9118 22.0074 23.6179 21.4691C26.324 20.9308 29.129 21.2071 31.6781 22.2629C34.2272 23.3189 36.406 25.1069 37.9389 27.401C39.4717 29.6952 40.2899 32.3923 40.2899 35.1514C40.2899 36.9835 39.9291 38.7975 39.2281 40.49C38.527 42.1826 37.4994 43.7205 36.204 45.0159C34.9086 46.3113 33.3707 47.3389 31.6781 48.04C29.9856 48.741 28.1715 49.1018 26.3395 49.1017Z",fill:"white"})]})}),q={component:()=>{let{data:a,setModalData:b,navigateBack:c}=(0,n.a)(),e=(0,l.u)(),{closePrivyModal:f}=(0,m.u)(),g=(0,o.u)(a?.moonpayStatus?.externalTransactionId||null,e.fundingMethodConfig.moonpay.useSandbox??!1);return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(i.M,{title:"Fund account",backFn:()=>{let d={...a?.funding,showAlternateFundingMethod:!0};d.usingDefaultFundingMethod&&(d.usingDefaultFundingMethod=!1),b({funding:d,solanaFundingData:a?.solanaFundingData}),c()}}),(0,d.jsx)(r,{status:g,onClickCta:f}),(0,d.jsx)(i.B,{})]})}},r=({status:a,onClickCta:b})=>{let{title:c,body:e,cta:f}=(0,g.useMemo)(()=>(a=>{switch(a){case"completed":return{title:"You've funded your account!",body:"It may take a few minutes for the assets to appear.",cta:"Continue"};case"waitingAuthorization":return{title:"Processing payment",body:"This may take up to a few hours. You will receive an email when the purchase is complete.",cta:"Continue"};default:return{title:"In Progress",body:"Go back to MoonPay to finish funding your account.",cta:""}}})(a),[a]);return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(u,{children:[(0,d.jsx)(s,{status:a}),(0,d.jsxs)(j.a,{children:[(0,d.jsx)("h3",{children:c}),(0,d.jsx)(t,{children:e})]})]}),f&&(0,d.jsx)(i.P,{onClick:b,children:f})]})},s=({status:a})=>{if(!a||"pending"===a){let a="var(--privy-color-foreground-4)";return(0,d.jsxs)("div",{style:{position:"relative"},children:[(0,d.jsx)(k.L,{color:a,style:{position:"absolute"}}),(0,d.jsx)(k.O,{color:a}),(0,d.jsx)(p,{size:"3rem",style:{position:"absolute",top:"1rem",left:"1rem"}})]})}let b=(a=>{switch(a){case"completed":return f.A;case"waitingAuthorization":return()=>(0,d.jsx)(e.A,{width:"3rem",height:"3rem",style:{backgroundColor:"var(--privy-color-foreground-4)",color:"var(--privy-color-background)",borderRadius:"100%",padding:"0.5rem",margin:"0.5rem"}});default:return}})(a),c=a?({completed:"var(--privy-color-success)",failed:"var(--privy-color-error)",serviceFailure:"var(--privy-color-error)",waitingAuthorization:"var(--privy-color-accent)",pending:"var(--privy-color-foreground-4)"})[a]:"var(--privy-color-foreground-4)";return(0,d.jsx)("div",{style:{borderColor:c,display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"100%",borderWidth:2,padding:"0.5rem",marginBottom:"0.5rem"},children:b&&(0,d.jsx)(b,{width:"4rem",height:"4rem",color:c})})},t=h.I4.p`
  font-size: 1rem;
  color: var(--privy-color-foreground-3);
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,u=h.I4.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 1.75rem;
  margin-right: 1.75rem;
  padding: 2rem 0;
`},27829:(a,b,c)=>{c.d(b,{B:()=>e,C:()=>h,F:()=>j,H:()=>g,R:()=>n,S:()=>l,a:()=>k,b:()=>m,c:()=>i,d:()=>o,e:()=>f});var d=c(78858);let e=d.I4.div`
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
`},33488:(a,b,c)=>{c.d(b,{O:()=>d});let d="sdk_fiat_on_ramp_completed_with_status"},98593:(a,b,c)=>{c.d(b,{A:()=>e});var d=c(38301);let e=d.forwardRef(function({title:a,titleId:b,...c},e){return d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:e,"aria-labelledby":b},c),a?d.createElement("title",{id:b},a):null,d.createElement("path",{fillRule:"evenodd",d:"M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z",clipRule:"evenodd"}))})}};