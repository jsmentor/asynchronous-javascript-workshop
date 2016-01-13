# combinators
The word “combinator” has a precise technical meaning in mathematics:

> “A combinator is a higher-order function that uses only function application and earlier defined combinators to define a result from its arguments.”–Wikipedia

## a looser definition of “combinator:”
Higher-order pure functions that take only functions as arguments and return a function. We won’t be strict about using only previously defined combinators in their construction.

## Compose

```javascript
const compose = (a, b) =>
  (c) => a(b(c))
```
Let’s say we have:
```javascript
const addOne = (number) => number + 1;

const doubleOf = (number) => number * 2;
```
With compose, anywhere you would write
```javascript
const doubleOfAddOne = (number) => doubleOf(addOne(number));
```
You could also write:
```javascript
const doubleOfAddOne = compose(doubleOf, addOne);
```

So one perspective is that combinators are useful when you want to emphasize what you’re doing and how it fits together, and more explicit code is useful when you want to emphasize what you’re working with.

## function decorators
A function decorator is a higher-order function that takes one function as an argument, returns another function, and the returned function is a variation of the argument function. Here’s a ridiculously simple decorator:16
```javascript
const not = (fn) => (x) => !fn(x)
```
So instead of writing `!someFunction(42)`, we can write `not(someFunction)(42)`.

## partial application
Another basic building block is partial application. When a function takes multiple arguments, we “apply” the function to the arguments by evaluating it with all of the arguments, producing a value. But what if we only supply some of the arguments? In that case, we can’t get the final value, but we can get a function that represents part of our application.
```javascript
_.map([1, 2, 3], (n) => n * n)
  //=> [1, 4, 9]
```
This code implements a partial application of the map function by applying the function `(n) => n * n` as its second argument:
```javascript
const squareAll = (array) => map(array,  (n) => n * n);
```
The resulting function–`squareAll`–is still the map function, it’s just that we’ve applied one of its two arguments already.
