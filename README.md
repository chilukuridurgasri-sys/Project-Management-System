# 📌 Project Management System (MERN Stack)

A simple full-stack **Project Management System** built using the **MERN Stack** (MongoDB, Express.js, React.js, and Node.js).

This application demonstrates:

* CRUD operations
* SDLC phase tracking using a Kanban board
* Task movement history
* Basic backend security practices
* Clean and intuitive user interface

---

## 🚀 Features

* Create, Read, Update, and Delete (CRUD) tasks
* Search tasks instantly
* Assign task priorities (Low, Medium, High)
* Kanban-style board with SDLC phases
* Track task movement history across phases
* Persist tasks in MongoDB
* REST API with Express.js
* Simple menu for task actions

---

## 🧱 Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS
* Fetch API

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* dotenv
* CORS

---

## 🗂 Folder Structure

```text id="n6y0x6"
project_management/
├── backend/
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash id="3sqh3t"
git clone https://github.com/chilukuridurgasri-sys/Project-Management-System.git
cd Project-Management-System
```

---

### 2️⃣ Backend Setup

```bash id="kclgq1"
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env id="08cn1u"
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Run the backend:

```bash id="w3vb54"
node index.js
```

Backend runs at:

```text id="52a9x5"
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```bash id="h8q31k"
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text id="2sqhvo"
http://localhost:5173
```

---

## 📜 Task History Tracking

Each time a task changes status, a new history entry is added in MongoDB:

```json id="a6cr4i"
{
  "status": "In Progress",
  "changedAt": "2026-06-23T13:53:01.176Z"
}
```

The history is stored for every task and can be viewed directly within the application.

---


---

## 🔐 Basic Security

* CORS enabled
* Secrets stored in `.env`
* `.env` excluded via `.gitignore`
* Backend validates required fields
* Proper API error handling

---

## 🛠 Design Decisions

* Used a Kanban layout to visually map SDLC phases.
* Implemented task priorities for better organization.
* Used MongoDB sub-documents for task history.
* Kept the UI minimal and readable.
* No authentication to keep the project scope simple.
* Used a demo user for task ownership.

---

## 🌟 Future Enhancements

* User Authentication (JWT)
* Drag-and-Drop Task Movement
* Due Dates and Notifications
* Search and Filter Tasks
* Team Collaboration Features
* Dashboard and Analytics

---

## 👩‍💻 Author

**Durga Sri Chilukuri**

GitHub: https://github.com/chilukuridurgasri-sys
