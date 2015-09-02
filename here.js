/**
 * @since 15-09-02 17:49
 * @author vivaxy
 */
'use strict';
var url = require('url');
module.exports = function (req, res) {
    var parsedUrl = url.parse(req.url, true);
    var pathname = parsedUrl.pathname;
    var query = parsedUrl.query;
    if (~pathname.indexOf('demo/jsonp')) {
        var callbackName = decodeURIComponent(query.callback);
        var date = new Date();
        setTimeout(function () {
            res.end(callbackName + '(' + JSON.stringify({
                    time: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds()
                }) + ');');
        }, Math.random() * 1000);
        return false;
    } else {
        return true;
    }
};
