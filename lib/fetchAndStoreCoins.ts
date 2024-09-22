import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const fetchAndStoreCoins = async () => {
  console.log('fetchAndStoreCoins started at:', new Date().toISOString());
  try {
    // Create a single, perfectly formatted coin
    const singleCoin = {
      coin_id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      current_price: 62000,
      market_cap: 1200000000000,
      market_cap_rank: 1,
      fully_diluted_valuation: 1300000000000,
      total_volume: 15000000000,
      high_24h: 63000,
      low_24h: 61000,
      price_change_24h: -500,
      price_change_percentage_24h: -0.8,
      market_cap_change_24h: -10000000000,
      market_cap_change_percentage_24h: -0.83,
      circulating_supply: 19000000,
      total_supply: 21000000,
      max_supply: 21000000,
      ath: 69000,
      ath_change_percentage: -10.14,
      ath_date: new Date('2021-11-10T14:24:11.849Z'),
      atl: 67.81,
      atl_change_percentage: 91323.64,
      atl_date: new Date('2013-07-06T00:00:00.000Z'),
      roi: null,
      last_updated: new Date(),
      price_change_percentage_1h_in_currency: 0.1,
      price_change_percentage_24h_in_currency: -0.8,
      price_change_percentage_7d_in_currency: 2.5,
      updated_at: new Date()
    };

    console.log('Single coin data:', JSON.stringify(singleCoin, null, 2));

    console.log('Attempting to upsert single coin to Supabase...');
    const { error, count } = await supabase
      .from('allCoins')
      .upsert(singleCoin, {
        onConflict: 'coin_id',
        count: 'exact'
      });

    if (error) {
      console.error('Supabase upsert error:', JSON.stringify(error, null, 2));
      console.error('Error details:', error.details, 'Error hint:', error.hint);
      throw new Error(`Supabase upsert failed: ${error.message}`);
    }

    console.log(`Successfully upserted ${count} row to Supabase`);
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
