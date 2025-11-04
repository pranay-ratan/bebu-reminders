import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Memory {
  id: string;
  title: string;
  message: string;
  images: string[];
  date: string;
}

interface MemoryFeatureProps {
  isHorrorMode: boolean;
}

// Sample memories - in a real app, these would come from a database
const sampleMemories: Memory[] = [
  {
    id: "1",
    title: "Our First Date",
    message: "Remember that magical evening when we first met? The way you smiled lit up the entire room. Every moment with you feels like the beginning of forever. I love you more than words can express! 💕✨",
    images: ["/memories/date1.jpg", "/memories/date2.jpg", "/memories/date3.jpg"],
    date: "2024-01-15"
  },
  {
    id: "2",
    title: "Beach Day Adventure",
    message: "That perfect day at the beach, watching the sunset with you in my arms. Your laughter is my favorite melody, and your smile is my sunrise. Forever grateful for every moment we share! 🌅🏖️",
    images: ["/memories/beach1.jpg", "/memories/beach2.jpg"],
    date: "2024-02-20"
  },
  {
    id: "3",
    title: "Our Special Moments",
    message: "From quiet evenings to adventures together, every second with you is a treasure. Your love makes every day brighter, every night warmer, and every dream sweeter. You're my everything! 💫❤️",
    images: ["/memories/special1.jpg", "/memories/special2.jpg", "/memories/special3.jpg"],
    date: "2024-03-10"
  }
];

export function MemoryFeature({ isHorrorMode }: MemoryFeatureProps) {
  const [currentMemoryIndex, setCurrentMemoryIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMemories, setShowMemories] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  const currentMemory = sampleMemories[currentMemoryIndex];

  // Auto-play slideshow
  useEffect(() => {
    if (!showMemories || !autoPlay) return;

    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === currentMemory.images.length - 1 ? 0 : prev + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(imageInterval);
  }, [showMemories, autoPlay, currentMemory.images.length, currentMemoryIndex]);

  const nextMemory = () => {
    setCurrentMemoryIndex((prev) =>
      prev === sampleMemories.length - 1 ? 0 : prev + 1
    );
    setCurrentImageIndex(0);
  };

  const prevMemory = () => {
    setCurrentMemoryIndex((prev) =>
      prev === 0 ? sampleMemories.length - 1 : prev - 1
    );
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === currentMemory.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? currentMemory.images.length - 1 : prev - 1
    );
  };

  const handleImageError = (imageSrc: string) => {
    toast.error(`Image not found: ${imageSrc}`, {
      description: "Please check that the image exists in the public/memories folder"
    });
  };

  return (
    <div className="space-y-4">
      {/* Memory Button */}
      <div className="text-center">
        <button
          onClick={() => setShowMemories(!showMemories)}
          className={`px-6 py-3 rounded-xl font-bold text-lg shadow-lg transform transition-all duration-300 hover:scale-105 ${
            isHorrorMode
              ? 'bg-gradient-to-r from-purple-600 to-red-600 text-white hover:from-purple-500 hover:to-red-500'
              : 'bg-gradient-to-r from-pink-400 to-purple-400 text-white hover:from-pink-300 hover:to-purple-300'
          }`}
        >
          <span className="mr-2">{isHorrorMode ? '💀' : '💝'}</span>
          {showMemories ? 'Hide Memories' : 'Sweet Memories'}
          <span className="ml-2">{isHorrorMode ? '👻' : '💕'}</span>
        </button>
      </div>

      {/* Memory Display */}
      {showMemories && (
        <div className={`p-6 rounded-2xl shadow-xl transition-all duration-500 ${
          isHorrorMode
            ? 'bg-purple-900/70 border border-red-600/50'
            : 'bg-white/10 border border-pink-300/40'
        } backdrop-blur-xl`}>
          <div className="text-center mb-6">
            <h3 className={`text-2xl font-bold mb-2 ${isHorrorMode ? 'text-red-200' : 'text-pink-600'}`}>
              <span className="mr-2">{isHorrorMode ? '📜' : '💌'}</span>
              {currentMemory.title}
              <span className="ml-2">{isHorrorMode ? '🕸️' : '✨'}</span>
            </h3>
            <p className={`text-sm ${isHorrorMode ? 'text-purple-300' : 'text-purple-600'}`}>
              {new Date(currentMemory.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>

          {/* Image Slideshow */}
          <div className="relative mb-6">
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
              <img
                src={currentMemory.images[currentImageIndex]}
                alt={`${currentMemory.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-500"
                onError={() => handleImageError(currentMemory.images[currentImageIndex])}
              />
            </div>

            {/* Image Navigation */}
            {currentMemory.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-300"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-300"
                >
                  ›
                </button>

                {/* Image Indicators */}
                <div className="flex justify-center gap-2 mt-4">
                  {currentMemory.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? (isHorrorMode ? 'bg-red-400' : 'bg-pink-400')
                          : 'bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Memory Message */}
          <div className={`p-4 rounded-xl mb-6 ${
            isHorrorMode ? 'bg-purple-800/50' : 'bg-pink-50/30 backdrop-blur-sm'
          }`}>
            <p className={`text-center text-lg leading-relaxed ${isHorrorMode ? 'text-purple-200' : 'text-gray-700'}`}>
              {currentMemory.message}
            </p>
          </div>

          {/* Memory Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevMemory}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isHorrorMode
                  ? 'bg-purple-600 hover:bg-purple-500 text-white'
                  : 'bg-pink-500 hover:bg-pink-400 text-white'
              }`}
            >
              ‹ Previous Memory
            </button>

            <div className="flex items-center gap-2">
              <span className={`text-sm ${isHorrorMode ? 'text-purple-300' : 'text-gray-600'}`}>
                {currentMemoryIndex + 1} of {sampleMemories.length}
              </span>
              <button
                onClick={() => setAutoPlay(!autoPlay)}
                className={`px-3 py-1 rounded text-xs font-medium transition-all duration-300 ${
                  autoPlay
                    ? (isHorrorMode ? 'bg-red-600 text-white' : 'bg-pink-500 text-white')
                    : (isHorrorMode ? 'bg-purple-600 text-white' : 'bg-gray-500 text-white')
                }`}
              >
                {autoPlay ? 'Pause' : 'Play'}
              </button>
            </div>

            <button
              onClick={nextMemory}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isHorrorMode
                  ? 'bg-purple-600 hover:bg-purple-500 text-white'
                  : 'bg-pink-500 hover:bg-pink-400 text-white'
              }`}
            >
              Next Memory ›
            </button>
          </div>

          {/* Instructions */}
          <div className={`mt-6 p-4 rounded-lg text-center ${
            isHorrorMode ? 'bg-red-900/30' : 'bg-blue-50/30 backdrop-blur-sm'
          }`}>
            <h4 className={`font-semibold mb-2 ${isHorrorMode ? 'text-red-200' : 'text-blue-700'}`}>
              📁 Image Upload Instructions
            </h4>
            <p className={`text-sm ${isHorrorMode ? 'text-purple-300' : 'text-blue-600'}`}>
              Upload your memory images to: <code className="bg-gray-200 px-2 py-1 rounded text-xs">public/memories/</code>
            </p>
            <p className={`text-xs mt-1 ${isHorrorMode ? 'text-purple-400' : 'text-blue-500'}`}>
              Name them like: date1.jpg, beach1.jpg, special1.jpg, etc.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
