"use client"
import { Input } from '@/components/ui/input'
import { TaskParam, TaskParamType } from '@/types/task'
import React, { useCallback } from 'react'
import StringParam from './param/StringParam'
import { useReactFlow } from '@xyflow/react'
import { AppNode } from '@/types/appNode'

//we need nodeId so we can update and save the node with the params
function NodeParamField({param,nodeId}:{param:TaskParam, nodeId:string}) {
    const {updateNodeData, getNode} = useReactFlow();
    const node = getNode(nodeId) as AppNode
    const value = node?.data.inputs?.[param.name];
    console.log(value)

    const updateNodeParamValue = useCallback((newValue:string)=>{
        updateNodeData(nodeId,{
            inputs:{
                ...node?.data.inputs,
                [param.name]:newValue
            }
        })
    },[
        nodeId,updateNodeData,param.name,node?.data.inputs
    ])

  switch(param.type){
    case TaskParamType.STRING:
        return <StringParam param={param} value={value} updateNodeParamValue={updateNodeParamValue} />

    default:
        return <div className='w-full'>
            <p className='text-xs'>default</p>
        </div>
  }
}

export default NodeParamField