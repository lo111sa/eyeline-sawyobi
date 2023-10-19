import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
/* import icon from '../../resources/icon.png?asset' */
import { AddProduct, getProducts } from './controllers/products'
import { getReceivedProductInfo, receiveProduct } from './controllers/receives'
import { getStuffList } from './controllers/staff'
import { getIssuedProductInfo, issueProduct } from './controllers/issued'
const sqlite3 = require('sqlite3')

export const db = new sqlite3.Database('D:/DB.db')

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 670,
    show: false,

    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      devTools: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

//Get Products
ipcMain.on('send', getProducts)

//Add new Product
ipcMain.on('add-new-product', AddProduct)

//Get product recive info by id
ipcMain.on('received-by-id', getReceivedProductInfo)

//Receive product
ipcMain.on('receive', receiveProduct)

//STAFF
//Get staff list
ipcMain.on('staff', getStuffList)

//Issue

ipcMain.on('get-issued', getIssuedProductInfo)
ipcMain.on('issue', issueProduct)
