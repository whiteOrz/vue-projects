$(function() {
	iframeHeight();
	var linkArr = [];

	$(".discountDesc").each(function(index, el) {
		$(el).attr("target", "_blank");

	});

	var $wrap = $("#container");
	$(".pcProductPrice").children("div").eq(0).addClass("clearfix");
	$(".pcProductPrice").children("div").eq(0).addClass("clearfix");
	$(".pcDiscountInfoList").addClass("clearfix");
	$(".insureAge").addClass("clearfix");
	$(".insurePeriod").addClass("clearfix");
	$(".pcPackageNameList").addClass("clearfix");
	$(".pcPackageNameList").children(".packageNameList").addClass("clearfix");
	$(".pcPackageList").addClass("clearfix");

	$(".pcPackageContent").addClass("clearfix");
	$(".packageTitle").addClass("clearfix");
	$(".pcLiability").addClass("clearfix");

	$(".pcServiceList").hide();
	$(".pcPayStyleList").hide();

	if($(".insurePeriod .insureAgeList .insurePeriod").length == 1) {
		$(".insurePeriod .insureAgeList .insurePeriod").css("text-align", "left");
	}
	if($(".insureAge .insureAge").length = 1) {
		$(".insureAge .insureAge").css("text-align", "left");
	}

	$(".liabilityImg").click(function() {
		var txt = $(this).siblings(".liabilityDesc").text();
		var name = $(this).siblings(".liabilityName").text();
		//	var mask='<div class="details-mask" id="details-mask" ><div>';

		var offset = $(this).offset();

		if(document.getElementById("details-container")) {
			$("#details-container").remove();
		}

		var container = '<div class="container" id="details-container" ><p class="title">' + name + '<p><span class="details-close" id="details-close"></span><p class="con">' + txt + '</p><div>';
		//$("body").append(mask);
		$("#container").append(container);
		var l = offset.left - 400,
			t = offset.top - $("#details-container").height();

		$(".container").css({
			left: l + "px",
			top: t + "px"
		})

		$(".details-close").click(function() {
			//$("#details-mask").remove()

			$("#details-container").remove();
		});

	});

	$(".payQRCode").mouseenter(function() {
		var img = $(this).find("img");
		var src = img.attr("src");
		var str = '<div class="ewm"><img src="' + src + '"/><div>'
		var offset = $(this).offset();
		var l = offset.left,
			t = offset.top;
		var w = $(this).width(),
			h = $(this).height()
		$("body").append(str);
		$(".ewm").css({
			left: (l + 30) + "px",
			top: (t - 130) + "px"
		})
	});
	$(".payQRCode").mouseleave(function() {
		$(".ewm").remove()
	});
	var str = '<img src="../src/image/triangle.png" class="triangle-p"/>';
	$(".pcPackageContent").prepend(str)
	var defultLeft = $(".pcPackageName.active").position();
	var defultWidth = $(".pcPackageName.active").width();

	$(".triangle-p").css({
		left: (defultLeft.left + (defultWidth / 2) - ($(".triangle-p").width()) / 2) + "px"
	})

	$(".pcPackageName").click(function() {
		var posi = $(this).position();
		var l = posi.left,
			t = posi.top;
		var w = $(this).width();

		$(".pcPackageContent").find(".triangle-p").css({
			"left": (l + (w / 2) - ($(".triangle-p").width()) / 2) + "px"
		});

	})
})

function iframeHeight() {
	if(window.top.document.getElementById('attrValue_iframe') != null) {
		window.top.document.getElementById('attrValue_iframe').style.height = $('#container').outerHeight();
	}
}