// page.tsx
"use client";

import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VintageScrapbook() {
  const [isLoading, setIsLoading] = useState(true);
  const mainRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryContainerRef = useRef<HTMLDivElement>(null);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // GSAP Animations
  useLayoutEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      // Landing Page Animations
      const tl = gsap.timeline();
      tl.from(".landing-title", {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.5
      })
      .from(".landing-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=1")
      .from(".landing-flower", {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "elastic.out(1, 0.5)"
      }, "-=1");

      // Horizontal Scroll Gallery
      const sections = gsap.utils.toArray(".gallery-item");
      if (galleryRef.current && galleryContainerRef.current) {
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: galleryRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => "+=" + galleryContainerRef.current!.offsetWidth
          }
        });
      }

      // Photobooth Strip Animation
      gsap.utils.toArray(".photobooth-strip").forEach((strip: any, i) => {
        gsap.from(strip, {
          scrollTrigger: {
            trigger: strip,
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          y: 100,
          opacity: 0,
          rotation: i % 2 === 0 ? -10 : 10,
          duration: 1.2,
          ease: "power2.out"
        });
      });

      // Letter Animation
      gsap.from(".letter-container", {
        scrollTrigger: {
          trigger: ".letter-container",
          start: "top 75%",
          toggleActions: "play none none reverse"
        },
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 1.5,
        ease: "power2.out"
      });

      // Game Section Animation
      gsap.from(".game-content", {
        scrollTrigger: {
          trigger: ".game-section",
          start: "top 70%",
          toggleActions: "play none none reverse"
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)"
      });

    }, mainRef);

    return () => ctx.revert();
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#fdf6e3] flex flex-col items-center justify-center z-50">
        <Loader2 className="w-16 h-16 text-[#8b5e3c] animate-spin mb-4" />
        <p className="text-2xl text-[#6d4c41] font-handwriting">Loading our memories 💖...</p>
      </div>
    );
  }

  const photos = [
    { id: 1, rotate: -3, caption: "kita pertama kali meet up!", imgSrc: "/gallery/photo1.png" },
    { id: 2, rotate: 2, caption: "nemenin kamu ke pasar 😋", imgSrc: "/gallery/photo2.jpg" },
    { id: 3, rotate: -4, caption: "pertama kali ketempat mu", imgSrc: "/gallery/photo3.jpg" },
    { id: 4, rotate: 1, caption: "OFFICIAL! kita pacaran!! 💗💓💕", imgSrc: "/gallery/photo4.jpg" },
    { id: 5, rotate: -2, caption: "menaklukan gunung batur berdua 😘😎", imgSrc: "/gallery/photo5.JPEG" },
    { id: 6, rotate: 3, caption: "Park Shanghai", imgSrc: "/gallery/photo6.jpg" },
    { id: 7, rotate: -3, caption: "mirror photo 📸", imgSrc: "/gallery/photo7.jpg" },
    { id: 8, rotate: 2, caption: "ke cat cafe tapi kamunya lebih lucu", imgSrc: "/gallery/photo8.jpg" },
    { id: 9, rotate: -4, caption: "mirror photo lagi 🤳", imgSrc: "/gallery/photo9.jpg" },
    { id: 10, rotate: 1, caption: "seru banget banyak anjing! 🐶", imgSrc: "/gallery/photo10.jpg" },
    { id: 11, rotate: -2, caption: "my cutie patootie 🥰", imgSrc: "/gallery/photo11.jpg" },
  ];

  const photoboothPhotos = {
    strip1: [
      "/photobox/b1.jpg",
      "/photobox/b2.jpg",
      "/photobox/b3.jpg",
      "/photobox/b4.jpg"
    ],
    strip2: [
      "/photobox/a1.JPG",
      "/photobox/a2.JPG",
      "/photobox/a3.JPG",
      "/photobox/a4.JPG"
    ]
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Covered+By+Your+Grace&family=Reenie+Beanie&family=Special+Elite&display=swap');
        
        .font-handwriting { font-family: 'Covered By Your Grace', cursive; }
        .font-signature { font-family: 'Reenie Beanie', cursive; }
        .font-typewriter { font-family: 'Special Elite', cursive; }
        
        /* Hide scrollbar for horizontal scroll container if needed */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <div ref={mainRef} className="min-h-screen bg-[#fdf6e3] text-[#5d4037] overflow-x-hidden">
        {/* Landing Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 pointer-events-none opacity-10" 
               style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }}></div>
          
          <div className="relative bg-[#fff9f0] border-[12px] border-[#8b5e3c] p-12 md:p-16 max-w-2xl shadow-retro transform rotate-1">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#e0e0e0] opacity-60 rotate-1 shadow-sm tape-strip"></div>
            
            <h1 className="landing-title font-signature text-6xl md:text-8xl text-[#5d4037] mb-6 text-center drop-shadow-sm">
              A Small Digital Gift
            </h1>
            <p className="landing-text font-typewriter text-lg md:text-xl text-[#795548] text-center leading-relaxed">
              for aching kepret<br/>
              Made with love, <br/>just for you
            </p>
          </div>
          
          <div className="landing-flower absolute top-[15%] left-[10%] text-4xl opacity-70">🌺</div>
          <div className="landing-flower absolute top-[25%] right-[15%] text-4xl opacity-70">🌸</div>
          <div className="landing-flower absolute bottom-[20%] left-[20%] text-4xl opacity-70">🌼</div>
          <div className="landing-flower absolute bottom-[30%] right-[10%] text-4xl opacity-70">🌷</div>
          <div className="landing-flower absolute top-[60%] left-[5%] text-4xl opacity-70">🌹</div>
        </section>

        {/* Horizontal Scroll Gallery Section */}
        <section ref={galleryRef} className="h-screen flex flex-col justify-center bg-[#f5e6d3] overflow-hidden relative">
          <div className="absolute top-10 left-10 z-10">
             <h2 className="font-signature text-5xl text-[#5d4037]">Our Memories ♡</h2>
             <p className="font-handwriting text-xl text-[#8d6e63] ml-2">Scroll to explore &rarr;</p>
          </div>

          <div ref={galleryContainerRef} className="flex flex-nowrap items-center px-20 h-full w-[400%]">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="gallery-item flex-shrink-0 w-screen md:w-[30vw] h-[70vh] flex items-center justify-center px-8"
              >
                <div className="bg-white p-4 pb-12 shadow-xl transform transition-transform hover:scale-105 duration-300 relative rotate-1">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-[#e0e0e0] opacity-60 -rotate-2 shadow-sm tape-strip"></div>
                  <div className="w-full h-[50vh] overflow-hidden border border-gray-200 bg-gray-100">
                    <img 
                      src={photo.imgSrc} 
                      alt={photo.caption}
                      className="w-full h-full object-cover sepia-[.3]"
                    />
                  </div>
                  <p className="mt-4 font-handwriting text-2xl text-[#5d4037] text-center leading-tight">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Photobooth Strip Section */}
        <section className="min-h-screen py-20 px-4 flex flex-col items-center justify-center bg-[#fdf6e3] relative">
          <div className="absolute inset-0 opacity-5" 
               style={{ backgroundImage: 'radial-gradient(#8b5e3c 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

          <h2 className="font-signature text-5xl md:text-7xl text-[#5d4037] mb-20 text-center relative z-10">
            Photobooth Memories ♡
          </h2>
          
          <div className="flex flex-wrap gap-16 justify-center items-start max-w-6xl relative z-10">
            {/* Left Strip */}
            <div className="photobooth-strip bg-white p-4 pb-8 shadow-2xl w-full max-w-[300px] transform -rotate-3">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-[#e0e0e0] opacity-70 rotate-2 shadow-sm tape-strip"></div>
              <div className="text-center font-typewriter text-xs text-[#5d4037] border-b-2 border-dashed border-[#a1887f] pb-2 mb-4">
                ★ PHOTOBOOTH ★<br/>
                [DENPASAR] - [17 AUGUST 2025]
              </div>
              
              <div className="flex flex-col gap-3">
                {photoboothPhotos.strip1.map((imgSrc, index) => (
                  <div key={index} className="w-full aspect-[3/2] bg-gray-200 overflow-hidden grayscale-[0.2] contrast-110">
                    <img src={imgSrc} alt={`Photobooth 1-${index}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Strip */}
            <div className="photobooth-strip bg-white p-4 pb-8 shadow-2xl w-full max-w-[300px] transform rotate-3 mt-12 md:mt-0">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-[#e0e0e0] opacity-70 -rotate-1 shadow-sm tape-strip"></div>
              <div className="text-center font-typewriter text-xs text-[#5d4037] border-b-2 border-dashed border-[#a1887f] pb-2 mb-4">
                ★ PHOTOBOOTH ★<br/>
                [KAYUTANGAN] - [6 NOVEMBER 2025]
              </div>
              
              <div className="flex flex-col gap-3">
                {photoboothPhotos.strip2.map((imgSrc, index) => (
                  <div key={index} className="w-full aspect-[3/2] bg-gray-200 overflow-hidden grayscale-[0.2] contrast-110">
                    <img src={imgSrc} alt={`Photobooth 2-${index}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Letter Section */}
        <section className="min-h-screen py-20 px-4 flex items-center justify-center bg-[#f5e6d3]">
          <div className="letter-container bg-[#fff9f0] p-10 md:p-16 max-w-3xl w-full shadow-xl relative transform rotate-1 border border-[#e0e0e0]">
             {/* Paper Texture */}
            <div className="absolute inset-0 opacity-40 pointer-events-none"
                 style={{ backgroundImage: `repeating-linear-gradient(transparent, transparent 29px, #d7ccc8 29px, #d7ccc8 30px)`, backgroundSize: '100% 30px' }}></div>
            
            <div className="absolute -top-5 right-10 w-32 h-10 bg-[#e0e0e0] opacity-50 rotate-3 shadow-sm tape-strip"></div>
            <div className="absolute -bottom-5 left-10 w-32 h-10 bg-[#e0e0e0] opacity-50 -rotate-2 shadow-sm tape-strip"></div>

            <div className="absolute top-0 left-12 w-0.5 h-full bg-red-300 opacity-40"></div>
            
            <div className="font-handwriting text-2xl md:text-3xl text-[#4e342e] leading-[2.2] min-h-[400px] relative z-10">
              Dear Aching Kepret,
              <br/><br/>
              Happy Birthday, my love!
              <br/><br/>
              I hope your day is as beautiful and as bright as you are. May all your wishes come true and may this coming year bring you everything you've been working so hard for. You deserve all the happiness in the world.
              <br/><br/>
              I'm so grateful to have you and I truly hope I get to call you my wife someday (hehe).
              <br/><br/>
              Every moment with you is a treasure I hold close to my heart.
            </div>

            <div className="text-right mt-12 font-signature text-4xl md:text-5xl text-[#5d4037] relative z-10">
              With all my love,<br/>
              Nathan ♡
            </div>
          </div>
        </section>

        {/* Game Section */}
        <section className="game-section min-h-[80vh] py-20 px-4 flex flex-col items-center justify-center relative bg-[#fdf6e3] overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 text-6xl opacity-20 rotate-12">🎮</div>
          <div className="absolute bottom-10 right-10 text-6xl opacity-20 -rotate-12">🧩</div>
          
          <div className="game-content text-center relative z-10 bg-white/80 backdrop-blur-sm p-12 rounded-3xl shadow-retro border-4 border-[#8b5e3c] max-w-2xl">
            <h2 className="font-signature text-6xl md:text-8xl text-[#5d4037] mb-6">
              Want to play a game?
            </h2>
            <p className="font-handwriting text-3xl md:text-4xl text-[#795548] mb-10">
              I made something special for you... 💕
            </p>
            
            <Link href="/game">
              <button className="bg-[#8b5e3c] hover:bg-[#6d4c41] text-[#fff9f0] font-handwriting text-3xl md:text-4xl px-12 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 border-2 border-[#a1887f] hover:shadow-xl">
                Play Game! 🎮
              </button>
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}