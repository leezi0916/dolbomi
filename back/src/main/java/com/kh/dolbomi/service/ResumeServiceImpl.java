package com.kh.dolbomi.service;

import com.kh.dolbomi.domain.Resume;
import com.kh.dolbomi.domain.User;
import com.kh.dolbomi.dto.ResumeDto;
import com.kh.dolbomi.enums.StatusEnum;
import com.kh.dolbomi.repository.ResumeRepository;
import com.kh.dolbomi.repository.ResumeRepositoryV2;
import com.kh.dolbomi.repository.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ResumeServiceImpl implements ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;
    private final ResumeRepositoryV2 reumeRepositoryV2;

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


    @Override
    public Long createResume(ResumeDto.Create createResumeDto) {

        User user = userRepository.findById(createResumeDto.getUser_no())
                .orElseThrow(() -> new IllegalArgumentException("유저가 존재하지 않습니다."));

        Resume resume = createResumeDto.toEntity(user);

        resumeRepository.save(resume);

        return resume.getResumeNo();
    }


    @Override
    public List<ResumeDto.Response> getResumList(Long userNo) {

        List<Resume> resumes = resumeRepository.getResumeList(userNo);

        return resumes.stream()
                .map(ResumeDto.Response::ResumeListDto)
                .collect(Collectors.toList());
    }

    @Override
    public ResumeDto.Response updateResume(Long userNo, ResumeDto.Update updatePatDto) {

        Resume resume = reumeRepositoryV2.findById(userNo)
                .orElseThrow(() -> new IllegalArgumentException("유저가 존재하지 않습니다."));

        resume.changeResume(updatePatDto.getResume_title(), updatePatDto.getResume_content(),
                updatePatDto.getAccount());

        resume.changeStatus(updatePatDto.getStatus());

        return ResumeDto.Response.ResumeDto(resume);
    }


}
