import { ExecutionEnvironment } from "@/types/executor";
import { ExtractHtmlExecutor } from "./ExtractHtmlExecutor";
import { ExtractTextFromElementExecutor } from "./ExtractTextFromElementExecutor";
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor";
import { FillInputExecutor } from "./FillInputExecutor";
import { ClickElementExecutor } from "./ClickElementExecutor";

type ExecutorFn = (environment: ExecutionEnvironment) => Promise<boolean>;

export const ExecutorRegistry = {
  LAUNCH_BROWSER: LaunchBrowserExecutor,
  EXTRACT_HTML: ExtractHtmlExecutor,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
  FILL_INPUT: FillInputExecutor,
  CLICK_ELEMENT: ClickElementExecutor,
};
