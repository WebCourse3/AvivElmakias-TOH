"use strict";
exports.__esModule = true;
var fs = require("fs");
var Logger = (function () {
    function Logger(name, configuration) {
        this.logOptions = {
            'info': this.info,
            'warning': this.warning,
            'debug': this.debug,
            'error': this.error
        };
        this.name = name;
        this.configuration = configuration;
    }
    Logger.prototype.log = function (level) {
        var strings = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            strings[_i - 1] = arguments[_i];
        }
        var printOpt = level || this.configuration.logLevel;
        this.logOptions[printOpt].apply(this, strings);
    };
    Logger.prototype.info = function (strings) {
        if (this.configuration.console)
            this.infoConsole(strings);
        if (this.configuration.file)
            this.logFile(this.configuration.logLevel, strings);
    };
    Logger.prototype.warning = function (strings) {
        if (this.configuration.console)
            this.warningConsole(strings);
        if (this.configuration.file)
            this.logFile(this.configuration.logLevel, strings);
    };
    Logger.prototype.debug = function (strings) {
        if (this.configuration.console)
            this.debugConsole(strings);
        if (this.configuration.file)
            this.logFile(this.configuration.logLevel, strings);
    };
    Logger.prototype.error = function (strings) {
        if (this.configuration.console)
            this.errorConsole(strings);
        if (this.configuration.file)
            this.logFile(this.configuration.logLevel, strings);
    };
    Logger.prototype.infoConsole = function (strings) {
        if (this.configuration.colors)
            strings.forEach(function (string) { return (console.log('\x1b[32m%s\x1b[0m', string)); });
        else
            this.printReg(strings);
    };
    Logger.prototype.warningConsole = function (strings) {
        if (this.configuration.colors)
            strings.forEach(function (string) { return (console.log('\x1b[33m%s\x1b[0m', string)); });
        else
            this.printReg(strings);
    };
    Logger.prototype.debugConsole = function (strings) {
        if (this.configuration.colors)
            strings.forEach(function (string) { return (console.log('\x1b[37m%s\x1b[0m', string)); });
        else
            this.printReg(strings);
    };
    Logger.prototype.errorConsole = function (strings) {
        if (this.configuration.colors)
            strings.forEach(function (string) { return (console.log('\x1b[31m%s\x1b[0m', string)); });
        else
            this.printReg(strings);
    };
    Logger.prototype.printReg = function (strings) {
        strings.forEach(function (string) { return (console.log(string)); });
    };
    Logger.prototype.logFile = function (level, strings) {
        fs.appendFileSync(__dirname + '/test.log', level + ' \n');
        strings.forEach(function (string) { return (fs.appendFileSync(__dirname + '/test.log', string + ' ')); });
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map