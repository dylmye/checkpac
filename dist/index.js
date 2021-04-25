"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServiceProviderDataById = exports.splitAuthCode = exports.validateAuthCode = void 0;
const types_1 = require("./types");
const metadata_json_1 = require("./metadata.json");
const PAC_REGEX = /^(([A-Z]){3}\d{6})$/g;
const STAC_REGEX = /^(\d{6}([A-Z]){3})$/g;
/**
 * Receives an Auth Code and returns information about the code
 * @param {string} code A complete code to check
 * @param {AuthCodeType | "auto"} type The type of code to check. Auto determines what type of code it could be.
 * @returns {ValidationResult} If the code is valid.
 */
function validateAuthCode(code, type = "auto") {
    const isPacMatch = type !== "STAC" && code.toUpperCase().match(PAC_REGEX);
    const isStacMatch = type !== "PAC" && code.toUpperCase().match(STAC_REGEX);
    if (!isPacMatch && !isStacMatch) {
        return {
            success: false,
            reason: types_1.ValidationFailureReason.NO_MATCH
        };
    }
    const splitCode = splitAuthCode(code);
    return {
        success: true,
        type: isPacMatch ? "PAC" : "STAC",
        formatted: splitCode,
        metadata: getServiceProviderDataById(splitCode.ServiceProvider),
    };
}
exports.validateAuthCode = validateAuthCode;
;
/**
 * Validate a matched code and split it into SPI and unique code
 * @param {string} code A complete code that has been regex-matched
 *
 * @returns {FormattedAuthCode} The code split into two
 */
function splitAuthCode(code) {
    return {
        ServiceProvider: code.toUpperCase().replace(/[0-9]/g, ''),
        UniqueCode: code.replace(/[^0-9]/g, '')
    };
}
exports.splitAuthCode = splitAuthCode;
function getServiceProviderDataById(id) {
    return metadata_json_1.serviceProviders[id];
}
exports.getServiceProviderDataById = getServiceProviderDataById;
