import { strictEqual, deepStrictEqual, notEqual } from "assert";
import { validateAuthCode } from "../src";
import { AuthCodeType, FormattedAuthCode, ValidationFailureReason } from "../src/types";

const validO2PacCode = "TEL000000";
const validUnknownPacCode = "ZZZ111111";
const validAliasedPacCode = "VOD000000";
const validO2StacCode = "000000TEL";
const validUnknownStacCode = "111111ZZZ";
const validAliasedStacCode = "000000VOD";

const invalidLengthPacCode = "TEL0000007";
const invalidLengthStacCode = "111111ZZZJ";

const valid = [
  validO2PacCode,
  validUnknownPacCode,
  validO2StacCode,
  validUnknownStacCode,
  validAliasedPacCode,
  validAliasedStacCode
];

const validSplits: Record<string, string[]> = {
  [validO2PacCode]: ["TEL", "000000"],
  [validO2StacCode]: ["TEL", "000000"],
  [validUnknownPacCode]: ["ZZZ", "111111"],
  [validUnknownStacCode]: ["ZZZ", "111111"],
  [validAliasedPacCode]: ["VOD", "000000"],
  [validAliasedStacCode]: ["VOD", "000000"],
};

const validTypeMap: Record<string, AuthCodeType> = {
  [validO2PacCode]: "PAC",
  [validO2StacCode]: "STAC",
  [validUnknownPacCode]: "PAC",
  [validUnknownStacCode]: "STAC",
  [validAliasedPacCode]: "PAC",
  [validAliasedStacCode]: "STAC",
};

const invalid = [invalidLengthPacCode, invalidLengthStacCode];

describe("validateAuthCode", () => {
  valid.forEach((code) => {
    describe(`valid ${validTypeMap[code]} code ${code}`, () => {
      const res = validateAuthCode(code);
      it("is successfully parsed", () => {
        strictEqual<boolean>(res.success, true);
      });
      it("is automatically detected as PAC/STAC correctly", () => {
        strictEqual<string>(res.type, validTypeMap[code]);
      });
      it("has split the code correctly", () => {
        deepStrictEqual<FormattedAuthCode>(res.formatted, {
          ServiceProvider: validSplits[code][0],
          UniqueCode: validSplits[code][1],
        });
      });
    });
  });

  describe("valid o2 PAC code", () => {
    const res = validateAuthCode(validO2PacCode, "PAC");
    it("has metadata", () => {
      notEqual(res.metadata, undefined);
    });
  });
  describe("valid PAC code with unknown SP", () => {
    const res = validateAuthCode(validUnknownPacCode, "PAC");
    it("does not have metadata", () => {
      strictEqual<boolean>(res.metadata, undefined);
    });
  });
  describe("valid PAC code with aliased SPID", () => {
    const res = validateAuthCode(validAliasedPacCode, "PAC");
    it("matches the aliased item correctly", () => {
      strictEqual<string>(res.metadata.id, "VUK");
    });
  });

  describe("valid o2 STAC code", () => {
    const res = validateAuthCode(validO2StacCode, "STAC");
    it("has metadata", () => {
      notEqual(res.metadata, undefined);
    });
  });
  describe("valid STAC code with unknown SP", () => {
    const res = validateAuthCode(validUnknownStacCode, "STAC");
    it("does not have metadata", () => {
      strictEqual<boolean>(res.metadata, undefined);
    });
  });
  describe("valid STAC code with aliased SPID", () => {
    const res = validateAuthCode(validAliasedStacCode, "STAC");
    it("matches the aliased item correctly", () => {
      strictEqual<string>(res.metadata.id, "VUK");
    });
  });

  invalid.forEach((code) => {
    describe(`invalid code ${code}`, () => {
      const res = validateAuthCode(code);
      it("fails regex test", () => {
        strictEqual<boolean>(res.success, false);
        strictEqual<ValidationFailureReason>(res.reason, ValidationFailureReason.NO_MATCH);
      });
    });
  });
});
