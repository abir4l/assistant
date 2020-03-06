const { app,BrowserWindow,ipcMain,Menu,MenuItem,globalShortcut}= require('electron');
const  Window= require('./Window');
const  path= require('path');
const  Store = require('electron-store');
require('electron-reload')(__dirname)


store = new Store()
store.set({
		name:'Feeds',
		active:'feeds'
});
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
	globalShortcut.register('CommandOrControl+Shift+.', () => {
			mainWindow.sendToFront('user-action','sidebar')
	});


}
