"use strict";exports.id=9936,exports.ids=[9936],exports.modules={15907:(a,b,c)=>{c.d(b,{A:()=>e});var d=c(38301);let e=d.forwardRef(function({title:a,titleId:b,...c},e){return d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:e,"aria-labelledby":b},c),a?d.createElement("title",{id:b},a):null,d.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"}))})},35948:(a,b,c)=>{c.d(b,{T:()=>e});var d=c(78858);let e=d.I4.span`
  color: var(--privy-color-foreground);
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.875rem; /* 166.667% */
  text-align: center;
`},49936:(a,b,c)=>{c.r(b),c.d(b,{SetAutomaticRecoveryScreen:()=>q,default:()=>q});var d=c(21124),e=c(92073),f=c(15907),g=c(38301),h=c(23966),i=c(7797),j=c(78858),k=c(77911),l=c(35948),m=c(64317),n=c(87230),o=c(99848);c(22967),c(18521),c(32571);let p=j.I4.div`
  && {
    border-width: 4px;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  aspect-ratio: 1;
  border-style: solid;
  border-color: ${a=>a.$color??"var(--privy-color-accent)"};
  border-radius: 50%;
`,q={component:()=>{let{user:a}=(0,h.u)(),{client:b,walletProxy:c,refreshSessionAndUser:j,closePrivyModal:q}=(0,n.u)(),r=(0,h.a)(),{entropyId:s,entropyIdVerifier:t}=r.data?.recoverWallet??{},[u,v]=(0,g.useState)(!1),[w,x]=(0,g.useState)(null),[y,z]=(0,g.useState)(null);function A(){if(!u){if(y)return r.data?.setWalletPassword?.onFailure(y),void q();if(!w)return r.data?.setWalletPassword?.onFailure(Error("User exited set recovery flow")),void q()}}return r.onUserCloseViaDialogOrKeybindRef.current=A,(0,d.jsxs)(d.Fragment,y?{children:[(0,d.jsx)(i.M,{onClose:A},"header"),(0,d.jsx)(p,{$color:"var(--privy-color-error)",style:{alignSelf:"center"},children:(0,d.jsx)(e.A,{height:38,width:38,stroke:"var(--privy-color-error)"})}),(0,d.jsx)(l.T,{style:{marginTop:"0.5rem"},children:"Something went wrong"}),(0,d.jsx)(o.G,{style:{minHeight:"2rem"}}),(0,d.jsx)(i.c,{onClick:()=>z(null),children:"Try again"}),(0,d.jsx)(i.B,{})]}:{children:[(0,d.jsx)(i.M,{onClose:A},"header"),(0,d.jsx)(f.A,{style:{width:"3rem",height:"3rem",alignSelf:"center"}}),(0,d.jsx)(l.T,{style:{marginTop:"0.5rem"},children:"Automatically secure your account"}),(0,d.jsx)(k.S,{style:{marginTop:"1rem"},children:"When you log into a new device, you’ll only need to authenticate to access your account. Never get logged out if you forget your password."}),(0,d.jsx)(o.G,{style:{minHeight:"2rem"}}),(0,d.jsx)(i.c,{loading:u,disabled:!(!u&&!w),onClick:()=>(async function(){v(!0);try{let d=await b.getAccessToken(),e=(0,h.j)(a,s);if(!d||!c||!e)return;if(!(await c.setRecovery({accessToken:d,entropyId:s,entropyIdVerifier:t,existingRecoveryMethod:e.recoveryMethod,recoveryMethod:"privy"})).entropyId)throw Error("Unable to set recovery on wallet");let f=await j();if(!f)throw Error("Unable to set recovery on wallet");let g=(0,h.j)(f,e.address);if(!g)throw Error("Unabled to set recovery on wallet");x(!!f),setTimeout(()=>{r.data?.setWalletPassword?.onSuccess(g),q()},m.q)}catch(a){z(a)}finally{v(!1)}})(),children:w?"Success":"Confirm"}),(0,d.jsx)(i.B,{})]})}}},77911:(a,b,c)=>{c.d(b,{S:()=>e});var d=c(78858);let e=d.I4.span`
  margin-top: 4px;
  color: var(--privy-color-foreground);
  text-align: center;

  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.375rem; /* 157.143% */

  && a {
    color: var(--privy-color-accent);
  }
`},92073:(a,b,c)=>{c.d(b,{A:()=>e});var d=c(38301);let e=d.forwardRef(function({title:a,titleId:b,...c},e){return d.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:e,"aria-labelledby":b},c),a?d.createElement("title",{id:b},a):null,d.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"}))})}};