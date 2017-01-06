/**
 *
 * @constructor EmailAutoComplete
 * @ options {object}
 */

function EmailAutoComplete(options) {

    this.config = {
        targetCls: '.inputElem', //
        parentCls: '.parentCls', //
        hiddenCls: '.hiddenCls', // 
        searchForm: '.jqtransformdone', //
        hoverBg: 'hoverBg', // 
        inputValColor: 'red', // 
        //mailArr        : ["@qq.com","@qq2.com","@gmail.com","@126.com","@163.com","@hotmail.com","@yahoo.com","@yahoo.com.cn","@live.com","@sohu.com","@sina.com","@yeah.net","@tom.com","@21cn.com","@139.com","@189.cn"], //
        mailArr: ["@qq.com", "@163.com", "@126.com", "@sina.com", "@hotmail.com", "@gmail.com", "@sohu.com", "@139.com", "@189.cn"],
        isSelectHide: true,
        callback: null
    };
    this.cache = {
        onlyFlag: true, // ֻ
        currentIndex: -1,
        oldIndex: -1
    };

    this.init(options);
}

export default EmailAutoComplete.prototype = {

    constructor: EmailAutoComplete,

    init: function(options) {
        this.config = jQuery.extend(this.config, options || {});

        var self = this,
            _config = self.config,
            _cache = self.cache;

        jQuery(_config.targetCls).each(function(index, item) {

            jQuery(item).keyup(function(e) {
                var target = e.target,
                    targetVal = jQuery.trim(jQuery(this).val()),
                    keycode = e.keyCode,
                    //elemHeight = jQuery(this).outerHeight(),
                    elemHeight = jQuery(this).closest(_config.parentCls).outerHeight(),
                    elemWidth = jQuery(this).outerWidth(),
                    elemLeft = jQuery(this).closest(_config.parentCls).outerWidth() - elemWidth,
                    parentNode = jQuery(this).closest(_config.parentCls);

                jQuery(parentNode).css({ 'position': 'relative' });
                // 
                if (targetVal == '') {
                    jQuery(item).attr({ 'data-html': '' });
                    // 
                    jQuery(_config.hiddenCls, parentNode).val('');

                    _cache.currentIndex = -1;
                    _cache.oldIndex = -1;
                    jQuery(".auto-tip", parentNode) && !jQuery(".auto-tip", parentNode).hasClass('hidden') && jQuery(".auto-tip", parentNode).addClass('hidden');
                    self._removeBg(parentNode);
                } else {

                    jQuery(item).attr({ 'data-html': targetVal });

                    // 
                    jQuery(_config.hiddenCls, parentNode).val(targetVal);

                    jQuery(".auto-tip", parentNode) && jQuery(".auto-tip", parentNode).hasClass('hidden') && jQuery(".auto-tip", parentNode).removeClass('hidden');
                    // 
                    self._renderHTML({ keycode: keycode, e: e, target: target, targetVal: targetVal, height: elemHeight, width: elemWidth, parentNode: parentNode, left: elemLeft });
                }


            });
        });

        //
        jQuery(_config.searchForm).each(function(index, item) {
            jQuery(item).keydown(function(e) {
                var keyCode = e.keyCode;
                if (keyCode == 13) {
                    return false;
                }
            });
        });

        // 
        jQuery(document).click(function(e) {
            e.stopPropagation();
            var target = e.target,
                tagCls = _config.targetCls.replace(/^\./, '');

            if (!jQuery(target).hasClass(tagCls)) {
                jQuery('.auto-tip') && jQuery('.auto-tip').each(function(index, item) {
                    !jQuery(item).hasClass('hidden') && jQuery(item).addClass('hidden');
                });
            }
        });
    },
    /*
     * 
     * @param cfg{object}
     */
    _renderHTML: function(cfg) {
        var self = this,
            _config = self.config,
            _cache = self.cache,
            curVal;
        var curIndex = self._keyCode(cfg.keycode);

        jQuery('.auto-tip', cfg.parentNode).hasClass('hidden') && jQuery('.auto-tip', cfg.parentNode).removeClass('hidden');
        if (curIndex > -1) {
            // 
            self._keyUpAndDown(cfg.targetVal, cfg.e, cfg.parentNode);
        } else {
            if (/@/.test(cfg.targetVal)) {
                curVal = cfg.targetVal.replace(/@.*/, '');
            } else {
                curVal = cfg.targetVal;
            }
            if (_cache.onlyFlag) {
                jQuery(cfg.parentNode).append('<input type="hidden" class="hiddenCls"/>');
                var wrap = '<ul class="auto-tip" id="autoEmail">';

                for (var i = 0; i < _config.mailArr.length; i++) {

                    wrap += '<li class="p-index' + i + '">' + '<span class="output-num"></span><span class="em" data-html="' + _config.mailArr[i] + '">' + _config.mailArr[i] + '</span></li>';
                }
                wrap += '</ul>';
                _cache.onlyFlag = false;
                jQuery(cfg.parentNode).append(wrap);
                jQuery('.auto-tip', cfg.parentNode).css({
                    'position': 'absolute',
                    'top': cfg.height,
                    'width': cfg.width + 'px',
                    'left': cfg.left,
                    'border': '2px solid ##e3e3e3',
                    'z-index': 10000,
                    'background': '#fff'
                });
            }

            // 
            jQuery('.auto-tip li', cfg.parentNode).each(function(index, item) {
                jQuery('.output-num', item).html(curVal);
                !jQuery('.output-num', item).hasClass(_config.inputValColor) &&
                    jQuery('.output-num', item).addClass(_config.inputValColor);
                var emVal = jQuery.trim(jQuery('.em', item).attr('data-html'));
                jQuery(item).attr({ 'data-html': curVal + '' + emVal });
            });

            // 
            self._accurateMate({ target: cfg.target, parentNode: cfg.parentNode });

            // 
            self._itemHover(cfg.parentNode);

            // 
            self._executeClick(cfg.parentNode);
        }

    },
    /**
     *
     */
    _accurateMate: function(cfg) {
        var self = this,
            _config = self.config,
            _cache = self.cache;

        var curVal = jQuery.trim(jQuery(cfg.target, cfg.parentNode).attr('data-html')),
            newArrs = [];
        if (/@/.test(curVal)) {

            // 
            var prefix = curVal.replace(/@.*/, ""),
                suffix = curVal.replace(/.*@/, "");

            jQuery.map(_config.mailArr, function(n) {
                var reg = new RegExp(suffix);
                if (reg.test(n)) {
                    newArrs.push(n);
                }
            });
            if (newArrs.length > 0) {
                jQuery('.auto-tip', cfg.parentNode).html('');
                jQuery(".auto-tip", cfg.parentNode) && jQuery(".auto-tip", cfg.parentNode).hasClass('hidden') &&
                    jQuery(".auto-tip", cfg.parentNode).removeClass('hidden');

                var html = '';
                for (var j = 0, jlen = newArrs.length; j < jlen; j++) {
                    html += '<li class="p-index' + j + '">' + '<span class="output-num"></span><em class="em" data-html="' + newArrs[j] + '">' + newArrs[j] + '</em></li>';
                }
                jQuery('.auto-tip', cfg.parentNode).html(html);

                // 
                jQuery('.auto-tip li', cfg.parentNode).each(function(index, item) {
                    jQuery('.output-num', item).html(prefix);
                    !jQuery('.output-num', item).hasClass(_config.inputValColor) &&
                        jQuery('.output-num', item).addClass(_config.inputValColor);

                    var emVal = jQuery.trim(jQuery('.em', item).attr('data-html'));

                    jQuery(item).attr('data-html', '');
                    jQuery(item).attr({ 'data-html': prefix + '' + emVal });
                });

                // 
                _cache.currentIndex = -1;
                _cache.oldIndex = -1;

                jQuery('.auto-tip .output-num', cfg.parentNode).html(prefix);

                // 
                self._itemHover(cfg.parentNode);

                // 
                self._executeClick(cfg.parentNode);
            } else {
                jQuery(".auto-tip", cfg.parentNode) && !jQuery(".auto-tip", cfg.parentNode).hasClass('hidden') &&
                    jQuery(".auto-tip", cfg.parentNode).addClass('hidden');
                jQuery('.auto-tip', cfg.parentNode).html('');
            }
        }
    },
    /*
     * 
     */
    _itemHover: function(parentNode) {
        var self = this,
            _config = self.config,
            _cache = self.cache;
        jQuery('.auto-tip li', parentNode).hover(function(index, item) {
            !jQuery(this).hasClass(_config.hoverBg) && jQuery(this).addClass(_config.hoverBg);
        }, function() {
            jQuery(this).hasClass(_config.hoverBg) && jQuery(this).removeClass(_config.hoverBg);
        });
    },
    /*
     * 
     */
    _removeBg: function(parentNode) {
        var self = this,
            _config = self.config;

        jQuery(".auto-tip li", parentNode).each(function(index, item) {
            jQuery(item).hasClass(_config.hoverBg) && jQuery(item).removeClass(_config.hoverBg);
        });
    },
    /**
     * 
     */
    _keyUpAndDown: function(targetVal, e, parentNode) {
        var self = this,
            _cache = self.cache,
            _config = self.config;

        // 
        if (jQuery('.auto-tip' + ' li', parentNode) && jQuery('.auto-tip' + ' li').length > 0) {

            var plen = jQuery('.auto-tip' + ' li', parentNode).length,
                keyCode = e.keyCode;
            _cache.oldIndex = _cache.currentIndex;


            //
            if (keyCode == 38) {
                if (_cache.currentIndex == -1) {
                    _cache.currentIndex = plen - 1;
                } else {
                    _cache.currentIndex = _cache.currentIndex - 1;
                    if (_cache.currentIndex < 0) {
                        _cache.currentIndex = plen - 1;
                    }
                }
                if (_cache.currentIndex !== -1) {


                    !jQuery('.auto-tip .p-index' + _cache.currentIndex, parentNode).hasClass(_config.hoverBg) &&
                        jQuery('.auto-tip .p-index' + _cache.currentIndex, parentNode).addClass(_config.hoverBg).siblings().removeClass(_config.hoverBg);

                    var curAttr = jQuery('.auto-tip' + ' .p-index' + _cache.currentIndex, parentNode).attr('data-html');
                    jQuery(_config.targetCls, parentNode).val(curAttr);

                    // 
                    jQuery(_config.hiddenCls, parentNode).val(curAttr);
                }

            } else if (keyCode == 40) { //
                if (_cache.currentIndex == plen - 1) {
                    _cache.currentIndex = 0;
                } else {
                    _cache.currentIndex++;
                    if (_cache.currentIndex > plen - 1) {
                        _cache.currentIndex = 0;
                    }
                }

                if (_cache.currentIndex !== -1) {

                    !jQuery('.auto-tip .p-index' + _cache.currentIndex, parentNode).hasClass(_config.hoverBg) &&
                        jQuery('.auto-tip .p-index' + _cache.currentIndex, parentNode).addClass(_config.hoverBg).siblings().removeClass(_config.hoverBg);

                    var curAttr = jQuery('.auto-tip' + ' .p-index' + _cache.currentIndex, parentNode).attr('data-html');
                    jQuery(_config.targetCls, parentNode).val(curAttr);
                    //
                    jQuery(_config.hiddenCls, parentNode).val(curAttr);
                }

            } else if (keyCode == 13) { //
                var curVal = jQuery('.auto-tip' + ' .p-index' + _cache.oldIndex, parentNode).attr('data-html');
                jQuery(_config.targetCls, parentNode).val(curVal);

                //
                jQuery(_config.hiddenCls, parentNode).val(curVal);

                if (_config.isSelectHide) {
                    !jQuery(".auto-tip", parentNode).hasClass('hidden') && jQuery(".auto-tip", parentNode).addClass('hidden');
                }
                _config.callback && jQuery.isFunction(_config.callback) && _config.callback();

                _cache.currentIndex = -1;
                _cache.oldIndex = -1;

            }
        }
    },
    _keyCode: function(code) {
        var arrs = ['17', '18', '38', '40', '37', '39', '33', '34', '35', '46', '36', '13', '45', '44', '145', '19', '20', '9'];
        for (var i = 0, ilen = arrs.length; i < ilen; i++) {
            if (code == arrs[i]) {
                return i;
            }
        }
        return -1;
    },
    /**
     * 
     */
    _executeClick: function(parentNode) {

        var _self = this,
            _config = _self.config;

        jQuery('.auto-tip' + ' li', parentNode).unbind('click');
        jQuery('.auto-tip' + ' li', parentNode).bind('click', function(e) {
            var dataAttr = jQuery(this).attr('data-html');

            jQuery(_config.targetCls, parentNode).val(dataAttr);
            if (_config.isSelectHide) {
                !jQuery(".auto-tip", parentNode).hasClass('hidden') && jQuery(".auto-tip", parentNode).addClass('hidden');
            }
            // 
            jQuery(_config.hiddenCls, parentNode).val(dataAttr);
            _config.callback && jQuery.isFunction(_config.callback) && _config.callback();

        });
    }
};


/*注释原因：由于页面属于动态加载，在页面还未加载完成时会调用，所以将该段代码放到页面渲染完成之后再调用*/
/*jQuery(function() {
	new EmailAutoComplete({});
});*/
export { EmailAutoComplete }
