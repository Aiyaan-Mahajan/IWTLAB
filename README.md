Here's a complete and professional `README.md` file for your **WeMarket Backend** project, incorporating all the features you've implemented — including user authentication, OTP reset, contact form, and nodemailer integration.

---

```markdown
# 📦 WeMarket Backend

This is the official **backend** for the WeMarket platform, built with **Node.js**, **Express**, **MongoDB**, and **Nodemailer**. It handles user authentication (signup, login), password reset via OTP, and contact form submissions.

---

## 🚀 Features

- ✅ **User Signup & Login** (`/api/signup`, `/api/login`)
- 🔐 **Secure Password Hashing** with `bcrypt`
- 📩 **Password Reset via Email OTP**
- 📨 **Contact Form Submission**
- 🛡️ **CORS enabled** for frontend interaction
- 📁 Serves static assets from the `/public` folder

---

## 📦 Technologies Used

- **Node.js** / **Express**
- **MongoDB** / **Mongoose**
- **Nodemailer** (Gmail SMTP)
- **dotenv** for environment config
- **bcrypt** for password hashing

---

## 📂 Project Structure

```

WeMarket/
├── models/
│   └── contact.js
│   └── OTPToken.js
│   ├── User.js
├── routes/
│   └── auth.js
├── public/
│   └── images/
│   └── index.html
│   └── reset-password.html
│   └── signup.html
├── .env
└── README.md
├── server.js

````

---

## 🔧 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/wemarket-backend.git
cd wemarket-backend
````

### 2. Install dependencies

```bash
npm install
```

### 3. Configure `.env`

Create a `.env` file in the root with your credentials:

```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/wemarket

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM="Sahil <your-email@gmail.com>"
```

> ✅ Make sure to use a Gmail **App Password** if 2FA is enabled.

### 4. Start the server

```bash
nodemon server.js
```

Server will run at:

```
http://localhost:4000
```

---

## 📮 API Endpoints

### 🔐 Authentication

* **POST /api/signup**
  Register a new user.

* **POST /api/login**
  Authenticate user credentials.

### 🔁 Password Reset (via OTP)

* **POST /api/request-otp**
  Sends OTP to registered email.

* **POST /api/reset-password**
  Verifies OTP and updates password.

### 📬 Contact Form

* **POST /api/contact**
  Submits contact form details to MongoDB.

---

## ✅ Example CURL Request

```bash
curl -X POST http://localhost:4000/api/request-otp \
  -H "Content-Type: application/json" \
  -d '{"email": "youremail@gmail.com"}'
```

---

## 📌 Notes

* Ensure MongoDB is running locally or configure `MONGO_URI` for a remote DB.
* For production, consider storing OTPs in hashed form and using HTTPS.
* Use `pm2` or Docker for deployment if needed.

---

## 📫 Contact

Developed by **Sahil Madaan**
Feel free to reach out via email:

---

```


```
