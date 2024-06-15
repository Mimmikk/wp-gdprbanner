<?php
/**
 * Plugin Name: GDPR Banner
 * Plugin URI: https://github.com/Mimmikk/wp-gdprbanner/
 * Description: Simple yet flexible GDPR/Cookie Consent banner with preferences. See readme on how to set up.
 * Version: 3.2.8-gtm/A
 * Author: Eivind G. / Mimmikk
 * Author URI: https://github.com/cnoid
 * License: GPLv3
 */

define('GDPR_GTAG_GA_ID', 'X'); // Google Analytics ID. Replace X with GA ID. Leave "X" or empty to not load script.
define('GDPR_GTAG_GTM_ID', 'X'); // Google Tag Manager ID. Replace X with GTM ID. Leave "X" or empty to not load script.
define('GDPR_UMAMI_SITE_ID', 'X'); // Umami Site ID. Replace X with Site ID. Requires on GDPR_UMAMI_URI. Leave "X" or empty to not load script.
define('GDPR_UMAMI_URI', 'X'); // Umami URL. Replace X with URL. Include full URL with script location. Requires GDPR_UMAMI_SITE_ID. Leave "X" or empty to not load script.

require_once plugin_dir_path(__FILE__) . 'lib/gdpr-analytics-scripts.php';

function gdpr_enqueue_scripts() {
    wp_enqueue_style('gdpr-cookie-consent-style', plugin_dir_url(__FILE__) . 'lib/css/banner.css');
    wp_enqueue_script('gdpr-cookie-consent-script', plugin_dir_url(__FILE__) . 'lib/js/gdpr-script.js', array('jquery'), false, true);
    wp_enqueue_script('gdpr-gt-consent-script', plugin_dir_url(__FILE__) . 'lib/js/gdpr-gt-consent.js', array('jquery'), false, true);
    
    wp_localize_script('gdpr-cookie-consent-script', 'gdprData', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
        'gtagGaID' => GDPR_GTAG_GA_ID,
        'gtagGtmID' => GDPR_GTAG_GTM_ID,
        'umamiSiteID' => GDPR_UMAMI_SITE_ID,
        'umamiURI' => GDPR_UMAMI_URI,
    ));
}
add_action('wp_enqueue_scripts', 'gdpr_enqueue_scripts');

function gdpr_display_banner() {
    echo "<div id='gdpr-banner-placeholder'></div>";
}
add_action('wp_footer', 'gdpr_display_banner');

function gdpr_include_analytics_scripts() {
    gdpr_include_gtm_script();
    gdpr_include_ga_script();
    gdpr_include_umami_script();
}
add_action('wp_head', 'gdpr_include_analytics_scripts', 1);

add_action('wp_body_open', 'gdpr_inject_gtm_noscript');

function fetch_gdpr_banner_callback() {
    ob_start();
    include 'lib/banner.php';
    $banner_html = ob_get_clean();
    wp_send_json_success($banner_html);
}
add_action('wp_ajax_fetch_gdpr_banner', 'fetch_gdpr_banner_callback');
add_action('wp_ajax_nopriv_fetch_gdpr_banner', 'fetch_gdpr_banner_callback');
?>
