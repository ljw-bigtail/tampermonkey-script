// ==UserScript==
// @name         its快捷登录
// @namespace    http://tujust.com/
// @version      1.0
// @description  供应链系统-仅供内部使用
// @author       leo.lu
// @match        *://*.fashionme.com/*
// @match        *://*.popopiecloth.com/*
// @icon         http://its.fashionme.com/favicon.ico
// @grant        none
// @updateURL    https://cdn.jsdelivr.net/gh/ljw-bigtail/tampermonkey-script/tujust-its-utils/index.meta.js
// @downloadURL  https://cdn.jsdelivr.net/gh/ljw-bigtail/tampermonkey-script/tujust-its-utils/index.user.js
// ==/UserScript==

(function () {
    "use strict";
  
  const Cookie={add(a,b){const c=30;const d=new Date();d.setTime(d.getTime()+c*24*60*60*1000);document.cookie=a+"="+escape(b)+";expires="+d.toGMTString()},get(a){const b=document.cookie.split(";");for(let i=0;i<b.length;i++){const c=b[i].split("=");if(c[0].trim()===a){return c[1]}}},del(a){const b=new Date();b.setTime(b.getTime()-1);const c=this.get(a);if(c!=null){document.cookie=a+"="+c+";path=/;expires="+b.toGMTString()}},};
  const ElementsUtils={appendHTML(ele,html,site){let div=document.createElement("div"),nodes,fragment=document.createDocumentFragment();div.innerHTML=html;nodes=div.childNodes;for(let i=0,len=nodes.length;i<len;i++){fragment.appendChild(nodes[i].cloneNode(true))}!site||site!=="before"?ele.appendChild(fragment):ele.insertBefore(fragment,ele.firstChild);nodes=null;fragment=null},};
  class Dialogs{constructor(options){this.appendHTML=ElementsUtils.appendHTML;this.dom=null;this.isInit=false;this.options=options;this.init()}init(){if(this.options.id===""){console.error("Dialog 初始化异常，请检查参数。");return false}this.isInit=true;this.initBox();this.initEvent()}close(){let _a;(_a=this.dom)===null||_a===void 0?void 0:_a.classList.remove("open");this.options.onClose&&this.options.onClose()}open(isRefresh){let _a;if(!this.isInit){this.init()}(_a=this.dom)===null||_a===void 0?void 0:_a.classList.add("open");this.options.onOpen&&this.options.onOpen()}fresh(contentData){let _a;if(!this.options.contentRender||typeof this.options.contentRender!=="function"){return}const content=(_a=this.dom)===null||_a===void 0?void 0:_a.querySelector(".dialog-content");if(!content){return}content.innerHTML=this.options.contentRender(contentData)}destory(){let _a;(_a=this.dom)===null||_a===void 0?void 0:_a.remove()}loading(state){let _a,_b,_c,_d;if(state===undefined||!!state){(_b=(_a=this.dom)===null||_a===void 0?void 0:_a.querySelector(".dialog-loading"))===null||_b===void 0?void 0:_b.classList.add("show")}else{(_d=(_c=this.dom)===null||_c===void 0?void 0:_c.querySelector(".dialog-loading"))===null||_d===void 0?void 0:_d.classList.remove("show")}}initBox(){if(document.querySelector(`#${this.options.id}`)){return}let contentHtml="";if(this.options.content){contentHtml=this.options.content}else if(this.options.contentRender&&typeof this.options.contentRender==="function"&&this.options.defaultContentData){contentHtml=this.options.contentRender(this.options.defaultContentData)}const needCloseHtml=this.options.needClose?'<div class="dialog-close"><span class="iconfont">×</span></div>':"";const headerHtml=this.options.header?`<div class="dialog-header">${this.options.header}</div>`:"";const footerHtml=this.options.footer?`<div class="dialog-footer">${this.options.footer}</div>`:"";this.appendHTML(document.body,`<div id="${this.options.id}"class="dialog dialog-${this.options.size || "auto"}"><div class="dialog-loading global-loading"><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div><div class="global-loading-dot"></div></div><div class="dialog-center-box">${needCloseHtml}${headerHtml}<div class="dialog-content">${contentHtml}</div>${footerHtml}</div></div>`);this.dom=document.querySelector(`#${this.options.id}`)}initEvent(){let _a,_b,_c;const that=this;(_a=this.dom)===null||_a===void 0?void 0:_a.addEventListener("click",function(e){e.stopPropagation();return false});document.body.addEventListener("click",function(){that.close()},false);(_c=(_b=this.dom)===null||_b===void 0?void 0:_b.querySelector(".dialog-close"))===null||_c===void 0?void 0:_c.addEventListener("click",function(){that.close()},false)}};
  function updateQueryStringParameter(uri,key,value){if(!value){return uri}const re=new RegExp("([?&])"+key+"=.*?(&|$)","i");const separator=uri.indexOf("?")!==-1?"&":"?";if(uri.match(re)){return uri.replace(re,"$1"+key+"="+value+"$2")}return uri+separator+key+"="+value}
  function delParam(paramKey){let url=window.location.href;const urlParam=window.location.search.substr(1);const beforeUrl=url.substr(0,url.indexOf("?"));let nextUrl="";const arr=[];if(urlParam!==""){const urlParamArr=urlParam.split("&");for(let i=0;i<urlParamArr.length;i++){const paramArr=urlParamArr[i].split("=");if(paramArr[0]!=paramKey){arr.push(urlParamArr[i])}}}if(arr.length>0){nextUrl="?"+arr.join("&")}url=beforeUrl+nextUrl;return url}
  
  
  const data = [
    ["逸达物流(YD Logistics)","YD德国专线(YD German Express)","XYYEX0031278495YQ"],
    ["逸达物流(YD Logistics)","逸达联邦Fed(YD Federal Fed)","XYYEX0031278201YQ"],
    ["逸达物流(YD Logistics)","YD法国专线(YD French Express))","XYYEX0031269056YQ"],
    ["逸达物流(YD Logistics)","逸达美国专线2(YD US Express)","XYYEX0031268941YQ"],
    ["逸达物流(YD Logistics)","YD澳洲专线(YD Australia Express)","XYYEX0031257991YQ"],
    ["逸达物流(YD Logistics)","YD加拿大专线(YD Canadian Express)","7321315206041887"],
    ["逸达物流(YD Logistics)","YD英国专线(YD UK Express)","XYYEX0031146317YQ"],
    ["逸达物流(YD Logistics)","YD意大利专线(YD Italian Express)","XYYEX0031287174YQ"],
    ["菜鸟","无忧挂号_标准普货","WC377434678GB"],
    ["菜鸟","无忧集运-沙特","LP00606568503582"],
    ["菜鸟","无忧集运-阿联酋","LP00604413438071"],
    ["宇航物流(HYL Logistics)","HYL西班牙专线DPD(HYL Spanish Express DPD)","0082800082809582696829"],
    ["宇航物流(HYL Logistics)","HYL北欧小包(HYL Nordic Super Saving)","UJ162912835SE"],
    ["宇航物流(HYL Logistics)","HYL任意门美国专线(HYL US Express)","DOR0117094692CN"],
    ["宇航物流(HYL Logistics)","HYL飞特英国专线(HYL Feite UK Express)","WC292125923GB"],
    ["宇航物流(HYL Logistics)","HYL奥地利专线DPD(HYL Austria Express DPD)","06215196499064"],
    ["宇航物流(HYL Logistics)","HYL加拿大专线YW(HYL Canadian Express YW)","UH987797355YP"],
    ["宇航物流(HYL Logistics)","HYL西班牙专线YW(HYL Spain Express YW)","UH976871850YP"],
    ["宇航物流(HYL Logistics)","HYL意大利专线DPD(HYL Italy Express DPD)","5P38C50740512"],
    ["宇航物流(HYL Logistics)","YH西毅美国专线(HYL XiYi US Express)","AM080216388CN"],
    ["宇航物流(HYL Logistics)","HYL德国专线DPD(HYL German Express DPD)","06215132273243"],
    ["宇航物流(HYL Logistics)","HLY世代美国专线(HLY Generation US Express)","AT098091365CN"],
    ["宇航物流(HYL Logistics)","HYL英国专线DPD(HYL UK Express DPD)","T01E8A0041805697"],
    ["宇航物流(HYL Logistics)","HYL中远美国专线(HYL COSCO US Express)","GOODGEP231029245277"],
    ["宇航物流(HYL Logistics)","HYL法国专线DPD(HYL French Express DPD)","LP095235471FR"],
    ["宇航物流(HYL Logistics)","HYL法国专线YW(HYL French Express YW)","UH924277053YP"],
    ["宇航物流(HYL Logistics)","HYL意大利专线YW(HYL Italy Express YW)","UH977020434YP"],
    ["宇航物流(HYL Logistics)","HYL专线小包普货YW(HYL Express  Super Saving YW)","UH987846459YP"],
    ["宇航物流(HYL Logistics)","HYL英国专线YW(HYL UK Express YW)","UH985360315YP"],
    ["宇航物流(HYL Logistics)","HYL瑞士小包(HYL Swiss Super Saving)","LP592419656FR"],
    ["宇航物流(HYL Logistics)","HYL德国专线YW(HYL German Express YW)","UH977124071YP"],
    ["大誉国际物流","大誉香港专线","YYGHK8200000952YQ"],
    ["大誉国际物流","大誉国际以色列专线","XLT993040824"],
    ["嘉里物流","嘉里西班牙普货专线","PQ6PQQ0490095810107817C"],
    ["世通(ST Logistics)","ST荷兰挂号小包普货(ST Dutch Super Saving)","RE111258796NL"],
    ["世通(ST Logistics)","世通巴西专线(ST Brazil  Express)","NL971177734BR"],
    ["世通(ST Logistics)","世通英国专线(ST UK  Express)","AT067699417CN"],
    ["世通(ST Logistics)","ST湖北EUB(ST Hu Bei EUB)","LV885161921CN"],
    ["世通(ST Logistics)","ST荷兰小包敏感(ST Dutch Super Saving, include sensitive products)","RE111254485NL"],
    ["iMile","iMile阿联酋COD","6100623473324"],
    ["iMile","iMile科威特COD","6102823952901"],
    ["iMile","iMile沙特阿拉伯专线","6102823801430"],
    ["iMile","iMile阿联酋专线","6102923225904"],
    ["iMile","imile墨西哥专线","6102923956478"],
    ["Sara Mart","卡塔尔COD专线","LM9621697549343883"],
  ];
  
  function getLevel2Data() {
    const level1 = form.level1;
    return [...new Set(data.filter((e) => e[0] == level1).map((e) => e[1]))];
  }
  const level1Data = [...new Set(data.map((e) => e[0]))];
  const form = {
    level1: level1Data[0],
    level2: "",
  };
  let level2Data = getLevel2Data()
  
  function initCSS() {
    ElementsUtils.appendHTML(
      document.body,
      `
        <style>
          :root{--atom-size:8px;--screen-max:1360px;--main-color:#FDC452;--main-color-8:rgba(253,196,82,0.8);--main-color-4:rgba(253,196,82,0.4);--sub-color:#FDE7BB;--aid-color:#A5B9BA;--bg-color:#FFFFFF;--bg-color-8:rgba(255,255,255,0.8);--bg-color-4:rgba(255,255,255,0.4);--grey-color:#F8F9FB;--grey-dark-color:#ECEFF4;--hover1-color:rgba(255,201,194,80%);--hover2-color:#FDF3DF;--error-color:#EF5C61;--tag-1-bg:#F7B7B9;--tag-1-font:#8C1F23;--tag-2-bg:var(--sub-color);--tag-2-font:#96501E;--favourite-full:var(--tag-1-bg);--font-color-dark:#333;--font-color-grey:#666666;--font-color-light:#999999;--font-color-white:#ffffff;--font-color-sub:#C99834;--font-size-xxl:32px;--font-size-xl:24px;--font-size-l:20px;--font-size-m:16px;--font-size-s:14px;--font-size-xs:12px;--space-xxl:calc(var(--atom-size) * 8);--space-xl:calc(var(--atom-size) * 5);--space-l:calc(var(--atom-size) * 4);--space-m:calc(var(--atom-size) * 3);--space-s:calc(var(--atom-size) * 2);--space-xs:calc(var(--atom-size) * 1);--radius-l:8px;--radius-m:4px;--radius-s:2px;--shadow-light:0px 4px 16px 0px rgba(0,0,0,0.04);--shadow-normal:0px 4px 16px 0px rgba(0,0,0,0.08);--shadow-dark:0px 4px 16px 0px rgba(0,0,0,0.16);--shadow-dark-s:0px 2px 4px 0px rgba(0,0,0,0.16);--border-white:#FFFFFF 1px solid;--border-light:#EEEEEE 1px solid;--border-grey:#CCCCCC 1px solid;--border-dark:#000000 1px solid;--border-main:var(--gradient-color-right) 1px solid;--border-error:var(--error-color) 1px solid;--gradient-color-left:#FDC452;--gradient-color-right:#FDE7BB;--gradient-color-center:#FAEED7;--select-height:46px;--select-height-mini:30px;--background-theme-color:linear-gradient(135deg,#FDC452 0%,#FDE7BB 100%);--loading-size:40px;--loading-color:#ccc}.dialog{position:fixed;top:5000px;left:5000px;z-index:5000;transform:translate(-50%,-50%);display:none}.dialog.open{top:50%;left:50%;display:block}.dialog .dialog-loading.show{display:flex}.dialog .dialog-center-box{overflow:hidden;background:var(--bg-color);border-radius:var(--radius-l);box-shadow:var(--shadow-dark);opacity:0;visibility:hidden;-webkit-transition-duration:.3s;transition-duration:.3s;-webkit-transition-property:opacity,visibility;transition-property:opacity,visibility;will-change:opacity;display:flex;flex-direction:column;max-width:80vw;max-height:80vh;min-width:50px;min-height:50px;position:relative}.dialog.dialog-xxl .dialog-center-box{width:960px;height:574px}.dialog.dialog-xl .dialog-center-box{min-width:800px;height:722px}.dialog.dialog-m .dialog-center-box{min-width:680px;height:720px}.dialog.dialog-xs .dialog-center-box{width:496px;min-height:204px}.dialog.dialog-xxs .dialog-center-box{width:449px}.dialog.dialog-max-content .dialog-center-box{width:max-content;height:max-content}.dialog.dialog-full .dialog-center-box{height:100vh;width:100vw}.dialog .dialog-center-box .dialog-close{position:absolute;right:var(--space-m);top:var(--space-m);font-size:var(--font-size-xl);cursor:pointer;z-index:2000;line-height:1;transform:rotateZ(45deg);transform-origin:100%}.dialog.open .dialog-loading.show + .dialog-center-box{opacity:0;visibility:hidden}.dialog.open .dialog-loading + .dialog-center-box{opacity:1;visibility:visible}.dialog .dialog-content{display:flex;height:100%;flex:1;overflow-y:auto;background:#fff}.dialog .dialog-header{font-size:var(--font-size-l);padding:var(--space-l) var(--space-l) var(--space-s);font-weight:700}.dialog .dialog-header + .dialog-content{padding:0 var(--space-l) var(--space-l);height:auto;display:block}.dialog-footer{text-align:right;padding:0 var(--space-l)}.dialog-footer button{display:inline-block;width:120px;padding:var(--space-xs);cursor:pointer;color:#fff;text-decoration:none;margin:var(--space-s) 0;background:var(--main-color);border-radius:var(--radius-s)}.dialog.dialog-full .dialog-center-box{max-height:100vh;max-width:100vw;border-radius:0}.dialog.dialog-full .dialog-header{padding:var(--space-s) var(--space-l) var(--space-s) var(--space-xxl)}.dialog.dialog-full .dialog-center-box .dialog-close{font-size:0;transform:none;left:0;top:0;right:initial;padding:var(--space-s)}.dialog.dialog-full .dialog-center-box .dialog-close:after{content:'chevron_left';font-family:'Material Icons';font-weight:normal;font-style:normal;font-size:var(--font-size-l);line-height:1.15;transform:scale(1.4);display:block}.dialog.dialog-full .dialog-header + .dialog-content{box-shadow:inset var(--shadow-normal);padding:0 var(--space-s) var(--space-m)}.dialog.dialog-full .global-loading{z-index:initial}
  
          #op-private-toolbox{position:fixed;right:0;bottom:20%;z-index:999999;overflow:hidden;border-radius:10px 0 0 10px;background:#fff;box-shadow:-1px 0 20px 0 #b4b4b4b0;cursor:pointer;transition:all .4s;display: flex;align-items: center;}
          #op-private-toolbox:hover{box-shadow:-1px 0 20px 0 #757575b0}
          #op-private-toolbox img{width:60px}
          #op-private-toggleShuaDanModeButton{padding: 10px;color: #fff;border-radius: 6px;cursor: pointer;}
          #op-private-toggleShuaDanModeButton.success{background: #1cb83f;}
          #op-private-toggleShuaDanModeButton.error{background: #e71212;}
          #op-private-toolbox-dialog select {border: none}
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
        </div>
      `
    );
  
    function handleLevel1Change (e){
      e.stopPropagation();
      form.level1 = e.target.value
      form.level2 = ''
  
      level2Data = getLevel2Data();
      const level2Select = document.querySelector("#op-private-toolbox-dialog-select2");
      level2Select.innerHTML = level2Data.map((e) => `<option value="${e}">${e}</option>`).join("");
      form.level2 = level2Data[0]
    }
  
    function handleLevel2Change(e) {
      e.stopPropagation();
      form.level2 = e.target.value
    }
  
    function handleCopy(copy_text) {
      let textarea_dom = document.createElement('textarea');//创建textarea元素
      document.body.appendChild(textarea_dom);//向页面底部追加输入框
      textarea_dom.value = copy_text; //添加需要复制的内容到value属性
      textarea_dom.select();//选择input元素
      document.execCommand("Copy");//执行复制命令
      alert("复制成功！内容为：" + copy_text);//弹出提示信息，不同组件可能存在写法不同
      //复制之后再删除元素，否则无法成功赋值
      document.body.removeChild(textarea_dom); //删除动态创建的节点
    }
  
    function randArray(len) {
      return new Array(len).fill(1).map(v=> Math.floor( Math.random()*10));
    }
  
    function getRandomStr(str){
      return str.replace(/\d+/g, function(e){
        return randArray(e.length).join('')
      })
    }
  
    async function handleSubmit(e) {
      e.stopPropagation();
      const { level1, level2 } = form
      if(!level1 || !level2) return alert('请选择物流公司和物流方式')
      const item = data.find(e => e[0] === level1 && e[1] === level2)
      const random_text = getRandomStr(item[2]) + String.fromCharCode(Math.floor(Math.random()*26+65))
      handleCopy(random_text)
    }
  
    const dialogs = new Dialogs({
      id: "op-private-toolbox-dialog",
      needClose: false,
      header: "its工具箱",
      content: `
        <select id="op-private-toolbox-dialog-select1">
          ${level1Data.map((e) => `<option value="${e}">${e}</option>`).join("")}
        </select>
        <select id="op-private-toolbox-dialog-select2">
          ${level2Data.map((e) => `<option value="${e}">${e}</option>`).join("")}
        </select>
        <button id="op-private-toolbox-dialog-submit">生成并复制</button>
      `,
      onOpen() {
        const level1Select = document.querySelector("#op-private-toolbox-dialog-select1");
        const level2Select = document.querySelector("#op-private-toolbox-dialog-select2");
        const submitBtn = document.querySelector("#op-private-toolbox-dialog-submit");
        level1Select.removeEventListener('change', handleLevel1Change);
        level1Select.addEventListener('change', handleLevel1Change);
        level2Select.removeEventListener('change', handleLevel2Change);
        level2Select.addEventListener('change', handleLevel2Change);
        submitBtn.removeEventListener('click', handleSubmit);
        submitBtn.addEventListener('click', handleSubmit);
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
  