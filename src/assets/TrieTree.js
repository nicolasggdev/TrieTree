import { TrieTreeNode } from "./TrieTreeNode";

export class TrieTree {
  constructor(words) {
    this.root = new TrieTreeNode(null);
    this.string = words;
    if (words) {
      for (let i = 0; i < words.length; i++) {
        this.insert(words[i]);
      }
    }
  }

  findNode(prefix) {
    if (prefix.length === 0) {
      return [this.root, 0];
    }

    let [node, depth] = [this.root, 0];
    for (let i = 0; i < prefix.length; i++) {
      if (node.hasChild(prefix[i]) === true) {
        node = node.getChild(prefix[i]);
        depth += 1;
      } else {
        return [node, 0];
      }
    }
    return [node, depth];
  }

  traverse(node, prefix, visit) {
    if (node.isTerminal()) {
      visit(prefix);
    }
    let temp = Object.keys(node.children);
    for (const char of temp) {
      const next_node = node.getChild(char);
      this.traverse(next_node, prefix + char, visit);
    }
  }

  isEmpty() {
    return this.size === 0;
  }

  contains(str) {
    let current = this.root;
    for (let character of str) {
      if (current.children[character] === undefined) {
        return false;
      }
      current = current.children[character];
    }
    return current.isEndOfWord;
  }

  insert(str) {
    let current = this.root;

    for (let character of str) {
      if (current.children[character] === undefined) {
        current.children[character] = new TrieTreeNode(character);
      }

      current = current.children[character];
    }

    current.isEndOfWord = true;
  }

  complete(prefix) {
    const completions = [];

    const [node, depth] = this.findNode(prefix);

    if (depth === 0) {
      return completions;
    }

    this.traverse(node, prefix, completions.push.bind(completions));
    return completions;
  }

  allTreeStrings() {
    const all_strings = [];
    this.traverse(this.root, "", all_strings.push.bind(all_strings));
    return all_strings;
  }
}
