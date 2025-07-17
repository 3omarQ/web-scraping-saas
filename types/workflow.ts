import { AppNode } from "./appNode";

export enum WorkflowStatus{
    DRAFT = "Draft",
    PUBLISHED = "Published",
}

export type WorkflowExecutionPlanPhase = {
    phase:number;
    nodes:AppNode[];
};

export type WorkflowExecutionPlan = WorkflowExecutionPlanPhase[]

export enum WorkflowExecutionStatus {
    CREATED = "Created",
    PENDING = "Pending",
    RUNNING = "Running",
    FINISHED = "Finished",
    FAILED = "Failed"
}

export enum WorkflowExecutionTrigger {
    MANUAL = "Manual"
}