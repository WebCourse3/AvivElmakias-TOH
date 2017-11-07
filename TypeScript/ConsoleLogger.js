"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var logger_1 = require("./logger");
var ConsoleLogger = (function (_super) {
    __extends(ConsoleLogger, _super);
    function ConsoleLogger(name, configuration) {
        var _this = _super.call(this, name, configuration) || this;
        _this.colorLog = {
            'info': _this.info,
            'warning': _this.warning,
            'debug': _this.debug,
            'error': _this.error
        };
        return _this;
    }
    ConsoleLogger.prototype.log = function (level, strings) {
        if (!_super.prototype.getConfig.call(this).console) {
            if (_super.prototype.getConfig.call(this).colors)
                this.colorLog[_super.prototype.getConfig.call(this).logLevel](strings);
            else {
                console.log(_super.prototype.getConfig.call(this).logLevel + ': \n');
                strings.forEach(function (string) { return (console.log(string)); });
            }
        }
    };
    ConsoleLogger.prototype.info = function (strings) {
        strings.forEach(function (string) { return (console.log('\x1b[32m%s\x1b[0m', string)); });
    };
    ConsoleLogger.prototype.warning = function (strings) {
        strings.forEach(function (string) { return (console.log('\x1b[33m%s\x1b[0m', string)); });
    };
    ConsoleLogger.prototype.debug = function (strings) {
        strings.forEach(function (string) { return (console.log('\x1b[37m%s\x1b[0m', string)); });
    };
    ConsoleLogger.prototype.error = function (strings) {
        strings.forEach(function (string) { return (console.log('\x1b[31m%s\x1b[0m', string)); });
    };
    ConsoleLogger.prototype.printReg = function (strings) {
        strings.forEach(function (string) { return (console.log(string)); });
    };
    ConsoleLogger.prototype.isColorsTrue = function () {
        return _super.prototype.getConfig.call(this).colors;
    };
    return ConsoleLogger;
}(logger_1.Logger));
var list = ['hello', 'my', 'name', 'is'];
var logg = new ConsoleLogger('warning', {
    console: true,
    file: false,
    colors: true,
    logLevel: 'warning'
});
logg.warning(list);
//# sourceMappingURL=ConsoleLogger.js.map