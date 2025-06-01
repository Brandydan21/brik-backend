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
+ Upload an image with key 'profileImage' (this will be used for profile pic image)

```
res body example
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJzdGV2ZW5AZXhhbXBsZS5jb20iLCJuYW1lIjoiU3RldmVuIFN0b25lIiwiaWF0IjoxNzQ4NjkzOTUwLCJleHAiOjE3NDkyOTg3NTB9.xeU1r-QVCWwHJ0b0JxTyv6Xx_piynlfSKTPIczrOBo8",
    "user": {
        "id": 2,
        "email": "steven@example.com",
        "name": "Steven Stone",
        "age": 32,
        "gender": "Male",
        "bio": "Gym owner",
        "location": "Sydney",
        "profileImage": "http://localhost:3000/user-images/profileImage-1748693950121-370460567.jpg",
        "rating": "0",
        "createdAt": "2025-05-31T12:19:10.218Z"
    }
}
```
- The profileImage url allows us to directly access the image

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
POST http://localhost:3000/user/preferences
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
PUT http://localhost:3000/user/preferences
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
GET http://localhost:3000/user/preferences
- `require Authorization header : Bearer <JWT TOKEN>`

6. Delete Userpreferences 
DELETE http://localhost:3000/user/preferences
- `require Authorization header : Bearer <JWT TOKEN>`

7. Get userListing
GET http://localhost:3000/user/listings
- `require Authorization header : Bearer <JWT TOKEN>`

8. Create userListing
POST http://localhost:3000/user/listings
example body
- `require Authorization header : Bearer <JWT TOKEN>`
```
{
  "description": "Cozy 1-bedroom unit with balcony and plenty of natural light. Close to shops and public transport.",
  "location": "Brunswick, VICs",
  "rentPriceWeekly": 320.00,
  "availabilityDate": "2025-06-15",
  "petsAllowed": true,
}
+ add images up to five with the name listingImage1, listingImage2... up to listingImage5
```
9. Update userListing
PUT http://localhost:3000/user/listings
- `require Authorization header : Bearer <JWT TOKEN>`
```
{
  "description": "Cozy 1-bedroom unit with balcony and plenty of natural light. Close to shops and public transport.",
  "location": "Brunswick, VICs",
  "rentPriceWeekly": 320.00,
  "availabilityDate": "2025-06-15",
  "petsAllowed": true,
}
+ add images to update up to five with the name listingImage1, listingImage2... up to listingImage5
- If you want to update listingImage1, then assign then new image to the listingImage1 name to allow for updates
```

10. Delete userListing
DELETE http://localhost:3000/user/listings
- `require Authorization header : Bearer <JWT TOKEN>`

10. Update User 
url:
```
http://localhost:3000/user/update
```
req body example
- `require Authorization header : Bearer <JWT TOKEN>`
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
+ Upload an image with key 'profileImage' (this will be used for profile pic image)

```