import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isVeg: boolean;
}

interface MenuProps {
  onAddToCart: (item: MenuItem, quantity: number) => void;
}

const Menu: React.FC<MenuProps> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const menuItems: MenuItem[] = [
    // Breakfast
    { id: 1, name: 'Idli Sambar', description: 'Steamed rice cakes with lentil curry and coconut chutney', price: 80, category: 'breakfast', image: 'https://www.mapsofindia.com/ci-moi-images/my-india/Idli-Sambhar.jpg', isVeg: true },
    { id: 2, name: 'Masala Dosa', description: 'Crispy crepe filled with spiced potato curry', price: 120, category: 'breakfast', image: 'https://www.newsmagnify.com/wp-content/uploads/2022/01/masala-dosa-recipe.jpg', isVeg: true },
    { id: 3, name: 'Appam', description: 'Thick pancake topped with vegetables and served with chutney', price: 100, category: 'breakfast', image: 'https://as2.ftcdn.net/v2/jpg/05/35/69/31/1000_F_535693131_q6r1ni3E5p281LKDvRicgnMPUrThodC8.jpg', isVeg: true },
    { id: 4, name: 'Pongal', description: 'Flattened rice with onions, mustard seeds, and curry leaves', price: 60, category: 'breakfast', image: 'https://as2.ftcdn.net/v2/jpg/05/33/82/33/1000_F_533823323_b6ykwCLF0fmmCirThNKIJgdHgkOrEcoA.jpg', isVeg: true },
    { id: 5, name: 'Upma', description: 'Flattened rice with onions, mustard seeds, and curry leaves', price: 60, category: 'breakfast', image: 'https://tse4.mm.bing.net/th/id/OIP.boBBw90ShLIHl5l9pQvbQgHaE7?rs=1&pid=ImgDetMain&o=7&rm=3', isVeg: true },
    { id: 6, name: 'Rava Kichadi', description: 'Flattened rice with onions, mustard seeds, and curry leaves', price: 60, category: 'breakfast', image: 'https://c2.staticflickr.com/2/1579/25046128571_dca35e467e_z.jpg', isVeg: true },
    { id: 7, name: 'Puri with Masala ', description: 'Flattened rice with onions, mustard seeds, and curry leaves', price: 60, category: 'breakfast', image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2020/12/poori-puri-recipe.webp', isVeg: true },
    { id: 8, name: 'Adai', description: 'Flattened rice with onions, mustard seeds, and curry leaves', price: 60, category: 'breakfast', image: 'https://www.sandyathome.com/wp-content/uploads/2020/09/barnyard-millet-adai-1.jpg', isVeg: true },
    // Lunch/Snacks
    { id: 5, name: 'Rice with Sambar', description: 'Steamed white rice served with flavorful South Indian lentil sambar, spiced with tamarind and vegetables', price: 50, category: 'lunch', image: 'https://th.bing.com/th/id/R.74509d78202f32e030971951a471500e?rik=LQjLJpihIUzkaw&riu=http%3a%2f%2flh3.ggpht.com%2f_WVu0gJovIxY%2fTYq5abhDRhI%2fAAAAAAAASnU%2fjT9EBb0rmwI%2fw1200-h630-p-nu%2fsambar-sadam_thumb4.jpg%3fimgmax%3d800&ehk=Hq8s4mcbqM%2f5mIhqnU45y%2fsZlFrIlMWUUaAkVxcQBZI%3d&risl=&pid=ImgRaw&r=0', isVeg: false },
    { id: 6, name: 'Rasam', description: 'A tangy and spiced South Indian soup made with tamarind, tomatoes, and aromatic spices, served with steamed rice', price: 40, category: 'lunch', image: 'https://recipes.timesofindia.com/thumb/53552165.cms?imgsize=147885&width=800&height=800', isVeg: true },
    { id: 7, name: 'Poriyal', description: 'A mildly spiced South Indian stir-fry made with fresh vegetables, grated coconut, and curry leaves', price: 40, category: 'lunch', image: 'https://c2.staticflickr.com/8/7164/26775130100_c1c480ff6f_z.jpg', isVeg: true },
    { id: 8, name: 'Kootu', description: 'A wholesome South Indian side dish made with lentils, vegetables, coconut, and mild spices, offering a soft and comforting texture', price: 40, category: 'lunch', image: 'https://c2.staticflickr.com/8/7779/26916809590_67549f714b_z.jpg', isVeg: true },
    { id: 9, name: 'More Kuzhambu', description: 'A tangy South Indian curry made with yogurt, coconut, and spices, cooked with vegetables for a mildly spiced, creamy flavor', price: 40, category: 'lunch', image: 'https://4.bp.blogspot.com/_8MS8qRPkl9U/TKJLMDlrESI/AAAAAAAAIoU/05yjWRZFBjM/s1600/017.JPG', isVeg: true },
    { id: 10, name: 'Kara Kuzhambu', description: 'A spicy and tangy South Indian curry made with tamarind, ground spices, and vegetables, bursting with bold flavors', price: 40, category: 'lunch', image: 'https://th.bing.com/th/id/R.2c3cf6a2923728eb5efadb772f660b09?rik=OnZr12nQCC2vTA&riu=http%3a%2f%2fwww.southindianfoods.in%2frecipe_picture_enlarge%2fkathirikai-kara-kuzhambu.jpg&ehk=xpQt0o2vaDmKbWtbDwPS3NLyEjeCu7EiaQXJlAcSnt0%3d&risl=&pid=ImgRaw&r=0', isVeg: true },
    { id: 11, name: 'Pulikuzhambu', description: 'A tangy and flavorful South Indian curry made with tamarind extract, spices, and vegetables, offering a rich, zesty taste', price: 30, category: 'lunch', image: 'https://tse3.mm.bing.net/th/id/OIP.h3Ypnw3oo52sjEXxnYOb6gHaE8?rs=1&pid=ImgDetMain&o=7&rm=3', isVeg: true },
    { id: 12, name: 'Lemon Rice ', description: 'A refreshing South Indian rice dish flavored with fresh lemon juice, tempered spices, and curry leaves for a zesty taste', price: 30, category: 'lunch', image: 'https://tse1.mm.bing.net/th/id/OIP.5W3v5UNiezZxyQQ9qB0H7wHaLC?rs=1&pid=ImgDetMain&o=7&rm=3', isVeg: true },
    { id: 13, name: 'Tomato Rice ', description: 'A flavorful South Indian rice dish cooked with ripe tomatoes, aromatic spices, and curry leaves for a tangy, savory taste', price: 30, category: 'lunch', image: 'https://www.southindianfoods.in/gallery/how-to-make-tomato-rice-step-by-step-photos/tamilnadu-style-tomato-rice.jpg', isVeg: true },
    { id: 14, name: 'Curd Rice', description: 'A cooling South Indian dish made with steamed rice mixed with fresh curd, tempered with mustard seeds, curry leaves, and green chilies', price: 30, category: 'lunch', image: 'https://d36v5spmfzyapc.cloudfront.net/wp-content/uploads/2021/01/south-indian-curd-rice-2.jpg', isVeg: true },
    
    // Sweets
    { id: 9, name: 'Kesari', description: 'A popular South Indian dessert made with semolina, ghee, sugar, and saffron, offering a rich, aromatic, and melt-in-the-mouth sweetness', price: 50, category: 'sweets', image: 'https://thumbs.dreamstime.com/z/indian-dessert-sweet-rava-kesari-south-food-oct-served-glass-bowl-259631583.jpg', isVeg: true },
    { id: 10, name: 'Laddu', description: 'A classic Indian sweet made from flour, ghee, and sugar, shaped into soft, round balls with a rich, melt-in-the-mouth texture', price: 70, category: 'sweets', image: 'https://thumbs.dreamstime.com/z/laddu-also-know-as-laddoo-ladoo-laddo-ball-shaped-sweets-popular-indian-festivals-made-flour-minced-dough-sugar-195311771.jpg', isVeg: true },
    { id: 11, name: 'Mysore Pak ', description: 'A rich South Indian sweet made with gram flour, ghee, and sugar, known for its soft, melt-in-the-mouth texture and aromatic flavor', price: 40, category: 'sweets', image: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2017/08/mysore-pak.jpg', isVeg: true },
    { id: 12, name: 'Jangiri', description: 'A traditional South Indian sweet made from urad dal batter, deep-fried in intricate swirls, and soaked in fragrant sugar syrup.Ask ChatGPT', price: 80, category: 'sweets', image:'https://southindianfoods.in/recipe_picture_enlarge/homemade-jangiri.jpg', isVeg: true },
    { id: 13, name: 'Rava Ladoo', description: 'A delicious South Indian sweet made with roasted semolina, ghee, sugar, and cardamom, shaped into soft, aromatic balls', price: 80, category: 'sweets', image: 'https://tastysouthindianfoods.com.au/wp-content/uploads/2024/07/Ravva-laddu.jpeg', isVeg: true },
    { id: 14, name: 'Payasam', description: 'A traditional South Indian dessert made with milk, jaggery or sugar, and rice or vermicelli, flavored with cardamom and garnished with nuts', price: 80, category: 'sweets', image: 'https://th.bing.com/th/id/R.63d7c0f718e8306a93cd6dc8c6382c25?rik=x9yADev8GGwxDw&riu=http%3a%2f%2fi.ndtvimg.com%2fi%2f2015-05%2fpayasam-sevai-625_625x350_71431150303.jpg&ehk=9r2%2bj%2fMzeuZ1GNabi82KoaNXC9sYipn7OvCa1M7KxbI%3d&risl=&pid=ImgRaw&r=0', isVeg: true },
  
    // Beverages
    { id: 13, name: 'Tea', description: 'Traditional Indian tea with aromatic spices', price: 25, category: 'beverages', image: 'https://2.bp.blogspot.com/-1ZAghmgnUeo/W65nI1SAoLI/AAAAAAAAKDM/CEkW8SOlKQE3CQ751hepa_FFY-bGJLwOQCLcBGAs/s640/aAaAAaaaaaAaAaaaaaaaaaaaAaaAaaaaaAAAaaaaAaaaaaaaAAaaAaaaaaaaaAaaaaaaaaaaaaaAaaaaaaaaaAaaaaaaAaaaaaaaaAaAaaaAaaaaaaaAaaaAaaaAaaaaaaaaaaAaaaAaaaaAAAaaaaAaaaAaaaaAaAaaAaaab%2B%25282%2529.jpg', isVeg: true },
    { id: 14, name: 'Filter Coffee', description: 'South Indian style strong coffee with milk and sugar', price: 30, category: 'beverages', image: 'https://i.pinimg.com/originals/e1/de/27/e1de27bd433eef65782eac5e92eb47a1.jpg', isVeg: true },
    { id: 15, name: 'Buttermilk', description: 'A refreshing South Indian drink made by blending curd with water, seasoned with salt, curry leaves, and green chilies', price: 35, category: 'beverages', image: 'https://tse3.mm.bing.net/th/id/OIP.ebPpGEPBozGm5RZLeiqrqwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3', isVeg: true },
    { id: 16, name: 'Panagam ', description: 'A traditional South Indian drink made with jaggery, water, dry ginger, and cardamom, served chilled for a sweet and spicy refreshment', price: 35, category: 'beverages', image: 'https://themagicsaucepan.com/wp-content/uploads/2018/03/20180319-Panakam-Panagam-ram-navami-0368.jpg', isVeg: true },
    { id: 17, name: 'Neer Mor ', description: 'A refreshing South Indian drink made by blending curd with water and seasoning it with curry leaves, ginger, and green chilies', price: 35, category: 'beverages', image: 'https://www.southindianfoods.in/recipe_picture_enlarge/neer-moru-summer-special-recipe.jpg', isVeg: true },
    { id: 18, name: 'Tender Coconut', description: 'A naturally sweet and refreshing drink served straight from fresh tender coconut, rich in electrolytes and nutrients', price: 35, category: 'beverages', image: 'https://images.slurrp.com/webstories/wp-content/uploads/2023/07/25100504/cropped-K6-3.jpeg', isVeg: true },
  ];
  

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'breakfast', name: 'Breakfast' },
    { id: 'lunch', name: 'Lunch & Snacks' },
    { id: 'sweets', name: 'Sweets' },
    { id: 'beverages', name: 'Beverages' },
  ];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const updateQuantity = (itemId: number, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change)
    }));
  };

  const handleAddToCart = (item: MenuItem) => {
    const quantity = quantities[item.id] || 1;
    onAddToCart(item, quantity);
    setQuantities(prev => ({ ...prev, [item.id]: 0 }));
  };

  return (
    <section id="menu" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Our Menu</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our wide variety of authentic dishes prepared with love and traditional recipes
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-orange-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-orange-100 hover:text-orange-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className={`absolute top-4 left-4 px-2 py-1 rounded-full text-xs font-semibold ${
                  item.isVeg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {item.isVeg ? 'VEG' : 'NON-VEG'}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{item.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-orange-600">₹{item.price}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                      disabled={!quantities[item.id]}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-semibold text-lg min-w-[2rem] text-center">
                      {quantities[item.id] || 0}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 rounded-full bg-orange-600 hover:bg-orange-700 text-white flex items-center justify-center transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;