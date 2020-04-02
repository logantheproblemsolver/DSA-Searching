const Queue = require('./queue')


class BinarySearchTree {
  constructor(key = null, value = null, parent = null){
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
  insert(key, value){
    if(this.key == null){
      this.key = key;
      this.value = value;
    }
    else if(key < this.key){
      if(this.left == null){
        this.left = new BinarySearchTree(key, value, this)
      }
      else{
        this.left.insert(key, value)
      }
    }
    else{
      if(this.right == null){
        this.right = new BinarySearchTree(key, value, this)
      }
      else{
        this.right.insert(key, value)
      }
    }
  }
  find(key){
    if(this.key == key){
      return this.value
    }
    else if(key < this.key && this.left){
      return this.left.find(key)
    }
    else if(key > this.key && this.right){
      return this.right.find(key)
    }
    else{
      throw new Error('Key Error')
    }
  }
  remove(key){
    if(this.key == key){
      if(this.left && this.right){
        const successor = this.right._findMin()
        this.key = successor.key
        this.value = successor.value
        successor.remove(successor.key)
      }
      else if(this.left){
        this._replaceWith(this.left)
      }
      else if(this.right){
        this._replaceWith(this.right)
      }
      else{
        this._replaceWith(null)
      }
    }
    else if(key < this.key && this.left){
      this.left.remove(key)
    }
    else if(key > this.key && this.right){
      this.right.remove(key)
    }
    else{
      throw new Error('Key Error')
    }
  }
  _replaceWith(node){
    if(this.parent){
      if(this == this.parent.left){
        this.parent.left = node
      }
      else if(this == this.parent.right){
        this.parent.right = node
      }
      if(node){
        node.parent = this.parent
      }
    }
    else{
      if(node){
        this.key = node.key
        this.value = node.value
        this.left = node.left
        this.right = node.right
      }
      else{
        this.key = null
        this.value = null
        this.left = null
        this.right = null
      }
    }
  }
  _findMin(){
    if(!this.left){
      return this
    }
    return this.left._findMin()
  }
  // depth first search (in-order[L - Curr - R])
  inOrder(values = []){
    if(this.left){
      values = this.left.inOrder(values)
    }
    values.push(this.value)
    if(this.right){
      values = this.right.inOrder(values)
    }
    return values
  }
  // depth first search (pre-order[Curr - L - R])
  preOrder(values = []){
    values.push(this.value)
    if(this.left){
      values = this.left.preOrder(values)
    }
    if(this.right){
      values = this.right.preOrder(values)
    }
    return values
  }
  // depth first search (post-order[L - R - Curr])
  postOrder(values = []){
    if(this.left){
      values = this.left.postOrder(values)
    }
    if(this.right){
      values = this.right.postOrder(values)
    }
    values.push(this.value)
    return values
  }
  // breadth first search
  bfs(values = []){
    const queue = new Queue()

    while(queue.length){
      const node = queue.dequeue()
      values.push(node.value)

      if(node.left){
        queue.enqueue(node.left)
      }
      if(node.right){
        queue.enqueue(node.right)
      }
    }
    return values
  }
  orderOfCommand(root){
    if(!root.value){
      return []
    }
    
    const queue = new Queue()
    queue.enqueue(root)
    let order = []
    while(queue.first){
      let node = queue.dequeue()
      order.push(node.value)

      if(node.left){
        queue.enqueue(node.left)
      }
      if(node.right){
        queue.enqueue(node.right)
      }
    }
    return order
  }
}

module.exports = BinarySearchTree


function main(){
  // initialize binary search tree
  const myBst = new bst()

  // insert data
  let data = [
    25, 15, 50, 10, 24, 35, 70, 4, 12, 18, 31, 44, 66, 90, 22
  ]
  data.forEach(int => myBst.insert(int, int))
  
  // console log results of depth first search results
  // console.log(myBst.preOrder())
  // console.log(myBst.inOrder())
  console.log(myBst.postOrder())
}

main()