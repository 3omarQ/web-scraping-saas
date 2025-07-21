import { Browser, Page } from "puppeteer";
import { TaskType } from "./task";
import { LogCollector } from "./log";

export type Environment = {
    browser?: Browser,
    page?:Page,
    // phases with phaseId as key
    phases:{
        //key will be nodeId, values will be inputs and outputs
        [key:string]:{
            inputs:Record<string,string>;
            outputs:Record<string,string>;
            
        }
    }
}

export type ExecutionEnvironment = {
    getInput(name:string):string,
    setOutput(name:string,value:string):void,
    
    getBrowser():Browser|undefined,
    setBrowser(browser:Browser):void,
    
    getPage():Page|undefined,
    setPage(page:Page):void,

    log:LogCollector;
}