jQuery(document).ready(function($) {
    function getConsent() {
        return JSON.parse(localStorage.getItem('cookieConsent')) || {};
    }

    function setConsent(consentObject) {
        localStorage.setItem('cookieConsent', JSON.stringify(consentObject));
    }

    function clearConsent() {
        localStorage.removeItem('cookieConsent');
        document.dispatchEvent(new Event('cookieConsentUpdate'));
        location.reload();
    }

    function isConsentValid() {
        const consent = getConsent();
        const currentTime = new Date();
        return consent.status && new Date(consent.expiry) > currentTime;
    }

    var isConsentGiven = isConsentValid();

    function updateConsent(status, analytics, thirdParty, days) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + days);
        const consentObject = {
            status: status,
            functional: true,
            analytics: analytics,
            thirdParty: thirdParty,
            expiry: expiryDate.toISOString()
        };
        setConsent(consentObject);
        document.querySelector('.gdpr-cookie-consent').style.display = 'none';
        document.dispatchEvent(new Event('cookieConsentUpdate'));
        location.reload();
    }

    function fetchBannerViaAjax() {
        if (!isConsentGiven) {
            $.post(gdprData.ajaxurl, { 'action': 'fetch_gdpr_banner' }, function(response) {
                if (response.success) {
                    $('#gdpr-banner-placeholder').html(response.data);
                    bindAcceptDismissEvents();
                } else {
                    console.error('Failed to fetch GDPR banner:', response);
                }
            }).fail(function(xhr, status, error) {
                console.error('AJAX error:', status, error);
            });
        } else {
            $('#gdpr-banner-placeholder').hide();
        }
    }

    function bindAcceptDismissEvents() {
        var acceptButton = document.querySelector('.accept-cookies');
        var dismissButton = document.querySelector('.dismiss-cookies');
        var preferencesButton = document.querySelector('.preferences-cookies');

        acceptButton.addEventListener('click', function() {
            updateConsent('accepted', true, true, 180);
        });

        dismissButton.addEventListener('click', function() {
            updateConsent('declined', false, false, 5);
        });

        preferencesButton.addEventListener('click', openPreferencesPopup);
    }

    function openPreferencesPopup() {
        var consent = getConsent();
        $('body').append(`
            <div class="gdpr-preferences-popup">
                <div class="preferences-text">
                    <p style="margin-bottom: 0em; font-size: 2rem;">Change your cookie preferences:</p><br />
                    <p style="font-size: 1.3rem;">
                        This website requires the use of functional cookies, these are essential to how the website operates and will not display correctly without it.<br />
                        For more information please see our <a href="/terms">Terms and Conditions</a> and <a href="/privacy-policy">Privacy Policy</a>
                    </p>
                </div>
                <div class="gdpr-preferences-cont">
                    <label class="gdpr-preferences-check gdpr-preferences-checkbox">
                        Functional
                        <input type="checkbox" disabled="disabled" checked="checked" id="functional" />
                        <div class="gdpr-preferences-check_indicator"></div>
                    </label>
                    <label class="gdpr-preferences-check gdpr-preferences-checkbox">
                        Analytics
                        <input type="checkbox" id="analytics" ${consent.analytics ? 'checked' : ''} />
                        <div class="gdpr-preferences-check_indicator"></div>
                    </label>
                    <label class="gdpr-preferences-check gdpr-preferences-checkbox">
                        Third Party
                        <input type="checkbox" id="thirdparty" ${consent.thirdParty ? 'checked' : ''} />
                        <div class="gdpr-preferences-check_indicator"></div>
                    </label>
                </div>
                <button type="button" class="save-preferences">Save Preferences</button>
                <button type="button" class="close-preferences">Close</button>
            </div>
        `);
        bindPreferencesSaveEvent();
        bindPreferencesCloseEvent();
    }

    function bindPreferencesSaveEvent() {
        $('.save-preferences').on('click', function() {
            const analytics = $('#analytics').is(':checked');
            const thirdParty = $('#thirdparty').is(':checked');
            updateConsent('accepted', analytics, thirdParty, 180);
            $('.gdpr-preferences-popup').remove();
        });
    }

    function bindPreferencesCloseEvent() {
        $('.close-preferences').on('click', function() {
            $('.gdpr-preferences-popup').remove();
        });
    }

    function removeScriptsIfNoConsent() {
        const consent = getConsent();
        if (!consent.analytics) {
            document.querySelectorAll('script').forEach(script => {
                if (/gtm\.js\?id=GTM-/.test(script.innerHTML)) {
                    script.remove();
                }
            });
            document.querySelectorAll('noscript').forEach(noscript => {
                if (/googletagmanager\.com\/ns\.html\?id=GTM-/.test(noscript.innerHTML)) {
                    noscript.remove();
                }
            });
            document.querySelectorAll('script[src*="googletagmanager.com/gtag/js?id="]').forEach(script => {
                script.remove();
            });
            document.querySelectorAll('script[src*="' + gdprData.umamiURI + '/script.js?website-id="]').forEach(script => {
                script.remove();
            });
        }
    }

    document.addEventListener('cookieConsentUpdate', removeScriptsIfNoConsent);
    removeScriptsIfNoConsent();

    fetchBannerViaAjax();
});
