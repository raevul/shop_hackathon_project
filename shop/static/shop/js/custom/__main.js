// Video and Audio tag wrapper
var THEMEREX_useMediaElement = true;

//fonts 
var THEMEREX_GLOBAL_FONTS = 'Cantarell';
var THEMEREX_HEADER_FONTS = 'Raleway';

// E-mail mask
THEMEREX_EMAIL_MASK = '^([a-zA-Z0-9_\\-]+\\.)*[a-zA-Z0-9_\\-]+@[a-z0-9_\\-]+(\\.[a-z0-9_\\-]+)*\\.[a-z]{2,6}$';

THEMEREX_MAGNIFIC_EFFECT_OPEN = "mfp-zoom-in";

THEMEREX_RESPONSIVE_MENU = "800";

// Javascript String constants for translation
THEMEREX_MESSAGE_EMAIL_ADDED	= "Your address %s has been successfully added to the subscription list";
THEMEREX_REVIEWS_VOTE			= "Thanks for your vote! New average rating is:";
THEMEREX_REVIEWS_ERROR			= "Error saving your vote! Please, try again later.";
THEMEREX_MAGNIFIC_LOADING   	= "Loading image %curr% ...";
THEMEREX_MAGNIFIC_ERROR     	= "<a href=\"%url%\">The image %curr%</a> could not be loaded.";
THEMEREX_MESSAGE_ERROR_LIKE 	= "Error saving your like! Please, try again later.";
THEMEREX_SC_SKILLS				= "Skills";
THEMEREX_GLOBAL_ERROR_TEXT		= "Global error text";
THEMEREX_NAME_EMPTY				= "The name can't be empty";
THEMEREX_NAME_LONG 				= "Too long name";
THEMEREX_EMAIL_EMPTY 			= "Too short (or empty) email address";
THEMEREX_EMAIL_LONG				= "Too long email address";
THEMEREX_EMAIL_NOT_VALID 		= "Invalid email address";
THEMEREX_SUBJECT_EMPTY			= "The subject can't be empty";
THEMEREX_SUBJECT_LONG 			= "Too long subject";
THEMEREX_MESSAGE_EMPTY 			= "The message text can't be empty";
THEMEREX_MESSAGE_LONG 			= "Too long message text";
THEMEREX_SEND_COMPLETE 			= "Send message complete!";
THEMEREX_SEND_ERROR 			= "Transmit failed!";
THEMEREX_LOGIN_EMPTY			= "The Login field can't be empty";
THEMEREX_LOGIN_LONG				= "Too long login field";
THEMEREX_PASSWORD_EMPTY			= "The password can't be empty and shorter then 5 characters";
THEMEREX_PASSWORD_LONG			= "Too long password";
THEMEREX_PASSWORD_NOT_EQUAL		= "The passwords in both fields are not equal";
THEMEREX_REGISTRATION_SUCCESS	= "Registration success! Please log in!";
THEMEREX_REGISTRATION_FAILED	= "Registration failed!";
THEMEREX_REGISTRATION_AUTHOR	= "Your account is waiting for the site admin moderation!";
THEMEREX_GEOCODE_ERROR 			= "Geocode was not successful for the following reason:";
THEMEREX_GOOGLE_MAP_NOT_AVAIL	= "Google map API not available!";
THEMEREX_NAVIGATE_TO			= "Navigate to...";

THEMEREX_SAVE_SUCCESS			= "Post content saved!";
THEMEREX_SAVE_ERROR				= "Error saving post data!";
THEMEREX_DELETE_POST_MESSAGE	= "You really want to delete the current post?";
THEMEREX_DELETE_POST			= "Delete post";
THEMEREX_DELETE_SUCCESS			= "Post deleted!";
THEMEREX_DELETE_ERROR			= "Error deleting post!";

// AJAX parameters
var THEMEREX_ajax_url = "#";
var THEMEREX_ajax_nonce = "e1c4a77bed";

// Site base url
var THEMEREX_site_url = "#";

// Theme base url
var THEMEREX_theme_url = "#";

// User reviews
var reviews_max_level = 5;
var reviews_levels = "bad,poor,normal,good,great";
var reviews_vote = "";
var marks = "4.8,0".split(",");
var users = 2;
var post_id = 1805;
allowUserReviews = true;


jQuery(window).load(function() {
    "use strict";
});

jQuery(document).ready(function() {
    "use strict";
	main_slider_init();
	woo_review_star();
	reviews_stars();
});

