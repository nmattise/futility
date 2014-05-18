var getWeather = require("../lib/getWeather").getCustomRangeWeather;
var async = require('async');


module.exports = {
    getIndex: function (req, res) {
        res.render('index', {
            title: 'Express'
        });
    },
    getForm: function (req, res) {
        res.render('form');
    },
    getFeatures: function (req, res) {
        res.render('features');
    },
    analyze: function (req, res) {
        var dates = ["2010-01-01", "2010-02-01", "2010-03-01", "2010-04-01", "2010-05-01", "2010-06-01", "2010-07-01", "2010-08-01", "2010-09-01", "2010-10-01", "2010-11-01", "2010-12-01", "2011-01-01", "2011-02-01"];
        console.log(req.body.electStartDate);
        var temperatures = {};
        async.each(dates, function (date) {
            var startDate = date;
            var orderNum = dates.indexOf(date);
            var endDate = dates[dates.indexOf(date) + 1];
            if (endDate) {
                getWeather(startDate, endDate, "KPHL", function (temp) {
                    console.log(startDate + " to " + endDate + ": " + temp);
                    temperatures[startDate] = {
                        "endDate": endDate,
                        "meanTemp": temp
                    };
                });
            };
        }, function (err) {
            if (err) {
                // One of the iterations produced an error.
                // All processing will now stop.
                console.log('temp');
            } else {
                console.log('All temps have been processed successfully');
            }
        });
        //console.log(temperatures);
        //res.render('index');
    }
};