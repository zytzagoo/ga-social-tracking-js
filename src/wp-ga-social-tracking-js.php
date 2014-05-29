<?php

/*
Plugin Name: GA Social Tracking Helper (js)
Plugin URI: http://zytzagoo.github.io/ga-social-tracking-js/
Description: Enqueues the bundled ga-social-tracking.min.js script in the footer of your current WP theme.
Requires at least: 3.6
Tested up to: 3.9.1
Version: 0.1
Author: zytzagoo
Author URI: http://zytzagoo.net/
*/

function ga_social_tracking_js() {
    wp_enqueue_script(
        'ga-social-tracking-js', 
        plugins_url( 'ga-social-tracking.min.js', __FILE__ ), 
        array(),
        null,
        true
    );
}

add_action( 'wp_enqueue_scripts', 'ga_social_tracking_js' );
