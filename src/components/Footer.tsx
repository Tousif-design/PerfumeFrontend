import React from 'react';
import { Star, Clock, MapPin, Phone, Mail, Heart, Map } from 'lucide-react';

const Footer = () => {
  const reviews = [
    {
      name: "Kausar Afeef",
      text: "I went to this shop for a custom ring, this shop was recommended by a local. I'm very happy with the service and honesty from Mr. M Vajeeh and his assistants at the shop. They have a wide variety of Kurtas, Attar and jewelry at an affordable price. His assistant Roxana was very helpful and honest in picking women's Kurtas and I'll be more than happy to come back to this shop. I'd recommend this shop for Maldivians travelling in Bangalore or just any travellers in general. May god bless this business.",
      rating: 5
    },
    {
      name: "Khalid",
      text: "He has a lot of beautiful shawls and pashmina.",
      rating: 5
    },
    {
      name: "Ahmed Almurar",
      text: "need your number i love the oud i bout and i need more",
      rating: 5
    },
    {
      name: "Adrian Constantin",
      text: "Very nice shop!",
      rating: 5
    },
    {
      name: "Granth Smith",
      text: "Good products, friendly service.",
      rating: 5
    },
    {
      name: "Pavan Ubeeoi",
      text: "Nice",
      rating: 5
    },
    {
      name: "Djalel Hioel",
      text: "Excellent showpiece, excellent products I really liked.",
      rating: 5
    },
    {
      name: "Prakash Poojari",
      text: "Super amazing",
      rating: 5
    },
    { name: "Roxana", text: "", rating: 5 },
    { name: "Mohammed Shujath", text: "", rating: 5 },
    { name: "King Maker", text: "", rating: 5 },
    { name: "Santosh Kumar", text: "", rating: 5 },
    { name: "Creative Doodler", text: "", rating: 5 },
    { name: "Kedar Charan Dehury", text: "", rating: 4 },
    { name: "Saif Ali", text: "", rating: 5 },
    { name: "Ayesha Sadaf", text: "", rating: 5 },
  ];

  const businessHours = [
    { day: "Monday", hours: "10:30 am–9:30 pm" },
    { day: "Tuesday", hours: "10:30 am–9:30 pm" },
    { day: "Wednesday", hours: "10:30 am–9:30 pm" },
    { day: "Thursday", hours: "10:30 am–9:30 pm" },
    { day: "Friday", hours: "10:30 am–9:30 pm" },
    { day: "Saturday", hours: "10:30 am–9:30 pm" },
    { day: "Sunday", hours: "10:30 am–9:30 pm" },
  ];

  const products = [
    "Oudh & Bakhoor Perfumes",
    "Silk Sarees & Kashmiri Shawls",
    "Jalabiyas & Traditional Wear",
    "Turma & Dress Materials",
    "Kids Wear",
    "Home Decor Items",
    "Jewellery"
  ];

  return (
    <footer id="contact" className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white pt-20 pb-8 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-yellow-500/30 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-yellow-400/20 rounded-full"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 border border-yellow-300/10 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-xl">
                <Star className="w-8 h-8 text-white drop-shadow-md" />
              </div>
              <div>
                <h3 className="font-playfair text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                  Al Wajhi Oudh
                </h3>
                <p className="text-xs text-yellow-300/80 tracking-[0.2em] font-medium mt-1">
                  PREMIUM PERFUMERY
                </p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed mb-8 text-sm">
              Step into a world of timeless elegance and pure indulgence with our handcrafted attars — natural perfumes derived from the heart of flowers, herbs, woods, and resins.
            </p>
          </div>

          {/* Why Choose Us */}
          <div>
            <h4 className="font-playfair text-xl font-semibold mb-8 text-yellow-300">Why Choose Us?</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">   
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mt-2 group-hover:scale-125 transition-transform duration-300"></div>             
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm leading-relaxed">100% Natural Ingredients</span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mt-2 group-hover:scale-125 transition-transform duration-300"></div>    
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm leading-relaxed">Inspired by Traditional Arabic & Indian Scents</span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mt-2 group-hover:scale-125 transition-transform duration-300"></div>    
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm leading-relaxed">No Alcohol or Synthetic Additives</span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mt-2 group-hover:scale-125 transition-transform duration-300"></div>    
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm leading-relaxed">Elegant Packaging for Gifting</span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mt-2 group-hover:scale-125 transition-transform duration-300"></div>    
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm leading-relaxed">Unisex, Spiritual, and Everyday Wear</span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="font-playfair text-xl font-semibold mb-8 text-yellow-300 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Business Hours
            </h4>
            <div className="space-y-3 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              {businessHours.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm hover:bg-white/5 px-3 py-2 rounded-lg transition-colors duration-300">
                  <span className="text-gray-300 font-medium">{item.day}</span>
                  <span className="text-yellow-200 font-medium">{item.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-playfair text-xl font-semibold mb-8 text-yellow-300">Contact Us</h4>
            <div className="space-y-6">
              <div className="group flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-yellow-400/30 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-yellow-500/25 transition-shadow duration-300">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm leading-relaxed">Tasker Town, Shivaji Nagar, Bengaluru, Karnataka 560001</p>
                </div>
              </div>
              <div className="group flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-yellow-400/30 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-yellow-500/25 transition-shadow duration-300">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm font-medium">9035511918</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pt-4">
                <a href="tel:9035511918" className="group">
                  <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-yellow-500/25 transition-all duration-300 text-sm transform group-hover:scale-[1.02] group-active:scale-[0.98]">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Call Now
                  </button>
                </a>
                <a href="https://share.google/yYMFsJLFrEhHe8Y9u" target="_blank" rel="noopener noreferrer" className="group">
                  <button className="w-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 hover:border-yellow-400/50 hover:from-yellow-500/10 hover:to-yellow-600/10 px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-sm transform group-hover:scale-[1.02] group-active:scale-[0.98] text-gray-300 hover:text-white">
                    <Map className="w-4 h-4 inline mr-2" />
                    View on Map
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gradient-to-r from-transparent via-white/20 to-transparent pt-12 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <p className="text-gray-400 text-sm">
                © 2024 Al Wajhi Oudh. Crafted with love in Bangalore.
              </p>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-300 hover:underline decoration-yellow-400 underline-offset-4">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-300 hover:underline decoration-yellow-400 underline-offset-4">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors duration-300 hover:underline decoration-yellow-400 underline-offset-4">Shipping Info</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;