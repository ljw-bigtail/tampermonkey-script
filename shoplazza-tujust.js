// ==UserScript==
// @name         店匠工具箱
// @namespace    http://tampermonkey.net/
// @version      2024-06-27
// @description  try to take over the world!
// @author       Leo
// @match        *://*.fashionme.com/*
// @icon         http://its.opscms.com/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

const Cookie={add(a,b){const c=30;const d=new Date();d.setTime(d.getTime()+c*24*60*60*1000);document.cookie=a+"="+escape(b)+";expires="+d.toGMTString()},get(a){const b=document.cookie.split(";");for(let i=0;i<b.length;i++){const c=b[i].split("=");if(c[0].trim()===a){return c[1]}}},del(a){const b=new Date();b.setTime(b.getTime()-1);const c=this.get(a);if(c!=null){document.cookie=a+"="+c+";path=/;expires="+b.toGMTString()}},};
const ElementsUtils={appendHTML(ele,html,site){let div=document.createElement("div"),nodes,fragment=document.createDocumentFragment();div.innerHTML=html;nodes=div.childNodes;for(let i=0,len=nodes.length;i<len;i++){fragment.appendChild(nodes[i].cloneNode(true))}!site||site!=="before"?ele.appendChild(fragment):ele.insertBefore(fragment,ele.firstChild);nodes=null;fragment=null},};
class Dialogs{constructor(options){this.appendHTML=ElementsUtils.appendHTML;this.dom=null;this.isInit=false;this.options=options;this.init()}init(){if(this.options.id===""){console.error("Dialog 初始化异常，请检查参数。");return false}this.isInit=true;this.initBox();this.initEvent()}close(){let _a;(_a=this.dom)===null||_a===void 0?void 0:_a.classList.remove("open");this.options.onClose&&this.options.onClose()}open(isRefresh){let _a;if(!this.isInit){this.init()}(_a=this.dom)===null||_a===void 0?void 0:_a.classList.add("open");this.options.onOpen&&this.options.onOpen()}fresh(contentData){let _a;if(!this.options.contentRender||typeof this.options.contentRender!=="function"){return}const content=(_a=this.dom)===null||_a===void 0?void 0:_a.querySelector(".dialog-content");if(!content){return}content.innerHTML=this.options.contentRender(contentData)}destory(){let _a;(_a=this.dom)===null||_a===void 0?void 0:_a.remove()}loading(state){let _a,_b,_c,_d;if(state===undefined||!!state){(_b=(_a=this.dom)===null||_a===void 0?void 0:_a.querySelector(".dialog-loading"))===null||_b===void 0?void 0:_b.classList.add("show")}else{(_d=(_c=this.dom)===null||_c===void 0?void 0:_c.querySelector(".dialog-loading"))===null||_d===void 0?void 0:_d.classList.remove("show")}}initBox(){if(document.querySelector(`#${this.options.id}`)){return}let contentHtml="";if(this.options.content){contentHtml=this.options.content}else if(this.options.contentRender&&typeof this.options.contentRender==="function"&&this.options.defaultContentData){contentHtml=this.options.contentRender(this.options.defaultContentData)}const needCloseHtml=this.options.needClose?'<div class="dialog-close"><span class="iconfont">×</span></div>':"";const headerHtml=this.options.header?`<div class="dialog-header">${this.options.header}</div>`:"";const footerHtml=this.options.footer?`<div class="dialog-footer">${this.options.footer}</div>`:"";this.appendHTML(document.body,`<div id="${this.options.id}"class="dialog dialog-${this.options.size || "auto"}"><div class="dialog-loading global-loading"><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div></div><div class="dialog-center-box">${needCloseHtml}${headerHtml}<div class="dialog-content">${contentHtml}</div>${footerHtml}</div></div>`);this.dom=document.querySelector(`#${this.options.id}`)}initEvent(){let _a,_b,_c;const that=this;(_a=this.dom)===null||_a===void 0?void 0:_a.addEventListener("click",function(e){e.stopPropagation();return false});document.body.addEventListener("click",function(){that.close()},false);(_c=(_b=this.dom)===null||_b===void 0?void 0:_b.querySelector(".dialog-close"))===null||_c===void 0?void 0:_c.addEventListener("click",function(){that.close()},false)}};
function updateQueryStringParameter(uri,key,value){if(!value){return uri}const re=new RegExp("([?&])"+key+"=.*?(&|$)","i");const separator=uri.indexOf("?")!==-1?"&":"?";if(uri.match(re)){return uri.replace(re,"$1"+key+"="+value+"$2")}return uri+separator+key+"="+value}
function delParam(paramKey){let url=window.location.href;const urlParam=window.location.search.substr(1);const beforeUrl=url.substr(0,url.indexOf("?"));let nextUrl="";const arr=[];if(urlParam!==""){const urlParamArr=urlParam.split("&");for(let i=0;i<urlParamArr.length;i++){const paramArr=urlParamArr[i].split("=");if(paramArr[0]!=paramKey){arr.push(urlParamArr[i])}}}if(arr.length>0){nextUrl="?"+arr.join("&")}url=beforeUrl+nextUrl;return url}


