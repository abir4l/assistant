

const { MenuItem}= require('electron');
const  options = require('./env.json'); // config properties
const  UserData = require('./userdata.js'); // used to process user state from facebook
const axios = require('axios');
Init = function(mainWindow,appMenu){

	this.start = function(){
		addSidebar();

	};

	this.getUserState = function(){
		let userDataIO = new UserData();
		return  userDataIO.readFromFile(options.user_file+'.json');
	};


	this.fetchFeed=function(userState){
		axios.get(options.graphApi+"me?access_token="+userState.access_token).then(
			res => {
				let userId = res.data.id;
				axios.get(options.graphApi+userId+'/permissions'+'?access_token='+userState.access_token).then(
					response  =>{
							console.log(response.data);
					}).catch(err=>console.log(err));
				axios.get(options.graphApi+userId+'/feed'+'?access_token='+userState.access_token).then(
					response => {
						console.log(response.data);
					}
				)
			}
		);
	};

	/* adds sidebar toggle option on view menu
	* */
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
