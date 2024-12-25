(() => { // webpackBootstrap
"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: external "electron"
const external_electron_namespaceObject = require("electron");
;// CONCATENATED MODULE: ./index.ts

function startApp() {
    external_electron_namespaceObject.app.whenReady().then(()=>{
        const win = new external_electron_namespaceObject.BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });
        win.loadURL('http://localhost:3000');
    // win.loadFile(path.resolve(__dirname, '../renderer/index.html'))
    });
}
startApp();

module.exports = __webpack_exports__;
})()
;