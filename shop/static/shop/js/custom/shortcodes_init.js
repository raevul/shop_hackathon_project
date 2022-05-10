// Shortcodes init
jQuery(document).ready(function() {
	"use strict";
	initShortcodes(jQuery('body').eq(0));
});

function initShortcodes(container) {
	"use strict";
	// Tabs
	if (container.find('.sc_tabs:not(.inited)').length > 0) {
		var sc_tabs_effetcs = container.find('.sc_tabs:not(.inited)').hasClass('sc_tabs_effects');
		container.find('.sc_tabs:not(.inited)')
			.addClass('inited')
			.tabs({
				show: {
					direction: sc_tabs_effetcs ? 'right' : '',
					effect: sc_tabs_effetcs ? 'slide' : 'fade',
					duration: sc_tabs_effetcs ? 500 : 250,
				},
				hide: {
					direction: sc_tabs_effetcs ? 'left' : '',
					effect: sc_tabs_effetcs ? 'slide' : 'fade',
					duration: sc_tabs_effetcs ? 500 : 250,
				},
				create: function (event, ui) {
					initShortcodes(ui.panel);
				},
				activate: function (event, ui) {
					initShortcodes(ui.newPanel);
				}
			});
	}


	// Accordion
	if (container.find('.sc_accordion_init:not(.inited)').length > 0) {
		container.find(".sc_accordion_init:not(.inited)").each(function () {
			var init = jQuery(this).data('active');
			if (isNaN(init)) init = 0;
			else init = Math.max(0, init);
			jQuery(this)
				.addClass('inited')
				.accordion({
					active: init,
					heightStyle: "content",
					header: "> .sc_toggl_item > .sc_toggl_title",
					create: function (event, ui) {
						initShortcodes(ui.panel);
						ui.header.each(function () {
							jQuery(this).parent().addClass('sc_active');
						});
					},
					activate: function (event, ui) {
						initShortcodes(ui.newPanel);
						ui.newHeader.each(function () {
							jQuery(this).parent().addClass('sc_active');
						});
						ui.oldHeader.each(function () {
							jQuery(this).parent().removeClass('sc_active');
						});
					}
				});
		});
	}

	// Toggles
	if (container.find('.sc_toggles_init:not(.inited)').length > 0) {
		container.find('.sc_toggles_init .sc_toggl_title:not(.inited)')
			.addClass('inited')
			.on("click", function () {
				jQuery(this).parent().toggleClass('sc_active');
				jQuery(this).parent().find('.sc_toggl_content').slideToggle(200, function () { 
					initShortcodes(jQuery(this).parent().find('.sc_toggl_content')); 
				});
			});
	}

	// Tooltip
	if (container.find('.sc_tooltip:not(.inited)').length > 0) {
		container.find('.sc_tooltip:not(.inited)')
			.addClass('inited')
			.on({
		  		mouseenter:function () {
					"use strict";
					var obj = jQuery(this);
					obj.find('.sc_tooltip_item').stop().animate({
						'marginTop': '5'
					}, 100).show();
				},
				mouseleave: function () {
					"use strict";
					var obj = jQuery(this);
					obj.find('.sc_tooltip_item').stop().animate({
						'marginTop': '0'
					}, 100).hide();
				}
			});
	}

	// Infoboxes
	if (container.find('.sc_infobox.sc_infobox_closeable:not(.inited)').length > 0) {
		container.find('.sc_infobox.sc_infobox_closeable:not(.inited)')
			.addClass('inited')
			.on("click", function () {
				jQuery(this).slideUp();
			});
	}

	// Contact form
	if (container.find('.sc_form:not(.contact_form_1) .sc_form_button .sc_button:not(.inited)').length > 0 && container.find('.sc_form').data('formtype') == 'contact' ) {
		container.find('.sc_form:not(.contact_form_1) .sc_form_button .sc_button:not(.inited)')
			.addClass('inited')
			.on("click", function(e){
				userSubmitForm(jQuery(this).parents("form"), THEMEREX_ajax_url, THEMEREX_ajax_nonce);
				e.preventDefault();
				return false;
			});
	}

    // Emailer form
    if (container.find('.sc_emailer:not(.inited)').length > 0) {
            container.find(".sc_emailer:not(.inited)")
                    .addClass('inited')
                    .find('.sc_emailer_button')
                    .on('click', function(e) {
                            "use strict";
                            var form = jQuery(this).parents('form');
                            var parent = jQuery(this).parents('.sc_emailer');
                            if (parent.hasClass('sc_emailer_opened')) {
                                    if (form.length>0 && form.find('input').val()!='') {
                                            var group = jQuery(this).data('group');
                                            var email = form.find('input').val();
                                            var regexp = new RegExp(THEMEREX_GLOBALS['email_mask']);
                                            if (!regexp.test(email)) {
                                                    form.find('input').get(0).focus();
                                                    //themerex_message_warning(THEMEREX_GLOBALS['strings']['email_not_valid']);
                                            } else {
                                                    // jQuery.post(THEMEREX_GLOBALS['ajax_url'], {
                                                    //         action: 'emailer_submit',
                                                    //         nonce: THEMEREX_GLOBALS['ajax_nonce'],
                                                    //         group: group,
                                                    //         email: email
                                                    // }).done(function(response) {
                                                    //         var rez = JSON.parse(response);
                                                    //         if (rez.error === '') {
                                                    //                 themerex_message_info(THEMEREX_GLOBALS['strings']['email_confirm'].replace('%s', email));
                                                    //                 form.find('input').val('');
                                                    //         } else {
                                                    //                 themerex_message_warning(rez.error);
                                                    //         }
                                                    // });
                                            }
                                    } else
                                            form.get(0).submit();
                            } else {
                                    parent.addClass('sc_emailer_opened');
                            }
                            e.preventDefault();
                            return false;
                    });
    }

	// Bordered images
	if (container.find('.sc_border:not(.inited)').length > 0) {
		container.find('.sc_border:not(.inited)')
			.each(function () {
				"use strict";
				if (jQuery(this).parents('div:hidden').length > 0) return;
				jQuery(this).addClass('inited');
				var w = Math.round(jQuery(this).width());
				var h = Math.round(w/4*3);
				jQuery(this).find('.slides').css({height: h+'px'});
				jQuery(this).find('.slides li').css({width: w+'px', height: h+'px'});
			});
	}


	// Swiper Slider, slider init 
	if (container.find('.sc_slider_swiper:not(.inited)').length > 0 ) {

	var mySwiper = {};
	//swiper auho height
	jQuery('.sc_slider_swiper.sc_slider_swiper_autoheight').each(function() {
		var sl_width = jQuery(this).width();
		jQuery(this).css('height','auto')
		jQuery(this).find('li.swiper-slide').each(function() {
			if( jQuery(this).find('img').length > 0 && jQuery(this).find('img').attr('width').replace('px', '') >= sl_width ){
				var img_width = jQuery(this).find('img').attr('width').replace('px', '');
				var img_height = jQuery(this).find('img').attr('height').replace('px', '');
				var li_height = sl_width / img_width * img_height;
			} else {
				var li_height = jQuery(this).height();
			}
			jQuery(this).attr('data-autoheight', li_height );
		});
	});

	//контейнер / ширину картинки * высоту картинки

	container.find('.sc_slider_swiper:not(.inited)')
		.each(function () {
			"use strict";
			if (jQuery(this).parents('div:hidden').length > 0) return;
			jQuery(this).addClass('inited');
			var id = jQuery(this).attr('id');
			if (id == undefined) {
				id = 'swiper_'+Math.random();
				id = id.replace('.', '');
				jQuery(this).attr('id', id);
			}
				//specify height
				var firstSlider = jQuery(this).find('li.swiper-slide').eq(0);
				var firstHeight = firstSlider.data('autoheight');
				var firstTheme = firstSlider.data('theme') != undefined ? 'sc_slider_'+firstSlider.data('theme') : '';
				var testimonialAuthor = firstSlider.hasClass('sc_testimonials_item_author_show') ? 'sc_testimonials_author_show' : '';
				jQuery(this).addClass(id+' '+firstTheme+' '+testimonialAuthor ).css('height', firstHeight);
				firstSlider.css('height', firstHeight);

			//init slider
			mySwiper[id] = new Swiper('.'+id, {
				loop: true,
				grabCursor: true,
				calculateHeight: false,
				pagination: jQuery(this).hasClass('sc_slider_pagination') ? '#'+id+' .slider-pagination-nav' : false,
			    paginationClickable: true,
				autoplay: 7000,
				speed: 600,
				onFirstInit: function (swiper){ /*operation*/ },
				onSlideChangeStart: function (swiper){
					var activeIndex = swiper.activeIndex;
					var sliderContainer = swiper.container;
					var sliderLi = jQuery(sliderContainer).find('li.swiper-slide').eq(activeIndex)
					var theme = sliderLi.data('theme') != undefined ? 'sc_slider_'+sliderLi.data('theme') : '';
					var testimonialAuthor = sliderLi.hasClass('sc_testimonials_item_author_show') ? 'sc_testimonials_author_show' : '';
					var height = sliderLi.data('autoheight');
					jQuery('#'+id).removeClass('sc_slider_light sc_slider_dark sc_testimonials_author_show').addClass( theme+' '+testimonialAuthor );
					sliderLi.css('height',height);
					jQuery('#'+id).css('height',height);
					jQuery('#'+id).find('.swiper-wrapper').css('height',height);
			},
			});
				

			var navi = jQuery(this).find('.slider-control-nav');
			if (navi.length == 0) navi = jQuery(this).siblings('.slider-control-nav');
			navi.find('.slide-prev').on("click", function(e){
				var swiper = jQuery(this).parents('.sc_slider_swiper');
				if (swiper.length == 0) swiper = jQuery(this).parents('.slider-control-nav').siblings('.sc_slider_swiper');
				var id = swiper.attr('id');
				e.preventDefault();
				mySwiper[id].swipePrev();
			});
			navi.find('.slide-next').on("click", function(e){
				var swiper = jQuery(this).parents('.sc_slider_swiper');
				if (swiper.length == 0) swiper = jQuery(this).parents('.slider-control-nav').siblings('.sc_slider_swiper');
				var id = swiper.attr('id');
				e.preventDefault();
				mySwiper[id].swipeNext();
			});
		});

	}
		
	
	//Scroll
	if (container.find('.sc_scroll:not(.inited)').length > 0) {
		var myScroll = {};
		container.find('.sc_scroll:not(.inited)')
			.each(function () {
				"use strict";
				if (jQuery(this).parents('div:hidden').length > 0) return;
				jQuery(this).addClass('inited');
				var id = jQuery(this).attr('id');
				if (id == undefined) {
					id = 'scroll_'+Math.random();
					id = id.replace('.', '');
					jQuery(this).attr('id', id);
				}
				jQuery(this).addClass(id);
				myScroll[id] = new Swiper('.'+id, {
					freeMode: true,
					freeModeFluid: true,
					grabCursor: true,
					mode: jQuery(this).hasClass('sc_scroll_vertical') ? 'vertical' : 'horizontal',
					slidesPerView: jQuery(this).hasClass('sc_scroll') ? 'auto' : 1,
					mousewheelControl: true,
					mousewheelAccelerator: 4,	// Accelerate mouse wheel in Firefox 4+
					scrollContainer: jQuery(this).hasClass('sc_scroll_vertical'),
					scrollbar: {
						container: '.'+id+'_bar',
						hide: true,
						draggable: true  
					}
				})
			});
	}

	//Countdown
	if (container.find('.sc_countdown_counter:not(.inited)').length > 0) {
		var myCountdown = {};
		container.find('.sc_countdown_counter:not(.inited)')
			.each(function () {
				"use strict";
				if (jQuery(this).parents('div:hidden').length > 0) return;
				jQuery(this).addClass('inited');
				var id = jQuery(this).attr('id');
				if (id == undefined) {
					id = 'countdown_'+Math.random();
					id = id.replace('.', '');
					jQuery(this).attr('id', id);
				}
				var style = jQuery(this).data('style');
				var curDate = new Date();
				var endDate = jQuery(this).data('date');
				if (endDate == undefined || endDate == ''){
					var cur_date_year = curDate.getFullYear();
					var cur_date_mounth = ((curDate.getMonth()+1)%12) + 1;
					var cur_date_mounth = cur_date_mounth<10 ?  '0'+cur_date_mounth : cur_date_mounth;
					var cur_date_day = curDate.getDate()<10 ? '0'+curDate.getDate() : curDate.getDate();
					endDate = cur_date_year+'-'+cur_date_mounth+'-'+cur_date_day;
				}
				endDate = endDate.split('-');
				var endTime = jQuery(this).data('time');
				if (endTime == undefined || endTime == ''){
					endTime = '00:00:00';
				}
				endTime = endTime.split(':');
				if (endTime.length==2){
					endTime[2] = 0;
				}
				var destDate = new Date(endDate[0], endDate[1]-1, endDate[2], endTime[0], endTime[1], endTime[2]);
				var diff = Math.round(destDate.getTime() / 1000 - curDate.getTime() / 1000);
				
				if( style == 'flip'){
					myCountdown[id] = jQuery('#'+id).FlipClock(diff, {
						countdown: true,
						clockFace: 'DailyCounter'
					});
				} else {
					myCountdown[id] = jQuery('#'+id).countdown({
						until: diff
					});
					
				}
			});
	}

	//Zoom
	if (container.find('.sc_zoom:not(.inited)').length > 0) {
		container.find('.sc_zoom:not(.inited)')
			.each(function () {
				if (jQuery(this).parents('div:hidden').length > 0) return;
				jQuery(this).addClass('inited');
				jQuery(this).find('img').elevateZoom({
					zoomType: "lens",
					//borderColour: "#8c8c8c",
					borderSize: 0,
					lensShape: "round",
					lensSize: 200
				});
			});
	}

	//skills init
	if (container.find('.sc_skills_item:not(.inited)').length > 0) {
		skills_init(container);
		jQuery(window).scroll(function () { skills_init(container); });
	}
	//skills type='arc' init
	if (jQuery('.sc_skills_arc:not(.inited)').length > 0) {
		skills_arc_init(container);
		jQuery(window).scroll(function () { skills_arc_init(container); });
	}


	// eform
	jQuery('.sc_eform_form .sc_eform_input, .sc_eform_form .sc_eform_button').on("click", function (e) {
		"use strict";
		e.stopPropagation();
	});

	jQuery(document).on("click", function (e) {
		"use strict";
		jQuery('.sc_eform_form.sc_eform_hide').removeClass('sc_eform_opened');
	});

	jQuery('.sc_eform_form .sc_eform_button').on("click", function (e) {
		"use strict";
		var form = jQuery(this).parents('.sc_eform_form');
		var input = form.find('.sc_eform_input');
		var type = form.data('type');
		form.addClass('sc_eform_opened');
		e_form( jQuery(this).parents('.sc_eform_form') )
		return false;
	});


}

