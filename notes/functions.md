# Notes from JavaScript Allongé, the "Six" Edition:

### Choices in software development
Choices in software development are also often driven by requirements specific to the type of software being developed. For example, business software written in-house has a very different set of requirements than a library written to be publicly distributed as open-source.

Choices in software development must also consider the question of consistency. If a particular codebase is written with lots of helper functions that place the subject first, like this:
```javascript
const mapIterableWith = (iterable, fn) =>
  ({
    [Symbol.iterator]: function* () {
      for (let element of iterable) {
        yield fn(element);
      }
    }
  });
```   
Then it can be jarring to add new helpers written that place the verb first, like this:   
```javascript
const filterIterableWith = (fn, iterable) =>
  ({
    [Symbol.iterator]: function* () {
      for (let element of iterable) {
        if (!!fn(element)) yield element;
      }
    }
  });
```
### Function is a value like all others
Let’s verify that our function is a value like all others:   
```javascript
(() => 0)
  //=> [Function]
```
What!? Why didn’t it type back `() => 0` for us? This seems to break our rule that if an expression is also a value, JavaScript will give the same value back to us. What’s going on? The simplest and easiest answer is that although the JavaScript interpreter does indeed return that value, displaying it on the screen is a slightly different matter. `[Function]` is a choice made by the people who wrote Node.js, the JavaScript environment that hosts the JavaScript.
