(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{189:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a(1),r=a.n(n),c=(a(4),a(31)),l=a(177),o=a(178),u=a(174);function s(e){var t=e.title,a=e.children;return r.a.createElement(r.a.Fragment,null,r.a.createElement(c.Head,null,r.a.createElement("title",null,"".concat(t," | The Alpha Project"))),r.a.createElement("section",null,r.a.createElement("article",null,r.a.createElement(l.a,null,r.a.createElement(o.a,{className:"py-1 justify-content-center"},r.a.createElement(u.a,{xs:10,md:8,lg:6},a))))))}},272:function(e,t){},274:function(e,t){},307:function(e,t){},308:function(e,t){},95:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return j}));var n=a(92),r=a.n(n),c=a(19),l=a.n(c),o=a(1),u=a.n(o),s=a(347),m=a(267),i=a(268),p=a(55),f=a.n(p),E=a(359),b=a(358),d=a(178),O=a(174),h=a(179),v=a(189);function g(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function w(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?g(Object(a),!0).forEach((function(t){r()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):g(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function j(){var e=Object(o.useState)({username:"",password:""}),t=l()(e,2),a=t[0],n=t[1],c=Object(o.useState)(""),p=l()(c,2),g=p[0],j=p[1],y=Object(o.useState)(""),C=l()(y,2),N=C[0],P=C[1],A=Object(o.useState)(!1),S=l()(A,2),D=S[0],x=S[1],k=Object(o.useState)(!1),G=l()(k,2),I=G[0],L=G[1],J=function(e){e.preventDefault(),n(w(w({},a),{},r()({},e.target.name,e.target.value.trim())))},q=function(){return g===N},F=function(e,t){return u.a.createElement(E.a,{className:"alert-form",variant:e},t)};return u.a.createElement(v.a,{title:"Create Account"},u.a.createElement(b.a,null,u.a.createElement(b.a.Group,{className:"mb-3",controlId:"username"},u.a.createElement(b.a.Label,null,u.a.createElement(s.b,{className:"me-2"}),"Account Name"),u.a.createElement(b.a.Control,{onChange:J,name:"username",value:a.username,autoComplete:"off",type:"text"})),u.a.createElement(b.a.Group,{className:"mb-3",controlId:"password"},u.a.createElement(b.a.Label,null,u.a.createElement(s.a,{className:"me-2"}),"Account Password"),u.a.createElement(b.a.Control,{onChange:J,value:a.password,name:"password",type:"password"})),u.a.createElement(b.a.Group,{className:"mb-1",controlId:"captcha"},u.a.createElement(d.a,null,u.a.createElement(O.a,{lg:3,xs:6},u.a.createElement(b.a.Label,null,"Enter Captcha"),u.a.createElement(b.a.Control,{className:"captcha-input",value:N,onChange:function(e){return P(e.target.value.trim())},name:"captcha",type:"text"})),u.a.createElement(O.a,{lg:2,xs:3},u.a.createElement("div",{className:"captcha"},u.a.createElement(m.a,{captchaCode:function(e){return j(e)}}))))),u.a.createElement(b.a.Group,{className:"mb-3"}),D&&F("danger","Invalid Captcha"),I&&F("danger","All inputs are required!"),u.a.createElement(h.a,{className:"create-button",onClick:function(e){e.preventDefault();var t=a.username,r=a.password,c=Object(i.register)(t,r);q()?""===t||""===r&&q()?(L(!0),x(!1)):(L(!1),x(!1),f.a.post("http://localhost:3500/api/account/createAccount",{username:t,s:c.salt,v:c.verifier}).then((function(e){n({username:"",password:""}),P("")})).catch((function(e){}))):x(!0)},type:"submit"},u.a.createElement(s.c,{className:"me-2"}),"Create Account")))}}}]);