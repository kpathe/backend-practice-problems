# Node.js Mastery Roadmap (Piyush Garg Playlist)

## Module 1: The Raw Basics (No Frameworks)
**Focus:** Node Internals, V8 Engine, File System (fs), Raw HTTP.  
**Videos:** Videos 1 to 6 (Intro, Install, File Handling, Architecture, HTTP Server).

* **Task 1: The "File Manager" CLI**
    * **Goal:** Master the `fs` module.
    * **Description:** Build a command-line tool `node organize.js <path>` that organizes a messy folder.
    * **Logic:** Read the folder, detect file extensions (`.jpg`, `.pdf`, `.mp4`), create sub-folders (Images, Docs, Video), and move files into them automatically.

* **Task 2: The "Log Watcher"**
    * **Goal:** Understand the Event Loop & Async Files.
    * **Description:** Create a raw HTTP server. Every time someone refreshes the page, append a line to `log.txt`: `"IP: 127.0.0.1 | Time: [Date] | New Request Received"`.

---

## Module 2: Express.js & REST APIs
**Focus:** Middleware, Routing, HTTP Methods, Status Codes, Postman.  
**Videos:** Videos 7 to 12 (Express, Versioning, REST API, Postman, Middleware, Headers).

* **Task 3: The "TODO API" (In-Memory)**
    * **Goal:** Master CRUD without a DB.
    * **Description:** Build a REST API using a simple Array variable to store data.
    * **Endpoints:** Implement `GET /todos` (List), `POST` (Add), `PATCH` (Update status), `DELETE` (Remove).
    * **Rule:** Must use correct status codes (`201` Created, `404` Not Found).

* **Task 4: The "Bouncer" Middleware**
    * **Goal:** Understand Middleware flow.
    * **Description:** Create a global middleware. If a request does NOT have the header `x-api-key: 12345`, block it immediately with status `403 Forbidden`. If the key exists, let it pass.

---

## Module 3: Database & Architecture
**Focus:** MongoDB, Mongoose, Models, MVC Pattern.  
**Videos:** Videos 13 to 17 (MongoDB Connection, Schema, Models, MVC).

* **Task 5: Student Management System**
    * **Goal:** Connect Node to Database.
    * **Description:** Create a Mongoose Schema for `Student` (Name, Roll, Dept, Subjects[]).
    * **Logic:** Create an API to:
        1. Add a new student.
        2. Find all students who belong to the "CS" Department.
        3. Update a student to add a new subject to their existing list.

---

## Module 4: Authentication & Security
**Focus:** JWT, Cookies, Hashing (Bcrypt), Session Management.  
**Videos:** Videos 18 to 22 (URL Shortener Project, Auth, JWT, Cookies).

* **Task 6: The "Secret Diary" App**
    * **Goal:** Secure routes with JWT.
    * **Description:** 1. **Signup:** Hash user password using `bcrypt` and save to DB.
        2. **Login:** Verify password, generate a JWT token, and send it as a Cookie.
        3. **Protected Route:** Create `/my-diary`. Middleware must check the cookie. If valid, show data; if missing/invalid, return `401 Unauthorized`.

---

## Module 5: Real-World Features
**Focus:** File Uploads (Multer), WebSockets (Socket.io).  
**Videos:** Videos 23 to 29 (discord bot, file uploads, blogs, websockets).

* **Task 7: The "Profile Uploader"**
    * **Goal:** Handle binary data (Images).
    * **Description:** Build an API where users can upload a profile picture. Save the actual image in an `uploads/` folder using **Multer** and save the file path in MongoDB.

---

## 🏆 Final Capstone: "TweetX" (Twitter Backend)
**Focus:** Full Backend Architecture, Relationships, Complex Aggregations.

* **Core Requirements:**
    1. **Auth:** JWT-based Signup/Login.
    2. **Tweets:** CRUD ops for Tweets (Text + Image support).
    3. **Social Graph:** User A follows User B.
    4. **The Feed:** `GET /feed` must show tweets **only** from people the user follows (Requires MongoDB Aggregation).
    5. **Reactions:** Like/Unlike functionality.


## ⚡ Module 6: Performance & Real-Time (Jan 25 - Jan 27)
**Focus:** Node.js Streams, Clustering, WebSockets.
**Goal:** Handle high traffic, large files, and live updates.

- [ ] **Task 8: The "Video Streamer" (Node Streams)**
    - **Goal:** Learn memory-efficient data handling.
    - **Why:** Reading a 1GB video file into a variable crashes Node.js. Streams send it chunk by chunk.
    - **Steps:**
        1. Create a standalone route `GET /video`.
        2. Place a large video file (e.g., 100MB+) in your project folder.
        3. Use `fs.createReadStream()` to pipe the video to the `res` object.
        4. **Bonus:** Handle the `Range` header (so users can seek/skip forward in the video player).

