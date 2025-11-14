## Todo App Backend

This backend provides api's to perfrom crud operations for todo create, read, update , delete and also user authentication with password reset.

## Features

- User authentication
- Password reset
- CRUD operations for todos

## Tech stack

- **Node.js**
- **Mongoose**
- **TypeScript**
- **Express**
- **jsonwebtoken**
- **bcryptjs**
- **Nodemailer**

## Installation

1. Clone this repository on your local machine

   git clone https://github.com/DeepakRizal/intellisqr_assignment_backend.git

2. Navigate to the project directory

3. Environment variables

   # Create a .env file in the backend root:

   - PORT=4000
   - NODE_ENV=development

   - MONGO_URI=your_mongo_connection_string

   - JWT_SECRET=your_jwt_secret
   - JWT_EXPIRES_IN=7d

   # SMTP Configuration (for sending password reset emails)

   - SMTP_HOST=smtp.gmail.com
   - SMTP_PORT=587
   - SMTP_SECURE=false
   - SMTP_USER=your_gmail_address
   - SMTP_PASS=your_app_password # Use Gmail App Password, not - your normal Gmail password

   - EMAIL_FROM=no-reply@example.com

   # Frontend URL used to build the reset-password link

   RESET_PASSWORD_BASE_URL=https://your-frontend.com

4. Start development server

- npm run dev

## Authentication Endpoints

## **POST /api/auth/signup**

Creates a new user account.

### **Request Body**

```json
{
  "name": "xyz",
  "email": "xyz@gmail.com",
  "password": "123456"
}
```

### **Success Response**

```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "6916da8132511fc38cc62cf3",
    "name": "xyz",
    "email": "xyz@gmail.com"
  }
}
```

## **POST /api/auth/login**

This is the login endpoint

### **Request Body**

```json
{
  "email": "xyz@gmail.com",
  "password": "123456"
}
```

### **Success Response**

```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id_here",
    "name": "xyz",
    "email": "xyz868@gmail.com"
  }
}
```

## **POST /api/auth/forgot-password**

It Generates a password reset token and sends an email with a link.

### **Request Body**

```json
{
  "email": "john@example.com"
}
```

### **Success Response**

```json
{
  "success": true,
  "message": "Token sent to email",
  "resetURL": "https://your-frontend.com/reset-password/password_reset_token_here"
}
```

## **POST /api/auth/reset-password/:token**

It resets user password using the token from email

### **Request Body**

```json
{
  "password": "newPassword123"
}
```

### **Success Response**

```json
{
  "success": true,
  "message": "Password reset successful. Please login."
}
```

## **POST /api/auth/reset-password/:token**

It resets user password using the token from email

### **Request Body**

```json
{
  "password": "newPassword123"
}
```

### **Success Response**

```json
{
  "success": true,
  "message": "Password reset successful. Please login."
}
```

## Todo Routes (JWT Protected)

All todo routes require an authentication token.

### **Authorization Header**

Authorization: Bearer <token>

## **POST /api/todos**

Create a new todo.

### **Request Body**

```json
{
  "title": "this is a todo title",
  "completed": "false"
}
```

### **Success Response**

```json
{
  "success": true,
  "todo": {
    "title": "This_is_a_todo_title",
    "completed": false,
    "userId": "user_id",
    "_id": "id",
    "createdAt": "2025-11-14T03:34:50.331Z",
    "__v": 0
  }
}
```

## **GET /api/todos**

Fetch all todos for the logged-in user

### **Success Response**

```json
{
  "success": true,
  "todos": [
    {
      "_id": "todo_id",
      "title": "todo_tile",
      "completed": false,
      "userId": "user_id",
      "createdAt": "2025-11-14T03:31:32.531Z",
      "__v": 0
    },
    {
      "_id": "todo_id",
      "title": "todo_tile",
      "completed": false,
      "userId": "user_id",
      "createdAt": "2025-11-14T03:31:32.531Z",
      "__v": 0
    }
  ]
}
```

## **PUT /api/todos/:id**

Update todo by ID.

### **Request Body**

```json
{
  "title": "todo_title",
  "completed": true
}
```

### **Success Response**

```json
{
  "success": true,
  "todo": {
    "_id": "todo_id",
    "title": "todo_title",
    "completed": true,
    "userId": "user_id",
    "createdAt": "2025-11-14T03:31:32.531Z",
    "__v": 0
  }
}
```

## **DELETE /api/todos/:id**

Deletes a todo.

---
