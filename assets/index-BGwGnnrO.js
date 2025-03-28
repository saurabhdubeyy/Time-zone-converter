(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function e(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=e(n);fetch(n.href,o)}})();const b=[{id:"UTC",name:"Coordinated Universal Time",abbreviation:"UTC",offset:0},{id:"GMT",name:"Greenwich Mean Time",abbreviation:"GMT",offset:0,city:"London"},{id:"EST",name:"Eastern Standard Time",abbreviation:"EST",offset:-5,city:"New York"},{id:"EDT",name:"Eastern Daylight Time",abbreviation:"EDT",offset:-4,city:"New York"},{id:"CST",name:"Central Standard Time",abbreviation:"CST",offset:-6,city:"Chicago"},{id:"CDT",name:"Central Daylight Time",abbreviation:"CDT",offset:-5,city:"Chicago"},{id:"MST",name:"Mountain Standard Time",abbreviation:"MST",offset:-7,city:"Denver"},{id:"MDT",name:"Mountain Daylight Time",abbreviation:"MDT",offset:-6,city:"Denver"},{id:"PST",name:"Pacific Standard Time",abbreviation:"PST",offset:-8,city:"Los Angeles"},{id:"PDT",name:"Pacific Daylight Time",abbreviation:"PDT",offset:-7,city:"Los Angeles"},{id:"CET",name:"Central European Time",abbreviation:"CET",offset:1,city:"Paris"},{id:"CEST",name:"Central European Summer Time",abbreviation:"CEST",offset:2,city:"Paris"},{id:"IST",name:"Indian Standard Time",abbreviation:"IST",offset:5.5,city:"Mumbai"},{id:"JST",name:"Japan Standard Time",abbreviation:"JST",offset:9,city:"Tokyo"},{id:"AEST",name:"Australian Eastern Standard Time",abbreviation:"AEST",offset:10,city:"Sydney"},{id:"AEDT",name:"Australian Eastern Daylight Time",abbreviation:"AEDT",offset:11,city:"Sydney"}];let d=[],v=null,r=null;function M(t,i=0){const e=t%12===0?12:t%12,s=t<12?"AM":"PM",n=i<10?`0${i}`:i;return`${e}:${n}${s}`}function $(t,i,e){let n=t*60+i+e.offset*60;n<0?n+=24*60:n>=24*60&&(n-=24*60);const o=Math.floor(n/60)%24,a=n%60;return{hour:o,minute:a}}function z(t,i=new Date){const e=i.getMonth();return t.city&&["New York","Chicago","Denver","Los Angeles","Paris","London"].includes(t.city)?e>2&&e<10:t.city&&["Sydney"].includes(t.city)?e<4||e>9:!1}function h(t,i=new Date){return z(t,i)?t.abbreviation==="EST"?b.find(e=>e.abbreviation==="EDT"):t.abbreviation==="CST"?b.find(e=>e.abbreviation==="CDT"):t.abbreviation==="MST"?b.find(e=>e.abbreviation==="MDT"):t.abbreviation==="PST"?b.find(e=>e.abbreviation==="PDT"):t.abbreviation==="CET"?b.find(e=>e.abbreviation==="CEST"):t.abbreviation==="AEST"?b.find(e=>e.abbreviation==="AEDT"):t:t}function y(){const t=document.getElementById("timezone-table");if(!t||!v)return;t.innerHTML="";const i=document.createElement("table");i.className="timezone-grid";const e=document.createElement("tr");e.innerHTML="<th>Time</th>";const s=r||new Date,n=[v,...d];n.forEach(o=>{const a=h(o,s);e.innerHTML+=`<th>${a.abbreviation} (${a.city||a.name})</th>`}),i.appendChild(e);for(let o=0;o<24;o++){const a=document.createElement("tr");a.id=`hour-${o}`,a.className="hour-row";const l=M(o);a.innerHTML=`<td class="time-cell">${l}</td>`,n.forEach((u,c)=>{const g=h(u,s).offset-h(v,s).offset,T=(o+g+24)%24,f=M(T),p=c===0?"source-time-cell":"time-cell";a.innerHTML+=`<td class="${p}">${f}</td>`}),a.addEventListener("mouseover",()=>I(o)),a.addEventListener("mouseout",()=>H()),i.appendChild(a)}t.appendChild(i),A()}function E(t,i,e){const s=document.getElementById("timezone-table");if(!s||!v)return;s.innerHTML="";const n=document.createElement("table");n.className="timezone-grid";const o=document.createElement("div");o.className="custom-time-info",o.innerHTML=`<p>Showing conversions for: ${t.toLocaleDateString()} at ${M(i,e)}</p>`,s.appendChild(o);const a=document.createElement("tr");a.innerHTML="<th>Timezone</th><th>Time</th>",n.appendChild(a);const u=h(v,t).offset;let c=i-u,m=e;c<0?c+=24:c>=24&&(c-=24),[v,...d].forEach((T,f)=>{const p=document.createElement("tr");p.className=f===0?"source-row":"";const L=h(T,t),{hour:D,minute:C}=$(c,m,L),w=M(D,C);p.innerHTML=`
      <td class="timezone-name">${L.abbreviation} (${L.city||L.name})</td>
      <td class="time-cell">${w}</td>
    `,n.appendChild(p)}),s.appendChild(n)}function I(t){document.querySelectorAll(".hour-row").forEach(s=>{s.classList.add("highlighted")});const e=document.getElementById(`hour-${t}`);e&&e.classList.add("active-highlight")}function H(){document.querySelectorAll(".hour-row").forEach(i=>{i.classList.remove("highlighted"),i.classList.remove("active-highlight")})}function A(){let t=!1,i=null,e=null;const s=document.querySelectorAll(".hour-row");s.forEach((o,a)=>{o.addEventListener("mousedown",()=>{t=!0,i=a,e=a,n()}),o.addEventListener("mousemove",()=>{t&&(e=a,n())})}),document.addEventListener("mouseup",()=>{t=!1});function n(){if(i===null||e===null)return;s.forEach(l=>l.classList.remove("selected"));const o=Math.min(i,e),a=Math.max(i,e);for(let l=o;l<=a;l++)s[l].classList.add("selected");B(o,a)}}function B(t,i){const e=document.createElement("div");e.className="selection-info",e.innerHTML="<h3>Selected Time Period</h3>";const s=r||new Date;[v,...d].forEach(l=>{const u=h(l,s),c=u.offset-h(v,s).offset,m=(t+c+24)%24,g=(i+c+24)%24,T=M(m),f=M(g);e.innerHTML+=`<p><strong>${u.abbreviation} (${u.city||u.name}):</strong> ${T} - ${f}</p>`});const o=document.querySelector(".selection-info");o&&o.remove();const a=document.getElementById("timezone-table");a&&a.appendChild(e)}function k(){document.body.classList.toggle("dark-mode");const t=document.body.classList.contains("dark-mode");localStorage.setItem("darkMode",t?"enabled":"disabled")}function P(){const t=document.getElementById("custom-date"),i=document.getElementById("custom-time");if(!t.value||!i.value){alert("Please select both date and time");return}const e=t.value,s=i.value,[n,o]=s.split(":").map(Number);r=new Date(`${e}T${s}`),E(r,n,o)}function N(){localStorage.getItem("darkMode")==="enabled"&&document.body.classList.add("dark-mode")}function Z(){const t=document.getElementById("source-timezone"),i=document.getElementById("add-timezone-select");!t||!i||(t.innerHTML="",i.innerHTML="",b.forEach(e=>{const s=document.createElement("option");s.value=e.id,s.textContent=`${e.abbreviation} - ${e.name} ${e.city?`(${e.city})`:""}`,t.appendChild(s);const n=document.createElement("option");n.value=e.id,n.textContent=`${e.abbreviation} - ${e.name} ${e.city?`(${e.city})`:""}`,i.appendChild(n)}))}function S(){const t=document.getElementById("timezone-list");t&&(t.innerHTML="",d.forEach((i,e)=>{const s=document.createElement("div");s.className="timezone-item";const o=h(i,r||new Date);s.innerHTML=`
      <span>${o.abbreviation} - ${o.name} ${o.city?`(${o.city})`:""}</span>
      <div class="timezone-controls">
        <button class="move-up" ${e===0?"disabled":""}>↑</button>
        <button class="move-down" ${e===d.length-1?"disabled":""}>↓</button>
        <button class="remove-timezone">×</button>
      </div>
    `;const a=s.querySelector(".move-up"),l=s.querySelector(".move-down"),u=s.querySelector(".remove-timezone");a&&a.addEventListener("click",()=>{if(e>0)if([d[e-1],d[e]]=[d[e],d[e-1]],S(),r){const c=r.getHours(),m=r.getMinutes();E(r,c,m)}else y()}),l&&l.addEventListener("click",()=>{if(e<d.length-1)if([d[e],d[e+1]]=[d[e+1],d[e]],S(),r){const c=r.getHours(),m=r.getMinutes();E(r,c,m)}else y()}),u&&u.addEventListener("click",()=>{if(d.splice(e,1),S(),r){const c=r.getHours(),m=r.getMinutes();E(r,c,m)}else y()}),t.appendChild(s)}))}function O(){if(!v)return;const t=r||new Date,i=h(v,t).offset;if(d.sort((e,s)=>{const n=h(e,t).offset-i,o=h(s,t).offset-i;return n-o}),S(),r){const e=r.getHours(),s=r.getMinutes();E(r,e,s)}else y()}function j(){N(),Z(),v=b[0];const t=new Date,i=t.toISOString().split("T")[0],e=`${t.getHours().toString().padStart(2,"0")}:${t.getMinutes().toString().padStart(2,"0")}`,s=document.getElementById("custom-date"),n=document.getElementById("custom-time");s&&(s.value=i),n&&(n.value=e);const o=document.getElementById("source-timezone"),a=document.getElementById("add-timezone-select"),l=document.getElementById("add-timezone-btn"),u=document.getElementById("sort-btn"),c=document.getElementById("dark-mode-toggle"),m=document.getElementById("apply-custom-time");o&&o.addEventListener("change",()=>{const g=o.value;if(v=b.find(T=>T.id===g)||null,r){const T=r.getHours(),f=r.getMinutes();E(r,T,f)}else y()}),l&&a&&l.addEventListener("click",()=>{const g=a.value,T=b.find(f=>f.id===g);if(T&&!d.some(f=>f.id===g))if(d.push(T),S(),r){const f=r.getHours(),p=r.getMinutes();E(r,f,p)}else y()}),u&&u.addEventListener("click",O),c&&c.addEventListener("click",k),m&&m.addEventListener("click",P),b.length>1&&(d=[b[1]],S()),y()}document.querySelector("#app").innerHTML=`
  <div class="container">
    <header>
      <h1>Time Zone Converter</h1>
      <button id="dark-mode-toggle" class="theme-toggle">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>
    </header>
    
    <div class="custom-time-section">
      <h3>Custom Date & Time</h3>
      <div class="custom-time-inputs">
        <div class="date-input">
          <label for="custom-date">Date:</label>
          <input type="date" id="custom-date">
        </div>
        <div class="time-input">
          <label for="custom-time">Time:</label>
          <input type="time" id="custom-time">
        </div>
        <button id="apply-custom-time">Apply</button>
      </div>
    </div>
    
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
`;j();
