git clone

# Navigate to project directory

cd <project-name>

# Install dependencies

npm install

# Start the development server

npm start

Important Notes:
The development server will automatically open your default browser to http://localhost:3000
Any changes you make to the code will automatically reload in the browser
Check the package.json file for specific scripts and dependencies
Make sure you're in the project directory when running npm commands
Common Issues:
If npm start fails, try deleting the node_modules folder and package-lock.json file, then run npm install again
Check if all required environment variables are set (if any)
Make sure all required ports are available (default is 3000)

Core Features
Country Listing:

-Displays a list of countries with their flags and basic information
-Supports infinite scrolling
-Includes filtering by name and continent
-Sorting capabilities by name, population, and area
-Shows current weather for each country's capital

Country Details:

-Detailed view for each country showing:
-National flag
-Basic information (capital, languages, currency)
-Population and timezones
-Neighboring countries
States/regions (subdivisions)

Architecture:
1-Data Sources
-GraphQL API for basic country data (using Apollo Client)
-REST Countries API for additional country details
-OpenWeatherMap API for weather information

2-Component Structure
-App: Main routing component
-CountryList: List view with filtering and sorting
CountryDetails: Detailed country view
-WeatherInfo: Weather information component

3-State Management
-Custom hooks for business logic (useCountryList, useCountryDetails, useWeatherInfo)
-Apollo Client for GraphQL state
-Local state using React hooks
4-Styling

-Uses Tailwind CSS for styling
-Responsive design with mobile-first approach
-Modern UI with cards, gradients, and smooth transitions

Technical Implementation:

-TypeScript for type safety
-React Router for navigation
-Axios for REST API calls
-Environment variables for API keys
-Custom type definitions for better type safety
-Component separation following container/presenter pattern
-Error handling and loading states
