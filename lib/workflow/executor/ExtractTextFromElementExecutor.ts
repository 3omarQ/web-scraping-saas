import { Environment, ExecutionEnvironment } from "@/types/executor"
import { load } from 'cheerio'

export async function ExtractTextFromElementExecutor(environment:ExecutionEnvironment): Promise<boolean>{
    try {
        const selector = environment.getInput("Selector");
        if(!selector){
            environment.log.error("selector is not provided")
            return false
        }
        const html = environment.getInput("Html")
        if(!html){
            environment.log.error("Html is not defined")
            return false
        }
        
        const $ = load(html);
        const innerHTML = $(selector).text();
        
        if (innerHTML === ""){
            environment.log.error("innerHTML non-existant")
            return false

        };

        environment.setOutput("Extracted text",innerHTML)

    } catch (error:any) {
        environment.log.error(error.message)
    }

    return  true
}