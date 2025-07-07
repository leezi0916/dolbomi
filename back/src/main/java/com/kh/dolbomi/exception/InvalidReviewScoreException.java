package com.kh.dolbomi.exception;

public class InvalidReviewScoreException extends BaseException {
    public InvalidReviewScoreException() {
        super(ErrorCode.INVALID_REVIEW_SCORE);
    }

    public InvalidReviewScoreException(String message) {
        super(ErrorCode.INVALID_REVIEW_SCORE, message);
    }
}
