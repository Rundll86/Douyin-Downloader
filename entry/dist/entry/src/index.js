"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_electron_1 = require("type-electron");
const saveTool = __importStar(require("save-tool"));
const constants_1 = require("../../common/constants");
const config_1 = require("./config");
saveTool.makeSaveRoot() ?
    saveTool.makeSaveDir(constants_1.saveDirName) ?
        saveTool.createSaveFile(constants_1.saveDirName, "crawl-rules.json")
        : null
    : null;
let crawlRules = (0, config_1.readCrawlRules)();
type_electron_1.app.on("ready", () => {
    const win = new type_electron_1.BrowserWindow({
        width: 1280,
        height: 720
    });
    win.loadURL("https://www.douyin.com");
    let menu = [];
    crawlRules.forEach(e => {
        menu.push({
            label: e.name
        });
    });
    type_electron_1.Menu.setApplicationMenu(type_electron_1.Menu.buildFromTemplate([
        {
            label: "下载数据",
            submenu: menu,
            click() {
                if (menu.length === 0) {
                    alert("没有配置任何抓取规则！");
                }
                ;
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
    ]));
});
type_electron_1.app.on("window-all-closed", () => type_electron_1.app.quit());
