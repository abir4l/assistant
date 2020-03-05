const { ipcRenderer,remote } = require('electron')
const {globalShortcut} = remote;

globalShortcut.register('CommandOrControl+Shift+.', () => {
	toggleSidebar();
})


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
