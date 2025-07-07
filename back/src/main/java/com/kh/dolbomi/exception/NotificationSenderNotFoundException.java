package com.kh.dolbomi.exception;

public class NotificationSenderNotFoundException extends BaseException {
    public NotificationSenderNotFoundException(String message) {
        super(ErrorCode.NOTIFICATION_SENDER_NOT_FOUND, message);
    }
}