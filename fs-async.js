
let jsonContent = '{"privateEmail": "user-private@example.com","bankAccount": "111-111-11-111","phoneNumber": "+1 111 666 789","birthDate": "1983-04-22T20:30:00.000Z"}';

let fs = {
  readFile: readFile,
  readFileSync: readFileSync,
  version: '1.0.0'
};

function readFile(fileName, charset, callback){

  setTimeout(function(){
    callback(null, jsonContent);
  }, 5000);

}

function readFileSync(fileName, charset){

  // pause and play: pause everything in JS engine
  return jsonContent;


}

module.exports = fs;

// function syncOperation(){
//   let data = fs.readFileSync();
//   // BLOCKS
//   console.log(data);
// }

// function asyncOperation(){
//   function callback(){
//     console.log(data);
//   }
//   fs.readFileAsync(params, callback);
// }
// asyncOperation();

// let currentList = [
//   asyncOperation,

// ];

// let currentList = [
//   f1,
//   f2
// ];

// // 15 seconds

// let currentList = [
//   callback
// ];


// // V8/C++ Timer API
// // setTimeout(func, milisec)
// // waits for milisec then adds that func to the currentList

// What the heck is JavaScript Event Loop
// https://www.youtube.com/watch?v=8aGhZQkoFbQ

