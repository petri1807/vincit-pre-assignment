(this["webpackJsonpjs-esitehtava"]=this["webpackJsonpjs-esitehtava"]||[]).push([[0],[,,,,,,,,,,,,,,function(e,t,a){},function(e,t,a){},,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var c=a(0),n=a(1),r=a.n(n),s=a(7),i=a.n(s),l=(a(14),a(2)),d=(a(15),function(e){localStorage.setItem("startDate",JSON.stringify({date:e}))}),j=function(e){localStorage.setItem("endDate",JSON.stringify({date:e}))},o=function(){localStorage.clear()},b=a(8),u=a.n(b),h=function(e){var t=e.handler;return Object(c.jsxs)("section",{className:"fileInput",children:[Object(c.jsx)(u.a,{className:"csvreader",onFileLoaded:function(e,a){"application/vnd.ms-excel"===a.type&&t(e)}}),Object(c.jsx)("button",{className:"button",onClick:o,name:"clear",children:"Clear local storage"})]})},O=(a(19),function(e){var t=e.label,a=e.list,n=e.onChangeHandler,r=e.selectedDate,s="";return"start"===t&&(s="Start date: "),"end"===t&&(s="End date: "),Object(c.jsxs)("div",{className:"dateSelector",children:[Object(c.jsx)("label",{htmlFor:t,children:s}),Object(c.jsx)("select",{className:"select",id:t,onChange:n,children:a.map((function(e){var t=Object(l.a)(e,1)[0];return Object(c.jsx)("option",{value:t,selected:t===r,children:t},t)}))})]})}),p=(a(20),function(e){var t=e.handler;return Object(c.jsxs)("div",{className:"radio",onChange:t,children:[Object(c.jsx)("input",{className:"radio__input",type:"radio",id:"bullish",value:"Bullish",name:"radioGroup",defaultChecked:!0}),Object(c.jsx)("label",{className:"radio__label",htmlFor:"bullish",children:"Bullish trend"}),Object(c.jsx)("input",{className:"radio__input",type:"radio",id:"volume",value:"Volume",name:"radioGroup"})," ",Object(c.jsx)("label",{className:"radio__label",htmlFor:"volume",children:"Highest volume"}),Object(c.jsx)("input",{className:"radio__input",type:"radio",id:"price",value:"Price",name:"radioGroup"})," ",Object(c.jsx)("label",{className:"radio__label",htmlFor:"price",children:"Highest price change"}),Object(c.jsx)("input",{className:"radio__input",type:"radio",id:"opening",value:"Opening",name:"radioGroup"}),Object(c.jsx)("label",{className:"radio__label",htmlFor:"opening",children:"Opening price"})]})});a(21);function x(e){var t=e.dataSet,a=e.category;return t.length?Object(c.jsxs)("table",{className:"content-table",children:[Object(c.jsx)("thead",{children:Object(c.jsxs)("tr",{children:[Object(c.jsx)("th",{children:"Date"}),Object(c.jsx)("th",{children:"Close/Last"}),Object(c.jsx)("th",{children:"Volume"}),Object(c.jsx)("th",{children:"Open"}),Object(c.jsx)("th",{children:"High"}),Object(c.jsx)("th",{children:"Low"}),"price"===a&&Object(c.jsx)("th",{children:"Price change ($)"}),"opening"===a&&Object(c.jsx)("th",{children:"Price change (%)"})]})}),Object(c.jsx)("tbody",{children:t.map((function(e){return Object(c.jsxs)("tr",{children:[Object(c.jsx)("td",{children:e[0]}),Object(c.jsx)("td",{children:e[1]}),Object(c.jsx)("td",{children:e[2]}),Object(c.jsx)("td",{children:e[3]}),Object(c.jsx)("td",{children:e[4]}),Object(c.jsx)("td",{children:e[5]}),"price"===a&&Object(c.jsx)("td",{children:e[6]}),"opening"===a&&Object(c.jsxs)("td",{children:[e[6].toFixed(3)," %"]})]},e[0])}))})]}):Object(c.jsx)("p",{children:"Chart was given an empty array"})}var g=a(3),m=function(e){if(!(e.length<6)){for(var t=Object(g.a)(e),a=[],c=5;c<t.length;c++)a.push([t[c-5],t[c-4],t[c-3],t[c-2],t[c-1],t[c]]);return a.map((function(e){return function(e){if(e.length<6)return"Not enough data";var t,a,c=e[0][0],n=Number(e[0][3].replace("$","")),r=Number(e[1][1].replace("$","")),s=Number(e[2][1].replace("$","")),i=Number(e[3][1].replace("$","")),l=Number(e[4][1].replace("$","")),d=(Number(e[5][1].replace("$",""))+l+i+s+r)/5,j=(t=Math.max(n,d),a=Math.min(n,d),(t-a)/t*100);return[c,e[0][1],e[0][2],e[0][3],e[0][4],e[0][5],j]}(e)})).sort((function(e,t){return e[6]>t[6]?-1:1}))}},f=function(){var e=Object(n.useState)(function(){var e=localStorage.getItem("csvState");return e?JSON.parse(e).csv:null}()),t=Object(l.a)(e,2),a=t[0],r=t[1],s=Object(n.useState)(function(){var e=localStorage.getItem("currentListState");return e?JSON.parse(e).array:null}()),i=Object(l.a)(s,2),o=i[0],b=i[1],u=Object(n.useState)([]),f=Object(l.a)(u,2),v=f[0],S=f[1],N=Object(n.useState)([]),y=Object(l.a)(N,2),D=y[0],w=y[1],I=Object(n.useState)([]),_=Object(l.a)(I,2),k=_[0],C=_[1],F=Object(n.useState)([]),$=Object(l.a)(F,2),J=$[0],A=$[1],L=Object(n.useState)(function(){var e=localStorage.getItem("startDate");if(e)return JSON.parse(e).date}()),B=Object(l.a)(L,2),P=B[0],H=B[1],E=Object(n.useState)(function(){var e=localStorage.getItem("endDate");if(e)return JSON.parse(e).date}()),M=Object(l.a)(E,2),G=M[0],V=M[1],T=Object(n.useState)(0),q=Object(l.a)(T,2),z=q[0],Q=q[1],W=Object(n.useState)(""),K=Object(l.a)(W,2),R=K[0],U=K[1],X=Object(n.useState)(""),Y=Object(l.a)(X,2),Z=Y[0],ee=Y[1],te=Object(n.useState)(!1),ae=Object(l.a)(te,2),ce=ae[0],ne=ae[1],re=Object(n.useState)("Bullish"),se=Object(l.a)(re,2),ie=se[0],le=se[1],de=function(){var e,t=a.filter((function(e){var t=Object(l.a)(e,1)[0];return new Date(t)<=new Date(G)&&new Date(t)>=new Date(P)}));e=t,localStorage.setItem("currentListState",JSON.stringify({array:e})),b(t)};return Object(n.useEffect)((function(){var e;e=a,localStorage.setItem("csvState",JSON.stringify({csv:e})),a&&de()}),[a]),Object(n.useEffect)((function(){P&&G&&de()}),[P,G]),Object(n.useEffect)((function(){var e={days:0,started:"None",ended:"Didnt"},t=[],a=[],c=[];o&&("Bullish"===ie&&(S(o),(e=function(e){if(0!==e.length){var t=Object(g.a)(e).reverse().map((function(e){var t=Object(l.a)(e,2),a=t[0],c=t[1];return{date:a,price:Number(c.replace("$",""))}}));if(t[0]){for(var a=0,c=0,n=0,r="",s="",i=t[0].date,d="",j=[],o=function(){var e=new Date(d);e.setDate(e.getDate()+1);var t=new Date(i);return Math.ceil((e-t)/864e5)},b=0;b<t.length;b++)a=t[b].price,r=t[b].date,a>c&&(c<n&&(j.push({days:o(),started:i,ended:d}),i=s),b+1===t.length&&(d=r,j.push({days:o(),started:i,ended:d})),d=r),n=c,c=a,s=r;return Object(g.a)(j.sort((function(e,t){return e.days>t.days?-1:1})))[0]}}}(o))&&(Q(e.days),U(e.started),ee(e.ended))),"Volume"===ie&&(a=function(e){if(0!==e.length)return Object(g.a)(e).sort((function(e,t){return Number(e[2])>Number(t[2])?-1:1}))}(o),w(a)),"Price"===ie&&(t=function(e){if(0!==e.length)return Object(g.a)(e).map((function(e){var t=Object(l.a)(e,6),a=t[0],c=t[1],n=t[2],r=t[3],s=t[4],i=t[5],d=Number(s.replace("$","")),j=Number(i.replace("$",""));return[a,c,n,r,s,i,"$".concat((d-j).toFixed(3))]})).sort((function(e,t){return Number(e[6].replace("$",""))>Number(t[6].replace("$",""))?-1:1}))}(o),C(t)),"Opening"===ie&&((c=m(o))?(ne(!1),A(c)):ne(!0)))}),[o,ie]),Object(c.jsxs)("div",{className:"App",children:[!a&&Object(c.jsxs)("div",{children:[Object(c.jsx)("p",{children:"Welcome, Scrooge! Open a .csv file to analyze the data"}),Object(c.jsxs)("p",{children:["Download stock market data from"," ",Object(c.jsx)("a",{href:"https://www.nasdaq.com/market-activity/stocks/aapl/historical",children:"NASDAQ"})]})]}),Object(c.jsx)(h,{handler:function(e){var t=e.slice(1);r(t);var a=t[4][0],c=t[0][0];H(a),V(c),d(a),j(c)}}),a&&Object(c.jsxs)("div",{children:[Object(c.jsxs)("section",{className:"dateInputs",children:[Object(c.jsx)(O,{label:"start",list:a,onChangeHandler:function(e){d(e.target.value),H(e.target.value)},selectedDate:P}),Object(c.jsx)(O,{label:"end",list:a,onChangeHandler:function(e){j(e.target.value),V(e.target.value)},selectedDate:G})]}),Object(c.jsx)("section",{children:new Date(P)<=new Date(G)&&o?Object(c.jsxs)("div",{children:[Object(c.jsx)(p,{handler:function(e){le(e.target.value)}}),"Bullish"===ie&&v&&Object(c.jsxs)("div",{className:"tableSection",children:[Object(c.jsxs)("p",{children:["In Apple stock historical data the Close/Last price increased ",Object(c.jsx)("b",{children:z})," days in a row between"," ",Object(c.jsx)("b",{children:R})," and ",Object(c.jsx)("b",{children:Z})]}),Object(c.jsx)(x,{dataSet:o,category:"bullish"})]}),"Volume"===ie&&D.length>0&&Object(c.jsxs)("div",{className:"tableSection",children:[Object(c.jsxs)("p",{children:["In Apple stock historical data ",Object(c.jsx)("b",{children:D[0][0]})," ","had the highest trading volume at"," ",Object(c.jsx)("b",{children:D[0][2]})]}),Object(c.jsx)(x,{dataSet:D,category:"volume"})]}),"Price"===ie&&k.length>0&&Object(c.jsxs)("div",{className:"tableSection",children:[Object(c.jsxs)("p",{children:["In Apple stock historical data"," ",Object(c.jsx)("b",{children:k[0][0]})," had the highest stock price change within a day at ",Object(c.jsx)("b",{children:k[0][6]})]}),Object(c.jsx)(x,{dataSet:k,category:"price"})]}),"Opening"===ie&&ce&&Object(c.jsx)("p",{style:{color:"red"},children:"Needs at least a 6-day window selected to calculate SMA-5"}),"Opening"===ie&&J.length>0&&!ce&&Object(c.jsxs)("div",{className:"tableSection",children:[Object(c.jsxs)("p",{children:["In Apple stock historical data"," ",Object(c.jsx)("b",{children:J[0][0]})," had the highest stock price change at ",Object(c.jsxs)("b",{children:[J[0][6].toFixed(3)," %"]})]}),Object(c.jsx)(x,{dataSet:J,category:"opening"})]})]}):Object(c.jsx)("p",{style:{color:"red"},children:"Invalid dates selected"})})]})]})},v=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,23)).then((function(t){var a=t.getCLS,c=t.getFID,n=t.getFCP,r=t.getLCP,s=t.getTTFB;a(e),c(e),n(e),r(e),s(e)}))};i.a.render(Object(c.jsx)(r.a.StrictMode,{children:Object(c.jsx)(f,{})}),document.getElementById("root")),v()}],[[22,1,2]]]);
//# sourceMappingURL=main.1299518f.chunk.js.map