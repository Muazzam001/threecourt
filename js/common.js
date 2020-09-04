function new_login()
{
	cookiePath = ";Path=/";
	document.cookie='aiscookie=0'+cookiePath;
	window.location='/cgi-bin/index.pl';
}
function clear_username(prompt)
{
	if(document.forms[0].USERNAME.value == prompt) { document.forms[0].USERNAME.value = ''; }
}	
function toggle_box(a)
{
		if (a==0) { 
			if (document.forms[0].USERNAME.value!="") {
					document.getElementById("USERNAME").style.backgroundImage=""; 
					}
			else {
					document.getElementById("USERNAME").style.backgroundImage="url('/i/user.png')"; //no-repeat 3px 2px;"; 
				}
		}				
		else { 
			if (document.forms[0].PASSWORD.value!="") {
					document.getElementById("PASSWORD").style.backgroundImage="";
					}
			else {
					document.getElementById("PASSWORD").style.backgroundImage="url('/i/password.png')"; // no-repeat 3px 2px;";  
				}
		}
}
function clear_box(a)
{
		if (a==0) { document.getElementById("USERNAME").style.backgroundImage=""; document.forms[0].USERNAME.focus();}
		else { document.getElementById("PASSWORD").style.backgroundImage=""; document.forms[0].PASSWORD.focus();}
}
function login(terms)
{
	if(terms == 1 && !document.forms[0].TERMS.checked)
	{
		alert('Please agree to the terms of use by checking the box to the left of the submit button');
	}
	else if(document.forms[0].USERNAME.value == 'Username' || !document.forms[0].USERNAME.value || !document.forms[0].PASSWORD.value)
	{
		alert('Please fill in your username and password');
	}
	else
	{
		document.forms[0].submit();
	}
}

function forgot_pw(prompt)
{
	if(!document.forms[0].USERNAME.value || document.forms[0].USERNAME.value == prompt)
	{
		alert('To receive your password please fill out the username and press the forgot password');
	}
	else
	{
		document.forms[0].ACTION.value = 'FORGOT_PW';
		document.forms[0].submit();
	}
}