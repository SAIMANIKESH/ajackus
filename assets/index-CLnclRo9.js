(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const t of n)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function m(n){const t={};return n.integrity&&(t.integrity=n.integrity),n.referrerPolicy&&(t.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?t.credentials="include":n.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(n){if(n.ep)return;n.ep=!0;const t=m(n);fetch(n.href,t)}})();const x="modulepreload",C=function(l){return"/ajackus/"+l},w={},P=function(s,m,c){let n=Promise.resolve();if(m&&m.length>0){let h=function(f){return Promise.all(f.map(y=>Promise.resolve(y).then(o=>({status:"fulfilled",value:o}),o=>({status:"rejected",reason:o}))))};var i=h;document.getElementsByTagName("link");const p=document.querySelector("meta[property=csp-nonce]"),e=p?.nonce||p?.getAttribute("nonce");n=h(m.map(f=>{if(f=C(f),f in w)return;w[f]=!0;const y=f.endsWith(".css"),o=y?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${f}"]${o}`))return;const a=document.createElement("link");if(a.rel=y?"stylesheet":x,y||(a.as="script"),a.crossOrigin="",a.href=f,e&&a.setAttribute("nonce",e),document.head.appendChild(a),y)return new Promise((r,d)=>{a.addEventListener("load",r),a.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${f}`)))})}))}function t(p){const e=new Event("vite:preloadError",{cancelable:!0});if(e.payload=p,window.dispatchEvent(e),!e.defaultPrevented)throw p}return n.then(p=>{for(const e of p||[])e.status==="rejected"&&t(e.reason);return s().catch(t)})},B=["10","25","50","100","All"],L=[{value:"firstName",name:"First Name"},{value:"lastName",name:"Last Name"},{value:"email",name:"Email"}],u=[{id:"1",firstName:"Aarav",lastName:"Mehta",role:"Frontend Developer",department:"Engineering",email:"aarav.mehta@ajackus.com"},{id:"2",firstName:"Riya",lastName:"Shah",role:"Product Designer",department:"Design",email:"riya.shah@ajackus.com"},{id:"3",firstName:"Karan",lastName:"Joshi",role:"Backend Engineer",department:"Engineering",email:"karan.joshi@ajackus.com"},{id:"4",firstName:"Sneha",lastName:"Patel",role:"Project Manager",department:"Product Management",email:"sneha.patel@ajackus.com"}],N=["Engineering","Design","Product Management","Sales","Marketing"],I=["Frontend Developer","Backend Engineer","Product Designer","Project Manager","Sales Executive","Marketing Specialist","Data Analyst","HR Manager"],F=Object.freeze(Object.defineProperty({__proto__:null,count:B,departments:N,employees:u,roles:I,sortBy:L},Symbol.toStringTag,{value:"Module"}));function q(l){const{id:s,firstName:m,lastName:c,email:n,department:t,role:i}=l,p=document.createElement("div");p.innerHTML=`
    <div id="${s}" class="employee-card">
      <h2>${m} ${c}</h2>
      
      <p> <strong>Email: </strong> ${n}</p>
      <p> <strong>Department: </strong> ${t}</p>
      <p> <strong>Role: </strong> ${i}</p>

      <div class="button-container">
        <button type='button' class='editBtn'>Edit</button>
        <button type='button' class='delBtn'>Delete</button>
      </div>
    </div>
  `;const e=p.firstElementChild;return e.querySelector(".editBtn").onclick=()=>window.editEmployee(l),e.querySelector(".delBtn").onclick=()=>window.showDeletePopup(s),e}function A(l){l.innerHTML=`
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
          ${N.map(i=>`<option value="${i}">${i}</option>`).join("")}
        </select>
      </label>

      <label class="!mb-5"> Role
        <select id="filterRole">
          <option value="">All</option>
          ${I.map(i=>`<option value="${i}">${i}</option>`).join("")}
        </select>
      </label>

      <div class="flex justify-end gap-3 font-normal">
        <button id="clearFilter" class="bg-gray-100 hover:bg-gray-200">Reset</button>
        <button id="applyFilter" class="bg-blue-100 hover:bg-blue-200">Apply</button>
      </div>
    </div>
  `;const s=l.querySelector("#headerSearch"),m=l.querySelector("#filterBtn"),c=l.querySelector("#filterPopup");m?.addEventListener("click",()=>c.classList.toggle("hidden")),document.addEventListener("click",i=>{!c.contains(i.target)&&!m.contains(i.target)&&c.classList.add("hidden")}),s?.addEventListener("input",()=>window.applyAllFilters?.());const n=l.querySelector("#applyFilter"),t=l.querySelector("#clearFilter");n.addEventListener("click",()=>{c.classList.add("hidden"),window.applyAllFilters?.()}),t.addEventListener("click",()=>{l.querySelector("#filterFirstName").value="",l.querySelector("#filterDepartment").value="",l.querySelector("#filterRole").value="",window.applyAllFilters?.(),c.classList.add("hidden")})}const S=JSON.parse(localStorage.getItem("employees"));S?.length&&u.splice(0,u.length,...S);function E(){const l=document.getElementById("headerSearch")?.value.trim().toLowerCase(),s=document.getElementById("filterFirstName")?.value.trim().toLowerCase(),m=document.getElementById("filterDepartment")?.value,c=document.getElementById("filterRole")?.value,n=document.getElementById("sortBy")?.value,t=document.getElementById("showCount")?.value;let i=u.filter(e=>(!s||e.firstName.toLowerCase().includes(s))&&(!m||e.department===m)&&(!c||e.role===c)&&(!l||e.firstName.toLowerCase().includes(l)||e.lastName.toLowerCase().includes(l)||e.email.toLowerCase().includes(l)));n&&i.sort((e,h)=>e[n].localeCompare(h[n]));const p=t==="All"?i:i.slice(0,parseInt(t));window.updateGrid?.(p)}let j=[...u];const k=new Date().getFullYear();function b(l=j){const s=document.getElementById("app");s.innerHTML=`
    <div class="dashboard-container">
      <header>
        <div id="headerContainer" class="w-full"></div>
      </header>

      <main>
        <div class="sorting-container">
          <div class="flex flex-wrap gap-5">
            <label>Show:
              <select id="showCount">
                ${B.map(o=>`<option value="${o}">${o}</option>`).join("")}
              </select>
            </label>

            <label>Sort By:
              <select id="sortBy">
                <option value="">None</option>
                ${L.map(o=>`<option value="${o.value}">${o.name}</option>`).join("")}
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
  `,A(document.getElementById("headerContainer"));const m=document.getElementById("employeeGrid"),c=document.getElementById("showCount"),n=document.getElementById("sortBy"),t=document.getElementById("addEmployeePopup"),i=document.getElementById("addEmployeeBtn"),p=document.getElementById("cancelAddEmployee"),e=document.getElementById("addEmployeeForm"),h=e.elements.department,f=e.elements.role;P(async()=>{const{departments:o,roles:a}=await Promise.resolve().then(()=>F);return{departments:o,roles:a}},void 0).then(({departments:o,roles:a})=>{o.forEach(r=>{const d=document.createElement("option");d.value=r,d.textContent=r,h.appendChild(d)}),a.forEach(r=>{const d=document.createElement("option");d.value=r,d.textContent=r,f.appendChild(d)})});function y(o){m.innerHTML="";const a=c.value;(a==="All"?o:o.slice(0,parseInt(a))).forEach(d=>m.appendChild(q(d)))}c.addEventListener("change",()=>E()),n.addEventListener("change",()=>E()),t.addEventListener("click",o=>{o.target===t&&(t.classList.add("hidden"),e.reset())}),i.addEventListener("click",()=>{s.querySelector(".formText").textContent="Add Employee",s.querySelector(".addButton").textContent="Add",t.classList.remove("hidden"),s.querySelector(".setFocus").focus()}),p.addEventListener("click",()=>{t.classList.add("hidden"),e.reset()}),e.addEventListener("submit",o=>{o.preventDefault();const a=Object.fromEntries(new FormData(e).entries()),r=e.dataset.editId||null,d={id:r||String(parseInt(l[l.length-1].id)+1),...a},v=u.findIndex(g=>g.id===r);v!==-1?u[v]=d:u.push(d),localStorage.setItem("employees",JSON.stringify(u)),e.dataset.editId="",e.reset(),t.classList.add("hidden"),b(u)}),y(l),window.showDeletePopup=o=>{const a=u.findIndex(r=>r.id===o);if(a!==-1){const r=document.createElement("div");r.innerHTML=`
        <div id="confirmBox" class="confirm-box">
          <div class="bg-white p-5 rounded-md shadow-lg max-w-md">
            <p>Are you sure you want to delete this employee?</p>

            <div class="flex justify-around mt-4">
              <button id="cancelDelete" class="btn">No</button>
              <button id="confirmDelete" class="btn">Yes</button>
            </div>
          </div>
        </div>
      `,document.body.appendChild(r);const d=document.getElementById("confirmBox");d.addEventListener("click",v=>{v.target===d&&r.remove()}),r.querySelector("#cancelDelete").onclick=()=>r.remove(),r.querySelector("#confirmDelete").onclick=()=>{u.splice(a,1),localStorage.setItem("employees",JSON.stringify(u)),b(u),r.remove()}}},window.editEmployee=o=>{const{id:a,firstName:r,lastName:d,email:v,department:g,role:D}=o;s.querySelector(".formText").textContent="Edit Employee",s.querySelector(".addButton").textContent="Save",e.elements.firstName.value=r,e.elements.lastName.value=d,e.elements.email.value=v,e.elements.department.value=g,e.elements.role.value=D,e.dataset.editId=a,t.classList.remove("hidden")},window.employees=u,window.updateGrid=y,window.applyAllFilters=E}const $=document.getElementById("app");document.addEventListener("DOMContentLoaded",()=>{$&&b()});
