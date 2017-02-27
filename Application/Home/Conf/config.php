<?php
return array(
	//'配置项'=>'配置值'
	// database
	'DB_TYPE'		=>	'mysql',
	'DB_HOST'		=>	'localhost',
	'DB_NAME'		=>	'daily',
	'DB_USER'		=>	'root',
	'DB_PWD'		=>  'admin',
	'DB_PORT'		=>	3306,
	'DB_PREFIX'		=>  'think_',
	// openIM
	'IM_AppKey'     =>  '23454789',
	'IM_AppSecret'  =>  '524b2e74f0f20f0c8fe318c044a00b16',
	// token
	'TOKEN_ON'      =>    true,  // 是否开启令牌验证 默认关闭
	'TOKEN_NAME'    =>    '__hash__',    // 令牌验证的表单隐藏字段名称，默认为__hash__
	'TOKEN_TYPE'    =>    'md5',  //令牌哈希验证规则 默认为MD5
	'TOKEN_RESET'   =>    true,  //令牌验证出错后是否重置令牌 默认为true
	// email
	'MAIL_SMTP' => true,
	'MAIL_HOST' => 'smtp.qq.com',
	'MAIL_SMTPAUTH' => true,
	'MAIL_USERNAME' => '754689243@qq.com',
	'MAIL_PASSWORD' => 'disdhjbpfuozbbbg',
	'MAIL_SECURE' => 'tls',
	'MAIL_CHARSET' => 'utf-8',
	'MAIL_ISHTML' => true,
);