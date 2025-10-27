import React, { useState } from 'react';

interface ImageCarouselProps {
  images: string[];
  productName: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, productName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full overflow-hidden">
      {/* Main Carousel */}
      <div className="relative w-full bg-gray-50 rounded-2xl overflow-hidden">
        {/* Images Container */}
        <div className="relative h-3/4 overflow-hidden">
          {/* Previous Image Peek */}
          <div className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none bg-gradient-to-r from-gray-50 to-transparent z-10 overflow-hidden" />
          
          {/* Next Image Peek */}
          <div className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none bg-gradient-to-l from-gray-50 to-transparent z-10 overflow-hidden" />

          {/* Carousel Track */}
          <div
            className="flex h-full transition-transform duration-300 ease-out "
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="w-full h-full flex-shrink-0 flex items-center justify-center"
              >
                <img
                  src={image}
                  alt={`${productName} - Imagen ${index + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-900 rounded-full p-3 transition-all shadow-lg hover:shadow-xl"
          aria-label="Imagen anterior"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/90 hover:bg-white text-gray-900 rounded-full p-3 transition-all shadow-lg hover:shadow-xl"
          aria-label="Siguiente imagen"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 mt-4 justify-center flex-shrink-0 overflow-x-auto overflow-hidden">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`rounded-lg overflow-hidden transition-all border-2 ${
              currentIndex === index
                ? 'border-primary-600 ring-2 ring-primary-600 ring-offset-2'
                : 'border-gray-200 opacity-60 hover:opacity-100'
            }`}
            aria-label={`Ir a imagen ${index + 1}`}
          >
            <img
              src={image}
              alt={`Miniatura ${index + 1}`}
              className="w-20 h-20 object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`h-2 rounded-full transition-all ${
              currentIndex === index
                ? 'bg-primary-600 w-8'
                : 'bg-gray-300 w-2 hover:bg-gray-400'
            }`}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
