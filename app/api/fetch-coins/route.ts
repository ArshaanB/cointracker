import { NextResponse } from 'next/server';
import { fetchAndStoreCoins } from '../../../lib/fetchAndStoreCoins';

export async function GET() {
  await fetchAndStoreCoins();
  return NextResponse.json({
    message: 'Coins fetched and upserted successfully.'
  });
}
