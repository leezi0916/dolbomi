package com.kh.dolbomi.RESTController;

import com.kh.dolbomi.dto.api.SgisSidoResponse;
import com.kh.dolbomi.dto.api.SgisSidoResponse.Result;
import com.kh.dolbomi.dto.api.SgisTokenResponse;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@Slf4j
@RestController
@RequestMapping("/api/address")
public class APIAddressController {

    @Value("${sgis.consumer.key}")
    private String key;

    @Value("${sgis.consumer.secret}")
    private String secret;

    @GetMapping(path = "/region", produces = "application/json; charset=UTF-8")
    public List<Result> getRegion(@RequestParam(required = false) Long cd) {

        //토큰발행
        String tokenUrl = "https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json"
                + "?consumer_key=" + key
                + "&consumer_secret=" + secret;

        RestTemplate restTemplateToken = new RestTemplate();
        SgisTokenResponse accessToken = restTemplateToken.getForObject(tokenUrl, SgisTokenResponse.class);

        String token = accessToken.getResult().getAccessToken();
        log.info("SGIS AccessToken : {}", token);

        //지역가져오기
        String regionUrl = "https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json"
                + "?accessToken=" + token;
        if (cd != null) {
            regionUrl += "&cd=" + cd;
        }

        RestTemplate restTemplateRegion = new RestTemplate();
        SgisSidoResponse result = restTemplateRegion.getForObject(regionUrl, SgisSidoResponse.class);

        log.info("region-result : {}", result.getResult());

        return result.getResult();
    }
}
