/*
fx JavaScript library
Created by Alex Bobrov
Version 2.1
created on 1/05/2015
last update: 2/26/2016

4/21/16 improvements to scrollLinks slider functionality
3/29/16 when automatically calculating width of fx-nav in slider, account for possible border
3/8/16 fixed an issue with incorrect positioning when resizing the slider from mobile to desktop mode
2/26/16 when init is complete, "fx_ready" event is triggered.
2/25/16 added a duration to fx.sliders().to(), fx.sliders().next() and fx.sliders().prev() functions
if set, will switch to the slide in a specified duration. duration > 0
2/25/16 swiping ability can be added to any element: fx="{'swipe':{'swipeLeft':'function','swipeRight':'function'}}"
2/25/16 swiping on a slider on a mobile is an optional parameter, fixed issue when swiping on a slider that has sliders.
2/18/16 swiping on a slider will change the slide on a mobile device
2/18/16 fixed a bug in sFade effect when there's no initial slide and improved the nav transition in mobile mode.
2/11/16 added two more slider effects: revealTB and revealBT
1/15/16 when nav is on left or right, decreases the content width by 1 px so it will always fit, especially when nav is in percentages
1/6/16 added fx-select
1/5/16 added vertical navigation link sliding capabilities to a slider, example WestRock people page.
1/5/16 removed automatic addition of fx.css from the library
12/23/15 fixed bug when chained animation could not be stopped when there was a pause parameter
12/7/15 fixed bug of arrows not being vertically centered
12/7/15 new functionality of displaying slider arrows in a slide
12/7/15 fixed bug when javascript was executed twice if it was placed in a slider slide.
6/24/15 saving data in fx object rather than variable scope  - for fx sliders
3/28/15 improved event delegation
3/28/15 gets to the first slide right away (without animation)
3/28/15 improved efficiency

done accordion ajax
done, need to test - auto apply functionality - modifying $.html to intercept dom changes and run init if there are changes. - need to test it (monitor for dom changes)
do not let to switch slide while slide animation is in progress, on by default
not doing (track interaction)
for next version (see if can attach same event multiple times)
for next version destroy - removes fx

apply slider fixes:
fix position of arrow in mobile - considers margin but not after you slide - fixed 9/18/15
fix width of fx-nav on mobile - did not include padding in calculations - not fixing
remove float left when changing from mobile to desktop mode - fixed 9/18/15
add fx-mobile class when in mobile mode - easier to stylize elements - fixed 9/18/15

ideas:
add autoslide to slider
add next and prev buttons to slider - already there, perhaps let customize positioning
add fx-checkbox
for next version (see if can attach same event multiple times)
for next version destroy - removes fx
*/



(function() {
	"use strict";

	var fx = window.fx || 
	{
		// default settings
		defaults: {
			duration:500,
			easing:"linear", //"easeInBounce", //"easeOutQuad",
			slider_effect:"default",
			auto_init:0,
			auto_resize:1,
			init:0
		},
		fxa:[], //a collection of fx elements
	  swipes:[], //a collection of swipes
	  
		// processes inline fx requests
		init:function(C) 
		{
			//console.log(C);
			//var st=+ new Date();
			//if (!fx.hasOwnProperty("speed")) fx.setspeed();
			
			if (!C) C=$("body"); // initialize starting with body if no object is passed
			if (typeof C == "string") C=$(C); //if it's a string, convert to object
			
			var n=fx.fxa.length||0;
			//console.log("start",+ new Date());
			add_to_fx(C,C.attr("fx"));
			//var st=+ new Date();
			C.find("*").each(function() 
			{
				if ($(this).closest("pre").length) return true;
				add_to_fx($(this),$(this).attr("fx"));
			});
			//console.log("found all");
			loopFX(n);
			
			//done, run a trigger if it's a first init
			if (fx.defaults.init++==0) $(document).trigger("fx_ready");
			//console.log(+ new Date()-st);   
		},
		resize:function()
		{	
				//console.log("start resize",+ new Date());
				//var st=+new Date();
				var fx_t=fx.fxa.length;
				for (var a=0;a<fx_t;a++)
				{
					//console.log(a);
					for (var b=0;b<fx.fxa[a].fx.length;b++)
					{
						if (fx.fxa[a].fx[b].trigger=="slider")
						{
							//console.log("resizing:",a,b);
							resizeSlider(fx.fxa[a].element,fx.fxa[a].fx[b]);
							break;
						}
						else if (fx.fxa[a].fx[b].trigger=='select' && fx.fxa[a].fx[b].params.width=='fill')
						{
							resizeSelect(fx.fxa[a].element,fx.fxa[a].fx[b]);
						}	
					}
				}	
					
		},
		stop: function(ele,t) // (object OR fx_id), trigger (optional) - stops chain animations
		{
			var id=fx.fxa[fx.find(ele).a];
			if (t && isNaN(t)) // trigger is passed
			{
				for (var b=0;b<id.fx.length;b++)
				{
					if (id.fx[b].trigger==t) 
					{
						//console.log(id.fx[b],b,id);
						id.fx[b].next_chain=0;
						break;
					}
				}
			}
			else //stop all chains
			{
				for (var b=0;b<id.fx.length;b++)
				{
					if (id.fx[b].params[0] && id.fx[b].params[0][0] instanceof Array) id.fx[b].next_chain=0;
				}
			}
			//console.log("end stop");
		},
		start: function(ele,t,l,a) //(object OR fx_id), trigger (optional), which chain to start with (optional, but also indicates to trigger only chain events)
		{
			var o=fx.find(ele,t);
			var id=fx.fxa[o.a];
			var ele=id.element;
			//console.log(ele,t,l,id);
			if (t && isNaN(t)) // trigger is passed
			{
				
				for (var b=0;b<id.fx.length;b++)
				{
					if (id.fx[b].trigger==t) 
					{
						if (id.fx[b].chain)
						{
							id.fx[b].current_chain=l?l:1;
							//console.log("setting next chain to:",id.fx[b].current_chain);
							//id.fx[b].next_chain=id.fx[b].current_chain;
							//console.log(t+"chain-"+id.fx[b].current_chain);
							if (a)
							{
								//console.log("in a",a,ele);
								ele.find(a).trigger(t+"chain-"+id.fx[b].current_chain);
							}
							else
							{	
								//console.log("other");
								ele.trigger(t+"chain-"+id.fx[b].current_chain);
							}	
						}
						else
						{
							//console.log("no chain");
							ele.trigger(t);
						}		
						break;
					}
				}
			}
			else if (l) //will trigger all chain events
			{
				for (var b=0;b<id.fx.length;b++)
				{
					if (id.fx[b].params[0] && id.fx[b].params[0][0] instanceof Array)
					{
						id.fx[b].current_chain=l;
						//console.log(id.fx[b].trigger+"_chain-"+id.fx[b].current_chain);
						ele.trigger(id.fx[b].trigger+"chain-"+id.fx[b].current_chain);
					}	
				}
			}
			else // will trigger all events
			{
				for (var b=0;b<id.fx.length;b++)
				{
					if (id.fx[b].params[0] && id.fx[b].params[0][0] instanceof Array)
					{
						id.fx[b].current_chain=1;
						ele.trigger(id.fx[b].trigger+"chain-"+id.fx[b].current_chain);
					}
					else
					{
						ele.trigger(id.fx[b].trigger);
					}		
				}
			}		
		},
		resume: function(ele,t) // (object OR fx_id), trigger (optional)
		{
			var o=fx.find(ele);
			var cid=fx.fxa[o.a];
			//console.log(o);
			if (t && isNaN(t)) // trigger is passed
			{
				for (var b=0;b<cid.fx.length;b++)
				{
					if (cid.fx[b].trigger==t) 
					{
						var l=cid.fx[b].current_chain==cid.fx[b].max_chain?1:cid.fx[b].current_chain+1;
						
						fx.start(o.a,t,l);
						break;
					}	
				}
			}
			else
			{		
				//console.log("here");
				for (var b=0;b<cid.fx.length;b++)
				{
					if (cid.fx[b].chain)
					{
						var l=cid.fx[b].current_chain==cid.fx[b].max_chain?1:cid.fx[b].current_chain+1;
						//console.log(cid.fx[b].current_chain,l);
						fx.start(o.a,cid.fx[b].trigger,l);
					}	
				}
			}	
		},
		add: function(ele,params)
		{
			if (typeof ele == "string") ele=$(ele);
			
			var o=add_to_fx(ele,params,fx.find(ele).a);
			applyFX(o.fxa,o.er);
			//fx.reinit(o.fxa,o.sr,o.er);
			
			//loop_fx(ele_id);
			//rSlider(ele,fx.fxa[ele_id].fx[0]);
		},
		
		reinit:function(a,b,c)
		{
			if (b<0 && !c)
			{
				for (b=0;b<fx.fxa[a].fx.length;b++)
				{
					if (fx.fxa[a].fx[b].trigger!="accordion" && fx.fxa[a].fx[b].trigger!="slider") applyFX(a,b);
				}
			}
			else	
			{	
				for (var i=b;i<=c;i++)
				{
					applyFX(a,i);
				}	
			}	
		},
		slideAnimation: {   //(scr,s,w) //s,w,sType,duration,cs)
			"default": function(scr,s,w)
			{
				scr.stop().animate({left:-s.destination_slide*w+"px"},s.params.duration,s.params.easing);
			}
		},	
		modify: function(a,b,c,d,v)
		{
			var o=fx.find(a,b);
			if (typeof c == "string")
			{
				o.p[c]=d;
			}
			else
			{
				o.p.params[c][d]=v;
			}	
			//console.log(o,o.p[c]);
			applyFX(o.a,o.b);
			//console.log(id,b,id.fx[b],o,o.p[c]);
			//setTimeout(function() { applyFX(id,b); },50);
			//return fx.fxa[id].fx[b].params;
			//eval( id.fx[b].params=v; );
		},
		find: function(a,b)
		{
			if (typeof a == "string") a=$(a);
			if (typeof a == "object") a=parseInt(a.prop("fx-id"));
			
			if (!a) return {p:0,a:0,b:0};
			if (typeof b == "string")
			{
				for (var c=0;c<fx.fxa[a].fx.length;c++)
				{
					if (b==fx.fxa[a].fx[c].trigger)
					{
						b=c;
						break;
					}
				}
			}
			
			return {p:fx.fxa[a].fx[b],a:a,b:b};
		}		
	} // end of fx object
	
	try
	{
		Object.defineProperty(fx, "version", { enumerable: true, value: "2.1.1" });
	}
	catch(e)
	{
		fx.version="2.1.1";
	}	
	
	function sliderCommon(ele,settings)
	{
		//var st=+ new Date();
		var tw=ele.parent().width().toFixed(1); //settings.width+settings.params[2]+settings.params[4];
		var dh=0; //=slides_children.eq(settings.destination_slide).outerHeight();
		var has_slide;
		//console.log(settings.hasOwnProperty("current_slide"));
		
		if (settings.hasOwnProperty("current_slide")) //already has a slide
		{
			var cs=settings.current_slide;
			settings.slides_children.eq(settings.destination_slide).css({"margin-top":"","height":""});
			dh=settings.slides_children.eq(settings.destination_slide).outerHeight();
			//console.log("h",dh);
			//console.log(settings.sp,dh,settings.destination_slide,settings.slides_children);
			var w=$(window).width();
			settings.sp.animate({height:dh},{duration:settings.params.duration,complete:function() {
					//console.log("reset height",settings.sp.height());
					settings.sp.css("height","");
					//console.log(cs,slides_children.not(":eq("+cs+")"),slides_children.eq(cs));
					settings.slides_children.not(":eq("+settings.destination_slide+")").css({"margin-top":"1px","height":"0"});
					//console.log("after",sp.height());
				},
				step:function(n) {
					if (settings.params.resizeDetect && tw!=ele.parent().width().toFixed(1))
					{
						resizeSlider(ele,settings,1);
						tw=ele.parent().width().toFixed(1);
					}
					if (settings.params.nav.position == 'left')
					{
						ele.css('min-height',n+'px');
					}
				}
			});
			//console.log("h2",settings.params.effect,fx.slideAnimation[settings.params.effect]);
			fx.slideAnimation[settings.params.effect](settings.slides,settings,settings.width); //settings.destination_slide,settings.width,settings.params.effect,settings.params.duration,settings.current_slide);
			
			if (tw<=settings.params.responsive && !(settings.params.nav.scrollLinks instanceof Array))
			{
				//console.log(tw,mob);
				//console.log(settings.width,(settings.width-settings.params.leftArrowWidth-settings.params.rightArrowWidth));
				fx.slideAnimation[settings.params.effect](settings.list,settings,(settings.width-settings.params.leftArrowWidth-settings.params.rightArrowWidth));
				//scrollAnimation(list,settings,(settings.width-settings.params.leftArrowWidth-settings.params.rightArrowWidth)); //settings.destination_slide,(settings.width-settings.params[2]-settings.params[4]),settings.params[0],settings.params[5],settings.current_slide);
			}
			has_slide=1;
		}
		else //init state, get to the right slide right away
		{
			//console.log("init",ele);
			if (settings.params.slide==-1 && tw>settings.params.responsive) 
			{ 
				//sp.css("height",0); //animate({"height":0},duration/2);
				settings.list.children().trigger("fx-off").removeClass("fx-on");
				settings.slides_children.css({"margin-top":"1px","height":"0"});
			}
			else
			{
				//console.log('s3',(settings.params.slide||0),settings.destination_slide,slides_children.eq(settings.destination_slide));
				//var s=settings.params.slide||0;
				dh=settings.slides_children.eq(settings.destination_slide).outerHeight();
				settings.slides_children.eq(settings.destination_slide).css({"margin-top":"","height":""});
				settings.slides.children(":not(:eq("+(settings.destination_slide)+"))").css({"margin-top":"1px","height":"0"});
			}	
			settings.slides.css("left",-settings.destination_slide*settings.width+"px");
			if (settings.params.nav.position == 'left')
			{
				ele.css('min-height',settings.sp.height()+'px');
			}
			if (settings.width<=settings.params.responsive)
			{
				//console.log(tw,mob);
				settings.list.css("left",-settings.destination_slide*(settings.width-settings.params.leftArrowWidth-settings.params.rightArrowWidth)+"px");
			}
		}
		
		if ((settings.params.leftArrowWidth || settings.params.rightArrowWidth) && settings.destination_slide>=0)
		{	
			if (tw<=settings.params.responsive || !settings.params.nav.noArrows)
			{
				var t; 
				ele.children(".fx-left-arrow,.fx-right-arrow").show();
				if (tw>settings.params.responsive || settings.params.nav.scrollLinks instanceof Array)
				{	
					if (settings.params.nav.position=="bottom" || settings.params.nav.position=="left" || settings.params.nav.position=="right")
					{
						t=dh/2-ele.children(".fx-left-arrow").outerHeight()/2;	
					}
					else
					{
						t=dh/2+settings.lp.height()-ele.children(".fx-left-arrow").outerHeight()/2;	
						//console.log("arrow top",t);
					}	
				}
				else
				{
					t=(settings.params.nav.position=="bottom"?settings.sp.height():0)+settings.lp.outerHeight()/2-ele.children(".fx-left-arrow").outerHeight()/2;
				}	
				t=t<0?0:t;
				var d=settings.hasOwnProperty("current_slide")?settings.params.duration/2:0;
				ele.children(".fx-left-arrow,.fx-right-arrow").animate({"top":t},d);
				//console.log(t);
				if (settings.destination_slide==0) ele.children(".fx-left-arrow").animate({opacity:0.3},d);
				else ele.children(".fx-left-arrow").animate({opacity:1},d);
		
				if (settings.destination_slide==settings.slides_children.length-1) ele.children(".fx-right-arrow").animate({opacity:0.3},d);
				else ele.children(".fx-right-arrow").animate({opacity:1},d);
			}		
		}
		else if (settings.params.leftArrowWidth || settings.params.rightArrowWidth)
		{
			ele.children(".fx-left-arrow,.fx-right-arrow").hide();
		}	
		//console.log('s2');	
		//console.log('h',(params[8]=="left"?o.width:(o.width+la+ra)),o.rt);
		//console.log(settings.width,settings.params[6]);
		//console.log((settings.params.nav.position=="left"?settings.width+settings.lp.width():(settings.width+settings.params.leftArrowWidth+settings.params.rightArrowWidth)),settings.params.responsive);
		if ((settings.params.nav.position=="left"?settings.width+settings.lp.width():(settings.width+settings.params.leftArrowWidth+settings.params.rightArrowWidth))>settings.params.responsive)
		{
			//console.log('h');
			settings.list.children(":not(:eq("+settings.destination_slide+"))").trigger("fx-off").removeClass("fx-on");
		}
		//console.log((settings.params.leftArrowWidth || settings.params.rightArrowWidth),settings.destination_slide,settings.current_slide);
		
		
		setTimeout(function() {
			settings.current_slide=settings.destination_slide;
			$("html").css("cursor","");
			ele.css("cursor","").removeClass("fx-busy");
			//console.log(has_slide,settings.params.onend);
			if (has_slide) fcallback(settings.params.onend,ele);
		},settings.params.duration);	
		
		//console.log(slides.children(":eq("+s+")").outerHeight(),slides.children(":eq("+s+")").height(),s);
		
		//setTimeout(function() 
		//{ 
			//var hh=slides.children().eq(settings.destination_slide).outerHeight();
			//sp.animate({"height":hh+"px","min-height":hh+"px"},settings.params.duration/2);
			//ele.parents(".fx-slides").each(function() {
			//	console.log(hh+(o.ele.attr("fx-link-pos")!="left"?lp.height():0),$(this));
				//$(this).animate({"min-height":hh+(ele.attr("fx-link-pos")!="left"?lp.height():0)+"px"},duration/2).css("height","");
			//});	
		//},fx.delay);
		

	}
	/*
	var d={
			duration:500,
			easing:"linear", //"easeInBounce", //"easeOutQuad",
			cursor:"default",
			slider_effect:"default",
			auto:0
		};
	*/	
	
	
	

	
	
	/*
	function defaults() {
  		this.duration=500;
			this.easing="linear"; //"easeInBounce", //"easeOutQuad",
			this.cursor="default";
			this.slider_effect="default";
			var auto=0;

  Object.defineProperty(this, 'auto', {
    enumerable: true,
    get: function() {
      console.log('get!');
      return auto;
    },
    set: function(v) {
      auto = v;
      console.log("changing to ", auto);
      //archive.push({ val: temperature });
    }
  });

  //this.getArchive = function() { return archive; };
	};
	*/
	//fx.defaults = new defaults();
	//fx.d=t;
	
	function rAccordion(ele,settings)
	{
		//var st=+ new Date();
		ele.addClass("fx-accordion fx-hidden");
		//var duration=settings.params[0];
		//var exclusive=(!settings.params[1])?false:true;
		//var collapsible=(!settings.params[2])?false:true;
		//var easing=settings.params[4];
		
		
		//var w=ele.width();
		var list=ele.children(":even").addClass("fx-list");
		var slides=ele.children(":odd").addClass("fx-slide");
		//list;
		//slides;
		
		//console.log(settings);
		if (settings.params.nav.off)
		{
			//settings.params.nav.off[2]=settings.params.nav.off[2]||settings.duration||fx.defaults.duration;
			var off=settings.params.nav.off;
			//console.log(off);
			settings.params.nav.off={
				trigger:"fx-off",
				params: off,
				applyTo: ">.fx-list"	
			};
			solo_events(ele,settings.params.nav.off);
			//console.log("off",settings.off,list.not(".fx-on"));
			//settings.nav.push({trigger:"fx-off",params:settings.off,applyTo:list});
			//solo_events(list,settings.nav[settings.nav.length-1]);
		}
		if (settings.params.nav.on)
		{
			//settings.params.nav.on[2]=settings.params.nav.on[2]||settings.duration||fx.defaults.duration;
			var on=settings.params.nav.on;
			settings.params.nav.on={
				trigger:"fx-on",
				params: on,
				applyTo: ">.fx-list"	
			};
			solo_events(ele,settings.params.nav.on);
			//console.log("on",settings.on,list.is(".fx-on"),ele.children(":even"));
			//settings.nav.push({trigger:"fx-on",params:settings.on,applyTo:list});
			//solo_events(list,settings.nav[settings.nav.length-1]);
		}
					
					
		//console.log(list);
		ele.on("click",">.fx-list", function(e) {
			if (ele.hasClass("fx-busy")) return; 
			else ele.addClass("fx-busy");
			//console.log($(this),this);
			var lid=$(e.target);
			//console.log(lid);
			if (!lid.hasClass("fx-list")) lid=lid.closest(".fx-list");
			//console.log(lid);
			//console.log(lid);
			//console.log(e);
			fcallback(settings.params.onstart,ele);
			
			if (settings.params.cursor)
			{
				$("html").css("cursor",settings.params.cursor);
				ele.css("cursor",settings.params.cursor);
			}
			
			var s=lid.index()/2;
			if (settings.params.exclusive)
			{
				//find out if there's more efficient method
				//console.log('h');
				list.not(lid).each(function() {
						//if (s==$(this).index()) return true;
						if (!$(this).hasClass("fx-on")) return true;
						//console.log($(this));
						$(this).trigger("fx-off").removeClass("fx-on")
									 .next().stop().animate({"height":0,"padding-top":0,"padding-bottom":0},settings.params.duration,settings.params.easing);
				});
			}
			
			//console.log(settings.params.collapsible,list.not(this).hasClass("fx-on"),$(this).hasClass("fx-on"));
			if (lid.hasClass("fx-on") && (settings.params.collapsible || list.not(lid).hasClass("fx-on")))
			{
				//console.log("closing",lid.next());
				lid.trigger("fx-off").removeClass("fx-on").next().stop().animate({"height":0,"padding-top":0,"padding-bottom":0},settings.params.duration,settings.params.easing);
				//lid.next().css("height",0);
			}
			else if (!lid.hasClass("fx-on"))
			{	
				//var lid=$(this);
				if (settings.params.ajax && (!lid.next().html().length || settings.params.ajax[2]))
				{
					//console.log("before ajax");
					
					$.ajax({
						url:settings.params.ajax[1]||location.href,
						data:"SLIDE="+s+"&"+settings.params.ajax[0],
						type:"post",
						success:function(msg)
						{
							//console.log("after ajax");
							lid.next().html(msg);
							accordionCommon(lid,settings);
						}
					});
				}
				else
				{	
					//console.log("ac");
					accordionCommon(lid,settings);
				}
			}
			//alert("closed");
			setTimeout(function() 
			{ 
				//console.log("h");
				lid.parent().removeClass("fx-busy");
				if (settings.params.cursor)
				{
					$("html").css("cursor","");
					ele.css("cursor","");
				}
				fcallback(settings.params.onend,ele); 
			},settings.params.duration);	
		});
		//console.log("here");
		//setTimeout(function() {
		settings.params.slides=[];
		list.each(function() {
			  var n=$(this).next();
			  
			  settings.params.slides[$(this).index()/2]=
			  {
			  	//height:n.outerHeight(),
			  	pTop:n.css("padding-top"),
			  	pBottom:n.css("padding-bottom")
			  }
			  //console.log("h2");
				if ($(this).hasClass("fx-on"))
				{
					//console.log("h3");
					$(this).trigger("fx-on");
					n.css({"overflow":"hidden"});
					//console.log("h3");
				}
				else
				{	
					//console.log("h4");
					$(this).trigger("fx-off");
					n.css({"height":0,"overflow":"hidden","padding-top":0,"padding-bottom":0});
					//console.log("h4");
				}	
		});
		//console.log(settings);
		if (!settings.params.collapsible || settings.params.slide>=0)
		{
			var s=settings.params.slide||0;
			list.eq(s).click();
		}
		//},fx.delay);
		
		//if (!fx.hasOwnProperty("accordions")) { fx.accordions= []; }
		//fx.accordions.push(ele);
		//setTimeout(function() {
			ele.removeClass("fx-hidden");
		//},fx.delay);	
		//ele.removeClass("fx-hidden");
		//var et=+ new Date() - st;
		//console.log("accordion process:"+et, ele);
	}
	function accordionCommon(lid,settings)
	{
		//console.log(lid,settings);
		// picking up true height
		var h=lid.next().css("height","").height();
		lid.next().css("height",0);
		//console.log(lid.index()/2);
		lid .trigger("fx-on")
				.addClass("fx-on")
				.next()
				.stop()
				.animate({"height":h,"padding-top":settings.params.slides[lid.index()/2].pTop,"padding-bottom":settings.params.slides[lid.index()/2].pBottom},settings.params.duration,settings.params.easing,function() {
						lid.next().css("height","");
						settings.params.slides[lid.index()/2].height=lid.next().height();
				});
				
	}
	function rSlider(ele,settings)
	{
		//var st=+ new Date();
		//console.log(ele);
		ele.addClass("fx-hidden fx-slider"); //.addClass("fx-slider");
		ele.children(":last").find('script').remove();
		settings.slides=ele.children(":last");
		//console.log("in slider");
		if (ele.children().length<2)
		{
			var tl=settings.slides.children().length;
			var ts="";
			if (settings.params.ajax) //no slides
			{
				for (var i=0;i<tl;i++)
				{
					ts+='<div style="min-height:1px"></div>';
				}
				ele.append("<div>"+ts+"</div>");
				settings.slides=ele.children(":last");
			}
			else //no list of slides
			{
				for (var i=1;i<=tl;i++)
				{
					ts+="<a>"+i+"</a>";
				}
				ele.prepend("<div>"+ts+"</div>");	
			}	
		}
		//console.log("in 4");
		settings.list=ele.children(":first");
		
		var tw=ele.width();
		settings.list_children=settings.list.children();
		settings.list_children.addClass("fx-nav");
		settings.slides_children=settings.slides.children();
		//settings.total_slides=settings.list_children.length;
		//console.log("in 6");
		settings.list.wrap("<div class='fx-list'></div>");
		settings.lp=settings.list.parent();
		//console.log("in 7");
		settings.slides.wrap("<div class='fx-slides'></div>");
		//console.log("in 8");
		settings.sp=settings.slides.parent();
		//console.log("in 5");
		if (settings.params.nav.position=="bottom")
		{
			settings.lp.insertAfter(settings.sp);
		}
		if (ele.css("position")=="static") ele.addClass("fx-relative");
		if (settings.params.leftArrow)
		{ 
			$("<div class='fx-left-arrow' style='position:absolute;width:"+settings.params.leftArrowWidth+"px;left:"+((settings.params.nav.position=="left")?settings.lp.width():0)+"px'><img src='"+settings.params.leftArrow+"'></div>").appendTo(ele).click(function() {
				if (settings.current_slide>0 && !$(this).hasClass("fx-ignore"))
				{
					settings.list.children().eq(settings.current_slide-1).click();
				}
			});
		}
		if (settings.params.rightArrow) 
		{
			$("<div class='fx-right-arrow' style='text-align:right;position:absolute;width:"+settings.params.rightArrowWidth+"px;right:0'><img src='"+settings.params.rightArrow+"'></div>").appendTo(ele).click(function() {
				if (settings.current_slide<settings.list_children.length-1 && !$(this).hasClass("fx-ignore"))
				{
					settings.list.children().eq(settings.current_slide+1).click();
				}
			});
		}	
		
		
			//settings.nav=[];
		if (settings.params.nav.off)
		{
			//settings.nav.push({trigger:"fx-off",params:settings.params[13],applyTo:list.children(":not(.fx-on)")});
			var off=settings.params.nav.off;
			settings.params.nav.off={
				trigger: "fx-off",
				params: off,
				duration:settings.params.duration,
				applyTo: settings.list_children
			};
			//settings.params.nav.off.trigger="fx-off";
			//settings.params.nav.off.params=off;
			//settings.params.nav.off.applyTo=list.children(":not(.fx-on)");
			//console.log(settings.nav, settings.nav.off);
			solo_events(settings.list,settings.params.nav.off);
		}
		
		if (settings.params.nav.on)
		{
			//settings.nav.push({trigger:"fx-on",params:settings.params[12],applyTo:list.children(".fx-on")});
			//solo_events(list,settings.nav[settings.nav.length-1]);
			var on=settings.params.nav.on;
			settings.params.nav.on={
				trigger: "fx-on",
				params: on,
				duration:settings.params.duration,
				applyTo: settings.list_children
			};
			//settings.params.nav.on.trigger="fx-on";
			//settings.params.nav.on.params=on;
			//settings.params.nav.on.applyTo=list.children(".fx-on");
			solo_events(settings.list,settings.params.nav.on);
		}
		
		if (settings.params.nav.scrollLinks instanceof Array)
		{
			if (settings.params.nav.position == 'left' || settings.params.nav.position == 'right')
			{
				settings.lp.prepend('<a class="fx-list-left" style="display:block;width:100%;text-align:center;height:'+settings.params.nav.scrollLinks[2]+'px"><img src="'+settings.params.nav.scrollLinks[0]+'" border="0"/></a>');
				settings.lp.append('<a class="fx-list-right" style="display:block;width:100%;text-align:center;height:'+settings.params.nav.scrollLinks[2]+'px"><img src="'+settings.params.nav.scrollLinks[1]+'" border="0"/></a>');
				
				settings.lp.children(".fx-list-right").click(function() {
					if ($(this).hasClass("fx-ignore")) return;
					var id=$(this);
					id.addClass('fx-ignore');
					ne.animate({"top":"-="+settings.params.nav.scrollLinks[2] },settings.params.duration,settings.params.easing,function() {
						//ne.parent().outerWidth()-ne.position().left
						//console.log(ne.position().top,ne.position().top/settings.params.nav.scrollLinks[2]+settings.params.nav.scrollLinks[3],settings.lp.children().length);
						if (-ne.position().top/settings.params.nav.scrollLinks[2]+settings.params.nav.scrollLinks[3]<settings.list_children.length) id.removeClass('fx-ignore');
						//if (ne.parent().outerWidth()-ne.position().left>settings.list.children(".fx-nav:last").position().left) id.addClass("fx-ignore");
						settings.lp.children(".fx-list-left").removeClass("fx-ignore");
						//console.log(ne.parent().outerWidth()-ne.position().left,list.children(".fx-nav:last").position().left);	
					});
				});
				settings.lp.children(".fx-list-left").click(function() {
					if ($(this).hasClass("fx-ignore")) return;
					var id=$(this);
					id.addClass('fx-ignore');
					ne.animate({"top":"+="+settings.params.nav.scrollLinks[2] },settings.params.duration,settings.params.easing,function() {
						if (ne.position().top!=0) id.removeClass('fx-ignore');
						//if (ne.position().left==0) id.addClass("fx-ignore");
						settings.lp.children(".fx-list-right").removeClass("fx-ignore");
					});
				});
			}
			else
			{	
				settings.lp.prepend('<a class="fx-list-left" style="position:absolute;top:0;left:0;width:'+settings.params.nav.scrollLinks[2]+'px"><img src="'+settings.params.nav.scrollLinks[0]+'" border="0"/></a>');
				settings.lp.append('<a class="fx-list-right" style="position:absolute;top:0;right:0;width:'+settings.params.nav.scrollLinks[2]+'px"><img src="'+settings.params.nav.scrollLinks[1]+'" border="0"/></a>');
				
				settings.lp.children(".fx-list-right").click(function() {
					if ($(this).hasClass("fx-ignore")) return;
					var id=$(this);
					ne.animate({"left":"-="+ne.parent().outerWidth() },settings.params.duration,settings.params.easing,function() {
						//ne.parent().outerWidth()-ne.position().left
						if (ne.parent().outerWidth()-ne.position().left>settings.list.children(".fx-nav:last").position().left) id.addClass("fx-ignore");
						settings.lp.children(".fx-list-left").removeClass("fx-ignore");
						//console.log(ne.parent().outerWidth()-ne.position().left,list.children(".fx-nav:last").position().left);	
					});
				});
				settings.lp.children(".fx-list-left").click(function() {
					if ($(this).hasClass("fx-ignore")) return;
					var id=$(this);
					ne.animate({"left":"+="+ne.parent().outerWidth() },settings.params.duration,settings.params.easing,function() {
						if (ne.position().left==0) id.addClass("fx-ignore");
						settings.lp.children(".fx-list-right").removeClass("fx-ignore");
					});
				});
			}	
			var ne=settings.list.wrap("<div></div>");
			ne.addClass("fx-relative");
			
			
			
			//if (ne.parent().outerWidth()>list.children(".fx-nav:last").position().left) lp.children(".fx-list-right").addClass("fx-ignore");
			//console.log(ne,ne.parent(),ne.parent().outerWidth(),ne.parent().width(),list.children(".fx-nav:last").position().left,list.children(".fx-nav:last"));
			settings.lp.children(".fx-list-left").addClass("fx-ignore");
		}
		//console.log("in 2");
		settings.list.on("click",".fx-nav",function(e) {
			if (settings.params.ajax) e.preventDefault();
			//console.log(list,$(this),e.target);
			//console.log("in 3");
			var l=$(this);
			//console.log(l);
			//var slides=$(this).parent().parent().siblings(".fx-slides").children();
			//console.log(slides,slides.children());
			//var st=+ new Date();
			//if (!settings.current_slide) settings.current_slide=-1;
			//console.log(settings.current_slide,'h',settings.current_slide,settings.destination_slide,(settings.current_slide && settings.current_slide==settings.destination_slide));	
			//console.log(settings.params.allowClose,settings.current_slide,settings.destination_slide,l.index()); 
			//console.log(settings.hasOwnProperty("current_slide") && settings.current_slide==l.index() && !settings.params.allowClose);
			if ((!(settings.params.ajax && settings.params.ajax[2]) && (settings.hasOwnProperty("current_slide") && settings.current_slide==l.index() && !settings.params.allowClose)) || ele.hasClass("fx-busy") || l.hasClass("fx-ignore")) return;
			else ele.addClass("fx-busy");
			settings.destination_slide=l.index();
			//console.log("h2");
			fcallback(settings.params.onstart,ele);
			if (settings.params.cursor)
			{
				$("html").css("cursor",settings.params.cursor);
				ele.css("cursor",settings.params.cursor);
			}	
			//console.log(settings.allowClose,settings.current_slide,settings.destination_slide);
			if (settings.params.allowClose && settings.current_slide==settings.destination_slide && !(settings.params.nav.scrollLinks instanceof Array))
			{
				l.trigger("fx-off").removeClass("fx-on").addClass("fx-off");
				settings.sp.animate({"height":0},settings.params.duration,settings.params.easing,function() {
					settings.current_slide=-1; 
					$("html").css("cursor","");
					ele.css("cursor","").removeClass("fx-busy");	
				});
				
				//alert('h');
				//sliderCommon(ele,slides,list,settings,lp,sp,slides_children);
			}
			else
			{
				l.trigger("fx-on").addClass("fx-on");
				//console.log(slides.children());
				if (settings.params.ajax && (!settings.slides.children().eq(settings.destination_slide).html().length || settings.params.ajax[2]))
				{
					//console.log("before ajax");
					$.ajax({
						url:settings.params.ajax[1]||location.href,
						data:"SLIDE="+settings.destination_slide+"&"+settings.params.ajax[0],
						type:"post",
						success:function(msg)
						{
							//console.log("after ajax",slides_children.html().length,slides.children().eq(settings.destination_slide).html().length);
							settings.slides.children().eq(settings.destination_slide).html(msg);
							//console.log(slides_children,slides.children().eq(settings.destination_slide),"after ajax",slides_children.html().length,slides.children().eq(settings.destination_slide).html().length);
							if (!settings.hasOwnProperty("current_slide")) resizeSlider(ele,settings);
							
							//if (slides_children.eq(settings.destination_slide).html().length==slides.children().eq(settings.destination_slide).html().length)
							//{
								//console.log("resize");
								
							//}
							
							sliderCommon(ele,settings);
							//settings.current_slide=settings.destination_slide;
						}
					});
				}
				else
				{	
					sliderCommon(ele,settings);
					//settings.current_slide=settings.destination_slide;
				}
			}	

			//var et=+ new Date() - st;
			//console.log("half click slider process:"+et, o.ele);
			//console.log(settings.ajax,!slides.children().eq(settings.destination_slide).html().length);
			
			
		});
		
		//if (!settings.params.ajax) 
		resizeSlider(ele,settings);
		
		//var slide=settings.params.slide||0;
		
		if (location.hash)
		{
			$(location.hash.substring(1).split(",")).each(function(i,p)
			{
				//console.log(p,":",p.substring(0,6),"here",/(\d+)_/.exec(p)[1],/(\d+)_/.exec(p),/\d+_(\d+)/.exec(p)[1]);
				if (p.substring(0,6)=="slider" && settings.index==/(\d+)_/.exec(p)[1])
				{
					//console.log("match",/\d+_(\d+)/.exec(p)[1]);
					settings.params.slide= /\d+_(\d+)/.exec(p)[1];
					return true;
				}
				//console.log(i);
				//console.log(i,p,/(\d+)_/.exec(p)[1]);
			});
			//console.log("index",ele,ele.index(ele),ele.index("body .fx-slider"),/(\d+)_/.exec(location.hash.substring(7))[1]);
			//list.children().eq(/\d+_(\d+)/.exec(location.hash.substring(7))[1]).click();
		}
		if (!settings.params.slide) settings.params.slide=0;
		if (settings.params.slide>=0) settings.list.children().eq(settings.params.slide).click();
		else if (tw<=settings.params.responsive) settings.list.children().eq(0).click();
		else 
		{
			sliderCommon(ele,settings);
			settings.sp.height(0);
		}	
		
		if (settings.params.swipe) ele.swipe({swipeLeft:function() { fx.sliders(ele).next(); },swipeRight:function() { fx.sliders(ele).prev(); }});
		//settings.api=[];
		//settings.prototype = new fx.slidersAPI(ele);
		//setTimeout(function() { ele.removeClass("fx-hidden"); },fx.delay);
		ele.removeClass("fx-hidden");
		//console.log("slider end");
		//var et=+ new Date() - st;
		//console.log("slider process:"+et, ele);
	}
	fx.sliders = function (ele,b) {
		//console.log(ele,b,id);
		if (!(this instanceof fx.sliders)) return new fx.sliders(ele,b);
		if (typeof ele == "string")
		{
			ele=$(ele);
		}
		var id=ele;
		if (typeof ele != "object")
		{
			//console.log('h');
			ele=fx.fxa[ele].element;
		}
		else
		{
			id=ele.prop("fx-id");
		}
		//console.log(id,ele);
		if (!b && b!=0)
		{
			//console.log(ele,b,id);
			for(var i=0;i<fx.fxa[id].fx.length;i++)
			{
				if (fx.fxa[id].fx[i].trigger=="slider")
				{
					b=i;
					break;
				}
			}
		}
		this.fxa_id=id;
		this.fx_id=b;
		this.ele=ele;
		//this.params=a;
	}
	fx.sliders.prototype = {
		next:function(f) {
			var n=this.current();
			(n<this.count()-1)?n++:n=0;
			switch_slide(this,n,f);
			return this;
		},
		prev : function(f) {
			var n=this.current();
			(n>0)?n--:n=this.count()-1;
			switch_slide(this,n,f);
			return this;	
		},
		to : function(n,f)
		{
			switch_slide(this,n,f);
			return this;
		},
		count : function()
		{
			return fx.fxa[this.fxa_id].fx[this.fx_id].list_children.length;
			//return this.ele.children(".fx-list").children().children().length;
		},
		current : function()
		{
			//console.log(this);
			return fx.fxa[this.fxa_id].fx[this.fx_id].current_slide;
			//return this.ele.children(".fx-list").children().children(".fx-on").index();
		},
		destination : function()
		{
			return fx.fxa[this.fxa_id].fx[this.fx_id].destination_slide;
		},
		me : function() 
		{
			return this.ele;
		},
		disable : function()
		{
			this.ele.children(".fx-list").find(".fx-nav").addClass("fx-ignore");
			this.ele.children(".fx-left-arrow,.fx-right-arrow").addClass("fx-ignore");
			return this;
		},
		enable : function()
		{
			this.ele.children(".fx-list").find(".fx-nav:not(.fx-on)").removeClass("fg-ignore");
			this.ele.children(".fx-left-arrow,.fx-right-arrow").removeClass("fx-ignore");
			return this;
		},
		place : function()
		{
			return this.fxa_id;
		}
	}
	function switch_slide(e,n,f)
	{
		var d;
		if (f) 
		{ 
			d=fx.fxa[e.fxa_id].fx[e.fx_id].params.duration;
			fx.fxa[e.fxa_id].fx[e.fx_id].params.duration=f;
		}
		var c=e.ele.children(".fx-list").children('div').children(".fx-nav").length?e.ele.children(".fx-list").children('div').children(".fx-nav"):e.ele.children(".fx-list").children('div').children().children(".fx-nav");
		c.eq(n).click();
		if (f) fx.fxa[e.fxa_id].fx[e.fx_id].params.duration=d;
	}
	function solo_events(ele,settings)
	{
		//var st=+ new Date();
		//console.log(ele,settings);
		var temp=settings.trigger;
		if (settings.chain) //we have a chain, looping through chains
		{
			var maxchain=0;
			add_event(ele,{trigger:temp,applyTo:settings.applyTo,onstart:settings.onchain},0,[function() { fx.start(ele,temp); }]);
			$.each(settings.params, function(i, params) 
			{
				//console.log(ele,params,settings);
				var r = create_se_exe(ele,params,settings);
				settings.trigger=temp;
				settings.trigger+="chain"+"-"+(i+1);
				add_event(ele,settings,r[1],r[0]);
				maxchain++;
			});
			settings.trigger=temp;
			settings.max_chain=maxchain;

		}
		else
		{
			var r = create_se_exe(ele,settings.params,settings);
			//console.log(r,ele,settings.params,settings);
			add_event(ele,settings,r[1],r[0]);
		}		
		
		//var et=+ new Date() - st;
		//console.log("solo process:"+et, ele);		
	}
	function create_se_exe(ele,p,settings)
	{
		var max_duration=0;
		var to_exe= [];
		//console.log(p,settings);
		$.each(p, function(index, params) 
		{
			//console.log(params);
			var duration=params[2] || settings.duration || fx.defaults.duration;
			var easing=params[3] || settings.easing || fx.defaults.easing;
			//console.log(ele,settings,easing);
			//console.log(params[0],duration,easing,settings);
			//actions.push(params[0]);
			max_duration=duration > max_duration ? duration : max_duration;
			if (params[0]=="bgimage")
			{
				//console.log("here1");
				if (settings.applyTo || settings.target)
				{
					//console.log("here2",ele.find(settings.applyTo).length);
					var o;
					if (settings.applyTo && typeof settings.applyTo == "object") o=settings.applyTo; 
					else if (settings.applyTo) o=ele.find(settings.applyTo);
					else o=$(settings.target);
						//console.log(ele,o,settings.applyTo,ele.find(settings.applyTo),ele.find(settings.applyTo).length,ele.children());
					o.each(function() {
							//console.log("here3",$(this));
							to_exe.push(bgimage($(this),params,duration,easing));
					});
				}
				else
				{
					//var id=ele;
					if (ele.css("position")=="static") ele.addClass("fx-relative");
					var url = (params[1] instanceof Array)?params[1][id.index()]:params[1];
					//console.log(url);
					url = url!=""?"url("+url+")":"none";
					var ele_new = $("<div class='fx' style='display:inherit;background-repeat:inherit;background-size:inherit;background-position:inherit;background-color:inherit;left:0;top:0;width:100%;height:100%;position:absolute;margin:0;background-image:"+url+"'></div>").css("opacity",0).appendTo(ele);
					//console.log(ele_new);
					to_exe.push(function() {
						ele.children(".fx").not(ele_new).stop("bgimage",true,true).animate({opacity:0},{duration:duration/2,easing:easing,queue:"bgimage"}).dequeue("bgimage"); 
						ele_new.stop("bgimage",true,false).animate({opacity:1},{duration:duration,easing:easing,queue:"bgimage"}).dequeue("bgimage");
					});
				}	
			}
			
			else 
			{
				//ele.find(settings.applyTo).each(function() {
					//var id=$(this);
					//console.log("h");
					if (settings.target)
					{
						//console.log("multiple targets");
						//console.log("t1",settings.target);
						$(settings.target).each(function() {
							//console.log("target:", $(this));
							to_exe.push(solo_anim_targets($(this),params,duration,easing));
						});
					
					}
					else
					{
						//console.log(ele,params,duration,easing);
						to_exe.push(solo_anim(ele,params,duration,easing));
					}	
					
			}	
		});
		
		return [to_exe,max_duration];
	}
	function solo_anim(ele,params,duration,easing)
	{
		//console.log(ele,params,duration,easing);
		return function(id) {
			var anim={};
			//console.log(ele,params,easing);
			anim[params[0]]=(params[1] instanceof Array)?params[1][id.index()]:params[1];
			id.stop(params[0],true,false).animate(anim,{duration:duration,easing:easing,queue:params[0]}).dequeue(params[0]);
		};
	}
	function solo_anim_targets(ele,params,duration,easing)
	{
		//console.log("t");
		return function() {
				var anim={};
				anim[params[0]]=(params[1] instanceof Array)?params[1][ele.index()]:params[1];
				//console.log(ele,anim,params[0],params[1], (params[1] instanceof Array));
				ele.stop(params[0],true,false).animate(anim,{duration:duration,easing:easing,queue:params[0]}).dequeue(params[0]);
		};
	}
	function bgimage(id,params,duration,easing)
	{
		//var id=$(this);
		if (id.css("position")=="static") id.addClass("fx-relative");
		if (id.css("z-index")=="auto") id.addClass("fx-index");
		var url = (params[1] instanceof Array)?params[1][id.index()]:params[1];
		url = url!=""?"url("+url+")":"none";
		//console.log(url,params,id.index(id));
		var ele_new = $("<div class='fx' style='z-index:-1;display:inherit;background-repeat:inherit;background-size:inherit;background-position:inherit;background-color:transparent;left:0;top:0;width:100%;height:100%;position:absolute;margin:0;background-image:"+url+"'></div>").css("opacity",0).appendTo(id);
		return function(id) {
			//console.log(id);
			//console.log(id,params);
			id.each(function() {
				
				for (var c=0;c<=$(this).children(".fx").length;c++)
				{
					//console.log(ele_new[0],id.children(".fx")[c]);
					if (ele_new[0]===$(this).children(".fx")[c])
					{
						//console.log(ele_new,ele_new[0],id,id.children(".fx"),id.children(".fx")[c]);
						//console.log(ele_new,id,id.children(".fx"));
						$(this).children(".fx").not(ele_new).stop("bgimage",true,false).animate({opacity:0},{duration:duration/2,easing:easing,queue:"bgimage"}).dequeue("bgimage"); 
						ele_new.stop("bgimage",true,false).animate({opacity:1},{duration:duration,easing:easing,queue:"bgimage"}).dequeue("bgimage");
					}
				}
			});
		};
	}
	function multi_events(ele,settings)
	{
		if (settings.trigger=="toggleclick") settings.trigger="click";
		else if (settings.trigger=="toggledblclick") settings.trigger="dblclick";
		else if (settings.trigger=="togglefocus") settings.trigger="focus";
		else if (settings.trigger=="toggleblur") settings.trigger="blur";
		//else event_type=settings.type;
		
		var temp=settings.trigger;
		if (settings.chain) //we have a chain, looping through chains
		{
			var maxchain=0;
			//console.log("multi chain");
			//add_event(ele,{trigger:temp,applyTo:settings.applyTo},0,[function() { ele.trigger(temp+"chain-1"); }],a);
			//console.log("here",ele);
			add_event(ele,{trigger:temp,applyTo:settings.applyTo},0,[function(id) { settings.next_chain=1; if (!id.hasClass("fx-clear")) fx.start(ele,temp,1); else { id.toggleClass("fx-"+temp);  }  }]); // fx.stop(ele,temp);  fx.start(ele,temp,1);
			$.each(settings.params, function(i, params) 
			{
				var r = create_me_exe(ele,params,settings);
				settings.trigger=temp;
				//console.log(i,r);
				settings.trigger+="chain"+"-"+(i+1);
				add_event(ele,settings,r[1],r[0]);
				//console.log(ele,settings,r[1],r[0],a);
				maxchain++;
			});
			settings.trigger=temp;
			settings.max_chain=maxchain;

		}
		else
		{
			//console.log("here2",ele);
			//ele.toggleClass("fx-"+temp);
			
			var r = create_me_exe(ele,settings.params,settings);
			add_event(ele,settings,r[1],r[0]);
			settings.params.to_exe=r[0];
			//console.log(ele.attr("fx-id"),ele);
		}
	}
	
	function create_me_exe(ele,p,settings)
	{	
		var max_duration=0;
		var to_exe= [];
		//console.log(ele,p,settings);
		$.each(p, function(index, params) 
		{
			var duration=params[3]||settings.duration||fx.defaults.duration;
			var easing=params[4]||settings.easing||fx.defaults.easing;
			max_duration=duration > max_duration ? duration : max_duration;
			//console.log(ele,settings.applyTo);
			if (params[0]=="bgimage")
			{
				if (settings.applyTo || settings.target)
				{
					//console.log(ele,settings.applyTo);
					var o;
					if (settings.applyTo) o=ele.find(settings.applyTo);
					else o=$(settings.target);
					o.each(function() {
							to_exe.push(mbgimage($(this),params,duration,easing,settings));
					});
								
				}
				else
				{
						var id=settings.target?$(settings.target):ele;
						if (id.css("position")=="static") id.addClass("fx-relative");
						
						var url1 = (params[1] instanceof Array)?params[1][id.index()]:params[1];
						url1 = url1!=""?"url("+url1+")":"none";
						var url2 = (params[2] instanceof Array)?params[2][id.index()]:params[2];
						url2 = url2!=""?"url("+url2+")":"none";
						
						var ele_p1 = $("<div class='fx' style='display:inherit;background-repeat:inherit;background-size:inherit;background-position:inherit;background-color:inherit;left:0;top:0;width:100%;height:100%;position:absolute;margin:0;background-image:"+url1+"'></div>").css("opacity",0).appendTo(id);
						var ele_p2 = $("<div class='fx' style='display:inherit;background-repeat:inherit;background-size:inherit;background-position:inherit;background-color:inherit;left:0;top:0;width:100%;height:100%;position:absolute;margin:0;background-image:"+url2+"'></div>").css("opacity",0).appendTo(id);
						
						to_exe.push(function() {
							if (ele_p1.hasClass("fx-bgimage"))
							{
								ele_p1.stop("bgimage",true,false).animate({opacity:0},{duration:duration/2,easing:easing,queue:"bgimage"}).dequeue("bgimage").removeClass("fx-bgimage");
								ele_p2.stop("bgimage",true,false).animate({opacity:1},{duration:duration,easing:easing,queue:"bgimage"}).dequeue("bgimage");	
							}
							else
							{
								ele_p2.stop("bgimage",true,false).animate({opacity:0},{duration:duration/2,easing:easing,queue:"bgimage"}).dequeue("bgimage"); 
								ele_p1.stop("bgimage",true,false).animate({opacity:1},{duration:duration,easing:easing,queue:"bgimage"}).dequeue("bgimage").addClass("fx-bgimage");	
							}
						});
				}			
			}
			else
			{
				//console.log(params[0],params[1],params[2]);
				if (settings.target)
				{
					//console.log("multiple targets");
					$(settings.target).each(function() {
						//console.log("target:", $(this));
						to_exe.push(multi_anim_targets($(this),params,duration,easing,settings));
					});
				
				}
				else
				{
					//console.log(ele,params);
					to_exe.push(multi_anim(ele,params,duration,easing,settings));
				}	
				
			}	
		});	
		to_exe.push(function(id,t)
		{
			if (!(/chain/.test(t))) { id.toggleClass("fx-"+settings.trigger); }
		});  
		//console.log(ele,to_exe.length,settings.target);
		return [to_exe,max_duration];
		//add_event(ele,settings,max_duration,to_exe,a);		
			
	}
	function mbgimage(id,params,duration,easing,settings)
	{
		
						if (id.css("position")=="static") id.addClass("fx-relative");
						if (id.css("z-index")=="auto") id.addClass("fx-index");
						var url1 = (params[1] instanceof Array)?params[1][id.index()]:params[1];
						url1 = url1!=""?"url("+url1+")":"none";
						var url2 = (params[2] instanceof Array)?params[2][id.index()]:params[2];
						url2 = url2!=""?"url("+url2+")":"none";
						
						id.children(".fx-"+settings.trigger).remove();
						var ele_p1 = $("<div class='fx fx-"+settings.trigger+"' style='z-index:-1;display:inherit;background-repeat:inherit;background-size:inherit;background-position:inherit;background-color:transparent;left:0;top:0;width:100%;height:100%;position:absolute;margin:0;background-image:"+url1+"'></div>").css("opacity",0).appendTo(id);
						var ele_p2 = $("<div class='fx fx-"+settings.trigger+"' style='z-index:-1;display:inherit;background-repeat:inherit;background-size:inherit;background-position:inherit;background-color:transparent;left:0;top:0;width:100%;height:100%;position:absolute;margin:0;background-image:"+url2+"'></div>").css("opacity",0).appendTo(id);
						//console.log("<div style='display:inherit;background-repeat:inherit;background-size:inherit;background-position:inherit;background-color:inherit;left:0;top:0;width:100%;height:100%;position:absolute;margin:0;background-image:"+url1+"'></div>");
						//var ele_p1 = $("<div style='display:inherit;background-repeat:inherit;background-size:inherit;background-position:inherit;background-color:inherit;left:0;top:0;width:100%;height:100%;position:absolute;margin:0;background-image:"+url1+"'></div>").css("opacity",0).appendTo($(this)).addClass("fx");
	
		
				//var ele_p2 = $("<div style='display:inherit;background-repeat:inherit;background-size:inherit;background-position:inherit;background-color:inherit;left:0;top:0;width:100%;height:100%;position:absolute;margin:0;background-image:"+url2+"'></div>").css("opacity",0).appendTo($(this)).addClass("fx");
						//console.log(ele_p1,$(this));
						return function(id)  {
							//console.log(ele_p1,ele_p2,id.children(".fx"));
							for (var c=0;c<=id.children(".fx").length;c++)
							{
								if (ele_p1[0]===id.children(".fx")[c]) // || ele_p2[0]===id.children(".fx")[c]
								{
									if (ele_p1.hasClass("fx-bgimage"))
									{
										ele_p1.stop("bgimage",true,false).animate({opacity:0},{duration:duration/2,easing:easing,queue:"bgimage"}).dequeue("bgimage").removeClass("fx-bgimage");
										ele_p2.stop("bgimage",true,false).animate({opacity:1},{duration:duration,easing:easing,queue:"bgimage"}).dequeue("bgimage");	
									}
									else
									{
										ele_p2.stop("bgimage",true,false).animate({opacity:0},{duration:duration/2,easing:easing,queue:"bgimage"}).dequeue("bgimage"); 
										ele_p1.stop("bgimage",true,false).animate({opacity:1},{duration:duration,easing:easing,queue:"bgimage"}).dequeue("bgimage").addClass("fx-bgimage");	
									}
								}
							}	
						};
					
	}
	function multi_anim(id,params,duration,easing,settings)
	{
		return function(id,t) {
					var anim={};
					if (id.hasClass("fx-"+settings.trigger))
					{
						//console.log("anim1",id,params[0]);
						anim[params[0]]=(params[2] instanceof Array)?params[2][id.index()]:params[2];
					}
					else
					{	
						//console.log("anim2",id,params[0]);
						anim[params[0]]=(params[1] instanceof Array)?params[1][id.index()]:params[1];
					}
					id.stop(params[0],true,false).animate(anim,{duration:duration,easing:easing,queue:params[0]}).dequeue(params[0]);
				};
	}
	function multi_anim_targets(ele,params,duration,easing,settings)
	{
		return function(id,t) {
					var anim={};
					if (ele.hasClass("fx-"+settings.trigger))
					{
						//console.log("anim1",ele,id);
						anim[params[0]]=(params[2] instanceof Array)?params[2][ele.index()]:params[2];
					}
					else
					{	
						//console.log("anim2",ele,id);
						anim[params[0]]=(params[1] instanceof Array)?params[1][ele.index()]:params[1];
					}
					ele.stop(params[0],true,false).animate(anim,{duration:duration,easing:easing,queue:params[0]}).dequeue(params[0]);
				};
	}
	function add_event(ele,settings,max_duration,efunc,a)
	{
		//console.log("event: ",ele,settings,efunc);
		//console.log("event:"+settings.trigger);
		//console.log(ele);
		ele.off(settings.trigger,settings.applyTo).on(settings.trigger,settings.applyTo,function(e) {

			//console.log(e);
			//console.log($(e.currentTarget),$(e.target),ele,(prt && $(e.currentTarget)[0]==ele[0]));
			var o=settings.target?$(settings.target):(settings.applyTo && $(e.currentTarget)[0]==ele[0])?$(e.target):$(e.currentTarget);
			//console.log("running event",efunc.length,settings.target,o,e.currentTarget,e.target,settings.trigger);
			if (o.hasClass("fx-ignore")) return;
			if (!settings.chain || settings.current_chain==1) fcallback(settings.onstart,ele,o);
			//console.log("before",settings.trigger);
			for(var i=0;i<efunc.length;i++)
			{
				//console.log(efunc[i],o,prt);
				efunc[i](o,e.type);
			}
			
			if (settings.cursor) 
			{	
				$("html").css("cursor",settings.cursor);
				o.css("cursor",settings.cursor);
			}
			//console.log("in event",settings.trigger,efunc.length,settings,o);
			if (settings.chain) //there is a chain
			{
				if (settings.current_chain==settings.max_chain) settings.iterations++;
				//console.log("resetting next chain",settings.next_chain);
				settings.next_chain=(settings.stop==settings.iterations && settings.current_chain==settings.max_chain)?0:settings.current_chain==settings.max_chain?1:settings.current_chain+1;
				//console.log(settings.next_chain);
				//console.log("set chain",settings.next_chain,settings.current_chain,settings.max_chain);
			}	
			setTimeout(function() {
				if (settings.cursor) 
				{
					$("html").css("cursor","");
					o.css("cursor","");
				}
				if (settings.chain)
				{
					//console.log(settings.next_chain);
					if (!(settings.stop==settings.iterations && settings.current_chain==settings.max_chain)) 
					{
						o.not(".fx-clear").addClass("fx-clear"); 
						
						//console.log(settings.iterations);
					}	
					else 
					{ 
						//console.log("tog class");		
						o.removeClass("fx-clear"); 
						//o.toggleClass("fx-"+settings.trigger); 
					}
					if (settings.next_chain>0)
					{
						
						//console.log(ele,settings.trigger,settings.next_chain,o,settings.applyTo,settings.target);
						setTimeout(function() {
							if (settings.next_chain>0)
							{
								if (settings.applyTo) 
									fx.start(ele,settings.trigger,settings.next_chain,o);
								else
									fx.start(ele,settings.trigger,settings.next_chain);	
							}		
						},settings.pause||0);	
					}
					else
					{
						settings.iterations=0;
						fcallback(settings.onstop,ele,o);
					}
				}		
				//var st=+ new Date();
				
				//console.log(settings.params[0], settings.params[0][0] instanceof Array,settings.next_chain);
				
				
				if (!settings.chain || settings.current_chain==settings.max_chain) fcallback(settings.onend,ele,o);	
			
			},max_duration);
		});
	}
	function loopFX(n)
	{
		//console.log(n);
		var max_id=fx.fxa.length-1;
		for (var a=max_id;a>=n;a--)
		{
			loop_fx(a);
		}
	}
	function loop_fx(a)
	{
		for (var b=0;b<fx.fxa[a].fx.length;b++)
		{
			applyFX(a,b);		
		}
	}
	function applyFX(a,b)
	{
		var t=fx.fxa[a].fx[b].trigger;
		if (t=="slider")
		{
			if (fx.fxa[a].fx[b].applyTo)
			{
				fx.fxa[a].element.find(fx.fxa[a].fx[b].applyTo).each(function() {
						if (!$(this).hasClass("fx-ignore")) rSlider($(this),fx.fxa[a].fx[b]);
				});
			}
			else
			{
				if (!fx.fxa[a].element.hasClass("fx-ignore")) 
				{ 
					rSlider(fx.fxa[a].element,fx.fxa[a].fx[b]);
					//fx.fxa[a].fx[b].api = new fx.slidersAPI(a,b);
				}	
			}	
		}
		else if (t=="accordion")
		{
			if (fx.fxa[a].fx[b].applyTo)
			{
				//fx.fxa[a].element.find(fx.fxa[a].fx[b].applyTo).each(function() {
						//console.log($(fx.fxa[a].fx[b].applyTo),fx.fxa[a].fx[b],a,b);
						if (!$(fx.fxa[a].fx[b].applyTo).hasClass("fx-ignore")) rAccordion($(fx.fxa[a].fx[b].applyTo),fx.fxa[a].fx[b]);
				//});
			}
			else
			{
				if (!fx.fxa[a].element.hasClass("fx-ignore")) rAccordion(fx.fxa[a].element,fx.fxa[a].fx[b]);
			}
		}
		else if (t=="select")
		{
			wrapSelect(fx.fxa[a].element,fx.fxa[a].fx[b]);
		}	
		else if (t=="swipe")
		{
			Swipe(fx.fxa[a].element,fx.fxa[a].fx[b]);
		}
		else if (t=="togglefocus" || t=="toggleblur" || t=="hover" || t=="toggleclick" || t=="toggledblclick" || /^me\d+/i.test(t)) 
		{
			multi_events(fx.fxa[a].element,fx.fxa[a].fx[b]);
		}
		else //if (t=="mouseenter" || t=="mouseleave" || t=="click" || t=="dblclick" || /^se\d+/i.test(t)) 
		{
			solo_events(fx.fxa[a].element,fx.fxa[a].fx[b]);
		}
		
		/*	
		else
		{
			if (fx.defaults.errors) console.log("unrecognized trigger:" + t + " on " + fx.fxa[a].element);
		}
		*/
	}
	function wrapSelect(e,settings)
	{
		setTimeout(function()
		{
			var w;
			if (settings.params.width=='auto')
			{
				w=$(e).width();
			}
			else if (settings.params.width=='fill') 
			{
				w=$(e).parent().width();
			}	
			else
			{
				w=settings.params.width;
			}
			
			$(e).width(w+20).wrap('<div class="fx-select"></div>').parent().outerWidth(w);
			//console.log("wrapselect",$(e).parent().width(),$(e).parent().outerWidth(),$(e).parent().innerWidth(),$(e).parent().css("width"));
		},0);	
		
		//console.log("wrapselect",$(e).parent().width(),$(e).parent().outerWidth(),$(e).parent().innerWidth(),$(e).parent().css("width"));
	}
	function resizeSelect(e,settings)
	{
		$(e).parent().outerWidth(0);
		var w=$(e).parent().parent().width();
		$(e).width(w+20).parent().outerWidth(w);
	}
	function Swipe(e,settings)
	{
		e.swipe({swipeLeft:settings.params.swipeLeft,swipeRight:settings.params.swipeRight});
	}
	function fcallback(f,ele,o)
	{
		//console.log(ele);
		if (typeof window[f] === "function") 
		{
			window[f](ele,o);	
		}
		else if (f && /\./.test(f) && typeof eval(f) === "function") 
		{
			eval(f)(ele,o);
		}		
	}
	function resizeSlider(ele,settings,a)
	{
		//console.log("resizing ",ele);
		//var st=+ new Date();
		//console.log(ele,settings);
		var list=settings.list; //.children(); //.children(":not(.fx-list-left,.fx-list-right)"); //$(">.fx-list",ele).children(":not(.fx-list-left,.fx-list-right)");
		var slides=settings.slides; //$(">.fx-slides",ele).children();
		var list_css={},list_ch_css={},list_p_css={},slides_css={},slides_p_css={},slides_ch_css={},ele_ch_css={};
	  var slinks=settings.params.nav.scrollLinks instanceof Array;
		//console.log(1,settings.hasOwnProperty("current_slide"));
		//console.log(ele,settings.slides);
		if (!settings.hasOwnProperty("current_slide")) //first time init
		{
			//console.log(ele,settings.slides);
			ele.parents("table").addClass("fx-table-fix");
			list_css.position="relative";
			list_p_css.overflow="hidden";
			list_p_css.position="relative";
			slides_css.position="relative";
			slides_p_css.overflow="hidden";
			slides_p_css.position="relative";
			slides_ch_css["float"]="left";
			
			if (slinks)
			{
				list=settings.list.parent();
				list_css.overflow="hidden";
				
				if (settings.params.nav.position=="left" || settings.params.nav.position=="right")
				{
					list_css.height=settings.params.nav.scrollLinks[2]*settings.params.nav.scrollLinks[3]+"px";
				}
				else
				{
					list_css.margin="0 "+settings.params.nav.scrollLinks[2]+"px";
					var tw=0;
					list.children().children().each(function() {
						tw+=$(this).outerWidth(true);
					});
					//console.log(tw);
					list_ch_css.width=tw+"px";
					if (tw<=list.width()-settings.params.nav.scrollLinks[2]) $(".fx-list-left,.fx-list-right",ele).hide();
				}		
				//console.log(tw);
				//console.log(tw,list_ch_css,list.children());
			}
		}
		//else
		//{
			//console.log(slides.children(":eq("+settings.current_slide+")").height(),slides.children(":eq("+settings.current_slide+")").outerHeight(),settings.current_slide);
			//slides_p_css.height=slides.children().eq(settings.current_slide).height()+"px";
		//}	
		var tw=ele.parent().width().toFixed(1);
		
		var w=(settings.params.nav.noArrows||settings.params.nav.arrowsInside)&&tw>settings.params.responsive?tw:tw-(settings.params.leftArrowWidth+settings.params.rightArrowWidth);
		//console.log(tw,w,ele.parent(),ele.parent().width(),ele.parent().outerWidth());
		if (settings.width>0 && ((settings.width == w-(settings.params.nav.position=="left"||settings.params.nav.position=="right"?list.width():0) && tw>=settings.params.responsive) || (settings.width == tw && tw<settings.params.responsive))) return true;
		//console.log(tw,w,settings.params.leftArrowWidth,tw-(settings.params.leftArrowWidth+settings.params.rightArrowWidth));
		ele.addClass("fx-busy");
		
		var lp=list.parent();
		var sp=slides.parent();
    //console.log(tw,settings.params.responsive);
		if (tw<=settings.params.responsive) //mobile version
		{
			//console.log("here2");
			ele.addClass('fx-mobile');
			list.find(".fx-nav").trigger("fx-on").addClass("fx-on");
			var pl;
			if (!slinks) 
			{
				var pl=list.children().eq(0).css("padding-left");
				pl=pl.match(/\d*/);
				var pr=list.children().eq(0).css("padding-right");
				pr=pr.match(/\d*/);
				list_css.left=-(settings.current_slide*w)+"px";
				list_ch_css.width=w-pl-pr+"px";
				list_ch_css["float"]="left";
			}	
			//list_ch_ch_css.width="100%"; //.children(".fx").css("width","100%");	
			//console.log(w,tw);
			slides_p_css.width=tw+"px";
			slides_p_css["margin-left"]="";
			slides_p_css["margin-right"]="";
			//slides_p_css.height=slides.children(":eq("+settings.current_slide+")").height()+"px";
			var t=(settings.params.nav.position=="bottom"?sp.height():0)+lp.height()/2-ele.children(".fx-left-arrow").height()/2;
			t=t<0?0:t;
			slides_css.width=tw*slides.children().length+"px";
			slides_ch_css.width=tw+"px";
			ele_ch_css.top=t+"px";
			ele_ch_css.display="block"; 
			
			
			list_p_css["margin-right"]=settings.params.leftArrowWidth+"px";
			list_p_css["margin-left"]=settings.params.rightArrowWidth+"px"; 
			
			if(settings.params.nav.position=="left" || settings.params.nav.position=="right")
			{
				list_p_css["float"]="";
				slides_p_css["float"]="";
				list_p_css["width"]=w+"px";
				ele.children(".fx-left-arrow").css("left",0);
				//slides_css.width=tw*slides.children().length+"px";
				//console.log(slides_css.width,w,lp.width(),slides.children().length,tw);
				//slides_p_css["width"]=w+settings.params.leftArrowWidth+settings.params.rightArrowWidth+"px";
			}
			settings.width=tw;		
			w=tw;
			slides_css.left=-(settings.current_slide*w)+"px";	
			//console.log(list_css,list_ch_css,list_p_css);
		}
		else
		{
			ele.removeClass('fx-mobile');
			list_css.left="0px";
			//console.log("here",settings.params[9]);
			if (!settings.params.nav.manual)
			{
				var b=list.children(":eq(0)").outerWidth()-list.children(":eq(0)").innerWidth();
				list_ch_css["float"]="left";
				list_ch_css.width=tw/list.children().length-b+"px";
			}
			else if (!slinks)
			{
				list_ch_css.width="";
				list_ch_css["float"]="";
				list_css.width="";
			}
			//var ttw=w-(settings.params.nav.position=="left"||settings.params.nav.position=="right"?lp.outerWidth()+1:0);
			settings.width=w-(settings.params.nav.position=="left"||settings.params.nav.position=="right"?lp.outerWidth()+1:0);
			slides_p_css.width=settings.width+"px";
			//console.log(ele,w,slides_p_css.width,settings.params.nav.position,lp.outerWidth());
			if (settings.params.nav.noArrows||settings.params.nav.arrowsInside)
			{
				slides_p_css["margin-left"]=0;
				slides_p_css["margin-right"]=0;
			}
			else
			{		
				slides_p_css["margin-left"]=settings.params.leftArrowWidth+"px";
				slides_p_css["margin-right"]=settings.params.rightArrowWidth+"px";
			}	
			
			list_p_css["margin-right"]=0;
			list_p_css["margin-left"]=0;
			slides_css.width=settings.width*slides.children().length+"px";
			//console.log(w,settings.width,lp.outerWidth(),lp.parent());
			//console.log(slides_p_css.width,slides_css.width);
			slides_ch_css.width=settings.width+"px";
			//console.log(slides_css.width,slides_ch_css.width,lp.width(),w,lp);
			var t=slides.children().eq(settings.current_slide).height()/2+lp.height()-ele.children(".fx-left-arrow").height()/2;
			t=t<0?0:t;
			ele_ch_css.top=t+"px";
			//console.log(settings.current_slide);
			if (!a && settings.width && settings.current_slide>=0)
			{
				list.find(".fx-nav").not(":eq("+settings.current_slide+")").trigger("fx-off").removeClass("fx-on");
				list.find(".fx-nav").eq(settings.current_slide).trigger("fx-on").addClass("fx-on");
			}
			
			if(settings.params.nav.position=="left")
			{
				list_p_css["float"]="left";
				slides_p_css["float"]="right";
				list_p_css["width"]="";
				//slides_p_css["width"]=ttw;
				ele.children(".fx-left-arrow").css("left",list.parent().width());
			}
			else if(settings.params.nav.position=="right")
			{
				//console.log('h');
				list_p_css["float"]="right";
				slides_p_css["float"]="left";
				list_p_css["width"]="";
				//slides_p_css["width"]=ttw;
				ele.children(".fx-left-arrow").css("left",list.parent().width());
				//console.log(w,lp.width());
			}
			slides_css.left=-(settings.current_slide*(w-(settings.params.nav.position=="left"||settings.params.nav.position=="right"?lp.width():0)))+"px";	
		}
		//console.log(settings.params.nav.position,'hh');
		//console.log(settings.width);
		//console.log(list.children().children(".fx-nav:last"),list.children().children(".fx-nav:last").position().left);
		//console.log(list_css.width);
		if ((!settings.params.nav.manual && settings.params.nav.position!="right" && settings.params.nav.position!="left" && !slinks) || tw<=settings.params.responsive) list_css.width=w*list.children().length+"px";
		//console.log(list_css.width,w);
		
		//console.log(slides_css.left);
		//console.log(settings.current_slide,w);
		//console.log(settings.current_slide,w);
		if ((settings.params.nav.noArrows||settings.params.nav.noArrows)&&tw>settings.params.responsive) ele_ch_css.display="none"; else ele_ch_css.display="block";
		
		//console.log(ele.attr("fx-width"),la,ra,lp.width());
		//console.log(list,list_css);
		list.css(list_css);
		//console.log(list,list_css);
		//console.log(list.children(":not(.fx-list-left)"));
		//console.log(list.find(">.fx-nav"),list_ch_css);
		//console.log(list.children(),list_ch_css);
		list.children().css(list_ch_css);
		//console.log(list.children(),list_ch_css);
		//list.children().children(".fx").css(list_ch_ch_css);
		//console.log(list.parent(),list_p_css);
		list.parent().css(list_p_css);
		//console.log(slides_css);
		slides.css(slides_css);
		//console.log(slides,slides_css);
		//console.log(slides.parent(),slides_p_css);
		slides.parent().css(slides_p_css);
		slides.children().css(slides_ch_css);
		ele.children(".fx-left-arrow,.fx-right-arrow").css(ele_ch_css);
		//console.log(sp,sp.height(),slides,slides.height(),slides.outerHeight());
		
		
		if (slinks)
		{
			//console.log(list.outerWidth(),list.children().children(".fx-nav:last").position().left);
			if (tw<=settings.params.responsive) //mobile version
			{
				//console.log("click on first",list.children().children(".fx-nav:first"));
				
				list.children().children(".fx-nav:first").click();
				list.parent().css("display","none");
			}
			else
			{	
				list.parent().css("display","");
				if (list.outerWidth()>list.children().children(".fx-nav:last").position().left) list.parent().siblings(".fx-list-right").addClass("fx-ignore");
			}
		}
		ele.removeClass("fx-busy");
		//console.log(list.children().children(".fx-nav:last"),list.children().children(".fx-nav:last").position().left);
		
		
		//var et=+ new Date() - st;
		//console.log("resize process:"+et);
	}
	function add_to_fx(ele,r,ele_id)
	{
		//console.log("here",r, typeof r);
		if (!r) return;
		//console.log(ele, ele.tagName);
		//console.log("here",r);
		if (typeof r == "string") 
		{
			//r=r.replace(/\n|\r|\t/, ""); 
			if (r.substring(0,1)!="[") r="["+r+"]";
			r=r.replace(/'/g,'"');	
			//alert(r);
			//console.log(r);
			//console.log(r);
			r=$.parseJSON(r);
			
		}	
		//console.log("here",r);
		if (!ele_id)
		{
			fx.fxa.push({"fx":[],"element":ele});
			ele_id=fx.fxa.length-1;
			ele.prop("fx-id",ele_id);
			ele.removeAttr("fx");
		}	
		//console.log(r);
		//console.log(ele_id,id);
		//var maxchain=0;

		var sr=fx.fxa[ele_id].fx.length-1;
		$.each(r, function(index, s) {
			for (var p in s)
			{
				if (p=="applyTo" || p=="cursor" || p=="on" || p=="off" || p=="onstart" || p=="onend" || p=="chain" || p=="duration" || p=="target" || p=="stop" || p=="pause" || p=="onstop" || p=="easing") continue;
				//var params;
				
				
				if (p=="slider")
				{
					//console.log(s[p]);
					//slider params are now in object
					if (!s[p].nav) s[p].nav={};
					s[p].effect=s[p].effect||fx.defaults.slider_effect;
					s[p].leftArrowWidth=s[p].nav.leftArrowWidth||s[p].leftArrowWidth||0;
					s[p].rightArrowWidth=s[p].nav.rightArrowWidth||s[p].rightArrowWidth||0;
					s[p].leftArrow=s[p].nav.leftArrow||s[p].leftArrow;
					s[p].rightArrow=s[p].nav.rightArrow||s[p].rightArrow;
					s[p].duration=s[p].duration||s.duration||fx.defaults.duration;
					s[p].responsive=s[p].mobile||s[p].responsive||0;
					s[p].nav.position=s[p].nav.position||"top";
					s[p].nav.arrowsInside=s[p].nav.arrowsInside||0;
					s[p].easing=s[p].easing||s.easing||fx.defaults.easing;
					s[p].onstart=s[p].onstart||s.onstart;
					s[p].onend=s[p].onend||s.onend;
					s[p].cursor=s[p].cursor||s.cursor||"";
					s[p].resizeDetect=s[p].resizeDetect||0;
					s[p].swipe=s[p].swipe||0; //if set enables swiping on a touch device
					//s.index=ele_id;
					if (s.applyTo)
					{
						fx.fxa[ele_id].element.find(s.applyTo).each(function() {
							//var n=$.extend(true, {}, s[p]);
							$(this).attr("fx","{'slider':"+JSON.stringify(s[p])+"}"); 
							//fx.fxa[ele_id].fx.push({trigger:p,params:n,applyTo:this});
						});
					}
					else
					{	
						fx.fxa[ele_id].fx.push({trigger:p,params:s[p],index:ele_id});
					}	
					/*
					if (!(s[p] instanceof Array))
					{
						var params=[];
						params[0]=s[p].effect||"default";
						params[1]=s[p].leftArrow;
						params[2]=s[p].leftArrowWidth||0;
						params[3]=s[p].rightArrow;
						params[4]=s[p].rightArrowWidth||0;
						params[5]=s[p].duration||s.duration||fx.defaults.duration;
						params[6]=s[p].responsive||0;
						params[7]=s[p].slide;
						params[8]=s[p].navigation||"top";
						params[9]=s[p].navSimple;
						params[10]=s[p].noArrows;
						params[11]=s[p].ajax;
						params[12]=s[p].on;
						params[13]=s[p].off;
						params[14]=s[p].easing||fx.defaults.easing; // - for the future
						s[p]=params;
					}	
					else
					{
						s[p][0]=s[p][0]||"default";
						s[p][2]=s[p][2]||0;
						s[p][4]=s[p][4]||0;
						s[p][5]=s[p][5]||s.duration||fx.defaults.duration;
						s[p][6]=s[p][6]||0;
						s[p][8]=s[p][8]||"top";
					}
					*/	
				}
				else if (p=="accordion")
				{
					s[p].duration=s[p].duration||s.duration||fx.defaults.duration;
					s[p].easing=s[p].easing||s.easing||fx.defaults.easing;
					s[p].cursor=s[p].cursor||s.cursor||"";
					s[p].onstart=s[p].onstart||s.onstart;
					s[p].onend=s[p].onend||s.onend;
					s[p].collapsible=s[p].collapsible||0;
					s[p].exclusive=s[p].exclusive||0;
					if (!s[p].nav) s[p].nav={};
					//console.log(s[p]);
					
					if (s.applyTo)
					{
						fx.fxa[ele_id].element.find(s.applyTo).each(function() {
							//var n=$.extend(true, {}, s[p]); 
							$(this).attr("fx","{'accordion':"+JSON.stringify(s[p])+"}"); 
							//fx.fxa[ele_id].fx.push({trigger:p,params:n,applyTo:this});
						});
					}
					else
					{	
						fx.fxa[ele_id].fx.push({trigger:p,params:s[p]});
						//console.log(fx.fxa[ele_id]);
					}	
					//params[1]=!s[p].exclusive?false:true;
					/*
					if (!(s[p] instanceof Array))
					{
						//var exclusive=(!settings.params[1])?false:true;
						//var collapsible=(!settings.params[2])?false:true;
						var params=[];
						params[0]=s[p].duration||s.duration||fx.defaults.duration;
						params[1]=!s[p].exclusive?false:true;
						params[2]=!s[p].collapsible?false:true;
						params[3]=s[p].slide;
						params[4]=s[p].easing||fx.defaults.easing;
						s[p]=params;
					}
					else
					{
						s[p][0]=s[p][0]||s.duration||fx.defaults.duration;
						s[p][1]=!s[p][1]?false:true;
						s[p][2]=!s[p][2]?false:true;
						s[p][4]=s[p][4]||fx.defaults.easing;
					}	
					*/	
				}
				else if (p == "select")
				{
					s[p].width=s[p].width||"auto";
					if (s.applyTo)
					{
						fx.fxa[ele_id].element.find(s.applyTo).each(function() {
							$(this).attr("fx","{'select':"+JSON.stringify(s[p])+"}"); 
						});
					}
					else
					{	
						fx.fxa[ele_id].fx.push({trigger:p,params:s[p]});
					}
				}	
				else //sliders and accordions cannot be chains, and this is not a slider or accordion so checking if it's a chain
				{
					var chain=0;
					if (s[p] && s[p][0] && s[p][0][0] instanceof Array)	chain=1;
					if (chain) fx.fxa[ele_id].fx.push({trigger:p,params:s[p],applyTo:s.applyTo,cursor:s.cursor,onstart:s.onstart,onend:s.onend,duration:s.duration,target:s.target,chain:chain,stop:s.stop,pause:s.pause,onstop:s.onstop,onchain:s.onchain,iterations:0,easing:s.easing});
					else fx.fxa[ele_id].fx.push({trigger:p,params:s[p],applyTo:s.applyTo,cursor:s.cursor,onstart:s.onstart,onend:s.onend,duration:s.duration,target:s.target,easing:s.easing});
				}	
				
				//fx.fxa[ele_id].fx.push({trigger:p,params:s[p],applyTo:s.applyTo,cursor:s.cursor,onstart:s.onstart,onend:s.onend,duration:s.duration,target:s.target,chain:chain,stop:s.stop,pause:s.pause,onstop:s.onstop,iterations:0});
				//if (s.chain && s.chain>maxchain) maxchain=s.chain;
			}
		});
		var er=fx.fxa[ele_id].fx.length-1;
		//fx.fxa[ele_id].max_chain=fx.fxa[ele_id].max_chain||maxchain;
		//fx.fxa[ele_id].current_chain=fx.fxa[ele_id].current_chain||0;
		
		//console.log(ele_id,sr,er);
		return {fxa:ele_id,sr:sr,er:er};
		//ele.removeAttr("fx");	
	}
	
	$(document).ready(function() {
		/*
		if (document.createStyleSheet)
		{
    	document.createStyleSheet('/cs/fx.css');
    }
    else 
    {
			$('<link/>', {rel: 'stylesheet', href: '/cs/fx.css'}).appendTo('head');
    }
    */
    //console.log('h');
    if (fx.defaults.auto_init) fx.init();
    $(window).resize(function() 
		{ 
			//console.log('h');
			if (fx.defaults.auto_resize)
			{
				clearTimeout(fx.resizeEvent);
				fx.resizeEvent=setTimeout(function() { fx.resize(); },150);
			}	
		});
		
	});
	window.fx=fx;
	
	
	
	(function($) {
		 
   $.fn.swipe = function(settings) {
     var config = {
    	min_move_x: 100,
    	max_move_y: 25,
 			swipeLeft: function() { },
 			swipeRight: function() { }
	 };
     
   if (settings) $.extend(config, settings);
   
   this.each(function() {
  	 var startX;
  	 var startY;
	 	 var isMoving = false;

  	 function onTouchMove(e) {
  		 if(isMoving) {
  		 	
  		 	 //if (e.touches)
  		 	 //{
    		 	var x = e.touches[0].pageX;
    		 	var y = e.touches[0].pageY;
    		// }
    		 //else
    		 //{
    		 //	var x = e.pageX;
    		 //	var y = e.pageY;
    		 //}		
    		 var dx = startX - x;
    		 var dy = startY - y;
    		 //alert(counter);
    		 if(Math.abs(dx) >= config.min_move_x && Math.abs(dy)<=config.max_move_y) 
    		 {
    			this.removeEventListener('touchmove', onTouchMove);
  		 		//this.removeEventListener('mousemove', onTouchMove);
  		 		startX = null;
  		 		isMoving = false;
    			var id=this;
					//alert(isAlone(id));
    			if (!$(this).hasClass("fx-slider") || isAlone(id))
    			{
	    			//alert(dx+config.swipeLeft);
	    			if(dx > 0)
	    			{ 
	    				if (typeof config.swipeLeft == 'string') fcallback(config.swipeLeft,$(this)); else config.swipeLeft(this);
	    			}	
	    			else 
	    			{
	    				if (typeof config.swipeRight == 'string') fcallback(config.swipeRight,$(this)); else config.swipeRight(this);
	    			}	
	    			fx.swipes=[];
    			}
    		 }
    		 //alert($(this).get(0));
  		 }
  	 }
  	 
  	 function isAlone(id)
  	 {
  	 		if (fx.swipes.length==1) return 1;
  	 		for(var i=0;i<fx.swipes.length;i++)
  			{
  				if (fx.sliders($(id)).place()>=fx.swipes[i]) return 1;
  			}
  			return 0;
  	 }
  	 function onTouchStart(e)
  	 {
  		 //alert("swipe3"+e.touches.length);
  		 //console.log('h');
  		 if (e.touches && e.touches.length == 1) 
  		 {
  			 startX = e.touches[0].pageX;
  			 startY = e.touches[0].pageY;
  			 isMoving = true;
  			 if ($(this).hasClass("fx-slider")) fx.swipes.push(fx.sliders($(this)).place());
  			 this.addEventListener('touchmove', onTouchMove, false);
  		 }
  		 /*
  		 else
  		 {
  		 		startX = e.pageX;
  			 startY = e.pageY;
  			 isMoving = true;
  			 //console.log(this,FXswipes);
  			 fx.swipes.push(fx.sliders($(this)).place());
  			 this.addEventListener('mousemove', onTouchMove, false);
  		 }
  		 */	
  		 //FXswipes.push(this);
  		 //console.log(this);
  	 }    	 
  	 //if ('ontouchstart' in document.documentElement) 
  		 this.addEventListener('touchstart', onTouchStart, false);
  		 //this.addEventListener('mousedown', onTouchStart, false);
  	 
   });

   return this;
 };
 
 })(jQuery);
})();

(function( $, oldHtmlMethod ){
    // Override the core html method in the jQuery object.
    $.fn.html = function(){
        // Execute the original HTML method using the
        // augmented arguments collection.

        var r = oldHtmlMethod.apply( this, arguments );
        
        //console.log($(this),arguments);
        //console.log('h2');
        if (fx.defaults.auto_init && arguments.length) fx.init($(this));
        return r;

    };
})( jQuery, jQuery.fn.html );
	
$.extend(fx.slideAnimation,
{
	slideFade: function(scr,s,w)
	{
		scr.css({"opacity":0,"left":-s.destination_slide*w+100+"px"}).stop().animate({
				opacity:1,
				left:-s.destination_slide*w+"px"	
			},s.params.duration,s.params.easing,function() {
					scr.children(":lt("+(s.destination_slide)+")").css("opacity","");
			}).children(":lt("+(s.destination_slide)+")").css("opacity",0);
	},
	fade: function(scr,s,w)
	{
		scr.stop().animate({opacity:0},s.params.duration/2,s.params.easing,function() {
			scr.css("left",-s.destination_slide*w+"px");
			scr.stop().animate({
				opacity:1
			},s.params.duration/2,s.params.easing);
		});
	},
	sFade: function(scr,s,w)
	{
			scr.css("left",0).children().css({"left":w+"px","position":"absolute","top":0});
			if (s.current_slide !== "undefined")
			{
				scr.children().eq(s.current_slide).css("left",0).animate({opacity:0},s.params.duration,s.params.easing);
			}
			
			scr.height(scr.children().eq(s.destination_slide).outerHeight()).children().eq(s.destination_slide)
					.css({"opacity":0,"left":0})
					.animate({opacity:1},s.params.duration,s.params.easing,function() {
					scr.css({"height":"","left":-s.destination_slide*w+"px"}).children().css({"position":"","top":"","left":"","opacity":""});
			});	
			
	},
	FadeInRL: function(scr,s,w,f)
	{
		var ww=w/10; //scr.children(":first").width()/10;
		var ss=s.params.duration/(ww);
		
		for (var i=0;i<ww;i++)
		{
			var new_ele=scr.parent().append('<div style="width:10px;overflow:hidden;position:absolute;left:'+(i*10)+'px;top:0"><div style="left:'+(-i*10)+'px;position:relative;width:'+w+'px;">'+scr.children().eq(s.destination_slide).html()+'</div></div>').children(":last").css("opacity",0); //fadeOut(0,0);	
			var sp=(f)?ss*i:ss*(ww-i);
			(function(new_ele,sp)
			{
					setTimeout(function() { new_ele.animate({opacity:1}, s.params.duration/2,s.params.easing); },sp);
			}(new_ele,sp));
		}
		setTimeout(function() {
				scr.css({left:-s.destination_slide*w+"px"}).parent().children(":gt(0)").remove();
		},s.params.duration+30);
		
	},
	FadeInLR: function(scr,s,w)
	{
		this.FadeInRL(scr,s,w,1);
	},
	revealRL: function(scr,s,w,f)
	{
		var w2=(f)?-w:w;
		var cs=s.current_slide;
		scr.css({left:0}).children().eq(cs).css({'left':0,'position':'absolute','top':0,'z-index':998});
		scr.children().eq(s.destination_slide).css({'left':w2+'px','height':'','position':'absolute','top':0,'z-index':999})
		.animate({left:0},s.params.duration,function(){
			scr.css({left:-s.destination_slide*w+"px"}).children().eq(s.destination_slide).css({'position':'','top':'','left':'','z-index':''});
			scr.children().eq(cs).css({'left':'','position':'','top':'','z-index':''});
		});
	},
	revealLR: function(scr,s,w)
	{
		this.revealRL(scr,s,w,1);
	},
	revealBT: function(scr,s,w,f)
	{
		var cs=s.current_slide;
		//scr.parent().css("overflow-y","hidden");
		scr.css({left:0}).children().eq(cs).css({'left':0,'position':'absolute','top':0,'z-index':998});
		scr.children().eq(s.destination_slide).css({'left':0,'height':'','position':'absolute','z-index':999});
		var w2=(f)?-scr.children().eq(s.destination_slide).height():scr.children().eq(cs).height();
		scr.children().eq(s.destination_slide).css({'top':w2+'px'})
		.animate({top:0},s.params.duration,function(){
			//scr.parent().css("overflow-y","");
			scr.css({left:-s.destination_slide*w+"px"}).children().eq(s.destination_slide).css({'position':'','top':'','left':'','z-index':''});
			scr.children().eq(cs).css({'left':'','position':'','top':'','z-index':''});
		});
	},
	revealTB: function(scr,s,w)
	{
		this.revealBT(scr,s,w,1);
	},
	FadeInBT: function(scr,s,w,f)
	{
		var hh=scr.children().eq(s.current_slide).height()/10;
		var ss=s.params.duration/(hh);
		for (var i=0;i<hh;i++)
		{
			var new_ele=scr.parent().append('<div style="height:10px;width:100%;overflow:hidden;position:absolute;left:0;top:'+(i*10)+'px;"><div style="left:0;position:relative;width:100%;top:-'+(i*10)+'px">'+scr.children().eq(s.destination_slide).html()+'</div></div>').children(":last").css("opacity",0); //fadeOut(0,0);	
			var sp=(f)?ss*i:ss*(hh-i);
			(function(new_ele,sp)
			{	
					setTimeout(function() { new_ele.animate({opacity:1},(s.params.duration/2),s.params.easing); },sp);
			}(new_ele,sp));
		}
		setTimeout(function() {
				scr.stop().css({left:-s.destination_slide*w+"px"}).parent().children(":gt(0)").remove();
		},s.params.duration+30);
	},
	FadeInTB: function(scr,s,w)
	{
		this.FadeInBT(scr,s,w,1);
	},	
	diagonalTL: function(scr,s,w)
	{
			var hh=scr.children().eq(s.current_slide).height()/14;
			var ww=scr.children().eq(s.current_slide).width()/14;
			var ss=s.params.duration/(28);
			for (var b=0;b<14;b++)
			{
				for (var a=0;a<14;a++)
				{
					var new_ele=scr.parent().append('<div style="height:'+hh+'px;width:'+ww+'px;overflow:hidden;position:absolute;left:'+(a*ww)+'px;top:'+(b*hh)+'px;"><div style="left:'+(-a*ww)+'px;position:relative;height:'+hh*14+'px;width:'+ww*14+'px;top:'+(-b*hh)+'px">'+scr.children().eq(s.destination_slide).html()+'</div></div>').children(":last").css("opacity",0);
					var sp=(a+b)*ss;
					(function(new_ele,sp)
					{
							setTimeout(function() { new_ele.animate({opacity:1},s.params.duration/2,s.params.easing); },sp);
					}(new_ele,sp));
				}
			}
			setTimeout(function() {
					scr.stop().css({left:-s.destination_slide*w+"px"}).parent().children(":gt(0)").remove();
			},s.params.duration+30);
	},
	cool: function(scr,s,w)
	{
			//console.log(scr,s,w);
			var bi=[];
			var ele=scr.parent().append('<div class="fx-holder" style="width:100%;height:100%;position:absolute;background:#000;"><div style="background:#000;opacity:0;z-index:5;position:absolute;width:100%;height:100%"></div></div>').children(".fx-holder");
			scr.children().each(function(index) {
				bi.push($(this).css("background-image"));
				bi[index]=bi[index].replace(/"/g,"'");
				//console.log(bi[index]);
				if (index == 0)
				{
					if (s.current_slide==index)
					{
						ele.append('<div style="z-index:1;width:50%;height:50%;position:absolute;top:0;left:0;"><div style="background-image:'+bi[index]+';background-position:0 0;background-size:200%;width:100%;height:100%;position:absolute;"></div></div>');
						ele.append('<div style="z-index:1;width:50%;height:50%;position:absolute;top:50%;left:0;"><div style="background-image:'+bi[index]+';background-position:0 -100%;background-size:200%;width:100%;height:100%;position:absolute;"></div></div>');
						ele.append('<div style="z-index:1;width:50%;height:100%;position:absolute;top:0;left:50%;"><div style="background-image:'+bi[index]+';background-position:-100% 0;background-size:200%;width:100%;height:100%;position:absolute;"></div></div>');
					}
					else
					{	
						ele.append('<div style="width:25%;height:25%;position:absolute;top:0;left:0;"><div style="background-image:'+bi[index]+';background-position:0 0;background-size:200%;width:100%;height:100%;position:absolute;"></div></div>');
						ele.append('<div style="width:25%;height:25%;position:absolute;top:50%;left:25%"><div style="background-image:'+bi[index]+';background-position:0 -100%;background-size:200%;width:100%;height:100%;position:absolute;"></div></div>');
						ele.append('<div style="width:25%;height:50%;position:absolute;top:0;left:75%"><div style="background-image:'+bi[index]+';background-position:-100% 0;background-size:200%;width:100%;height:100%;position:absolute;"></div></div>');
					}	
				}
				else if (index ==1)
				{
					if (s.current_slide==index)
					{
						ele.append('<div style="z-index:1;width:100%;height:50%;position:absolute;top:0;left:0;"><div style="background-image:'+bi[index]+';background-position:0 0;background-size:100%;width:100%;height:100%;position:absolute;"></div></div>');
						ele.append('<div style="z-index:1;width:50%;height:50%;position:absolute;top:50%;left:0;"><div style="background-image:'+bi[index]+';background-position:0 -100%;background-size:200%;width:100%;height:100%;position:absolute;"></div></div>');
						ele.append('<div style="z-index:1;width:50%;height:50%;position:absolute;top:50%;left:50%;"><div style="background-image:'+bi[index]+';background-position:-100% -100%;background-size:200%;width:100%;height:100%;position:absolute;"></div></div>');
					}
					else
					{	
						ele.append('<div style="width:45%;height:20%;position:absolute;top:0;left:20%"><div style="background-image:'+bi[index]+';background-position:0 0;background-size:200%;width:100%;height:100%;position:absolute;"></div></div>');
						ele.append('<div style="width:20%;height:20%;position:absolute;top:20%;left:0"><div style="background-image:'+bi[index]+';background-position:0 -100%;background-size:200%;width:100%;height:100%;position:absolute;"></div></div>');
						ele.append('<div style="width:20%;height:20%;position:absolute;top:45%;left:45%"><div style="background-image:'+bi[index]+';background-position:-100% -100%;background-size:200%;width:100%;height:100%;position:absolute;"></div></div>');
					}	
				}
				else if (index==2)
				{
					if (s.current_slide==index)
					{
					}
					else
					{
						ele.append('<div style="width:20%;height:20%;position:absolute;top:30%;left:30%;"><div style="background-image:'+bi[index]+';background-position:0 0;background-size:200%;width:100%;height:100%;position:absolute;"></div></div>');
						ele.append('<div style="width:20%;height:20%;position:absolute;top:55%;left:80%;"><div style="background-image:'+bi[index]+';background-position:-100% 0;background-size:200%;width:100%;height:100%;position:absolute;"></div></div>');
						ele.append('<div style="width:45%;height:20%;position:absolute;top:80%;left:30%;"><div style="background-image:'+bi[index]+';background-position:0 -100%;background-size:200%;width:100%;height:100%;position:absolute;"></div></div>');
					}	
				}
				else if (index==3)
				{
					if (s.current_slide==index)
					{
					}
					else
					{
						ele.append('<div style="width:20%;height:45%;position:absolute;top:45%;left:-5%;"><div style="background-image:'+bi[index]+';background-position:0 0;background-size:200%;width:100%;height:100%;position:absolute;"></div></div>');
						ele.append('<div style="width:20;height:20%;position:absolute;top:20%;left:45%;"><div style="background-image:'+bi[index]+';background-position:-100% 0;background-size:200%;width:100%;height:100%;position:absolute;"></div></div>');
						ele.append('<div style="width:20%;height:20%;position:absolute;top:70%;left:70%;"><div style="background-image:'+bi[index]+';background-position:-100% -100%;background-size:200%;width:100%;height:100%;position:absolute;"></div></div>');
					}	
				}			
			});
			
			//return;
			ele.children("div:first").animate({opacity:0.7},s.params.duration/3);
			//ele.children(":gt(0)").animate({opacity:1},s.params.duration/3);
			
			ele.children().eq(1).animate({width:25+"%",height:25+"%",top:0+"%",left:0+"%"},s.params.duration/3);
			ele.children().eq(2).animate({width:25+"%",height:25+"%",top:50+"%",left:25+"%"},s.params.duration/3);
			ele.children().eq(3).animate({width:25+"%",height:50+"%",top:0+"%",left:75+"%"},s.params.duration/3);
			
			ele.children().eq(4).animate({width:50+"%",height:25+"%",top:0+"%",left:25+"%"},s.params.duration/3);
			ele.children().eq(5).animate({width:25+"%",height:25+"%",top:25+"%",left:0+"%"},s.params.duration/3);
			ele.children().eq(6).animate({width:25+"%",height:25+"%",top:50+"%",left:50+"%"},s.params.duration/3);
			
			ele.children().eq(7).animate({width:25+"%",height:25+"%",top:25+"%",left:25+"%"},s.params.duration/3);
			ele.children().eq(8).animate({width:25+"%",height:25+"%",top:50+"%",left:75+"%"},s.params.duration/3);
			ele.children().eq(9).animate({width:50+"%",height:50+"%",top:75+"%",left:25+"%"},s.params.duration/3);
			
			ele.children().eq(10).animate({width:25+"%",height:50+"%",top:50+"%",left:0+"%"},s.params.duration/3);
			ele.children().eq(11).animate({width:25+"%",height:25+"%",top:25+"%",left:50+"%"},s.params.duration/3);
			ele.children().eq(12).animate({width:25+"%",height:25+"%",top:75+"%",left:75+"%"},s.params.duration/3);
			
			/*
			if (s.current_slide==0)
			{
				ele.children().eq(1).animate({width:25+"%",height:25+"%",top:0+"%",left:0+"%"},s.params.duration/3);
				ele.children().eq(2).animate({width:25+"%",height:25+"%",top:50+"%",left:25+"%"},s.params.duration/3);
				ele.children().eq(3).animate({width:25+"%",height:50+"%",top:0+"%",left:75+"%"},s.params.duration/3);
				
				ele.children().eq(4).animate({width:50+"%",height:25+"%",top:0+"%",left:25+"%"},s.params.duration/3);
				ele.children().eq(5).animate({width:25+"%",height:25+"%",top:25+"%",left:0+"%"},s.params.duration/3);
				ele.children().eq(6).animate({width:25+"%",height:25+"%",top:50+"%",left:50+"%"},s.params.duration/3);
				
				ele.children().eq(7).animate({width:25+"%",height:25+"%",top:25+"%",left:25+"%"},s.params.duration/3);
				ele.children().eq(8).animate({width:25+"%",height:25+"%",top:50+"%",left:75+"%"},s.params.duration/3);
				ele.children().eq(9).animate({width:50+"%",height:50+"%",top:75+"%",left:25+"%"},s.params.duration/3);
				
				ele.children().eq(10).animate({width:25+"%",height:50+"%",top:50+"%",left:0+"%"},s.params.duration/3);
				ele.children().eq(11).animate({width:25+"%",height:25+"%",top:25+"%",left:50+"%"},s.params.duration/3);
				ele.children().eq(12).animate({width:25+"%",height:25+"%",top:75+"%",left:75+"%"},s.params.duration/3);
				
			}
			else if (s.current_slide==1)
			{
				ele.children().eq(4).animate({width:50+"%",height:25+"%",top:0+"%",left:25+"%"},s.params.duration/3);
				ele.children().eq(5).animate({width:25+"%",height:25+"%",top:25+"%",left:0+"%"},s.params.duration/3);
				ele.children().eq(6).animate({width:25+"%",height:25+"%",top:50+"%",left:50+"%"},s.params.duration/3);
			}	
			*/
			setTimeout(function() {
				ele.children(":gt(0)").css("z-index","");
			},s.params.duration/3);
			
			setTimeout(function() {
				ele.children("div:first").animate({opacity:0},s.params.duration/3);
				if (s.destination_slide==0)
				{
					ele.children().eq(1).animate({width:50+"%",height:50+"%",top:0+"%",left:0+"%"},s.params.duration/3).css("z-index",1);
					ele.children().eq(2).animate({width:50+"%",height:50+"%",top:50+"%",left:0+"%"},s.params.duration/3).css("z-index",1);
					ele.children().eq(3).animate({width:50+"%",height:100+"%",top:0+"%",left:50+"%"},s.params.duration/3).css("z-index",1);
				}
				else if (s.destination_slide==1)
				{
				  ele.children().eq(4).animate({width:100+"%",height:50+"%",top:0+"%",left:0+"%"},s.params.duration/3).css("z-index",1).children().animate({"backgroundSize":"100%"},s.params.duration/3);
					ele.children().eq(5).animate({width:50+"%",height:50+"%",top:50+"%",left:0+"%"},s.params.duration/3).css("z-index",1);
					ele.children().eq(6).animate({width:50+"%",height:50+"%",top:50+"%",left:50+"%"},s.params.duration/3).css("z-index",1);
				}
				else if (s.destination_slide==2)
				{
				  ele.children().eq(7).animate({width:50+"%",height:50+"%",top:0+"%",left:0+"%"},s.params.duration/3).css("z-index",1).children().animate({"backgroundSize":"100%"},s.params.duration/3);
					ele.children().eq(8).animate({width:50+"%",height:50+"%",top:0+"%",left:50+"%"},s.params.duration/3).css("z-index",1);
					ele.children().eq(9).animate({width:100+"%",height:50+"%",top:50+"%",left:0+"%"},s.params.duration/3).css("z-index",1);
				}
				else if (s.destination_slide==3)
				{
				  ele.children().eq(10).animate({width:50+"%",height:100+"%",top:0+"%",left:0+"%"},s.params.duration/3).css("z-index",1).children().animate({"backgroundSize":"100%"},s.params.duration/3);
					ele.children().eq(11).animate({width:50+"%",height:50+"%",top:0+"%",left:50+"%"},s.params.duration/3).css("z-index",1);
					ele.children().eq(12).animate({width:50+"%",height:50+"%",top:50+"%",left:50+"%"},s.params.duration/3).css("z-index",1);
				}
			},s.params.duration/3);
				
			setTimeout(function() {
					//ele.remove();
					scr.stop().css({left:-s.destination_slide*w+"px"}).parent().children(":gt(0)").remove();
			},s.params.duration+30);
	}
});

//additional module to animate background position, rotate
(function($) {
   

    var xy = ["X","Y"];

    // helper function to parse out the X and Y values from backgroundPosition
    function parseBgPos(bgPos) {
        var parts  = bgPos.split(/\s/),
            values = {
                "X": parts[0],
                "Y": parts[1]
            };
        return values;
    }
		
    $.each(xy, function( i, l ) {
        $.cssHooks[ "backgroundPosition" + l ] = {
            get: function( elem, computed, extra ) {
                var values = parseBgPos( $.css(elem, "backgroundPosition") );
                return values[ l ];
            },
            set: function( elem, value ) {
                var values = parseBgPos( $.css(elem, "backgroundPosition") ),
                    isX = l === "X";
                elem.style.backgroundPosition = (isX ? value : values[ "X" ]) + " " + 
                                                (isX ? values[ "Y" ] : value);
            }
        };
        $.fx.step[ "backgroundPosition" + l ] = function( fx ) {
            $.cssHooks[ "backgroundPosition" + l ].set( fx.elem, fx.now + fx.unit );
        };
    });
    
    $.cssHooks["rotate"] = {
    	get: function(elem)
    	{
    		var m=$(elem).css("transform");
    		//var angle=0;
    		if (m && m!="none")
    		{
    			var values = m.split('(')[1].split(')')[0].split(',');
    			return Math.round(Math.atan2(values[1], values[0]) * (180/Math.PI));
    		}
    		return 0;		
    	},
    	set: function(elem,value)
    	{
    		$(elem).css("transform","rotate("+parseInt(value)+"deg)");
    	}
    	
    }
 
})(jQuery);

