

# Custom URL Shortener

A simple and efficient URL shortening service built with **Node.js**, **Express.js**, and **MongoDB**. This application allows users to generate short, unique URLs that redirect to the original long URLs.

---

## 🚀 Features

- Generate unique short URLs for any valid long URL.
- Redirect users to the original URL when accessing the short URL.
- Track visit history with timestamps for each short URL.
- RESTful API design for easy integration.

---

## 🛠️ Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing URL mappings.
- **Mongoose**: ODM for MongoDB, facilitating schema definitions and interactions.
- **shortid**: Library to generate short, unique, non-sequential IDs.

---

## 📁 Project Structure

```
Custom-URL-Shortener/
├── controllers/
│   └── url.js           # Handles URL generation logic
├── models/
│   └── url.js           # Mongoose schema for URL data
├── routes/
│   └── url.js           # Defines API routes
├── connect.js           # MongoDB connection setup
├── index.js             # Entry point of the application
├── package.json         # Project metadata and dependencies
└── .gitignore           # Specifies files to be ignored by Git
```


---

## ⚙️ Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Khetesh-Deore/Custom-URL-Shortener.git
   cd Custom-URL-Shortener
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start MongoDB:**

   Ensure MongoDB is running on your local machine. By default, the application connects to `mongodb://localhost:27017/short-url`.

4. **Run the application:**

   ```bash
   npm start
   ```

   The server will start on `http://localhost:1000/`.

---

## 📡 API Endpoints

### 1. **Generate Short URL**

- **Endpoint:** `POST /url`
- **Description:** Generates a short URL for the provided long URL.
- **Request Body:**

  ```json
  {
    "url": "https://www.example.com"
  }
  ```

- **Response:**

  ```json
  {
    "id": "shortId"
  }
  ```

  
Use the returned `id` to access the short URL: `http://localhost:1000/shortId`

### 2. **Redirect to Original URL**

- **Endpoint:** `GET /:shortId`
- **Description:** Redirects to the original URL associated with the provided `shortId`.
- **Example:** Accessing `http://localhost:1000/shortId` will redirect to `https://www.example.com`.

---

## 🧠 How It Works

1. **URL Submission:**
   - User sends a POST request with a long URL.
2. **Short ID Generation:**
   - The server generates a unique `shortId` using the `shortid` library.
3. **Database Storage:**
   - Stores the `shortId`, original URL, and an empty `visitHistory` array in MongoDB.
4. **Redirection:**
   - When a user accesses the short URL, the server retrieves the original URL from the database and redirects the user.
5. **Visit Tracking:**
   - Each redirect logs a timestamp in the `visitHistory` array for analytics.

---

## 🧪 Example Usage

**Generate Short URL:**

```bash
curl -X POST http://localhost:1000/url \
     -H "Content-Type: application/json" \
     -d '{"url": "https://www.example.com"}'
```

**Redirect to Original URL:**

Access `http://localhost:1000/shortId` in your browser to be redirected to `https://www.example.com`.

---

## 📚 Concepts Demonstrated

- **RESTful API Design:** Structured endpoints for resource manipulation.
- **Asynchronous Programming:** Utilization of async/await for non-blocking operations.
- **Database Operations:** CRUD operations using Mongoose with MongoDB.
- **Middleware Usage:** Express middleware for JSON parsing and routing.
- **Unique ID Generation:** Creating non-sequential, unique identifiers for URLs.
- **Error Handling:** Basic error responses for invalid inputs.

---

## 📌 Future Enhancements

- Implement user authentication for personalized URL management.
- Add analytics dashboard to visualize URL visit statistics.
- Set expiration dates for short URLs.
- Custom aliasing for short URLs.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

