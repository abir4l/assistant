const { app,BrowserWindow,ipcMain,Menu,MenuItem,globalShortcut}= require('electron');
const  path= require('path'); //nodejs path library
const  Store = require('electron-store'); //store for better data communication
require('electron-reload')(__dirname)// instant reload html and css changes

//User defined classes
const  Window= require('./Window'); // extended Browser window
const  options = require('./env.json'); // config properties
const  UserData = require('./userdata.js'); // used to process user state from facebook
const  Facebook = require('./Facebook'); // facebook window
const  Init = require('./Init'); // facebook window

var userDataIO = new UserData();
var store = new Store();
var mainWindow;


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
	
	mainWindow = new Window({file:path.join('design','index.html')});
	let appMenu = Menu.getApplicationMenu();

	// init tasks before rendering
	let initOperations = new Init(mainWindow,appMenu);
	let userState = initOperations.getUserState();
	userState !== null ? initOperations.fetchFeed(userState): null;
	store.set({
			name:'Feeds',
			active:'feeds',
			loginRequired: userState == null,
	});
	globalShortcut.register('CommandOrControl+Shift+.', () => {
		mainWindow.sendToFront('user-action','sidebar')
	});
}

ipcMain.on('fb-login',function(event){
		facebook = new Facebook();
		facebook.login(options,mainWindow,userDataIO);
});
