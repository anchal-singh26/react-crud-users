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

This project uses **json-server** as a mock backend for local development.

### Endpoint
http://localhost:3001/users

### db.json Example
```json
{
  "users": []
}
