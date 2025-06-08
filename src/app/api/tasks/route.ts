import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import startProducer from '@/lib/pub_task.queue';

export async function POST(request: Request) {
  const body = await request.json();
  try {
    // const newTask = await prisma.tasks.create({
    //   data: {
    //     name: body.name,
    //     duration: parseInt(body.duration),
    //     arrival_time: new Date(body.arrival_time),
    //     status: body.status, 
    //     priority_id: body.priority_id
    //   },
    // });

    startProducer(JSON.stringify(body))
    revalidatePath('/tasks');

    return NextResponse.json("newTask", { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json({ message: 'Error al crear la tarea', error }, { status: 500 });
  }
}