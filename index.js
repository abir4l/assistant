const { app,BrowserWindow,ipcMain }= require('electron');
const  Window= require('./Window');
const  path= require('path');
require('electron-reload')(__dirname)

app.allowRenderedProcessReuse = true;
app.on('ready',createWindow);
app.on('window-all-closed',()=>{
	if(process.platform !== 'darwin'){
		app.quit()
	}
});

app.on('activate',()=>{
	createWindow();
});

function createWindow(){
	let mainWindow = new Window({file:path.join('design','index.html')});
	ipcMain.on('clicked',(event,data)=>{
		console.log(data);
		mainWindow.sendToFront('load',data)});
}
