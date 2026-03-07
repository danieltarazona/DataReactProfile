import{r as $}from"./react-DDXJxHXf.js";var p={exports:{}},h={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var i=$;function w(e,u){return e===u&&(e!==0||1/e===1/u)||e!==e&&u!==u}var V=typeof Object.is=="function"?Object.is:w,j=i.useState,R=i.useEffect,D=i.useLayoutEffect,O=i.useDebugValue;function z(e,u){var t=u(),a=j({inst:{value:t,getSnapshot:u}}),r=a[0].inst,n=a[1];return D(function(){r.value=t,r.getSnapshot=u,m(r)&&n({inst:r})},[e,t,u]),R(function(){return m(r)&&n({inst:r}),e(function(){m(r)&&n({inst:r})})},[e]),O(t),t}function m(e){var u=e.getSnapshot;e=e.value;try{var t=u();return!V(e,t)}catch{return!0}}function I(e,u){return u()}var M=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?I:z;h.useSyncExternalStore=i.useSyncExternalStore!==void 0?i.useSyncExternalStore:M;p.exports=h;var _=p.exports,g={};/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var d=$,G=_;function L(e,u){return e===u&&(e!==0||1/e===1/u)||e!==e&&u!==u}var k=typeof Object.is=="function"?Object.is:L,C=G.useSyncExternalStore,U=d.useRef,W=d.useEffect,x=d.useMemo,A=d.useDebugValue;g.useSyncExternalStoreWithSelector=function(e,u,t,a,r){var n=U(null);if(n.current===null){var f={hasValue:!1,value:null};n.current=f}else f=n.current;n=x(function(){function E(o){if(!S){if(S=!0,l=o,o=a(o),r!==void 0&&f.hasValue){var c=f.value;if(r(c,o))return v=c}return v=o}if(c=v,k(l,o))return c;var b=a(o);return r!==void 0&&r(c,b)?(l=o,c):(l=o,v=b)}var S=!1,l,v,y=t===void 0?null:t;return[function(){return E(u())},y===null?void 0:function(){return E(y())}]},[u,t,a,r]);var s=C(e,n[0],n[1]);return W(function(){f.hasValue=!0,f.value=s},[s]),A(s),s};export{_ as s};
