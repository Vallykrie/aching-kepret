// app/game/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Heart, Home, RotateCcw, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function MemoryMatchGame() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  // Emoji pairs for the memory game
  const emojis = ['💕', '💖', '💗', '💝', '💘', '🌸', '🌹', '🌺'];

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const cardPairs = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(cardPairs);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameWon(false);
  };

  const handleCardClick = (cardId) => {
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
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);

      if (firstCard.emoji === secondCard.emoji) {
        // Match found!
        setTimeout(() => {
          setMatchedCards([...matchedCards, firstId, secondId]);
          setFlippedCards([]);
          setIsChecking(false);

          // Check if game is won
          if (matchedCards.length + 2 === cards.length) {
            setTimeout(() => setGameWon(true), 500);
          }
        }, 600);
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  const isCardFlipped = (cardId) => {
    return flippedCards.includes(cardId) || matchedCards.includes(cardId);
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Covered+By+Your+Grace&family=Reenie+Beanie&family=Special+Elite&display=swap');
        
        .font-handwriting { font-family: 'Covered By Your Grace', cursive; }
        .font-signature { font-family: 'Reenie Beanie', cursive; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }

        .confetti {
          position: fixed;
          animation: confetti 3s ease-out forwards;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-amber-100 p-4 md:p-8 relative overflow-hidden">
        
        {/* Floating hearts background */}
        <div className="absolute top-[10%] left-[10%] text-4xl opacity-20 animate-float">💝</div>
        <div className="absolute top-[20%] right-[15%] text-3xl opacity-20 animate-float" style={{animationDelay: '1s'}}>💖</div>
        <div className="absolute bottom-[20%] left-[20%] text-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}>💗</div>
        <div className="absolute bottom-[30%] right-[10%] text-4xl opacity-20 animate-float" style={{animationDelay: '1.5s'}}>💕</div>
        <div className="absolute top-[50%] left-[5%] text-3xl opacity-20 animate-float" style={{animationDelay: '0.5s'}}>🌸</div>
        <div className="absolute top-[60%] right-[5%] text-3xl opacity-20 animate-float" style={{animationDelay: '2.5s'}}>🌹</div>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-signature text-5xl md:text-7xl text-pink-600 mb-4">
              Bisa ga sayang?
            </h1>
            <p className="font-handwriting text-2xl text-purple-700">
              Find all the matching pairs!
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="bg-white/80 backdrop-blur px-6 py-3 rounded-full shadow-lg">
              <span className="font-handwriting text-xl text-purple-700">
                Moves: <span className="font-bold text-pink-600">{moves}</span>
              </span>
            </div>
            <div className="bg-white/80 backdrop-blur px-6 py-3 rounded-full shadow-lg">
              <span className="font-handwriting text-xl text-purple-700">
                Matched: <span className="font-bold text-pink-600">{matchedCards.length / 2}/{emojis.length}</span>
              </span>
            </div>
          </div>

          {/* Game Board */}
          <div className="grid grid-cols-4 gap-3 md:gap-4 mb-8 max-w-2xl mx-auto">
            {cards.map((card) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                disabled={isCardFlipped(card.id) || isChecking}
                className={`aspect-square rounded-2xl shadow-xl transition-all duration-500 transform hover:scale-105 ${
                  isCardFlipped(card.id)
                    ? 'bg-gradient-to-br from-pink-400 to-purple-400'
                    : 'bg-gradient-to-br from-amber-200 to-orange-200 hover:from-amber-300 hover:to-orange-300'
                } ${matchedCards.includes(card.id) ? 'opacity-80 scale-95' : ''}`}
                style={{
                  transform: isCardFlipped(card.id) ? 'rotateY(0deg)' : 'rotateY(0deg)',
                }}
              >
                <div className="w-full h-full flex items-center justify-center text-4xl md:text-5xl">
                  {isCardFlipped(card.id) ? card.emoji : '❓'}
                </div>
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={initializeGame}
              className="bg-purple-500 hover:bg-purple-600 text-white font-handwriting text-xl px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              New Game
            </button>
            <Link href="/">
              <button className="bg-amber-500 hover:bg-amber-600 text-white font-handwriting text-xl px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center gap-2">
                <Home className="w-5 h-5" />
                Home
              </button>
            </Link>
          </div>
        </div>

        {/* Win Modal */}
        {gameWon && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            {/* Confetti */}
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="confetti text-3xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '-50px',
                  animationDelay: `${Math.random() * 0.5}s`,
                }}
              >
                {['💕', '💖', '💗', '💝', '🌸', '🌹'][Math.floor(Math.random() * 6)]}
              </div>
            ))}

            <div className="bg-gradient-to-br from-pink-200 to-purple-200 p-8 md:p-12 rounded-3xl shadow-2xl text-center max-w-md border-8 border-pink-400 relative">
              <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4 animate-bounce" />
              <h2 className="font-signature text-5xl md:text-6xl text-pink-600 mb-4">
                You Won! 🎉
              </h2>
              <p className="font-handwriting text-2xl text-purple-700 mb-6">
                You completed the game in <span className="font-bold text-pink-600">{moves}</span> moves!
              </p>
              <p className="font-handwriting text-xl text-purple-600 mb-8">
                You're as amazing as always! 💕
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    initializeGame();
                    setGameWon(false);
                  }}
                  className="bg-pink-500 hover:bg-pink-600 text-white font-handwriting text-xl px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                >
                  Play Again
                </button>
                <Link href="/">
                  <button className="bg-purple-500 hover:bg-purple-600 text-white font-handwriting text-xl px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110">
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