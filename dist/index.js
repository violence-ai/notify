!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("Notify",[],t):"object"==typeof exports?exports.Notify=t():e.Notify=t()}("undefined"==typeof self?this:self,(function(){return(()=>{"use strict";var e={339:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.animateLikeOnIphone=void 0,t.animateLikeOnIphone={beforeInsert:function(e,t){e.elMessage.style.height="0",e.elMessage.style.transition="500ms ease",e.elContent.style.transform="scale(0)",e.elContent.style.opacity="0",t()},afterInsert:function(e,t){e.elMessage.style.height="".concat(e.elContent.clientHeight+20,"px"),e.elContent.animate([{offset:0,transform:"scale(0)",opacity:"0"},{offset:1,transform:"scale(1)",opacity:"1"}],{duration:500,fill:"forwards",easing:"ease"}).addEventListener("finish",(function(){t()}))},afterInAnimateEnd:function(e,t){t()},startOutAnimate:function(e,t){var n=Math.floor(410);e.elContent.style.transform="scale(1)",e.elContent.style.opacity="1",e.elContent.animate([{offset:0,opacity:"1"},{offset:1,opacity:"0"}],{duration:n,fill:"forwards",easing:"ease"}).addEventListener("finish",(function(){e.elMessage.style.transition="".concat(n,"ms ease"),e.elMessage.style.height="0px",setTimeout((function(){t()}),n)}))}}},277:(e,t,n)=>{function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(939),s=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.timeoutInterval=null,this.notify=n,this.elMessage=document.createElement("div"),this.elContent=document.createElement("div"),this.elCloseBtn=document.createElement("div"),this.elTitle=document.createElement("div"),this.elText=document.createElement("div");var i=this.notify.getStyles();o.setCSSStyles(this.elMessage,i.message),o.setCSSStyles(this.elContent,i.content),o.setCSSStyles(this.elCloseBtn,i.close),o.setCSSStyles(this.elTitle,i.title),o.setCSSStyles(this.elText,i.text),this.elContent.addEventListener("mouseenter",this.stopTimeout.bind(this)),this.elContent.addEventListener("mouseleave",this.startTimeout.bind(this)),this.elCloseBtn.addEventListener("click",this.startOutAnimate.bind(this)),this.elTitle.innerText=t.title,this.elText.innerText=t.text,this.elMessage.append(this.elContent),this.elContent.append(this.elCloseBtn),this.elContent.append(this.elTitle),this.elContent.append(this.elText),this.beforeInsert()}var t,n;return t=e,(n=[{key:"beforeInsert",value:function(){var e=this;this.notify.getAnimate().beforeInsert(this,(function(){e.afterInsert()}))}},{key:"afterInsert",value:function(){var e=this;this.notify.rootElement.prepend(this.elMessage),this.notify.getAnimate().afterInsert(this,(function(){e.afterInAnimateEnd()}))}},{key:"afterInAnimateEnd",value:function(){var e=this;this.notify.getAnimate().afterInAnimateEnd(this,(function(){e.startTimeout()}))}},{key:"startOutAnimate",value:function(){var e=this;this.notify.getAnimate().startOutAnimate(this,(function(){e.elMessage.remove()}))}},{key:"stopTimeout",value:function(){this.timeoutInterval&&clearTimeout(this.timeoutInterval)}},{key:"startTimeout",value:function(){var e=this;this.stopTimeout(),this.timeoutInterval=setTimeout((function(){e.startOutAnimate()}),this.notify.options.timeout)}}])&&i(t.prototype,n),e}();t.default=s},939:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.setCSSStyles=void 0,t.setCSSStyles=function(e,t){for(var n in t){var i=t[n];void 0!==i&&(e.style[n]=i)}}},820:function(e,t,n){function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var s=o(n(277)),a=n(939),r=n(799),l=n(339),u=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options=t,this.rootElement=this.createRootElement()}var t,n;return t=e,(n=[{key:"createRootElement",value:function(){var e=document.createElement("div");return a.setCSSStyles(e,this.getStyles().root),document.body.prepend(e),e}},{key:"push",value:function(e){new s.default(e,this)}},{key:"getStyles",value:function(){var t;return null!==(t=this.options.styles)&&void 0!==t?t:e.defaultStyles}},{key:"getAnimate",value:function(){var e;return null!==(e=this.options.animateFunction)&&void 0!==e?e:l.animateLikeOnIphone}}])&&i(t.prototype,n),e}();t.default=u,u.animateFunctions={animateLikeOnIphone:l.animateLikeOnIphone},u.defaultStyles=r.styles},799:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.styles=void 0,t.styles={root:{position:"fixed",top:"20px",right:"40px",width:"300px"},message:{width:"100%",display:"flex",alignItems:"end"},content:{padding:"10px",background:"#2a2a2a",color:"#fff",borderRadius:"10px",position:"relative"},title:{fontWeight:"bold"},text:{marginTop:"10px"},close:{width:"10px",height:"10px",background:"#ff0000",borderRadius:"100px",position:"absolute",top:"10px",right:"10px",cursor:"pointer"}}}},t={};return function n(i){if(t[i])return t[i].exports;var o=t[i]={exports:{}};return e[i].call(o.exports,o,o.exports,n),o.exports}(820)})().default}));