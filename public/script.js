const API_BASE = 'https://express-banking-system.web.app/api';

const createForm = document.getElementById('createForm');
const balanceForm = document.getElementById('balanceForm');
const transferForm = document.getElementById('transferForm');
const accountsTableBody = document.getElementById('accountsTableBody');

const createMessage = document.getElementById('createMessage');
const balanceMessage = document.getElementById('balanceMessage');
const balanceValue = document.getElementById('balanceValue');
const transferMessage = document.getElementById('transferMessage');
const accountsMessage = document.getElementById('accountsMessage');
const transactionsMessage = document.getElementById('transactionsMessage');
const bstMessage = document.getElementById('bstMessage');
const linkedListMessage = document.getElementById('linkedListMessage');

const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const modalTransactions = document.getElementById('modalTransactions');
const selectAccountText = document.getElementById('selectAccountText');

const loadingOverlay = document.getElementById('loadingOverlay');

function showLoading() {
  loadingOverlay.classList.add('active');
}

function hideLoading() {
  loadingOverlay.classList.remove('active');
}

function showMessage(element, message, isSuccess) {
  element.textContent = message;
  element.className = `message ${isSuccess ? 'success' : 'error'}`;
  setTimeout(() => {
    element.className = 'message';
  }, 5000);
}

async function loadAccounts() {
  try {
    showLoading();
    const response = await fetch(`${API_BASE}/accounts`);
    const accounts = await response.json();

    accountsTableBody.innerHTML = '';
    accounts.forEach(account => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${account.accountNumber}</td>
        <td>$${account.balance.toFixed(2)}</td>
        <td>
          <button class="btn-small" onclick="viewTransactions('${account.accountNumber}')">View</button>
        </td>
      `;
      accountsTableBody.appendChild(row);
    });
  } catch (err) {
    showMessage(accountsMessage, 'Failed to load accounts', false);
  } finally {
    hideLoading();
  }
}

createForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  showLoading();

  const accountNumber = document.getElementById('newAccNum').value;
  const balance = parseFloat(document.getElementById('newBalance').value) || 0;

  try {
    const response = await fetch(`${API_BASE}/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accountNumber, balance })
    });

    const result = await response.json();

    if (response.ok) {
      showMessage(createMessage, `Account ${accountNumber} created successfully!`, true);
      createForm.reset();
      loadAccounts();
    } else {
      showMessage(createMessage, result.error || 'Failed to create account', false);
    }
  } catch (err) {
    showMessage(createMessage, 'Failed to create account', false);
  } finally {
    hideLoading();
  }
});

balanceForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  showLoading();

  const accountNumber = document.getElementById('checkAccNum').value;

  try {
    const response = await fetch(`${API_BASE}/balance/${accountNumber}`);
    const result = await response.json();

    if (response.ok) {
      balanceValue.textContent = `$${result.balance.toFixed(2)}`;
      showMessage(balanceMessage, 'Balance retrieved successfully!', true);
    } else {
      balanceValue.textContent = '--';
      showMessage(balanceMessage, result.error || 'Failed to get balance', false);
    }
  } catch (err) {
    balanceValue.textContent = '--';
    showMessage(balanceMessage, 'Failed to get balance', false);
  } finally {
    hideLoading();
  }
});

transferForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  showLoading();

  const from = document.getElementById('fromAcc').value;
  const to = document.getElementById('toAcc').value;
  const amount = parseFloat(document.getElementById('amount').value);

  try {
    const response = await fetch(`${API_BASE}/transfer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to, amount })
    });

    const result = await response.json();

    if (response.ok) {
      showMessage(transferMessage, result.message, true);
      transferForm.reset();
      loadAccounts();
    } else {
      showMessage(transferMessage, result.error || 'Transfer failed', false);
    }
  } catch (err) {
    showMessage(transferMessage, 'Transfer failed', false);
  } finally {
    hideLoading();
  }
});

async function viewTransactions(accountNumber) {
  showLoading();
  selectAccountText.style.display = 'none';

  try {
    const response = await fetch(`${API_BASE}/transactions/${accountNumber}`);
    const result = await response.json();

    if (response.ok) {
      const transactionsList = document.getElementById('transactionsList');
      transactionsList.innerHTML = '';

      if (result.transactions.length === 0) {
        transactionsList.innerHTML = '<p class="select-account-text">No transactions found</p>';
      } else {
        result.transactions.forEach(tx => {
          const item = document.createElement('div');
          item.className = 'transaction-item';
          item.innerHTML = `
            <div class="transaction-type">${tx.type}</div>
            <div class="transaction-details">
              Amount: $${tx.amount.toFixed(2)}<br>
              From: ${tx.fromAccount} → To: ${tx.toAccount}<br>
              ${new Date(tx.timestamp).toLocaleString()}
            </div>
          `;
          transactionsList.appendChild(item);
        });
      }
    } else {
      showMessage(transactionsMessage, result.error || 'Failed to load transactions', false);
    }
  } catch (err) {
    showMessage(transactionsMessage, 'Failed to load transactions', false);
  } finally {
    hideLoading();
  }
}

window.viewTransactions = viewTransactions;

closeModal.addEventListener('click', () => {
  modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  loadAccounts();
});

async function loadBSTStructure() {
  showLoading();
  const container = document.getElementById('bstContainer');
  try {
    const response = await fetch(`${API_BASE}/bst-structure`);
    const data = await response.json();

    if (response.ok) {
      container.innerHTML = '';
      if (!data) {
        container.innerHTML = '<p class="select-account-text">No accounts in BST</p>';
      } else {
        const renderTree = (node) => {
          if (!node) return '';
          const hasChildren = node.left || node.right;
          let html = `<div class="tree-node">`;
          html += `<div class="tree-node-box">
            <span class="acc-num">${node.accountNumber}</span>
            <span class="balance">$${node.balance.toFixed(2)}</span>
          </div>`;
          if (hasChildren) {
            html += `<div class="tree-edge"></div>`;
            html += `<div class="tree-children">`;
            if (node.left) {
              html += `<div class="tree-branch">${renderTree(node.left)}</div>`;
            }
            if (node.right) {
              html += `<div class="tree-branch">${renderTree(node.right)}</div>`;
            }
            html += `</div>`;
          }
          html += `</div>`;
          return html;
        };
        container.innerHTML = renderTree(data);
      }
      showMessage(bstMessage, 'BST Structure loaded!', true);
    } else {
      showMessage(bstMessage, 'Failed to load BST structure', false);
    }
  } catch (err) {
    showMessage(bstMessage, 'Failed to load BST structure', false);
  } finally {
    hideLoading();
  }
}

async function loadLinkedListStructure() {
  showLoading();
  const container = document.getElementById('llContainer');
  try {
    const response = await fetch(`${API_BASE}/linkedlist-structure`);
    const data = await response.json();

    if (response.ok) {
      container.innerHTML = '';
      if (!data) {
        container.innerHTML = '<p class="select-account-text">No accounts in LinkedList</p>';
      } else {
        const renderList = (node) => {
          if (!node) return '<span class="list-null">null</span>';
          let html = `<div class="list-node">`;
          html += `<div class="list-node-box">
            <div>${node.accountNumber}</div>
            <div style="font-size: 0.75rem; opacity: 0.9;">$${node.balance.toFixed(2)}</div>
          </div>`;
          html += `<span class="list-arrow">→</span>`;
          html += renderList(node.next);
          html += `</div>`;
          return html;
        };
        container.innerHTML = renderList(data);
      }
      showMessage(linkedListMessage, 'LinkedList Structure loaded!', true);
    } else {
      showMessage(linkedListMessage, 'Failed to load LinkedList structure', false);
    }
  } catch (err) {
    showMessage(linkedListMessage, 'Failed to load LinkedList structure', false);
  } finally {
    hideLoading();
  }
}

window.loadBSTStructure = loadBSTStructure;
window.loadLinkedListStructure = loadLinkedListStructure;

const themeToggleBtn = document.getElementById('themeToggle');

function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  const emoji = newTheme === 'light' ? '☀️' : '🌙';

  html.setAttribute('data-theme', newTheme);
  themeToggleBtn.textContent = emoji;
  localStorage.setItem('theme', newTheme);
}

function loadSavedTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggleBtn.textContent = '☀️';
  }
}

document.addEventListener('DOMContentLoaded', loadSavedTheme);
window.toggleTheme = toggleTheme;