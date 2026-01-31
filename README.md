# React Intern Assignment (REACTIIP01002)

This project is a User Account Management Single Page Application (SPA) built to fulfill the practical interview requirements for the Chaintech Network React Developer Internship.

**Live Demo:** https://chaintech-network-internship-assign.vercel.app/login

## 📋 Project Overview
This application allows users to create an account, log in securely, and manage their profile information. It demonstrates core React competencies including state management, routing, form validation, and "CRUD-like" operations using browser storage.

### Key Features
* **User Registration:** Allows users to sign up with Name, Email, Password, Age, DOB, and Phone.
* **Authentication:** Secure login flow using `localStorage` to persist user sessions.
* **Profile Management:** Users can view and edit their personal details (Name, Age, Gender, Phone) after logging in.
* **Safety Checks:**
    * Prevents selecting future dates for birth.
    * Validates password matching.
    * Checks for duplicate emails during signup.
* **Protected Routes:** Unauthenticated users are automatically redirected from the Dashboard to the Login page.
* **Responsive UI:** Built with **Bootstrap 5** for a clean, mobile-friendly design.

## 🛠️ Tech Stack
* **Frontend:** React.js (V16+)
* **Styling:** Bootstrap 5 (CDN/NPM)
* **Routing:** React Router DOM
* **State Management:** Context API (`AuthContext`)
* **Data Persistence:** LocalStorage (No backend required)

## 📂 Folder Structure
The project follows a clean, feature-based architecture to ensure maintainability:

```text
src/
├── components/
│   ├── Navbar.jsx         # Dynamic navigation (Login vs Logout states)
│   └── ProtectedRoute.jsx # Route guard logic
├── context/
│   └── AuthContext.jsx    # Centralized authentication logic
├── pages/
│   ├── Login.jsx          # Login view
│   ├── Register.jsx       # Registration view
│   └── Home.jsx           # Dashboard & Edit Profile view
├── App.jsx                # Main routing configuration
└── main.jsx               # App entry point
