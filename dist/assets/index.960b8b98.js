var Ve=Object.defineProperty,Xe=Object.defineProperties;var Ye=Object.getOwnPropertyDescriptors;var X=Object.getOwnPropertySymbols;var Ze=Object.prototype.hasOwnProperty,He=Object.prototype.propertyIsEnumerable;var Y=(o,t,n)=>t in o?Ve(o,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):o[t]=n,m=(o,t)=>{for(var n in t||(t={}))Ze.call(t,n)&&Y(o,n,t[n]);if(X)for(var n of X(t))He.call(t,n)&&Y(o,n,t[n]);return o},y=(o,t)=>Xe(o,Ye(t));import{v as D,j as _,L as A,r as Z,R as w,S as Ke,a as P,b as W,T as H,c as Ge,g as S,p as qe,u as $e,d as Je,P as K,l as Qe,e as et}from"./vendor.327ae71f.js";const tt=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))c(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const x of i.addedNodes)x.tagName==="LINK"&&x.rel==="modulepreload"&&c(x)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerpolicy&&(i.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?i.credentials="include":a.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function c(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}};tt();const G="tvfbchicbrvuctrvjcdvbdlncfndfuti",q=!0,$=0,J="",Q=null,ee=null,te=4e3,oe=3e3,re=.25,ne=null,le="#999999",ie=1,se=100,ae=0,de=0,ce="#000000",ge=.2,he=5,ue="m",fe=!0,pe=!0,me=1642085325452,ye=!1,ve=null,ke=0,xe=[],we=[],be=[],Ce=[],Se=[],Fe=[],Te=[],De=[{_id:"FxVCQxnM7uLTIu6E",c:[5e3,800,5e3,900],light:20,move:20,sight:20,sound:20,dir:0,door:0,ds:0,flags:{}},{_id:"Tyqn0PnGL3uvoH0m",c:[100,0,100,100],light:20,move:20,sight:20,sound:20,dir:0,door:0,ds:0,flags:{}},{_id:"rT6TrSUrPWLXOnt4",c:[400,0,400,200],light:20,move:20,sight:20,sound:20,dir:0,door:0,ds:0,flags:{}},{_id:"0skYZyox0L4fKfhz",c:[700,0,700,500],light:20,move:20,sight:20,sound:20,dir:0,door:0,ds:0,flags:{}},{_id:"c80O1z1NBoiUo1Bx",c:[0,1e3,100,1e3],light:20,move:20,sight:20,sound:20,dir:0,door:0,ds:0,flags:{}},{_id:"Ma5x2kDSEZDOzi0y",c:[0,1300,300,1300],light:20,move:20,sight:20,sound:20,dir:0,door:0,ds:0,flags:{}},{_id:"fTVwZNanPNIChrWz",c:[0,1600,600,1600],light:20,move:20,sight:20,sound:20,dir:0,door:0,ds:0,flags:{}}],Re=null,Ee=null,Le=null,Pe="",We={"token-attacher":{},exportSource:{world:"test",system:"alienrpg",coreVersion:"9.242",systemVersion:"2.0.7"}};var ot={name:G,navigation:q,navOrder:$,navName:J,img:Q,foreground:ee,width:te,height:oe,padding:re,initial:ne,backgroundColor:le,gridType:ie,grid:se,shiftX:ae,shiftY:de,gridColor:ce,gridAlpha:ge,gridDistance:he,gridUnits:ue,tokenVision:fe,fogExploration:pe,fogReset:me,globalLight:ye,globalLightThreshold:ve,darkness:ke,drawings:xe,tokens:we,lights:be,notes:Ce,sounds:Se,templates:Fe,tiles:Te,walls:De,playlist:Re,playlistSound:Ee,journal:Le,weather:Pe,flags:We},rt=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",name:G,navigation:q,navOrder:$,navName:J,img:Q,foreground:ee,width:te,height:oe,padding:re,initial:ne,backgroundColor:le,gridType:ie,grid:se,shiftX:ae,shiftY:de,gridColor:ce,gridAlpha:ge,gridDistance:he,gridUnits:ue,tokenVision:fe,fogExploration:pe,fogReset:me,globalLight:ye,globalLightThreshold:ve,darkness:ke,drawings:xe,tokens:we,lights:be,notes:Ce,sounds:Se,templates:Fe,tiles:Te,walls:De,playlist:Re,playlistSound:Ee,journal:Le,weather:Pe,flags:We,default:ot}),v={default:{fillColor:"#003300",strokeWidth:10,strokeColor:"#009933",stageBackground:"#999999",gridlines:"#000000"},paper:{fillColor:"#FFFFFF",strokeWidth:20,strokeColor:"#000000",stageBackground:"#FFFFFF",gridlines:"#000000"},blueprint:{fillColor:"#98AEDD",strokeWidth:30,strokeColor:"#E4EAF6",stageBackground:"#405CB1",gridlines:"#FFFFFF"},CRT:{fillColor:"#030E04",strokeWidth:20,strokeColor:"#00F562",stageBackground:"#152D1B",gridlines:"#8FBBA4"}},B={fill:"rgba(0,0,0,0.0)",stroke:"black",strokeWidth:8,strokeColor:"#009933"};const nt=(o=4e3,t=3e3)=>[o*.25,t*.266],O=([o,t])=>{var[n,c]=nt();return[o+n,t+c]},Oe={tile:({x:o,y:t})=>({_id:D(),img:"modules/ship-maker/textures/Grate_Metal_D_03_small.png",width:100,height:100,x:o,y:t,z:1,rotation:180,alpha:1,tint:null,hidden:!1,locked:!1,overhead:!1,occlusion:{mode:1,alpha:0},video:{loop:!0,autoplay:!0,volume:0},flags:{}}),wall:({xs:o,ys:t,xe:n,ye:c})=>({_id:D(),c:[o,t,n,c],light:20,move:20,sight:20,sound:20,dir:0,door:0,ds:0,flags:{}}),drawing:({points:o,texture:t,style:n})=>(console.log({style:n}),y(m({_id:D(),author:"HkYvsyS3L7U5KzuX",type:"p",x:0,y:0,rotation:0,z:0,points:o,bezierFactor:0,fillType:2},n),{fillAlpha:.5,strokeAlpha:2,texture:t,fontFamily:"Signika",fontSize:48,textColor:"#FFFFFF",textAlpha:1,hidden:!1,locked:!1,flags:{},text:""}))},lt=({walls:o,drawings:t,style:n})=>{console.log({style:n});var c=y(m({},rt),{name:D(),walls:o,drawings:t,backgroundColor:n.stageBackground,gridColor:n.gridlines});return delete c.default,c},it=o=>{console.group("makewall");var t=o[0],n=[];return t.forEach((c,a)=>{var i=t[a],x=t[a+1];x||(x=t[0]),console.log(O([1,2]));var[u,b]=O(i),[s,f]=O(x),F=Oe.wall({xs:u,ys:b,xe:s,ye:f});n.push(F)}),console.groupEnd("makewall"),n},st=(o,t)=>{console.group("makeDrawing");var o=o[0];return o=o.map(n=>O(n)),console.groupEnd("makeDrawing"),Oe.drawing({points:o,style:t})},r=_.exports.jsx,k=_.exports.jsxs,M=_.exports.Fragment,at=({gridSize:o,area:t,scale:n,style:c={gridlines:"black"}})=>Array.from({length:t*n}).map((a,i)=>k(M,{children:[r(A,{points:[i*o,0,i*o,t/n],stroke:c.gridlines,strokeWidth:.5}),r(A,{points:[0,i*o,t/n,i*o],stroke:c.gridlines,strokeWidth:.5})]})),dt=async o=>{const t="file",n=JSON.stringify(o,null,2),c=new Blob([n],{type:"application/json"}),a=await URL.createObjectURL(c),i=document.createElement("a");i.href=a,i.download=t+".json",document.body.appendChild(i),i.click(),document.body.removeChild(i)};var ct={flex:1,backgroundColor:"silver",margin:5,padding:5,borderRadius:10,justifyContent:"center",textAlign:"center",width:"100%",display:"flex",alignItems:"center"},gt={scale:.3,data:{gridSize:100,area:1e3}};const R=[{width:300,height:300,fill:"rgba(0,0,0,0.4)",id:"t1"},{width:150,height:600,fill:"rgba(0,0,0,0.4)",id:"t2"}],ht=[y(m({x:400,y:400,width:500,height:500},B),{id:"rect2"})],je=({shapeProps:o,isSelected:t,onSelect:n,onChange:c,onClick:a,draggable:i=!0,transformEnd:x})=>{const u=w.useRef(),b=w.useRef();return w.useEffect(()=>{t&&(b.current.nodes([u.current]),b.current.getLayer().batchDraw())},[t]),k(w.Fragment,{children:[r(W,y(m({onClick:a||n,onTap:n,ref:u},o),{draggable:i,onKeyDown:s=>console.log(key),onDragStart:s=>c(y(m({},o),{strokeWidth:B.strokeWidth,x:s.target.x(),y:s.target.y()})),onDragEnd:s=>c(y(m({},o),{strokeWidth:0,x:s.target.x(),y:s.target.y()})),onTransformEnd:s=>{const f=u.current,F=f.scaleX(),j=f.scaleY();f.scaleX(1),f.scaleY(1),c(y(m({},o),{x:f.x(),y:f.y(),width:Math.max(5,f.width()*F),height:Math.max(f.height()*j)}))}})),t&&r(Ge,{ref:b,boundBoxFunc:(s,f)=>f.width<5||f.height<5?s:f})]})},ut=o=>{const[t,n]=Z.exports.useState(),[c,a]=w.useState(ht),[i,x]=w.useState(null),[u,b]=w.useState(gt),[s,f]=w.useState({style:"blueprint",generateInternalDoors:!1}),F=e=>{let l=[],g=e.size();l[0]={x:0,y:0},l[1]={x:g.width,y:0},l[2]={x:g.width,y:g.height},l[4]={x:0,y:g.height},l[5]={x:0,y:0};var h=[];for(var p of l.filter(d=>d))h.push(e.getTransform().point(p));return h=h.map(({x:d,y:E})=>[d,E]),h};var j=({points:e})=>r(Je,{sceneFunc:(l,g)=>{l.beginPath();for(var h of e)l.lineTo(...h);l.closePath(),l.fillStrokeShape(g)},fill:v[s.style].fillColor,stroke:v[s.style].strokeColor,strokeWidth:v[s.style].strokeWidth,points:e}),ze=({features:e,lines:l})=>{if(!e)return null;const g=({points:d})=>r(j,{fill:v[s.style].fillColor,stroke:v[s.style].strokeColor,strokeWidth:v[s.style].strokeWidth,points:d}),h=({points:d})=>(console.log({points:d}),r(A,{fill:v[s.style].fillColor,stroke:v[s.style].strokeColor,strokeWidth:v[s.style].strokeWidth/2,points:d}));var p=d=>d;return e.geometry.type=="Polygon"?k(M,{children:[r(g,{points:[...S(p(e))[0]]}),s.generateInternalDoors&&l.map(d=>r(h,{points:S(d).flat()}))]}):e.geometry.type=="MultiPolygon"?r(M,{children:S(p(e)).map(d=>r(g,{points:[...d[0]]}))}):null};const _e=e=>{var l=[];for(var g of e)l.push(qe([F(g)],{fill:"#0f0"}));const h=(L,Ie)=>{var Ne=new K(S(L)),Ue=new K(S(Ie)),U=Ne.intersect(Ue);if(U.length==2)return U.map(V=>[V.x,V.y])};var p=l[0],d=[];const E=L=>{L&&d.push(Qe(L))};for(var g of l.slice(1))E(h(p,g)),p=$e(p,g);return{poly:p,intersections:d}},Ae=({poly:e,intersections:l})=>{if(console.log({poly:e,intersections:l}),!!e){var g=[],h=[],p=(d,E)=>{console.group("addwall"),g=[...g,...it(d)],h=[...h,st(d,v[s.style])],console.groupEnd("addwall")};return e.geometry.type=="Polygon"&&p(S(e)),e.geometry.type=="MultiPolygon"&&S(e).forEach(d=>p(d)),lt({walls:g,drawings:h,style:v[s.style]})}},Be=e=>y(m(m({},e),B),{id:D()}),Me=e=>e.getClassName()=="Rect"&&e.id()!="deletebox";var C=e=>r("div",{className:"control-box",style:y(m({},ct),{flex:e.flex}),children:e.children});const I=e=>{(e.target===e.target.getStage()||e.target.id()==="background")&&x(null)};var N=e=>b(y(m({},u),{scale:u.scale*e}));const z=e=>{var l=e.currentTarget.getChildren(Me),g=e.currentTarget.find("#deletebox")[0],h=[];for(var p of l)Konva.Util.haveIntersection(p.getClientRect(),g.getClientRect())&&h.push(p.id());a(c.filter(d=>!h.includes(d.id))),n(_e(l.filter(d=>!h.includes(d.id()))))};var T=40;return r("div",{children:k("div",{style:{flexDirection:"row",alignItems:"stretch",display:"flex"},children:[k("div",{style:{flexDirection:"column",alignItems:"flex-start",display:"flex"},children:[k(C,{children:["Zoom: ",u.scale.toFixed(2)]}),r(C,{children:r("div",{onClick:e=>N(1.5),children:"Zoom In"})}),r(C,{children:r("div",{onClick:e=>N(.5),children:"Zoom Out"})}),r(C,{children:k("label",{children:["Style",r("select",{name:"select",onChange:e=>f(y(m({},s),{style:e.target.value})),children:Object.keys(v).map(e=>r("option",{selected:s.style===e,value:e,children:e}))})]})}),r(C,{children:k("label",{children:["Grid size",r("input",{type:"number",min:50,onInput:e=>b(y(m({},u),{data:y(m({},u.data),{gridSize:e.target.value>0&&e.target.value||50})})),value:u.data.gridSize})]})}),r(C,{children:r("div",{onClick:e=>dt(Ae(t)),children:"Export"})}),r(C,{flex:3,children:r("div",{style:{whiteSpace:"pre-wrap"},children:`This is a wysiwyg editor for Foundry VTT.

