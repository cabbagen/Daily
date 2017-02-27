<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="description" content="daily application tool" />
		<meta name="keywords" content="daily" />
		<title>daily application tool</title>
		<!-- 引入样式 -->
		<link rel="stylesheet" type="text/css" href="/Public/lib/style/reset.css" />
		<link rel="stylesheet" type="text/css" href="/Public/lib/style/common.css" />
		
  <style type="text/css">
    html {
      font: normal 14px/1.5 "微软雅黑";
    }
    h2 {
      text-align: center;
      font-weight: normal;
    }
    section {
      padding: 10px 20px;
      border: 1px solid #cccccc;
      margin: 15px 0px;
    }
    pre {
      width: 80%;
      font: normal 12px/1.5 "微软雅黑";
      padding: 20px 10px;
      margin: 20px auto;
      border: 1px solid #cccccc;
    }
  </style>

	</head>
	<body>
		<!-- 文档内容 -->
		
	<h2>接口测试示例页面</h2>
    <section>
      <p>IM 测试</p>
      <pre>userInfo = <?php echo ($userInfo); ?></pre>
    </section>

	</body>
	<!-- 脚本文件 -->
	<script type="text/javascript" src="/Public/lib/javascript/jquery.js"></script>
	

  <script type="text/javascript">
    var userInfo = <?php echo ($userInfo); ?>;
    console.log(userInfo);
  </script>
  

</html>