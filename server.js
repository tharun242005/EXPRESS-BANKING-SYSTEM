require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Bank = require('./backend/Bank');

const app = express();
const PORT = process.env.PORT || 3000;

const bank = new Bank();

bank.addAccount(1001, 5000);
bank.addAccount(1002, 3000);
bank.addAccount(1003, 1000);

app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));

app.get('/', (req, res) => {
  res.sendFile('frontend/index.html', { root: __dirname });
});

app.get('/api/accounts', (req, res) => {
  const accounts = bank.getAllAccounts();
  res.json(accounts);
});

app.get('/api/balance/:accNum', (req, res) => {
  try {
    const balance = bank.getBalance(req.params.accNum);
    res.json({ accountNumber: req.params.accNum, balance });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.post('/api/transfer', (req, res) => {
  try {
    const { from, to, amount } = req.body;
    if (!from || !to || amount === undefined) {
      return res.status(400).json({ error: 'Missing required fields: from, to, amount' });
    }
    const message = bank.transfer(from, to, amount);
    res.json({ message });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/transactions/:accNum', (req, res) => {
  try {
    const transactions = bank.getTransactions(req.params.accNum);
    res.json({ accountNumber: req.params.accNum, transactions });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

app.post('/api/create', (req, res) => {
  try {
    const { accountNumber, balance = 0 } = req.body;
    if (!accountNumber) {
      return res.status(400).json({ error: 'accountNumber is required' });
    }
    const account = bank.addAccount(accountNumber, balance);
    res.status(201).json(account);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/bst-structure', (req, res) => {
  const structure = bank.getBSTStructure();
  res.json(structure);
});

app.get('/api/linkedlist-structure', (req, res) => {
  const structure = bank.getLinkedListStructure();
  res.json(structure);
});

if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bank API running on http://localhost:${PORT}`);
  });
}

module.exports = app;