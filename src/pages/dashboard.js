import { employees, count, sortBy } from '../constants';
import { renderEmployeeCard } from '../components/employeeCard.js';
import { renderHeader } from '../components/header.js';

const saved = JSON.parse(localStorage.getItem('filters'));
const stored = JSON.parse(localStorage.getItem('employees'));
if (stored?.length) employees.splice(0, employees.length, ...stored);

function applyAllFilters() {
  const search = document.getElementById('headerSearch')?.value.trim().toLowerCase();
  const first = document.getElementById('filterFirstName')?.value.trim().toLowerCase();
  const dep = document.getElementById('filterDepartment')?.value;
  const role = document.getElementById('filterRole')?.value;
  const sortBy = document.getElementById('sortBy')?.value;
  const show = document.getElementById('showCount')?.value;

  localStorage.setItem('filters', JSON.stringify({ search, first, dep, role, sortBy, show }));

  let filtered = employees.filter(emp =>
    (!first || emp.firstName.toLowerCase().includes(first)) &&
    (!dep || emp.department === dep) &&
    (!role || emp.role === role) &&
    (!search || emp.firstName.toLowerCase().includes(search) || 
      emp.lastName.toLowerCase().includes(search) || 
      emp.email.toLowerCase().includes(search)
    )
  );

  if (sortBy) filtered.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

  const final = show === 'All' ? filtered : filtered.slice(0, parseInt(show));
  window.updateGrid?.(final);
}


let filteredData = [...employees];
const year = new Date().getFullYear();

export function renderDashboard(data = filteredData) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="dashboard-container">
      <header>
        <div id="headerContainer" class="w-full"></div>
      </header>

      <main>
        <div class="sorting-container">
          <div class="flex flex-wrap gap-5">
            <label>Show:
              <select id="showCount">
                ${count.map(d => `<option value="${d}">${d}</option>`).join('')}
              </select>
            </label>

            <label>Sort By:
              <select id="sortBy">
                <option value="">None</option>
                ${sortBy.map(d => `<option value="${d.value}">${d.name}</option>`).join('')}
              </select>
            </label>
          </div>

          <button id="addEmployeeBtn">Add Employee</button>
        </div>

        <div id="employeeGrid"></div>
      </main>

      <footer>
        <p>© ${year} Employee Directory App. All rights reserved.</p>
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
  `;

  renderHeader(document.getElementById('headerContainer'));

  const grid = document.getElementById('employeeGrid');
  const showSelect = document.getElementById('showCount');
  const sortSelect = document.getElementById('sortBy');

  const popup = document.getElementById('addEmployeePopup');
  const addBtn = document.getElementById('addEmployeeBtn');
  const cancelBtn = document.getElementById('cancelAddEmployee');
  const form = document.getElementById('addEmployeeForm');
  const input = document.querySelector('.setFocus');

  const departmentSelect = form.elements['department'];
  const roleSelect = form.elements['role'];

  import('../constants').then(({ departments, roles }) => {
    departments.forEach(dep => {
      const opt = document.createElement('option');
      opt.value = dep;
      opt.textContent = dep;
      departmentSelect.appendChild(opt);
    });
    roles.forEach(role => {
      const opt = document.createElement('option');
      opt.value = role;
      opt.textContent = role;
      roleSelect.appendChild(opt);
    });
  });

  function updateGrid(data) {
    grid.innerHTML = '';
    const show = showSelect.value;
    const toShow = show === 'All' ? data : data.slice(0, parseInt(show));
    toShow.forEach((emp) => grid.appendChild(renderEmployeeCard(emp)));
  }

  showSelect.addEventListener('change', () => applyAllFilters());
  sortSelect.addEventListener('change', () => applyAllFilters());

  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.classList.add('hidden');
      form.reset();
    }
  });

  addBtn.addEventListener('click', () => {
    app.querySelector('.formText').textContent = 'Add Employee';
    app.querySelector('.addButton').textContent = 'Add';
    popup.classList.remove('hidden')
    if (input) input.focus();
  });
  cancelBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
    form.reset();
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(form).entries());

    const existingId = form.dataset.editId || null;
    const newEmp = { 
      id: existingId ? existingId : String(parseInt(data[data.length - 1].id)+1), 
      ...formData
    };

    const index = employees.findIndex(e => e.id === existingId);
    if (index !== -1) employees[index] = newEmp;
    else employees.push(newEmp);

    localStorage.setItem('employees', JSON.stringify(employees));
    form.dataset.editId = '';
    form.reset();
    popup.classList.add('hidden');
    renderDashboard(employees);
  });

  updateGrid(data);

  window.showDeletePopup = id => {
    const index = employees.findIndex(emp => emp.id === id);

    if (index !== -1) {
      const confirmBox = document.createElement('div');
      confirmBox.innerHTML = `
        <div id="confirmBox" class="confirm-box">
          <div class="bg-white p-5 rounded-md shadow-lg max-w-md">
            <p>Are you sure you want to delete this employee?</p>

            <div class="flex justify-around mt-4">
              <button id="cancelDelete" class="btn">No</button>
              <button id="confirmDelete" class="btn">Yes</button>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(confirmBox);

      const confirmPopup = document.getElementById('confirmBox');
      confirmPopup.addEventListener('click', (e) => {
        if (e.target === confirmPopup) confirmBox.remove();
      });

      confirmBox.querySelector('#cancelDelete').onclick = () => confirmBox.remove();
      confirmBox.querySelector('#confirmDelete').onclick = () => {
        employees.splice(index, 1);
        localStorage.setItem('employees', JSON.stringify(employees));
        renderDashboard(employees);
        confirmBox.remove();
      };
    }
  }

  window.editEmployee = (emp) => {
    const { id, firstName, lastName, email, department, role } = emp;

    app.querySelector('.formText').textContent = 'Edit Employee';
    app.querySelector('.addButton').textContent = 'Save';

    form.elements['firstName'].value = firstName;
    form.elements['lastName'].value = lastName;
    form.elements['email'].value = email;
    form.elements['department'].value = department;
    form.elements['role'].value = role;
    form.dataset.editId = id;

    popup.classList.remove('hidden');
    if (input) input.focus();
  };

  if (saved) {
    // document.getElementById('headerSearch').value = saved.search || '';
    // document.getElementById('filterFirstName').value = saved.first || '';
    // document.getElementById('filterDepartment').value = saved.dep || '';
    // document.getElementById('filterRole').value = saved.role || '';
    document.getElementById('sortBy').value = saved.sortBy || '';
    document.getElementById('showCount').value = saved.show || '10';
  }
  
  window.employees = employees;
  window.updateGrid = updateGrid;
  window.applyAllFilters = applyAllFilters;
}
