export type ValidationResult = {
  success: boolean;
  type?: AuthCodeType;
  formatted?: FormattedAuthCode;
  reason?: ValidationFailureReason;
  metadata?: ServiceProviderData;
};

export enum ValidationFailureReason {
  NO_MATCH = "No authorisation code was found"
};

export type ServiceProviderData = {
  id: string,
  fullName: string,
  shortName: string,
  website: string,
  instructions: string | null,
  logo: string | null,
  lastUpdated: string
};

enum AuthCodeTypes {
  STAC,
  PAC
};

export type AuthCodeType = keyof typeof AuthCodeTypes;

export type FormattedAuthCode = {
  ServiceProvider: string;
  UniqueCode: string;
};
