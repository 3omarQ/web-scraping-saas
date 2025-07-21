import { waitFor } from '@/lib/helper/waitFor';
import { ExecutionEnvironment } from '@/types/executor';
import puppeteer from 'puppeteer';



export async function LaunchBrowserExecutor(environment:ExecutionEnvironment): Promise<boolean>{
    const websiteUrl = environment.getInput("Website URL")

    try {
        
        const browser = await puppeteer.launch({headless:false});
        environment.setBrowser(browser);
        const page = await browser.newPage();
        await page.goto(websiteUrl);
        environment.setPage(page)
        
    } catch (error:any) {
        environment.log.error(error)
        return false
    }
    
    return true;
}