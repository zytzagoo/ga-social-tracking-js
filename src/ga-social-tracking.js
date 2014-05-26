/**
* ga-social-tracking-js
* http://zytzagoo.github.io/ga-social-tracking-js/
* Copyright (c) 2014 zytzagoo
*/

/*global window:true, unescape:true, _gaq:true, FB:true, twttr:true */

var ZWF_GA_Social_Tracker = {};

// TODO: might not need this at all
ZWF_GA_Social_Tracker.extract_param_from_uri = function (uri, name) {
    if (!uri) {
        return;
    }
    var regex = new RegExp('[\\?&#]' + name + '=([^&#]*)');
    var params = regex.exec(uri);
    if (params !== null) {
        return unescape(params[1]);
    }
    return;
};

// TODO: check if ga.js async is really the most common implementation?
// TODO: what about the good old _gat ?
//
// TODO: in theory, there exists an additional analytics param that we could send,
// (opt_pagePath), but it adds complexity and requires an URI parsing lib
// Also, it has a slightly different signature in newer analytics.js API
ZWF_GA_Social_Tracker.ga_send = function(arr_params) {
    try {
        _gaq.push(arr_params);
    } catch (e) {
        // check for newer GA implementation ("universal", analytics.js)
        if ('function' === typeof window.ga) {
            // replace '_trackSocial' with 'social'
            arr_params[0] = 'social';
            // prepend 'send' to params list and apply it
            arr_params.unshift('send');
            // call ga with each param separately
            window.ga.apply(window, arr_params);
        } else {
            // not gonna bother with other older implementations for now...
            throw 'No usable GA implementation found';
        }
    }
    // call our global callback function if it's defined
    if ('function' === typeof zwf_ga_st_callback) {
        zwf_ga_st_callback.call(this, arr_params);
    }
};

ZWF_GA_Social_Tracker.track_twitter = function(intent_event) {
    if (intent_event) {
        var label = intent_event.type;
        // now let's try setting the label to somethig more
        // useful depending on the type of event
        switch (intent_event.type) {
            case 'click':
                if (intent_event.region) {
                    label = intent_event.region;
                }
                break;
            case 'retweet':
                if (intent_event.data.source_tweet_id) {
                    label = intent_event.data.source_tweet_id;
                }
                break;
            case 'favorite':
                if (intent_event.data.source_tweet_id) {
                    label = intent_event.data.source_tweet_id;
                }
                if (intent_event.data.tweet_id) {
                    label = intent_event.data.tweet_id;
                }
                break;
            case 'follow':
                if (intent_event.data && intent_event.data.user_id && intent_event.data.screen_name) {
                    label = intent_event.data.user_id + " (" + intent_event.data.screen_name + ")";
                }
                break;
        }
        // try grabbing the url param from the iframe if it's there and add
        // it to whatever's in the label already
        if (intent_event.target && intent_event.target.nodeName == 'IFRAME') {
            var url = ZWF_GA_Social_Tracker.extract_param_from_uri(intent_event.target.src, 'url');
            if (url) {
                label += ' - ' + url;
            }
        }

        // defaults for twitter social tracking
        var params = ['_trackSocial', 'Twitter', intent_event.type];
        // add label to the end
        params.push(label);
        ZWF_GA_Social_Tracker.ga_send(params);
    }
};

ZWF_GA_Social_Tracker.track_facebook = function(action, uri){
    var params = ['_trackSocial', 'Facebook', action, uri];
    ZWF_GA_Social_Tracker.ga_send(params);
};

// bind FB events
try {
    if (FB && FB.Event && FB.Event.subscribe) {
        FB.Event.subscribe('edge.create', function(uri){
            ZWF_GA_Social_Tracker.track_facebook('like', uri);
        });
        FB.Event.subscribe('edge.remove', function(uri){
            ZWF_GA_Social_Tracker.track_facebook('unlike', uri);
        });
        FB.Event.subscribe('message.send', function(uri){
            ZWF_GA_Social_Tracker.track_facebook('send', uri);
        });
    }
} catch (e) {}

// bind Twitter events
if ('undefined' !== typeof twttr) {
    twttr.ready(function(twttr) {
        var events = ['tweet', 'follow', 'retweet', 'favorite', 'click'];
        for (var i = 0, l = events.length; i < l; i++) {
            var evt_name = events[i];
            twttr.events.bind(evt_name, ZWF_GA_Social_Tracker.track_twitter);
        }
    });
}
