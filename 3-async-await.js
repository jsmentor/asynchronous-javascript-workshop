/*
- Conflates the input with the output
- Doesnt wotk with control flow primitivesxx
- Error handling
- and doing parallel operations
*/
var fs = require('fs'),
    awaitify = require('awaitify'),
    present = require('present');

function logDuration(startedAt, message) {
    console.log(`>> ${message} >> duration: `, present() - startedAt);
}

function getJSONSync(fileName) {
    // return JSON.parse(fs.readFileSync(fileName, 'utf-8'));
    var startedAt = present();
    var data = fs.readFileSync(fileName, 'utf-8');
    logDuration(startedAt, 'getJSONSync');
    return JSON.parse(data);
}

//async
function getJSON(fileName, callback) {
    return new Promise(function(resolve, reject) {
        var startedAt = present();

        function returnResopnse(err, data) {
            if (err) {
                return reject(err);
            }
            logDuration(startedAt, 'getJSON >> Promises');

            // try {
            //   data = JSON.parse(data);
            // } catch (err) {
            //   return reject(err);
            // }
            // resolve(data);

            resolve(JSON.parse(data));
        }

        fs.readFile(fileName, 'utf-8', returnResopnse);
    });
}

function callSync() {
    try {
        var data = getJSONSync('data/users.json');
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

var callAsync = awaitify(function*() {
    try {
        var data = yield getJSON('data/users.json');
        console.log(data);
    } catch (err) {
        console.error(err);
    }
});

function aWeirdScenarioInSync() {
    try {
        var data = getJSONSync('data/users.json');
        var randomUser = getRandomUser(data);
        var privateInfo = getJSONSync(getRandomUserFileAddress(randomUser));
        var popularSeries = getJSONSync('data/popular-series.json');
        logUserPopularSeries(randomUser, privateInfo, popularSeries);
    } catch (err) {
        console.error(err);
    }
}

var aModernAsyncScenario = async function() {
    try {
        var data = await getJSON('data/users.json');
        var randomUser = getRandomUser(data);
        var privateInfo = await getJSON(getRandomUserFileAddress(randomUser));
        var popularSeries = await getJSON('data/popular-series.json');
        logUserPopularSeries(randomUser, privateInfo, popularSeries);
    } catch (e) {
        console.error(err);
    }
};

function getRandomUser(data) {
    return data[Math.floor(Math.random() * data.length)];
}

function getRandomUserFileAddress(randomUser) {
    return 'data/' + randomUser.firstName.toLowerCase() + '-' + randomUser.lastName.toLowerCase() + '.json';
}


function logUserPopularSeries(user, privateInfo, popularSeries) {
    var birthYear = new Date(privateInfo.birthDate).getFullYear();
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
aModernAsyncScenario();











function test() {
    var startedAt = present();
    aWeirdScenarioInSync();
    aWeirdScenarioInSync();
    aWeirdScenarioInSync();
    aWeirdScenarioInSync();
    aWeirdScenarioInSync();
    aWeirdScenarioInSync();
    aWeirdScenarioInSync();

    // aModernAsyncScenario();
    // aModernAsyncScenario();
    // aModernAsyncScenario();
    // aModernAsyncScenario();
    // aModernAsyncScenario();
    // aModernAsyncScenario();
    // aModernAsyncScenario();
    // aModernAsyncScenario();

    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log('The control flow is DONE, how long it took:', present() - startedAt);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
}

// test();
