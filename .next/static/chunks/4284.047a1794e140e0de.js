"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4284],{15564:(e,r,o)=>{o.d(r,{C:()=>s});var n=o(95155),t=o(20031),a=o(86575);let s=({children:e,color:r,isLoading:o,isPulsing:t,...a})=>(0,n.jsx)(i,{$color:r,$isLoading:o,$isPulsing:t,...a,children:e}),i=t.I4.span`
  padding: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1rem; /* 150% */
  border-radius: var(--privy-border-radius-xs);
  display: flex;
  align-items: center;
  ${e=>{let r,o;"green"===e.$color&&(r="var(--privy-color-success-dark)",o="var(--privy-color-success-light)"),"red"===e.$color&&(r="var(--privy-color-error)",o="var(--privy-color-error-light)"),"gray"===e.$color&&(r="var(--privy-color-foreground-2)",o="var(--privy-color-background-2)");let n=(0,t.i7)`
      from, to {
        background-color: ${o};
      }

      50% {
        background-color: rgba(${o}, 0.8);
      }
    `;return(0,t.AH)`
      color: ${r};
      background-color: ${o};
      ${e.$isPulsing&&(0,t.AH)`
        animation: ${n} 3s linear infinite;
      `};
    `}}

  ${a.L}
`},75766:(e,r,o)=>{o.r(r),o.d(r,{MfaAuthEnrollmentFlowScreen:()=>m,default:()=>m});var n=o(95155),t=o(8443),a=o(24287),s=o(12115),i=o(84241),l=o(96052),c=o(64209),d=o(17411),u=o(61478),h=o(95915);o(68463),o(92253),o(50205),o(72378),o(45472),o(52769);let m={component:()=>{let{user:e,ready:r}=(0,d.u)(),{data:o,onUserCloseViaDialogOrKeybindRef:m}=(0,d.a)(),y=(0,c.u)(),[f,v]=(0,s.useState)(null),[g,p]=(0,s.useState)(null),[x,j]=(0,s.useState)(null),[k,b]=(0,s.useState)(!1),[M,w]=(0,s.useState)(!1),[$,A]=(0,s.useState)(),C=async()=>{$?S($):e?await F({user:e}):S(Error("Must be logged in to manage MFA")),setTimeout(()=>{v(null),p(null)},500)};if(m.current=C,!o?.mfaEnroll)throw Error("Missing modal data for MFA enrollment screen.");let{onFailure:S,onSuccess:F,onBack:E,mfaMethods:P,verify:R,generateTotpSecret:T,enrollTotp:L,unenrollTotp:B,enrollPasskey:I}=o.mfaEnroll,H=e?.mfaMethods.includes("sms"),U=e?.mfaMethods.includes("totp"),_=e?.mfaMethods.includes("passkey"),N=!!e?.phone,O=e?.linkedAccounts.filter(e=>"passkey"===e.type).map(e=>e.credentialId)??[];function W(){v(null),p(null),A(void 0)}async function z(e=O){try{A(void 0),w(!0);let r=await I(e);return await F({user:r})}catch(e){A(e)}finally{w(!1),b(!1)}}if(!r||!e||!y)return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.M,{onClose:C,backFn:E},"header"),(0,n.jsx)(h.A,{children:(0,n.jsx)(u.M,{})}),(0,n.jsx)(h.C,{children:(0,n.jsx)(l.L,{})}),(0,n.jsx)(i.b,{})]});if("sms"===f)return null;if("totp"===f)return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.M,{backFn:W,onClose:C},"header"),(0,n.jsx)(h.I,{style:{marginBottom:"1.5rem"},children:(0,n.jsx)(t.A,{})}),(0,n.jsx)(h.T,{children:"Remove authenticator app verification?"}),(0,n.jsxs)(h.S,{children:["MFA adds an extra layer of security to your ",y?.name," account. Make sure you have other methods to secure your account."]}),(0,n.jsx)(h.B,{children:(0,n.jsx)(i.P,{$warn:!0,onClick:async function(){try{A(void 0),w(!0);let e=await B();return await F({user:e})}catch(e){A(e)}finally{w(!1),v(null)}},loading:M,children:"Remove"})}),(0,n.jsx)(i.b,{})]});if("passkey"===f){let e=o.mfaEnroll.shouldUnlinkOnUnenrollMfa??!0;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.M,{backFn:W,onClose:C},"header"),(0,n.jsx)(h.I,{style:{marginBottom:"1.5rem"},children:(0,n.jsx)(t.A,{})}),(0,n.jsx)(h.T,{children:"Are you sure you want to remove this passkey?"}),(0,n.jsx)(h.S,{children:e?"Removing your passkey will remove as both a verification method and a login method.":"Removing your passkey will remove as a verification method."}),(0,n.jsx)(h.B,{children:(0,n.jsx)(i.P,{$warn:!0,onClick:async function(){try{A(void 0),w(!0);let e=await I([]);return await F({user:e})}catch(e){A(e)}finally{w(!1),v(null)}},loading:M,children:"Remove"})}),(0,n.jsx)(i.b,{})]})}return 0!==P.length||H||U||_?"sms"===g?null:"totp"===g&&x?(0,n.jsx)(u.E,{onClose:C,onReset:W,submitEnrollmentWithTotp:e=>(async function(e){try{A(void 0),w(!0);let r=await L(e);return await F({user:r})}catch(e){A(e)}finally{w(!1),v(null)}})(e.mfaCode),error:$,totpInfo:{...x,appName:y?.name||"Privy"}}):"passkey"===g?(0,n.jsx)(u.a,{onReset:W,onClose:C,submitEnrollmentWithPasskey:z}):(0,n.jsx)(u.b,{showIntro:!0,userMfaMethods:e.mfaMethods,appMfaMethods:y.mfa.methods,userHasAuthSms:N,backFn:E,handleSelectMethod:async function(e){A(void 0);try{await R()}catch(e){return void A(e)}return"totp"===e?(p(e),j(null),void T().then(({totpSecret:e,totpAuthUrl:r})=>{j({authUrl:r,secret:e})}).catch(()=>{j(null),W()})):"passkey"===e&&1===O.length?await z():void p(e)},isTotpLoading:"totp"===g&&!x,isPasskeyLoading:k,error:$,onClose:C,setRemovingMfaMethod:async function(e){A(void 0);try{await R()}catch(e){return void A(e)}v(e)}}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.M,{onClose:C,backFn:E},"header"),(0,n.jsx)(h.I,{style:{marginBottom:"1.5rem"},children:(0,n.jsx)(a.A,{})}),(0,n.jsx)(h.T,{children:"Add more security"}),(0,n.jsxs)(h.S,{children:[y?.name," does not have any verification methods enabled."]}),(0,n.jsx)(h.B,{children:(0,n.jsx)(i.P,{onClick:C,children:"Close"})}),(0,n.jsx)(i.b,{})]})}}},86575:(e,r,o)=>{o.d(r,{L:()=>a});var n=o(20031);let t=(0,n.i7)`
  from, to {
    background: var(--privy-color-foreground-4);
    color: var(--privy-color-foreground-4);
  }

  50% {
    background: var(--privy-color-foreground-accent);
    color: var(--privy-color-foreground-accent);
  }
`,a=(0,n.AH)`
  ${e=>e.$isLoading?(0,n.AH)`
          width: 35%;
          animation: ${t} 2s linear infinite;
          border-radius: var(--privy-border-radius-sm);
        `:""}
`}}]);