var areaPc = {
    "person_area": function(prm) {
        var $el = $(prm.el);
        var $provinceId = $(prm.provinceId); //省代码
        var $cityId = $(prm.cityId); //城市代码
        var areaJson = prm.areaJson;
        var province = areaJson.province;
        var city = areaJson.city;

        var provinceArr = [];
        var cityArr = [];

        var str = "";
        var cityStr = "";
        var descArr;

        $.each(province, function(key, value) {
            provinceArr.push({
                "code": value, //地区代码
                "value": key //地区名称
            });
        });

        function Sorts(a, b) {
            return a.code - b.code;
        }
        provinceArr.sort(Sorts);

        $.each(provinceArr, function(key, value) {
            str += '<li data-id="' + value.code + '">' + value.value + '</li>';
        })

        var wrap = '<div class="area-wrap cleafix h248" id="area-wrap">' +
            '<div class="area-province h248"><ul>' + str + '</ul></div>' +
            '<div class="area-city h248"><ul class="ul"></ul></div>' +
            '</div>';

        $el.on("focus", function() {
            $("body").append(wrap);
            var $this = $(this);
            var offset = $this.offset();
            var iptH = $this.height();

            $("#area-wrap").css({
                left: offset.left + "px",
                top: (offset.top + iptH) + "px"
            });

            $(".area-province").find("li").click(function(e) {
                var provinceCode = $(this).attr("data-id");
                var provinceTxt = $(this).text();
                if ($provinceId.val() != "") {
                    $provinceId.val("")
                }
                if ($cityId.val() != "") {
                    $cityId.val("");
                }

                $provinceId.val(provinceCode);
                $provinceId.attr("data-txt", provinceTxt);

                cityStr = "";
                $.each(city["C" + provinceCode], function(key, value) {
                    cityStr += '<li data-id="' + key + '">' + value + '</li>';
                })
                if ($provinceId.val() == "" || $cityId.val() == "") {
                    $('#ph_area').find(".tip").addClass("tipError").removeClass("tipOk").text("请选择地区");

                } else {
                    $('#ph_area').find(".tip").addClass("tipOk").removeClass("tipError").text("√");
                }
                $(".ul").html(cityStr);
                $el.val(provinceTxt);
            });

            $(".area-city").on("click", "li", function(e) {
                var cityId = $(this).attr("data-id");
                var cityTxt = $(this).text();
                var iptTxt = $provinceId.attr("data-txt");

                $cityId.val(cityId);
                $cityId.attr("data-txt", cityTxt);
                $el.val(iptTxt + " " + cityTxt);

                 $el.attr("value",$provinceId.val()+","+cityId);


                if ($provinceId.val() == "" || $cityId.val() == "") {
                    $('#ph_area').find(".tip").addClass("tipError").removeClass("tipOk").text("请选择地区");
                } else {
                    $('#ph_area').find(".tip").addClass("tipOk").removeClass("tipError").text("√");
                }
                $("#area-wrap").remove();

                $this.trigger('change');
            });
        });
    }
}
