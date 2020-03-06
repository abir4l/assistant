const {BrowserWindow} = require('electron');

Facebook = function(){

	this.login = function(options,mainWindow,userDataIO){
		
		let fbWindow = new BrowserWindow({
				width: 450,
				height: 300,
				show: false,
				parent: mainWindow,
				modal: true,
				webPreferences: {
					nodeIntegration: false
				}
		});

		let authUrl = "https://www.facebook.com/v6.0/dialog/oauth?client_id="+options.appId+"&redirect_uri="+options.redirect_uri+"&state="+options.state+"&response_type=token&display=popup"
		fbWindow.loadURL(authUrl);
		fbWindow.webContents.on('did-finish-load',function(){
			fbWindow.show();
		});
		var handleUrl = function(url){
			let urlData,tokenData;
			if(url.length > 0){
				urlData = url.substring(url.indexOf('#')+1).split('&');
				tokenData = urlData.reduce((sum,item)=>{
					sum[item.split('=')[0]] = item.split('=')[1];
					return sum;
				},{});	
				userDataIO.saveToFile(tokenData,options.user_file);
			}
		};
		fbWindow.webContents.on('will-navigate',(event,url)=>handleUrl(url));
	}

};
module.exports = Facebook;
