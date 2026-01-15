# 🧠 Tech Journal – Code & Docs Manager

A  **personal tech journaling platform** where you can create topics, write code, and maintain clean documentation — all in one place. This project is designed for developers who want to **document their learning journey**, avoid relearning concepts from scratch, and build a habit of structured thinking.

---

## Why this project exists

> *"Documenting your learnings can do wonders for your brain."*

While learning new technologies, we often move fast and forget details later. This project solves that by letting you:

* Create **topics** (e.g., JWT, Rate Limiting, JVM Internals)
* Attach **code snippets** with a real editor
* Write **clean documentation** 
* Revisit and evolve your understanding over time

---

## 🏗️ Tech Stack

### Frontend

* **React (Vite)** – fast dev experience
* **Tailwind CSS** – modern UI styling
* **React Router** – page navigation
* **Monaco Editor** – VS Code–like code editor
* **TipTap Editor** – clean documentation writing experience
* **Lucide Icons** – modern icons

### Backend

* **Spring Boot** – REST APIs
* **SQL Database** – topic persistence

---

## 🗄️ Database Design

```sql
CREATE TABLE topic (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  code TEXT,
  docs TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## Getting Started

### Prerequisites



For Backend

# Prerequisites

Spring Boot 3.x

Spring Web

Spring Data JPA

MySQL connector 

Lombok

SQL Database

```bash

# navigate to backend
cd backend

#run using maven wrapper
./mvnw spring-boot:run

```

# backend server will start at 
  http://localhost:1234

For Frontend 

# Prerequisites

* Node.js (v18+ recommended)
* npm or yarn


```bash
# Clone the repository
git clone https://github.com/your-username/my-backend-journey.git

# Move into the project directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

# Open your browser at:
  http://localhost:5173


# Intended Use Cases

* Backend learning notes
* System design explanations
* API behavior documentation
* Debugging notes
* Interview preparation
* Personal knowledge base

---

# Future Enhancements

* Autosave functionality
* Topic search & filtering
* Version history for docs/code
* Authentication & user profiles
* Export docs as Markdown / PDF

---

This project focuses on:

* **Clarity over complexity**
* **Learning over aesthetics**
* **Long-term knowledge retention**

It’s built for developers who care about *understanding* systems — not just using them.

---

Pull requests are welcome.
If you have ideas to improve developer learning workflows, feel free to open an issue.

---

If this project saves you from relearning something again — it has already done its job.

Happy documenting!!
