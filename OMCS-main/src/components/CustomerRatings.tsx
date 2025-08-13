import React from 'react';
import { Star, Quote, MapPin } from 'lucide-react';

interface Review {
  id: number;
  customerName: string;
  location: string;
  rating: number;
  review: string;
  date: string;
  orderType: string;
  profileImage: string;
}

const CustomerRatings: React.FC = () => {
  const reviews: Review[] = [
    {
      id: 1,
      customerName: 'Rajesh Kumar',
      location: 'Koramangala, Bangalore',
      rating: 5,
      review: 'Absolutely delicious food! The biryani was perfectly spiced and the paneer butter masala was creamy and flavorful. Delivery was on time and the food was still hot. Highly recommended!',
      date: 'Dec 15, 2024',
      orderType: 'Dinner',
      profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 2,
      customerName: 'Priya Sharma',
      location: 'Whitefield, Bangalore',
      rating: 5,
      review: 'Om Sri Mahaganapati catered our wedding reception for 300+ guests. The food quality was exceptional and all our guests were impressed. Professional service and great coordination.',
      date: 'Dec 12, 2024',
      orderType: 'Wedding Catering',
      profileImage: 'https://images.pexels.com/photos/2169434/pexels-photo-2169434.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 3,
      customerName: 'Amit Patel',
      location: 'Marathahalli, Bangalore',
      rating: 4,
      review: 'Great South Indian breakfast! The dosas were crispy and the sambar had the perfect consistency. Only minor issue was the delivery was 10 minutes late, but the food quality made up for it.',
      date: 'Dec 10, 2024',
      orderType: 'Breakfast',
      profileImage: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 4,
      customerName: 'Kavya Reddy',
      location: 'Electronic City, Bangalore',
      rating: 5,
      review: 'Their sweets are to die for! Ordered gulab jamun and rasmalai for Diwali celebration at office. Everyone loved them. Fresh, authentic taste that reminds me of home.',
      date: 'Dec 8, 2024',
      orderType: 'Sweets',
      profileImage: 'https://images.pexels.com/photos/2100063/pexels-photo-2100063.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 5,
      customerName: 'Suresh Nair',
      location: 'HSR Layout, Bangalore',
      rating: 5,
      review: 'Excellent service for our corporate event. They handled 150 lunch boxes with perfect coordination. Food was hot, tasty, and well-packaged. Will definitely order again.',
      date: 'Dec 5, 2024',
      orderType: 'Corporate Catering',
      profileImage: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 6,
      customerName: 'Meera Iyer',
      location: 'Indiranagar, Bangalore',
      rating: 4,
      review: 'Love their filter coffee and traditional South Indian meals. Authentic taste and reasonable pricing. The masala chai is also very good. Delivery is usually quick.',
      date: 'Dec 3, 2024',
      orderType: 'Beverages & Snacks',
      profileImage: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const overallStats = {
    averageRating: 4.8,
    totalReviews: 847,
    ratingDistribution: [
      { stars: 5, count: 650, percentage: 77 },
      { stars: 4, count: 135, percentage: 16 },
      { stars: 3, count: 42, percentage: 5 },
      { stars: 2, count: 15, percentage: 2 },
      { stars: 1, count: 5, percentage: 1 },
    ]
  };

  const renderStars = (rating: number, size: string = 'w-5 h-5') => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`${size} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="ratings" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - see what our satisfied customers have to say about their experience
          </p>
        </div>

        {/* Overall Rating Stats */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <span className="text-6xl font-bold text-orange-600 mr-4">
                  {overallStats.averageRating}
                </span>
                <div>
                  {renderStars(Math.round(overallStats.averageRating), 'w-8 h-8')}
                  <p className="text-gray-600 mt-2">
                    Based on {overallStats.totalReviews} reviews
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Rating Distribution</h3>
              <div className="space-y-2">
                {overallStats.ratingDistribution.map(item => (
                  <div key={item.stars} className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 w-16">
                      <span className="text-sm font-medium">{item.stars}</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map(review => (
            <div key={review.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 border">
              {/* Review Header */}
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={review.profileImage}
                  alt={review.customerName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{review.customerName}</h4>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{review.location}</span>
                  </div>
                </div>
              </div>

              {/* Rating and Date */}
              <div className="flex items-center justify-between mb-4">
                {renderStars(review.rating)}
                <span className="text-sm text-gray-500">{review.date}</span>
              </div>

              {/* Order Type */}
              <div className="mb-4">
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                  {review.orderType}
                </span>
              </div>

              {/* Review Text */}
              <div className="relative">
                <Quote className="absolute top-0 left-0 w-6 h-6 text-orange-200 -mt-2 -ml-1" />
                <p className="text-gray-700 leading-relaxed pl-4">
                  {review.review}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Reviews Button */}
        <div className="text-center mt-12">
          <button className="bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
            View All Reviews
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomerRatings;