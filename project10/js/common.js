// JavaScript Document
var product={};
product.showDl=function(obj){
	obj.addEventListener('click',function(){
		this.parentNode.classList.toggle('active');
	},false);
}
product.tab=function(tab){
	var oTab=document.querySelector('.'+tab)
		aTabTit=oTab.querySelectorAll('.tab-tit li'),
		aTabCon=oTab.querySelectorAll('.tab-con>article'),
		n=0,
		show=function(n){
			aTabTit[n].classList.add('active');
			aTabCon[n].style.display='block';
		};
	show(n);
	for(var i=0;i<aTabTit.length;i++){
		aTabTit[i].index=i;
		aTabTit[i].addEventListener('click',function(){
			for(var i=0;i<aTabTit.length;i++){
				aTabTit[i].classList.remove('active');
				aTabCon[i].style.display='none';
			}
			show(this.index);
		},false);
	}
}
product.notice=function(){
	var aLi=document.querySelectorAll('.notice li'),
		btnMore=document.querySelector('.btnmore'),
		onOff=true,
		init=function(){
			for(var i=0;i<aLi.length;i++){
				if(i>2) aLi[i].style.display="none";
			}
		};
	init();
	btnMore.addEventListener('click',function(){
		if(onOff){
			for(var i=0;i<aLi.length;i++){
				aLi[i].style.display="-webkit-box";
			}
			this.classList.add('cur');
			this.innerHTML='收起<span class="icon-arr"></span>';
		}else{
			init();
			this.classList.remove('cur');
			this.innerHTML='点击查看更多<span class="icon-arr"></span>';
		}
		onOff=!onOff;
	},false);
}
