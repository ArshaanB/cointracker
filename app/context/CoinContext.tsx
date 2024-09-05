'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'

interface Coin {
  id: string
  name: string
  symbol: string
}

interface CoinContextType {
  savedCoins: Coin[]
  setSavedCoins: React.Dispatch<React.SetStateAction<Coin[]>>
  addCoin: (coin: Coin) => void
}

const CoinContext = createContext<CoinContextType | undefined>(undefined)

export function CoinProvider({ children }: { children: ReactNode }) {
  const [savedCoins, setSavedCoins] = useState<Coin[]>([
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
    { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' }
  ])

  const addCoin = (coin: Coin) => {
    setSavedCoins((prevCoins) => [...prevCoins, coin])
  }

  return (
    <CoinContext.Provider value={{ savedCoins, setSavedCoins, addCoin }}>
      {children}
    </CoinContext.Provider>
  )
}

export function useCoinContext() {
  const context = useContext(CoinContext)
  if (context === undefined) {
    throw new Error('useCoinContext must be used within a CoinProvider')
  }
  return context
}
