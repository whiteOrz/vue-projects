(function(){
    // 微信菜单隐藏
    function hideBar(argument) {
        document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
            WeixinJSBridge.call('hideOptionMenu');
        });
        document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
            WeixinJSBridge.call('hideToolbar');
        });
    }
    // 禁用前进后退
    function banBack(argument) {
        history.pushState({}, document.title, window.location.href);
        window.onpopstate = function (e) {history.pushState({}, document.title, window.location.href);}
    }

    // 禁用非图片长按菜单
    function banTouchMeun(argument) {
        document.addEventListener('touchstart',function(e){
            console.log(e.target.tagName)
            if (String(e.target.tagName).toLowerCase()!='img') {
                e.preventDefault();
            }
        })
    }

    //通过手机屏幕dpr和手机宽度来确定font-size的值
    function autorun() {
        //初始值
        var default_font_size = 20;//默认字号
        var default_wh_4v3 = 1.33;//默认屏宽高比Number((4/3).toFixed(2))
        var default_wh_16v9 = 1.78;//默认屏宽高比16/9
        var default_wh_21v9 = 2.33;//默认屏宽高比21/9
        var default_font_Hscale = 0.0417;//默认缩放比iphone4横
        var default_font_Pscale = 0.0625;//默认缩放比iphone4竖
        //dpr倍数
        var dpr = window.devicePixelRatio;
        //浏览器宽
        var win_width = parseInt(window.innerWidth);
        //浏览器高
        var win_height = parseInt(window.innerHeight);
        //实际屏宽高比
        var win_wh = Number((win_width/win_height).toFixed(2));
        //是否横屏
        var isH = win_wh>1?true:false;
        //基础字号
        var fs = 12;
        //计算
        if (isH) {//手机或PC横屏
            if (win_wh>=default_wh_4v3) {
                console.log('手机或PC横屏A');
                fs = win_height*1.33*default_font_Hscale;
            } else {
                console.log('手机或PC横屏B');
                fs = win_width*default_font_Hscale;
            }
        } else {//手机或PC竖屏
            console.log('手机或PC竖屏');
            fs = win_width*default_font_Pscale;
        }
        //修改基础大小
        if(document.querySelector){
            document.querySelector('html').style.fontSize =  fs + 'px';
        }else{
            for(var i=0;i<document.childNodes.length;i++){
                var ele = document.childNodes[i];
                if(String(ele.tagName).toLowerCase()=='html'){
                    ele.style.fontSize =  fs + 'px';
                }
            }
        }
        window.onresize = function(){autorun();};
    }
    autorun();
    // banBack();
    // banTouchMeun();
    // hideBar();
})();
