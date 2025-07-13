import { employees, departments, roles } from '../constants';

export function renderHeader(container) {
  container.innerHTML = `
    <div class="header-container">
      <h1>Employee Directory</h1>
      <input type="search" id="headerSearch" placeholder="Search by name or email" autofocus />
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
          ${departments.map(d => `<option value="${d}">${d}</option>`).join('')}
        </select>
      </label>

      <label class="!mb-5"> Role
        <select id="filterRole">
          <option value="">All</option>
          ${roles.map(r => `<option value="${r}">${r}</option>`).join('')}
        </select>
      </label>

      <div class="flex justify-end gap-3 font-normal">
        <button id="clearFilter" class="bg-gray-100 hover:bg-gray-200">Reset</button>
        <button id="applyFilter" class="bg-blue-100 hover:bg-blue-200">Apply</button>
      </div>
    </div>
  `;

  const searchInput = container.querySelector('#headerSearch');
  const showSelect = document.getElementById('showCount');
  const filterBtn = container.querySelector('#filterBtn');
  const filterPopup = container.querySelector('#filterPopup');

  filterBtn?.addEventListener('click', () => {
    filterPopup.classList.toggle('hidden');
    document.getElementById('filterFirstName').focus();
  });

  document.addEventListener('click', (e) => {
    if (!filterPopup.contains(e.target) && !filterBtn.contains(e.target)) {
      filterPopup.classList.add('hidden');
    }
  });

  searchInput?.addEventListener('input', (e) => {
    const keyword = e.target.value.trim().toLowerCase();
    const filtered = employees.filter(emp =>
      emp.firstName.toLowerCase().includes(keyword) ||
      emp.lastName.toLowerCase().includes(keyword) ||
      emp.email.toLowerCase().includes(keyword)
    );
    window.updateGrid?.(filtered, showSelect?.value || 'All');
  });

  const applyBtn = container.querySelector('#applyFilter');
  const clearBtn = container.querySelector('#clearFilter');

  applyBtn.addEventListener('click', () => {
    const first = container.querySelector('#filterFirstName').value.toLowerCase();
    const dep = container.querySelector('#filterDepartment').value;
    const role = container.querySelector('#filterRole').value;

    const filtered = employees.filter(emp =>
      (!first || emp.firstName.toLowerCase().includes(first)) &&
      (!dep || emp.department === dep) &&
      (!role || emp.role === role)
    );
    window.updateGrid?.(filtered, showSelect?.value || 'All');
    filterPopup.classList.add('hidden');
  });

  clearBtn.addEventListener('click', () => {
    container.querySelector('#filterFirstName').value = '';
    container.querySelector('#filterDepartment').value = '';
    container.querySelector('#filterRole').value = '';
    window.updateGrid?.(employees, showSelect?.value || 'All');
    filterPopup.classList.add('hidden');
  });
}
