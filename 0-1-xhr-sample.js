

$(function(){

  function getDataSync(){
    let req = new XMLHttpRequest();
    req.open('GET', 'https://api.codementor.io/api/v2/mentors/fixjs/reviews?cm_auth=5eed1556-91b0-4da8-b75c-36db1672f4e2', true);

    // since the third parameter is true when you call req.send
    // it pauses everything :BLOCKING
    req.send();

    // because it was waiting right here, req.response has the data
    return req.response;
  }

  function getData(callback){
    let time1;
    let req = new XMLHttpRequest();
    req.open('GET', 'https://ide.c9.io/fixjs/jsremoteconf-2016');

    req.onreadystatechange = function(){
      if(req.readState === 4){
        let time2 = new Date().getTime();//miliseconds
        let seconds = (time2 - time1) / 1000;
        console.log('We waitied for ' + seconds + ' seconds to get the data');

        // req.response has the response
        callback(req.response);
      }
    };

    // since the third parameter is false, when you call req.send
    // it doesn't pause anything NON-BLOCKING

    let time1 = new Date().getTime();//miliseconds
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
    let data = getDataSync();
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


let fileContent = getMeFileContentSync();
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
  let fileContent = getMeFileContentSync();
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