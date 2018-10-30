/* DO NOT MODIFY. This file was compiled Thu, 29 May 2014 22:37:28 GMT from
 * /Users/craig/Code/maker/app/scripts/ui_elements.coffee
 */

(function() {
  (function($) {
    var root;
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    return root.initializeGhostTextInputs = function() {
      jQuery(".input .text-entry").each(function(index) {
        if (jQuery.trim(jQuery(this).val()).length > 0) {
          return jQuery(this).parents('.input').find('.ghost-label').hide();
        }
      });
      jQuery(".input .text-entry").focus(function() {
        return jQuery(this).parents('.input').find('.ghost-label').hide();
      });
      jQuery(".ghost-label").click(function() {
        return jQuery(this).parents('.input').find('.text-entry').focus();
      });
      jQuery(".char-limit").click(function() {
        return jQuery(this).parents('.input').find('.text-entry').focus();
      });
      return jQuery(".input .text-entry").blur(function() {
        if (jQuery.trim(jQuery(this).val()).length === 0) {
          return jQuery(this).parents('.input').find('.ghost-label').show();
        }
      });
    };
  })(jQuery);

}).call(this);
