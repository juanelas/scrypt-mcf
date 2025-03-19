!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):r((e="undefined"!=typeof globalThis?globalThis:e||self).scryptMcf={})}(this,(function(e){"use strict";function r(e,r=!1,t=!0){let n="";return n=(e=>{const r=[];for(let t=0;t<e.length;t+=32768)r.push(String.fromCharCode.apply(null,e.subarray(t,t+32768)));return btoa(r.join(""))})("string"==typeof e?(new TextEncoder).encode(e):new Uint8Array(e)),r&&(n=function(e){return e.replace(/\+/g,"-").replace(/\//g,"_")}(n)),t||(n=n.replace(/=/g,"")),n}const t={"SHA-1":{outputLength:20,blockSize:64},"SHA-256":{outputLength:32,blockSize:64},"SHA-384":{outputLength:48,blockSize:128},"SHA-512":{outputLength:64,blockSize:128}};function n(e,r,n,a,s="SHA-256"){return new Promise(((f,c)=>{s in t||c(new RangeError(`Valid hash algorithm values are any of ${Object.keys(t).toString()}`)),"string"==typeof e?e=(new TextEncoder).encode(e):e instanceof ArrayBuffer?e=new Uint8Array(e):ArrayBuffer.isView(e)||c(RangeError("P should be string, ArrayBuffer, TypedArray, DataView")),"string"==typeof r?r=(new TextEncoder).encode(r):r instanceof ArrayBuffer?r=new Uint8Array(r):ArrayBuffer.isView(r)?r=new Uint8Array(r.buffer,r.byteOffset,r.byteLength):c(RangeError("S should be string, ArrayBuffer, TypedArray, DataView")),crypto.subtle.importKey("raw",e,"PBKDF2",!1,["deriveBits"]).then((u=>{const l={name:"PBKDF2",hash:s,salt:r,iterations:n};crypto.subtle.deriveBits(l,u,8*a).then((e=>f(e)),(u=>{(async function(e,r,n,a,s){if(!(s in t))throw new RangeError(`Valid hash algorithm values are any of ${Object.keys(t).toString()}`);if(!Number.isInteger(n)||n<=0)throw new RangeError("c must be a positive integer");const f=t[s].outputLength;if(!Number.isInteger(a)||a<=0||a>=(2**32-1)*f)throw new RangeError("dkLen must be a positive integer < (2 ** 32 - 1) * hLen");const c=Math.ceil(a/f),u=a-(c-1)*f,l=new Array(c);0===e.byteLength&&(e=new Uint8Array(t[s].blockSize));const g=await crypto.subtle.importKey("raw",e,{name:"HMAC",hash:{name:s}},!0,["sign"]),y=async function(e,r){const t=await crypto.subtle.sign("HMAC",e,r);return new Uint8Array(t)};for(let e=0;e<c;e++)l[e]=await h(g,r,n,e+1);async function h(e,r,t,n){const a=await y(e,o(r,function(e){const r=new ArrayBuffer(4);return new DataView(r).setUint32(0,e,!1),new Uint8Array(r)}(n)));let s=a;for(let r=1;r<t;r++)s=await y(e,s),i(a,s);return a}return l[c-1]=l[c-1].slice(0,u),o(...l).buffer})(e,r,n,a,s).then((e=>f(e)),(e=>c(e)))}))}),(e=>c(e)))}))}function o(...e){const r=e.reduce(((e,r)=>e+r.length),0);if(0===e.length)throw new RangeError("Cannot concat no arrays");const t=new Uint8Array(r);let n=0;for(const r of e)t.set(r,n),n+=r.length;return t}function i(e,r){for(let t=0;t<e.length;t++)e[t]^=r[t]}const a=function(e){function r(e,r){return e<<r|e>>>32-r}const t=e.slice(0);for(let e=8;e>0;e-=2)t[4]^=r(t[0]+t[12],7),t[8]^=r(t[4]+t[0],9),t[12]^=r(t[8]+t[4],13),t[0]^=r(t[12]+t[8],18),t[9]^=r(t[5]+t[1],7),t[13]^=r(t[9]+t[5],9),t[1]^=r(t[13]+t[9],13),t[5]^=r(t[1]+t[13],18),t[14]^=r(t[10]+t[6],7),t[2]^=r(t[14]+t[10],9),t[6]^=r(t[2]+t[14],13),t[10]^=r(t[6]+t[2],18),t[3]^=r(t[15]+t[11],7),t[7]^=r(t[3]+t[15],9),t[11]^=r(t[7]+t[3],13),t[15]^=r(t[11]+t[7],18),t[1]^=r(t[0]+t[3],7),t[2]^=r(t[1]+t[0],9),t[3]^=r(t[2]+t[1],13),t[0]^=r(t[3]+t[2],18),t[6]^=r(t[5]+t[4],7),t[7]^=r(t[6]+t[5],9),t[4]^=r(t[7]+t[6],13),t[5]^=r(t[4]+t[7],18),t[11]^=r(t[10]+t[9],7),t[8]^=r(t[11]+t[10],9),t[9]^=r(t[8]+t[11],13),t[10]^=r(t[9]+t[8],18),t[12]^=r(t[15]+t[14],7),t[13]^=r(t[12]+t[15],9),t[14]^=r(t[13]+t[12],13),t[15]^=r(t[14]+t[13],18);for(let r=0;r<16;r++)e[r]=t[r]+e[r]},s=function(e,r){for(let t=0;t<e.length;t++)e[t]^=r[t]},f=function(e){const r=e.byteLength/128,t=16*(2*r-1),n=e.slice(t,t+16),o=new Uint32Array(e.length/2);let i=!0;for(let t=0;t<2*r;t++){const r=16*t,f=e.subarray(r,r+16);s(n,f),a(n);const c=16*(t>>1);if(i)for(let r=0;r<16;r++)e[c+r]=n[r];else for(let e=0;e<16;e++)o[c+e]=n[e];i=!i}const f=16*r;for(let r=0;r<f;r++)e[f+r]=o[r]},c=function(e,r){const t=e.byteLength/128,n=new Array(r);for(let t=0;t<r;t++)n[t]=e.slice(0),f(e);function o(e){const n=64*(2*t-1);return new DataView(e.buffer,n,64).getUint32(0,!0)%r}for(let t=0;t<r;t++){const r=o(e);s(e,n[r]),f(e)}};async function u(e,t){const o={logN:17,r:8,p:1,...t?.scryptParams},i={N:2**o.logN,r:o.r,p:o.p},a=void 0!==t?.saltBase64NoPadding?function(e,r=!1){{let t=!1;if(/^[0-9a-zA-Z_-]+={0,2}$/.test(e))t=!0;else if(!/^[0-9a-zA-Z+/]*={0,2}$/.test(e))throw new Error("Not a valid base64 input");t&&(e=e.replace(/-/g,"+").replace(/_/g,"/").replace(/=/g,""));const n=new Uint8Array(atob(e).split("").map((e=>e.charCodeAt(0))));return r?(new TextDecoder).decode(n):n}}(t.saltBase64NoPadding):function(e=16){if(!Number.isInteger(e)||e<0)throw new RangeError("length must be integer >= 0");return 0===e?new ArrayBuffer(0):crypto.getRandomValues(new Uint8Array(e)).buffer}(),s=r(a,!1,!1),f=t?.derivedKeyLength??32,u=r(await async function(e,r,t,o){if("string"==typeof e)e=(new TextEncoder).encode(e);else if(e instanceof ArrayBuffer)e=new Uint8Array(e);else if(!ArrayBuffer.isView(e))throw RangeError("P should be string, ArrayBuffer, TypedArray, DataView");if("string"==typeof r)r=(new TextEncoder).encode(r);else if(r instanceof ArrayBuffer)r=new Uint8Array(r);else if(!ArrayBuffer.isView(r))throw RangeError("S should be string, ArrayBuffer, TypedArray, DataView");if(!Number.isInteger(t)||t<=0||t>137438953440)throw RangeError("dkLen is the intended output length in octets of the derived key; a positive integer less than or equal to (2^32 - 1) * hLen where hLen is 32");const i=void 0!==o&&void 0!==o.N?o.N:131072,a=void 0!==o&&void 0!==o.r?o.r:8,s=void 0!==o&&void 0!==o.p?o.p:1;if(!Number.isInteger(i)||i<=0||i&i-1)throw RangeError("N must be a power of 2");if(!Number.isInteger(a)||a<=0||!Number.isInteger(s)||s<=0||s*a>1073741823.75)throw RangeError("Parallelization parameter p and blocksize parameter r must be positive integers satisfying p ≤ (2^32− 1) * hLen / MFLen where hLen is 32 and MFlen is 128 * r.");const f=await n(e,r,1,128*s*a),u=new Uint32Array(f);for(let e=0;e<s;e++){const r=32*a,t=e*r,n=u.slice(t,t+r);c(n,i);for(let e=0;e<32*a;e++)u[t+e]=n[e]}return await n(e,u,1,t)}(e,a,f,i),!1,!1);return`$scrypt$ln=${o.logN},r=${o.r},p=${o.p}$${s}$${u}`}e.hash=u,e.verify=async function(e,r){const t=[...r.matchAll(/^\$scrypt\$ln=(\d{1,2}),r=(\d{1,2}),p=(\d{1,2})\$([a-zA-Z0-9/+]{22})\$([a-zA-Z0-9/+]{22,})$/g)];if(1!==t.length)throw new Error("Invalid MCFstring format");const n=Number(t[0][1]),o=Number(t[0][2]),i=Number(t[0][3]),a=t[0][4],s=2**(Math.floor(Math.log2(6*t[0][5].length))-3);return await u(e,{saltBase64NoPadding:a,scryptParams:{logN:n,r:o,p:i},derivedKeyLength:s})===r}}));
