import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Marquee } from './magicui/marquee';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Kausar Afeef",
      location: "Bangalore, India",
      rating: 5,
      text: "I went to this shop for a custom ring, this shop was recommended by a local. I'm very happy with the service and honesty from Mr. M Vajeeh and his assistants at the shop. They have a wide variety of Kurtas, Attar and jewelry at an affordable price. His assistant Roxana was very helpful and honest in picking women's Kurtas and I'll be more than happy to come back to this shop. I'd recommend this shop for Maldivians travelling in Bangalore or just any travellers in general. May god bless this business.",
      avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=80&h=80&fit=crop&crop=face",
      featured: true
    },
    {
      name: "Khalid",
      location: "Unknown",
      rating: 5,
      text: "He has a lot of beautiful shawls and pashmina.",
      avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Ahmed Almurar",
      location: "Unknown",
      rating: 5,
      text: "need your number i love the oud i bout and i need more",
      avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=80&h=80&fit=crop&crop=face",
      featured: true
    },
    {
      name: "Adrian Constantin",
      location: "Unknown",
      rating: 5,
      text: "Very nice shop!",
      avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Granth Smith",
      location: "Unknown",
      rating: 5,
      text: "Good products, friendly service.",
      avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Pavan Ubeeoi",
      location: "Unknown",
      rating: 5,
      text: "Nice",
      avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Djalel Hioel",
      location: "Unknown",
      rating: 5,
      text: "Excellent showpiece, excellent products I really liked.",
      avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=80&h=80&fit=crop&crop=face",
      featured: true
    },
    {
      name: "Prakash Poojari",
      location: "Unknown",
      rating: 5,
      text: "Super amazing",
      avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Roxana",
      location: "Unknown",
      rating: 5,
      text: "Amazing service and quality products!",
      avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Mohammed Shujath",
      location: "Unknown",
      rating: 5,
      text: "Best attar shop in the area!",
      avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "King Maker",
      location: "Unknown",
      rating: 5,
      text: "Exceptional quality and service!",
      avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Santosh Kumar",
      location: "Unknown",
      rating: 5,
      text: "Highly recommended for authentic attars!",
      avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Creative Doodler",
      location: "Unknown",
      rating: 5,
      text: "Wonderful experience shopping here!",
      avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Kedar Charan Dehury",
      location: "Unknown",
      rating: 4,
      text: "Great collection of traditional perfumes!",
      avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Saif Ali",
      location: "Unknown",
      rating: 5,
      text: "Authentic Middle Eastern fragrances!",
      avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=80&h=80&fit=crop&crop=face"
    },
    {
      name: "Ayesha Sadaf",
      location: "Unknown",
      rating: 5,
      text: "Beautiful traditional attars and excellent service!",
      avatar: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=80&h=80&fit=crop&crop=face"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-[#f8efe3] via-[#f6e7d7] to-[#f3e3c3] ornament-pattern-ultra relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold mb-4">
            What Our <span className="text-gradient">Connoisseurs</span> Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover why fragrance enthusiasts worldwide choose Royal Attar for their 
            most precious moments and daily luxury experiences.
          </p>
        </div>

        {/* Marquee Testimonials */}
        <div className="mb-16">
          <Marquee 
            className="py-4 [--duration:60s]"
            pauseOnHover={true}
            repeat={2}
          >
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 shadow-luxury hover:shadow-deep transition-all duration-500 transform hover:-translate-y-2 mx-4 min-w-[320px] max-w-[380px]"
              >
                {/* Quote Icon */}
                <Quote className="w-6 h-6 text-primary mb-3" />

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-primary fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-muted-foreground mb-4 leading-relaxed italic text-sm line-clamp-4">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-3">
                  <img 
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>

                {/* Featured Badge */}
                {testimonial.featured && (
                  <div className="absolute top-3 right-3 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
                    ⭐ Featured
                  </div>
                )}
              </div>
            ))}
          </Marquee>
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-3xl font-bold text-primary mb-2">5000+</div>
            <div className="text-muted-foreground">Happy Customers</div>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-3xl font-bold text-primary mb-2">4.8/5</div>
            <div className="text-muted-foreground">Average Rating</div>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-3xl font-bold text-primary mb-2">8+</div>
            <div className="text-muted-foreground">Countries Served</div>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-3xl font-bold text-primary mb-2">10</div>
            <div className="text-muted-foreground">Years Experience</div>
          </div>
        </div>
      </div>

      <style>{`
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Marquee Animations */
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes marquee-vertical {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-100%);
          }
        }

        .animate-marquee {
          animation: marquee var(--duration, 40s) linear infinite;
        }

        .animate-marquee-vertical {
          animation: marquee-vertical var(--duration, 40s) linear infinite;
        }

        .group:hover .animate-marquee,
        .group:hover .animate-marquee-vertical {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;