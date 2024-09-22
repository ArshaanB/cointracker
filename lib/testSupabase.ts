import { supabase } from './supabaseClient';

export async function testSupabaseConnection() {
  console.log('Testing Supabase connection...');
  try {
    const { count, error } = await supabase
      .from('allCoins')
      .select('*', { count: 'exact', head: true });
    if (error) throw error;
    console.log('Supabase connection successful. Row count:', count);
    return true;
  } catch (error) {
    console.error('Supabase connection error:', error);
    return false;
  }
}
