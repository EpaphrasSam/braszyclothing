const countryAbbreviations: { [key: string]: string } = {
  "United States": "US",
  "United Kingdom": "GB",
  Canada: "CA",
  Australia: "AU",
  Germany: "DE",
  France: "FR",
  Japan: "JP",
  Italy: "IT",
  Spain: "ES",
  Netherlands: "NL",
  Sweden: "SE",
  Switzerland: "CH",
  Norway: "NO",
  Denmark: "DK",
  Finland: "FI",
  Belgium: "BE",
  Austria: "AT",
  "New Zealand": "NZ",
  Ireland: "IE",
  Singapore: "SG",
  "Hong Kong": "HK",
  Luxembourg: "LU",
  Portugal: "PT",
  Greece: "GR",
  Poland: "PL",
  "Czech Republic": "CZ",
  Hungary: "HU",
  Slovakia: "SK",
  Slovenia: "SI",
  Estonia: "EE",
  Latvia: "LV",
  Lithuania: "LT",
  Malta: "MT",
  Cyprus: "CY",
  Romania: "RO",
  Bulgaria: "BG",
  Croatia: "HR",
  "United Arab Emirates": "AE",
  "Saudi Arabia": "SA",
  "South Africa": "ZA",
  Mexico: "MX",
  Brazil: "BR",
  Argentina: "AR",
  Chile: "CL",
  Colombia: "CO",
  Peru: "PE",
  India: "IN",
  Malaysia: "MY",
  Thailand: "TH",
  Indonesia: "ID",
  Philippines: "PH",
  Vietnam: "VN",
  Turkey: "TR",
  Russia: "RU",
  Iceland: "IS",
  Liechtenstein: "LI",
};

export function countryToAbbreviation(country: string): string {
  const abbreviation = countryAbbreviations[country];
  return abbreviation || "US";
}
