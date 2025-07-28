import { waitFor } from "@/lib/helper/waitFor";
import { Environment, ExecutionEnvironment } from "@/types/executor";

export async function ClickElementExecutor(
  environment: ExecutionEnvironment
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("selector is not provided");
      return false;
    }

    await environment.getPage()!.click(selector);

    await waitFor(10000);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
