"use server";

import { cache } from "react";

export const getUserLocation = cache(async () => {
  try {
    const response = await fetch(
      `https://ipinfo.io/json?token=${process.env.IPINFO_TOKEN}`
    );
    const data = await response.json();
    return data.country; // Return the country abbreviation
  } catch (error) {
    console.error("Error fetching user location:", error);
    return "CA"; // Default to Canada if there's an error
  }
});

export const getExchangeRates = cache(async () => {
  try {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/CAD"
    );
    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return null;
  }
});
