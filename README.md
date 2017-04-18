# jsremoteconf-2016
The Evolution of Asynchronous JavaScript: Callback Hell, Promises, Function Generators &amp; Yield, ES7 Async Funtions

# Asynchronous Programming Course

In this course we are going to cover the History of Asynchronous programming in JavaScript.
 - All the way from using callbacks in its early days when ajax got invented to using Promises.
 - the effects that Function Generators have had in Asynchronous JavaScript with the new `yield` keyword.
 - ES7 Async functions with adding 2 new keywords to JavaScript syntax: `async` and `await`
We will cover different best practices in different parts of JavaScript history.

The first step to start this journey is to find the root of this issue and asnwer to this question:
 - Why do we need Asynchronous operations
 - What do we need Asynchronous operations for
 - Why this is not enough to stick to synchronous operations


An awesome quote from JavaScript Allongé:
# The strength of JavaScript is that you can do anything. The weakness is that you will.

# Terminology

- **Pulling**
   when calling a function which has a return value we pull the return value:

```javascript
 var returnValue = func();
```

- **Pushing**

when passing an argument we push that argument to the function:

```javascript
 var returnValue = func(argument);
```

- **Control flow primitives**
 Control Flow Structures are an important aspect of programming languages that allow your code to take
 certain actions based on a variety of scenarios. Control Flow is a fundamental concept in programming that
 allows you to dictate how your code runs under different conditions or until a certain condition is met.

 - If, Else, Else if   
 - Operators: < Less than, == equal to , === equal to, != Not equal to, !== Not equal to
 - Switch
 - For
 - While
 - etc.