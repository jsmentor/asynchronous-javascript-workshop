# ES5/ES6/ES7 ES2015/ES2016

Node.js 4.x has ES6 and some ES7 support.

Cheshmak backend Node 4.6.1 --> 4.9.9 --> 6

Node 5.x: recommended not to be used in production

Node 6:

CommonJS: require, module.export
JS Module Loader: import, export

## 1. Promise

```javascript
// Promise
// Q
function getUsersList()
    var deferred = Q.defer();

    deferred.resolve()
    deferred.reject();

    return deferred.promise;
}

function getUsersList(){
    return Q.fcall(function(){
      var myVar = 12;
      //
      //
      //
      //
      throw new Error();//reject
    })
    .then()
    .then()
    .catch(function(){

    });
}

function getUsersList(param){
    if(!param){
      //throw new Error()
       return Q.reject(new Error());
    }
    return Q.fcall(function(){

        var deferred = Q.defer();

        deferred.resolve()
        deferred.reject();

        return deferred.promise;

    })
    .then()
    .then()
    .catch(function(){

    });
}

function getUsersList(){
    // Bad practice
    // throw new Error()
    return new Promise(function(resolve, reject){

        setTimeout(function(){
            if(window.myVar){
               resolve(myVar);
            } else {
               reject(-1);
            }
        }, 1000);

        // throw new Error()

    });
}

```

## 2. Arrow Function

```javascript

var array = [{x:1},{x:2}];

var self = this;
_.map(array, function(item){
  return item.x + 5;
});


var self = this;
_.map(array, (item) => {
  return item.x + 5;
});

_.map(array,(item) => item.x + 5);

```

## 3. Yield keyword

```javascript

function fn(){

}

fn();

// pause

function * func(){
   yield 12;

   yield 13;

   return 15;
}

var generator = func();

// Function generator
// Iterable/Generator/yield

```