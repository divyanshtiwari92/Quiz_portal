<div align="center">

<br/>

```
 ██████╗ ██╗   ██╗██╗███████╗    ██████╗  ██████╗ ██████╗ ████████╗ █████╗ ██╗     
██╔═══██╗██║   ██║██║╚══███╔╝    ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔══██╗██║     
██║   ██║██║   ██║██║  ███╔╝     ██████╔╝██║   ██║██████╔╝   ██║   ███████║██║     
██║▄▄ ██║██║   ██║██║ ███╔╝      ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══██║██║     
╚██████╔╝╚██████╔╝██║███████╗    ██║     ╚██████╔╝██║  ██║   ██║   ██║  ██║███████╗
 ╚══▀▀═╝  ╚═════╝ ╚═╝╚══════╝    ╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝
```

### 🎯 A Full-Stack Online Examination Platform

<br/>

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

<br/>

</div>

---

## 📌 Overview

> **Quiz Portal** is a modern, role-based online examination system built with the **MERN stack**. It supports two roles — **Teacher** and **Student** — enabling teachers to create and manage exams while students can attempt quizzes and track their results in real time.

---

## ✨ Features

| 👩‍🏫 Teacher | 👨‍🎓 Student |
|:---|:---|
| 📝 Create & manage exams | 🖊️ Attempt available quizzes |
| ❓ Add/edit questions | 📊 View scores & results |
| 📋 View student results | 🏆 Track performance history |
| 🔐 Secure teacher dashboard | 🔐 Secure student dashboard |

---

## 🗂️ Project Structure

```
Quiz_portal/
│
├── 📁 Backend/
│   ├── 📁 config/
│   │   └── db.js                  # MongoDB connection
│   ├── 📁 models/
│   │   ├── Exam.js                # Exam schema
│   │   ├── Question.js            # Question schema
│   │   ├── Result.js              # Result schema
│   │   ├── Student.js             # Student schema
│   │   └── Teacher.js             # Teacher schema
│   ├── 📁 routes/
│   │   ├── auth.js                # Auth routes (login/register)
│   │   ├── exam.js                # Exam CRUD routes
│   │   └── result.js              # Result routes
│   ├── .env                       # Environment variables
│   └── server.js                  # Express server entry point
│
└── 📁 myapp/                      # React Frontend
    ├── 📁 public/
    └── 📁 src/
        ├── 📁 components/         # Reusable UI components
        ├── 📁 pages/
        │   ├── AttemptQuiz.js     # Quiz attempt page
        │   ├── Login.js           # Auth page
        │   ├── StudentDashboard.js
        │   └── TeacherDashboard.js
        ├── App.js
        ├── App.css
        └── index.js
```

---

## ⚙️ Tech Stack

```
Frontend  →  React.js  +  Tailwind CSS
Backend   →  Node.js   +  Express.js
Database  →  MongoDB   +  Mongoose ODM
Auth      →  JWT (JSON Web Tokens)
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:
- **Node.js** v16+
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

---

### 🔧 Backend Setup

```bash
# 1. Navigate to backend folder
cd Backend

# 2. Install dependencies
npm install

# 3. Create a .env file
touch .env
```

Add the following to `.env`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

```bash
# 4. Start the server
node server.js
```

> ✅ Backend running on `http://localhost:5000`

---

### 🎨 Frontend Setup

```bash
# 1. Navigate to frontend folder
cd myapp

# 2. Install dependencies
npm install

# 3. Start the React app
npm start
```

> ✅ Frontend running on `http://localhost:3000`

---

## 🔗 API Endpoints

### 🔐 Auth Routes — `/api/auth`
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/register` | Register new user (student/teacher) |
| `POST` | `/login` | Login and receive JWT token |

### 📚 Exam Routes — `/api/exam`
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Get all exams |
| `POST` | `/` | Create new exam *(Teacher only)* |
| `PUT` | `/:id` | Update exam *(Teacher only)* |
| `DELETE` | `/:id` | Delete exam *(Teacher only)* |

### 📊 Result Routes — `/api/result`
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/` | Submit quiz result |
| `GET` | `/:studentId` | Get student results |

---

## 🖼️ Pages Overview

```
🏠 Login Page          →  Role-based authentication
📋 Teacher Dashboard   →  Create, manage exams & view results
📋 Student Dashboard   →  Browse & attempt available exams
📝 Attempt Quiz        →  Interactive timed quiz interface
```

---

## 🔐 Authentication Flow

```
User Registers / Logs In
         ↓
  JWT Token Generated
         ↓
  Stored in localStorage
         ↓
  Role Detected → Teacher / Student
         ↓
  Redirected to Respective Dashboard
```

---

## 🛣️ Roadmap

- [x] Role-based authentication (Teacher / Student)
- [x] Exam creation and management
- [x] Quiz attempt interface
- [x] Result tracking
- [ ] ⏱️ Timer for quiz attempts
- [ ] 📈 Analytics dashboard for teachers
- [ ] 🌐 Leaderboard system
- [ ] 📧 Email notifications

---

## 🤝 Contributing

Contributions are always welcome!

```bash
# Fork the repo, then:
git checkout -b feature/AmazingFeature
git commit -m "Add some AmazingFeature"
git push origin feature/AmazingFeature
# Open a Pull Request 🎉
```

---

## 👨‍💻 Authors

<div align="center">

| 👤 **Divyansh Tiwari** | 👤 **Ankit Jatwa** |
|:---:|:---:|
| [![GitHub](https://img.shields.io/badge/GitHub-divyanshtiwari92-181717?style=for-the-badge&logo=github)](https://github.com/divyanshtiwari92) | [![GitHub](https://img.shields.io/badge/GitHub-ankitjatwaankitjatwa4--a11y-181717?style=for-the-badge&logo=github)](https://github.com/ankitjatwaankitjatwa4-a11y) |

</div>

---

<div align="center">

⭐ **If you found this project helpful, please give it a star!** ⭐

*Made with ❤️ and lots of ☕*

</div>
