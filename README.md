# GDPR / Cookie Consent Banner for WordPress

#### Features
- Built in analytics scripts, simply add your tracking ID
  - Google Tag Manager
  - Google Analytics 4
  - Umami Analytics
- Handles Google Consent Status based on what the User accepts
- Expandable and upgradable, use built in logic in the main file and `lib/gdpr-analytics-scripts.php`
- Built to be able to handle functional and other third party scripts as well


#### Usage

The plugin itself is simple in it's operation. There are predefined scripts for:
- Google Analytics 4
- Google Tag Manager
- Umami Analytics

How do you set it up?

Simple! We've made sure to keep it as easy as possible, to add your Analytics source simply edit the main plugin file and add your ID. For example, if you only have Google Analytics 4 you add it like this: `define('GDPR_GTAG_GA_ID', 'GA-YOURCODE');`. Any of the ID definitions where the data is "X" or simply empty, will not be loaded by the plugin.

- To edit the banner itself is done in `lib/banner.php` with HTML.
- To edit the 'Preferences' is done in `lib/js/gdpr-script.js` under `openPreferencesPopup`. It's HTML printed by JS, so use HTML or modify by your needs.
- Styles and colors can be changed in the CSS: `lib/css/banner.css`.

#### How is it compatible with various laws?

We aim for it to be compatible with EU-GDPR/UK-GDPR. This will automatically make it compatible with most others, but make sure to update your policies. If your locale has certain differences to it's Privacy Laws, such as CCPA, note that other implementations will most likely suit you better as the scope is different. We suggest reviewing the scope and laws of the area you/your company is in but also the ones it deliver to.

##### That's great but how does it do it?

In simple terms, the plugin adds a local storage item to the user's browser. This determines whether the banner is shown or hidden. This local storage item also has a few other values;
- Analytics
- Functional
- Third Party

Functional is always enabled, even when declined. You may either change this, or update your policies to reflect it as it is in essence required anyway when using WordPress. In itself, it doesn't do anything - but you may add scripts that respond to it, if wished. It is simply to inform the user in some ways.

Analytics and Third Party on the other hand can be declined or user selected.

The Plugin will read for the status of these, and if you wish to add third party scripts, such as ads or a store, you may do so easily.
