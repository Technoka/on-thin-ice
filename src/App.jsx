import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, ChevronLeft } from 'lucide-react';

const OnThinIceWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cracks, setCracks] = useState([]);

  const products = [
    {
      id: 1,
      name: 'Obsidian Overcoat',
      price: '€895',
      category: 'Outerwear',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500"%3E%3Crect fill="%23222" width="400" height="500"/%3E%3Cpath d="M150 100 L250 100 L270 480 L130 480 Z" fill="%23111" stroke="%23333" stroke-width="2"/%3E%3Cline x1="200" y1="100" x2="200" y2="480" stroke="%23444" stroke-width="1"/%3E%3C/svg%3E',
      description: 'Minimalist wool-blend overcoat with asymmetric closure. Premium Italian fabric.'
    },
    {
      id: 2,
      name: 'Frost Turtleneck',
      price: '€285',
      category: 'Tops',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500"%3E%3Crect fill="%23333" width="400" height="500"/%3E%3Cpath d="M120 150 L280 150 L280 450 L120 450 Z" fill="%23282828" stroke="%23444" stroke-width="2"/%3E%3Crect x="160" y="120" width="80" height="40" fill="%23282828" stroke="%23444" stroke-width="2"/%3E%3C/svg%3E',
      description: 'Ultra-fine merino turtleneck with extended collar detail. Seamless construction.'
    },
    {
      id: 3,
      name: 'Edge Trousers',
      price: '€445',
      category: 'Bottoms',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500"%3E%3Crect fill="%23222" width="400" height="500"/%3E%3Cpath d="M140 100 L260 100 L260 300 L270 500 L230 500 L200 300 L170 500 L130 500 L140 300 Z" fill="%23181818" stroke="%23333" stroke-width="2"/%3E%3C/svg%3E',
      description: 'Tailored wide-leg trousers with hidden zipper. Japanese technical fabric.'
    },
    {
      id: 4,
      name: 'Void Blazer',
      price: '€795',
      category: 'Outerwear',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500"%3E%3Crect fill="%23282828" width="400" height="500"/%3E%3Cpath d="M130 120 L200 120 L190 450 L140 450 Z" fill="%231a1a1a" stroke="%23444" stroke-width="2"/%3E%3Cpath d="M200 120 L270 120 L260 450 L210 450 Z" fill="%231a1a1a" stroke="%23444" stroke-width="2"/%3E%3Cline x1="150" y1="200" x2="180" y2="200" stroke="%23555" stroke-width="2"/%3E%3Cline x1="220" y1="200" x2="250" y2="200" stroke="%23555" stroke-width="2"/%3E%3C/svg%3E',
      description: 'Deconstructed blazer with raw-edge lapels. Single-button fastening.'
    },
    {
      id: 5,
      name: 'Glacier Shirt',
      price: '€365',
      category: 'Tops',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500"%3E%3Crect fill="%23e8e8e8" width="400" height="500"/%3E%3Cpath d="M110 140 L290 140 L290 420 L110 420 Z" fill="%23f5f5f5" stroke="%23ccc" stroke-width="2"/%3E%3Cline x1="200" y1="140" x2="200" y2="420" stroke="%23ddd" stroke-width="2"/%3E%3Crect x="180" y="160" width="40" height="8" fill="%23ddd"/%3E%3C/svg%3E',
      description: 'Oversized cotton poplin shirt with dropped shoulders. Minimal detailing.'
    },
    {
      id: 6,
      name: 'Zenith Sneakers',
      price: '€525',
      category: 'Footwear',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500"%3E%3Crect fill="%23222" width="400" height="500"/%3E%3Cellipse cx="200" cy="320" rx="120" ry="40" fill="%23111" stroke="%23333" stroke-width="2"/%3E%3Cpath d="M100 280 L300 280 L300 320 L100 320 Z" fill="%231a1a1a" stroke="%23333" stroke-width="2"/%3E%3Cline x1="120" y1="300" x2="280" y2="300" stroke="%23444" stroke-width="1"/%3E%3C/svg%3E',
      description: 'Low-top leather sneakers with reinforced toe cap. Handcrafted in Portugal.'
    }
  ];

  const generateCracks = () => {
    const newCracks = [];
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8;
      const length = Math.random() * 300 + 200;
      const endX = centerX + Math.cos(angle) * length;
      const endY = centerY + Math.sin(angle) * length;
      
      newCracks.push({
        id: i,
        x1: centerX,
        y1: centerY,
        x2: endX,
        y2: endY,
        delay: i * 0.05
      });
    }
    setCracks(newCracks);
  };

  const handleProductClick = (product) => {
    setIsAnimating(true);
    generateCracks();
    
    setTimeout(() => {
      setSelectedProduct(product);
      setCurrentPage('product');
      setIsAnimating(false);
      setCracks([]);
    }, 1200);
  };

  const BrandSymbol = () => (
    <div className="flex items-center gap-3 text-2xl font-light tracking-wider">
      <span className="text-orange-500">↑</span>
      <span className="text-gray-400">—</span>
      <span className="text-gray-300">*</span>
    </div>
  );

  const IceBreakAnimation = () => (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <svg className="w-full h-full">
        {cracks.map((crack) => (
          <line
            key={crack.id}
            x1={crack.x1}
            y1={crack.y1}
            x2={crack.x2}
            y2={crack.y2}
            stroke="#ff6b35"
            strokeWidth="3"
            className="animate-crack"
            style={{
              animationDelay: `${crack.delay}s`,
              strokeDasharray: '1000',
              strokeDashoffset: '1000'
            }}
          />
        ))}
      </svg>
      <div className="absolute inset-0 bg-black animate-shatter" />
    </div>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-zinc-900 text-gray-100">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center border-b border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/50 to-zinc-900" />
        <div className="relative z-10 text-center px-6">
          <BrandSymbol />
          <h1 className="text-7xl md:text-9xl font-thin tracking-tight mt-8 mb-4">
            ON THIN ICE
          </h1>
          <p className="text-xl text-gray-400 font-light tracking-wide">
            Where elegance meets the edge
          </p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="mt-12 px-8 py-4 bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black transition-all duration-300 tracking-wider text-sm"
          >
            EXPLORE COLLECTION
          </button>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-600 text-sm animate-pulse">
          SCROLL
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="max-w-4xl mx-auto px-6 py-32">
        <div className="text-center">
          <h2 className="text-4xl font-thin tracking-wide mb-6">THE PHILOSOPHY</h2>
          <div className="w-24 h-px bg-orange-500 mx-auto mb-8" />
          <p className="text-gray-400 text-lg leading-relaxed font-light">
            Walking on thin ice requires balance, precision, and courage. Our designs embody this tension—
            elegant minimalism pushed to its limits, where every line and seam exists at the intersection 
            of restraint and boldness.
          </p>
        </div>
      </div>
    </div>
  );

  const ShopPage = () => (
    <div className="min-h-screen bg-zinc-900 text-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-5xl font-thin tracking-wide mb-12 flex items-center gap-4">
          COLLECTION <BrandSymbol />
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden bg-zinc-800 border border-zinc-700 hover:border-orange-500 transition-all duration-300">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <div className="mt-4">
                <p className="text-xs text-orange-500 tracking-widest mb-1">{product.category}</p>
                <h3 className="text-xl font-light tracking-wide mb-2">{product.name}</h3>
                <p className="text-gray-400">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProductPage = () => (
    <div className="min-h-screen bg-zinc-900 text-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <button
          onClick={() => {
            setCurrentPage('shop');
            setSelectedProduct(null);
          }}
          className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors mb-8"
        >
          <ChevronLeft size={20} />
          <span className="tracking-wider text-sm">BACK TO COLLECTION</span>
        </button>

        {selectedProduct && (
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-zinc-800 border border-zinc-700">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full aspect-[4/5] object-cover"
              />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-xs text-orange-500 tracking-widest mb-2">
                {selectedProduct.category}
              </p>
              <h1 className="text-5xl font-thin tracking-wide mb-4">
                {selectedProduct.name}
              </h1>
              <p className="text-3xl text-gray-300 mb-8">{selectedProduct.price}</p>
              
              <p className="text-gray-400 leading-relaxed mb-8 font-light">
                {selectedProduct.description}
              </p>

              <div className="mb-8">
                <p className="text-sm text-gray-500 mb-3 tracking-wide">SIZE</p>
                <div className="flex gap-2">
                  {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      className="w-12 h-12 border border-zinc-700 hover:border-orange-500 hover:text-orange-500 transition-all duration-200"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button className="w-full py-4 bg-orange-500 text-black hover:bg-orange-600 transition-colors tracking-wider text-sm font-medium">
                ADD TO CART
              </button>

              <div className="mt-12 pt-8 border-t border-zinc-800">
                <details className="mb-4">
                  <summary className="cursor-pointer text-sm tracking-wide hover:text-orange-500 transition-colors">
                    DETAILS
                  </summary>
                  <p className="mt-3 text-gray-400 text-sm font-light">
                    Premium construction with attention to every detail. Designed in Switzerland, 
                    crafted in Europe's finest ateliers.
                  </p>
                </details>
                <details>
                  <summary className="cursor-pointer text-sm tracking-wide hover:text-orange-500 transition-colors">
                    CARE INSTRUCTIONS
                  </summary>
                  <p className="mt-3 text-gray-400 text-sm font-light">
                    Dry clean only. Store on padded hangers. Handle with the care this piece deserves.
                  </p>
                </details>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative">
      <style>{`
        @keyframes crack {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes shatter {
          0% { opacity: 0; transform: scale(1); }
          50% { opacity: 0.3; }
          100% { opacity: 0; transform: scale(1.5); }
        }
        .animate-crack {
          animation: crack 0.6s ease-out forwards;
        }
        .animate-shatter {
          animation: shatter 1.2s ease-out forwards;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => {
              setCurrentPage('home');
              setSelectedProduct(null);
            }}
            className="text-2xl font-thin tracking-wider hover:text-orange-500 transition-colors"
          >
            ON THIN ICE
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => setCurrentPage('shop')}
              className="text-sm tracking-wider hover:text-orange-500 transition-colors"
            >
              SHOP
            </button>
            <button className="text-sm tracking-wider hover:text-orange-500 transition-colors">
              ABOUT
            </button>
            <button className="text-sm tracking-wider hover:text-orange-500 transition-colors">
              CONTACT
            </button>
            <button className="p-2 hover:text-orange-500 transition-colors">
              <ShoppingBag size={20} />
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 hover:text-orange-500 transition-colors"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-zinc-900 border-t border-zinc-800 px-6 py-4">
            <button
              onClick={() => {
                setCurrentPage('shop');
                setMenuOpen(false);
              }}
              className="block w-full text-left py-3 text-sm tracking-wider hover:text-orange-500 transition-colors"
            >
              SHOP
            </button>
            <button className="block w-full text-left py-3 text-sm tracking-wider hover:text-orange-500 transition-colors">
              ABOUT
            </button>
            <button className="block w-full text-left py-3 text-sm tracking-wider hover:text-orange-500 transition-colors">
              CONTACT
            </button>
          </div>
        )}
      </nav>

      {/* Ice Break Animation */}
      {isAnimating && <IceBreakAnimation />}

      {/* Page Content */}
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'shop' && <ShopPage />}
      {currentPage === 'product' && <ProductPage />}

      {/* Footer */}
      <footer className="bg-black border-t border-zinc-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <BrandSymbol />
            </div>
            <p className="text-gray-600 text-sm tracking-wide">
              © 2024 ON THIN ICE. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OnThinIceWebsite;