import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const count = await prisma.tasks.count({
      where: {
        status: 'pending',
      },
    });

    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error counting pending tasks:', error);
    return NextResponse.json({ message: 'Error counting pending tasks' }, { status: 500 });
  }
}
