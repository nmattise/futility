var getWeather = require('./getWeather').getCustomRangeWeather;
var async = require('async');
var request = require('request'),
    cheerio = require('cheerio');



var dates = ["2010-01-01", "2010-02-01", "2010-03-01", "2010-04-01", "2010-05-01", "2010-06-01", "2010-07-01", "2010-08-01", "2010-09-01", "2010-10-01", "2010-11-01", "2010-12-01", "2011-01-01", "2011-02-01"];


var square = function (num, doneCallback) {
    // Call back with no error and the result of num * num
    return doneCallback(null, num * num);
};
var weather = function (date, doneCallback) {
    var dayStart = date.substring(8, 10);
    var monthStart = date.substring(5, 7);
    var yearStart = date.substring(0, 4);
    var url = "http://www.wunderground.com/history/airport/KAVP/" + yearStart + "/" + monthStart + "/" + dayStart + "/MonthlyHistory.html";
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var meanTemp = (cheerio.load(body)('div.current-weather-link').text());
            return doneCallback(meanTemp);
        }
    });
};


// Square each number in the array [1, 2, 3, 4]
async.map(dates, weather, function (err, results) {
    // Square has been called on each of the numbers
    // so we're now done!
    console.log(results);
    console.log("Finished!");
});