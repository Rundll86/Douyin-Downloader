import { app, BrowserWindow, Menu, MenuItemConstructorOptions } from "type-electron";
import * as saveTool from "save-tool";
import { saveDirName } from "../../common/constants";
import { CrawlRule } from "../../common/dataStructs";
import { readCrawlRules } from "./config";
saveTool.makeSaveRoot() ?
    saveTool.makeSaveDir(saveDirName) ?
        saveTool.createSaveFile(saveDirName, "crawl-rules.json")
        : null
    : null;
let crawlRules: CrawlRule[] = readCrawlRules();
app.on("ready", () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 720
    });
    win.loadURL("https://www.douyin.com");
    let menu: MenuItemConstructorOptions[] = [];
    crawlRules.forEach(e => {
        menu.push({
            label: e.name
        });
    });
    Menu.setApplicationMenu(
        Menu.buildFromTemplate([
            {
                label: "下载数据",
                submenu: menu,
                click() {
                    if (menu.length === 0) {
                        alert("没有配置任何抓取规则！")
                    };
                }
            },
            {
                label: "设置",
                submenu: [
                    {
                        label: "基础配置"
                    },
                    {
                        label: "抓取规则列表"
                    }
                ]
            },
            {
                label: "百宝箱",
                submenu: [
                    {
                        label: "Chromium开发工具",
                        submenu: [
                            {
                                label: "打开",
                                click: () => win.webContents.openDevTools()
                            },
                            {
                                label: "关闭",
                                click: () => win.webContents.closeDevTools()
                            }
                        ]
                    }
                ]
            }
        ])
    );
});
app.on("window-all-closed", () => app.quit());