// eform 
function e_form(container){
"use strict";
	var form = container;
	var input = form.find('.sc_eform_input');
	var button = form.find('.sc_eform_button');
	var type = form.data('type');

		//emailer
		if (form.length>0 && type == 'emailer' ) {
			if (button.hasClass('sc_eform_button')) {
				var group = button.data('group');
				var email = input.val();
				var regexp = new RegExp(THEMEREX_EMAIL_MASK);
				if (!regexp.test(email)) {
					input.get(0).focus();
					//themerex_message_warning(THEMEREX_EMAIL_NOT_VALID);
				} else {
					// jQuery.post(THEMEREX_ajax_url, {
					// 	action: 'emailer_submit',
					// 	nonce: THEMEREX_ajax_nonce,
					// 	group: group,
					// 	email: email
					// }).done(function(response) {
					// 	var rez = JSON.parse(response);
					// 	if (rez.error === '') {
					// 		themerex_message_warning(THEMEREX_MESSAGE_EMAIL_ADDED.replace('%s', email));
					// 		input.val('');
					// 	} else {
					// 		themerex_message_warning(rez.error);
					// 	}
					// });
				}
			} else {
				form.get(0).submit();
				}
		//search
		} else if (form.length>0 && type == 'search'){
			if (button.hasClass('sc_eform_button')) {
				if(  input.val() != '')
					form.get(0).submit();
			}
				
		} else  {
			jQuery(document).trigger('click');
		}
		//endIF
}

	


