var tracker = ZWF_GA_Social_Tracker;

var test_url = 'http://example.org';

var fake_twitter_tweet_intent = {
    type: 'tweet'
};

var fake_twitter_follow_intent = {
    type: 'follow',
    data: {
        user_id: 1,
        screen_name: 'test0r'
    }
};

var fake_twitter_click_intent = {
    type: 'click',
    region: 'region'
};

var fake_twitter_favorite_intent = {
    type: 'favorite',
    data: {
        tweet_id: 1
    }
};
var fake_twitter_retweet_intent = {
    type: 'retweet',
    data: {
        source_tweet_id: 1
    }
};

var save_existing_globals = function(){
    window.__prev_gaq = window._gaq || [];
    window.__prev_ga = window.ga || function(){};
};

var restore_saved_globals = function(){
    window._gaq = window.__prev_gaq;
    window.ga = window.__prev_ga;
};

var nuke_all_ga_implementations = function() {
    window._gaq = window.ga = undefined;
};

var enable_gaq = function(){
    window._gaq = [];
};
var disable_gaq = function() {
    window._gaq = undefined;
};

var enable_ga = function(impl) {
    window.ga = impl;
};
var disable_ga = function(){
    window.ga = undefined;
};

QUnit.module('Simple');

QUnit.test('Object defined', function(assert) {
    assert.notStrictEqual(tracker, undefined, 'tracker object not undefined');
});

// TODO: see about removing extract_param_from_uri and
// then we don't need this test here either
QUnit.test('URI param extraction', function(assert) {
    var urls = {
        // src => expected extracted result for 'url' param
        'http://somewhere.over-the.rainbow.com/path?query=something&url=whatever': 'whatever',
        '../../?url=http%3A%2F%2Furl%2F%3Fquery%3Dsomething%26url%3Dwhatever': 'http://url/?query=something&url=whatever',
        'http%3A%2F%2Furl%3Fquery%3Dsomething%26url%3Dwhatever': undefined
    };
    var result;
    for (var src in urls) {
        if (urls.hasOwnProperty(src)) {
            result = tracker.extract_param_from_uri(src, 'url');
            assert.deepEqual(result, urls[src], '"url" query param in "' + src + '" equals expected value "' + result + '"');
        }
    }
});

QUnit.test('Throws without a "somewhat valid" GA implementation present', function(assert) {
    // save the state
    save_existing_globals();
    // disturb the universe!
    nuke_all_ga_implementations();
    // should throw now...
    throws(
        function(){
            ZWF_GA_Social_Tracker.track_facebook('test-like', test_url);
        },
        'Throws as expected'
    );
    // restore order to the universe
    restore_saved_globals();
});

QUnit.module('_gaq tests', {
    setup: function(){
        enable_gaq();
    },
    teardown: function(){
        disable_gaq();
    }
});

QUnit.test('_gaq Twitter tweet', function(assert) {
    var tw_expected_tweet_arguments = ['_trackSocial', 'Twitter', 'tweet', 'tweet'];
    _gaq.push = function() {
        assert.ok(true, '_gaq.push for twitter called');
        assert.deepEqual(arguments[0], tw_expected_tweet_arguments, '_gaq.push method arguments match expected twitter tweet arguments');
    };
    ZWF_GA_Social_Tracker.track_twitter(fake_twitter_tweet_intent);
});

QUnit.test('_gaq Twitter retweet', function(assert) {
    var tw_expected_retweet_arguments = ['_trackSocial', 'Twitter', 'retweet', fake_twitter_retweet_intent.data.source_tweet_id];
    _gaq.push = function() {
        assert.ok(true, '_gaq.push for retweet called');
        assert.deepEqual(arguments[0], tw_expected_retweet_arguments, '_gaq.push method arguments match expected twitter retweet arguments');
    };
    ZWF_GA_Social_Tracker.track_twitter(fake_twitter_retweet_intent);
});

