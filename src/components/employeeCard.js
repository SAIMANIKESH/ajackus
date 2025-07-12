export function renderEmployeeCard(emp) {
  const { id, firstName, lastName, email, department, role } = emp;

  const card = document.createElement('div');
  card.innerHTML = `
    <div id="${id}" class="employee-card">
      <h2>${firstName} ${lastName}</h2>
      
      <p> <strong>Email: </strong> ${email}</p>
      <p> <strong>Department: </strong> ${department}</p>
      <p> <strong>Role: </strong> ${role}</p>

      <div class="button-container">
        <button type='button' class='editBtn'>Edit</button>
        <button type='button' class='delBtn'>Delete</button>
      </div>
    </div>
  `;

  const element = card.firstElementChild;
  element.querySelector('.editBtn').onclick = () => window.editEmployee(emp);
  element.querySelector('.delBtn').onclick = () => window.showDeletePopup(id);

  return element;
}
