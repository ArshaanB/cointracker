'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react'
import { useCoins } from '../hooks/useCoins'

interface Coin {
  id: string
  name: string
  symbol: string
  // Add more properties as needed based on the API response
}

interface CoinContextType {
  savedCoins: Coin[]
  setSavedCoins: React.Dispatch<React.SetStateAction<Coin[]>>
  addCoin: (coin: Coin) => void
  allCoins: Coin[]
  isLoadingCoins: boolean
}

const CoinContext = createContext<CoinContextType | undefined>(undefined)

export function CoinProvider({ children }: { children: ReactNode }) {
  const [savedCoins, setSavedCoins] = useState<Coin[]>([
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
    { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' }
  ])

  const { data: allCoins = [], isLoading: isLoadingCoins } = useCoins()

  const addCoin = (coin: Coin) => {
    setSavedCoins((prevCoins) => [...prevCoins, coin])
  }

  return (
    <CoinContext.Provider
      value={{
        savedCoins,
        setSavedCoins,
        addCoin,
        allCoins,
        isLoadingCoins
      }}
    >
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
