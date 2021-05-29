import puppeteer, { EvaluateFn } from 'puppeteer';

const BATCH_SIZE = 5;

export default class ScrapperBehavior {
  private browser?: puppeteer.Browser;

  public async init(option?: object): Promise<void> {
    this.browser = await puppeteer.launch(option);
  }

  public close(): void {
    if (this.browser) {
      this.browser.close();
    }
  }

  protected async single(url: string, cb: EvaluateFn<any>): Promise<any> {
    if (this.browser) {
      const page = await this.browser.newPage();
      await page.goto(url, { timeout: 0 });
      await page.waitForSelector('body');
      const results = await page.evaluate(cb);
      await page.close();
      return results;
    }
    throw 'Browser is not initialized';
  }

  protected async multiple(urls: string[], cb: EvaluateFn<any>): Promise<any[]> {
    if (this.browser) {
      let results: any[] = [];

      for (let i = 0; i < urls.length; i += BATCH_SIZE) {
        const urlsForBatch = urls.slice(i, i + BATCH_SIZE);
        results = [...results, ...await Promise.all(urlsForBatch.map((url) => this.single(url, cb)))];
      }

      return results;
    }
    throw 'Browser is not initialized';
  }
}