- [ ] **Task 9: The "Scale Master" (Cluster Module)**
    - **Goal:** Utilize all CPU cores.
    - **Why:** Node.js is single-threaded. If you have an 8-core CPU, 7 are sitting idle.
    - **Steps:**
        1. Create a `server.js` file that checks `cluster.isPrimary`.
        2. If Primary: Fork a worker for every CPU core (`os.cpus().length`).
        3. If Worker: Run your Express app.
        4. **Test:** Use a load testing tool (like `loadtest`) to hit your server with 1000 requests and see how the OS distributes the load.

- [ ] **Task 10: The "Real-Time" Connection (WebSockets)**
    - **Goal:** Basic bidirectional communication with Socket.io.
    - **Steps:**
        1. Initialize `socket.io` in a simple separate script (or integrate into TweetX).
        2. **Client Side:** Create a simple HTML page that connects to the server.
        3. **Server Side:** Listen for a `message` event and broadcast it back to all connected clients.
        4. **Success:** Open two browser tabs; typing in one logs the message in the other instantly.

---

## 🚀 Module 7: Infrastructure & DevOps (Jan 28)
**Focus:** Nginx (Reverse Proxy), Serverless Functions.
**Goal:** Understand how production servers handle traffic and scale.

- [ ] **Task 11: The "Traffic Controller" (Nginx)**
    - **Goal:** Set up a Reverse Proxy locally.
    - **Steps:**
        1. Install Nginx on your local machine (or use Docker).
        2. Configure `nginx.conf` to listen on Port `80` (HTTP).
        3. Set up a proxy pass to forward traffic to your TweetX server (running on `localhost:8000`).
        4. **Success:** Accessing `http://localhost/api/health` in the browser successfully hits your Node server.

- [ ] **Task 12: The "Function" (Serverless)**
    - **Goal:** Deploy a standalone serverless function.
    - **Steps:**
        1. Create a tiny new project (separate from TweetX).
        2. Write a simple function returning `{"msg": "Hello from Serverless"}`.
        3. Deploy to **Vercel Functions** or **AWS Lambda**.
        4. **Success:** Hitting the provided URL returns JSON without a running server process.

---

## 🛠️ Module 8: The "Professional" Refactor (Jan 29 - Jan 30)
**Focus:** Standardization, Security, Clean Code (Hitesh Sir's Architecture).
**Goal:** Refactor `TweetX` to use production-grade patterns.

- [ ] **Task 13: The "Standardizer" (Utils & Tokens)**
    - **Goal:** Remove try-catch blocks and secure Auth.
    - **Steps:**
        1. Create `utils/ApiError.js` and `utils/ApiResponse.js` classes.
        2. Create `utils/asyncHandler.js` wrapper middleware.
        3. **Security Upgrade:** Implement **Access Token (15m)** and **Refresh Token (10d)** logic in `User` model.
        4. Update `login` controller to send both tokens as HTTP-Only cookies.
        5. Create a new endpoint `POST /api/users/refresh-token` to rotate credentials.

- [ ] **Task 14: The "Gatekeeper" (Validation)**
    - **Goal:** Validate all incoming data.
    - **Steps:**
        1. Install `zod`.
        2. Create validation schemas for **User Signup** and **Tweet Creation**.
        3. Create a `validate(schema)` middleware.
        4. Apply middleware to routes. Failures should return a standard `ApiError`.

---

## 🔌 Module 9: Real-World Integrations (Jan 31 - Feb 2)
**Focus:** SDKs, OAuth, Email Services.
**Goal:** Transform TweetX into a feature-complete application.

- [ ] **Task 15: "Login with Google" (OAuth 2.0)**
    - **Goal:** Implement Social Login.
    - **Steps:**
        1. Get Client ID/Secret from Google Cloud Console.
        2. Configure `passport` and `passport-google-oauth20`.
        3. Create `GET /auth/google` and callback routes.
        4. **Logic:** Create user if new (password: null), or log in if email exists.

- [ ] **Task 16: "Forgot Password" Flow (Email)**
    - **Goal:** Secure account recovery.
    - **Steps:**
        1. Create `POST /auth/forgot-password`: Generate token, save to DB, email link using **Nodemailer**.
        2. Create `POST /auth/reset-password`: Verify token, update password.
        3. **Bonus:** Use a real SMTP service (Gmail, Resend, or Ethereal for testing).