function initCSS() {
  ElementsUtils.appendHTML(
    document.body,
    `
      <style>
        :root{--atom-size:8px;--screen-max:1360px;--main-color:#FDC452;--main-color-8:rgba(253,196,82,0.8);--main-color-4:rgba(253,196,82,0.4);--sub-color:#FDE7BB;--aid-color:#A5B9BA;--bg-color:#FFFFFF;--bg-color-8:rgba(255,255,255,0.8);--bg-color-4:rgba(255,255,255,0.4);--grey-color:#F8F9FB;--grey-dark-color:#ECEFF4;--hover1-color:rgba(255,201,194,80%);--hover2-color:#FDF3DF;--error-color:#EF5C61;--tag-1-bg:#F7B7B9;--tag-1-font:#8C1F23;--tag-2-bg:var(--sub-color);--tag-2-font:#96501E;--favourite-full:var(--tag-1-bg);--font-color-dark:#333;--font-color-grey:#666666;--font-color-light:#999999;--font-color-white:#ffffff;--font-color-sub:#C99834;--font-size-xxl:32px;--font-size-xl:24px;--font-size-l:20px;--font-size-m:16px;--font-size-s:14px;--font-size-xs:12px;--space-xxl:calc(var(--atom-size) * 8);--space-xl:calc(var(--atom-size) * 5);--space-l:calc(var(--atom-size) * 4);--space-m:calc(var(--atom-size) * 3);--space-s:calc(var(--atom-size) * 2);--space-xs:calc(var(--atom-size) * 1);--radius-l:8px;--radius-m:4px;--radius-s:2px;--shadow-light:0px 4px 16px 0px rgba(0,0,0,0.04);--shadow-normal:0px 4px 16px 0px rgba(0,0,0,0.08);--shadow-dark:0px 4px 16px 0px rgba(0,0,0,0.16);--shadow-dark-s:0px 2px 4px 0px rgba(0,0,0,0.16);--border-white:#FFFFFF 1px solid;--border-light:#EEEEEE 1px solid;--border-grey:#CCCCCC 1px solid;--border-dark:#000000 1px solid;--border-main:var(--gradient-color-right) 1px solid;--border-error:var(--error-color) 1px solid;--gradient-color-left:#FDC452;--gradient-color-right:#FDE7BB;--gradient-color-center:#FAEED7;--select-height:46px;--select-height-mini:30px;--background-theme-color:linear-gradient(135deg,#FDC452 0%,#FDE7BB 100%);--loading-size:40px;--loading-color:#ccc}.dialog{position:fixed;top:5000px;left:5000px;z-index:5000;transform:translate(-50%,-50%);display:none}.dialog.open{top:50%;left:50%;display:block}.dialog .dialog-loading.show{display:flex}.dialog .dialog-center-box{overflow:hidden;background:var(--bg-color);border-radius:var(--radius-l);box-shadow:var(--shadow-dark);opacity:0;visibility:hidden;-webkit-transition-duration:.3s;transition-duration:.3s;-webkit-transition-property:opacity,visibility;transition-property:opacity,visibility;will-change:opacity;display:flex;flex-direction:column;max-width:80vw;max-height:80vh;min-width:50px;min-height:50px;position:relative}.dialog.dialog-xxl .dialog-center-box{width:960px;height:574px}.dialog.dialog-xl .dialog-center-box{min-width:800px;height:722px}.dialog.dialog-m .dialog-center-box{min-width:680px;height:720px}.dialog.dialog-xs .dialog-center-box{width:496px;min-height:204px}.dialog.dialog-xxs .dialog-center-box{width:449px}.dialog.dialog-max-content .dialog-center-box{width:max-content;height:max-content}.dialog.dialog-full .dialog-center-box{height:100vh;width:100vw}.dialog .dialog-center-box .dialog-close{position:absolute;right:var(--space-m);top:var(--space-m);font-size:var(--font-size-xl);cursor:pointer;z-index:2000;line-height:1;transform:rotateZ(45deg);transform-origin:100%}.dialog.open .dialog-loading.show + .dialog-center-box{opacity:0;visibility:hidden}.dialog.open .dialog-loading + .dialog-center-box{opacity:1;visibility:visible}.dialog .dialog-content{display:flex;height:100%;flex:1;overflow-y:auto;background:#fff}.dialog .dialog-header{font-size:var(--font-size-l);padding:var(--space-l) var(--space-l) var(--space-s);font-weight:700}.dialog .dialog-header + .dialog-content{padding:0 var(--space-l) var(--space-l);height:auto;display:block}.dialog-footer{text-align:right;padding:0 var(--space-l)}.dialog-footer button{display:inline-block;width:120px;padding:var(--space-xs);cursor:pointer;color:#fff;text-decoration:none;margin:var(--space-s) 0;background:var(--main-color);border-radius:var(--radius-s)}.dialog.dialog-full .dialog-center-box{max-height:100vh;max-width:100vw;border-radius:0}.dialog.dialog-full .dialog-header{padding:var(--space-s) var(--space-l) var(--space-s) var(--space-xxl)}.dialog.dialog-full .dialog-center-box .dialog-close{font-size:0;transform:none;left:0;top:0;right:initial;padding:var(--space-s)}.dialog.dialog-full .dialog-center-box .dialog-close:after{content:'chevron_left';font-family:'Material Icons';font-weight:normal;font-style:normal;font-size:var(--font-size-l);line-height:1.15;transform:scale(1.4);display:block}.dialog.dialog-full .dialog-header + .dialog-content{box-shadow:inset var(--shadow-normal);padding:0 var(--space-s) var(--space-m)}.dialog.dialog-full .global-loading{z-index:initial}
        @keyframes global-loading{0%,80%,100%{transform:scale(0);}40%{transform:scale(1);}}.global-loading{margin:0 auto;top:50%;left:50%;transform:translate(-50%,-50%);position:absolute;width:var(--loading-size);height:var(--loading-size)}.global-loading-dot{width:100%;height:100%;position:absolute;left:0;top:0}.global-loading-dot:before{content:'';display:block;width:15%;height:15%;background-color:var(--loading-color);border-radius:100%;animation:global-loading 1.2s infinite ease-in-out both}.global-loading-dot:nth-child(1){transform:rotate(30deg)}.global-loading-dot:nth-child(2){transform:rotate(60deg)}.global-loading-dot:nth-child(3){transform:rotate(90deg)}.global-loading-dot:nth-child(4){transform:rotate(120deg)}.global-loading-dot:nth-child(5){transform:rotate(150deg)}.global-loading-dot:nth-child(6){transform:rotate(180deg)}.global-loading-dot:nth-child(7){transform:rotate(210deg)}.global-loading-dot:nth-child(8){transform:rotate(240deg)}.global-loading-dot:nth-child(9){transform:rotate(270deg)}.global-loading-dot:nth-child(10){transform:rotate(300deg)}.global-loading-dot:nth-child(11){transform:rotate(330deg)}.global-loading-dot:nth-child(1):before{animation-delay:-1.1s}.global-loading-dot:nth-child(2):before{animation-delay:-1s}.global-loading-dot:nth-child(3):before{animation-delay:-.9s}.global-loading-dot:nth-child(4):before{animation-delay:-.8s}.global-loading-dot:nth-child(5):before{animation-delay:-.7s}.global-loading-dot:nth-child(6):before{animation-delay:-.6s}.global-loading-dot:nth-child(7):before{animation-delay:-.5s}.global-loading-dot:nth-child(8):before{animation-delay:-.4s}.global-loading-dot:nth-child(9):before{animation-delay:-.3s}.global-loading-dot:nth-child(10):before{animation-delay:-.2s}.global-loading-dot:nth-child(11):before{animation-delay:-.1s}

        #op-private-toolbox{position:fixed;right:0;bottom:20%;z-index:999999;overflow:hidden;border-radius:10px 0 0 10px;background:#fff;box-shadow:-1px 0 20px 0 #b4b4b4b0;cursor:pointer;transition:all .4s;display: flex;align-items: center;}
        #op-private-toolbox:hover{box-shadow:-1px 0 20px 0 #757575b0}
        #op-private-toolbox img{width:60px}
        #op-private-toolbox-dialog select {border: none}
        #op-private-toolbox-dialog button {text-decoration: none;position: relative;font-size: 14px;background: linear-gradient(90deg,#03a9f4,#f441a5,#ffeb3b,#03a9f4);background-size: 400%;text-align: center;color: #fff;text-transform: uppercase;border-radius: 50px;z-index: 1;overflow: hidden;padding: 6px 12px;margin: 6px;border:none;cursor: pointer;}
        #op-private-toolbox-dialog button::before{content: "";position: absolute;left: -5px;right: -5px;top: -5px;bottom: -5px;background: linear-gradient(90deg,#03a9f4,#f441a5,#ffeb3b,#03a9f4);background-size: 400%;border-radius: 50px;filter: blur(20px);z-index: -1;}
        #op-private-toolbox-dialog button:hover::before{animation: sun 8s infinite;}
        #op-private-toolbox-dialog button:hover{animation: sun 8s infinite;}
        #op-private-toolbox-dialog .step-box{display:none;align-items:center;justify-content:space-evenly;}
        #op-private-toolbox-dialog .step-box.show{display:flex;}
        #op-private-toolbox-dialog-log{height: 100px;padding: 10px;font-size: 14px;border: 1px solid #4d74ed;margin: 20px 10px 30px;border-radius: 4px;}

        @keyframes sun{
          100%{
            background-position: -400% 0;
          }
        }

        #op-private-toolbox-dialog-app{padding: 4px;}
        #op-private-toolbox-dialog-app button{background: #4d74ed;border-radius: 4px 0 0 4px;}
        #op-private-toolbox-dialog-app button::before{display: none;}
        #op-private-toolbox-dialog-app input{border: 1px solid #4d74ed;border-radius: 0 4px 4px 0;font-size: 14px;padding: 5px 0;margin-left: -10px;width: 66px;text-align: center;color: #4d74ed;}
        #op-private-toolbox-dialog-app input:focus{outline: none;}
      </style>
    `
  );
}

