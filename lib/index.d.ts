import { AuthCodeType, ValidationResult, FormattedAuthCode, ServiceProviderData } from "./types";
/** A PAC code consists of a three letter SPID and six unique numeric digits */
export declare const PAC_REGEX: RegExp;
/** A STAC code consists of six unique numeric digits and a three letter SPID */
export declare const STAC_REGEX: RegExp;
/**
 * Receives an Auth Code and returns information about the code
 * @param code A complete code to check
 * @param type The type of code to check. Auto determines what type of code it could be.
 * @returns If the code is valid.
 */
export declare function validateAuthCode(code: string, type?: AuthCodeType | "auto"): ValidationResult;
/**
 * Validate a matched code and split it into SPI and unique code
 * @param code A complete code that has been regex-matched
 *
 * @returns The code split into two, unless it's invalid
 */
export declare function splitAuthCode(code: string, type: AuthCodeType): FormattedAuthCode | null;
/**
 *
 * @param id The ID to search for
 * @returns The ServiceProviderData object for the given ID
 */
export declare function getServiceProviderDataById(id: string): ServiceProviderData | undefined;
//# sourceMappingURL=index.d.ts.map