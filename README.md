# 🚀 MERN DNS Management System

A full-stack web application to manage DNS records with authentication, security, and a modern dashboard interface.

---

## 📌 Features

* 🔐 User Authentication (JWT-based login & signup)
* 🌐 DNS Record Management (Add, Edit, Delete)
* 📊 Dashboard with user data and statistics
* ⚙️ Settings panel for user control
* 🔒 CORS Security Implementation
* 🎨 Clean and responsive UI

---

## 🛠️ Tech Stack

### Frontend:

* HTML
* CSS
* JavaScript

### Backend:

* Node.js
* Express.js

### Database:

* MongoDB

### Security:

* JWT Authentication
* Custom CORS Middleware

---

## 📂 Project Structure

```
mern/
├── back-end/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── front-end/
│   ├── css/
│   ├── js/
│   ├── index.html
│   ├── login.html
│   └── dashboard.html
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/Manoj-Mj-gif/mern-dns-management-system.git
```

### 2️⃣ Install Dependencies

```
cd back-end
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file in backend:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### 4️⃣ Run Server

```
node server.js
```

### 5️⃣ Run Frontend

Open:

```
front-end/index.html (using Live Server)
```

---

## 🔐 CORS Demonstration

This project includes a custom CORS middleware to demonstrate:

* ❌ Blocked requests when origin is not allowed
* ✅ Allowed requests when origin is whitelisted

---

## 📸 Screenshots

* Login Page
* Dashboard
* DNS Management Panel

(Add screenshots here)

---

## 🚀 Future Enhancements

* 🌍 Domain validation system
* 📊 Advanced analytics dashboard
* 🔔 Notification system
* ☁️ Cloud deployment (AWS / Vercel)

---

## 👨‍💻 Author

**Manoj Kumar**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
