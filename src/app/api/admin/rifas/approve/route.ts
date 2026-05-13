import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'data.json');

async function getDB() {
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return { buyers: [] };
  }
}

async function saveDB(data: any) {
  await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function POST(request: Request) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    const db = await getDB();
    const buyerIndex = db.buyers.findIndex((b: any) => b.id === id);

    if (buyerIndex === -1) {
      return NextResponse.json({ error: 'Buyer not found' }, { status: 404 });
    }

    db.buyers[buyerIndex].status = 'APPROVED';
    await saveDB(db);

    return NextResponse.json({ success: true, buyer: db.buyers[buyerIndex] });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
