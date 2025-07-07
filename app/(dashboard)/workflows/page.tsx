import { GetWorkflowsForUser } from '@/actions/workflows/getWorkflowsForUser'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Skeleton } from '@/components/ui/skeleton'
import { waitFor } from '@/lib/helper/waitFor'
import { AlertCircle } from 'lucide-react'
import React, { Suspense } from 'react'
import CreateWorkflowDialog from './_components/CreateWorkflowDialog'
import WorkflowCard from './_components/WorkflowCard'

function page() {
  return (
    <div className='flex-1 flex flex-col h-full'>
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-3xl font-bold'>Workflows</h1>
          <p className='text-muted-foreground'>Manage your workflows</p>
        </div>
        <CreateWorkflowDialog/>
      </div>
      <div className="h-full p-4">
        <Suspense fallback={<UserWorkflowsSkeleton/>}>
          <UserWorkflows/>
        </Suspense>
      </div>
    </div>
  )
}

function UserWorkflowsSkeleton(){
  return <div className="space-y-2">
    {[1,2,3,4].map((i)=>(
      <Skeleton key={i} className='h-32 w-full' />
    ))}
  </div>
}

async function UserWorkflows() {
  const workflows = await GetWorkflowsForUser();
  if(!workflows){
    return(<Alert variant={"destructive"}>
      <AlertCircle className='w-4 h-4'/>
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Something went wrong</AlertDescription>
    </Alert>);
  }
  if(workflows.length===0){
    return (
      <div className='flex flex-col gap-4 h-full items-center justify-center'>
        <p className='font-bold'>No workflows created yet</p>
        <CreateWorkflowDialog triggerText='Create your first workflow'/>
      </div>
    )
  }
  
  return (
      <div className='grid grid-cols-1 gap-4'>
        {workflows.map((workflow)=>(
          <WorkflowCard key={workflow.id} workflow={workflow}/>
        ))}
      </div>
    );
}

export default page;