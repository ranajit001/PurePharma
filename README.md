# Project Title
## Pure Farma

## Introduction
Pure Farma is an AI-powered e-commerce platform for medicines, making it easier for users to find the right treatments. Our backend, built with Express, Node.js, and MongoDB, and frontend with react, ensures seamless user experience and secure transactions. We’ve integrated Gemini AI for a chatbot that suggests medicines based on pet symptoms. Users can also upload prescriptions  for personalized AI recommendations. With real-time interactions via Socket.io, Pure Farma is revolutionizing pet healthcare accessibility! 🚀

## Project Type
Frontend | Backend | Fullstack

## Deplolyed App
Frontend: https://jovial-sundae-9b55ee.netlify.app/
Backend: https://online-pharmacy-jwkq.onrender.com
Database:   mongoDB

## Directory Structure
pure-farma-backend/  
│── config/  
│   ├── db.js                      # MongoDB connection setup  
│── controllers/  
│   ├── medicineController.js       # Medicine-related logic  
│   ├── userController.js           # User authentication & management  
│── middlewares/  
│   ├── authMiddleware.js           # JWT authentication middleware  
│── models/  
│   ├── cart.js                     # Cart schema  
│   ├── medicine.js                 # Medicine schema  
│   ├── product.js                  # Product schema  
│   ├── User.js                     # User schema  
│── node_modules/                    # Dependencies  
│── public/  
│   ├── logo.png                     # Public assets (e.g., images, CSS, etc.)  
│   ├── ResetPassword.html            # HTML file for password reset  
│   ├── .babelrc                      # Babel configuration  
│── routes/  
│   ├── cartRoutes.js                # Routes for cart actions  
│   ├── medicineRoutes.js            # Routes for medicines  
│   ├── productRoutes.js             # Routes for products  
│   ├── userRoutes.js                # Routes for user actions  
│── .env                              # Environment variables  
│── .gitignore                        # Ignore unnecessary files  
│── chatAi.js                         # AI chatbot logic  
│── server.js                         # Entry point for the server  
│── package-lock.json                 # Lock file for dependencies  
│── package.json                      # Project dependencies & scripts  
│── README.md                         # Project documentation  


## Video Walkthrough of the Project  
[Watch Here](https://drive.google.com/file/d/1r1nItgHHgwKgfqRhGU71w-VuONTDGL1l/view)


## Video Walkthrough of the codebase
[Watch Here](https://youtu.be/TBIqWwK0CUc)

## Features
List out the key features of your application.

# 📌 Pure Farma - Features List

## 🚀 Key Features of Pure Farma  

### 1️⃣ User Authentication & Management  
- ✅ Secure **JWT and argon2 based authentication**  
- ✅ **Signup & Login** with password hashing using bcrypt  
- ✅ Password **reset functionality**  

### 2️⃣ Medicine & Product Management  
- ✅ **Browse medicines & healthcare products**  
- ✅ **Search & filter options** for easy discovery  
- ✅ AI-powered **medicine recommendations** based on symptoms  

### 3️⃣ Shopping Cart & Checkout  
- ✅ **Add, remove, and update** cart items  
- ✅ **Secure checkout process**  
- ✅ **Order history tracking**  

### 4️⃣ Prescription Upload & AI Analysis (nit totally implimented yet) 
- ✅ Stored securely in **ImageKit.io**  
- ✅ AI suggests medicines based on uploaded prescriptions  

### 5️⃣ AI-Powered Chatbot 💬  
- ✅ Users can **input symptoms** and get **AI-based medicine recommendations**  
- ✅ **Real-time chat using Socket.io**  

### 6️⃣ Secure & Scalable Backend  
- ✅ **Built with Express.js, Node.js & MongoDB**  
- ✅ **Modular MVC structure** for clean code organization  
- ✅ Uses **Swagger API documentation**  

---

💡 *Built for a seamless & intelligent e-commerce medicine experience!* 🚀


## Installation & Getting started
Detailed instructions on how to install, configure, and get the project running. For BE/FS projects, guide the reviewer how to check mongodb schema etc.

```bash
git clone <repo-url>  # Clone the repository
cd my-project         # Move into the project folder
npm i                 # Install dependencies
npm start             # Run the server

```


## APIs Used


## API Endpoints
In case of Backend Applications provide a list of your API endpoints, methods, brief descriptions, and examples of request/response.
GET /api/items - retrieve all items
POST /api/items - create a new item


## Technology Stack
List and provide a brief overview of the technologies used in the project.

- Node.js
- Express.js
- MongoDB
- Other libraries/modules