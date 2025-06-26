package com.kh.dolbomi.service;

import com.kh.dolbomi.domain.Resume;
import com.kh.dolbomi.dto.ResumeDto;
import com.kh.dolbomi.enums.StatusEnum;
import com.kh.dolbomi.repository.ResumeRepository;
import com.kh.dolbomi.repository.ReviewRepositoryV2;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ResumeServiceImpl implements ResumeService {

    private final ResumeRepository resumeRepository;
    private final ReviewRepositoryV2 reviewRepositoryV2;

    // 메인 구직글 조회
    @Override
    @Transactional(readOnly = true)
    public List<ResumeDto.Response> getMainResumeList() {
        // join 대신 em에서 Resume를 가져오고, Resume안의 User를 가져와보자
        List<Resume> resumes = resumeRepository.getMainResumeList(StatusEnum.Status.Y);

        return resumes.stream()
                .map(ResumeDto.Response::mainResumeDto)
                .collect(Collectors.toList());
    }

    //간병사 모집 리스트 페이징
    @Override
    @Transactional(readOnly = true)
    public Page<ResumeDto.Response> getResumePage(Pageable pageable) {
        Page<Resume> resumePage = resumeRepository.findByStatus(StatusEnum.Status.Y, pageable);
        return resumePage.map(resume -> {
            Long caregiverNo = resume.getUser().getUserNo();
            Double avgScore = reviewRepositoryV2.findAverageScoreByCaregiverNo(caregiverNo);
            return ResumeDto.Response.caregiverListDto(resume, avgScore);
        });
    }
}
