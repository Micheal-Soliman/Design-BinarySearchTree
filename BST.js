class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}

class BST {
    constructor() {
        this.root = null
    }

    isEmpty() {
        return this.root == null
    }

    insert(value) {
        const newNode = new Node(value)
        if (this.isEmpty()) {
            this.root = newNode
        } else {
            this.insertNode(this.root, newNode)
        }

    }

    insertNode(root, newNode) {
        if (newNode.value < root.value) {
            if (root.left === null) {
                root.left = newNode
            } else {
                this.insertNode(root.left, newNode)
            }
        } else {
            if (root.right === null) {
                root.right = newNode
            } else {
                this.insertNode(root.right, newNode)
            }
        }
    }

    search(root, value) {
        if (this.isEmpty()) {
            return false
        }
        if (root.value == value) {
            return true
        } else {
            if (value < root.value) {
                return this.search(root.left, value)
            } else {
                return this.search(root.right, value)
            }
        }
    }


    preOrderTraversal(root) {
        if (root) {
            console.log(root.value);
            this.preOrderTraversal(root.left)
            this.preOrderTraversal(root.right)
        }
    }

    inOrderTraversal(root) {
        if (root) {
            this.preOrderTraversal(root.left)
            console.log(root.value);
            this.preOrderTraversal(root.right)
        }
    }

    postOrderTraversal(root) {
        if (root) {
            this.inOrderTraversal(root.left)
            this.inOrderTraversal(root.right)
            console.log(root.value);
        }
    }

    levelOrderTraversal() {
        let queue = []
        queue.push(this.root)
        while (queue.length) {
            let current = queue.shift()
            console.log(current.value);
            if (current.left) {
                queue.push(current.left)
            }
            if (current.right) {
                queue.push(current.right)
            }
        }
    }

    min(root) {
        if (root.left) {
            return this.min(root.left)
        } else {
            return root.value
        }
    }

    max(root) {
        if (root.right) {
            return this.min(root.right)
        } else {
            return root.value
        }
    }

    delete(value) {
        this.root = this.deleteNode (this.root, value)
    }
    
    deleteNode(root, value){
        if (root === null) {
            return root
        }
        if (value < root.value) {
            root.left = this.deleteNode(root.left, value)
        }else if(value > root.value){
            root.right = this.deleteNode(root.right, value)
        }else{
            if (!root.left && !root.right) {
                return null
            }
            if (!root.left) {
                return root.right
            } else if (!root.right) {
                return root.left
            }
            root.value = this.min(root.right)
            root.right = this.deleteNode(root.right, root.value)
        }
        return root
    }

    isValidBST() {
        let validBST = true
        let prevNode = new Node(-Infinity)
        const inOrderTraverse = (node) => {
            if (validBST) {
                node.left && inOrderTraverse(node.left)
                if (node.value <= prevNode.value) {
                    validBST = false
                }
                prevNode = node
                node.right && inOrderTraverse(node.right)
            }
        }
        inOrderTraverse(this.root)
        return validBST
    };

    deepestLeavesSum() {
        let sums = []
        const dfs = (node, lvl) => {
            if (lvl === sums.length) {
                sums[lvl] = node.value
                console.log(lvl);
            }
            else {
                sums[lvl] += node.value
            }
            if (node.left) dfs(node.left, lvl + 1)
            if (node.right) dfs(node.right, lvl + 1)
        }
        dfs(this.root, 0)
        return sums[sums.length - 1]
    }

}

const bst = new BST()


bst.insert(10)
bst.insert(5)
bst.insert(15)
bst.insert(3)
bst.insert(7)

// bst.insert(1)
// bst.insert(2)
// bst.insert(3)
// bst.insert(4)
// bst.insert(5)
// bst.insert(null)
// bst.insert(6)
// bst.insert(7)
// bst.insert(null)
// bst.insert(null)
// bst.insert(null)
// bst.insert(null)
// bst.insert(8)





// console.log(bst.search(bst.root, 5));
// console.log(bst.preOrderTraversal(bst.root));
// console.log(bst.inOrderTraversal(bst.root));
// console.log(bst.levelOrderTraversal());
// console.log(bst.min(bst.root));
// console.log(bst.max(bst.root));
// console.log(bst.isValidBST());
console.log(bst.deepestLeavesSum());
// console.log(bst.levelOrderTraversal());
// bst.delete(5)
// console.log(bst.levelOrderTraversal());


