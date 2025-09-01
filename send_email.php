<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $myemail = 'tanpotl@gmail.com'
    
    // Проверяем валидность email
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Настройки почты
        $to = "tanpotl@gmail.com"; // Замените на ваш email
        $subject = "New user";
        $message = "New user:\n\nEmail: " . $email;
        $headers = "From: no-reply@pixied.tech\r\n"; // Замените на ваш домен
        $headers .= "Reply-To: " . $email . "\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        
        // Отправка email
        if (mail($to, $subject, $message, $headers)) {
            // Отправляем письмо подтверждения пользователю
            $user_subject = "Confirmation";
            $user_message = "Thank you for subscription!\n\n";
            $user_headers = "From: no-reply@pixied.com\r\n"; // Замените на ваш домен
            $user_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
            
            mail($email, $user_subject, $user_message, $user_headers);
            mail($myemail, $user_subject, $email, $user_headers);
            
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Ошибка отправки email']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Неверный email адрес']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Неверный метод запроса']);
}
?>