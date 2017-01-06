;
(function($) {
    console.log(this);
    
    $.fn.extend({
        aa: function() {
            return this;
        }
    });

})(jQuery);

;
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(['$'],factory) : factory(jQuery);
})(this,function($) {
    $.fn.extend({
        bb: function() {
            console.log(this);
        }
    });
});
