/* DO NOT MODIFY. This file was compiled Thu, 29 May 2014 22:37:27 GMT from
 * /Users/craig/Code/maker/app/scripts/mixpanel.coffee
 */

(function() {
  $(function() {
    var mixpanel_triggers, trigger, _i, _len;
    if (jQuery.cookie('name') === null) {
      mixpanel_triggers = jQuery('[data-mixpanel_event_type]');
      for (_i = 0, _len = mixpanel_triggers.length; _i < _len; _i++) {
        trigger = mixpanel_triggers[_i];
        bindEventTrack(trigger, 'data-mixpanel_event_type');
      }
    }
    return registerPageTrack();
  });

  (function($) {
    var root;
    root = typeof exports !== "undefined" && exports !== null ? exports : this;
    root.setMixPanelDetails = function(pageType) {
      window._mpAppDetails = {
        _app: "Maker",
        _spt: pageType
      };
    };
    root.registerPageTrack = function(title) {
      var app, expire, time, timeday, timeyear, type, url;
      url = window.location.pathname;
      title = title || document.title;
      app = _mpAppDetails._app;
      type = _mpAppDetails._spt;
      mixpanel.register({
        'app': app,
        'page name': title,
        'page url': url,
        'source page type': type
      });
      mixpanel.unregister('url');
      mixpanel.track('Pageview');
      if (!jQuery.cookie('gd_v')) {
        mixpanel.track('Visit');
      }
      expire = new Date();
      time = expire.getTime();
      time += 30 * 60 * 1000;
      expire.setTime(time);
      jQuery.cookie('gd_v', 1, {
        expires: expire,
        domain: '.maker.good.is',
        path: '/'
      });
      if (!jQuery.cookie('gd_pv')) {
        expire = new Date();
        time = expire.getTime();
        timeyear = time + (365 * 24 * 60 * 60 * 1000);
        expire.setTime(timeyear);
        jQuery.cookie('gd_pv', 1, {
          expires: expire,
          domain: '.maker.good.is',
          path: '/'
        });
        timeday = time + (24 * 60 * 60 * 1000);
        expire.setTime(timeday);
        jQuery.cookie('gd_1d', 1, {
          expires: expire,
          domain: '.maker.good.is',
          path: '/'
        });
      }
      if (jQuery.cookie('gd_1d')) {
        return mixpanel.register({
          'first day visitor': true
        });
      } else {
        return mixpanel.register({
          'first day visitor': false
        });
      }
    };
    root.trackNewVote = function() {
      mixpanel.track('Maker Vote');
      return mixpanel.track('Activity', {
        'activity type': 'maker vote'
      });
    };
    root.trackChangeVote = function() {
      return mixpanel.track('Maker Change Vote');
    };
    root.trackProjectSubmit = function() {
      mixpanel.track('Maker Submit');
      return mixpanel.track('Activity', {
        'activity type': 'maker submit'
      });
    };
    root.trackShareContent = function(target) {
      mixpanel.track('Share Content', {
        'target': target
      });
      return mixpanel.track('Activity', {
        'activity type': 'Share Content'
      });
    };
    root.trackComment = function(reply) {
      registerPageTrack();
      mixpanel.track('Comment', {
        'reply': reply
      });
      return mixpanel.track('Activity', {
        'activity type': 'comment'
      });
    };
    root.trackEvent = function(trigger, dataevent) {
      var type;
      type = jQuery(trigger).attr(dataevent);
      trigger = jQuery(trigger).attr('data-mixpanel_event_trigger');
      return mixpanel.track(type, {
        'trigger': trigger
      });
    };
    return root.bindEventTrack = function(trigger, dataevent) {
      return jQuery(trigger).click(function() {
        return trackEvent(trigger, dataevent);
      });
    };
  })(jQuery);

}).call(this);
