import React from 'react';
import { Star, Clock, TrendingUp } from 'lucide-react';

interface SpecialItem {
  id: number;
  name: string;
  description: string;
  originalPrice: number;
  specialPrice: number;
  image: string;
  discount: number;
  isVeg: boolean;
  rating: number;
  ordersToday: number;
}

const TodaysSpecial: React.FC = () => {
  const todaysSpecials: SpecialItem[] = [
    {
      id: 1,
      name: 'Idli',
      description: 'Complete meal with dal, sabzi, roti, rice, pickle, and sweet',
      originalPrice: 200,
      specialPrice: 150,
      image: 'https://www.mapsofindia.com/ci-moi-images/my-india/Idli-Sambhar.jpg',
      discount: 25,
      isVeg: true,
      rating: 4.8,
      ordersToday: 45
    },
    {
      id: 2,
      name: 'Dosa',
      description: 'Aromatic biryani with raita, pickle, and complimentary sweet',
      originalPrice: 300,
      specialPrice: 220,
      image: 'https://www.newsmagnify.com/wp-content/uploads/2022/01/masala-dosa-recipe.jpg',
      discount: 27,
      isVeg: false,
      rating: 4.9,
      ordersToday: 38
    },
    {
      id: 3,
      name: 'Pongal',
      description: 'Idli, dosa, vada, sambar, and three types of chutney',
      originalPrice: 180,
      specialPrice: 130,
      image: 'https://as2.ftcdn.net/v2/jpg/05/33/82/33/1000_F_533823323_b6ykwCLF0fmmCirThNKIJgdHgkOrEcoA.jpg',
      discount: 28,
      isVeg: true,
      rating: 4.7,
      ordersToday: 52
    },
    {
      id: 4,
      name: 'Upma',
      description: 'Idli, dosa, vada, sambar, and three types of chutney',
      originalPrice: 180,
      specialPrice: 130,
      image: 'https://tse4.mm.bing.net/th/id/OIP.boBBw90ShLIHl5l9pQvbQgHaE7?rs=1&pid=ImgDetMain&o=7&rm=3',
      discount: 28,
      isVeg: true,
      rating: 4.7,
      ordersToday: 52
    },
    {
      id: 5,
      name: 'Rava Kichadi',
      description: 'Idli, dosa, vada, sambar, and three types of chutney',
      originalPrice: 180,
      specialPrice: 130,
      image: 'https://c2.staticflickr.com/2/1579/25046128571_dca35e467e_z.jpg',
      discount: 28,
      isVeg: true,
      rating: 4.7,
      ordersToday: 52
    },
    {
      id: 6,
      name: 'Puri with Masala',
      description: 'Idli, dosa, vada, sambar, and three types of chutney',
      originalPrice: 180,
      specialPrice: 130,
      image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2020/12/poori-puri-recipe.webp',
      discount: 28,
      isVeg: true,
      rating: 4.7,
      ordersToday: 52
    },
    {
      id: 7,
      name: 'Adai',
      description: 'Idli, dosa, vada, sambar, and three types of chutney',
      originalPrice: 180,
      specialPrice: 130,
      image: 'https://www.sandyathome.com/wp-content/uploads/2020/09/barnyard-millet-adai-1.jpg',
      discount: 28,
      isVeg: true,
      rating: 4.7,
      ordersToday: 52
    },
    {
      id: 9,
      name: 'Appam',
      description: 'Idli, dosa, vada, sambar, and three types of chutney',
      originalPrice: 180,
      specialPrice: 130,
      image: 'https://as2.ftcdn.net/v2/jpg/05/35/69/31/1000_F_535693131_q6r1ni3E5p281LKDvRicgnMPUrThodC8.jpg',
      discount: 28,
      isVeg: true,
      rating: 4.7,
      ordersToday: 52
    }
    
  ];

  return (
    <section id="specials" className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Today's Special</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Limited time offers on our most loved dishes - grab them before they're gone!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {todaysSpecials.map(item => (
            <div key={item.id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden relative">
              {/* Discount Badge */}
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {item.discount}% OFF
                </div>
              </div>

              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                
                {/* Veg/Non-veg indicator */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
                  item.isVeg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {item.isVeg ? 'VEG' : 'NON-VEG'}
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                
                {/* Rating and Orders */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="font-semibold text-gray-800">{item.rating}</span>
                    </div>
                    <span className="text-gray-500">•</span>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-600">{item.ordersToday} orders today</span>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-bold text-orange-600">₹{item.specialPrice}</span>
                    <span className="text-lg text-gray-500 line-through">₹{item.originalPrice}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>Limited time</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-4 rounded-xl font-semibold text-lg hover:from-orange-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Order Now - Save ₹{item.originalPrice - item.specialPrice}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Special offers valid only for today! Don't miss out on these amazing deals.
          </p>
          <button className="bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
            View All Specials
          </button>
        </div>
      </div>
    </section>
  );
};

export default TodaysSpecial;