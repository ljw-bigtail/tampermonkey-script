// ==UserScript==
// @name         云站工具箱
// @namespace    http://tujust.com/
// @version      1.0
// @description  云站-仅供内部使用
// @author       leo.lu
// @match        http*://*/*
// @icon         http://its.fashionme.com/favicon.ico
// @grant        none
// @updateURL    https://cdn.jsdelivr.net/gh/ljw-bigtail/tampermonkey-script/tujust-cloud-utils /index.meta.js
// @downloadURL  https://cdn.jsdelivr.net/gh/ljw-bigtail/tampermonkey-script/tujust-cloud-utils /index.user.js
// ==/UserScript==
(function () {
  "use strict";
  const Cookie={add:function(a,b){var c=30;var d=new Date();d.setTime(d.getTime()+c*24*60*60*1000);document.cookie=a+"="+escape(b)+";expires="+d.toGMTString()},get:function(a){var b=document.cookie.split(";");for(var i=0;i<b.length;i++){var c=b[i].split("=");if(c[0].trim()===a){return c[1]}}},del:function(a){var b=new Date();b.setTime(b.getTime()-1);var c=this.get(a);if(c!=null){document.cookie=a+"="+c+";path=/;expires="+b.toGMTString()}}};const ElementsUtils={appendHTML(ele,html,site){let div=document.createElement("div"),nodes,fragment=document.createDocumentFragment();div.innerHTML=html;nodes=div.childNodes;for(let i=0,len=nodes.length;i<len;i++){fragment.appendChild(nodes[i].cloneNode(true))}!site||site!=="before"?ele.appendChild(fragment):ele.insertBefore(fragment,ele.firstChild);nodes=null;fragment=null}};class Dialogs{constructor(options){this.appendHTML=ElementsUtils.appendHTML;this.dom=null;this.isInit=false;this.options=options;this.init()}init(){if(this.options.id===""){console.error("Dialog 初始化异常，请检查参数。");return false}this.isInit=true;this.initBox();this.initEvent()}close(){var _a;(_a=this.dom)===null||_a===void 0?void 0:_a.classList.remove("open");this.options.onClose&&this.options.onClose()}open(isRefresh){var _a;if(!this.isInit){this.init()}(_a=this.dom)===null||_a===void 0?void 0:_a.classList.add("open");this.options.onOpen&&this.options.onOpen()}fresh(contentData){var _a;if(!this.options.contentRender||typeof this.options.contentRender!=="function"){return}const content=(_a=this.dom)===null||_a===void 0?void 0:_a.querySelector(".dialog-content");if(!content){return}content.innerHTML=this.options.contentRender(contentData)}destory(){var _a;(_a=this.dom)===null||_a===void 0?void 0:_a.remove()}loading(state){var _a,_b,_c,_d;if(state===undefined||!!state){(_b=(_a=this.dom)===null||_a===void 0?void 0:_a.querySelector(".dialog-loading"))===null||_b===void 0?void 0:_b.classList.add("show")}else{(_d=(_c=this.dom)===null||_c===void 0?void 0:_c.querySelector(".dialog-loading"))===null||_d===void 0?void 0:_d.classList.remove("show")}}initBox(){if(document.querySelector(`#${this.options.id}`)){return}let contentHtml="";if(this.options.content){contentHtml=this.options.content}else if(this.options.contentRender&&typeof this.options.contentRender==="function"&&this.options.defaultContentData){contentHtml=this.options.contentRender(this.options.defaultContentData)}const needCloseHtml=this.options.needClose?'<div class="dialog-close"><span class="iconfont">×</span></div>':"";const headerHtml=this.options.header?`<div class="dialog-header">${this.options.header}</div>`:"";const footerHtml=this.options.footer?`<div class="dialog-footer">${this.options.footer}</div>`:"";this.appendHTML(document.body,`<div id="${this.options.id}"class="dialog dialog-${this.options.size || "auto"}"><div class="dialog-loading global-loading"><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div></div><div class="dialog-center-box">${needCloseHtml}${headerHtml}<div class="dialog-content">${contentHtml}</div>${footerHtml}</div></div>`);this.dom=document.querySelector(`#${this.options.id}`)}initEvent(){var _a,_b,_c;const that=this;(_a=this.dom)===null||_a===void 0?void 0:_a.addEventListener("click",function(e){e.stopPropagation();return false});document.body.addEventListener("click",function(){that.close()},false);(_c=(_b=this.dom)===null||_b===void 0?void 0:_b.querySelector(".dialog-close"))===null||_c===void 0?void 0:_c.addEventListener("click",function(){that.close()},false)}}

  function updateQueryStringParameter(uri, key, value) {
    if (!value) {
      return uri;
    }
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf("?") !== -1 ? "&" : "?";
    if (uri.match(re)) {
      return uri.replace(re, "$1" + key + "=" + value + "$2");
    } else {
      return uri + separator + key + "=" + value;
    }
  }

  function delParam(paramKey) {
    var url = window.location.href; //页面url
    var urlParam = window.location.search.substr(1); //页面参数
    var beforeUrl = url.substr(0, url.indexOf("?")); //页面主地址（参数之前地址）
    var nextUrl = "";

    var arr = new Array();
    if (urlParam != "") {
      var urlParamArr = urlParam.split("&"); //将参数按照&符分成数组
      for (var i = 0; i < urlParamArr.length; i++) {
        var paramArr = urlParamArr[i].split("="); //将参数键，值拆开
        //如果键雨要删除的不一致，则加入到参数中
        if (paramArr[0] != paramKey) {
          arr.push(urlParamArr[i]);
        }
      }
    }
    if (arr.length > 0) {
      nextUrl = "?" + arr.join("&");
    }
    url = beforeUrl + nextUrl;
    return url;
  }

  const form = {
    isShuaDanMode: Cookie.get("op_special") == "1",
  };

  function initCSS() {
    ElementsUtils.appendHTML(
      document.body,
      `
        <style>
          #op-private-toolbox{position:fixed;right:0;bottom:20%;z-index:999999;overflow:hidden;border-radius:10px 0 0 10px;background:#fff;box-shadow:-1px 0 20px 0 #b4b4b4b0;cursor:pointer;transition:all .4s;display: flex;align-items: center;}
          #op-private-toolbox:hover{box-shadow:-1px 0 20px 0 #757575b0}
          #op-private-toolbox img{width:60px}
          #op-private-toggleShuaDanModeButton{padding: 10px;color: #fff;border-radius: 6px;cursor: pointer;}
          #op-private-toggleShuaDanModeButton.success{background: #1cb83f;}
          #op-private-toggleShuaDanModeButton.error{background: #e71212;}
        </style>
        `
    );
  }

  function initDialog() {
    // 添加快捷工具入口
    const enterIcon =
      "https://ups.aopcdn.com/s425/common/17967/38u70b337ccf4a74b83b587758e14c3cb76.png";
    ElementsUtils.appendHTML(
      document.body,
      `
        <div id="op-private-toolbox">
          <img src="${enterIcon}" />
          <div id="op-private-toolbox-button">
            ${toggleShuaDanDom()}
          </div>
        </div>
      `
    );

    const dialogs = new Dialogs({
      id: "op-private-toolbox-dialog",
      needClose: false,
      header: "云站工具箱",
      contentRender: function (form) {
        return `
          <button id="op-private-toggleShuaDanModeButton" class="${
            form.isShuaDanMode ? "error" : "success"
          }">${form.isShuaDanMode ? "关闭" : "开启"}刷单模式</button>
        `;
      },
      onOpen: function () {
        dialogs.fresh(form);
        document
          .querySelector("#op-private-toolbox-dialog")
          .addEventListener("click", function (e) {
            const t = e.target;
            if (t.id == "op-private-toggleShuaDanModeButton") {
              toggleShuaDanMode()
            }
          });
      },
    });

    function toggleShuaDanDom(){
      return `
        <button id="op-private-toggleShuaDanModeButton" class="${
          form.isShuaDanMode ? "error" : "success"
        }">${form.isShuaDanMode ? "关闭" : "开启"}刷单模式</button>
      `;
    }

    function toggleShuaDanMode(){
      const key = "op_special";
      form.isShuaDanMode = !form.isShuaDanMode;
      // dialogs.fresh(form);
      document.querySelector("#op-private-toolbox-button").innerHTML = toggleShuaDanDom()
      if (form.isShuaDanMode) {
        // 开启刷单模式
        if (Cookie.get(key) != 1) {
          window.location.href = updateQueryStringParameter(
            window.location.href,
            key,
            "1"
          );
        }
      } else {
        // 关闭 删除cookie
        Cookie.del(key);
        window.location.href = delParam(key);
      }
    }

    document
      .querySelector("#op-private-toolbox")
      .addEventListener("click", function (e) {
        e.stopPropagation();
        // dialogs.open();
        toggleShuaDanMode()
      });
  }

  // 查询是否是云站
  if (window.Cloud && window.Cloud.siteId) {
    initCSS();
    initDialog();
  }
})();
