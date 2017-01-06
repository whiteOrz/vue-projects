var appType = "webSite";
var appId = "webSite_insure_flow";
var hasTKTracker = false;

function TKTrack(options) {
    try {
        if (hasTKTracker) {
            TKTracker.send(options);
        } else {
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'http://mall.tk.cn/track/tk-track-min.js?' + Math.random(); // 加入随机数防止被缓存
            script.id = 'tk-tracker';
            script.appType = appType;
            script.appId = appId;
            script.onload = script.onreadystatechange = function() {
                if (script.readyState && script.readyState != 'loaded' && script.readyState != 'complete') {
                    return;
                }

                script.onreadystatechange = script.onload = null
                TKTracker.send(options);
                hasTKTracker = true;
            }
            document.body.appendChild(script);
        }
    } catch (e) {

    }
}
