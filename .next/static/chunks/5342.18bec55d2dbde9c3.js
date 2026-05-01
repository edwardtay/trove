"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5342],{21165:(e,r,t)=>{t.d(r,{S:()=>n});var o=t(20031);let n=o.I4.span`
  margin-top: 4px;
  color: var(--privy-color-foreground);
  text-align: center;

  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.375rem; /* 157.143% */

  && a {
    color: var(--privy-color-accent);
  }
`},63909:(e,r,t)=>{t.d(r,{A:()=>n});var o=t(12115);let n=o.forwardRef(function(e,r){let{title:t,titleId:n,...l}=e;return o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:r,"aria-labelledby":n},l),t?o.createElement("title",{id:n},t):null,o.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"}))})},85342:(e,r,t)=>{t.r(r),t.d(r,{SetAutomaticRecoveryScreen:()=>g,default:()=>g});var o=t(95155),n=t(88125),l=t(63909),a=t(12115),i=t(17411),s=t(84241),c=t(20031),d=t(21165),u=t(88172),h=t(64209),y=t(90456),v=t(96052);t(50205),t(68463),t(92253);let f=c.I4.div`
  && {
    border-width: 4px;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  aspect-ratio: 1;
  border-style: solid;
  border-color: ${e=>e.$color??"var(--privy-color-accent)"};
  border-radius: 50%;
`,g={component:()=>{let{user:e}=(0,i.u)(),{client:r,walletProxy:t,refreshSessionAndUser:c,closePrivyModal:g}=(0,y.u)(),w=(0,i.a)(),{entropyId:m,entropyIdVerifier:p}=w.data?.recoverWallet??{},[x,j]=(0,a.useState)(!1),[b,k]=(0,a.useState)(null),[S,E]=(0,a.useState)(null);function C(){if(!x){if(S)return w.data?.setWalletPassword?.onFailure(S),void g();if(!b)return w.data?.setWalletPassword?.onFailure(Error("User exited set recovery flow")),void g()}}return w.onUserCloseViaDialogOrKeybindRef.current=C,(0,o.jsxs)(o.Fragment,S?{children:[(0,o.jsx)(s.M,{onClose:C},"header"),(0,o.jsx)(f,{$color:"var(--privy-color-error)",style:{alignSelf:"center"},children:(0,o.jsx)(n.A,{height:38,width:38,stroke:"var(--privy-color-error)"})}),(0,o.jsx)(u.T,{style:{marginTop:"0.5rem"},children:"Something went wrong"}),(0,o.jsx)(v.G,{style:{minHeight:"2rem"}}),(0,o.jsx)(s.c,{onClick:()=>E(null),children:"Try again"}),(0,o.jsx)(s.B,{})]}:{children:[(0,o.jsx)(s.M,{onClose:C},"header"),(0,o.jsx)(l.A,{style:{width:"3rem",height:"3rem",alignSelf:"center"}}),(0,o.jsx)(u.T,{style:{marginTop:"0.5rem"},children:"Automatically secure your account"}),(0,o.jsx)(d.S,{style:{marginTop:"1rem"},children:"When you log into a new device, you’ll only need to authenticate to access your account. Never get logged out if you forget your password."}),(0,o.jsx)(v.G,{style:{minHeight:"2rem"}}),(0,o.jsx)(s.c,{loading:x,disabled:!(!x&&!b),onClick:()=>(async function(){j(!0);try{let o=await r.getAccessToken(),n=(0,i.j)(e,m);if(!o||!t||!n)return;if(!(await t.setRecovery({accessToken:o,entropyId:m,entropyIdVerifier:p,existingRecoveryMethod:n.recoveryMethod,recoveryMethod:"privy"})).entropyId)throw Error("Unable to set recovery on wallet");let l=await c();if(!l)throw Error("Unable to set recovery on wallet");let a=(0,i.j)(l,n.address);if(!a)throw Error("Unabled to set recovery on wallet");k(!!l),setTimeout(()=>{w.data?.setWalletPassword?.onSuccess(a),g()},h.q)}catch(e){E(e)}finally{j(!1)}})(),children:b?"Success":"Confirm"}),(0,o.jsx)(s.B,{})]})}}},88125:(e,r,t)=>{t.d(r,{A:()=>n});var o=t(12115);let n=o.forwardRef(function(e,r){let{title:t,titleId:n,...l}=e;return o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:r,"aria-labelledby":n},l),t?o.createElement("title",{id:n},t):null,o.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"}))})},88172:(e,r,t)=>{t.d(r,{T:()=>n});var o=t(20031);let n=o.I4.span`
  color: var(--privy-color-foreground);
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.875rem; /* 166.667% */
  text-align: center;
`}}]);