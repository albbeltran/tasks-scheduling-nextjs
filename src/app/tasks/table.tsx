import prisma from '@/lib/prisma';

export default async function TasksTable() {
  const tasks = await prisma.tasks.findMany({
    orderBy: {
      arrival_time: 'asc',
    },
    include: {
      priority: true,
    },
  });

  return (
    <div className="w-full py-4">
      {tasks.length === 0 ? (
        <p className="text-gray-600 text-center">No tasks found. Add some tasks!</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Arrival Time</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Duration (ms)</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Priority</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-800">{task.name}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {new Date(task.arrival_time).toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">{task.duration}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {task.priority?.description || 'N/A'}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