QUnit.test('_gaq Twitter follow', function(assert) {
    var tw_expected_follow_arguments = ['_trackSocial', 'Twitter', 'follow', '1 (test0r)'];
    _gaq.push = function() {
        assert.ok(true, '_gaq.push for follow called');
        assert.deepEqual(arguments[0], tw_expected_follow_arguments, '_gaq.push method arguments match expected twitter follow arguments');
    };
    ZWF_GA_Social_Tracker.track_twitter(fake_twitter_follow_intent);
});

QUnit.test('_gaq Twitter favorite', function(assert) {
    var tw_expected_favorite_arguments = ['_trackSocial', 'Twitter', 'favorite', fake_twitter_favorite_intent.data.tweet_id];
    _gaq.push = function() {
        assert.ok(true, '_gaq.push for favorite called');
        assert.deepEqual(arguments[0], tw_expected_favorite_arguments, '_gaq.push method arguments match expected twitter favorite arguments');
    };
    ZWF_GA_Social_Tracker.track_twitter(fake_twitter_favorite_intent);
});

QUnit.test('_gaq Twitter click', function(assert) {
    var tw_expected_click_arguments = ['_trackSocial', 'Twitter', 'click', 'region'];
    _gaq.push = function() {
        assert.ok(true, '_gaq.push for click called');
        assert.deepEqual(arguments[0], tw_expected_click_arguments, '_gaq.push method arguments match expected twitter click arguments');
    };
    ZWF_GA_Social_Tracker.track_twitter(fake_twitter_click_intent);
});

// TODO: test that twitter iframe url fetch thing?
// it might be unvailable now, after twitter moved some stuff around...

QUnit.test('_gaq Facebook like', function(assert) {
    var fb_expected_arguments = ['_trackSocial', 'Facebook', 'like', test_url];
    _gaq.push = function() {
        assert.ok(true, '_gaq.push for facebook like called');
        assert.deepEqual(arguments[0], fb_expected_arguments, '_gaq.push method arguments match expected facebook like arguments');
    };
    ZWF_GA_Social_Tracker.track_facebook('like', test_url);
});

QUnit.test('_gaq Facebook unlike', function(assert) {
    var fb_expected_arguments = ['_trackSocial', 'Facebook', 'unlike', test_url];
    _gaq.push = function() {
        assert.ok(true, '_gaq.push for facebook unlike called');
        assert.deepEqual(arguments[0], fb_expected_arguments, '_gaq.push method arguments match expected facebook unlike arguments');
    };
    ZWF_GA_Social_Tracker.track_facebook('unlike', test_url);
});

QUnit.test('_gaq Facebook send', function(assert) {
    var fb_expected_arguments = ['_trackSocial', 'Facebook', 'send', test_url];
    _gaq.push = function() {
        assert.ok(true, '_gaq.push for facebook send called');
        assert.deepEqual(arguments[0], fb_expected_arguments, '_gaq.push method arguments match expected facebook send arguments');
    };
    ZWF_GA_Social_Tracker.track_facebook('send', test_url);
});


QUnit.module('ga() tests', {
    setup: function(){
    },
    teardown: function(){
        disable_ga();
    }
});

QUnit.test('ga() Facebook like', function(assert) {
    var fb_expected_like_arguments = ['send', 'social', 'Facebook', 'like', test_url];
    window.ga = function() {
        assert.ok(true, 'ga() for facebook like called');
        for (var i = 0, al = arguments.length; i < al; i++) {
            assert.strictEqual(arguments[i], fb_expected_like_arguments[i], 'ga() facebook like argument idx: ' + i + ' matches the expected argument');
        }
    };
    ZWF_GA_Social_Tracker.track_facebook('like', test_url);
});

