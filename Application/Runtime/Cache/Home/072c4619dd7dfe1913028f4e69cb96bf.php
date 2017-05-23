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
		
	<link href="/Public/style/user.css" rel="stylesheet" type="text/css" />

	</head>
	<body>
		<!-- 文档内容 -->
		
	<header class="header">
	<div class="logo">
		<img src="/public/images/logo.png" />
	</div>
</header>
	<section class="content">
		<div class="avator">
			<img src="<?php echo ($userInfo["avator"]); ?>" />
			<p><strong>个性签名：</strong><span><?php echo ($userInfo["extra"]); ?></span><a class="target-extra" href="javascript:;"> [ 修改 ]</a></p>
		</div>
		<div class="infos">
			<div>
				<p><strong>用户名：</strong><span><?php echo ($userInfo["username"]); ?></span></p>
				<p><strong>昵称：</strong><span><?php echo ($userInfo["nickname"]); ?></span><a class="target-nickname" href="javascript:;"> [ 修改 ]</a></p>
			</div>
			<div>
				<p><strong>Emain：</strong><span><?php echo ($userInfo["email"]); ?></span><a class="target-email" href="javascript:;"> [ 修改 ]</a></p>
				<p><strong>性别：</strong><span><?php echo ($userInfo["gender"]); ?></span><a class="target-gender" href="javascript:;"> [ 修改 ]</a></p>
			</div>
		</div>
	</section>
	<!-- 编辑模态框 -->
	<section class="model-wrap">
		<!-- 修改个性签名 -->
		<div class="model extra">
			<h3 class="model-title">个性签名编辑</h3>
			<div class="model-body">
				<p>
					<label for="extra">个性签名：</label>
					<input type="text" name="extra" />
				</p>
			</div>
			<div class="model-footer">
				<button type="button">取消</button>
				<button type="button">确定</button>
			</div>
		</div>

		<!-- 修改昵称 -->
		<div class="model nickname">
			<h3 class="model-title">昵称编辑</h3>
			<div class="model-body">
				<p>
					<label for="nickname">昵称：</label>
					<input type="text" name="nickname" />
				</p>
			</div>
			<div class="model-footer">
				<button type="button">取消</button>
				<button type="button">确定</button>
			</div>
		</div>

		<!-- 修改email -->
		<div class="model email">
			<h3 class="model-title">Email 编辑</h3>
			<div class="model-body">
				<p>
					<label for="email">Email</label>
					<input type="email" name="email" />
				</p>
			</div>
			<div class="model-footer">
				<button type="button">取消</button>
				<button type="button">确定</button>
			</div>
		</div>

		<!-- 修改性别 -->
		<div class="model gender">
			<h3 class="model-title">性别修改</h3>
			<div class="model-body">
				<p>
					<label for="gender">性别</label>
					<input type="radio" name="gender" value="F" /> 男
					<input type="radio" name="gender" value="M" /> 女
					<input type="radio" name="gender" value="N" /> 未知
				</p>
			</div>
			<div class="model-footer">
				<button type="button">取消</button>
				<button type="button">确定</button>
			</div>
		</div>
	</section>
	<footer class="footer">
	<p>
		<span>友情链接：</span>
		<a href="#" target="_blank">花瓣网</a>
		<a href="#" target="_blank">设计中国</a>
		<a href="#" target="_blank">爱物网</a>
		<a href="#" target="_blank">豆丁网</a>
		<a href="#" target="_blank">携程攻略</a>
		<a href="#" target="_blank">LADYMAX时尚</a>
	</p>
	<p>
		<span>版权所有：</span>
		<span>20170203号</span>
	</p>
</footer>

	</body>
	<!-- 脚本文件 -->
	<script type="text/javascript" src="/Public/lib/javascript/jquery.js"></script>
	
	<script type="text/javascript" src="/Public/javascript/user.js"></script>

</html>