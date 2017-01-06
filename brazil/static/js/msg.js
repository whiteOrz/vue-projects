
/*共用弹层*/
function massage(msg){
	var oBox =  document.createElement('div'); 
	oBox.style.width = '68%';
	oBox.style.position = 'fixed';
	oBox.style.left = '50%';
	oBox.style.top = '50%';
	oBox.style.WebkitTransform='translate(-50%,-50%)';
	oBox.style.transform='translate(-50%,-50%)';
	oBox.style.padding='1rem';
	oBox.style.background='rgba(0,0,0,0.7)';
	oBox.style.color='#fff';
	oBox.style.fontSize='0.8rem';
	oBox.style.borderRadius='0.6rem';
	oBox.style.lineHeight='1.2rem';
	oBox.style.textAlign='center';
	oBox.style.wordBreak='break-all';
	oBox.style.zIndex='99999';
	oBox.innerHTML = msg;
	document.body.appendChild(oBox);
	setTimeout(function(){
		document.body.removeChild(oBox);
	},2000);
};