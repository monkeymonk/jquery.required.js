/**
 * jQuery.required Plugin
 * @author Stéphan Zych <info@monkeymonk.be>
 * @copyriht 2010-2011 Stéphan Zych <info@monkeymonk.be>
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */

(function ($) {
    'use strict';

    var Required = function () {
        var defaults = {
            className: 'required',
            override: true,
            
            // callback
            onValidate: function () {},
            onSubmit: function () {}
        };

        var init = function (options) {
            defaults = $.extend({}, defaults, options);
            
            if (!defaults.override && 'required' in document.createElement('input')) {
                return;
            }
            
            return this.each(function () {
                var field = this, $field = $(field), form = $field.closest('form');
                
                destroy.call($field);
                
                $field
                .on('keydown.required blur.required change.required', function () {
                    validate.call(this, defaults.onValidate);
                })
                .closest('form').attr('novalidate', 'novalidate')
                .unbind('submit.required')
                .on('submit.required', function () {
                    var $fields = $(this).find('[required]');
                    
                    $fields.each(function () {
                        validate.call(this, defaults.onValidate);
                    });
                    
                    return defaults.onSubmit.call(this, !form.find('.required').length, defaults);
                });
            });
        }; // init

        var validate = function (callback) {
            return $(this).each(function () {
                var field = this, value = field.value, label = $(field).add('[for="' + field.id + '"]'), valid = false;
                
                callback = callback || defaults.onValidate;
                
                // if :radio or :checkbox
                if (field.type.match(/radio|checkbox/i)) {
                    if ($('[name="' + field.name + '"]:checked').length) {
                        $('[name="' + field.name + '"]').each(function () {
                            $(this).add('[for="' + this.id + '"]').removeClass(defaults.className);
                        });

                        valid = true;
                    }
                } else {
                    if (value && value !== field.placeholder) {
                        label.removeClass(defaults.className);

                        valid = true;
                    }
                }
                
                if (!valid) {
                    label.addClass(defaults.className);
                }
                
                callback.call(this, valid, defaults);
            });
        }; // validate

        var destroy = function () {
            return this.each(function () {
                $(this).unbind('.required')
                .closest('form').removeAttr('novalidate')
                .unbind('.required');
            });
        }; // destroy

        return {
            init: init,
            validate: validate,
            destroy: destroy
        };

    }; // Required

    $.fn.required = function (options) {
        if (!$.data(this, 'required')) {
            $.data(this, 'required', new Required(this, options));
        }

        var plugin = $.data(this, 'required');

        if (plugin[options]) {
            return plugin[options].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof options === 'object' || !options) {
            return plugin.init.apply(this, arguments);
        } else {
            $.error('Method "' + arguments[0] + '" does not exist in $.required plugin!');
        }
    }; // $.fn.required

} (jQuery)); // jQuery.required() by Stéphan Zych (monkeymonk.be)