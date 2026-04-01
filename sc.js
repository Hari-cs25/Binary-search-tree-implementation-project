function Node(data){
    return {data, leftChild:null, rightChild:null};
}

function Tree(arr){
 const sarr = [...new Set(arr.sort((a, b) => a - b))];
 console.log('sorted array->', sarr)
 const root = BuildTree(sarr, 0, sarr.length-1);

function BuildTree(arr, start, end){
    if(start > end)
        return null;

    let mid = Math.floor((start + end)/2);
    let node = Node(arr[mid]);

    node.leftChild = BuildTree(arr, start, mid-1)
    node.rightChild = BuildTree(arr, mid+1, end)

    return node;
}


function treves(obj, item){
//console.log(obj,'\n');
        if(item === obj.data)
            return;

                if(item < obj.data && obj.leftChild === null){
                    obj.leftChild = Node(item);
                }else if( item > obj.data && obj.rightChild === null){
                    obj.rightChild = Node(item);
                }else if( item < obj.data && obj.leftChild != null){
                    //console.log(`\nleft move recursion\n`)
                    treves(obj.leftChild, item);
                }else{
                    //console.log(`\nright move recursion\n`)
                    treves(obj.rightChild, item);
                }
    }

 const prettyPrint = (node = root, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

function includes(value, obj = root){
    if(obj.data === value)
        return true;
    else if(value < obj.data && obj.leftChild != null)
        return includes(value, obj.leftChild)
    else if(value > obj.data && obj.rightChild != null)
        return includes(value, obj.rightChild)
    else
        return false;
}

function insert(value){
    if(includes(value))
        return;

    treves(root, value);
}

function deleteItem(value){
    if(!includes(value))
        return `'${value}', "There is no such value in Btree!!!"`;

    find(root);
     function find(obj){
        
         if(obj.data === value){
console.log('"value cautch in the btree."')

            if(obj.leftChild === null && obj.rightChild === null){
console.log('"value has no child."')
                return null;

            }else if(obj.leftChild != null && obj.rightChild != null){

                let large = findLarge(obj.leftChild);
                console.log(`\n'large viable replace obj:' ${large.data}\n`)
                console.log(`node level that we are in: ${obj.data}\n`)
                obj.data = large.data;
                console.log(`obj that we send into remaind(), ${obj.leftChild}, and larage left child: ${large.leftChild}`)
                 obj.leftChild = rewaind(obj.leftChild, large);

            }else if(obj.leftChild != null && obj.rightChild === null){

                const temp = {obj: obj.leftChild, name: 'leftChild'};``
                obj.leftChild = null;
                console.log('temp:', temp)
                return temp;

            }else{

                const temp = {obj:obj.rightChild, name:'rightChild'};
                obj.rightChild = null;
                return temp;
            }
         }else if(value < obj.data){

            console.log(`"Invoked recursion!!!"\n`)
            console.log('obj: ', obj)
            console.log('obj.leftChild: ', obj.leftChild)
            console.log('searching value: ', value)
            let result = find(obj.leftChild);
            console.log('result: ', result)
             if(result === undefined)
                return;

            if(result === null){
                obj.leftChild = null;
            }else if(result.name === 'leftChild'){
                obj.leftChild = result.obj;
            }else if(result.name === 'rightChild'){
                obj.rightChild = result.obj;
            }

         }else{
console.log('"else block actived."')
            let result = find(obj.rightChild)
            if(result === undefined)
                return;
            if(result === null){
                obj.rightChild = null;
            }else if(result.name === 'leftChild'){
                obj.leftChild = result.obj;
            }else if(result.name === 'rightChild'){
                obj.rightChild = result.obj;
            }

         }

         function findLarge(obj){
            console.log('"find large runss..."')
            if(obj.rightChild === null){
                console.log('"returning: "', obj)
                return obj;
            }

            return findLarge(obj.rightChild);
         }

         function rewaind(obj, target){
            console.log(`"object that in rewaind fun(): "${obj.data}`)
            let predicisorNode = temp(obj);

            if(target.leftChild != null){
                predicisorNode.rightChild = target.leftChild;
                target.leftChild = null;
            }else{
               predicisorNode.rightChild = null;
            }

             function temp(obj){
                console.log(`"object: "${obj.rightChild.data}`)
                    if(obj.rightChild.data === target.data){
                        return obj;
                    }else{
                      return temp( obj.rightChild);
                    }
                }
            return predicisorNode;
         }
     }
}
 function getRoot(){
        return root;
     }

function levelOrderTraversal() {
    let queue = [root];

    while (queue.length > 0) {
        let levelSize = queue.length;
        let line = "  ";

        for (let i = 0; i < levelSize; i++) {
            let node = queue.shift();

            if (!node) continue; // safety

            line += node.data + " ";

            if (node.leftChild) queue.push(node.leftChild);
            if (node.rightChild) queue.push(node.rightChild);
        }

        console.log(line);
    }
}

function inOrderTrevesal(node = root, line){
    if(node.leftChild)
        inOrderTrevesal(node.leftChild);
    console.log(node.data);
    if(node.rightChild)
        inOrderTrevesal(node.rightChild);
}

function preOrderTrevesal(node=root){
    console.log(node.data);
    if(node.leftChild)
        preOrderTrevesal(node.leftChild);
    if(node.rightChild)
        preOrderTrevesal(node.rightChild);
}

function postOrderTreversal(node=root){
    if(node.leftChild)
        postOrderTreversal(node.leftChild);
    if(node.rightChild)
        postOrderTreversal(node.rightChild);
    console.log(node.data);
}
 return {prettyPrint, includes, insert, deleteItem, getRoot, levelOrderTraversal, inOrderTrevesal, preOrderTrevesal, postOrderTreversal};
}

const tree = Tree( [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.prettyPrint()
console.log(tree.deleteItem(4))
tree.prettyPrint()
console.log('Level order traversal: \n',)
tree.levelOrderTraversal()
console.log(`In Order trevesal:\n`)
tree.inOrderTrevesal()
console.log(`pre Order trevesal:\n`)
tree.preOrderTrevesal()
console.log(`post Order trevesal:\n`)
tree.postOrderTreversal()