// skills init
function skills_init(container) {
	if (arguments.length==0) var container = jQuery('body');
	var scrollPosition = jQuery(window).scrollTop() + jQuery(window).height();

	container.find('.sc_skills_item:not(.inited)').each(function () {
		var skillsItem = jQuery(this);
		var scrollSkills = skillsItem.offset().top;
		if (scrollPosition > scrollSkills) {
			skillsItem.addClass('inited');
			var skills = skillsItem.parents('.sc_skills').eq(0);
			var type = skills.data('type');
			var total = skillsItem.find('.sc_skills_total').eq(0);
			var start = parseInt(total.data('start'));
			var stop = parseInt(total.data('stop'));
			var maximum = parseInt(total.data('max'));
			var startPercent = Math.round(start/maximum*100);
			var stopPercent = Math.round(stop/maximum*100);
			var ed = total.data('ed');
			var duration = parseInt(total.data('duration'));
			var speed = parseInt(total.data('speed'));
			var step = parseInt(total.data('step'));
			if (type == 'bar') {
				var dir = skills.data('dir');
				var count = skillsItem.find('.sc_skills_count').eq(0);
				if (dir=='horizontal')
					count.css('width', startPercent + '%').addClass('sc_skills_count_init').animate({ width: stopPercent + '%' }, duration);
				else if (dir=='vertical')
					count.css('height', startPercent + '%').addClass('sc_skills_count_init').animate({ height: stopPercent + '%' }, duration);
				skills_counter(start, stop, speed-(dir!='unknown' ? 5 : 0), step, ed, total);
			} else if (type == 'counter') {
				skills_counter(start, stop, speed - 5, step, ed, total);
			} else if (type == 'pie') {
				var steps = parseInt(total.data('steps'));
				var color = total.data('color');
				var easing = total.data('easing');
	
				skills_counter(start, stop, Math.round(1500/steps), step, ed, total);
	
				var options = {
					segmentShowStroke: true,
					segmentStrokeColor: "#fff",
					percentageInnerCutout: 90,
					animationSteps: steps,
					animationEasing: easing,
					animateRotate: true,
					animateScale: false,
				};
	
				var pieData = [{
					value: stopPercent,
					color: color
				}, {
					value: 100 - stopPercent,
					color: "#E5F1FB"
				}];
				var canvas = skillsItem.find('canvas');
				canvas.attr({width: skillsItem.width(), height: skillsItem.width()}).css({width: skillsItem.width(), height: skillsItem.height()});
				var pie = new Chart(canvas.get(0).getContext("2d")).Doughnut(pieData, options);
			}
		}
	});
}

