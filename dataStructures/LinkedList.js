const Node = require('./Node');

/**
 * @class LinkedList
 * @description Singly linked list for managing accounts.
 */
class LinkedList {
  /**
   * @constructor
   */
  constructor() {
    /**
     * @property {Node|null} head - The first node in the list.
     */
    this.head = null;
  }

  /**
   * @method add
   * @description Appends a new account to the end of the list.
   * @param {Object} account - The account data to add.
   * @returns {void}
   */
  add(account) {
    const newNode = new Node(account);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  /**
   * @method find
   * @description Finds a node by account number.
   * @param {string|number} accountNumber - The account number to search for.
   * @returns {Node|null} The node if found, otherwise null.
   */
  find(accountNumber) {
    const searchNum = Number(accountNumber);
    let current = this.head;
    while (current) {
      if (Number(current.account.accountNumber) === searchNum) {
        return current;
      }
      current = current.next;
    }
    return null;
  }

  /**
   * @method remove
   * @description Removes a node by account number.
   * @param {string|number} accountNumber - The account number of the node to remove.
   * @returns {boolean} True if removed, false otherwise.
   */
  remove(accountNumber) {
    if (!this.head) return false;

    if (this.head.account.accountNumber === accountNumber) {
      this.head = this.head.next;
      return true;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.account.accountNumber === accountNumber) {
        current.next = current.next.next;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  /**
   * @method toArray
   * @description Converts the list to an array of account objects.
   * @returns {Object[]} Array of all account objects.
   */
  toArray() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.account);
      current = current.next;
    }
    return result;
  }

  toNestedJSON() {
    const serializeNode = (node) => {
      if (!node) return null;
      return {
        accountNumber: node.account.accountNumber,
        balance: node.account.balance,
        next: serializeNode(node.next)
      };
    };
    return serializeNode(this.head);
  }
}

module.exports = LinkedList;