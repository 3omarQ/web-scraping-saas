"use client"

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { WorkflowStatus } from '@/types/workflow'
import { Workflow } from '@prisma/client'
import { FileTextIcon, PlayIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import DeleteConfirmation from './DeleteConfirmation'

function WorkflowCard({workflow}:{workflow:Workflow}) {
    const isDraft = workflow.status == WorkflowStatus.DRAFT
    const [showDeleteDialog,setShowDeleteDialog]=useState(false)
  
    return (
        <Card>
            <CardContent className='p-4 flex items-center'>
                <DeleteConfirmation open={showDeleteDialog} setOpen={setShowDeleteDialog} workflowId={workflow.id}></DeleteConfirmation>
                <div className='w-10 p-2 items-center'>
                    {isDraft ? (<FileTextIcon className="h-5 w-5" />) : (<PlayIcon className="h-5 w-5 text-white"/>) } 
                </div>
                <div>
                    <Link href={`/workflow/editor/${workflow.id}`}>
                        <span className="text-md font-semibold">{workflow.name}</span>
                    </Link>
                    {isDraft && <span className="text-xs text-slate-400 ml-2">(draft)</span>}
                </div>
                <div className='flex ml-auto gap-4'>
                    
                        <Link href={`/workflow/editor/${workflow.id}`}>
                            <Button variant="outline" size="sm">
                            Edit
                            </Button>
                        </Link>
                    
                        <Button variant="destructive" size="sm" onClick={()=>{setShowDeleteDialog(true)}}>
                            Delete
                        </Button>
                    
                </div>
            </CardContent>
        </Card>
    )
}

export default WorkflowCard