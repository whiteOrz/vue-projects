$(function() {
    iframeHeight();
    $(".pcServiceList").hide();
    $(".pcPayStyleList").hide();

    $(".liabilityDesc").each(function() {
        if ($.trim($(this).html()) == "") {
            $(this).siblings(".liabilityImg").hide()
        }
    });
    $(".pcPackage").find(".pcLiability:last").css({
        "border-bottom": "0"
    })

    if ($(".insurePeriod .insureAgeList .insurePeriod").length == 1) {
        $(".insurePeriod .insureAgeList .insurePeriod").css("text-align", "left");
    }
    if ($(".insureAge").find(".insureAge").length == 1) {

        $(".insureAge").find(".insureAge").eq(0).css("text-align", "left");
    }

    if ($(".pcPackageNameList").find(".pcPackageName").length == 1) {
        $(".pcPackageNameList").hide();
        $(".pcPackageList").find(".componentTitle").text("保障责任");
        $(".pcPackageList").find(".componentTitle").css({
            "line-height": "15px"
        });

    }
    /*套餐描述*/
    $(document).on("click", ".liabilityImg", function() {
        var txt = $(this).siblings(".liabilityDesc").html();
        var name = $(this).siblings(".liabilityName").text();

        var offset = $(this).offset();

        if (document.getElementById("details-container")) {
            $("#details-container").remove();
        }

        var container = '<div class="container" id="details-container" ><p class="title">' + name + '<p><span class="details-close" id="details-close"></span><p class="con">' + txt + '</p><div>';

        $("#container").append(container);
        var l = offset.left - 400,
            t = offset.top - $("#details-container").height();

        $(".container").css({
            left: l + "px",
            top: t + "px"
        })
        $(document).on("click", ".details-close", function() {
            $("#details-container").remove();
        });
    });
    /*套餐描述end*/
    /*********************二维码 start************************************/
    $(document).on("mouseenter", ".payQRCode", function() {
        var img = $(this).find("img");
        var src = img.attr("src");
        var str = '<div class="ewm"><img src="' + src + '" width="148" height="148"/><div>'
        var offset = $(this).offset();
        var l = offset.left,
            t = offset.top;
        var w = $(this).width(),
            h = $(this).height()
        $("body").append(str);
        $(".ewm").css({
            left: (l - 10) + "px",
            top: (t - 150) + "px"
        })
    });
    $(document).on("mouseleave", ".payQRCode", function() {
        $(".ewm").remove()
    });

    /*********************二维码 end************************************/
    $(".pcPackageName").eq(0).append('<img src="../src/image/icon_arrow.png" class="point">');
    var defaultW = $(".pcPackageName").eq(0).width();
    var defaultL = $(".pcPackageName").eq(0).position();

    $(".pcPackageName").eq(0).find(".point").css({
        left: defaultW / 2 + "px"
    })
    $(document).on("click", ".pcPackageName", function() {
        $(this).siblings().find(".point").remove();
        $(this).append('<img src="../src/image/icon_arrow.png" class="point">');
        iframeHeight();

    });

    /*投保人 最小 最大年龄  start*/
    var storage = new Storage('session');
    var minAge;
    var maxAge;
    if (document.getElementById("minAge")) {
        minAge = $("#minAge").attr("age");
    }
    storage.set("minAge", minAge);
    if (document.getElementById("maxAge")) {
        maxAge = $("#maxAge").attr("age");
    } else {
        maxAge = "65";
    }
    storage.set("maxAge", maxAge);
    /*投保人 最小 最大年龄  end*/

    /*保额 start*/
    $(document).on("click", ".buyReduce", function() {
        var num = $(".buyNum").val();
        num--;
        $(".buyNum").val(num);
        $(".buyNum").trigger('change');
    });

    $(document).on("click", ".buyAdd", function() {
        var num = $(".buyNum").val();
        num++;
        $(".buyNum").val(num);
        $(".buyNum").trigger('change');
    });
    /*保额 end*/

    /*宝贝生日 start*/
    datademo({
        id: '#insureChildBirth',
        currentDate: "2016-09-26 11:28:07", //INIT_GET_DATA.currentTime,
        startDate: "2016-09-26 11:28:07", //INIT_GET_DATA.currentTime,
        sale_mode: 'none',
        max: "1998-09-28", //policyholder.maximumDate.value,
        min: "1960-09-29", //policyholder.minimumDate.value,
        startdate: {
            y: -20,
            m: '10',
            d: '01'
        }
    }, function() {
        var value = $('#insureChildBirth').val();
        $('body').off();
        if (value) {
            $('#insureChildBirth').trigger('change');
        }
    });

    /*宝贝生日 end*/
    /*您的生日 start*/
    datademo({
        id: '#insureBirth',
        currentDate: "2016-09-26 11:28:07", //INIT_GET_DATA.currentTime,
        startDate: "2016-09-26 11:28:07", //INIT_GET_DATA.currentTime,
        sale_mode: 'none',
        max: "1998-09-28", //policyholder.maximumDate.value,
        min: "1960-09-29", //policyholder.minimumDate.value,
        startdate: {
            y: -20,
            m: '10',
            d: '01'
        }
    }, function() {
        var value = $('#insureBirth').val();
        $('body').off();
        if (value) {
            $('#insureBirth').trigger('change');
        }
    });
    /*您的生日 end*/

    /*居住地 start*/
    var areaData = new Area('#live', '.tabspace', payArea);
    /*居住地 end*/
});

function iframeHeight() {
    if (window.top.document.getElementById('attrValue_iframe') != null) {
        window.top.document.getElementById('attrValue_iframe').style.height = $('#container').outerHeight() + "px";
    }
}
