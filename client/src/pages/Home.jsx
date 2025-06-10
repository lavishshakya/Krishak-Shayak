import { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import WeatherCard from '../components/WeatherCard';
import Footer from '../components/Footer';

const Home = () => {
  const [weatherData, setWeatherData] = useState({
    temp: 28,
    condition: 'Sunny',
    humidity: 65,
    windSpeed: 12
  });
  
  const cropRecommendations = [
    { id: 1, name: "Rice", season: "Kharif", suitable: "High", yield: "5-6 tonnes/hectare" },
    { id: 2, name: "Wheat", season: "Rabi", suitable: "Medium", yield: "3-4 tonnes/hectare" },
    { id: 3, name: "Maize", season: "Kharif", suitable: "High", yield: "4-5 tonnes/hectare" },
  ];

  const newsItems = [
    { id: 1, title: "New subsidy scheme launched for organic farming", date: "June 5, 2025" },
    { id: 2, title: "Weather alert: Delayed monsoon expected this year", date: "June 2, 2025" },
    { id: 3, title: "Government introduces new crop insurance policy", date: "May 28, 2025" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Navbar />
      <Hero />
      
      {/* Weather and Quick Actions Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weather Card */}
          <WeatherCard weatherData={weatherData} />
          
          {/* Quick Action Cards */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Analyze Your Soil</h3>
            <p className="text-gray-600 mb-4">Upload a soil image to get detailed analysis and recommendations.</p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Upload Soil Image
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Identify Plant Disease</h3>
            <p className="text-gray-600 mb-4">Take or upload a photo of your crop to identify diseases and get treatment options.</p>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Scan Plant
            </button>
          </div>
        </div>
      </section>

      {/* Crop Recommendations Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Crop Recommendations for Your Region</h2>
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Season</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suitability</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expected Yield</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cropRecommendations.map(crop => (
                <tr key={crop.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{crop.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{crop.season}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      crop.suitable === 'High' ? 'bg-green-100 text-green-800' : 
                      crop.suitable === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {crop.suitable}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{crop.yield}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" className="text-green-600 hover:text-green-900">View Details</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-center">
          <button className="inline-flex items-center text-green-600 hover:text-green-800 font-medium">
            View All Recommendations
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-green-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">How Krishak Shayak Helps You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center transition transform hover:scale-105">
              <div className="text-green-600 mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Crop Recommendations</h3>
              <p className="text-gray-600">Get AI-powered crop suggestions based on your soil, climate, and market demand</p>
            </div>
            
            {/* Add other feature items here */}
          </div>
        </div>
      </section>

      {/* Agricultural News Section - abbreviated for brevity */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Latest Agricultural News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200">
                <img 
                  src={`https://source.unsplash.com/random/300x200/?agriculture,${item.id}`} 
                  alt="News" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-500 mb-2">{item.date}</p>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <a href="#" className="text-green-600 hover:text-green-800 font-medium">Read More →</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Farming?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of farmers who have increased their productivity with Krishak Shayak's AI-powered recommendations.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-green-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg shadow-lg transition transform hover:scale-105">
              Get Started
            </button>
            <button className="bg-transparent hover:bg-green-500 text-white font-bold py-3 px-8 border-2 border-white rounded-lg shadow-lg transition transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;