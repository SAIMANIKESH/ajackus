import { renderDashboard } from './pages/dashboard.js';

const app = document.getElementById('app');
document.addEventListener('DOMContentLoaded', () =>  {
  if (app) renderDashboard();
  console.log("🔥Employee Directory App loaded");
});
