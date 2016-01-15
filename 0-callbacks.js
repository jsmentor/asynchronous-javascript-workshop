/*
- Conflates the input with the output
- Doesnt wotk with control flow primitivesxx
- Error handling
- and doing parallel operations
*/
var fs = require('fs'),
    present = require('present');

function logDuration(startedAt, message) {
    console.log(`>> ${message} >> duration:`, present() - startedAt);
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
    var startedAt = present();
    fs.readFile(fileName, 'utf-8', function(err, data) {
        if (err) {
            return callback(err);
        }
        logDuration(startedAt, 'getJSONSync');

        try {
            data = JSON.parse(data);
        } catch (err) {
            return callback(err)
        }
        callback(null, data);
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

function callAsync() {
    getJSON('data/users.json', function(err, data) {
        if (err) {
            return console.error('Error:', err);
        }
        console.log(data);
    });
}

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

function ifAsyncGoToHELLWithYourScenario() {
    getJSON('data/users.json', function(err, data) {
        if (err) {
            return console.error('Error:', err);
        }
        var randomUser = getRandomUser(data);
        getJSON(getRandomUserFileAddress(randomUser), function(err, privateInfo) {
            if (err) {
                return console.error('Error when loading user data:', err);
            }
            getJSON('data/popular-series.json', function(err, popularSeries) {
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
ifAsyncGoToHELLWithYourScenario();
















function test() {
    var startedAt = present();
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
