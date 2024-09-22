import { supabase } from './supabaseClient';
import { Coin } from '../app/types/Coin';

export const fetchAndStoreCoins = async () => {
  console.log('fetchAndStoreCoins started at:', new Date().toISOString());
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h%2C24h%2C7d',
      {
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': process.env.NEXT_PUBLIC_COINGECKO_API_KEY || ''
        }
      }
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: Coin[] = await response.json();

    console.log(`Fetched ${data.length} coins from CoinGecko API`);

    const formattedData = data.map((coin) => ({
      coin_id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      image: coin.image,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      market_cap_rank: coin.market_cap_rank,
      fully_diluted_valuation: coin.fully_diluted_valuation,
      total_volume: coin.total_volume,
      high_24h: coin.high_24h,
      low_24h: coin.low_24h,
      price_change_24h: coin.price_change_24h,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      market_cap_change_24h: coin.market_cap_change_24h,
      market_cap_change_percentage_24h: coin.market_cap_change_percentage_24h,
      circulating_supply: coin.circulating_supply,
      total_supply: coin.total_supply,
      max_supply: coin.max_supply,
      ath: coin.ath,
      ath_change_percentage: coin.ath_change_percentage,
      ath_date: coin.ath_date,
      atl: coin.atl,
      atl_change_percentage: coin.atl_change_percentage,
      atl_date: coin.atl_date,
      roi: coin.roi,
      last_updated: coin.last_updated,
      price_change_percentage_1h_in_currency:
        coin.price_change_percentage_1h_in_currency,
      price_change_percentage_24h_in_currency:
        coin.price_change_percentage_24h_in_currency,
      price_change_percentage_7d_in_currency:
        coin.price_change_percentage_7d_in_currency
    }));

    console.log('Attempting to upsert data to Supabase...');

    const { error } = await supabase
      .from('allCoins')
      .upsert(formattedData, { onConflict: 'coin_id' });

    if (error) {
      console.error('Supabase upsert error:', error);
      throw error;
    }

    console.log('Coin data upserted successfully.');
  } catch (error) {
    console.error('Error in fetchAndStoreCoins:', error);
  } finally {
    console.log('fetchAndStoreCoins completed at:', new Date().toISOString());
  }
};
