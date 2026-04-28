# Express Banking System - Project Writeup

## 1. Project Overview

**Objective:** Build a secure, user-friendly banking system using core data structures (LinkedList, Binary Search Tree) with a modern web interface.

**Technologies Used:**
- **Backend:** Node.js, Express.js
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **AI Tools:** OpenCode AI agent, Ollama (Qwen2.5-Coder 14B)
- **Development:** VS Code, PowerShell

---

## 2. Local AI Development Environment Setup

### Installing Ollama
```powershell
# Install Ollama (Windows)
winget install Ollama.Ollama

# Pull the model
ollama pull qwen2.5-coder:14b
```

### Installing OpenCode
```powershell
# Install globally
npm install -g opencode

# Or use npx
npx opencode@latest
```

### Configuring OpenCode to Use Local Ollama Model
```powershell
# Set environment variable
$env:OLLAMA_BASE_URL = "http://localhost:11434"
$env:OPENCODE_MODEL = "qwen2.5-coder:14b"
```

### Integrating OpenCode with VS Code
- Install VS Code extension for terminal integration
- Set keyboard shortcuts for quick terminal access
- Use PowerShell terminal sessions within VS Code

---

## 3. Express Banking System – Backend Implementation

### Data Structures

```javascript
// Node for LinkedList
class Node {
  constructor(accountNumber, balance) {
    this.accountNumber = accountNumber;
    this.balance = balance;
    this.next = null;
  }
}

// TreeNode for BST
class TreeNode {
  constructor(accountNumber, balance) {
    this.accountNumber = accountNumber;
    this.balance = balance;
    this.left = null;
    this.right = null;
  }
}
```

### Bank Class

```javascript
class Bank {
  constructor() {
    this.accounts = new LinkedList();
    this.bst = new BST();
  }

  addAccount(accountNumber, balance) {
    // Add to both data structures
  }

  findAccount(accountNumber) {
    // Search in BST
  }

  transfer(from, to, amount) {
    // Transfer logic with validation
  }

  getTransactions(accountNumber) {
    // Return transaction history
  }
}
```

### Express API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/accounts` | GET | Get all accounts |
| `/api/balance/:accNum` | GET | Get account balance |
| `/api/transfer` | POST | Transfer between accounts |
| `/api/create` | POST | Create new account |
| `/api/transactions/:accNum` | GET | Get transaction history |
| `/api/bst-structure` | GET | Get BST visualization |
| `/api/linkedlist-structure` | GET | Get LinkedList visualization |

### Sample Pre-loaded Accounts
- Account 1001: $5000
- Account 1002: $3000
- Account 1003: $1000

---

## 4. Frontend Dashboard (UI/UX)

### Design Features
- **Glass-morphism** card design with blur effects
- **Teal/Lavender** color palette
- **Responsive** grid layout (2 columns)
- **Dark/Light** theme toggle

### Components

1. **Create Account** - Form to add new accounts
2. **Check Balance** - Query account balance
3. **Transfer Money** - Transfer between accounts
4. **All Accounts** - Table with fixed headers + scrollable body
5. **BST Structure** - Tree visualization
6. **LinkedList Traversal** - List visualization

### Visualizations
- BST and LinkedList displayed as tree/node diagrams
- Fixed-height containers (300px) with vertical scroll
- Real-time updates via Fetch API

---

## 5. UI Fixes & Problem Solving

### Issue 1: Table Headers Overlapping Content
**Problem:** `<th>` elements had transparent background, causing content to show through on scroll.

**Solution:**
```css
th {
  position: sticky;
  top: 0;
  background-color: #e0e0e0;
  z-index: 10;
}
```

### Issue 2: BST/LinkedList Containers Expanding Page
**Problem:** Visualization containers grew with content, pushing other elements.

**Solution:**
```css
.viz-scroll {
  max-height: 300px;
  overflow-y: auto;
}
```

### Issue 3: LinkedList Scroll Not Working
**Solution:**
```css
.ll-scroll {
  max-height: 300px !important;
  height: 300px !important;
  overflow-y: auto !important;
}
```

### Hard Refresh Instructions
- **Windows:** `Ctrl + Shift + R` or `Ctrl + F5`
- **Clear cache:** DevTools → Network → Disable cache + hard reload

---

## 6. How to Run the Project

### Prerequisites
- Node.js installed

### Installation & Run
```powershell
# Navigate to project
cd Express Banking System

# Install dependencies
npm install

# Start server
node server.js
```

### Access
Open browser to: `http://localhost:3000`

---

## 7. Conclusion & Future Improvements

### Achievements
- ✅ Fully functional banking system
- ✅ Dual data structure implementation (LinkedList + BST)
- ✅ Modern UI with responsive design
- ✅ Real-time updates without page reload
- ✅ Working scrollable visualizations

### Future Improvements
1. **Authentication** - Login/registration system
2. **Persistent Storage** - Database integration (MongoDB/PostgreSQL)
3. **Security** - JWT tokens, password hashing
4. **Advanced Visualizations** - Animated tree structures
5. **Mobile App** - React Native or Flutter wrapper
6. **RESTful API** - Full CRUD operations

---

*Document created: April 2026*
*For Word conversion: Open .md file in Microsoft Word or use markdown converter*