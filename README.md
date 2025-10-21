# 📝 Vue Todo App

A fully-featured **Todo application** built with **Vue 3**, **TypeScript**, **Vite**, and **Tailwind CSS**.  
This app demonstrates CRUD operations with a remote API, optimistic updates, pagination, filtering, and a modern responsive UI.

---

## 🚀 Demo

[(https://new-vue-beta.vercel.app/todos)]

---

## ✨ Features

- ✅ Add, update, and delete todos with optimistic UI updates
- 🔍 Search and filter todos by text and status (all, completed, pending)
- 📄 Pagination for better navigation of long lists
- 💻 Responsive design using Tailwind CSS
- ⚙️ Built with Vue 3 + TypeScript for strong typing and modern reactive patterns
- 🔄 Vue Query for data fetching, caching, and mutations

---

## 🧰 Tech Stack

| Technology        | Description                 |
| ----------------- | --------------------------- |
| **Vue 3**         | Frontend framework          |
| **Vite**          | Fast build and dev tooling  |
| **TypeScript**    | Static typing               |
| **Tailwind CSS**  | Utility-first CSS framework |
| **Vue Query**     | Data fetching and caching   |
| **DummyJSON API** | Remote API for todos        |

---

---

## 📁 Project Structure

src/
├─ api/ # API calls (fetchTodos, createTodo, deleteTodo)
├─ components/ # Reusable Vue components (TodoList, Pagination, TodoFilters, AddTodoModal)
├─ pages/ # Page components (Homepage, TodoDetail, LandingPage)
├─ types/ # TypeScript types (Todo)
├─ main.ts # Vue app entry point
└─ App.vue # Root component

## Getting Started

### Prerequisites

Node.js >= 18

npm >= 9

Install Dependencies
npm install

Run Development Server
npm run dev

Open your browser at http://localhost:5173 to see the app.

Build for Production
npm run build

The production-ready files will be in the dist/ folder.

Preview Production Build
npm run preview

## Usage

Click “Add Todo” to create a new task.

Use the search input to filter todos by text.

Use the status dropdown to filter by completed or pending.

Click delete to remove a todo.

Pagination controls allow navigating through large todo lists.

Click a todo to see its details page.

## Notes

Optimistic updates are applied when creating todos, but you can revert this behavior if needed.

Todos are fetched from a remote API (https://dummyjson.com/todos).

## Contributing

Fork the repository

Create a feature branch (git checkout -b feature/your-feature)

Commit changes (git commit -m "Add feature")

Push to branch (git push origin feature/your-feature)

Create a pull request

## License

This project is open-source and available under the MIT License
.
