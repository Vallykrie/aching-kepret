"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Heart, Loader2 } from 'lucide-react';

export default function VintageScrapbook() {
  const [isLoading, setIsLoading] = useState(true);
  const [visiblePhotos, setVisiblePhotos] = useState(new Set());
  const [visibleStrips, setVisibleStrips] = useState(new Set());
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
          } else {
            setVisibleStrips(prev => {
              const newSet = new Set(prev);
              newSet.delete(id);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.3, rootMargin: '-50px' }
    );

    document.querySelectorAll('[data-photobooth-strip]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-amber-50 to-orange-100 flex flex-col items-center justify-center z-50">
        <Loader2 className="w-16 h-16 text-amber-700 animate-spin mb-4" />
        <p className="text-2xl text-amber-800 font-handwriting">Loading our memories 💖...</p>
      </div>
    );
  }

  const photos = [
    { id: 1, rotate: -3, caption: "kita pertama kali meet up!", imgSrc: "gallery/photo1.png" },
    { id: 2, rotate: 2, caption: "nemenin kamu ke pasar 😋", imgSrc: "gallery/photo2.jpg" },
    { id: 3, rotate: -4, caption: "pertama kali ketempat mu", imgSrc: "gallery/photo3.jpg" },
    { id: 4, rotate: 1, caption: "OFFICIAL! kita pacaran!! 💗💓💕", imgSrc: "gallery/photo4.jpg" },
    { id: 5, rotate: -2, caption: "menaklukan gunung batur berdua 😝😎", imgSrc: "gallery/photo5.JPEG" },
    { id: 6, rotate: 3, caption: "Park Shanghai", imgSrc: "gallery/photo6.jpg" },
    { id: 7, rotate: -3, caption: "mirror photo 📸", imgSrc: "gallery/photo7.jpg" },
    { id: 8, rotate: 2, caption: "ke cat cafe tapi kamunya lebih lucu", imgSrc: "gallery/photo8.jpg" },
    { id: 9, rotate: -4, caption: "mirror photo lagi 🤳", imgSrc: "gallery/photo9.jpg" },
    { id: 10, rotate: 1, caption: "seru banget banyak anjing! 🐶", imgSrc: "gallery/photo10.jpg" },
    { id: 11, rotate: -2, caption: "my cutie patootie 🥰", imgSrc: "gallery/photo11.jpg" },
  ];

  const photoboothPhotos = {
    strip1: [
      "photobox/b1.jpg",
      "photobox/b2.jpg",
      "photobox/b2.jpg",
      "photobox/b2.jpg"
    ],
    strip2: [
      "photobox/a1.JPG",
      "photobox/a2.JPG",
      "photobox/a2.JPG",
      "photobox/a2.JPG"
    ]
  };

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
              for aching kepret<br/>
              Made with love, <br/>just for you
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
                <div className="w-full aspect-[4/3] bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center border-2 border-dashed border-amber-600 overflow-hidden">
                  <img 
                    src={photo.imgSrc} 
                    alt={photo.caption}
                    className="w-full h-full object-cover"
                  />
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
            {/* Left Strip - Normal Animation */}
            <div
              ref={stripRef}
              data-photobooth-strip
              data-strip-id="strip-1"
              className={`bg-white p-6 shadow-2xl w-full max-w-[350px] transition-all duration-1000 ${
                visibleStrips.has('strip-1')
                  ? 'opacity-100 translate-y-0 -rotate-8'
                  : 'opacity-0 translate-y-24 -rotate-8'
              }`}
            >
              <div className="text-center font-typewriter text-sm text-amber-900 border-b-2 border-black pb-2 mb-4">
                ★ PHOTOBOOTH ★<br/>
                [DENPASAR] - [17 AUGUST 2025]
              </div>
              
              <div className="flex flex-col gap-4">
                {photoboothPhotos.strip1.map((imgSrc, index) => (
                  <div
                    key={index}
                    className="w-full aspect-[3/2] bg-gradient-to-br from-gray-100 to-gray-200 border-4 border-black overflow-hidden"
                  >
                    <img 
                      src={imgSrc} 
                      alt={`Photobooth strip 1 photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
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
                [KAYUTANGAN] - [6 NOVEMBER 2025]
              </div>
              
              <div className="flex flex-col gap-4">
                {photoboothPhotos.strip2.map((imgSrc, index) => (
                  <div
                    key={index}
                    className="w-full aspect-[3/2] bg-gradient-to-br from-gray-100 to-gray-200 border-4 border-black overflow-hidden"
                  >
                    <img 
                      src={imgSrc} 
                      alt={`Photobooth strip 2 photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
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
  Dear Aching Kepret,
  <br/><br/>
  Happy Birthday, my love!
  <br/><br/>
  I hope your day is as beautiful and as bright as you are. May all your wishes come true and may this coming year bring you everything you've been working so hard for. You deserve all the happiness in the world.
  <br/><br/>
  I'm so grateful for you... and I truly hope I get to call you my wife someday (hehe).
  <br/><br/>
  Every moment with you is a treasure I hold close to my heart.
</div>

<div className="text-right mt-10 font-signature text-3xl md:text-4xl text-amber-900">
  With all my love,<br/>
  Nathan ♡
</div>
          </div>
        </section>

      </div>
    </>
  );
}