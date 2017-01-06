/*
信息填写页 投保地区
*/
import $ from "jquery";
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
			var item = {
				"code": value, //地区代码
				"value": key //地区名称
			};
			provinceArr.push(item);
		});

		function Sorts(a, b) {
			return a.code - b.code;
		}
		provinceArr.sort(Sorts);

		$.each(provinceArr, function(key, value) {
			str += '<li data-province="' + value.code + '">' + value.value + '</li>';
		})

		var wrap = '<div class="area-wrap cleafix" id="area-wrap">' +
			'<div class="area-province"><ul>' + str + '</ul></div>' +
			'<div class="area-city"><ul class="ul"></ul></div>' +
			'</div>';

		$el.unbind().bind({
			click: function(e) {
				$("body").append(wrap);

				var offset = $(this).offset();
				var iptH = $(this).height();

				$("#area-wrap").css({
					left: offset.left + "px",
					top: (offset.top + iptH) + "px"
				});

				$(".area-province").find("li").click(function(e) {
					var provinceCode = $(this).attr("data-province");
					var provinceTxt = $(this).text();
					if($("#provinceId").val()!=""){
						$("#provinceId").val("")
					}
					if($("#cityId").val()!=""){
						$("#cityId").val("");
					}

					$("#provinceId").val(provinceCode);
					$("#provinceId").attr("data-provice", provinceTxt);

					cityStr = "";
					$.each(city["C" + provinceCode], function(key, value) {
						cityStr += '<li data-city="' + key + '">' + value + '</li>';
					})
					if($("#provinceId").val() == "" || $("#cityId").val() == "") {
						$('#ph_area').find(".tip").addClass("tipError").removeClass("tipOk").text("请选择地区");

					} else {
						$('#ph_area').find(".tip").addClass("tipOk").removeClass("tipError").text("√");

					}
					$(".ul").html(cityStr);
					$el.val(provinceTxt);
					e.stopPropagation();
				});

				$(".area-city").on("click", "li", function(e) {
					var cityId = $(this).attr("data-city");
					var cityTxt = $(this).text();
					var iptTxt = $("#provinceId").attr("data-provice");

					$("#cityId").val(cityId);
					$("#cityId").attr("data-city", cityTxt);
					$el.val(iptTxt + " " + cityTxt);

					if($("#provinceId").val() == "" || $("#cityId").val() == "") {
						$('#ph_area').find(".tip").addClass("tipError").removeClass("tipOk").text("请选择地区");

					} else {
						$('#ph_area').find(".tip").addClass("tipOk").removeClass("tipError").text("√");

					}
					$("#area-wrap").remove();
					e.stopPropagation();
				});
				e.stopPropagation();
			},
			blur: function() {

				//$("#area-wrap").remove();
			}

		});
		$("body").click(function(e) {

			$("#area-wrap").remove();

			e.stopPropagation();
		});

	}
}
export {
	areaPc
};