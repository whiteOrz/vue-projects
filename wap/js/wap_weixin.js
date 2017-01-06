var sever_url = "http://" + location.host;
var isProduct = false;
if (sever_url.indexOf("http://m.tk.cn") > -1) {
    isProduct = true;
} else if (sever_url.indexOf("http://m.taikang.com") > -1) {
    isProduct = true;
}

if (isWeixin() && isProduct) {
    if (location.href.indexOf("openid") == -1) {
        replaceOauth();
        // var productId = getProductId();
        // if (productId == "S2016011601") {
        //     if (mtkcn) {
        //         //http://m.tk.cn/product/wap/S2016011601.html
        //         location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcd7143c00e5bb6f7&redirect_uri=http://wxpt.taikang.com/tkmap/wechat/oauth2/safeRedirect/wxcd7143c00e5bb6f7?other=aHR0cDovL20udGsuY24vcHJvZHVjdC93YXAvUzIwMTYwMTE2MDEuaHRtbA&response_type=code&scope=snsapi_base&state=tkonline#wechat_redirect');
        //     } else {
        //         //http://m.taikang.com/product/wap/S2016011601.html
        //         location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcd7143c00e5bb6f7&redirect_uri=http://wxpt.taikang.com/tkmap/wechat/oauth2/safeRedirect/wxcd7143c00e5bb6f7?other=aHR0cDovL20udGFpa2FuZy5jb20vcHJvZHVjdC93YXAvUzIwMTYwMTE2MDEuaHRtbA&response_type=code&scope=snsapi_base&state=tkonline#wechat_redirect');
        //     }
        //
        // } else if (productId == "S20160114") {
        //     if (mtkcn) {
        //         //http://m.tk.cn/product/wap/S20160114.html
        //         location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcd7143c00e5bb6f7&redirect_uri=http://wxpt.taikang.com/tkmap/wechat/oauth2/safeRedirect/wxcd7143c00e5bb6f7?other=aHR0cDovL20udGsuY24vcHJvZHVjdC93YXAvUzIwMTYwMTE0Lmh0bWw&response_type=code&scope=snsapi_base&state=tkonline#wechat_redirect");
        //     } else {
        //         //http://m.taikang.com/product/wap/S20160114.html
        //         location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcd7143c00e5bb6f7&redirect_uri=http://wxpt.taikang.com/tkmap/wechat/oauth2/safeRedirect/wxcd7143c00e5bb6f7?other=aHR0cDovL20udGFpa2FuZy5jb20vcHJvZHVjdC93YXAvUzIwMTYwMTE0Lmh0bWw&response_type=code&scope=snsapi_base&state=tkonline#wechat_redirect");
        //     }
        //
        // } else if (productId == "S20160123") {
        //     if (mtkcn) {
        //         //http://m.tk.cn/product/wap/S20160123.html
        //         location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcd7143c00e5bb6f7&redirect_uri=http://wxpt.taikang.com/tkmap/wechat/oauth2/safeRedirect/wxcd7143c00e5bb6f7?other=aHR0cDovL20udGsuY24vcHJvZHVjdC93YXAvUzIwMTYwMTIzLmh0bWw&response_type=code&scope=snsapi_base&state=tkonline#wechat_redirect");
        //     } else {
        //         //http://m.taikang.com/product/wap/S20160123.html
        //         location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcd7143c00e5bb6f7&redirect_uri=http://wxpt.taikang.com/tkmap/wechat/oauth2/safeRedirect/wxcd7143c00e5bb6f7?other=aHR0cDovL20udGFpa2FuZy5jb20vcHJvZHVjdC93YXAvUzIwMTYwMTIzLmh0bWw&response_type=code&scope=snsapi_base&state=tkonline#wechat_redirect");
        //     }
        // } else if (productId == "S20160113") {
        //     if (mtkcn) {
        //         //http://m.tk.cn/product/wap/S20160113.html
        //         location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcd7143c00e5bb6f7&redirect_uri=http://wxpt.taikang.com/tkmap/wechat/oauth2/safeRedirect/wxcd7143c00e5bb6f7?other=aHR0cDovL20udGsuY24vcHJvZHVjdC93YXAvUzIwMTYwMTEzLmh0bWw&response_type=code&scope=snsapi_base&state=tkonline#wechat_redirect");
        //     } else {
        //         //http://m.taikang.com/product/wap/S20160113.html
        //         location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcd7143c00e5bb6f7&redirect_uri=http://wxpt.taikang.com/tkmap/wechat/oauth2/safeRedirect/wxcd7143c00e5bb6f7?other=aHR0cDovL20udGFpa2FuZy5jb20vcHJvZHVjdC93YXAvUzIwMTYwMTEzLmh0bWw&response_type=code&scope=snsapi_base&state=tkonline#wechat_redirect");
        //     }
        // } else if (productId == "S20160124") {
        //     if (mtkcn) {
        //         //http://m.tk.cn/product/wap/S20160124.html
        //         location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcd7143c00e5bb6f7&redirect_uri=http://wxpt.taikang.com/tkmap/wechat/oauth2/safeRedirect/wxcd7143c00e5bb6f7?other=aHR0cDovL20udGsuY24vcHJvZHVjdC93YXAvUzIwMTYwMTI0Lmh0bWw&response_type=code&scope=snsapi_base&state=tkonline#wechat_redirect");
        //     } else {
        //         //http://m.taikang.com/product/wap/S20160124.html
        //         location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcd7143c00e5bb6f7&redirect_uri=http://wxpt.taikang.com/tkmap/wechat/oauth2/safeRedirect/wxcd7143c00e5bb6f7?other=aHR0cDovL20udGFpa2FuZy5jb20vcHJvZHVjdC93YXAvUzIwMTYwMTI0Lmh0bWw&response_type=code&scope=snsapi_base&state=tkonline#wechat_redirect");
        //     }
        // } else if (productId == "S20160158") {
        //     //http://m.tk.cn/product/wap/S20160158.html
        //     location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcd7143c00e5bb6f7&redirect_uri=http://wxpt.taikang.com/tkmap/wechat/oauth2/safeRedirect/wxcd7143c00e5bb6f7?other=aHR0cDovL20udGsuY24vcHJvZHVjdC93YXAvUzIwMTYwMTU4Lmh0bWw&response_type=code&scope=snsapi_base&state=tkonline#wechat_redirect");
        // } else if (productId == "S20160159") {
        //     //http://m.tk.cn/product/wap/S20160159.html
        //     location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxcd7143c00e5bb6f7&redirect_uri=http://wxpt.taikang.com/tkmap/wechat/oauth2/safeRedirect/wxcd7143c00e5bb6f7?other=aHR0cDovL20udGsuY24vcHJvZHVjdC93YXAvUzIwMTYwMTU5Lmh0bWw&response_type=code&scope=snsapi_base&state=tkonline#wechat_redirect");
        // }
    } else {
        var openId = getQueryString("openid");
        setLocVal("openId", openId);
        loadjsfile("http://res.wx.qq.com/open/js/jweixin-1.0.0.js");
    }
}

