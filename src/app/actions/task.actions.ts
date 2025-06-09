'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import startProducer from '@/lib/producer';

export async function createTask(form: {
  name: string;
  duration: number;
  arrival_time: string;
  priority_id: number | null;
  status: string;
}) {
  try {
    const newTask = await prisma.tasks.create({
      data: {
        name: form.name,
        duration: parseInt(String(form.duration)),
        arrival_time: new Date(form.arrival_time)
      },
    });

    await startProducer(JSON.stringify(newTask));
    revalidatePath('/tasks');

    return { success: true };
  } catch (error) {
    console.error('Error creating task:', error);
    return { success: false, error: 'Failed to create task\nEnsure name is unique and try again' };
  }
}