function hasHideProductAPP(){
  const appcheckInput = document.querySelector(`#op-private-toolbox-dialog-appcheck + input`);
  appcheckInput.value = '正在请求'
  appcheckInput.setAttribute('data-yn', '')
  return fetch("/admin/api/admin/installed_apps",  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data.apps.findIndex(e => e.id === 130375) > -1 ? 1 : 0
    })
    .then(yn => {
      const appcheckInput = document.querySelector(`#op-private-toolbox-dialog-appcheck + input`);
      appcheckInput.value = yn ? '存在' : '不存在'
      appcheckInput.setAttribute('data-yn', yn)
    })
}

function handleHideProductFetch(data){
  // SHOP_ID
  return fetch("/admin/api/admin/poult/hide_product",  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
}

function getProductIdsFetch(type){
  return new Promise((resolve, reject) => {
    // resolve(new Array(100).fill(0).map((e, i) => i))
    // resolve(["f9cb66c4-f457-4482-99ea-155426b6430e"])
    fetch(`https://itss.orderplus.com/api/bamboo/siteProduct/queryHighRiskSpuBySplzId?splzId=${window.SHOP_ID}&type=${type}`,  {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Product-Hidden": 1,
      },
    })
      .then((response) => response.json())
      .then((res) => {
        resolve(res)
      })
  })
}

