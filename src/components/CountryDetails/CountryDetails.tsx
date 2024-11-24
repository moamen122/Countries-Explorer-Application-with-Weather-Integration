import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCountryDetails from "./CountryDetails.service";

const CountryDetails: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const { loading, error, countryData, restCountryData } = useCountryDetails(
    code || ""
  );
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-xl text-gray-600">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <p className="text-red-500">Error: {error.message}</p>
        </div>
      </div>
    );

  if (!countryData)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-gray-500">No data available</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate("/")}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
      >
        <span>←</span> Back to Countries
      </button>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header Section with Flag */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {restCountryData?.flags?.svg && (
                <img
                  src={restCountryData.flags.svg}
                  alt={`Flag of ${countryData.name}`}
                  className="w-40 h-auto object-contain rounded-lg shadow-md border-2 border-white"
                />
              )}
              <h1 className="text-4xl font-bold text-center sm:text-left">
                {countryData.name}
              </h1>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Basic Information */}
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Basic Information
                </h2>
                <div className="space-y-4">
                  <p className="flex items-center space-x-2">
                    <span className="text-gray-600 font-medium min-w-[120px]">
                      Capital:
                    </span>
                    <span className="text-gray-800">{countryData.capital}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <span className="text-gray-600 font-medium min-w-[120px]">
                      Languages:
                    </span>
                    <span className="text-gray-800">
                      {countryData.languages
                        .map((lang) => lang.name)
                        .join(", ")}
                    </span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <span className="text-gray-600 font-medium min-w-[120px]">
                      Currency:
                    </span>
                    <span className="text-gray-800">
                      {countryData.currency}
                    </span>
                  </p>
                  {restCountryData?.population && (
                    <p className="flex items-center space-x-2">
                      <span className="text-gray-600 font-medium min-w-[120px]">
                        Population:
                      </span>
                      <span className="text-gray-800">
                        {restCountryData.population.toLocaleString()}
                      </span>
                    </p>
                  )}
                  {restCountryData?.timezones && (
                    <p className="flex items-start space-x-2">
                      <span className="text-gray-600 font-medium min-w-[120px]">
                        Time Zones:
                      </span>
                      <span className="text-gray-800">
                        {restCountryData.timezones.join(", ")}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column - Additional Information */}
              <div className="space-y-8">
                {restCountryData?.borders &&
                  restCountryData.borders.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Neighbouring Countries
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {restCountryData.borders.map((border) => (
                          <span
                            key={border}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                          >
                            {border}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {restCountryData?.subdivisions &&
                  restCountryData.subdivisions.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        States or Regions
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {restCountryData.subdivisions.map((state) => (
                          <span key={state.name} className="text-gray-700">
                            • {state.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
