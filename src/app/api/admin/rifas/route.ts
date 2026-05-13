import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: buyers, error } = await supabase
      .from('raffle_buyers')
      .select('*, raffles(title, slug)')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform to match old expected format if necessary, 
    // but the new admin uses Supabase directly.
    return NextResponse.json(buyers);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
