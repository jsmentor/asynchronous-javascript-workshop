
var jsonContent = '{"privateEmail": "user-private@example.com","bankAccount": "111-111-11-111","phoneNumber": "+1 111 666 789","birthDate": "1983-04-22T20:30:00.000Z"}';

var fs = {
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
//   var data = fs.readFileSync();
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

// var currentList = [
//   asyncOperation,

// ];

// var currentList = [
//   f1,
//   f2
// ];

// // 15 seconds

// var currentList = [
//   callback
// ];


// // V8/C++ Timer API
// // setTimeout(func, milisec)
// // waits for milisec then adds that func to the currentList

// What the heck is JavaScript Event Loop
// https://www.youtube.com/watch?v=8aGhZQkoFbQ

