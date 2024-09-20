'use client';

import { useCoinContext } from '@/app/context/CoinContext';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from './ui/table';
import { useEffect, useState } from 'react';

interface SavedCoins {
  name: string;
  symbol: string;
  current_price: string;
  // since: string;
  // hour1: string;
  price_change_percentage_24h: string;
  // day7: string;
  market_cap: string;
}

export function MainTable() {
  const { savedCoins } = useCoinContext();

  return (
    <div className="container mx-auto p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Coin</TableHead>
            <TableHead>Price</TableHead>
            {/* <TableHead className="w-20">Since</TableHead> */}
            {/* <TableHead className="w-10">1h</TableHead> */}
            <TableHead className="w-10">24h</TableHead>
            {/* <TableHead className="w-10">7d</TableHead> */}
            <TableHead>Market Cap</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {savedCoins.map((coin, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <span>
                    {coin.name} {coin.symbol.toUpperCase()}
                  </span>
                </div>
              </TableCell>
              <TableCell>{coin.current_price}</TableCell>
              {/* <TableCell
                className={
                  parseFloat(coin.since) >= 0
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                {parseFloat(coin.since) >= 0 ? '▲' : '▼'} {coin.since}
              </TableCell> */}
              {/* <TableCell
                className={
                  parseFloat(coin.hour1) >= 0
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                {parseFloat(coin.hour1) >= 0 ? '▲' : '▼'} {coin.hour1}
              </TableCell> */}
              <TableCell
                className={
                  parseFloat(coin.price_change_percentage_24h) >= 0
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                {parseFloat(coin.price_change_percentage_24h) >= 0 ? '▲' : '▼'}{' '}
                {coin.price_change_percentage_24h}
              </TableCell>
              {/* <TableCell
                className={
                  parseFloat(coin.day7) >= 0 ? 'text-green-500' : 'text-red-500'
                }
              >
                {parseFloat(coin.day7) >= 0 ? '▲' : '▼'} {coin.day7}
              </TableCell> */}
              <TableCell>{coin.market_cap}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
