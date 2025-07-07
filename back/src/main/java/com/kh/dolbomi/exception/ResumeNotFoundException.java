package com.kh.dolbomi.exception;

public class ResumeNotFoundException extends BaseException {
    public ResumeNotFoundException() {
        super(ErrorCode.RESUME_NOT_FOUND);
    }

    public ResumeNotFoundException(String message) {
        super(ErrorCode.RESUME_NOT_FOUND, message);
    }
}
