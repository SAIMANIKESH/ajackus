import { employees, count } from '../constants';
import { renderEmployeeCard } from '../components/employeeCard.js';
import { renderHeader } from '../components/header.js';

const stored = JSON.parse(localStorage.getItem('employees'));
if (stored?.length) employees.splice(0, employees.length, ...stored);

let filteredData = [...employees];
let year = new Date().getFullYear();

export function renderDashboard(data = filteredData) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="h-screen flex flex-col">
      <header class="sticky h-16 border-b w-full sticky top-0 bg-white z-30 flex items-center">
        <div id="headerContainer" class="w-full"></div>
      </header>

      <main class="overflow-y-auto h-[calc(100vh-128px)]">
        <div class="flex justify-between items-center mb-4 sticky top-0 z-10 px-4 py-3.5 bg-gray-50">
          <div class="flex flex-wrap gap-5">
            <label class="text-sm font-semibold flex items-center gap-2">Show:
              <select id="showCount" class="p-1 border rounded">
                ${count.map(d => `<option value="${d}">${d}</option>`).join('')}
              </select>
            </label>

            <label class="text-sm font-semibold flex items-center gap-2">Sort By:
              <select id="sortBy" class="p-1 border rounded">
                <option value="">None</option>
                <option value="firstName">First Name</option>
                <option value="lastName">Last Name</option>
                <option value="email">Email</option>
              </select>
            </label>

          </div>

          <button id="addEmployeeBtn" class="!px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded">Add Employee</button>
        </div>

        <div id="employeeGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4 p-4 pb-16"></div>
      </main>

      <footer class="sticky bottom-0 z-30 mt-6 text-sm p-3 w-full text-white bg-stone-900">
        <p>© ${year} Employee Directory App. All rights reserved.</p>
      </footer>

      <div id="addEmployeePopup" class="fixed inset-0 bg-black/40 z-50 hidden flex-center">
        <div class="bg-white p-6 rounded-md shadow-lg w-[90%] max-w-md">
          <h2 class="text-lg font-semibold mb-4">Add Employee</h2>

          <form id="addEmployeeForm" class="space-y-3">
            <label class="block text-sm">First Name
              <input type="text" name="firstName" required class="w-full border p-2 rounded mt-1" />
            </label>

            <label class="block text-sm">Last Name
              <input type="text" name="lastName" required class="w-full border p-2 rounded mt-1" />
            </label>

            <label class="block text-sm">Email
              <input type="email" name="email" required class="w-full border p-2 rounded mt-1" />
            </label>

            <label class="block text-sm">Department
              <select name="department" required class="w-full border p-2 rounded mt-1">
                <option value="">Select</option>
              </select>
            </label>

            <label class="block text-sm">Role
              <select name="role" required class="w-full border p-2 rounded mt-1">
                <option value="">Select</option>
              </select>
            </label>

            <div class="flex justify-end gap-2 pt-2">
              <button type="button" id="cancelAddEmployee" class="px-4 py-1 bg-gray-100 hover:bg-gray-200 rounded">Cancel</button>
              <button type="submit" class="addButton px-4 py-1 bg-blue-100 hover:bg-blue-200 rounded">Add</button>
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

  showSelect.addEventListener('change', () => updateGrid(data));
  sortSelect.addEventListener('change', () => {
    const sortBy = sortSelect.value;
    if (sortBy) data.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    updateGrid(data);
  });

  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.classList.add('hidden');
      form.reset();
    }
  });

  addBtn.addEventListener('click', () => {
    document.querySelector('.addButton').textContent = 'Add';
    popup.classList.remove('hidden')
  });
  cancelBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
    form.reset();
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(form).entries());

    const existingId = form.dataset.editId || null;
    const newEmp = { id: existingId ? existingId : crypto.randomUUID(), ...formData };

    const index = employees.findIndex(e => e.id === existingId);
    console.log(index, existingId, newEmp);
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
          <div class="bg-white p-4 rounded-md shadow-lg max-w-md">
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

    document.querySelector('.addButton').textContent = 'Save';

    form.elements['firstName'].value = firstName;
    form.elements['lastName'].value = lastName;
    form.elements['email'].value = email;
    form.elements['department'].value = department;
    form.elements['role'].value = role;
    form.dataset.editId = id;

    popup.classList.remove('hidden');

  };
  
  window.employees = employees;
  window.updateGrid = updateGrid;
}
