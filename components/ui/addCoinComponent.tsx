'use client'

import { useState, KeyboardEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCoinContext } from '@/app/context/CoinContext'

export default function AddCoinComponent() {
  const [coinName, setCoinName] = useState('')
  const { addCoin } = useCoinContext()

  const handleAddCoin = () => {
    if (coinName.trim()) {
      const newCoin = {
        id: coinName.toLowerCase(),
        name: coinName,
        symbol: coinName.toUpperCase().slice(0, 3)
      }
      addCoin(newCoin)
      console.log(`Adding ${coinName} to watchlist`)
      setCoinName('') // Clear the input after adding
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddCoin()
    }
  }

  return (
    <div className="w-full bg-background border-b border-gray-200 py-4">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Enter coin name"
            value={coinName}
            onChange={(e) => setCoinName(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-grow bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200"
          />
          <Button
            onClick={handleAddCoin}
            disabled={!coinName.trim()}
            className="bg-black text-white hover:bg-gray-800 transition-colors duration-200 px-6 py-2 rounded-md font-medium"
          >
            Add to watchlist
          </Button>
        </div>
      </div>
    </div>
  )
}
