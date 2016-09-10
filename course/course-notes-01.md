# Course: Asynchronous JavaScript Programming

In this course we are going to cover the History of Asynchronous programming in JavaScript.
 - All the way from using callbacks in its early days when ajax got invented to using Promises.
 - the effects that Function Generators have had in Asynchronous JavaScript with the new `yield` keyword.
 - ES7 Async functions with adding 2 new keywords to JavaScript syntax: `async` and `await`
We will cover different best practices in different parts of JavaScript history.

The first step to start this journey is to find the root of this issue and asnwer to this question:
 - Why do we need Asynchronous operations
 - What do we need Asynchronous operations for
 - Why this is not enough to stick to synchronous operations

# JavaScript Events

The first experience we had with aync operations was implementing JavaScript Events.
It is debatable whether JavaScript Events can be called async or not but the way we setup
event listeners in JavaScript are definetely close to the async concept.
Setting up an Event listener in JavaScript and waiting for the event handler to be called are 2 different steps
which is exactly the way we could look at an async operation.

lets start with a simple example. we want to run a certaion task when the page is loaded so we need to setup an event listener
to listen to `load` event. To do so we need to first create a functopn which we want it to the task:

```javascript
function loadEventHandler(){
  console.log('>> load event listener is being invoked');
  // run the task here
}
```

the second step is to pass this function as the `load` event listener:

```javascript
console.log('>> before adding the listener');
window.addEventListener('load', loadEventHandler);
console.log('>> after adding the listener');
```

As we could see in this example we have 2 different steps in the whole operation.
first is when we add the listener and second when the listener is being actually invoked.
what we could also to is to use an anonymous inline function to do the same:

```javascript
console.log('>> before adding the listener');
window.addEventListener('load', function (){
  console.log('>> load event listener is being invoked');
  // run the task here
});
console.log('>> after adding the listener');
```

there is no difference between the two way of adding the listener except that when we use anonymous functions
both steps seem to be reduced to one which is not true. we still have the 2 steps. It might seem no-brainer
but it is important to know that the code we put inside the function is being called after when we call this piece of code,
later when the `load` event is triggered, which means in the real-time we will have a console  out put like this:

>> before adding the listener
>> after adding the listener
....
>> load event listener is being invoked

# Ajax calls

Now with the same mindset and terminology lets try to implement our first actual async operation using a XHR request
or what we might know as Ajax.

Before we step into the example, lets first read what is the defenition of Ajax in wiki:

> Ajax (also AJAX; /ˈeɪdʒæks/; short for asynchronous JavaScript and XML) is a set of web development techniques
  using many web technologies on the client-side to create asynchronous Web applications. With Ajax, web applications
  can send data to and retrieve from a server asynchronously (in the background) without interfering with the display
  and behavior of the existing page. By decoupling the data interchange layer from the presentation layer, Ajax allows
  for web pages, and by extension web applications, to change content dynamically without the need to reload the entire
  page. In practice, modern implementations commonly substitute JSON for XML due to the advantages of being native to
  JavaScript.

As it is mentioned `X` in Ajax stands for `XML` whereas we no longer use XML for data exchsnge these days, but in a
nutshell Ajax is a technique to "send data to and retrieve from a server asynchronously".

Now lets implement a simple Ajax operation, to retrieve data from a server. After retrieving the data we always want
to take the next step and process the data. Instead of using jQuery or any JavaScript library lets implement it from scratch:

```javascript
// lets get the html data of google's home page
function getData(){
  // first step is to create a request object
  var request = new XMLHttpRequest();

  // at this step readyState value is 0
  console.log('request.readyState = 0: request not initialized');
  console.log('request.readyState => ', request.readyState); // would be 0

  // second step is to add the event listener before sending the request
  // this is exactly similar to when we add the event listener for load event

  request.onreadystatechange = function(){
    // this function would be called in 4 different steps of the request lifecycle
    if(request.readyState === 1){
      console.log('request.readyState = 1: server connection established');
    } else if(request.readyState === 2){
      console.log('request.readyState = 2: request received');
    } else if(request.readyState === 3){
      console.log('request.readyState = 3: processing request');
    } else if(request.readyState === 4){
      console.log('request.readyState = 4: request finished and response is ready');
    }
  };

  // third step is to open the request
  request.open('GET', 'https://www.google.com/');

  // after openning the request readyState changes to 1
  console.log('request.readyState => ', request.readyState); // would be 1

  // forth and final step is to send the request
  request.send(null);

  return request.response;
}
```

This is what you will see in logs when you call the `getData` function:

```
request.readyState = 0: request not initialized
request.readyState =>  0

request.readyState = 1: server connection established
request.readyState =>  1

request.readyState = 2: request received
request.readyState = 3: processing request
request.readyState = 4: request finished and response is ready
```

```javascript

function getData(callback){
  var request = new XMLHttpRequest();

  request.onreadystatechange = function(){
    if(request.readyState === 4){
      if(typeof callback === 'function'){
        callback(request.response);
      }
    }
  };

  // third step is to open the request
  request.open('GET', 'https://www.google.com/');

  // forth and final step is to send the request
  request.send(null);
}


var obj = {};
getData(function(data){
  obj.data = data;
});


```

# Main characteristics of asynchronous operations

1- They cannot immediately calculate their return value