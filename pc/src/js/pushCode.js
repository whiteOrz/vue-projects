var UID = $.cookie( 'tkmid' );
var UserType = $.cookie( 'UserType' );
var _smq = _smq || [];
_smq.push(['_setAccount', '59e39c0', new Date()]);
_smq.push(['_setDomainName', 'tk.cn']);
_smq.push(['_setCustomVar', 1, UID, 1]);
_smq.push(['_setCustomVar', 2, UserType, 1]);
_smq.push(['pageview']);

(function() {
	var sm = document.createElement('script'); sm.type = 'text/javascript'; sm.async = true;
	sm.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdnmaster.com/sitemaster/collect.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(sm, s);
})();