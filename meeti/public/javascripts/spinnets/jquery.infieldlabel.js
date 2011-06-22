/**
 * @license In-Field Label jQuery Plugin
 * http://fuelyourcoding.com/scripts/infield.html
 *
 * Copyright (c) 2009-2010 Doug Neiner
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://docs.jquery.com/License
 *
 * @version 0.1.2
 * @fork https://github.com/assembler/In-Field-Labels-jQuery-Plugin
 */
(function ($) {

  $.InFieldLabels = function ($field, options) {
    // To avoid scope issues, use 'base' instead of 'this'
    // to reference this class from internal events and functions.
    var base = this;
    
    base.$wrapper = null;
    base.$field = $field;
    base.$label = null;
    base.$originalLabel = $('label[for="' + base.$field.attr('id') + '"]');
    base.label = base.$field.attr('data-infield-label');
    
    base.$field.data("InFieldLabels", base);
    base.showing = true;

    base.init = function () {
      if(base.label == "true") {
        base.label = base.$originalLabel.html();
        base.$originalLabel.hide();
      }
      
      base.$wrapper = base.$field.wrap('<div class="infield_wrapper" />').parent();
      base.$label = $('<span>').addClass("infield_label").html(base.label);
      base.$label.appendTo(base.$wrapper);
      
      base.$label.bind('click.infieldlabel', function(e) {
        e.preventDefault();
        base.$field.focus();
        return false;
      });
      
      
      // Merge supplied options with default options
      base.options = $.extend({}, $.InFieldLabels.defaultOptions, options);

      // Check if the field is already filled in
      if (base.$field.val() !== "") {
        base.$label.hide();
        base.showing = false;
      }

      base.$field.focus(function () {
        base.fadeOnFocus();
      }).blur(function () {
        base.checkForEmpty(true);
      }).bind('keydown.infieldlabel', function (e) {
        // Use of a namespace (.infieldlabel) allows us to
        // unbind just this method later
        base.hideOnChange(e);
      }).bind('paste', function (e) {
        // Since you can not paste an empty string we can assume
        // that the fieldis not empty and the label can be cleared.
        base.setOpacity(0.0);
      }).change(function (e) {
        base.checkForEmpty();
      }).bind('onPropertyChange', function () {
        base.checkForEmpty();
      });
    };

    // If the label is currently showing
    // then fade it down to the amount
    // specified in the settings
    base.fadeOnFocus = function () {
      if (base.showing) {
        base.setOpacity(base.options.fadeOpacity);
      }
    };

    base.setOpacity = function (opacity) {
      base.$label.stop().animate({ opacity: opacity }, base.options.fadeDuration);
      base.showing = (opacity > 0.0);
    };

    // Checks for empty as a fail safe
    // set blur to true when passing from
    // the blur event
    base.checkForEmpty = function (blur) {
      if (base.$field.val() === "") {
        base.prepForShow();
        base.setOpacity(blur ? 1.0 : base.options.fadeOpacity);
      } else {
        base.setOpacity(0.0);
      }
    };

    base.prepForShow = function (e) {
      if (!base.showing) {
        // Prepare for a animate in...
        base.$label.css({opacity: 0.0}).show();

        // Reattach the keydown event
        base.$field.bind('keydown.infieldlabel', function (e) {
          base.hideOnChange(e);
        });
      }
    };

    base.hideOnChange = function (e) {
      if (
          (e.keyCode === 16) || // Skip Shift
          (e.keyCode === 9) // Skip Tab
        ) {
        return; 
      }

      if (base.showing) {
        base.$label.hide();
        base.showing = false;
      }

      // Remove keydown event to save on CPU processing
      base.$field.unbind('keydown.infieldlabel');
    };

    // Run the initialization method
    base.init();
  };

  $.InFieldLabels.defaultOptions = {
    fadeOpacity: 0.5, // Once a field has focus, how transparent should the label be
    fadeDuration: 300 // How long should it take to animate from 1.0 opacity to the fadeOpacity
  };

  $.InFieldLabels.whitelist = 'textarea, input[type=text], input[type=password], input[type=email], input[type=url], input[type=number], input[type=search], input[type=tel]';

  $.fn.inFieldLabels = function (options) {
    return this.each(function () {
      var $input = $(this),
          api = $input.data("InFieldLabels");
      
      if($input.is($.InFieldLabels.whitelist) && $input.attr('data-infield-label') && !api){
        (new $.InFieldLabels($input, options));
      }
      
      return this;
    });
  };

}(jQuery));