import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const historicalRuns = await prisma.scheduling_runs.findMany({
            orderBy: {
                run_at: 'desc',
            },
            include: {
                processes: {
                    orderBy: {
                        execution_order: 'asc',
                    },
                    include: {
                        task: {
                            select: {
                                id: true,
                                name: true,
                                duration: true,
                                arrival_time: true,
                                status: true,
                                priority_id: true,
                            },
                        },
                    },
                },
            },
        });

        return NextResponse.json(historicalRuns, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json('Failed to fetch scheduling history', { status: 500 });

    }
}