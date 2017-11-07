"use strict";
exports.__esModule = true;
var Logger = (function () {
    function Logger(name, configuration) {
        this.name = name;
        this.configuration = configuration;
    }
    Logger.prototype.getConfig = function () {
        return this.configuration;
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map