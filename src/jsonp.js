/**
 * @since 15-09-02 17:10
 * @author vivaxy
 */
'use strict';

import EventEmitter from '../event-emitter/src/event-emitter.js';

class Jsonp extends EventEmitter {
    constructor(options) {
        super(arguments);
        this.url = options.url;
    }

    send(data) {
        let _this = this;
        // get callback function name
        window._jsonp = window._jsonp || {};
        let callbackId = new Date().getTime();
        // same time jsonp
        if (window._jsonp[callbackId]) {
            callbackId += 1;
        }
        window._jsonp[callbackId] = function (data) {
            _this.emit('success', data);
            document.head.removeChild(window._jsonp[callbackId].script);
            delete window._jsonp[callbackId];
        };
        let callbackName = '_jsonp["' + callbackId + '"]';
        // get url
        let a = document.createElement('a');
        a.href = this.url;
        let url = a.origin + a.pathname + '?' + this._getQueryString(this._mixin(data, {
                callback: callbackName
            }));
        // set script
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        document.head.appendChild(script);
        window._jsonp[callbackId].script = script;
        return this;
    }

    _getQueryString(data) {
        if (typeof data === 'string') return data === '' ? '' : '?' + data;
        let queryString = '';
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let value = data[key];
                if (typeof value !== 'string') {
                    try {
                        value = JSON.stringify(value);
                    } catch (e) {
                        throw 'data can not be parsed to queryString';
                    }
                }
                queryString += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
            }
        }
        return queryString.slice(0, -1);
    }

    _mixin(a, b) {
        let r = {};
        r = this._copy(a, r);
        r = this._copy(b, r);
        return r;
    }

    _copy(a, r) {
        for (let i in a) {
            if (a.hasOwnProperty(i)) {
                r[i] = a[i];
            }
        }
        return r;
    }
}

window.Jsonp = Jsonp;