- Drag the outlined box (building component) to place a room. 

-  Click on a box in the toolbox to spawn a new building component.

-  Click on a placed building component to resize or rotate

- All touching components will merge into a single room. 
-  Hit export to get a Foundry VTT scene. 

-  Import the scene into Foundry. Add doors and other features from there.

Created by Clay D`})})]}),r("div",{children:k(Ke,{fill:"black",scaleY:u.scale,scaleX:u.scale,style:{margin:30,borderStyle:"solid"},width:window.innerWidth/1.2,height:window.innerHeight/1.2,onMouseDown:I,onTouchStart:I,children:[k(P,{children:[r(W,{width:window.innerWidth/u.scale,height:window.innerHeight/u.scale,fill:v[s.style].stageBackground,id:"background"}),r(at,{scale:u.scale,gridSize:u.data.gridSize,area:u.data.area*4,style:v[s.style]}),r(ze,{features:t==null?void 0:t.poly,lines:t==null?void 0:t.intersections})]}),k(P,{children:[r(W,{x:0,y:0,opacity:.5,width:Math.max(...R.map(e=>e.width))+30,height:R.map(e=>e.height).reduce((e,l)=>e+l,100),fill:"gray",cornerRadius:10}),r(H,{text:"Toolbox",fontSize:40,x:10,y:10}),R.map((e,l)=>(T+=10,e.y=T,e.x=10,T+=e.height,r(je,{shapeProps:e,draggable:!1,onClick:g=>{a([...c,Be(e)])}},e.id)))]}),r(P,{children:r(H,{text:"Bin",fontSize:50,x:10,y:T+100})}),k(P,{onDragEnd:z,onClick:z,onDragStart:z,children:[c.map((e,l)=>r(je,{shapeProps:e,isSelected:e.id===i,onSelect:()=>{x(e.id)},onChange:g=>{const h=c.slice();h[l]=g,a(h)}},l+"r")),r(W,{x:0,y:T+100,opacity:.5,width:Math.max(...R.map(e=>e.width))+30,height:Math.max(...R.map(e=>e.width))+30,fill:"red",id:"deletebox",cornerRadius:10})]})]},"edit")})]})})};function ft(){return Z.exports.useState(0),r("div",{className:"App",children:r(ut,{})})}et.render(r(w.StrictMode,{children:r(ft,{})}),document.getElementById("root"));
