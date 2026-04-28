const LinkedList = require('../dataStructures/LinkedList');
const TreeNode = require('../dataStructures/TreeNode');

/**
 * @class Bank
 * @description Banking system using LinkedList and BST for account management.
 */
class Bank {
  /**
   * @constructor
   */
  constructor() {
    /**
     * @property {LinkedList} list - Linked list for account storage.
     */
    this.list = new LinkedList();

    /**
     * @property {TreeNode|null} root - Root of the BST.
     */
    this.root = null;
  }

  /**
   * @method _insertBST
   * @description Recursively inserts an account into the BST.
   * @param {TreeNode|null} node - Current node.
   * @param {Object} account - Account to insert.
   * @returns {TreeNode} The resulting tree node.
   * @private
   */
  _insertBST(node, account) {
    if (!node) {
      return new TreeNode(account);
    }

    const accNum = Number(account.accountNumber);
    const nodeNum = Number(node.account.accountNumber);

    if (accNum < nodeNum) {
      node.left = this._insertBST(node.left, account);
    } else if (accNum > nodeNum) {
      node.right = this._insertBST(node.right, account);
    }

    return node;
  }

  /**
   * @method _searchBST
   * @description Recursively searches for an account in the BST.
   * @param {TreeNode|null} node - Current node.
   * @param {string|number} accountNumber - Account number to search.
   * @returns {TreeNode|null} The found node or null.
   * @private
   */
  _searchBST(node, accountNumber) {
    if (!node) return null;

    const accNum = Number(accountNumber);
    const nodeNum = Number(node.account.accountNumber);

    if (accNum === nodeNum) {
      return node;
    }

    if (accNum < nodeNum) {
      return this._searchBST(node.left, accountNumber);
    }

    return this._searchBST(node.right, accountNumber);
  }

  /**
   * @method addAccount
   * @description Creates a new account and adds it to the system.
   * @param {string|number} accountNumber - Unique account identifier.
   * @param {number} balance - Initial balance.
   * @returns {Object} The created account object.
   */
  addAccount(accountNumber, balance = 0) {
    const account = {
      accountNumber,
      balance,
      transactions: []
    };

    this.list.add(account);
    this.root = this._insertBST(this.root, account);

    return account;
  }

  /**
   * @method findAccount
   * @description Finds an account by account number.
   * @param {string|number} accountNumber - Account number to find.
   * @returns {Object|null} The account object or null if not found.
   */
  findAccount(accountNumber) {
    const node = this._searchBST(this.root, accountNumber);
    if (node) {
      return node.account;
    }

    const listNode = this.list.find(accountNumber);
    return listNode ? listNode.account : null;
  }

  /**
   * @method getBalance
   * @description Retrieves the balance of an account.
   * @param {string|number} accountNumber - Account number.
   * @returns {number} The balance.
   * @throws {Error} If account not found.
   */
  getBalance(accountNumber) {
    const account = this.findAccount(accountNumber);
    if (!account) {
      throw new Error(`Account ${accountNumber} not found`);
    }
    return account.balance;
  }

  /**
   * @method transfer
   * @description Transfers funds between two accounts.
   * @param {string|number} fromAcc - Source account number.
   * @param {string|number} toAcc - Destination account number.
   * @param {number} amount - Amount to transfer.
   * @returns {string} Success message.
   * @throws {Error} If accounts not found or insufficient funds.
   */
  transfer(fromAcc, toAcc, amount) {
    const fromAccount = this.findAccount(fromAcc);
    if (!fromAccount) {
      throw new Error(`Account ${fromAcc} not found`);
    }

    const toAccount = this.findAccount(toAcc);
    if (!toAccount) {
      throw new Error(`Account ${toAcc} not found`);
    }

    if (amount <= 0) {
      throw new Error('Transfer amount must be positive');
    }

    if (fromAccount.balance < amount) {
      throw new Error('Insufficient funds');
    }

    fromAccount.balance -= amount;
    toAccount.balance += amount;

    const transaction = {
      type: 'transfer',
      amount,
      toAccount: toAcc,
      fromAccount: fromAcc,
      timestamp: new Date()
    };

    fromAccount.transactions.push(transaction);
    toAccount.transactions.push(transaction);

    return `Successfully transferred ${amount} from ${fromAcc} to ${toAcc}`;
  }

  /**
   * @method getTransactions
   * @description Retrieves transactions for an account.
   * @param {string|number} accountNumber - Account number.
   * @returns {Object[]} Array of transactions.
   * @throws {Error} If account not found.
   */
  getTransactions(accountNumber) {
    const account = this.findAccount(accountNumber);
    if (!account) {
      throw new Error(`Account ${accountNumber} not found`);
    }
    return account.transactions;
  }

  /**
   * @method getAllAccounts
   * @description Retrieves all accounts.
   * @returns {Object[]} Array of all accounts.
   */
  getAllAccounts() {
    return this.list.toArray();
  }

  getBSTStructure() {
    const serializeNode = (node) => {
      if (!node) return null;
      return {
        accountNumber: node.account.accountNumber,
        balance: node.account.balance,
        left: serializeNode(node.left),
        right: serializeNode(node.right)
      };
    };
    return serializeNode(this.root);
  }

  getLinkedListStructure() {
    return this.list.toNestedJSON();
  }
}

module.exports = Bank;