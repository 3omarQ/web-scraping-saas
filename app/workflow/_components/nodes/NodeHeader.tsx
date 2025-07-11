"use client"
import { Badge } from '@/components/ui/badge'
import { TaskRegisty } from '@/lib/workflow/task/registry'
import { TaskType } from '@/types/task'
import React from 'react'

function NodeHeader({taskType}:{taskType:TaskType}) {
    const task= TaskRegisty[taskType]
  return (
    <div className='flex items-center gap-2 p-2'>
        <div className='flex justify-between items-center w-full'>
            <p className='font-bold uppercase'>
                {task.label}
            </p>
            <div>{task.isEntryPoint && <Badge>Entry point</Badge>}</div>
        </div>
    </div>
    
  )
}

export default NodeHeader