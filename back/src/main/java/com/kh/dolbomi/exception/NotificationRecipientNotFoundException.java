package com.kh.dolbomi.exception;

public class NotificationRecipientNotFoundException extends BaseException {
    public NotificationRecipientNotFoundException(String message) {
        super(ErrorCode.NOTIFICATION_RECIPIENT_NOT_FOUND, message);
    }
}
