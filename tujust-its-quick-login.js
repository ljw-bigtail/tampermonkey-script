// ==UserScript==
// @name         its快捷登录
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  供应链快捷登录系统-仅供内部使用
// @author       leo.lu@orderplus.com
// @match        *://its.fashionme.com/login
// @match        *://its.fashionme.com/login*
// @match        *://its.popopiecloth.com/login
// @match        *://its.popopiecloth.com/login*
// @icon         http://its.fashionme.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  // login
  function setCookie(cname,cvalue,exdays){
      var d = new Date();
      d.setTime(d.getTime()+(exdays*24*60*60*1000));
      var expires = "expires="+d.toGMTString();
      document.cookie = cname+"="+cvalue+"; "+expires;
  }
  setTimeout(function(){
  let Container = document.createElement('button');
  Container.id = "quick-login";
  Container.className = "el-button el-button--success el-button--medium";
  Container.style.marginTop="20px"
  Container.style.marginLeft="0px"
  Container.style.width="380px"
  Container.style.position="absolute"
  Container.style.left="50%"
  Container.style.top="72vh"
  Container.style.transform="translate(-50%)"
  Container.innerHTML =`快捷登录`
  Container.onclick = function(){
      var user = document.querySelector("#loginWrap > form > div:nth-child(4) > div:nth-child(1) > div > div > input").value
      var code = document.querySelector("#loginWrap > form > div:nth-child(4) > div.el-form-item.codeViewWrap.is-success.is-required.el-form-item--medium > div > div.codeInput.el-input.el-input--medium.el-input--suffix > input").value
      const formData = new FormData();
      formData.append('username', user);
      formData.append('password',  location.href.indexOf("popopiecloth") > -1 ? '' : 'Er8n7sP2305277pqI');
      formData.append('code', code);
      fetch(`/api/ums/user/login`, {
          method: 'POST',
          body: formData,
      })
      .then(response => response.json())
      .then(data => {
          var token = data.data.token
          setCookie("Authorization", `Bearer%20${token}`, 180)
          window.location.href = window.location.origin + "/home"
          localStorage.setItem("SET_USERID", data.data.userId)
      })
      .catch(error => console.error(error))
  }
  document.querySelector("#loginWrap").appendChild(Container)
  }, 1000)
})();