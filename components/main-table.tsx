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
            <TableHead className="w-10">1h</TableHead>
            <TableHead className="w-10">24h</TableHead>
            <TableHead className="w-10">7d</TableHead>
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
              <TableCell>${coin.current_price_pretty}</TableCell>
              {/* <TableCell
                className={
                  parseFloat(coin.since) >= 0
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                {parseFloat(coin.since) >= 0 ? '▲' : '▼'} {coin.since}
              </TableCell> */}
              <TableCell
                className={
                  coin.price_change_percentage_1h_in_currency >= 0
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                <span className="inline-flex items-center">
                  {coin.price_change_percentage_1h_in_currency >= 0 ? '▲' : '▼'}
                  <span className="ml-1">
                    {coin.price_change_percentage_1h_in_currency_pretty}%
                  </span>
                </span>
              </TableCell>
              <TableCell
                className={
                  coin.price_change_percentage_24h_in_currency >= 0
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                <span className="inline-flex items-center">
                  {coin.price_change_percentage_24h_in_currency >= 0
                    ? '▲'
                    : '▼'}
                  <span className="ml-1">
                    {coin.price_change_percentage_24h_in_currency_pretty}%
                  </span>
                </span>
              </TableCell>
              <TableCell
                className={
                  coin.price_change_percentage_7d_in_currency >= 0
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                <span className="inline-flex items-center">
                  {coin.price_change_percentage_7d_in_currency >= 0 ? '▲' : '▼'}
                  <span className="ml-1">
                    {coin.price_change_percentage_7d_in_currency_pretty}%
                  </span>
                </span>
              </TableCell>
              <TableCell>${coin.market_cap_pretty}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
