import React from 'react';
import { ChefHat, Clock, Star, Truck } from 'lucide-react';

const Banner: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-red-50 pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 text-orange-600">
          <ChefHat className="h-32 w-32" />
        </div>
        <div className="absolute top-40 right-32 text-red-600">
          <Star className="h-24 w-24" />
        </div>
        <div className="absolute bottom-32 left-32 text-yellow-600">
          <Clock className="h-28 w-28" />
        </div>
        <div className="absolute bottom-20 right-20 text-green-600">
          <Truck className="h-36 w-36" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
            Om Sri
            <span className="block text-orange-600">Mahaganapati</span>
            <span className="block text-2xl md:text-3xl text-gray-600 font-normal mt-4">
              Catering Service
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Authentic flavors, exceptional service, and memorable experiences for all your special occasions
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Order Now
            </button>
            <button className="border-2 border-orange-600 text-orange-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 hover:text-white transition-all duration-300 transform hover:scale-105">
              View Menu
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <ChefHat className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Expert Chefs</h3>
            <p className="text-gray-600 text-sm">Experienced culinary masters crafting authentic flavors</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Timely Service</h3>
            <p className="text-gray-600 text-sm">On-time delivery for all your events and occasions</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <Star className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Quality Food</h3>
            <p className="text-gray-600 text-sm">Fresh ingredients and traditional recipes for the best taste</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <Truck className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Free Delivery</h3>
            <p className="text-gray-600 text-sm">Complimentary delivery within the city limits</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;