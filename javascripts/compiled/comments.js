/* DO NOT MODIFY. This file was compiled Thu, 29 May 2014 22:37:27 GMT from
 * /Users/craig/Code/maker/app/scripts/comments.coffee
 */

(function() {
  jQuery(function() {
    var scroll_if_ie, set_maker_cookie, set_return_to_cookies, set_timeout_for_submit, track_mixpanel_event;
    scroll_if_ie = function() {
      if (jQuery.browser.msie) {
        return jQuery('html, body').animate({
          scrollTop: 0
        }, 0);
      }
    };
    track_mixpanel_event = function(event) {
      var reply;
      reply = jQuery(event.target).closest('form').parent().attr('id') ? true : false;
      return trackComment(reply);
    };
    set_timeout_for_submit = function(event) {
      event.preventDefault();
      track_mixpanel_event(event);
      return setTimeout((function() {
        return event.target.form.submit();
      }), 300);
    };
    set_return_to_cookies = function(comment_form) {
      var comment_content, comment_id, comment_type, parent_comment, request_params;
      if (comment_form === "") {
        comment_id = jQuery("#comment_commentable_id").val();
        comment_type = jQuery("#comment_commentable_type").val();
        comment_content = jQuery("#comment_content").val();
        parent_comment = "";
      } else {
        comment_id = jQuery("#" + comment_form + " #comment_commentable_id").val();
        comment_type = jQuery("#" + comment_form + " #comment_commentable_type").val();
        comment_content = jQuery("#" + comment_form + " #comment_content").val();
        parent_comment = jQuery("#" + comment_form + " #parent_comment").val();
      }
      request_params = "comment[commentable_id]=" + comment_id + "&comment[commentable_type]=" + comment_type + "&comment[content]=" + encodeURIComponent(comment_content) + "&action=create&controller=comments";
      if (parent_comment !== "") {
        request_params += "&parent_comment=" + parent_comment;
      }
      set_maker_cookie('return_to', '/comments', 20);
      set_maker_cookie('return_to_http_verb', 'post', 20);
      return set_maker_cookie('return_to_params', request_params, 20);
    };
    set_maker_cookie = function(name, value, expires) {
      var expires_date, today;
      today = new Date();
      today.setTime(today.getTime());
      if (expires) {
        expires = expires * 1000 * 60;
      }
      expires_date = new Date(today.getTime() + expires);
      return jQuery.cookie(name, value, {
        domain: 'maker.good.is',
        expires: expires_date,
        path: '/'
      });
    };
    jQuery("input.post-comment-button").click(function(event) {
      return set_timeout_for_submit(event);
    });
    return jQuery("a.post-comment-button").click(function(event) {
      var reply_id;
      track_mixpanel_event(event);
      reply_id = jQuery(event.target).closest('form').parent().attr('id');
      set_return_to_cookies(reply_id);
      return scroll_if_ie();
    });
  });

}).call(this);
