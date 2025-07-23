import { AppNode } from "./appNode";

export enum WorkflowStatus {
  DRAFT = "Draft",
  PUBLISHED = "Published",
}

export type WorkflowExecutionPlanPhase = {
  phase: number;
  nodes: AppNode[];
};

export type WorkflowExecutionPlan = WorkflowExecutionPlanPhase[];

export enum WorkflowExecutionStatus {
  CREATED = "Created",
  PENDING = "Pending",
  RUNNING = "Running",
  FINISHED = "Completed",
  FAILED = "Failed",
  STOPPED = "Stopped",
}

export enum WorkflowExecutionTrigger {
  MANUAL = "Manual",
}
