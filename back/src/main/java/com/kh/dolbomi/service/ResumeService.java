package com.kh.dolbomi.service;

import com.kh.dolbomi.dto.ResumeDto;
import com.kh.dolbomi.dto.ResumeDto.Create;
import com.kh.dolbomi.dto.ResumeDto.Response;
import com.kh.dolbomi.dto.ResumeDto.Update;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ResumeService {
    // 메인 구직글 조회
    List<ResumeDto.Response> getMainResumeList();

    // 간병사 모집 페이징 리스트 조회 (상태 Y)
    Page<ResumeDto.Response> getResumePage(Pageable pageable);

    Long createResume(Create createResumeDto);

    Page<Response> getResumList(Long userNo, Pageable pageable);

    ResumeDto.Response updateResume(Long userNo, Update updatePatDto);

    ResumeDto.Response getResume(Long resumeNo);


}
