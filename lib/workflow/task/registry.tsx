import { ClickElement } from "./ClickElement";
import { ExtractDataWithAI } from "./ExtractDataWithAi";
import { ExtractHtmlTask } from "./ExtractHtml";
import { ExtractTextFromElementTask } from "./ExtractTextFromElement";
import { FillInputTask } from "./FillInput";
import { LaunchBrowserTask } from "./LaunchBrowser";

export const TaskRegisty = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  EXTRACT_HTML: ExtractHtmlTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
  FILL_INPUT: FillInputTask,
  CLICK_ELEMENT: ClickElement,
  EXTRACT_DATA_WITH_AI: ExtractDataWithAI,
};
