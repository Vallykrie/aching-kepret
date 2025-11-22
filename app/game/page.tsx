// app/game/page.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Home, RotateCcw, Trophy } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';

interface Card {
  id: number;
  imageSrc: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryMatchGame() {
  const uniqueImageSources = [
    '/game-photos/photo1.JPEG',
    '/game-photos/photo2.JPEG',
    '/game-photos/photo3.PNG',
    '/game-photos/photo4.JPEG',
    '/game-photos/photo5.JPEG',
    '/game-photos/photo6.JPEG',
    '/game-photos/photo7.JPEG',
    '/game-photos/photo8.JPEG',
  ];

  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (gameWon) {
      const ctx = gsap.context(() => {
        gsap.fromTo(".confetti-piece", 
          { y: -50, opacity: 1, rotation: 0 },
          { 
            y: "100vh", 
            rotation: 720, 
            duration: "random(2, 4)", 
            stagger: { amount: 2, from: "random" },
            ease: "power1.out"
          }
        );
        
        gsap.from(".win-modal", {
          scale: 0.5,
          opacity: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)"
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [gameWon]);

  const initializeGame = () => {
    const cardPairs: Card[] = [...uniqueImageSources, ...uniqueImageSources]
      .sort(() => Math.random() - 0.5)
      .map((src, index) => ({
        id: index,
        imageSrc: src,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(cardPairs);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameWon(false);
  };

  const handleCardClick = (cardId: number) => {
    if (
      isChecking ||
      flippedCards.length === 2 ||
      flippedCards.includes(cardId) ||
      matchedCards.includes(cardId)
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      setMoves(moves + 1);

      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find((card) => card.id === firstId);
      const secondCard = cards.find((card) => card.id === secondId);

      if (firstCard && secondCard) {
        if (firstCard.imageSrc === secondCard.imageSrc) {
          setTimeout(() => {
            setMatchedCards([...matchedCards, firstId, secondId]);
            setFlippedCards([]);
            setIsChecking(false);

            if (matchedCards.length + 2 === cards.length) {
              setTimeout(() => setGameWon(true), 500);
            }
          }, 600);
        } else {
          setTimeout(() => {
            setFlippedCards([]);
            setIsChecking(false);
          }, 1000);
        }
      } else {
        setFlippedCards([]);
        setIsChecking(false);
      }
    }
  };

  const isCardFlipped = (cardId: number) => {
    return flippedCards.includes(cardId) || matchedCards.includes(cardId);
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Covered+By+Your+Grace&family=Reenie+Beanie&family=Special+Elite&display=swap');
        
        .font-handwriting { font-family: 'Covered By Your Grace', cursive; }
        .font-signature { font-family: 'Reenie Beanie', cursive; }
        .font-typewriter { font-family: 'Special Elite', cursive; }
      `}</style>

      <div ref={containerRef} className="min-h-screen bg-[#fdf6e3] p-4 md:p-8 relative overflow-hidden text-[#5d4037]">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }}></div>

        {/* Floating Elements */}
        <div className="absolute top-[10%] left-[10%] text-4xl opacity-30 rotate-12">🌸</div>
        <div className="absolute top-[20%] right-[15%] text-3xl opacity-30 -rotate-12">🌺</div>
        <div className="absolute bottom-[20%] left-[20%] text-3xl opacity-30 rotate-6">🌼</div>
        <div className="absolute bottom-[30%] right-[10%] text-4xl opacity-30 -rotate-6">🌷</div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-8 bg-[#fff9f0] p-6 shadow-retro border-2 border-[#8b5e3c] transform -rotate-1 max-w-2xl mx-auto">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#e0e0e0] opacity-60 rotate-1 shadow-sm tape-strip"></div>
            <h1 className="font-signature text-5xl md:text-7xl text-[#5d4037] mb-2">
              Bisa ga sayang?
            </h1>
            <p className="font-handwriting text-2xl text-[#795548]">
              Find all the matching pairs!
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="bg-white px-6 py-3 shadow-md border border-[#d7ccc8] transform rotate-2">
              <span className="font-handwriting text-xl text-[#5d4037]">
                Moves: <span className="font-bold text-[#8b5e3c]">{moves}</span>
              </span>
            </div>
            <div className="bg-white px-6 py-3 shadow-md border border-[#d7ccc8] transform -rotate-2">
              <span className="font-handwriting text-xl text-[#5d4037]">
                Matched: <span className="font-bold text-[#8b5e3c]">{matchedCards.length / 2}/{uniqueImageSources.length}</span>
              </span>
            </div>
          </div>

          {/* Game Board */}
          <div className="grid grid-cols-4 gap-3 md:gap-4 mb-8 max-w-2xl mx-auto p-4 bg-[#fff9f0] shadow-retro border border-[#8b5e3c]">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={isCardFlipped(card.id) || isChecking}
                className={`aspect-square shadow-md transition-all duration-500 transform hover:scale-105 relative overflow-hidden border-2 border-[#a1887f] ${
                  isCardFlipped(card.id)
                    ? 'bg-white rotate-0'
                    : 'bg-[#8b5e3c] rotate-1'
                } ${matchedCards.includes(card.id) ? 'opacity-60 grayscale' : ''}`}
              >
                <div className="w-full h-full flex items-center justify-center">
                  {isCardFlipped(card.id) ? (
                    <img
                      src={card.imageSrc}
                      alt="Memory Match"
                      className="w-full h-full object-cover p-1"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-80">
                      <span className="text-4xl opacity-50">❓</span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={initializeGame}
              className="bg-[#8b5e3c] hover:bg-[#6d4c41] text-[#fff9f0] font-handwriting text-xl px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 border border-[#5d4037]"
            >
              <RotateCcw className="w-5 h-5" />
              New Game
            </button>
            <Link href="/">
              <button className="bg-[#a1887f] hover:bg-[#8d6e63] text-white font-handwriting text-xl px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 border border-[#5d4037]">
                <Home className="w-5 h-5" />
                Home
              </button>
            </Link>
          </div>
        </div>

        {/* Win Modal */}
        {gameWon && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            {/* Confetti */}
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="confetti-piece absolute text-3xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-50px',
                }}
              >
                {['🌸', '🌹', '🌺', '🌻', '🌼'][Math.floor(Math.random() * 5)]}
              </div>
            ))}

            <div className="win-modal bg-[#fff9f0] p-8 md:p-12 shadow-2xl text-center max-w-md border-10 border-[#8b5e3c] relative transform rotate-1">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#e0e0e0] opacity-60 -rotate-1 shadow-sm tape-strip"></div>
              
              <Trophy className="w-20 h-20 text-[#fbc02d] mx-auto mb-4" />
              <h2 className="font-signature text-5xl md:text-6xl text-[#5d4037] mb-4">
                You Won! 🎉
              </h2>
              <p className="font-handwriting text-2xl text-[#795548] mb-6">
                You completed the game in <span className="font-bold text-[#8b5e3c]">{moves}</span> moves!
              </p>
              <p className="font-handwriting text-xl text-[#8d6e63] mb-8">
                You're as amazing as always! 💕
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    initializeGame();
                    setGameWon(false);
                  }}
                  className="bg-[#8b5e3c] hover:bg-[#6d4c41] text-white font-handwriting text-xl px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Play Again
                </button>
                <Link href="/">
                  <button className="bg-[#a1887f] hover:bg-[#8d6e63] text-white font-handwriting text-xl px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105">
                    Back to Memories
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}