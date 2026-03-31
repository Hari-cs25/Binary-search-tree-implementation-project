function Node(data){
    return {data, leftChild:null, rightChild:null};
}

function Tree(arr){
 const sarr = arr.sort((a, b) => a - b);
 const root = buildTree(sarr);

 function buildTree(arr){
    const mid = arr[Math.floor(arr.length/2)];
    const root = Node(mid);

    for(let item of arr){
        if(item === mid)
            continue;

        treves(root, item);
      }
    return root;
} 

function treves(obj, item){
                if(item < obj.data && obj.leftChild === null){
                    obj.leftChild = Node(item);
                }else if( item > obj.data && obj.rightChild === null){
                    obj.rightChild = Node(item);
                }else if( item < obj.data && obj.leftChild != null){
                    treves(obj.leftChild, item);
                }else{
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
    if(root.data === value)
        return true;
    else if(value < root.data && root.leftChild != null)
        return includes(value, root.leftChild)
    else if(value > root.data && root.rightChild != null)
        return includes(value, root.rightChild)
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
        return;

     function find(obj){
         if(obj.data === value){
            if(obj.leftChild === null && obj.rightChild === null){
                return null;
            }else if(obj.leftChild != null && obj.rightChild != null){
                
            }else if(obj.leftChild != null && obj.rightChild === null){
                const temp = {obj: obj.leftChild, name: 'leftChild'};
                obj.leftChild = null;
                return temp;
            }else{
                const temp = {obj: obj.rightChild, name: 'rightChild'};
                obj.rightChild = null;
                return temp;
            }
         }else if(value < obj.data){
            let result = find(obj.leftChild);

            if(result === null){
                obj.leftChild = null;
            }else if(result.name === 'leftChild'){
                obj.leftChild = result.obj;
            }else if(result.name === 'rightChild'){
                obj.rightChild = result.obj;
            }
         }
     }
}

 return {prettyPrint, includes, insert};
}


