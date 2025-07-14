(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const t of n)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function c(n){const t={};return n.integrity&&(t.integrity=n.integrity),n.referrerPolicy&&(t.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?t.credentials="include":n.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(n){if(n.ep)return;n.ep=!0;const t=c(n);fetch(n.href,t)}})();const P="modulepreload",F=function(r){return"/ajackus/"+r},B={},A=function(i,c,s){let n=Promise.resolve();if(c&&c.length>0){let y=function(f){return Promise.all(f.map(v=>Promise.resolve(v).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};var a=y;document.getElementsByTagName("link");const p=document.querySelector("meta[property=csp-nonce]"),e=p?.nonce||p?.getAttribute("nonce");n=y(c.map(f=>{if(f=F(f),f in B)return;B[f]=!0;const v=f.endsWith(".css"),h=v?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${f}"]${h}`))return;const o=document.createElement("link");if(o.rel=v?"stylesheet":P,v||(o.as="script"),o.crossOrigin="",o.href=f,e&&o.setAttribute("nonce",e),document.head.appendChild(o),v)return new Promise((m,l)=>{o.addEventListener("load",m),o.addEventListener("error",()=>l(new Error(`Unable to preload CSS for ${f}`)))})}))}function t(p){const e=new Event("vite:preloadError",{cancelable:!0});if(e.payload=p,window.dispatchEvent(e),!e.defaultPrevented)throw p}return n.then(p=>{for(const e of p||[])e.status==="rejected"&&t(e.reason);return i().catch(t)})},N=["10","25","50","100","All"],I=[{value:"firstName",name:"First Name"},{value:"lastName",name:"Last Name"},{value:"email",name:"Email"}],u=[{id:crypto.randomUUID(),firstName:"Aarav",lastName:"Mehta",role:"Frontend Developer",department:"Engineering",email:"aarav.mehta@ajackus.com"},{id:crypto.randomUUID(),firstName:"Riya",lastName:"Shah",role:"Product Designer",department:"Design",email:"riya.shah@ajackus.com"},{id:crypto.randomUUID(),firstName:"Karan",lastName:"Joshi",role:"Backend Engineer",department:"Engineering",email:"karan.joshi@ajackus.com"},{id:crypto.randomUUID(),firstName:"Sneha",lastName:"Patel",role:"Project Manager",department:"Product Management",email:"sneha.patel@ajackus.com"}],D=["Engineering","Design","Product Management","Sales","Marketing"],C=["Frontend Developer","Backend Engineer","Product Designer","Project Manager","Sales Executive","Marketing Specialist","Data Analyst","HR Manager"],q=Object.freeze(Object.defineProperty({__proto__:null,count:N,departments:D,employees:u,roles:C,sortBy:I},Symbol.toStringTag,{value:"Module"}));function $(r){const{id:i,firstName:c,lastName:s,email:n,department:t,role:a}=r,p=document.createElement("div");p.innerHTML=`
    <div id="${i}" class="employee-card">
      <h2>${c} ${s}</h2>
      
      <p> <strong>Email: </strong> ${n}</p>
      <p> <strong>Department: </strong> ${t}</p>
      <p> <strong>Role: </strong> ${a}</p>

      <div class="button-container">
        <button type='button' class='editBtn'>Edit</button>
        <button type='button' class='delBtn'>Delete</button>
      </div>
    </div>
  `;const e=p.firstElementChild;return e.querySelector(".editBtn").onclick=()=>window.editEmployee(r),e.querySelector(".delBtn").onclick=()=>window.showDeletePopup(i),e}function j(r){r.innerHTML=`
    <div class="header-container">
      <h1>Employee Directory</h1>
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
          ${D.map(a=>`<option value="${a}">${a}</option>`).join("")}
        </select>
      </label>

      <label class="!mb-5"> Role
        <select id="filterRole">
          <option value="">All</option>
          ${C.map(a=>`<option value="${a}">${a}</option>`).join("")}
        </select>
      </label>

      <div class="flex justify-end gap-3 font-normal">
        <button id="clearFilter" class="bg-gray-100 hover:bg-gray-200">Reset</button>
        <button id="applyFilter" class="bg-blue-100 hover:bg-blue-200">Apply</button>
      </div>
    </div>
  `;const i=r.querySelector("#headerSearch"),c=r.querySelector("#filterBtn"),s=r.querySelector("#filterPopup");c?.addEventListener("click",()=>s.classList.toggle("hidden")),document.addEventListener("click",a=>{!s.contains(a.target)&&!c.contains(a.target)&&s.classList.add("hidden")}),i?.addEventListener("input",()=>window.applyAllFilters?.());const n=r.querySelector("#applyFilter"),t=r.querySelector("#clearFilter");n.addEventListener("click",()=>{s.classList.add("hidden"),window.applyAllFilters?.()}),t.addEventListener("click",()=>{r.querySelector("#filterFirstName").value="",r.querySelector("#filterDepartment").value="",r.querySelector("#filterRole").value="",window.applyAllFilters?.(),s.classList.add("hidden")})}const b=JSON.parse(localStorage.getItem("filters")),L=JSON.parse(localStorage.getItem("employees"));L?.length&&u.splice(0,u.length,...L);function w(){const r=document.getElementById("headerSearch")?.value.trim().toLowerCase(),i=document.getElementById("filterFirstName")?.value.trim().toLowerCase(),c=document.getElementById("filterDepartment")?.value,s=document.getElementById("filterRole")?.value,n=document.getElementById("sortBy")?.value,t=document.getElementById("showCount")?.value;localStorage.setItem("filters",JSON.stringify({search:r,first:i,dep:c,role:s,sortBy:n,show:t}));let a=u.filter(e=>(!i||e.firstName.toLowerCase().includes(i))&&(!c||e.department===c)&&(!s||e.role===s)&&(!r||e.firstName.toLowerCase().includes(r)||e.lastName.toLowerCase().includes(r)||e.email.toLowerCase().includes(r)));n&&a.sort((e,y)=>e[n].localeCompare(y[n]));const p=t==="All"?a:a.slice(0,parseInt(t));window.updateGrid?.(p)}let k=[...u];const M=new Date().getFullYear();function S(r=k){const i=document.getElementById("app");i.innerHTML=`
    <div class="dashboard-container">
      <header>
        <div id="headerContainer" class="w-full"></div>
      </header>

      <main>
        <div class="sorting-container">
          <div class="flex flex-wrap gap-5">
            <label>Show:
              <select id="showCount">
                ${N.map(o=>`<option value="${o}">${o}</option>`).join("")}
              </select>
            </label>

            <label>Sort By:
              <select id="sortBy">
                <option value="">None</option>
                ${I.map(o=>`<option value="${o.value}">${o.name}</option>`).join("")}
              </select>
            </label>

          </div>

          <button id="addEmployeeBtn">Add Employee</button>
        </div>

        <div id="employeeGrid"></div>
      </main>

      <footer>
        <p>© ${M} Employee Directory App. All rights reserved.</p>
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
  `,j(document.getElementById("headerContainer"));const c=document.getElementById("employeeGrid"),s=document.getElementById("showCount"),n=document.getElementById("sortBy"),t=document.getElementById("addEmployeePopup"),a=document.getElementById("addEmployeeBtn"),p=document.getElementById("cancelAddEmployee"),e=document.getElementById("addEmployeeForm"),y=document.querySelector(".setFocus"),f=e.elements.department,v=e.elements.role;A(async()=>{const{departments:o,roles:m}=await Promise.resolve().then(()=>q);return{departments:o,roles:m}},void 0).then(({departments:o,roles:m})=>{o.forEach(l=>{const d=document.createElement("option");d.value=l,d.textContent=l,f.appendChild(d)}),m.forEach(l=>{const d=document.createElement("option");d.value=l,d.textContent=l,v.appendChild(d)})});function h(o){c.innerHTML="";const m=s.value;(m==="All"?o:o.slice(0,parseInt(m))).forEach(d=>c.appendChild($(d)))}s.addEventListener("change",()=>w()),n.addEventListener("change",()=>w()),t.addEventListener("click",o=>{o.target===t&&(t.classList.add("hidden"),e.reset())}),a.addEventListener("click",()=>{i.querySelector(".formText").textContent="Add Employee",i.querySelector(".addButton").textContent="Add",t.classList.remove("hidden"),y&&y.focus()}),p.addEventListener("click",()=>{t.classList.add("hidden"),e.reset()}),e.addEventListener("submit",o=>{o.preventDefault();const m=Object.fromEntries(new FormData(e).entries()),l=e.dataset.editId||null,d={id:l||crypto.randomUUID(),...m},g=u.findIndex(E=>E.id===l);console.log(g,l,d),g!==-1?u[g]=d:u.push(d),localStorage.setItem("employees",JSON.stringify(u)),e.dataset.editId="",e.reset(),t.classList.add("hidden"),S(u)}),h(r),window.showDeletePopup=o=>{const m=u.findIndex(l=>l.id===o);if(m!==-1){const l=document.createElement("div");l.innerHTML=`
        <div id="confirmBox" class="confirm-box">
          <div class="bg-white p-5 rounded-md shadow-lg max-w-md">
            <p>Are you sure you want to delete this employee?</p>

            <div class="flex justify-around mt-4">
              <button id="cancelDelete" class="btn">No</button>
              <button id="confirmDelete" class="btn">Yes</button>
            </div>
          </div>
        </div>
      `,document.body.appendChild(l);const d=document.getElementById("confirmBox");d.addEventListener("click",g=>{g.target===d&&l.remove()}),l.querySelector("#cancelDelete").onclick=()=>l.remove(),l.querySelector("#confirmDelete").onclick=()=>{u.splice(m,1),localStorage.setItem("employees",JSON.stringify(u)),S(u),l.remove()}}},window.editEmployee=o=>{const{id:m,firstName:l,lastName:d,email:g,department:E,role:x}=o;i.querySelector(".formText").textContent="Edit Employee",i.querySelector(".addButton").textContent="Save",e.elements.firstName.value=l,e.elements.lastName.value=d,e.elements.email.value=g,e.elements.department.value=E,e.elements.role.value=x,e.dataset.editId=m,t.classList.remove("hidden"),y&&y.focus()},b&&(document.getElementById("sortBy").value=b.sortBy||"",document.getElementById("showCount").value=b.show||"10"),window.employees=u,window.updateGrid=h,window.applyAllFilters=w}const O=document.getElementById("app");document.addEventListener("DOMContentLoaded",()=>{O&&(S(),applyAllFilters())});
