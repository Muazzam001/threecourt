<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">

<meta http-equiv="content-type" content="text/html;charset=UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1">
<head>
    <meta http-equiv="Content-Type" content="text/html; "/>
    <meta name="web_author" content="Axcel World, http://www.Axcelworld.com">
    <meta name="format-detection" content="telephone=no">
    <title>ThreeCourt, LP :: Request Access</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <!-- <link rel="stylesheet" type="text/css" href="http://netdna.bootstrapcdn.com/twitter-bootstrap/2.1.1/css/bootstrap.min.css"> -->
    <link href="img/logopic.png" rel="Shortcut Icon"/>
    <link href='https://fonts.googleapis.com/css?family=Titillium+Web:400,200,300' rel='stylesheet' type='text/css'>
    <link href="css/style2.css" rel="stylesheet" type="text/css"/>
    <script>if (typeof jmodule == 'undefined')
	    var jmodule = {};</script>
    <!-- <script type="text/javascript" src="js/jquery.1.8.3.js"></script> -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script type="text/javascript" src="js/jquery.ui.core.min.js"></script>
    <script type="text/javascript" src="js/jquery.ui.widget.min.js"></script>

    <script type="text/javascript" src="js/jquery.ui.mouse.min.js"></script>
    <script type="text/javascript" src="js/jquery.ui.draggable.min.js"></script>
    <script type="text/javascript" src="js/ce.js"></script>

    <script type="text/javascript" src="js/jquery_effect_highlight.js"></script>
    <script type="text/javascript" src="js/fx2_dev.js"></script>

    <script type="text/javascript" src="js/log_browser.min.js"></script>

    <script type="text/javascript" src="js/raphael.js"></script>

    <script type="text/javascript" src="js/common.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link href="css/style.css" rel="stylesheet" type="text/css"/>

</head>
<body id="request" class="inner">

<div id="login-box">
    <div class="disclaimer-exit"></div>
    <p>This password protected portion of the site is intended exclusively for ThreeCourt’s investors and other parties
	to whom ThreeCourt has explicitly granted access. Unauthorized access is strictly prohibited. The redistribution
	of any material provided herein is also strictly prohibited.</p>

    <form method="post">
	<input type="hidden" name=ACTION>
	<input type="hidden" name=RD value="/ic">
	<table cellpadding="0" cellspacing="0" id="login-table">
	    <tr>
		<td valign="top">
		    <input type=text name=USERNAME id=USERNAME
			   style="background-image:url(i/user.png); background-repeat: no-repeat; background-position: 1px center"
			   onfocus="clear_box(0);" onblur="toggle_box(0);">
		</td>
	    </tr>
	    <tr>
		<td class="login-pswd"><input type=password name=PASSWORD id=PASSWORD
					      style="background-image:url(i/password.png); background-repeat: no-repeat; background-position: 1px center"
					      onfocus="clear_box(1);" onblur="toggle_box(1);"></td>
	    </tr>
	    <tr>
		<td><p>By clicking this Log In box, you attest that you are using Log In credentials provided
			specifically to you by ThreeCourt.</p></td>
	    </tr>
	    <tr>
		<td valign="top"><a class="login-btn" onClick="login(0);">Log In</a></td>
	    </tr>
	    <tr>
		<td valign="top" align="left" style="padding-top:7px"><a onclick="javascript:forgot_pw()">Forgot your
			password?</a><br/>
		    <a href="request-access.php" target="_blank">Request Access</a></td>
	    </tr>
	    <tr>
		<td colspan="2">
		    <div id="msg"></div>
		</td>
	    </tr>
	</table>
    </form>
</div>

<div id="canvas1"></div>
<div id="canvas2"></div>
<center>

    <!--navbar-->
    <nav class="navbar navbar-inverse bg-pages" id="topBarCont">
	<div class="container-fluid" id="top-bar">
	    <div class="navbar-header">
		<!--      <a id="logo-top" href="index.php"></a>-->
		<a href="index"><img src="img/threecourt_logo-white.png" alt="" class="logo-img"></a>
		<button type="button" class="navbar-toggle toggle-button" data-toggle="collapse"
			data-target="#myNavbar">
		    <span class="icon-bar"></span>
		    <span class="icon-bar"></span>
		    <span class="icon-bar"></span>
		</button>
              <span class="log-button">
                <?php
		Include("login.php")
		?>
                </span>
	    </div>
	    <div class="collapse navbar-collapse" id="myNavbar">
		<ul class="nav navbar-nav nav-color postion-request" id="nav"
		    fx='[{"applyTo":"a","hover":[["border-color","#FFFFFF","#0C195B",200]]}]'>
		    <li><a href="about">About</a></li>
		    <li><a href="leadership">Leadership</a></li>
		    <li><a href="contact" id="contactLink" class="nav-active">Contact</a></li>

		</ul>
	    </div>
	</div>
    </nav>

    <div id="container" class="request">
	<div class="content">

	    <script>
		$(document).ready(function () {
		    $("#container").css("min-height", $(window).height() - 248 + 'px');
		    fx.init($("body"));
		    $('#shade, .disclaimer-exit').click(function () {
			$('#shade, #login-box, #disclaimerBox').hide();
		    });
		    $('#login, .icLink').click(function () {
			$('#login-box, #shade').show();
		    });
		    $('.footerBig a').click(function () {
			$('#disclaimerBox, #shade').show();
		    });

		    if ($('#msg').text().length > 3) {
			alert($('#msg').text());
		    }

		    if ($('.note').text().length > 3) {
			alert($('.note').text());
		    }
		});
	    </script>
	    <link href="css/messages.css" rel="stylesheet" type="text/css"/>

	    <script type="text/javascript" src="js/messages.js"></script>
	    <link href="css/datepicker.css" rel="stylesheet" type="text/css"/>

	    <script type="text/javascript" src="js/jquery.ui.datepicker.min.js"></script>
	    <div class="side leftSide">
		<h1>REQUEST ACCESS</h1>
	    </div>
	    <div class="side rightSide">
		<p class="innerBig">Request Access To Client Portal</p>
		<!-- <p style="font-size: 18px;color: #000000;">
		     <span style="font-size: 24px;">*</span> Indicates That these Fields are Required.
		</p>  -->
		<form name="request" action="" method="post" enctype="multipart/form-data">
		    <input type=hidden name=ACTION value=0>

		    <input type=hidden name="STATE" value="">
		    <table class="questions1" cellpadding=0 cellspacing=0>

			<tr>
			    <td class="question1">Full Name: <strong>*</strong></td>
			    <td class="answer1"><input type="text" name="FNAME" value="" require_me="true" required>
			    </td>
			</tr>

			<!-- <tr><td class="question1">Last Name: <strong style="color: red;">*</strong></td>

			    <td class="answer1"><input type=text name=LNAME value="" require_me="true" required></td>

			</tr> -->

			<tr>
			    <td class="question1">Email: <strong>*</strong></td>
			    <td class="answer1"><input type="email" name="EMAIL" value="" require_me="true" required>
			    </td>
			</tr>
			<tr>
			    <td class="question1">Phone: <strong>*</strong></td>
			    <td class="answer1"><input type=text name="PHONE" value="" required></td>
			</tr>

			<tr>
			    <td class="question1">Organization:</td>
			    <td class="answer1"><input type=text name="COMPANY_NAME" value=""></td>
			</tr>

			<tr>
			    <td class="question1">Country:</td>
			    <td class='answer1'><select name="COUNTRY" onchange='ccountry();'>
				    <option value="United States">United States</option>
				    <option value="Afghanistan">Afghanistan</option>
				    <option value="Aland Islands">Aland Islands</option>
				    <option value="Albania">Albania</option>
				    <option value="Algeria">Algeria</option>
				    <option value="American Samoa">American Samoa</option>
				    <option value="Andorra">Andorra</option>
				    <option value="Angola">Angola</option>
				    <option value="Anguilla">Anguilla</option>
				    <option value="Antigua & Barbuda">Antigua & Barbuda</option>
				    <option value="Argentina">Argentina</option>
				    <option value="Armenia">Armenia</option>
				    <option value="Aruba">Aruba</option>
				    <option value="Australia">Australia</option>
				    <option value="Austria">Austria</option>
				    <option value="Azerbaijan">Azerbaijan</option>
				    <option value="Bahamas">Bahamas</option>
				    <option value="Bahrain">Bahrain</option>
				    <option value="Bangladesh">Bangladesh</option>
				    <option value="Barbados">Barbados</option>
				    <option value="Belarus">Belarus</option>
				    <option value="Belgium">Belgium</option>
				    <option value="Belize">Belize</option>
				    <option value="Benin">Benin</option>
				    <option value="Bermuda">Bermuda</option>
				    <option value="Bhutan">Bhutan</option>
				    <option value="Bolivia">Bolivia</option>
				    <option value="Bosnia & Herzegowina">Bosnia & Herzegowina</option>
				    <option value="Botswana">Botswana</option>
				    <option value="Brazil">Brazil</option>
				    <option value="British Indian Ocean Territory">British Indian Ocean Territory
				    </option>
				    <option value="Brunei Darussalam">Brunei Darussalam</option>
				    <option value="Bulgaria">Bulgaria</option>
				    <option value="Burkina Faso">Burkina Faso</option>
				    <option value="Burundi">Burundi</option>
				    <option value="Cambodia">Cambodia</option>
				    <option value="Cameroon">Cameroon</option>
				    <option value="Canada">Canada</option>
				    <option value="Cape Verde">Cape Verde</option>
				    <option value="Cayman Islands">Cayman Islands</option>
				    <option value="Central African Republic">Central African Republic</option>
				    <option value="Chile">Chile</option>
				    <option value="China">China</option>
				    <option value="Colombia">Colombia</option>
				    <option value="Congo">Congo</option>
				    <option value="Congo">Congo</option>
				    <option value="Cook Islands">Cook Islands</option>
				    <option value="Costa Rica">Costa Rica</option>
				    <option value="Cote D">Cote D</option>
				    <option value="Cuba">Cuba</option>
				    <option value="Cyprus">Cyprus</option>
				    <option value="Czech Republic">Czech Republic</option>
				    <option value="Denmark">Denmark</option>
				    <option value="Djibouti">Djibouti</option>
				    <option value="Dominican Republic">Dominican Republic</option>
				    <option value="Ecuador">Ecuador</option>
				    <option value="Egypt">Egypt</option>
				    <option value="El Salvador">El Salvador</option>
				    <option value="Equatorial Guinea">Equatorial Guinea</option>
				    <option value="Eritrea">Eritrea</option>
				    <option value="Estonia">Estonia</option>
				    <option value="Ethiopia">Ethiopia</option>
				    <option value="European Union">European Union</option>
				    <option value="Faroe Islands">Faroe Islands</option>
				    <option value="Fiji">Fiji</option>
				    <option value="Finland">Finland</option>
				    <option value="France">France</option>
				    <option value="French Guiana">French Guiana</option>
				    <option value="French Polynesia">French Polynesia</option>
				    <option value="Gabon">Gabon</option>
				    <option value="Gambia">Gambia</option>
				    <option value="Georgia">Georgia</option>
				    <option value="Germany">Germany</option>
				    <option value="Ghana">Ghana</option>
				    <option value="Gibraltar">Gibraltar</option>
				    <option value="Greece">Greece</option>
				    <option value="Greenland">Greenland</option>
				    <option value="Grenada">Grenada</option>
				    <option value="Guadeloupe">Guadeloupe</option>
				    <option value="Guam">Guam</option>
				    <option value="Guatemala">Guatemala</option>
				    <option value="Guernsey">Guernsey</option>
				    <option value="Guyana">Guyana</option>
				    <option value="Haiti">Haiti</option>
				    <option value="Honduras">Honduras</option>
				    <option value="Hong Kong">Hong Kong</option>
				    <option value="Hungary">Hungary</option>
				    <option value="Iceland">Iceland</option>
				    <option value="India">India</option>
				    <option value="Indonesia">Indonesia</option>
				    <option value="Iraq">Iraq</option>
				    <option value="Ireland">Ireland</option>
				    <option value="Isle Of Man">Isle Of Man</option>
				    <option value="Israel">Israel</option>
				    <option value="Italy">Italy</option>
				    <option value="Jamaica">Jamaica</option>
				    <option value="Japan">Japan</option>
				    <option value="Jersey">Jersey</option>
				    <option value="Jordan">Jordan</option>
				    <option value="Kazakhstan">Kazakhstan</option>
				    <option value="Kenya">Kenya</option>
				    <option value="Kiribati">Kiribati</option>
				    <option value="Korea Republic Of">Korea Republic Of</option>
				    <option value="Kuwait">Kuwait</option>
				    <option value="Kyrgyzstan">Kyrgyzstan</option>
				    <option value="Lao People">Lao People</option>
				    <option value="Latvia">Latvia</option>
				    <option value="Lebanon">Lebanon</option>
				    <option value="Lesotho">Lesotho</option>
				    <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
				    <option value="Liechtenstein">Liechtenstein</option>
				    <option value="Lithuania">Lithuania</option>
				    <option value="Luxembourg">Luxembourg</option>
				    <option value="Macau">Macau</option>
				    <option value="Macedonia">Macedonia</option>
				    <option value="Madagascar">Madagascar</option>
				    <option value="Malawi">Malawi</option>
				    <option value="Malaysia">Malaysia</option>
				    <option value="Maldives">Maldives</option>
				    <option value="Mali">Mali</option>
				    <option value="Malta">Malta</option>
				    <option value="Marshall Islands">Marshall Islands</option>
				    <option value="Mauritania">Mauritania</option>
				    <option value="Mauritius">Mauritius</option>
				    <option value="Mexico">Mexico</option>
				    <option value="Micronesia Federated States Of">Micronesia Federated States Of
				    </option>
				    <option value="Moldova Republic Of">Moldova Republic Of</option>
				    <option value="Monaco">Monaco</option>
				    <option value="Mongolia">Mongolia</option>
				    <option value="Montenegro">Montenegro</option>
				    <option value="Montserrat">Montserrat</option>
				    <option value="Morocco">Morocco</option>
				    <option value="Mozambique">Mozambique</option>
				    <option value="Myanmar">Myanmar</option>
				    <option value="Namibia">Namibia</option>
				    <option value="Nauru">Nauru</option>
				    <option value="Nepal">Nepal</option>
				    <option value="Netherlands">Netherlands</option>
				    <option value="Netherlands Antilles">Netherlands Antilles</option>
				    <option value="New Caledonia">New Caledonia</option>
				    <option value="New Zealand">New Zealand</option>
				    <option value="Nicaragua">Nicaragua</option>
				    <option value="Niger">Niger</option>
				    <option value="Nigeria">Nigeria</option>
				    <option value="Niue">Niue</option>
				    <option value="Norfolk Island">Norfolk Island</option>
				    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
				    <option value="Norway">Norway</option>
				    <option value="Oman">Oman</option>
				    <option value="Pakistan">Pakistan</option>
				    <option value="Palau">Palau</option>
				    <option value="Palestinian Territory Occupied">Palestinian Territory Occupied
				    </option>
				    <option value="Panama">Panama</option>
				    <option value="Papua New Guinea">Papua New Guinea</option>
				    <option value="Paraguay">Paraguay</option>
				    <option value="Peru">Peru</option>
				    <option value="Philippines">Philippines</option>
				    <option value="Poland">Poland</option>
				    <option value="Portugal">Portugal</option>
				    <option value="Puerto Rico">Puerto Rico</option>
				    <option value="Qatar">Qatar</option>
				    <option value="Reunion">Reunion</option>
				    <option value="Romania">Romania</option>
				    <option value="Russian Federation">Russian Federation</option>
				    <option value="Rwanda">Rwanda</option>
				    <option value="St. Kitts &Nevis">St. Kitts &Nevis</option>
				    <option value="St. Lucia">St. Lucia</option>
				    <option value="St. Vincent & The Grenadines">St. Vincent & The Grenadines</option>
				    <option value="Samoa">Samoa</option>
				    <option value="San Marino">San Marino</option>
				    <option value="Saudi Arabia">Saudi Arabia</option>
				    <option value="Senegal">Senegal</option>
				    <option value="Serbia">Serbia</option>
				    <option value="Serbia & Montenegro">Serbia & Montenegro</option>
				    <option value="Seychelles">Seychelles</option>
				    <option value="Sierra Leone">Sierra Leone</option>
				    <option value="Singapore">Singapore</option>
				    <option value="Slovenia">Slovenia</option>
				    <option value="Solomon Islands">Solomon Islands</option>
				    <option value="South Africa">South Africa</option>
				    <option value="Spain">Spain</option>
				    <option value="Sri Lanka">Sri Lanka</option>
				    <option value="Sudan">Sudan</option>
				    <option value="Suriname">Suriname</option>
				    <option value="Swaziland">Swaziland</option>
				    <option value="Sweden">Sweden</option>
				    <option value="Switzerland">Switzerland</option>
				    <option value="Syrian Arab Republic">Syrian Arab Republic</option>
				    <option value="Taiwan Province Of China">Taiwan Province Of China</option>
				    <option value="Tajikistan">Tajikistan</option>
				    <option value="Tanzania United Republic Of">Tanzania United Republic Of</option>
				    <option value="Thailand">Thailand</option>
				    <option value="Togo">Togo</option>
				    <option value="Tonga">Tonga</option>
				    <option value="Trinidad & Tobago">Trinidad & Tobago</option>
				    <option value="Tunisia">Tunisia</option>
				    <option value="Turkey">Turkey</option>
				    <option value="Turkmenistan">Turkmenistan</option>
				    <option value="Turks & Caicos Islands">Turks & Caicos Islands</option>
				    <option value="Tuvalu">Tuvalu</option>
				    <option value="Uganda">Uganda</option>
				    <option value="Ukraine">Ukraine</option>
				    <option value="United Arab Emirates">United Arab Emirates</option>
				    <option value="United Kingdom">United Kingdom</option>
				    <option value="Uruguay">Uruguay</option>
				    <option value="Uzbekistan">Uzbekistan</option>
				    <option value="Vanuatu">Vanuatu</option>
				    <option value="Venezuela">Venezuela</option>
				    <option value="Viet Nam">Viet Nam</option>
				    <option value="Wallis & Futuna Islands">Wallis & Futuna Islands</option>
				    <option value="Yemen">Yemen</option>
				    <option value="Zambia">Zambia</option>
				    <option value="Zimbabwe">Zimbabwe</option>
				</select>
				<script>
				    $(document).ready(function () {
					$("#state2").keyup(function () {
					    ccountry();
					});
					$("#state1").change(function () {
					    ccountry();

					});
					ccountry();
				    });
				    function ccountry() {
					if ($("select[name=COUNTRY]").val() != "United States") {
					    $("#state1").hide();
					    $("#state2").show();
					    //document.forms[1].STATE.value=$("#state2").val();
					    document.request.STATE.value = $("#state2").val();
					} else {
					    $("#state2").hide();
					    $("#state1").show();
					    //document.forms[1].STATE.value=$("#state1").val();
					    document.request.STATE.value = $("#state1").val();
					}
					if ($("select[name=COUNTRY]").val() == "Canada") {
					    $("tr.can,table.can").show();
					    $("tr.usa,table.usa").hide();
					} else {
					    $("tr.can,table.can").hide();
					    $("tr.usa,table.usa").show();
					}
				    }
				</script>
			    </td>
			</tr>
			<tr>
			    <td class="question1"> State:</td>
			    <td class='answer1'><select name="state1" id=state1>
				    <option value="">Select State</option>
				    <option value="AL">Alabama</option>
				    <option value="AK">Alaska</option>
				    <option value="AZ">Arizona</option>
				    <option value="AR">Arkansas</option>
				    <option value="CA">California</option>
				    <option value="CO">Colorado</option>
				    <option value="CT">Connecticut</option>
				    <option value="DE">Delaware</option>
				    <option value="DC">District of Columbia</option>
				    <option value="FL">Florida</option>
				    <option value="GA">Georgia</option>
				    <option value="HI">Hawaii</option>
				    <option value="ID">Idaho</option>
				    <option value="IL">Illinois</option>
				    <option value="IN">Indiana</option>
				    <option value="IA">Iowa</option>
				    <option value="KS">Kansas</option>
				    <option value="KY">Kentucky</option>
				    <option value="LA">Louisiana</option>
				    <option value="ME">Maine</option>
				    <option value="MD">Maryland</option>
				    <option value="MA">Massachusetts</option>
				    <option value="MI">Michigan</option>
				    <option value="MN">Minnesota</option>
				    <option value="MS">Mississippi</option>
				    <option value="MO">Missouri</option>
				    <option value="MT">Montana</option>
				    <option value="NE">Nebraska</option>
				    <option value="NV">Nevada</option>
				    <option value="NH">New Hampshire</option>
				    <option value="NJ">New Jersey</option>
				    <option value="NM">New Mexico</option>
				    <option value="NY">New York</option>
				    <option value="NC">North Carolina</option>
				    <option value="ND">North Dakota</option>
				    <option value="OH">Ohio</option>
				    <option value="OK">Oklahoma</option>
				    <option value="OR">Oregon</option>
				    <option value="PA">Pennsylvania</option>
				    <option value="RI">Rhode Island</option>
				    <option value="SC">South Carolina</option>
				    <option value="SD">South Dakota</option>
				    <option value="TN">Tennessee</option>
				    <option value="TX">Texas</option>
				    <option value="UT">Utah</option>
				    <option value="VT">Vermont</option>
				    <option value="VA">Virginia</option>
				    <option value="WA">Washington</option>
				    <option value="WV">West Virginia</option>
				    <option value="WI">Wisconsin</option>
				    <option value="WY">Wyoming</option>
				</select><input type=text value="" id="state2" style="display:none"></td>
			</tr>
			<tr>
			    <td class="question1"> City:</td>

			    <td class="answer1"><input type=text name=CITY value="" require_me="true"></td>

			</tr>


			<tr>
			    <td class="question1"> Zip:</td>

			    <td class="answer1"><input type=text name=ZIP value="" require_me="true"></td>

			</tr>
			<tr>
			    <td class="question1"> Address 1:</td>

			    <td class="answer1"><input type=text name=ADDRESS1 value="" require_me="true"></td>

			</tr>

			<tr>
			    <td class="question1"> Address 2:</td>

			    <td class="answer1"><input type=text name=ADDRESS2 value=""></td>

			</tr>


			<tr class="">
			    <td class="question2">Message: <strong>*</strong></td>
			    <td class="answer2">
				<textarea name="a_1241" required class="textarea-fix"></textarea></td>
			</tr>


		    </table>
		    <table class="questions2" cellpadding=0 cellspacing=0>

			<!-- <tr class=""><td class="question2"><strong>*</strong> Message:</td><td class="answer2">
				<textarea name="a_1241" required></textarea></td></tr> -->


			<style>
			    table.subquestions {
				display: none
			    }
			</style>

			<script>
			    $(document).ready(function () {
				$("table.questions1,table.questions2").find("tr:last input[type=radio]").each(function () {
				    if ($(this).attr("value") == 'Individual Investor' && $(this).is(":checked")) {
					$(this).parents("table").next(".subquestions").slideDown(100);
				    }
				});
				$("table.questions1,table.questions2").find("tr:last input[type=radio]").click(function () {
				    if ($(this).attr("value") == 'Individual Investor') {
					$(this).parents("table").next(".subquestions").slideDown(100);
					//$(this).attr("checked","checked");
				    } else {
					$(this).parents("table").next(".subquestions").slideUp(100);
				    }
				});
			    });
			</script>

			<script>
			    function submit_form() {
				var rname;
				var cname;
				var msg = "";
				$(".questions1 input[type=text], .questions1 select, .questions1 textarea").each(function () {
				    if ($(this).attr("require_me") && (!$(this).val() || $(this).val() == 0 || $(this).val == "0" || $(this).val() == "No answer given")) {
					msg += $(this).parent("td").prev("td").text() + " is required<br>";
				    }
				});
				$(".questions1 input[type=checkbox], .questions1 input[type=radio]").each(function () {
				    if ($(this).attr("require_me") && $(this).attr("type") == "radio") {
					if (!$("input[name=" + $(this).attr("name") + "]:checked").val() && rname != $(this).attr("name")) {
					    msg += $(this).parent("td").prev("td").text() + " is required<br>";
					    rname = $(this).attr("name");
					}
				    } else if ($(this).attr("require_me") && $(this).attr("type") == "checkbox") {
					if (!$("input[name=" + $(this).attr("name") + "]:checked").val() && cname != $(this).attr("name")) {
					    msg += $(this).parent("td").prev("td").text() + " is required<br>";
					    cname = $(this).attr("name");
					}
				    }
				});

				// if (msg)
				// {
				//     $.gritter.add({
				//         sticky: true,
				//         mtype: 2,
				//         title: "MISSING INFORMATION",
				//         text: msg
				//     });
				// } else
				// {
				//     document.request.ACTION.value = 'REQUEST';
				//     document.request.submit();
				// }

			    }
			</script>


			<p style="font-size: 18px;color: #000000;margin-left: 100px;"><input type="checkbox"
											     name="robot"> I'm not a
			    robot </p>

			<script type="text/javascript">
			    var RecaptchaOptions = {
				theme: 'custom',
				custom_theme_widget: 'recaptcha_widget'
			    };
			</script>

			<!-- <form method="post" action="<?php echo $base_url; ?>user/register/check" method="post" class="form-horizontal well" accept-charset="UTF-8"> -->

			<script type="text/javascript">
			    var RecaptchaOptions = {
				theme: 'custom',
				custom_theme_widget: 'recaptcha_widget'
			    };
			</script>
			<div id="recaptcha_widget" style="display:none">

			    <div class="control-group">
				<label class="control-label"></label>

				<div class="controls">
				    <a id="recaptcha_image" href="#" class="thumbnail"></a>

				    <div class="recaptcha_only_if_incorrect_sol" style="color:red">Incorrect please try
					again
				    </div>
				</div>
			    </div>

			    <div class="control-group">
				<label class="recaptcha_only_if_image control-label">Enter the words above:</label>
				<label class="recaptcha_only_if_audio control-label">Enter the numbers you hear:</label>

				<div class="controls">
				    <div class="input-append">
					<input type="text" id="recaptcha_response_field" name="recaptcha_response_field"
					       class="input-recaptcha"/>
					<a class="btn" href="javascript:Recaptcha.reload()">
					    <span class="glyphicon glyphicon-refresh"></span></a>
					<a class="btn recaptcha_only_if_image"
					   href="javascript:Recaptcha.switch_type('audio')">
					    <span title="Get an audio CAPTCHA"
						  class="glyphicon glyphicon-headphones"></span></a>
					<a class="btn recaptcha_only_if_audio"
					   href="javascript:Recaptcha.switch_type('image')">
					    <span title="Get an image CAPTCHA"
						  class="glyphicon glyphicon-picture"></span></a>
					<a class="btn" href="javascript:Recaptcha.showhelp()">
					    <span class="glyphicon glyphicon-question-sign"></span></a>
				    </div>
				</div>
			    </div>

			</div>

			<script type="text/javascript"
				src="<?php echo $recaptcha_url; ?>">
			</script>

			<noscript>
			    <iframe src="<?php echo $recaptcha_noscript_url; ?>"
				    height="300" width="500" frameborder="0"></iframe>
			    <br>
                                                <textarea name="recaptcha_challenge_field" rows="3" cols="40">
                                                </textarea>
			    <input type="hidden" name="recaptcha_response_field"
				   value="manual_challenge">
			</noscript>
		</form>
		<script type="text/javascript"
			src="https://www.google.com/recaptcha/api/challenge?k=6LcrK9cSAAAAALEcjG9gTRPbeA0yAVsKd8sBpFpR"></script>

		<noscript>
		    <iframe src="<?php echo $recaptcha_noscript_url; ?>"
			    height="300" width="500" frameborder="0"></iframe>
		    <br>
                                            <textarea name="recaptcha_challenge_field" rows="3" cols="40">
                                            </textarea>
		    <input type="hidden" name="recaptcha_response_field" value="manual_challenge">
		</noscript>

		<tr style="font-size: 14px;color: #000000;">
		    <td class="question2"></td>
		    <td class="answer2"> *Indicates That these Fields are Required.</td>
		</tr>

		<tr>
		    <td colspan="2">
			<input class="submitRegister" type="submit" value=" Submit " name="submit"
			       onClick="submit_form()">
			<span class="alert-msg">Thank You For Contacting Three Court.</span>
		    </td>
		</tr>

		<!-- <tr><td colspan="2">
			<input class="submitRegister" type="submit" value=" Submit " name="submit" onClick="submit_form()">
		    </td></tr> -->

		</table>

	    </div>
	</div>
	<div>

	</div>
    </div>

    <div id="footer" class="pages-footer" style="margin-top: -85px;">
	<div class="container-fluid">
	    <div class="content homepage">
		<div class="footLeft foot-left-res">
		    <p class="footerBig">Three Court, LP<br>
			650 Fifth Avenue, 20<sup>th</sup> Floor<br>
			New York, NY 10019</p>
		</div>
		<div class="footRight foot-right-res">
		    <p class="footerBig lowercase">&#9400; Three Court, LP. All rights reserved.</br>Three Court and
			Three Court Funds are registered service marks of Three Court, LP.<br>
			<a>Terms of Use & Privacy Policy</a>
		    </p>
		</div>
	    </div>
	</div>
    </div>

    <div id="shade"></div>
    <div id="disclaimerBox">
	<div class="disclaimer-exit"></div>
	<p class="biggerSp">Terms of Use & Privacy Policy</p>

	<div class="littleCont">
	    <p class="bigger">This web site (the “Site”) is for informational purposes only. Under no circumstances
		should any material at this Site be used or considered as an offer to sell or solicitation of an offer
		to buy an interest in any investment fund managed by Three Court, L.P. ("Three Court") or for the
		provision of any investment advice, investment management or advisory services. Any such offer will only
		be made by means of a Confidential Offering Memorandum or Investment Management Agreement, as
		applicable, and only in jurisdictions where permitted by law. Additionally, access to information about
		any fund is limited to investors who, among other requirements, qualify as accredited investors within
		the meaning of the Securities Act of 1933, as amended, or otherwise meet the criteria determined by
		Three Court in its sole discretion.</p>

	    <p>By accessing this Site, you signify your agreement with and understanding of these terms, conditions, and
		notices pertaining to both this Site and any material at it. This Site is offered to you conditioned on
		your acceptance without modification of the terms, conditions, and notices contained herein. Your use of
		this Site constitutes your agreement to all such terms, conditions and notices. Three Court reserves the
		right to change the terms, conditions, and notices under which this Site is offered at any time, without
		notice. Your use of this Site after we post any changes to these terms, conditions, and notices
		constitutes your agreement to those changes. Any such change to these terms, conditions, and notices
		will be effective upon posting to the Site.
	    </p>

	    <p>
		Three Court reserves all rights with respect to copyright and trademark ownership of all material at
		this Site, and will enforce such rights to the full extent of law. This Site is for your personal and
		non-commercial use. You may not modify, copy, distribute, transmit, display, perform, reproduce,
		publish, license, create derivative works from, transfer, or sell any information, software, products,
		or services obtained from the Site.
	    </p>

	    <p>
		While Three Court uses reasonable efforts to update the information on this Site, Three Court makes no
		representations or warranties as to the accuracy, reliability or completeness of any information at this
		Site. Any content on the site are subject to change at any time, without notice.
	    </p>

	    <p>
		Three Court has not reviewed any of the sites linked to this Site, and is not responsible for the
		content of off-site pages or any other site linked or linking to the Site. Your linking to any off-site
		pages or other sites is at your own risk.
	    </p>

	    <p>
		The materials at the Site are provided "as is" without warranty of any kind, either express or implied,
		to the fullest extent permissible pursuant to applicable law. Three Court further assumes no
		responsibility for, and makes no warranties that, functions contained in the Site will be uninterrupted
		or error-free, that defects will be corrected, or that the Site or the server that makes it available
		will be free of viruses or other harmful components. Three Court shall not be liable for any damages to,
		viruses that may infect, or services, repairs or corrections that must be performed, on your computer or
		other property on account of your accessing or use of this Site.
	    </p>

	    <p>
		Unless otherwise specified, the materials in or accessible through the Site are directed at residents of
		the United States, its territories, possessions, and protectorates. The Site is controlled and operated
		by Three Court from its offices within the State of New York, United States of America. Neither Three
		Court nor any of its affiliates makes any representation that materials in or accessible through the
		Site are appropriate or available for use in other locations or that access to them where their content
		is located is not illegal and prohibited. Those who choose to access the Site from other locations do so
		on their own initiative and are responsible for establishing the legality, usability and correctness of
		any information or materials under any or all jurisdictions and the compliance of that information or
		material with local laws, if and to the extent local laws are applicable.
	    </p>

	    <p>
		There is a strict prohibition on the use this site for or in connection with any illegal, fraudulent,
		harassing or similar prohibited purpose, including (but not limited to) posting illegal, immoral,
		provocative or defamatory statements in or on any part of the site, or posting on or submitting to the
		site any material which might cause Three Court to violate any applicable law, statute, directive or
		regulation or that could, in Three Court's sole discretion, as applicable, adversely affect their
		respective reputations. You accept any and all liability resulting from any such prohibited use of the
		site, and indemnify and hold harmless Three Court and its respective officers, directors, agents,
		partners, shareholders, members, controlling entities and employees (collectively, "Indemnitees") from
		and against any liability, claim, cost, loss, judgment, damage or expense (including attorneys' fees and
		expenses) that any Indemnitee incurs or suffers as a result of, or arising out of, your breach of
		anything set forth in these legal terms, conditions and notices.
	    </p>

	    <p>
		Three Court understands that visitors to this Site are concerned about the privacy of their information.
		This policy applies to information collected from, or which may be submitted to, this Site. At the
		present time, Three Court does not collect any personally identifiable information about visitors to
		this Site. This Site does use “cookies” which may automatically collect certain information and data.
		“Cookies” are small pieces of data sent to your computer browser from our web server and stored on your
		computer’s hard drive. The data identifies you as a unique user and facilitates your ongoing access to
		and use of this Site. Cookies also help us diagnose server problems. Cookies do not provide use with any
		information about your name, address, phone number or email address, or any other personally
		identifiable information. We may, however, log visitor IP addresses. Three Court does not normally share
		any information collected from this Site with any parties outside of Three Court other than those
		parties required to service and maintain the Site. Three Court reserves the right to disclose any such
		information Three Court does collect when required by a valid subpoena or court order, or as otherwise
		permitted or required by law.
	    </p>

	    <p>
		If any of these legal terms, conditions and notices should be determined to be illegal, invalid or
		otherwise unenforceable, such legal terms, conditions or notices shall be severed and deleted from the
		clause concerned and the remaining legal terms, conditions and notices shall survive, remain in full
		force and effect and continue to be binding and enforceable.
	    </p>

	    <p>
		By accessing any part of this site, you shall be deemed to have accepted these.
	    </p>

	    <p>
		These legal terms, conditions and notices shall be governed by and construed in accordance with the law
		of New York and the parties submit to the jurisdiction of the Courts located in the City of New York.
	    </p>
	</div>
    </div>

</center>
</body>

</html>