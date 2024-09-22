import { NextResponse } from 'next/server';
import { fetchAndStoreCoins } from '../../../lib/fetchAndStoreCoins';
import { testSupabaseConnection } from '../../../lib/testSupabase';

export async function GET() {
  console.log(
    'API route /api/fetch-coins called at:',
    new Date().toISOString()
  );
  console.log(
    'Supabase URL (first 10 chars):',
    process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 10)
  );
  console.log(
    'Supabase Anon Key (first 10 chars):',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 10)
  );

  try {
    const supabaseConnected = await testSupabaseConnection();
    if (!supabaseConnected) {
      return NextResponse.json(
        { error: 'Failed to connect to Supabase' },
        { status: 500 }
      );
    }

    await fetchAndStoreCoins();
    return NextResponse.json({
      message: 'Coins fetched and upserted successfully.'
    });
  } catch (error) {
    console.error('Error in fetch-coins API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch and store coins' },
      { status: 500 }
    );
  }
}
