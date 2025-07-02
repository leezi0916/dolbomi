package com.kh.dolbomi.dto.api;

import java.util.List;
import lombok.Data;

@Data
public class SgisSidoResponse {
    private String id;
    private List<Result> result;
    private String errMsg;
    private int errCd;
    private String trId;

    @Data
    public static class Result {
        private String y_coor;
        private String full_addr;
        private String x_coor;
        private String addr_name;
        private String cd;
    }
}
