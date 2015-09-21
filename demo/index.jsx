/**
 * @since 2015-09-21 12:27
 * @author vivaxy
 */
'use strict';
import Jsonp from '../src/jsonp.js';

let jsonp1 = new Jsonp({
    url: './jsonp/test1'
}).on('success', data => {
        console.log(data);
    }).on('error', () => {
        console.log('error');
    }).send({
        key: 'send'
    });

new Jsonp({
    url: './jsonp/test2'
}).on('success', data => {
        console.log(data);
    }).on('error', () => {
        console.log('error');
    }).send({
        key: 'send'
    });

new Jsonp({
    url: './jsonp/test1'
}).on('success', data => {
        console.log(data);
    }).on('error', () => {
        console.log('error');
    }).send({
        key: 'send'
    });

jsonp1.send({
    aaa: 123
});
