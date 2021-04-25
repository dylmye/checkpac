import { AuthCodeType, ValidationResult, FormattedAuthCode, ServiceProviderData } from "./types";
/**
 * Receives an Auth Code and returns information about the code
 * @param {string} code A complete code to check
 * @param {AuthCodeType | "auto"} type The type of code to check. Auto determines what type of code it could be.
 * @returns {ValidationResult} If the code is valid.
 */
export declare function validateAuthCode(code: string, type?: AuthCodeType | "auto"): ValidationResult;
/**
 * Validate a matched code and split it into SPI and unique code
 * @param {string} code A complete code that has been regex-matched
 *
 * @returns {FormattedAuthCode} The code split into two
 */
export declare function splitAuthCode(code: string): FormattedAuthCode;
export declare function getServiceProviderDataById(id: string): ServiceProviderData;
