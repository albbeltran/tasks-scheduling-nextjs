import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';

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

    revalidatePath('/tasks');

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ message: 'Error al crear la tarea', error }, { status: 500 });
  }
}