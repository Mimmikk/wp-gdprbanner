<?php
if (!defined('WP_UNINSTALL_PLUGIN')) {
    die;
}

wp_clear_scheduled_hook('gdpr_cookie_consent_cron');

delete_option('gdpr_cookie_consent_options');
delete_transient('gdpr_cookie_consent_transient');

global $wpdb;
$wpdb->query("DROP TABLE IF EXISTS {$wpdb->prefix}gdpr_cookie_consent");
?>
