import { app, BrowserWindow, clipboard, dialog, ipcMain, Menu, MenuItemConstructorOptions } from "type-electron";
import * as saveTool from "save-tool";
import { saveDirName } from "../../common/constants";
import { CrawlRule } from "../../common/dataStructs";
import global from "../../common/global";
import { readCrawlRules } from "./config";
import axios from "axios";
import fs from "fs";
import md5 from "md5";
saveTool.makeSaveRoot();
saveTool.makeSaveDir(saveDirName);
saveTool.createSaveFile(saveDirName, "crawl-rules.json");
if (!fs.existsSync("downloaded")) {
    fs.mkdirSync("downloaded");
};
let crawlRules: CrawlRule[] = readCrawlRules();
function runJSAtWindow(win: BrowserWindow, js: Function, ...args: any[]) {
    return win.webContents.executeJavaScript(`(${js.toString()})(${args.map(e => JSON.stringify(e)).join(",")})`);
};
app.on("ready", () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            preload: saveTool.fromWorkdir("script/preload.js"),
            nodeIntegration: true
        }
    });
    win.loadURL("https://www.douyin.com");
    let menu: MenuItemConstructorOptions[] = [];
    crawlRules.forEach(e => {
        menu.push({
            label: e.name,
            click() {
                e.execute ? runJSAtWindow(win, new Function(`(${e.execute})(arguments[0])`), e) : runJSAtWindow(win, (e: CrawlRule) => {
                    let element = document.querySelector(window.getSelector(e.searchers));
                    console.log(element[e.field]);
                    window.downloadFile(element[e.field]);
                }, e);
            }
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
                label: "工具",
                submenu: [
                    {
                        label: "Chromium开发工具",
                        click() {
                            win.webContents.openDevTools();
                        }
                    },
                    {
                        label: "跳转页面",
                        click() {
                            let url = clipboard.readText();
                            if (!dialog.showMessageBoxSync(win, {
                                message: url,
                                buttons: ["确定", "取消"]
                            })) {
                                win.loadURL(url);
                            };
                        }
                    }
                ]
            }
        ])
    );
    ipcMain.on("download-file", (_, e) => {
        console.log(e.url);
        axios({
            url: e.url,
            method: "get",
            responseType: "arraybuffer"
        }).then(f => {
            fs.writeFileSync(`downloaded/${md5(f.data)}.png`, f.data);
        }).catch(e => console.error(e.response.data.toString()));
    });
});
app.on("window-all-closed", () => app.quit());