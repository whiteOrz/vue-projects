// JavaScript Document
var product = {};
product.server_url = "http://" + location.host;
product.proUrl = product.server_url + "/hera_insure/api/insure/v2/";
product.memberUrl = product.server_url + "/tkmobile/service/"
product.certiType = {
    "居民身份证": "01",
    "护照": "02",
    "军人证": "03",
    "驾驶证": "04",
    "港澳台同": "05",
    "中国护照": "07",
    "其他": "99",
    "出生日期": "10"
};
product.insRelation = {
    "本人": "01"
};
product.beneRelation = {
    "本人": "01"
};
product.benePerson = {
    "本人": "01"
};
product.showDl = function(obj) {
    obj.addEventListener('click', function() {
        this.parentNode.classList.toggle('active');
    }, false);
}
product.tab = function(tab, tabFlag) {
    var oTab = document.querySelector('.' + tab),
        aTabTit = oTab.querySelectorAll('.tab-tit li'),
        aTabCon = oTab.querySelectorAll('.tab-con>article'),
        n = 0,
        show = function(n) {
            aTabTit[n].classList.add('active');
            aTabCon[n].style.display = 'block';
        },
        bindTab = function() {
            for (var i = 0; i < aTabTit.length; i++) {
                aTabTit[i].classList.remove('active');
                aTabCon[i].style.display = 'none';
            }
            show(this.index);
        };
    show(n);
    for (var i = 0; i < aTabTit.length; i++) {
        aTabTit[i].index = i;
        var $tab = $(aTabTit[i]);
        if (tabFlag) {
            $tab.on('click', bindTab);
        } else {
            $tab.off();
        }
    }
}

product.notice = function() {
    var aLi = document.querySelectorAll('.notice li'),
        btnMore = document.querySelector('.btnmore'),
        onOff = true,
        init = function() {
            for (var i = 0; i < aLi.length; i++) {
                if (i > 2) aLi[i].style.display = "none";
            }
        };
    init();
    btnMore.addEventListener('click', function() {
        if (onOff) {
            for (var i = 0; i < aLi.length; i++) {
                aLi[i].style.display = "-webkit-box";
            }
            this.classList.add('cur');
            this.innerHTML = '收起<span class="icon-arr"></span>';
        } else {
            init();
            this.classList.remove('cur');
            this.innerHTML = '点击查看更多<span class="icon-arr"></span>';
        }
        onOff = !onOff;
    }, false);
}
product.alertFn = function(boxClass) {
    var oRulebox = document.querySelector('.' + boxClass);
    var oMark = document.querySelector('#mask');
    var oBtnin = document.querySelectorAll('.list-dialog dt');
    var oClose = oRulebox.querySelector('.cancel');
    var oTxt = oRulebox.querySelector('p');
    for (var i = 0; i < oBtnin.length; i++) {
        oBtnin[i].addEventListener('click', alertBoxShow, false);
    }
    oClose.addEventListener('click', alertBoxHide, false);

    function alertBoxShow() {
        oTxt.innerHTML = this.dataset.dialog;
        oRulebox.classList.add('moveDown');
        oMark.style.height = document.body.scrollHeight + 'px';
        oMark.style.display = 'block';
        document.body.style.overflowY = 'hidden';
    }

    function alertBoxHide() {
        oRulebox.classList.remove('moveDown');
        oMark.style.display = 'none';
        document.body.style.overflowY = 'auto';
    }
}
product.audio = function() {
    var oAudio = document.querySelector('.audio audio');
    var oBtn = document.querySelector('.audio span');
    var onOff = true;
    oBtn.addEventListener('click', function() {
        if (onOff) {
            this.classList.add('animate');
            oAudio.play();
        } else {
            this.classList.remove('animate');
            oAudio.pause();
        }
        onOff = !onOff;
    }, false);
    oAudio.addEventListener('ended', function() {
        oBtn.classList.remove('animate');
    }, false);
}
product.health = function() {
    var oBtn = document.querySelector('.btn1'),
        oRulebox = document.querySelector('.dialogbox1'),
        oMark = document.querySelector('#mask');
    oBtn.addEventListener('click', function() {
        oRulebox.style.display = 'block';
        oMark.style.height = document.body.scrollHeight + 'px';
        oMark.style.display = 'block';
        document.body.style.overflowY = 'hidden';
        setTimeout(function() {
            window.location.href = 'pay.html';
        }, 1000)
    }, false);
}

export {
    product
}
