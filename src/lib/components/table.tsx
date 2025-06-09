'use client'

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { tasks } from '@prisma/client';

export default function TasksTable({ tasks }: { tasks: tasks[] })  {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSchedule = async () => {
    setLoading(true);
    try {
      const countRes = await fetch('/api/tasks/pending-count');
      const { count } = await countRes.json();
  
      if (count === 0) {
        toast.error('No pending tasks to schedule.');
        setLoading(false);
        return;
      }

      await fetch('http://localhost:3000/', {
        method: 'POST',
      });
      toast.success('Scheduling completed!');
      window.location.href = '/scheduling';
    } catch (err) {
      console.log(err)
      toast.error('Failed to schedule tasks');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full py-4">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleSchedule}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Scheduling...' : 'Schedule Tasks'}
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-zinc-400 text-center italic">No tasks found. Add some tasks!</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow border border-zinc-800 bg-zinc-900">
          <table className="min-w-full text-sm text-left text-zinc-300">
            <thead className="bg-zinc-800 text-zinc-400">
              <tr>
                <th className="px-4 py-3 border-b border-zinc-700">Name</th>
                <th className="px-4 py-3 border-b border-zinc-700">Arrival Time</th>
                <th className="px-4 py-3 border-b border-zinc-700">Duration (s)</th>
                {/* <th className="px-4 py-3 border-b border-zinc-700">Priority</th> */}
                <th className="px-4 py-3 border-b border-zinc-700">Status</th>
              </tr>
            </thead>
            <tbody>
            {Array.isArray(tasks) && tasks.map((task: any) => (
                <tr key={task.id} className="hover:bg-zinc-800 transition">
                  <td className="px-4 py-3 border-b border-zinc-800">{task.name}</td>
                  <td className="px-4 py-3 border-b border-zinc-800">
                    {new Date(task.arrival_time).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 border-b border-zinc-800">{task.duration}</td>
                  {/* <td className="px-4 py-3 border-b border-zinc-800">
                    {task.priority?.description ?? 'N/A'}
                  </td> */}
                  <td className="px-4 py-3 border-b border-zinc-800 capitalize">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${task.status === 'completed'
                        ? 'bg-green-700 text-white'
                        : task.status === 'pending'
                          ? 'bg-yellow-600 text-white'
                          : task.status === 'failed'
                            ? 'bg-red-600 text-white'
                            : 'bg-blue-600 text-white'
                      }`}>
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
