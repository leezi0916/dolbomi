package com.kh.dolbomi.exception;

public class ResumeLimitExceededException extends BaseException {
    public ResumeLimitExceededException() {
        super(ErrorCode.RESUME_LIMIT_EXCEEDED);
    }

    public ResumeLimitExceededException(String message) {
        super(ErrorCode.RESUME_LIMIT_EXCEEDED, message);
    }
}
