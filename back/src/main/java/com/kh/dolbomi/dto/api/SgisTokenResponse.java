package com.kh.dolbomi.dto.api;

import lombok.Data;

@Data
public class SgisTokenResponse {
    private String id;
    private Result result;
    private String errMsg;
    private int errCd;
    private String trId;

    @Data
    public static class Result {
        private String accessTimeout;
        private String accessToken;
    }
}
