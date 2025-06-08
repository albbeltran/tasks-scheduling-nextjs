'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function CreateTaskModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    duration: '',
    arrival_time: '',
    priority: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await fetch('/api/tasks', { method: 'POST', body: JSON.stringify(form) });
    const data = await result.json()
    if (!result.ok) return toast.error(data.message)
    toast.success('Tarea creada exitosamente')
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Create Task
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4">New Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Task Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Duration (seconds)</label>
                <input
                  type="number"
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  required
                  className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Arrival Time</label>
                <input
                  type="datetime-local"
                  value={form.arrival_time}
                  onChange={(e) => setForm({ ...form, arrival_time: e.target.value })}
                  required
                  className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Priority</label>
                <input
                  type="text"
                  value={form.priority}
                  onChange={(e) => setForm({ ...form, priority: e.target.value })}
                  className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm"
                  placeholder="Optional"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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
