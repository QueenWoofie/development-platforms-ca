# Development Platforms Course Assignment
Course assignment based of creating a backend with express, typescript and mySQL for a news site.

## Setup
1. Install dependecies
```bash
npm install
```

2. Environment
Create **.env** in the project root
Copy .env.example → .env
Fill in your local MySQL details and a long JWT_SECRET (32+ chars).

3. Database
   - Open MySQL on localhost
   - Import the database schema:

```bash
mysql -u root -p < database.sql
```

Or open database.sql in MySQL Workbench and click the lightning bolt to run.

---

4. Run
```bash
npm run dev
```

```bash
npm run build
npm start
```

---



## Endpoints

### Auth
- `POST /auth/register` → `{ email, password }` → `201 Created`
- `POST /auth/login` → `{ email, password }` → `{ token }`

- `POST /user/register`
- `POST /user/login`

### Articles
- `GET /articles` (public)
- `POST /articles` (JWT required)  
    Header: `Authorization: Bearer <token>`

## Quick Tests

- `GET /health` → `{"ok": true, ...}`
- `GET /articles` → `[]` at first

```powershell
curl -i -X POST http://localhost:3000/auth/register -H "Content-Type: application/json" -d "{"email":"tester1@example.com","password":"Password123!"}"
curl -i -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d "{"email":"tester1@example.com","password":"Password123!"}"
curl -i -X POST http://localhost:3000/articles -H "Authorization: Bearer <PASTE_TOKEN>" -H "Content-Type: application/json" -d "{"title":"Hello","body":"World","category":"general"}"
curl -i http://localhost:3000/articles
```