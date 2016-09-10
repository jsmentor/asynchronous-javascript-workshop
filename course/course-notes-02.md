
# Synchronous error handling

No matter how many nested levels we have in a synchronous function, we could always catch errors using try catch.

```javascript
function main(){
  level1();
}

function level1(){
  console.log('Level-1');
  throw Error('Error in level1');
}

function level2(){
  console.log('Level-2');
  throw Error('Error in level2');
}

function level3(){
  console.log('Level-3');
  throw Error('Error in level3');
}


```