"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServiceProviderDataById = exports.splitAuthCode = exports.validateAuthCode = exports.STAC_REGEX = exports.PAC_REGEX = void 0;
const types_1 = require("./types");
const metadata_json_1 = require("./metadata.json");
/** A PAC code consists of a three letter SPID and six unique numeric digits */
exports.PAC_REGEX = /^([A-Z]{3})([0-9]{6})$/;
/** A STAC code consists of six unique numeric digits and a three letter SPID */
exports.STAC_REGEX = /^([0-9]{6})([A-Z]{3})$/;
/**
 * Receives an Auth Code and returns information about the code
 * @param code A complete code to check
 * @param type The type of code to check. Auto determines what type of code it could be.
 * @returns If the code is valid.
 */
function validateAuthCode(code, type = "auto") {
    const isPacMatch = type !== "STAC" && exports.PAC_REGEX.test(code.toUpperCase());
    const isStacMatch = type !== "PAC" && exports.STAC_REGEX.test(code.toUpperCase());
    if (!isPacMatch && !isStacMatch) {
        return {
            success: false,
            reason: types_1.ValidationFailureReason.NO_MATCH,
        };
    }
    const formatted = splitAuthCode(code, isPacMatch ? "PAC" : "STAC");
    if (!formatted) {
        return {
            success: false,
            reason: types_1.ValidationFailureReason.INVALID_FORMAT,
        };
    }
    return {
        success: true,
        type: isPacMatch ? "PAC" : "STAC",
        formatted,
        metadata: getServiceProviderDataById(formatted.ServiceProvider),
    };
}
exports.validateAuthCode = validateAuthCode;
/**
 * Validate a matched code and split it into SPI and unique code
 * @param code A complete code that has been regex-matched
 *
 * @returns The code split into two, unless it's invalid
 */
function splitAuthCode(code, type) {
    const split = code.match(/[a-zA-Z]+|[0-9]+/g);
    if (!split || split.length < 1) {
        return null;
    }
    if (type === "STAC") {
        return {
            ServiceProvider: split === null || split === void 0 ? void 0 : split[1],
            UniqueCode: split === null || split === void 0 ? void 0 : split[0],
        };
    }
    return {
        ServiceProvider: split === null || split === void 0 ? void 0 : split[0],
        UniqueCode: split === null || split === void 0 ? void 0 : split[1],
    };
}
exports.splitAuthCode = splitAuthCode;
/**
 *
 * @param id The ID to search for
 * @returns The ServiceProviderData object for the given ID
 */
function getServiceProviderDataById(id) {
    const found = metadata_json_1.serviceProviders.find((x) => x.id === id);
    if (!found) {
        const alias = metadata_json_1.aliases[id];
        if (!alias)
            return undefined;
        return metadata_json_1.serviceProviders.find((x) => x.id === alias);
    }
    return found;
}
exports.getServiceProviderDataById = getServiceProviderDataById;
//# sourceMappingURL=index.js.map