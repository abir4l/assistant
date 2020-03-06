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
$(document).ready(function(){
	store = new Store();
	$('.wrapper').load('./feeds.html',function(){
		document.getElementById('data').innerHTML = store.get('name');
	});
});
