import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { raffleId, name, phone, pixAccountName, quantity } = body;

    if (!raffleId || !name || !phone || !pixAccountName || !quantity) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes' }, { status: 400 });
    }

    // Get the raffle details to verify price
    const { data: raffle, error: raffleError } = await supabase
      .from('raffles')
      .select('id, price, status')
      .eq('slug', raffleId)
      .single();

    if (raffleError || !raffle) {
      return NextResponse.json({ error: 'Rifa não encontrada' }, { status: 404 });
    }

    if (raffle.status !== 'OPEN') {
      return NextResponse.json({ error: 'Esta rifa não está mais aceitando compras' }, { status: 400 });
    }

    const price = Number(raffle.price);
    const totalValue = price * quantity;

    // Generate random 4-digit numbers
    // In a real production app, you would check if the numbers are already taken
    const numbers = [];
    for (let i = 0; i < quantity; i++) {
      const num = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      numbers.push(num);
    }

    // Insert into DB
    const { data: newBuyer, error: insertError } = await supabase
      .from('raffle_buyers')
      .insert([{
        raffle_id: raffle.id,
        name,
        phone,
        pix_account_name: pixAccountName,
        quantity,
        numbers,
        total_value: totalValue,
        status: 'PENDING'
      }])
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting buyer:', insertError);
      return NextResponse.json({ error: 'Erro ao registrar a compra' }, { status: 500 });
    }

    // Map back to the keys the frontend expects or just send the newBuyer
    const responseData = {
        ...newBuyer,
        raffleId,
        totalValue: newBuyer.total_value,
        pixAccountName: newBuyer.pix_account_name
    };

    return NextResponse.json({ success: true, buyer: responseData });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
