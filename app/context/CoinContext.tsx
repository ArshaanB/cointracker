'use client';

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useMemo
} from 'react';
import { useCoins } from '../hooks/useCoins';

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: string;
  price_change_percentage_24h: string;
  market_cap: string;
}

interface CoinContextType {
  savedCoins: Coin[];
  setSavedCoins: React.Dispatch<React.SetStateAction<Coin[]>>;
  addCoin: (coin: Coin) => void;
  allCoins: Coin[];
  coinsById: { [id: string]: Coin };
  isLoadingCoins: boolean;
}

const CoinContext = createContext<CoinContextType | undefined>(undefined);

export function CoinProvider({ children }: { children: ReactNode }) {
  const [savedCoins, setSavedCoins] = useState<Coin[]>([]);

  const { data: allCoins = [], isLoading: isLoadingCoins } = useCoins();

  const addCoin = (coin: Coin) => {
    if (coin && !savedCoins.some((savedCoin) => savedCoin.id === coin.id)) {
      setSavedCoins((prevCoins) => [...prevCoins, coin]);
    }
  };

  const coinsById = useMemo(() => {
    const result: { [id: string]: Coin } = {};
    for (const coin of allCoins) {
      result[coin.id] = coin;
    }
    return result;
  }, [allCoins]);

  useEffect(() => {
    if (
      coinsById['bitcoin'] &&
      coinsById['ethereum'] &&
      coinsById['dogecoin']
    ) {
      addCoin(coinsById['bitcoin']);
      addCoin(coinsById['ethereum']);
      addCoin(coinsById['dogecoin']);
    }
  }, [coinsById]);

  return (
    <CoinContext.Provider
      value={{
        savedCoins,
        setSavedCoins,
        addCoin,
        allCoins,
        coinsById,
        isLoadingCoins
      }}
    >
      {children}
    </CoinContext.Provider>
  );
}

export function useCoinContext() {
  const context = useContext(CoinContext);
  if (context === undefined) {
    throw new Error('useCoinContext must be used within a CoinProvider');
  }
  return context;
}
