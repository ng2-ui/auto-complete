"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
/**
 * provides auto-complete related utility functions
 */
var NguiAutoComplete = /** @class */ (function () {
    function NguiAutoComplete(http) {
        this.http = http;
        // ...
    }
    NguiAutoComplete.prototype.filter = function (list, keyword, matchFormatted, accentInsensitive) {
        var _this = this;
        return accentInsensitive
            ? list.filter(function (el) {
                var objStr = matchFormatted ? _this.getFormattedListItem(el).toLowerCase() : JSON.stringify(el).toLowerCase();
                keyword = keyword.toLowerCase();
                return objStr.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                    .indexOf(keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '')) !== -1;
            })
            : list.filter(function (el) {
                var objStr = matchFormatted ? _this.getFormattedListItem(el).toLowerCase() : JSON.stringify(el).toLowerCase();
                keyword = keyword.toLowerCase();
                return objStr.indexOf(keyword) !== -1;
            });
    };
    NguiAutoComplete.prototype.getFormattedListItem = function (data) {
        var formatted;
        var formatter = this.listFormatter || '(id) value';
        if (typeof formatter === 'function') {
            formatted = formatter.apply(this, [data]);
        }
        else if (typeof data !== 'object') {
            formatted = data;
        }
        else if (typeof formatter === 'string') {
            formatted = formatter;
            var matches = formatter.match(/[a-zA-Z0-9_\$]+/g);
            if (matches && typeof data !== 'string') {
                matches.forEach(function (key) {
                    formatted = formatted.replace(key, data[key]);
                });
            }
        }
        return formatted;
    };
    /**
     * return remote data from the given source and options, and data path
     */
    NguiAutoComplete.prototype.getRemoteData = function (keyword) {
        var _this = this;
        if (typeof this.source !== 'string') {
            throw new TypeError('Invalid type of source, must be a string. e.g. http://www.google.com?q=:my_keyword');
        }
        else if (!this.http) {
            throw new Error('Http is required.');
        }
        var matches = this.source.match(/:[a-zA-Z_]+/);
        if (matches === null) {
            throw new Error('Replacement word is missing.');
        }
        var replacementWord = matches[0];
        var url = this.source.replace(replacementWord, keyword);
        return this.http.get(url)
            .pipe(operators_1.map(function (list) {
            if (_this.pathToData) {
                var paths = _this.pathToData.split('.');
                paths.forEach(function (prop) { return list = list[prop]; });
            }
            return list;
        }));
    };
    NguiAutoComplete.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    NguiAutoComplete.ctorParameters = function () { return [
        { type: http_1.HttpClient, decorators: [{ type: core_1.Optional }] }
    ]; };
    return NguiAutoComplete;
}());
exports.NguiAutoComplete = NguiAutoComplete;
//# sourceMappingURL=auto-complete.js.map