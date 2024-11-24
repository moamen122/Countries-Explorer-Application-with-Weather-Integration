export interface CountryData {
  code: string;
  country: {
    name: string;
    capital: string;
    languages: { name: string }[];
    currency: string;
  };
}

export interface RestCountryData {
  population?: number;
  timezones?: string[];
  borders?: string[];
  subdivisions?: { name: string }[];
  flags?: {
    svg: string;
  };
}
