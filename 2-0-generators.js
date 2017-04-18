function makeIterator(array) {
  let nextIndex = 0;

  return {
    next: function () {
      return nextIndex < array.length ? {
        value: array[nextIndex++],
        done: false
      } : {
        done: true
      };
    }
  }
}

function* idMaker() {
  let index = 0;
  while (index < 3)
    yield index++;
}

let gen = idMaker();

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // undefined
// ...


function* anotherGenerator(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function* generator(i) {
  yield i;
  yield * anotherGenerator(i);
  yield i + 10;
}

let gen2 = generator(10);

console.log(gen2.next().value); // 10
console.log(gen2.next().value); // 11
console.log(gen2.next().value); // 12
console.log(gen2.next().value); // 13
console.log(gen2.next().value); // 20
