"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  Send,
  X,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Activity,
  Clock,
  ChevronRight,
  Sparkles,
  Bot,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import PriceDisplay from "@/components/Currency/PriceDisplay";
import { EnhancedProduct } from "@/lib/enhancedDataProvider";
import { clientDataProvider } from "@/lib/clientDataProvider";

interface Message {
  id: string;
  type: "bot" | "user";
  content: string;
  options?: string[];
  timestamp: Date;
}

interface UserPreferences {
  destination?: string;
  duration?: string;
  budget?: string;
  groupSize?: string;
  interests?: string[];
  travelStyle?: string;
}

const QUESTIONS = [
  {
    id: "destination",
    question: "Where would you like to explore? 🌍",
    options: [
      "Melbourne & Victoria",
      "Sydney & NSW",
      "Queensland",
      "Tasmania",
      "Any destination",
    ],
  },
  {
    id: "duration",
    question: "How much time do you have? ⏰",
    options: [
      "Half day (4 hours)",
      "Full day (8 hours)",
      "Multi-day adventure",
      "Flexible",
    ],
  },
  {
    id: "budget",
    question: "What's your budget per person? 💰",
    options: [
      "Budget friendly (< $100)",
      "Mid-range ($100-200)",
      "Premium ($200-500)",
      "Luxury ($500+)",
      "Flexible budget",
    ],
  },
  {
    id: "groupSize",
    question: "How many people are traveling? 👥",
    options: [
      "Solo traveler",
      "Couple (2 people)",
      "Small group (3-5)",
      "Large group (6+)",
    ],
  },
  {
    id: "interests",
    question: "What are you most interested in? (You can select multiple) 🎯",
    options: [
      "Food & Wine",
      "Adventure & Nature",
      "Culture & History",
      "Wildlife",
      "Photography",
      "Local experiences",
      "Family friendly",
    ],
    multiple: true,
  },
  {
    id: "travelStyle",
    question: "What's your travel style? ✨",
    options: [
      "Relaxed & Easy-going",
      "Active & Adventurous",
      "Cultural & Educational",
      "Luxury & Comfort",
      "Off the beaten path",
    ],
  },
];

