/* global jQuery:false */

var THEMEREX_user_marks = false;
//var allowUserReviews = false;

jQuery(document).ready(function () {
	"use strict";

	jQuery('.revBlock.reviewEdit').mousemove(function (e) {
		"use strict";
		if (typeof(allowUserReviews)=='undefined' || !allowUserReviews) return;
		var ratWidth = jQuery(this).width();
		var ratX = e.pageX - jQuery(this).offset().left; //this.offsetLeft;
		if (ratX == 1) ratX = 0;
		if (ratX <= ratWidth) {
			var ratPercent = Math.round(ratX / ratWidth * 100);
			jQuery(this).find('.revTooltip').css('left', ratPercent + '%').html(marksToDisplay(ratPercent) + (reviews_max_level==100 ? '%' : ''));
		}
	});

	jQuery('.revBlock.reviewEdit').click(function (e) {
		"use strict";
		if (typeof(allowUserReviews)=='undefined' || !allowUserReviews) return;
		var ratWidth = jQuery(this).width();
		var ratX = e.pageX - jQuery(this).offset().left; //this.offsetLeft + 1;
		if (ratX == 1) ratX = 0;
		if (ratX <= ratWidth) {
			var ratPercent = Math.round(ratX / ratWidth * 100);
			var ratValue = marksToDisplay(ratPercent);
			jQuery(this).data('mark', ratValue);
			jQuery(this).find('input').val(ratValue);
			jQuery(this).find('.ratingValue').css('width', ratPercent + '%');
			if (!THEMEREX_ADMIN_MODE && !THEMEREX_user_marks) {
				THEMEREX_user_marks = true;
				jQuery(this).parent().siblings('.revWrap').find('.reviewEdit').each(function () {
					jQuery(this).data('mark', 0).find('.ratingValue').css('width', 0);
				});
			}
			jQuery(this).parent('.revItem').find('.revAvg').html(ratValue);
			jQuery('#users-tabs .revAccept').slideDown(300);
			var revTab = jQuery(this).parents('.reviewTab').length;
			setAverageMark(revTab > 0 ? jQuery(this).parents('.reviewTab') : jQuery(this).parents('.reviewBlock'));
		}
	});

	// Save user's marks
	jQuery('#users-tabs .revAccept a').click(function(e) {
		if (typeof(allowUserReviews)=='undefined' || !allowUserReviews) return;
		var marks_cnt = 0;
		jQuery('#users-tabs .reviewEdit input').each(function (idx) {
			marks[idx] = Math.round(((marks.length>idx && marks[idx]!='' ? parseFloat(marks[idx])*users : 0) + parseFloat(jQuery(this).val()))/(users+1)*10)/10;
			jQuery(this).val(marks[idx]);
			marks_cnt++;
		});
		if (marks.length > marks_cnt)
			marks = marks.splice(marks_cnt, marks.length-marks_cnt)
		users++;
		jQuery('#users-tabs .revAccept').fadeOut();
		jQuery.post(THEMEREX_ajax_url, {
			action: 'reviews_users_accept',
			nonce: THEMEREX_ajax_nonce,
			post_id: post_id,
			marks: marks.join(','),
			users: users
		}).done(function(response) {
			// var rez = JSON.parse(response);
			var rez = "";
			if (rez.error === '') {
				allowUserReviews = false;
				jQuery.cookie('reviews_vote', reviews_vote + (reviews_vote.substr(-1)!=',' ? ',' : '') + post_id + ',', {expires: 365, path: '/'});
				jQuery('#users-tabs .revBlock').each(function (idx) {
					jQuery(this).data('mark', marks[idx])
						.find('input').val(marks[idx]).end()
						.find('.ratingValue').css('width', Math.round(marks[idx]/reviews_max_level*100) + '%');
					jQuery(this).parent('.revItem').find('.revAvg').html(marks[idx]);
				});
				setAverageMark(jQuery('#users-tabs'));
				jQuery('#users-tabs .reviewEdit').removeClass('reviewEdit');
				jQuery('#users-tabs .infoTotal .infoRat').html(THEMEREX_REVIEWS_VOTE);
			} else {
				jQuery('#users-tabs .infoTotal .infoRat').html(THEMEREX_REVIEWS_ERROR);
			}
		});
		e.preventDefault();
		return false;
	});
});


// Show average mark
function setAverageMark(obj) {
	"use strict";
	var avg = 0;
	var cnt = 0;
	obj.find('.reviewEdit').each(function() {
		avg += parseFloat(jQuery(this).data('mark'));
		cnt++;
	});
	avg = cnt > 0 ? Math.round(avg/cnt*10)/10 : '0';
	if (reviews_max_level < 100 && String(avg).indexOf('.') < 0) {
		avg += '.0';
	}
	obj.find('.revTotalWrap').find('.revRating').html(avg);
}

// Convert percent to rating marks level
function marksToDisplay(mark) {
	"use strict";
	if (reviews_max_level < 100) {
		mark = Math.round(mark / 100 * reviews_max_level * 10) / 10;
		if (String(mark).indexOf('.') < 0) {
			mark += '.0';
		}
	}
	return mark;
}

// Get word-value review rating
function getReviewsRatingWordValue(r) {
	"use strict";
	var words = reviews_levels.split(',');
	var k = reviews_max_level / words.length;
	r = Math.max(0, Math.min(words.length-1, Math.floor(r/k)));
	return words[r];
}
