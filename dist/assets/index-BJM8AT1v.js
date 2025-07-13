(function(){const p=document.createElement("link").relList;if(p&&p.supports&&p.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))f(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const y of r.addedNodes)y.tagName==="LINK"&&y.rel==="modulepreload"&&f(y)}).observe(document,{childList:!0,subtree:!0});function m(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function f(t){if(t.ep)return;t.ep=!0;const r=m(t);fetch(t.href,r)}})();const D="modulepreload",I=function(a){return"/ajackus/"+a},E={},x=function(p,m,f){let t=Promise.resolve();if(m&&m.length>0){let v=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(o=>({status:"fulfilled",value:o}),o=>({status:"rejected",reason:o}))))};var y=v;document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),e=l?.nonce||l?.getAttribute("nonce");t=v(m.map(d=>{if(d=I(d),d in E)return;E[d]=!0;const u=d.endsWith(".css"),o=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${o}`))return;const i=document.createElement("link");if(i.rel=u?"stylesheet":D,u||(i.as="script"),i.crossOrigin="",i.href=d,e&&i.setAttribute("nonce",e),document.head.appendChild(i),u)return new Promise((n,s)=>{i.addEventListener("load",n),i.addEventListener("error",()=>s(new Error(`Unable to preload CSS for ${d}`)))})}))}function r(l){const e=new Event("vite:preloadError",{cancelable:!0});if(e.payload=l,window.dispatchEvent(e),!e.defaultPrevented)throw l}return t.then(l=>{for(const e of l||[])e.status==="rejected"&&r(e.reason);return p().catch(r)})},w=["10","25","50","100","All"],c=[{id:crypto.randomUUID(),firstName:"Aarav",lastName:"Mehta",role:"Frontend Developer",department:"Engineering",email:"aarav.mehta@ajackus.com"},{id:crypto.randomUUID(),firstName:"Riya",lastName:"Shah",role:"Product Designer",department:"Design",email:"riya.shah@ajackus.com"},{id:crypto.randomUUID(),firstName:"Karan",lastName:"Joshi",role:"Backend Engineer",department:"Engineering",email:"karan.joshi@ajackus.com"},{id:crypto.randomUUID(),firstName:"Sneha",lastName:"Patel",role:"Project Manager",department:"Product Management",email:"sneha.patel@ajackus.com"}],L=["Engineering","Design","Product Management","Sales","Marketing"],N=["Frontend Developer","Backend Engineer","Product Designer","Project Manager","Sales Executive","Marketing Specialist","Data Analyst","HR Manager"],C=Object.freeze(Object.defineProperty({__proto__:null,count:w,departments:L,employees:c,roles:N},Symbol.toStringTag,{value:"Module"}));function P(a){const{id:p,firstName:m,lastName:f,email:t,department:r,role:y}=a,l=document.createElement("div");l.innerHTML=`
    <div id="${p}" class="employee-card">
      <h2>${m} ${f}</h2>
      
      <p> <strong>Email: </strong> ${t}</p>
      <p> <strong>Department: </strong> ${r}</p>
      <p> <strong>Role: </strong> ${y}</p>

      <div class="button-container">
        <button type='button' class='editBtn'>Edit</button>
        <button type='button' class='delBtn'>Delete</button>
      </div>
    </div>
  `;const e=l.firstElementChild;return e.querySelector(".editBtn").onclick=()=>window.editEmployee(a),e.querySelector(".delBtn").onclick=()=>window.showDeletePopup(p),e}function q(a){a.innerHTML=`
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
          ${L.map(l=>`<option value="${l}">${l}</option>`).join("")}
        </select>
      </label>

      <label class="!mb-5"> Role
        <select id="filterRole">
          <option value="">All</option>
          ${N.map(l=>`<option value="${l}">${l}</option>`).join("")}
        </select>
      </label>

      <div class="flex justify-end gap-3 font-normal">
        <button id="clearFilter" class="bg-gray-100 hover:bg-gray-200">Reset</button>
        <button id="applyFilter" class="bg-blue-100 hover:bg-blue-200">Apply</button>
      </div>
    </div>
  `;const p=a.querySelector("#headerSearch"),m=document.getElementById("showCount"),f=a.querySelector("#filterBtn"),t=a.querySelector("#filterPopup");f?.addEventListener("click",()=>{t.classList.toggle("hidden"),document.getElementById("filterFirstName").focus()}),document.addEventListener("click",l=>{!t.contains(l.target)&&!f.contains(l.target)&&t.classList.add("hidden")}),p?.addEventListener("input",l=>{const e=l.target.value.trim().toLowerCase(),v=c.filter(d=>d.firstName.toLowerCase().includes(e)||d.lastName.toLowerCase().includes(e)||d.email.toLowerCase().includes(e));window.updateGrid?.(v,m?.value||"All")});const r=a.querySelector("#applyFilter"),y=a.querySelector("#clearFilter");r.addEventListener("click",()=>{const l=a.querySelector("#filterFirstName").value.toLowerCase(),e=a.querySelector("#filterDepartment").value,v=a.querySelector("#filterRole").value,d=c.filter(u=>(!l||u.firstName.toLowerCase().includes(l))&&(!e||u.department===e)&&(!v||u.role===v));window.updateGrid?.(d,m?.value||"All"),t.classList.add("hidden")}),y.addEventListener("click",()=>{a.querySelector("#filterFirstName").value="",a.querySelector("#filterDepartment").value="",a.querySelector("#filterRole").value="",window.updateGrid?.(c,m?.value||"All"),t.classList.add("hidden")})}const S=JSON.parse(localStorage.getItem("employees"));S?.length&&c.splice(0,c.length,...S);let A=[...c],k=new Date().getFullYear();function b(a=A){const p=document.getElementById("app");p.innerHTML=`
    <div class="dashboard-container">
      <header>
        <div id="headerContainer" class="w-full"></div>
      </header>

      <main>
        <div class="sorting-container">
          <div class="flex flex-wrap gap-5">
            <label>Show:
              <select id="showCount">
                ${w.map(o=>`<option value="${o}">${o}</option>`).join("")}
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
        <p>© ${k} Employee Directory App. All rights reserved.</p>
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
  `,q(document.getElementById("headerContainer"));const m=document.getElementById("employeeGrid"),f=document.getElementById("showCount"),t=document.getElementById("sortBy"),r=document.getElementById("addEmployeePopup"),y=document.getElementById("addEmployeeBtn"),l=document.getElementById("cancelAddEmployee"),e=document.getElementById("addEmployeeForm"),v=e.elements.department,d=e.elements.role;x(async()=>{const{departments:o,roles:i}=await Promise.resolve().then(()=>C);return{departments:o,roles:i}},void 0).then(({departments:o,roles:i})=>{o.forEach(n=>{const s=document.createElement("option");s.value=n,s.textContent=n,v.appendChild(s)}),i.forEach(n=>{const s=document.createElement("option");s.value=n,s.textContent=n,d.appendChild(s)})});function u(o){m.innerHTML="";const i=f.value;(i==="All"?o:o.slice(0,parseInt(i))).forEach(s=>m.appendChild(P(s)))}f.addEventListener("change",()=>u(a)),t.addEventListener("change",()=>{const o=t.value;o&&a.sort((i,n)=>i[o].localeCompare(n[o])),u(a)}),r.addEventListener("click",o=>{o.target===r&&(r.classList.add("hidden"),e.reset())}),y.addEventListener("click",()=>{document.querySelector(".formText").textContent="Add Employee",document.querySelector(".addButton").textContent="Add",r.classList.remove("hidden"),document.querySelector(".setFocus").focus()}),l.addEventListener("click",()=>{r.classList.add("hidden"),e.reset()}),e.addEventListener("submit",o=>{o.preventDefault();const i=Object.fromEntries(new FormData(e).entries()),n=e.dataset.editId||null,s={id:n||crypto.randomUUID(),...i},h=c.findIndex(g=>g.id===n);console.log(h,n,s),h!==-1?c[h]=s:c.push(s),localStorage.setItem("employees",JSON.stringify(c)),e.dataset.editId="",e.reset(),r.classList.add("hidden"),b(c)}),u(a),window.showDeletePopup=o=>{const i=c.findIndex(n=>n.id===o);if(i!==-1){const n=document.createElement("div");n.innerHTML=`
        <div id="confirmBox" class="confirm-box">
          <div class="bg-white p-5 rounded-md shadow-lg max-w-md">
            <p>Are you sure you want to delete this employee?</p>

            <div class="flex justify-around mt-4">
              <button id="cancelDelete" class="btn">No</button>
              <button id="confirmDelete" class="btn">Yes</button>
            </div>
          </div>
        </div>
      `,document.body.appendChild(n);const s=document.getElementById("confirmBox");s.addEventListener("click",h=>{h.target===s&&n.remove()}),n.querySelector("#cancelDelete").onclick=()=>n.remove(),n.querySelector("#confirmDelete").onclick=()=>{c.splice(i,1),localStorage.setItem("employees",JSON.stringify(c)),b(c),n.remove()}}},window.editEmployee=o=>{const{id:i,firstName:n,lastName:s,email:h,department:g,role:B}=o;document.querySelector(".formText").textContent="Edit Employee",document.querySelector(".addButton").textContent="Save",e.elements.firstName.value=n,e.elements.lastName.value=s,e.elements.email.value=h,e.elements.department.value=g,e.elements.role.value=B,e.dataset.editId=i,r.classList.remove("hidden")},window.employees=c,window.updateGrid=u}const F=document.getElementById("app");document.addEventListener("DOMContentLoaded",()=>{F&&b(),console.log("🔥Employee Directory App loaded")});
