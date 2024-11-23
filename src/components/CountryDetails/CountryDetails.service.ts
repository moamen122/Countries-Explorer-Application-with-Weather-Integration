import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { fetchRestCountryData } from '../../api/countries.api';
import { CountryData, RestCountryData } from '../../types/Country.type';

const GET_COUNTRY_DETAILS = gql`
  query GetCountryDetails($code: ID!) {
    country(code: $code) {
      name
      capital
      languages {
        name
      }
      currency
    }
  }
`;

 const useCountryDetails = (code: string) => {
  const [restCountryData, setRestCountryData] = useState<RestCountryData | null>(null);
  
  const { loading, error, data } = useQuery<CountryData>(GET_COUNTRY_DETAILS, {
    variables: { code },
    skip: !code,
  });

  useEffect(() => {
    if (code) {
      fetchRestCountryData(code, setRestCountryData);
    }
  }, [code]);

  return {
    loading,
    error,
    countryData: data?.country,
    restCountryData,
  };
};
export default useCountryDetails;