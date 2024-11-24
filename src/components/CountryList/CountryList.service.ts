import { useState, useEffect, useMemo } from "react";
import { useQuery, gql } from "@apollo/client";
import { fetchRestCountryData } from "../../api/countries.api";
import { CountryData } from "../../types/Country.type";

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      capital
      continent {
        name
      }
      languages {
        name
      }
    }
  }
`;

export const useCountryList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [countriesData, setCountriesData] = useState<
    Record<string, { population: number; area: number }>
  >({});
  const [visibleCount, setVisibleCount] = useState(20);
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  useEffect(() => {
    const fetchAllCountriesData = async () => {
      if (data?.countries) {
        const newCountriesData: Record<string, any> = {};

        const promises = data.countries.map(async (country: CountryData) => {
          await fetchRestCountryData(country.code, (countryData) => {
            newCountriesData[country.code] = {
              population: countryData.population,
              area: countryData.area,
            };
          });
        });
        await Promise.all(promises);
        setCountriesData(newCountriesData);
      }
    };

    fetchAllCountriesData();
  }, [data]);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(20);
  }, [searchTerm, selectedContinent, sortBy]);

  const filteredAndSortedCountries = useMemo(() => {
    let filtered = data?.countries || [];

    if (searchTerm) {
      filtered = filtered.filter((country: any) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedContinent) {
      filtered = filtered.filter(
        (country: any) => country.continent.name === selectedContinent
      );
    }

    return [...filtered].sort((a: any, b: any) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "population":
          const populationA = countriesData[a.code]?.population || 0;
          const populationB = countriesData[b.code]?.population || 0;
          return populationB - populationA;
        case "area":
          const areaA = countriesData[a.code]?.area || 0;
          const areaB = countriesData[b.code]?.area || 0;
          return areaB - areaA;
        default:
          return 0;
      }
    });
  }, [data, searchTerm, selectedContinent, sortBy, countriesData]);

  const continents = useMemo(() => {
    if (!data?.countries) return [];
    return Array.from(
      new Set(data.countries.map((country: any) => country.continent.name))
    );
  }, [data]);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 20);
  };

  const hasMore = visibleCount < filteredAndSortedCountries.length;
  const visibleCountries = filteredAndSortedCountries.slice(0, visibleCount);

  return {
    searchTerm,
    setSearchTerm,
    selectedContinent,
    setSelectedContinent,
    sortBy,
    setSortBy,
    loading,
    error,
    filteredAndSortedCountries: visibleCountries,
    continents,
    hasMore,
    loadMore,
    totalCount: filteredAndSortedCountries.length,
  };
};

export default useCountryList;
