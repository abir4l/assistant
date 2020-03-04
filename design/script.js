const { ipcRenderer } = require('electron')

$('#sidebar-button').click(function(){
	$('#sidebar').toggleClass('visible');
	$('.wrapper').toggleClass('bring-to-right');
	$('#sidebar-button-wrapper').toggleClass('slide-close')
});
$('#button').click(function(){
	text = document.getElementById('text').value
	document.getElementById('text').value = "";
	ipcRenderer.send('clicked',text);
});
ipcRenderer.on('load',function(event,data){
	document.getElementById('data').innerHTML = data;
});
