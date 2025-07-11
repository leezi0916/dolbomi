package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.PatientDto;
import java.util.List;

public interface PatientService {
    Long createPatient(PatientDto.Create createDto);

    List<PatientDto.Response> getListPatient(Long guardianNo);

    PatientDto.Response getPatient(Long patNo);


    PatientDto.Response updatePatient(Long patNo, PatientDto.Update updatePatDto);


}
