// global jQuery:false 

var THEMEREX_ADMIN_MODE    = false;
var THEMEREX_error_msg_box = null;
var THEMEREX_VIEWMORE_BUSY = false;
var THEMEREX_REMEMBERSCROLL = 0;
var THEMEREX_isotopeInitCounter = 0;
var THEMEREX_isotopeMemoryID = '';
var THEMEREX_isotopeFilter = '*';


jQuery(document).ready(function () {
	"use strict";
	timelineResponsive()
	ready();
	itemPageFull();
	scrollAction();
	fullSlider();
});
jQuery(window).resize(function () {
	"use strict";
	itemPageFull();
	timelineResponsive();
	fullSlider();
	scrollAction();
});
jQuery(window).smartresize(function() {
	mobileMenuShow();
})
jQuery(window).scroll(function () {
	"use strict";
	scrollAction();
});



function ready() {
	"use strict";


	//textarea Autosize
	if (jQuery('textarea.textAreaSize').length > 0) {
		jQuery('textarea.textAreaSize').autosize({
			append: "\n"
		});
	}

	// Share button
	if (jQuery('ul.shareDrop').length > 0) {
		jQuery(document).on("click", function (e) {
			"use strict";
			jQuery('ul.shareDrop').slideUp().siblings('a.shareDrop').removeClass('selected');
		});
		jQuery('li.share a').on("click", function (e) {
			"use strict";
			if (jQuery(this).hasClass('selected')) {
				jQuery(this).removeClass('selected').siblings('ul.shareDrop').slideUp();
			} else {
				jQuery(this).addClass('selected').siblings('ul.shareDrop').slideDown();
			}
			e.preventDefault();
			return false;
		});
		jQuery('li.share li a').on("click", function (e) {
			jQuery(this).parents('ul.shareDrop').slideUp().siblings('a.shareDrop').removeClass('selected');
			e.preventDefault();
			return false;
		});
	}

	// Like button
	jQuery('.postSharing,.masonryMore').on('click', '.likeButton a', function(e) {
		var button = jQuery(this).parent();
		var inc = button.hasClass('like') ? 1 : -1;
		var post_id = button.data('postid');
		var likes = Number(button.data('likes'))+inc;
		var grecko_likes = jQuery.cookie('grecko_likes');
		if (grecko_likes === undefined) grecko_likes = '';
		jQuery.post(THEMEREX_ajax_url, {
			action: 'post_counter',
			nonce: THEMEREX_ajax_nonce,
			post_id: post_id,
			likes: likes
		}).done(function(response) {
			var rez = JSON.parse(response);
			if (rez.error === '') {
				if (inc == 1) {
					var title = button.data('title-dislike');
					button.removeClass('like').addClass('likeActive');
					grecko_likes += (grecko_likes.substr(-1)!=',' ? ',' : '') + post_id + ',';
				} else {
					var title = button.data('title-like');
					button.removeClass('likeActive').addClass('like');
					grecko_likes = grecko_likes.replace(','+post_id+',', ',');
				}
				button.data('likes', likes).find('a').attr('title', title).find('.likePost').html(likes);
				jQuery.cookie('grecko_likes', grecko_likes, {expires: 365, path: '/'});
			} else {
				themerex_message_warning(THEMEREX_MESSAGE_ERROR_LIKE);
			}
		});
		e.preventDefault();
		return false;
	});

	//hoverZoom img effect
	jQuery('.hoverIncrease').each(function () {
		"use strict";
		var img = jQuery(this).data('image');
		var title = jQuery(this).data('title');
		if (img) {
			jQuery(this).append('<span class="hoverShadow"></span><a href="'+img+'" title="'+title+'"><span class="hoverIcon"></span></a>');
		}
	});

	// ====== isotope =====================================================================
	if (jQuery('.isotopeWrap').length > 0) {

		jQuery('.isotopeWrap').each(function(){
			isotopeFilterClass( '*' );

			var isotopeWrap = jQuery(this);
			var isotopeItem = isotopeWrap.find('.isotopeItem');
			var isotopeWrapWidth = isotopeWrap.width();
			var isotopeWrapFoliosize = isotopeWrap.data('foliosize');
			var isotopeItemIncw = jQuery(this).data('incw');
			var isotopeItemInch = jQuery(this).data('inch');

			isotopeItem.each(function() {
				var isotopeItemIncw = jQuery(this).data('incw');
				var isotopeItemInch = jQuery(this).data('inch');
				var isotopeSize = isotopeResizeMath(isotopeWrapWidth, isotopeWrapFoliosize, isotopeItemIncw, isotopeItemInch);

				jQuery(this).filter(':not(fullItemWrap)').css({
					'width':isotopeSize[0],
					'height':isotopeSize[1]
				});

				jQuery(this).find('.isotopeItemWrap').css({
					'height':isotopeSize[1]
				});

			});


			//isotope
			var isotopeSize = isotopeResizeMath(isotopeWrapWidth, isotopeWrapFoliosize, isotopeItemIncw, isotopeItemInch);
			isotopeWrap.isotope({
				layoutMode: 'masonry',
				resizable: false,
				filter: THEMEREX_isotopeFilter,
				masonry: {
					columnWidth: isotopeSize[0]
				},
				itemSelector: '.isotopeItem',
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
				}
			});

			isotopeRow(isotopeWrap,isotopeItem);

			setTimeout(function(){
				isotoreEffect()
			}, 200);


			isotopeResize(isotopeWrap,isotopeItem);

			//isotope Full post 
			isotopeWrap.on( 'click', 'article.isotopeItem', function() {
				isotopeRemove( isotopeWrap, jQuery(this).parent('.fullItemWrap'));
				if( jQuery(this).hasClass('post_format_link') ){
					location.href = jQuery(this).find('.isotopeLinks').attr('href');
				} else {
					var scrollPos = jQuery(window).scrollTop();
					isotopeRow(isotopeWrap,isotopeItem);
					isotopeAjaxLoad( isotopeWrap, jQuery(this));
					jQuery('html,body').animate({ scrollTop: scrollPos}, 0 );
				}
			});

			// isotopeWrap.on('click', 'article.isotopeItem',function() {
			//     isotopeRemove( isotopeWrap, jQuery(this).parent('.fullItemWrap'));

			//     if ($("article.isotopeItem").hasClass("isotopeActive")) {
			//     }
			// }, function() {
			// 	var scrollPos = jQuery(window).scrollTop();
			// 	isotopeRow(isotopeWrap,isotopeItem);
			// 	isotopeAjaxLoad( isotopeWrap, jQuery(this));
			// 	jQuery('html,body').animate({ scrollTop: scrollPos}, 0 );
			// });

			//isotope navigation
			isotopeWrap.on('click', '.isotopeNav', function() {
				//var scrollPos = jQuery(window).scrollTop();
				var nav_id = jQuery(this).data('nav-id');
				// jQuery('html,body').animate({ scrollTop: scrollPos}, 0 );
				isotopeAjaxLoad( isotopeWrap, jQuery('.isotopeItem[data-postid="'+nav_id+'"]') );
			});


			//isotope Fullpost closed 
			isotopeWrap.on('click', '.fullItemClosed', function(){
				isotopeRemove( isotopeWrap, jQuery(this).parent('.fullItemWrap'));
			});



			//isotope filtre
			jQuery('.isotopeFiltr li a').on("click", function () {
				"use strict";

				//isotopeRemove( isotopeWrap, isotopeWrap.find('.fullItemWrap') );

				jQuery('.isotopeFiltr li').removeClass('active');
				jQuery(this).parent().addClass('active');
		
				var selectorFilter = jQuery(this).attr('data-filter');

				isotopeFilterClass( selectorFilter );

				isotopeWrap.isotope({
					layoutMode: 'masonry',
					itemSelector: '.isotopeItem',
					filter: selectorFilter,
					animationOptions: {
						duration: 750,
						easing: 'linear',
						queue: false
					}
				}).isotope( 'on', 'layoutComplete', function() {
					isotopeRow(isotopeWrap, isotopeItem);
				});


				THEMEREX_isotopeFilter = selectorFilter;
				return false;
			});

			jQuery("#custom_options .co_switch_box a" ).on("click", function(e) {
				var wrap = jQuery(this).parent('.co_switch_box');
				var options = wrap.data('options');

				//check settings
				if ( options == 'body_style'){
					jQuery(window).resize();
				}
			});
		});
		
	}

	// main Slider
	if (jQuery('.sliderBullets, .sliderHeader').length > 0) { 
		if (jQuery.rsCSS3Easing!=undefined && jQuery.rsCSS3Easing!=null) {
			jQuery.rsCSS3Easing.easeOutBack = 'cubic-bezier(0.175, 0.885, 0.320, 1.275)';
		}
		jQuery('.sliderHeader').addClass('hsInit');
		initShortcodes(jQuery(this));
	}


	// ====================================================================================
	// Page Navigation
	jQuery(document).on("click", function () {
		"use strict";
		jQuery('.pageFocusBlock').slideUp();
	});
	jQuery('.pageFocusBlock').on("click", function (e) {
		"use strict";
		e.preventDefault();
		return false;
	});
	jQuery('.navInput').on("click", function (e) {
		"use strict";
		jQuery('.pageFocusBlock').slideDown();
		e.preventDefault();
		return false;
	});

	//related links
	jQuery('.postBoxItem').on("click", function () {
		"use strict";
		var link = jQuery(this).find('h5 a').attr('href');
		if( link != '' ){
			window.location.href = link;
		}
	})
	

	// topMenu DROP superfish
	jQuery('.topMenu ul, .usermenuArea ul').superfish({
		delay: 500,
		animation: {
			opacity: 'show',
			height: 'show'
		},
		animationOut:{
			opacity: 'hide',
			height: 'hide'	
		},
		speed: 'fast',
		autoArrows: false,
		dropShadows: false
	});



	// top menu animation
	jQuery(document).on("click", function () {
		"use strict";
		jQuery('.hideMenuDisplay #header').removeClass('topMenuShow');
	});
	jQuery('.hideMenuDisplay .wrapTopMenu').on("click", function (e) {
		"use strict";
		e.stopPropagation();
	});
	jQuery('.hideMenuDisplay .openTopMenu').on("click", function (e) {
		"use strict";
		e.stopPropagation();
		jQuery(this).parent().toggleClass('topMenuShow');
		return false;
	});





	// Sidemenu DROP
	jQuery('.sidemenu_area > ul > li.dropMenu ').on("click", function (e) {
		"use strict";
		e.preventDefault();
		return false;
	});
	jQuery('.sidemenu_area > ul > li.dropMenu, .sidemenu_area > ul > li.dropMenu li').on("click", function (e) {
		"use strict";
		initScroll('sidemenu_scroll');
		jQuery(this).toggleClass('dropOpen');
		jQuery(this).find('ul').first().slideToggle();
		e.preventDefault();
		return false;
	});

	jQuery('#sidemenu_scroll a').on("click", function (e) {
		"use strict";
		initScroll('sidemenu_scroll');
		jQuery('#sidemenu_scroll').mCustomScrollbar("update");
		e.preventDefault();
		return false;
	});

	jQuery(document).on("click", function (e) {
		"use strict";
		jQuery('body').removeClass('openMenuFixRight openMenuFix');
		jQuery('.sidemenu_overflow').fadeOut(400);
		jQuery('body').attr('style', '');;

	});
	jQuery('.sidemenu_wrap.swpLeftPos, .swpRightPos, .openRightMenu').on("click", function (e) {
		"use strict";
		e.preventDefault();
		return false;
	});

	jQuery('.sidemenu_wrap .sidemenu_button').on("click", function (e) {
		"use strict";
		jQuery('body').addClass('openMenuFix');
		if (jQuery('.sidemenu_overflow').length == 0) {
			jQuery('body').append('<div class="sidemenu_overflow"></div>')
		}
		jQuery('.sidemenu_overflow').fadeIn(400);
		jQuery('body').css('overflow','hidden');
		e.preventDefault();
		return false;
	});

	jQuery('.openRightMenu').on("click", function (e) {
		"use strict";
		jQuery('body').addClass('openMenuFixRight');
		if (jQuery('.sidemenu_overflow').length == 0) {
			jQuery('body').append('<div class="sidemenu_overflow"></div>')
		}
		jQuery('.sidemenu_overflow').fadeIn(400);
		jQuery('body').css('overflow','hidden');
		e.preventDefault();
		return false;
	});


	//Hover DIR
	jQuery(' .portfolio > .isotopeItem > .hoverDirShow').each(function () {
		"use strict";
		jQuery(this).hoverdir();
	});


	//Portfolio item Description
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		jQuery('.toggleButton').show();
		jQuery('.itemDescriptionWrap,.toggleButton').on("click", function (e) {
			"use strict";
			jQuery(this).toggleClass('descriptionShow');
			jQuery(this).find('.toggleDescription').slideToggle();
			e.preventDefault();
			return false;
		});
	} else {
		jQuery('.itemDescriptionWrap').on({
	  		mouseenter: function() {
			"use strict";
			jQuery(this).toggleClass('descriptionShow');
			jQuery(this).find('.toggleDescription').slideToggle();
		},
		mouseleave: function(){}
		});
	}





	jQuery('input[type="text"], input[type="password"], input[type="search"], textarea').focus(function () {
			"use strict";
			jQuery(this).attr('data-placeholder', jQuery(this).attr('placeholder')).attr('placeholder', '')
			jQuery(this).parent('li').addClass('iconFocus');
		})
		.blur(function () {
			"use strict";
			jQuery(this).attr('placeholder', jQuery(this).attr('data-placeholder'))
			jQuery(this).parent('li').removeClass('iconFocus');
		});

	//responsive Show menu
	jQuery('.openMobileMenu').on("click", function(e){
		"use strict";
		var ul = jQuery('.wrapTopMenu .topMenu > ul');
		ul.slideToggle();
		jQuery(this).parents('.menuFixedWrap').toggleClass('menuMobileShow');
		e.preventDefault();
		return false;
	});


	// IFRAME width and height constrain proportions 
	if (jQuery('iframe').length > 0) {
		jQuery(window).resize(function() {
			"use strict";
			videoDimensions();
		});
		videoDimensions();
	}

	// Hide empty pagination
	if (jQuery('#nav_pages > ul > li').length < 3) {
		jQuery('#nav_pages').remove();
	} else {
		jQuery('.theme_paginaton a').addClass('theme_button');
	}

	// View More button
	jQuery('#viewmore_link').on("click", function(e) {
		"use strict";
		e.preventDefault();
		return false;
	});

	// Infinite pagination
	if (jQuery('#viewmore_link.pagination_infinite').length > 0) {
		jQuery(window).scroll(infiniteScroll);
	}

	//custom panel scroll
	if (jQuery('#custom_options').length > 0) {
		jQuery('#custom_options .sc_scroll').css('height',jQuery('#custom_options').height()-46);
	}

	// Scroll to top
	jQuery('.buttonScrollUp').on("click", function(e) {
		"use strict";
		jQuery('html,body').animate({
			scrollTop: 0
		}, 'slow');
		e.preventDefault();
		return false;
	});

	jQuery('.woocommerce  ul.products li.product h3').each(function(){
		var title = jQuery(this).html();
		if(jQuery(this).html().length > 20) 
			title = title.substr(0, 20) + '..';
		jQuery(this).html(title);
	});
	
	initPostFormats();
}; //end ready




