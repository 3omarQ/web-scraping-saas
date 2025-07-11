export enum TaskType{
    LAUNCH_BROWSER="LAUNCH_BROWSER",
    EXTRACT_HTML="EXTRACT_HTML"
}
export enum TaskParamType{
    STRING="STRING",
    BROWSER_INSTANCE="BROWSER_INSTANCE"
}
export interface TaskParam{
    name:string,
    type:TaskParamType,
    helperText?:string,
    required?:boolean,
    hideHandle?:boolean,
    [key:string]:any
}