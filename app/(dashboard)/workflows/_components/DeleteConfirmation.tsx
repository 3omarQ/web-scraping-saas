"use client"

import { DeleteWorkflow } from '@/actions/workflows/deleteWorkflow';
import { AlertDialog,AlertDialogCancel,AlertDialogContent,AlertDialogAction,AlertDialogDescription,AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner';
interface Props{
    open:boolean,
    setOpen:(open:boolean)=>(void),
    workflowId:string
}

function DeleteConfirmation({open,setOpen,workflowId}:Props) {
    const {mutate,isPending}=useMutation(
        {
            mutationFn: DeleteWorkflow,
            onSuccess: ()=>{
                toast.success("Workflow deleted",{ id: "delete-workflow"})
            },
            onError: ()=>{
                toast.error("Error deleting workflow", {id:"delete-workflow"})
            }
        }
    );
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        Are you sure you want to delete this workflow?

        <div className="mt-4 flex justify-end gap-2">
          <AlertDialogCancel className=''>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive hover:bg-destructive/80" disabled={isPending} onClick={
            ()=>{
                toast.loading("deleting workflow", {id: "delete-workflow"})
                mutate(workflowId)
            }
          }>
            Delete
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteConfirmation