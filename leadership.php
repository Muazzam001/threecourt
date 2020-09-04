<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">

<meta http-equiv="content-type" content="text/html;charset=UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1">
<head>
    <meta http-equiv="Content-Type" content="text/html; "/>
    <meta name="web_author" content="Axcel World, http://www.Axcelworld.com">
    <meta name="format-detection" content="telephone=no">
    <title>ThreeCourt, LP :: Leadaership</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link href="img/logopic.png" rel="Shortcut Icon"/>
    <link href='https://fonts.googleapis.com/css?family=Titillium+Web:400,200,300' rel='stylesheet' type='text/css'>
    <link href="css/style2.css" rel="stylesheet" type="text/css"/>
    <script>if (typeof jmodule == 'undefined') var jmodule = {};</script>
    <!--<script type="text/javascript" src="js/jquery.1.8.3.js"></script>-->
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

<body id="about" class="inner">
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
		    <a href="request-access">Request Access</a></td>
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

    <!--		navbar-->

    <nav class="navbar navbar-inverse bg-pages" id="topBarCont">
	<div class="container-fluid" id="top-bar">
	    <div class="navbar-header">

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
		<ul class="nav navbar-nav nav-color" id="nav"
		    fx='[{"applyTo":"a","hover":[["border-color","#FFFFFF","#0C195B",200]]}]'>
		    <li><a href="about">About</a></li>
		    <li><a href="leadership" class="nav-active">Leadership</a></li>
		    <li><a href="contact" id="contactLink">Contact</a></li>

		</ul>
	    </div>
	</div>
    </nav>

    <div id="container" class="about">
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

	    <div class="side leftSide">
		<h1>LEADERSHIP</h1>
	    </div>

	    <div class="side rightSide">
		<ce oet="1">
		    <p class="regUnderlined" style="border-top:none;">Three Court, LP was founded by Arthur Roulac and
			Arthur Kavalis in 2012.</p>

		</ce>
	    </div>
	</div>
    </div>
    <!--		footer-->


    <div id="footer" class="pages-footer bottom-fixed">
	<div class="container-fluid">
	    <div class="content homepage">
		<div class="footLeft foot-left-res">
		    <p class="footerBig">Three Court, LP<br>
			650 Fifth Avenue, 20<sup>th</sup> Floor<br>
			New York, NY 10019</p>
		</div>
		<div class="footRight foot-right-res">
		    <p class="footerBig lowercase">&#9400; Three Court, LP. All rights reserved.<br>Three Court and
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