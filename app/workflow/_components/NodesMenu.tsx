"use client";

import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TaskType } from "@/types/task";
import { TaskRegisty } from "@/lib/workflow/task/registry";
import { Button } from "@/components/ui/button";

function NodesMenu() {
  return (
    <aside className="w-[340px] border-r-2 border-separate h-full p-2 px-4 overflow-auto">
      <Accordion
        className="w-full"
        type="multiple"
        defaultValue={["extraction", "interaction"]}
      >
        <AccordionItem value="extraction">
          <AccordionTrigger className="font-bold">Extraction</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            <TaskMenuBtn taskType={TaskType.EXTRACT_HTML}></TaskMenuBtn>
            <TaskMenuBtn
              taskType={TaskType.EXTRACT_TEXT_FROM_ELEMENT}
            ></TaskMenuBtn>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="interaction">
          <AccordionTrigger className="font-bold">Interaction</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            <TaskMenuBtn taskType={TaskType.FILL_INPUT}></TaskMenuBtn>
          </AccordionContent>
          <AccordionContent className="flex flex-col gap-2">
            <TaskMenuBtn taskType={TaskType.CLICK_ELEMENT}></TaskMenuBtn>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}

export default NodesMenu;

function TaskMenuBtn({ taskType }: { taskType: TaskType }) {
  const task = TaskRegisty[taskType];
  const onDragStart = (event: React.DragEvent, type: TaskType) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Button
      variant={"secondary"}
      className="flex justify-between w-full items-center border gap-2"
      draggable={true}
      onDragStart={(event) => onDragStart(event, taskType)}
    >
      <div className="flex gap-2 w-full">
        <task.icon size={20}></task.icon>
        {task.label}
      </div>
    </Button>
  );
}
