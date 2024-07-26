import { saveDirName } from "../../common/constants";
import { CrawlRule, Searcher } from "../../common/dataStructs";
import * as saveTool from "save-tool";
import fs from "fs";
export function dumpCrawlRules(target: CrawlRule[]) {
    target.forEach(e => {
        if (e.execute) {
            e.execute = e.execute.toString();
        };
    });
    fs.writeFileSync(saveTool.useSaveDir(saveDirName, "crawl-rules.json"), JSON.stringify(target));
};
export function readCrawlRules() {
    let crawlRules: CrawlRule[];
    try {
        crawlRules = JSON.parse(fs.readFileSync(saveTool.useSaveDir(saveDirName, "crawl-rules.json")).toString());
    } catch {
        crawlRules = [
            {
                field: "src",
                searchers: [
                    {
                        attrs: [
                            {
                                name: "data-e2e",
                                value: "note-container"
                            }
                        ]
                    },
                    {
                        element: "div"
                    },
                    {
                        element: "div"
                    },
                    {
                        element: "img"
                    }
                ],
                name: "下载当前图片"
            },
            {
                field: "src",
                searchers: [
                    {
                        element: "img"
                    }
                ],
                name: "下载所有图片",
                execute: (e: CrawlRule) => {
                    let searchers: Searcher[] = [
                        {
                            attrs: [
                                {
                                    name: "data-e2e",
                                    value: "note-container"
                                }
                            ]
                        },
                        {
                            element: "div",
                            nthChild: 2
                        }
                    ];
                    let element: HTMLDivElement = document.querySelector(window.getSelector(searchers));
                    let times = element.childElementCount;
                    function _run(index: number) {
                        if (index === 0) return;
                        let element = document.querySelector(window.getSelector([
                            {
                                attrs: [
                                    {
                                        name: "data-e2e",
                                        value: "note-container"
                                    }
                                ]
                            },
                            {
                                element: "div",
                            },
                            {
                                element: "div"
                            },
                            {
                                element: "img"
                            }
                        ]));
                        console.log(element.src);
                        window.downloadFile(element.src);
                        document.querySelector(window.getSelector([
                            {
                                attrs: [
                                    {
                                        name: "data-e2e",
                                        value: "note-container"
                                    }
                                ]
                            },
                            {
                                element: "div",
                            },
                            {
                                element: "span",
                                nthChild: 3
                            }
                        ])).click();
                        setTimeout(() => {
                            _run(index - 1);
                        }, 500);
                    };
                    _run(times);
                }
            },
            {
                field: "src",
                searchers: [
                    {
                        element: "video"
                    },
                    {
                        element: "source"
                    }
                ],
                name: "下载当前视频"
            }
        ];
        dumpCrawlRules(crawlRules);
    };
    return crawlRules;
};