import { supabase } from './supabaseClient';
import { Coin } from '../app/types/Coin';

interface FormattedCoin {
  coin_id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number | null;
  market_cap: number | null;
  market_cap_rank: number | null;
  fully_diluted_valuation: number | null;
  total_volume: number | null;
  high_24h: number | null;
  low_24h: number | null;
  price_change_24h: number | null;
  price_change_percentage_24h: number | null;
  market_cap_change_24h: number | null;
  market_cap_change_percentage_24h: number | null;
  circulating_supply: number | null;
  total_supply: number | null;
  max_supply: number | null;
  ath: number | null;
  ath_change_percentage: number | null;
  ath_date: Date | null;
  atl: number | null;
  atl_change_percentage: number | null;
  atl_date: Date | null;
  roi: string | null;
  last_updated: Date | null;
  price_change_percentage_1h_in_currency: number | null;
  price_change_percentage_24h_in_currency: number | null;
  price_change_percentage_7d_in_currency: number | null;
  updated_at: Date;
}

export const fetchAndStoreCoins = async () => {
  console.log('fetchAndStoreCoins started at:', new Date().toISOString());
  try {
    console.log('Fetching data from CoinGecko API...');
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
      throw new Error(
        `CoinGecko API responded with status: ${response.status}`
      );
    }

    const data: Coin[] = await response.json();
    console.log(`Fetched ${data.length} coins from CoinGecko API`);

    const formattedData: FormattedCoin[] = data.map((coin) => ({
      coin_id: coin.id || '',
      symbol: coin.symbol || '',
      name: coin.name || '',
      image: coin.image || '',
      current_price: coin.current_price || null,
      market_cap: coin.market_cap || null,
      market_cap_rank: coin.market_cap_rank || null,
      fully_diluted_valuation: coin.fully_diluted_valuation || null,
      total_volume: coin.total_volume || null,
      high_24h: coin.high_24h || null,
      low_24h: coin.low_24h || null,
      price_change_24h: coin.price_change_24h || null,
      price_change_percentage_24h: coin.price_change_percentage_24h || null,
      market_cap_change_24h: coin.market_cap_change_24h || null,
      market_cap_change_percentage_24h:
        coin.market_cap_change_percentage_24h || null,
      circulating_supply: coin.circulating_supply || null,
      total_supply: coin.total_supply || null,
      max_supply: coin.max_supply || null,
      ath: coin.ath || null,
      ath_change_percentage: coin.ath_change_percentage || null,
      ath_date: coin.ath_date ? new Date(coin.ath_date) : null,
      atl: coin.atl || null,
      atl_change_percentage: coin.atl_change_percentage || null,
      atl_date: coin.atl_date ? new Date(coin.atl_date) : null,
      roi: coin.roi ? JSON.stringify(coin.roi) : null,
      last_updated: coin.last_updated ? new Date(coin.last_updated) : null,
      price_change_percentage_1h_in_currency:
        coin.price_change_percentage_1h_in_currency || null,
      price_change_percentage_24h_in_currency:
        coin.price_change_percentage_24h_in_currency || null,
      price_change_percentage_7d_in_currency:
        coin.price_change_percentage_7d_in_currency || null,
      updated_at: new Date()
    }));

    console.log(
      'Formatted data sample:',
      JSON.stringify(formattedData[0], null, 2)
    );

    const validateData = (data: FormattedCoin[]) => {
      for (const coin of data) {
        for (const [key, value] of Object.entries(coin)) {
          if (value === undefined) {
            console.error(
              `Undefined value found for key: ${key} in coin: ${coin.coin_id}`
            );
          }
        }
      }
    };

    validateData(formattedData);

    console.log('Attempting to upsert data to Supabase...');
    const batchSize = 5;
    let totalUpserted = 0;

    for (let i = 0; i < formattedData.length; i += batchSize) {
      const batch = formattedData.slice(i, i + batchSize);
      const { error, count } = await supabase.from('allCoins').upsert(batch, {
        onConflict: 'coin_id',
        count: 'exact'
      });

      if (error) {
        console.error(
          `Error upserting batch ${i / batchSize + 1}:`,
          JSON.stringify(error, null, 2)
        );
        console.error(
          'Error details:',
          error.details,
          'Error hint:',
          error.hint
        );
        throw new Error(
          `Supabase upsert failed for batch ${i / batchSize + 1}: ${
            error.message
          }`
        );
      }

      totalUpserted += count || 0;
      console.log(
        `Successfully upserted batch ${i / batchSize + 1} (${count} rows)`
      );
    }

    console.log(`Total rows upserted: ${totalUpserted}`);
  } catch (error) {
    console.error(
      'Error in fetchAndStoreCoins:',
      error instanceof Error ? error.message : String(error)
    );
    if (error instanceof Error && error.cause) {
      console.error('Cause:', error.cause);
    }
    throw error;
  } finally {
    console.log('fetchAndStoreCoins completed at:', new Date().toISOString());
  }
};
