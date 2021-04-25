import { AuthCodeType, ValidationResult, ValidationFailureReason, FormattedAuthCode, ServiceProviderData } from "./types";
import { serviceProviders } from './metadata.json';

const PAC_REGEX = /^(([A-Z]){3}\d{6})$/g;
const STAC_REGEX = /^(\d{6}([A-Z]){3})$/g;

/**
 * Receives an Auth Code and returns information about the code
 * @param {string} code A complete code to check
 * @param {AuthCodeType | "auto"} type The type of code to check. Auto determines what type of code it could be.
 * @returns {ValidationResult} If the code is valid.
 */
export function validateAuthCode(code: string, type: AuthCodeType | "auto" = "auto"): ValidationResult {
  const isPacMatch = type !== "STAC" && code.toUpperCase().match(PAC_REGEX);
  const isStacMatch = type !== "PAC" && code.toUpperCase().match(STAC_REGEX);

  if(!isPacMatch && !isStacMatch) {
    return {
      success: false,
      reason: ValidationFailureReason.NO_MATCH
    };
  }

  const splitCode = splitAuthCode(code);

  return {
    success: true,
    type: isPacMatch ? "PAC" : "STAC",
    formatted: splitCode,
    metadata: getServiceProviderDataById(splitCode.ServiceProvider),
  };
};

/**
 * Validate a matched code and split it into SPI and unique code
 * @param {string} code A complete code that has been regex-matched
 * 
 * @returns {FormattedAuthCode} The code split into two
 */
export function splitAuthCode(code: string): FormattedAuthCode {
  return {
    ServiceProvider: code.toUpperCase().replace(/[0-9]/g, ''),
    UniqueCode: code.replace(/[^0-9]/g,'')
  };
}

export function getServiceProviderDataById(id: string): ServiceProviderData {
  return (serviceProviders as any)[id];
}
