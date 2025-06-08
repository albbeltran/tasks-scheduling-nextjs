import CreateTaskModal from "./create";
import TasksTable from "./table";

export default function TasksPage() {

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6 text-center">Task List</h1>

            <CreateTaskModal />
            <TasksTable />
        </div>
    );
}
