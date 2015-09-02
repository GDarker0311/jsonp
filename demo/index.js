/**
 * @since 15-09-02 17:16
 * @author vivaxy
 */
'use strict';

var jsonp1 = new Jsonp({
    url: './jsonp/test1'
}).on('success', function (data) {
        console.log(data);
    }).on('error', function () {
        console.log('error');
    }).send({
        key: 'send'
    });

new Jsonp({
    url: './jsonp/test2'
}).on('success', function (data) {
        console.log(data);
    }).on('error', function () {
        console.log('error');
    }).send({
        key: 'send'
    });

new Jsonp({
    url: './jsonp/test1'
}).on('success', function (data) {
        console.log(data);
    }).on('error', function () {
        console.log('error');
    }).send({
        key: 'send'
    });

jsonp1.send({
    aaa: 123
});
