export class TrieTreeNode {
  constructor(value) {
    this.value = value;
    this.isEndOfWord = false;
    this.children = {};
  }

  isTerminal() {
    return this.isEndOfWord;
  }

  numChildren() {
    return this.children.length;
  }

  hasChild(character) {
    let temp = Object.keys(this.children);
    for (let key of temp) {
      if (key === character) {
        return true;
      }
    }
    return false;
  }

  getChild(character) {
    if (this.hasChild(character)) {
      return this.children[character];
    }
    return false;
  }

  addChild(character, child_node) {
    if (!this.hasChild(character)) {
      this.children = child_node.value;
    } else {
      throw new Error(`Child exists for: ${character}`);
    }
  }
}
