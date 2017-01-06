<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
%>
<!DOCTYPE html>
<html lang="en">

<head>
<title>${pd.SYSNAME}</title>
<meta charset="UTF-8" />
	<script type="text/javascript" src="http://whzt.taikang.com/brazil/static/js/jquery-1.7.2.js"></script>
</head>
<body>

	<form action="logon.do" method="post" name="loginForm" id="loginForm">
		<input type="text" name="loginname" id="loginname" value=""
			placeholder="请输入用户名" /> <input type="password" name="password"
			id="password" placeholder="请输入密码" value="" />

		<div class="form-actions">
			<span><a href="javascript:quxiao();" class="btn btn-success">取消</a></span>
			<span><a onclick="severCheck();" id="to-recover">登录</a></span>
		</div>

	</form>

<script type="text/javascript">
	function severCheck()
	{
		debugger;
		$("#loginForm").submit();
	}
</script>
</body>

</html>