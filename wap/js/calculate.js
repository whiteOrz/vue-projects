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
		this.observers = [];
	};
	Subject.prototype = {
		notifyObservers : function (context){
			for(var i = 0, n = this.observers.length; i < n; i++) {
	            this.observers[i].update(context);
	        }
		},
		addObservers : function(observer){
	    	if(!observer.update) throw 'Wrong observer';
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
	var json = {
	    "subjectList": {
	        "insurePerson":[
	            "factor_insureChildBirth",
	            "factor_insureChildGender",
	            "factor_insureRelationship",
	            "factor_insureBirth"
	        ],
	        "insurePayWay":[
	            "factor_insurePayFrequency"
	        ],
	        "insureBirth":[
	            "factor_insurePeriod",
	            "factor_insurePayWay"
	        ],
	        "insureLiability":[
	        	"factor_insureBirth"
	        ]
	    },
	    "factorList":{
	        "insureChildBirth":{
	            "type": "input",
	            "subjectList": {
	                "insurePerson": {
	                    "0": {
	                        "action": "hidden"
	                    },
	                    "1": {
	                        "action": "visible"
	                    }
	                }
	            }
	        },
	        "insureChildGender":{
	            "type": "input",
	            "subjectList": {
	                "insurePerson": {
	                    "0": {
	                        "action": "hidden"
	                    },
	                    "1": {
	                        "action": "visible"
	                    }
	                }
	            }
	        },
	        "insureRelationship":{
	            "type": "input",
	            "subjectList": {
	                "insurePerson": {
	                    "0": {
	                        "action": "hidden"
	                    },
	                    "1": {
	                        "action": "visible"
	                    }
	                }
	            }
	        },
	        "insureBirth":{
	        	"type": "input",
	            "subjectList": {
	                "insurePerson": {
	                    "0": {
	                        "action": "visible"
	                    },
	                    "1": {
	                        "action": "hidden"
	                    }
	                },
	                "insureLiability": {
	                    "0": {
	                        "action": "hidden"
	                    },
	                    "1": {
	                        "action": "visible"
	                    }
	                }
	            }
	        },
	        "insurePayFrequency":{
	            "type":"input",
	            "subjectList": {
	                "insurePayWay": {
	                    "0": {
	                        "action": "hidden"
	                    },
	                    "1": {
	                        "action": "visible"
	                    },
	                    "2": {
	                        "action": "visible"
	                    },
	                    "3": {
	                        "action": "visible"
	                    },
	                    "4": {
	                        "action": "visible"
	                    }
	                }
	            }

	        },
	        "insurePeriod":{
	            "type": "input",
	            "subjectList": {
	                "insureBirth": {
	                    "0-40": {
	                        "action": "setvalue",
	                        "factorList":[
	                            {
	                                "componentId": "insurePerios",
	                                "factorKey": "1",
	                                "factorValue": "30年"
	                            },
	                            {
	                                "componentId": "insurePerios",
	                                "factorKey": "2",
	                                "factorValue": "75周岁"
	                            }
	                        ]
	                    },
	                    "40-55": {
	                        "action": "setvalue",
	                        "factorList":[
	                            {
	                                "componentId": "insurePerios",
	                                "factorKey": "2",
	                                "factorValue": "75周岁"
	                            }
	                        ]
	                    },
	                    "-1":{
	                    	"action": "hidden",
	                    	"message":"年龄不在范围内"
	                    }
	                }
	            }
	        },
	        "insurePayWay":{
	            "type": "input",
	            "subjectList": {
	                "insureBirth": {
	                    "0-35": {
	                        "action": "setvalue",
	                        "factorList":[
	                            {
	                                "componentId": "insurePayWay",
	                                "factorKey": "0",
	                                "factorValue": "一次性交"
	                            },
	                            {
	                                "componentId": "insurePayWay",
	                                "factorKey": "1",
	                                "factorValue": "5年交"
	                            },
	                            {
	                                "componentId": "insurePayWay",
	                                "factorKey": "2",
	                                "factorValue": "10年交"
	                            },
	                            {
	                                "componentId": "insurePayWay",
	                                "factorKey": "3",
	                                "factorValue": "15年交"
	                            },
	                            {
	                                "componentId": "insurePayWay",
	                                "factorKey": "4",
	                                "factorValue": "20年交"
	                            }
	                        ]
	                    },
	                    "35-40": {
	                        "action": "setvalue",
	                        "factorList":[
	                            {
	                                "componentId": "insurePayWay",
	                                "factorKey": "0",
	                                "factorValue": "一次性交"
	                            },
	                            {
	                                "componentId": "insurePayWay",
	                                "factorKey": "1",
	                                "factorValue": "5年交"
	                            },
	                            {
	                                "componentId": "insurePayWay",
	                                "factorKey": "2",
	                                "factorValue": "10年交"
	                            },
	                            {
	                                "componentId": "insurePayWay",
	                                "factorKey": "3",
	                                "factorValue": "15年交"
	                            }
	                        ]
	                    },
	                    "40-45": {
	                        "action": "setvalue",
	                        "factorList":[
	                            {
	                                "componentId": "insurePayWay",
	                                "factorKey": "0",
	                                "factorValue": "一次性交"
	                            },
	                            {
	                                "componentId": "insurePayWay",
	                                "factorKey": "1",
	                                "factorValue": "5年交"
	                            },
	                            {
	                                "componentId": "insurePayWay",
	                                "factorKey": "2",
	                                "factorValue": "10年交"
	                            }
	                        ]
	                    },
	                    "45-50": {
	                        "action": "setvalue",
	                        "factorList":[
	                            {
	                                "componentId": "insurePayWay",
	                                "factorKey": "0",
	                                "factorValue": "一次性交"
	                            },
	                            {
	                                "componentId": "insurePayWay",
	                                "factorKey": "1",
	                                "factorValue": "5年交"
	                            }
	                        ]
	                    },
	                    "50-55": {
	                        "action": "setvalue",
	                        "factorList":[
	                            {
	                                "componentId": "insurePayWay",
	                                "factorKey": "0",
	                                "factorValue": "一次性交"
	                            }
	                        ]
	                    },
	                    "-1":{
	                    	"action": "hidden",
	                    	"message":"年龄不在范围内"
	                    }
	                }
	            }
	        }
	    }
	}
		$.each(json.subjectList,function (item,value){
			var subject_name = item;
			var subject = $("input[name="+item+"]");
			var observers = value;
			//设置发布者
			implement( subject,new Subject());
			//根据发布者状态的改变来通知观察者
			$(document).on("change",("input[name="+item+"]"),function(){
				console.log(subject)
				this.notifyObservers(this.value)
			});
			//为每个发布者对应的观察者创建自己的方法
			observers.forEach(function (item,index){
				var observer_type = item.split("_")[0] + "List";
				var observer_name = item.split("_")[1];
				var observer = $("input[name="+observer_name+"]").parent().parent()[0] || $("select[name="+observer_name+"]").parent()[0];
				observer.update = function(val){
					//先转换年龄的格式再去去对应的json操作
					if(subject_name == "insureBirth" || subject_name == "insureChildBirth"){
						val = setAge(val,observer_name);
					}
					var config = json[observer_type][observer_name]["subjectList"][subject_name][val];
					//特殊的json不能满足的操作手动赋值
					if(observer_name == "insureBirth"){
						console.log($("input[name=insurePerson]:checked").val())
						if( $("input[name=insurePerson]:checked").val() == "0" ){
							config = json[observer_type][observer_name]["subjectList"]["insurePerson"]["0"];
						}
					}
					//根据json操作dom
					if(config.action == "hidden"){
						$(observer).parent().hide();
					}else if(config.action == "visible"){
						$(observer).parent().show();
					}else if(config.action == "setvalue"){
						$(observer).parent().show();
						var old_inputs = $(observer).find("input")[0];
						$(observer).empty();
						config.factorList.forEach(function(item,index){
							var html_text = "<label class='"+observer_name+" item' factorIndex='m' value='m'>"+
									"<input type='radio' name='"+observer_name+"' style = 'display:none;'"+
									"value='"+item.factorKey+"'/>"+
									"<span>"+item.factorValue+"</span>"+
								"</label>";
							$(observer).append($(html_text));
						})
						if(old_inputs.observers){
							copy($(observer).find("input"),old_inputs)
						}
					}

				}
				implement( observer, new Observer());
				subject.each(function(){
					this.addObservers(observer);
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
}
function areaLevel(val){

}

// try {
// 	export default calculate;
// }
// catch (e){
// 	module.exports = calculate;
// }
