package com.kh.dolbomi.exception;

public class ReviewAlreadyExistsException extends BaseException {
    public ReviewAlreadyExistsException() {
        super(ErrorCode.REVIEW_ALREADY_EXISTS);
    }

    public ReviewAlreadyExistsException(String message) {
        super(ErrorCode.REVIEW_ALREADY_EXISTS, message);
    }
}
