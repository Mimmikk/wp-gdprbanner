<?php
function gdpr_include_gtm_script() {
    if (GDPR_GTAG_GTM_ID !== 'X' && GDPR_GTAG_GTM_ID !== '') {
        ?>
        <script>
            var consent = JSON.parse(localStorage.getItem('cookieConsent'));
            if (consent && consent.analytics) {
                var gtmScript = document.createElement('script');
                gtmScript.async = true;
                gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=<?php echo GDPR_GTAG_GTM_ID; ?>';
                document.head.appendChild(gtmScript);

                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
            }
        </script>
        <?php
    }
}

function gdpr_include_ga_script() {
    if (GDPR_GTAG_GA_ID !== 'X' && GDPR_GTAG_GA_ID !== '') {
        ?>
        <script>
            var consent = JSON.parse(localStorage.getItem('cookieConsent'));
            if (consent && consent.analytics) {
                var gaScript = document.createElement('script');
                gaScript.async = true;
                gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=<?php echo GDPR_GTAG_GA_ID; ?>';
                document.head.appendChild(gaScript);

                gaScript.onload = function() {
                    window.dataLayer = window.dataLayer || [];
                    function gtag() { dataLayer.push(arguments); }
                    gtag('js', new Date());
                    gtag('config', '<?php echo GDPR_GTAG_GA_ID; ?>');
                };
            }
        </script>
        <?php
    }
}

function gdpr_include_umami_script() {
    if (GDPR_UMAMI_SITE_ID !== 'X' && GDPR_UMAMI_SITE_ID !== '' && GDPR_UMAMI_URI !== 'X' && GDPR_UMAMI_URI !== '') {
        ?>
        <script>
            var consent = JSON.parse(localStorage.getItem('cookieConsent'));
            if (consent && consent.analytics) {
                var umamiScript = document.createElement('script');
                umamiScript.async = true;
                umamiScript.src = '<?php echo GDPR_UMAMI_URI; ?>';
                umamiScript.setAttribute('data-website-id', '<?php echo GDPR_UMAMI_SITE_ID; ?>');
                document.head.appendChild(umamiScript);
            }
        </script>
        <?php
    }
}

function gdpr_inject_gtm_noscript() {
    if (GDPR_GTAG_GTM_ID !== 'X' && GDPR_GTAG_GTM_ID !== '') {
        $gtmID = GDPR_GTAG_GTM_ID;
        echo "<noscript><iframe src=\"https://www.googletagmanager.com/ns.html?id={$gtmID}\" height=\"0\" width=\"0\" style=\"display:none;visibility:hidden\"></iframe></noscript>";
    }
}
?>
