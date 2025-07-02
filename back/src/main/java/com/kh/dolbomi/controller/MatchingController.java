package com.kh.dolbomi.controller;


import com.kh.dolbomi.dto.MatchingDto;
import com.kh.dolbomi.dto.PageResponse;
import com.kh.dolbomi.enums.StatusEnum;
import com.kh.dolbomi.enums.StatusEnum.Status;
import com.kh.dolbomi.service.MatchingService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/matching/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class MatchingController {

    private final MatchingService matchingService;

    @GetMapping
    public ResponseEntity<List<MatchingDto.Response>> getMatchingList(
            @RequestParam("pat_no") Long patNo,
            @RequestParam("status") Status matchingStatus
    ) {
        System.out.println("patNo" + patNo + "matchingStatus : " + matchingStatus);
        return ResponseEntity.ok(matchingService.getMatchingList(patNo, matchingStatus));
    }


    @GetMapping("matched")
    public ResponseEntity<PageResponse<MatchingDto.Response>> getMatchedList(
            @RequestParam("pat_no") Long patNo,
            @RequestParam("status") StatusEnum.Status status,
            @PageableDefault(size = 5) Pageable pageable
    ) {
        return ResponseEntity.ok(new PageResponse<>(matchingService.getMatchedListByStatus(patNo, status, pageable)));
    }

    @GetMapping("/caregiver")
    public ResponseEntity<List<MatchingDto.ResponsePat>> getMatchingListCaregiver(
            @RequestParam("caregiver_no") Long caregiverNo,
            @RequestParam("status") Status matchingStatus
    ) {

        return ResponseEntity.ok(matchingService.getMatchingListCaregiver(caregiverNo, matchingStatus));
    }


    @PatchMapping
    public ResponseEntity<Long> getMatchingChangeStatus(
            @RequestParam("mat_no") Long matNo,
            @RequestParam("status") Status matchingStatus
    ) {

        return ResponseEntity.ok(matchingService.changeStatus(matNo, matchingStatus));
    }


    @GetMapping("/caregiver/matched")
    public ResponseEntity<PageResponse<MatchingDto.ResponsePat>> getMatchedPatientsByCaregiver(
            @RequestParam("caregiver_no") Long caregiverNo,
            @RequestParam("status") StatusEnum.Status status,
            @PageableDefault(size = 3) Pageable pageable
    ) {
        return ResponseEntity.ok(
                new PageResponse<>(matchingService.getMatchedPatientsByCaregiver(caregiverNo, status, pageable))
        );
    }

}
