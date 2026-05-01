exports.id=5715,exports.ids=[5715],exports.modules={4061:(a,b)=>{let c="\x1b[37m",d="\x1b[30m",e="\x1b[0m",f="\x1b[47m"+d,g="\x1b[40m"+c,h=function(a,b,c,d){let e=b+1;return c>=e||d>=e||d<-1||c<-1?"0":c>=b||d>=b||d<0||c<0?"1":a[d*b+c]?"2":"1"},i=function(a,b,c,d){return h(a,b,c,d)+h(a,b,c,d+1)};b.render=function(a,b,h){var j,k;let l=a.modules.size,m=a.modules.data,n=!!(b&&b.inverse),o=b&&b.inverse?g:f,p={"00":e+" "+o,"01":e+(j=n?d:c)+"▄"+o,"02":e+(k=n?c:d)+"▄"+o,10:e+j+"▀"+o,11:" ",12:"▄",20:e+k+"▀"+o,21:"▀",22:"█"},q=e+"\n"+o,r=o;for(let a=-1;a<l+1;a+=2){for(let b=-1;b<l;b++)r+=p[i(m,l,b,a)];r+=p[i(m,l,l,a)]+q}return r+=e,"function"==typeof h&&h(null,r),r}},6877:(a,b,c)=>{"use strict";a.exports=c(43166)},11264:(a,b)=>{function c(a){if("number"==typeof a&&(a=a.toString()),"string"!=typeof a)throw Error("Color should be defined as hex string");let b=a.slice().replace("#","").split("");if(b.length<3||5===b.length||b.length>8)throw Error("Invalid hex color: "+a);(3===b.length||4===b.length)&&(b=Array.prototype.concat.apply([],b.map(function(a){return[a,a]}))),6===b.length&&b.push("F","F");let c=parseInt(b.join(""),16);return{r:c>>24&255,g:c>>16&255,b:c>>8&255,a:255&c,hex:"#"+b.slice(0,6).join("")}}b.getOptions=function(a){a||(a={}),a.color||(a.color={});let b=void 0===a.margin||null===a.margin||a.margin<0?4:a.margin,d=a.width&&a.width>=21?a.width:void 0,e=a.scale||4;return{width:d,scale:d?4:e,margin:b,color:{dark:c(a.color.dark||"#000000ff"),light:c(a.color.light||"#ffffffff")},type:a.type,rendererOpts:a.rendererOpts||{}}},b.getScale=function(a,b){return b.width&&b.width>=a+2*b.margin?b.width/(a+2*b.margin):b.scale},b.getImageWidth=function(a,c){let d=b.getScale(a,c);return Math.floor((a+2*c.margin)*d)},b.qrToImageData=function(a,c,d){let e=c.modules.size,f=c.modules.data,g=b.getScale(e,d),h=Math.floor((e+2*d.margin)*g),i=d.margin*g,j=[d.color.light,d.color.dark];for(let b=0;b<h;b++)for(let c=0;c<h;c++){let k=(b*h+c)*4,l=d.color.light;b>=i&&c>=i&&b<h-i&&c<h-i&&(l=j[+!!f[Math.floor((b-i)/g)*e+Math.floor((c-i)/g)]]),a[k++]=l.r,a[k++]=l.g,a[k++]=l.b,a[k]=l.a}}},20073:(a,b)=>{let c=new Uint8Array(512),d=new Uint8Array(256);!function(){let a=1;for(let b=0;b<255;b++)c[b]=a,d[a]=b,256&(a<<=1)&&(a^=285);for(let a=255;a<512;a++)c[a]=c[a-255]}(),b.log=function(a){if(a<1)throw Error("log("+a+")");return d[a]},b.exp=function(a){return c[a]},b.mul=function(a,b){return 0===a||0===b?0:c[d[a]+d[b]]}},21790:(a,b,c)=>{let d=c(29021),e=c(22016).O,f=c(11264);b.render=function(a,b){let c=f.getOptions(b),d=c.rendererOpts,g=f.getImageWidth(a.modules.size,c);d.width=g,d.height=g;let h=new e(d);return f.qrToImageData(h.data,a,c),h},b.renderToDataURL=function(a,c,d){void 0===d&&(d=c,c=void 0),b.renderToBuffer(a,c,function(a,b){a&&d(a);let c="data:image/png;base64,";c+=b.toString("base64"),d(null,c)})},b.renderToBuffer=function(a,c,d){void 0===d&&(d=c,c=void 0);let e=b.render(a,c),f=[];e.on("error",d),e.on("data",function(a){f.push(a)}),e.on("end",function(){d(null,Buffer.concat(f))}),e.pack()},b.renderToFile=function(a,c,e,f){void 0===f&&(f=e,e=void 0);let g=!1,h=(...a)=>{g||(g=!0,f.apply(null,a))},i=d.createWriteStream(a);i.on("error",h),i.on("close",h),b.renderToFileStream(i,c,e)},b.renderToFileStream=function(a,c,d){b.render(c,d).pack().pipe(a)}},26987:(a,b,c)=>{let d=c(72468),e=c(50659),f=c(74525),g=c(36302),h=c(72463),i=c(69082),j=c(74718),k=c(89476),l=c(27710),m=c(35913),n=c(59947),o=c(90334),p=c(65419);function q(a,b,c){let d,e,f=a.size,g=n.getEncodedBits(b,c);for(d=0;d<15;d++)e=(g>>d&1)==1,d<6?a.set(d,8,e,!0):d<8?a.set(d+1,8,e,!0):a.set(f-15+d,8,e,!0),d<8?a.set(8,f-d-1,e,!0):d<9?a.set(8,15-d-1+1,e,!0):a.set(8,15-d-1,e,!0);a.set(f-8,8,1,!0)}b.create=function(a,b){let c,n;if(void 0===a||""===a)throw Error("No input text");let r=e.M;return void 0!==b&&(r=e.from(b.errorCorrectionLevel,e.M),c=m.from(b.version),n=j.from(b.maskPattern),b.toSJISFunc&&d.setToSJISFunction(b.toSJISFunc)),function(a,b,c,e){let n;if(Array.isArray(a))n=p.fromArray(a);else if("string"==typeof a){let d=b;if(!d){let b=p.rawSplit(a);d=m.getBestVersionForData(b,c)}n=p.fromString(a,d||40)}else throw Error("Invalid data");let r=m.getBestVersionForData(n,c);if(!r)throw Error("The amount of data is too big to be stored in a QR Code");if(b){if(b<r)throw Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: "+r+".\n")}else b=r;let s=function(a,b,c){let e=new f;c.forEach(function(b){e.put(b.mode.bit,4),e.put(b.getLength(),o.getCharCountIndicator(b.mode,a)),b.write(e)});let g=(d.getSymbolTotalCodewords(a)-k.getTotalCodewordsCount(a,b))*8;for(e.getLengthInBits()+4<=g&&e.put(0,4);e.getLengthInBits()%8!=0;)e.putBit(0);let h=(g-e.getLengthInBits())/8;for(let a=0;a<h;a++)e.put(a%2?17:236,8);return function(a,b,c){let e,f,g=d.getSymbolTotalCodewords(b),h=g-k.getTotalCodewordsCount(b,c),i=k.getBlocksCount(b,c),j=g%i,m=i-j,n=Math.floor(g/i),o=Math.floor(h/i),p=o+1,q=n-o,r=new l(q),s=0,t=Array(i),u=Array(i),v=0,w=new Uint8Array(a.buffer);for(let a=0;a<i;a++){let b=a<m?o:p;t[a]=w.slice(s,s+b),u[a]=r.encode(t[a]),s+=b,v=Math.max(v,b)}let x=new Uint8Array(g),y=0;for(e=0;e<v;e++)for(f=0;f<i;f++)e<t[f].length&&(x[y++]=t[f][e]);for(e=0;e<q;e++)for(f=0;f<i;f++)x[y++]=u[f][e];return x}(e,a,b)}(b,c,n),t=new g(d.getSymbolSize(b));!function(a,b){let c=a.size,d=i.getPositions(b);for(let b=0;b<d.length;b++){let e=d[b][0],f=d[b][1];for(let b=-1;b<=7;b++)if(!(e+b<=-1)&&!(c<=e+b))for(let d=-1;d<=7;d++)f+d<=-1||c<=f+d||(b>=0&&b<=6&&(0===d||6===d)||d>=0&&d<=6&&(0===b||6===b)||b>=2&&b<=4&&d>=2&&d<=4?a.set(e+b,f+d,!0,!0):a.set(e+b,f+d,!1,!0))}}(t,b);let u=t.size;for(let a=8;a<u-8;a++){let b=a%2==0;t.set(a,6,b,!0),t.set(6,a,b,!0)}return!function(a,b){let c=h.getPositions(b);for(let b=0;b<c.length;b++){let d=c[b][0],e=c[b][1];for(let b=-2;b<=2;b++)for(let c=-2;c<=2;c++)-2===b||2===b||-2===c||2===c||0===b&&0===c?a.set(d+b,e+c,!0,!0):a.set(d+b,e+c,!1,!0)}}(t,b),q(t,c,0),b>=7&&function(a,b){let c,d,e,f=a.size,g=m.getEncodedBits(b);for(let b=0;b<18;b++)c=Math.floor(b/3),d=b%3+f-8-3,e=(g>>b&1)==1,a.set(c,d,e,!0),a.set(d,c,e,!0)}(t,b),!function(a,b){let c=a.size,d=-1,e=c-1,f=7,g=0;for(let h=c-1;h>0;h-=2)for(6===h&&h--;;){for(let c=0;c<2;c++)if(!a.isReserved(e,h-c)){let d=!1;g<b.length&&(d=(b[g]>>>f&1)==1),a.set(e,h-c,d),-1==--f&&(g++,f=7)}if((e+=d)<0||c<=e){e-=d,d=-d;break}}}(t,s),isNaN(e)&&(e=j.getBestMask(t,q.bind(null,t,c))),j.applyMask(e,t),q(t,c,e),{modules:t,version:b,errorCorrectionLevel:c,maskPattern:e,segments:n}}(a,c,r,n)}},27710:(a,b,c)=>{let d=c(48855);function e(a){this.genPoly=void 0,this.degree=a,this.degree&&this.initialize(this.degree)}e.prototype.initialize=function(a){this.degree=a,this.genPoly=d.generateECPolynomial(this.degree)},e.prototype.encode=function(a){if(!this.genPoly)throw Error("Encoder not initialized");let b=new Uint8Array(a.length+this.degree);b.set(a);let c=d.mod(b,this.genPoly),e=this.degree-c.length;if(e>0){let a=new Uint8Array(this.degree);return a.set(c,e),a}return c},a.exports=e},33906:(a,b)=>{let c="[0-9]+",d="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+",e="(?:(?![A-Z0-9 $%*+\\-./:]|"+(d=d.replace(/u/g,"\\u"))+")(?:.|[\r\n]))+";b.KANJI=RegExp(d,"g"),b.BYTE_KANJI=RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),b.BYTE=RegExp(e,"g"),b.NUMERIC=RegExp(c,"g"),b.ALPHANUMERIC=RegExp("[A-Z $%*+\\-./:]+","g");let f=RegExp("^"+d+"$"),g=RegExp("^"+c+"$"),h=RegExp("^[A-Z0-9 $%*+\\-./:]+$");b.testKanji=function(a){return f.test(a)},b.testNumeric=function(a){return g.test(a)},b.testAlphanumeric=function(a){return h.test(a)}},35913:(a,b,c)=>{let d=c(72468),e=c(89476),f=c(50659),g=c(90334),h=c(80440),i=d.getBCHDigit(7973);function j(a,b){return g.getCharCountIndicator(a,b)+4}b.from=function(a,b){return h.isValid(a)?parseInt(a,10):b},b.getCapacity=function(a,b,c){if(!h.isValid(a))throw Error("Invalid QR Code version");void 0===c&&(c=g.BYTE);let f=(d.getSymbolTotalCodewords(a)-e.getTotalCodewordsCount(a,b))*8;if(c===g.MIXED)return f;let i=f-j(c,a);switch(c){case g.NUMERIC:return Math.floor(i/10*3);case g.ALPHANUMERIC:return Math.floor(i/11*2);case g.KANJI:return Math.floor(i/13);case g.BYTE:default:return Math.floor(i/8)}},b.getBestVersionForData=function(a,c){let d,e=f.from(c,f.M);if(Array.isArray(a)){if(a.length>1){for(let c=1;c<=40;c++)if(function(a,b){let c=0;return a.forEach(function(a){let d=j(a.mode,b);c+=d+a.getBitsLength()}),c}(a,c)<=b.getCapacity(c,e,g.MIXED))return c;return}if(0===a.length)return 1;d=a[0]}else d=a;return function(a,c,d){for(let e=1;e<=40;e++)if(c<=b.getCapacity(e,d,a))return e}(d.mode,d.getLength(),e)},b.getEncodedBits=function(a){if(!h.isValid(a)||a<7)throw Error("Invalid QR Code version");let b=a<<12;for(;d.getBCHDigit(b)-i>=0;)b^=7973<<d.getBCHDigit(b)-i;return a<<12|b}},36302:a=>{function b(a){if(!a||a<1)throw Error("BitMatrix size must be defined and greater than 0");this.size=a,this.data=new Uint8Array(a*a),this.reservedBit=new Uint8Array(a*a)}b.prototype.set=function(a,b,c,d){let e=a*this.size+b;this.data[e]=c,d&&(this.reservedBit[e]=!0)},b.prototype.get=function(a,b){return this.data[a*this.size+b]},b.prototype.xor=function(a,b,c){this.data[a*this.size+b]^=c},b.prototype.isReserved=function(a,b){return this.reservedBit[a*this.size+b]},a.exports=b},43166:(a,b,c)=>{let d=c(79259),e=c(26987),f=c(21790),g=c(99830),h=c(85769),i=c(47087);function j(a,b,c){if(void 0===a)throw Error("String required as first argument");if(void 0===c&&(c=b,b={}),"function"!=typeof c)if(d())b=c||{},c=null;else throw Error("Callback required as last argument");return{opts:b,cb:c}}function k(a){switch(a){case"svg":return i;case"txt":case"utf8":return g;default:return f}}function l(a,b,c){if(!c.cb)return new Promise(function(d,f){try{let g=e.create(b,c.opts);return a(g,c.opts,function(a,b){return a?f(a):d(b)})}catch(a){f(a)}});try{let d=e.create(b,c.opts);return a(d,c.opts,c.cb)}catch(a){c.cb(a)}}b.create=e.create,b.toCanvas=c(92557).toCanvas,b.toString=function(a,b,c){let d=j(a,b,c);return l(function(a){switch(a){case"svg":return i;case"terminal":return h;default:return g}}(d.opts?d.opts.type:void 0).render,a,d)},b.toDataURL=function(a,b,c){let d=j(a,b,c);return l(k(d.opts.type).renderToDataURL,a,d)},b.toBuffer=function(a,b,c){let d=j(a,b,c);return l(k(d.opts.type).renderToBuffer,a,d)},b.toFile=function(a,b,c,e){if("string"!=typeof a||"string"!=typeof b&&"object"!=typeof b)throw Error("Invalid argument");if(arguments.length<3&&!d())throw Error("Too few arguments provided");let f=j(b,c,e);return l(k(f.opts.type||a.slice((a.lastIndexOf(".")-1>>>0)+2).toLowerCase()).renderToFile.bind(null,a),b,f)},b.toFileStream=function(a,b,c){if(arguments.length<2)throw Error("Too few arguments provided");let d=j(b,c,a.emit.bind(a,"error"));l(k("png").renderToFileStream.bind(null,a),b,d)}},45715:(a,b,c)=>{"use strict";c.r(b),c.d(b,{W3mAllWalletsView:()=>bp,W3mConnectingWcBasicView:()=>aG,W3mDownloadsView:()=>bt});var d=c(29856),e=c(26990),f=c(13295),g=c(51048),h=c(10306),i=c(36087),j=c(35198);c(58581);var k=c(22734),l=c(85601),m=c(95209),n=c(20053),o=c(26641),p=c(87977);c(15344);var q=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let r=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=m.a.state.connectors,this.count=h.N.state.count,this.filteredCount=h.N.state.filteredWallets.length,this.isFetchingRecommendedWallets=h.N.state.isFetchingRecommendedWallets,this.unsubscribe.push(m.a.subscribeKey("connectors",a=>this.connectors=a),h.N.subscribeKey("count",a=>this.count=a),h.N.subscribeKey("filteredWallets",a=>this.filteredCount=a.length),h.N.subscribeKey("isFetchingRecommendedWallets",a=>this.isFetchingRecommendedWallets=a))}disconnectedCallback(){this.unsubscribe.forEach(a=>a())}render(){let a=this.connectors.find(a=>"walletConnect"===a.id),{allWallets:b}=g.H.state;if(!a||"HIDE"===b||"ONLY_MOBILE"===b&&!f.w.isMobile())return null;let c=h.N.state.featured.length,e=this.count+c,i=e<10?e:10*Math.floor(e/10),j=this.filteredCount>0?this.filteredCount:i,m=`${j}`;this.filteredCount>0?m=`${this.filteredCount}`:j<e&&(m=`${j}+`);let o=n.x.hasAnyConnection(l.o.CONNECTOR_ID.WALLET_CONNECT);return(0,d.qy)`
      <wui-list-wallet
        name="Search Wallet"
        walletIcon="search"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${m}
        tagVariant="info"
        data-testid="all-wallets"
        tabIdx=${(0,k.J)(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        ?disabled=${o}
        size="sm"
      ></wui-list-wallet>
    `}onAllWallets(){o.E.sendEvent({type:"track",event:"CLICK_ALL_WALLETS"}),p.I.push("AllWallets",{redirectView:p.I.state.data?.redirectView})}};q([(0,e.MZ)()],r.prototype,"tabIdx",void 0),q([(0,e.wk)()],r.prototype,"connectors",void 0),q([(0,e.wk)()],r.prototype,"count",void 0),q([(0,e.wk)()],r.prototype,"filteredCount",void 0),q([(0,e.wk)()],r.prototype,"isFetchingRecommendedWallets",void 0),r=q([(0,j.EM)("w3m-all-wallets-widget")],r);var s=c(69710),t=c(40190),u=c(6353),v=c(32243);let w=(0,j.AH)`
  :host {
    margin-top: ${({spacing:a})=>a["1"]};
  }
  wui-separator {
    margin: ${({spacing:a})=>a["3"]} calc(${({spacing:a})=>a["3"]} * -1)
      ${({spacing:a})=>a["2"]} calc(${({spacing:a})=>a["3"]} * -1);
    width: calc(100% + ${({spacing:a})=>a["3"]} * 2);
  }
`;var x=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let y=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.connectors=m.a.state.connectors,this.recommended=h.N.state.recommended,this.featured=h.N.state.featured,this.explorerWallets=h.N.state.explorerWallets,this.connections=n.x.state.connections,this.connectorImages=s.j.state.connectorImages,this.loadingTelegram=!1,this.unsubscribe.push(m.a.subscribeKey("connectors",a=>this.connectors=a),n.x.subscribeKey("connections",a=>this.connections=a),s.j.subscribeKey("connectorImages",a=>this.connectorImages=a),h.N.subscribeKey("recommended",a=>this.recommended=a),h.N.subscribeKey("featured",a=>this.featured=a),h.N.subscribeKey("explorerFilteredWallets",a=>{this.explorerWallets=a?.length?a:h.N.state.explorerWallets}),h.N.subscribeKey("explorerWallets",a=>{this.explorerWallets?.length||(this.explorerWallets=a)})),f.w.isTelegram()&&f.w.isIos()&&(this.loadingTelegram=!n.x.state.wcUri,this.unsubscribe.push(n.x.subscribeKey("wcUri",a=>this.loadingTelegram=!a)))}disconnectedCallback(){this.unsubscribe.forEach(a=>a())}render(){return(0,d.qy)`
      <wui-flex flexDirection="column" gap="2"> ${this.connectorListTemplate()} </wui-flex>
    `}mapConnectorsToExplorerWallets(a,b){return a.map(a=>{if("MULTI_CHAIN"===a.type&&a.connectors){let c=a.connectors.map(a=>a.id),d=a.connectors.map(a=>a.name),e=a.connectors.map(a=>a.info?.rdns);return a.explorerWallet=b?.find(a=>c.includes(a.id)||d.includes(a.name)||a.rdns&&(e.includes(a.rdns)||c.includes(a.rdns)))??a.explorerWallet,a}let c=b?.find(b=>b.id===a.id||b.rdns===a.info?.rdns||b.name===a.name);return a.explorerWallet=c??a.explorerWallet,a})}processConnectorsByType(a,b=!0){let c=v.g.sortConnectorsByExplorerWallet([...a]);return b?c.filter(v.g.showConnector):c}connectorListTemplate(){let a=this.mapConnectorsToExplorerWallets(this.connectors,this.explorerWallets??[]),b=v.g.getConnectorsByType(a,this.recommended,this.featured),c=this.processConnectorsByType(b.announced.filter(a=>"walletConnect"!==a.id)),d=this.processConnectorsByType(b.injected),e=this.processConnectorsByType(b.multiChain.filter(a=>"WalletConnect"!==a.name),!1),g=b.custom,h=b.recent,i=this.processConnectorsByType(b.external.filter(a=>a.id!==l.o.CONNECTOR_ID.COINBASE_SDK)),j=b.recommended,k=b.featured,m=v.g.getConnectorTypeOrder({custom:g,recent:h,announced:c,injected:d,multiChain:e,recommended:j,featured:k,external:i}),n=this.connectors.find(a=>"walletConnect"===a.id),o=f.w.isMobile(),p=[];for(let a of m)switch(a){case"walletConnect":!o&&n&&p.push({kind:"connector",subtype:"walletConnect",connector:n});break;case"recent":v.g.getFilteredRecentWallets().forEach(a=>p.push({kind:"wallet",subtype:"recent",wallet:a}));break;case"injected":e.forEach(a=>p.push({kind:"connector",subtype:"multiChain",connector:a})),c.forEach(a=>p.push({kind:"connector",subtype:"announced",connector:a})),d.forEach(a=>p.push({kind:"connector",subtype:"injected",connector:a}));break;case"featured":k.forEach(a=>p.push({kind:"wallet",subtype:"featured",wallet:a}));break;case"custom":v.g.getFilteredCustomWallets(g??[]).forEach(a=>p.push({kind:"wallet",subtype:"custom",wallet:a}));break;case"external":i.forEach(a=>p.push({kind:"connector",subtype:"external",connector:a}));break;case"recommended":v.g.getCappedRecommendedWallets(j).forEach(a=>p.push({kind:"wallet",subtype:"recommended",wallet:a}));break;default:console.warn(`Unknown connector type: ${a}`)}return p.map((a,b)=>"connector"===a.kind?this.renderConnector(a,b):this.renderWallet(a,b))}renderConnector(a,b){let c,e,f=a.connector,g=t.$.getConnectorImage(f)||this.connectorImages[f?.imageId??""],h=(this.connections.get(f.chain)??[]).some(a=>u.y.isLowerCaseMatch(a.connectorId,f.id));"multiChain"===a.subtype?(c="multichain",e="info"):"walletConnect"===a.subtype?(c="qr code",e="accent"):"injected"===a.subtype||"announced"===a.subtype?(c=h?"connected":"installed",e=h?"info":"success"):(c=void 0,e=void 0);let i=n.x.hasAnyConnection(l.o.CONNECTOR_ID.WALLET_CONNECT),j=("walletConnect"===a.subtype||"external"===a.subtype)&&i;return(0,d.qy)`
      <w3m-list-wallet
        displayIndex=${b}
        imageSrc=${(0,k.J)(g)}
        .installed=${!0}
        name=${f.name??"Unknown"}
        .tagVariant=${e}
        tagLabel=${(0,k.J)(c)}
        data-testid=${`wallet-selector-${f.id.toLowerCase()}`}
        size="sm"
        @click=${()=>this.onClickConnector(a)}
        tabIdx=${(0,k.J)(this.tabIdx)}
        ?disabled=${j}
        rdnsId=${(0,k.J)(f.explorerWallet?.rdns||void 0)}
        walletRank=${(0,k.J)(f.explorerWallet?.order)}
      >
      </w3m-list-wallet>
    `}onClickConnector(a){let b=p.I.state.data?.redirectView;if("walletConnect"===a.subtype){m.a.setActiveConnector(a.connector),f.w.isMobile()?p.I.push("AllWallets"):p.I.push("ConnectingWalletConnect",{redirectView:b});return}if("multiChain"===a.subtype){m.a.setActiveConnector(a.connector),p.I.push("ConnectingMultiChain",{redirectView:b});return}if("injected"===a.subtype){m.a.setActiveConnector(a.connector),p.I.push("ConnectingExternal",{connector:a.connector,redirectView:b,wallet:a.connector.explorerWallet});return}if("announced"===a.subtype)return"walletConnect"===a.connector.id?void(f.w.isMobile()?p.I.push("AllWallets"):p.I.push("ConnectingWalletConnect",{redirectView:b})):(p.I.push("ConnectingExternal",{connector:a.connector,redirectView:b,wallet:a.connector.explorerWallet}),void 0);p.I.push("ConnectingExternal",{connector:a.connector,redirectView:b})}renderWallet(a,b){let c=a.wallet,e=t.$.getWalletImage(c),f=n.x.hasAnyConnection(l.o.CONNECTOR_ID.WALLET_CONNECT),g=this.loadingTelegram,h="recent"===a.subtype?"recent":void 0,i="recent"===a.subtype?"info":void 0;return(0,d.qy)`
      <w3m-list-wallet
        displayIndex=${b}
        imageSrc=${(0,k.J)(e)}
        name=${c.name??"Unknown"}
        @click=${()=>this.onClickWallet(a)}
        size="sm"
        data-testid=${`wallet-selector-${c.id}`}
        tabIdx=${(0,k.J)(this.tabIdx)}
        ?loading=${g}
        ?disabled=${f}
        rdnsId=${(0,k.J)(c.rdns||void 0)}
        walletRank=${(0,k.J)(c.order)}
        tagLabel=${(0,k.J)(h)}
        .tagVariant=${i}
      >
      </w3m-list-wallet>
    `}onClickWallet(a){let b=p.I.state.data?.redirectView;if("featured"===a.subtype)return void m.a.selectWalletConnector(a.wallet);if("recent"===a.subtype){if(this.loadingTelegram)return;m.a.selectWalletConnector(a.wallet);return}if("custom"===a.subtype){if(this.loadingTelegram)return;p.I.push("ConnectingWalletConnect",{wallet:a.wallet,redirectView:b});return}if(this.loadingTelegram)return;let c=m.a.getConnector({id:a.wallet.id,rdns:a.wallet.rdns});c?p.I.push("ConnectingExternal",{connector:c,redirectView:b}):p.I.push("ConnectingWalletConnect",{wallet:a.wallet,redirectView:b})}};y.styles=w,x([(0,e.MZ)({type:Number})],y.prototype,"tabIdx",void 0),x([(0,e.wk)()],y.prototype,"connectors",void 0),x([(0,e.wk)()],y.prototype,"recommended",void 0),x([(0,e.wk)()],y.prototype,"featured",void 0),x([(0,e.wk)()],y.prototype,"explorerWallets",void 0),x([(0,e.wk)()],y.prototype,"connections",void 0),x([(0,e.wk)()],y.prototype,"connectorImages",void 0),x([(0,e.wk)()],y.prototype,"loadingTelegram",void 0),y=x([(0,j.EM)("w3m-connector-list")],y);var z=c(13826),A=c(57339),B=c(33504),C=c(50957),D=c(28600),E=c(85823),F=c(77292),G=c(14143);c(42666),c(81067);var H=c(27680);let I=(0,H.AH)`
  :host {
    flex: 1;
    height: 100%;
  }

  button {
    width: 100%;
    height: 100%;
    display: inline-flex;
    align-items: center;
    padding: ${({spacing:a})=>a[1]} ${({spacing:a})=>a[2]};
    column-gap: ${({spacing:a})=>a[1]};
    color: ${({tokens:a})=>a.theme.textSecondary};
    border-radius: ${({borderRadius:a})=>a[20]};
    background-color: transparent;
    transition: background-color ${({durations:a})=>a.lg}
      ${({easings:a})=>a["ease-out-power-2"]};
    will-change: background-color;
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  button[data-active='true'] {
    color: ${({tokens:a})=>a.theme.textPrimary};
    background-color: ${({tokens:a})=>a.theme.foregroundTertiary};
  }

  button:hover:enabled:not([data-active='true']),
  button:active:enabled:not([data-active='true']) {
    wui-text,
    wui-icon {
      color: ${({tokens:a})=>a.theme.textPrimary};
    }
  }
`;var J=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let K={lg:"lg-regular",md:"md-regular",sm:"sm-regular"},L={lg:"md",md:"sm",sm:"sm"},M=class extends d.WF{constructor(){super(...arguments),this.icon="mobile",this.size="md",this.label="",this.active=!1}render(){return(0,d.qy)`
      <button data-active=${this.active}>
        ${this.icon?(0,d.qy)`<wui-icon size=${L[this.size]} name=${this.icon}></wui-icon>`:""}
        <wui-text variant=${K[this.size]}> ${this.label} </wui-text>
      </button>
    `}};M.styles=[F.W5,F.fD,I],J([(0,e.MZ)()],M.prototype,"icon",void 0),J([(0,e.MZ)()],M.prototype,"size",void 0),J([(0,e.MZ)()],M.prototype,"label",void 0),J([(0,e.MZ)({type:Boolean})],M.prototype,"active",void 0),M=J([(0,G.E)("wui-tab-item")],M);let N=(0,H.AH)`
  :host {
    display: inline-flex;
    align-items: center;
    background-color: ${({tokens:a})=>a.theme.foregroundSecondary};
    border-radius: ${({borderRadius:a})=>a[32]};
    padding: ${({spacing:a})=>a["01"]};
    box-sizing: border-box;
  }

  :host([data-size='sm']) {
    height: 26px;
  }

  :host([data-size='md']) {
    height: 36px;
  }
`;var O=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let P=class extends d.WF{constructor(){super(...arguments),this.tabs=[],this.onTabChange=()=>null,this.size="md",this.activeTab=0}render(){return this.dataset.size=this.size,this.tabs.map((a,b)=>{let c=b===this.activeTab;return(0,d.qy)`
        <wui-tab-item
          @click=${()=>this.onTabClick(b)}
          icon=${a.icon}
          size=${this.size}
          label=${a.label}
          ?active=${c}
          data-active=${c}
          data-testid="tab-${a.label?.toLowerCase()}"
        ></wui-tab-item>
      `})}onTabClick(a){this.activeTab=a,this.onTabChange(a)}};P.styles=[F.W5,F.fD,N],O([(0,e.MZ)({type:Array})],P.prototype,"tabs",void 0),O([(0,e.MZ)()],P.prototype,"onTabChange",void 0),O([(0,e.MZ)()],P.prototype,"size",void 0),O([(0,e.wk)()],P.prototype,"activeTab",void 0),P=O([(0,G.E)("wui-tabs")],P);var Q=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let R=class extends d.WF{constructor(){super(...arguments),this.platformTabs=[],this.unsubscribe=[],this.platforms=[],this.onSelectPlatfrom=void 0}disconnectCallback(){this.unsubscribe.forEach(a=>a())}render(){let a=this.generateTabs();return(0,d.qy)`
      <wui-flex justifyContent="center" .padding=${["0","0","4","0"]}>
        <wui-tabs .tabs=${a} .onTabChange=${this.onTabChange.bind(this)}></wui-tabs>
      </wui-flex>
    `}generateTabs(){let a=this.platforms.map(a=>{if("browser"===a)return{label:"Browser",icon:"extension",platform:"browser"};if("mobile"===a)return{label:"Mobile",icon:"mobile",platform:"mobile"};if("qrcode"===a)return{label:"Mobile",icon:"mobile",platform:"qrcode"};if("web"===a)return{label:"Webapp",icon:"browser",platform:"web"};if("desktop"===a)return{label:"Desktop",icon:"desktop",platform:"desktop"};return{label:"Browser",icon:"extension",platform:"unsupported"}});return this.platformTabs=a.map(({platform:a})=>a),a}onTabChange(a){let b=this.platformTabs[a];b&&this.onSelectPlatfrom?.(b)}};Q([(0,e.MZ)({type:Array})],R.prototype,"platforms",void 0),Q([(0,e.MZ)()],R.prototype,"onSelectPlatfrom",void 0),R=Q([(0,j.EM)("w3m-connecting-header")],R);var S=c(5119);c(79763);let T=(0,H.AH)`
  :host {
    width: var(--local-width);
  }

  button {
    width: var(--local-width);
    white-space: nowrap;
    column-gap: ${({spacing:a})=>a[2]};
    transition:
      scale ${({durations:a})=>a.lg} ${({easings:a})=>a["ease-out-power-1"]},
      background-color ${({durations:a})=>a.lg}
        ${({easings:a})=>a["ease-out-power-2"]},
      border-radius ${({durations:a})=>a.lg}
        ${({easings:a})=>a["ease-out-power-1"]};
    will-change: scale, background-color, border-radius;
    cursor: pointer;
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='sm'] {
    border-radius: ${({borderRadius:a})=>a[2]};
    padding: 0 ${({spacing:a})=>a[2]};
    height: 28px;
  }

  button[data-size='md'] {
    border-radius: ${({borderRadius:a})=>a[3]};
    padding: 0 ${({spacing:a})=>a[4]};
    height: 38px;
  }

  button[data-size='lg'] {
    border-radius: ${({borderRadius:a})=>a[4]};
    padding: 0 ${({spacing:a})=>a[5]};
    height: 48px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-variant='accent-primary'] {
    background-color: ${({tokens:a})=>a.core.backgroundAccentPrimary};
    color: ${({tokens:a})=>a.theme.textInvert};
  }

  button[data-variant='accent-secondary'] {
    background-color: ${({tokens:a})=>a.core.foregroundAccent010};
    color: ${({tokens:a})=>a.core.textAccentPrimary};
  }

  button[data-variant='neutral-primary'] {
    background-color: ${({tokens:a})=>a.theme.backgroundInvert};
    color: ${({tokens:a})=>a.theme.textInvert};
  }

  button[data-variant='neutral-secondary'] {
    background-color: transparent;
    border: 1px solid ${({tokens:a})=>a.theme.borderSecondary};
    color: ${({tokens:a})=>a.theme.textPrimary};
  }

  button[data-variant='neutral-tertiary'] {
    background-color: ${({tokens:a})=>a.theme.foregroundPrimary};
    color: ${({tokens:a})=>a.theme.textPrimary};
  }

  button[data-variant='error-primary'] {
    background-color: ${({tokens:a})=>a.core.textError};
    color: ${({tokens:a})=>a.theme.textInvert};
  }

  button[data-variant='error-secondary'] {
    background-color: ${({tokens:a})=>a.core.backgroundError};
    color: ${({tokens:a})=>a.core.textError};
  }

  button[data-variant='shade'] {
    background: var(--wui-color-gray-glass-002);
    color: var(--wui-color-fg-200);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  /* -- Focus states --------------------------------------------------- */
  button[data-size='sm']:focus-visible:enabled {
    border-radius: 28px;
  }

  button[data-size='md']:focus-visible:enabled {
    border-radius: 38px;
  }

  button[data-size='lg']:focus-visible:enabled {
    border-radius: 48px;
  }
  button[data-variant='shade']:focus-visible:enabled {
    background: var(--wui-color-gray-glass-005);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-gray-glass-002);
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) {
    button[data-size='sm']:hover:enabled {
      border-radius: 28px;
    }

    button[data-size='md']:hover:enabled {
      border-radius: 38px;
    }

    button[data-size='lg']:hover:enabled {
      border-radius: 48px;
    }

    button[data-variant='shade']:hover:enabled {
      background: var(--wui-color-gray-glass-002);
    }

    button[data-variant='shade']:active:enabled {
      background: var(--wui-color-gray-glass-005);
    }
  }

  button[data-size='sm']:active:enabled {
    border-radius: 28px;
  }

  button[data-size='md']:active:enabled {
    border-radius: 38px;
  }

  button[data-size='lg']:active:enabled {
    border-radius: 48px;
  }

  /* -- Disabled states --------------------------------------------------- */
  button:disabled {
    opacity: 0.3;
  }
`;var U=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let V={lg:"lg-regular-mono",md:"md-regular-mono",sm:"sm-regular-mono"},W={lg:"md",md:"md",sm:"sm"},X=class extends d.WF{constructor(){super(...arguments),this.size="lg",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="accent-primary"}render(){this.style.cssText=`
    --local-width: ${this.fullWidth?"100%":"auto"};
     `;let a=this.textVariant??V[this.size];return(0,d.qy)`
      <button data-variant=${this.variant} data-size=${this.size} ?disabled=${this.disabled}>
        ${this.loadingTemplate()}
        <slot name="iconLeft"></slot>
        <wui-text variant=${a} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}loadingTemplate(){if(this.loading){let a=W[this.size],b="neutral-primary"===this.variant||"accent-primary"===this.variant?"invert":"primary";return(0,d.qy)`<wui-loading-spinner color=${b} size=${a}></wui-loading-spinner>`}return null}};X.styles=[F.W5,F.fD,T],U([(0,e.MZ)()],X.prototype,"size",void 0),U([(0,e.MZ)({type:Boolean})],X.prototype,"disabled",void 0),U([(0,e.MZ)({type:Boolean})],X.prototype,"fullWidth",void 0),U([(0,e.MZ)({type:Boolean})],X.prototype,"loading",void 0),U([(0,e.MZ)()],X.prototype,"variant",void 0),U([(0,e.MZ)()],X.prototype,"textVariant",void 0),X=U([(0,G.E)("wui-button")],X),c(24307),c(1222),c(48850);let Y=(0,H.AH)`
  :host {
    display: block;
    width: 100px;
    height: 100px;
  }

  svg {
    width: 100px;
    height: 100px;
  }

  rect {
    fill: none;
    stroke: ${a=>a.colors.accent100};
    stroke-width: 3px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;var Z=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let $=class extends d.WF{constructor(){super(...arguments),this.radius=36}render(){return this.svgLoaderTemplate()}svgLoaderTemplate(){let a=this.radius>50?50:this.radius,b=36-a;return(0,d.qy)`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${a}
          stroke-dasharray="${116+b} ${245+b}"
          stroke-dashoffset=${360+1.75*b}
        />
      </svg>
    `}};$.styles=[F.W5,Y],Z([(0,e.MZ)({type:Number})],$.prototype,"radius",void 0),$=Z([(0,G.E)("wui-loading-thumbnail")],$),c(77041),c(40994),c(64222);let _=(0,H.AH)`
  wui-flex {
    width: 100%;
    height: 52px;
    box-sizing: border-box;
    background-color: ${({tokens:a})=>a.theme.foregroundPrimary};
    border-radius: ${({borderRadius:a})=>a[5]};
    padding-left: ${({spacing:a})=>a[3]};
    padding-right: ${({spacing:a})=>a[3]};
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({spacing:a})=>a[6]};
  }

  wui-text {
    color: ${({tokens:a})=>a.theme.textSecondary};
  }

  wui-icon {
    width: 12px;
    height: 12px;
  }
`;var aa=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let ab=class extends d.WF{constructor(){super(...arguments),this.disabled=!1,this.label="",this.buttonLabel=""}render(){return(0,d.qy)`
      <wui-flex justifyContent="space-between" alignItems="center">
        <wui-text variant="lg-regular" color="inherit">${this.label}</wui-text>
        <wui-button variant="accent-secondary" size="sm">
          ${this.buttonLabel}
          <wui-icon name="chevronRight" color="inherit" size="inherit" slot="iconRight"></wui-icon>
        </wui-button>
      </wui-flex>
    `}};ab.styles=[F.W5,F.fD,_],aa([(0,e.MZ)({type:Boolean})],ab.prototype,"disabled",void 0),aa([(0,e.MZ)()],ab.prototype,"label",void 0),aa([(0,e.MZ)()],ab.prototype,"buttonLabel",void 0),ab=aa([(0,G.E)("wui-cta-button")],ab);let ac=(0,j.AH)`
  :host {
    display: block;
    padding: 0 ${({spacing:a})=>a["5"]} ${({spacing:a})=>a["5"]};
  }
`;var ad=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let ae=class extends d.WF{constructor(){super(...arguments),this.wallet=void 0}render(){if(!this.wallet)return this.style.display="none",null;let{name:a,app_store:b,play_store:c,chrome_store:e,homepage:g}=this.wallet,h=f.w.isMobile(),i=f.w.isIos(),k=f.w.isAndroid(),l=[b,c,g,e].filter(Boolean).length>1,m=j.Zv.getTruncateString({string:a,charsStart:12,charsEnd:0,truncate:"end"});return l&&!h?(0,d.qy)`
        <wui-cta-button
          label=${`Don't have ${m}?`}
          buttonLabel="Get"
          @click=${()=>p.I.push("Downloads",{wallet:this.wallet})}
        ></wui-cta-button>
      `:!l&&g?(0,d.qy)`
        <wui-cta-button
          label=${`Don't have ${m}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `:b&&i?(0,d.qy)`
        <wui-cta-button
          label=${`Don't have ${m}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `:c&&k?(0,d.qy)`
        <wui-cta-button
          label=${`Don't have ${m}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `:(this.style.display="none",null)}onAppStore(){this.wallet?.app_store&&f.w.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&f.w.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&f.w.openHref(this.wallet.homepage,"_blank")}};ae.styles=[ac],ad([(0,e.MZ)({type:Object})],ae.prototype,"wallet",void 0),ae=ad([(0,j.EM)("w3m-mobile-download-links")],ae);let af=(0,j.AH)`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-wallet-image {
    width: 56px;
    height: 56px;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(${({spacing:a})=>a["1"]} * -1);
    bottom: calc(${({spacing:a})=>a["1"]} * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: ${({durations:a})=>a.lg};
    transition-timing-function: ${({easings:a})=>a["ease-out-power-2"]};
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px ${({spacing:a})=>a["4"]};
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms ${({easings:a})=>a["ease-out-power-2"]} both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }

  w3m-mobile-download-links {
    padding: 0px;
    width: 100%;
  }
`;var ag=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};class ah extends d.WF{constructor(){super(),this.wallet=p.I.state.data?.wallet,this.connector=p.I.state.data?.connector,this.timeout=void 0,this.secondaryBtnIcon="refresh",this.onConnect=void 0,this.onRender=void 0,this.onAutoConnect=void 0,this.isWalletConnect=!0,this.unsubscribe=[],this.imageSrc=t.$.getConnectorImage(this.connector)??t.$.getWalletImage(this.wallet),this.name=this.wallet?.name??this.connector?.name??"Wallet",this.isRetrying=!1,this.uri=n.x.state.wcUri,this.error=n.x.state.wcError,this.ready=!1,this.showRetry=!1,this.label=void 0,this.secondaryBtnLabel="Try again",this.secondaryLabel="Accept connection request in the wallet",this.isLoading=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(n.x.subscribeKey("wcUri",a=>{this.uri=a,this.isRetrying&&this.onRetry&&(this.isRetrying=!1,this.onConnect?.())}),n.x.subscribeKey("wcError",a=>this.error=a)),(f.w.isTelegram()||f.w.isSafari())&&f.w.isIos()&&n.x.state.wcUri&&this.onConnect?.()}firstUpdated(){this.onAutoConnect?.(),this.showRetry=!this.onAutoConnect}disconnectedCallback(){this.unsubscribe.forEach(a=>a()),n.x.setWcError(!1),clearTimeout(this.timeout)}render(){this.onRender?.(),this.onShowRetry();let a=this.error?"Connection can be declined if a previous request is still active":this.secondaryLabel,b="";return this.label?b=this.label:(b=`Continue in ${this.name}`,this.error&&(b="Connection declined")),(0,d.qy)`
      <wui-flex
        data-error=${(0,k.J)(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["10","5","5","5"]}
        gap="6"
      >
        <wui-flex gap="2" justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${(0,k.J)(this.imageSrc)}></wui-wallet-image>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            color="error"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="6"> <wui-flex
          flexDirection="column"
          alignItems="center"
          gap="2"
          .padding=${["2","0","0","0"]}
        >
          <wui-text align="center" variant="lg-medium" color=${this.error?"error":"primary"}>
            ${b}
          </wui-text>
          <wui-text align="center" variant="lg-regular" color="secondary">${a}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel?(0,d.qy)`
                <wui-button
                  variant="neutral-secondary"
                  size="md"
                  ?disabled=${this.isRetrying||this.isLoading}
                  @click=${this.onTryAgain.bind(this)}
                  data-testid="w3m-connecting-widget-secondary-button"
                >
                  <wui-icon
                    color="inherit"
                    slot="iconLeft"
                    name=${this.secondaryBtnIcon}
                  ></wui-icon>
                  ${this.secondaryBtnLabel}
                </wui-button>
              `:null}
      </wui-flex>

      ${this.isWalletConnect?(0,d.qy)`
              <wui-flex .padding=${["0","5","5","5"]} justifyContent="center">
                <wui-link
                  @click=${this.onCopyUri}
                  variant="secondary"
                  icon="copy"
                  data-testid="wui-link-copy"
                >
                  Copy link
                </wui-link>
              </wui-flex>
            `:null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links></wui-flex>
      </wui-flex>
    `}onShowRetry(){if(this.error&&!this.showRetry){this.showRetry=!0;let a=this.shadowRoot?.querySelector("wui-button");a?.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"})}}onTryAgain(){n.x.setWcError(!1),this.onRetry?(this.isRetrying=!0,this.onRetry?.()):this.onConnect?.()}loaderTemplate(){let a=S.W.state.themeVariables["--w3m-border-radius-master"],b=a?parseInt(a.replace("px",""),10):4;return(0,d.qy)`<wui-loading-thumbnail radius=${9*b}></wui-loading-thumbnail>`}onCopyUri(){try{this.uri&&(f.w.copyToClopboard(this.uri),B.P.showSuccess("Link copied"))}catch{B.P.showError("Failed to copy")}}}ah.styles=af,ag([(0,e.wk)()],ah.prototype,"isRetrying",void 0),ag([(0,e.wk)()],ah.prototype,"uri",void 0),ag([(0,e.wk)()],ah.prototype,"error",void 0),ag([(0,e.wk)()],ah.prototype,"ready",void 0),ag([(0,e.wk)()],ah.prototype,"showRetry",void 0),ag([(0,e.wk)()],ah.prototype,"label",void 0),ag([(0,e.wk)()],ah.prototype,"secondaryBtnLabel",void 0),ag([(0,e.wk)()],ah.prototype,"secondaryLabel",void 0),ag([(0,e.wk)()],ah.prototype,"isLoading",void 0),ag([(0,e.MZ)({type:Boolean})],ah.prototype,"isMobile",void 0),ag([(0,e.MZ)()],ah.prototype,"onRetry",void 0);let ai=class extends ah{constructor(){if(super(),!this.wallet)throw Error("w3m-connecting-wc-browser: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),o.E.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser",displayIndex:this.wallet?.display_index,walletRank:this.wallet.order,view:p.I.state.view}})}async onConnectProxy(){try{this.error=!1;let{connectors:a}=m.a.state,b=a.find(a=>"ANNOUNCED"===a.type&&a.info?.rdns===this.wallet?.rdns||"INJECTED"===a.type||a.name===this.wallet?.name);if(b)await n.x.connectExternal(b,b.chain);else throw Error("w3m-connecting-wc-browser: No connector found");C.W.close(),o.E.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:this.wallet?.name||"Unknown",view:p.I.state.view,walletRank:this.wallet?.order}})}catch(a){a instanceof D.A&&a.originalName===z.RQ.PROVIDER_RPC_ERROR_NAME.USER_REJECTED_REQUEST?o.E.sendEvent({type:"track",event:"USER_REJECTED",properties:{message:a.message}}):o.E.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:a?.message??"Unknown"}}),this.error=!0}}};ai=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g}([(0,j.EM)("w3m-connecting-wc-browser")],ai);let aj=class extends ah{constructor(){if(super(),!this.wallet)throw Error("w3m-connecting-wc-desktop: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),o.E.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"desktop",displayIndex:this.wallet?.display_index,walletRank:this.wallet.order,view:p.I.state.view}})}onRenderProxy(){!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onConnectProxy(){if(this.wallet?.desktop_link&&this.uri)try{this.error=!1;let{desktop_link:a,name:b}=this.wallet,{redirect:c,href:d}=f.w.formatNativeUrl(a,this.uri);n.x.setWcLinking({name:b,href:d}),n.x.setRecentWallet(this.wallet),f.w.openHref(c,"_blank")}catch{this.error=!0}}};aj=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g}([(0,j.EM)("w3m-connecting-wc-desktop")],aj);var ak=c(851),al=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let am=class extends ah{constructor(){if(super(),this.btnLabelTimeout=void 0,this.redirectDeeplink=void 0,this.redirectUniversalLink=void 0,this.target=void 0,this.preferUniversalLinks=g.H.state.experimental_preferUniversalLinks,this.isLoading=!0,this.onConnect=()=>{if(this.wallet?.mobile_link&&this.uri)try{this.error=!1;let{mobile_link:a,link_mode:b,name:c}=this.wallet,{redirect:d,redirectUniversalLink:e,href:g}=f.w.formatNativeUrl(a,this.uri,b);this.redirectDeeplink=d,this.redirectUniversalLink=e,this.target=f.w.isIframe()?"_top":"_self",n.x.setWcLinking({name:c,href:g}),n.x.setRecentWallet(this.wallet),this.preferUniversalLinks&&this.redirectUniversalLink?f.w.openHref(this.redirectUniversalLink,this.target):f.w.openHref(this.redirectDeeplink,this.target)}catch(a){o.E.sendEvent({type:"track",event:"CONNECT_PROXY_ERROR",properties:{message:a instanceof Error?a.message:"Error parsing the deeplink",uri:this.uri,mobile_link:this.wallet.mobile_link,name:this.wallet.name}}),this.error=!0}},!this.wallet)throw Error("w3m-connecting-wc-mobile: No wallet provided");this.secondaryBtnLabel="Open",this.secondaryLabel=ak.oU.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.onHandleURI(),this.unsubscribe.push(n.x.subscribeKey("wcUri",()=>{this.onHandleURI()})),o.E.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"mobile",displayIndex:this.wallet?.display_index,walletRank:this.wallet.order,view:p.I.state.view}})}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.btnLabelTimeout)}onHandleURI(){this.isLoading=!this.uri,!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onTryAgain(){n.x.setWcError(!1),this.onConnect?.()}};al([(0,e.wk)()],am.prototype,"redirectDeeplink",void 0),al([(0,e.wk)()],am.prototype,"redirectUniversalLink",void 0),al([(0,e.wk)()],am.prototype,"target",void 0),al([(0,e.wk)()],am.prototype,"preferUniversalLinks",void 0),al([(0,e.wk)()],am.prototype,"isLoading",void 0),am=al([(0,j.EM)("w3m-connecting-wc-mobile")],am),c(67332);var an=c(6877);function ao(a,b,c){return a!==b&&(a-b<0?b-a:a-b)<=c+.1}let ap={generate({uri:a,size:b,logoSize:c,padding:e=8,dotColor:f="var(--apkt-colors-black)"}){let g=[],h=function(a,b){let c=Array.prototype.slice.call(an.create(a,{errorCorrectionLevel:"Q"}).modules.data,0),d=Math.sqrt(c.length);return c.reduce((a,b,c)=>(c%d==0?a.push([b]):a[a.length-1].push(b))&&a,[])}(a,0),i=(b-2*e)/h.length,j=[{x:0,y:0},{x:1,y:0},{x:0,y:1}];j.forEach(({x:a,y:b})=>{let c=(h.length-7)*i*a+e,k=(h.length-7)*i*b+e;for(let a=0;a<j.length;a+=1){let b=i*(7-2*a);g.push((0,d.JW)`
            <rect
              fill=${2===a?"var(--apkt-colors-black)":"var(--apkt-colors-white)"}
              width=${0===a?b-10:b}
              rx= ${0===a?(b-10)*.45:.45*b}
              ry= ${0===a?(b-10)*.45:.45*b}
              stroke=${f}
              stroke-width=${10*(0===a)}
              height=${0===a?b-10:b}
              x= ${0===a?k+i*a+5:k+i*a}
              y= ${0===a?c+i*a+5:c+i*a}
            />
          `)}});let k=Math.floor((c+25)/i),l=h.length/2-k/2,m=h.length/2+k/2-1,n=[];h.forEach((a,b)=>{a.forEach((a,c)=>{!h[b][c]||b<7&&c<7||b>h.length-8&&c<7||b<7&&c>h.length-8||b>l&&b<m&&c>l&&c<m||n.push([b*i+i/2+e,c*i+i/2+e])})});let o={};return n.forEach(([a,b])=>{o[a]?o[a]?.push(b):o[a]=[b]}),Object.entries(o).map(([a,b])=>{let c=b.filter(a=>b.every(b=>!ao(a,b,i)));return[Number(a),c]}).forEach(([a,b])=>{b.forEach(b=>{g.push((0,d.JW)`<circle cx=${a} cy=${b} fill=${f} r=${i/2.5} />`)})}),Object.entries(o).filter(([a,b])=>b.length>1).map(([a,b])=>{let c=b.filter(a=>b.some(b=>ao(a,b,i)));return[Number(a),c]}).map(([a,b])=>{b.sort((a,b)=>a<b?-1:1);let c=[];for(let a of b){let b=c.find(b=>b.some(b=>ao(a,b,i)));b?b.push(a):c.push([a])}return[a,c.map(a=>[a[0],a[a.length-1]])]}).forEach(([a,b])=>{b.forEach(([b,c])=>{g.push((0,d.JW)`
              <line
                x1=${a}
                x2=${a}
                y1=${b}
                y2=${c}
                stroke=${f}
                stroke-width=${i/1.25}
                stroke-linecap="round"
              />
            `)})}),g}},aq=(0,H.AH)`
  :host {
    position: relative;
    user-select: none;
    display: block;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    width: 100%;
    height: 100%;
    background-color: ${({colors:a})=>a.white};
    border: 1px solid ${({tokens:a})=>a.theme.borderPrimary};
  }

  :host {
    border-radius: ${({borderRadius:a})=>a[4]};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :host([data-clear='true']) > wui-icon {
    display: none;
  }

  svg:first-child,
  wui-image,
  wui-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    background-color: ${({tokens:a})=>a.theme.backgroundPrimary};
    box-shadow: inset 0 0 0 4px ${({tokens:a})=>a.theme.backgroundPrimary};
    border-radius: ${({borderRadius:a})=>a[6]};
  }

  wui-image {
    width: 25%;
    height: 25%;
    border-radius: ${({borderRadius:a})=>a[2]};
  }

  wui-icon {
    width: 100%;
    height: 100%;
    color: #3396ff !important;
    transform: translateY(-50%) translateX(-50%) scale(0.25);
  }

  wui-icon > svg {
    width: inherit;
    height: inherit;
  }
`;var ar=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let as=class extends d.WF{constructor(){super(...arguments),this.uri="",this.size=0,this.theme="dark",this.imageSrc=void 0,this.alt=void 0,this.arenaClear=void 0,this.farcaster=void 0}render(){return this.dataset.theme=this.theme,this.dataset.clear=String(this.arenaClear),this.style.cssText=`--local-size: ${this.size}px`,(0,d.qy)`<wui-flex
      alignItems="center"
      justifyContent="center"
      class="wui-qr-code"
      direction="column"
      gap="4"
      width="100%"
      style="height: 100%"
    >
      ${this.templateVisual()} ${this.templateSvg()}
    </wui-flex>`}templateSvg(){return(0,d.JW)`
      <svg height=${this.size} width=${this.size}>
        ${ap.generate({uri:this.uri,size:this.size,logoSize:this.arenaClear?0:this.size/4})}
      </svg>
    `}templateVisual(){return this.imageSrc?(0,d.qy)`<wui-image src=${this.imageSrc} alt=${this.alt??"logo"}></wui-image>`:this.farcaster?(0,d.qy)`<wui-icon
        class="farcaster"
        size="inherit"
        color="inherit"
        name="farcaster"
      ></wui-icon>`:(0,d.qy)`<wui-icon size="inherit" color="inherit" name="walletConnect"></wui-icon>`}};as.styles=[F.W5,aq],ar([(0,e.MZ)()],as.prototype,"uri",void 0),ar([(0,e.MZ)({type:Number})],as.prototype,"size",void 0),ar([(0,e.MZ)()],as.prototype,"theme",void 0),ar([(0,e.MZ)()],as.prototype,"imageSrc",void 0),ar([(0,e.MZ)()],as.prototype,"alt",void 0),ar([(0,e.MZ)({type:Boolean})],as.prototype,"arenaClear",void 0),ar([(0,e.MZ)({type:Boolean})],as.prototype,"farcaster",void 0),as=ar([(0,G.E)("wui-qr-code")],as);let at=(0,H.AH)`
  :host {
    display: block;
    background: linear-gradient(
      90deg,
      ${({tokens:a})=>a.theme.foregroundSecondary} 0%,
      ${({tokens:a})=>a.theme.foregroundTertiary} 50%,
      ${({tokens:a})=>a.theme.foregroundSecondary} 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1s ease-in-out infinite;
    border-radius: ${({borderRadius:a})=>a[2]};
  }

  :host([data-rounded='true']) {
    border-radius: ${({borderRadius:a})=>a[16]};
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;var au=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let av=class extends d.WF{constructor(){super(...arguments),this.width="",this.height="",this.variant="default",this.rounded=!1}render(){return this.style.cssText=`
      width: ${this.width};
      height: ${this.height};
    `,this.dataset.rounded=this.rounded?"true":"false",(0,d.qy)`<slot></slot>`}};av.styles=[at],au([(0,e.MZ)()],av.prototype,"width",void 0),au([(0,e.MZ)()],av.prototype,"height",void 0),au([(0,e.MZ)()],av.prototype,"variant",void 0),au([(0,e.MZ)({type:Boolean})],av.prototype,"rounded",void 0),av=au([(0,G.E)("wui-shimmer")],av),c(93093);let aw=(0,j.AH)`
  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: ${({borderRadius:a})=>a[4]};
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: ${({durations:a})=>a.xl};
    animation-timing-function: ${({easings:a})=>a["ease-out-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;var ax=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let ay=class extends ah{constructor(){super(),this.basic=!1,this.forceUpdate=()=>{this.requestUpdate()},window.addEventListener("resize",this.forceUpdate)}firstUpdated(){this.basic||o.E.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet?.name??"WalletConnect",platform:"qrcode",displayIndex:this.wallet?.display_index,walletRank:this.wallet?.order,view:p.I.state.view}})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.forEach(a=>a()),window.removeEventListener("resize",this.forceUpdate)}render(){return this.onRenderProxy(),(0,d.qy)`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["0","5","5","5"]}
        gap="5"
      >
        <wui-shimmer width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>
        <wui-text variant="lg-medium" color="primary"> Scan this QR Code with your phone </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout(()=>{this.ready=!0},200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;let a=this.getBoundingClientRect().width-40,b=this.wallet?this.wallet.name:void 0;n.x.setWcLinking(void 0),n.x.setRecentWallet(this.wallet);let c=this.uri;if(this.wallet?.mobile_link){let{redirect:a}=f.w.formatNativeUrl(this.wallet?.mobile_link,this.uri,null);c=a}return(0,d.qy)` <wui-qr-code
      size=${a}
      theme=${S.W.state.themeMode}
      uri=${c}
      imageSrc=${(0,k.J)(t.$.getWalletImage(this.wallet))}
      color=${(0,k.J)(S.W.state.themeVariables["--w3m-qr-color"])}
      alt=${(0,k.J)(b)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`}copyTemplate(){let a=!this.uri||!this.ready;return(0,d.qy)`<wui-button
      .disabled=${a}
      @click=${this.onCopyUri}
      variant="neutral-secondary"
      size="sm"
      data-testid="copy-wc2-uri"
    >
      Copy link
      <wui-icon size="sm" color="inherit" name="copy" slot="iconRight"></wui-icon>
    </wui-button>`}};ay.styles=aw,ax([(0,e.MZ)({type:Boolean})],ay.prototype,"basic",void 0),ay=ax([(0,j.EM)("w3m-connecting-wc-qrcode")],ay);let az=class extends d.WF{constructor(){if(super(),this.wallet=p.I.state.data?.wallet,!this.wallet)throw Error("w3m-connecting-wc-unsupported: No wallet provided");o.E.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser",displayIndex:this.wallet?.display_index,walletRank:this.wallet?.order,view:p.I.state.view}})}render(){return(0,d.qy)`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["10","5","5","5"]}
        gap="5"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${(0,k.J)(t.$.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="md-regular" color="primary">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}};az=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g}([(0,j.EM)("w3m-connecting-wc-unsupported")],az);var aA=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let aB=class extends ah{constructor(){if(super(),this.isLoading=!0,!this.wallet)throw Error("w3m-connecting-wc-web: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.secondaryBtnLabel="Open",this.secondaryLabel=ak.oU.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.updateLoadingState(),this.unsubscribe.push(n.x.subscribeKey("wcUri",()=>{this.updateLoadingState()})),o.E.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"web",displayIndex:this.wallet?.display_index,walletRank:this.wallet?.order,view:p.I.state.view}})}updateLoadingState(){this.isLoading=!this.uri}onConnectProxy(){if(this.wallet?.webapp_link&&this.uri)try{this.error=!1;let{webapp_link:a,name:b}=this.wallet,{redirect:c,href:d}=f.w.formatUniversalUrl(a,this.uri);n.x.setWcLinking({name:b,href:d}),n.x.setRecentWallet(this.wallet),f.w.openHref(c,"_blank")}catch{this.error=!0}}};aA([(0,e.wk)()],aB.prototype,"isLoading",void 0),aB=aA([(0,j.EM)("w3m-connecting-wc-web")],aB);let aC=(0,j.AH)`
  :host([data-mobile-fullscreen='true']) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  :host([data-mobile-fullscreen='true']) wui-ux-by-reown {
    margin-top: auto;
  }
`;var aD=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let aE=class extends d.WF{constructor(){super(),this.wallet=p.I.state.data?.wallet,this.unsubscribe=[],this.platform=void 0,this.platforms=[],this.isSiwxEnabled=!!g.H.state.siwx,this.remoteFeatures=g.H.state.remoteFeatures,this.displayBranding=!0,this.basic=!1,this.determinePlatforms(),this.initializeConnection(),this.unsubscribe.push(g.H.subscribeKey("remoteFeatures",a=>this.remoteFeatures=a))}disconnectedCallback(){this.unsubscribe.forEach(a=>a())}render(){return g.H.state.enableMobileFullScreen&&this.setAttribute("data-mobile-fullscreen","true"),(0,d.qy)`
      ${this.headerTemplate()}
      <div class="platform-container">${this.platformTemplate()}</div>
      ${this.reownBrandingTemplate()}
    `}reownBrandingTemplate(){return this.remoteFeatures?.reownBranding&&this.displayBranding?(0,d.qy)`<wui-ux-by-reown></wui-ux-by-reown>`:null}async initializeConnection(a=!1){if("browser"!==this.platform&&(!g.H.state.manualWCControl||a))try{let{wcPairingExpiry:b,status:c}=n.x.state,{redirectView:d}=p.I.state.data??{};if(a||g.H.state.enableEmbedded||f.w.isPairingExpired(b)||"connecting"===c){let a=n.x.getConnections(A.W.state.activeChain),b=this.remoteFeatures?.multiWallet,c=a.length>0;await n.x.connectWalletConnect({cache:"never"}),this.isSiwxEnabled||(c&&b?(p.I.replace("ProfileWallets"),B.P.showSuccess("New Wallet Added")):d?p.I.replace(d):C.W.close())}}catch(a){if(a instanceof Error&&a.message.includes("An error occurred when attempting to switch chain")&&!g.H.state.enableNetworkSwitch&&A.W.state.activeChain){A.W.setActiveCaipNetwork(E.R.getUnsupportedNetwork(`${A.W.state.activeChain}:${A.W.state.activeCaipNetwork?.id}`)),A.W.showUnsupportedChainUI();return}a instanceof D.A&&a.originalName===z.RQ.PROVIDER_RPC_ERROR_NAME.USER_REJECTED_REQUEST?o.E.sendEvent({type:"track",event:"USER_REJECTED",properties:{message:a.message}}):o.E.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:a?.message??"Unknown"}}),n.x.setWcError(!0),B.P.showError(a.message??"Connection error"),n.x.resetWcConnection(),p.I.goBack()}}determinePlatforms(){if(!this.wallet){this.platforms.push("qrcode"),this.platform="qrcode";return}if(this.platform)return;let{mobile_link:a,desktop_link:b,webapp_link:c,injected:d,rdns:e}=this.wallet,h=d?.map(({injected_id:a})=>a).filter(Boolean),i=[...e?[e]:h??[]],j=!g.H.state.isUniversalProvider&&i.length,k=n.x.checkInstalled(i),l=j&&k,m=b&&!f.w.isMobile();l&&!A.W.state.noAdapters&&this.platforms.push("browser"),a&&this.platforms.push(f.w.isMobile()?"mobile":"qrcode"),c&&this.platforms.push("web"),m&&this.platforms.push("desktop"),l||!j||A.W.state.noAdapters||this.platforms.push("unsupported"),this.platform=this.platforms[0]}platformTemplate(){switch(this.platform){case"browser":return(0,d.qy)`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;case"web":return(0,d.qy)`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;case"desktop":return(0,d.qy)`
          <w3m-connecting-wc-desktop .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;case"mobile":return(0,d.qy)`
          <w3m-connecting-wc-mobile isMobile .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;case"qrcode":return(0,d.qy)`<w3m-connecting-wc-qrcode ?basic=${this.basic}></w3m-connecting-wc-qrcode>`;default:return(0,d.qy)`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`}}headerTemplate(){return this.platforms.length>1?(0,d.qy)`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `:null}async onSelectPlatform(a){let b=this.shadowRoot?.querySelector("div");b&&(await b.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.platform=a,b.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}};aE.styles=aC,aD([(0,e.wk)()],aE.prototype,"platform",void 0),aD([(0,e.wk)()],aE.prototype,"platforms",void 0),aD([(0,e.wk)()],aE.prototype,"isSiwxEnabled",void 0),aD([(0,e.wk)()],aE.prototype,"remoteFeatures",void 0),aD([(0,e.MZ)({type:Boolean})],aE.prototype,"displayBranding",void 0),aD([(0,e.MZ)({type:Boolean})],aE.prototype,"basic",void 0),aE=aD([(0,j.EM)("w3m-connecting-wc-view")],aE);var aF=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let aG=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.isMobile=f.w.isMobile(),this.remoteFeatures=g.H.state.remoteFeatures,this.unsubscribe.push(g.H.subscribeKey("remoteFeatures",a=>this.remoteFeatures=a))}disconnectedCallback(){this.unsubscribe.forEach(a=>a())}render(){if(this.isMobile){let{featured:a,recommended:b}=h.N.state,{customWallets:c}=g.H.state,e=i.i.getRecentWallets(),f=a.length||b.length||c?.length||e.length;return(0,d.qy)`<wui-flex flexDirection="column" gap="2" .margin=${["1","3","3","3"]}>
        ${f?(0,d.qy)`<w3m-connector-list></w3m-connector-list>`:null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`}return(0,d.qy)`<wui-flex flexDirection="column" .padding=${["0","0","4","0"]}>
        <w3m-connecting-wc-view ?basic=${!0} .displayBranding=${!1}></w3m-connecting-wc-view>
        <wui-flex flexDirection="column" .padding=${["0","3","0","3"]}>
          <w3m-all-wallets-widget></w3m-all-wallets-widget>
        </wui-flex>
      </wui-flex>
      ${this.reownBrandingTemplate()} `}reownBrandingTemplate(){return this.remoteFeatures?.reownBranding?(0,d.qy)` <wui-flex flexDirection="column" .padding=${["1","0","1","0"]}>
      <wui-ux-by-reown></wui-ux-by-reown>
    </wui-flex>`:null}};aF([(0,e.wk)()],aG.prototype,"isMobile",void 0),aF([(0,e.wk)()],aG.prototype,"remoteFeatures",void 0),aG=aF([(0,j.EM)("w3m-connecting-wc-basic-view")],aG);var aH=c(49422);let{I:aI}=aH.ge;var aJ=c(76738);let aK=(a,b)=>{let c=a._$AN;if(void 0===c)return!1;for(let a of c)a._$AO?.(b,!1),aK(a,b);return!0},aL=a=>{let b,c;do{if(void 0===(b=a._$AM))break;(c=b._$AN).delete(a),a=b}while(0===c?.size)},aM=a=>{for(let b;b=a._$AM;a=b){let c=b._$AN;if(void 0===c)b._$AN=c=new Set;else if(c.has(a))break;c.add(a),aP(b)}};function aN(a){void 0!==this._$AN?(aL(this),this._$AM=a,aM(this)):this._$AM=a}function aO(a,b=!1,c=0){let d=this._$AH,e=this._$AN;if(void 0!==e&&0!==e.size)if(b)if(Array.isArray(d))for(let a=c;a<d.length;a++)aK(d[a],!1),aL(d[a]);else null!=d&&(aK(d,!1),aL(d));else aK(this,a)}let aP=a=>{a.type==aJ.OA.CHILD&&(a._$AP??=aO,a._$AQ??=aN)};class aQ extends aJ.WL{constructor(){super(...arguments),this._$AN=void 0}_$AT(a,b,c){super._$AT(a,b,c),aM(this),this.isConnected=a._$AU}_$AO(a,b=!0){a!==this.isConnected&&(this.isConnected=a,a?this.reconnected?.():this.disconnected?.()),b&&(aK(this,a),aL(this))}setValue(a){if(void 0===this._$Ct.strings)this._$Ct._$AI(a,this);else{let b=[...this._$Ct._$AH];b[this._$Ci]=a,this._$Ct._$AI(b,this,0)}}disconnected(){}reconnected(){}}let aR=()=>new aS;class aS{}let aT=new WeakMap,aU=(0,aJ.u$)(class extends aQ{render(a){return aH.s6}update(a,[b]){let c=b!==this.G;return c&&void 0!==this.G&&this.rt(void 0),(c||this.lt!==this.ct)&&(this.G=b,this.ht=a.options?.host,this.rt(this.ct=a.element)),aH.s6}rt(a){if(this.isConnected||(a=void 0),"function"==typeof this.G){let b=this.ht??globalThis,c=aT.get(b);void 0===c&&(c=new WeakMap,aT.set(b,c)),void 0!==c.get(this.G)&&this.G.call(this.ht,void 0),c.set(this.G,a),void 0!==a&&this.G.call(this.ht,a)}else this.G.value=a}get lt(){return"function"==typeof this.G?aT.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),aV=(0,H.AH)`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    user-select: none;
    transition:
      background-color ${({durations:a})=>a.lg}
        ${({easings:a})=>a["ease-out-power-2"]},
      color ${({durations:a})=>a.lg} ${({easings:a})=>a["ease-out-power-2"]},
      border ${({durations:a})=>a.lg} ${({easings:a})=>a["ease-out-power-2"]},
      box-shadow ${({durations:a})=>a.lg}
        ${({easings:a})=>a["ease-out-power-2"]},
      width ${({durations:a})=>a.lg} ${({easings:a})=>a["ease-out-power-2"]},
      height ${({durations:a})=>a.lg} ${({easings:a})=>a["ease-out-power-2"]},
      transform ${({durations:a})=>a.lg}
        ${({easings:a})=>a["ease-out-power-2"]},
      opacity ${({durations:a})=>a.lg} ${({easings:a})=>a["ease-out-power-2"]};
    will-change: background-color, color, border, box-shadow, width, height, transform, opacity;
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({colors:a})=>a.neutrals300};
    border-radius: ${({borderRadius:a})=>a.round};
    border: 1px solid transparent;
    will-change: border;
    transition:
      background-color ${({durations:a})=>a.lg}
        ${({easings:a})=>a["ease-out-power-2"]},
      color ${({durations:a})=>a.lg} ${({easings:a})=>a["ease-out-power-2"]},
      border ${({durations:a})=>a.lg} ${({easings:a})=>a["ease-out-power-2"]},
      box-shadow ${({durations:a})=>a.lg}
        ${({easings:a})=>a["ease-out-power-2"]},
      width ${({durations:a})=>a.lg} ${({easings:a})=>a["ease-out-power-2"]},
      height ${({durations:a})=>a.lg} ${({easings:a})=>a["ease-out-power-2"]},
      transform ${({durations:a})=>a.lg}
        ${({easings:a})=>a["ease-out-power-2"]},
      opacity ${({durations:a})=>a.lg} ${({easings:a})=>a["ease-out-power-2"]};
    will-change: background-color, color, border, box-shadow, width, height, transform, opacity;
  }

  span:before {
    content: '';
    position: absolute;
    background-color: ${({colors:a})=>a.white};
    border-radius: 50%;
  }

  /* -- Sizes --------------------------------------------------------- */
  label[data-size='lg'] {
    width: 48px;
    height: 32px;
  }

  label[data-size='md'] {
    width: 40px;
    height: 28px;
  }

  label[data-size='sm'] {
    width: 32px;
    height: 22px;
  }

  label[data-size='lg'] > span:before {
    height: 24px;
    width: 24px;
    left: 4px;
    top: 3px;
  }

  label[data-size='md'] > span:before {
    height: 20px;
    width: 20px;
    left: 4px;
    top: 3px;
  }

  label[data-size='sm'] > span:before {
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
  }

  /* -- Focus states --------------------------------------------------- */
  input:focus-visible:not(:checked) + span,
  input:focus:not(:checked) + span {
    border: 1px solid ${({tokens:a})=>a.core.iconAccentPrimary};
    background-color: ${({tokens:a})=>a.theme.textTertiary};
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  input:focus-visible:checked + span,
  input:focus:checked + span {
    border: 1px solid ${({tokens:a})=>a.core.iconAccentPrimary};
    box-shadow: 0px 0px 0px 4px rgba(9, 136, 240, 0.2);
  }

  /* -- Checked states --------------------------------------------------- */
  input:checked + span {
    background-color: ${({tokens:a})=>a.core.iconAccentPrimary};
  }

  label[data-size='lg'] > input:checked + span:before {
    transform: translateX(calc(100% - 9px));
  }

  label[data-size='md'] > input:checked + span:before {
    transform: translateX(calc(100% - 9px));
  }

  label[data-size='sm'] > input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }

  /* -- Hover states ------------------------------------------------------- */
  label:hover > input:not(:checked):not(:disabled) + span {
    background-color: ${({colors:a})=>a.neutrals400};
  }

  label:hover > input:checked:not(:disabled) + span {
    background-color: ${({colors:a})=>a.accent080};
  }

  /* -- Disabled state --------------------------------------------------- */
  label:has(input:disabled) {
    pointer-events: none;
    user-select: none;
  }

  input:not(:checked):disabled + span {
    background-color: ${({colors:a})=>a.neutrals700};
  }

  input:checked:disabled + span {
    background-color: ${({colors:a})=>a.neutrals700};
  }

  input:not(:checked):disabled + span::before {
    background-color: ${({colors:a})=>a.neutrals400};
  }

  input:checked:disabled + span::before {
    background-color: ${({tokens:a})=>a.theme.textTertiary};
  }
`;var aW=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let aX=class extends d.WF{constructor(){super(...arguments),this.inputElementRef=aR(),this.checked=!1,this.disabled=!1,this.size="md"}render(){return(0,d.qy)`
      <label data-size=${this.size}>
        <input
          ${aU(this.inputElementRef)}
          type="checkbox"
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `}dispatchChangeEvent(){this.dispatchEvent(new CustomEvent("switchChange",{detail:this.inputElementRef.value?.checked,bubbles:!0,composed:!0}))}};aX.styles=[F.W5,F.fD,aV],aW([(0,e.MZ)({type:Boolean})],aX.prototype,"checked",void 0),aW([(0,e.MZ)({type:Boolean})],aX.prototype,"disabled",void 0),aW([(0,e.MZ)()],aX.prototype,"size",void 0),aX=aW([(0,G.E)("wui-toggle")],aX);let aY=(0,H.AH)`
  :host {
    height: auto;
  }

  :host > wui-flex {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: ${({spacing:a})=>a["2"]};
    padding: ${({spacing:a})=>a["2"]} ${({spacing:a})=>a["3"]};
    background-color: ${({tokens:a})=>a.theme.foregroundPrimary};
    border-radius: ${({borderRadius:a})=>a["4"]};
    box-shadow: inset 0 0 0 1px ${({tokens:a})=>a.theme.foregroundPrimary};
    transition: background-color ${({durations:a})=>a.lg}
      ${({easings:a})=>a["ease-out-power-2"]};
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`;var aZ=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let a$=class extends d.WF{constructor(){super(...arguments),this.checked=!1}render(){return(0,d.qy)`
      <wui-flex>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-toggle
          ?checked=${this.checked}
          size="sm"
          @switchChange=${this.handleToggleChange.bind(this)}
        ></wui-toggle>
      </wui-flex>
    `}handleToggleChange(a){a.stopPropagation(),this.checked=a.detail,this.dispatchSwitchEvent()}dispatchSwitchEvent(){this.dispatchEvent(new CustomEvent("certifiedSwitchChange",{detail:this.checked,bubbles:!0,composed:!0}))}};a$.styles=[F.W5,F.fD,aY],aZ([(0,e.MZ)({type:Boolean})],a$.prototype,"checked",void 0),a$=aZ([(0,G.E)("wui-certified-switch")],a$);let a_=(0,H.AH)`
  :host {
    position: relative;
    width: 100%;
    display: inline-flex;
    flex-direction: column;
    gap: ${({spacing:a})=>a[3]};
    color: ${({tokens:a})=>a.theme.textPrimary};
    caret-color: ${({tokens:a})=>a.core.textAccentPrimary};
  }

  .wui-input-text-container {
    position: relative;
    display: flex;
  }

  input {
    width: 100%;
    border-radius: ${({borderRadius:a})=>a[4]};
    color: inherit;
    background: transparent;
    border: 1px solid ${({tokens:a})=>a.theme.borderPrimary};
    caret-color: ${({tokens:a})=>a.core.textAccentPrimary};
    padding: ${({spacing:a})=>a[3]} ${({spacing:a})=>a[3]}
      ${({spacing:a})=>a[3]} ${({spacing:a})=>a[10]};
    font-size: ${({textSize:a})=>a.large};
    line-height: ${({typography:a})=>a["lg-regular"].lineHeight};
    letter-spacing: ${({typography:a})=>a["lg-regular"].letterSpacing};
    font-weight: ${({fontWeight:a})=>a.regular};
    font-family: ${({fontFamily:a})=>a.regular};
  }

  input[data-size='lg'] {
    padding: ${({spacing:a})=>a[4]} ${({spacing:a})=>a[3]}
      ${({spacing:a})=>a[4]} ${({spacing:a})=>a[10]};
  }

  @media (hover: hover) and (pointer: fine) {
    input:hover:enabled {
      border: 1px solid ${({tokens:a})=>a.theme.borderSecondary};
    }
  }

  input:disabled {
    cursor: unset;
    border: 1px solid ${({tokens:a})=>a.theme.borderPrimary};
  }

  input::placeholder {
    color: ${({tokens:a})=>a.theme.textSecondary};
  }

  input:focus:enabled {
    border: 1px solid ${({tokens:a})=>a.theme.borderSecondary};
    background-color: ${({tokens:a})=>a.theme.foregroundPrimary};
    -webkit-box-shadow: 0px 0px 0px 4px ${({tokens:a})=>a.core.foregroundAccent040};
    -moz-box-shadow: 0px 0px 0px 4px ${({tokens:a})=>a.core.foregroundAccent040};
    box-shadow: 0px 0px 0px 4px ${({tokens:a})=>a.core.foregroundAccent040};
  }

  div.wui-input-text-container:has(input:disabled) {
    opacity: 0.5;
  }

  wui-icon.wui-input-text-left-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    left: ${({spacing:a})=>a[4]};
    color: ${({tokens:a})=>a.theme.iconDefault};
  }

  button.wui-input-text-submit-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${({spacing:a})=>a[3]};
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    border-radius: ${({borderRadius:a})=>a[2]};
    color: ${({tokens:a})=>a.core.textAccentPrimary};
  }

  button.wui-input-text-submit-button:disabled {
    opacity: 1;
  }

  button.wui-input-text-submit-button.loading wui-icon {
    animation: spin 1s linear infinite;
  }

  button.wui-input-text-submit-button:hover {
    background: ${({tokens:a})=>a.core.foregroundAccent010};
  }

  input:has(+ .wui-input-text-submit-button) {
    padding-right: ${({spacing:a})=>a[12]};
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input[type='search']::-webkit-search-decoration,
  input[type='search']::-webkit-search-cancel-button,
  input[type='search']::-webkit-search-results-button,
  input[type='search']::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  /* -- Keyframes --------------------------------------------------- */
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;var a0=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let a1=class extends d.WF{constructor(){super(...arguments),this.inputElementRef=aR(),this.disabled=!1,this.loading=!1,this.placeholder="",this.type="text",this.value="",this.size="md"}render(){return(0,d.qy)` <div class="wui-input-text-container">
        ${this.templateLeftIcon()}
        <input
          data-size=${this.size}
          ${aU(this.inputElementRef)}
          data-testid="wui-input-text"
          type=${this.type}
          enterkeyhint=${(0,k.J)(this.enterKeyHint)}
          ?disabled=${this.disabled}
          placeholder=${this.placeholder}
          @input=${this.dispatchInputChangeEvent.bind(this)}
          @keydown=${this.onKeyDown}
          .value=${this.value||""}
        />
        ${this.templateSubmitButton()}
        <slot class="wui-input-text-slot"></slot>
      </div>
      ${this.templateError()} ${this.templateWarning()}`}templateLeftIcon(){return this.icon?(0,d.qy)`<wui-icon
        class="wui-input-text-left-icon"
        size="md"
        data-size=${this.size}
        color="inherit"
        name=${this.icon}
      ></wui-icon>`:null}templateSubmitButton(){return this.onSubmit?(0,d.qy)`<button
        class="wui-input-text-submit-button ${this.loading?"loading":""}"
        @click=${this.onSubmit?.bind(this)}
        ?disabled=${this.disabled||this.loading}
      >
        ${this.loading?(0,d.qy)`<wui-icon name="spinner" size="md"></wui-icon>`:(0,d.qy)`<wui-icon name="chevronRight" size="md"></wui-icon>`}
      </button>`:null}templateError(){return this.errorText?(0,d.qy)`<wui-text variant="sm-regular" color="error">${this.errorText}</wui-text>`:null}templateWarning(){return this.warningText?(0,d.qy)`<wui-text variant="sm-regular" color="warning">${this.warningText}</wui-text>`:null}dispatchInputChangeEvent(){this.dispatchEvent(new CustomEvent("inputChange",{detail:this.inputElementRef.value?.value,bubbles:!0,composed:!0}))}};a1.styles=[F.W5,F.fD,a_],a0([(0,e.MZ)()],a1.prototype,"icon",void 0),a0([(0,e.MZ)({type:Boolean})],a1.prototype,"disabled",void 0),a0([(0,e.MZ)({type:Boolean})],a1.prototype,"loading",void 0),a0([(0,e.MZ)()],a1.prototype,"placeholder",void 0),a0([(0,e.MZ)()],a1.prototype,"type",void 0),a0([(0,e.MZ)()],a1.prototype,"value",void 0),a0([(0,e.MZ)()],a1.prototype,"errorText",void 0),a0([(0,e.MZ)()],a1.prototype,"warningText",void 0),a0([(0,e.MZ)()],a1.prototype,"onSubmit",void 0),a0([(0,e.MZ)()],a1.prototype,"size",void 0),a0([(0,e.MZ)({attribute:!1})],a1.prototype,"onKeyDown",void 0),a1=a0([(0,G.E)("wui-input-text")],a1);let a2=(0,H.AH)`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  wui-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${({spacing:a})=>a[3]};
    color: ${({tokens:a})=>a.theme.iconDefault};
    cursor: pointer;
    padding: ${({spacing:a})=>a[2]};
    background-color: transparent;
    border-radius: ${({borderRadius:a})=>a[4]};
    transition: background-color ${({durations:a})=>a.lg}
      ${({easings:a})=>a["ease-out-power-2"]};
  }

  @media (hover: hover) {
    wui-icon:hover {
      background-color: ${({tokens:a})=>a.theme.foregroundSecondary};
    }
  }
`;var a3=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let a4=class extends d.WF{constructor(){super(...arguments),this.inputComponentRef=aR(),this.inputValue=""}render(){return(0,d.qy)`
      <wui-input-text
        ${aU(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
        @inputChange=${this.onInputChange}
      >
        ${this.inputValue?(0,d.qy)`<wui-icon
              @click=${this.clearValue}
              color="inherit"
              size="sm"
              name="close"
            ></wui-icon>`:null}
      </wui-input-text>
    `}onInputChange(a){this.inputValue=a.detail||""}clearValue(){let a=this.inputComponentRef.value,b=a?.inputElementRef.value;b&&(b.value="",this.inputValue="",b.focus(),b.dispatchEvent(new Event("input")))}};a4.styles=[F.W5,a2],a3([(0,e.MZ)()],a4.prototype,"inputValue",void 0),a4=a3([(0,G.E)("wui-search-bar")],a4);let a5=(0,d.JW)`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`,a6=(0,H.AH)`
  :host {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 104px;
    width: 104px;
    row-gap: ${({spacing:a})=>a[2]};
    background-color: ${({tokens:a})=>a.theme.foregroundPrimary};
    border-radius: ${({borderRadius:a})=>a[5]};
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--apkt-path-network);
    clip-path: var(--apkt-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: ${({tokens:a})=>a.theme.foregroundSecondary};
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`;var a7=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let a8=class extends d.WF{constructor(){super(...arguments),this.type="wallet"}render(){return(0,d.qy)`
      ${this.shimmerTemplate()}
      <wui-shimmer width="80px" height="20px"></wui-shimmer>
    `}shimmerTemplate(){return"network"===this.type?(0,d.qy)` <wui-shimmer data-type=${this.type} width="48px" height="54px"></wui-shimmer>
        ${a5}`:(0,d.qy)`<wui-shimmer width="56px" height="56px"></wui-shimmer>`}};a8.styles=[F.W5,F.fD,a6],a7([(0,e.MZ)()],a8.prototype,"type",void 0),a8=a7([(0,G.E)("wui-card-select-loader")],a8);var a9=c(16627);let ba=(0,d.AH)`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`;var bb=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let bc=class extends d.WF{render(){return this.style.cssText=`
      grid-template-rows: ${this.gridTemplateRows};
      grid-template-columns: ${this.gridTemplateColumns};
      justify-items: ${this.justifyItems};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      align-content: ${this.alignContent};
      column-gap: ${this.columnGap&&`var(--apkt-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--apkt-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--apkt-spacing-${this.gap})`};
      padding-top: ${this.padding&&a9.Z.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&a9.Z.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&a9.Z.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&a9.Z.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&a9.Z.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&a9.Z.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&a9.Z.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&a9.Z.getSpacingStyles(this.margin,3)};
    `,(0,d.qy)`<slot></slot>`}};bc.styles=[F.W5,ba],bb([(0,e.MZ)()],bc.prototype,"gridTemplateRows",void 0),bb([(0,e.MZ)()],bc.prototype,"gridTemplateColumns",void 0),bb([(0,e.MZ)()],bc.prototype,"justifyItems",void 0),bb([(0,e.MZ)()],bc.prototype,"alignItems",void 0),bb([(0,e.MZ)()],bc.prototype,"justifyContent",void 0),bb([(0,e.MZ)()],bc.prototype,"alignContent",void 0),bb([(0,e.MZ)()],bc.prototype,"columnGap",void 0),bb([(0,e.MZ)()],bc.prototype,"rowGap",void 0),bb([(0,e.MZ)()],bc.prototype,"gap",void 0),bb([(0,e.MZ)()],bc.prototype,"padding",void 0),bb([(0,e.MZ)()],bc.prototype,"margin",void 0),bc=bb([(0,G.E)("wui-grid")],bc);var bd=c(58775);let be=(0,j.AH)`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: ${({spacing:a})=>a["2"]};
    padding: ${({spacing:a})=>a["3"]} ${({spacing:a})=>a["0"]};
    background-color: ${({tokens:a})=>a.theme.foregroundPrimary};
    border-radius: clamp(0px, ${({borderRadius:a})=>a["4"]}, 20px);
    transition:
      color ${({durations:a})=>a.lg} ${({easings:a})=>a["ease-out-power-1"]},
      background-color ${({durations:a})=>a.lg}
        ${({easings:a})=>a["ease-out-power-1"]},
      border-radius ${({durations:a})=>a.lg}
        ${({easings:a})=>a["ease-out-power-1"]};
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: ${({tokens:a})=>a.theme.textPrimary};
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: ${({tokens:a})=>a.theme.foregroundSecondary};
    }
  }

  button:disabled > wui-flex > wui-text {
    color: ${({tokens:a})=>a.core.glass010};
  }

  [data-selected='true'] {
    background-color: ${({colors:a})=>a.accent020};
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: ${({colors:a})=>a.accent010};
    }
  }

  [data-selected='true']:active:enabled {
    background-color: ${({colors:a})=>a.accent010};
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`;var bf=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let bg=class extends d.WF{constructor(){super(),this.observer=new IntersectionObserver(()=>void 0),this.visible=!1,this.imageSrc=void 0,this.imageLoading=!1,this.isImpressed=!1,this.explorerId="",this.walletQuery="",this.certified=!1,this.displayIndex=0,this.wallet=void 0,this.observer=new IntersectionObserver(a=>{a.forEach(a=>{a.isIntersecting?(this.visible=!0,this.fetchImageSrc(),this.sendImpressionEvent()):this.visible=!1})},{threshold:.01})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){let a=this.wallet?.badge_type==="certified";return(0,d.qy)`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="1">
          <wui-text
            variant="md-regular"
            color="inherit"
            class=${(0,k.J)(a?"certified":void 0)}
            >${this.wallet?.name}</wui-text
          >
          ${a?(0,d.qy)`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>`:null}
        </wui-flex>
      </button>
    `}imageTemplate(){return(this.visible||this.imageSrc)&&!this.imageLoading?(0,d.qy)`
      <wui-wallet-image
        size="lg"
        imageSrc=${(0,k.J)(this.imageSrc)}
        name=${(0,k.J)(this.wallet?.name)}
        .installed=${this.wallet?.installed??!1}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `:this.shimmerTemplate()}shimmerTemplate(){return(0,d.qy)`<wui-shimmer width="56px" height="56px"></wui-shimmer>`}async fetchImageSrc(){this.wallet&&(this.imageSrc=t.$.getWalletImage(this.wallet),this.imageSrc||(this.imageLoading=!0,this.imageSrc=await t.$.fetchWalletImage(this.wallet.image_id),this.imageLoading=!1))}sendImpressionEvent(){this.wallet&&!this.isImpressed&&(this.isImpressed=!0,o.E.sendWalletImpressionEvent({name:this.wallet.name,walletRank:this.wallet.order,explorerId:this.explorerId,view:p.I.state.view,query:this.walletQuery,certified:this.certified,displayIndex:this.displayIndex}))}};bg.styles=be,bf([(0,e.wk)()],bg.prototype,"visible",void 0),bf([(0,e.wk)()],bg.prototype,"imageSrc",void 0),bf([(0,e.wk)()],bg.prototype,"imageLoading",void 0),bf([(0,e.wk)()],bg.prototype,"isImpressed",void 0),bf([(0,e.MZ)()],bg.prototype,"explorerId",void 0),bf([(0,e.MZ)()],bg.prototype,"walletQuery",void 0),bf([(0,e.MZ)()],bg.prototype,"certified",void 0),bf([(0,e.MZ)()],bg.prototype,"displayIndex",void 0),bf([(0,e.MZ)({type:Object})],bg.prototype,"wallet",void 0),bg=bf([(0,j.EM)("w3m-all-wallets-list-item")],bg);let bh=(0,j.AH)`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  :host([data-mobile-fullscreen='true']) wui-grid {
    max-height: none;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  w3m-all-wallets-list-item {
    opacity: 0;
    animation-duration: ${({durations:a})=>a.xl};
    animation-timing-function: ${({easings:a})=>a["ease-inout-power-2"]};
    animation-name: fade-in;
    animation-fill-mode: forwards;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-loading-spinner {
    padding-top: ${({spacing:a})=>a["4"]};
    padding-bottom: ${({spacing:a})=>a["4"]};
    justify-content: center;
    grid-column: 1 / span 4;
  }
`;var bi=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let bj="local-paginator",bk=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.loading=!h.N.state.wallets.length,this.wallets=h.N.state.wallets,this.recommended=h.N.state.recommended,this.featured=h.N.state.featured,this.filteredWallets=h.N.state.filteredWallets,this.mobileFullScreen=g.H.state.enableMobileFullScreen,this.unsubscribe.push(h.N.subscribeKey("wallets",a=>this.wallets=a),h.N.subscribeKey("recommended",a=>this.recommended=a),h.N.subscribeKey("featured",a=>this.featured=a),h.N.subscribeKey("filteredWallets",a=>this.filteredWallets=a))}firstUpdated(){this.initialFetch(),this.createPaginationObserver()}disconnectedCallback(){this.unsubscribe.forEach(a=>a()),this.paginationObserver?.disconnect()}render(){return this.mobileFullScreen&&this.setAttribute("data-mobile-fullscreen","true"),(0,d.qy)`
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${["0","3","3","3"]}
        gap="2"
        justifyContent="space-between"
      >
        ${this.loading?this.shimmerTemplate(16):this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `}async initialFetch(){this.loading=!0;let a=this.shadowRoot?.querySelector("wui-grid");a&&(await h.N.fetchWalletsByPage({page:1}),await a.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.loading=!1,a.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}shimmerTemplate(a,b){return[...Array(a)].map(()=>(0,d.qy)`
        <wui-card-select-loader type="wallet" id=${(0,k.J)(b)}></wui-card-select-loader>
      `)}getWallets(){let a=[...this.featured,...this.recommended];this.filteredWallets?.length>0?a.push(...this.filteredWallets):a.push(...this.wallets);let b=f.w.uniqueBy(a,"id"),c=bd.A.markWalletsAsInstalled(b);return bd.A.markWalletsWithDisplayIndex(c)}walletsTemplate(){return this.getWallets().map((a,b)=>(0,d.qy)`
        <w3m-all-wallets-list-item
          data-testid="wallet-search-item-${a.id}"
          @click=${()=>this.onConnectWallet(a)}
          .wallet=${a}
          explorerId=${a.id}
          certified=${"certified"===this.badge}
          displayIndex=${b}
        ></w3m-all-wallets-list-item>
      `)}paginationLoaderTemplate(){let{wallets:a,recommended:b,featured:c,count:d,mobileFilteredOutWalletsLength:e}=h.N.state,f=window.innerWidth<352?3:4,g=a.length+b.length,i=Math.ceil(g/f)*f-g+f;return(i-=a.length?c.length%f:0,0===d&&c.length>0)?null:0===d||[...c,...a,...b].length<d-(e??0)?this.shimmerTemplate(i,bj):null}createPaginationObserver(){let a=this.shadowRoot?.querySelector(`#${bj}`);a&&(this.paginationObserver=new IntersectionObserver(([a])=>{if(a?.isIntersecting&&!this.loading){let{page:a,count:b,wallets:c}=h.N.state;c.length<b&&h.N.fetchWalletsByPage({page:a+1})}}),this.paginationObserver.observe(a))}onConnectWallet(a){m.a.selectWalletConnector(a)}};bk.styles=bh,bi([(0,e.wk)()],bk.prototype,"loading",void 0),bi([(0,e.wk)()],bk.prototype,"wallets",void 0),bi([(0,e.wk)()],bk.prototype,"recommended",void 0),bi([(0,e.wk)()],bk.prototype,"featured",void 0),bi([(0,e.wk)()],bk.prototype,"filteredWallets",void 0),bi([(0,e.wk)()],bk.prototype,"badge",void 0),bi([(0,e.wk)()],bk.prototype,"mobileFullScreen",void 0),bk=bi([(0,j.EM)("w3m-all-wallets-list")],bk);let bl=(0,d.AH)`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  :host([data-mobile-fullscreen='true']) wui-grid {
    max-height: none;
    height: auto;
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;var bm=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let bn=class extends d.WF{constructor(){super(...arguments),this.prevQuery="",this.prevBadge=void 0,this.loading=!0,this.mobileFullScreen=g.H.state.enableMobileFullScreen,this.query=""}render(){return this.mobileFullScreen&&this.setAttribute("data-mobile-fullscreen","true"),this.onSearch(),this.loading?(0,d.qy)`<wui-loading-spinner color="accent-primary"></wui-loading-spinner>`:this.walletsTemplate()}async onSearch(){(this.query.trim()!==this.prevQuery.trim()||this.badge!==this.prevBadge)&&(this.prevQuery=this.query,this.prevBadge=this.badge,this.loading=!0,await h.N.searchWallet({search:this.query,badge:this.badge}),this.loading=!1)}walletsTemplate(){let{search:a}=h.N.state,b=bd.A.markWalletsAsInstalled(a);return a.length?(0,d.qy)`
      <wui-grid
        data-testid="wallet-list"
        .padding=${["0","3","3","3"]}
        rowGap="4"
        columngap="2"
        justifyContent="space-between"
      >
        ${b.map((a,b)=>(0,d.qy)`
            <w3m-all-wallets-list-item
              @click=${()=>this.onConnectWallet(a)}
              .wallet=${a}
              data-testid="wallet-search-item-${a.id}"
              explorerId=${a.id}
              certified=${"certified"===this.badge}
              walletQuery=${this.query}
              displayIndex=${b}
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `:(0,d.qy)`
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="3"
          flexDirection="column"
        >
          <wui-icon-box size="lg" color="default" icon="wallet"></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="secondary" variant="md-medium">
            No Wallet found
          </wui-text>
        </wui-flex>
      `}onConnectWallet(a){m.a.selectWalletConnector(a)}};bn.styles=bl,bm([(0,e.wk)()],bn.prototype,"loading",void 0),bm([(0,e.wk)()],bn.prototype,"mobileFullScreen",void 0),bm([(0,e.MZ)()],bn.prototype,"query",void 0),bm([(0,e.MZ)()],bn.prototype,"badge",void 0),bn=bm([(0,j.EM)("w3m-all-wallets-search")],bn);var bo=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let bp=class extends d.WF{constructor(){super(...arguments),this.search="",this.badge=void 0,this.onDebouncedSearch=f.w.debounce(a=>{this.search=a})}render(){let a=this.search.length>=2;return(0,d.qy)`
      <wui-flex .padding=${["1","3","3","3"]} gap="2" alignItems="center">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${"certified"===this.badge}
          @certifiedSwitchChange=${this.onCertifiedSwitchChange.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${a||this.badge?(0,d.qy)`<w3m-all-wallets-search
            query=${this.search}
            .badge=${this.badge}
          ></w3m-all-wallets-search>`:(0,d.qy)`<w3m-all-wallets-list .badge=${this.badge}></w3m-all-wallets-list>`}
    `}onInputChange(a){this.onDebouncedSearch(a.detail)}onCertifiedSwitchChange(a){a.detail?(this.badge="certified",B.P.showSvg("Only WalletConnect certified",{icon:"walletConnectBrown",iconColor:"accent-100"})):this.badge=void 0}qrButtonTemplate(){return f.w.isMobile()?(0,d.qy)`
        <wui-icon-box
          size="xl"
          iconSize="xl"
          color="accent-primary"
          icon="qrCode"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `:null}onWalletConnectQr(){p.I.push("ConnectingWalletConnect")}};bo([(0,e.wk)()],bp.prototype,"search",void 0),bo([(0,e.wk)()],bp.prototype,"badge",void 0),bp=bo([(0,j.EM)("w3m-all-wallets-view")],bp);let bq=(0,H.AH)`
  :host {
    width: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({spacing:a})=>a[3]};
    width: 100%;
    background-color: ${({tokens:a})=>a.theme.backgroundPrimary};
    border-radius: ${({borderRadius:a})=>a[4]};
    transition:
      background-color ${({durations:a})=>a.lg}
        ${({easings:a})=>a["ease-out-power-2"]},
      scale ${({durations:a})=>a.lg} ${({easings:a})=>a["ease-out-power-2"]};
    will-change: background-color, scale;
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-image {
    color: ${({tokens:a})=>a.theme.textPrimary};
  }

  @media (hover: hover) {
    button:hover:enabled {
      background-color: ${({tokens:a})=>a.theme.foregroundPrimary};
    }
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;var br=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let bs=class extends d.WF{constructor(){super(...arguments),this.imageSrc="google",this.loading=!1,this.disabled=!1,this.rightIcon=!0,this.rounded=!1,this.fullSize=!1}render(){return this.dataset.rounded=this.rounded?"true":"false",(0,d.qy)`
      <button
        ?disabled=${!!this.loading||!!this.disabled}
        data-loading=${this.loading}
        tabindex=${(0,k.J)(this.tabIdx)}
      >
        <wui-flex gap="2" alignItems="center">
          ${this.templateLeftIcon()}
          <wui-flex gap="1">
            <slot></slot>
          </wui-flex>
        </wui-flex>
        ${this.templateRightIcon()}
      </button>
    `}templateLeftIcon(){return this.icon?(0,d.qy)`<wui-image
        icon=${this.icon}
        iconColor=${(0,k.J)(this.iconColor)}
        ?boxed=${!0}
        ?rounded=${this.rounded}
      ></wui-image>`:(0,d.qy)`<wui-image
      ?boxed=${!0}
      ?rounded=${this.rounded}
      ?fullSize=${this.fullSize}
      src=${this.imageSrc}
    ></wui-image>`}templateRightIcon(){return this.rightIcon?this.loading?(0,d.qy)`<wui-loading-spinner size="md" color="accent-primary"></wui-loading-spinner>`:(0,d.qy)`<wui-icon name="chevronRight" size="lg" color="default"></wui-icon>`:null}};bs.styles=[F.W5,F.fD,bq],br([(0,e.MZ)()],bs.prototype,"imageSrc",void 0),br([(0,e.MZ)()],bs.prototype,"icon",void 0),br([(0,e.MZ)()],bs.prototype,"iconColor",void 0),br([(0,e.MZ)({type:Boolean})],bs.prototype,"loading",void 0),br([(0,e.MZ)()],bs.prototype,"tabIdx",void 0),br([(0,e.MZ)({type:Boolean})],bs.prototype,"disabled",void 0),br([(0,e.MZ)({type:Boolean})],bs.prototype,"rightIcon",void 0),br([(0,e.MZ)({type:Boolean})],bs.prototype,"rounded",void 0),br([(0,e.MZ)({type:Boolean})],bs.prototype,"fullSize",void 0),bs=br([(0,G.E)("wui-list-item")],bs);let bt=class extends d.WF{constructor(){super(...arguments),this.wallet=p.I.state.data?.wallet}render(){if(!this.wallet)throw Error("w3m-downloads-view");return(0,d.qy)`
      <wui-flex gap="2" flexDirection="column" .padding=${["3","3","4","3"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `}chromeTemplate(){return this.wallet?.chrome_store?(0,d.qy)`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">Chrome Extension</wui-text>
    </wui-list-item>`:null}iosTemplate(){return this.wallet?.app_store?(0,d.qy)`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">iOS App</wui-text>
    </wui-list-item>`:null}androidTemplate(){return this.wallet?.play_store?(0,d.qy)`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="md-medium" color="primary">Android App</wui-text>
    </wui-list-item>`:null}homepageTemplate(){return this.wallet?.homepage?(0,d.qy)`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="md-medium" color="primary">Website</wui-text>
      </wui-list-item>
    `:null}openStore(a){a.href&&this.wallet&&(o.E.sendEvent({type:"track",event:"GET_WALLET",properties:{name:this.wallet.name,walletRank:this.wallet.order,explorerId:this.wallet.id,type:a.type}}),f.w.openHref(a.href,"_blank"))}onChromeStore(){this.wallet?.chrome_store&&this.openStore({href:this.wallet.chrome_store,type:"chrome_store"})}onAppStore(){this.wallet?.app_store&&this.openStore({href:this.wallet.app_store,type:"app_store"})}onPlayStore(){this.wallet?.play_store&&this.openStore({href:this.wallet.play_store,type:"play_store"})}onHomePage(){this.wallet?.homepage&&this.openStore({href:this.wallet.homepage,type:"homepage"})}};bt=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g}([(0,j.EM)("w3m-downloads-view")],bt)},46028:(a,b,c)=>{let d=c(97393),e=c(90334);function f(a){this.mode=e.BYTE,"string"==typeof a&&(a=d(a)),this.data=new Uint8Array(a)}f.getBitsLength=function(a){return 8*a},f.prototype.getLength=function(){return this.data.length},f.prototype.getBitsLength=function(){return f.getBitsLength(this.data.length)},f.prototype.write=function(a){for(let b=0,c=this.data.length;b<c;b++)a.put(this.data[b],8)},a.exports=f},47087:(a,b,c)=>{b.render=c(86102).render,b.renderToFile=function(a,d,e,f){void 0===f&&(f=e,e=void 0);let g=c(29021),h=b.render(d,e);g.writeFile(a,'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'+h,f)}},48437:(a,b,c)=>{let d=c(11264);b.render=function(a,b,c){var e;let f=c,g=b;void 0!==f||b&&b.getContext||(f=b,b=void 0),b||(g=function(){try{return document.createElement("canvas")}catch(a){throw Error("You need to specify a canvas element")}}()),f=d.getOptions(f);let h=d.getImageWidth(a.modules.size,f),i=g.getContext("2d"),j=i.createImageData(h,h);return d.qrToImageData(j.data,a,f),e=g,i.clearRect(0,0,e.width,e.height),e.style||(e.style={}),e.height=h,e.width=h,e.style.height=h+"px",e.style.width=h+"px",i.putImageData(j,0,0),g},b.renderToDataURL=function(a,c,d){let e=d;void 0!==e||c&&c.getContext||(e=c,c=void 0),e||(e={});let f=b.render(a,c,e),g=e.type||"image/png",h=e.rendererOpts||{};return f.toDataURL(g,h.quality)}},48855:(a,b,c)=>{let d=c(20073);b.mul=function(a,b){let c=new Uint8Array(a.length+b.length-1);for(let e=0;e<a.length;e++)for(let f=0;f<b.length;f++)c[e+f]^=d.mul(a[e],b[f]);return c},b.mod=function(a,b){let c=new Uint8Array(a);for(;c.length-b.length>=0;){let a=c[0];for(let e=0;e<b.length;e++)c[e]^=d.mul(b[e],a);let e=0;for(;e<c.length&&0===c[e];)e++;c=c.slice(e)}return c},b.generateECPolynomial=function(a){let c=new Uint8Array([1]);for(let e=0;e<a;e++)c=b.mul(c,new Uint8Array([1,d.exp(e)]));return c}},50500:(a,b)=>{b.render=function(a,b,c){let d=a.modules.size,e=a.modules.data,f="\x1b[47m  \x1b[0m",g="",h=Array(d+3).join(f),i=[,,].join(f);g+=h+"\n";for(let a=0;a<d;++a){g+=f;for(let b=0;b<d;b++)g+=e[a*d+b]?"\x1b[40m  \x1b[0m":f;g+=i+"\n"}return g+=h+"\n","function"==typeof c&&c(null,g),g}},50659:(a,b)=>{b.L={bit:1},b.M={bit:0},b.Q={bit:3},b.H={bit:2},b.isValid=function(a){return a&&void 0!==a.bit&&a.bit>=0&&a.bit<4},b.from=function(a,c){if(b.isValid(a))return a;try{if("string"!=typeof a)throw Error("Param is not a string");switch(a.toLowerCase()){case"l":case"low":return b.L;case"m":case"medium":return b.M;case"q":case"quartile":return b.Q;case"h":case"high":return b.H;default:throw Error("Unknown EC Level: "+a)}}catch(a){return c}}},54624:(a,b,c)=>{let d=c(90334),e=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function f(a){this.mode=d.ALPHANUMERIC,this.data=a}f.getBitsLength=function(a){return 11*Math.floor(a/2)+a%2*6},f.prototype.getLength=function(){return this.data.length},f.prototype.getBitsLength=function(){return f.getBitsLength(this.data.length)},f.prototype.write=function(a){let b;for(b=0;b+2<=this.data.length;b+=2){let c=45*e.indexOf(this.data[b]);c+=e.indexOf(this.data[b+1]),a.put(c,11)}this.data.length%2&&a.put(e.indexOf(this.data[b]),6)},a.exports=f},57768:(a,b,c)=>{let d=c(90334),e=c(72468);function f(a){this.mode=d.KANJI,this.data=a}f.getBitsLength=function(a){return 13*a},f.prototype.getLength=function(){return this.data.length},f.prototype.getBitsLength=function(){return f.getBitsLength(this.data.length)},f.prototype.write=function(a){let b;for(b=0;b<this.data.length;b++){let c=e.toSJIS(this.data[b]);if(c>=33088&&c<=40956)c-=33088;else if(c>=57408&&c<=60351)c-=49472;else throw Error("Invalid SJIS character: "+this.data[b]+"\nMake sure your charset is UTF-8");c=(c>>>8&255)*192+(255&c),a.put(c,13)}},a.exports=f},59947:(a,b,c)=>{let d=c(72468),e=d.getBCHDigit(1335);b.getEncodedBits=function(a,b){let c=a.bit<<3|b,f=c<<10;for(;d.getBCHDigit(f)-e>=0;)f^=1335<<d.getBCHDigit(f)-e;return(c<<10|f)^21522}},65419:(a,b,c)=>{let d=c(90334),e=c(72507),f=c(54624),g=c(46028),h=c(57768),i=c(33906),j=c(72468),k=c(91008);function l(a){return unescape(encodeURIComponent(a)).length}function m(a,b,c){let d,e=[];for(;null!==(d=a.exec(c));)e.push({data:d[0],index:d.index,mode:b,length:d[0].length});return e}function n(a){let b,c,e=m(i.NUMERIC,d.NUMERIC,a),f=m(i.ALPHANUMERIC,d.ALPHANUMERIC,a);return j.isKanjiModeEnabled()?(b=m(i.BYTE,d.BYTE,a),c=m(i.KANJI,d.KANJI,a)):(b=m(i.BYTE_KANJI,d.BYTE,a),c=[]),e.concat(f,b,c).sort(function(a,b){return a.index-b.index}).map(function(a){return{data:a.data,mode:a.mode,length:a.length}})}function o(a,b){switch(b){case d.NUMERIC:return e.getBitsLength(a);case d.ALPHANUMERIC:return f.getBitsLength(a);case d.KANJI:return h.getBitsLength(a);case d.BYTE:return g.getBitsLength(a)}}function p(a,b){let c,i=d.getBestModeForData(a);if((c=d.from(b,i))!==d.BYTE&&c.bit<i.bit)throw Error('"'+a+'" cannot be encoded with mode '+d.toString(c)+".\n Suggested mode is: "+d.toString(i));switch(c===d.KANJI&&!j.isKanjiModeEnabled()&&(c=d.BYTE),c){case d.NUMERIC:return new e(a);case d.ALPHANUMERIC:return new f(a);case d.KANJI:return new h(a);case d.BYTE:return new g(a)}}b.fromArray=function(a){return a.reduce(function(a,b){return"string"==typeof b?a.push(p(b,null)):b.data&&a.push(p(b.data,b.mode)),a},[])},b.fromString=function(a,c){let e=function(a,b){let c={},e={start:{}},f=["start"];for(let g=0;g<a.length;g++){let h=a[g],i=[];for(let a=0;a<h.length;a++){let j=h[a],k=""+g+a;i.push(k),c[k]={node:j,lastCount:0},e[k]={};for(let a=0;a<f.length;a++){let g=f[a];c[g]&&c[g].node.mode===j.mode?(e[g][k]=o(c[g].lastCount+j.length,j.mode)-o(c[g].lastCount,j.mode),c[g].lastCount+=j.length):(c[g]&&(c[g].lastCount=j.length),e[g][k]=o(j.length,j.mode)+4+d.getCharCountIndicator(j.mode,b))}}f=i}for(let a=0;a<f.length;a++)e[f[a]].end=0;return{map:e,table:c}}(function(a){let b=[];for(let c=0;c<a.length;c++){let e=a[c];switch(e.mode){case d.NUMERIC:b.push([e,{data:e.data,mode:d.ALPHANUMERIC,length:e.length},{data:e.data,mode:d.BYTE,length:e.length}]);break;case d.ALPHANUMERIC:b.push([e,{data:e.data,mode:d.BYTE,length:e.length}]);break;case d.KANJI:b.push([e,{data:e.data,mode:d.BYTE,length:l(e.data)}]);break;case d.BYTE:b.push([{data:e.data,mode:d.BYTE,length:l(e.data)}])}}return b}(n(a,j.isKanjiModeEnabled())),c),f=k.find_path(e.map,"start","end"),g=[];for(let a=1;a<f.length-1;a++)g.push(e.table[f[a]].node);return b.fromArray(g.reduce(function(a,b){let c=a.length-1>=0?a[a.length-1]:null;return c&&c.mode===b.mode?a[a.length-1].data+=b.data:a.push(b),a},[]))},b.rawSplit=function(a){return b.fromArray(n(a,j.isKanjiModeEnabled()))}},69082:(a,b,c)=>{let d=c(72468).getSymbolSize;b.getPositions=function(a){let b=d(a);return[[0,0],[b-7,0],[0,b-7]]}},72463:(a,b,c)=>{let d=c(72468).getSymbolSize;b.getRowColCoords=function(a){if(1===a)return[];let b=Math.floor(a/7)+2,c=d(a),e=145===c?26:2*Math.ceil((c-13)/(2*b-2)),f=[c-7];for(let a=1;a<b-1;a++)f[a]=f[a-1]-e;return f.push(6),f.reverse()},b.getPositions=function(a){let c=[],d=b.getRowColCoords(a),e=d.length;for(let a=0;a<e;a++)for(let b=0;b<e;b++)(0!==a||0!==b)&&(0!==a||b!==e-1)&&(a!==e-1||0!==b)&&c.push([d[a],d[b]]);return c}},72468:(a,b)=>{let c,d=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];b.getSymbolSize=function(a){if(!a)throw Error('"version" cannot be null or undefined');if(a<1||a>40)throw Error('"version" should be in range from 1 to 40');return 4*a+17},b.getSymbolTotalCodewords=function(a){return d[a]},b.getBCHDigit=function(a){let b=0;for(;0!==a;)b++,a>>>=1;return b},b.setToSJISFunction=function(a){if("function"!=typeof a)throw Error('"toSJISFunc" is not a valid function.');c=a},b.isKanjiModeEnabled=function(){return void 0!==c},b.toSJIS=function(a){return c(a)}},72507:(a,b,c)=>{let d=c(90334);function e(a){this.mode=d.NUMERIC,this.data=a.toString()}e.getBitsLength=function(a){return 10*Math.floor(a/3)+(a%3?a%3*3+1:0)},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(a){let b,c;for(b=0;b+3<=this.data.length;b+=3)c=parseInt(this.data.substr(b,3),10),a.put(c,10);let d=this.data.length-b;d>0&&(c=parseInt(this.data.substr(b),10),a.put(c,3*d+1))},a.exports=e},74525:a=>{function b(){this.buffer=[],this.length=0}b.prototype={get:function(a){let b=Math.floor(a/8);return(this.buffer[b]>>>7-a%8&1)==1},put:function(a,b){for(let c=0;c<b;c++)this.putBit((a>>>b-c-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(a){let b=Math.floor(this.length/8);this.buffer.length<=b&&this.buffer.push(0),a&&(this.buffer[b]|=128>>>this.length%8),this.length++}},a.exports=b},74718:(a,b)=>{b.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};let c={N1:3,N2:3,N3:40,N4:10};b.isValid=function(a){return null!=a&&""!==a&&!isNaN(a)&&a>=0&&a<=7},b.from=function(a){return b.isValid(a)?parseInt(a,10):void 0},b.getPenaltyN1=function(a){let b=a.size,d=0,e=0,f=0,g=null,h=null;for(let i=0;i<b;i++){e=f=0,g=h=null;for(let j=0;j<b;j++){let b=a.get(i,j);b===g?e++:(e>=5&&(d+=c.N1+(e-5)),g=b,e=1),(b=a.get(j,i))===h?f++:(f>=5&&(d+=c.N1+(f-5)),h=b,f=1)}e>=5&&(d+=c.N1+(e-5)),f>=5&&(d+=c.N1+(f-5))}return d},b.getPenaltyN2=function(a){let b=a.size,d=0;for(let c=0;c<b-1;c++)for(let e=0;e<b-1;e++){let b=a.get(c,e)+a.get(c,e+1)+a.get(c+1,e)+a.get(c+1,e+1);(4===b||0===b)&&d++}return d*c.N2},b.getPenaltyN3=function(a){let b=a.size,d=0,e=0,f=0;for(let c=0;c<b;c++){e=f=0;for(let g=0;g<b;g++)e=e<<1&2047|a.get(c,g),g>=10&&(1488===e||93===e)&&d++,f=f<<1&2047|a.get(g,c),g>=10&&(1488===f||93===f)&&d++}return d*c.N3},b.getPenaltyN4=function(a){let b=0,d=a.data.length;for(let c=0;c<d;c++)b+=a.data[c];return Math.abs(Math.ceil(100*b/d/5)-10)*c.N4},b.applyMask=function(a,c){let d=c.size;for(let e=0;e<d;e++)for(let f=0;f<d;f++)c.isReserved(f,e)||c.xor(f,e,function(a,c,d){switch(a){case b.Patterns.PATTERN000:return(c+d)%2==0;case b.Patterns.PATTERN001:return c%2==0;case b.Patterns.PATTERN010:return d%3==0;case b.Patterns.PATTERN011:return(c+d)%3==0;case b.Patterns.PATTERN100:return(Math.floor(c/2)+Math.floor(d/3))%2==0;case b.Patterns.PATTERN101:return c*d%2+c*d%3==0;case b.Patterns.PATTERN110:return(c*d%2+c*d%3)%2==0;case b.Patterns.PATTERN111:return(c*d%3+(c+d)%2)%2==0;default:throw Error("bad maskPattern:"+a)}}(a,f,e))},b.getBestMask=function(a,c){let d=Object.keys(b.Patterns).length,e=0,f=1/0;for(let g=0;g<d;g++){c(g),b.applyMask(g,a);let d=b.getPenaltyN1(a)+b.getPenaltyN2(a)+b.getPenaltyN3(a)+b.getPenaltyN4(a);b.applyMask(g,a),d<f&&(f=d,e=g)}return e}},79259:a=>{a.exports=function(){return"function"==typeof Promise&&Promise.prototype&&Promise.prototype.then}},80440:(a,b)=>{b.isValid=function(a){return!isNaN(a)&&a>=1&&a<=40}},85769:(a,b,c)=>{let d=c(50500),e=c(4061);b.render=function(a,b,c){return b&&b.small?e.render(a,b,c):d.render(a,b,c)}},86102:(a,b,c)=>{let d=c(11264);function e(a,b){let c=a.a/255,d=b+'="'+a.hex+'"';return c<1?d+" "+b+'-opacity="'+c.toFixed(2).slice(1)+'"':d}function f(a,b,c){let d=a+b;return void 0!==c&&(d+=" "+c),d}b.render=function(a,b,c){let g=d.getOptions(b),h=a.modules.size,i=a.modules.data,j=h+2*g.margin,k=g.color.light.a?"<path "+e(g.color.light,"fill")+' d="M0 0h'+j+"v"+j+'H0z"/>':"",l="<path "+e(g.color.dark,"stroke")+' d="'+function(a,b,c){let d="",e=0,g=!1,h=0;for(let i=0;i<a.length;i++){let j=Math.floor(i%b),k=Math.floor(i/b);j||g||(g=!0),a[i]?(h++,i>0&&j>0&&a[i-1]||(d+=g?f("M",j+c,.5+k+c):f("m",e,0),e=0,g=!1),j+1<b&&a[i+1]||(d+=f("h",h),h=0)):e++}return d}(i,h,g.margin)+'"/>',m='<svg xmlns="http://www.w3.org/2000/svg" '+(g.width?'width="'+g.width+'" height="'+g.width+'" ':"")+('viewBox="0 0 '+j+" ")+j+'" shape-rendering="crispEdges">'+k+l+"</svg>\n";return"function"==typeof c&&c(null,m),m}},89476:(a,b,c)=>{let d=c(50659),e=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],f=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];b.getBlocksCount=function(a,b){switch(b){case d.L:return e[(a-1)*4+0];case d.M:return e[(a-1)*4+1];case d.Q:return e[(a-1)*4+2];case d.H:return e[(a-1)*4+3];default:return}},b.getTotalCodewordsCount=function(a,b){switch(b){case d.L:return f[(a-1)*4+0];case d.M:return f[(a-1)*4+1];case d.Q:return f[(a-1)*4+2];case d.H:return f[(a-1)*4+3];default:return}}},90334:(a,b,c)=>{let d=c(80440),e=c(33906);b.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},b.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},b.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},b.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},b.MIXED={bit:-1},b.getCharCountIndicator=function(a,b){if(!a.ccBits)throw Error("Invalid mode: "+a);if(!d.isValid(b))throw Error("Invalid version: "+b);return b>=1&&b<10?a.ccBits[0]:b<27?a.ccBits[1]:a.ccBits[2]},b.getBestModeForData=function(a){return e.testNumeric(a)?b.NUMERIC:e.testAlphanumeric(a)?b.ALPHANUMERIC:e.testKanji(a)?b.KANJI:b.BYTE},b.toString=function(a){if(a&&a.id)return a.id;throw Error("Invalid mode")},b.isValid=function(a){return a&&a.bit&&a.ccBits},b.from=function(a,c){if(b.isValid(a))return a;try{if("string"!=typeof a)throw Error("Param is not a string");switch(a.toLowerCase()){case"numeric":return b.NUMERIC;case"alphanumeric":return b.ALPHANUMERIC;case"kanji":return b.KANJI;case"byte":return b.BYTE;default:throw Error("Unknown mode: "+a)}}catch(a){return c}}},92557:(a,b,c)=>{let d=c(79259),e=c(26987),f=c(48437),g=c(86102);function h(a,b,c,f,g){let h=[].slice.call(arguments,1),i=h.length,j="function"==typeof h[i-1];if(!j&&!d())throw Error("Callback required as last argument");if(j){if(i<2)throw Error("Too few arguments provided");2===i?(g=c,c=b,b=f=void 0):3===i&&(b.getContext&&void 0===g?(g=f,f=void 0):(g=f,f=c,c=b,b=void 0))}else{if(i<1)throw Error("Too few arguments provided");return 1===i?(c=b,b=f=void 0):2!==i||b.getContext||(f=c,c=b,b=void 0),new Promise(function(d,g){try{let g=e.create(c,f);d(a(g,b,f))}catch(a){g(a)}})}try{let d=e.create(c,f);g(null,a(d,b,f))}catch(a){g(a)}}e.create,b.toCanvas=h.bind(null,f.render),h.bind(null,f.renderToDataURL),h.bind(null,function(a,b,c){return g.render(a,c)})},97393:a=>{"use strict";a.exports=function(a){for(var b=[],c=a.length,d=0;d<c;d++){var e=a.charCodeAt(d);if(e>=55296&&e<=56319&&c>d+1){var f=a.charCodeAt(d+1);f>=56320&&f<=57343&&(e=(e-55296)*1024+f-56320+65536,d+=1)}if(e<128){b.push(e);continue}if(e<2048){b.push(e>>6|192),b.push(63&e|128);continue}if(e<55296||e>=57344&&e<65536){b.push(e>>12|224),b.push(e>>6&63|128),b.push(63&e|128);continue}if(e>=65536&&e<=1114111){b.push(e>>18|240),b.push(e>>12&63|128),b.push(e>>6&63|128),b.push(63&e|128);continue}b.push(239,191,189)}return new Uint8Array(b).buffer}},99830:(a,b,c)=>{let d=c(11264),e={WW:" ",WB:"▄",BB:"█",BW:"▀"},f={BB:" ",BW:"▄",WW:"█",WB:"▀"};b.render=function(a,b,c){let g=d.getOptions(b),h=e;("#ffffff"===g.color.dark.hex||"#000000"===g.color.light.hex)&&(h=f);let i=a.modules.size,j=a.modules.data,k="",l=Array(i+2*g.margin+1).join(h.WW);l=Array(g.margin/2+1).join(l+"\n");let m=Array(g.margin+1).join(h.WW);k+=l;for(let a=0;a<i;a+=2){k+=m;for(let b=0;b<i;b++){var n;let c=j[a*i+b],d=j[(a+1)*i+b];k+=(n=h,c&&d?n.BB:c&&!d?n.BW:!c&&d?n.WB:n.WW)}k+=m+"\n"}return k+=l.slice(0,-1),"function"==typeof c&&c(null,k),k},b.renderToFile=function(a,d,e,f){void 0===f&&(f=e,e=void 0);let g=c(29021),h=b.render(d,e);g.writeFile(a,h,f)}}};