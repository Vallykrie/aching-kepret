"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Heart, Loader2 } from 'lucide-react';

export default function VintageScrapbook() {
  const [isLoading, setIsLoading] = useState(true);
  const [visiblePhotos, setVisiblePhotos] = useState(new Set());
  const [visibleStrips, setVisibleStrips] = useState(new Set());
  const [stripPhotoIndex, setStripPhotoIndex] = useState(0);
  const [isStripAnimating, setIsStripAnimating] = useState(false);
  const stripRef = useRef(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for photos
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-id');
          if (entry.isIntersecting) {
            setVisiblePhotos(prev => new Set([...prev, id]));
          } else {
            setVisiblePhotos(prev => {
              const newSet = new Set(prev);
              newSet.delete(id);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    document.querySelectorAll('[data-photo-frame]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [isLoading]);

  // Intersection Observer for photobooth strips
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-strip-id');
          if (entry.isIntersecting) {
            setVisibleStrips(prev => new Set([...prev, id]));
            
            // Start photo strip animation for the first strip
            if (id === 'strip-1' && !isStripAnimating) {
              setIsStripAnimating(true);
              setStripPhotoIndex(0);
              
              // Animate photos coming out one by one
              let currentIndex = 0;
              const interval = setInterval(() => {
                currentIndex++;
                setStripPhotoIndex(currentIndex);
                if (currentIndex >= 4) {
                  clearInterval(interval);
                  setIsStripAnimating(false);
                }
              }, 600);
            }
          } else {
            setVisibleStrips(prev => {
              const newSet = new Set(prev);
              newSet.delete(id);
              return newSet;
            });
            if (id === 'strip-1') {
              setStripPhotoIndex(0);
              setIsStripAnimating(false);
            }
          }
        });
      },
      { threshold: 0.3, rootMargin: '-50px' }
    );

    document.querySelectorAll('[data-photobooth-strip]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [isLoading, isStripAnimating]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-amber-50 to-orange-100 flex flex-col items-center justify-center z-50">
        <Loader2 className="w-16 h-16 text-amber-700 animate-spin mb-4" />
        <p className="text-2xl text-amber-800 font-handwriting">Loading your memories...</p>
      </div>
    );
  }

  const photos = [
    { id: 1, rotate: -3, caption: "Add your photo here!" },
    { id: 2, rotate: 2, caption: "Another sweet moment" },
    { id: 3, rotate: -4, caption: "Us being cute" },
    { id: 4, rotate: 1, caption: "Forever & always" },
    { id: 5, rotate: -2, caption: "Love this day" },
    { id: 6, rotate: 3, caption: "Best times" },
  ];

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Covered+By+Your+Grace&family=Reenie+Beanie&family=Special+Elite&display=swap');
        
        .font-handwriting { font-family: 'Covered By Your Grace', cursive; }
        .font-signature { font-family: 'Reenie Beanie', cursive; }
        .font-typewriter { font-family: 'Special Elite', cursive; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes slideFromBottom {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .strip-photo-animate {
          // animation: slideFromBottom 0.5s ease-out forwards;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 overflow-x-hidden">
        
        {/* Landing Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative">
          <div className="relative bg-amber-50/95 border-[15px] border-amber-800 p-12 md:p-16 max-w-2xl shadow-2xl">
            <div className="absolute top-2 left-2 text-4xl opacity-60">🌸</div>
            <div className="absolute bottom-2 right-2 text-4xl opacity-60">🌸</div>
            
            <h1 className="font-signature text-5xl md:text-7xl text-amber-900 mb-8 text-center drop-shadow-md">
              A Small Digital Gift
            </h1>
            <p className="font-typewriter text-lg md:text-xl text-amber-800 text-center leading-relaxed">
              for my cute girlfriend ♡<br/>
              Made with love, just for you
            </p>
          </div>
          
          <div className="absolute top-[15%] left-[10%] text-3xl opacity-50 animate-float">🌺</div>
          <div className="absolute top-[25%] right-[15%] text-3xl opacity-50 animate-float" style={{animationDelay: '1s'}}>🌸</div>
          <div className="absolute bottom-[20%] left-[20%] text-3xl opacity-50 animate-float" style={{animationDelay: '2s'}}>🌼</div>
          <div className="absolute bottom-[30%] right-[10%] text-3xl opacity-50 animate-float" style={{animationDelay: '1.5s'}}>🌷</div>
          <div className="absolute top-[60%] left-[5%] text-3xl opacity-50 animate-float" style={{animationDelay: '0.5s'}}>🌹</div>
        </section>

        {/* Photos Gallery Section */}
        <section className="min-h-screen py-20 px-4 flex flex-col items-center justify-center">
          <h2 className="font-signature text-4xl md:text-6xl text-amber-900 mb-12 text-center">
            Our Memories Together ♡
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-6xl w-full px-4">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                data-photo-frame
                data-id={`photo-${photo.id}`}
                className={`bg-white p-4 shadow-xl transition-all duration-700 relative ${
                  visiblePhotos.has(`photo-${photo.id}`)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transform: visiblePhotos.has(`photo-${photo.id}`)
                    ? `rotate(${photo.rotate}deg)`
                    : `translateY(50px) rotate(${photo.rotate}deg)`,
                  transitionDelay: `${index * 150}ms`
                }}
              >
                {/* Tape */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-yellow-100/60 border border-amber-300/30 -rotate-3" />
                
                {/* Photo */}
                <div className="w-full aspect-[4/3] bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-6xl border-2 border-dashed border-amber-600">
                  📷
                </div>
                
                {/* Caption */}
                <p className="mt-3 font-handwriting text-xl text-amber-900 text-center">
                  {photo.caption}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Photobooth Strip Section */}
        <section className="min-h-screen py-20 px-4 flex flex-col items-center justify-center">
          <h2 className="font-signature text-4xl md:text-6xl text-amber-900 mb-20 text-center">
            Photobooth Memories ♡
          </h2>
          
          <div className="flex flex-wrap gap-8 md:gap-12 justify-center items-end max-w-5xl">
            {/* Left Strip - With Animation */}
            <div
              ref={stripRef}
              data-photobooth-strip
              data-strip-id="strip-1"
              className={`bg-white p-6 shadow-2xl w-full max-w-[350px] transition-all duration-1000 overflow-hidden ${
                visibleStrips.has('strip-1')
                  ? 'opacity-100 translate-y-0 -rotate-8'
                  : 'opacity-0 translate-y-24 -rotate-8'
              }`}
            >
              <div className="text-center font-typewriter text-sm text-amber-900 border-b-2 border-black pb-2 mb-4">
                ★ PHOTOBOOTH ★<br/>
                [LOCATION] - [DATE]
              </div>
              
              <div className="flex flex-col gap-4 relative" style={{ minHeight: '600px' }}>
                {[1, 2, 3, 4].map((num, index) => (
                  <div
                    key={num}
                    className={`w-full aspect-[3/2] bg-gradient-to-br from-gray-100 to-gray-200 border-4 border-black flex items-center justify-center text-4xl`}
                  >
                    📸
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Strip - Normal Animation */}
            <div
              data-photobooth-strip
              data-strip-id="strip-2"
              className={`bg-white p-6 shadow-2xl w-full max-w-[350px] transition-all duration-1000 ${
                visibleStrips.has('strip-2')
                  ? 'opacity-100 translate-y-0 rotate-8'
                  : 'opacity-0 translate-y-24 rotate-8'
              }`}
            >
              <div className="text-center font-typewriter text-sm text-amber-900 border-b-2 border-black pb-2 mb-4">
                ★ PHOTOBOOTH ★<br/>
                [LOCATION] - [DATE]
              </div>
              
              <div className="flex flex-col gap-4">
                {[1, 2, 3, 4].map((num) => (
                  <div
                    key={num}
                    className="w-full aspect-[3/2] bg-gradient-to-br from-gray-100 to-gray-200 border-4 border-black flex items-center justify-center text-4xl"
                  >
                    📸
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Letter Section */}
        <section className="min-h-screen py-20 px-4 flex items-center justify-center">
          <div 
            data-photo-frame
            data-id="letter"
            className={`bg-amber-50 p-12 md:p-16 max-w-3xl w-full shadow-xl border border-amber-300 relative transition-all duration-1000 ${
              visiblePhotos.has('letter')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
            style={{
              backgroundImage: `repeating-linear-gradient(transparent, transparent 29px, #e8d5c4 29px, #e8d5c4 30px)`,
              backgroundSize: '100% 30px'
            }}
          >
            <div className="absolute top-0 left-10 w-0.5 h-full bg-pink-300 opacity-30" />
            
            <div 
              className="font-handwriting text-xl md:text-2xl text-amber-950 leading-[2.2] min-h-[400px] outline-none"
              contentEditable
              suppressContentEditableWarning
            >
              Dear [Her Name],
              <br/><br/>
              Write your heartfelt message here...
              <br/><br/>
              Every moment with you is a treasure I hold close to my heart.
            </div>
            
            <div className="text-right mt-10 font-signature text-3xl md:text-4xl text-amber-900">
              With all my love,<br/>
              [Your Name] ♡
            </div>
          </div>
        </section>

      </div>
    </>
  );
}