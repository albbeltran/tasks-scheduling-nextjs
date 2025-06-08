-- CreateEnum
CREATE TYPE "task_status" AS ENUM ('pending', 'running', 'completed', 'failed');

-- CreateTable
CREATE TABLE "priorities" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(20) NOT NULL,

    CONSTRAINT "priorities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "arrival_time" TIMESTAMPTZ(6) NOT NULL,
    "duration" INTEGER NOT NULL,
    "status" "task_status" NOT NULL DEFAULT 'pending',
    "priority_id" INTEGER,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scheduling_runs" (
    "id" SERIAL NOT NULL,
    "run_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "description" VARCHAR(255),

    CONSTRAINT "scheduling_runs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "processes" (
    "id" SERIAL NOT NULL,
    "scheduling_run_id" INTEGER NOT NULL,
    "task_id" INTEGER NOT NULL,
    "started_at" TIMESTAMPTZ(6),
    "ended_at" TIMESTAMPTZ(6),
    "execution_order" INTEGER NOT NULL,

    CONSTRAINT "processes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "task_status_history" (
    "id" SERIAL NOT NULL,
    "task_id" INTEGER NOT NULL,
    "status" "task_status" NOT NULL,
    "changed_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "task_status_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "priorities_description_key" ON "priorities"("description");

-- CreateIndex
CREATE UNIQUE INDEX "tasks_name_key" ON "tasks"("name");

-- CreateIndex
CREATE INDEX "idx_tasks_arrival_time" ON "tasks"("arrival_time");

-- CreateIndex
CREATE INDEX "idx_tasks_priority_id" ON "tasks"("priority_id");

-- CreateIndex
CREATE INDEX "idx_scheduling_run_id" ON "scheduling_runs"("id");

-- CreateIndex
CREATE INDEX "idx_processes_scheduling_run_id" ON "processes"("scheduling_run_id");

-- CreateIndex
CREATE INDEX "idx_processes_task_id" ON "processes"("task_id");

-- CreateIndex
CREATE INDEX "idx_processes_execution_order" ON "processes"("scheduling_run_id", "execution_order");

-- CreateIndex
CREATE INDEX "idx_task_status_history_task_id" ON "task_status_history"("task_id");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_priority_id_fkey" FOREIGN KEY ("priority_id") REFERENCES "priorities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processes" ADD CONSTRAINT "processes_scheduling_run_id_fkey" FOREIGN KEY ("scheduling_run_id") REFERENCES "scheduling_runs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "processes" ADD CONSTRAINT "processes_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "task_status_history" ADD CONSTRAINT "task_status_history_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