// Fit video frame to document width
function videoDimensions() {
	jQuery('iframe').each(function() {
		"use strict";
		var iframe = jQuery(this).eq(0);
		var w_attr = iframe.attr('width');
		var h_attr = iframe.attr('height');
		if (!w_attr || !h_attr) {
			return;
		}
		var w_real = iframe.width();
		if (w_real!=w_attr) {
			var h_real = Math.round(w_real/w_attr*h_attr);
			iframe.height(h_real);
		}
	});
}

function initPostFormats() {
	"use strict";

	// MediaElement init
	if (THEMEREX_useMediaElement) {

		if (jQuery('audio').length > 0) {
			jQuery('audio').each(function () {
				if (jQuery(this).hasClass('inited')) return;
				jQuery(this).addClass('inited').mediaelementplayer({
					audioWidth: '100%',	// width of audio player
					audioHeight: 30,	// height of audio player
					success: function (mediaElement, domObject) { 
						jQuery(domObject).parents('.sc_audio').addClass('sc_audio_show');
					},
				});
			});
		}

		jQuery('video').each(function () {
			if (jQuery(this).hasClass('inited')) return;
			jQuery(this).addClass('inited').mediaelementplayer({
				videoWidth: -1,		// if set, overrides <video width>
				videoHeight: -1,	// if set, overrides <video height>
				audioWidth: '100%',	// width of audio player
				audioHeight: 30	// height of audio player
			});
		});
	} else {
		jQuery('.sc_audio').addClass('sc_audio_show');
	}

	// Popup init image
	jQuery("a[href$='jpg']:not(.prettyphoto),a[href$='jpeg']:not(.prettyphoto),a[href$='png']:not(.prettyphoto),a[href$='gif']:not(.prettyphoto)").attr('rel', 'magnific');
	jQuery("a[rel*='magnific']:not(.inited)").addClass('inited').attr('data-effect',THEMEREX_MAGNIFIC_EFFECT_OPEN).magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: true,
		fixedContentPos: true,
		removalDelay: 500, 
		midClick: true,
		preloader: true,
		gallery:{
    		enabled:true
  		},
		tLoading: '<span></span>',
		image: {
			tError: THEMEREX_MAGNIFIC_ERROR,
			verticalFit: true,
		},
		callbacks: {
			beforeOpen: function() {
				this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
				this.st.mainClass = this.st.el.attr('data-effect');
			}
		}
	});
	// Popup init video
	jQuery("a[href*='youtube'],a[href*='vimeo']").attr('rel', 'magnific-video');
	jQuery("a[rel*='magnific-video']:not(.inited)").addClass('inited').attr('data-effect',THEMEREX_MAGNIFIC_EFFECT_OPEN).magnificPopup({
		type: 'iframe',
		closeOnContentClick: true,
		closeBtnInside: true,
		fixedContentPos: true,
		removalDelay: 500, 
		midClick: true,
		preloader: true,
		callbacks:{
			open: function() {
				//open function
    		},
    		close: function() {
    			//close function
    		}
		}
	});



	// Popup windows with any html content
	jQuery('.user-popup-link:not(.inited)').addClass('inited').magnificPopup({
			type: 'inline',
			removalDelay: 500,
			callbacks: {
				beforeOpen: function () {
					this.st.mainClass = 'mfp-zoom-in';
					initShortcodes(jQuery('.sc_popup'));
				},
				open: function () {
					jQuery('html').css({
						overflow: 'visible',
						margin: 0
					});
				},
				close: function () {
				}
			},
			midClick: true
		});


	// Add video on thumb click
	jQuery('.sc_video_frame').each(function () {
		"use strict";
		if (jQuery(this).hasClass('sc_inited')) return;
		if (jQuery(this).hasClass('sc_video_frame_auto_play')){
			scVideoAutoplay(jQuery(this));
		}
		jQuery(this).addClass('sc_inited').on("click", function (e) {
			"use strict";
			scVideoAutoplay(jQuery(this));
			e.preventDefault();
		});
	});
	jQuery('.sc_video_frame').on({
		mouseenter: function() {
			jQuery(this).find('.sc_video_frame_player_title').slideDown(400);
		}, 
		mouseleave: function() {
			"use strict";
			jQuery(this).find('.sc_video_frame_player_title').slideUp(400);
		}
	});
	function scVideoAutoplay($videoObject) {
		"use strict";
		var video = $videoObject.data('videoframe');
		if (video!=='' && !$videoObject.hasClass('sc_video_active')) {
			$videoObject.addClass('sc_video_active');
			$videoObject.empty().html(video);
			videoDimensions();
		}
		return false;
	}

	//hover Underline effect
	jQuery('.hoverUnderline').each(function() {
		jQuery(this).find('a').each(function() {
			jQuery(this).append('<span class="hoverLine"></span>');
		});
	});

}

