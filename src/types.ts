/** Shape of the result of parsing a PAC/STAC code, if successful */
export interface ValidationResult {
  success: boolean;
  type?: AuthCodeType;
  formatted?: FormattedAuthCode;
  reason?: ValidationFailureReason;
  metadata?: ServiceProviderData;
}

/** Descriptions for reasons why parsing a PAC/STAC code failed */
export enum ValidationFailureReason {
  NO_MATCH = "No authorisation code was found",
  INVALID_FORMAT = "Authorisation code is not formatted correctly",
}

/** Shape of metadata.json objects */
export interface ServiceProviderData {
  /**
   * The service provider's ID (SPID.)
   * 
   * @minLength 3
   * @maxLength 3
   * @required
   */
  id: string;
  /**
   * The trading name of the SP.
   * 
   * @required
   */
  fullName: string;
  /**
   * The name most customers know the SP by.
   */
  shortName: string;
  /**
   * The homepage URL for the SP in your country.
   * 
   * @format uri
   */
  website: string;
  /**
   * A URL linking to specific instructions on how to
   * get the PAC/STAC code from the SP.
   * 
   * @format uri
   */
  instructions: string | null;
  /**
   * A URL pointing to an image representing the SP.
   * 
   * @format uri
   */
  logo: string | null;
  /**
   * The date YYYY-MM-DD that this SP was last updated.
   * 
   * @format date
   * @required
   */
  lastUpdated: string;
}

enum AuthCodeTypes {
  STAC = "STAC",
  PAC = "PAC",
}

export type AuthCodeType = keyof typeof AuthCodeTypes;

export type FormattedAuthCode = {
  ServiceProvider: string;
  UniqueCode: string;
};

export interface Metadata {
  /**
   * The version of this metadata file.
   *
   */
  version: string;
  /**
   * A list of service providers.
   */
  serviceProviders: ServiceProviderData[];
  /**
   * A key:value pair array, where the key is the alias and the value is the ID of the record it represents.
   */
  aliases: Record<string, string>;
  /**
   * A list of service providers that are no longer operating.
   */
  dead: ServiceProviderData[];
}
