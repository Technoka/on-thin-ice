import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Menu, X, ChevronLeft } from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [animatingCard, setAnimatingCard] = useState(null);
  const [cracks, setCracks] = useState([]);

  const products = [
    {
      id: 1,
      name: 'Obsidian Overcoat',
      price: '€895',
      category: 'Outerwear',
      image: '/product_images/obsidian_overcoat.jpeg',
      description: 'Minimalist wool-blend overcoat with asymmetric closure. Premium Italian fabric.'
    },
    {
      id: 2,
      name: 'Steal Your Wife Jacket',
      price: '€365',
      category: 'Tops',
      image: '/product_images/steal_your_wife_jacket.jpeg',
      description: 'If you see a guy wearing this piece, run away. Thank me later.'
    },
    {
      id: 3,
      name: 'Frost Turtleneck',
      price: '€285',
      category: 'Tops',
      image: '/product_images/frost_turtleneck.jpeg',
      description: 'Ultra-fine merino turtleneck with extended collar detail. Seamless construction.'
    },
    {
      id: 4,
      name: 'Edge Trousers',
      price: '€445',
      category: 'Bottoms',
      image: '/product_images/edge_trousers.jpeg',
      description: 'Tailored wide-leg trousers with hidden zipper. Japanese technical fabric.'
    },
    {
      id: 5,
      name: 'Void Blazer',
      price: '€795',
      category: 'Outerwear',
      image: '/product_images/void_blazer.jpeg',
      description: 'Deconstructed blazer with raw-edge lapels. Single-button fastening.'
    }
  ];

  const generateLocalizedCracks = (cardRect) => {
    const newCracks = [];
    const centerX = cardRect.left + cardRect.width / 2 + (Math.random() - 0.5) * 30;
    const centerY = cardRect.top + cardRect.height / 2 + (Math.random() - 0.5) * 30;
    
    // Main radial cracks with more randomness
    const numMainCracks = Math.floor(Math.random() * 5) + 10; // 10-14 cracks
    for (let i = 0; i < numMainCracks; i++) {
      const angle = (Math.PI * 2 * i) / numMainCracks + (Math.random() - 0.5) * 0.6;
      const length = Math.random() * 180 + 80;
      const endX = centerX + Math.cos(angle) * length;
      const endY = centerY + Math.sin(angle) * length;
      
      newCracks.push({
        id: `crack-${i}`,
        x1: centerX,
        y1: centerY,
        x2: endX,
        y2: endY,
        delay: i * 0.012,
        thickness: Math.random() * 2.5 + 0.8
      });
    }
    
    // Secondary branching cracks with more variation
    const numBranches = Math.floor(Math.random() * 4) + 6; // 6-9 branches
    for (let i = 0; i < numBranches; i++) {
      const angle = (Math.PI * 2 * Math.random());
      const startDist = Math.random() * 70 + 30;
      const startX = centerX + Math.cos(angle) * startDist;
      const startY = centerY + Math.sin(angle) * startDist;
      const branchAngle = angle + (Math.random() - 0.5) * 1.2;
      const branchLength = Math.random() * 90 + 30;
      const endX = startX + Math.cos(branchAngle) * branchLength;
      const endY = startY + Math.sin(branchAngle) * branchLength;
      
      newCracks.push({
        id: `branch-${i}`,
        x1: startX,
        y1: startY,
        x2: endX,
        y2: endY,
        delay: 0.08 + i * 0.015,
        thickness: Math.random() * 1.8 + 0.5
      });
    }
    
    setCracks(newCracks);
  };

  const handleProductClick = (product, event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    
    setAnimatingCard(product.id);
    setIsAnimating(true);
    generateLocalizedCracks(rect);
    
    setTimeout(() => {
      setSelectedProduct(product);
      setCurrentPage('product');
      setIsAnimating(false);
      setAnimatingCard(null);
      setCracks([]);
    }, 600);
  };

  const BrandSymbol = ({ size = 'text-2xl', bold = false, allOrange = false }) => (
    <div className={`flex items-center gap-3 ${size} ${bold ? 'font-bold' : 'font-light'} tracking-wider`}>
      <span className="text-orange-500">↑</span>
      <span className={allOrange ? "text-orange-500" : "text-gray-300"}>—</span>
      <span className={allOrange ? "text-orange-500" : "text-gray-200"}>✱</span>
    </div>
  );

  const IceBreakAnimation = () => (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <svg className="w-full h-full">
        <defs>
          <filter id="ice-glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {cracks.map((crack) => (
          <g key={crack.id}>
            <line
              x1={crack.x1}
              y1={crack.y1}
              x2={crack.x2}
              y2={crack.y2}
              stroke="#ff6b35"
              strokeWidth={crack.thickness}
              strokeLinecap="round"
              filter="url(#ice-glow)"
              className="animate-crack"
              style={{
                animationDelay: `${crack.delay}s`,
                strokeDasharray: '500',
                strokeDashoffset: '500',
                opacity: 0.9
              }}
            />
            <line
              x1={crack.x1}
              y1={crack.y1}
              x2={crack.x2}
              y2={crack.y2}
              stroke="#ffffff"
              strokeWidth={crack.thickness * 0.4}
              strokeLinecap="round"
              className="animate-crack"
              style={{
                animationDelay: `${crack.delay}s`,
                strokeDasharray: '500',
                strokeDashoffset: '500',
                opacity: 0.6
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  );

  const HomePage = () => (
    <div className="min-h-screen bg-zinc-900 text-gray-100">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center border-b border-zinc-800 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 w-full"
          style={{
            backgroundImage: 'url(/snow_jump.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-zinc-900/70 to-zinc-900" />
        <div className="relative z-10 text-center px-6">
          <BrandSymbol size="text-4xl" bold={true} />
          <h1 className="text-7xl md:text-9xl font-bold tracking-tight mt-8 mb-6">
            ON THIN ICE
          </h1>
          <p className="text-xl text-gray-300 font-semibold tracking-wide">
            Where elegance meets the edge
          </p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="mt-16 px-10 py-5 bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black transition-all duration-300 tracking-wider text-base font-bold"
          >
            EXPLORE COLLECTION
          </button>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-600 text-sm animate-pulse font-semibold">
          SCROLL
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="max-w-4xl mx-auto px-6 py-32">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-wide mb-6">THE PHILOSOPHY</h2>
          <div className="w-24 h-px bg-orange-500 mx-auto mb-8" />
          <p className="text-gray-300 text-xl leading-relaxed font-medium">
            Walking on thin ice requires balance, precision, and courage. Our designs embody this tension—
            elegant minimalism pushed to its limits, where every line and seam exists at the intersection 
            of restraint and boldness.
          </p>
        </div>
      </div>
    </div>
  );

  const ShopPage = () => (
    <div className="min-h-screen bg-zinc-900 text-gray-100 pt-32 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-5xl font-bold tracking-wide mb-16 flex items-center gap-6">
          COLLECTION <BrandSymbol size="text-3xl" bold={true} />
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={(e) => handleProductClick(product, e)}
              className={`group cursor-pointer relative ${animatingCard === product.id ? 'z-50' : ''}`}
            >
              <div className={`relative overflow-hidden bg-zinc-800 border-2 border-zinc-700 hover:border-orange-500 transition-all duration-300 ${
                animatingCard === product.id ? 'animate-shatter-card' : ''
              }`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500"%3E%3Crect fill="%23222" width="400" height="500"/%3E%3Ctext x="200" y="250" font-size="20" fill="%23666" text-anchor="middle"%3EImage Not Found%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <div className="mt-4">
                <p className="text-xs text-orange-500 tracking-widest mb-1 font-bold">{product.category}</p>
                <h3 className="text-lg font-bold tracking-wide mb-2">{product.name}</h3>
                <p className="text-gray-300 font-semibold">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProductPage = () => (
    <div className="min-h-screen bg-zinc-900 text-gray-100 pt-32 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <button
          onClick={() => {
            setCurrentPage('shop');
            setSelectedProduct(null);
          }}
          className="flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-colors mb-8 font-bold"
        >
          <ChevronLeft size={24} />
          <span className="tracking-wider text-base">BACK TO COLLECTION</span>
        </button>

        {selectedProduct && (
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-zinc-800 border-2 border-zinc-700">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full aspect-[3/4] object-cover"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="500"%3E%3Crect fill="%23222" width="400" height="500"/%3E%3Ctext x="200" y="250" font-size="20" fill="%23666" text-anchor="middle"%3EImage Not Found%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-sm text-orange-500 tracking-widest mb-2 font-bold">
                {selectedProduct.category}
              </p>
              <h1 className="text-5xl font-bold tracking-wide mb-4">
                {selectedProduct.name}
              </h1>
              <p className="text-3xl text-gray-200 mb-8 font-bold">{selectedProduct.price}</p>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-8 font-medium">
                {selectedProduct.description}
              </p>

              <div className="mb-8">
                <p className="text-sm text-gray-400 mb-3 tracking-wide font-bold">SIZE</p>
                <div className="flex gap-2">
                  {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      className="w-14 h-14 border-2 border-zinc-700 hover:border-orange-500 hover:text-orange-500 transition-all duration-200 font-bold"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button className="w-full py-5 bg-orange-500 text-black hover:bg-orange-600 transition-colors tracking-wider text-base font-bold">
                ADD TO CART
              </button>

              <div className="mt-12 pt-8 border-t border-zinc-800">
                <details className="mb-4">
                  <summary className="cursor-pointer text-base tracking-wide hover:text-orange-500 transition-colors font-bold">
                    DETAILS
                  </summary>
                  <p className="mt-3 text-gray-400 font-medium">
                    Premium construction with attention to every detail. Designed in Switzerland, 
                    crafted in Europe's finest ateliers.
                  </p>
                </details>
                <details>
                  <summary className="cursor-pointer text-base tracking-wide hover:text-orange-500 transition-colors font-bold">
                    CARE INSTRUCTIONS
                  </summary>
                  <p className="mt-3 text-gray-400 font-medium">
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
        @keyframes shatter-card {
          0% { 
            transform: scale(1);
            opacity: 1;
          }
          60% { 
            transform: scale(1.02);
            opacity: 0.7;
          }
          100% { 
            transform: scale(0.93);
            opacity: 0;
          }
        }
        .animate-crack {
          animation: crack 0.25s ease-out forwards;
        }
        .animate-shatter-card {
          animation: shatter-card 0.6s ease-out forwards;
        }
      `}</style>

      {/* Top Banner - Always Visible */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b-2 border-orange-500 py-3">
        <div className="flex items-center justify-center">
          <BrandSymbol size="text-3xl" bold={true} allOrange={true} />
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-16 left-0 right-0 z-40 bg-zinc-900/95 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => {
              setCurrentPage('home');
              setSelectedProduct(null);
            }}
            className="text-2xl font-bold tracking-wider text-orange-500 hover:text-orange-400 transition-colors"
          >
            ON THIN ICE
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => setCurrentPage('shop')}
              className="text-sm tracking-wider text-orange-500 hover:text-orange-400 transition-colors font-bold"
            >
              SHOP
            </button>
            <button className="text-sm tracking-wider text-orange-500 hover:text-orange-400 transition-colors font-bold">
              ABOUT
            </button>
            <button className="text-sm tracking-wider text-orange-500 hover:text-orange-400 transition-colors font-bold">
              CONTACT
            </button>
            <button className="p-2 text-orange-500 hover:text-orange-400 transition-colors">
              <ShoppingBag size={22} strokeWidth={2.5} />
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-orange-500 hover:text-orange-400 transition-colors"
          >
            {menuOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-zinc-900 border-t border-zinc-800 px-6 py-4">
            <button
              onClick={() => {
                setCurrentPage('shop');
                setMenuOpen(false);
              }}
              className="block w-full text-left py-3 text-sm tracking-wider text-orange-500 hover:text-orange-400 transition-colors font-bold"
            >
              SHOP
            </button>
            <button className="block w-full text-left py-3 text-sm tracking-wider text-orange-500 hover:text-orange-400 transition-colors font-bold">
              ABOUT
            </button>
            <button className="block w-full text-left py-3 text-sm tracking-wider text-orange-500 hover:text-orange-400 transition-colors font-bold">
              CONTACT
            </button>
          </div>
        )}
      </nav>

      {/* Ice Break Animation */}
      {isAnimating && <IceBreakAnimation />}

      {/* Page Content */}
      <div className="pt-16">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'product' && <ProductPage />}
      </div>

      {/* Footer */}
      <footer className="bg-black border-t-2 border-zinc-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <BrandSymbol size="text-2xl" bold={true} />
            <p className="text-gray-500 text-sm tracking-wide font-semibold">
              © 2024 ON THIN ICE. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;