import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth';




export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { accessToken, refreshToken } = await req.json();

    // Yeni token'ları session'a kaydediyoruz
    session.user.accessToken = accessToken;
    session.user.refreshToken = refreshToken;

    // Session'ı güncelleme işlemi
    return NextResponse.json({ message: 'Session updated' });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update session tokens' }, { status: 500 });
  }
}
