import { employees, departments, roles } from '../constants';

export function renderHeader(container) {
  container.innerHTML = `
    <div class="flex flex-wrap items-center justify-between px-4 p-3 h-full gap-4">
      <h1 class="text-xl font-bold">Employee Directory</h1>
      <input type="search" id="headerSearch" placeholder="Search by name or email..." class="truncate p-2 px-3 border rounded w-48 md:w-60 lg:w-120" />
      <button id="filterBtn" class="!px-6 bg-green-500 hover:bg-green-600 font-semibold text-white">Filter</button>
    </div>

    <div id="filterPopup" class="absolute top-16 right-4 bg-white border shadow-lg p-4 rounded-md hidden z-40 w-72">
      <label class="block text-sm mb-2">First Name
        <input type="text" id="filterFirstName" class="w-full p-2 border rounded mt-1" />
      </label>

      <label class="block text-sm mb-2">Department
        <select id="filterDepartment" class="w-full p-2 border rounded mt-1">
          <option value="">All</option>
          ${departments.map(d => `<option value="${d}">${d}</option>`).join('')}
        </select>
      </label>

      <label class="block text-sm mb-3">Role
        <select id="filterRole" class="w-full p-2 border rounded mt-1">
          <option value="">All</option>
          ${roles.map(r => `<option value="${r}">${r}</option>`).join('')}
        </select>
      </label>

      <div class="flex justify-end gap-2">
        <button id="clearFilter" class="bg-gray-100 hover:bg-gray-200">Clear</button>
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
