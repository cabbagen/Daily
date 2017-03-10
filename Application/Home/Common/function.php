<?php
	
	function sendEmail($emailTo, $emailTitle, $emailContent) {

		vendor('phpmailer.class#phpmailer');
		$mail = new PHPMailer();

		if( C('MAIL_SMTP') ) {
			$mail->IsSMTP();
		}

		$mail->Host = C('MAIL_HOST');
		$mail->SMTPAuth = C('MAIL_SMTPAUTH');
		$mail->Username = C('MAIL_USERNAME');
		$mail->Password = C('MAIL_PASSWORD');
		$mail->SMTPSecure = C('MAIL_SECURE');
		$mail->CharSet = C('MAIL_CHARTSET');
		// 配置邮件邮件头信息
		$mail->From = C('MAIL_USERNAME');
		$mail->AddAddress($emailTo);
		$mail->FromName = 'Daily 平台中心';
		$mail->IsHTML(C('MAIL_ISHTML'));
		// 邮件正文信息
		$mail->Subject = $emailTitle;
		$mail->Body = $emailContent;
		// 发送邮件
		if( !$mail->Send() ) {
			return false;
		} else {
			return true;
		}

	}


?>