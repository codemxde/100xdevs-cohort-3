import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest) {
  return NextResponse.json({
    avatarUrl: 'http://images.google.com/cat.png',
  });
}
