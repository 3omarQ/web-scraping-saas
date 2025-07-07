import { Description } from "@radix-ui/react-toast";
import {z} from "zod";

export const createWorkflowSchema = z.object({
    name : z.string().min(2),
    description : z.string().max(80).optional(),
})

export type createWorkflowSchemaType = z.infer<typeof createWorkflowSchema>