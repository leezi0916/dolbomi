package com.kh.dolbomi.service;


import com.kh.dolbomi.domain.Hiring;
import com.kh.dolbomi.domain.Proposer;
import com.kh.dolbomi.domain.Resume;
import com.kh.dolbomi.domain.User;
import com.kh.dolbomi.dto.ProposerDto;
import com.kh.dolbomi.repository.HiringRepository;
import com.kh.dolbomi.repository.ProposerRepository;
import com.kh.dolbomi.repository.ProposerRepositoryV2;
import com.kh.dolbomi.repository.ResumeRepositoryV2;
import com.kh.dolbomi.repository.UserRepositoryV2;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProposerServiceImpl implements ProposerService {

    private final ProposerRepository proposerRepository;
    private final ProposerRepositoryV2 proposerRepositoryV2;
    private final HiringRepository hiringRepository;
    private final ResumeRepositoryV2 resumeRepositoryV2;
    private final UserRepositoryV2 userRepositoryV2;

    @Override
    public ProposerDto.ResponseWithCount findProposersByHiringNo(Long hiringNo) {
        List<Proposer> proposers = proposerRepositoryV2.findByHiring_HiringNo(hiringNo);

        List<ProposerDto.Response> dtoList = proposers.stream()
                .map(ProposerDto.Response::toDto)
                .toList();

        return ProposerDto.ResponseWithCount.builder()
                .count(dtoList.size())
                .proposers(dtoList)
                .build();
    }


    public Long createProposer(ProposerDto.Create createProposerDto) {

        Hiring hiring = hiringRepository.findById(createProposerDto.getHiring_no())
                .orElseThrow(() -> new IllegalArgumentException("해당 공고가 없습니다."));
        Resume resume = resumeRepositoryV2.findById(createProposerDto.getResume_no())
                .orElseThrow(() -> new IllegalArgumentException("해당 이력서가 없습니다."));
        User caregiver = userRepositoryV2.findById(createProposerDto.getCaregiver_no())
                .orElseThrow(() -> new IllegalArgumentException("해당 간병인이 없습니다."));

        Proposer proposer = createProposerDto.toEntity(hiring, resume, caregiver);
        proposerRepositoryV2.save(proposer);

        return proposer.getProposerNo();
    }

    @Override
    public boolean findProposerNo(Long hiringNo, Long caregiverNo) {
        return proposerRepository.existsByHiringNoAndCaregiverNo(hiringNo, caregiverNo);
    }

    @Override
    public void cancel(Long hiringNo, Long caregiverNo) {
        Optional<Proposer> proposerOpt = proposerRepositoryV2.findByHiring_HiringNoAndCaregiver_UserNo(hiringNo,
                caregiverNo);

        Proposer proposer = proposerOpt.orElseThrow(() ->
                new IllegalArgumentException("신청자가 존재하지 않습니다."));
        proposerRepositoryV2.delete(proposer);
    }


}
