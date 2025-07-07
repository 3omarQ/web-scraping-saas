"use client"
import React, { useCallback, useState } from 'react'
import { Dialog,DialogTrigger,DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createWorkflowSchemaType } from '@/schema/workflow'
import { createWorkflowSchema } from '@/schema/workflow'

import { z} from "zod";
import {Form, FormControl, FormDescription,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { useMutation } from '@tanstack/react-query'
import { CreateWorkflow } from '@/actions/workflows/createWorkflow'
import { toast } from 'sonner'
import { Loader2Icon } from 'lucide-react'

function CreateWorkflowDialog({triggerText}:{triggerText?: string}) {
    const [open,setOpen] = useState(false)

    const form = useForm<createWorkflowSchemaType>({
        resolver: zodResolver(createWorkflowSchema),
        defaultValues: {
        name: "",
        },
    })

    const {mutate,isPending}=useMutation(
        {
            mutationFn: CreateWorkflow,
            onSuccess: ()=>{
                toast.success("Workflow created",{ id: "create-workflow"})
            },
            onError: ()=>{
                toast.error("Error creating workflow", {id:"create-workflow"})
            }
        }
    );

    const onSubmit = useCallback((values:createWorkflowSchemaType)=>{
        toast.loading("Creating workflow..",{id:"create-workflow"})
        mutate(values)
    },[mutate]) 

  return (
    <div>
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <Button>{triggerText ?? "Create workflow"}</Button>
            </DialogTrigger>
            <DialogContent>
                <div className='flex flex-col gap-4'>
                    <p className='text-lg font-bold'>Create Workflow</p>
                    <Separator></Separator>
                    <div className='p-6 '>
                        <Form {...form} >
                            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col gap-8'>
                                 <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="name" {...field} />
                                                </FormControl>
                                                
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                    <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="description" {...field} />
                                                </FormControl>
                                                
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                    />
                                    <Button type="submit" disabled={isPending}  className='w-full'>
                                        {!isPending && "Proceed"}
                                        {isPending && <Loader2Icon/>}
                                    </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default CreateWorkflowDialog