/*Main slider*/
function main_slider_init() {
    if (jQuery("#mainslider_1").length > 0) {

		var setREVStartSize = function() {
			var	tpopt = new Object();
				tpopt.startwidth = 1860;
				tpopt.startheight = 620;
				tpopt.container = jQuery('#rev_slider_1_1');
				tpopt.fullScreen = "off";
				tpopt.forceFullWidth="off";

			tpopt.container.closest(".rev_slider_wrapper").css({height:tpopt.container.height()});tpopt.width=parseInt(tpopt.container.width(),0);tpopt.height=parseInt(tpopt.container.height(),0);tpopt.bw=tpopt.width/tpopt.startwidth;tpopt.bh=tpopt.height/tpopt.startheight;if(tpopt.bh>tpopt.bw)tpopt.bh=tpopt.bw;if(tpopt.bh<tpopt.bw)tpopt.bw=tpopt.bh;if(tpopt.bw<tpopt.bh)tpopt.bh=tpopt.bw;if(tpopt.bh>1){tpopt.bw=1;tpopt.bh=1}if(tpopt.bw>1){tpopt.bw=1;tpopt.bh=1}tpopt.height=Math.round(tpopt.startheight*(tpopt.width/tpopt.startwidth));if(tpopt.height>tpopt.startheight&&tpopt.autoHeight!="on")tpopt.height=tpopt.startheight;if(tpopt.fullScreen=="on"){tpopt.height=tpopt.bw*tpopt.startheight;var cow=tpopt.container.parent().width();var coh=jQuery(window).height();if(tpopt.fullScreenOffsetContainer!=undefined){try{var offcontainers=tpopt.fullScreenOffsetContainer.split(",");jQuery.each(offcontainers,function(e,t){coh=coh-jQuery(t).outerHeight(true);if(coh<tpopt.minFullScreenHeight)coh=tpopt.minFullScreenHeight})}catch(e){}}tpopt.container.parent().height(coh);tpopt.container.height(coh);tpopt.container.closest(".rev_slider_wrapper").height(coh);tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);tpopt.container.css({height:"100%"});tpopt.height=coh;}else{tpopt.container.height(tpopt.height);tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);}
		};

		/* CALL PLACEHOLDER */
		setREVStartSize();


		var tpj=jQuery;
		tpj.noConflict();
		var revapi1;

		tpj(document).ready(function() {

		if(tpj('#rev_slider_1_1').revolution == undefined){
			revslider_showDoubleJqueryError('#rev_slider_1_1');
		}else{
		   revapi1 = tpj('#rev_slider_1_1').show().revolution(
			{	
				dottedOverlay:"none",
				delay:9000,
				startwidth:1860,
				startheight:620,
				hideThumbs:200,
				thumbWidth:100,
				thumbHeight:50,
				thumbAmount:3,
				simplifyAll:"off",
				navigationType:"bullet",
				navigationArrows:"solo",
				navigationStyle:"round",
				touchenabled:"on",
				onHoverStop:"on",
				nextSlideOnWindowFocus:"off",
				swipe_threshold: 75,
				swipe_min_touches: 1,
				drag_block_vertical: false,
				keyboardNavigation:"off",
				navigationHAlign:"center",
				navigationVAlign:"bottom",
				navigationHOffset:0,
				navigationVOffset:20,
				soloArrowLeftHalign:"left",
				soloArrowLeftValign:"center",
				soloArrowLeftHOffset:20,
				soloArrowLeftVOffset:0,
				soloArrowRightHalign:"right",
				soloArrowRightValign:"center",
				soloArrowRightHOffset:20,
				soloArrowRightVOffset:0,
				shadow:0,
				fullWidth:"on",
				fullScreen:"off",
				spinner:"spinner0",
				stopLoop:"off",
				stopAfterLoops:-1,
				stopAtSlide:-1,
				shuffle:"off",
				autoHeight:"off",
				forceFullWidth:"off",
				hideThumbsOnMobile:"off",
				hideNavDelayOnMobile:1500,
				hideBulletsOnMobile:"off",
				hideArrowsOnMobile:"off",
				hideThumbsUnderResolution:0,
				hideSliderAtLimit:0,
				hideCaptionAtLimit:0,
				hideAllCaptionAtLilmit:0,
				startWithSlide:0					
				});
			}
		});
    }
}

// Select review stars
function woo_review_star() {
    if (jQuery(".stars", "#review_form").length > 0) {
        $(".stars").find("a").on("click", function() {
            $("a.active").removeClass("active");
            $(this).addClass("active");
            return false;
        });
    }
}

/*reviews stars*/
function reviews_stars() {
    "use strict";
    if (jQuery(".revBlock").length > 0) {
        jQuery(".revBlock").each(function() {
            var percent = jQuery(this).attr("data-mark") * 20;
            jQuery(this).find('.ratingValue').css({'width': percent + '%'});
        });
    }
}

	
