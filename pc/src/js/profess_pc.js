
var professPc = {
	"person_profession": function(prm) {
		function Sorts(a, b) {
			return a.code - b.code;
		}

		var $el = $(prm.el)
		var $worktypeid = $(prm.worktypeid);

		var professionJson = prm.professJson;
		var value = professionJson.value;
		var desc = professionJson.desc;
		var desc_type = professionJson.desc_type;

		var str = "";
		var professArr = [];
		var descArr;

		var descWrap = '<div class="profess-desc" id="profess-desc">' +
			'<h3 class="title"></h3>' +
			'<ul class="ul"></ul>' +
			'<div class="btn_area clearfix">' +
			'<input type="button" value="我已知悉" class="btn_work_l"/>' +
			'<input type="button" value="取消" class="btn_work_r"/>' +
			'</div>' +
			'</div>';

		str += '<option value="0" selected="selected">请选择</option>';
		$.each(value, function(index, key) {
			var item = {
				"code": key,
				"value": index
			}
			professArr.push(item);

		});
		
		professArr.sort(Sorts);
		$.each(professArr, function(key, vlaue) {
			str += '<option value="' + vlaue.code + '">' + vlaue.value + '</option>';
		})
		$el.html(str);

		function initProfess(code) {
			var strJson = {
				"strTitle": "",
				"strDesc": ""
			}
			if(desc_type[code] == "不限") {
				strJson.strTitle = "所有职业都能投保";
				if($("#profess-desc")) {
					$("#profess-desc").remove();
				}
			} else if(desc_type[code] == "不含") {
				strJson.strTitle = "以下职业不在本产品保障范围中，请您知悉 ";
				if($("#profess-desc")) {
					$("#profess-desc").remove();
				}
				$("body").append(descWrap);

			} else if(desc_type[code] == "仅限") {
				strJson.strTitle = "本产品保障范围仅包含以下职业，请您知悉";
				if($("#profess-desc")) {
					$("#profess-desc").remove();
				}
				$("body").append(descWrap);

			}

			descArr = desc[code].split("、");
			for(var i = 0; i < descArr.length; i++) {
				strJson.strDesc += '<li>' + descArr[i] + '</li>';
			}

			return strJson;
		}
		$el.unbind().bind("change", function() {
			var codeProess = $(this).find("option:selected").val();

			if(codeProess == "" || codeProess== "0") {
				$('#applicant-profess').find(".tip").addClass("tipError").removeClass("tipOk").text("请选择职业");
			} else {
				$('#applicant-profess').find(".tip").addClass("tipOk").removeClass("tipError").text("√");
				var str = initProfess(codeProess);
				$worktypeid.val(codeProess);
				$(".title").html(str.strTitle);
				$(".ul").html(str.strDesc);
			}
			$(".btn_work_l").click(function() {
				$("#profess-desc").remove();
			});
			$(".btn_work_r").click(function() {
				$("#profess-desc").remove();
				$el.find("option[value='0']").attr("selected", true);
				$('#applicant-profess').find(".tip").addClass("tipError").removeClass("tipOk").text("请选择职业");
			});
		});

	}
}