import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'

export function MainTable() {
  return (
    <div className="container mx-auto p-4">
      <div className="sticky top-0 z-50 flex items-center justify-between bg-black px-4 py-2 text-white">
        <div>Dashboard</div>
        <div>Welcome, Anonymous</div>
      </div>
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
          <TableRow>
            <TableCell>
              <div className="flex items-center space-x-2">
                <span>Bitcoin BTC</span>
              </div>
            </TableCell>
            <TableCell>$59,053.84</TableCell>
            <TableCell className="text-red-500">▼ 0.2%</TableCell>
            <TableCell className="text-red-500">▼ 0.2%</TableCell>
            <TableCell className="text-green-500">▲ 2.7%</TableCell>
            <TableCell className="text-red-500">▼ 6.2%</TableCell>
            <TableCell>$1,166,247,692,072</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="flex items-center space-x-2">
                <span>Ethereum ETH</span>
              </div>
            </TableCell>
            <TableCell>$2,514.50</TableCell>
            <TableCell className="text-red-500">▼ 0.1%</TableCell>
            <TableCell className="text-red-500">▼ 0.1%</TableCell>
            <TableCell className="text-green-500">▲ 3.2%</TableCell>
            <TableCell className="text-red-500">▼ 6.3%</TableCell>
            <TableCell>$302,470,517,827</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="flex items-center space-x-2">
                <span>Tether USDT</span>
              </div>
            </TableCell>
            <TableCell>$0.9995</TableCell>
            <TableCell className="text-red-500">▼ 0.1%</TableCell>
            <TableCell className="text-red-500">▼ 0.1%</TableCell>
            <TableCell className="text-gray-500">0.0%</TableCell>
            <TableCell className="text-red-500">▼ 0.1%</TableCell>
            <TableCell>$117,923,714,653</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="flex items-center space-x-2">
                <span>BNB BNB</span>
              </div>
            </TableCell>
            <TableCell>$532.17</TableCell>
            <TableCell className="text-red-500">▼ 0.4%</TableCell>
            <TableCell className="text-red-500">▼ 0.4%</TableCell>
            <TableCell className="text-green-500">▲ 4.6%</TableCell>
            <TableCell className="text-red-500">▼ 3.7%</TableCell>
            <TableCell>$77,611,025,451</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="flex items-center space-x-2">
                <span>Solana SOL</span>
              </div>
            </TableCell>
            <TableCell>$134.90</TableCell>
            <TableCell className="text-red-500">▼ 0.6%</TableCell>
            <TableCell className="text-red-500">▼ 0.6%</TableCell>
            <TableCell className="text-green-500">▲ 5.7%</TableCell>
            <TableCell className="text-red-500">▼ 14.9%</TableCell>
            <TableCell>$62,985,427,384</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <div className="flex items-center space-x-2">
                <span>USDC USDC</span>
              </div>
            </TableCell>
            <TableCell>$0.9994</TableCell>
            <TableCell className="text-red-500">▼ 0.1%</TableCell>
            <TableCell className="text-red-500">▼ 0.1%</TableCell>
            <TableCell className="text-gray-500">0.0%</TableCell>
            <TableCell className="text-gray-500">0.0%</TableCell>
            <TableCell>$34,698,551,683</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
