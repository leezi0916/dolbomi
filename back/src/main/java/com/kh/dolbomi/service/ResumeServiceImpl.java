package com.kh.dolbomi.service;

import com.kh.dolbomi.domain.Resume;
import com.kh.dolbomi.domain.User;
import com.kh.dolbomi.dto.ResumeDto;
import com.kh.dolbomi.enums.StatusEnum;
import com.kh.dolbomi.exception.ResumeNotFoundException;
import com.kh.dolbomi.exception.UserNotFoundException;
import com.kh.dolbomi.repository.ResumeRepository;
import com.kh.dolbomi.repository.ResumeRepositoryV2;
import com.kh.dolbomi.repository.ReviewRepositoryV2;
import com.kh.dolbomi.repository.UserRepository;
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
    private final UserRepository userRepository;
    private final ResumeRepositoryV2 resumeRepositoryV2;

    // 메인 구직글 조회
    @Override
    @Transactional(readOnly = true)
    public List<ResumeDto.Response> getMainResumeList() {
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

    @Override
    public Long createResume(ResumeDto.Create createResumeDto) {

        User user = userRepository.findById(createResumeDto.getUser_no())
                .orElseThrow(() -> new UserNotFoundException("이력서를 작성할 유저를 찾을 수 없습니다."));

        Resume resume = createResumeDto.toEntity(user);

        resumeRepository.save(resume);

        return resume.getResumeNo();
    }


    @Override
    public Page<ResumeDto.Response> getResumList(Long userNo, Pageable pageable) {
        Page<Resume> resumes = resumeRepository.getResumeList(userNo, pageable);

        return resumes.map(ResumeDto.Response::ResumeListDto);
    }

    @Override
    public ResumeDto.Response updateResume(Long userNo, ResumeDto.Update updatePatDto) {

        Resume resume = resumeRepositoryV2.findById(userNo)
                .orElseThrow(() -> new ResumeNotFoundException("해당 이력서를 찾을 수 없습니다."));

        resume.changeResume(updatePatDto.getResume_title(), updatePatDto.getResume_content(),
                updatePatDto.getResume_account());

        resume.changeStatus(updatePatDto.getStatus());

        return ResumeDto.Response.ResumeDto(resume);
    }

    @Override
    public ResumeDto.Response getResume(Long resumeNo) {

        Resume resume = resumeRepositoryV2.findById(resumeNo)
                .orElseThrow(() -> new ResumeNotFoundException("해당 이력서를 찾을 수 없습니다."));

        return ResumeDto.Response.ResumeDto(resume);
    }


}
