"use strict";exports.id=3543,exports.ids=[3543],exports.modules={20575:(a,b,c)=>{c.d(b,{A:()=>e});var d=c(38301);let e=d.forwardRef(function({title:a,titleId:b,...c},e){return d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:e,"aria-labelledby":b},c),a?d.createElement("title",{id:b},a):null,d.createElement("path",{fillRule:"evenodd",d:"M15.97 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H7.5a.75.75 0 0 1 0-1.5h11.69l-3.22-3.22a.75.75 0 0 1 0-1.06Zm-7.94 9a.75.75 0 0 1 0 1.06l-3.22 3.22H16.5a.75.75 0 0 1 0 1.5H4.81l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 0Z",clipRule:"evenodd"}))})},27829:(a,b,c)=>{c.d(b,{B:()=>e,C:()=>h,F:()=>j,H:()=>g,R:()=>n,S:()=>l,a:()=>k,b:()=>m,c:()=>i,d:()=>o,e:()=>f});var d=c(78858);let e=d.I4.div`
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
`},33488:(a,b,c)=>{c.d(b,{O:()=>d});let d="sdk_fiat_on_ramp_completed_with_status"},43543:(a,b,c)=>{c.r(b),c.d(b,{CoinbaseOnrampStatusScreen:()=>p,default:()=>p});var d=c(21124),e=c(20575),f=c(98593),g=c(38301),h=c(78858),i=c(7797),j=c(27829),k=c(99848),l=c(87230),m=c(23966),n=c(33488),o=c(95761);c(22967),c(18521),c(32571),c(21398),c(61946);let p={component:()=>{let{data:a,setModalData:b,navigate:c,navigateBack:e}=(0,m.a)(),{closePrivyModal:f,createAnalyticsEvent:h,client:j}=(0,l.u)(),[k,o]=(0,g.useState)("pending-in-flow"),p=(0,g.useRef)(0),r={...a?.funding,showAlternateFundingMethod:!0};r.usingDefaultFundingMethod&&(r.usingDefaultFundingMethod=!1);let{partnerUserId:s,popup:t}=a?.coinbaseOnrampStatus??{};return(0,g.useEffect)(()=>{if("pending-in-flow"===k||"pending-after-flow"===k){let d=setInterval(async()=>{if(s)try{let{status:d}=await j.getCoinbaseOnRampStatus({partnerUserId:s});if("success"===d)return void o("success");if("failure"===d)throw Error("There was an error completing Coinbase Onramp flow.");if(p.current>=3)return b({funding:r,solanaFundingData:a?.solanaFundingData}),void c("FundingMethodSelectionScreen");t?.closed&&(p.current=p.current+1,o("pending-after-flow"))}catch(d){console.error(d),o("error"),h({eventName:n.O,payload:{status:"failure",provider:"coinbase-onramp",error:d.message}}),b({funding:{...r,errorMessage:"Something went wrong adding funds. Please try again or use another method."},solanaFundingData:a?.solanaFundingData}),c("FundingMethodSelectionScreen")}},1500);return()=>clearInterval(d)}},[s,t,k]),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(i.M,{title:"Fund account",backFn:()=>{b({funding:r,solanaFundingData:a?.solanaFundingData}),e()}},"header"),(0,d.jsx)(q,{status:k,onClickCta:f}),(0,d.jsx)(i.B,{})]})}},q=({status:a,onClickCta:b})=>{let{title:c,body:e,cta:f}=(0,g.useMemo)(()=>(a=>{switch(a){case"success":return{title:"You've funded your account!",body:"It may take a few minutes for the assets to appear.",cta:"Continue"};case"pending-after-flow":return{title:"In Progress",body:"Almost done. Retrieving transaction status from Coinbase",cta:""};case"error":case"pending-in-flow":return{title:"In Progress",body:"Go back to Coinbase Onramp to finish funding your account.",cta:""}}})(a),[a]);return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(t,{children:[(0,d.jsx)(r,{isSucccess:"success"===a}),(0,d.jsxs)(j.a,{children:[(0,d.jsx)("h3",{children:c}),(0,d.jsx)(s,{children:e})]})]}),f&&(0,d.jsx)(i.P,{onClick:b,children:f})]})},r=({isSucccess:a})=>{if(!a){let a="var(--privy-color-foreground-4)";return(0,d.jsxs)("div",{style:{position:"relative"},children:[(0,d.jsx)(k.L,{color:a,style:{position:"absolute"}}),(0,d.jsx)(k.O,{color:a}),(0,d.jsx)(o.F,{style:{position:"absolute",width:"2.8rem",height:"2.8rem",top:"1.2rem",left:"1.2rem"}})]})}let b=a?f.A:()=>(0,d.jsx)(e.A,{width:"3rem",height:"3rem",style:{backgroundColor:"var(--privy-color-foreground-4)",color:"var(--privy-color-background)",borderRadius:"100%",padding:"0.5rem",margin:"0.5rem"}}),c=a?"var(--privy-color-success)":"var(--privy-color-foreground-4)";return(0,d.jsx)("div",{style:{borderColor:c,display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"100%",borderWidth:2,padding:"0.5rem",marginBottom:"0.5rem"},children:b&&(0,d.jsx)(b,{width:"4rem",height:"4rem",color:c})})},s=h.I4.p`
  font-size: 1rem;
  color: var(--privy-color-foreground-3);
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`,t=h.I4.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 1.75rem;
  margin-right: 1.75rem;
  padding: 2rem 0;
`},98593:(a,b,c)=>{c.d(b,{A:()=>e});var d=c(38301);let e=d.forwardRef(function({title:a,titleId:b,...c},e){return d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:e,"aria-labelledby":b},c),a?d.createElement("title",{id:b},a):null,d.createElement("path",{fillRule:"evenodd",d:"M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z",clipRule:"evenodd"}))})}};