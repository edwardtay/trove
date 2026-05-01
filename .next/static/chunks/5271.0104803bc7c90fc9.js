"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5271],{3966:(e,t,i)=>{i.d(t,{a:()=>c,b:()=>f,c:()=>l,g:()=>s,p:()=>u,s:()=>p});var r=i(56381),n=i(90456),o=i(98134);let a=new Intl.NumberFormat(void 0,{style:"currency",currency:"USD",maximumFractionDigits:2}),d=e=>a.format(e),l=(e,t)=>{let i=d(t*parseFloat(e));return"$0.00"!==i?i:"<$0.01"},c=(e,t)=>{let i=d(t*parseFloat((0,r.c)(e)));return"$0.00"===i?"<$0.01":i},s=(e,t,i=6,r=!1)=>`${u(e,i,r)} ${t}`,u=(e,t=6,i=!1)=>{let n=parseFloat((0,r.c)(e)).toFixed(t).replace(/0+$/,"").replace(/\.$/,"");return i?n:`${"0"===n?"<0.001":n}`},p=e=>e.reduce((e,t)=>e+t,0n),f=(e,t)=>{let{chains:i}=(0,n.u)(),r=`https://etherscan.io/address/${t}`,a=`${(0,o.G)(e,i)}/address/${t}`;if(!a)return r;try{new URL(a)}catch{return r}return a}},13160:(e,t,i)=>{i.d(t,{u:()=>l});var r=i(12115),n=i(62997),o=i(64209),a=i(90456),d=i(58719);function l(e){let{tokenPrice:t,isTokenPriceLoading:i,tokenPriceError:l}=(e=>{let{showFiatPrices:t,getUsdTokenPrice:i,chains:d}=(0,a.u)(),[l,c]=(0,r.useState)(!0),[s,u]=(0,r.useState)(void 0),[p,f]=(0,r.useState)(void 0);return(0,r.useEffect)(()=>{e||=o.s;let r=(0,n.u)(d).find(t=>t.id===Number(e));(async()=>{if(t){if(!r)return c(!1),u(Error(`Unable to fetch token price on chain id ${e}`));try{c(!0);let e=await i(r);e?f(e):u(Error(`Unable to fetch token price on chain id ${r.id}`))}catch(e){u(e)}finally{c(!1)}}else c(!1)})()},[e]),{tokenPrice:p,isTokenPriceLoading:l,tokenPriceError:s}})("solana"===e?-1:e),{solPrice:c,isSolPriceLoading:s,solPriceError:u}=(0,d.u)({enabled:"solana"===e});return"solana"===e?{tokenPrice:c,isTokenPriceLoading:s,tokenPriceError:u}:{tokenPrice:t,isTokenPriceLoading:i,tokenPriceError:l}}},58719:(e,t,i)=>{i.d(t,{u:()=>o});var r=i(12115),n=i(90456);let o=({enabled:e=!0}={})=>{let{showFiatPrices:t,getUsdPriceForSol:i}=(0,n.u)(),[o,a]=(0,r.useState)(!0),[d,l]=(0,r.useState)(void 0),[c,s]=(0,r.useState)(void 0);return(0,r.useEffect)(()=>{(async()=>{if(t&&e)try{a(!0);let e=await i();e?s(e):l(Error("Unable to fetch SOL price"))}catch(e){l(e)}finally{a(!1)}else a(!1)})()},[]),{solPrice:c,isSolPriceLoading:o,solPriceError:d}}},62997:(e,t,i)=>{i.d(t,{u:()=>n});var r=i(81246);function n(e){let t=e.filter(e=>!r.o.has(e.id));return r.m.concat(t)}},71525:(e,t,i)=>{i.d(t,{F:()=>l,I:()=>d,a:()=>c,b:()=>s,c:()=>p,d:()=>f,e:()=>a,f:()=>x,g:()=>h,h:()=>u});var r=i(20031),n=i(84241),o=i(52911);let a=r.I4.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 24px;
  padding-bottom: 24px;
`,d=r.I4.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    border-radius: var(--privy-border-radius-sm);
  }
`,l=r.I4.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
`,c=r.I4.div`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  padding: 0 16px;
  border-width: 1px !important;
  border-radius: 12px;
  cursor: text;

  &:focus-within {
    border-color: var(--privy-color-accent);
  }
`;r.I4.div`
  font-size: 42px !important;
`;let s=r.I4.input`
  background-color: var(--privy-color-background);
  width: 100%;

  &:focus {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
  }

  && {
    font-size: 26px;
  }
`,u=(0,r.I4)(s)`
  && {
    font-size: 42px;
  }
`;r.I4.button`
  cursor: pointer;
  padding-left: 4px;
`;let p=r.I4.div`
  font-size: 18px;
