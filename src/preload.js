// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
/*const { contextBridge, ipcRenderer } = require("electron");
//////////////crééer une API(electronAPI qui va envoyé un message(titre) )///////////
contextBridge.exposeInMainWorld("axios", {
    getInfos: async () => ipcRenderer.send("get-Infos"),
    onUpdateInfos: async (callback) => {
        ipcRenderer.on("update-infos", callback);
    },
});*/
