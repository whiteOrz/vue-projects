import $ from "jquery";
var professPc = {
	"person_profession": function(prm) {
		var $el=$(prm.el)
		var $worktypeid=$(prm.worktypeid);
		
		var professionJson = prm.professJson;
		var value = professionJson.value;
		var desc = professionJson.desc;
		var desc_type = professionJson.desc_type;
		
		var str = "";
		var descArr;
		
		
		$.each(value,function(key,value){
			str+='<li data-id="'+value+'">'+key+'</li>';
		})	
		
		var wrap='<div class="profess-wrap cleafix" id="profess-wrap">'
					+'<ul>'+str+'<ul>'
				+'</div>';
		
		var descWrap='<div class="profess-desc" id="profess-desc"><p class="title"></p><ul class="ul"></ul></div>'
		
		function initProfess(code){
				var strJson={
					"strTitle":"",
					"strDesc":""
				}
				if(desc_type[code]=="不限"){
					strJson.strTitle="所有职业都能投保";
				}else if(desc_type[code]=="不含"){
					strJson.strTitle="不包含";
				}else if(desc_type[code]=="仅限"){
					strJson.strTitle="仅限";
				}
							
				descArr=desc[code].split("、");
				for(var i=0;i<descArr.length;i++){
					strJson.strDesc+='<li>'+descArr[i]+'</li>';
				}
				return strJson;
		}
		
		$el.unbind().bind({
			click:function(e){
				$("body").append(wrap);
		
				var offset=$(this).offset();
				var iptH=$(this).height();
				
				$("#profess-wrap").css({
					left:offset.left+"px",
					top:(offset.top+iptH)+"px"	
				});
				
				$("#profess-wrap").find("li").mouseover(function(){
			
					$(this).addClass("active");
					$(this).siblings().removeClass("active");
			
				});
				
				$("#profess-wrap").find("li").mouseout(function(){
					$(this).removeClass("active");
					
				});
				
				
				$("#profess-wrap").find("li").click(function(e){
					var woreId=$(this).attr("data-id"),
						woreTxt=$(this).text();
					$worktypeid.val(woreId);
					$(this).addClass("active");
					$(this).siblings().removeClass("active");
					$("body").append(descWrap);
					
					var str=initProfess(woreId);
					$(".title").html(str.strTitle);
					$(".ul").html(str.strDesc);
					$el.val(woreTxt);
					e.stopPropagation();
				});
				e.stopPropagation();
			},
			blur:function(){
				//$("#profess-wrap").remove();
			}
		});
		$("body").click(function(e){
			$("#profess-wrap").remove();
			e.stopPropagation();
		});
			
		

	}
}
export {
	professPc
};