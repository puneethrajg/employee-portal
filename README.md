```
# Emp Portal

A full-stack Employee Management (CRUD) application — a Spring Boot REST API backend paired with a React frontend for adding, viewing, editing, and deleting employee records.

## Tech Stack

**Backend**
- Java, Spring Boot
- Spring Data JPA / Hibernate
- MySQL
- Maven

**Frontend**
- React 18
- Vite
- Plain CSS (no framework)

## Features

- View all employees in a table
- Add a new employee
- Edit an existing employee's details
- Delete an employee, with a confirmation step
- Basic error handling and loading states on the frontend

## Project Structure

```
emp-portal/
├── empportal/                  # Spring Boot backend
│   └── src/main/java/com/vcube/empportal/
│       ├── controller/          # REST endpoints
│       ├── model/               # Employee entity
│       └── repo/                # Spring Data JPA repository
└── emp-portal-frontend/        # React frontend
    └── src/
        ├── api/                  # Fetch calls to the backend
        ├── components/           # EmployeeTable, EmployeeFormPanel, ConfirmDialog
        └── App.jsx
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/getEmployee` | Get all employees |
| GET | `/getEmployee/{eid}` | Get a single employee by ID |
| POST | `/createEmployee` | Create a new employee |
| PUT | `/updateEmployee/{eid}` | Update an existing employee |
| DELETE | `/delEmployee/{eid}` | Delete an employee |

**Employee fields:** `eid` (auto-generated ID), `ename`, `age`, `city`, `state`, `salary`

## Getting Started

### Prerequisites
- JDK 17+
- Maven
- MySQL running locally
- Node.js 18+ and npm

### 1. Backend setup

Create the database:
```sql
CREATE DATABASE emp_vcube_sb;
```

Set your DB credentials — **don't commit real credentials to `application.properties`.** Use environment variables instead:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/emp_vcube_sb
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

Run it:
```bash
cd empportal
./mvnw spring-boot:run
```
The API runs at `http://localhost:8080`.

**Enable CORS** so the frontend (a different port) can call it — add to `EmployeeController`:
```java
@CrossOrigin(origins = "http://localhost:5173")
```

### 2. Frontend setup

```bash
cd emp-portal-frontend
npm install
cp .env.example .env
npm run dev
```
Opens at `http://localhost:5173`.

## Environment Variables

**Frontend** (`emp-portal-frontend/.env`):
```
VITE_API_BASE_URL=http://localhost:8080
```

**Backend** — set as actual environment variables before running, e.g.:
```bash
export DB_USERNAME=root
export DB_PASSWORD=yourpassword
```

## Known Limitations / Next Steps

- Backend currently has no service layer, input validation, or structured exception handling
- No authentication/authorization — anyone can hit any endpoint
- Endpoint names (`/getEmployee`, `/delEmployee`) aren't fully RESTful; a cleanup to `/employees`, `/employees/{id}` with proper HTTP verbs is planned
- No automated tests yet on the frontend

## Author

Puneeth — [github.com/puneethrajg](https://github.com/puneethrajg)
```
