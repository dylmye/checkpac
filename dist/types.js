"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationFailureReason = void 0;
var ValidationFailureReason;
(function (ValidationFailureReason) {
    ValidationFailureReason["NO_MATCH"] = "No authorisation code was found";
})(ValidationFailureReason = exports.ValidationFailureReason || (exports.ValidationFailureReason = {}));
;
var AuthCodeTypes;
(function (AuthCodeTypes) {
    AuthCodeTypes[AuthCodeTypes["STAC"] = 0] = "STAC";
    AuthCodeTypes[AuthCodeTypes["PAC"] = 1] = "PAC";
})(AuthCodeTypes || (AuthCodeTypes = {}));
;
