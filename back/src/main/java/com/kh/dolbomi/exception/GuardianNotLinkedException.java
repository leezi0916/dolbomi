package com.kh.dolbomi.exception;

public class GuardianNotLinkedException extends BaseException {

    public GuardianNotLinkedException(String message) {
        super(ErrorCode.GUARDIAN_NOT_LINKED, message);
    }
}