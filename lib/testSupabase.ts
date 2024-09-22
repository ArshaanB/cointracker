import { supabase } from './supabaseClient';

export async function testSupabaseConnection() {
  console.log('Testing Supabase connection...');
  try {
    const { data, error } = await supabase
      .from('allCoins')
      .select('count(*)', { count: 'exact' });
    if (error) throw error;
    console.log('Supabase connection successful. Row count:', data[0].count);
    return true;
  } catch (error) {
    console.error('Supabase connection error:', error);
    return false;
  }
}
