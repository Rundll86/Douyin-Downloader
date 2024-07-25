import { saveDirName } from "../../common/constants";
import { CrawlRule } from "../../common/dataStructs";
import * as saveTool from "save-tool";
import fs from "fs";
export function dumpCrawlRules(target: CrawlRule[]) {
    fs.writeFileSync(saveTool.useSaveDir(saveDirName, "crawl-rules.json"), JSON.stringify(target));
};
export function readCrawlRules() {
    let crawlRules: CrawlRule[];
    try {
        crawlRules = JSON.parse(fs.readFileSync(saveTool.useSaveDir(saveDirName, "crawl-rules.json")).toString());
    } catch {
        crawlRules = [];
        dumpCrawlRules(crawlRules);
    };
    return crawlRules;
};