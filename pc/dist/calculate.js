// try{
// 	import $ from "../src/jquery.js";
// }
// catch (e){
// 	var $ = require("../src/jquery.js")
// }

var calculate = function (){
	var Observer = function(){
		this.update = function(){

		}
	};
	var Subject = function (){

		// this.observers = [];
		
	};
	Subject.prototype = {
		notifyObservers : function (context,name){
			for(var i = 0, n = this.observers.length; i < n; i++) {
	            this.observers[i].update(context,name);
	        }
		},
		addObservers : function(observer){
	    	if(!observer.update) throw 'Wrong observer';
	    	if(!this.observers) this.observers = [];
	    	this.observers.push(observer);
	    },
	    removeObservers : function(observer) {
	      // if(!observer.update) { throw 'Wrong observer'; }
	    	this.observers.remove(observer);
	    }
	};
	var implement = function(Concrete,Interface){
		for(var i = 0;i < Concrete.length; i++){
			for(var prop in  Interface) {
		      Concrete[i][prop] = Interface[prop];
		    }
		}
	};
	var copy = function(Concrete,Interface){
		for(var i = 0;i < Concrete.length; i++){
			for(var prop in  Interface) {
				if(prop == "observers" || prop == "notifyObservers")
		      Concrete[i][prop] = Interface[prop];
		    }
		}
	}
		$.each(json.subjectList,function (item,value){		
			var subject_name = item.split("&");
			$.each(subject_name,function(index,item){
				var subject = $("input[name="+item+"]");
				subject = subject.length ? subject: $("select[name="+item+"]");
				var observers = value;
				//设置发布者
				implement( subject,new Subject());
				//根据发布者状态的改变来通知观察者
				// $("input[name="+item+"],select[name="+item+"]").addEventListener("change",function(){
				// 	this.notifyObservers(this.value,this.name)
				// },false)
				$(document).on("change",("input[name="+item+"],select[name="+item+"]"),function(){
					this.notifyObservers(this.value,this.name)
				});
				//为每个发布者对应的观察者创建自己的方法
				observers.forEach(function (item,index){
					var observer_type = item.split("_")[0] + "List";
					var observer_name = item.split("_")[1];
					var observer = $("input[name="+observer_name+"]").parent().parent()[0]||$("select[name="+observer_name+"]").parent()[0];
					observer.update = function(val,subject_now){
						//先转换年龄的格式再去去对应的json操作
						if(subject_now == "insureBirth" || subject_now == "insureChildBirth"){
							// subject = $("input[name=insureChildBirth]");
							val = $("input[name=insureChildBirth]").is(":visible") ? $("input[name=insureChildBirth]").val() : val;
							val = setAge(val,observer_name);
						}
						if(subject_now == "insureBirth" && $("input[name=insureChildBirth]").is(":visible") ){
							return false;
						}
						//地区是几级的转换
						if(subject_now == "iptArea"){
							val = area_setLevel(val);
						}
						var config = json[observer_type][observer_name]["subjectList"][subject_now][val];
						
						if(!config.action){
							var subject_name_2 = subject_name[1-subject_name.indexOf(subject_now)];
							if(subject_name.length == 3){
								if($("input[name=insureChildBirth]").is(":visible")){
									subject_name_2 = subject_now == "insureChildBirth" ? "iptArea" : "insureChildBirth";
								}
								else{
									subject_name_2 = subject_now == "insureBirth" ? "iptArea" : "insureBirth";
								}
							}
							var val_2 = $("input[name="+subject_name_2+"]:checked").val()||$("input[name="+subject_name_2+"]:eq(0)").val();
							val_2 = val_2 ? val_2 :($("select[name="+subject_name_2+"]:checked").val()||$("select[name="+subject_name_2+"]:eq(0)").val());
							if(subject_name_2 == "insureBirth" || subject_name_2 == "insureChildBirth"){
								// subject = $("input[name=insureChildBirth]");
								val_2 = $("input[name=insureChildBirth]").is(":visible") ? $("input[name=insureChildBirth]").val() : val;
								val_2 = setAge(val_2,observer_name);

							}
							//地区是几级的转换
							if(subject_name_2 == "iptArea"){
								val_2 = area_setLevel(val_2);
							}
							config = json[observer_type][observer_name]["subjectList"][subject_now][val][subject_name_2][val_2];
						}
						//根据json操作dom
						if(config.action == "hidden"){
							$(observer).parent().hide()
						}else if(config.action == "visible"){
							$(observer).parent().show()
						}else if(config.action == "setvalue"){
							$(observer).parent().show()
							var old_inputs = $(observer).find("input")[0];
							$(observer).empty();
							config.factorList.forEach(function(item,index){
								var html_text = "<label class='"+observer_name+" item' >"+
										"<input type='radio' name='"+observer_name+"' style = 'display:none;'"+
										"value='"+item.factorKey+"'/>"+
										"<span>"+item.factorValue+"</span>"+
									"</label>";
								$(observer).append($(html_text));
							})
							if(old_inputs.observers){
								copy($(observer).find("input"),old_inputs)
							}
						}else if(config.action == "setMax"){
							$(observer).find("input").attr("max",config.max);
							$(observer).find("input").attr("placeholder","请输入1-"+ config.max +"间的整数");
						}
						
					}
					implement( observer, new Observer());
					subject.each(function(){
						this.addObservers(observer);
					})
				})
			})
		})
}
function setAge(val,type){
	var birthday,Y,M,D;
		Y=val.substr(0, 4);
		M=val.substr(5, 2)-1;
		D=val.substr(8, 2);
	var birth = new Date(Y,M,D);
	var now = new Date(new Date().getTime()+24*60*60*1000);
	var year = now.getFullYear();
	var month = now.getMonth();
	var date = now.getDate();
	var birthYear = birth.getFullYear();
	var birthMonth = birth.getMonth();
	var birthDate = birth.getDate();
	var offsetYear = year - birthYear;
	if(birthMonth > month) {
			offsetYear--;
	} 
	else if(birthMonth == month) {
		if(birthDate > date) {
			offsetYear--;
		}
	}
	if(type == "insurePeriod"){
		if( offsetYear <= 40){
			return "0-40"
		}else if(offsetYear <= 55){
			return "40-55"
		}else {
			return -1;
		}
	}
	else if(type == "insurePayWay"){
		if( offsetYear <= 35){
			return "0-35"
		}
		else if(offsetYear <= 55){
			var t = Math.ceil((offsetYear-35)/5);
			var maxAge = 35 + 5*t;
			var minAge = 35 + 5*(t-1);
			return minAge + "-" + maxAge;
		}else{
			return -1;
		}

	}
	else if(type == "insureSum"){
		if(offsetYear <= 17){
			return "0-17"
		}
		else if(offsetYear >=18 && offsetYear <=40){
			return "18-40"
		}
		else if(offsetYear >=41 && offsetYear <=55){
			return "41-55"
		}else {
			return "0-17";
		}
	}
}
function area_setLevel(val){
	var arr1 = ["1","4","3","I","B","A","K","L","M","E"];
	var arr2 = ["5","60","C","F","N","2","R","8","D","H","T","J","U","Y","H"];
	var arr3 = ["Q","6","7","P","O","W","V","S","X","Z", "a"];
	if(!val){
		return "1";
	}
	if(val.split(",").length<2){
		val = $("input[name=iptArea]").attr("value");
	}
	var province_code = val.split(",")[0];
	var city_code = val.split(",")[1];
	if(arr1.indexOf(city_code) != -1){
		return "1";
	}
	if(arr2.indexOf(city_code) != -1){
		return "2";
	}
	if(arr3.indexOf(city_code) != -1){
		return "3";
	}
	if(arr1.indexOf(province_code) != -1){
		return "1";
	}
	if(arr2.indexOf(province_code) != -1){
		return "2";
	}
	if(arr3.indexOf(province_code) != -1){
		return "3";
	}
}

// try {
// 	export default calculate;
// }
// catch (e){
// 	module.exports = calculate;
// }
