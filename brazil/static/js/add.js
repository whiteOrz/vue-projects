/**
 * Created by lxj on 2016/7/28.
 */
/**
 * Created by lxj on 2016/5/23.
 */
var myScroll,
    pullDownEl, pullDownOffset,
    pullUpEl, pullUpOffset,
    generatedCount = 0;


/**
 * 下拉刷新 （自定义实现此方法）
 * myScroll.refresh();		// 数据加载完成后，调用界面更新方法
 */
function pullDownAction () {
    /*setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
        var el, div, i;
        el = document.getElementById('thelist');

        for (i=0; i<3; i++) {
            div = document.createElement('div');
            div.className = "help_list";
            div.innerHTML = "<p class='help_xian'></p><div class='help_people'><img src='"+path+"images/icon.png'/></div><p class='help_txt'><span class='people_name'>SAM </span>向您求助<span class='safe_num'>1000</span>安全系数</p><img class='go_help' src='"+path+"images/go_help.png'/>";
            el.insertBefore(div, el.childNodes[0]);
        }

        myScroll.refresh();		//数据加载完成后，调用界面更新方法   Remember to refresh when contents are loaded (ie: on ajax completion)
    }, 1000);*/	// <-- Simulate network congestion, remove setTimeout from production!
}

/**
 * 滚动翻页 （自定义实现此方法）
 * myScroll.refresh();		// 数据加载完成后，调用界面更新方法
 */
function pullUpAction () {
    /*setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
        var el, div, i;
        el = document.getElementById('thelist');

        for (i=0; i<3; i++) {
            div = document.createElement('div');
            div.className = "help_list";
            div.innerHTML = "<p class='help_xian'></p><div class='help_people'><img src='"+path+"images/icon.png'/></div><p class='help_txt'><span class='people_name'>SAM </span>向您求助<span class='safe_num'>1000</span>安全系数</p><img class='go_help' src='"+path+"images/go_help.png'/>";
            el.appendChild(div, el.childNodes[0]);
        }

        myScroll.refresh();		// 数据加载完成后，调用界面更新方法 Remember to refresh when contents are loaded (ie: on ajax completion)
    }, 1000);*/	// <-- Simulate network congestion, remove setTimeout from production!
}

/**
 * 初始化iScroll控件
 */
function loaded() {
    //pullDownEl = document.getElementById('pullDown');
    //pullDownOffset = pullDownEl.offsetHeight;
    pullUpEl = document.getElementById('pullUp');
    pullUpOffset = pullUpEl.offsetHeight;

    myScroll = new iScroll('wrapper', {
        scrollbarClass: 'myScrollbar', /* 重要样式 */
        useTransition: false, /* 此属性不知用意，本人从true改为false */
        topOffset: pullDownOffset,
        onRefresh: function () {
            if (pullUpEl.className.match('loading')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
            }
        },
        onScrollMove: function () {
            if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
                pullUpEl.className = 'flip';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '松手开始更新...';
                this.maxScrollY = this.maxScrollY;
            } else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
                pullUpEl.className = '';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '上拉加载更多...';
                this.maxScrollY = pullUpOffset;
            }
        },
        onScrollEnd: function () {
            if (pullUpEl.className.match('flip')) {
                pullUpEl.className = 'loading';
                pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';
                pullUpAction();	// Execute custom function (ajax call?)
            }
        }
    });

    setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

//初始化绑定iScroll控件
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', loaded, false);

