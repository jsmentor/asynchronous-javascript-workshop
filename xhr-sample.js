

$(function(){

  function getDataSync(){
    var req = new XMLHttpRequest();
    req.open('GET', 'https://ide.c9.io/fixjs/jsremoteconf-2016', true);

    // since the third parameter is true when you call req.send
    // it pauses everything BLOCKING
    req.send();

    // because it was waiting right here, req.response has the data
    return req.response;
  }

  function getData(callback){
    var time1;
    var req = new XMLHttpRequest();
    req.open('GET', 'https://ide.c9.io/fixjs/jsremoteconf-2016');

    req.onreadystatechange = function(){
      if(req.readState === 4){
        var time2 = new Date().getTime();//miliseconds
        var seconds = (time2 - time1) / 1000;
        console.log('We waitied for ' + seconds + ' seconds to get the data');

        // req.response has the response
        callback(req.response);
      }
    };

    // since the third parameter is false, when you call req.send
    // it doesn't pause anything NON-BLOCKING

    var time1 = new Date().getTime();//miliseconds
    req.send();

    // because it is async, req.response doesn't have the data yet
    // return req.response;
  }

  function showLoader(){
    $('.loader').show();
  }

  function hideLoader(){
    $('.loader').show();
  }

  function clickHandlerSync(){
    // PAUSE
    // means your function sends http request to the serverand waits for the response
    // and by waiting blocks everything
    showLoader();
    // git file is visible BUT the loader doesn't spin
    var data = getDataSync();
    hideLoader();

    $('.content').html();

  }


  function clickHandlerAsync(){
    showLoader();
    getData(function(data){
      hideLoader();
      $('.content').html(data);
    });
  }

  // <div class="loader hidden"><img src="loader.git" /></div>
  // <button class="saveData"></button>
  // <div class="content"></div>

  $('button.saveData').on('click', clickHandler);

});


var fileContent = getMeFileContentSync();
console.log('fileContent:', fileContent);

// 1:
function successCallback(fileContent){
  console.log('fileContent:', fileContent);
}

function errorCallback(err){
  console.error(err);
}

getMeFileContent(successCallback, errorCallback);

getMeFileContent({
  url: '',
  success: successCallback,
  error: errorCallback
});

// THE STRUCTURE OF ALL CALLBACKS IN NODE.JS IS DIFFERENT
// ERROR FIRST CALLBACKS


try{
  var fileContent = getMeFileContentSync();
  console.log('fileContent:', fileContent);
} catch(err){
  console.error(err);
}


function nodejsCallback(err, fileContent){
  if(err){
    return console.error(err);
  }
  console.log('fileContent:', fileContent);
}
getMeFileContent(nodejsCallback);