import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import startProducer from '@/lib/producer';

export async function GET() {
  try {
    const tasks = await prisma.tasks.findMany({
      orderBy: {
        arrival_time: 'desc',
      },
      include: {
        priority: true,
      },
    });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json({ message: 'Error fetching tasks', error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const newTask = await prisma.tasks.create({
      data: {
        name: body.name,
        duration: parseInt(body.duration),
        arrival_time: new Date(body.arrival_time),
        status: body.status,
        priority_id: body.priority_id
      },
    });

    startProducer(JSON.stringify(newTask));
    revalidatePath('/tasks');

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ message: 'Error creating task', error }, { status: 500 });
  }
}