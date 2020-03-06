const { ipcRenderer} = require('electron')
const Store = require('electron-store');

ipcRenderer.on('user-action',function(event){
	toggleSidebar();
});

$('#button').click(function(){
	text = document.getElementById('text').value
	document.getElementById('text').value = "";
	ipcRenderer.send('clicked',text);
});
ipcRenderer.on('load',function(event,data){
	document.getElementById('data').innerHTML = data;
});
function loginFacebook(){
	ipcRenderer.send('fb-login');

}
function toggleSidebar(){
	$('#sidebar').toggleClass('visible');
	$('.wrapper').toggleClass('bring-to-right');
}
$('.sidebar .item').click(function(){
	textContent = $(this).text();
	store.set('active',textContent.trim().toLowerCase())
	$('.sidebar .item').removeClass('active');
	$('.wrapper').load('./'+textContent.trim().toLowerCase()+'.html',function(){
		document.getElementById('data').innerHTML = textContent;
	});
	$(this).addClass('active');
});
function updateStatusCallback(response){
	console.log(response);

}
$(document).ready(function(){
	$.ajaxSetup({ cache: true });
	store = new Store();
	showLogin = store.get('loginRequired');
	$('.wrapper').load('./feeds.html',function(){
		document.getElementById('data').innerHTML = store.get('name');
		if(!showLogin){
			$('#facebook-button').hide();
		}
	});
//	$.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
//		FB.init({
//				appId: '512028469499464',
//				version: 'v2.7' // or v2.1, v2.2, v2.3, ...
//		});     
//		$('#loginbutton,#feedbutton').removeAttr('disabled');
//		FB.getLoginStatus(updateStatusCallback);
//	});
});
