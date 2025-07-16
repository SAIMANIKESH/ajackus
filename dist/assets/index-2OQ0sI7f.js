(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const t of n)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function m(n){const t={};return n.integrity&&(t.integrity=n.integrity),n.referrerPolicy&&(t.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?t.credentials="include":n.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(n){if(n.ep)return;n.ep=!0;const t=m(n);fetch(n.href,t)}})();const j="modulepreload",k=function(r){return"/ajackus/"+r},D={},M=function(i,m,c){let n=Promise.resolve();if(m&&m.length>0){let v=function(f){return Promise.all(f.map(y=>Promise.resolve(y).then(o=>({status:"fulfilled",value:o}),o=>({status:"rejected",reason:o}))))};var s=v;document.getElementsByTagName("link");const p=document.querySelector("meta[property=csp-nonce]"),e=p?.nonce||p?.getAttribute("nonce");n=v(m.map(f=>{if(f=k(f),f in D)return;D[f]=!0;const y=f.endsWith(".css"),o=y?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${f}"]${o}`))return;const l=document.createElement("link");if(l.rel=y?"stylesheet":j,y||(l.as="script"),l.crossOrigin="",l.href=f,e&&l.setAttribute("nonce",e),document.head.appendChild(l),y)return new Promise((a,d)=>{l.addEventListener("load",a),l.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${f}`)))})}))}function t(p){const e=new Event("vite:preloadError",{cancelable:!0});if(e.payload=p,window.dispatchEvent(e),!e.defaultPrevented)throw p}return n.then(p=>{for(const e of p||[])e.status==="rejected"&&t(e.reason);return i().catch(t)})},x=["10","25","50","100","All"],A=[{value:"firstName",name:"First Name"},{value:"lastName",name:"Last Name"},{value:"email",name:"Email"}],u=[{id:"1",firstName:"Aarav",lastName:"Mehta",role:"Frontend Developer",department:"Engineering",email:"aarav.mehta@ajackus.com"},{id:"2",firstName:"Riya",lastName:"Shah",role:"Product Designer",department:"Design",email:"riya.shah@ajackus.com"},{id:"3",firstName:"Karan",lastName:"Joshi",role:"Backend Engineer",department:"Engineering",email:"karan.joshi@ajackus.com"},{id:"4",firstName:"Sneha",lastName:"Patel",role:"Project Manager",department:"Product Management",email:"sneha.patel@ajackus.com"}],P=["Engineering","Design","Product Management","Sales","Marketing"],F=["Frontend Developer","Backend Engineer","Product Designer","Project Manager","Sales Executive","Marketing Specialist","Data Analyst","HR Manager"],O=Object.freeze(Object.defineProperty({__proto__:null,count:x,departments:P,employees:u,roles:F,sortBy:A},Symbol.toStringTag,{value:"Module"}));function R(r){const{id:i,firstName:m,lastName:c,email:n,department:t,role:s}=r,p=document.createElement("div");p.innerHTML=`
    <div id="${i}" class="employee-card">
      <h2>${m} ${c}</h2>
      
      <p> <strong>Email: </strong> ${n}</p>
      <p> <strong>Department: </strong> ${t}</p>
      <p> <strong>Role: </strong> ${s}</p>

      <div class="button-container">
        <button type='button' class='editBtn'>Edit</button>
        <button type='button' class='delBtn'>Delete</button>
      </div>
    </div>
  `;const e=p.firstElementChild;return e.querySelector(".editBtn").onclick=()=>window.editEmployee(r),e.querySelector(".delBtn").onclick=()=>window.showDeletePopup(i),e}function T(r){r.innerHTML=`
    <div class="header-container">
      <div class="flex-center gap-2">
        <img src="logo.jpg" alt="logo" />
        <h1>Employee Directory</h1>
      </div>
      <input type="search" id="headerSearch" placeholder="Search by name or email" />
      <button id="filterBtn">Filter</button>
    </div>

    <div id="filterPopup" class="hidden">
      <h2>Filter Employees</h2>
      <label> First Name
        <input type="text" id="filterFirstName" placeholder="e.g. John" />
      </label>

      <label> Department
        <select id="filterDepartment">
          <option value="">All</option>
          ${P.map(s=>`<option value="${s}">${s}</option>`).join("")}
        </select>
      </label>

      <label class="!mb-5"> Role
        <select id="filterRole">
          <option value="">All</option>
          ${F.map(s=>`<option value="${s}">${s}</option>`).join("")}
        </select>
      </label>

      <div class="flex justify-end gap-3 font-normal">
        <button id="clearFilter" class="bg-gray-100 hover:bg-gray-200">Reset</button>
        <button id="applyFilter" class="bg-blue-100 hover:bg-blue-200">Apply</button>
      </div>
    </div>
  `;const i=r.querySelector("#headerSearch"),m=r.querySelector("#filterBtn"),c=r.querySelector("#filterPopup");m?.addEventListener("click",()=>c.classList.toggle("hidden")),document.addEventListener("click",s=>{!c.contains(s.target)&&!m.contains(s.target)&&c.classList.add("hidden")}),i?.addEventListener("input",()=>window.applyAllFilters?.());const n=r.querySelector("#applyFilter"),t=r.querySelector("#clearFilter");n.addEventListener("click",()=>{c.classList.add("hidden"),window.applyAllFilters?.()}),t.addEventListener("click",()=>{r.querySelector("#filterFirstName").value="",r.querySelector("#filterDepartment").value="",r.querySelector("#filterRole").value="",window.applyAllFilters?.(),c.classList.add("hidden")})}const I=JSON.parse(localStorage.getItem("employees"));I?.length&&u.splice(0,u.length,...I);function S(){const r=document.getElementById("headerSearch")?.value.trim().toLowerCase(),i=document.getElementById("filterFirstName")?.value.trim().toLowerCase(),m=document.getElementById("filterDepartment")?.value,c=document.getElementById("filterRole")?.value,n=document.getElementById("sortBy")?.value,t=document.getElementById("showCount")?.value;let s=u.filter(e=>(!i||e.firstName.toLowerCase().includes(i))&&(!m||e.department===m)&&(!c||e.role===c)&&(!r||e.firstName.toLowerCase().includes(r)||e.lastName.toLowerCase().includes(r)||e.email.toLowerCase().includes(r)));n&&s.sort((e,v)=>e[n].localeCompare(v[n]));const p=t==="All"?s:s.slice(0,parseInt(t));window.updateGrid?.(p)}let _=[...u];const H=new Date().getFullYear();function L(r=_){const i=document.getElementById("app");i.innerHTML=`
    <div class="dashboard-container">
      <header>
        <div id="headerContainer" class="w-full"></div>
      </header>

      <main>
        <div class="sorting-container">
          <div class="flex flex-wrap gap-5">
            <label>Show:
              <select id="showCount">
                ${x.map(o=>`<option value="${o}">${o}</option>`).join("")}
              </select>
            </label>

            <label>Sort By:
              <select id="sortBy">
                <option value="">None</option>
                ${A.map(o=>`<option value="${o.value}">${o.name}</option>`).join("")}
              </select>
            </label>
          </div>

          <button id="addEmployeeBtn">Add Employee</button>
        </div>

        <div id="employeeGrid"></div>
      </main>

      <footer>
        <p>© ${H} Employee Directory App. All rights reserved.</p>
      </footer>

      <div id="addEmployeePopup" class="hidden">
        <div class="popup-content">
          <h2 class="formText"></h2>

          <form id="addEmployeeForm" class="space-y-3">
            <label> First Name
              <input type="text" name="firstName" placeholder="e.g. John" class="setFocus" required />
            </label>

            <label> Last Name
              <input type="text" name="lastName" placeholder="e.g. Doe" required />
            </label>

            <label> Email
              <input type="email" name="email" placeholder="e.g. john.doe@ajackus.com" required />
            </label>

            <label> Department
              <select name="department" required>
                <option value="">Select</option>
              </select>
            </label>

            <label> Role
              <select name="role" required>
                <option value="">Select</option>
              </select>
            </label>

            <div class="flex justify-end gap-3 pt-2">
              <button type="button" id="cancelAddEmployee" class="bg-gray-100 hover:bg-gray-200">Cancel</button>
              <button type="submit" class="addButton bg-blue-100 hover:bg-blue-200"></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,T(document.getElementById("headerContainer"));const m=document.getElementById("employeeGrid"),c=document.getElementById("showCount"),n=document.getElementById("sortBy"),t=document.getElementById("addEmployeePopup"),s=document.getElementById("addEmployeeBtn"),p=document.getElementById("cancelAddEmployee"),e=document.getElementById("addEmployeeForm"),v=e.elements.department,f=e.elements.role;M(async()=>{const{departments:o,roles:l}=await Promise.resolve().then(()=>O);return{departments:o,roles:l}},void 0).then(({departments:o,roles:l})=>{o.forEach(a=>{const d=document.createElement("option");d.value=a,d.textContent=a,v.appendChild(d)}),l.forEach(a=>{const d=document.createElement("option");d.value=a,d.textContent=a,f.appendChild(d)})});function y(o){m.innerHTML="";const l=c.value;(l==="All"?o:o.slice(0,parseInt(l))).forEach(d=>m.appendChild(R(d)))}c.addEventListener("change",()=>S()),n.addEventListener("change",()=>S()),t.addEventListener("click",o=>{o.target===t&&(t.classList.add("hidden"),e.reset())}),s.addEventListener("click",()=>{i.querySelector(".formText").textContent="Add Employee",i.querySelector(".addButton").textContent="Add",t.classList.remove("hidden"),i.querySelector(".setFocus").focus()}),p.addEventListener("click",()=>{t.classList.add("hidden"),e.reset()}),e.addEventListener("submit",o=>{o.preventDefault();const l=Object.fromEntries(new FormData(e).entries()),a=l.firstName.trim().replace(/\b\w/g,g=>g.toUpperCase()),d=l.lastName.trim().replace(/\b\w/g,g=>g.toUpperCase()),h=l.email.trim().toLowerCase(),E=l.department,b=l.role,B=/^[A-Za-z\s]+$/,q=/@.*\.com$/,$=/[A-Za-z]/;if(!a||!B.test(a)){alert("⚠️ First name must only contain letters.");return}if(!d||!B.test(d)){alert("⚠️ Last name must only contain letters.");return}if(!q.test(h)||!$.test(h)){alert("⚠️ Email must include '@', end with .com, and contain at least one letter.");return}const w=e.dataset.editId||null,N={id:w||String(parseInt(r[r.length-1]?.id||0)+1),firstName:a,lastName:d,email:h,department:E,role:b},C=u.findIndex(g=>g.id===w);C!==-1?u[C]=N:u.push(N),localStorage.setItem("employees",JSON.stringify(u)),e.dataset.editId="",e.reset(),t.classList.add("hidden"),L(u)}),y(r),window.showDeletePopup=o=>{const l=u.findIndex(a=>a.id===o);if(l!==-1){const a=document.createElement("div");a.innerHTML=`
        <div id="confirmBox" class="confirm-box">
          <div class="bg-white p-5 rounded-md shadow-lg max-w-md">
            <p>Are you sure you want to delete this employee?</p>

            <div class="flex justify-around mt-4">
              <button id="cancelDelete" class="btn">No</button>
              <button id="confirmDelete" class="btn">Yes</button>
            </div>
          </div>
        </div>
      `,document.body.appendChild(a);const d=document.getElementById("confirmBox");d.addEventListener("click",h=>{h.target===d&&a.remove()}),a.querySelector("#cancelDelete").onclick=()=>a.remove(),a.querySelector("#confirmDelete").onclick=()=>{u.splice(l,1),localStorage.setItem("employees",JSON.stringify(u)),L(u),a.remove()}}},window.editEmployee=o=>{const{id:l,firstName:a,lastName:d,email:h,department:E,role:b}=o;i.querySelector(".formText").textContent="Edit Employee",i.querySelector(".addButton").textContent="Save",e.elements.firstName.value=a,e.elements.lastName.value=d,e.elements.email.value=h,e.elements.department.value=E,e.elements.role.value=b,e.dataset.editId=l,t.classList.remove("hidden")},window.employees=u,window.updateGrid=y,window.applyAllFilters=S}const J=document.getElementById("app");document.addEventListener("DOMContentLoaded",()=>{J&&L()});
