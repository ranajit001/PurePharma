# PurePharma

PurePharma is a comprehensive solution for purchasing health and wellness products online. It provides a user-friendly platform for browsing, filtering, and buying products like multivitamins, ensuring a seamless shopping experience. Built with a robust **React** front-end and a powerful **Node.js** back-end, this app delivers performance and reliability.

---

## Features

### Front-End

- Built using **React**, **HTML**, **CSS**, and **JavaScript**.
- Fully responsive design for seamless use across devices.
- Interactive UI for product browsing, filtering, and purchasing.
- Dynamic loading of product data from the back-end.
- **Grant Current Location**: Users can share their location for localized product availability and delivery options.

### Back-End

- Developed with **Node.js** and **Express.js**.
- RESTful API to manage product data.
- Data stored in **MongoDB** for scalability.
- Deployed on **Render** for high availability.
- **Forgot Password with Email**: Secure password recovery system using email verification.
- **OCR Integration**: Scan prescriptions and upload them for quick ordering.
- **AI Chatbot**: Integrated chatbot for answering queries and guiding users.

### Core Functionalities

### 🛒 **E-commerce Functionality**

- **Search Products**: Quickly find products using advanced search functionality.
- **Filtering Options**: Filter products by:
  - Categories: Medicines, wellness products, etc.
  - Price range: Define your budget to view relevant products.
- **Sorting Options**: Sort product listings by:
  - Price (Low to High / High to Low).

### 👤 **User Authentication**

- Secure **Login** and **Signup** functionality.
- Manage user accounts and access personalized features like order history.
- **Forgot Password**: Allows users to reset their password via email verification.

### 📱 **Responsive Design**

- Fully responsive UI for a seamless experience on desktops, tablets, and smartphones.
- **Grant Current Location**: Users can opt to share their real-time location for personalized shopping and delivery.

### 🩺 **Integrated Healthcare Services**

- **Video Consultations**: Schedule virtual appointments with healthcare professionals.
- **Hospital Appointments**: Book in-person appointments directly through the platform.
- **OCR Support**: Users can scan prescriptions and order medicines automatically.
- **AI Chatbot**: Provides instant assistance, FAQs, and customer support.

---

## Tech Stack

### Front-End

- **React**: Framework for building dynamic user interfaces.
- **HTML**: Markup language for the structure.
- **CSS**: Styling for layout and design.
- **JavaScript**: Dynamic content and interactivity.
- **Netlify**: Front-end hosting platform.

### Back-End

- **Node.js**: Server-side runtime environment.
- **Express.js**: Framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing product and user data.
- **Render**: Back-end hosting platform.
- **Nodemailer**: Sends password reset emails.
- **Tesseract.js**: OCR functionality for prescription scanning.
- **Dialogflow/OpenAI API**: AI-powered chatbot integration.

---

## Deployment

### Front-End

- **Netlify**: ([[[https://the-backenders-043-1.onrender.com](https://jovial-sundae-9b55ee.netlify.app/)
  - Features continuous deployment directly from the GitHub repository.
  - Deployed using optimized build settings for performance.

### Back-End

- **Render**: ([[https://the-backenders-043-1.onrender.com](https://online-pharmacy-jwkq.onrender.com))
  - Set up with environment variables for secure configuration.
  - Auto-deployment from the GitHub repository.


---

## Installation and Setup

### Prerequisites

- Node.js and npm installed.
- MongoDB instance (local or cloud-based).

### Setup

1. Clone the repository: for Frontend

   ```bash
   git clone https://github.com/strivendra002/EPharma/
   ```

2. Clone the repository: for Backend

   ```bash
   git clone https://github.com/strivendra002/EPharma/
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

---

## API Endpoints

### Products

- `GET /products`: Fetch all products.
- `GET /products/:id`: Fetch a specific product by ID.
- `POST /products`: Add a new product (Admin only).
- `PUT /products/:id`: Update product details (Admin only).
- `DELETE /products/:id`: Delete a product (Admin only).

### User Authentication

- `POST /register`: Register a new user.
- `POST /login`: User login.
- `POST /forgot-password`: Initiate password reset via email.
- `POST /reset-password`: Complete password reset with a new password.

### AI Chatbot

- `POST /chat`: Get AI-powered assistance.

### OCR Functionality

- `POST /upload-prescription`: Scan and process prescription for orders.

---






## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add a meaningful message'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```

---


---

## Acknowledgments

- MongoDB for database support.
- Netlify and Render for deployment platforms.
- Open source libraries and tools used in this project.

---



