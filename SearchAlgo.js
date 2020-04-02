class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  dfs(values=[]) {
    if (this.left) {
      values = this.left.dfs(values);
    }
    values.push(this.value);

    if (this.right) {
      values = this.right.dfs(values);
    }
    return values;
  }

  bfs(tree, values=[]) {
    const queue = new Queue();
    const node = tree.root;
    queue.enqueue(node);
    while (queue.length) {
      const node = queue.dequeue();
      values.push(node.value);

      if (node.left) {
        queue.enqueue(node.left);
      }

      if (node.right) {
        queue.enqueue(node.right);
      }
    }
    return values;
  }
}


// 1. How many searches ?
//     Given a sorted list 3, 5, 6, 8, 11, 12, 14, 15, 17, 18 and are using the recursive binary search algorithm.Identify the sequence of numbers that each recursive call will search to find 8.

// 3 searches: 11 - 6 - 8

// Given a sorted list 3, 5, 6, 8, 11, 12, 14, 15, 17, 18 and are using the recursive binary search algorithm.Identify the sequence of numbers that each recursive call will search to find 16 ?

// 3 searches: 11 - 15 - 17 


// Searching in a BST

//** No coding is needed for these drills**. Once you have answered it, you can then code the tree and implement the traversal to see if your answer is correct.


// 1) Given a binary search tree whose in-order and pre-order traversals are respectively 14 15 19 25 27 35 79 89 90 91 and 35 25 15 14 19 27 89 79 91 90. What would be its postorder traversal?

//In-Order: 14 15 19 25 27 35 79 89 90 91
//Pre-Order: 35 25 15 14 19 27 89 79 91 90
//Post-Order: 14, 19, 15, 27, 25, 79, 90, 91, 89, 35

// 2) The post order traversal of a binary search tree is 5 7 6 9 11 10 8. What is its pre-order traversal?
//Pre-order: 8, 6, 5, 7, 10, 9, 11


// Max Profit

function maxProfit(arr){
  if(arr.length < 2){
    return 'not enough data'
  }
  let currMaxProf = arr[0] - arr[1]
  let dayToBuy = 0

  for(let i = 2; i < arr.length; i++){
    let profit = arr[i - 1] - arr[i]
    // console.log(`index = ${i}, profit = ${profit}`)
    if(profit > currMaxProf){
      currMaxProf = profit
      dayToBuy = i - 1
    }
  }
  return `Buy on day '${dayToBuy}' for a profit of '${currMaxProf}'`
}

function main(){
  let weekOne = [
    128, 97, 121, 123, 98, 97, 105
  ]
  console.log(maxProfit(weekOne))
  let weekTwo = [
    128, 97, 121, 123, 198, 97, 105
  ]
  console.log(maxProfit(weekTwo))
  let weekThree = [
    100, 100, 100, 100, 100, 100, 100
  ]
  console.log(maxProfit(weekThree))
}

main()