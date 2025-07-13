# 🧑‍💼 Ajackus Employee Directory 

  A modern, responsive Employee Directory built using **Vanilla JavaScript**, **Tailwind CSS v4**, and **localStorage** for persistence. This project allows you to add, edit, delete, search, sort, and filter employees — all in a clean and user-friendly interface.

## 🔍 Preview
- Published App Link - [View](https://saimanikesh.github.io/ajackus)
- Video Drive Link - [View](https://drive.google.com/file/d/1y1BnWDjQqDNRcnPQ360Vjlt54m8Egumu/view?usp=sharing)
- Git Repository Link - [View](https://github.com/SAIMANIKESH/ajackus)

For Screenshots pls go to `public` folder attached there...

## 🚀 Setup & Run Instructions

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/SAIMANIKESH/ajackus.git
```

**Installation & Running the Project**

Install the project dependencies using `npm` and run the project

```bash
cd ajackus
npm install
npm run dev
```

  Open http://localhost:5173 in your browser to view the project.

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

- Tailwind CSS

- HTML5

- localStorage

## 👨‍💻 Author
Built with ♥️ by SAIMANIKESH

Inspired by the Ajackus Frontend Challenge...
