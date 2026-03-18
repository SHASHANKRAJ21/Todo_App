# ✅ Taskly — Task Management Application

A full-stack task management web application built with **React** and **Spring Boot**, backed by **MySQL**. Taskly lets authenticated users create, complete, and delete personal tasks through a clean and responsive UI.

🌐 **Live Demo:** [todo-app-cljb.vercel.app](https://todo-app-cljb.vercel.app/)

---

## 📸 Screenshots

> _Add screenshots here_

---

## 🚀 Features

- 🔐 **User Authentication** — Sign up and log in with email & password (BCrypt hashed)
- ➕ **Add Tasks** — Create tasks with a title (up to 200 characters) with real-time character counter
- ☑️ **Complete Tasks** — Mark tasks as done; they move to the Completed tab automatically
- 🗑️ **Delete Tasks** — Remove tasks with a confirmation modal to prevent accidents
- 📊 **Stats Bar** — View Total, To Do, and Done counts with an overall progress bar
- 🔍 **Search** — Filter tasks in real time by title within each tab
- 🔔 **Toast Notifications** — Auto-dismissing success and error feedback
- 💡 **Pro Tips** — Random productivity tips shown on the Add Task page
- 📱 **Responsive Design** — Works across desktop and mobile browsers
- 🔄 **Persistent Session** — Authenticated state survives page refresh via localStorage

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v6 |
| State Management | Redux Toolkit, React Redux |
| HTTP Client | Axios |
| Backend | Spring Boot 3.2 (Java 17) |
| ORM | Spring Data JPA (Hibernate) |
| Validation | Jakarta Bean Validation |
| Password Security | Spring Security Crypto (BCrypt) |
| Database | MySQL 8 |
| Build Tool | Maven |
| Deployment | Vercel (frontend) |

---

## 📁 Project Structure

```
Todo_App/
├── frontend/
│   └── src/
│       ├── pages/
│       │   ├── AuthPage.jsx         # Login & Sign-up
│       │   ├── AddTodoPage.jsx      # Add new task
│       │   └── TodoListPage.jsx     # View all tasks
│       ├── components/
│       │   ├── AppHeader.jsx        # Navigation bar
│       │   ├── TodoItem.jsx         # Individual task row
│       │   ├── StatsBar.jsx         # Progress statistics
│       │   ├── SearchBar.jsx        # Real-time search
│       │   ├── Toast.jsx            # Notifications
│       │   ├── ConfirmModal.jsx     # Delete confirmation
│       │   └── EmptyState.jsx       # Empty list placeholder
│       ├── store/
│       │   ├── store.js             # Redux store
│       │   ├── todoSlice.js         # Task state + async thunks
│       │   └── authSlice.js         # Auth state + localStorage sync
│       └── services/
│           └── api.js               # Axios instance + API calls
│
└── backend/
    └── src/main/java/com/todo/todoapp/
        ├── controller/              # AuthController, TodoController
        ├── service/                 # AuthService, TodoService
        ├── model/                   # User, Todo (JPA entities)
        ├── repository/              # Spring Data JPA repositories
        ├── dto/                     # Request/Response DTOs
        ├── config/                  # CorsConfig
        └── exception/               # GlobalExceptionHandler, AppException
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- Java JDK 17+
- MySQL 8
- Maven 3.9+

---

### 🗄️ Database Setup

```sql
CREATE DATABASE tododb;
```

---

### 🔧 Backend Setup

```bash
# Navigate to backend directory
cd backend

# Configure your database credentials in:
# src/main/resources/application.properties
spring.datasource.url=jdbc:mysql://localhost:3306/tododb
spring.datasource.username=root
spring.datasource.password=root
server.port=8090

# Run the Spring Boot application
mvn spring-boot:run
```

The API will be available at `http://localhost:8090`

---

### 💻 Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 📦 Production Build

```bash
cd frontend
npm run build
```

---

## 📡 API Reference

All responses follow a standard envelope:

```json
{
  "message": "Human-readable status",
  "data": { }
}
```

### Auth Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/signup` | Register a new user |
| `POST` | `/auth/login` | Authenticate and return user |

### Todo Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/todos/{userId}` | Fetch all tasks for a user |
| `POST` | `/todos/{userId}` | Create a new task |
| `PATCH` | `/todos/{id}/toggle` | Toggle task completion status |
| `DELETE` | `/todos/{id}` | Delete a task |

---

## 🗃️ Database Schema

### `users`
| Column | Type | Notes |
|---|---|---|
| id | BIGINT | Primary key, auto-increment |
| username | VARCHAR(255) | Display name |
| email | VARCHAR(255) | Unique, used for login |
| password | VARCHAR(255) | BCrypt hashed, never returned in API |

### `todos`
| Column | Type | Notes |
|---|---|---|
| id | VARCHAR(36) | UUID, auto-generated |
| title | VARCHAR(255) | Task description |
| completed | BOOLEAN | Default: false |
| user_id | BIGINT | Foreign key → users(id) |

---

## 🔒 Security Notes

- Passwords are hashed with **BCrypt** before storage
- The `password` field is annotated `@JsonIgnore` — never exposed via API
- **For production use**, it is recommended to:
  - Add JWT-based token authentication
  - Validate user ownership on all `/todos/{userId}` endpoints
  - Move database credentials to environment variables
  - Enable HTTPS and restrict CORS to known domains

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 👤 Author

**Shashank Raj**
- GitHub: [@SHASHANKRAJ21](https://github.com/SHASHANKRAJ21)

---

## 📄 License

This project is open source. Feel free to use and modify it.
