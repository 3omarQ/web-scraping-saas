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