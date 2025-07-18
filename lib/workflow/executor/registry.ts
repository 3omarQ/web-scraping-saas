import { ExtractHtmlExecutor } from "./ExtractHtmlExecutor";
import { ExtractTextFromElementExecutor } from "./ExtractTextFromElementExecutor";
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor";

export const ExecutorRegistry = {
    LAUNCH_BROWSER : LaunchBrowserExecutor,
    EXTRACT_HTML: ExtractHtmlExecutor,
    EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementExecutor,
}