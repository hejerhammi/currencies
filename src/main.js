const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const path = require("path");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
    app.quit();
}

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false, // Ne pas activer l'intégration Node.js
            contextIsolation: true, // Activer l'isolation du contexte pour empêcher l'évaluation dynamique du code
            sandbox: true, // Activer le bac à sable pour renforcer la sécurité
            // Définir une politique de sécurité du contenu pour empêcher l'évaluation dynamique du code
            // et limiter les sources autorisées pour les ressources
            contentSecurityPolicy:
                "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self'",

            preload: path.join(__dirname, "preload.js"),
        },
    });

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "index.html"));

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
};
//////////////////créer une deuxième fenetre

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
/*ipcMain.on("get-Infos", (e) => {
    axios
        .get("https://theforexapi.com/api/latest?base=USD")
        .then((reponse) => {
            // console.log(reponse.data);
            e.sender.send("update-infos", reponse.data.rates);
            //console.log(reponse.data.rates);
        })
        .catch((err) => console.log("erreur"));
});
*/
