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
var fs = require("fs");
var Fileogger = (function (_super) {
    __extends(Fileogger, _super);
    function Fileogger(name, configuration) {
        return _super.call(this, name, configuration) || this;
    }
    Fileogger.prototype.log = function (level, strings) {
        strings.forEach(function (string) { return (fs.appendFile(__dirname + "/test.log", level + ':' + string + "\n", 'utf-8', function (err) {
            if (err)
                throw err;
        })); });
    };
    return Fileogger;
}(logger_1.Logger));
var list = ["hello", "my", "name", 'is'];
//# sourceMappingURL=FileLogger.js.map