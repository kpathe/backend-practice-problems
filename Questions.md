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