// GTM Consent Module
(function() {
    function setGtagConsent() {
        var gtagGaID = gdprData.gtagGaID;
        var gtagGtmID = gdprData.gtagGtmID;

        if (!gtagGaID && !gtagGtmID) return;

        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }

        // Set default consent to 'denied'
        gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied'
        });

        function updateConsentBasedOnLocalStorage() {
            var consent = JSON.parse(localStorage.getItem('cookieConsent'));
            if (consent && consent.status === 'accepted') {
                gtag('consent', 'update', {
                    'ad_storage': consent.thirdParty ? 'granted' : 'denied',
                    'ad_user_data': consent.thirdParty ? 'granted' : 'denied',
                    'ad_personalization': consent.thirdParty ? 'granted' : 'denied',
                    'analytics_storage': consent.analytics ? 'granted' : 'denied'
                });
            }
        }

        document.addEventListener('cookieConsentUpdate', updateConsentBasedOnLocalStorage);
    }

    document.addEventListener('DOMContentLoaded', setGtagConsent);
})();