//mobile menu init, resize
function mobileMenuShow() {
	"use strict";
	if( THEMEREX_RESPONSIVE_MENU < jQuery(window).width()){
		jQuery('.wrapTopMenu .topMenu > ul').removeAttr('style');
	}
}

// Infinite Scroll 
function infiniteScroll() {
	"use strict";
	var v = jQuery('#viewmore_link.pagination_infinite').offset();
	if (jQuery(this).scrollTop() + jQuery(this).height() + 100 >= v.top && !THEMEREX_VIEWMORE_BUSY) {
		jQuery('#viewmore_link').eq(0).trigger('click');
	}
}

//itemPageFull
function itemPageFull() {
	"use strict";
	var bodyHeight = jQuery(window).height();
	jQuery('.itemPageFull').css('height', bodyHeight - jQuery('.topWrap').height());
	jQuery('#sidemenu_scroll').css('height', bodyHeight);
}


//init scroll
function initScroll(idScroll) {
	"use strict";

	if (!jQuery('#' + idScroll).hasClass("scrollInit")) {
		jQuery('#' + idScroll).addClass('scrollInit').mCustomScrollbar({
			scrollButtons: {
				enable: false
			},
		});

		jQuery('.scrollPositionAction > .roundButton').on("click", function (e) {
			"use strict";
			var scrollAction = jQuery(this).data('scroll');
			jQuery('#' + idScroll).mCustomScrollbar("scrollTo", scrollAction);
			e.preventDefault();
			return false;
		});

	}
}



