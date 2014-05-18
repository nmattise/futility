var request = require('request'),
    cheerio = require('cheerio');


/*request('http://www.wunderground.com/history/airport/KPHL/2013/4/17/CustomHistory.html?dayend=17&monthend=5&yearend=2013&req_city=NA&req_state=NA&req_statename=NA', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var meanTemp = (cheerio.load(body)('div.contentData table tbody tr:nth-child(3) td:nth-child(3)').text());
        console.log(parseInt(meanTemp));
    }
})*/

module.exports = {
    getCustomRangeWeather: function (startDate, endDate, airportCode, fn) {
        var dayStart = startDate.substring(8, 10);
        var monthStart = startDate.substring(5, 7);
        var yearStart = startDate.substring(0, 4);
        var dayEnd = endDate.substring(8, 10);
        var monthEnd = endDate.substring(5, 7);
        var yearEnd = endDate.substring(0, 4);
        var url = 'http://www.wunderground.com/history/airport/' + airportCode + '/' + yearStart + '/' + monthStart + '/' + dayStart + '/CustomHistory.html?dayend=' + dayEnd + '&monthend=' + monthEnd + '&yearend=' + yearEnd + '&req_city=NA&req_state=NA&req_statename=NA&MR=1';

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var meanTemp = (cheerio.load(body)('div.contentData table tbody tr:nth-child(3) td:nth-child(3)').text());
                fn(parseInt(meanTemp));
            }
        });
    },

};
