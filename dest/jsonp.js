(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('EventEmitter', ['exports', 'module'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
        factory(exports, module);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, mod);
        global.EventEmitter = mod.exports;
    }
})(this, function (exports, module) {
    /**
     * @since 15-09-02 10:25
     * @author vivaxy
     */
    'use strict';

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    var EventEmitter = (function () {
        function EventEmitter() {
            _classCallCheck(this, EventEmitter);

            this.events = {};
        }

        /**
         *
         * @param event
         * @param callback
         * @returns {EventEmitter}
         */

        _createClass(EventEmitter, [{
            key: 'on',
            value: function on(event, callback) {
                if (!this.events[event]) {
                    this.events[event] = [];
                }
                this.events[event].push(callback);
                return this;
            }

            /**
             *
             * @param event
             * @returns {EventEmitter}
             */
        }, {
            key: 'emit',
            value: function emit(event) {
                var callbacks = this.events[event],
                    _this = this,
                    _arguments = arguments;
                if (callbacks) {
                    callbacks.forEach(function (callback) {
                        callback.apply(_this, Array.prototype.slice.call(_arguments, 1));
                    });
                }
                return this;
            }

            /**
             *
             * @param event
             * @param callback
             * @returns {EventEmitter}
             */
        }, {
            key: 'off',
            value: function off(event, callback) {
                if (this.events[event] && callback) {
                    this.events[event].splice(this.events[event].indexOf(callback), 1);
                } else {
                    this.events[event] = [];
                }
                return this;
            }
        }]);

        return EventEmitter;
    })();

    module.exports = EventEmitter;
});
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('Jsonp', ['exports', 'module', '../event-emitter/src/event-emitter.js'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
        factory(exports, module, require('../event-emitter/src/event-emitter.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, mod, global.EventEmitter);
        global.Jsonp = mod.exports;
    }
})(this, function (exports, module, _eventEmitterSrcEventEmitterJs) {
    /**
     * @since 15-09-02 17:10
     * @author vivaxy
     */
    'use strict';

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    var _EventEmitter2 = _interopRequireDefault(_eventEmitterSrcEventEmitterJs);

    var Jsonp = (function (_EventEmitter) {
        _inherits(Jsonp, _EventEmitter);

        function Jsonp(options) {
            _classCallCheck(this, Jsonp);

            _get(Object.getPrototypeOf(Jsonp.prototype), 'constructor', this).call(this, arguments);
            this.url = options.url;
        }

        _createClass(Jsonp, [{
            key: 'send',
            value: function send(data) {
                var _this = this;
                // get callback function name
                window._jsonp = window._jsonp || {};
                var callbackId = new Date().getTime();
                // same time jsonp
                if (window._jsonp[callbackId]) {
                    callbackId += 1;
                }
                window._jsonp[callbackId] = function (data) {
                    _this.emit('success', data);
                    document.head.removeChild(window._jsonp[callbackId].script);
                    delete window._jsonp[callbackId];
                };
                var callbackName = '_jsonp["' + callbackId + '"]';
                // get url
                var a = document.createElement('a');
                a.href = this.url;
                var url = a.origin + a.pathname + '?' + this._getQueryString(this._mixin(data, {
                    callback: callbackName
                }));
                // set script
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = url;
                document.head.appendChild(script);
                window._jsonp[callbackId].script = script;
                return this;
            }
        }, {
            key: '_getQueryString',
            value: function _getQueryString(data) {
                if (typeof data === 'string') return data === '' ? '' : '?' + data;
                var queryString = '';
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        var value = data[key];
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
        }, {
            key: '_mixin',
            value: function _mixin(a, b) {
                var r = {};
                r = this._copy(a, r);
                r = this._copy(b, r);
                return r;
            }
        }, {
            key: '_copy',
            value: function _copy(a, r) {
                for (var i in a) {
                    if (a.hasOwnProperty(i)) {
                        r[i] = a[i];
                    }
                }
                return r;
            }
        }]);

        return Jsonp;
    })(_EventEmitter2['default']);

    module.exports = Jsonp;
});