//scroll Action
function scrollAction() {
	"use strict";
	var head = jQuery('header');
	var buttonScrollTop = jQuery('.upToScroll');
	var scrollPos = jQuery(window).scrollTop();
	var headHeight = jQuery(window).height();
	var topMemuHeight = head.height();
	var menuMinWidth = jQuery(window).width() > 990;
	var menuMinWidth = head.find('.menuFixedWrap').height();

	//fixed menu
	if (scrollPos <= topMemuHeight / 3 && menuMinWidth) {
		head.removeClass('fixedTopMenuShow');
	} else if (scrollPos >= topMemuHeight /1.5 && menuMinWidth) {
		head.addClass('fixedTopMenuShow');
			//smartScroll
			if (THEMEREX_REMEMBERSCROLL < scrollPos){ 
				//scroll up
    		   	head.removeClass('smartScrollDown');
    		   	jQuery('.menuFixedWrap').height(menuMinWidth);
			} else if (THEMEREX_REMEMBERSCROLL > scrollPos){
				//scroll down
    		   	head.addClass('smartScrollDown');
    		   	jQuery('.menuFixedWrap').height('auto');
			}

	}

	THEMEREX_REMEMBERSCROLL = scrollPos;

	//button UP 
	if (scrollPos > topMemuHeight) {
		buttonScrollTop.addClass('buttonShow');
	} else {
		buttonScrollTop.removeClass('buttonShow');
	}
}

