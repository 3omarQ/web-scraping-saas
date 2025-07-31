import { Environment, ExecutionEnvironment } from "@/types/executor";
import { GoogleGenAI } from "@google/genai";

export async function ExtractDataWithAIExecutor(
  environment: ExecutionEnvironment
): Promise<boolean> {
  try {
    const apiKey = environment.getInput("Gemini API Token");
    if (!apiKey) {
      environment.log.error("API not provided");
    }

    const html = environment.getInput("Html");
    if (!html) {
      environment.log.error("Html not provided");
    }

    const prompt = environment.getInput("Prompt");
    if (!prompt) {
      environment.log.error("prompt not defined");
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: html + "\n//" + prompt,
    });

    if (response.text === undefined) {
      environment.log.error("no response provided");
    }

    environment.setOutput("Extracted Data", response.text!);
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
  return true;
}
