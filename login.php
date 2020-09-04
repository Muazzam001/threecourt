<?php
if (isset($_POST['submit'])) {
    $fname = $_REQUEST['FNAME'];
//    $lname = $_REQUEST['LNAME'];
    $email = $_REQUEST['EMAIL'];
    $company = $_REQUEST['COMPANY_NAME'];
    $address1 = $_REQUEST['ADDRESS1'];
    $address2 = $_REQUEST['ADDRESS2'];
    $city = $_REQUEST['CITY'];
    $state1 = $_REQUEST['state1'];
    $zip = $_REQUEST['ZIP'];
    $country = $_REQUEST['COUNTRY'];
    $phone = $_REQUEST['PHONE'];
    $msg = $_REQUEST['a_1241'];
    $message = 'First Name: ' . $fname . '<br> Last Name: ' . $lname . '<br> Email :' . $email . '<br>'
	. ' Phone :' . $phone . '<br> Company: ' . $company . '<br>'
	. ' Country: ' . $country . '<br> State: ' . $state1 . '<br> City: ' . $city . '<br> Zip: ' . $zip . ''
	. '<br> Address1: ' . $address1 . '<br> Address2: ' . $address2 . '<br> Description :' . $msg;
    $headers = 'From: ' . $email . '' . "\r\n" .
	'Bcc: ' . $email . '' . "\r\n" .
	'Content-Type: text/html; X-Mailer: PHP/' . phpversion();
    $subject = "Message sent using Access Request form of threecourt.com";
    $to = 'arthur.kavalis@threecourt.com, engr.aamir.kamal2015@gmail.com';
//                         $from = "From: $email";
    $result = mail($to, $subject, $message, $headers);
    if (!$result) {
	//mail("info@seasonedtradelines.co", $subject, $message, $from);
	print_r(error_get_last());
    } else {
	echo "Email is Sent! One of our staff members will respond ASAP.";
    }
}

?>
<ul class="navd">
    <li class="button-dropdown">
	<a href="javascript:void(0)" class="dropdown-toggle myaccount">LOGIN</a>
	<ul class="dropdown-menu">
	    <li>
		<a id="login-account" target="_blank"
		   href="https://login.microsoftonline.com/96ae3c94-b7b7-4ab6-993b-1cac8abd11d6/oauth2/authorize?client_id=00000003-0000-0ff1-ce00-000000000000&response_mode=form_post&response_type=code%20id_token&scope=openid&nonce=738AB9B06B234DAB1610ED90AB6846D0B8C4E821E71861E7-8FB6A7517DB0C882BE95161027D79A48077A5C8F0E18E3BACF2FC4397B83C603&redirect_uri=https:%2F%2Fthreecourt.sharepoint.com%2F_forms%2Fdefault.aspx&client-request-id=fc37e09d-7073-3000-d712-15a1577f879a">LOGIN</a>
	    </li>
	    <li><a href="request-access">Request Access</a></li>
	</ul>
    </li>
</ul>
<script type="text/javascript">
    jQuery(document).ready(function (e) {
	function t(t) {
	    e(t).bind("click", function (t) {
		t.preventDefault();
		e(this).parent().fadeOut()
	    })
	}

	e(".dropdown-toggle").click(function () {
	    var t = e(this).parents(".button-dropdown").children(".dropdown-menu").is(":hidden");
	    e(".button-dropdown .dropdown-menu").hide();
	    e(".button-dropdown .dropdown-toggle").removeClass("active");
	    if (t) {
		e(this).parents(".button-dropdown").children(".dropdown-menu").toggle().parents(".button-dropdown").children(".dropdown-toggle").addClass("active")
	    }
	});
	e(document).bind("click", function (t) {
	    var n = e(t.target);
	    if (!n.parents().hasClass("button-dropdown")) e(".button-dropdown .dropdown-menu").hide();
	});
	e(document).bind("click", function (t) {
	    var n = e(t.target);
	    if (!n.parents().hasClass("button-dropdown")) e(".button-dropdown .dropdown-toggle").removeClass("active");
	})
    });
</script>