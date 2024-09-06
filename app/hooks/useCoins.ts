import { useQuery } from '@tanstack/react-query'

export function useCoins() {
  return useQuery({
    queryKey: ['coinMarkets'],
    queryFn: async () => {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd',
        {
          headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': process.env.NEXT_PUBLIC_COINGECKO_API_KEY || ''
          }
        }
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
    staleTime: Infinity // Ensure the data is never considered stale
  })
}
