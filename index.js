const { app, BrowserWindow, Menu } = require("type-electron");
app.on("ready", () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 720
    });
    win.loadURL("https://www.douyin.com");
    Menu.setApplicationMenu(null);
    win.webContents.openDevTools();
    win.webContents.on("did-navigate-in-page", (e) => {
        win.webContents.executeJavaScript("(" + (() => {
            let douyinHeader = document.getElementById("douyin-header");
            console.log(douyinHeader.parentElement.querySelector("img").src);
        }).toString() + ")()");
    });
});
app.on("window-all-closed", () => app.quit());