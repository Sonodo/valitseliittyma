import { NextResponse } from 'next/server';
import { getSessionCookie, verifySession } from '@/lib/auth/session';
import { getUserById } from '@/lib/auth/db';

export async function GET() {
  const token = await getSessionCookie();
  if (!token) {
    return NextResponse.json({ user: null });
  }

  const session = await verifySession(token);
  if (!session) {
    return NextResponse.json({ user: null });
  }

  const user = await getUserById(session.uid);
  if (!user) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture,
    },
  });
}
