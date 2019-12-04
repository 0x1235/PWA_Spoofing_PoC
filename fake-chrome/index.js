// Register service worker to control making site work offline

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/poc/fake-chrome/sw.js', {scope: '/poc/fake-chrome/'}).then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
    });
}

////////////////////////////////////////////////

$('#ok').css('display', 'none');

var timeleft = 5;
setInterval( function(){
	if( timeleft==0 )
	{
		$('#br_up').css('display', 'block').effect( "bounce" );
		$('#count').html("0");
		timeleft=-1;
	}
	if(timeleft>0)
	{
		$('#count').html(timeleft);
		timeleft--;
	}
},1000);

///////////////////////////////////////////////

var deferredPrompt = null;
const addBtn = document.querySelector('.br-up');

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'inline-block';
});

addBtn.addEventListener('click', (e) => {
	if( deferredPrompt!=null ) {
		// hide our user interface that shows our A2HS button
		addBtn.style.display = 'none';
		// Show the prompt
		deferredPrompt.prompt();
		// Wait for the user to respond to the prompt
		deferredPrompt.userChoice.then((choiceResult) => {
			if (choiceResult.outcome === 'accepted') {
				$('#ent').css('display', 'none');
				$('#ok').css('display', 'inline-block');
				console.log('User accepted the A2HS prompt');
			} else {
				console.log('User dismissed the A2HS prompt');
				addBtn.style.display = 'inline-block';
			}
			deferredPrompt = null;
			});
	}
});