function fullSlider() {
	"use strict";
	if (jQuery('.fullScreenSlider').length > 0) {
		jQuery('.sliderHeader, .sliderHeader .rsContent').css('height', jQuery(window).height())
	}
}


//Time Line
function timelineResponsive() {
	"use strict";
	var bodyHeight = jQuery(window).height();
	var headHeight = jQuery(window).height() - jQuery('.contentTimeLine h2').height() - 150;
	var leftPosition = (jQuery('.main_content').width() - jQuery('.main').width()) / 2 + jQuery('.sidemenu_wrap').width();
	jQuery('.TimeLineScroll .tlContentScroll').css('height', headHeight);

}

//============= isotope function ============

//isotope effect
function isotoreEffect(){
	"use strict";
	var isotopeWrap = jQuery('.isotopeWrap ');
	isotopeWrap.find('.isotopeItem:not(.isotopeItemShow)').addClass('isotopeItemShow');
}

// isotope rows
function isotopeRow(itemWrap,item){
	"use strict";

	var isotopeWrap = itemWrap;
	var isotopeItem = itemWrap.find('.isotopeItem:not(:hidden)');
	var i = 0;
	var positionCounter = 1;
	var items_sum = 0;
	var row_num = 1;
	var positionCounterArr = [];
	var isotope_width = isotopeWrap.width()

	item.removeClass('itemFirst itemLast').removeAttr('data-row-num');
	isotopeItem.filter(':visible:last').addClass('itemLast');

	itemWrap.find('.isotopeItem:not(:hidden)').each(function() {

		var item_l = jQuery(this).position().left;

		if( item_l == 0 ){
			jQuery(this).addClass('itemFirst');
		} 
		
	});

}

