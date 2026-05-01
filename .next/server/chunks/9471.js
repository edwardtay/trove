"use strict";exports.id=9471,exports.ids=[9471],exports.modules={59471:(a,b,c)=>{c.r(b),c.d(b,{AppKitModal:()=>aR,W3mListWallet:()=>aU,W3mModal:()=>aQ,W3mModalBase:()=>aP,W3mRouterContainer:()=>aX});var d=c(29856),e=c(26990),f=c(22734),g=c(63363),h=c(85601),i=c(51048),j=c(50957),k=c(57339),l=c(95209),m=c(10306),n=c(87977),o=c(20053),p=c(55338);let q={isUnsupportedChainView:()=>"UnsupportedChain"===n.I.state.view||"SwitchNetwork"===n.I.state.view&&n.I.state.history.includes("UnsupportedChain"),async safeClose(){if(this.isUnsupportedChainView()||await p.U.isSIWXCloseDisabled())return void j.W.shake();("DataCapture"===n.I.state.view||"DataCaptureOtpConfirm"===n.I.state.view)&&o.x.disconnect(),j.W.close()}};var r=c(5119),s=c(33504),t=c(13295),u=c(12129),v=c(90062),w=c(31886),x=c(88693),y=c(15471),z=c(23799),A=c(851),B=c(79699);let C={getGasPriceInEther:(a,b)=>Number(b*a)/1e18,getGasPriceInUSD(a,b,c){let d=C.getGasPriceInEther(b,c);return w.S.bigNumber(a).times(d).toNumber()},getPriceImpact({sourceTokenAmount:a,sourceTokenPriceInUSD:b,toTokenPriceInUSD:c,toTokenAmount:d}){let e=w.S.bigNumber(a).times(b),f=w.S.bigNumber(d).times(c);return e.minus(f).div(e).times(100).toNumber()},getMaxSlippage(a,b){let c=w.S.bigNumber(a).div(100);return w.S.multiply(b,c).toNumber()},getProviderFee:(a,b=.0085)=>w.S.bigNumber(a).times(b).toString(),isInsufficientNetworkTokenForGas:(a,b)=>!!w.S.bigNumber(a).eq(0)||w.S.bigNumber(w.S.bigNumber(b||"0")).gt(a),isInsufficientSourceTokenForSwap(a,b,c){let d=c?.find(a=>a.address===b)?.quantity?.numeric;return w.S.bigNumber(d||"0").lt(a)}};var D=c(28600),E=c(81104),F=c(88912),G=c(26641);let H={initializing:!1,initialized:!1,loadingPrices:!1,loadingQuote:!1,loadingApprovalTransaction:!1,loadingBuildTransaction:!1,loadingTransaction:!1,switchingTokens:!1,fetchError:!1,approvalTransaction:void 0,swapTransaction:void 0,transactionError:void 0,sourceToken:void 0,sourceTokenAmount:"",sourceTokenPriceInUSD:0,toToken:void 0,toTokenAmount:"",toTokenPriceInUSD:0,networkPrice:"0",networkBalanceInUSD:"0",networkTokenSymbol:"",inputError:void 0,slippage:A.oU.CONVERT_SLIPPAGE_TOLERANCE,tokens:void 0,popularTokens:void 0,suggestedTokens:void 0,foundTokens:void 0,myTokensWithBalance:void 0,tokensPriceMap:{},gasFee:"0",gasPriceInUSD:0,priceImpact:void 0,maxSlippage:void 0,providerFee:void 0},I=(0,u.BX)({...H}),J={state:I,subscribe:a=>(0,u.B1)(I,()=>a(I)),subscribeKey:(a,b)=>(0,v.u$)(I,a,b),getParams(){let a=k.W.state.activeChain,b=k.W.getAccountData(a)?.caipAddress??k.W.state.activeCaipAddress,c=t.w.getPlainAddress(b),d=(0,z.K1)(),e=l.a.getConnectorId(k.W.state.activeChain);if(!c)throw Error("No address found to swap the tokens from.");let f=!I.toToken?.address||!I.toToken?.decimals,g=!I.sourceToken?.address||!I.sourceToken?.decimals||!w.S.bigNumber(I.sourceTokenAmount).gt(0),i=!I.sourceTokenAmount;return{networkAddress:d,fromAddress:c,fromCaipAddress:b,sourceTokenAddress:I.sourceToken?.address,toTokenAddress:I.toToken?.address,toTokenAmount:I.toTokenAmount,toTokenDecimals:I.toToken?.decimals,sourceTokenAmount:I.sourceTokenAmount,sourceTokenDecimals:I.sourceToken?.decimals,invalidToToken:f,invalidSourceToken:g,invalidSourceTokenAmount:i,availableToSwap:b&&!f&&!g&&!i,isAuthConnector:e===h.o.CONNECTOR_ID.AUTH}},async setSourceToken(a){if(!a){I.sourceToken=a,I.sourceTokenAmount="",I.sourceTokenPriceInUSD=0;return}I.sourceToken=a,await K.setTokenPrice(a.address,"sourceToken")},setSourceTokenAmount(a){I.sourceTokenAmount=a},async setToToken(a){if(!a){I.toToken=a,I.toTokenAmount="",I.toTokenPriceInUSD=0;return}I.toToken=a,await K.setTokenPrice(a.address,"toToken")},setToTokenAmount(a){I.toTokenAmount=a?w.S.toFixed(a,6):""},async setTokenPrice(a,b){let c=I.tokensPriceMap[a]||0;c||(I.loadingPrices=!0,c=await K.getAddressPrice(a)),"sourceToken"===b?I.sourceTokenPriceInUSD=c:"toToken"===b&&(I.toTokenPriceInUSD=c),I.loadingPrices&&(I.loadingPrices=!1),K.getParams().availableToSwap&&!I.switchingTokens&&K.swapTokens()},async switchTokens(){if(!I.initializing&&I.initialized&&!I.switchingTokens){I.switchingTokens=!0;try{let a=I.toToken?{...I.toToken}:void 0,b=I.sourceToken?{...I.sourceToken}:void 0,c=a&&""===I.toTokenAmount?"1":I.toTokenAmount;K.setSourceTokenAmount(c),K.setToTokenAmount(""),await K.setSourceToken(a),await K.setToToken(b),I.switchingTokens=!1,K.swapTokens()}catch(a){throw I.switchingTokens=!1,a}}},resetState(){I.myTokensWithBalance=H.myTokensWithBalance,I.tokensPriceMap=H.tokensPriceMap,I.initialized=H.initialized,I.initializing=H.initializing,I.switchingTokens=H.switchingTokens,I.sourceToken=H.sourceToken,I.sourceTokenAmount=H.sourceTokenAmount,I.sourceTokenPriceInUSD=H.sourceTokenPriceInUSD,I.toToken=H.toToken,I.toTokenAmount=H.toTokenAmount,I.toTokenPriceInUSD=H.toTokenPriceInUSD,I.networkPrice=H.networkPrice,I.networkTokenSymbol=H.networkTokenSymbol,I.networkBalanceInUSD=H.networkBalanceInUSD,I.inputError=H.inputError},resetValues(){let{networkAddress:a}=K.getParams(),b=I.tokens?.find(b=>b.address===a);K.setSourceToken(b),K.setToToken(void 0)},getApprovalLoadingState:()=>I.loadingApprovalTransaction,clearError(){I.transactionError=void 0},async initializeState(){if(!I.initializing){if(I.initializing=!0,!I.initialized)try{await K.fetchTokens(),I.initialized=!0}catch(a){I.initialized=!1,s.P.showError("Failed to initialize swap"),n.I.goBack()}I.initializing=!1}},async fetchTokens(){let{networkAddress:a}=K.getParams();await K.getNetworkTokenPrice(),await K.getMyTokensWithBalance();let b=I.myTokensWithBalance?.find(b=>b.address===a);b&&(I.networkTokenSymbol=b.symbol,K.setSourceToken(b),K.setSourceTokenAmount("0"))},async getTokenList(){let a=k.W.state.activeCaipNetwork?.caipNetworkId;if(I.caipNetworkId!==a||!I.tokens)try{I.tokensLoading=!0;let b=await B.s.getTokenList(a);I.tokens=b,I.caipNetworkId=a,I.popularTokens=b.sort((a,b)=>a.symbol<b.symbol?-1:+(a.symbol>b.symbol)),I.suggestedTokens=b.filter(a=>!!A.oU.SWAP_SUGGESTED_TOKENS.includes(a.symbol))}catch(a){I.tokens=[],I.popularTokens=[],I.suggestedTokens=[]}finally{I.tokensLoading=!1}},async getAddressPrice(a){let b=I.tokensPriceMap[a];if(b)return b;let c=await F.T.fetchTokenPrice({addresses:[a]}),d=c?.fungibles||[],e=[...I.tokens||[],...I.myTokensWithBalance||[]],f=e?.find(b=>b.address===a)?.symbol,g=parseFloat((d.find(a=>a.symbol.toLowerCase()===f?.toLowerCase())?.price||0).toString());return I.tokensPriceMap[a]=g,g},async getNetworkTokenPrice(){let{networkAddress:a}=K.getParams(),b=await F.T.fetchTokenPrice({addresses:[a]}).catch(()=>(s.P.showError("Failed to fetch network token price"),{fungibles:[]})),c=b.fungibles?.[0],d=c?.price.toString()||"0";I.tokensPriceMap[a]=parseFloat(d),I.networkTokenSymbol=c?.symbol||"",I.networkPrice=d},async getMyTokensWithBalance(a){let b=await y.Z.getMyTokensWithBalance(a),c=B.s.mapBalancesToSwapTokens(b);c&&(await K.getInitialGasPrice(),K.setBalances(c))},setBalances(a){let{networkAddress:b}=K.getParams(),c=k.W.state.activeCaipNetwork;if(!c)return;let d=a.find(a=>a.address===b);a.forEach(a=>{I.tokensPriceMap[a.address]=a.price||0}),I.myTokensWithBalance=a.filter(a=>a.address.startsWith(c.caipNetworkId)),I.networkBalanceInUSD=d?w.S.multiply(d.quantity.numeric,d.price).toString():"0"},async getInitialGasPrice(){let a=await B.s.fetchGasPrice();if(!a)return{gasPrice:null,gasPriceInUSD:null};switch(k.W.state?.activeCaipNetwork?.chainNamespace){case h.o.CHAIN.SOLANA:return I.gasFee=a.standard??"0",I.gasPriceInUSD=w.S.multiply(a.standard,I.networkPrice).div(1e9).toNumber(),{gasPrice:BigInt(I.gasFee),gasPriceInUSD:Number(I.gasPriceInUSD)};case h.o.CHAIN.EVM:default:let b=a.standard??"0",c=BigInt(b),d=BigInt(15e4),e=C.getGasPriceInUSD(I.networkPrice,d,c);return I.gasFee=b,I.gasPriceInUSD=e,{gasPrice:c,gasPriceInUSD:e}}},async swapTokens(){let a=k.W.getAccountData()?.address,b=I.sourceToken,c=I.toToken,d=w.S.bigNumber(I.sourceTokenAmount).gt(0);if(d||K.setToTokenAmount(""),!c||!b||I.loadingPrices||!d||!a)return;I.loadingQuote=!0;let e=w.S.bigNumber(I.sourceTokenAmount).times(10**b.decimals).round(0);try{let d=await F.T.fetchSwapQuote({userAddress:a,from:b.address,to:c.address,gasPrice:I.gasFee,amount:e.toString()});I.loadingQuote=!1;let f=d?.quotes?.[0]?.toAmount;if(!f)return void E.h.open({displayMessage:"Incorrect amount",debugMessage:"Please enter a valid amount"},"error");let g=w.S.bigNumber(f).div(10**c.decimals).toString();K.setToTokenAmount(g),K.hasInsufficientToken(I.sourceTokenAmount,b.address)?I.inputError="Insufficient balance":(I.inputError=void 0,K.setTransactionDetails())}catch(b){let a=await B.s.handleSwapError(b);I.loadingQuote=!1,I.inputError=a||"Insufficient balance"}},async getTransaction(){let{fromCaipAddress:a,availableToSwap:b}=K.getParams(),c=I.sourceToken,d=I.toToken;if(a&&b&&c&&d&&!I.loadingQuote)try{let b;return I.loadingBuildTransaction=!0,b=await B.s.fetchSwapAllowance({userAddress:a,tokenAddress:c.address,sourceTokenAmount:I.sourceTokenAmount,sourceTokenDecimals:c.decimals})?await K.createSwapTransaction():await K.createAllowanceTransaction(),I.loadingBuildTransaction=!1,I.fetchError=!1,b}catch(a){n.I.goBack(),s.P.showError("Failed to check allowance"),I.loadingBuildTransaction=!1,I.approvalTransaction=void 0,I.swapTransaction=void 0,I.fetchError=!0;return}},async createAllowanceTransaction(){let{fromCaipAddress:a,sourceTokenAddress:b,toTokenAddress:c}=K.getParams();if(a&&c){if(!b)throw Error("createAllowanceTransaction - No source token address found.");try{let d=await F.T.generateApproveCalldata({from:b,to:c,userAddress:a}),e=t.w.getPlainAddress(d.tx.from);if(!e)throw Error("SwapController:createAllowanceTransaction - address is required");let f={data:d.tx.data,to:e,gasPrice:BigInt(d.tx.eip155.gasPrice),value:BigInt(d.tx.value),toAmount:I.toTokenAmount};return I.swapTransaction=void 0,I.approvalTransaction={data:f.data,to:f.to,gasPrice:f.gasPrice,value:f.value,toAmount:f.toAmount},{data:f.data,to:f.to,gasPrice:f.gasPrice,value:f.value,toAmount:f.toAmount}}catch(a){n.I.goBack(),s.P.showError("Failed to create approval transaction"),I.approvalTransaction=void 0,I.swapTransaction=void 0,I.fetchError=!0;return}}},async createSwapTransaction(){let{networkAddress:a,fromCaipAddress:b,sourceTokenAmount:c}=K.getParams(),d=I.sourceToken,e=I.toToken;if(!b||!c||!d||!e)return;let f=o.x.parseUnits(c,d.decimals)?.toString();try{let c=await F.T.generateSwapCalldata({userAddress:b,from:d.address,to:e.address,amount:f,disableEstimate:!0}),g=d.address===a,h=BigInt(c.tx.eip155.gas),i=BigInt(c.tx.eip155.gasPrice),j=t.w.getPlainAddress(c.tx.to);if(!j)throw Error("SwapController:createSwapTransaction - address is required");let k={data:c.tx.data,to:j,gas:h,gasPrice:i,value:g?BigInt(f??"0"):BigInt("0"),toAmount:I.toTokenAmount};return I.gasPriceInUSD=C.getGasPriceInUSD(I.networkPrice,h,i),I.approvalTransaction=void 0,I.swapTransaction=k,k}catch(a){n.I.goBack(),s.P.showError("Failed to create transaction"),I.approvalTransaction=void 0,I.swapTransaction=void 0,I.fetchError=!0;return}},onEmbeddedWalletApprovalSuccess(){s.P.showLoading("Approve limit increase in your wallet"),n.I.replace("SwapPreview")},async sendTransactionForApproval(a){let{fromAddress:b,isAuthConnector:c}=K.getParams();I.loadingApprovalTransaction=!0,c?n.I.pushTransactionStack({onSuccess:K.onEmbeddedWalletApprovalSuccess}):s.P.showLoading("Approve limit increase in your wallet");try{await o.x.sendTransaction({address:b,to:a.to,data:a.data,value:a.value,chainNamespace:h.o.CHAIN.EVM}),await K.swapTokens(),await K.getTransaction(),I.approvalTransaction=void 0,I.loadingApprovalTransaction=!1}catch(a){I.transactionError=a?.displayMessage,I.loadingApprovalTransaction=!1,s.P.showError(a?.displayMessage||"Transaction error"),G.E.sendEvent({type:"track",event:"SWAP_APPROVAL_ERROR",properties:{message:a?.displayMessage||a?.message||"Unknown",network:k.W.state.activeCaipNetwork?.caipNetworkId||"",swapFromToken:K.state.sourceToken?.symbol||"",swapToToken:K.state.toToken?.symbol||"",swapFromAmount:K.state.sourceTokenAmount||"",swapToAmount:K.state.toTokenAmount||"",isSmartAccount:(0,z.lj)(h.o.CHAIN.EVM)===x.Vl.ACCOUNT_TYPES.SMART_ACCOUNT}})}},async sendTransactionForSwap(a){if(!a)return;let{fromAddress:b,toTokenAmount:c,isAuthConnector:d}=K.getParams();I.loadingTransaction=!0;let e=`Swapping ${I.sourceToken?.symbol} to ${w.S.formatNumberToLocalString(c,3)} ${I.toToken?.symbol}`,f=`Swapped ${I.sourceToken?.symbol} to ${w.S.formatNumberToLocalString(c,3)} ${I.toToken?.symbol}`;d?n.I.pushTransactionStack({onSuccess(){n.I.replace("Account"),s.P.showLoading(e),J.resetState()}}):s.P.showLoading("Confirm transaction in your wallet");try{let c=[I.sourceToken?.address,I.toToken?.address].join(","),e=await o.x.sendTransaction({address:b,to:a.to,data:a.data,value:a.value,chainNamespace:h.o.CHAIN.EVM});return I.loadingTransaction=!1,s.P.showSuccess(f),G.E.sendEvent({type:"track",event:"SWAP_SUCCESS",properties:{network:k.W.state.activeCaipNetwork?.caipNetworkId||"",swapFromToken:K.state.sourceToken?.symbol||"",swapToToken:K.state.toToken?.symbol||"",swapFromAmount:K.state.sourceTokenAmount||"",swapToAmount:K.state.toTokenAmount||"",isSmartAccount:(0,z.lj)(h.o.CHAIN.EVM)===x.Vl.ACCOUNT_TYPES.SMART_ACCOUNT}}),J.resetState(),d||n.I.replace("Account"),J.getMyTokensWithBalance(c),e}catch(a){I.transactionError=a?.displayMessage,I.loadingTransaction=!1,s.P.showError(a?.displayMessage||"Transaction error"),G.E.sendEvent({type:"track",event:"SWAP_ERROR",properties:{message:a?.displayMessage||a?.message||"Unknown",network:k.W.state.activeCaipNetwork?.caipNetworkId||"",swapFromToken:K.state.sourceToken?.symbol||"",swapToToken:K.state.toToken?.symbol||"",swapFromAmount:K.state.sourceTokenAmount||"",swapToAmount:K.state.toTokenAmount||"",isSmartAccount:(0,z.lj)(h.o.CHAIN.EVM)===x.Vl.ACCOUNT_TYPES.SMART_ACCOUNT}});return}},hasInsufficientToken:(a,b)=>C.isInsufficientSourceTokenForSwap(a,b,I.myTokensWithBalance),setTransactionDetails(){let{toTokenAddress:a,toTokenDecimals:b}=K.getParams();a&&b&&(I.gasPriceInUSD=C.getGasPriceInUSD(I.networkPrice,BigInt(I.gasFee),BigInt(15e4)),I.priceImpact=C.getPriceImpact({sourceTokenAmount:I.sourceTokenAmount,sourceTokenPriceInUSD:I.sourceTokenPriceInUSD,toTokenPriceInUSD:I.toTokenPriceInUSD,toTokenAmount:I.toTokenAmount}),I.maxSlippage=C.getMaxSlippage(I.slippage,I.toTokenAmount),I.providerFee=C.getProviderFee(I.sourceTokenAmount))}},K=(0,D.X)(J);var L=c(35198),M=c(77292),N=c(14143),O=c(27680);let P=(0,O.AH)`
  :host {
    display: block;
    border-radius: clamp(0px, ${({borderRadius:a})=>a["8"]}, 44px);
    box-shadow: 0 0 0 1px ${({tokens:a})=>a.theme.foregroundPrimary};
    overflow: hidden;
  }
`,Q=class extends d.WF{render(){return(0,d.qy)`<slot></slot>`}};Q.styles=[M.W5,P],Q=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g}([(0,N.E)("wui-card")],Q),c(58581),c(42666),c(81067),c(64222);let R=(0,O.AH)`
  :host {
    width: 100%;
  }

  :host > wui-flex {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({spacing:a})=>a[2]};
    padding: ${({spacing:a})=>a[3]};
    border-radius: ${({borderRadius:a})=>a[6]};
    border: 1px solid ${({tokens:a})=>a.theme.borderPrimary};
    box-sizing: border-box;
    background-color: ${({tokens:a})=>a.theme.foregroundPrimary};
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
    color: ${({tokens:a})=>a.theme.textPrimary};
  }

  :host > wui-flex[data-type='info'] {
    .icon-box {
      background-color: ${({tokens:a})=>a.theme.foregroundSecondary};

      wui-icon {
        color: ${({tokens:a})=>a.theme.iconDefault};
      }
    }
  }
  :host > wui-flex[data-type='success'] {
    .icon-box {
      background-color: ${({tokens:a})=>a.core.backgroundSuccess};

      wui-icon {
        color: ${({tokens:a})=>a.core.borderSuccess};
      }
    }
  }
  :host > wui-flex[data-type='warning'] {
    .icon-box {
      background-color: ${({tokens:a})=>a.core.backgroundWarning};

      wui-icon {
        color: ${({tokens:a})=>a.core.borderWarning};
      }
    }
  }
  :host > wui-flex[data-type='error'] {
    .icon-box {
      background-color: ${({tokens:a})=>a.core.backgroundError};

      wui-icon {
        color: ${({tokens:a})=>a.core.borderError};
      }
    }
  }

  wui-flex {
    width: 100%;
  }

  wui-text {
    word-break: break-word;
    flex: 1;
  }

  .close {
    cursor: pointer;
    color: ${({tokens:a})=>a.theme.iconDefault};
  }

  .icon-box {
    height: 40px;
    width: 40px;
    border-radius: ${({borderRadius:a})=>a["2"]};
    background-color: var(--local-icon-bg-value);
  }
`;var S=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let T={info:"info",success:"checkmark",warning:"warningCircle",error:"warning"},U=class extends d.WF{constructor(){super(...arguments),this.message="",this.type="info"}render(){return(0,d.qy)`
      <wui-flex
        data-type=${(0,f.J)(this.type)}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        gap="2"
      >
        <wui-flex columnGap="2" flexDirection="row" alignItems="center">
          <wui-flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            class="icon-box"
          >
            <wui-icon color="inherit" size="md" name=${T[this.type]}></wui-icon>
          </wui-flex>
          <wui-text variant="md-medium" color="inherit" data-testid="wui-alertbar-text"
            >${this.message}</wui-text
          >
        </wui-flex>
        <wui-icon
          class="close"
          color="inherit"
          size="sm"
          name="close"
          @click=${this.onClose}
        ></wui-icon>
      </wui-flex>
    `}onClose(){E.h.close()}};U.styles=[M.W5,R],S([(0,e.MZ)()],U.prototype,"message",void 0),S([(0,e.MZ)()],U.prototype,"type",void 0),U=S([(0,N.E)("wui-alertbar")],U);let V=(0,L.AH)`
  :host {
    display: block;
    position: absolute;
    top: ${({spacing:a})=>a["3"]};
    left: ${({spacing:a})=>a["4"]};
    right: ${({spacing:a})=>a["4"]};
    opacity: 0;
    pointer-events: none;
  }
`;var W=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let X={info:{backgroundColor:"fg-350",iconColor:"fg-325",icon:"info"},success:{backgroundColor:"success-glass-reown-020",iconColor:"success-125",icon:"checkmark"},warning:{backgroundColor:"warning-glass-reown-020",iconColor:"warning-100",icon:"warningCircle"},error:{backgroundColor:"error-glass-reown-020",iconColor:"error-125",icon:"warning"}},Y=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.open=E.h.state.open,this.onOpen(!0),this.unsubscribe.push(E.h.subscribeKey("open",a=>{this.open=a,this.onOpen(!1)}))}disconnectedCallback(){this.unsubscribe.forEach(a=>a())}render(){let{message:a,variant:b}=E.h.state,c=X[b];return(0,d.qy)`
      <wui-alertbar
        message=${a}
        backgroundColor=${c?.backgroundColor}
        iconColor=${c?.iconColor}
        icon=${c?.icon}
        type=${b}
      ></wui-alertbar>
    `}onOpen(a){this.open?(this.animate([{opacity:0,transform:"scale(0.85)"},{opacity:1,transform:"scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: auto"):a||(this.animate([{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: none")}};Y.styles=V,W([(0,e.wk)()],Y.prototype,"open",void 0),Y=W([(0,L.EM)("w3m-alertbar")],Y);var Z=c(40190),$=c(69710);let _=(0,O.AH)`
  :host {
    position: relative;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    padding: ${({spacing:a})=>a[1]};
  }

  /* -- Colors --------------------------------------------------- */
  button[data-type='accent'] wui-icon {
    color: ${({tokens:a})=>a.core.iconAccentPrimary};
  }

  button[data-type='neutral'][data-variant='primary'] wui-icon {
    color: ${({tokens:a})=>a.theme.iconInverse};
  }

  button[data-type='neutral'][data-variant='secondary'] wui-icon {
    color: ${({tokens:a})=>a.theme.iconDefault};
  }

  button[data-type='success'] wui-icon {
    color: ${({tokens:a})=>a.core.iconSuccess};
  }

  button[data-type='error'] wui-icon {
    color: ${({tokens:a})=>a.core.iconError};
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='xs'] {
    width: 16px;
    height: 16px;

    border-radius: ${({borderRadius:a})=>a[1]};
  }

  button[data-size='sm'] {
    width: 20px;
    height: 20px;
    border-radius: ${({borderRadius:a})=>a[1]};
  }

  button[data-size='md'] {
    width: 24px;
    height: 24px;
    border-radius: ${({borderRadius:a})=>a[2]};
  }

  button[data-size='lg'] {
    width: 28px;
    height: 28px;
    border-radius: ${({borderRadius:a})=>a[2]};
  }

  button[data-size='xs'] wui-icon {
    width: 8px;
    height: 8px;
  }

  button[data-size='sm'] wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='md'] wui-icon {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] wui-icon {
    width: 20px;
    height: 20px;
  }

  /* -- Hover --------------------------------------------------- */
  @media (hover: hover) {
    button[data-type='accent']:hover:enabled {
      background-color: ${({tokens:a})=>a.core.foregroundAccent010};
    }

    button[data-variant='primary'][data-type='neutral']:hover:enabled {
      background-color: ${({tokens:a})=>a.theme.foregroundSecondary};
    }

    button[data-variant='secondary'][data-type='neutral']:hover:enabled {
      background-color: ${({tokens:a})=>a.theme.foregroundSecondary};
    }

    button[data-type='success']:hover:enabled {
      background-color: ${({tokens:a})=>a.core.backgroundSuccess};
    }

    button[data-type='error']:hover:enabled {
      background-color: ${({tokens:a})=>a.core.backgroundError};
    }
  }

  /* -- Focus --------------------------------------------------- */
  button:focus-visible {
    box-shadow: 0 0 0 4px ${({tokens:a})=>a.core.foregroundAccent020};
  }

  /* -- Properties --------------------------------------------------- */
  button[data-full-width='true'] {
    width: 100%;
  }

  :host([fullWidth]) {
    width: 100%;
  }

  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;var aa=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let ab=class extends d.WF{constructor(){super(...arguments),this.icon="card",this.variant="primary",this.type="accent",this.size="md",this.iconSize=void 0,this.fullWidth=!1,this.disabled=!1}render(){return(0,d.qy)`<button
      data-variant=${this.variant}
      data-type=${this.type}
      data-size=${this.size}
      data-full-width=${this.fullWidth}
      ?disabled=${this.disabled}
    >
      <wui-icon color="inherit" name=${this.icon} size=${(0,f.J)(this.iconSize)}></wui-icon>
    </button>`}};ab.styles=[M.W5,M.fD,_],aa([(0,e.MZ)()],ab.prototype,"icon",void 0),aa([(0,e.MZ)()],ab.prototype,"variant",void 0),aa([(0,e.MZ)()],ab.prototype,"type",void 0),aa([(0,e.MZ)()],ab.prototype,"size",void 0),aa([(0,e.MZ)()],ab.prototype,"iconSize",void 0),aa([(0,e.MZ)({type:Boolean})],ab.prototype,"fullWidth",void 0),aa([(0,e.MZ)({type:Boolean})],ab.prototype,"disabled",void 0),ab=aa([(0,N.E)("wui-icon-button")],ab),c(67332);let ac=(0,O.AH)`
  button {
    display: block;
    display: flex;
    align-items: center;
    padding: ${({spacing:a})=>a[1]};
    transition: background-color ${({durations:a})=>a.lg}
      ${({easings:a})=>a["ease-out-power-2"]};
    will-change: background-color;
    border-radius: ${({borderRadius:a})=>a[32]};
  }

  wui-image {
    border-radius: 100%;
  }

  wui-text {
    padding-left: ${({spacing:a})=>a[1]};
  }

  .left-icon-container,
  .right-icon-container {
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
  }

  wui-icon {
    color: ${({tokens:a})=>a.theme.iconDefault};
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='lg'] {
    height: 32px;
  }

  button[data-size='md'] {
    height: 28px;
  }

  button[data-size='sm'] {
    height: 24px;
  }

  button[data-size='lg'] wui-image {
    width: 24px;
    height: 24px;
  }

  button[data-size='md'] wui-image {
    width: 20px;
    height: 20px;
  }

  button[data-size='sm'] wui-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] .left-icon-container {
    width: 24px;
    height: 24px;
  }

  button[data-size='md'] .left-icon-container {
    width: 20px;
    height: 20px;
  }

  button[data-size='sm'] .left-icon-container {
    width: 16px;
    height: 16px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-type='filled-dropdown'] {
    background-color: ${({tokens:a})=>a.theme.foregroundPrimary};
  }

  button[data-type='text-dropdown'] {
    background-color: transparent;
  }

  /* -- Focus states --------------------------------------------------- */
  button:focus-visible:enabled {
    background-color: ${({tokens:a})=>a.theme.foregroundSecondary};
    box-shadow: 0 0 0 4px ${({tokens:a})=>a.core.foregroundAccent040};
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled,
    button:active:enabled {
      background-color: ${({tokens:a})=>a.theme.foregroundSecondary};
    }
  }

  /* -- Disabled states --------------------------------------------------- */
  button:disabled {
    background-color: ${({tokens:a})=>a.theme.foregroundSecondary};
    opacity: 0.5;
  }
`;var ad=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let ae={lg:"lg-regular",md:"md-regular",sm:"sm-regular"},af={lg:"lg",md:"md",sm:"sm"},ag=class extends d.WF{constructor(){super(...arguments),this.imageSrc="",this.text="",this.size="lg",this.type="text-dropdown",this.disabled=!1}render(){return(0,d.qy)`<button ?disabled=${this.disabled} data-size=${this.size} data-type=${this.type}>
      ${this.imageTemplate()} ${this.textTemplate()}
      <wui-flex class="right-icon-container">
        <wui-icon name="chevronBottom"></wui-icon>
      </wui-flex>
    </button>`}textTemplate(){let a=ae[this.size];return this.text?(0,d.qy)`<wui-text color="primary" variant=${a}>${this.text}</wui-text>`:null}imageTemplate(){if(this.imageSrc)return(0,d.qy)`<wui-image src=${this.imageSrc} alt="select visual"></wui-image>`;let a=af[this.size];return(0,d.qy)` <wui-flex class="left-icon-container">
      <wui-icon size=${a} name="networkPlaceholder"></wui-icon>
    </wui-flex>`}};ag.styles=[M.W5,M.fD,ac],ad([(0,e.MZ)()],ag.prototype,"imageSrc",void 0),ad([(0,e.MZ)()],ag.prototype,"text",void 0),ad([(0,e.MZ)()],ag.prototype,"size",void 0),ad([(0,e.MZ)()],ag.prototype,"type",void 0),ad([(0,e.MZ)({type:Boolean})],ag.prototype,"disabled",void 0),ag=ad([(0,N.E)("wui-select")],ag),c(86851),c(77041);var ah=c(1317);let ai=(0,L.AH)`
  :host {
    height: 60px;
  }

  :host > wui-flex {
    box-sizing: border-box;
    background-color: var(--local-header-background-color);
  }

  wui-text {
    background-color: var(--local-header-background-color);
  }

  wui-flex.w3m-header-title {
    transform: translateY(0);
    opacity: 1;
  }

  wui-flex.w3m-header-title[view-direction='prev'] {
    animation:
      slide-down-out 120ms forwards ${({easings:a})=>a["ease-out-power-2"]},
      slide-down-in 120ms forwards ${({easings:a})=>a["ease-out-power-2"]};
    animation-delay: 0ms, 200ms;
  }

  wui-flex.w3m-header-title[view-direction='next'] {
    animation:
      slide-up-out 120ms forwards ${({easings:a})=>a["ease-out-power-2"]},
      slide-up-in 120ms forwards ${({easings:a})=>a["ease-out-power-2"]};
    animation-delay: 0ms, 200ms;
  }

  wui-icon-button[data-hidden='true'] {
    opacity: 0 !important;
    pointer-events: none;
  }

  @keyframes slide-up-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(3px);
      opacity: 0;
    }
  }

  @keyframes slide-up-in {
    from {
      transform: translateY(-3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-down-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(-3px);
      opacity: 0;
    }
  }

  @keyframes slide-down-in {
    from {
      transform: translateY(3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;var aj=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let ak=["SmartSessionList"],al={PayWithExchange:L.f.tokens.theme.foregroundPrimary};function am(){let a=n.I.state.data?.connector?.name,b=n.I.state.data?.wallet?.name,c=n.I.state.data?.network?.name,d=b??a,e=l.a.getConnectors(),f=1===e.length&&e[0]?.id==="w3m-email",g=k.W.getAccountData()?.socialProvider;return{Connect:`Connect ${f?"Email":""} Wallet`,Create:"Create Wallet",ChooseAccountName:void 0,Account:void 0,AccountSettings:void 0,AllWallets:"All Wallets",ApproveTransaction:"Approve Transaction",BuyInProgress:"Buy",ConnectingExternal:d??"Connect Wallet",ConnectingWalletConnect:d??"WalletConnect",ConnectingWalletConnectBasic:"WalletConnect",ConnectingSiwe:"Sign In",Convert:"Convert",ConvertSelectToken:"Select token",ConvertPreview:"Preview Convert",Downloads:d?`Get ${d}`:"Downloads",EmailLogin:"Email Login",EmailVerifyOtp:"Confirm Email",EmailVerifyDevice:"Register Device",GetWallet:"Get a Wallet",Networks:"Choose Network",OnRampProviders:"Choose Provider",OnRampActivity:"Activity",OnRampTokenSelect:"Select Token",OnRampFiatSelect:"Select Currency",Pay:"How you pay",ProfileWallets:"Wallets",SwitchNetwork:c??"Switch Network",Transactions:"Activity",UnsupportedChain:"Switch Network",UpgradeEmailWallet:"Upgrade Your Wallet",UpdateEmailWallet:"Edit Email",UpdateEmailPrimaryOtp:"Confirm Current Email",UpdateEmailSecondaryOtp:"Confirm New Email",WhatIsABuy:"What is Buy?",RegisterAccountName:"Choose Name",RegisterAccountNameSuccess:"",WalletReceive:"Receive",WalletCompatibleNetworks:"Compatible Networks",Swap:"Swap",SwapSelectToken:"Select Token",SwapPreview:"Preview Swap",WalletSend:"Send",WalletSendPreview:"Review Send",WalletSendSelectToken:"Select Token",WalletSendConfirmed:"Confirmed",WhatIsANetwork:"What is a network?",WhatIsAWallet:"What is a Wallet?",ConnectWallets:"Connect Wallet",ConnectSocials:"All Socials",ConnectingSocial:g?g.charAt(0).toUpperCase()+g.slice(1):"Connect Social",ConnectingMultiChain:"Select Chain",ConnectingFarcaster:"Farcaster",SwitchActiveChain:"Switch Chain",SmartSessionCreated:void 0,SmartSessionList:"Smart Sessions",SIWXSignMessage:"Sign In",PayLoading:"Payment in Progress",DataCapture:"Profile",DataCaptureOtpConfirm:"Confirm Email",FundWallet:"Fund Wallet",PayWithExchange:"Deposit from Exchange",PayWithExchangeSelectAsset:"Select Asset"}}let an=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.heading=am()[n.I.state.view],this.network=k.W.state.activeCaipNetwork,this.networkImage=Z.$.getNetworkImage(this.network),this.showBack=!1,this.prevHistoryLength=1,this.view=n.I.state.view,this.viewDirection="",this.unsubscribe.push($.j.subscribeNetworkImages(()=>{this.networkImage=Z.$.getNetworkImage(this.network)}),n.I.subscribeKey("view",a=>{setTimeout(()=>{this.view=a,this.heading=am()[a]},ah.o.ANIMATION_DURATIONS.HeaderText),this.onViewChange(),this.onHistoryChange()}),k.W.subscribeKey("activeCaipNetwork",a=>{this.network=a,this.networkImage=Z.$.getNetworkImage(this.network)}))}disconnectCallback(){this.unsubscribe.forEach(a=>a())}render(){let a=al[n.I.state.view]??L.f.tokens.theme.backgroundPrimary;return this.style.setProperty("--local-header-background-color",a),(0,d.qy)`
      <wui-flex
        .padding=${["0","4","0","4"]}
        justifyContent="space-between"
        alignItems="center"
      >
        ${this.leftHeaderTemplate()} ${this.titleTemplate()} ${this.rightHeaderTemplate()}
      </wui-flex>
    `}onWalletHelp(){G.E.sendEvent({type:"track",event:"CLICK_WALLET_HELP"}),n.I.push("WhatIsAWallet")}async onClose(){await q.safeClose()}rightHeaderTemplate(){let a=i.H?.state?.features?.smartSessions;return"Account"===n.I.state.view&&a?(0,d.qy)`<wui-flex>
      <wui-icon-button
        icon="clock"
        size="lg"
        iconSize="lg"
        type="neutral"
        variant="primary"
        @click=${()=>n.I.push("SmartSessionList")}
        data-testid="w3m-header-smart-sessions"
      ></wui-icon-button>
      ${this.closeButtonTemplate()}
    </wui-flex> `:this.closeButtonTemplate()}closeButtonTemplate(){return(0,d.qy)`
      <wui-icon-button
        icon="close"
        size="lg"
        type="neutral"
        variant="primary"
        iconSize="lg"
        @click=${this.onClose.bind(this)}
        data-testid="w3m-header-close"
      ></wui-icon-button>
    `}titleTemplate(){let a=ak.includes(this.view);return(0,d.qy)`
      <wui-flex
        view-direction="${this.viewDirection}"
        class="w3m-header-title"
        alignItems="center"
        gap="2"
      >
        <wui-text
          display="inline"
          variant="lg-regular"
          color="primary"
          data-testid="w3m-header-text"
        >
          ${this.heading}
        </wui-text>
        ${a?(0,d.qy)`<wui-tag variant="accent" size="md">Beta</wui-tag>`:null}
      </wui-flex>
    `}leftHeaderTemplate(){let{view:a}=n.I.state,b="Connect"===a,c=i.H.state.enableEmbedded,e=i.H.state.enableNetworkSwitch;return"Account"===a&&e?(0,d.qy)`<wui-select
        id="dynamic"
        data-testid="w3m-account-select-network"
        active-network=${(0,f.J)(this.network?.name)}
        @click=${this.onNetworks.bind(this)}
        imageSrc=${(0,f.J)(this.networkImage)}
      ></wui-select>`:this.showBack&&!("ApproveTransaction"===a||"ConnectingSiwe"===a||b&&c)?(0,d.qy)`<wui-icon-button
        data-testid="header-back"
        id="dynamic"
        icon="chevronLeft"
        size="lg"
        iconSize="lg"
        type="neutral"
        variant="primary"
        @click=${this.onGoBack.bind(this)}
      ></wui-icon-button>`:(0,d.qy)`<wui-icon-button
      data-hidden=${!b}
      id="dynamic"
      icon="helpCircle"
      size="lg"
      iconSize="lg"
      type="neutral"
      variant="primary"
      @click=${this.onWalletHelp.bind(this)}
    ></wui-icon-button>`}onNetworks(){this.isAllowedNetworkSwitch()&&(G.E.sendEvent({type:"track",event:"CLICK_NETWORKS"}),n.I.push("Networks"))}isAllowedNetworkSwitch(){let a=k.W.getAllRequestedCaipNetworks(),b=!!a&&a.length>1,c=a?.find(({id:a})=>a===this.network?.id);return b||!c}onViewChange(){let{history:a}=n.I.state,b=ah.o.VIEW_DIRECTION.Next;a.length<this.prevHistoryLength&&(b=ah.o.VIEW_DIRECTION.Prev),this.prevHistoryLength=a.length,this.viewDirection=b}async onHistoryChange(){let{history:a}=n.I.state,b=this.shadowRoot?.querySelector("#dynamic");a.length>1&&!this.showBack&&b?(await b.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!0,b.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"})):a.length<=1&&this.showBack&&b&&(await b.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!1,b.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}onGoBack(){n.I.goBack()}};an.styles=ai,aj([(0,e.wk)()],an.prototype,"heading",void 0),aj([(0,e.wk)()],an.prototype,"network",void 0),aj([(0,e.wk)()],an.prototype,"networkImage",void 0),aj([(0,e.wk)()],an.prototype,"showBack",void 0),aj([(0,e.wk)()],an.prototype,"prevHistoryLength",void 0),aj([(0,e.wk)()],an.prototype,"view",void 0),aj([(0,e.wk)()],an.prototype,"viewDirection",void 0),an=aj([(0,L.EM)("w3m-header")],an),c(79763),c(1222);let ao=(0,O.AH)`
  :host {
    display: flex;
    align-items: center;
    gap: ${({spacing:a})=>a[1]};
    padding: ${({spacing:a})=>a[2]} ${({spacing:a})=>a[3]}
      ${({spacing:a})=>a[2]} ${({spacing:a})=>a[2]};
    border-radius: ${({borderRadius:a})=>a[20]};
    background-color: ${({tokens:a})=>a.theme.foregroundPrimary};
    box-shadow:
      0px 0px 8px 0px rgba(0, 0, 0, 0.1),
      inset 0 0 0 1px ${({tokens:a})=>a.theme.borderPrimary};
    max-width: 320px;
  }

  wui-icon-box {
    border-radius: ${({borderRadius:a})=>a.round} !important;
    overflow: hidden;
  }

  wui-loading-spinner {
    padding: ${({spacing:a})=>a[1]};
    background-color: ${({tokens:a})=>a.core.foregroundAccent010};
    border-radius: ${({borderRadius:a})=>a.round} !important;
  }
`;var ap=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let aq=class extends d.WF{constructor(){super(...arguments),this.message="",this.variant="success"}render(){return(0,d.qy)`
      ${this.templateIcon()}
      <wui-text variant="lg-regular" color="primary" data-testid="wui-snackbar-message"
        >${this.message}</wui-text
      >
    `}templateIcon(){return"loading"===this.variant?(0,d.qy)`<wui-loading-spinner size="md" color="accent-primary"></wui-loading-spinner>`:(0,d.qy)`<wui-icon-box
      size="md"
      color=${({success:"success",error:"error",warning:"warning",info:"default"})[this.variant]}
      icon=${({success:"checkmark",error:"warning",warning:"warningCircle",info:"info"})[this.variant]}
    ></wui-icon-box>`}};aq.styles=[M.W5,ao],ap([(0,e.MZ)()],aq.prototype,"message",void 0),ap([(0,e.MZ)()],aq.prototype,"variant",void 0),aq=ap([(0,N.E)("wui-snackbar")],aq);let ar=(0,d.AH)`
  :host {
    display: block;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    top: 11px;
    left: 50%;
    width: max-content;
  }
`;var as=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let at=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.timeout=void 0,this.open=s.P.state.open,this.unsubscribe.push(s.P.subscribeKey("open",a=>{this.open=a,this.onOpen()}))}disconnectedCallback(){clearTimeout(this.timeout),this.unsubscribe.forEach(a=>a())}render(){let{message:a,variant:b}=s.P.state;return(0,d.qy)` <wui-snackbar message=${a} variant=${b}></wui-snackbar> `}onOpen(){clearTimeout(this.timeout),this.open?(this.animate([{opacity:0,transform:"translateX(-50%) scale(0.85)"},{opacity:1,transform:"translateX(-50%) scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.timeout&&clearTimeout(this.timeout),s.P.state.autoClose&&(this.timeout=setTimeout(()=>s.P.hide(),2500))):this.animate([{opacity:1,transform:"translateX(-50%) scale(1)"},{opacity:0,transform:"translateX(-50%) scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"})}};at.styles=ar,as([(0,e.wk)()],at.prototype,"open",void 0),at=as([(0,L.EM)("w3m-snackbar")],at);let au=(0,u.BX)({message:"",open:!1,triggerRect:{width:0,height:0,top:0,left:0},variant:"shade"}),av=(0,D.X)({state:au,subscribe:a=>(0,u.B1)(au,()=>a(au)),subscribeKey:(a,b)=>(0,v.u$)(au,a,b),showTooltip({message:a,triggerRect:b,variant:c}){au.open=!0,au.message=a,au.triggerRect=b,au.variant=c},hide(){au.open=!1,au.message="",au.triggerRect={width:0,height:0,top:0,left:0}}});c(24307);let aw=(0,L.AH)`
  :host {
    pointer-events: none;
  }

  :host > wui-flex {
    display: var(--w3m-tooltip-display);
    opacity: var(--w3m-tooltip-opacity);
    padding: 9px ${({spacing:a})=>a["3"]} 10px ${({spacing:a})=>a["3"]};
    border-radius: ${({borderRadius:a})=>a["3"]};
    color: ${({tokens:a})=>a.theme.backgroundPrimary};
    position: absolute;
    top: var(--w3m-tooltip-top);
    left: var(--w3m-tooltip-left);
    transform: translate(calc(-50% + var(--w3m-tooltip-parent-width)), calc(-100% - 8px));
    max-width: calc(var(--apkt-modal-width) - ${({spacing:a})=>a["5"]});
    transition: opacity ${({durations:a})=>a.lg}
      ${({easings:a})=>a["ease-out-power-2"]};
    will-change: opacity;
    opacity: 0;
    animation-duration: ${({durations:a})=>a.xl};
    animation-timing-function: ${({easings:a})=>a["ease-out-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  :host([data-variant='shade']) > wui-flex {
    background-color: ${({tokens:a})=>a.theme.foregroundPrimary};
  }

  :host([data-variant='shade']) > wui-flex > wui-text {
    color: ${({tokens:a})=>a.theme.textSecondary};
  }

  :host([data-variant='fill']) > wui-flex {
    background-color: ${({tokens:a})=>a.theme.textPrimary};
    border: none;
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
    color: ${({tokens:a})=>a.theme.foregroundPrimary};
  }

  wui-icon[data-placement='top'] {
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 95%);
  }

  wui-icon[data-placement='bottom'] {
    top: 0;
    left: 50%;
    transform: translate(-50%, -95%) rotate(180deg);
  }

  wui-icon[data-placement='right'] {
    top: 50%;
    left: 0;
    transform: translate(-65%, -50%) rotate(90deg);
  }

  wui-icon[data-placement='left'] {
    top: 50%;
    right: 0%;
    transform: translate(65%, -50%) rotate(270deg);
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;var ax=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let ay=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.open=av.state.open,this.message=av.state.message,this.triggerRect=av.state.triggerRect,this.variant=av.state.variant,this.unsubscribe.push(av.subscribe(a=>{this.open=a.open,this.message=a.message,this.triggerRect=a.triggerRect,this.variant=a.variant}))}disconnectedCallback(){this.unsubscribe.forEach(a=>a())}render(){this.dataset.variant=this.variant;let a=this.triggerRect.top,b=this.triggerRect.left;return this.style.cssText=`
    --w3m-tooltip-top: ${a}px;
    --w3m-tooltip-left: ${b}px;
    --w3m-tooltip-parent-width: ${this.triggerRect.width/2}px;
    --w3m-tooltip-display: ${this.open?"flex":"none"};
    --w3m-tooltip-opacity: ${+!!this.open};
    `,(0,d.qy)`<wui-flex>
      <wui-icon data-placement="top" size="inherit" name="cursor"></wui-icon>
      <wui-text color="primary" variant="sm-regular">${this.message}</wui-text>
    </wui-flex>`}};ay.styles=[aw],ax([(0,e.wk)()],ay.prototype,"open",void 0),ax([(0,e.wk)()],ay.prototype,"message",void 0),ax([(0,e.wk)()],ay.prototype,"triggerRect",void 0),ax([(0,e.wk)()],ay.prototype,"variant",void 0),ay=ax([(0,L.EM)("w3m-tooltip")],ay);let az={getTabsByNamespace:a=>a&&a===h.o.CHAIN.EVM?i.H.state.remoteFeatures?.activity===!1?ah.o.ACCOUNT_TABS.filter(a=>"Activity"!==a.label):ah.o.ACCOUNT_TABS:[],isValidReownName:a=>/^[a-zA-Z0-9]+$/gu.test(a),isValidEmail:a=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/gu.test(a),validateReownName:a=>a.replace(/\^/gu,"").toLowerCase().replace(/[^a-zA-Z0-9]/gu,""),hasFooter(){let a=n.I.state.view;if(ah.o.VIEWS_WITH_LEGAL_FOOTER.includes(a)){let{termsConditionsUrl:a,privacyPolicyUrl:b}=i.H.state,c=i.H.state.features?.legalCheckbox;return(!!a||!!b)&&!c}return ah.o.VIEWS_WITH_DEFAULT_FOOTER.includes(a)}};c(93093);let aA=(0,L.AH)`
  :host wui-ux-by-reown {
    padding-top: 0;
  }

  :host wui-ux-by-reown.branding-only {
    padding-top: ${({spacing:a})=>a["3"]};
  }

  a {
    text-decoration: none;
    color: ${({tokens:a})=>a.core.textAccentPrimary};
    font-weight: 500;
  }
`;var aB=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let aC=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.remoteFeatures=i.H.state.remoteFeatures,this.unsubscribe.push(i.H.subscribeKey("remoteFeatures",a=>this.remoteFeatures=a))}disconnectedCallback(){this.unsubscribe.forEach(a=>a())}render(){let{termsConditionsUrl:a,privacyPolicyUrl:b}=i.H.state,c=i.H.state.features?.legalCheckbox;return(a||b)&&!c?(0,d.qy)`
      <wui-flex flexDirection="column">
        <wui-flex .padding=${["4","3","3","3"]} justifyContent="center">
          <wui-text color="secondary" variant="md-regular" align="center">
            By connecting your wallet, you agree to our <br />
            ${this.termsTemplate()} ${this.andTemplate()} ${this.privacyTemplate()}
          </wui-text>
        </wui-flex>
        ${this.reownBrandingTemplate()}
      </wui-flex>
    `:(0,d.qy)`
        <wui-flex flexDirection="column"> ${this.reownBrandingTemplate(!0)} </wui-flex>
      `}andTemplate(){let{termsConditionsUrl:a,privacyPolicyUrl:b}=i.H.state;return a&&b?"and":""}termsTemplate(){let{termsConditionsUrl:a}=i.H.state;return a?(0,d.qy)`<a href=${a} target="_blank" rel="noopener noreferrer"
      >Terms of Service</a
    >`:null}privacyTemplate(){let{privacyPolicyUrl:a}=i.H.state;return a?(0,d.qy)`<a href=${a} target="_blank" rel="noopener noreferrer"
      >Privacy Policy</a
    >`:null}reownBrandingTemplate(a=!1){return this.remoteFeatures?.reownBranding?a?(0,d.qy)`<wui-ux-by-reown class="branding-only"></wui-ux-by-reown>`:(0,d.qy)`<wui-ux-by-reown></wui-ux-by-reown>`:null}};aC.styles=[aA],aB([(0,e.wk)()],aC.prototype,"remoteFeatures",void 0),aC=aB([(0,L.EM)("w3m-legal-footer")],aC),c(48850);let aD=(0,d.AH)``,aE=class extends d.WF{render(){let{termsConditionsUrl:a,privacyPolicyUrl:b}=i.H.state;return a||b?(0,d.qy)`
      <wui-flex
        .padding=${["4","3","3","3"]}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap="3"
      >
        <wui-text color="secondary" variant="md-regular" align="center">
          We work with the best providers to give you the lowest fees and best support. More options
          coming soon!
        </wui-text>

        ${this.howDoesItWorkTemplate()}
      </wui-flex>
    `:null}howDoesItWorkTemplate(){return(0,d.qy)` <wui-link @click=${this.onWhatIsBuy.bind(this)}>
      <wui-icon size="xs" color="accent-primary" slot="iconLeft" name="helpCircle"></wui-icon>
      How does it work?
    </wui-link>`}onWhatIsBuy(){G.E.sendEvent({type:"track",event:"SELECT_WHAT_IS_A_BUY",properties:{isSmartAccount:(0,z.lj)(k.W.state.activeChain)===x.Vl.ACCOUNT_TYPES.SMART_ACCOUNT}}),n.I.push("WhatIsABuy")}};aE.styles=[aD],aE=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g}([(0,L.EM)("w3m-onramp-providers-footer")],aE);let aF=(0,L.AH)`
  :host {
    display: block;
  }

  div.container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    height: auto;
    display: block;
  }

  div.container[status='hide'] {
    animation: fade-out;
    animation-duration: var(--apkt-duration-dynamic);
    animation-timing-function: ${({easings:a})=>a["ease-out-power-2"]};
    animation-fill-mode: both;
    animation-delay: 0s;
  }

  div.container[status='show'] {
    animation: fade-in;
    animation-duration: var(--apkt-duration-dynamic);
    animation-timing-function: ${({easings:a})=>a["ease-out-power-2"]};
    animation-fill-mode: both;
    animation-delay: var(--apkt-duration-dynamic);
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      filter: blur(6px);
    }
    to {
      opacity: 1;
      filter: blur(0px);
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
      filter: blur(0px);
    }
    to {
      opacity: 0;
      filter: blur(6px);
    }
  }
`;var aG=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let aH=class extends d.WF{constructor(){super(...arguments),this.resizeObserver=void 0,this.unsubscribe=[],this.status="hide",this.view=n.I.state.view}firstUpdated(){this.status=az.hasFooter()?"show":"hide",this.unsubscribe.push(n.I.subscribeKey("view",a=>{this.view=a,this.status=az.hasFooter()?"show":"hide","hide"===this.status&&document.documentElement.style.setProperty("--apkt-footer-height","0px")})),this.resizeObserver=new ResizeObserver(a=>{for(let b of a)if(b.target===this.getWrapper()){let a=`${b.contentRect.height}px`;document.documentElement.style.setProperty("--apkt-footer-height",a)}}),this.resizeObserver.observe(this.getWrapper())}render(){return(0,d.qy)`
      <div class="container" status=${this.status}>${this.templatePageContainer()}</div>
    `}templatePageContainer(){return az.hasFooter()?(0,d.qy)` ${this.templateFooter()}`:null}templateFooter(){switch(this.view){case"Networks":return this.templateNetworksFooter();case"Connect":case"ConnectWallets":case"OnRampFiatSelect":case"OnRampTokenSelect":return(0,d.qy)`<w3m-legal-footer></w3m-legal-footer>`;case"OnRampProviders":return(0,d.qy)`<w3m-onramp-providers-footer></w3m-onramp-providers-footer>`;default:return null}}templateNetworksFooter(){return(0,d.qy)` <wui-flex
      class="footer-in"
      padding="3"
      flexDirection="column"
      gap="3"
      alignItems="center"
    >
      <wui-text variant="md-regular" color="secondary" align="center">
        Your connected wallet may not support some of the networks available for this dApp
      </wui-text>
      <wui-link @click=${this.onNetworkHelp.bind(this)}>
        <wui-icon size="sm" color="accent-primary" slot="iconLeft" name="helpCircle"></wui-icon>
        What is a network
      </wui-link>
    </wui-flex>`}onNetworkHelp(){G.E.sendEvent({type:"track",event:"CLICK_NETWORK_HELP"}),n.I.push("WhatIsANetwork")}getWrapper(){return this.shadowRoot?.querySelector("div.container")}};aH.styles=[aF],aG([(0,e.wk)()],aH.prototype,"status",void 0),aG([(0,e.wk)()],aH.prototype,"view",void 0),aH=aG([(0,L.EM)("w3m-footer")],aH);let aI=(0,L.AH)`
  :host {
    display: block;
    width: inherit;
  }
`;var aJ=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let aK=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.viewState=n.I.state.view,this.history=n.I.state.history.join(","),this.unsubscribe.push(n.I.subscribeKey("view",()=>{this.history=n.I.state.history.join(","),document.documentElement.style.setProperty("--apkt-duration-dynamic","var(--apkt-durations-lg)")}))}disconnectedCallback(){this.unsubscribe.forEach(a=>a()),document.documentElement.style.setProperty("--apkt-duration-dynamic","0s")}render(){return(0,d.qy)`${this.templatePageContainer()}`}templatePageContainer(){return(0,d.qy)`<w3m-router-container
      history=${this.history}
      .setView=${()=>{this.viewState=n.I.state.view}}
    >
      ${this.viewTemplate(this.viewState)}
    </w3m-router-container>`}viewTemplate(a){switch(a){case"AccountSettings":return(0,d.qy)`<w3m-account-settings-view></w3m-account-settings-view>`;case"Account":return(0,d.qy)`<w3m-account-view></w3m-account-view>`;case"AllWallets":return(0,d.qy)`<w3m-all-wallets-view></w3m-all-wallets-view>`;case"ApproveTransaction":return(0,d.qy)`<w3m-approve-transaction-view></w3m-approve-transaction-view>`;case"BuyInProgress":return(0,d.qy)`<w3m-buy-in-progress-view></w3m-buy-in-progress-view>`;case"ChooseAccountName":return(0,d.qy)`<w3m-choose-account-name-view></w3m-choose-account-name-view>`;case"Connect":default:return(0,d.qy)`<w3m-connect-view></w3m-connect-view>`;case"Create":return(0,d.qy)`<w3m-connect-view walletGuide="explore"></w3m-connect-view>`;case"ConnectingWalletConnect":return(0,d.qy)`<w3m-connecting-wc-view></w3m-connecting-wc-view>`;case"ConnectingWalletConnectBasic":return(0,d.qy)`<w3m-connecting-wc-basic-view></w3m-connecting-wc-basic-view>`;case"ConnectingExternal":return(0,d.qy)`<w3m-connecting-external-view></w3m-connecting-external-view>`;case"ConnectingSiwe":return(0,d.qy)`<w3m-connecting-siwe-view></w3m-connecting-siwe-view>`;case"ConnectWallets":return(0,d.qy)`<w3m-connect-wallets-view></w3m-connect-wallets-view>`;case"ConnectSocials":return(0,d.qy)`<w3m-connect-socials-view></w3m-connect-socials-view>`;case"ConnectingSocial":return(0,d.qy)`<w3m-connecting-social-view></w3m-connecting-social-view>`;case"DataCapture":return(0,d.qy)`<w3m-data-capture-view></w3m-data-capture-view>`;case"DataCaptureOtpConfirm":return(0,d.qy)`<w3m-data-capture-otp-confirm-view></w3m-data-capture-otp-confirm-view>`;case"Downloads":return(0,d.qy)`<w3m-downloads-view></w3m-downloads-view>`;case"EmailLogin":return(0,d.qy)`<w3m-email-login-view></w3m-email-login-view>`;case"EmailVerifyOtp":return(0,d.qy)`<w3m-email-verify-otp-view></w3m-email-verify-otp-view>`;case"EmailVerifyDevice":return(0,d.qy)`<w3m-email-verify-device-view></w3m-email-verify-device-view>`;case"GetWallet":return(0,d.qy)`<w3m-get-wallet-view></w3m-get-wallet-view>`;case"Networks":return(0,d.qy)`<w3m-networks-view></w3m-networks-view>`;case"SwitchNetwork":return(0,d.qy)`<w3m-network-switch-view></w3m-network-switch-view>`;case"ProfileWallets":return(0,d.qy)`<w3m-profile-wallets-view></w3m-profile-wallets-view>`;case"Transactions":return(0,d.qy)`<w3m-transactions-view></w3m-transactions-view>`;case"OnRampProviders":return(0,d.qy)`<w3m-onramp-providers-view></w3m-onramp-providers-view>`;case"OnRampTokenSelect":return(0,d.qy)`<w3m-onramp-token-select-view></w3m-onramp-token-select-view>`;case"OnRampFiatSelect":return(0,d.qy)`<w3m-onramp-fiat-select-view></w3m-onramp-fiat-select-view>`;case"UpgradeEmailWallet":return(0,d.qy)`<w3m-upgrade-wallet-view></w3m-upgrade-wallet-view>`;case"UpdateEmailWallet":return(0,d.qy)`<w3m-update-email-wallet-view></w3m-update-email-wallet-view>`;case"UpdateEmailPrimaryOtp":return(0,d.qy)`<w3m-update-email-primary-otp-view></w3m-update-email-primary-otp-view>`;case"UpdateEmailSecondaryOtp":return(0,d.qy)`<w3m-update-email-secondary-otp-view></w3m-update-email-secondary-otp-view>`;case"UnsupportedChain":return(0,d.qy)`<w3m-unsupported-chain-view></w3m-unsupported-chain-view>`;case"Swap":return(0,d.qy)`<w3m-swap-view></w3m-swap-view>`;case"SwapSelectToken":return(0,d.qy)`<w3m-swap-select-token-view></w3m-swap-select-token-view>`;case"SwapPreview":return(0,d.qy)`<w3m-swap-preview-view></w3m-swap-preview-view>`;case"WalletSend":return(0,d.qy)`<w3m-wallet-send-view></w3m-wallet-send-view>`;case"WalletSendSelectToken":return(0,d.qy)`<w3m-wallet-send-select-token-view></w3m-wallet-send-select-token-view>`;case"WalletSendPreview":return(0,d.qy)`<w3m-wallet-send-preview-view></w3m-wallet-send-preview-view>`;case"WalletSendConfirmed":return(0,d.qy)`<w3m-send-confirmed-view></w3m-send-confirmed-view>`;case"WhatIsABuy":return(0,d.qy)`<w3m-what-is-a-buy-view></w3m-what-is-a-buy-view>`;case"WalletReceive":return(0,d.qy)`<w3m-wallet-receive-view></w3m-wallet-receive-view>`;case"WalletCompatibleNetworks":return(0,d.qy)`<w3m-wallet-compatible-networks-view></w3m-wallet-compatible-networks-view>`;case"WhatIsAWallet":return(0,d.qy)`<w3m-what-is-a-wallet-view></w3m-what-is-a-wallet-view>`;case"ConnectingMultiChain":return(0,d.qy)`<w3m-connecting-multi-chain-view></w3m-connecting-multi-chain-view>`;case"WhatIsANetwork":return(0,d.qy)`<w3m-what-is-a-network-view></w3m-what-is-a-network-view>`;case"ConnectingFarcaster":return(0,d.qy)`<w3m-connecting-farcaster-view></w3m-connecting-farcaster-view>`;case"SwitchActiveChain":return(0,d.qy)`<w3m-switch-active-chain-view></w3m-switch-active-chain-view>`;case"RegisterAccountName":return(0,d.qy)`<w3m-register-account-name-view></w3m-register-account-name-view>`;case"RegisterAccountNameSuccess":return(0,d.qy)`<w3m-register-account-name-success-view></w3m-register-account-name-success-view>`;case"SmartSessionCreated":return(0,d.qy)`<w3m-smart-session-created-view></w3m-smart-session-created-view>`;case"SmartSessionList":return(0,d.qy)`<w3m-smart-session-list-view></w3m-smart-session-list-view>`;case"SIWXSignMessage":return(0,d.qy)`<w3m-siwx-sign-message-view></w3m-siwx-sign-message-view>`;case"Pay":return(0,d.qy)`<w3m-pay-view></w3m-pay-view>`;case"PayLoading":return(0,d.qy)`<w3m-pay-loading-view></w3m-pay-loading-view>`;case"FundWallet":return(0,d.qy)`<w3m-fund-wallet-view></w3m-fund-wallet-view>`;case"PayWithExchange":return(0,d.qy)`<w3m-deposit-from-exchange-view></w3m-deposit-from-exchange-view>`;case"PayWithExchangeSelectAsset":return(0,d.qy)`<w3m-deposit-from-exchange-select-asset-view></w3m-deposit-from-exchange-select-asset-view>`}}};aK.styles=[aI],aJ([(0,e.wk)()],aK.prototype,"viewState",void 0),aJ([(0,e.wk)()],aK.prototype,"history",void 0),aK=aJ([(0,L.EM)("w3m-router")],aK);let aL=(0,L.AH)`
  :host {
    z-index: ${({tokens:a})=>a.core.zIndex};
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: ${({tokens:a})=>a.theme.overlay};
    backdrop-filter: blur(0px);
    transition:
      opacity ${({durations:a})=>a.lg} ${({easings:a})=>a["ease-out-power-2"]},
      backdrop-filter ${({durations:a})=>a.lg}
        ${({easings:a})=>a["ease-out-power-2"]};
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
    backdrop-filter: blur(8px);
  }

  :host(.appkit-modal) {
    position: relative;
    pointer-events: unset;
    background: none;
    width: 100%;
    opacity: 1;
  }

  wui-card {
    max-width: var(--apkt-modal-width);
    width: 100%;
    position: relative;
    outline: none;
    transform: translateY(4px);
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
    transition:
      transform ${({durations:a})=>a.lg}
        ${({easings:a})=>a["ease-out-power-2"]},
      border-radius ${({durations:a})=>a.lg}
        ${({easings:a})=>a["ease-out-power-1"]},
      background-color ${({durations:a})=>a.lg}
        ${({easings:a})=>a["ease-out-power-1"]},
      box-shadow ${({durations:a})=>a.lg}
        ${({easings:a})=>a["ease-out-power-1"]};
    will-change: border-radius, background-color, transform, box-shadow;
    background-color: ${({tokens:a})=>a.theme.backgroundPrimary};
    padding: var(--local-modal-padding);
    box-sizing: border-box;
  }

  :host(.open) wui-card {
    transform: translateY(0px);
  }

  wui-card::before {
    z-index: 1;
    pointer-events: none;
    content: '';
    position: absolute;
    inset: 0;
    border-radius: clamp(0px, var(--apkt-borderRadius-8), 44px);
    transition: box-shadow ${({durations:a})=>a.lg}
      ${({easings:a})=>a["ease-out-power-2"]};
    transition-delay: ${({durations:a})=>a.md};
    will-change: box-shadow;
  }

  :host([data-mobile-fullscreen='true']) wui-card::before {
    border-radius: 0px;
  }

  :host([data-border='true']) wui-card::before {
    box-shadow: inset 0px 0px 0px 4px ${({tokens:a})=>a.theme.foregroundSecondary};
  }

  :host([data-border='false']) wui-card::before {
    box-shadow: inset 0px 0px 0px 1px ${({tokens:a})=>a.theme.borderPrimaryDark};
  }

  :host([data-border='true']) wui-card {
    animation:
      fade-in ${({durations:a})=>a.lg} ${({easings:a})=>a["ease-out-power-2"]},
      card-background-border var(--apkt-duration-dynamic)
        ${({easings:a})=>a["ease-out-power-2"]};
    animation-fill-mode: backwards, both;
    animation-delay: var(--apkt-duration-dynamic);
  }

  :host([data-border='false']) wui-card {
    animation:
      fade-in ${({durations:a})=>a.lg} ${({easings:a})=>a["ease-out-power-2"]},
      card-background-default var(--apkt-duration-dynamic)
        ${({easings:a})=>a["ease-out-power-2"]};
    animation-fill-mode: backwards, both;
    animation-delay: 0s;
  }

  :host(.appkit-modal) wui-card {
    max-width: var(--apkt-modal-width);
  }

  wui-card[shake='true'] {
    animation:
      fade-in ${({durations:a})=>a.lg} ${({easings:a})=>a["ease-out-power-2"]},
      w3m-shake ${({durations:a})=>a.xl}
        ${({easings:a})=>a["ease-out-power-2"]};
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--apkt-spacing-6) 0px;
    }
  }

  @media (max-width: 430px) {
    :host([data-mobile-fullscreen='true']) {
      height: 100dvh;
    }
    :host([data-mobile-fullscreen='true']) wui-flex {
      align-items: stretch;
    }
    :host([data-mobile-fullscreen='true']) wui-card {
      max-width: 100%;
      height: 100%;
      border-radius: 0;
      border: none;
    }
    :host(:not([data-mobile-fullscreen='true'])) wui-flex {
      align-items: flex-end;
    }

    :host(:not([data-mobile-fullscreen='true'])) wui-card {
      max-width: 100%;
      border-bottom: none;
    }

    :host(:not([data-mobile-fullscreen='true'])) wui-card[data-embedded='true'] {
      border-bottom-left-radius: clamp(0px, var(--apkt-borderRadius-8), 44px);
      border-bottom-right-radius: clamp(0px, var(--apkt-borderRadius-8), 44px);
    }

    :host(:not([data-mobile-fullscreen='true'])) wui-card:not([data-embedded='true']) {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }

    wui-card[shake='true'] {
      animation: w3m-shake 0.5s ${({easings:a})=>a["ease-out-power-2"]};
    }
  }

  @keyframes fade-in {
    0% {
      transform: scale(0.99) translateY(4px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes w3m-shake {
    0% {
      transform: scale(1) rotate(0deg);
    }
    20% {
      transform: scale(1) rotate(-1deg);
    }
    40% {
      transform: scale(1) rotate(1.5deg);
    }
    60% {
      transform: scale(1) rotate(-1.5deg);
    }
    80% {
      transform: scale(1) rotate(1deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes card-background-border {
    from {
      background-color: ${({tokens:a})=>a.theme.backgroundPrimary};
    }
    to {
      background-color: ${({tokens:a})=>a.theme.foregroundSecondary};
    }
  }

  @keyframes card-background-default {
    from {
      background-color: ${({tokens:a})=>a.theme.foregroundSecondary};
    }
    to {
      background-color: ${({tokens:a})=>a.theme.backgroundPrimary};
    }
  }
`;var aM=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let aN="scroll-lock",aO={PayWithExchange:"0",PayWithExchangeSelectAsset:"0"};class aP extends d.WF{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.hasPrefetched=!1,this.enableEmbedded=i.H.state.enableEmbedded,this.open=j.W.state.open,this.caipAddress=k.W.state.activeCaipAddress,this.caipNetwork=k.W.state.activeCaipNetwork,this.shake=j.W.state.shake,this.filterByNamespace=l.a.state.filterByNamespace,this.padding=L.f.spacing[1],this.mobileFullScreen=i.H.state.enableMobileFullScreen,this.initializeTheming(),m.N.prefetchAnalyticsConfig(),this.unsubscribe.push(j.W.subscribeKey("open",a=>a?this.onOpen():this.onClose()),j.W.subscribeKey("shake",a=>this.shake=a),k.W.subscribeKey("activeCaipNetwork",a=>this.onNewNetwork(a)),k.W.subscribeKey("activeCaipAddress",a=>this.onNewAddress(a)),i.H.subscribeKey("enableEmbedded",a=>this.enableEmbedded=a),l.a.subscribeKey("filterByNamespace",a=>{this.filterByNamespace===a||k.W.getAccountData(a)?.caipAddress||(m.N.fetchRecommendedWallets(),this.filterByNamespace=a)}),n.I.subscribeKey("view",()=>{this.dataset.border=az.hasFooter()?"true":"false",this.padding=aO[n.I.state.view]??L.f.spacing[1]}))}firstUpdated(){if(this.dataset.border=az.hasFooter()?"true":"false",this.mobileFullScreen&&this.setAttribute("data-mobile-fullscreen","true"),this.caipAddress){if(this.enableEmbedded){j.W.close(),this.prefetch();return}this.onNewAddress(this.caipAddress)}this.open&&this.onOpen(),this.enableEmbedded&&this.prefetch()}disconnectedCallback(){this.unsubscribe.forEach(a=>a()),this.onRemoveKeyboardListener()}render(){return(this.style.setProperty("--local-modal-padding",this.padding),this.enableEmbedded)?(0,d.qy)`${this.contentTemplate()}
        <w3m-tooltip></w3m-tooltip> `:this.open?(0,d.qy)`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            ${this.contentTemplate()}
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `:null}contentTemplate(){return(0,d.qy)` <wui-card
      shake="${this.shake}"
      data-embedded="${(0,f.J)(this.enableEmbedded)}"
      role="alertdialog"
      aria-modal="true"
      tabindex="0"
      data-testid="w3m-modal-card"
    >
      <w3m-header></w3m-header>
      <w3m-router></w3m-router>
      <w3m-footer></w3m-footer>
      <w3m-snackbar></w3m-snackbar>
      <w3m-alertbar></w3m-alertbar>
    </wui-card>`}async onOverlayClick(a){a.target===a.currentTarget&&(this.mobileFullScreen||await this.handleClose())}async handleClose(){await q.safeClose()}initializeTheming(){let{themeVariables:a,themeMode:b}=r.W.state,c=L.Zv.getColorTheme(b);(0,L.RF)(a,c)}onClose(){this.open=!1,this.classList.remove("open"),this.onScrollUnlock(),s.P.hide(),this.onRemoveKeyboardListener()}onOpen(){this.open=!0,this.classList.add("open"),this.onScrollLock(),this.onAddKeyboardListener()}onScrollLock(){let a=document.createElement("style");a.dataset.w3m=aN,a.textContent=`
      body {
        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      w3m-modal {
        pointer-events: auto;
      }
    `,document.head.appendChild(a)}onScrollUnlock(){let a=document.head.querySelector(`style[data-w3m="${aN}"]`);a&&a.remove()}onAddKeyboardListener(){this.abortController=new AbortController;let a=this.shadowRoot?.querySelector("wui-card");a?.focus(),window.addEventListener("keydown",b=>{if("Escape"===b.key)this.handleClose();else if("Tab"===b.key){let{tagName:c}=b.target;!c||c.includes("W3M-")||c.includes("WUI-")||a?.focus()}},this.abortController)}onRemoveKeyboardListener(){this.abortController?.abort(),this.abortController=void 0}async onNewAddress(a){let b=k.W.state.isSwitchingNamespace,c="ProfileWallets"===n.I.state.view;a?await this.onConnected({caipAddress:a,isSwitchingNamespace:b,isInProfileView:c}):b||this.enableEmbedded||c||j.W.close(),await p.U.initializeIfEnabled(a),this.caipAddress=a,k.W.setIsSwitchingNamespace(!1)}async onConnected(a){if(a.isInProfileView)return;let{chainNamespace:b,chainId:c,address:d}=g.C.parseCaipAddress(a.caipAddress),e=`${b}:${c}`,f=!t.w.getPlainAddress(this.caipAddress),h=await p.U.getSessions({address:d,caipNetworkId:e}),i=!p.U.getSIWX()||h.some(a=>a.data.accountAddress===d),k=a.isSwitchingNamespace&&i&&!this.enableEmbedded,l=this.enableEmbedded&&f;k?n.I.goBack():l&&j.W.close()}onNewNetwork(a){let b=this.caipNetwork,c=b?.caipNetworkId?.toString(),d=b?.chainNamespace,e=a?.caipNetworkId?.toString(),f=a?.chainNamespace,g=c!==e,i=b?.name===h.o.UNSUPPORTED_NETWORK_NAME,l="ConnectingExternal"===n.I.state.view,m="ProfileWallets"===n.I.state.view,o=!k.W.getAccountData(a?.chainNamespace)?.caipAddress,p="UnsupportedChain"===n.I.state.view,q=j.W.state.open,r=!1;this.enableEmbedded&&"SwitchNetwork"===n.I.state.view&&(r=!0),g&&K.resetState(),q&&!l&&!m&&(o?g&&(r=!0):p?r=!0:g&&d===f&&!i&&(r=!0)),r&&"SIWXSignMessage"!==n.I.state.view&&n.I.goBack(),this.caipNetwork=a}prefetch(){this.hasPrefetched||(m.N.prefetch(),m.N.fetchWalletsByPage({page:1}),this.hasPrefetched=!0)}}aP.styles=aL,aM([(0,e.MZ)({type:Boolean})],aP.prototype,"enableEmbedded",void 0),aM([(0,e.wk)()],aP.prototype,"open",void 0),aM([(0,e.wk)()],aP.prototype,"caipAddress",void 0),aM([(0,e.wk)()],aP.prototype,"caipNetwork",void 0),aM([(0,e.wk)()],aP.prototype,"shake",void 0),aM([(0,e.wk)()],aP.prototype,"filterByNamespace",void 0),aM([(0,e.wk)()],aP.prototype,"padding",void 0),aM([(0,e.wk)()],aP.prototype,"mobileFullScreen",void 0);let aQ=class extends aP{};aQ=aM([(0,L.EM)("w3m-modal")],aQ);let aR=class extends aP{};aR=aM([(0,L.EM)("appkit-modal")],aR),c(15344);let aS=(0,L.AH)`
  :host {
    width: 100%;
  }
`;var aT=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let aU=class extends d.WF{constructor(){super(...arguments),this.hasImpressionSent=!1,this.walletImages=[],this.imageSrc="",this.name="",this.size="md",this.tabIdx=void 0,this.disabled=!1,this.showAllWallets=!1,this.loading=!1,this.loadingSpinnerColor="accent-100",this.rdnsId="",this.displayIndex=void 0,this.walletRank=void 0}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback(),this.cleanupIntersectionObserver()}updated(a){super.updated(a),(a.has("name")||a.has("imageSrc")||a.has("walletRank"))&&(this.hasImpressionSent=!1),a.has("walletRank")&&this.walletRank&&!this.intersectionObserver&&this.setupIntersectionObserver()}setupIntersectionObserver(){this.intersectionObserver=new IntersectionObserver(a=>{a.forEach(a=>{!a.isIntersecting||this.loading||this.hasImpressionSent||this.sendImpressionEvent()})},{threshold:.1}),this.intersectionObserver.observe(this)}cleanupIntersectionObserver(){this.intersectionObserver&&(this.intersectionObserver.disconnect(),this.intersectionObserver=void 0)}sendImpressionEvent(){this.name&&!this.hasImpressionSent&&this.walletRank&&(this.hasImpressionSent=!0,(this.rdnsId||this.name)&&G.E.sendWalletImpressionEvent({name:this.name,walletRank:this.walletRank,rdnsId:this.rdnsId,view:n.I.state.view,displayIndex:this.displayIndex}))}render(){return(0,d.qy)`
      <wui-list-wallet
        .walletImages=${this.walletImages}
        imageSrc=${(0,f.J)(this.imageSrc)}
        name=${this.name}
        size=${(0,f.J)(this.size)}
        tagLabel=${(0,f.J)(this.tagLabel)}
        .tagVariant=${this.tagVariant}
        .walletIcon=${this.walletIcon}
        .tabIdx=${this.tabIdx}
        .disabled=${this.disabled}
        .showAllWallets=${this.showAllWallets}
        .loading=${this.loading}
        loadingSpinnerColor=${this.loadingSpinnerColor}
      ></wui-list-wallet>
    `}};aU.styles=aS,aT([(0,e.MZ)({type:Array})],aU.prototype,"walletImages",void 0),aT([(0,e.MZ)()],aU.prototype,"imageSrc",void 0),aT([(0,e.MZ)()],aU.prototype,"name",void 0),aT([(0,e.MZ)()],aU.prototype,"size",void 0),aT([(0,e.MZ)()],aU.prototype,"tagLabel",void 0),aT([(0,e.MZ)()],aU.prototype,"tagVariant",void 0),aT([(0,e.MZ)()],aU.prototype,"walletIcon",void 0),aT([(0,e.MZ)()],aU.prototype,"tabIdx",void 0),aT([(0,e.MZ)({type:Boolean})],aU.prototype,"disabled",void 0),aT([(0,e.MZ)({type:Boolean})],aU.prototype,"showAllWallets",void 0),aT([(0,e.MZ)({type:Boolean})],aU.prototype,"loading",void 0),aT([(0,e.MZ)({type:String})],aU.prototype,"loadingSpinnerColor",void 0),aT([(0,e.MZ)()],aU.prototype,"rdnsId",void 0),aT([(0,e.MZ)()],aU.prototype,"displayIndex",void 0),aT([(0,e.MZ)()],aU.prototype,"walletRank",void 0),aU=aT([(0,L.EM)("w3m-list-wallet")],aU);let aV=(0,L.AH)`
  :host {
    --local-duration-height: 0s;
    --local-duration: ${({durations:a})=>a.lg};
    --local-transition: ${({easings:a})=>a["ease-out-power-2"]};
  }

  .container {
    display: block;
    overflow: hidden;
    overflow: hidden;
    position: relative;
    height: var(--local-container-height);
    transition: height var(--local-duration-height) var(--local-transition);
    will-change: height, padding-bottom;
  }

  .container[data-mobile-fullscreen='true'] {
    overflow: scroll;
  }

  .page {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: auto;
    width: inherit;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: ${({tokens:a})=>a.theme.backgroundPrimary};
    border-bottom-left-radius: var(--local-border-bottom-radius);
    border-bottom-right-radius: var(--local-border-bottom-radius);
    transition: border-bottom-left-radius var(--local-duration) var(--local-transition);
  }

  .page[data-mobile-fullscreen='true'] {
    height: 100%;
  }

  .page-content {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  .footer {
    height: var(--apkt-footer-height);
  }

  div.page[view-direction^='prev-'] .page-content {
    animation:
      slide-left-out var(--local-duration) forwards var(--local-transition),
      slide-left-in var(--local-duration) forwards var(--local-transition);
    animation-delay: 0ms, var(--local-duration, ${({durations:a})=>a.lg});
  }

  div.page[view-direction^='next-'] .page-content {
    animation:
      slide-right-out var(--local-duration) forwards var(--local-transition),
      slide-right-in var(--local-duration) forwards var(--local-transition);
    animation-delay: 0ms, var(--local-duration, ${({durations:a})=>a.lg});
  }

  @keyframes slide-left-out {
    from {
      transform: translateX(0px) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
    to {
      transform: translateX(8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
  }

  @keyframes slide-left-in {
    from {
      transform: translateX(-8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
    to {
      transform: translateX(0) translateY(0) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
  }

  @keyframes slide-right-out {
    from {
      transform: translateX(0px) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
    to {
      transform: translateX(-8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
  }

  @keyframes slide-right-in {
    from {
      transform: translateX(8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
    to {
      transform: translateX(0) translateY(0) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
  }
`;var aW=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let aX=class extends d.WF{constructor(){super(...arguments),this.resizeObserver=void 0,this.transitionDuration="0.15s",this.transitionFunction="",this.history="",this.view="",this.setView=void 0,this.viewDirection="",this.historyState="",this.previousHeight="0px",this.mobileFullScreen=i.H.state.enableMobileFullScreen,this.onViewportResize=()=>{this.updateContainerHeight()}}updated(a){if(a.has("history")){let a=this.history;""!==this.historyState&&this.historyState!==a&&this.onViewChange(a)}a.has("transitionDuration")&&this.style.setProperty("--local-duration",this.transitionDuration),a.has("transitionFunction")&&this.style.setProperty("--local-transition",this.transitionFunction)}firstUpdated(){this.transitionFunction&&this.style.setProperty("--local-transition",this.transitionFunction),this.style.setProperty("--local-duration",this.transitionDuration),this.historyState=this.history,this.resizeObserver=new ResizeObserver(a=>{for(let b of a)if(b.target===this.getWrapper()){let a=b.contentRect.height,c=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--apkt-footer-height")||"0");this.mobileFullScreen?(a=(window.visualViewport?.height||window.innerHeight)-this.getHeaderHeight()-c,this.style.setProperty("--local-border-bottom-radius","0px")):(a+=c,this.style.setProperty("--local-border-bottom-radius",c?"var(--apkt-borderRadius-5)":"0px")),this.style.setProperty("--local-container-height",`${a}px`),"0px"!==this.previousHeight&&this.style.setProperty("--local-duration-height",this.transitionDuration),this.previousHeight=`${a}px`}}),this.resizeObserver.observe(this.getWrapper()),this.updateContainerHeight(),window.addEventListener("resize",this.onViewportResize),window.visualViewport?.addEventListener("resize",this.onViewportResize)}disconnectedCallback(){let a=this.getWrapper();a&&this.resizeObserver&&this.resizeObserver.unobserve(a),window.removeEventListener("resize",this.onViewportResize),window.visualViewport?.removeEventListener("resize",this.onViewportResize)}render(){return(0,d.qy)`
      <div class="container" data-mobile-fullscreen="${(0,f.J)(this.mobileFullScreen)}">
        <div
          class="page"
          data-mobile-fullscreen="${(0,f.J)(this.mobileFullScreen)}"
          view-direction="${this.viewDirection}"
        >
          <div class="page-content">
            <slot></slot>
          </div>
        </div>
      </div>
    `}onViewChange(a){let b=a.split(",").filter(Boolean),c=this.historyState.split(",").filter(Boolean),d=c.length,e=b.length,f=b[b.length-1]||"",g=L.Zv.cssDurationToNumber(this.transitionDuration),h="";e>d?h="next":e<d?h="prev":e===d&&b[e-1]!==c[d-1]&&(h="next"),this.viewDirection=`${h}-${f}`,setTimeout(()=>{this.historyState=a,this.setView?.(f)},g),setTimeout(()=>{this.viewDirection=""},2*g)}getWrapper(){return this.shadowRoot?.querySelector("div.page")}updateContainerHeight(){let a=this.getWrapper();if(!a)return;let b=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--apkt-footer-height")||"0"),c=0;this.mobileFullScreen?(c=(window.visualViewport?.height||window.innerHeight)-this.getHeaderHeight()-b,this.style.setProperty("--local-border-bottom-radius","0px")):(c=a.getBoundingClientRect().height+b,this.style.setProperty("--local-border-bottom-radius",b?"var(--apkt-borderRadius-5)":"0px")),this.style.setProperty("--local-container-height",`${c}px`),"0px"!==this.previousHeight&&this.style.setProperty("--local-duration-height",this.transitionDuration),this.previousHeight=`${c}px`}getHeaderHeight(){return 60}};aX.styles=[aV],aW([(0,e.MZ)({type:String})],aX.prototype,"transitionDuration",void 0),aW([(0,e.MZ)({type:String})],aX.prototype,"transitionFunction",void 0),aW([(0,e.MZ)({type:String})],aX.prototype,"history",void 0),aW([(0,e.MZ)({type:String})],aX.prototype,"view",void 0),aW([(0,e.MZ)({attribute:!1})],aX.prototype,"setView",void 0),aW([(0,e.wk)()],aX.prototype,"viewDirection",void 0),aW([(0,e.wk)()],aX.prototype,"historyState",void 0),aW([(0,e.wk)()],aX.prototype,"previousHeight",void 0),aW([(0,e.wk)()],aX.prototype,"mobileFullScreen",void 0),aX=aW([(0,L.EM)("w3m-router-container")],aX)}};