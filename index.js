const { app,BrowserWindow,ipcMain,Menu,MenuItem }= require('electron');
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
	appMenu = Menu.getApplicationMenu();
	sidebar = new MenuItem({
			label:'Toggle Sidebar',
			click:function(){
				mainWindow.sendToFront('user-action','sidebar')
			}

	});
	viewMenu= Menu.getApplicationMenu().items.find( item => item.commandId == 22);
	viewMenu.submenu.append(sidebar);
	ipcMain.on('clicked',(event,data)=>{
		mainWindow.sendToFront('load',data)});
}
