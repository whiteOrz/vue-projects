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
product.alertFn=function(boxClass){
	var oRulebox=document.querySelector('.'+boxClass);
	var oMark=document.querySelector('#mask');
	var oBtnin=document.querySelectorAll('.list-dialog dt');
	var oClose=oRulebox.querySelector('.cancel');
	var oTxt=oRulebox.querySelector('p');
	for(var i=0;i<oBtnin.length;i++){
		oBtnin[i].addEventListener('click',alertBoxShow,false);
	}
	oClose.addEventListener('click',alertBoxHide,false);
	function alertBoxShow(){
		oTxt.innerHTML=this.dataset.dialog;
		oRulebox.classList.add('moveDown');
		oMark.style.height=document.body.scrollHeight+'px';
		oMark.style.display='block';
		document.body.style.overflowY='hidden';
	}
	function alertBoxHide(){
		oRulebox.classList.remove('moveDown');
		oMark.style.display='none';
		document.body.style.overflowY='auto';
	}
}
product.audio=function(){
	var oAudio=document.querySelector('.audio audio');
	var oBtn=document.querySelector('.audio span');
	var onOff=true;
	oBtn.addEventListener('click',function(){
		if(onOff){
			this.classList.add('animate');
			oAudio.play();
		}else{
			this.classList.remove('animate');
			oAudio.pause();
		}
		onOff=!onOff;
	},false);
	oAudio.addEventListener('ended', function () {  
		oBtn.classList.remove('animate');
	}, false);
}
product.health=function(){
	var oBtn=document.querySelector('.btn1'),
		oRulebox=document.querySelector('.dialogbox1'),
		oMark=document.querySelector('#mask');
	oBtn.addEventListener('click',function(){
		oRulebox.style.display='block';
		oMark.style.height=document.body.scrollHeight+'px';
		oMark.style.display='block';
		document.body.style.overflowY='hidden';
		setTimeout(function(){
			window.location.href='pay.html';	
		},1000)
	},false);
}