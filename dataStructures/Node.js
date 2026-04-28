/**
 * @class Node
 * @description Represents a node in a singly linked list for account storage.
 */
class Node {
  /**
   * @constructor
   * @param {Object} account - The account data object.
   */
  constructor(account) {
    /**
     * @property {Object} account - The account data.
     */
    this.account = account;

    /**
     * @property {Node|null} next - Reference to the next node.
     */
    this.next = null;
  }
}

module.exports = Node;