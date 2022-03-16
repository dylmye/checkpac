"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationFailureReason = void 0;
/** Descriptions for reasons why parsing a PAC/STAC code failed */
var ValidationFailureReason;
(function (ValidationFailureReason) {
    ValidationFailureReason["NO_MATCH"] = "No authorisation code was found";
    ValidationFailureReason["INVALID_FORMAT"] = "Authorisation code is not formatted correctly";
    ValidationFailureReason["CEASED_OPERATOR"] = "The PAC Code provider has ceased operations";
})(ValidationFailureReason = exports.ValidationFailureReason || (exports.ValidationFailureReason = {}));
var AuthCodeTypes;
(function (AuthCodeTypes) {
    AuthCodeTypes["STAC"] = "STAC";
    AuthCodeTypes["PAC"] = "PAC";
})(AuthCodeTypes || (AuthCodeTypes = {}));
//# sourceMappingURL=types.js.map