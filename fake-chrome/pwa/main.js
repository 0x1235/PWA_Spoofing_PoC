
var fake_g = {
	login: '',
	pass: ''
};

$('#identifierId').focus();

$( '#pass' ).focus(function() {
	$('#pass_t').addClass('colorbl');
});

$( '#pass' ).blur(function() {
	$('#pass_t').removeClass('colorbl');
});

function step(v) {
	// Work when user click button 'next' in login page.
	
	if(v==1) {
		fake_g.login = $('#identifierId').val();
		
		if(fake_g.login.length==0) {
			$('#identifierId').css('border', '1px solid #d93025');
			$('#idtext').css('color', '#d93025');
		}
		else {		
			$('#f_el_n1').html('Welcome');
			
			$('#identifierNext1').css('display', 'none');
			$('#identifierNext2').css('display', 'inline-block');
			
			$('#pass').focus();
			
			$('#f_el_n2').css('display', 'none');
			$('#f_el_n2a').css('display', 'block');
			if( phonenumber(fake_g.login)==false && fake_g.login.indexOf('@')==-1 )
				fake_g.login+='@gmail.com';
			$('#profileIdentifier').html(fake_g.login);
			
			$('#f_el_n3').css('display', 'none');
			$('#f_el_n3a').css('display', 'block');
			
			$('#f_el_n4').css('display', 'none');
			$('#f_el_n4a').css('display', 'block');
		}
	}
	
	if(v==2) {
		fake_g.pass = $('#pass').val();
		alert('Ok. Its not Google. Your login and pass: ' + fake_g.login + ' ' + fake_g.pass);
		document.location.href = 'https://google.com';
	}
}

function phonenumber(inputtxt)
{
	// https://stackoverflow.com/questions/7657824/count-the-number-of-integers-in-a-string
	var res = inputtxt.replace(/[^0-9]/g,"").length;
	if(res<2)
	{
		return false;
    }
    return true;
}

function color4pass_t() {
	switch(v)
	{
		case 1:
			
			break;
		case 2:
			break;
	}
}

function pass(v)
{
	// show & 
	if(v==1) {
		$('#shpass').css('display', 'none');
		$('#pass').attr('type', 'text');
		$('#hdpass').css('display', 'inline-block');
	}
	
	if(v==2) {
		$('#shpass').css('display', 'inline-block');
		$('#pass').attr('type', 'password').focus();
		$('#hdpass').css('display', 'none');
	}
	
}