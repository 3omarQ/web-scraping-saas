import { GetWorkflowsForUser } from "@/actions/workflows/getWorkflowsForUser";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import UserWorkflowsClient from "./_components/UserWorkflowsClient";

export const dynamic = "force-dynamic";

export default async function Page() {
  const workflows = await GetWorkflowsForUser();

  if (!workflows) {
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full ">
      <UserWorkflowsClient workflows={workflows} />
    </div>
  );
}
