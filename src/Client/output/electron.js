/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Desktop/electron.js":
/*!*********************************!*\
  !*** ./src/Desktop/electron.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const { app, BrowserWindow } = __webpack_require__(/*! electron */ \"electron\")\r\nconst path = __webpack_require__(/*! path */ \"path\")\r\n\r\nconst createWindow = () => {\r\n    const win = new BrowserWindow({\r\n        width: 800,\r\n        height: 600,\r\n        webPreferences: {\r\n            // The __dirname string points to the path of the currently executing script (in this case, your project's root folder).\r\n            // The path.join API joins multiple path segments together, creating a combined path string that works across all platforms.\r\n            preload: path.join(__dirname, 'scripts/preload.js'),\r\n            nodeIntegration: true,\r\n        }\r\n    });\r\n\r\n    if (true) {\r\n        win.webContents.openDevTools();\r\n        win.loadURL(`http://127.0.01:8080`);\r\n      } else {}\r\n}\r\n\r\napp.whenReady().then(() => {\r\n    createWindow()\r\n\r\n    app.on('activate', () => {\r\n        if (BrowserWindow.getAllWindows().length === 0) createWindow()\r\n    })\r\n})\r\n\r\napp.on('window-all-closed', () => {\r\n    if (process.platform !== 'darwin') app.quit()\r\n})\n\n//# sourceURL=webpack://electron-playground/./src/Desktop/electron.js?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("electron");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/Desktop/electron.js");
/******/ 	
/******/ })()
;