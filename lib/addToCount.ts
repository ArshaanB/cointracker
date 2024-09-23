import { supabase } from './supabaseClient';

export async function addNewRow() {
  try {
    // Get the current count of rows in the 'allcoins' table
    const { count, error } = await supabase
      .from('count')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;

    const newCount = (count || 0) + 1;

    // Insert a new row with the updated count
    const { data, error: insertError } = await supabase
      .from('count')
      .insert([{ cur_count: newCount }]);

    if (insertError) throw insertError;

    console.log(`Inserted new row with cur_count: ${newCount}`);
    return data;
  } catch (error) {
    console.error('Error inserting new row:', error);
    throw error;
  }
}
