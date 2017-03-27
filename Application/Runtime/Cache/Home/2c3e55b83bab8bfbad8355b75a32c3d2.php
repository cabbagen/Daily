<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="description" content="daily application tool" />
		<meta name="keywords" content="daily" />
		<title>daily application tool</title>
		<link rel="icon" href="/Public/images/icon.png" />
		<!-- 引入样式 -->
		<link rel="stylesheet" type="text/css" href="/Public/lib/style/reset.css" />
		<link rel="stylesheet" type="text/css" href="/Public/lib/style/common.css" />
		

	</head>
	<body>
		<!-- 文档内容 -->
		
  <h2>长轮询示例</h2>
  <button type="button" class="btn">click</button>

	</body>
	<!-- 脚本文件 -->
	<script type="text/javascript" src="/Public/lib/javascript/jquery.js"></script>
	
  <script type="text/javascript">
    var evtSource = new EventSource('http://www.daily.com:8080/Home/app/listenMsgLongNotification');
    evtSource.onmessage = function(e) {
      console.log(e.data);
    }
    evtSource.onerror = function() {
      console.log('faile');
    }
    evtSource.onopen = function(e) {
      console.log('open ok')
    }

    $('.btn').click(function() {
      $.get('/Home/app/addMsgNotification', function(data) {
        console.log('wewe');
      });
    })
    
  </script>

</html>