# React CRUD User Management System

A simple and extensible React-based CRUD application to manage users.
The application demonstrates clean architecture, form validation, API integration, and a modern UI using Material UI.

---

## 🚀 Tech Stack

- React + TypeScript
- Vite
- Material UI (MUI)
- JSON Server (Mock API)
- Custom CSS

---

## ✨ Features

- Add, edit, delete, and list users
- Modal-based form for add/edit
- Strong form validation
- Unique phone number enforcement
- Success and error feedback
- Clean and professional UI
- Schema-driven and extensible form design

---

## 🧾 User Fields

- First Name (required, letters only)
- Last Name (required, letters only)
- Phone Number (required, 10 digits, unique)
- Email Address (required, valid email format)

---

## 🧪 Mock API (JSON Server)

This project uses **json-server** as a mock backend to manage user data.

### Local Development
When running the application locally, the backend is powered by json-server.

**Endpoint:**
http://localhost:3001/users

**db.json example:**
```json
{
  "users": []
}
Deployed Backend
For the live deployed application, the same json-server backend is hosted on Render.

Live API endpoint:
https://react-crud-backend-4cls.onrender.com/users

The frontend dynamically switches API URLs using environment variables (VITE_API_URL),
allowing the same codebase to work seamlessly in both local and production environments.
