webpackJsonp([0],[function(t,e,n){"use strict";n(1),n(5),n(7),n(9),n(10),n(22),n(23)},function(t,e){},,,,function(t,e){},,function(t,e){},,function(t,e){"use strict";!function(t,e){var n=t.documentElement,i="orientationchange"in window?"orientationchange":"resize",o=function(){var t=Math.min(n.clientWidth,900);t&&(n.style.fontSize=100*(t/750)+"px")};t.addEventListener&&(e.addEventListener(i,o,!1),t.addEventListener("DOMContentLoaded",o,!1))}(document,window),window.onload=function(){document.addEventListener("gesturestart",function(t){t.preventDefault()}),document.addEventListener("dblclick",function(t){t.preventDefault()}),document.addEventListener("touchstart",function(t){t.touches.length>1&&t.preventDefault()});var t=0;document.addEventListener("touchend",function(e){var n=(new Date).getTime();n-t<=300&&e.preventDefault(),t=n},!1)}},function(t,e,n){"use strict";n(11);var i=(n(14),{init:function(){this.bindEvent()},setCookie:function(t,e){document.cookie=t+"="+escape(e)+";path=/"},bindEvent:function(){},getQueryString:function(t,e){var n=new RegExp("(^|\\?|&)"+e+"=([^&#]*)(\\s|&|#|$)","i");if(n.test(t))return RegExp.$2.replace(/\+/g," ")}});i.init()},,,,function(t,e,n){var i,o,a;!function(r,s){o=[t,n(15),n(17),n(18)],i=s,a="function"==typeof i?i.apply(e,o):i,!(void 0!==a&&(t.exports=a))}(this,function(t,e,n,i){"use strict";function o(t){return t&&t.__esModule?t:{default:t}}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function c(t,e){var n="data-clipboard-"+t;if(e.hasAttribute(n))return e.getAttribute(n)}var l=o(e),u=o(n),d=o(i),f=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),h=function(t){function e(t,n){a(this,e);var i=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return i.resolveOptions(n),i.listenClick(t),i}return s(e,t),f(e,[{key:"resolveOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"==typeof t.action?t.action:this.defaultAction,this.target="function"==typeof t.target?t.target:this.defaultTarget,this.text="function"==typeof t.text?t.text:this.defaultText}},{key:"listenClick",value:function(t){var e=this;this.listener=(0,d.default)(t,"click",function(t){return e.onClick(t)})}},{key:"onClick",value:function(t){var e=t.delegateTarget||t.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new l.default({action:this.action(e),target:this.target(e),text:this.text(e),trigger:e,emitter:this})}},{key:"defaultAction",value:function(t){return c("action",t)}},{key:"defaultTarget",value:function(t){var e=c("target",t);if(e)return document.querySelector(e)}},{key:"defaultText",value:function(t){return c("text",t)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],e="string"==typeof t?[t]:t,n=!!document.queryCommandSupported;return e.forEach(function(t){n=n&&!!document.queryCommandSupported(t)}),n}}]),e}(u.default);t.exports=h})},function(t,e,n){var i,o,a;!function(r,s){o=[t,n(16)],i=s,a="function"==typeof i?i.apply(e,o):i,!(void 0!==a&&(t.exports=a))}(this,function(t,e){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var o=n(e),a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),s=function(){function t(e){i(this,t),this.resolveOptions(e),this.initSelection()}return r(t,[{key:"resolveOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action=t.action,this.emitter=t.emitter,this.target=t.target,this.text=t.text,this.trigger=t.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var t=this,e="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return t.removeFake()},this.fakeHandler=document.body.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[e?"right":"left"]="-9999px";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,document.body.appendChild(this.fakeElem),this.selectedText=(0,o.default)(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(document.body.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(document.body.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=(0,o.default)(this.target),this.copyText()}},{key:"copyText",value:function(){var t=void 0;try{t=document.execCommand(this.action)}catch(e){t=!1}this.handleResult(t)}},{key:"handleResult",value:function(t){this.emitter.emit(t?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.target&&this.target.blur(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=t,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(t){if(void 0!==t){if(!t||"object"!==("undefined"==typeof t?"undefined":a(t))||1!==t.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&t.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(t.hasAttribute("readonly")||t.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=t}},get:function(){return this._target}}]),t}();t.exports=s})},function(t,e){function n(t){var e;if("SELECT"===t.nodeName)t.focus(),e=t.value;else if("INPUT"===t.nodeName||"TEXTAREA"===t.nodeName){var n=t.hasAttribute("readonly");n||t.setAttribute("readonly",""),t.select(),t.setSelectionRange(0,t.value.length),n||t.removeAttribute("readonly"),e=t.value}else{t.hasAttribute("contenteditable")&&t.focus();var i=window.getSelection(),o=document.createRange();o.selectNodeContents(t),i.removeAllRanges(),i.addRange(o),e=i.toString()}return e}t.exports=n},function(t,e){function n(){}n.prototype={on:function(t,e,n){var i=this.e||(this.e={});return(i[t]||(i[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){function i(){o.off(t,i),e.apply(n,arguments)}var o=this;return i._=e,this.on(t,i,n)},emit:function(t){var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),i=0,o=n.length;for(i;i<o;i++)n[i].fn.apply(n[i].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),i=n[t],o=[];if(i&&e)for(var a=0,r=i.length;a<r;a++)i[a].fn!==e&&i[a].fn._!==e&&o.push(i[a]);return o.length?n[t]=o:delete n[t],this}},t.exports=n},function(t,e,n){function i(t,e,n){if(!t&&!e&&!n)throw new Error("Missing required arguments");if(!s.string(e))throw new TypeError("Second argument must be a String");if(!s.fn(n))throw new TypeError("Third argument must be a Function");if(s.node(t))return o(t,e,n);if(s.nodeList(t))return a(t,e,n);if(s.string(t))return r(t,e,n);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function o(t,e,n){return t.addEventListener(e,n),{destroy:function(){t.removeEventListener(e,n)}}}function a(t,e,n){return Array.prototype.forEach.call(t,function(t){t.addEventListener(e,n)}),{destroy:function(){Array.prototype.forEach.call(t,function(t){t.removeEventListener(e,n)})}}}function r(t,e,n){return c(document.body,t,e,n)}var s=n(19),c=n(20);t.exports=i},function(t,e){e.node=function(t){return void 0!==t&&t instanceof HTMLElement&&1===t.nodeType},e.nodeList=function(t){var n=Object.prototype.toString.call(t);return void 0!==t&&("[object NodeList]"===n||"[object HTMLCollection]"===n)&&"length"in t&&(0===t.length||e.node(t[0]))},e.string=function(t){return"string"==typeof t||t instanceof String},e.fn=function(t){var e=Object.prototype.toString.call(t);return"[object Function]"===e}},function(t,e,n){function i(t,e,n,i,a){var r=o.apply(this,arguments);return t.addEventListener(n,r,a),{destroy:function(){t.removeEventListener(n,r,a)}}}function o(t,e,n,i){return function(n){n.delegateTarget=a(n.target,e),n.delegateTarget&&i.call(t,n)}}var a=n(21);t.exports=i},function(t,e){function n(t,e){for(;t&&t.nodeType!==i;){if(t.matches(e))return t;t=t.parentNode}}var i=9;if("undefined"!=typeof Element&&!Element.prototype.matches){var o=Element.prototype;o.matches=o.matchesSelector||o.mozMatchesSelector||o.msMatchesSelector||o.oMatchesSelector||o.webkitMatchesSelector}t.exports=n},function(t,e,n){"use strict";n(11);var i=n(23),o={qq:{forbid:0,lower:1,higher:2},uc:{forbid:0,allow:1}},a=navigator.appVersion,r=a.split("MQQBrowser/").length>1?o.qq.higher:o.qq.forbid,s=a.split("UCBrowser/").length>1?o.uc.allow:o.uc.forbid,c={oBack:document.getElementById("back"),back:document.getElementsByClassName("back")[0],oSec:document.getElementById("sec"),oLev:document.getElementById("level"),oSta:document.getElementById("start"),oUl:document.getElementById("oul"),level:1,time:0,n:1,dataObjArr:[1,1],templateobj:"",rewardList:null,gameStart:!1,timer:null,isFirstStart:!0,isAgainStart:!1,haveRewardLists:[],allTime:0,init:function(){var t=this;i.sendFirst(function(e){t.time=e.data.lottery.stageConfig.seconds,t.allTime=e.data.lottery.stageConfig.seconds,t.start()})},start:function(){var t=this;t.oLev.innerHTML=0,t.oSta.onclick=function(){if(t.gameStart){t.gameStart=!1,$("#start").css("display","none");var e={data:t.haveRewardLists};console.log(e);var n=template("outLayerFirstTemplate",e);$("#outLayer").html(n),$("#outLayer").css("display","block"),$("#contuineBtn").on("click",function(){t.gameStart=!0,$("#start").css("display","block"),$("#start").text("暂停"),t.timed(),$("#outLayer").css("display","none")}),i.swiperConfig(),clearInterval(t.timer)}else t.gameStart=!0,$("#start").css("display","block"),$("#start").text("暂停"),t.timed(),t.isFirstStart&&(t.add(),t.rewardList=i.getRewardList(),$.each(t.rewardList,function(e,n){1==n&&i.sendGain(function(e){e.data&&(t.haveRewardLists.push(e.data),console.log(t.haveRewardLists)),$("#topgoodsIcon").addClass("showGoodIcon"),$("#goodsIconNum").text("+1"),setTimeout(function(){$("#topgoodsIcon").removeClass("showGoodIcon")},1e3)})}),t.isFirstStart=!1)}},restart:function(){var t=this;t.isAgainStart=!0,t.n=1,t.level=1,t.time=t.allTime;var e={data:[[1,1],[1,1]]},n=template("gameTemplate",e);t.templateobj=n,t.timed(),t.add()},timed:function(t){var e=this;e.timer=setInterval(function(){e.time=(e.time-.02).toFixed(2),e.oSec.innerHTML=e.time,e.time<=0&&(clearInterval(e.timer),setTimeout(function(){var t={data:e.haveRewardLists};console.log(t);var n=template("outLayerTwoTemplate",t);$("#outLayer").html(n),$("#outLayer").css("display","block"),i.swiperConfig(),$("#reStart").on("click",function(){$("#outLayer").css("display","none"),e.restart()}),$("#shareBtn").on("click",function(){(r||s)&&($("#outLayer").css("display","none"),$("#nativeShareLayer").css("display","block"),$("#nativeShareLayer").on("click",function(){$("#nativeShareLayer").css("display","none"),window.location.reload()}))})},100),e.oBack.parentNode.style.display="block")},20)},add:function(){this.level++;var t=this;this.isAgainStart||$.each(this.rewardList,function(e,n){var o=t.level-1;console.log(o),o==n&&i.sendGain(function(t){t.data&&(u.haveRewardLists.push(t.data),console.log(u.haveRewardLists));var e=Number($("#goodsIconNum").text().slice(1));console.log(t),$("#goodsIconNum").text("+"+(e+1)),$("#topgoodsIcon").addClass("showGoodIcon"),setTimeout(function(){$("#topgoodsIcon").removeClass("showGoodIcon")},1e3),console.log(1===e)})}),this.oLev.innerHTML=this.n,$("#oul").html(this.templateobj);var e=this.dataObjArr;console.log(this.dataObjArr);var n=this.level-1;console.log(e);for(var o={data:[]},a=0;a<n;a++)e.push(1);$.each(e,function(t,n){o.data[t]=e}),console.log(o);var r=template("gameTemplate",o);this.templateobj=r;var s=this.randcolor(this.level*this.level),c=this.oUl.querySelectorAll("li"),l=c[s].children[0];l.src="//static.adbaitai.com/game/Zhaoocha/imgs/square2.png";var u=this;c[s].ontouchstart=function(){u.n++;for(var t=0;t<c.length;t++)c[t].remove();u.add()},o=null,this.dataObjArr=[1,1]},randcolor:function(t){return Math.floor(Math.random()*t)}};Zepto(function(t){c.init();var e={data:[[1,1],[1,1]]},n=template("gameTemplate",e);c.templateobj=n,t(".gameRule").css("display","block");var i={data:[1,1,1,1]},o=template("gamePostTemplate",i);t("#oul").html(o)})},function(t,e,n){"use strict";n(11);var i=n(24),o={server:"",getLotteryUrl:"/api/1.0/h5/lottery/getLottery",gainUrl:"/api/1.0/h5/lottery/gain",locationObj:{},searchStr:"",data:null,init:function(){this.getServer(),this.getLocation()},getServer:function(){var t=window.location.hostname;"game.adbaitai.com"==t?this.server="//game.adbaitai.com":"gamepre.adbaitai.com"==t?this.server="//gamepre.adbaitai.com":this.server="//gamepre.adbaitai.com"},getLocation:function(){for(var t=window.location.search.slice(1),e=t.split("&"),n={},i=0;i<e.length;i++)e[i].indexOf("ADTAG")>-1?n.ADTAG=e[i].split("=")[1]:e[i].indexOf("pid")>-1?n.pid=e[i].split("=")[1]:e[i].indexOf("materialId")>-1?n.materialId=e[i].split("=")[1]:e[i].indexOf("appKey")>-1?n.appKey=e[i].split("=")[1]:e[i].indexOf("sourceSi")>-1&&(n.sourceSi=e[i].split("=")[1]);console.log(n),this.locationObj=n,this.concatSearch()},concatSearch:function(){var t=this.locationObj,e="";return e="?ADTAG="+t.ADTAG+"&data=%7Bpid:"+t.pid+",materialId:"+t.materialId+"%7D&appKey="+t.appKey,t.sourceSi&&(e+="&sourceSi="+t.sourceSi),console.log(e),this.searchStr=e,e},sendFirst:function(t){var e=this.server+this.getLotteryUrl+this.searchStr,n=this;$.ajax({url:e,dataType:"jsonp",success:function(e){"function"==typeof t?t(e):"";var i=e.data.ticket;e.success===!0&&(n.data=e.data),n.weixinConfig(i),n.setTotleTime(e.data),n.setScore(e.data)}})},sendGain:function(t){var e=this.server+this.gainUrl+this.searchStr,n=this;$.ajax({url:e,dataType:"jsonp",success:function(e){"function"==typeof t?t(e):"",n.setScore(e.data)}})},weixinConfig:function(t){console.log(i.hex_sha1(t));var e="Wm3WZYTPz0wzccnW",n=t,o=Date.now(),a="jsapi_ticket="+n+"&noncestr="+e+"&timestamp="+o+"&url="+this.url,r=i.hex_sha1(a);wx.config({debug:!0,appId:"wxfa8b4275880355a7",timestamp:o,nonceStr:e,signature:r,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","onMenuShareQZone"]})},swiperConfig:function(){new Swiper(".swiper-container",{effect:"coverflow",slidesPerView:3,watchSlidesProgress:!0,centeredSlides:!0,loop:!0,loopAdditionalSlides:1,pagination:".swiper-pagination",coverflow:{rotate:27,stretch:10,depth:60,modifier:2,slideShadows:!0}})},getData:function(){if(this.data)return this.data},getRewardList:function(){if(this.data)return this.data.lottery.stageConfig.stageList},setTotleTime:function(t){var e=t.lottery.stageConfig;if(e.isLimitTime){var n=e.seconds;$("#sec").text(n)}else $("#sec").text("不限时")},setScore:function(t){var e=t.score;$("#floatTitleRightAllCount").text(e)}};o.init(),t.exports=o},function(t,e){"use strict";var n={hexcase:0,hex_sha1:function(t){for(var e=this.core_sha1(this.AlignSHA1(t)),n=this.hexcase?"0123456789ABCDEF":"0123456789abcdef",i="",o=0;o<4*e.length;o++)i+=n.charAt(e[o>>2]>>8*(3-o%4)+4&15)+n.charAt(e[o>>2]>>8*(3-o%4)&15);return i},core_sha1:function(t){for(var e=t,n=Array(80),i=1732584193,o=-271733879,a=-1732584194,r=271733878,s=-1009589776,c=0;c<e.length;c+=16){for(var l=i,u=o,d=a,f=r,h=s,p=0;p<80;p++){p<16?n[p]=e[c+p]:n[p]=this.rol(n[p-3]^n[p-8]^n[p-14]^n[p-16],1);var m=this.safe_add(this.safe_add(this.rol(i,5),this.sha1_ft(p,o,a,r)),this.safe_add(this.safe_add(s,n[p]),this.sha1_kt(p)));s=r,r=a,a=this.rol(o,30),o=i,i=m}i=this.safe_add(i,l),o=this.safe_add(o,u),a=this.safe_add(a,d),r=this.safe_add(r,f),s=this.safe_add(s,h)}return new Array(i,o,a,r,s)},AlignSHA1:function(t){for(var e=(t.length+8>>6)+1,n=new Array(16*e),i=0;i<16*e;i++)n[i]=0;for(i=0;i<t.length;i++)n[i>>2]|=t.charCodeAt(i)<<24-8*(3&i);return n[i>>2]|=128<<24-8*(3&i),n[16*e-1]=8*t.length,n},safe_add:function(t,e){var n=(65535&t)+(65535&e),i=(t>>16)+(e>>16)+(n>>16);return i<<16|65535&n},rol:function(t,e){return t<<e|t>>>32-e},sha1_ft:function(t,e,n,i){return t<20?e&n|~e&i:t<40?e^n^i:t<60?e&n|e&i|n&i:e^n^i},sha1_kt:function(t){return t<20?1518500249:t<40?1859775393:t<60?-1894007588:-899497514}};t.exports=n}]);