function replaceOauth() {
    var url = sever_url + "/hera_insure/api/wechat/v2/shareUrl";
    $.ajax({
        url: url,
        type: "post",
        data:JSON.stringify({"url": location.href}),
        dataType: 'json'
    }).done(function(data) {
        if (data.code == "0") {
            location.replace(data.data.oauthUrl);
        }
    });
}

function getShareOptions() {
    var share = {};

    var title = $(".shareTitle").text();
    if (title == "") {
        title = "泰康在线-" + $(".productName span").text();
    }

    var desc = $(".shareDesc").text();
    if (desc == "") {
        desc = $(".productDescription").text();
    }

    var img = $(".shareImg").text();
    if (img == "") {
        img = $(".wapBanner img").attr("src");
    } else {
        img = sever_url + img;
    }

    return {
        title: title,
        desc: desc,
        img: img
    };
}

function wx_share(share) {
    var fTitle = share.title; //分享标题
    var fDesc = share.desc; //分享描述
    var fImgurl = share.img; //分享给朋友图片链接
    var fcImgurl = share.img; //分享到朋友圈图片链接
    var pageUrl = location.href.split('#')[0];
    var productId = getProductId();
    var seedId = getQueryString("seedId");
    var seedType = getQueryString("seedType");
    var fLink = sever_url + '/product/wap/' + productId + '.html?1=1';
    if(seedId){
        fLink+="&seedId=" + seedId;
    }
    
    if(seedType){
        fLink+="&seedType=" + seedType;   
    }

    setTimeout(function() {
        z_weixinshare(pageUrl, fTitle, fDesc, fLink, fImgurl, fcImgurl);
    }, 500);
}

function loadjsfile(filename) {
    var jsfile = document.createElement('script');
    jsfile.setAttribute("type", "text/javascript");
    jsfile.setAttribute("src", filename);
    document.getElementsByTagName("head")[0].appendChild(jsfile);
    jsfile.onload = function() {
        var share = getShareOptions();
        wx_share(share);
    }
}

function isWeixin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    }
    return false;
}

function z_weixinshare(pageUrl, fTitle, fDesc, fLink, fImgurl, fcImgurl) {
    var url = sever_url + '/tkmobile/weixinshare/WechatCircleOfFriends?url=' + encodeURIComponent(location.href.split('#')[0]);
    $.ajax({
        url: url,
        type: 'get',
        dataType: 'json'
    }).done(function(data) {
        if (data != null) {
            var Vtimestamp = data.timestamp;
            var VnonceStr = data.noncestr;
            var Vsignature = data.signature;
            InitWeiXin(Vtimestamp, VnonceStr, Vsignature);
            wx.ready(function() {
                toShareFriend(fTitle, fDesc, fLink, fImgurl); //分享给朋友
                toShareShareTimeline(fTitle, fLink, fcImgurl); //分享到朋友圈
            });
        }
    });
}

function toShareFriend(fTitle, fDesc, fLink, fImgurl) { //分享给朋友
    wx.onMenuShareAppMessage({
        title: fTitle, // 分享标题
        desc: fDesc, // 分享描述
        link: fLink, // 分享链接
        imgUrl: fImgurl, // 分享图标,
        success: function() { // 用户确认分享后执行的回调函数

        },
        cancel: function() { // 用户取消分享后执行的回调函数

        }
    });
}

function toShareShareTimeline(fTitle, fLink, fcImgurl) { //分享到朋友圈
    wx.onMenuShareTimeline({
        title: fTitle, // 分享标题
        link: fLink, // 分享链接
        imgUrl: fcImgurl, // 分享图标
        success: function() { // 用户确认分享后执行的回调函数

        },
        cancel: function() {

        }
    });
}

function InitWeiXin(Vtimestamp, VnonceStr, Vsignature) {
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wxcd7143c00e5bb6f7', // 必填，公众号的唯一标识
        timestamp: Vtimestamp * 1, // 必填，生成签名的时间戳
        nonceStr: VnonceStr, // 必填，生成签名的随机串
        signature: Vsignature, // 必填，签名，见附录1
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'hideOptionMenu', 'showOptionMenu'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return "";
}
