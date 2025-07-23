import { Environment, ExecutionEnvironment } from "@/types/executor";


export async function ExtractHtmlExecutor(environment:ExecutionEnvironment): Promise<boolean>{
    try {
        const html = await environment.getPage()?.content();
        if(!html || html===undefined){
            environment.log.error("No HTML Provided");
            return false
        }
        environment.setOutput("Html",html!);

    } catch (error:any) {
        environment.log.error(error.message)
        return false
    }
    return  true;
}