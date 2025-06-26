package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.ResumeDto;
import com.kh.dolbomi.dto.ResumeDto.Create;
import com.kh.dolbomi.dto.ResumeDto.Response;
import com.kh.dolbomi.dto.ResumeDto.Update;
import java.util.List;

public interface ResumeService {
    // 메인 구직글 조회
    List<ResumeDto.Response> getMainResumeList();

    Long createResume(Create createResumeDto);

    List<Response> getResumList(Long userNo);

    Response updateResume(Long userNo, Update updatePatDto);
}
