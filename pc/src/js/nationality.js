var nationality=function(obj){this.init(obj)};nationality.prototype={data:[{id:"CN",en:"China",cn:"中国"},{id:"AU",en:"Australia",cn:"澳大利亚"},{id:"AZ",en:"Azerbaijan",cn:"阿塞拜疆"},{id:"AD",en:"Andorra",cn:"安道尔"},{id:"AG",en:"Antigua and barbuda",cn:"安提瓜和巴布达"},{id:"AM",en:"Armenia",cn:"亚美尼亚"},{id:"AR",en:"Argentina",cn:"阿根廷"},{id:"AT",en:"Austria",cn:"奥地利(申根)"},{id:"AB",en:"Aruba",cn:"阿鲁巴岛"},{id:"BH",en:"Bahrain",cn:"巴林"},{id:"BD",en:"Bangladesh",cn:"孟加拉国"},{id:"BE",en:"Belgium",cn:"比利时(申根)"},{id:"BR",en:"Brazil",cn:"巴西"},{id:"BG",en:"Bulgaria",cn:"保加利亚"},{id:"BF",en:"Burkina Faso",cn:"布基纳法索"},{id:"BB",en:"Barbados",cn:"巴巴多斯"},{id:"BO",en:"Bolivia",cn:"玻利维亚"},{id:"BZ",en:"Belize",cn:"伯利兹"},{id:"BL",en:"Bonaire",cn:"博内尔"},{id:"BS",en:"Bahamas",cn:"巴哈马"},{id:"BY",en:"Belarus",cn:"白俄罗斯"},{id:"BM",en:"Bermuda",cn:"百慕大"},{id:"BN",en:"Brunei",cn:"文莱"},{id:"BJ",en:"Benin",cn:"贝宁"},{id:"BT",en:"Bhutan",cn:"不丹"},{id:"WN",en:"Botswana",cn:"博茨瓦那"},{id:"CA",en:"Canada",cn:"加拿大"},{id:"KS",en:"Curacao",cn:"库腊索岛"},{id:"CU",en:"Cuba",cn:"古巴"},{id:"KM",en:"Comoros",cn:"科摩罗"},{id:"CV",en:"Cape Verde",cn:"佛得角"},{id:"CE",en:"Ceuta",cn:"塞卜泰"},{id:"CR",en:"Costa Rica",cn:"哥斯达黎加"},{id:"CL",en:"Chile",cn:"智利"},{id:"HR",en:"Croatia",cn:"克罗地亚"},{id:"CI",en:"Cote dIvoire",cn:"科特迪瓦"},{id:"CM",en:"Cameroon",cn:"喀麦隆"},{id:"CY",en:"Cyprus",cn:"塞浦路斯"},{id:"CZ",en:"Czech Republic",cn:"捷克(申根)"},{id:"DO",en:"Dominican Republic",cn:"多米尼加共和国"},{id:"DK",en:"Denmark",cn:"丹麦(申根)"},{id:"DJ",en:"Djibouti",cn:"吉布提"},{id:"DN",en:"Dominica",cn:"多米尼加"},{id:"EG",en:"Egypt",cn:"埃及"},{id:"EE",en:"Estonia",cn:"爱沙尼亚(申根)"},{id:"SV",en:"El Salvador",cn:"萨尔瓦多"},{id:"EC",en:"Ecuador",cn:"厄瓜多尔"},{id:"FJ",en:"Fiji",cn:"斐济"},{id:"FI",en:"Finland",cn:"芬兰(申根)"},{id:"FR",en:"France",cn:"法国(申根)"},{id:"GH",en:"Ghana",cn:"加纳"},{id:"GL",en:"Greenland",cn:"格陵兰"},{id:"GG",en:"Gambier Is",cn:"盖比群岛"},{id:"GA",en:"Gabon",cn:"加蓬"},{id:"GM",en:"Gambia",cn:"冈比亚"},{id:"GY",en:"Guyana",cn:"圭亚那"},{id:"DE",en:"Germany",cn:"德国(申根)"},{id:"GP",en:"Guadeloupe",cn:"瓜德罗普"},{id:"GD",en:"Grenada",cn:"格林纳达"},{id:"GT",en:"Guatemala",cn:"危地马拉"},{id:"GI",en:"Gibraltar",cn:"直布罗陀"},{id:"GR",en:"Greece",cn:"希腊(申根)"},{id:"HN",en:"Honduras",cn:"洪都拉斯"},{id:"HA",en:"Hamilton",cn:"汉密尔顿"},{id:"HW",en:"Hawaii",cn:"夏威夷"},{id:"HK",en:"Hong Kong",cn:"香港"},{id:"HU",en:"Hungary",cn:"匈牙利(申根)"},{id:"IN",en:"India",cn:"印度"},{id:"ID",en:"Indonesia",cn:"印度尼西亚"},{id:"IE",en:"Ireland",cn:"爱尔兰"},{id:"IT",en:"Italy",cn:"意大利(申根)"},{id:"IS",en:"Iceland",cn:"冰岛(申根)"},{id:"JM",en:"Jamaica",cn:"牙买加"},{id:"JO",en:"Jordan",cn:"约旦"},{id:"JP",en:"Japan",cn:"日本"},{id:"KW",en:"Kuwait",cn:"科威特"},{id:"KZ",en:"Kazakstan",cn:"哈萨克斯坦"},{id:"KL",en:"Kholmsk",cn:"霍尔姆斯克"},{id:"KG",en:"Kirghizia",cn:"吉尔吉斯"},{id:"LV",en:"Latvia",cn:"拉脱维亚(申根)"},{id:"LT",en:"Lithuania",cn:"立陶宛(申根)"},{id:"LA",en:"Lao",cn:"老挝"},{id:"LU",en:"Luxembourg",cn:"卢森堡(申根)"},{id:"LI",en:"Liechtenstein",cn:"列支敦士登"},{id:"LS",en:"Lesotho",cn:"莱索托"},{id:"MX",en:"Mexico",cn:"墨西哥"},{id:"MS",en:"Montserrat",cn:"蒙特塞拉特"},{id:"MQ",en:"Martinique",cn:"马提尼克"},{id:"MZ",en:"Mozambique",cn:"莫桑比克"},{id:"MM",en:"Myanmar",cn:"缅甸"},{id:"MA",en:"Morocco",cn:"摩洛哥"},{id:"ME",en:"Maslenica",cn:"马斯莱尼察"},{id:"MK",en:"Macedonia",cn:"马其顿"},{id:"MO",en:"Macau",cn:"澳门"},{id:"MY",en:"Malaysia",cn:"马来西亚"},{id:"MU",en:"Mauritius",cn:"毛里求斯"},{id:"MD",en:"Moldova",cn:"摩尔多瓦"},{id:"MI",en:"Melilla",cn:"梅利利亚"},{id:"MC",en:"Monaco",cn:"摩纳哥"},{id:"MV",en:"Maldives",cn:"马尔代夫"},{id:"MT",en:"Malta",cn:"马耳他(申根)"},{id:"MW",en:"Malawi",cn:"马拉维"},{id:"MN",en:"Mongolia",cn:"蒙古"},{id:"ML",en:"Mali",cn:"马里"},{id:"NI",en:"Nicaragua",cn:"尼加拉瓜"},{id:"NL",en:"Netherlands",cn:"荷兰(申根)"},{id:"NZ",en:"New Zealand",cn:"新西兰"},{id:"NO",en:"Norway",cn:"挪威(申根)"},{id:"NP",en:"Nepal",cn:"尼泊尔"},{id:"NE",en:"Niger",cn:"尼日尔"},{id:"NM",en:"Namibia",cn:"纳米比亚"},{id:"NC",en:"New Caledonia",cn:"新喀里多尼亚"},{id:"OM",en:"Oman",cn:"阿曼"},{id:"PH",en:"Philippines",cn:"菲律宾"},{id:"PT",en:"Portugal",cn:"葡萄牙(申根)"},{id:"PR",en:"Puerto Rico",cn:"波多黎各"},{id:"PE",en:"Peru",cn:"秘鲁"},{id:"PL",en:"Poland",cn:"波兰(申根)"},{id:"PA",en:"Panama",cn:"巴拿马"},{id:"PG",en:"Papua New Guinea",cn:"巴布亚新几内亚"},{id:"PY",en:"Paraguay",cn:"巴拉圭"},{id:"NV",en:"Nuevitas",cn:"努埃维塔斯"},{id:"QA",en:"Qatar",cn:"卡塔尔"},{id:"RE",en:"Reunion",cn:"留尼汪"},{id:"RO",en:"Romania",cn:"罗马尼亚"},{id:"RU",en:"Russia",cn:"俄罗斯"},{id:"SN",en:"Senegal",cn:"塞内加尔"},{id:"SG",en:"Singapore",cn:"新加坡"},{id:"ES",en:"Spain",cn:"西班牙(申根)"},{id:"SC",en:"Seychelles",cn:"塞舌尔"},{id:"SM",en:"San Marino",cn:"圣马力诺"},{id:"SA",en:"Saudi Arabia",cn:"沙特阿拉伯"},{id:"SI",en:"Slovenia",cn:"斯洛文尼亚(申根)"},{id:"CH",en:"Switzerland",cn:"瑞士(申根)"},{id:"ZA",en:"South Africa",cn:"南非"},{id:"KR",en:"Korea,Republic of",cn:"韩国"},{id:"LC",en:"Saint Lucia",cn:"圣卢西亚"},{id:"SS",en:"Sabha",cn:"萨巴"},{id:"SQ",en:"Society Islands",cn:"社会群岛"},{id:"SE",en:"Sweden",cn:"瑞典(申根)"},{id:"SK",en:"Slovakia",cn:"斯洛伐克(申根)"},{id:"SW",en:"Saint Martin",cn:"圣马丁岛"},{id:"SZ",en:"Swaziland",cn:"斯威士兰"},{id:"VC",en:"Saint Vincent and Grenadines",cn:"圣文森特和格林纳丁斯"},{id:"SR",en:"Suriname",cn:"苏里南"},{id:"SX",en:"St Kitts-Nevis",cn:"圣其茨-尼维斯"},{id:"TH",en:"Thailand",cn:"泰国"},{id:"TR",en:"Turkey",cn:"土耳其"},{id:"TW",en:"Taiwan",cn:"台湾"},{id:"TM",en:"Turkmenstan",cn:"土库曼斯坦"},{id:"TG",en:"Togo",cn:"多哥"},{id:"TN",en:"Tunisia",cn:"突尼斯"},{id:"US",en:"United States",cn:"美国"},{id:"TU",en:"The United Arab Emirates",cn:"阿拉伯联合酋长国"},{id:"UZ",en:"Uzbekistan",cn:"乌兹别克斯坦"},{id:"UA",en:"Ukraine",cn:"乌克兰"},{id:"GB",en:"United Kingdom",cn:"英国"},{id:"UY",en:"Uruguay",cn:"乌拉圭"},{id:"VN",en:"Viet Nam",cn:"越南"},{id:"VA",en:"Vatican",cn:"梵蒂冈城国"},{id:"VE",en:"Venezuela",cn:"委内瑞拉"}],strData:String,input:Object,list:Object,init:function(option){this.setOption(option);
this.setEvent()},setOption:function(option){if(!option||!option.input||!option.list){return}this.input=option.input||null;this.list=option.list||null;this.setData()},setEvent:function(){var me=this;this.input.bind("focus",function(){var fvalue=$(this).val()||"";me.setList(fvalue)});this.input.bind("blur",function(){me.chkValue()});this.input.bind("keyup input",function(event){var keyCode=event.keyCode||"";var fvalue=$(this).val()||"";if(keyCode==38||keyCode==40){return false}else{if(keyCode==13||keyCode==108){me.chkValue();return false}}if(fvalue==""){me.list.parent().hide();return false}me.setList(fvalue)});this.input.bind("click",function(){return false});$(document).bind("keydown",function(event){me.setKeyDownEvent(event)}).bind("click",function(){me.list.parent().hide()})},setData:function(){var temp=[],item=[];for(var i=0;i<this.data.length;i++){item=[];item.push(this.data[i]["id"]||"");item.push(this.data[i]["en"]||"");item.push(this.data[i]["cn"]||"");temp.push(item.join("|"))}this.strData=temp.length>0?"#"+temp.join("##")+"#":""},doSearch:function(key){if(!key||key==""){return["CN|China|中国","HK|Hong Kong|香港","MO|Macau|澳门","TW|Taiwan|台湾"]}var reg=new RegExp("#[^#]*?"+key+"[^#]*?#","gi");return this.strData.match(reg)},setList:function(fvalue){fvalue=fvalue||"";var data=this.doSearch(fvalue);var html=[];if(data&&!isNaN(data.length)&&data.length>0){for(var i=0;i<data.length;i++){var item=data[i].replace(/^#|#$/g,"");var temp=item.split("|");if(temp.length<2){continue}html.push('<li class="nationality-suggest-item" id="'+temp[0]+'" en="'+temp[1]+'" cn="'+temp[2]+'">'+temp[2]+"<em>"+temp[1]+"</em></li>")}}this.list.html(html.join(""));if(this.list.parent().is(":hidden")){this.list.parent().show()}this.setListEvent(this.input,this.list)},setListEvent:function(){var me=this;this.list.find(".nationality-suggest-item").unbind("click").bind("click",function(){me.setValue($(this),true)})},setValue:function(item,hide){if(!item){return}var id=item.attr("id")||"";var en=item.attr("en")||"";var cn=item.attr("cn")||"";this.input.val(cn);this.input.attr("nid",id);this.input.attr("nen",en);this.input.attr("ncn",cn);if(hide==true){this.list.parent().hide()}},chkValue:function(){var fvalue=this.input.val()||"";var id="",en="",cn="";if(fvalue!=""){var data=this.doSearch(fvalue);if(data&&!isNaN(data.length)&&data.length>0){var item=data[0].replace(/^#|#$/g,"");var temp=item.split("|");if(temp.length>2){id=temp[0];en=temp[1];cn=temp[2]}}}this.input.val(cn);this.input.attr("nid",id);this.input.attr("nen",en);this.input.attr("ncn",cn)},setKeyDownEvent:function(event){if(this.list.parent().is(":hidden")){return}var obj=this.list.find(".nationality-suggest-item-cur");var keyCode=event.keyCode||"";if(keyCode==38||keyCode==40){if(obj.length==0){this.list.find("li:first").addClass("nationality-suggest-item-cur");return}switch(keyCode){case 38:obj.prev().addClass("nationality-suggest-item-cur");obj.removeClass("nationality-suggest-item-cur");var idx=obj.prev().index();if(idx%12==11){this.list.scrollTop(Math.floor(idx/12)*12*30)}break;case 40:obj.next().addClass("nationality-suggest-item-cur");obj.removeClass("nationality-suggest-item-cur");var idx=obj.next().index();if(idx%12==0){this.list.scrollTop(idx*30)}break}return false}else{if(keyCode==13||keyCode==108){if(obj.length==0){this.list.parent().hide()}else{this.setValue(obj,true)}}}}};