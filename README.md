# 🏦 Express Banking System — Account & Transaction Management

Express Banking System is a full‑stack web application that allows users to manage bank accounts, transfer money, check balances, and visualize account structures using core data structures. It demonstrates real‑world banking operations with a modern, responsive UI.

**Live Demo (Frontend):** [https://express-banking-system.web.app/](https://express-banking-system.web.app/)  
**Backend API (Vercel):** [https://your-vercel-backend.vercel.app](https://your-vercel-backend.vercel.app) *(replace with actual URL)*

---

## 🚀 Features

* ➕ **Create Account** – Add a new account with a unique number and initial balance  
* 💸 **Transfer Money** – Securely transfer funds between accounts with validation  
* 💰 **Check Balance** – Instantly view the balance of any account  
* 📜 **Transaction History** – See a complete log of all transfers for each account  
* 📊 **All Accounts Table** – Scrollable table with sticky headers, showing all accounts  
* 🌳 **BST Structure View** – Visualise the Binary Search Tree of accounts (scrollable)  
* 🔗 **LinkedList Traversal** – View the insertion order of accounts (scrollable)  
* ⚡ **Real‑Time Updates** – UI refreshes automatically after every operation  
* 🎨 **Modern UI** – Glass‑morphism design with teal/lavender palette  
* 📱 **Responsive** – Works on desktop, tablet, and mobile screens

---

## 🛠️ Tech Stack

### Backend
* **Node.js** + **Express.js** (REST API)
* **Deployed on Vercel** (serverless functions)
* **Custom Data Structures**:  
  - `LinkedList` – linear storage  
  - `Binary Search Tree` – efficient O(log n) lookup  
  - `Node` & `TreeNode` classes  
* **In‑memory storage** (transactions & accounts)

### Frontend
* **HTML5**, **CSS3**, **Vanilla JavaScript** (ES6+)
* **Fetch API** for AJAX calls
* **Deployed on Firebase Hosting** – [express-banking-system.web.app](https://express-banking-system.web.app/)
* **CSS Grid / Flexbox** for layout

### Development Tools
* **Ollama** + **Qwen2.5‑Coder 14B** (local AI model)
* **OpenCode** (AI coding agent inside VS Code)
* **Git** for version control

---

## 📦 Local Development

To run this project on your own machine, follow the steps below.

---

## ⚙️ Prerequisites

Make sure you have installed:

```bash
node -v
npm -v

👉 Node.js v18+ recommended

---

## 📥 Installation & Setup

### 1. Clone or Download the Project

```bash
git clone https://github.com/your-username/express-banking-system.git
cd express-banking-system
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Backend Server (Local)

```bash
node server.js
```

👉 The API will run at:

```
http://localhost:3000
```

### 4. Open the Frontend

Open `frontend/index.html` directly in your browser **OR** serve it with a live server (VS Code extension or `npx live-server frontend`).

The frontend will automatically call `http://localhost:3000/api/...` (local) – or the live backend URL if configured.

---

## 📁 Project Structure

```
express-banking-system/
├── backend/
│   ├── Bank.js
│   └── dataStructures/
│       ├── Node.js
│       ├── LinkedList.js
│       └── TreeNode.js
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── server.js
├── package.json
├── vercel.json          (for Vercel deployment)
└── README.md
```

---

## 📜 Available Scripts

| Command | Description |
| --- | --- |
| `node server.js` | Start the Express backend locally |
| `npm install` | Install all dependencies |
| `vercel --prod` | Deploy backend to Vercel |
| `firebase deploy --only hosting` | Deploy frontend to Firebase |

> No build step required for frontend – pure HTML/CSS/JS.

---

## 🌍 Deployment Details

### Backend on Vercel
- The Express server is adapted as a Vercel serverless function.
- A `vercel.json` file routes all API requests to the function.
- Live backend URL (example): `https://express-banking-api.vercel.app`

### Frontend on Firebase Hosting
- Static files (`index.html`, `style.css`, `script.js`) are deployed to Firebase.
- The frontend points to the live Vercel backend URL for all API calls.

---

## ⚠️ Important Notes

- `node_modules/` is **not included** in the repo – run `npm install` first.
- The backend stores data **in memory** – restarting the server or a new serverless invocation resets all accounts.
- For persistent storage, integrate a database (MongoDB, PostgreSQL) or Firebase Firestore.
- The BST and LinkedList visualisations are **scrollable** (max height 300px) to avoid page expansion.

---

## 🎯 Objective

The goal of the Express Banking System is to demonstrate the practical integration of **linear (LinkedList)** and **non‑linear (BST)** data structures into a real‑world banking application. It also showcases full‑stack development skills, REST API design, responsive UI, and iterative problem‑solving (e.g., fixing sticky headers and scroll containers).

---

## 🧠 Concepts Used

- **Data Structures**: custom LinkedList, Node, TreeNode, Binary Search Tree
- **Algorithms**: BST insertion, search, in‑order traversal; linked list traversal
- **Frontend**: async/await, DOM manipulation, event handling, CSS sticky positioning
- **Backend**: Express routes, middleware, error handling, modular code
- **Development with AI**: using Ollama + OpenCode to generate, refactor, and debug code

---

## 🌐 Future Enhancements

- 🔐 **User Authentication** (JWT, login/signup)
- 🗄️ **Persistent Database** (MongoDB or PostgreSQL)
- 📱 **Mobile App** using React Native
- 📈 **Animated Tree Visualisations** (D3.js or canvas)
- 📊 **Transaction Graphs & Analytics**
- ☁️ **Full CI/CD** (auto‑deploy on push)

---

## 👨‍💻 Developer

**Tharun P**  
[GitHub](https://github.com/tharun242005) | [LinkedIn](https://www.linkedin.com/in/tharun-p-4146b4318/)
