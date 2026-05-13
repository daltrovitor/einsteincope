import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data.json');

// Helper to initialize or read the DB
async function getDB() {
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return default structure
    return {
      buyers: []
    };
  }
}

// Helper to save to DB
async function saveDB(data: any) {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { raffleId, name, phone, pixAccountName, quantity } = body;

    if (!raffleId || !name || !phone || !pixAccountName || !quantity) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const price = 10; // R$ 10 per number
    const totalValue = price * quantity;

    // Generate 4-digit numbers
    const numbers = [];
    for (let i = 0; i < quantity; i++) {
      const num = Math.floor(1000 + Math.random() * 9000).toString();
      numbers.push(num);
    }

    const db = await getDB();

    const newBuyer = {
      id: Date.now().toString(),
      raffleId,
      name,
      phone,
      pixAccountName,
      quantity,
      numbers,
      totalValue,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };

    db.buyers.push(newBuyer);
    await saveDB(db);

    return NextResponse.json({ success: true, buyer: newBuyer });
  } catch (error) {
    console.error('Error saving buyer:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await getDB();
    return NextResponse.json(db.buyers);
  } catch (error) {
    console.error('Error fetching buyers:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
