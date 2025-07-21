import { ExecutionEnvironment } from "@/types/executor";
import { ExtractHtmlExecutor } from "./ExtractHtmlExecutor";
import { ExtractTextFromElementExecutor } from "./ExtractTextFromElementExecutor";
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor";

type ExecutorFn = (environment:ExecutionEnvironment)=> Promise<boolean>;


export const ExecutorRegistry = {
    LAUNCH_BROWSER : LaunchBrowserExecutor,
    EXTRACT_HTML: ExtractHtmlExecutor,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
}