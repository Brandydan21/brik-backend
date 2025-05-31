Postgres run
```
podman run -d \
  --name postgres-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=brik \
  -p 5432:5432 \
  docker.io/library/postgres:17.3
```

.env
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/brik"
JWT_SECRET=supersecretkey
PORT=3000
```

# steps to run
1. Install javascript v23.10.0
2. Install Podman
3. Run this podman command to create postgres db 
```
podman run -d \
  --name postgres-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=brik \
  -p 5432:5432 \
  docker.io/library/postgres:17.3
```
4. Install the packages
```
npm install
```
5. migrate the models to db
```
npx prisma migrate dev --name init
```
6. Run server, server will be at localhost:3000
```
npm run dev
```
# API ENDPOINTS

1. Sign-up
url:
```
http://localhost:3000/auth/register
```
req body example
```
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe",
  "age": 28,
  "gender": "Male",
  "bio": "Love building things and coding.",
  "location": "Melbourne, Australia"
}
```
res body example
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ4NDExNTQwLCJleHAiOjE3NDkwMTYzNDB9.8nnQSbbLPepJcH6ZxEewVDegJLptpLKfhYXx3O8RXoo",
    "user": {
        "id": 1,
        "email": "alice@example.com",
        "name": "Alice",
        "age": 25
    }
}
```
2. Login
url:
```
http://localhost:3000/auth/login
```
req body example
```
{
  "email": "alice@example.com",
  "password": "password123"
}
```
res body example
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ4NDExNTgwLCJleHAiOjE3NDkwMTYzODB9.KChimtgDx5Su-ViUl3dNJUC14K6xPSkpkUu5Xpg3ZLs",
    "user": {
        "id": 1,
        "email": "alice@example.com",
        "name": "Alice",
        "age": 25
    }
}
```

3. Create Userpreferences 
POST http://localhost:3000/preferences
- `require Authorization header : Bearer <JWT TOKEN>`
example body
```
{
  "preferredLocation": "Melbourne, VIC",
  "minBudget": 150,
  "maxBudget": 300,
  "petsAllowed": true,
  "smokingAllowed": false,
  "minAge": 21,
  "maxAge": 32,
  "cleanlinessLevel": "high",
  "lifestyle": "quiet"
}
```

4. Update Userpreferences 
PUT http://localhost:3000/preferences
- `require Authorization header : Bearer <JWT TOKEN>`
example body
```
{
  "preferredLocation": "Melbourne, VIC",
  "minBudget": 150,
  "maxBudget": 300,
  "petsAllowed": true,
  "smokingAllowed": false,
  "minAge": 21,
  "maxAge": 32,
  "cleanlinessLevel": "high",
  "lifestyle": "quiet"
}
```

5. Get Userpreferences 
GET http://localhost:3000/preferences
- `require Authorization header : Bearer <JWT TOKEN>`

6. Delete Userpreferences 
DELETE http://localhost:3000/preferences
- `require Authorization header : Bearer <JWT TOKEN>`

