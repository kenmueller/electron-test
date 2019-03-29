const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const url = require('url')
const path = require('path')

let mainWindow
let messageWindow

app.on('ready', showMainWindow)

function showMainWindow() {
	mainWindow = new BrowserWindow({})
	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}))
	Menu.setApplicationMenu(Menu.buildFromTemplate([
		{
			label: 'File',
			submenu: [
				{
					label: 'Show message',
					click() {
						showMessageWindow('Blank message')
					}
				},
				{
					label: 'Quit',
					accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
					click() {
						app.quit()
					}
				}
			]
		}
	]))
}

ipcMain.on('message:send', showMessageWindow)

function showMessageWindow(_event, message) {
	messageWindow = new BrowserWindow({
		width: 200,
		height: 300,
		title: message
	})
	messageWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'message.html'),
		protocol: 'file:',
		slashes: true
	}))
	Menu.setApplicationMenu(Menu.buildFromTemplate([
		{
			label: 'File',
			submenu: [
				{
					label: 'Back',
					click() {
						messageWindow.close()
					}
				},
				{
					label: 'Quit',
					accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
					click() {
						app.quit()
					}
				}
			]
		}
	]))
}