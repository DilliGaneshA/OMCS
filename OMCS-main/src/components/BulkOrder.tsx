import React, { useState } from 'react';
import { Users, Calendar, Phone, Mail, MapPin, Calculator } from 'lucide-react';

interface BulkOrderForm {
  eventType: string;
  guestCount: number;
  eventDate: string;
  eventTime: string;
  venue: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  specialRequirements: string;
  menuPreference: string;
}

const BulkOrder: React.FC = () => {
  const [formData, setFormData] = useState<BulkOrderForm>({
    eventType: '',
    guestCount: 50,
    eventDate: '',
    eventTime: '',
    venue: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    specialRequirements: '',
    menuPreference: ''
  });

  const [estimatedCost, setEstimatedCost] = useState(0);

  const eventTypes = [
    'Wedding Reception',
    'Birthday Party',
    'Corporate Event',
    'Festival Celebration',
    'Baby Shower',
    'Housewarming',
    'Retirement Party',
    'Other'
  ];

  const menuOptions = [
    { id: 'basic', name: 'Basic Package', pricePerPerson: 200 },
    { id: 'standard', name: 'Standard Package', pricePerPerson: 350 },
    { id: 'premium', name: 'Premium Package', pricePerPerson: 500 },
    { id: 'luxury', name: 'Luxury Package', pricePerPerson: 750 }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Calculate estimated cost
    if (name === 'guestCount' || name === 'menuPreference') {
      const guests = name === 'guestCount' ? parseInt(value) : formData.guestCount;
      const menuId = name === 'menuPreference' ? value : formData.menuPreference;
      const menuOption = menuOptions.find(option => option.id === menuId);
      
      if (menuOption && guests > 0) {
        setEstimatedCost(guests * menuOption.pricePerPerson);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Bulk order inquiry submitted! We will contact you within 24 hours.');
  };

  return (
    <section id="bulk-order" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Bulk Pre-Orders</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Planning a special event? Let us take care of the catering with our customizable bulk order packages
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Event Details</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Type *
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                  >
                    <option value="">Select event type</option>
                    {eventTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="inline h-4 w-4 mr-1" />
                    Number of Guests *
                  </label>
                  <input
                    type="number"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleInputChange}
                    min="10"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Event Date *
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Time *
                  </label>
                  <input
                    type="time"
                    name="eventTime"
                    value={formData.eventTime}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Venue Address *
                </label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter complete venue address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline h-4 w-4 mr-1" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Menu Package *
                </label>
                <select
                  name="menuPreference"
                  value={formData.menuPreference}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                >
                  <option value="">Select menu package</option>
                  {menuOptions.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.name} - ₹{option.pricePerPerson}/person
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requirements
                </label>
                <textarea
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Any dietary restrictions, special dishes, or additional services needed..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 text-white px-6 py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors shadow-lg"
              >
                Submit Bulk Order Inquiry
              </button>
            </form>
          </div>

          {/* Package Information */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                <Calculator className="inline h-8 w-8 mr-2 text-orange-600" />
                Cost Estimate
              </h3>
              
              {estimatedCost > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    ₹{estimatedCost.toLocaleString()}
                  </div>
                  <p className="text-gray-600">
                    Estimated cost for {formData.guestCount} guests
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    *Final pricing may vary based on menu customization and additional services
                  </p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Menu Packages</h3>
              
              <div className="space-y-4">
                {menuOptions.map(option => (
                  <div key={option.id} className="border rounded-lg p-4 hover:bg-orange-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold text-gray-800">{option.name}</h4>
                      <span className="text-orange-600 font-bold">₹{option.pricePerPerson}/person</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">What's Included</h3>
              
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                  Free venue setup and decoration consultation
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                  Professional serving staff
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                  Quality serving equipment and utensils
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                  Post-event cleanup service
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                  6 Days customer support during event
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BulkOrder;