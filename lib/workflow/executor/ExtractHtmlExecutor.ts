import { Environment, ExecutionEnvironment } from "@/types/executor";


export async function ExtractHtmlExecutor(environment:ExecutionEnvironment): Promise<boolean>{
    try {
        const html = await environment.getPage()?.content();
        environment.setOutput("Html",html!)        
    } catch (error:any) {
        environment.log.error(error.message)
    }
    return  true;
}