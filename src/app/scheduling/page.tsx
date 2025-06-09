'use client';

import React, { useEffect, useState } from 'react';
import { SchedulingRunData } from '@/lib/types/scheduling';

export default function SchedulingHistory() {
  const [history, setHistory] = useState<SchedulingRunData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('/api/schedules');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: SchedulingRunData[] = await response.json();
        setHistory(data);
      } catch (err: any) {
        setError(err.message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-white mb-6">Scheduling History</h1>
        <p>Loading historical data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-white mb-6">Scheduling History</h1>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!history || history.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-white mb-6">Scheduling History</h1>
        <p>No scheduling runs found.</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-white mb-6">Scheduling History</h1>

      {history.map((run) => (
        <div
          key={run.id}
          className="bg-zinc-900 border border-zinc-800 shadow-lg rounded-xl p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-white">
              Run ID: {run.id}
            </h2>
            <p className="text-sm text-zinc-400">
              Run at: {new Date(run.run_at).toLocaleString()}
            </p>
          </div>

          {run.description && (
            <p className="text-zinc-400 text-sm italic mb-4">{run.description}</p>
          )}

          {run.processes.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-zinc-800 text-zinc-300 text-left">
                    <th className="py-3 px-4 border-b border-zinc-700">#</th>
                    <th className="py-3 px-4 border-b border-zinc-700">Task Name</th>
                    <th className="py-3 px-4 border-b border-zinc-700">Task ID</th>
                    <th className="py-3 px-4 border-b border-zinc-700">Duration (s)</th>
                    <th className="py-3 px-4 border-b border-zinc-700">Arrival</th>
                    <th className="py-3 px-4 border-b border-zinc-700">Start Time</th>
                    <th className="py-3 px-4 border-b border-zinc-700">End Time</th>
                  </tr>
                </thead>
                <tbody>
                  {run.processes.map((process, i) => (
                    <tr
                      key={process.id}
                      className="hover:bg-zinc-800 transition-colors"
                    >
                      <td className="py-2 px-4 border-b border-zinc-800 text-white">
                        {process.execution_order}
                      </td>
                      <td className="py-2 px-4 border-b border-zinc-800 text-white">
                        {process.task?.name || 'N/A'}
                      </td>
                      <td className="py-2 px-4 border-b border-zinc-800 text-white">
                        {process.task_id}
                      </td>
                      <td className="py-2 px-4 border-b border-zinc-800 text-white">
                        {process.task?.duration ?? 'N/A'}
                      </td>
                      <td className="py-2 px-4 border-b border-zinc-800 text-white">
                        {new Date(process.task?.arrival_time ?? '').toLocaleTimeString()}
                      </td>
                      <td className="py-2 px-4 border-b border-zinc-800 text-white">
                        {new Date(process.started_at).toLocaleTimeString()}
                      </td>
                      <td className="py-2 px-4 border-b border-zinc-800 text-white">
                        {new Date(process.ended_at).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-zinc-400">No processes recorded for this run.</p>
          )}
        </div>
      ))}
    </>
  );
};