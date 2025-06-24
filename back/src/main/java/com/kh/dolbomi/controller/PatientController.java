package com.kh.dolbomi.controller;


import com.kh.dolbomi.dto.PatientDto;
import com.kh.dolbomi.entity.Patient;
import com.kh.dolbomi.service.PatientService;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.Fetch;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/patient")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")// 프론트와 백엔드 url이 다른것을 맞춰주기 위한 어노테이션
public class PatientController {

    private final PatientService patientService;

    // 환자등록하기
    @PostMapping
    public ResponseEntity<Long> addPatient(@RequestBody PatientDto.Create createDto) {

        Long patNo = patientService.createPatient(createDto);
        return ResponseEntity.ok(patNo);
    }

    //환자목록가져오기
    @GetMapping()
    public  ResponseEntity<List<PatientDto.Response>> PatientList(@RequestParam("guardian_no") Long guardianNo){
        return ResponseEntity.ok(patientService.getListPatient(guardianNo));
    }

    //특정환자가져오기
    @GetMapping("/{patNo}")
    public  ResponseEntity<PatientDto.Response> OnePatient(@PathVariable Long patNo){
        return ResponseEntity.ok(patientService.getPatient(patNo));
    }

    @PutMapping("/{patNo}")
    public ResponseEntity<PatientDto.Response> UpdatePatient(
            @PathVariable Long patNo,
            @RequestBody PatientDto.Update updatePatient)throws IOException {
        return null;
    }


}
