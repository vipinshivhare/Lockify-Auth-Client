# Lockify Auth Client

[![Deployed Frontend](https://img.shields.io/badge/Live%20Demo-Netlify-green?logo=netlify)](https://lockify-client.netlify.app)

A modern, responsive authentication frontend built with **React** and **Vite**. Lockify provides a seamless user experience for registration, login, email verification, and password reset, integrating securely with a Java Spring Boot backend.

---

## Features

- **User Registration & Login**  
  Create a new account or log in with your email and password. JWT-based authentication is supported.
- **Email Verification**  
  After registration, users can verify their email address using a 6-digit OTP sent to their inbox.
- **Password Reset**  
  Forgot your password? Request a reset OTP and set a new password securely.
- **Responsive UI**  
  Built with Bootstrap and custom styles for a clean, modern look on all devices.
- **Protected Routes**  
  User state and authentication are managed globally using React Context.
- **Logout & Session Management**  
  Securely log out and clear session data.

---

## Tech Stack

- **Frontend:** React, Vite, Bootstrap, React Router, Axios, React Toastify
- **Backend:** Java Spring Boot (see [Lockify Auth Backend](#) for details)
- **3D/Visuals:** React Three Fiber (for header animation)

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/lockify-auth-client.git
   cd lockify-auth-client
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Configure Environment:**

   Create a `.env` file in the root directory and set your backend API URL:
   ```
   VITE_BACKEND_URL=https://lockify-auth-backend.onrender.com/api/v1.0
   ```
4. **Run the app:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173).

---

## Project Structure

```
client/
  ├── public/
  ├── src/
  │   ├── assets/         # Images and static assets
  │   ├── components/     # Reusable UI components (Header, Menubar, etc.)
  │   ├── context/        # React Context for global state (AppContext)
  │   ├── pages/          # Main pages (Login, Home, EmailVerify, ResetPassword)
  │   ├── util/           # Constants and utility functions
  │   ├── App.jsx         # Main app component with routes
  │   └── main.jsx        # Entry point
  ├── package.json
  └── vite.config.js
```

---

## Environment Variables

- `VITE_BACKEND_URL` — The base URL for your backend API.

---

## Usage

- **Register:** Create a new account with your name, email, and password.
- **Login:** Access your account using your credentials.
- **Verify Email:** Enter the OTP sent to your email to verify your account.
- **Reset Password:** Request a reset OTP and set a new password if you forget yours.
- **Logout:** Securely log out from the app.

---

## Customization

- Update branding and assets in `src/assets/`.
- Modify theme and styles in `src/App.css` and component files.
- Adjust backend URL in `.env` as needed.

---

## License

Copyright © 2024 Vipin Shivhare

This project is licensed under the MIT License. If you use or copy any part of this project, please give appropriate credit to Vipin Shivhare.

---

## Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Bootstrap](https://getbootstrap.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction)
