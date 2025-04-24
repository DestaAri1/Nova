import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  ArrowRight,
  Menu,
  X,
  Package,
  Truck,
  Shield,
  Tag,
  Star,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

// Define interfaces for type safety
interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

interface TestimonialProps {
  name: string;
  role: string;
  testimonial: string;
  image: string;
}

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [animateHero, setAnimateHero] = useState<boolean>(false);
  const [animateFeatures, setAnimateFeatures] = useState<boolean>(false);

  // Handle scroll effects
  useEffect(() => {
    setAnimateHero(true);

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      if (window.scrollY > 300) {
        setAnimateFeatures(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Define features - UPDATED for product/goods related features
  const features: FeatureProps[] = [
    {
      title: "Premium Quality Materials",
      description:
        "Our products are crafted using only the highest quality materials sourced from trusted suppliers worldwide.",
      icon: <Star className="w-10 h-10 text-blue-400" />,
      delay: 0,
    },
    {
      title: "30-Day Money Back Guarantee",
      description:
        "Not satisfied with your purchase? Return it within 30 days for a full refund, no questions asked.",
      icon: <Shield className="w-10 h-10 text-blue-400" />,
      delay: 200,
    },
    {
      title: "Free Express Shipping",
      description:
        "Get your products delivered to your doorstep fast with our complimentary express shipping on all orders.",
      icon: <Truck className="w-10 h-10 text-blue-400" />,
      delay: 400,
    },
    {
      title: "Customizable Options",
      description:
        "Personalize your products with our wide range of customization options to match your unique style.",
      icon: <Package className="w-10 h-10 text-blue-400" />,
      delay: 200,
    },
    {
      title: "Exclusive Discounts",
      description:
        "Enjoy special member pricing and seasonal discounts on our entire product line throughout the year.",
      icon: <Tag className="w-10 h-10 text-blue-400" />,
      delay: 400,
    },
    {
      title: "Lifetime Warranty",
      description:
        "Our products are built to last, backed by our comprehensive lifetime warranty against manufacturing defects.",
      icon: <Clock className="w-10 h-10 text-blue-400" />,
      delay: 600,
    },
  ];

  // Define testimonials
  const testimonials: TestimonialProps[] = [
    {
      name: "Sarah Johnson",
      role: "Verified Customer",
      testimonial:
        "The quality of these products exceeded my expectations. The attention to detail is impressive, and customer service was outstanding!",
      image: "/api/placeholder/64/64",
    },
    {
      name: "David Chen",
      role: "Frequent Shopper",
      testimonial:
        "I've been using these products for over a year now, and they're still as good as new. The durability and craftsmanship are unmatched.",
      image: "/api/placeholder/64/64",
    },
    {
      name: "Emma Wilson",
      role: "New Customer",
      testimonial:
        "Fast shipping, beautiful packaging, and the product is even better in person than in photos. Will definitely be ordering again!",
      image: "/api/placeholder/64/64",
    },
  ];

  return (
    <div className="font-sans min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Navbar */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-gray-900 py-3 shadow-lg" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Nova
            </span>
          </div>

          <div className="hidden md:flex space-x-8">
            <Link
              to="#features"
              className="hover:text-blue-400 transition-colors"
            >
              Features
            </Link>
            <Link
              to="#testimonials"
              className="hover:text-blue-400 transition-colors"
            >
              Testimonials
            </Link>
          </div>

          <div className="hidden md:block">
            <Link to={"/login"} className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 rounded-full font-medium hover:opacity-90 transition-opacity flex items-center">
              Login <ChevronRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 p-4 animate-fadeIn">
            <div className="flex flex-col space-y-4">
              <Link
                to="#features"
                className="hover:text-blue-400 transition-colors py-2"
                onClick={toggleMenu}
              >
                Features
              </Link>
              <Link
                to="#testimonials"
                className="hover:text-blue-400 transition-colors py-2"
                onClick={toggleMenu}
              >
                Testimonials
              </Link>
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 rounded-full font-medium hover:opacity-90 transition-opacity flex items-center justify-center">
                Shop Now <ChevronRight className="ml-1 w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div
              className={`w-full lg:w-1/2 ${
                animateHero ? "animate-slideInLeft" : "opacity-0"
              } transition-all duration-1000`}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Discover our{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  premium products
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-lg">
                Elevate your lifestyle with our meticulously crafted collection
                of high-quality goods designed for durability and elegance.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity flex items-center justify-center">
                  Shop Now <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button className="border border-gray-500 px-8 py-3 rounded-full font-medium hover:bg-gray-700 transition-colors">
                  View Catalog
                </button>
              </div>
            </div>
            <div
              className={`w-full lg:w-1/2 mt-12 lg:mt-0 ${
                animateHero ? "animate-slideInRight" : "opacity-0"
              } transition-all duration-1000 flex justify-center`}
            >
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full absolute blur-3xl opacity-20"></div>
                <div className="relative p-6 rounded-2xl border-gray-700 shadow-xl">
                  <div className="overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-800 bg-opacity-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Product Benefits
            </h2>
            <p className="text-xl text-gray-300 max-w-xl mx-auto">
              Discover why our products stand out from the competition with
              these exclusive features and benefits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2 ${
                  animateFeatures
                    ? `animate-fadeInUp opacity-100 translate-y-0`
                    : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: `${feature.delay}ms`,
                  animationDelay: `${feature.delay}ms`,
                }}
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-300 max-w-xl mx-auto">
              Don't just take our word for it. Here's what our satisfied
              customers have to say about our products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300">"{testimonial.testimonial}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to experience our premium products?
          </h2>
          <p className="text-xl mb-8 max-w-xl mx-auto">
            Join thousands of satisfied customers and elevate your lifestyle
            with our exceptional collection.
          </p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors inline-flex items-center">
            Shop Collection Now <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Nova
              </h3>
              <p className="text-gray-400 mb-4">
                Providing premium quality products to enhance your everyday
                life.
              </p>
              <div className="flex space-x-4">
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                  </svg>
                </Link>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184A4.92 4.92 0 0016.5.5a4.923 4.923 0 00-4.922 4.922c0 .384.042.76.126 1.12A13.998 13.998 0 011.64 2.72a4.917 4.917 0 001.523 6.57 4.881 4.881 0 01-2.234-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                  </svg>
                </Link>
                <Link
                  to="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Shop</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Best Sellers
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Special Offers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Returns & Exchanges
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Warranty Information
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Nova Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
