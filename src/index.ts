import {
  AuthCodeType,
  ValidationResult,
  ValidationFailureReason,
  FormattedAuthCode,
  ServiceProviderData,
} from "./types";
import { serviceProviders, aliases } from "./metadata.json";

/** A PAC code consists of a three letter SPID and six unique numeric digits */
export const PAC_REGEX = /^([A-Z]{3})([0-9]{6})$/;
/** A STAC code consists of six unique numeric digits and a three letter SPID */
export const STAC_REGEX = /^([0-9]{6})([A-Z]{3})$/;

/**
 * Receives an Auth Code and returns information about the code
 * @param code A complete code to check
 * @param type The type of code to check. Auto determines what type of code it could be.
 * @returns If the code is valid.
 */
export function validateAuthCode(
  code: string,
  type: AuthCodeType | "auto" = "auto"
): ValidationResult {
  const isPacMatch = type !== "STAC" && PAC_REGEX.test(code.toUpperCase());
  const isStacMatch = type !== "PAC" && STAC_REGEX.test(code.toUpperCase());

  if (!isPacMatch && !isStacMatch) {
    return {
      success: false,
      reason: ValidationFailureReason.NO_MATCH,
    };
  }

  const formatted = splitAuthCode(code, isPacMatch ? "PAC" : "STAC");

  if (!formatted) {
    return {
      success: false,
      reason: ValidationFailureReason.INVALID_FORMAT,
    };
  }

  return {
    success: true,
    type: isPacMatch ? "PAC" : "STAC",
    formatted,
    metadata: getServiceProviderDataById(formatted.ServiceProvider),
  };
}

/**
 * Validate a matched code and split it into SPI and unique code
 * @param code A complete code that has been regex-matched
 *
 * @returns The code split into two, unless it's invalid
 */
export function splitAuthCode(
  code: string,
  type: AuthCodeType
): FormattedAuthCode | null {
  const split = code.match(/[a-zA-Z]+|[0-9]+/g);

  if (!split || split.length < 1) {
    return null;
  }

  if (type === "STAC") {
    return {
      ServiceProvider: split?.[1] as string,
      UniqueCode: split?.[0] as string,
    };
  }

  return {
    ServiceProvider: split?.[0] as string,
    UniqueCode: split?.[1] as string,
  };
}

/**
 *
 * @param id The ID to search for
 * @returns The ServiceProviderData object for the given ID
 */
export function getServiceProviderDataById(
  id: string
): ServiceProviderData | undefined {
  const found = (serviceProviders as ServiceProviderData[]).find(
    (x) => x.id === id
  );
  if (!found) {
    const alias = (aliases as Record<string, string>)[id];
    if (!alias) return undefined;
    return (serviceProviders as ServiceProviderData[]).find(
      (x) => x.id === alias
    );
  }
  return found;
}
