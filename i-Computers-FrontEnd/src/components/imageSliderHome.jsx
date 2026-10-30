import React from 'react';

export default function ImageSliderHome() {
  return (
    <div id="heroCarousel" className="carousel slide carousel-fade relative" data-bs-ride="carousel">
      {/* Indicators */}
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active"></button>
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
      </div>

      <div className="carousel-inner h-[70vh] md:h-[85vh]">
        {/* Slide 1 - Using your /home.jpg */}
        <div className="carousel-item active h-full" data-bs-interval="5000">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: "url('/home.jpg')" }}
          >
            {/* Dark Overlay to make slogans pop */}
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight animate-bounce-slow">
                i-<span className="text-blue-500">Computers</span>
              </h1>
              <p className="text-gray-300 text-xl md:text-2xl mt-4 max-w-2xl font-light">
                Building the machines that power your dreams.
              </p>
              <button className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all transform hover:scale-105">
                Explore Products
              </button>
            </div>
          </div>
        </div>

        {/* Slide 2 - Custom Slogan */}
        <div className="carousel-item h-full" data-bs-interval="5000">
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: "url('/home.jpg')", filter: 'sepia(0.3) brightness(0.5)' }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-white text-4xl md:text-6xl font-extrabold mb-4 italic">
                UNMATCHED PERFORMANCE
              </h2>
              <div className="w-24 h-1 bg-blue-500 mb-4"></div>
              <p className="text-blue-400 text-lg font-mono uppercase tracking-[0.2em]">
                Gaming • Professional • Workstation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon bg-black/30 rounded-full p-4"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon bg-black/30 rounded-full p-4"></span>
      </button>
    </div>
  );
}