'use client'

import { useCoinContext } from '@/app/context/CoinContext'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from './ui/table'
import { useEffect, useState } from 'react'

interface MainTableDataItem {
  name: string
  symbol: string
  price: string
  since: string
  hour1: string
  hour24: string
  day7: string
  marketCap: string
}

export function MainTable() {
  const { savedCoins } = useCoinContext()
  const [mainTableData, setMainTableData] = useState<MainTableDataItem[]>([])

  useEffect(() => {
    const generateData = () =>
      savedCoins.map((coin) => ({
        name: coin.name,
        symbol: coin.symbol,
        price: `$${(Math.random() * 10000).toFixed(2)}`,
        since: `${(Math.random() * 2 - 1).toFixed(1)}%`,
        hour1: `${(Math.random() * 2 - 1).toFixed(1)}%`,
        hour24: `${(Math.random() * 4 - 2).toFixed(1)}%`,
        day7: `${(Math.random() * 10 - 5).toFixed(1)}%`,
        marketCap: `$${(Math.random() * 1000000000000).toFixed(0)}`
      }))

    setMainTableData(generateData())
  }, [savedCoins])

  return (
    <div className="container mx-auto p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Coin</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="w-20">Since</TableHead>
            <TableHead className="w-10">1h</TableHead>
            <TableHead className="w-10">24h</TableHead>
            <TableHead className="w-10">7d</TableHead>
            <TableHead>Market Cap</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mainTableData.map((coin, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <span>
                    {coin.name} {coin.symbol}
                  </span>
                </div>
              </TableCell>
              <TableCell>{coin.price}</TableCell>
              <TableCell
                className={
                  parseFloat(coin.since) >= 0
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                {parseFloat(coin.since) >= 0 ? '▲' : '▼'} {coin.since}
              </TableCell>
              <TableCell
                className={
                  parseFloat(coin.hour1) >= 0
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                {parseFloat(coin.hour1) >= 0 ? '▲' : '▼'} {coin.hour1}
              </TableCell>
              <TableCell
                className={
                  parseFloat(coin.hour24) >= 0
                    ? 'text-green-500'
                    : 'text-red-500'
                }
              >
                {parseFloat(coin.hour24) >= 0 ? '▲' : '▼'} {coin.hour24}
              </TableCell>
              <TableCell
                className={
                  parseFloat(coin.day7) >= 0 ? 'text-green-500' : 'text-red-500'
                }
              >
                {parseFloat(coin.day7) >= 0 ? '▲' : '▼'} {coin.day7}
              </TableCell>
              <TableCell>{coin.marketCap}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
