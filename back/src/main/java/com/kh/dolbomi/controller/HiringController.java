package com.kh.dolbomi.controller;


import com.kh.dolbomi.dto.HiringDto;
import com.kh.dolbomi.dto.HiringDto.Response;
import com.kh.dolbomi.dto.PageResponse;
import com.kh.dolbomi.service.HiringService;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hiring/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")// 프론트와 백엔드 url이 다른것을 맞춰주기 위한 어노테이션
public class HiringController {

    private final HiringService hiringService;

    //돌봄 대상자 모집 리스트 불러오기(메인)
    @GetMapping("/simple-list")
    public ResponseEntity<Map<String, List<Response>>> getHomeHiringLists() {
        Map<String, List<HiringDto.Response>> result = new HashMap<>();
        result.put("all", hiringService.getMainHiringList());
        result.put("careOnly", hiringService.getMainCareHiringList());

        return ResponseEntity.ok(result);
    }

    // 내 구인글 조회
    @GetMapping("/my-list")
    public ResponseEntity<PageResponse<HiringDto.Response>> getMyHiringLists(
            @PageableDefault(size = 10) Pageable pageable,
            @RequestParam Long userNo) {

        return ResponseEntity.ok(new PageResponse<>(hiringService.getMyHiringLists(userNo, pageable)));
    }

    //돌봄대상자 모집 리스트 불러오기
    @GetMapping("/list")
    public ResponseEntity<PageResponse<HiringDto.Response>> getPagedHiringList(
            Pageable pageable

//          ,@Valid SearchDataDto searchDataDto
    ) {
//        @PageableDefault(size = 10, sort = "createDate", direction = Sort.Direction.DESC)

        Page<HiringDto.Response> hiringPage = hiringService.getHiringPage(pageable);
        PageResponse<HiringDto.Response> response = new PageResponse<>(hiringPage);

        return ResponseEntity.ok(response);
    }


    // 구인글 작성
    @PostMapping
    public ResponseEntity<Long> createHiring(@RequestBody HiringDto.Create createDto) {
        Long patNo = createDto.getPat_no();
        if (patNo == null) {
            return ResponseEntity.badRequest().build();
        }

        Long hiringNo = hiringService.createHiring(patNo, createDto);

        return ResponseEntity.ok(hiringNo);
    }

    //구인글 상세보기
    @GetMapping("/{hiringNo}")
    public ResponseEntity<HiringDto.Response> getHiringDetail(
            @PathVariable Long hiringNo,
            @RequestParam(name = "caregiverNo") Long caregiverNo
    ) {
        HiringDto.Response response = hiringService.getHiringDetail(hiringNo, caregiverNo);
        return ResponseEntity.ok(response);
    }

    //구인글 모집마감하기
    @PatchMapping("/{hiringNo}/status")
    public ResponseEntity<String> toggleHiringStatus(@PathVariable Long hiringNo) {
        hiringService.closeHiring(hiringNo);
        return ResponseEntity.ok("모집 상태가 변경되었습니다.");
    }

    //구인글 삭제하기
    @PatchMapping("/{hiringNo}")
    public ResponseEntity<Void> deleteHiring(@PathVariable Long hiringNo) {
        hiringService.deleteHiring(hiringNo);
        return ResponseEntity.ok().build();
    }
}
