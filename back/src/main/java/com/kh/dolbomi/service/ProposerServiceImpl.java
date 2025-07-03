package com.kh.dolbomi.service;


import com.kh.dolbomi.domain.Hiring;
import com.kh.dolbomi.domain.Matching;
import com.kh.dolbomi.domain.Patient;
import com.kh.dolbomi.domain.Proposer;
import com.kh.dolbomi.domain.Resume;
import com.kh.dolbomi.domain.User;
import com.kh.dolbomi.dto.ProposerDto;
import com.kh.dolbomi.enums.StatusEnum;
import com.kh.dolbomi.exception.ProposerNotFoundException;
import com.kh.dolbomi.repository.HiringRepository;
import com.kh.dolbomi.repository.MatchingRepositoryV2;
import com.kh.dolbomi.repository.ProposerRepository;
import com.kh.dolbomi.repository.ProposerRepositoryV2;
import com.kh.dolbomi.repository.ResumeRepositoryV2;
import com.kh.dolbomi.repository.UserRepositoryV2;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class ProposerServiceImpl implements ProposerService {

    private final ProposerRepository proposerRepository;
    private final ProposerRepositoryV2 proposerRepositoryV2;
    private final HiringRepository hiringRepository;
    private final ResumeRepositoryV2 resumeRepositoryV2;
    private final UserRepositoryV2 userRepositoryV2;
    private final MatchingRepositoryV2 matchingRepositoryV2;


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


    public void acceptMatching(Long resumeNo, Long hiringNo) {

        // 1. 프로포저 상태 업데이트
        Proposer proposer = proposerRepository.findByHiringNoAndResumeNo(hiringNo, resumeNo)
                .orElseThrow(() -> new IllegalArgumentException("신청 정보가 없습니다."));
        proposer.updateStatus(StatusEnum.Status.Y); // 수락 상태로 변경

        // 2. 매칭 생성
        User caregiver = proposer.getCaregiver();
        Hiring hiring = proposer.getHiring();
        Patient patient = hiring.getPatient();
        //추후 이력서 번호도 매칭할때 같이 넣고싶으면 추가해도 될듯?

        Matching matching = Matching.builder()
                .caregiver(caregiver)
                .patient(patient)
                .status(StatusEnum.Status.Y)
                .startDate(LocalDateTime.now())
                .build();

        matchingRepositoryV2.save(matching);
    }

    @Override
    public boolean isAccepted(Long resumeNo, Long hiringNo) {
        return proposerRepositoryV2.existsByResume_ResumeNoAndHiring_HiringNoAndStatus(
                resumeNo, hiringNo, StatusEnum.Status.Y
        );
    }

    // 나의 지원현황 목록
    @Override
    public Page<ProposerDto.Response> getMyProposerLists(Long userNo, Pageable pageable) {
        Page<Proposer> proposers = proposerRepository.getMyProposerLists(StatusEnum.Status.Y, pageable, userNo);
        return proposers.map(ProposerDto.Response::myProposerDto);
    }

    // 나의 지원현황 내역삭제
    @Override
    public Long deleteProposerHistory(Long proposerNo) {
        // 신청 내역 가져오기 (없으면 예외 발생)
        Proposer proposer = proposerRepository.findHiringByNo(proposerNo)
                .orElseThrow(() -> new ProposerNotFoundException("이미 삭제된 신청내역입니다."));

        // 상태 업데이트
        proposer.updateStatus();

        // 그대로 proposerNo 반환
        return proposer.getProposerNo();
    }

}
