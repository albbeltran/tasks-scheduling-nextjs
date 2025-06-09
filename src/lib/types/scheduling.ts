export interface TaskDetails {
    id: number;
    name: string;
    duration: number;
    arrival_time: string;
    status: string;
    priority_id: number | null;
}

export interface ProcessData {
    id: number;
    task_id: number;
    execution_order: number;
    started_at: string;
    ended_at: string;
    task: TaskDetails;
}

export interface SchedulingRunData {
    id: number;
    run_at: string;
    description: string | null;
    processes: ProcessData[];
}