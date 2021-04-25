export declare type ValidationResult = {
    success: boolean;
    type?: AuthCodeType;
    formatted?: FormattedAuthCode;
    reason?: ValidationFailureReason;
    metadata?: ServiceProviderData;
};
export declare enum ValidationFailureReason {
    NO_MATCH = "No authorisation code was found"
}
export declare type ServiceProviderData = {
    id: string;
    fullName: string;
    shortName: string;
    website: string;
    instructions: string | null;
    logo: string | null;
    lastUpdated: string;
};
declare enum AuthCodeTypes {
    STAC = 0,
    PAC = 1
}
export declare type AuthCodeType = keyof typeof AuthCodeTypes;
export declare type FormattedAuthCode = {
    ServiceProvider: string;
    UniqueCode: string;
};
export {};
