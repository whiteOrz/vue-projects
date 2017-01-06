<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/jquery.form.js"></script>
<script type="text/javascript">
$(document).ready(function() {
		$('#btn1').click(function(){
			alert("ready to go.");
			doQueryBtn1();
		});
		
	});
function doQueryBtn1(){
		$.ajax({
			type:"GET",
			url:"query",
			contentType: "application/json;charset=utf-8", 
			dataType:"json",
			data:{
				'id':"1000",
			},
			success:function(data){
				alert("ID:"+data.ID+"; NAME:"+data.NAME+"; MAKEDATE:"+data.MAKEDATE);
			}
		})
	}
</script>
</head>
<body>
<div align="center">
	<input id="btn1" type="button" value="查询按钮1" name="query"/>
</div>
</body>
</html>