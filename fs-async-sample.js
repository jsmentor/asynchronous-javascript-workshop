
var fs = require('fs'),
  present = require('present');

function logDuration(startedAt, message) {
    console.log(`>> ${message} >> duration:`, present() - startedAt);
}

function getFile() {
  console.log('>>>>>>>> Start: getFile');
    function readFileCallback (err, data) {
        console.log('>>>>>>>> Start: readFileCallback');
        if (err) {
            return console.error(err);
        }

        //logDuration(startMoment, 'after recieving the data');

        //console.log('RESULT:', data);
        console.log('>>>>>>>> Finish: readFileCallback');
    }

    var startMoment = present();
    //console.log('>> Before calling fs.readFile');
    fs.readFile('sample.json', 'utf-8', readFileCallback);
    //logDuration(startMoment, 'After fs.readFile');
    console.log('>>>>>>>>>> Finish: getFile');
}
/*

>>>>>>>> Start: getFile
>>>>>>>>>> Finish: getFile
HERE
>>>>>>>> Start: readFileCallback
>>>>>>>> Finish: readFileCallback

*/

function getFileSync() {
    try{
      var startMoment = present();
      console.log('>> Before calling fs.readFileSync');

      // PAUSED
      var data = fs.readFileSync('data/users2.json', 'utf-8');

      // PLAY
      logDuration(startMoment, 'After calling fs.readFileSync');
      console.log('length:', data.length);
    } catch(err){
      console.error(err);
    }
}

function main(){
  // getFile();

  getFileSync();
}

main();

/*

>> Fake getJSON >> duration: 15023.281747817993
RESULT:

*/