import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { username, password } = body;

  const token = jwt.sign({ username }, 'secret');

  return NextResponse.json({ token });
}
