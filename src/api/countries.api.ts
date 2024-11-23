import axios from "axios";

export const fetchRestCountryData = async (countryCode: string, setRestCountryData: (data: any) => void) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
      if (response.data && response.data[0]) {
        const countryData = response.data[0];
        setRestCountryData({
          ...countryData,
          population: countryData.population,
          area: countryData.area
        });
      }
    } catch (err) {
      console.error('Error fetching REST API data:', err);
    }
  };