`,f=r.I4.div`
  font-size: 12px;
  color: var(--privy-color-foreground-3);
  // we need this container to maintain a static height if there's no content
  height: 20px;
`;r.I4.div`
  display: flex;
  flex-direction: row;
  line-height: 22px;
  font-size: 16px;
  text-align: center;
  svg {
    margin-right: 6px;
    margin: auto;
  }
`,(0,r.I4)(o.LinkButton)`
  margin-top: 16px;
`;let g=(0,r.i7)`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;(0,r.I4)(n.d)`
  border-radius: var(--privy-border-radius-md) !important;
  animation: ${g} 0.3s ease-in-out;
`;let x=r.I4.div``,h=r.I4.a`
  && {
    color: var(--privy-color-accent);
  }

  cursor: pointer;
`},75271:(e,t,i)=>{i.r(t),i.d(t,{FundingAmountEditScreen:()=>g,default:()=>g});var r=i(95155),n=i(12115),o=i(84241),a=i(83361),d=i(98392),l=i(95204),c=i(88172),s=i(17411),u=i(13160),p=i(3966),f=i(71525);i(50205),i(68463),i(92253);let g={component:()=>{let{data:e,setModalData:t}=(0,s.a)(),i=e?.funding,g="solana"===i.chainType,x=(0,n.useRef)(null),{tokenPrice:h}=(0,u.u)(g?"solana":i.chain.id),v=g?void 0:i,m=!(!v?.erc20Address||v?.erc20ContractInfo),y=g?i.isUSDC?"USDC":"SOL":i.erc20Address?i.erc20ContractInfo?.symbol:i.chain.nativeCurrency.symbol||"ETH",b=parseFloat(i.amount),I=!isNaN(b)&&b>0,k=h?(0,p.c)(i.amount,h):void 0;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(d.t,{}),(0,r.jsx)(c.T,{children:"Confirm or edit amount"}),(0,r.jsxs)(a.F,{style:{marginTop:"32px"},children:[(0,r.jsx)(f.F,{children:m?(0,r.jsx)(l.N,{size:"50px"}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(f.a,{onClick:()=>x.current?.focus(),children:[(0,r.jsx)(f.h,{ref:x,value:i.amount,onChange:r=>{let n=r.target.value;/^[0-9.]*$/.test(n)&&n.split(".").length-1<=1&&t({...e,funding:{...i,amount:n},solanaFundingData:e?.solanaFundingData?{...e.solanaFundingData,amount:n}:void 0})}}),(0,r.jsx)(f.c,{children:y})]}),!v?.erc20Address&&!(g&&i.isUSDC)&&(0,r.jsx)(f.d,{children:k&&I?`${k} USD`:""})]})}),(0,r.jsx)(o.c,{style:{marginTop:"1rem"},disabled:!I,onClick:i.onContinueWithExternalWallet,children:"Continue"})]}),(0,r.jsx)(o.B,{})]})}}},83361:(e,t,i)=>{i.d(t,{B:()=>n,C:()=>d,F:()=>c,H:()=>a,R:()=>f,S:()=>u,a:()=>s,b:()=>p,c:()=>l,d:()=>g,e:()=>o});var r=i(20031);let n=r.I4.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  margin-top: auto;
  gap: 16px;
  flex-grow: 100;
`,o=r.I4.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  width: 100%;
`,a=r.I4.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`,d=(0,r.I4)(o)`
  padding: 20px 0;
`,l=(0,r.I4)(o)`
  gap: 16px;
`,c=r.I4.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`,s=r.I4.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;r.I4.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;let u=r.I4.div`
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
`,p=r.I4.div`
  height: 16px;
`,f=r.I4.div`
  height: 12px;
`;r.I4.div`
  position: relative;
`;let g=r.I4.div`
  height: ${e=>e.height??"12"}px;
`;r.I4.div`
  background-color: var(--privy-color-accent);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border-color: white;
  border-width: 2px !important;
`},88172:(e,t,i)=>{i.d(t,{T:()=>n});var r=i(20031);let n=r.I4.span`
  color: var(--privy-color-foreground);
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.875rem; /* 166.667% */
  text-align: center;
`},98392:(e,t,i)=>{i.d(t,{t:()=>a});var r=i(95155),n=i(17411),o=i(84241);function a({title:e}){let{currentScreen:t,navigateBack:i,navigate:a,data:d,setModalData:l}=(0,n.a)();return(0,r.jsx)(o.M,{title:e,backFn:"ManualTransferScreen"===t?i:t===d?.funding?.methodScreen?d.funding.comingFromSendTransactionScreen?()=>a("SendTransactionScreen"):void 0:d?.funding?.methodScreen?()=>{let e=d.funding;e.usingDefaultFundingMethod&&(e.usingDefaultFundingMethod=!1),l({funding:e,solanaFundingData:d?.solanaFundingData}),a(e.methodScreen)}:void 0})}}}]);