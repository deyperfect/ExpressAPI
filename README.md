# Express REST API

A production-ready REST API built with Express.js, MongoDB, and JWT authentication.

## Folder Structure

```
express-api/
├── config/
│   └── db.js                  # MongoDB connection
├── controllers/
│   ├── authController.js      # Register & login logic
│   └── productController.js   # Product CRUD logic
├── middleware/
│   ├── authMiddleware.js      # JWT protect middleware
│   └── errorHandler.js        # Centralized error handler
├── models/
│   ├── User.js                # User schema (bcrypt pre-save hook)
│   └── Product.js             # Product schema
├── routes/
│   ├── authRoutes.js          # /api/auth/*
│   └── productRoutes.js       # /api/products/*
├── utils/
│   └── generateToken.js       # JWT generation utility
├── .env.example
├── package.json
└── server.js                  # Entry point
```

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Create your .env file
cp .env.example .env
# Then edit .env with your actual values

# 3. Start development server
npm run dev

# 4. Start production server
npm start
```

## Environment Variables

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/express_api
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

---

## API Reference

All responses follow this consistent format:
```json
{ "success": true/false, "data": {}, "message": "" }
```

---

### Auth Routes

#### Register
```
POST /api/auth/register

Body:
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "secret123"
}

Response 201:
{
  "success": true,
  "data": {
    "_id": "664abc123...",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Login
```
POST /api/auth/login

Body:
{
  "email": "jane@example.com",
  "password": "secret123"
}

Response 200:
{
  "success": true,
  "data": {
    "_id": "664abc123...",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

---

### Product Routes (All Protected)

Include the JWT in every request header:
```
Authorization: Bearer <your_token>
```

#### Create Product
```
POST /api/products

Body:
{
  "name": "Wireless Headphones",
  "description": "Noise-cancelling over-ear headphones",
  "price": 149.99
}

Response 201:
{
  "success": true,
  "data": {
    "_id": "665def456...",
    "name": "Wireless Headphones",
    "description": "Noise-cancelling over-ear headphones",
    "price": 149.99,
    "user": "664abc123...",
    "createdAt": "2024-06-01T10:00:00.000Z"
  }
}
```

#### Get All My Products
```
GET /api/products

Response 200:
{
  "success": true,
  "data": [ { ...product }, { ...product } ]
}
```

#### Get Product by ID
```
GET /api/products/:id

Response 200:
{
  "success": true,
  "data": { ...product }
}
```

#### Update Product
```
PUT /api/products/:id

Body (any subset of fields):
{
  "price": 129.99
}

Response 200:
{
  "success": true,
  "data": { ...updatedProduct }
}
```

#### Delete Product
```
DELETE /api/products/:id

Response 200:
{
  "success": true,
  "message": "Product deleted successfully."
}
```

---

## Error Responses

All errors return the same shape:
```json
{ "success": false, "message": "Description of what went wrong." }
```

| Status | Meaning |
|--------|---------|
| 400 | Bad request / validation error |
| 401 | Missing or invalid JWT |
| 403 | Authenticated but not the owner |
| 404 | Resource not found |
| 409 | Conflict (duplicate email) |
| 500 | Unexpected server error |