QUnit.test('ga() Facebook unlike', function(assert) {
    var fb_expected_unlike_arguments = ['send', 'social', 'Facebook', 'unlike', test_url];
    window.ga = function() {
        assert.ok(true, 'ga() for facebook unlike called');
        for (var i = 0, al = arguments.length; i < al; i++) {
            assert.strictEqual(arguments[i], fb_expected_unlike_arguments[i], 'ga() facebook unlike argument idx: ' + i + ' matches the expected argument');
        }
    };
    ZWF_GA_Social_Tracker.track_facebook('unlike', test_url);
});

QUnit.test('ga() Facebook send', function(assert) {
    var fb_expected_send_arguments = ['send', 'social', 'Facebook', 'send', test_url];
    window.ga = function() {
        assert.ok(true, 'ga() for facebook send called');
        for (var i = 0, al = arguments.length; i < al; i++) {
            assert.strictEqual(arguments[i], fb_expected_send_arguments[i], 'ga() facebook send argument idx: ' + i + ' matches the expected argument');
        }
    };
    ZWF_GA_Social_Tracker.track_facebook('send', test_url);
});

QUnit.test('ga() Twitter tweet', function(assert) {
    var tw_expected_tweet_arguments = ['send', 'social', 'Twitter', 'tweet', 'tweet'];
    window.ga = function() {
        assert.ok(true, 'ga() for twitter tweet called');
        for (var i = 0, al = arguments.length; i < al; i++) {
            assert.strictEqual(arguments[i], tw_expected_tweet_arguments[i], 'ga() twitter tweet argument idx: ' + i + ' matches the expected argument');
        }
    };
    ZWF_GA_Social_Tracker.track_twitter(fake_twitter_tweet_intent);
});

QUnit.test('ga() Twitter retweet', function(assert) {
    var tw_expected_retweet_arguments = ['send', 'social', 'Twitter', 'retweet', fake_twitter_retweet_intent.data.source_tweet_id];
    window.ga = function() {
        assert.ok(true, 'ga() for twitter retweet called');
        for (var i = 0, al = arguments.length; i < al; i++) {
            assert.strictEqual(arguments[i], tw_expected_retweet_arguments[i], 'ga() twitter retweet argument idx: ' + i + ' matches the expected argument');
        }
    };
    ZWF_GA_Social_Tracker.track_twitter(fake_twitter_retweet_intent);
});

QUnit.test('ga() Twitter follow', function(assert) {
    var tw_expected_follow_arguments = ['send', 'social', 'Twitter', 'follow', '1 (test0r)'];
    window.ga = function() {
        assert.ok(true, 'ga() for twitter follow called');
        for (var i = 0, al = arguments.length; i < al; i++) {
            assert.strictEqual(arguments[i], tw_expected_follow_arguments[i], 'ga() twitter follow argument idx: ' + i + ' matches the expected argument');
        }
    };
    ZWF_GA_Social_Tracker.track_twitter(fake_twitter_follow_intent);
});

QUnit.test('ga() Twitter favorite', function(assert) {
    var tw_expected_favorite_arguments = ['send', 'social', 'Twitter', 'favorite', fake_twitter_favorite_intent.data.tweet_id];
    window.ga = function() {
        assert.ok(true, 'ga() for twitter favorite called');
        for (var i = 0, al = arguments.length; i < al; i++) {
            assert.strictEqual(arguments[i], tw_expected_favorite_arguments[i], 'ga() twitter favorite argument idx: ' + i + ' matches the expected argument');
        }
    };
    ZWF_GA_Social_Tracker.track_twitter(fake_twitter_favorite_intent);
});

QUnit.test('ga() Twitter click', function(assert) {
    var tw_expected_click_arguments = ['send', 'social', 'Twitter', 'click', 'region'];
    window.ga = function() {
        assert.ok(true, 'ga() for twitter click called');
        for (var i = 0, al = arguments.length; i < al; i++) {
            assert.strictEqual(arguments[i], tw_expected_click_arguments[i], 'ga() twitter click argument idx: ' + i + ' matches the expected argument');
        }
    };
    ZWF_GA_Social_Tracker.track_twitter(fake_twitter_click_intent);
});
