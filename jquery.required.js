/**
 * jQuery.required Plugin
 * @author Stéphan Zych <info@monkeymonk.be>
 * @copyriht 2010-2011 Stéphan Zych <info@monkeymonk.be>
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */

(function ($) {
	"use strict";
	
	var defaults = {
		className: 'required',
		override: true,
		
		// callback
		onValidate: function () {},
		onSubmit: function () {}
	}, settings = {};
	
	
	var methods = {
		// ========================================================================
		init: function (options) {
			settings = $.extend({}, defaults, options);
			
			if (!settings.override && 'required' in document.createElement('input')) {
				return;
			}
			
			return this.each(function () {
				var that = this, $that = $(that), form = $that.closest('form');
				
				methods.destroy.call($that);
				
				if (settings.override) {
					$that.on('invalid', function (e) {
						e.preventDefault();
					});
				}
				
				$that
				.on('keydown.required blur.required', function () {
					methods.validate.call(this, settings.onValidate);
				});
				
				form.attr('novalidate', 'novalidate')
				.unbind('submit.required')
				.on('submit.required', function () {
					var fields = $(this).find('[required]');
					
					fields.each(function () {
						methods.validate.call(this, settings.onValidate);
					});
					
					return settings.onSubmit.call(this, !form.find('.required').length, settings);
				});
			});
		}, // init
		
		// ========================================================================
		validate: function (callback) {
			return $(this).each(function () {
				var that = this, value = that.value, label = $(that).add('[for="' + that.id + '"]'), valid = false;
				
				callback = callback || settings.onValidate;
				
				// if :radio or :checkbox
				if (that.type.match(/radio|checkbox/i)) {
					if (that.checked) {
						valid = true;
					}
				} else {
					if (value && value !== that.placeholder) {
						valid = true;
					}
				}
				
				if (valid) {
					label.removeClass(settings.className);
				} else {
					label.addClass(settings.className);
				}
				
				callback.call(this, valid, settings);
			});
		}, // validate
		
		// ========================================================================
		destroy: function () {
			return this.each(function () {
				$(this).unbind('.required')
				.closest('form').unbind('.required');
			});
		} // destroy
	};
	
	
	$.fn.required = function (options) {
		
		if (methods[options]) {
			return methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof options === 'object' || !options) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method "' + options + '" does not exist in $.required plugin!');
		}
		
	}; // $.fn.required
	
})(jQuery); // jQuery.required() by Stéphan Zych (monkeymonk.be)