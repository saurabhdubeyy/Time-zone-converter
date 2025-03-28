(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function e(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(n){if(n.ep)return;n.ep=!0;const o=e(n);fetch(n.href,o)}})();const d=[{id:"UTC",name:"Coordinated Universal Time",abbreviation:"UTC",offset:0},{id:"GMT",name:"Greenwich Mean Time",abbreviation:"GMT",offset:0,city:"London"},{id:"EST",name:"Eastern Standard Time",abbreviation:"EST",offset:-5,city:"New York"},{id:"EDT",name:"Eastern Daylight Time",abbreviation:"EDT",offset:-4,city:"New York"},{id:"CST",name:"Central Standard Time",abbreviation:"CST",offset:-6,city:"Chicago"},{id:"CDT",name:"Central Daylight Time",abbreviation:"CDT",offset:-5,city:"Chicago"},{id:"MST",name:"Mountain Standard Time",abbreviation:"MST",offset:-7,city:"Denver"},{id:"MDT",name:"Mountain Daylight Time",abbreviation:"MDT",offset:-6,city:"Denver"},{id:"PST",name:"Pacific Standard Time",abbreviation:"PST",offset:-8,city:"Los Angeles"},{id:"PDT",name:"Pacific Daylight Time",abbreviation:"PDT",offset:-7,city:"Los Angeles"},{id:"CET",name:"Central European Time",abbreviation:"CET",offset:1,city:"Paris"},{id:"CEST",name:"Central European Summer Time",abbreviation:"CEST",offset:2,city:"Paris"},{id:"IST",name:"Indian Standard Time",abbreviation:"IST",offset:5.5,city:"Mumbai"},{id:"JST",name:"Japan Standard Time",abbreviation:"JST",offset:9,city:"Tokyo"},{id:"AEST",name:"Australian Eastern Standard Time",abbreviation:"AEST",offset:10,city:"Sydney"},{id:"AEDT",name:"Australian Eastern Daylight Time",abbreviation:"AEDT",offset:11,city:"Sydney"}];let a=[],l=null;function b(t){const i=t%12===0?12:t%12,e=t<12?"AM":"PM";return`${i}:00${e}`}function S(t){const e=new Date().getMonth();return t.city&&["New York","Chicago","Denver","Los Angeles","Paris","London"].includes(t.city)?e>2&&e<10:t.city&&["Sydney"].includes(t.city)?e<4||e>9:!1}function u(t){return S(t)?t.abbreviation==="EST"?d.find(i=>i.abbreviation==="EDT"):t.abbreviation==="CST"?d.find(i=>i.abbreviation==="CDT"):t.abbreviation==="MST"?d.find(i=>i.abbreviation==="MDT"):t.abbreviation==="PST"?d.find(i=>i.abbreviation==="PDT"):t.abbreviation==="CET"?d.find(i=>i.abbreviation==="CEST"):t.abbreviation==="AEST"?d.find(i=>i.abbreviation==="AEDT"):t:t}function m(){const t=document.getElementById("timezone-table");if(!t||!l)return;t.innerHTML="";const i=document.createElement("table");i.className="timezone-grid";const e=document.createElement("tr");e.innerHTML="<th>Time</th>";const r=[l,...a];r.forEach(n=>{const o=u(n);e.innerHTML+=`<th>${o.abbreviation} (${o.city||o.name})</th>`}),i.appendChild(e);for(let n=0;n<24;n++){const o=document.createElement("tr");o.id=`hour-${n}`,o.className="hour-row";const s=b(n);o.innerHTML=`<td class="time-cell">${s}</td>`,r.forEach((c,T)=>{const v=u(c).offset-u(l).offset,h=(n+v+24)%24,y=b(h),p=T===0?"source-time-cell":"time-cell";o.innerHTML+=`<td class="${p}">${y}</td>`}),o.addEventListener("mouseover",()=>g(n)),o.addEventListener("mouseout",()=>L()),i.appendChild(o)}t.appendChild(i),C()}function g(t){document.querySelectorAll(".hour-row").forEach(r=>{r.classList.add("highlighted")});const e=document.getElementById(`hour-${t}`);e&&e.classList.add("active-highlight")}function L(){document.querySelectorAll(".hour-row").forEach(i=>{i.classList.remove("highlighted"),i.classList.remove("active-highlight")})}function C(){let t=!1,i=null,e=null;const r=document.querySelectorAll(".hour-row");r.forEach((o,s)=>{o.addEventListener("mousedown",()=>{t=!0,i=s,e=s,n()}),o.addEventListener("mousemove",()=>{t&&(e=s,n())})}),document.addEventListener("mouseup",()=>{t=!1});function n(){if(i===null||e===null)return;r.forEach(c=>c.classList.remove("selected"));const o=Math.min(i,e),s=Math.max(i,e);for(let c=o;c<=s;c++)r[c].classList.add("selected");M(o,s)}}function M(t,i){const e=document.createElement("div");e.className="selection-info",e.innerHTML="<h3>Selected Time Period</h3>",[l,...a].forEach(s=>{const c=u(s),T=c.offset-u(l).offset,E=(t+T+24)%24,v=(i+T+24)%24,h=b(E),y=b(v);e.innerHTML+=`<p><strong>${c.abbreviation} (${c.city||c.name}):</strong> ${h} - ${y}</p>`});const n=document.querySelector(".selection-info");n&&n.remove();const o=document.getElementById("timezone-table");o&&o.appendChild(e)}function D(){const t=document.getElementById("source-timezone"),i=document.getElementById("add-timezone-select");!t||!i||(t.innerHTML="",i.innerHTML="",d.forEach(e=>{const r=document.createElement("option");r.value=e.id,r.textContent=`${e.abbreviation} - ${e.name} ${e.city?`(${e.city})`:""}`,t.appendChild(r);const n=document.createElement("option");n.value=e.id,n.textContent=`${e.abbreviation} - ${e.name} ${e.city?`(${e.city})`:""}`,i.appendChild(n)}))}function f(){const t=document.getElementById("timezone-list");t&&(t.innerHTML="",a.forEach((i,e)=>{const r=document.createElement("div");r.className="timezone-item";const n=u(i);r.innerHTML=`
      <span>${n.abbreviation} - ${n.name} ${n.city?`(${n.city})`:""}</span>
      <div class="timezone-controls">
        <button class="move-up" ${e===0?"disabled":""}>↑</button>
        <button class="move-down" ${e===a.length-1?"disabled":""}>↓</button>
        <button class="remove-timezone">×</button>
      </div>
    `;const o=r.querySelector(".move-up"),s=r.querySelector(".move-down"),c=r.querySelector(".remove-timezone");o&&o.addEventListener("click",()=>{e>0&&([a[e-1],a[e]]=[a[e],a[e-1]],f(),m())}),s&&s.addEventListener("click",()=>{e<a.length-1&&([a[e],a[e+1]]=[a[e+1],a[e]],f(),m())}),c&&c.addEventListener("click",()=>{a.splice(e,1),f(),m()}),t.appendChild(r)}))}function $(){if(!l)return;const t=u(l).offset;a.sort((i,e)=>{const r=u(i).offset-t,n=u(e).offset-t;return r-n}),f(),m()}function w(){D(),l=d[0];const t=document.getElementById("source-timezone"),i=document.getElementById("add-timezone-select"),e=document.getElementById("add-timezone-btn"),r=document.getElementById("sort-btn");t&&t.addEventListener("change",()=>{const n=t.value;l=d.find(o=>o.id===n)||null,m()}),e&&i&&e.addEventListener("click",()=>{const n=i.value,o=d.find(s=>s.id===n);o&&!a.some(s=>s.id===n)&&(a.push(o),f(),m())}),r&&r.addEventListener("click",$),d.length>1&&(a=[d[1]],f()),m()}document.querySelector("#app").innerHTML=`
  <div class="container">
    <h1>Time Zone Converter</h1>
    
    <div class="timezone-selector">
      <div class="source-timezone">
        <h3>Source Time Zone</h3>
        <select id="source-timezone"></select>
      </div>
      
      <div class="additional-timezones">
        <h3>Additional Time Zones</h3>
        <div class="timezone-list" id="timezone-list">
          <!-- Additional time zones will be added here -->
        </div>
        <div class="add-timezone">
          <select id="add-timezone-select"></select>
          <button id="add-timezone-btn">Add Time Zone</button>
        </div>
      </div>
    </div>
    
    <div class="timezone-display">
      <div class="sort-options">
        <button id="sort-btn">Sort by Offset</button>
      </div>
      <div class="timezone-table" id="timezone-table">
        <!-- Time zone table will be rendered here -->
      </div>
    </div>
  </div>
`;w();
