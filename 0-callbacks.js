/*
 - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling
*/
/*
 - Conflates the input with the output
 - Does'nt work with control flow primitives
 - Error handling
 - and doing parallel operations
 */
let fs = require('fs'),
  present = require('present');

function logDuration(startedAt, message) {
  console.log(`>> ${message} >> duration:`, present() - startedAt);
}

function xhr() {
  let req = new XMLHttpRequest();


  req.open('GET', '/', false);
  req.send();

  return req.response;
}

function getJSONSync(fileName) {
  // return JSON.parse(fs.readFileSync(fileName, 'utf-8'));
  let startedAt = present();

  let data = fs.readFileSync(fileName, 'utf-8');

  logDuration(startedAt, 'getJSONSync');
  data = JSON.parse(data);
  return data;
}

//async
function getJSON(fileName, callback) {
  let startedAt = present();

  function giveMeTheResult(err, data) {
    if (err) {
      return callback(err, null);
    }
    logDuration(startedAt, 'getJSONSync');

    try {
      // Sync
      data = JSON.parse(data);
    } catch (err) {
      return callback(err, null);
    }
    callback(null, data);
  }

  fs.readFile(fileName, 'utf-8', giveMeTheResult);
}

// Pulling vs Pushing

function callSync() {
  try {
    let data = getJSONSync('data/users.json');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

function callAsync() {
  function giveMeTheObject(err, data) {
    if (err) {
      return console.error('Error:', err);
    }
    console.log(data);
  }

  getJSON('data/users.json', giveMeTheObject);
}

// callSync();

// callAsync();


function aWeirdScenarioInSync() {
  try {
    let data = getJSONSync('data/users.json');
    let randomUser = getRandomUser(data);
    let privateInfo = getJSONSync(getRandomUserFileAddress(randomUser));
    let popularSeries = getJSONSync('data/popular-series.json');
    logUserPopularSeries(randomUser, privateInfo, popularSeries);
  } catch (err) {
    console.error(err);
  }
}

function ifAsyncGoToHELLWithYourScenario() {
  getJSON('data/users.json', function (err, data) {
    if (err) {
      return console.error('Error:', err);
    }
    let randomUser = getRandomUser(data);
    getJSON(getRandomUserFileAddress(randomUser), function (err, privateInfo) {
      if (err) {
        return console.error('Error when loading user data:', err);
      }
      getJSON('data/popular-series.json', function (err, popularSeries) {
        if (err) {
          return console.error('Error when loading popular-series:', err);
        }
        try {
          logUserPopularSeries(randomUser, privateInfo, popularSeries);
        } catch (err) {
          return console.error(err);
        }
      });
    });
  });
}

function getRandomUser(data) {
  return data[Math.floor(Math.random() * data.length)];
}

function getRandomUserFileAddress(randomUser) {
  return 'data/' + randomUser.firstName.toLowerCase() + '-' + randomUser.lastName.toLowerCase() + '.json';
}

function logUserPopularSeries(user, privateInfo, popularSeries) {
  let birthYear = new Date(privateInfo.birthDate).getFullYear();
  console.log('User: ', user.firstName + ' ' + user.lastName);
  if (typeof popularSeries[birthYear] === 'undefined') {
    return console.log('WOW At your birthDate TV Series has not been invented yet! :) Just kidding data is not availble for :' + birthYear);
  }
  console.log('Birth year:', birthYear);
  console.log('Popular Series of this year was: "' + popularSeries[birthYear] + '"');
}

// callSync();
// callAsync();
// aWeirdScenarioInSync();
//ifAsyncGoToHELLWithYourScenario();


function test() {
  let startedAt = present();
  aWeirdScenarioInSync();
  aWeirdScenarioInSync();
  aWeirdScenarioInSync();
  aWeirdScenarioInSync();
  aWeirdScenarioInSync();
  aWeirdScenarioInSync();
  aWeirdScenarioInSync();

  // ifAsyncGoToHELLWithYourScenario();
  // ifAsyncGoToHELLWithYourScenario();
  // ifAsyncGoToHELLWithYourScenario();
  // ifAsyncGoToHELLWithYourScenario();
  // ifAsyncGoToHELLWithYourScenario();
  // ifAsyncGoToHELLWithYourScenario();
  // ifAsyncGoToHELLWithYourScenario();
  // ifAsyncGoToHELLWithYourScenario();

  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.log('The control flow is DONE, how long it took:', present() - startedAt);
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
}

// test();
