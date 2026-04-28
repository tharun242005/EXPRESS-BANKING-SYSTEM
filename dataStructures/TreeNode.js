/**
 * @class TreeNode
 * @description Represents a node in a binary search tree for account storage.
 */
class TreeNode {
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
     * @property {TreeNode|null} left - Left child node.
     */
    this.left = null;

    /**
     * @property {TreeNode|null} right - Right child node.
     */
    this.right = null;
  }
}

module.exports = TreeNode;