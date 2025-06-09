'use client';

import { useState, useTransition } from 'react';
import { createTask } from '@/app/actions/task.actions';
import toast from 'react-hot-toast';

export default function TaskForm({ onCreated }: { onCreated: () => void }) {
  const [form, setForm] = useState({ name: '', duration: '', arrival_time: '', priority_id: null, status: 'pending' });
  const [isOpen, setIsOpen] = useState(false);
  const [_, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const res = await createTask({
        ...form,
        duration: Number(form.duration),
        priority_id: form.priority_id ? Number(form.priority_id) : null,
      });

      if (res.success) {
        setIsOpen(false);
        toast.success("Task created successfully")
        onCreated()
      } else {
        toast.error(res.error || "Failed to create task");
      }
    });
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        + Create Task
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-100 rounded-2xl p-6 w-full max-w-md shadow-xl border border-gray-200 relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">New Task</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700">Task Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="text-black mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Duration (seconds)</label>
                <input
                  type="number"
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  required
                  className="text-black mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700">Arrival Time</label>
                <input
                  type="datetime-local"
                  value={form.arrival_time}
                  onChange={(e) => setForm({ ...form, arrival_time: e.target.value })}
                  required
                  className="text-black mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              {/* <div>
            <label className="block text-sm font-semibold text-gray-700">Priority</label>
            <input
              type="text"
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="text-black Optional"
            />
          </div> */}
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