export function TripRecommendationChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({});
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [recommendations, setRecommendations] = useState<EnhancedProduct[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !hasStarted) {
      // Initial greeting only once
      setHasStarted(true);
      setTimeout(() => {
        addBotMessage(
          "Hi there! 👋 I'm your travel assistant. I'll help you find the perfect trip based on your preferences. Let's start with a few questions!"
        );
        setTimeout(() => {
          const question = QUESTIONS[0];
          addBotMessage(question.question, question.options);
        }, 1500);
      }, 500);
    }
  }, [isOpen, hasStarted]);

  const addBotMessage = (content: string, options?: string[]) => {
    const message: Message = {
      id: Date.now().toString(),
      type: "bot",
      content,
      options,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
  };

  const addUserMessage = (content: string) => {
    const message: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
  };

  const moveToNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextIndex);
    
    if (nextIndex < QUESTIONS.length) {
      // Show next question
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const question = QUESTIONS[nextIndex];
        addBotMessage(question.question, question.options);
      }, 1000);
    } else {
      // All questions answered, find recommendations
      setTimeout(() => {
        findRecommendations();
      }, 1000);
    }
  };

  const handleOptionClick = (option: string) => {
    const question = QUESTIONS[currentQuestionIndex];
    
    // Check if question exists
    if (!question) return;
    
    if (question.multiple) {
      // Handle multiple selection for interests
      if (selectedInterests.includes(option)) {
        setSelectedInterests(prev => prev.filter(i => i !== option));
      } else {
        setSelectedInterests(prev => [...prev, option]);
      }
      return;
    }

    // Add user message
    addUserMessage(option);

    // Save preference
    const updatedPreferences = { ...userPreferences };
    if (question.id === "destination") {
      updatedPreferences.destination = option;
    } else if (question.id === "duration") {
      updatedPreferences.duration = option;
    } else if (question.id === "budget") {
      updatedPreferences.budget = option;
    } else if (question.id === "groupSize") {
      updatedPreferences.groupSize = option;
    } else if (question.id === "travelStyle") {
      updatedPreferences.travelStyle = option;
    }
    setUserPreferences(updatedPreferences);

    // Move to next question
    moveToNextQuestion();
  };

  const handleInterestsContinue = () => {
    if (selectedInterests.length > 0) {
      addUserMessage(selectedInterests.join(", "));
      setUserPreferences(prev => ({ ...prev, interests: selectedInterests }));
      setSelectedInterests([]);
      moveToNextQuestion();
    }
  };

  const findRecommendations = async () => {
    if (showRecommendations) return; // Prevent duplicate calls
    setIsTyping(true);
    
    setTimeout(async () => {
      setIsTyping(false);
      addBotMessage("Great! Let me find the perfect trips for you based on your preferences... 🔍");
      
      try {
        const allProducts = await clientDataProvider.getAllProducts();
        
        // Score and filter products based on preferences
        const scoredProducts = allProducts.map(product => {
          let score = 0;
          
          // Destination matching
          if (userPreferences.destination && userPreferences.destination !== "Any destination") {
            if (product.destinationName.toLowerCase().includes(userPreferences.destination.toLowerCase()) ||
                userPreferences.destination.toLowerCase().includes(product.destinationName.toLowerCase())) {
              score += 30;
            }
          } else {
            score += 10; // Small bonus for "any destination"
          }
          
          // Duration matching
          if (userPreferences.duration) {
            const productHours = parseInt(product.duration.match(/\d+/)?.[0] || "0");
            if (userPreferences.duration.includes("Half day") && productHours <= 4) {
              score += 20;
            } else if (userPreferences.duration.includes("Full day") && productHours >= 6 && productHours <= 10) {
              score += 20;
            } else if (userPreferences.duration.includes("Multi-day") && productHours > 24) {
              score += 20;
            } else if (userPreferences.duration.includes("Flexible")) {
              score += 10;
            }
          }
          
          // Budget matching
          if (userPreferences.budget) {
            const price = product.pricing.adult;
            if (userPreferences.budget.includes("< $100") && price < 100) {
              score += 25;
            } else if (userPreferences.budget.includes("$100-200") && price >= 100 && price <= 200) {
              score += 25;
            } else if (userPreferences.budget.includes("$200-500") && price >= 200 && price <= 500) {
              score += 25;
            } else if (userPreferences.budget.includes("$500+") && price > 500) {
              score += 25;
            } else if (userPreferences.budget.includes("Flexible")) {
              score += 10;
            }
          }
          
          // Interest matching
          if (userPreferences.interests && userPreferences.interests.length > 0) {
            userPreferences.interests.forEach(interest => {
              const lowerInterest = interest.toLowerCase();
              const productText = `${product.name} ${product.overview} ${product.categories.join(" ")}`.toLowerCase();
              
              if (lowerInterest.includes("food") && productText.includes("food")) score += 15;
              if (lowerInterest.includes("wine") && productText.includes("wine")) score += 15;
              if (lowerInterest.includes("adventure") && productText.includes("adventure")) score += 15;
              if (lowerInterest.includes("nature") && productText.includes("nature")) score += 15;
              if (lowerInterest.includes("culture") && productText.includes("cultur")) score += 15;
              if (lowerInterest.includes("history") && productText.includes("histor")) score += 15;
              if (lowerInterest.includes("wildlife") && productText.includes("wildlife")) score += 15;
              if (lowerInterest.includes("photography") && productText.includes("photo")) score += 15;
              if (lowerInterest.includes("family") && productText.includes("family")) score += 15;
              if (lowerInterest.includes("local") && productText.includes("local")) score += 10;
            });
          }
          
          // Travel style matching
          if (userPreferences.travelStyle) {
            const style = userPreferences.travelStyle.toLowerCase();
            const productText = `${product.name} ${product.overview}`.toLowerCase();
            
            if (style.includes("relaxed") && productText.includes("relax")) score += 10;
            if (style.includes("active") && productText.includes("active")) score += 10;
            if (style.includes("adventure") && productText.includes("adventure")) score += 10;
            if (style.includes("cultural") && productText.includes("cultur")) score += 10;
            if (style.includes("luxury") && product.pricing.adult > 300) score += 10;
            if (style.includes("beaten path") && productText.includes("hidden")) score += 10;
          }
          
          // Bonus for highly rated products
          if (product.rating >= 4.5) score += 5;
          if (product.reviewCount > 100) score += 5;
          
          return { ...product, matchScore: score };
        });
        
        // Sort by score and take top 3
        const topRecommendations = scoredProducts
          .sort((a, b) => b.matchScore - a.matchScore)
          .slice(0, 3)
          .filter(p => p.matchScore > 20); // Only show if there's some match
        
        if (topRecommendations.length > 0) {
          setRecommendations(topRecommendations);
          setTimeout(() => {
            addBotMessage(
              `Perfect! I found ${topRecommendations.length} amazing trips that match your preferences! 🎉`
            );
            setShowRecommendations(true);
          }, 1500);
        } else {
          // Fallback to popular tours if no good matches
          const popularTours = allProducts
            .filter(p => p.reviewCount > 50 && p.rating >= 4.5)
            .slice(0, 3);
          setRecommendations(popularTours);
          setTimeout(() => {
            addBotMessage(
              "I've found some popular trips you might enjoy! While they may not match all your preferences, they're highly rated by other travelers. 🌟"
            );
            setShowRecommendations(true);
          }, 1500);
        }
      } catch (error) {
        console.error("Error finding recommendations:", error);
        addBotMessage("Sorry, I had trouble finding recommendations. Please try again later.");
      }
    }, 2000);
  };

  const resetChat = () => {
    setMessages([]);
    setCurrentQuestionIndex(0);
    setUserPreferences({});
    setSelectedInterests([]);
    setRecommendations([]);
    setShowRecommendations(false);
    setIsTyping(false);
    setTimeout(() => {
      addBotMessage(
        "Hi again! 👋 Let's find you another perfect trip. Ready to start?"
      );
      setTimeout(() => {
        const question = QUESTIONS[0];
        addBotMessage(question.question, question.options);
      }, 1500);
    }, 500);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 ${
          isOpen ? "scale-0" : "scale-100"
        }`}
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6" />
          <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-pulse" />
        </div>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-20 right-6 z-50 transition-all duration-300 transform origin-bottom-right ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        <Card className="w-[90vw] sm:w-[420px] max-w-[420px] h-[500px] sm:h-[600px] shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bot className="w-8 h-8" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-semibold">Trip Recommendation Assistant</h3>
                <p className="text-xs opacity-90">Online • Ready to help</p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                // Reset for next time
                setHasStarted(false);
                setMessages([]);
                setCurrentQuestionIndex(0);
                setUserPreferences({});
                setSelectedInterests([]);
                setRecommendations([]);
                setShowRecommendations(false);
              }}
              className="hover:bg-white/20 p-1 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scroll-smooth">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "bot" ? "justify-start" : "justify-end"
                } animate-fadeIn`}
              >
                <div
                  className={`max-w-[80%] ${
                    message.type === "bot"
                      ? "bg-white text-gray-800"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  } rounded-2xl p-3 shadow-md`}
                >
                  <p className="text-sm">{message.content}</p>
                  {message.options && message.options.length > 0 && !showRecommendations && (
                    <div className="mt-3 space-y-2">
                      {QUESTIONS[currentQuestionIndex]?.multiple ? (
                        <>
                          {message.options.map((option) => (
                            <button
                              key={option}
                              onClick={() => handleOptionClick(option)}
                              className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${
                                selectedInterests.includes(option)
                                  ? "bg-blue-100 border-2 border-blue-500 text-blue-700"
                                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                          {selectedInterests.length > 0 && (
                            <button
                              onClick={handleInterestsContinue}
                              disabled={selectedInterests.length === 0}
                              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded-lg text-xs hover:opacity-90 transition-opacity mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Continue with {selectedInterests.length} selected →
                            </button>
                          )}
                        </>
                      ) : (
                        message.options.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            className="w-full text-left bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-xs transition-colors text-gray-700"
                          >
                            {option}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fadeIn">
                <div className="bg-white rounded-2xl p-3 shadow-md">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {showRecommendations && recommendations.length > 0 && (
              <div className="space-y-3 animate-fadeIn">
                {recommendations.map((trip) => (
                  <Card key={trip.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-3">
                      <div className="flex gap-3">
                        <img
                          src={trip.images.hero}
                          alt={trip.name}
                          className="w-20 h-20 object-cover rounded-lg"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&h=200&fit=crop";
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-gray-900 line-clamp-1">
                            {trip.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-600">{trip.destinationName}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-gray-600 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {trip.duration}
                            </span>
                            <span className="font-semibold text-sm text-gray-900">
                              <PriceDisplay price={trip.pricing.adult} fromCurrency={trip.currency} />
                            </span>
                          </div>
                          <Link href={`/product/${trip.id}`}>
                            <Button className="mt-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white text-xs px-3 py-1 rounded-lg">
                              View Details →
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <button
                  onClick={resetChat}
                  className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium mt-4"
                >
                  Find different trips →
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </Card>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}