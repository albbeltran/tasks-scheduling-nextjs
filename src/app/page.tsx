'use client'

import CreateTaskModal from "@/lib/components/create";
import TasksTable from "@/lib/components/table";
import { tasks } from "@prisma/client";
import { useEffect, useState } from "react";

export default function TasksPage() {
    const [tasks, setTasks] = useState<tasks[]>([]);

    const fetchTasks = async () => {
        const res = await fetch('/api/tasks');
        const data = await res.json();
        setTasks(data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <>
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold text-white mb-6">Tasks List</h1>

                <CreateTaskModal onCreated={fetchTasks} />
            </div>

            <TasksTable tasks={tasks} />
        </>
    );
}
