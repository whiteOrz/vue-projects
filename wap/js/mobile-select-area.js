(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['$', 'dialog'], factory);
    } else if (typeof exports === 'object') { //umd
        module.exports = factory();
    } else {
        root.MobileSelectArea = factory(window.Zepto || window.jQuery || $);
    }
})(this, function($, Dialog) {
    var MobileSelectArea = function() {
        var rnd = Math.random().toString().replace('.', '');
        this.id = 'scroller_' + rnd;
        this.scroller;
        this.data = {};
        this.index = 0;
        this.value = [0, 0, 0];
        this.oldvalue;
        this.text = ['', '', ''];
        this.level = 3;
        this.mtop = 30;
        this.separator = ' ';
    };

    MobileSelectArea.prototype = {
        init: function(settings) {
            this.settings = jQuery.extend({}, settings);
            this.trigger = jQuery(this.settings.trigger);
            this.level = this.settings.level ? parseInt(this.settings.level) : 3;
            this.trigger.attr("readonly", "readonly");
            this.value = (this.settings.value) || [0, 0, 0];
            this.text = this.settings.text || this.trigger.val().split(' ') || ['', '', ''];
            this.oldvalue = this.value.concat([]);
            this.clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
            this.clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
            this.data = this.settings.data;
            this.bindEvent();
        },
        bindEvent: function() {
            var _this = this;
            this.trigger.click(function(e) {
                $(this).blur();

                var dlgContent = '';
                for (var i = 0; i < _this.level; i++) {
                    dlgContent += '<div></div>';
                }

                $.confirm('<div class="ui-scroller-mask"><div id="' + _this.id + '" class="ui-scroller">' + dlgContent + '<p></p></div></div>', null, function(t, c) {
                    if (t == "yes") {
                        _this.submit()
                        $("body").css("overflow", "auto");
                    }
                    if (t == 'no') {
                        _this.cancel();
                        $("body").css("overflow", "auto");
                    }
                    this.dispose();
                }, {
                    clientHeight: _this.clientHeight,
                    clientWidth: _this.clientWidth
                });

                $(".ui-scroller>div").css("width", 100 / _this.level + "%");

                _this.scroller = $('#' + _this.id);
                _this.format(); //第一次显示

                var start = 0,
                    end = 0;
                _this.scroller.children().bind('touchstart', function(e) {
                    var ev = e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0] : e;
                    start = ev.pageY;
                });

                _this.scroller.children().bind('touchmove', function(e) {
                    var ev = e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0] : e;
                    end = ev.pageY;
                    var diff = end - start;
                    var dl = $(e.target).parent();
                    if (dl[0].nodeName != "DL") {
                        return;
                    }
                    var top = parseInt(dl.css('top') || 0) + diff;
                    dl.css('top', top);
                    start = end;
                    return false;
                });

                _this.scroller.children().bind('touchend', function(e) {
                    var ev = e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0] : e;
                    end = ev.pageY;
                    var diff = end - start;
                    var dl = $(e.target).parent();
                    if (dl[0].nodeName != "DL") {
                        return;
                    }
                    //根据高度算当前的位置
                    var i = $(dl.parent()).index();
                    var top = parseInt(dl.css('top') || 0) + diff;
                    if (top > _this.mtop) {
                        top = _this.mtop;
                    }
                    if (top < -$(dl).height() + 60) {
                        top = -$(dl).height() + 60;
                    }
                    var mod = top / _this.mtop;
                    var mode = Math.round(mod);
                    var index = Math.abs(mode) + 1;
                    if (mode == 1) {
                        index = 0;
                    }

                    //当前位置的区域代码
                    _this.value[i] = $(dl.children().get(index)).attr('code');
                    _this.value[i] == 0 ? _this.text[i] = "" : _this.text[i] = $(dl.children().get(index)).html();

                    //如果是新的地区，重置下一级别区域
                    for (var j = _this.level - 1; j > i; j--) {
                        _this.value[j] = 0;
                        _this.text[j] = "";
                    }

                    //格式化显示当前所选择的所有地区
                    if (!$(dl.children().get(index)).hasClass('focus')) {
                        _this.format();
                    }

                    $(dl.children().get(index)).addClass('focus').siblings().removeClass('focus');
                    dl.css('top', mode * _this.mtop);

                    return false;
                });

                return false;
            });
        },
        format: function() {
            if (this.index > this.level - 1) {
                this.index = 0;
                return;
            }

            var level = this.index++;
            var pCode = "001";
            var cityData = null;
            if (level == 0) {
                pCode = this.value[level];
                cityData = this.data.province;
            } else {
                pCode = this.value[level - 1];
                cityData = getCityData(this.data.city["C" + pCode]);
            }

            if (cityData) {
                var code = this.value[level];
                if (code == "0") {
                    for (var key in cityData) {
                        code = cityData[key];
                        break;
                    }
                    this.value[level] = code;
                }
                this.f(level, cityData, code);
                this.format();
            }
        },
        f: function(level, datas, keyCode) {
            var str = "<dl>";
            var top = 0;
            var name = "";
            var index = 0;
            for (var key in datas) {
                var cls = "";
                if (datas[key] == keyCode) {
                    cls = "focus";
                    top = this.mtop * (1 - index);
                    name = key;
                }
                index++;
                str += '<dd class="' + cls + '" code="' + datas[key] + '">' + key + '</dd>';
            }

            str += "</dl>";
            var newdom = $(str);
            newdom.css('top', top);
            this.text[level] = name;

            this.scroller.children().eq(level).html(newdom);
        },
        submit: function() {
            this.oldvalue = this.value.concat([]);
            if (this.trigger[0].nodeType == 1) {
                this.trigger.val(this.text.join(this.separator));
                this.trigger.attr('areacode', this.value.join(','));
                this.trigger.attr('value', this.value.join(','));
            }
            this.settings.callback && this.settings.callback(this.scroller);
            this.index = 0;
            unlockBody();
        },
        cancel: function() {
            this.value = this.oldvalue.concat([]);
        }
    };

    function getCityData(input) {
        var cityData = {};
        for (var key in input) {
            cityData[input[key]] = key;
        }

        return cityData;
    }
    return MobileSelectArea;
});
