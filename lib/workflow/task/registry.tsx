import { ExtractHtmlTask } from "./ExtractHtml";
import { ExtractTextFromElementTask } from "./ExtractTextFromElement";
import { LaunchBrowserTask } from "./LaunchBrowser";

export const TaskRegisty = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  EXTRACT_HTML: ExtractHtmlTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
};
