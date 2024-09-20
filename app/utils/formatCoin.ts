import { Coin } from '../types/Coin';

export function formatCoin(coin: Coin): Coin {
  return {
    ...coin,
    current_price_pretty: formatNumber(coin.current_price, 2),
    market_cap_pretty: formatNumber(coin.market_cap),
    price_change_percentage_1h_in_currency_pretty: formatPercentage(
      coin.price_change_percentage_1h_in_currency
    ),
    price_change_percentage_24h_in_currency_pretty: formatPercentage(
      coin.price_change_percentage_24h_in_currency
    ),
    price_change_percentage_7d_in_currency_pretty: formatPercentage(
      coin.price_change_percentage_7d_in_currency
    )
  };
}

function formatNumber(num: number, decimalPlaces: number = 0): string {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces
  });
}

function formatPercentage(num: number): string {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