//scrolling
function isotopeScrolling(item){
	"use strict";
	setTimeout(function(){
		jQuery('html,body').animate({ scrollTop: item.offset().top + item.height()-100}, 'slow' );
	}, 2000);
}

//isotope Ajax Load
function isotopeAjaxLoad(itemWrap,item){
	"use strict";

	var itemRow = item.data('row-num');
	var istPostID = item.data('postid');
	var navFirstID = item.parent('.isotopeWrap').find('article.isotopeItem:visible:first').data('postid');
	var navLastID = item.parent('.isotopeWrap').find('article.isotopeItem:visible:last').data('postid');
	var navPrevID = item.prevAll('article.isotopeItem:visible').data('postid');
	var navNextID = item.nextAll('article.isotopeItem:visible').data('postid');
	var isoFilter = THEMEREX_isotopeFilter.replace('.','').replace('*',''); 
	
	if ( item.hasClass('isotopeActive') ) {
		return;
	}

	jQuery('.isotopeItem[data-postid="'+THEMEREX_isotopeMemoryID+'"]').removeClass('isotopeActive')
	jQuery('.isotopeItem[data-postid="'+istPostID+'"]').addClass('isotopeActive');

	var itemContent = jQuery('<div class="fullItemWrap isotopeItem sc_loader_show '+isoFilter+'" data-postid="'+istPostID+'"><span class="fullItemClosed icon-cancel-line" title="Closed"></span><div class="fullContent"></div></div>');

	
	isotopeRemove( itemWrap, itemWrap.find('.fullItemWrap'));
	
	var next_before = item.nextAll('.itemFirst').eq(0);
	if( !item.hasClass('itemLast') && next_before.length > 0 ){
		item.nextAll('.itemFirst:visible').eq(0).before( itemContent );
	} else {
		itemWrap.find('article.itemLast').after( itemContent );		
	}

	//jQuery('.isotopeItem.itemLast[data-row-num="'+itemRow+'"]').after( itemContent );  

	itemWrap.isotope('destroy').isotope({
		//getSortData: {
  		//  ids: '[data-postid]',
  		//},
  		//sortBy: ['ids'],
		layoutMode: 'masonry',
		itemSelector: '.isotopeItem',
		filter: THEMEREX_isotopeFilter,
		animationOptions: {
			duration: 750,
			easing: 'linear',
			queue: false
		}

	}).isotope( 'on', 'layoutComplete', function() {
			//function complete
	});


	//add effect
	setTimeout(function(){
		"use strict";
		isotoreEffect();
	}, 500);
	
	isotopeScrolling( item )
			
	//load content 
	// jQuery.post(THEMEREX_ajax_url, {
	// 	action: 'isotope_content',
	// 	nonce: THEMEREX_ajax_nonce,
	// 	postID: istPostID,
	// }).done(function(response) {
	// 	"use strict";
	// 	var rez = JSON.parse(response);
	// 	jQuery('.fullItemWrap .fullContent').html( (rez != '' ? rez.data : THEMEREX_SEND_ERROR )).parent('.fullItemWrap').addClass('ajaxShow');
	// 	initShortcodes(jQuery('.fullItemWrap'));
	// 	initPostFormats();

	// 	//nav prev
	// 	jQuery('.isotopeNav.isoPrev').data('nav-id', (navPrevID != undefined ? navPrevID : navLastID));
	// 	jQuery('.isotopeNav.isoNext').data('nav-id', (navNextID != undefined ? navNextID : navFirstID));

	// 	THEMEREX_isotopeInitCounter = 0;
	// 	initRelayoutIsotope(jQuery('.fullItemWrap .fullContent'));
	// });

	var isotope_ajax_url = jQuery('.isotopeItemWrap' ,'.isotopeItem.isotopeActive').attr('data-url');

	jQuery.ajax({
		type: "GET",
		url: isotope_ajax_url,
		dataType: "html",
		cache: false,
		success: function(html){
			jQuery(".fullItemWrap").html(html);
		}
	}).done(function() {
		"use strict";
		jQuery('.fullItemWrap .fullContent').parent('.fullItemWrap').addClass('ajaxShow');
		initShortcodes(jQuery('.fullItemWrap'));
		initPostFormats();
	
		//nav prev
		jQuery('.isotopeNav.isoPrev').data('nav-id', (navPrevID != undefined ? navPrevID : navLastID));
		jQuery('.isotopeNav.isoNext').data('nav-id', (navNextID != undefined ? navNextID : navFirstID));


		THEMEREX_isotopeInitCounter = 0;
		//initRelayoutIsotope(jQuery('.fullItemWrap .fullContent'));
		//initRelayoutIsotope(jQuery('.isotopeRemove( isotopeWrap, jQuery(this).parent('.fullItemWrap'));fullItemWrap .fullContent'));
		initRelayoutIsotope(jQuery('.isotopeWrap'));
	});




	THEMEREX_isotopeMemoryID = istPostID;

	return false;
}

