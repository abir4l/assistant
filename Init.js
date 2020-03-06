const { MenuItem}= require('electron');
const  options = require('./env.json'); // config properties
const  UserData = require('./userdata.js'); // used to process user state from facebook
Init = function(mainWindow,appMenu){

	this.start = function(){
		addSidebar();
		return getUserState();
	
	};

	function getUserState(){
		let userDataIO = new UserData();
		return  userDataIO.readFromFile(options.user_file);
	}

	function addSidebar(){
		let sidebar = new MenuItem({
				label:'Toggle Sidebar',
				click:function(){
					mainWindow.sendToFront('user-action','sidebar')
				}
		});	
		let viewMenu= appMenu.items.find( item => item.commandId === 22);
		viewMenu.submenu.append(sidebar);

	}
	
};
module.exports = Init;
