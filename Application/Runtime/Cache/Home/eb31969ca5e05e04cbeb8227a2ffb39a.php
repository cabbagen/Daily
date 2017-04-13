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
		
  <style type="text/css">
    ::-webkit-scrollbar {
      width: 0px;
    }
    .error-tip {
      text-align: center; margin-top: 50px;
    }
    .error-tip b {
      font-size: 40px;
    }
  </style>

	</head>
	<body>
		<!-- 文档内容 -->
		
  <?php if($errorTip): ?><div class="error-tip">
      <p><b>500</b></p>
      <p><?php echo ($errorTip); ?></p>
    </div><?php endif; ?>

	</body>
	<!-- 脚本文件 -->
	<script type="text/javascript" src="/Public/lib/javascript/jquery.js"></script>
	
  <script type="text/javascript" src="/Public/lib/javascript/mkit.js"></script>  
	<script type="text/javascript">
    var imInfos = <?php echo ($imInfos); ?>;
    WKIT.init(imInfos);
	</script>

</html>