'use client';

import { useState, useEffect, KeyboardEvent } from 'react';
import { Input } from '@/components/ui/input';
import { useCoinContext } from '@/app/context/CoinContext';
import { Coin } from '@/app/types/Coin';

export default function AddCoinComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [matchingCoins, setMatchingCoins] = useState<Coin[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { allCoins, addCoin } = useCoinContext();

  useEffect(() => {
    if (searchTerm && allCoins) {
      const matches = allCoins
        .filter((coin: Coin) =>
          coin.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5); // Limit to 5 results
      setMatchingCoins(matches);
      setSelectedIndex(-1); // Reset selection when search results change
    } else {
      setMatchingCoins([]);
      setSelectedIndex(-1);
    }
  }, [searchTerm, allCoins]);

  const handleCoinSelect = (coin: Coin) => {
    console.log(`Selected coin: ${coin.name}`);
    addCoin(coin);
    setSearchTerm('');
    setMatchingCoins([]);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (matchingCoins.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prevIndex) =>
        prevIndex < matchingCoins.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      handleCoinSelect(matchingCoins[selectedIndex]);
    }
  };

  return (
    <div className="w-full bg-background border-b border-gray-200 py-4">
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for a coin"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200"
          />
          {matchingCoins.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              {matchingCoins.map((coin, index) => (
                <div
                  key={coin.id}
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                    index === selectedIndex ? 'bg-gray-200' : ''
                  }`}
                  onClick={() => handleCoinSelect(coin)}
                >
                  {coin.name}{' '}
                  <span className="text-gray-500 ml-2">
                    {coin.symbol.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
