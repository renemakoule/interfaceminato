"use client";

import { useState, useEffect, useRef } from "react";
import { Search, UserIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import LogoMinato from "./LogoMinato";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const suggestions = [
  "best tacos in sf",
  "what is there to do in austin tx",
  "is it worth upgrading to the iphone 16 pro?",
];

const mockSearchResults = [
  {
    title: "Meditation techniques in 2024",
    sources: [
      { title: "3 Dynamic Meditation Techniques To Change Your Life in 20 Minutes", author: "vikasa", authorType: "1" },
      { title: "28 Best Meditation Techniques for Beginners to Learn", author: "positivepsychology", authorType: "2" },
      { title: "The Top 7 Meditation Techniques for 2024/2025 -", author: "bookretreat", authorType: "3" },
    ],
    answer: "As meditation continues to evolve, several techniques have gained prominence in 2024, catering to diverse preferences and lifestyles. Below are some of the most effective and popular meditation methods this year.",
    images: ["/poket.jpg", "/logo.png"],
  },
];

export default function MinatoSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef(null);

  const placeholders = [
    "Search for anything...",
    "What's on your mind?",
    "Discover new ideas",
    "Find answers here",
  ];
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [gradient, setGradient] = useState("from-blue-500 to-purple-500");

  useEffect(() => {
    const placeholderInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
        setIsAnimating(false);
      }, 500);
    }, 4000);

    const gradientInterval = setInterval(() => {
      const gradients = [
        "from-blue-500 via-pink-500 to-purple-500",
        "from-green-600 via-purple-600 to-blue-600",
        "from-pink-500 to-yellow-500 via-red-500",
      ];
      setGradient(gradients[Math.floor(Math.random() * gradients.length)]);
    }, 8000);

    return () => {
      clearInterval(placeholderInterval);
      clearInterval(gradientInterval);
    };
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);
    setHasSearched(true);
    // Simulate API call
    setTimeout(() => {
      setSearchResults((prevResults) => [...prevResults, ...mockSearchResults]);
      setIsSearching(false);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchQuery);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <LogoMinato />
              </div>
            </div>
            <div className="flex items-center">
              <Link href="/" className="flex hover:text-purple-700">
                <UserIcon className="cursor-pointer hover:text-purple-700" />
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <motion.div 
        className="fixed top-16 left-0 right-0 bg-white z-20 pt-4 pb-2 px-4 sm:px-6 lg:px-8 transition-all duration-300"
        animate={{ 
          top: hasSearched ? 64 : 80,
          paddingTop: hasSearched ? 8 : 16,
          paddingBottom: hasSearched ? 8 : 8
        }}
      >
        <div className="max-w-2xl mx-auto">
          <AnimatePresence>
            {!hasSearched && (
              <motion.h1
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`text-4xl sm:text-5xl md:text-6xl font-bold font-mono mb-4 bg-gradient-to-r ${gradient} text-transparent bg-clip-text transition-colors duration-1000 text-center`}
              >
                Minato.ai
              </motion.h1>
            )}
          </AnimatePresence>
          <div className="relative mt-5">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholders[currentPlaceholder]}
              className="pl-10 pr-4 py-6 w-full rounded-full border-2 border-purple-400 focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
      </motion.div>

      <main className={`flex-grow ${hasSearched ? 'pt-32' : 'pt-48'} mt-10 pb-16 px-4 sm:px-6 lg:px-8 overflow-y-auto transition-all duration-300`}>
        {searchResults.length === 0 && !isSearching && !hasSearched && (
          <div className="w-full flex flex-wrap justify-center items-center space-x-2 space-y-2 mt-4">
            {suggestions.map((suggestion, index) => (
              <span
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="bg-pink-100 text-purple-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-pink-200 transition-colors duration-200"
              >
                {suggestion}
              </span>
            ))}
          </div>
        )}

        {isSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-12 text-center"
          >
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
          </motion.div>
        )}

        <AnimatePresence>
          {searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-4xl mx-auto space-y-8 rounded-md items-center justify-center"
            >
              {searchResults.map((result, index) => (
                <div key={index} className="flex items-center justify-center">
                  <Card className="w-full items-center justify-center lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white shadow-md rounded-lg mt-10 overflow-hidden">
                    <CardHeader className="space-y-1 p-4 bg-black bg-opacity-30">
                      <CardTitle className="text-2xl font-bold">
                        {result.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 p-4">
                      <Link href="/product/elegant-watch" className="flex space-x-4">
                        <div className="relative w-full h-48 overflow-hidden rounded-lg">
                          <Image
                            src="/poket.jpg"
                            alt="Montre Élégante"
                            layout="fill"
                            objectFit="cover"
                            className="hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardDescription className="text-gray-100 text-xs">
                          Une montre sophistiquée alliant style et fonctionnalité.
                          Parfaite pour toutes les occasions.
                        </CardDescription>
                      </Link>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">299 €</span>
                        <Link
                          href="/product/elegant-watch"
                          className="px-3 py-1 bg-white text-indigo-600 text-sm rounded-full hover:bg-gray-100 transition-colors"
                        >
                          Voir détails
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {!hasSearched && (
          <motion.footer
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-0 left-0 right-0 bg-white py-4 px-4 sm:px-6 lg:px-8"
          >
            <div className="flex flex-col items-center justify-center text-gray-600">
              <span className="mt-2">Powered By Minato.ai © 2024</span>
              <div className="mt-2">
                <LogoMinato />
              </div>
            </div>
          </motion.footer>
        )}
      </AnimatePresence>
    </div>
  );
}