function isotopeFilterClass(selector){
	"use strict";

	jQuery('.isotopeWrap .isotopeItem').removeClass('isotopeVisible').each(function() {
		if( selector == '*' ){ 
			jQuery(this).addClass('isotopeVisible');
		} else {
			jQuery(selector).addClass('isotopeVisible');
		}
	});
}


//isotope remove
function isotopeRemove(itemWrap,item) {
	"use strict";

	var isotopeWrap = itemWrap;
	isotopeWrap.find('.isotopeItem[data-postid="'+THEMEREX_isotopeMemoryID+'"]').removeClass('isotopeActive')
	isotopeWrap.isotope('remove', item).isotope('layout');
	jQuery ('.fullItemWrap.ajaxShow').remove();
	initRelayoutIsotope(jQuery('.isotopeWrap'));
	THEMEREX_isotopeMemoryID = "";
}

//isotope Images Complete
function initRelayoutIsotope(content){
	"use strict";
	if (!imagesCompleteLoad(content) && THEMEREX_isotopeInitCounter++ < 30) {
			setTimeout(function() { initRelayoutIsotope(content); }, 300);
			return;
	}
	jQuery('.isotopeWrap').isotope('layout');
}

//init Appended Isotope
function initAppendedIsotope(isotopeWrap, filters) {
	"use strict";
	if (!imagesCompleteLoad(isotopeWrap) && THEMEREX_isotopeInitCounter++ < 30) {
		setTimeout(function() { initAppendedIsotope(isotopeWrap, filters); }, 300);
		return;
	}
	
	var flt = isotopeWrap.siblings('.isotopeFiltr');
	var item = isotopeWrap.find('.isotopeItem:not(.isotopeItemShow)').addClass('isotopeItemShow');
	var isotopeWrapWidth = isotopeWrap.width();
	var isotopeItemWidth = isotopeWrap.data('foliosize');

	item.css('width',Math.floor(isotopeWrap.width() / Math.floor(isotopeWrap.width() / isotopeItemWidth)));

	isotopeRow(isotopeWrap,isotopeWrap.find('isotopeItem'))

	isotopeWrap.isotope('appended', item);
	for (var i in filters) {
		if (flt.find('a[data-filter=".flt_'+i+'"]').length == 0) {
			flt.find('ul').append('<li><a href="#" data-filter=".flt_'+i+'">'+filters[i]+'</a></li>');
		}
	}
}