//skills counter animation
function skills_counter(start, stop, speed, step, ed, total) {
	total.html('<span>'+start+ed+'</span>');
	start = Math.min(stop, start + step);
	if (start <= stop) {
		setTimeout(function () {
			skills_counter(start, stop, speed, step, ed, total);
		}, speed);
	}
}

//skills arc init
function skills_arc_init(container) {
	if (arguments.length==0) var container = jQuery('body');
	container.find('.sc_skills_arc:not(.inited)').each(function () {
		var arc = jQuery(this);
		arc.addClass('inited');
		var canvas = arc.find('.sc_skills_arc_canvas').eq(0);
		var legend = arc.find('.sc_skills_legend').eq(0);
		var w = Math.round((arc.width() - legend.width())*1);
		var c = Math.floor(w/2)+5;
		var o = {
			random: function(l, u){
				return Math.floor((Math.random()*(u-l+1))+l);
			},
			diagram: function(){
				var r = Raphael(canvas.attr('id'), w, w),
					rad = Math.round(w/9),
					speed = 400;
				
				r.circle(c, c, Math.round(w/5)).attr({ stroke: 'none', fill: '#fff' });
				
				var title = r.text(c, c, THEMEREX_SC_SKILLS).attr({
					font: 'lighter '+rad+'px '+THEMEREX_GLOBAL_FONTS,
					fill: '#222222'
				}).toFront();
				
				r.customAttributes.arc = function(value, color, rad){
					var v = 3.6 * value,
						alpha = v == 360 ? 359.99 : v,
						rand = o.random(91, 240),
						a = (rand-alpha) * Math.PI/180,
						b = rand * Math.PI/180,
						sx = c + rad * Math.cos(b),
						sy = c - rad * Math.sin(b),
						x = c + rad * Math.cos(a),
						y = c - rad * Math.sin(a),
						path = [['M', sx, sy], ['A', rad, rad, 0, +(alpha > 180), 1, x, y]];
					return { path: path, stroke: color }
				}
				
				jQuery('.sc_skills_data').find('.arc').each(function(i){
					var t = jQuery(this), 
						color = t.find('.color').val(),
						value = t.find('.percent').val(),
						text = t.find('.text').text();
					
					rad += Math.round(w/15);
					var z = r.path().attr({ arc: [value, color, rad], 'stroke-width': Math.round(w/45) });
					
					z.mouseover(function(){
						this.animate({ 'stroke-width': Math.round(w/9), opacity: .75 }, 1000, 'elastic');
						if (Raphael.type != 'VML') //solves IE problem
						this.toFront();
						title.stop().animate({ opacity: 0 }, speed, '>', function(){
							this.attr({ text: (text ? text + '\n' : '') + value + '%' }).animate({ opacity: 1 }, speed, '<');
						});
					}).mouseout(function(){
						this.stop().animate({ 'stroke-width': Math.round(w/45), opacity: 1 }, speed*4, 'elastic');
						title.stop().animate({ opacity: 0 }, speed, '>', function(){
							title.attr({ text: THEMEREX_SC_SKILLS }).animate({ opacity: 1 }, speed, '<');
						});	
					});
				});
				
			}
		}
		o.diagram();
	});
}

