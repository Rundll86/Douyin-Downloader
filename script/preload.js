const { contextBridge, ipcRenderer } = require("type-electron");
contextBridge.exposeInMainWorld("getSelector", (e) => {
    let result = [];
    e.forEach(e => {
        let current = "";
        e.element ? current += e.element : current += "*";
        e.id ? current += `#${e.id}` : null;
        e.classNames ? current += `.${e.classNames.join(".")}` : null;
        e.attrs?.forEach(e => {
            current += `[${e.name}=${e.value}]`;
        });
        e.nthChild ? current += `:nth-child(${e.nthChild})` : null;
        result.push(current);
    });
    return result.join(" ");
});
contextBridge.exposeInMainWorld("downloadFile", (url) => {
    ipcRenderer.send("download-file", { url });
});