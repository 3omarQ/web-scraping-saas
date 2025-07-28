import { waitFor } from "@/lib/helper/waitFor";
import { Environment, ExecutionEnvironment } from "@/types/executor";

export async function FillInputExecutor(
  environment: ExecutionEnvironment
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("selector is not provided");
      return false;
    }
    const value = environment.getInput("Value");
    if (!value) {
      environment.log.error("value is not provided");
      return false;
    }

    await environment.getPage()!.type(selector, value);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
