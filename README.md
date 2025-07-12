# 🧑‍💼 Ajackus Employee Directory 

  A modern, responsive Employee Directory built using **Vanilla JavaScript**, **Tailwind CSS v4**, and **localStorage** for persistence. This project allows you to add, edit, delete, search, sort, and filter employees — all in a clean and user-friendly interface.

## 🔗 Links

## 🚀 Setup & Run Instructions

1. **Clone the repository**  
   ```
   git clone https://github.com/SAIMANIKESH/ajackus.git
   cd ajackus 
   ```

2. **Install a simple dev server** (optional)

      You can use any static server like live-server, http-server, or VS Code Live Preview. Example:

      ```
        npm install -g live-server
        live-server 
      ```

   Or just open `index.html` in your browser directly.
Works without any backend or build setup.

## 📂 Project Structure

  ```
    ajackus/
    │
    ├── index.html                 # Entry point
    ├── main.js                    # App initializer
    │
    ├── src/
    │   ├── components/
    │   │   ├── header.js          # Search bar & filter button with popup
    │   │   └── employeeCard.js    # Individual employee card component
    │   │
    │   ├── pages/
    │   │   └── dashboard.js       # Main dashboard rendering logic
    │   │
    │   └── constants/
    |       └── index.js           # Static data: employees, departments, roles, counts
    | 
    ├── style.css                  # (Optional) Tailwind CDN setup used instead of custom CSS      
    ├── README.md
    ├── .gitignore
    ├── package.json
    └── vite.config.ts
  ```                 

## 💡 Reflection
✅ Challenges Faced

 - Designing modular, clean code without any frontend framework.

 - Making all components work together dynamically (search, filter, edit, delete).

 - Ensuring responsiveness with minimal and modern Tailwind CSS v4 (no config setup).

 - Syncing UI state with localStorage persistently and safely.

## 🔄 Improvements (If More Time)
- Use a backend like SQL or MongoDB for persistent storage.

- Implement pagination for better UX with large data.

- Add image upload support for employee profiles.

- Improve accessibility (ARIA labels, keyboard nav).

## ⚙️ Tech Stack
- JavaScript (ES6+)

- TailwindCSS

- HTML5

- localStorage

## 👨‍💻 Author
Built with ♥️ by SAIMANIKESH

Inspired by the Ajackus Frontend Challenge...