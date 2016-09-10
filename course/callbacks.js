(function($){
  'use strict';

  function loadData(){

    $.getJSON('/data/users.json', function(data, status, err){
      if(data){

      }
    });



    $.getJSON('/data/users.json', function(err, data){
      if(err){

      }
      if(data){

      }
    });


  }


  function getJSONOld(fileName, callback){
    var jsonObject = {
      "username": "example",
      "name": "Example"
    };
    setTimeout(function(){
      if(false){
        callback(null, 'failure',new Error());
      } else {
        callback(jsonObject);
      }
    }, 100);

  }


  function getJSONNode(fileName, callback){
    var jsonObject = {
      "username": "example",
      "name": "Example"
    };
    setTimeout(function(){
      if(false){
        callback(new Error(), null);
      } else {
        callback(null, jsonObject);
      }
    }, 100);

  }

  function getJSONPromise(fileName){
    // Promise.resolve()
    // Promise.reject();
    // return new Promise(function(fulfill, reject){
    return new Promise(function(resolve, reject){
      var jsonObject = {
        "username": "example",
        "name": "Example"
      };
      setTimeout(function(){
        if(false){
          // callback(new Error(), null);
          reject(new Error());
        } else {
          // callback(null, jsonObject);
          resolve(jsonObject);
        }
      }, 100);

    });
  }

  var promiseObject = getJSONPromise('fileName');

  promiseObject.then(function(jsonObject){
    console.log(jsonObject);
  });

  function example(username){
    function userInfoCallback(err, userInfo) {
        getJSONNode('users/' + username + '.json', function(err, userInfo) {
           getJSONNode('users/' + username + '.json', function(err, userInfo) {



            });
        });
    }

    function usersCallback(err, users){
      getJSONNode('users/' + username + '.json', userInfoCallback);
    }

    getJSONNode('user.json', usersCallback);
  }



}(jQuery));