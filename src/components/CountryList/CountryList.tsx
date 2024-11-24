import React from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import WeatherInfo from "../../components/WeatherInfo/WeatherInfo";
import useCountryList from "./CountryList.service";

const CountryList: React.FC = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedContinent,
    setSelectedContinent,
    sortBy,
    setSortBy,
    loading,
    error,
    filteredAndSortedCountries,
    continents,
    hasMore,
    loadMore,
    totalCount,
  } = useCountryList();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Search Countries
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by country name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={selectedContinent}
              onChange={(e) => setSelectedContinent(e.target.value)}
              className="p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-w-[200px]"
            >
              <option value="">All Continents</option>
              {continents.map((continent: unknown) => (
                <option key={String(continent)} value={String(continent)}>
                  {String(continent)}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-w-[200px]"
            >
              <option value="name">Sort by Name</option>
              <option value="population">Sort by Population</option>
              <option value="area">Sort by Area</option>
            </select>
          </div>
        </div>

        {loading && filteredAndSortedCountries.length === 0 && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 bg-red-50 p-4 rounded-lg mb-6">
            Error: {error.message}
          </div>
        )}

        <InfiniteScroll
          dataLength={filteredAndSortedCountries.length}
          next={loadMore}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          }
          endMessage={
            <p className="text-center text-gray-500 my-4">
              Showing all {totalCount} countries
            </p>
          }
        >
          <div className="grid grid-cols-1 gap-6">
            {filteredAndSortedCountries.map((country: any) => (
              <div
                key={country.code}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex flex-col sm:flex-row items-center gap-4 flex-grow">
                      <img
                        src={`https://flagcdn.com/w80/${country.code.toLowerCase()}.png`}
                        alt={`${country.name} flag`}
                        className="w-20 h-auto rounded-md shadow-sm"
                      />
                      <div className="text-center sm:text-left">
                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                          {country.name}
                        </h2>
                        <p className="text-gray-600 mb-2">
                          Capital: {country.capital || "N/A"} • Continent:{" "}
                          {country.continent.name}
                        </p>
                        <Link
                          to={`/country/${country.code}`}
                          className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>

                    {country.capital && (
                      <div className="w-full md:w-auto">
                        <WeatherInfo city={country.capital} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>

        {!loading && !error && filteredAndSortedCountries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No countries found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryList;
