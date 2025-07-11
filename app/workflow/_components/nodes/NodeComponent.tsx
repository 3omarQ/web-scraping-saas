import { memo } from "react";
import {NodeProps} from "@xyflow/react"
import NodeCard from "./NodeCard";
import NodeHeader from "./NodeHeader";
import { AppNodeData } from "@/types/appNode";
import { TaskRegisty } from "@/lib/workflow/task/registry";
import {NodeInputs,NodeInput} from "./NodeInputs";

const NodeComponent= memo((props:NodeProps)=>{
    const nodeData = props.data as AppNodeData
    const task = TaskRegisty[nodeData.type]
    console.log(task)
    return (
        <NodeCard isSelected={props.selected} nodeId={props.id}>
            <NodeHeader taskType = {nodeData.type}/>
            <NodeInputs>
                {
                    task.inputs.map((input,id)=>(
                        <NodeInput key={id} input={input} nodeId={props.id}/>
                    ))
                }
            </NodeInputs>
        </NodeCard>
    )
})

export default NodeComponent

NodeComponent.displayName="Node"