function initDialog() {
  // 添加快捷工具入口
  ElementsUtils.appendHTML(
    document.body,
    `
      <div id="op-private-toolbox">
      <svg t="1707202530066" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19035" width="54" height="54"><path d="M800 32h-576c-108.8 0-192 83.2-192 192v576c0 108.8 83.2 192 192 192h576c108.8 0 192-83.2 192-192v-576c0-108.8-83.2-192-192-192zM326.4 780.8l-19.2 38.4c-12.8 6.4-19.2 12.8-38.4 12.8h-19.2c-19.2-12.8-25.6-32-12.8-51.2l19.2-38.4c12.8-19.2 32-25.6 51.2-12.8 25.6 6.4 32 32 19.2 51.2z m160-102.4H192c-19.2 0-38.4-19.2-38.4-38.4s19.2-38.4 38.4-38.4h153.6v-6.4l108.8-179.2-108.8-166.4c-12.8-19.2-6.4-44.8 12.8-51.2 19.2-12.8 38.4-6.4 51.2 12.8l89.6 140.8 83.2-140.8c12.8-19.2 38.4-25.6 57.6-19.2 19.2 12.8 25.6 32 12.8 51.2L435.2 601.6h51.2c19.2 0 38.4 19.2 38.4 38.4s-19.2 38.4-38.4 38.4z m345.6 0h-108.8l64 96c12.8 19.2 6.4 38.4-12.8 51.2-6.4 6.4-12.8 6.4-19.2 6.4-12.8 0-25.6-6.4-32-19.2L556.8 569.6c-12.8-19.2-6.4-44.8 12.8-51.2 19.2-12.8 38.4-6.4 51.2 12.8l51.2 76.8H832c19.2 0 38.4 19.2 38.4 38.4s-19.2 32-38.4 32z" fill="#273fcf" p-id="19036" data-spm-anchor-id="a313x.search_index.0.i8.7d1c3a81QrutXV" class="selected"></path></svg>
      </div>
    `
  );

  let log_dom
  let step_1_dom
  let step_2_dom

  function log(mes){
    log_dom.innerHTML = `${mes}`
  }

  const size = 100;
  let progress = 0;

  let ids_chunk = []
  let ids_lenghth = 0

  async function getIds(type, name){
    log(`正在请求${name}商品数据`);
    const product_ids = await getProductIdsFetch(type)
    if(!product_ids || typeof product_ids !== "object" || !Array.isArray(product_ids) ){
      ids_chunk = [];
      return log(`获取商品失败`);
    }
    if(product_ids.length === 0){
      ids_chunk = [];
      return log(`没有需要操作的商品`);
    }
    log(`共有${product_ids.length}个${name}商品需要操作`);
    ids_lenghth = product_ids.length
    const product_ids_chunk = []
    let page = -1
    for (let index = 0; index < product_ids.length; index++) {
      if(index % size === 0){
        product_ids_chunk.push([])
        page++
      }
      product_ids_chunk[page].push(product_ids[index])
    }
    ids_chunk = product_ids_chunk
  }

  function handleHideProduct(hide){
    if (ids_chunk.length === 0) {
      log(`没有商品无需操作`);
      step_1_dom.classList.add('show')
      step_2_dom.classList.remove('show')
        return;
    }
    Promise.all(ids_chunk.map((product_ids_item) => {
      return new Promise((resolve, reject) => {
        handleHideProductFetch({
          hide,
          product_ids: product_ids_item
        }).finally((res) => {
          progress += product_ids_item.length
          log(`进度：${progress} / ${ids_lenghth}`);
          resolve(res)
        })
        // setTimeout(() => {
        //   progress += product_ids_item.length
        //   log(`进度：${progress} / ${ids_lenghth}`);
        //   resolve()
        // }, 3000 * Math.random() + 1000)
      })
    })).then((res) => {
      log(`操作完毕`);
      step_1_dom.classList.add('show')
      step_2_dom.classList.remove('show')
    })
  }

  function handleCancle (){
    step_1_dom.classList.add('show')
    step_2_dom.classList.remove('show')
    log(`请重新选择`);
  }

  const level = [{
    name: "高风险",
    value: 1
  },{
    name: "中风险",
    value: 2
  },{
    name: "低风险",
    value: 3
  }]
  const type = [{
    name: "隐藏",
    value: true
  },{
    name: "显示",
    value: false
  }]
  const dialogs = new Dialogs({
    id: "op-private-toolbox-dialog",
    needClose: false,
    header: "店匠工具箱",
    size: "xs",
    content: (function(){
      return `
        <div id="op-private-toolbox-dialog-app">
          <button id="op-private-toolbox-dialog-appcheck">检测隐藏商品插件</button>
          <input readOnly data-yn="" value="" id="op-private-toolbox-dialog-appcheck-input">
        </div>
        <div id="op-private-toolbox-dialog-log"></div>
        <div id="op-private-toolbox-dialog-step1" class="step-box show">
          ${level.map((item) => {
            return `
              <button id="op-private-toolbox-dialog-get${item.value}">获取${item.name}商品</button>
            `
          }).reduce((a, b) => a + b, "")}
        </div>
        <div id="op-private-toolbox-dialog-step2" class="step-box ">
          <button id="op-private-toolbox-dialog-cancle">取消</button>
          ${type.map((item) => {
            return `
              <button id="op-private-toolbox-dialog-submit${item.value}">一键${item.name}</button>
            `
          }).reduce((a, b) => a + b, "")}
        </div>
      `
    })(),
    onOpen() {
      log_dom = document.querySelector("#op-private-toolbox-dialog-log");
      step_1_dom = document.querySelector("#op-private-toolbox-dialog-step1");
      step_2_dom = document.querySelector("#op-private-toolbox-dialog-step2");

      level.forEach((item) => {
        const getBtn = document.querySelector(`#op-private-toolbox-dialog-get${item.value}`);
        getBtn.removeEventListener('click', getIds);
        getBtn.addEventListener('click', async () => {
          await getIds(item.value, item.name)
          step_1_dom.classList.remove('show')
          step_2_dom.classList.add('show')
        });
      })

      type.forEach((item) => {
        const submitBtn = document.querySelector(`#op-private-toolbox-dialog-submit${item.value}`);
        submitBtn.removeEventListener('click', handleHideProduct);
        submitBtn.addEventListener('click', async () => {
          handleHideProduct(item.value)
        });
      })

      const cancleBtn = document.querySelector(`#op-private-toolbox-dialog-cancle`);
      cancleBtn.removeEventListener('click', handleCancle);
      cancleBtn.addEventListener('click', handleCancle);

      const appcheckBtn = document.querySelector(`#op-private-toolbox-dialog-appcheck`);
      appcheckBtn.removeEventListener('click', hasHideProductAPP);
      appcheckBtn.addEventListener('click', hasHideProductAPP);

      hasHideProductAPP()
    },
  });

  document
    .querySelector("#op-private-toolbox")
    .addEventListener("click", function (e) {
      e.stopPropagation();
      dialogs.open();
    });
}

initCSS();
initDialog();



})();