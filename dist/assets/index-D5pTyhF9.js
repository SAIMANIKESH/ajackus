(function(){const m=document.createElement("link").relList;if(m&&m.supports&&m.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))y(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const v of r.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&y(v)}).observe(document,{childList:!0,subtree:!0});function u(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function y(o){if(o.ep)return;o.ep=!0;const r=u(o);fetch(o.href,r)}})();const I="modulepreload",x=function(a){return"/ajackus/"+a},S={},C=function(m,u,y){let o=Promise.resolve();if(u&&u.length>0){let p=function(i){return Promise.all(i.map(f=>Promise.resolve(f).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};var v=p;document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),e=l?.nonce||l?.getAttribute("nonce");o=p(u.map(i=>{if(i=x(i),i in S)return;S[i]=!0;const f=i.endsWith(".css"),h=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${i}"]${h}`))return;const t=document.createElement("link");if(t.rel=f?"stylesheet":I,f||(t.as="script"),t.crossOrigin="",t.href=i,e&&t.setAttribute("nonce",e),document.head.appendChild(t),f)return new Promise((d,n)=>{t.addEventListener("load",d),t.addEventListener("error",()=>n(new Error(`Unable to preload CSS for ${i}`)))})}))}function r(l){const e=new Event("vite:preloadError",{cancelable:!0});if(e.payload=l,window.dispatchEvent(e),!e.defaultPrevented)throw l}return o.then(l=>{for(const e of l||[])e.status==="rejected"&&r(e.reason);return m().catch(r)})},L=["10","25","50","100","All"],c=[{id:crypto.randomUUID(),firstName:"Aarav",lastName:"Mehta",role:"Frontend Developer",department:"Engineering",email:"aarav.mehta@ajackus.com"},{id:crypto.randomUUID(),firstName:"Riya",lastName:"Shah",role:"Product Designer",department:"Design",email:"riya.shah@ajackus.com"},{id:crypto.randomUUID(),firstName:"Karan",lastName:"Joshi",role:"Backend Engineer",department:"Engineering",email:"karan.joshi@ajackus.com"},{id:crypto.randomUUID(),firstName:"Sneha",lastName:"Patel",role:"Project Manager",department:"Product Management",email:"sneha.patel@ajackus.com"}],N=["Engineering","Design","Product Management","Sales","Marketing"],B=["Frontend Developer","Backend Engineer","Product Designer","Project Manager","Sales Executive","Marketing Specialist","Data Analyst","HR Manager"],P=Object.freeze(Object.defineProperty({__proto__:null,count:L,departments:N,employees:c,roles:B},Symbol.toStringTag,{value:"Module"}));function q(a){const{id:m,firstName:u,lastName:y,email:o,department:r,role:v}=a,l=document.createElement("div");l.innerHTML=`
    <div id="${m}" class="employee-card">
      <h2>${u} ${y}</h2>
      
      <p> <strong>Email: </strong> ${o}</p>
      <p> <strong>Department: </strong> ${r}</p>
      <p> <strong>Role: </strong> ${v}</p>

      <div class="button-container">
        <button type='button' class='editBtn'>Edit</button>
        <button type='button' class='delBtn'>Delete</button>
      </div>
    </div>
  `;const e=l.firstElementChild;return e.querySelector(".editBtn").onclick=()=>window.editEmployee(a),e.querySelector(".delBtn").onclick=()=>window.showDeletePopup(m),e}function k(a){a.innerHTML=`
    <div class="header-container">
      <h1>Employee Directory</h1>
      <input type="search" id="headerSearch" placeholder="Search by name or email..." autofocus />
      <button id="filterBtn">Filter</button>
    </div>

    <div id="filterPopup" class="hidden">
      <h2>Filter Employees</h2>
      <label> First Name
        <input type="text" id="filterFirstName" />
      </label>

      <label> Department
        <select id="filterDepartment">
          <option value="">All</option>
          ${N.map(l=>`<option value="${l}">${l}</option>`).join("")}
        </select>
      </label>

      <label class="!mb-5"> Role
        <select id="filterRole">
          <option value="">All</option>
          ${B.map(l=>`<option value="${l}">${l}</option>`).join("")}
        </select>
      </label>

      <div class="flex justify-end gap-3 font-normal">
        <button id="clearFilter" class="bg-gray-100 hover:bg-gray-200">Reset</button>
        <button id="applyFilter" class="bg-blue-100 hover:bg-blue-200">Apply</button>
      </div>
    </div>
  `;const m=a.querySelector("#headerSearch"),u=document.getElementById("showCount"),y=a.querySelector("#filterBtn"),o=a.querySelector("#filterPopup");y?.addEventListener("click",()=>{o.classList.toggle("hidden"),document.getElementById("filterFirstName").focus()}),document.addEventListener("click",l=>{!o.contains(l.target)&&!y.contains(l.target)&&o.classList.add("hidden")}),m?.addEventListener("input",l=>{const e=l.target.value.trim().toLowerCase(),p=c.filter(i=>i.firstName.toLowerCase().includes(e)||i.lastName.toLowerCase().includes(e)||i.email.toLowerCase().includes(e));window.updateGrid?.(p,u?.value||"All")});const r=a.querySelector("#applyFilter"),v=a.querySelector("#clearFilter");r.addEventListener("click",()=>{const l=a.querySelector("#filterFirstName").value.toLowerCase(),e=a.querySelector("#filterDepartment").value,p=a.querySelector("#filterRole").value,i=c.filter(f=>(!l||f.firstName.toLowerCase().includes(l))&&(!e||f.department===e)&&(!p||f.role===p));window.updateGrid?.(i,u?.value||"All"),o.classList.add("hidden")}),v.addEventListener("click",()=>{a.querySelector("#filterFirstName").value="",a.querySelector("#filterDepartment").value="",a.querySelector("#filterRole").value="",window.updateGrid?.(c,u?.value||"All"),o.classList.add("hidden")})}const w=JSON.parse(localStorage.getItem("employees"));w?.length&&c.splice(0,c.length,...w);let A=[...c],F=new Date().getFullYear();function E(a=A){const m=document.getElementById("app");m.innerHTML=`
    <div class="dashboard-container">
      <header>
        <div id="headerContainer" class="w-full"></div>
      </header>

      <main>
        <div class="sorting-container">
          <div class="flex flex-wrap gap-5">
            <label>Show:
              <select id="showCount">
                ${L.map(t=>`<option value="${t}">${t}</option>`).join("")}
              </select>
            </label>

            <label>Sort By:
              <select id="sortBy">
                <option value="">None</option>
                <option value="firstName">First Name</option>
                <option value="lastName">Last Name</option>
                <option value="email">Email</option>
              </select>
            </label>

          </div>

          <button id="addEmployeeBtn">Add Employee</button>
        </div>

        <div id="employeeGrid"></div>
      </main>

      <footer>
        <p>© ${F} Employee Directory App. All rights reserved.</p>
      </footer>

      <div id="addEmployeePopup" class="hidden">
        <div class="popup-content">
          <h2 class="formText"></h2>

          <form id="addEmployeeForm" class="space-y-3">
            <label> First Name
              <input type="text" name="firstName" class="setFocus" required />
            </label>

            <label> Last Name
              <input type="text" name="lastName" required />
            </label>

            <label> Email
              <input type="email" name="email" required />
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
  `,k(document.getElementById("headerContainer"));const u=document.getElementById("employeeGrid"),y=document.getElementById("showCount"),o=document.getElementById("sortBy"),r=document.getElementById("addEmployeePopup"),v=document.getElementById("addEmployeeBtn"),l=document.getElementById("cancelAddEmployee"),e=document.getElementById("addEmployeeForm"),p=document.querySelector(".setFocus"),i=e.elements.department,f=e.elements.role;C(async()=>{const{departments:t,roles:d}=await Promise.resolve().then(()=>P);return{departments:t,roles:d}},void 0).then(({departments:t,roles:d})=>{t.forEach(n=>{const s=document.createElement("option");s.value=n,s.textContent=n,i.appendChild(s)}),d.forEach(n=>{const s=document.createElement("option");s.value=n,s.textContent=n,f.appendChild(s)})});function h(t){u.innerHTML="";const d=y.value;(d==="All"?t:t.slice(0,parseInt(d))).forEach(s=>u.appendChild(q(s)))}y.addEventListener("change",()=>h(a)),o.addEventListener("change",()=>{const t=o.value;t&&a.sort((d,n)=>d[t].localeCompare(n[t])),h(a)}),r.addEventListener("click",t=>{t.target===r&&(r.classList.add("hidden"),e.reset())}),v.addEventListener("click",()=>{document.querySelector(".formText").textContent="Add Employee",document.querySelector(".addButton").textContent="Add",r.classList.remove("hidden"),p&&p.focus()}),l.addEventListener("click",()=>{r.classList.add("hidden"),e.reset()}),e.addEventListener("submit",t=>{t.preventDefault();const d=Object.fromEntries(new FormData(e).entries()),n=e.dataset.editId||null,s={id:n||crypto.randomUUID(),...d},g=c.findIndex(b=>b.id===n);console.log(g,n,s),g!==-1?c[g]=s:c.push(s),localStorage.setItem("employees",JSON.stringify(c)),e.dataset.editId="",e.reset(),r.classList.add("hidden"),E(c)}),h(a),window.showDeletePopup=t=>{const d=c.findIndex(n=>n.id===t);if(d!==-1){const n=document.createElement("div");n.innerHTML=`
        <div id="confirmBox" class="confirm-box">
          <div class="bg-white p-5 rounded-md shadow-lg max-w-md">
            <p>Are you sure you want to delete this employee?</p>

            <div class="flex justify-around mt-4">
              <button id="cancelDelete" class="btn">No</button>
              <button id="confirmDelete" class="btn">Yes</button>
            </div>
          </div>
        </div>
      `,document.body.appendChild(n);const s=document.getElementById("confirmBox");s.addEventListener("click",g=>{g.target===s&&n.remove()}),n.querySelector("#cancelDelete").onclick=()=>n.remove(),n.querySelector("#confirmDelete").onclick=()=>{c.splice(d,1),localStorage.setItem("employees",JSON.stringify(c)),E(c),n.remove()}}},window.editEmployee=t=>{const{id:d,firstName:n,lastName:s,email:g,department:b,role:D}=t;document.querySelector(".formText").textContent="Edit Employee",document.querySelector(".addButton").textContent="Save",e.elements.firstName.value=n,e.elements.lastName.value=s,e.elements.email.value=g,e.elements.department.value=b,e.elements.role.value=D,e.dataset.editId=d,r.classList.remove("hidden"),p&&p.focus()},window.employees=c,window.updateGrid=h}const j=document.getElementById("app");document.addEventListener("DOMContentLoaded",()=>{j&&E()});
