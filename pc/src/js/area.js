function Area(id, className, data) {
	this.elem = $(id);
	this.elem.val("");
	this.container = $(className);
	this.data = data;
	this.init()
}
Area.prototype = {
	constructor: Area,
	init: function() {
		this.areaClick()
	},
	areaClick: function() {
		var _this = this;
		this.elem.click(function() {
			_this.container.show();
			fireEvent(_this, "iframeHeight");
			_this.setList()
		})
	},
	setList: function() {
		if(!this.container.attr("set")) {
			this.container.attr("set", true);
			var titleCloseStr = this.setTitleClose();
			var provinceStr = this.setProvinceElem();
			var cityStr = '<div id="city_area"></div>';
			this.container.html(titleCloseStr + provinceStr + cityStr);
			this.elemEvent()
		}
	},
	setTitleClose: function() {
		var html = '<span id="diquClose">×</span>';
		var hotzm = '<div class="tabtitle">' + "<ul>" + ' <li class="curr">热门</li>' + "<li>ABCDEFGHIJ</li>" + "  <li>KLMNOPQR</li>" + "  <li>STUVWXYZ</li>" + " </ul>" + " </div>";
		//var hotzm = '<div class="tabtitle">' + '<ul>'  + '<li class="curr">ABCDEFGHIJ</li>' + '  <li>KLMNOPQR</li>' + ' <li>STUVWXYZ</li>' + ' </ul>' + ' </div>';
		return html + hotzm
	},
	setProvinceElem: function() {
		var areaData = [
			[
				[],
				[],
				[]
			],
			[
				[],
				[]
			],
			[
				[],
				[]
			]
		];
		var areaStr = [
			[],
			[],
			[]
		];
		var areaList = [
			["ABCD", "EFGH", "IJ"],
			["KLMN", "OPQR"],
			["STUV", "WXYZ"]
		];
		var provinceDataStr = "";
		var provinceFirstChar = "";
		var provinceDataFirstCh = "";
		for(var i = 0; i < this.data.items.length; i++) {
			provinceFirstChar = this.data.items[i].firstChar;
			if(provinceFirstChar) {
				provinceDataFirstCh = provinceFirstChar.substring(0, 1)
			} else {
				continue
			}
			if("ABCD".indexOf(provinceDataFirstCh) != -1) {
				areaData[0][0].push(this.data.items[i])
			} else {
				if("EFGH".indexOf(provinceDataFirstCh) != -1) {
					areaData[0][1].push(this.data.items[i])
				} else {
					if("IJ".indexOf(provinceDataFirstCh) != -1) {
						areaData[0][2].push(this.data.items[i])
					} else {
						if("KLMN".indexOf(provinceDataFirstCh) != -1) {
							areaData[1][0].push(this.data.items[i])
						} else {
							if("OPQR".indexOf(provinceDataFirstCh) != -1) {
								areaData[1][1].push(this.data.items[i])
							} else {
								if("STUV".indexOf(provinceDataFirstCh) != -1) {
									areaData[2][0].push(this.data.items[i])
								} else {
									if("WXYZ".indexOf(provinceDataFirstCh) != -1) {
										areaData[2][1].push(this.data.items[i])
									}
								}
							}
						}
					}
				}
			}
		}
		for(var i = 0; i < areaData.length; i++) {
			for(var j = 0; j < areaData[i].length; j++) {
				areaData[i][j].sort(function(a, b) {
					return a.firstChar.charCodeAt() - b.firstChar.charCodeAt()
				})
			}
		}
		var firstChar = "";
		for(var i = 0; i < areaData.length; i++) {
			for(var j = 0; j < areaData[i].length; j++) {
				for(var m = 0; m < areaData[i][j].length; m++) {
					provinceDataStr += '<li id="' + areaData[i][j][m].only + '">' + areaData[i][j][m].name + "</li>"
				}
				areaStr[i].push(provinceDataStr);
				provinceDataStr = ""
			}
		}
		var provinceStr = '<div class="tabcontent">' + '  <div class="city" style="display:block;padding-left:4px;">' + '  <div class="clearfix area_wrap">' + "  <ul>";
		//var provinceStr = '<div class="tabcontent">' ;
		for(var i = 0; i < this.data.hotCity.length; i++) {
			provinceStr += '<li id=hot_"' + this.data.hotCity[i].id + '">' + this.data.hotCity[i].name + "</li>"
		}
		provinceStr += "</ul></div></div>";
		for(var i = 0; i < areaList.length; i++) {
			provinceStr += '<div class="city" >';
			for(var j = 0; j < areaList[i].length; j++) {
				provinceStr += '<div class="clearfix area_wrap"><div class="fl">' + areaList[i][j] + '</div><ul class="fl">' + areaStr[i][j] + "</ul></div>"
			}
			provinceStr += "</div>"
		}
		return provinceStr
	},
	elemEvent: function() {
		this.titleEvent();
		this.closeEvent();
		this.provinceEvent()
	},
	titleEvent: function() {
		var _this = this;
		$(".tabtitle li").mouseover(function() {
			var index = $(this).index();
			$(".tabtitle li").removeClass("curr");
			$(this).addClass("curr");
			$(".tabcontent .city").hide();
			$(".tabcontent .city").eq(index).show();
			$("#city_area").html("")
		})
	},
	closeEvent: function() {
		var _this = this;
		$("#diquClose").click(function() {
			_this.container.hide();
			var value = _this.elem.text();
			if(!value) {
				_this.elem.nextAll(".tip").text("请填写地区").removeClass("tipOk").addClass("tipError")
			}
		})
	},
	provinceEvent: function() {
		var _this = this;
		$(".tabcontent .city li").click(function() {
			var innerH = $(this).text();
			var cityStr = "";
			var cityArr = [];
			for(var i = 0; i < _this.data.items.length; i++) {
				if(_this.data.items[i].type == "city" && _this.data.items[i].province == innerH) {
					cityArr.push(_this.data.items[i])
				}
			}
			cityStr = '<ul class="clearfix">';
			for(var i = 0; i < cityArr.length; i++) {
				cityStr += '<li id="city_' + cityArr[i].only + '">' + cityArr[i].name + "</li>"
			}
			cityStr += "</ul>";
			$("#city_area").html(cityStr);
			for(var i = 0; i < $("#city_area li").length; i++) {
				$("#city_area li").eq(i).attr("code", cityArr[i].value)
			}
			_this.provinceName = innerH;
			_this.cityEvent(innerH)
		})
	},
	cityEvent: function(provoince) {
		var _this = this;
		var areaShow = "";
		$("#city_area li").click(function() {
			var inner = $(this).text();
			var code = $(this).attr("code");
//			if(inner == provoince) {
//				areaShow = provoince
//			} else {
//				areaShow = provoince + " " + inner
//			}
			//var areaCode = "00000001000" + code + "000000";
			areaShow = provoince + " " + inner;
			var areaCode =  code ;
			_this.elem.attr("areaName", areaShow);
			_this.elem.attr("areaCode", areaCode);
			_this.elem.val(areaShow);
			_this.container.hide();
			fireEvent(_this, "success", {
				"areaName": areaShow,
				"areaCode": areaCode,
				"code": code
			})
		})
	}
};

function bindEvent(obj, events, fn) {
	obj.listeners = obj.listeners || {};
	obj.listeners[events] = obj.listeners[events] || [];
	obj.listeners[events].push(fn);
	if(obj.nodeType) {
		if(obj.addEventListener) {
			obj.addEventListener(events, fn, false)
		} else {
			obj.attachEvent("on" + events, fn)
		}
	}
}

function fireEvent(obj, events, ev) {
	if(obj.listeners && obj.listeners[events]) {
		for(var i = 0; i < obj.listeners[events].length; i++) {
			obj.listeners[events][i](ev)
		}
	}
};