//isotope resize
function isotopeResize(itemWrap,item){
	"use strict";

	var isotopeWrap = itemWrap; //.isotopeWrap
	var isotopeItem = item;
	var isotopeWrapFoliosize = isotopeWrap.data('foliosize'); //600
	var columns = 3;
	if(jQuery(itemWrap).hasClass('portfolio_medium')) columns = 4;
	if(jQuery(itemWrap).hasClass('portfolio_mini')) columns = 6;
	

	jQuery(document).ready(function () {
		"use strict";
		beforeIsotopeItemResize(itemWrap, isotopeWrap, isotopeItem, columns);
	}); 
	
	jQuery(window).smartresize(function () {
		"use strict";
		beforeIsotopeItemResize(itemWrap, isotopeWrap, isotopeItem, columns);
	}); 
}

function beforeIsotopeItemResize(itemWrap, isotopeWrap, isotopeItem, columns)
{
	if( itemWrap.find('.fullItemWrap').length > 0 ){
		isotopeRemove( itemWrap, itemWrap.find('.fullItemWrap'));
	}

	isotopeItem.each(function() {
		"use strict";

		var isotopeItemIncw = jQuery(this).data('incw');
		var isotopeItemInch = jQuery(this).data('inch');

		var isotopeSize = isotopeResizeMath(isotopeWrap.width(), columns, isotopeItemIncw, isotopeItemInch);

		jQuery(this).filter(':not(fullItemWrap)').css({
			'width':isotopeSize[0],
			'height':isotopeSize[1]
		});
			
		jQuery(itemWrap).find('.isotopeItem').css({
			'width':isotopeSize[0],
			'height':isotopeSize[1]
		});

		jQuery(this).find('.isotopeItemWrap').css({
			'height':isotopeSize[1]
		});
	});

	var numb = jQuery(itemWrap).find('.isotopeItem').length;
	if(numb % 2 != 0 && jQuery(window).width() <= 600)
	{
		var elem = jQuery(itemWrap).find('.isotopeItem:nth-child('+ numb + ')');
		
		jQuery(elem).css({
			'width': isotopeWrap.width(),
			'height':isotopeWrap.width()
		});

		jQuery(elem).find('.isotopeItemWrap').css({
			'height':isotopeWrap.width()
		});
	}

	initRelayoutIsotope(itemWrap);
}

function isotopeResizeMath(wrap,/*style*/columns,incw,inch){
	"use strict";
    
	var windowWidth = jQuery(window).width();
//	var columns =  Math.floor(wrap / style); //3
	if(windowWidth <= 1200 && columns > 4) columns = 4;
	if(windowWidth <= 900 && columns > 3) columns = 3;
	if(windowWidth <= 600 && columns > 2) columns = 2;
	
	var bw = Math.floor(wrap / columns); 

	var w_px = (bw * incw);//-incw ; //w_px
	var h_px = (bw * inch);//-inch ; //h_px
	var w_pr = (100 / columns) * incw; //w_% 
	var data = [w_px,h_px,w_pr]

	return data;
}


//isotope Images Complete
function imagesCompleteLoad(content) {
	"use strict";

	var complete = true;
	content.find('img').each(function() {
		if (!complete) return;
		if (!jQuery(this).get(0).complete) complete = false;
	});
	return complete;
}
